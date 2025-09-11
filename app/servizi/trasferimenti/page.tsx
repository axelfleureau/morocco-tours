"use client"

import { useState } from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Clock, Users, Shield, MapPin, Phone, Star, CheckCircle, ArrowRight } from "lucide-react"

const transferTypes = [
  {
    id: "economy",
    name: "Economy",
    description: "Trasferimenti convenienti e affidabili",
    vehicles: ["Dacia Logan", "Renault Symbol", "Hyundai i10"],
    capacity: "1-3 persone",
    luggage: "2 valigie medie",
    price: 25,
    features: ["Aria condizionata", "Autista professionale", "Meet & Greet"],
    image: "/images/services/economy-transfer.png",
  },
  {
    id: "comfort",
    name: "Comfort",
    description: "Il giusto equilibrio tra comfort e prezzo",
    vehicles: ["Toyota Corolla", "Volkswagen Jetta", "Nissan Sentra"],
    capacity: "1-4 persone",
    luggage: "3 valigie grandi",
    price: 45,
    features: ["Aria condizionata", "Sedili in pelle", "WiFi gratuito", "Acqua in omaggio"],
    image: "/images/services/comfort-transfer.png",
  },
  {
    id: "premium",
    name: "Premium",
    description: "Lusso e comfort per viaggi indimenticabili",
    vehicles: ["BMW Serie 3", "Mercedes Classe C", "Audi A4"],
    capacity: "1-4 persone",
    luggage: "4 valigie grandi",
    price: 85,
    features: ["Interni in pelle", "WiFi premium", "Snack e bevande", "Giornali internazionali"],
    image: "/images/services/premium-transfer.png",
  },
  {
    id: "van",
    name: "Van/Minibus",
    description: "Perfetto per gruppi e famiglie numerose",
    vehicles: ["Mercedes Vito", "Volkswagen Crafter", "Ford Transit"],
    capacity: "5-8 persone",
    luggage: "8+ valigie",
    price: 120,
    features: ["Spazio extra", "Aria condizionata", "Porte scorrevoli", "Bagagliaio ampio"],
    image: "/images/services/van-transfer.png",
  },
]

const routes = [
  { from: "Aeroporto Casablanca", to: "Centro Casablanca", duration: "45 min", price: 25 },
  { from: "Aeroporto Marrakech", to: "Medina Marrakech", duration: "30 min", price: 20 },
  { from: "Aeroporto Fes", to: "Centro Fes", duration: "25 min", price: 18 },
  { from: "Marrakech", to: "Essaouira", duration: "2h 30min", price: 120 },
  { from: "Casablanca", to: "Rabat", duration: "1h 15min", price: 65 },
  { from: "Fes", to: "Chefchaouen", duration: "4h", price: 180 },
]

const testimonials = [
  {
    name: "Marco Rossi",
    location: "Milano, Italia",
    rating: 5,
    comment: "Servizio impeccabile! Autista puntuale e molto professionale. Auto pulita e confortevole.",
    date: "15 Gennaio 2024",
  },
  {
    name: "Sarah Johnson",
    location: "London, UK",
    rating: 5,
    comment: "Excellent service from airport to hotel. Driver was waiting with name sign and helped with luggage.",
    date: "8 Gennaio 2024",
  },
  {
    name: "Pierre Dubois",
    location: "Paris, France",
    rating: 5,
    comment: "Transfer parfait! Véhicule moderne et chauffeur très sympa. Je recommande vivement.",
    date: "22 Dicembre 2023",
  },
]

export default function TrasferimentiPage() {
  const [selectedTransfer, setSelectedTransfer] = useState(transferTypes[0])

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-orange-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                <Car className="h-12 w-12 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
              Trasferimenti <span className="text-orange-600 dark:text-orange-400">Premium</span>
            </h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-8">
              Viaggia in comfort e sicurezza con i nostri servizi di trasferimento professionale. Dall'aeroporto al tuo
              hotel, ovunque tu voglia andare in Marocco.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Disponibile 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Meet & Greet incluso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Cancellazione gratuita</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Scegli il Tuo Trasferimento
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Offriamo diverse categorie di veicoli per soddisfare ogni esigenza e budget
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {transferTypes.map((transfer) => (
              <Card
                key={transfer.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl bg-[var(--card-bg)] border-[var(--card-border)] ${
                  selectedTransfer.id === transfer.id ? "ring-2 ring-orange-500 shadow-lg" : "hover:shadow-lg"
                }`}
                onClick={() => setSelectedTransfer(transfer)}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                    <Car className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle className="text-xl text-[var(--text-primary)]">{transfer.name}</CardTitle>
                  <CardDescription className="text-[var(--text-secondary)]">{transfer.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">€{transfer.price}</div>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">da aeroporto a città</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Users className="h-4 w-4 text-[var(--text-secondary)]" />
                      <span className="text-[var(--text-secondary)]">{transfer.capacity}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Shield className="h-4 w-4 text-[var(--text-secondary)]" />
                      <span className="text-[var(--text-secondary)]">{transfer.luggage}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mb-12 bg-[var(--card-bg)] border-[var(--card-border)]">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3 text-[var(--text-primary)]">
                <Car className="h-6 w-6 text-orange-600" />
                {selectedTransfer.name} - Dettagli
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4 text-[var(--text-primary)]">Veicoli Disponibili:</h4>
                  <ul className="space-y-2 mb-6">
                    {selectedTransfer.vehicles.map((vehicle, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-[var(--text-secondary)]">{vehicle}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-semibold mb-4 text-[var(--text-primary)]">Servizi Inclusi:</h4>
                  <ul className="space-y-2">
                    {selectedTransfer.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-[var(--text-secondary)]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4 text-[var(--text-primary)]">Informazioni Importanti:</h4>
                    <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                      <li>• Prenotazione confermata entro 2 ore</li>
                      <li>• Autista ti aspetta con cartello nominativo</li>
                      <li>• Assistenza bagagli inclusa</li>
                      <li>• Monitoraggio voli in tempo reale</li>
                      <li>• Cancellazione gratuita fino a 24h prima</li>
                    </ul>
                  </div>

                  <Link href="/contatti">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      Prenota {selectedTransfer.name} - €{selectedTransfer.price}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">Rotte Popolari</h2>
            <p className="text-lg text-[var(--text-secondary)]">Le destinazioni più richieste dai nostri clienti</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow bg-[var(--card-bg)] border-[var(--card-border)]"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-orange-600" />
                        <span className="font-medium text-[var(--text-primary)]">{route.from}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                        <ArrowRight className="h-4 w-4" />
                        <span>{route.to}</span>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                    >
                      €{route.price}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-4">
                    <Clock className="h-4 w-4" />
                    <span>Durata: {route.duration}</span>
                  </div>

                  <Link href="/contatti">
                    <Button
                      variant="outline"
                      className="w-full bg-transparent border-[var(--card-border)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                    >
                      Prenota Trasferimento
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Cosa Dicono i Nostri Clienti
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">Recensioni autentiche dai nostri viaggiatori</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow bg-[var(--card-bg)] border-[var(--card-border)]"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-[var(--text-secondary)] mb-4 italic">"{testimonial.comment}"</p>

                  <div className="border-t border-[var(--card-border)] pt-4">
                    <p className="font-medium text-[var(--text-primary)]">{testimonial.name}</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {testimonial.location} • {testimonial.date}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-orange-600 to-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Prenota il Tuo Trasferimento Ora</h2>
          <p className="text-xl text-orange-100 mb-8">
            Servizio disponibile 24/7 • Conferma immediata • Cancellazione gratuita
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contatti">
              <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
                <Phone className="mr-2 h-5 w-5" />
                Chiama Ora: +39 329 233 3370
              </Button>
            </Link>
            <Link href="/contatti">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
              >
                Prenota Online
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
