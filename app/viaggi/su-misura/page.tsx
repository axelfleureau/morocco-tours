"use client"

import { useState } from "react"
import { ArrowRight, ArrowLeft, CheckCircle, MessageCircle, Phone, FileText } from "lucide-react"

import { useRef } from "react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { useAuth } from "@/context/AuthContext"
import { useNotifications } from "@/components/NotificationSystem"
import { db } from "@/lib/firebase"
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { COLLECTIONS, CustomTripRequest } from "@/lib/firestore-schema"

export default function CustomTripsPage() {
  const { user } = useAuth()
  const { showSuccess, showWarning, showError, showInfo } = useNotifications()
  const [currentStep, setCurrentStep] = useState(1)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    // Step 1 - Basic Info
    name: "",
    email: "",
    phone: "",
    travelers: 2,
    children: 0,
    childrenAges: "",
    departureDate: "",
    returnDate: "",
    duration: 7,
    departureCity: "",
    budget: 1500,

    // Step 2 - Travel Style
    travelStyle: [] as string[],
    travelPace: "moderate",
    interests: [] as string[],

    // Step 3 - Destinations
    destinations: [] as string[],
    mustVisit: "",

    // Step 4 - Accommodation & Transport
    accommodation: "riad",
    accommodationPreferences: [] as string[],
    transport: "private-driver",
    additionalServices: [] as string[],

    // Step 5 - Final Details
    specialRequests: "",
    dietaryRestrictions: "",
    accessibility: "",
    occasion: "",
  })

  const WHATSAPP_NUMBER = "393292333370" // Solo numeri!

  const privacyRef = useRef<HTMLInputElement>(null)

  const composeWhatsappMessage = () => {
    return `Ciao Morocco Dreams! Vorrei ricevere una proposta di viaggio personalizzata. Ecco i miei dettagli:
👤 *Dati personali*
Nome: ${formData.name || "-"}
Email: ${formData.email || "-"}
Telefono: ${formData.phone || "-"}
🎒 *Viaggiatori*: ${formData.travelers} adulto/i${formData.children ? ", " + formData.children + " bambino/i" : ""}
🗓 *Date*: ${formData.departureDate || "?"} → ${formData.returnDate || "?"}
Budget/persona: €${formData.budget || "-"}
📍 *Destinazioni*: ${(formData.destinations || []).join(", ") || "-"}
🎨 *Interessi*: ${(formData.interests || []).join(", ") || "-"}
🏠 *Alloggio*: ${formData.accommodation || "-"}
🚗 *Trasporto*: ${formData.transport || "-"}
💡 *Preferenze alloggio*: ${(formData.accommodationPreferences || []).join(", ") || "-"}
➕ *Servizi aggiuntivi*: ${(formData.additionalServices || []).join(", ") || "-"}
🎉 *Occasione speciale*: ${formData.occasion || "-"}
🥗 *Restr. alimentari*: ${formData.dietaryRestrictions || "-"}
♿️ *Accessibilità*: ${formData.accessibility || "-"}
📝 *Richieste*: ${formData.specialRequests || "-"}
_Grazie!_`
  }

  const handleWhatsapp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!privacyRef.current?.checked) {
      privacyRef.current?.focus()
      showWarning("Privacy", "Devi accettare la privacy policy per continuare")
      return
    }
    
    // For guest users: open WhatsApp directly without saving
    if (!user) {
      showInfo(
        "Richiesta Inviata", 
        "La tua richiesta sarà inviata via WhatsApp. Effettua il login per salvare le richieste nella dashboard."
      )
      const msg = encodeURIComponent(composeWhatsappMessage())
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank")
      return
    }
    
    // Save to Firestore
    setIsSaving(true)
    try {
      const tripRequest: Omit<CustomTripRequest, 'id'> = {
        userId: user.uid,
        userEmail: user.email || formData.email,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        travelers: formData.travelers,
        children: formData.children,
        childrenAges: formData.childrenAges,
        departureDate: formData.departureDate,
        returnDate: formData.returnDate,
        duration: formData.duration,
        departureCity: formData.departureCity,
        budget: formData.budget,
        travelStyle: formData.travelStyle,
        travelPace: formData.travelPace,
        interests: formData.interests,
        destinations: formData.destinations,
        mustVisit: formData.mustVisit,
        accommodation: formData.accommodation,
        accommodationPreferences: formData.accommodationPreferences,
        transport: formData.transport,
        additionalServices: formData.additionalServices,
        specialRequests: formData.specialRequests,
        dietaryRestrictions: formData.dietaryRestrictions,
        accessibility: formData.accessibility,
        occasion: formData.occasion,
        status: 'pending',
        estimatedCost: calculateEstimatedCost(),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        sentToWhatsApp: true,
        whatsAppSentAt: Timestamp.now()
      }
      
      const docRef = await addDoc(collection(db, COLLECTIONS.customTripRequests), tripRequest)
      
      showSuccess(
        "Richiesta Salvata!",
        "La tua richiesta è stata salvata nella dashboard. Ora ti reindirizziamo a WhatsApp."
      )
      
      // Open WhatsApp after save
      setTimeout(() => {
        const msg = encodeURIComponent(composeWhatsappMessage())
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank")
      }, 1500)
      
    } catch (error) {
      console.error("Error saving trip request:", error)
      showError(
        "Errore Salvataggio",
        "Impossibile salvare la richiesta. Puoi comunque procedere con WhatsApp.",
        [
          {
            label: 'Continua con WhatsApp',
            onClick: () => {
              const msg = encodeURIComponent(composeWhatsappMessage())
              window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank")
            },
            variant: 'primary'
          }
        ]
      )
    } finally {
      setIsSaving(false)
    }
  }

  const handlePdf = () => {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text("Riepilogo Viaggio su Misura", 14, 18)
    autoTable(doc, {
      startY: 28,
      head: [["Campo", "Valore"]],
      body: [
        ["Nome", formData.name || "-"],
        ["Email", formData.email || "-"],
        ["Telefono", formData.phone || "-"],
        [
          "Viaggiatori",
          `${formData.travelers} adulto/i${formData.children ? ", " + formData.children + " bambino/i" : ""}`,
        ],
        ["Budget persona", `€${formData.budget || "-"}`],
        ["Budget stimato", `€${calculateEstimatedCost()}`],
        ["Partenza", formData.departureDate || "-"],
        ["Ritorno", formData.returnDate || "-"],
        ["Stile viaggio", formData.travelPace || "-"],
        ["Destinazioni", (formData.destinations || []).join(", ") || "-"],
        ["Interessi", (formData.interests || []).join(", ") || "-"],
        ["Alloggio", formData.accommodation || "-"],
        ["Preferenze alloggio", (formData.accommodationPreferences || []).join(", ") || "-"],
        ["Trasporto", formData.transport || "-"],
        ["Servizi aggiuntivi", (formData.additionalServices || []).join(", ") || "-"],
        ["Occasione speciale", formData.occasion || "-"],
        ["Dietary", formData.dietaryRestrictions || "-"],
        ["Accessibilità", formData.accessibility || "-"],
        ["Richieste", formData.specialRequests || "-"],
      ],
    })
    doc.save("MoroccoDreams_Riepilogo.pdf")
  }

  const totalSteps = 5

  const travelStyles = [
    { id: "adventurous", label: "Avventuroso", icon: "🏔️" },
    { id: "relaxed", label: "Rilassato", icon: "🧘" },
    { id: "cultural", label: "Culturale", icon: "🏛️" },
    { id: "gastronomic", label: "Gastronomico", icon: "🍽️" },
    { id: "naturalistic", label: "Naturalistico", icon: "🌿" },
    { id: "shopping", label: "Shopping", icon: "🛍️" },
  ]

  const interests = [
    { id: "desert", label: "Deserto del Sahara", icon: "🏜️", description: "Notti sotto le stelle e cammelli" },
    { id: "culture", label: "Cultura e Storia", icon: "🏛️", description: "Città imperiali, siti UNESCO, musei" },
    { id: "sea", label: "Mare e Relax", icon: "🏖️", description: "Costa atlantica, Essaouira, tempo in spiaggia" },
    { id: "mountains", label: "Montagna e Trekking", icon: "🏔️", description: "Monti dell'Atlante, escursioni" },
    { id: "gastronomy", label: "Gastronomia", icon: "🍽️", description: "Tour enogastronomici, mercati, degustazioni" },
    { id: "wellness", label: "Benessere", icon: "🧘", description: "Hammam tradizionale, SPA, meditazione" },
    { id: "adventure", label: "Avventura", icon: "🚵", description: "Sport outdoor: surf, quad, arrampicata" },
    {
      id: "shopping",
      label: "Shopping e Artigianato",
      icon: "🛍️",
      description: "Souk, artigianato locale, cooperative",
    },
    { id: "photography", label: "Fotografia", icon: "📸", description: "Spot panoramici, tour fotografici" },
  ]

  const destinations = [
    { id: "marrakech", label: "Marrakech", description: "La Perla Rossa" },
    { id: "fes", label: "Fes", description: "Capitale spirituale" },
    { id: "casablanca", label: "Casablanca", description: "Metropoli moderna" },
    { id: "rabat", label: "Rabat", description: "Capitale del regno" },
    { id: "essaouira", label: "Essaouira", description: "Città del vento" },
    { id: "agadir", label: "Agadir", description: "Riviera marocchina" },
    { id: "chefchaouen", label: "Chefchaouen", description: "Perla blu" },
    { id: "merzouga", label: "Merzouga (Deserto)", description: "Erg Chebbi" },
    { id: "ouarzazate", label: "Ouarzazate", description: "Porta del deserto" },
    { id: "atlas", label: "Monti Atlas", description: "Trekking e natura" },
  ]

  const accommodationTypes = [
    { id: "riad", label: "Riad Tradizionale", description: "Autentico e caratteristico" },
    { id: "hotel", label: "Hotel di Lusso", description: "Comfort e servizi moderni" },
    { id: "mix", label: "Mix di Entrambi", description: "Varietà di esperienze" },
  ]

  const transportOptions = [
    { id: "private-driver", label: "Auto privata con autista", description: "Tour in comfort totale" },
    { id: "self-drive", label: "Self-drive (Auto a noleggio)", description: "Guida autonomamente" },
    { id: "organized-tour", label: "Tour organizzato in minivan", description: "Piccoli gruppi privati" },
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayToggle = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter((item) => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value],
    }))
  }

  const validateStep1 = (): boolean => {
    const errors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      errors.name = "Nome e cognome obbligatorio"
    }
    if (!formData.email.trim()) {
      errors.email = "Email obbligatoria"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email non valida"
    }
    if (!formData.phone.trim()) {
      errors.phone = "Telefono obbligatorio"
    }
    if (!formData.departureCity.trim()) {
      errors.departureCity = "Città di partenza obbligatoria"
    }
    if (!formData.travelers || formData.travelers < 1) {
      errors.travelers = "Numero di adulti obbligatorio (minimo 1)"
    }
    if (formData.children === null || formData.children === undefined || isNaN(formData.children)) {
      errors.children = "Numero di bambini obbligatorio (inserire 0 se nessuno)"
    }
    if (!formData.departureDate) {
      errors.departureDate = "Data di partenza obbligatoria"
    }
    if (!formData.returnDate) {
      errors.returnDate = "Data di ritorno obbligatoria"
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const nextStep = () => {
    // Validate Step 1 before advancing
    if (currentStep === 1) {
      if (!validateStep1()) {
        // Scroll to first error
        window.scrollTo({ top: 300, behavior: 'smooth' })
        return
      }
    }
    
    if (currentStep < totalSteps) {
      setValidationErrors({}) // Clear errors when advancing
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const calculateEstimatedCost = () => {
    const baseCost = formData.budget * formData.travelers
    return baseCost
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative py-24 bg-gradient-to-r from-orange-500 to-red-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Viaggi su Misura</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Ogni viaggio è unico. Raccontaci il tuo sogno, lo realizziamo noi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 dark:bg-orange-900/40 rounded-full px-6 py-3 border-none shadow-lg">
              <span className="font-semibold text-white dark:text-orange-200">100% Personalizzabile</span>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-red-500 dark:bg-orange-900/40 rounded-full px-6 py-3 border-none shadow-lg">
              <span className="font-semibold text-white dark:text-orange-200">Preventivo Gratuito</span>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-red-500 dark:bg-orange-900/40 rounded-full px-6 py-3 border-none shadow-lg">
              <span className="font-semibold text-white dark:text-orange-200">Risposta in 24h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Process Timeline */}
      <div className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Come Funziona</h2>
            <p className="text-xl text-muted-foreground">Il processo di creazione del tuo viaggio perfetto</p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: 1, title: "Analisi Preferenze", description: "Compila il configuratore dettagliato", icon: "📝" },
              { step: 2, title: "Proposta Itinerario", description: "Ricevi la proposta entro 48h", icon: "✈️" },
              { step: 3, title: "Feedback e Modifiche", description: "Personalizziamo insieme", icon: "🔄" },
              { step: 4, title: "Conferma e Prenotazione", description: "Finalizzi il tuo viaggio", icon: "✅" },
              { step: 5, title: "Partenza", description: "Vivi la tua avventura!", icon: "🎉" },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl mb-4 mx-auto shadow-lg">
                  <span className="text-white text-2xl" role="img" aria-label={item.title}>
                    {item.icon}
                  </span>
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-3xl shadow-2xl overflow-hidden border border-border">
            {/* Progress Bar */}
            <div className="bg-muted px-8 py-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-card-foreground">Configuratore di Viaggio</h2>
                <span className="text-sm text-muted-foreground">
                  Passo {currentStep} di {totalSteps}
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div key={i} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                        i + 1 <= currentStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted-foreground/20 text-muted-foreground"
                      }`}
                    >
                      {i + 1 <= currentStep ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-foreground font-bold">{i + 1}</span>
                      )}
                    </div>
                    {i < totalSteps - 1 && (
                      <div className={`w-12 h-1 mx-2 ${i + 1 < currentStep ? "bg-primary" : "bg-border"}`} />
                    )}
                  </div>
                ))}
              </div>

              <div className="w-full bg-border rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-card-foreground mb-4">Le tue informazioni di base</h3>
                    <p className="text-muted-foreground">Iniziamo con i dettagli essenziali del tuo viaggio</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Nome e Cognome <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                          validationErrors.name ? 'border-red-500' : 'border-border'
                        }`}
                        placeholder="Il tuo nome completo"
                      />
                      {validationErrors.name && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                          validationErrors.email ? 'border-red-500' : 'border-border'
                        }`}
                        placeholder="la-tua-email@esempio.com"
                      />
                      {validationErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Telefono <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                          validationErrors.phone ? 'border-red-500' : 'border-border'
                        }`}
                        placeholder="+39 123 456 7890"
                      />
                      {validationErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Città di partenza <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.departureCity}
                        onChange={(e) => handleInputChange("departureCity", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                          validationErrors.departureCity ? 'border-red-500' : 'border-border'
                        }`}
                        placeholder="Milano, Roma, etc."
                      />
                      {validationErrors.departureCity && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.departureCity}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Numero di adulti <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={formData.travelers}
                        onChange={(e) => handleInputChange("travelers", Number.parseInt(e.target.value))}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                          validationErrors.travelers ? 'border-red-500' : 'border-border'
                        }`}
                      />
                      {validationErrors.travelers && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.travelers}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Numero di bambini <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={formData.children}
                        onChange={(e) => handleInputChange("children", Number.parseInt(e.target.value))}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                          validationErrors.children ? 'border-red-500' : 'border-border'
                        }`}
                      />
                      {validationErrors.children && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.children}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">Età bambini</label>
                      <input
                        type="text"
                        value={formData.childrenAges}
                        onChange={(e) => handleInputChange("childrenAges", e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                        placeholder="es. 8, 12 anni"
                        disabled={formData.children === 0}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Data di partenza preferita <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.departureDate}
                        onChange={(e) => handleInputChange("departureDate", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                          validationErrors.departureDate ? 'border-red-500' : 'border-border'
                        }`}
                      />
                      {validationErrors.departureDate && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.departureDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Data di ritorno preferita <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.returnDate}
                        onChange={(e) => handleInputChange("returnDate", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                          validationErrors.returnDate ? 'border-red-500' : 'border-border'
                        }`}
                      />
                      {validationErrors.returnDate && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.returnDate}</p>
                      )}
                    </div>
                  </div>

                  <div>
  <label className="block text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
    Budget orientativo per persona:
    <span className="font-semibold text-orange-600 ml-2">€{formData.budget}</span>
  </label>
  <div className="flex items-center space-x-3">
    <input
      type="range"
      min="500"
      max="5000"
      step="100"
      value={formData.budget}
      onChange={(e) => handleInputChange("budget", Number(e.target.value))}
      className="w-full h-3 rounded-full appearance-none bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 outline-none"
      style={{
        accentColor: "#ea580c"
      }}
    />
    <span className="text-2xl text-orange-500 font-black">€</span>
  </div>
  <div className="flex justify-between text-xs text-muted-foreground mt-1">
    <span>€500</span>
    <span>€1250</span>
    <span>€2500</span>
    <span>€4000</span>
    <span>€5000+</span>
  </div>
</div>

                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-card-foreground mb-4">Stile di viaggio</h3>
                    <p className="text-muted-foreground">
                      Raccontaci che tipo di viaggiatore sei e cosa ti interessa di più
                    </p>
                  </div>

                  {/* Tipo di viaggiatore - SELEZIONE MULTIPLA */}
                  <div>
                    <label className="block text-lg font-medium text-card-foreground mb-4">
                      Che tipo di viaggiatore ti consideri? (puoi selezionare più opzioni)
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {travelStyles.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => handleArrayToggle("travelStyle", style.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-left
              ${
                formData.travelStyle.includes(style.id)
                  ? "border-transparent bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  : "border-border hover:border-primary text-card-foreground"
              }
            `}
                          type="button"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{style.icon}</span>
                            <span className="font-medium">{style.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ritmo di viaggio - SELEZIONE SINGOLA */}
                  <div>
                    <label className="block text-lg font-medium text-card-foreground mb-4">
                      Ritmo di viaggio preferito
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { id: "intense", label: "Intenso", description: "Vedere più cose possibili" },
                        { id: "moderate", label: "Moderato", description: "Equilibrio tra visite e relax" },
                        { id: "relaxed", label: "Rilassato", description: "Molti momenti liberi" },
                      ].map((pace) => (
                        <button
                          key={pace.id}
                          onClick={() => handleInputChange("travelPace", pace.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-left
              ${
                formData.travelPace === pace.id
                  ? "border-transparent bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  : "border-border hover:border-primary text-card-foreground"
              }
            `}
                          type="button"
                        >
                          <h4 className="font-medium">{pace.label}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{pace.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interessi specifici - SELEZIONE MULTIPLA */}
                  <div>
                    <label className="block text-lg font-medium text-card-foreground mb-4">
                      Interessi specifici (seleziona tutto ciò che ti interessa)
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {interests.map((interest) => (
                        <button
                          key={interest.id}
                          onClick={() => handleArrayToggle("interests", interest.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-left
              ${
                formData.interests.includes(interest.id)
                  ? "border-transparent bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  : "border-border hover:border-primary text-card-foreground"
              }
            `}
                          type="button"
                        >
                          <div className="flex items-start space-x-3">
                            <span className="text-2xl flex-shrink-0">{interest.icon}</span>
                            <div>
                              <h4 className="font-medium">{interest.label}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{interest.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Destinations */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-card-foreground mb-4">Destinazioni desiderate</h3>
                    <p className="text-muted-foreground">Seleziona i luoghi che vorresti assolutamente visitare</p>
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-card-foreground mb-4">
                      Destinazioni che ti interessano
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {destinations.map((destination) => (
                        <button
                          key={destination.id}
                          onClick={() => handleArrayToggle("destinations", destination.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            formData.destinations.includes(destination.id)
                              ? "border-transparent bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                              : "border-border hover:border-primary text-card-foreground"
                          }`}
                          type="button"
                        >
                          <h4 className="font-medium">{destination.label}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{destination.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-card-foreground mb-2">
                      Luoghi che vorresti assolutamente vedere (opzionale)
                    </label>
                    <textarea
                      value={formData.mustVisit}
                      onChange={(e) => handleInputChange("mustVisit", e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground resize-none"
                      placeholder="Descrivi luoghi specifici, esperienze particolari o sogni che vorresti realizzare..."
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Accommodation & Transport */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-card-foreground mb-4">Alloggi e Trasporti</h3>
                    <p className="text-muted-foreground">Definisci il livello di comfort e lo stile del tuo viaggio</p>
                  </div>

                  {/* Tipologia di alloggio preferita (singola) */}
                  <div>
                    <label className="block text-lg font-medium text-card-foreground mb-4">
                      Tipologia di alloggio preferita
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {accommodationTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => handleInputChange("accommodation", type.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            formData.accommodation === type.id
                              ? "border-transparent bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                              : "border-border hover:border-primary text-card-foreground"
                          }`}
                          type="button"
                        >
                          <h4 className="font-medium">{type.label}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preferenze alloggio (multi) */}
                  <div>
                    <label className="block text-lg font-medium text-card-foreground mb-4">
                      Preferenze particolari di alloggio (opzionale)
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        "Piscina",
                        "SPA",
                        "Posizione centrale nella medina",
                        "Zona silenziosa",
                        "Vista panoramica",
                        "Camere familiari comunicanti",
                      ].map((pref) => (
                        <button
                          key={pref}
                          onClick={() => handleArrayToggle("accommodationPreferences", pref)}
                          className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                            formData.accommodationPreferences.includes(pref)
                              ? "border-transparent bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                              : "border-border hover:border-primary text-card-foreground"
                          }`}
                          type="button"
                        >
                          <span className="text-sm font-medium">{pref}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mezzo di trasporto (singola) */}
                  <div>
                    <label className="block text-lg font-medium text-card-foreground mb-4">
                      Come ti piacerebbe spostarti?
                    </label>
                    <div className="space-y-4">
                      {transportOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleInputChange("transport", option.id)}
                          className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            formData.transport === option.id
                              ? "border-transparent bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                              : "border-border hover:border-primary text-card-foreground"
                          }`}
                          type="button"
                        >
                          <h4 className="font-medium">{option.label}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Servizi aggiuntivi (multi) */}
                  <div>
                    <label className="block text-lg font-medium text-card-foreground mb-4">
                      Servizi aggiuntivi (opzionale)
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        "Guida locale dedicata",
                        "Supporto guida per tutto il tour",
                        "Trasferimenti aeroporto inclusi",
                        "Assicurazione di viaggio completa",
                        "Servizio fotografico professionale",
                        "Assistenza 24/7 in italiano",
                      ].map((service) => (
                        <button
                          key={service}
                          onClick={() => handleArrayToggle("additionalServices", service)}
                          className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                            formData.additionalServices.includes(service)
                              ? "border-transparent bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                              : "border-border hover:border-primary text-card-foreground"
                          }`}
                          type="button"
                        >
                          <span className="text-sm font-medium">{service}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-8">
                  {/* ... tutti gli input summary ... */}

                  {/* Privacy Consent */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      ref={privacyRef}
                      required
                    />
                    <label htmlFor="privacy" className="text-sm text-muted-foreground">
                      Accetto la{" "}
                      <a href="/privacy" className="text-orange-600 hover:text-orange-700 underline">
                        Privacy Policy
                      </a>{" "}
                      e autorizzo il trattamento dei miei dati personali per ricevere la proposta di viaggio
                      personalizzata.
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
                    <button
                      onClick={handleWhatsapp}
                      className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105 font-semibold text-lg shadow-lg"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Invia richiesta su WhatsApp</span>
                    </button>
                    <button
                      onClick={handlePdf}
                      className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-slate-500 to-slate-800 text-white rounded-xl hover:from-slate-700 hover:to-slate-900 transition-all duration-300 hover:scale-105 font-semibold text-lg shadow-lg"
                    >
                      <FileText className="w-5 h-5" />
                      <span>Scarica PDF riepilogo</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2 px-6 py-3 border border-border text-muted-foreground rounded-xl hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Indietro</span>
                </button>

                {currentStep < totalSteps ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 hover:scale-105"
                  >
                    <span>Avanti</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105 font-semibold text-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span>Invia Richiesta</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Hai bisogno di aiuto?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            I nostri esperti sono sempre disponibili per aiutarti a creare il viaggio perfetto
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/393123456789?text=Ciao! Ho bisogno di aiuto per configurare il mio viaggio su misura in Marocco."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white text-orange-600 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chatta su WhatsApp</span>
            </a>
            <a
              href="/contatti"
              className="inline-flex items-center space-x-2 border-2 border-white text-white px-6 py-3 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 font-semibold"
            >
              <Phone className="w-5 h-5" />
              <span>Chiamaci</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
