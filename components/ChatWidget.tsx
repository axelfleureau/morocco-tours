'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useNotifications } from '@/components/NotificationSystem'
import { 
  subscribeToMessages, 
  sendMessage, 
  markMessagesAsRead,
  getOrCreateConversation 
} from '@/lib/utils/chat-utils'
import { ChatMessage } from '@/lib/firestore'
import { Send, X, Users } from 'lucide-react'
import { format } from 'date-fns'
import { it } from 'date-fns/locale'

interface ChatWidgetProps {
  groupId: string
  bookingId: string
  participants: Array<{ userId: string; name: string; avatar?: string }>
  onClose?: () => void
  className?: string
}

export default function ChatWidget({ 
  groupId, 
  bookingId, 
  participants,
  onClose,
  className = '' 
}: ChatWidgetProps) {
  const { user } = useAuth()
  const { showError } = useNotifications()
  
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize conversation
  useEffect(() => {
    async function initConversation() {
      try {
        setLoading(true)
        const convId = await getOrCreateConversation(groupId, bookingId, participants)
        setConversationId(convId)
      } catch (error) {
        console.error('Error initializing conversation:', error)
        showError('Errore Chat', 'Impossibile caricare la chat. Riprova più tardi.')
      } finally {
        setLoading(false)
      }
    }

    if (groupId && bookingId) {
      initConversation()
    }
  }, [groupId, bookingId, participants, showError])

  // Subscribe to messages
  useEffect(() => {
    if (!conversationId) return

    const unsubscribe = subscribeToMessages(conversationId, (msgs) => {
      setMessages(msgs)
      scrollToBottom()
      
      // Mark as read when messages arrive
      if (user) {
        markMessagesAsRead(conversationId, user.uid)
      }
    })

    return () => unsubscribe()
  }, [conversationId, user])

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newMessage.trim() || !conversationId || !user) return

    try {
      setSending(true)
      
      const currentUser = participants.find(p => p.userId === user.uid)
      const userName = currentUser?.name || user.email || 'Utente'
      
      await sendMessage(
        conversationId,
        user.uid,
        userName,
        newMessage.trim(),
        currentUser?.avatar
      )
      
      setNewMessage('')
      inputRef.current?.focus()
    } catch (error) {
      console.error('Error sending message:', error)
      showError('Errore Invio', 'Impossibile inviare il messaggio. Riprova.')
    } finally {
      setSending(false)
    }
  }

  // Format timestamp
  const formatMessageTime = (timestamp: any) => {
    if (!timestamp?.toDate) return ''
    
    const date = timestamp.toDate()
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return format(date, 'HH:mm', { locale: it })
    } else if (diffInHours < 7 * 24) {
      return format(date, 'EEE HH:mm', { locale: it })
    } else {
      return format(date, 'dd/MM HH:mm', { locale: it })
    }
  }

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-lg ${className}`}>
        <div className="p-6 text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg flex flex-col ${className}`}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-orange-50 to-red-50">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-orange-600" />
          <div>
            <h3 className="font-semibold text-gray-900">Chat Gruppo</h3>
            <p className="text-xs text-gray-500">
              {participants.length} partecipant{participants.length !== 1 ? 'i' : 'e'}
            </p>
          </div>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/50 rounded-lg transition-colors"
            aria-label="Chiudi chat"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px] min-h-[300px]">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">
              Nessun messaggio ancora. Inizia la conversazione!
            </p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwnMessage = message.senderId === user?.uid
            
            return (
              <div
                key={message.id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'} flex flex-col`}>
                  {!isOwnMessage && (
                    <span className="text-xs text-gray-500 mb-1 px-2">
                      {message.senderName}
                    </span>
                  )}
                  
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      isOwnMessage
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {message.text}
                    </p>
                  </div>
                  
                  <span className="text-xs text-gray-400 mt-1 px-2">
                    {formatMessageTime(message.timestamp)}
                  </span>
                </div>
              </div>
            )
          })
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Scrivi un messaggio..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={sending}
          />
          
          <button
            type="submit"
            disabled={!newMessage.trim() || sending}
            className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Invia</span>
          </button>
        </div>
      </form>
    </div>
  )
}
