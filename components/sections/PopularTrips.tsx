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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Categoria</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-4 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 min-h-[48px] text-base"
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
                className="w-full px-4 py-4 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 min-h-[48px] text-base"
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

        <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 min-w-full lg:min-w-0">
            {filteredTrips.map((trip, idx) => (
              <div
                key={trip.id}
                className={`group cursor-pointer transition-all duration-500 min-w-[280px] lg:min-w-0 ${
                  activeTrip === idx ? "lg:scale-105" : "hover:scale-102"
                }`}
                onMouseEnter={() => setActiveTrip(idx)}
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = "scale(0.98)"
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = ""
                  setActiveTrip(idx)
                }}
              >
                <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 active:scale-95">
                  <div className="relative h-64 lg:h-80 overflow-hidden">
                    <img
                      src={
                        trip.image ||
                        `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(trip.title + " marocco viaggio")}`
                      }
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg text-gray-900 dark:text-gray-100">{trip.price}</span>
                        {trip.originalPrice && (
                          <span className="text-sm line-through text-gray-500 dark:text-gray-400">
                            {trip.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-semibold">{trip.rating}</span>
                      <span className="text-white/70 text-sm">({trip.reviews})</span>
                    </div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-balance">{trip.title}</h3>
                      <p className="text-gray-200 text-sm lg:text-base text-pretty">{trip.subtitle}</p>
                    </div>
                  </div>
                  <div className="p-6 lg:p-8">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span>{trip.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4 text-orange-500" />
                        <span>Max 12 persone</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-pretty">
                      {trip.description}
                    </p>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Highlights:</h4>
                      <div className="flex flex-wrap gap-2">
                        {trip.highlights.map((highlight, hidx) => (
                          <span
                            key={hidx}
                            className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white dark:bg-orange-900/40 dark:text-orange-200 shadow-sm transition-colors"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href={
                          trip.title === "Tour delle Città Imperiali"
                            ? "/viaggi/citta-imperiali"
                            : trip.title === "Avventura nel Deserto"
                              ? "/viaggi/deserto"
                              : trip.title === "Marocco Completo"
                                ? "/viaggi/completo"
                                : `/viaggi/gruppo/${trip.id}`
                        }
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-center min-h-[48px] flex items-center justify-center transform hover:scale-105 active:scale-95 touch-manipulation"
                      >
                        Scopri di Più
                      </Link>
                      <Link
                        href="/contatti"
                        className="px-6 py-4 border-2 border-orange-500 text-orange-500 dark:text-orange-400 rounded-xl hover:bg-orange-500 hover:text-white dark:hover:text-white transition-all duration-300 font-semibold min-h-[48px] flex items-center justify-center transform hover:scale-105 active:scale-95 touch-manipulation"
                      >
                        Prenota
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/viaggi/gruppo"
            className="inline-flex items-center space-x-2 bg-card text-foreground px-8 py-4 rounded-2xl hover:bg-muted transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl min-h-[56px]"
          >
            <span>Vedi Tutti i Viaggi</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
