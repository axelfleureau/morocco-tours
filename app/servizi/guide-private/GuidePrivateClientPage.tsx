"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Star,
  Languages,
  Award,
  Mountain,
  Building,
  Utensils,
  CheckCircle,
  ArrowRight,
  Phone,
  MessageCircle,
} from "lucide-react"

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TouristService",
  name: "Guide Private Esperte Marocco",
  description: "Guide turistiche private certificate per esplorare il Marocco autentico con esperienza locale",
  provider: {
    "@type": "Organization",
    name: "Morocco Dreams",
  },
  areaServed: "Morocco",
  offers: [
    {
      "@type": "Offer",
      name: "Tour Città",
      price: "35",
      priceCurrency: "EUR",
    },
    {
      "@type": "Offer",
      name: "Tour Culturale",
      price: "45",
      priceCurrency: "EUR",
    },
    {
      "@type": "Offer",
      name: "Tour Avventura",
      price: "55",
      priceCurrency: "EUR",
    },
  ],
}

const guides = [
  {
    id: "hassan",
    name: "Hassan El Amrani",
    specialization: "Città Imperiali & Storia",
    experience: "12 anni",
    languages: ["Italiano", "Francese", "Inglese", "Arabo", "Berbero"],
    rating: 4.9,
    reviews: 247,
    price: 45,
    image: "/images/guides/hassan-guide.png",
    description: "Esperto di storia marocchina e architettura islamica. Laureato in Storia dell'Arte.",
    specialties: ["Medine storiche", "Architettura islamica", "Storia del Marocco", "Tradizioni locali"],
    certifications: ["Guida Turistica Certificata", "Laurea in Storia dell'Arte", "Primo Soccorso"],
  },
  {
    id: "aicha",
    name: "Aicha Benali",
    specialization: "Cultura & Tradizioni",
    experience: "8 anni",
    languages: ["Italiano", "Spagnolo", "Francese", "Arabo"],
    rating: 4.8,
    reviews: 189,
    price: 40,
    image: "/images/guides/aicha-guide.png",
    description: "Specializzata in cultura berbera e tradizioni femminili marocchine.",
    specialties: ["Cultura berbera", "Artigianato locale", "Cucina tradizionale", "Hammam e spa"],
    certifications: ["Guida Culturale Certificata", "Esperta Artigianato", "Corso Cucina Professionale"],
  },
  {
    id: "youssef",
    name: "Youssef Tazi",
    specialization: "Avventura & Natura",
    experience: "15 anni",
    languages: ["Inglese", "Francese", "Tedesco", "Arabo", "Berbero"],
    rating: 4.9,
    reviews: 312,
    price: 55,
    image: "/images/guides/youssef-guide.png",
    description: "Guida esperta per trekking nell'Atlante e escursioni nel deserto del Sahara.",
    specialties: ["Trekking Atlante", "Deserto Sahara", "Fotografia naturalistica", "Astronomia"],
    certifications: ["Guida Alpina Certificata", "Primo Soccorso Avanzato", "Guida Desertica"],
  },
  {
    id: "fatima",
    name: "Fatima Ouali",
    specialization: "Gastronomia & Mercati",
    experience: "6 anni",
    languages: ["Italiano", "Francese", "Inglese", "Arabo"],
    rating: 4.7,
    reviews: 156,
    price: 35,
    image: "/images/guides/fatima-guide.png",
    description: "Chef professionista e guida gastronomica, esperta di cucina marocchina autentica.",
    specialties: ["Tour gastronomici", "Mercati locali", "Corsi di cucina", "Prodotti tipici"],
    certifications: ["Chef Professionale", "Guida Gastronomica", "Igiene Alimentare"],
  },
]

const tourTypes = [
  {
    id: "city",
    name: "Tour Città",
    duration: "4-8 ore",
    price: "da €35",
    description: "Esplora le medine, i monumenti storici e i quartieri moderni",
    icon: Building,
    features: ["Medina e souks", "Monumenti storici", "Quartieri moderni", "Trasporti inclusi"],
  },
  {
    id: "cultural",
    name: "Tour Culturale",
    duration: "6-10 ore",
    price: "da €45",
    description: "Immergiti nella cultura e nelle tradizioni marocchine",
    icon: Award,
    features: ["Artigiani locali", "Case tradizionali", "Cerimonie del tè", "Musica e danze"],
  },
  {
    id: "adventure",
    name: "Tour Avventura",
    duration: "1-3 giorni",
    price: "da €55",
    description: "Trekking, deserto e attività all'aria aperta",
    icon: Mountain,
    features: ["Trekking guidato", "Escursioni deserto", "Campeggio", "Attività outdoor"],
  },
  {
    id: "food",
    name: "Tour Gastronomico",
    duration: "3-5 ore",
    price: "da €35",
    description: "Scopri i sapori autentici della cucina marocchina",
    icon: Utensils,
    features: ["Mercati locali", "Degustazioni", "Corsi di cucina", "Ristoranti tipici"],
  },
]

const testimonials = [
  {
    name: "Elena Marchetti",
    location: "Roma, Italia",
    guide: "Hassan El Amrani",
    rating: 5,
    comment:
      "Hassan è stato una guida eccezionale! La sua conoscenza della storia di Fes è impressionante. Ci ha fatto scoprire angoli nascosti che non avremmo mai trovato da soli.",
    date: "20 Gennaio 2024",
  },
  {
    name: "Jean-Pierre Martin",
    location: "Lyon, France",
    guide: "Youssef Tazi",
    rating: 5,
    comment:
      "Expérience incroyable dans le désert avec Youssef! Guide très professionnel et passionné. Les photos du coucher de soleil sont magnifiques.",
    date: "15 Gennaio 2024",
  },
  {
    name: "Maria González",
    location: "Madrid, España",
    guide: "Aicha Benali",
    rating: 5,
    comment:
      "Aicha nos enseñó la verdadera cultura marroquí. Visitamos talleres de artesanos y aprendimos sobre las tradiciones beréberes. ¡Inolvidable!",
    date: "10 Gennaio 2024",
  },
]

export default function GuidePrivateClientPage() {
  const [selectedGuide, setSelectedGuide] = useState(guides[0])
  const [selectedTour, setSelectedTour] = useState(tourTypes[0])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="min-h-screen bg-background">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <User className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Guide Private <span className="text-blue-600 dark:text-blue-400">Esperte</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Scopri il Marocco autentico con le nostre guide locali certificate. Esperienze personalizzate e
                conoscenza approfondita della cultura marocchina.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Guide certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Multilingue</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Esperienza locale</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guide Selection */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Le Nostre Guide Esperte</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Professionisti certificati con anni di esperienza e passione per il Marocco
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {guides.map((guide) => (
                <Card
                  key={guide.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    selectedGuide.id === guide.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-lg"
                  }`}
                  onClick={() => setSelectedGuide(guide)}
                >
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <User className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-lg">{guide.name}</CardTitle>
                    <CardDescription>{guide.specialization}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{guide.rating}</span>
                      <span className="text-sm text-muted-foreground">({guide.reviews})</span>
                    </div>

                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      €{guide.price}/giorno
                    </div>

                    <div className="text-sm text-muted-foreground mb-4">{guide.experience} di esperienza</div>

                    <div className="flex flex-wrap gap-1 justify-center">
                      {guide.languages.slice(0, 3).map((lang, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white dark:bg-orange-900/40 dark:text-orange-200 shadow-sm transition-colors"
                        >
                          {lang}
                        </Badge>
                      ))}
                      {guide.languages.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white dark:bg-orange-900/40 dark:text-orange-200 shadow-sm transition-colors"
                        >
                          +{guide.languages.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Guide Details */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <User className="h-6 w-6 text-blue-600" />
                  {selectedGuide.name} - Profilo Dettagliato
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-muted-foreground mb-6">{selectedGuide.description}</p>

                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-blue-600" />
                      Specializzazioni:
                    </h4>
                    <ul className="space-y-2 mb-6">
                      {selectedGuide.specialties.map((specialty, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{specialty}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Languages className="h-5 w-5 text-blue-600" />
                      Lingue Parlate:
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedGuide.languages.map((lang, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white dark:bg-orange-900/40 dark:text-orange-200 shadow-sm transition-colors"
                        >
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4">Certificazioni:</h4>
                      <ul className="space-y-2 text-sm">
                        {selectedGuide.certifications.map((cert, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-blue-600" />
                            <span>{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold">Tariffa giornaliera:</span>
                        <span className="text-2xl font-bold text-blue-600">€{selectedGuide.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Include: Guida per 8 ore, trasporti locali, assistenza completa
                      </p>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Prenota {selectedGuide.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Tipi di Tour Disponibili</h2>
              <p className="text-lg text-muted-foreground">Scegli l'esperienza che fa per te</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {tourTypes.map((tour) => {
                const IconComponent = tour.icon
                return (
                  <Card key={tour.id} className="hover:shadow-lg transition-shadow bg-card">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle className="text-xl text-card-foreground">{tour.name}</CardTitle>
                      <CardDescription>{tour.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{tour.price}</div>
                        <div className="text-sm text-muted-foreground">Durata: {tour.duration}</div>
                      </div>

                      <ul className="space-y-2 text-sm mb-6">
                        {tour.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button variant="outline" className="w-full bg-transparent">
                        Scopri di Più
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Esperienze dei Nostri Clienti</h2>
              <p className="text-lg text-muted-foreground">Recensioni autentiche sui nostre servizi di guida</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>

                    <div className="border-t pt-4">
                      <p className="font-medium text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      <p className="text-sm text-blue-600">Guida: {testimonial.guide}</p>
                      <p className="text-xs text-muted-foreground mt-1">{testimonial.date}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Prenota la Tua Guida Privata</h2>
            <p className="text-xl text-blue-100 mb-8">
              Esperienze personalizzate • Guide certificate • Disponibilità immediata
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                <Phone className="mr-2 h-5 w-5" />
                Chiama: +212 123 456 789
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Richiedi Preventivo
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
