// Chat utility functions for group conversations
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  getDoc,
  Timestamp,
  onSnapshot,
  arrayUnion,
  increment
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { COLLECTIONS, ChatMessage, Conversation } from '@/lib/firestore'

/**
 * Create or get conversation for a booking group
 */
export async function getOrCreateConversation(
  groupId: string,
  bookingId: string,
  participants: Array<{ userId: string; name: string; avatar?: string }>
): Promise<string> {
  try {
    // Check if conversation exists
    const conversationsRef = collection(db, COLLECTIONS.conversations)
    const q = query(conversationsRef, where('groupId', '==', groupId))
    const snapshot = await getDocs(q)
    
    if (!snapshot.empty) {
      return snapshot.docs[0].id
    }
    
    // Create new conversation
    const lastReadMap: { [userId: string]: any } = {}
    const unreadCount: { [userId: string]: number } = {}
    participants.forEach(p => {
      lastReadMap[p.userId] = Timestamp.now()
      unreadCount[p.userId] = 0
    })
    
    const conversationData: Omit<Conversation, 'id'> = {
      groupId,
      bookingId,
      participants: participants.map(p => ({
        userId: p.userId,
        name: p.name,
        avatar: p.avatar
      })),
      lastReadMap,
      unreadCount,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    }
    
    const docRef = await addDoc(conversationsRef, conversationData)
    return docRef.id
  } catch (error) {
    console.error('Error creating conversation:', error)
    throw error
  }
}

/**
 * Send a message to a conversation
 */
export async function sendMessage(
  conversationId: string,
  senderId: string,
  senderName: string,
  text: string,
  senderAvatar?: string
): Promise<void> {
  try {
    // Get conversation to find participants
    const conversationRef = doc(db, COLLECTIONS.conversations, conversationId)
    const conversationSnap = await getDoc(conversationRef)
    
    if (!conversationSnap.exists()) {
      throw new Error('Conversation not found')
    }
    
    const conversation = conversationSnap.data() as Conversation
    
    // Add message to messages collection
    const messagesRef = collection(db, COLLECTIONS.messages)
    const messageData: Omit<ChatMessage, 'id'> = {
      conversationId,
      senderId,
      senderName,
      senderAvatar,
      text,
      timestamp: Timestamp.now(),
      readBy: [senderId] // Sender has read their own message
    }
    
    await addDoc(messagesRef, messageData)
    
    // Build update object with unread increments
    const updateData: any = {
      lastMessage: {
        text,
        senderId,
        senderName,
        timestamp: Timestamp.now()
      },
      updatedAt: Timestamp.now(),
      [`unreadCount.${senderId}`]: 0 // Reset sender's unread count
    }
    
    // Increment unread count for all other participants
    conversation.participants.forEach(participant => {
      if (participant.userId !== senderId) {
        updateData[`unreadCount.${participant.userId}`] = increment(1)
      }
    })
    
    // Update conversation
    await updateDoc(conversationRef, updateData)
  } catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
}

/**
 * Mark messages as read by user
 */
export async function markMessagesAsRead(
  conversationId: string,
  userId: string
): Promise<void> {
  try {
    // Get all messages for this conversation
    const messagesRef = collection(db, COLLECTIONS.messages)
    const q = query(
      messagesRef,
      where('conversationId', '==', conversationId)
    )
    
    const snapshot = await getDocs(q)
    
    // Filter unread messages client-side and update
    const updatePromises = snapshot.docs
      .filter(doc => {
        const message = doc.data() as ChatMessage
        return !message.readBy?.includes(userId)
      })
      .map(doc => 
        updateDoc(doc.ref, {
          readBy: arrayUnion(userId)
        })
      )
    
    if (updatePromises.length > 0) {
      await Promise.all(updatePromises)
    }
    
    // Reset unread count and update lastRead in conversation
    const conversationRef = doc(db, COLLECTIONS.conversations, conversationId)
    await updateDoc(conversationRef, {
      [`unreadCount.${userId}`]: 0,
      [`lastReadMap.${userId}`]: Timestamp.now()
    })
  } catch (error) {
    console.error('Error marking messages as read:', error)
    // Don't throw - this is not critical
  }
}

/**
 * Subscribe to messages in real-time
 */
export function subscribeToMessages(
  conversationId: string,
  onMessagesUpdate: (messages: ChatMessage[]) => void
): () => void {
  const messagesRef = collection(db, COLLECTIONS.messages)
  const q = query(
    messagesRef,
    where('conversationId', '==', conversationId),
    orderBy('timestamp', 'asc')
  )
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages: ChatMessage[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ChatMessage))
    
    onMessagesUpdate(messages)
  })
  
  return unsubscribe
}

/**
 * Subscribe to conversation updates
 */
export function subscribeToConversation(
  conversationId: string,
  onConversationUpdate: (conversation: Conversation) => void
): () => void {
  const conversationRef = doc(db, COLLECTIONS.conversations, conversationId)
  
  const unsubscribe = onSnapshot(conversationRef, (snapshot) => {
    if (snapshot.exists()) {
      const conversation: Conversation = {
        id: snapshot.id,
        ...snapshot.data()
      } as Conversation
      
      onConversationUpdate(conversation)
    }
  })
  
  return unsubscribe
}

/**
 * Get conversation by group ID
 */
export async function getConversationByGroupId(groupId: string): Promise<Conversation | null> {
  try {
    const conversationsRef = collection(db, COLLECTIONS.conversations)
    const q = query(conversationsRef, where('groupId', '==', groupId))
    const snapshot = await getDocs(q)
    
    if (snapshot.empty) {
      return null
    }
    
    const doc = snapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data()
    } as Conversation
  } catch (error) {
    console.error('Error getting conversation:', error)
    return null
  }
}
