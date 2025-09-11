"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Car,
  Users,
  Fuel,
  Settings,
  CheckCircle,
  X,
  MapPin,
  Calendar,
  Phone,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react"

const carCategories = [
  {
    id: "economy",
    name: "Economica",
    description: "Perfetta per la città e viaggi brevi",
    pricePerDay: 30,
    cars: [
      {
        model: "Dacia Sandero 2023",
        transmission: "Manuale",
        fuel: "Benzina",
        seats: 5,
        doors: 5,
        ac: true,
        consumption: "5.2L/100km",
        image: "/images/cars/dacia-sandero.png",
      },
      {
        model: "Renault Clio 2022",
        transmission: "Manuale",
        fuel: "Benzina",
        seats: 5,
        doors: 5,
        ac: true,
        consumption: "4.8L/100km",
        image: "/images/cars/renault-clio.png",
      },
    ],
  },
  {
    id: "suv",
    name: "SUV",
    description: "Spazio e versatilità per famiglie",
    pricePerDay: 45,
    cars: [
      {
        model: "Dacia Duster 2023",
        transmission: "Manuale",
        fuel: "Benzina",
        seats: 5,
        doors: 5,
        ac: true,
        consumption: "6.8L/100km",
        image: "/images/cars/dacia-duster.png",
      },
      {
        model: "Hyundai Tucson 2022",
        transmission: "Automatica",
        fuel: "Diesel",
        seats: 5,
        doors: 5,
        ac: true,
        consumption: "5.9L/100km",
        image: "/images/cars/hyundai-tucson.png",
      },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    description: "Lusso e comfort per viaggi speciali",
    pricePerDay: 85,
    cars: [
      {
        model: "BMW Serie 3 2023",
        transmission: "Automatica",
        fuel: "Diesel",
        seats: 5,
        doors: 4,
        ac: true,
        consumption: "4.5L/100km",
        image: "/images/cars/bmw-serie3.png",
      },
      {
        model: "Mercedes Classe C 2022",
        transmission: "Automatica",
        fuel: "Benzina",
        seats: 5,
        doors: 4,
        ac: true,
        consumption: "6.2L/100km",
        image: "/images/cars/mercedes-classec.png",
      },
    ],
  },
]

const includedServices = [
  "Assicurazione base inclusa",
  "Chilometraggio illimitato",
  "Assistenza stradale 24/7",
  "Secondo guidatore gratuito",
  "Consegna/ritiro aeroporto",
  "GPS incluso",
  "Seggiolini bambini disponibili",
  "Cancellazione gratuita 24h",
]

const notIncluded = [
  "Carburante",
  "Pedaggi autostradali",
  "Parcheggi",
  "Multe e infrazioni",
  "Assicurazione kasko completa",
  "Equipaggiamento sportivo",
  "Catene da neve",
  "Pulizia extra",
]

const locations = [
  { city: "Casablanca", airport: "Aeroporto Mohammed V", address: "Terminal 1 - Arrivi" },
  { city: "Marrakech", airport: "Aeroporto Menara", address: "Hall Arrivi - Desk Morocco Dreams" },
  { city: "Fes", airport: "Aeroporto Fes-Saïs", address: "Area Noleggio Auto" },
  { city: "Agadir", airport: "Aeroporto Al Massira", address: "Terminal Principale" },
  { city: "Tangeri", airport: "Aeroporto Ibn Battouta", address: "Zona Ritiro Auto" },
  { city: "Rabat", airport: "Centro Città", address: "Via Hassan II, 45" },
]

const testimonials = [
  {
    name: "Andrea Bianchi",
    location: "Milano, Italia",
    car: "Dacia Duster",
    rating: 5,
    comment:
      "Auto perfetta per il nostro tour del Marocco! Spaziosa, affidabile e consumi contenuti. Servizio clienti eccellente.",
    date: "25 Gennaio 2024",
  },
  {
    name: "Sophie Dubois",
    location: "Paris, France",
    car: "Volkswagen Golf",
    rating: 5,
    comment:
      "Voiture impeccable, très propre et bien entretenue. Personnel très professionnel à l'aéroport de Casablanca.",
    date: "18 Gennaio 2024",
  },
  {
    name: "James Wilson",
    location: "London, UK",
    car: "BMW Serie 3",
    rating: 5,
    comment:
      "Luxury car in perfect condition. Smooth rental process and excellent customer service throughout our trip.",
    date: "12 Gennaio 2024",
  },
]

export default function NoleggioAutoPage() {
  const [selectedCategory, setSelectedCategory] = useState(carCategories[0])
  const [selectedCar, setSelectedCar] = useState(carCategories[0].cars[0])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                <Car className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Noleggio Auto <span className="text-green-600 dark:text-green-400">Premium</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Esplora il Marocco in totale libertà con la nostra flotta moderna e affidabile. Veicoli per ogni esigenza,
              dai €30 al giorno.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Flotta 2020-2024</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Km illimitati</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Assistenza 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Car Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Scegli la Tua Categoria
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Veicoli moderni e ben mantenuti per ogni tipo di viaggio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {carCategories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  selectedCategory.id === category.id ? "ring-2 ring-green-500 shadow-lg" : "hover:shadow-lg"
                }`}
                onClick={() => {
                  setSelectedCategory(category)
                  setSelectedCar(category.cars[0])
                }}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <Car className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-xl">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    €{category.pricePerDay}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">al giorno</p>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                  >
                    {category.cars.length} modelli disponibili
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Category Cars */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Car className="h-6 w-6 text-green-600" />
                Categoria {selectedCategory.name} - Veicoli Disponibili
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {selectedCategory.cars.map((car, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedCar.model === car.model
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-green-300"
                    }`}
                    onClick={() => setSelectedCar(car)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{car.model}</h3>
                      <Badge variant="outline" className="border-green-200">
                        {car.transmission}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>{car.seats} posti</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-gray-400" />
                        <span>{car.doors} porte</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Fuel className="h-4 w-4 text-gray-400" />
                        <span>{car.fuel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-gray-400" />
                        <span>{car.consumption}</span>
                      </div>
                    </div>

                    {car.ac && (
                      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                        <CheckCircle className="h-4 w-4" />
                        <span>Aria condizionata</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{selectedCar.model}</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedCar.transmission} • {selectedCar.fuel} • {selectedCar.seats} posti
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      €{selectedCategory.pricePerDay}
                    </div>
                    <p className="text-sm text-gray-500">al giorno</p>
                  </div>
                </div>

                <Link href="/contatti">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Prenota {selectedCar.model}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Included/Not Included */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Cosa è Incluso</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Servizi compresi nel prezzo e servizi aggiuntivi</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-green-600 dark:text-green-400 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Servizi Inclusi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {includedServices.map((service, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-red-600 dark:text-red-400 flex items-center gap-2">
                  <X className="h-5 w-5" />
                  Non Incluso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {notIncluded.map((service, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pickup Locations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Punti di Ritiro</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Ritira la tua auto in aeroporto o in città</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">{location.city}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{location.airport}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{location.address}</p>

                  <Link href="/contatti">
                    <Button variant="outline" className="w-full bg-transparent">
                      Seleziona Punto di Ritiro
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Recensioni dei Clienti
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Esperienze reali con il nostro servizio di noleggio
            </p>
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
                    <p className="text-sm text-green-600 dark:text-green-400">Auto: {testimonial.car}</p>
                    <p className="text-xs text-gray-400 mt-1">{testimonial.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Prenota la Tua Auto Ora</h2>
          <p className="text-xl text-green-100 mb-8">Flotta moderna • Prezzi competitivi • Prenotazione immediata</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contatti">
              <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-green-50">
                <Phone className="mr-2 h-5 w-5" />
                Chiama: +39 329 233 3370
              </Button>
            </Link>
            <Link href="/contatti">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Prenota Online
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
