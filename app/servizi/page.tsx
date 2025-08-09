"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, Users, Shield, MapPin, Phone, Star, CheckCircle, ArrowRight, Clock, UserCheck } from "lucide-react"

const services = [
  {
    id: "trasferimenti",
    title: "Trasferimenti",
    description: "Servizi di trasporto professionale dall'aeroporto al tuo hotel",
    icon: Car,
    href: "/servizi/trasferimenti",
    price: "da €25",
    features: ["Disponibile 24/7", "Meet & Greet", "Veicoli moderni", "Autisti professionali"],
    color: "orange",
    image: "/images/services/airport-transfer-morocco.png",
  },
  {
    id: "noleggio-auto",
    title: "Noleggio Auto",
    description: "Flotta moderna per esplorare il Marocco in totale libertà",
    icon: Car,
    href: "/servizi/noleggio-auto",
    price: "da €18/giorno",
    features: ["Km illimitati", "Assicurazione inclusa", "Assistenza 24/7", "Consegna aeroporto"],
    color: "green",
    image: "/images/services/car-rental-morocco.png",
  },
  {
    id: "guide-private",
    title: "Guide Private",
    description: "Guide esperte locali per un'esperienza autentica e personalizzata",
    icon: UserCheck,
    href: "/servizi/guide-private",
    price: "da €80/giorno",
    features: ["Guide certificate", "Lingue multiple", "Conoscenza locale", "Flessibilità totale"],
    color: "blue",
    image: "/images/services/private-guide-morocco.png",
  },
  {
    id: "assicurazioni",
    title: "Assicurazioni Viaggio",
    description: "Protezione completa per viaggiare in sicurezza e serenità",
    icon: Shield,
    href: "/servizi/assicurazioni",
    price: "da €15",
    features: ["Copertura medica", "Annullamento viaggio", "Bagagli protetti", "Assistenza H24"],
    color: "purple",
    image: "/images/services/travel-insurance-morocco.png",
  },
]

const testimonials = [
  {
    name: "Marco Rossi",
    location: "Milano, Italia",
    service: "Trasferimenti + Guida Privata",
    rating: 5,
    comment:
      "Servizio impeccabile dall'inizio alla fine. La guida Hassan è stata fantastica, ci ha fatto scoprire angoli nascosti di Marrakech che non avremmo mai trovato da soli.",
    date: "20 Gennaio 2024",
  },
  {
    name: "Sophie Dubois",
    location: "Paris, France",
    service: "Noleggio Auto",
    rating: 5,
    comment:
      "Voiture parfaite pour notre road trip au Maroc. Service client excellent et véhicule en parfait état. Je recommande vivement!",
    date: "15 Gennaio 2024",
  },
  {
    name: "James Wilson",
    location: "London, UK",
    service: "Pacchetto Completo",
    rating: 5,
    comment:
      "Amazing experience! From airport pickup to guided tours, everything was perfectly organized. Morocco Dreams made our trip unforgettable.",
    date: "10 Gennaio 2024",
  },
]

const advantages = [
  {
    icon: CheckCircle,
    title: "Qualità Garantita",
    description: "Servizi certificati e partner affidabili selezionati con cura",
  },
  {
    icon: Clock,
    title: "Disponibilità 24/7",
    description: "Assistenza continua durante tutto il tuo soggiorno in Marocco",
  },
  {
    icon: Users,
    title: "Team Locale",
    description: "Staff marocchino esperto che conosce ogni angolo del paese",
  },
  {
    icon: Shield,
    title: "Sicurezza Totale",
    description: "Tutti i servizi sono assicurati e rispettano gli standard internazionali",
  },
]

export default function ServiziPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                <Users className="h-12 w-12 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              I Nostri <span className="text-orange-600 dark:text-orange-400">Servizi</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Servizi professionali per rendere il tuo viaggio in Marocco indimenticabile. Dalla pianificazione al
              ritorno a casa, ci occupiamo di ogni dettaglio.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Servizi certificati</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Assistenza 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Prezzi trasparenti</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Scegli il Servizio Perfetto
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ogni servizio è progettato per offrirti la massima comodità e sicurezza durante il tuo viaggio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardHeader className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          service.color === "orange"
                            ? "bg-orange-100 dark:bg-orange-900/30"
                            : service.color === "green"
                              ? "bg-green-100 dark:bg-green-900/30"
                              : service.color === "blue"
                                ? "bg-blue-100 dark:bg-blue-900/30"
                                : "bg-purple-100 dark:bg-purple-900/30"
                        }`}
                      >
                        <service.icon
                          className={`h-8 w-8 ${
                            service.color === "orange"
                              ? "text-orange-600 dark:text-orange-400"
                              : service.color === "green"
                                ? "text-green-600 dark:text-green-400"
                                : service.color === "blue"
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-purple-600 dark:text-purple-400"
                          }`}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                        <CardDescription className="text-base">{service.description}</CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`${
                        service.color === "orange"
                          ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                          : service.color === "green"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : service.color === "blue"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                              : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                      }`}
                    >
                      {service.price}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Link href={service.href}>
                        <Button
                          className={`w-full group-hover:scale-105 transition-transform duration-200 ${
                            service.color === "orange"
                              ? "bg-orange-600 hover:bg-orange-700"
                              : service.color === "green"
                                ? "bg-green-600 hover:bg-green-700"
                                : service.color === "blue"
                                  ? "bg-blue-600 hover:bg-blue-700"
                                  : "bg-purple-600 hover:bg-purple-700"
                          }`}
                        >
                          Scopri {service.title}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Perché Scegliere Morocco Dreams
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              La nostra esperienza e dedizione fanno la differenza
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <advantage.icon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{advantage.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Cosa Dicono i Nostri Clienti
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Recensioni autentiche sui nostri servizi</p>
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

                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.comment}"</p>

                  <div className="border-t pt-4">
                    <p className="font-medium text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                    <p className="text-sm text-orange-600 dark:text-orange-400">Servizio: {testimonial.service}</p>
                    <p className="text-xs text-gray-400 mt-1">{testimonial.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Hai Bisogno di Aiuto?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Il nostro team è sempre disponibile per consigliarti il servizio più adatto alle tue esigenze
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contatti">
              <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
                <Phone className="mr-2 h-5 w-5" />
                Contattaci Ora
              </Button>
            </Link>
            <Link href="/contatti">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Richiedi Preventivo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
