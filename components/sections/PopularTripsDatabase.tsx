"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Clock, Users, Star, ArrowRight, Filter } from "lucide-react"
import { getPublishedTravels } from "@/lib/public-data"
import { Travel } from "@/lib/firestore-schema"

export default function PopularTrips() {
  const [activeTrip, setActiveTrip] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("Tutti")
  const [selectedStyle, setSelectedStyle] = useState("Tutti")
  const [trips, setTrips] = useState<Travel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Load published travels from database
  useEffect(() => {
    const loadTrips = async () => {
      try {
        setLoading(true)
        const publishedTrips = await getPublishedTravels({ 
          featured: true, 
          limit: 6 
        })
        setTrips(publishedTrips)
        setError("")
      } catch (err) {
        console.error('Error loading trips:', err)
        setError("Errore nel caricamento dei viaggi")
      } finally {
        setLoading(false)
      }
    }

    loadTrips()
  }, [])

  const filteredTrips = trips.filter((trip) => {
    const categoryMatch = selectedCategory === "Tutti" || trip.category === selectedCategory
    // Add style filtering based on trip data when available
    return categoryMatch
  })

  if (loading) {
    return (
      <div className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Viaggi Più Richiesti</h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              I nostri tour più amati, perfetti per scoprire il meglio del Marocco
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Viaggi Più Richiesti</h2>
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      </div>
    )
  }

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
                <option value="imperial-cities">Città Imperiali</option>
                <option value="desert">Deserto</option>
                <option value="coast">Costa</option>
                <option value="mountains">Montagne</option>
                <option value="cultural">Culturale</option>
                <option value="custom">Su Misura</option>
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
                <option value="Privato">Privato</option>
              </select>
            </div>
          </div>
        </div>

        {/* Trip Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrips.map((trip, index) => (
            <div
              key={trip.id}
              className={`group cursor-pointer transition-all duration-500 ${
                activeTrip === index ? "scale-105" : "hover:scale-102"
              }`}
              onClick={() => setActiveTrip(index)}
            >
              <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border hover:shadow-2xl transition-all duration-500">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={trip.images?.[0] || "/images/placeholder-trip.png"}
                    alt={trip.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {trip.category}
                    </span>
                  </div>
                  {trip.originalPrice && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      OFFERTA
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{trip.duration}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                      <span>{trip.rating}</span>
                      <span className="ml-1">({trip.reviews})</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-orange-500 transition-colors">
                    {trip.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {trip.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {trip.highlights?.slice(0, 3).map((highlight, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300 px-2 py-1 rounded-full text-xs"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-foreground">
                        €{trip.price}
                      </span>
                      {trip.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          €{trip.originalPrice}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/viaggi/${trip.slug || trip.id}`}
                      className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all duration-200 text-sm font-semibold group"
                    >
                      Scopri
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTrips.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nessun viaggio trovato per i filtri selezionati.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}