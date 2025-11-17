"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Heart, Plane, Phone, CheckCircle, X, CreditCard, ArrowRight, Star, Briefcase } from "lucide-react"
import WishlistButton from "@/components/WishlistButton"

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Assicurazioni Viaggio Marocco",
  description: "Assicurazioni viaggio complete per il Marocco con copertura medica, bagagli e annullamento",
  provider: {
    "@type": "Organization",
    name: "Morocco Dreams",
  },
  areaServed: "Morocco",
  offers: [
    {
      "@type": "Offer",
      name: "Piano Essenziale",
      price: "15",
      priceCurrency: "EUR",
    },
    {
      "@type": "Offer",
      name: "Piano Completo",
      price: "35",
      priceCurrency: "EUR",
    },
    {
      "@type": "Offer",
      name: "Piano Premium",
      price: "65",
      priceCurrency: "EUR",
    },
  ],
}

const insurancePlans = [
  {
    id: "essential",
    name: "Essenziale",
    description: "Protezione base per viaggi brevi",
    price: 15,
    duration: "fino a 7 giorni",
    coverage: 50000,
    popular: false,
    features: [
      "Spese mediche di emergenza",
      "Rimpatrio sanitario",
      "Bagaglio smarrito (€500)",
      "Annullamento viaggio (€1.000)",
      "Assistenza telefonica 24/7",
    ],
    notIncluded: [
      "Attività sportive estreme",
      "Malattie preesistenti",
      "Ritardi voli oltre 4h",
      "Responsabilità civile",
    ],
  },
  {
    id: "complete",
    name: "Completa",
    description: "Protezione completa per ogni esigenza",
    price: 35,
    duration: "fino a 30 giorni",
    coverage: 100000,
    popular: true,
    features: [
      "Spese mediche di emergenza",
      "Rimpatrio sanitario",
      "Bagaglio smarrito (€1.500)",
      "Annullamento viaggio (€5.000)",
      "Ritardi e cancellazioni voli",
      "Responsabilità civile (€50.000)",
      "Assistenza legale",
      "Spese di prolungamento soggiorno",
    ],
    notIncluded: ["Attività sportive estreme", "Danni da alcol/droghe", "Guerra e terrorismo"],
  },
  {
    id: "premium",
    name: "Premium",
    description: "Massima protezione per viaggi di lusso",
    price: 65,
    duration: "fino a 90 giorni",
    coverage: 200000,
    popular: false,
    features: [
      "Spese mediche di emergenza",
      "Rimpatrio sanitario",
      "Bagaglio smarrito (€3.000)",
      "Annullamento viaggio (€10.000)",
      "Ritardi e cancellazioni voli",
      "Responsabilità civile (€100.000)",
      "Assistenza legale premium",
      "Spese di prolungamento soggiorno",
      "Attività sportive incluse",
      "Malattie preesistenti coperte",
      "Concierge service 24/7",
    ],
    notIncluded: ["Danni intenzionali", "Guerra dichiarata", "Attività illegali"],
  },
]

const coverageTypes = [
  {
    icon: Heart,
    title: "Assistenza Medica",
    description: "Spese mediche, ospedalizzazione e rimpatrio sanitario",
    details: [
      "Consulti medici e visite specialistiche",
      "Ricoveri ospedalieri e interventi chirurgici",
      "Farmaci prescritti e cure dentarie d'emergenza",
      "Rimpatrio sanitario con aereo ambulanza",
    ],
  },
  {
    icon: Plane,
    title: "Viaggio e Trasporti",
    description: "Annullamenti, ritardi e problemi di viaggio",
    details: [
      "Rimborso per annullamento viaggio",
      "Spese per ritardi e cancellazioni voli",
      "Perdita coincidenze e overbooking",
      "Rientro anticipato per emergenze familiari",
    ],
  },
  {
    icon: Briefcase,
    title: "Bagagli e Effetti",
    description: "Protezione per bagagli e oggetti personali",
    details: [
      "Smarrimento, furto o danneggiamento bagagli",
      "Ritardo nella consegna bagagli",
      "Documenti di viaggio smarriti",
      "Oggetti di valore e apparecchiature elettroniche",
    ],
  },
  {
    icon: Shield,
    title: "Responsabilità Civile",
    description: "Copertura per danni a terzi durante il viaggio",
    details: [
      "Danni involontari a persone",
      "Danni a proprietà di terzi",
      "Spese legali e di difesa",
      "Risarcimenti fino alla somma assicurata",
    ],
  },
]

const testimonials = [
  {
    name: "Giulia Romano",
    location: "Torino, Italia",
    plan: "Completa",
    rating: 5,
    comment:
      "Grazie all'assicurazione ho evitato spese enormi quando mio figlio si è rotto il braccio a Marrakech. Assistenza impeccabile e rimborso veloce.",
    incident: "Emergenza medica",
    date: "28 Gennaio 2024",
  },
  {
    name: "François Leroy",
    location: "Marseille, France",
    plan: "Premium",
    rating: 5,
    comment:
      "Vol annulé à cause d'une grève, l'assurance a couvert tous les frais d'hôtel et de repas. Service client très réactif.",
    incident: "Volo cancellato",
    date: "22 Gennaio 2024",
  },
  {
    name: "David Smith",
    location: "Manchester, UK",
    plan: "Essenziale",
    rating: 4,
    comment: "Lost luggage was covered quickly. The 24/7 helpline was very helpful in guiding me through the process.",
    incident: "Bagaglio smarrito",
    date: "15 Gennaio 2024",
  },
]

const faqData = [
  {
    question: "Quando devo acquistare l'assicurazione?",
    answer:
      "Ti consigliamo di acquistare l'assicurazione entro 7 giorni dalla prenotazione del viaggio per avere la copertura completa per l'annullamento.",
  },
  {
    question: "Cosa fare in caso di emergenza?",
    answer:
      "Contatta immediatamente il nostro numero di emergenza 24/7: +39 800 123 456. Il nostro team ti assisterà in italiano e organizzerà l'intervento necessario.",
  },
  {
    question: "Come richiedere un rimborso?",
    answer:
      "Puoi richiedere il rimborso online tramite il nostro portale, allegando tutta la documentazione necessaria. I rimborsi vengono elaborati entro 15 giorni lavorativi.",
  },
  {
    question: "Le attività sportive sono coperte?",
    answer:
      "Le attività sportive ricreative sono incluse nei piani Completa e Premium. Per sport estremi è necessaria una copertura aggiuntiva.",
  },
]

export default function AssicurazioniClientPage() {
  const [selectedPlan, setSelectedPlan] = useState(insurancePlans[1])
  const [activeTab, setActiveTab] = useState("plans")

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="min-h-screen bg-background">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Assicurazioni <span className="text-blue-600 dark:text-blue-400">Viaggio</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Viaggia in Marocco con la massima tranquillità. Protezione completa per te e la tua famiglia con
                coperture fino a €200.000 e assistenza 24/7 in italiano.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Assistenza 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Rimborsi rapidi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Copertura mondiale</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Plans */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Scegli il Tuo Piano</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tre livelli di protezione per ogni tipo di viaggio e budget
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {insurancePlans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    selectedPlan.id === plan.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-lg"
                  } ${plan.popular ? "border-blue-500" : ""}`}
                  onClick={() => setSelectedPlan(plan)}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white px-4 py-1">Più Popolare</Badge>
                    </div>
                  )}
                  
                  {/* Wishlist Button */}
                  <div className="absolute top-2 right-2 z-10" onClick={(e) => e.stopPropagation()}>
                    <WishlistButton
                      itemId={`insurance-${plan.id}`}
                      itemType="service"
                      itemTitle={`Assicurazione ${plan.name}`}
                      itemPrice={plan.price}
                      itemDescription={plan.description}
                    />
                  </div>

                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-2xl text-foreground">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="text-center">
                    <div className="mb-6">
                      <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">€{plan.price}</div>
                      <p className="text-sm text-muted-foreground">{plan.duration}</p>
                      <p className="text-sm font-medium text-foreground mt-2">
                        Copertura fino a €{plan.coverage.toLocaleString()}
                      </p>
                    </div>

                    <ul className="space-y-2 text-sm text-left mb-6">
                      {plan.features.slice(0, 5).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {plan.features.length > 5 && (
                        <li className="text-blue-600 dark:text-blue-400 font-medium">
                          +{plan.features.length - 5} altri servizi
                        </li>
                      )}
                    </ul>

                    <Button
                      className={`w-full ${
                        plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-700"
                      }`}
                    >
                      Scegli {plan.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Plan Details */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3 text-foreground">
                  <Shield className="h-6 w-6 text-blue-600" />
                  Piano {selectedPlan.name} - Dettagli Completi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4 text-green-600 dark:text-green-400 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Servizi Inclusi:
                    </h4>
                    <ul className="space-y-2 mb-6">
                      {selectedPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4 text-red-600 dark:text-red-400 flex items-center gap-2">
                      <X className="h-5 w-5" />
                      Esclusioni:
                    </h4>
                    <ul className="space-y-2 mb-6">
                      {selectedPlan.notIncluded.map((exclusion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{exclusion}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-foreground">Prezzo totale:</span>
                        <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                          €{selectedPlan.price}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Copertura: €{selectedPlan.coverage.toLocaleString()} • {selectedPlan.duration}
                      </p>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Acquista Piano {selectedPlan.name}
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Tipi di Copertura</h2>
              <p className="text-lg text-muted-foreground">Protezione completa per ogni aspetto del tuo viaggio</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coverageTypes.map((coverage, index) => {
                const IconComponent = coverage.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow bg-card">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle className="text-lg text-card-foreground">{coverage.title}</CardTitle>
                      <CardDescription>{coverage.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {coverage.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Storie di Successo</h2>
              <p className="text-lg text-muted-foreground">
                Come abbiamo aiutato i nostri clienti in situazioni di emergenza
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <Badge
                      variant="secondary"
                      className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {testimonial.incident}
                    </Badge>

                    <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>

                    <div className="border-t pt-4">
                      <p className="font-medium text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Piano: {testimonial.plan}</p>
                      <p className="text-xs text-muted-foreground mt-1">{testimonial.date}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Domande Frequenti</h2>
              <p className="text-lg text-muted-foreground">
                Risposte alle domande più comuni sulle nostre assicurazioni
              </p>
            </div>

            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <Card key={index} className="bg-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3 text-card-foreground">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Proteggi il Tuo Viaggio Ora</h2>
            <p className="text-xl text-blue-100 mb-8">
              Assistenza 24/7 in italiano • Rimborsi rapidi • Copertura mondiale
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                <Phone className="mr-2 h-5 w-5" />
                Emergenze: +39 800 123 456
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Acquista Assicurazione
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
