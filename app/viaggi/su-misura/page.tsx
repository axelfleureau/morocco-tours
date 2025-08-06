"use client"

import { useState } from "react"
import { ArrowRight, ArrowLeft, CheckCircle, Star, MessageCircle, Phone } from "lucide-react"

export default function CustomTripsPage() {
  const [currentStep, setCurrentStep] = useState(1)
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

  const nextStep = () => {
    if (currentStep < totalSteps) {
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative py-24 bg-gradient-to-r from-orange-500 to-red-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Viaggi su Misura</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Ogni viaggio è unico. Raccontaci il tuo sogno, lo realizziamo noi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">100% Personalizzabile</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Preventivo Gratuito</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Risposta in 24h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Process Timeline */}
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Come Funziona</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Il processo di creazione del tuo viaggio perfetto
            </p>
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
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-gray-50 dark:bg-gray-700 px-8 py-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Configuratore di Viaggio</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Passo {currentStep} di {totalSteps}
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div key={i} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                        i + 1 <= currentStep ? "bg-orange-500 text-white" : "bg-gray-200 dark:bg-gray-600 text-gray-500"
                      }`}
                    >
                      {i + 1 <= currentStep ? <CheckCircle className="w-5 h-5" /> : i + 1}
                    </div>
                    {i < totalSteps - 1 && (
                      <div
                        className={`w-12 h-1 mx-2 ${
                          i + 1 < currentStep ? "bg-orange-500" : "bg-gray-200 dark:bg-gray-600"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
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
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      Le tue informazioni di base
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Iniziamo con i dettagli essenziali del tuo viaggio
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nome e Cognome *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Il tuo nome completo"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="la-tua-email@esempio.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Telefono *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="+39 123 456 7890"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Città di partenza
                      </label>
                      <input
                        type="text"
                        value={formData.departureCity}
                        onChange={(e) => handleInputChange("departureCity", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Milano, Roma, etc."
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Numero di adulti
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={formData.travelers}
                        onChange={(e) => handleInputChange("travelers", Number.parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Numero di bambini
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={formData.children}
                        onChange={(e) => handleInputChange("children", Number.parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Età bambini
                      </label>
                      <input
                        type="text"
                        value={formData.childrenAges}
                        onChange={(e) => handleInputChange("childrenAges", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="es. 8, 12 anni"
                        disabled={formData.children === 0}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Data di partenza preferita
                      </label>
                      <input
                        type="date"
                        value={formData.departureDate}
                        onChange={(e) => handleInputChange("departureDate", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Data di ritorno preferita
                      </label>
                      <input
                        type="date"
                        value={formData.returnDate}
                        onChange={(e) => handleInputChange("returnDate", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Budget orientativo per persona: €{formData.budget}
                    </label>
                    <input
                      type="range"
                      min="500"
                      max="5000"
                      step="100"
                      value={formData.budget}
                      onChange={(e) => handleInputChange("budget", Number.parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>€500</span>
                      <span>€5000+</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Travel Style */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Stile di viaggio</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Raccontaci che tipo di viaggiatore sei e cosa ti interessa di più
                    </p>
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Che tipo di viaggiatore ti consideri? (puoi selezionare più opzioni)
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {travelStyles.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => handleArrayToggle("travelStyle", style.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            formData.travelStyle.includes(style.id)
                              ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                              : "border-gray-200 dark:border-gray-600 hover:border-orange-300"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{style.icon}</span>
                            <span className="font-medium text-gray-900 dark:text-white">{style.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-900 dark:text-white mb-4">
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
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            formData.travelPace === pace.id
                              ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                              : "border-gray-200 dark:border-gray-600 hover:border-orange-300"
                          }`}
                        >
                          <h4 className="font-medium text-gray-900 dark:text-white">{pace.label}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{pace.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Interessi specifici (seleziona tutto ciò che ti interessa)
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {interests.map((interest) => (
                        <button
                          key={interest.id}
                          onClick={() => handleArrayToggle("interests", interest.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            formData.interests.includes(interest.id)
                              ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                              : "border-gray-200 dark:border-gray-600 hover:border-orange-300"
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <span className="text-2xl flex-shrink-0">{interest.icon}</span>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">{interest.label}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{interest.description}</p>
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
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Destinazioni desiderate</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Seleziona i luoghi che vorresti assolutamente visitare
                    </p>
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Destinazioni che ti interessano
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {destinations.map((destination) => (
                        <button
                          key={destination.id}
                          onClick={() => handleArrayToggle("destinations", destination.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            formData.destinations.includes(destination.id)
                              ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                              : "border-gray-200 dark:border-gray-600 hover:border-orange-300"
                          }`}
                        >
                          <h4 className="font-medium text-gray-900 dark:text-white">{destination.label}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{destination.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Luoghi che vorresti assolutamente vedere (opzionale)
                    </label>
                    <textarea
                      value={formData.mustVisit}
                      onChange={(e) => handleInputChange("mustVisit", e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                      placeholder="Descrivi luoghi specifici, esperienze particolari o sogni che vorresti realizzare..."
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Accommodation & Transport */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Alloggi e Trasporti</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Definisci il livello di comfort e lo stile del tuo viaggio
                    </p>
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Tipologia di alloggio preferita
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {accommodationTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => handleInputChange("accommodation", type.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            formData.accommodation === type.id
                              ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                              : "border-gray-200 dark:border-gray-600 hover:border-orange-300"
                          }`}
                        >
                          <h4 className="font-medium text-gray-900 dark:text-white">{type.label}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{type.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-900 dark:text-white mb-4">
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
                              ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300"
                              : "border-gray-200 dark:border-gray-600 hover:border-orange-300"
                          }`}
                        >
                          <span className="text-sm font-medium">{pref}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Come ti piacerebbe spostarti?
                    </label>
                    <div className="space-y-4">
                      {transportOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleInputChange("transport", option.id)}
                          className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            formData.transport === option.id
                              ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                              : "border-gray-200 dark:border-gray-600 hover:border-orange-300"
                          }`}
                        >
                          <h4 className="font-medium text-gray-900 dark:text-white">{option.label}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{option.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-900 dark:text-white mb-4">
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
                              ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300"
                              : "border-gray-200 dark:border-gray-600 hover:border-orange-300"
                          }`}
                        >
                          <span className="text-sm font-medium">{service}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Final Details & Summary */}
              {currentStep === 5 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      Dettagli finali e riepilogo
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Ultimi dettagli per personalizzare al meglio la tua esperienza
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Occasione speciale (opzionale)
                      </label>
                      <select
                        value={formData.occasion}
                        onChange={(e) => handleInputChange("occasion", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Seleziona se applicabile</option>
                        <option value="honeymoon">Viaggio di nozze</option>
                        <option value="anniversary">Anniversario</option>
                        <option value="birthday">Compleanno</option>
                        <option value="family">Viaggio in famiglia</option>
                        <option value="friends">Viaggio con amici</option>
                        <option value="solo">Viaggio da solo</option>
                        <option value="business">Viaggio di lavoro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Restrizioni alimentari (opzionale)
                      </label>
                      <input
                        type="text"
                        value={formData.dietaryRestrictions}
                        onChange={(e) => handleInputChange("dietaryRestrictions", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="es. vegetariano, celiaco, allergie..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Esigenze di accessibilità (opzionale)
                    </label>
                    <input
                      type="text"
                      value={formData.accessibility}
                      onChange={(e) => handleInputChange("accessibility", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Descrivi eventuali esigenze particolari..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Note aggiuntive e richieste speciali
                    </label>
                    <textarea
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                      placeholder="Qualsiasi altra informazione che possa aiutarci a creare il viaggio perfetto per te..."
                    />
                  </div>

                  {/* Summary */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Star className="w-5 h-5 text-orange-500 mr-2" />
                      Riepilogo del tuo viaggio
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Viaggiatori:</span>
                          <span className="text-gray-900 dark:text-white">
                            {formData.travelers} adulti{formData.children > 0 && `, ${formData.children} bambini`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Budget per persona:</span>
                          <span className="text-gray-900 dark:text-white">€{formData.budget}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Budget totale stimato:</span>
                          <span className="font-bold text-orange-600 text-lg">€{calculateEstimatedCost()}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Partenza:</span>
                          <span className="text-gray-900 dark:text-white">
                            {formData.departureDate || "Da definire"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Ritorno:</span>
                          <span className="text-gray-900 dark:text-white">{formData.returnDate || "Da definire"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Stile di viaggio:</span>
                          <span className="text-gray-900 dark:text-white capitalize">{formData.travelPace}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Consent */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      required
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-600 dark:text-gray-300">
                      Accetto la{" "}
                      <a href="/privacy" className="text-orange-600 hover:text-orange-700 underline">
                        Privacy Policy
                      </a>{" "}
                      e autorizzo il trattamento dei miei dati personali per ricevere la proposta di viaggio
                      personalizzata.
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Indietro</span>
                </button>

                {currentStep < totalSteps ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105"
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
