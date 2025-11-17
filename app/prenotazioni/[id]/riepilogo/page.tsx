"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { COLLECTIONS, type Booking, type BookingParticipant } from "@/lib/firestore"
import { useAuth } from "@/context/AuthContext"
import { useNotifications } from "@/components/NotificationSystem"
import { generateShareToken } from "@/lib/utils/booking-utils"
import ShareInviteButton from "@/components/ShareInviteButton"
import { ArrowLeft, CheckCircle2, Calendar, Users, MapPin, Phone, Mail, User } from "lucide-react"
import Link from "next/link"

export default function BookingSummaryPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { showSuccess, showError, showWarning } = useNotifications()
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [bookingData, setBookingData] = useState<any>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [generatedShareToken, setGeneratedShareToken] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: 2,
    children: 0,
    childrenAges: "",
    departureDate: "",
    returnDate: "",
    departureCity: "",
    customRequests: ""
  })

  const bookingId = params.id as string

  useEffect(() => {
    if (!user) {
      router.push(`/auth/signin?redirect=/prenotazioni/${bookingId}/riepilogo`)
      return
    }
    loadBookingData()
  }, [user, bookingId])

  const loadBookingData = async () => {
    try {
      // Fetch existing booking by ID
      const bookingRef = doc(db, COLLECTIONS.bookings, bookingId)
      const bookingDoc = await getDoc(bookingRef)
      
      if (!bookingDoc.exists()) {
        showError("Prenotazione Non Trovata", "Impossibile trovare la prenotazione richiesta")
        router.push('/dashboard')
        return
      }

      const existingBooking = bookingDoc.data() as Booking
      
      // Pre-fill form with existing booking data
      if (existingBooking.personalDetails) {
        setFormData({
          name: existingBooking.personalDetails.name || user?.displayName || "",
          email: existingBooking.personalDetails.email || user?.email || "",
          phone: existingBooking.personalDetails.phone || "",
          travelers: existingBooking.personalDetails.travelers || 2,
          children: existingBooking.personalDetails.children || 0,
          childrenAges: existingBooking.personalDetails.childrenAges || "",
          departureDate: existingBooking.personalDetails.departureDate || "",
          returnDate: existingBooking.personalDetails.returnDate || "",
          departureCity: existingBooking.personalDetails.departureCity || "",
          customRequests: existingBooking.customRequests || ""
        })
      } else {
        // Fallback to user data if booking has no details yet
        setFormData(prev => ({
          ...prev,
          name: user?.displayName || "",
          email: user?.email || ""
        }))
      }

      // Load associated travel/experience data
      let itemData = null
      if (existingBooking.travelId) {
        const itemDoc = await getDoc(doc(db, COLLECTIONS.travels, existingBooking.travelId))
        if (itemDoc.exists()) {
          itemData = itemDoc.data()
        }
      } else if (existingBooking.experienceId) {
        const itemDoc = await getDoc(doc(db, COLLECTIONS.experiences, existingBooking.experienceId))
        if (itemDoc.exists()) {
          itemData = itemDoc.data()
        }
      }

      // Distinguish between totalPrice and pricePerPerson
      let pricePerPerson = 0
      let totalPrice = 0
      let hasConfirmedTotal = false
      
      if (existingBooking.totalPrice && existingBooking.totalPrice > 0) {
        // Booking already has confirmed total - preserve as-is, DO NOT recalculate
        totalPrice = existingBooking.totalPrice
        hasConfirmedTotal = true
        
        // Derive per-person ONLY for display (not for calculation)
        // Only if we have travelers count, otherwise leave at 0
        if (existingBooking.personalDetails?.travelers && existingBooking.personalDetails.travelers > 0) {
          pricePerPerson = existingBooking.totalPrice / existingBooking.personalDetails.travelers
        }
      } else {
        // New booking, calculate from item data
        pricePerPerson = itemData?.price || itemData?.pricePerPerson || 0
        totalPrice = pricePerPerson * (existingBooking.personalDetails?.travelers || formData.travelers)
      }

      setBookingData({
        ...existingBooking,
        title: itemData?.title || itemData?.name || "Esperienza Marocco",
        description: itemData?.description || "",
        duration: itemData?.duration || "",
        pricePerPerson,         // Per-person rate for display only
        totalPrice,             // Total amount (existing or calculated)
        hasConfirmedTotal       // Flag to prevent recalculation
      })

    } catch (error) {
      console.error("Error loading booking data:", error)
      showError("Errore", "Impossibile caricare i dati della prenotazione")
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      showWarning("Login Richiesto", "Effettua il login per completare la prenotazione")
      return
    }

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.departureDate) {
      showWarning("Campi Obbligatori", "Compila tutti i campi obbligatori per continuare")
      return
    }

    // Calculate total price correctly
    let calculatedPrice = 0
    
    if (bookingData?.hasConfirmedTotal) {
      // Booking already has confirmed total - USE AS-IS, do not recalculate
      calculatedPrice = bookingData.totalPrice
    } else if (bookingData?.pricePerPerson && bookingData.pricePerPerson > 0) {
      // New booking or editable - calculate from per-person rate
      calculatedPrice = bookingData.pricePerPerson * formData.travelers
    } else if (bookingData?.totalPrice && bookingData.totalPrice > 0) {
      // Fallback to existing total
      calculatedPrice = bookingData.totalPrice
    }

    if (calculatedPrice <= 0) {
      showError("Errore Prezzo", "Impossibile calcolare il prezzo totale. Contattaci direttamente.")
      return
    }

    setSaving(true)
    try {
      // Update existing booking (preserve travelId/experienceId/userId)
      const bookingRef = doc(db, COLLECTIONS.bookings, bookingId)
      
      // Generate group booking fields if not exists
      const groupFields: any = {}
      if (!bookingData.shareToken) {
        const newShareToken = generateShareToken()
        groupFields.shareToken = newShareToken
        groupFields.groupId = `group_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        groupFields.participants = [{
          userId: user.uid,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          joinedAt: Timestamp.now(),
          status: 'joined',
          role: 'organizer'
        }] as BookingParticipant[]
        
        // Stash for success UI
        setGeneratedShareToken(newShareToken)
      } else {
        // Use existing shareToken
        setGeneratedShareToken(bookingData.shareToken)
      }
      
      const updateData = {
        status: 'confirmed' as const,
        personalDetails: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          travelers: formData.travelers,
          children: formData.children || 0,
          childrenAges: formData.childrenAges,
          departureDate: formData.departureDate,
          returnDate: formData.returnDate,
          departureCity: formData.departureCity
        },
        customRequests: formData.customRequests,
        totalPrice: calculatedPrice,
        ...groupFields,
        updatedAt: Timestamp.now()
      }

      // Update booking (merge to preserve existing fields)
      await updateDoc(bookingRef, updateData)

      setShowSuccessMessage(true)
      showSuccess(
        "Prenotazione Confermata!",
        "La tua prenotazione è stata inserita in Mie Prenotazioni"
      )

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        router.push('/dashboard?tab=bookings')
      }, 3000)

    } catch (error) {
      console.error("Error saving booking:", error)
      showError(
        "Errore Prenotazione",
        "Si è verificato un errore. Riprova o contattaci direttamente."
      )
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  if (showSuccessMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Prenotazione Confermata!
          </h1>
          
          <p className="text-gray-600 mb-6">
            La tua prenotazione è stata inserita con successo in <strong>Mie Prenotazioni</strong>.
            Ti contatteremo presto per confermare tutti i dettagli del tuo viaggio.
          </p>

          {generatedShareToken && (
            <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-sm text-gray-700 mb-3">
                Vuoi viaggiare con amici? Invitali a unirti al tuo gruppo!
              </p>
              <ShareInviteButton 
                shareToken={generatedShareToken}
                bookingId={bookingId}
                variant="primary"
                className="w-full"
              />
            </div>
          )}

          <Link 
            href="/dashboard?tab=bookings"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Vai alle Mie Prenotazioni
          </Link>

          <p className="text-sm text-gray-500 mt-6">
            Reindirizzamento automatico in corso...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alla Dashboard
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Riepilogo Prenotazione
          </h1>
          <p className="text-gray-600">
            Completa i tuoi dati per finalizzare la prenotazione
          </p>
        </div>

        {/* Booking Info Card */}
        {bookingData && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-orange-600">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {bookingData.title}
            </h2>
            <p className="text-gray-600 mb-4">{bookingData.description}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              {bookingData.duration && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-orange-600" />
                  <span>{bookingData.duration}</span>
                </div>
              )}
              {bookingData.pricePerPerson > 0 && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-orange-600">
                    €{bookingData.pricePerPerson}
                  </span>
                  <span className="text-gray-500">/ persona</span>
                </div>
              )}
              {bookingData.totalPrice > 0 && !bookingData.pricePerPerson && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-orange-600">
                    €{bookingData.totalPrice}
                  </span>
                  <span className="text-gray-500">totale</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            I Tuoi Dati
          </h2>

          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Nome Completo *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Mario Rossi"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="mario.rossi@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Telefono *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="+39 123 456 7890"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Città di Partenza
              </label>
              <input
                type="text"
                value={formData.departureCity}
                onChange={(e) => setFormData({ ...formData, departureCity: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Roma, Milano, ..."
              />
            </div>
          </div>

          {/* Travel Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Numero Adulti
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={formData.travelers}
                onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Numero Bambini
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={formData.children}
                onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {formData.children > 0 && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Età Bambini (separata da virgole)
                </label>
                <input
                  type="text"
                  value={formData.childrenAges}
                  onChange={(e) => setFormData({ ...formData, childrenAges: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="es. 5, 8, 12"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Data Partenza *
              </label>
              <input
                type="date"
                value={formData.departureDate}
                onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Data Ritorno
              </label>
              <input
                type="date"
                value={formData.returnDate}
                onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Custom Requests */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Richieste Speciali
            </label>
            <textarea
              value={formData.customRequests}
              onChange={(e) => setFormData({ ...formData, customRequests: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              placeholder="Eventuali richieste particolari, allergie, esigenze speciali..."
            />
          </div>

          {/* Price Summary */}
          {(bookingData?.pricePerPerson || bookingData?.totalPrice) && (
            <div className="bg-orange-50 rounded-lg p-6 mb-8">
              {bookingData.pricePerPerson > 0 && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Prezzo per persona:</span>
                  <span className="font-semibold">€{bookingData.pricePerPerson}</span>
                </div>
              )}
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Numero viaggiatori:</span>
                <span className="font-semibold">{formData.travelers}</span>
              </div>
              <div className="border-t border-orange-200 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Totale Stimato:</span>
                  <span className="text-2xl font-bold text-orange-600">
                    €{bookingData.pricePerPerson > 0 
                      ? bookingData.pricePerPerson * formData.travelers 
                      : bookingData.totalPrice}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Salvataggio in corso...
              </span>
            ) : (
              "Conferma Prenotazione"
            )}
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            Riceverai una conferma via email entro 24 ore
          </p>
        </form>
      </div>
    </div>
  )
}
