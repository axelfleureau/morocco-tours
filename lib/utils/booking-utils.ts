import { doc, getDoc, updateDoc, arrayUnion, Timestamp, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Booking, BookingParticipant } from '@/lib/firestore'

const COLLECTIONS = {
  bookings: 'bookings'
}

export function generateShareToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 16; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

export async function validateShareToken(shareToken: string): Promise<{
  valid: boolean
  booking?: Booking
  error?: string
}> {
  try {
    const bookingsRef = collection(db, COLLECTIONS.bookings)
    const q = query(bookingsRef, where('shareToken', '==', shareToken))
    const snapshot = await getDocs(q)
    
    if (snapshot.empty) {
      return { valid: false, error: 'Link di invito non valido o scaduto' }
    }
    
    const bookingDoc = snapshot.docs[0]
    const booking = { id: bookingDoc.id, ...bookingDoc.data() } as Booking
    
    if (booking.status === 'cancelled') {
      return { valid: false, error: 'Questa prenotazione è stata cancellata' }
    }
    
    return { valid: true, booking }
  } catch (error) {
    console.error('Error validating share token:', error)
    return { valid: false, error: 'Errore durante la validazione del link' }
  }
}

export async function joinGroupBooking(
  bookingId: string,
  userId: string,
  userName: string,
  userEmail: string,
  userPhone?: string
): Promise<{
  success: boolean
  error?: string
}> {
  try {
    const bookingRef = doc(db, COLLECTIONS.bookings, bookingId)
    const bookingDoc = await getDoc(bookingRef)
    
    if (!bookingDoc.exists()) {
      return { success: false, error: 'Prenotazione non trovata' }
    }
    
    const booking = bookingDoc.data() as Booking
    
    const existingParticipant = booking.participants?.find(
      p => p.userId === userId
    )
    if (existingParticipant) {
      return { success: false, error: 'Sei già parte di questo gruppo' }
    }
    
    const newParticipant: BookingParticipant = {
      userId,
      name: userName,
      email: userEmail,
      phone: userPhone,
      joinedAt: Timestamp.now(),
      status: 'joined',
      role: 'participant'
    }
    
    await updateDoc(bookingRef, {
      participants: arrayUnion(newParticipant)
    })
    
    return { success: true }
  } catch (error) {
    console.error('Error joining group booking:', error)
    return { success: false, error: 'Errore durante l\'aggiunta al gruppo' }
  }
}

export function getShareInviteLink(shareToken: string): string {
  if (typeof window === 'undefined') return ''
  const baseUrl = window.location.origin
  return `${baseUrl}/prenotazioni/gruppo/${shareToken}/join`
}
