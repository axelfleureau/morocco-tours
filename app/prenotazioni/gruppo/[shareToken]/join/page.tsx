'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useNotifications } from '@/components/NotificationSystem'
import { validateShareToken, joinGroupBooking } from '@/lib/utils/booking-utils'
import { Booking } from '@/lib/firestore'
import { Loader2, Users, Calendar, MapPin } from 'lucide-react'

export default function JoinGroupBookingPage() {
  const router = useRouter()
  const params = useParams()
  const shareToken = params.shareToken as string
  const { user, loading: authLoading } = useAuth()
  const { showSuccess, showError, showInfo } = useNotifications()
  
  const [booking, setBooking] = useState<Booking | null>(null)
  const [validating, setValidating] = useState(true)
  const [joining, setJoining] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    if (!shareToken) return
    
    async function validate() {
      setValidating(true)
      const result = await validateShareToken(shareToken)
      
      if (result.valid && result.booking) {
        setBooking(result.booking)
      } else {
        setValidationError(result.error || 'Link non valido')
      }
      
      setValidating(false)
    }
    
    validate()
  }, [shareToken])

  const handleJoinGroup = async () => {
    if (!user) {
      showInfo('Accesso Richiesto', 'Effettua il login per unirti al gruppo')
      router.push(`/login?redirect=/prenotazioni/gruppo/${shareToken}/join`)
      return
    }
    
    if (!booking?.id) {
      showError('Errore', 'Prenotazione non trovata')
      return
    }
    
    setJoining(true)
    
    try {
      const result = await joinGroupBooking(
        booking.id,
        user.uid,
        user.displayName || user.email || 'Utente',
        user.email || '',
        user.phoneNumber || undefined
      )
      
      if (result.success) {
        showSuccess(
          'Gruppo Unito!',
          'Sei stato aggiunto al gruppo di viaggio. Vai alla dashboard per vedere i dettagli.'
        )
        
        setTimeout(() => {
          router.push('/dashboard?tab=bookings')
        }, 1500)
      } else {
        showError('Errore', result.error || 'Impossibile unirti al gruppo')
      }
    } catch (error) {
      console.error('Error joining group:', error)
      showError('Errore', 'Si è verificato un errore. Riprova più tardi.')
    } finally {
      setJoining(false)
    }
  }

  if (authLoading || validating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-gray-600">Caricamento invito...</p>
        </div>
      </div>
    )
  }

  if (validationError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Link Non Valido
          </h1>
          <p className="text-gray-600 mb-6">
            {validationError}
          </p>
          <button
            onClick={() => router.push('/viaggi')}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Esplora Viaggi
          </button>
        </div>
      </div>
    )
  }

  if (!booking) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-8 h-8" />
              <h1 className="text-3xl font-bold">
                Invito Gruppo di Viaggio
              </h1>
            </div>
            <p className="text-orange-100">
              Sei stato invitato a unirti a questo gruppo per un'avventura in Marocco!
            </p>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {booking.title || 'Viaggio in Marocco'}
              </h2>
              
              {booking.description && (
                <p className="text-gray-600 mb-6">
                  {booking.description}
                </p>
              )}

              <div className="grid gap-4">
                {booking.personalDetails?.departureDate && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    <div>
                      <span className="font-semibold">Data Partenza:</span>{' '}
                      {new Date(booking.personalDetails.departureDate).toLocaleDateString('it-IT')}
                    </div>
                  </div>
                )}

                {booking.personalDetails?.departureCity && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    <div>
                      <span className="font-semibold">Città di Partenza:</span>{' '}
                      {booking.personalDetails.departureCity}
                    </div>
                  </div>
                )}

                {booking.personalDetails?.travelers && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Users className="w-5 h-5 text-orange-600" />
                    <div>
                      <span className="font-semibold">Partecipanti:</span>{' '}
                      {booking.personalDetails.travelers} viaggiatori
                    </div>
                  </div>
                )}
              </div>
            </div>

            {booking.participants && booking.participants.length > 0 && (
              <div className="mb-8 p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Membri del Gruppo ({booking.participants.length})
                </h3>
                <div className="space-y-2">
                  {booking.participants.map((participant, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                        <span className="text-orange-700 font-semibold">
                          {participant.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{participant.name}</div>
                        <div className="text-gray-500 text-xs">
                          {participant.role === 'organizer' ? 'Organizzatore' : 'Partecipante'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              {user ? (
                <button
                  onClick={handleJoinGroup}
                  disabled={joining}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {joining ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Unione in corso...
                    </>
                  ) : (
                    <>
                      <Users className="w-5 h-5" />
                      Unisciti al Gruppo
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => router.push(`/login?redirect=/prenotazioni/gruppo/${shareToken}/join`)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
                >
                  Accedi per Unirti al Gruppo
                </button>
              )}

              <button
                onClick={() => router.push('/viaggi')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Esplora Altri Viaggi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
