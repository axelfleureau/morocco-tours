"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, Users, Star, ArrowRight, Filter } from "lucide-react"

export default function PopularTrips() {
  const [activeTrip, setActiveTrip] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("Tutti")
  const [selectedStyle, setSelectedStyle] = useState("Tutti")

  const trips = [
    {
      id: 1,
      title: "Tour delle Città Imperiali",
      subtitle: "Marrakech • Fes • Meknes • Rabat",
      duration: "8 giorni / 7 notti",
      price: "€890",
      originalPrice: "€1090",
      rating: 4.9,
      reviews: 127,
      image: "/images/imperial-cities-tour.png",
      highlights: ["Medine UNESCO", "Palazzi reali", "Souks autentici", "Guide esperte"],
      description:
        "Scopri le quattro città imperiali del Marocco in un viaggio indimenticabile attraverso storia, cultura e tradizioni millenarie.",
      category: "Culturale",
      style: "Gruppo",
    },
    {
      id: 2,
      title: "Avventura nel Deserto",
      subtitle: "Marrakech • Merzouga • Sahara",
      duration: "4 giorni / 3 notti",
      price: "€450",
      originalPrice: "€550",
      rating: 4.8,
      reviews: 89,
      image: "/images/sahara-adventure.png",
      highlights: ["Notte nel deserto", "Cammelli", "Alba sulle dune", "Campo berbero"],
      description:
        "Vivi l'esperienza magica del Sahara con notti sotto le stelle e tramonti mozzafiato sulle dune dorate.",
      category: "Avventura",
      style: "Piccoli Gruppi",
    },
    {
      id: 3,
      title: "Marocco Completo",
      subtitle: "Da Nord a Sud",
      duration: "12 giorni / 11 notti",
      price: "€1290",
      originalPrice: "€1490",
      rating: 4.9,
      reviews: 156,
      image: "/images/complete-morocco.png",
      highlights: ["Tutto il Marocco", "Città + Deserto", "Costa atlantica", "Montagne Atlas"],
      description:
        "Il tour più completo per scoprire ogni angolo del Marocco: dalle città imperiali al deserto, dalla costa alle montagne.",
      category: "Completo",
      style: "Su Misura",
    },
  ]

  const filteredTrips = trips.filter((trip) => {
    const categoryMatch = selectedCategory === "Tutti" || trip.category === selectedCategory
    const styleMatch = selectedStyle === "Tutti" || trip.style === selectedStyle
    return categoryMatch && styleMatch
  })

  return (
    <div className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Viaggi Più Richiesti</h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            I nostri tour più amati, perfetti per scoprire il meglio del Marocco
          </p>
        </div>

        <div className="mb-8 bg-card rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-orange-500 mr-2" />
            <h3 className="text-lg font-semibold text-foreground">Filtra i Viaggi</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Categoria</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              >
                <option value="Tutti">Tutte le Categorie</option>
                <option value="Culturale">Culturale</option>
                <option value="Avventura">Avventura</option>
                <option value="Completo">Completo</option>
                <option value="Relax">Relax</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Stile di Viaggio</label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              >
                <option value="Tutti">Tutti gli Stili</option>
                <option value="Gruppo">Gruppo</option>
                <option value="Piccoli Gruppi">Piccoli Gruppi</option>
                <option value="Su Misura">Su Misura</option>
                <option value="Famiglia">Famiglia</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {filteredTrips.map((trip, idx) => (
            <div
              key={trip.id}
              className={`group cursor-pointer transition-all duration-500 ${
                activeTrip === idx ? "lg:scale-105" : "hover:scale-102"
              }`}
              onMouseEnter={() => setActiveTrip(idx)}
            >
              <div className="bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <img
                    src={trip.image || "/placeholder.svg?height=400&width=600"}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-lg text-gray-900">{trip.price}</span>
                      {trip.originalPrice && (
                        <span className="text-sm line-through text-gray-500">{trip.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm font-semibold">{trip.rating}</span>
                    <span className="text-white/70 text-sm">({trip.reviews})</span>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-2">{trip.title}</h3>
                    <p className="text-gray-200 text-sm lg:text-base">{trip.subtitle}</p>
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span>{trip.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span>Max 12 persone</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{trip.description}</p>
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {trip.highlights.map((highlight, hidx) => (
                        <span
                          key={hidx}
                          className="bg-amber-400 text-gray-900 px-3 py-1 rounded-full text-xs font-medium shadow-sm border border-amber-500/20 dark:bg-amber-600 dark:text-gray-100"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Link
                      href={`/viaggi/gruppo/${trip.id}`}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-center"
                    >
                      Scopri di Più
                    </Link>
                    <Link
                      href="/contatti"
                      className="px-6 py-3 border-2 border-orange-500 text-orange-500 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 font-semibold"
                    >
                      Prenota
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/viaggi/gruppo"
            className="inline-flex items-center space-x-2 bg-card text-foreground px-8 py-4 rounded-2xl hover:bg-muted transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            <span>Vedi Tutti i Viaggi</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
