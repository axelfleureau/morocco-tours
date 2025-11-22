"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Filter } from "lucide-react"
import { getPublishedTravels } from "@/lib/public-data"
import { Travel } from "@/lib/firestore-schema"
import { TravelCard } from "@/components/cards/TravelCard"

export default function PopularTrips() {
  const [activeTrip, setActiveTrip] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("Tutti")
  const [selectedStyle, setSelectedStyle] = useState("Tutti")
  const [trips, setTrips] = useState<any[]>([])
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
        setTrips(publishedTrips as any[])
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

        <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 min-w-full lg:min-w-0">
            {filteredTrips.map((trip, idx) => (
              <TravelCard
                key={trip.id}
                id={trip.id || trip.slug || ''}
                image={trip.images?.[0] || `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(trip.title + " marocco viaggio")}`}
                title={trip.title}
                description={trip.description}
                price={trip.price}
                originalPrice={trip.originalPrice}
                duration={trip.duration}
                rating={trip.rating}
                reviews={trip.reviews}
                highlights={trip.highlights || []}
                badges={trip.category ? [{ label: trip.category, variant: 'default' }] : []}
                ctas={[
                  { 
                    label: 'Scopri di Più', 
                    href: `/viaggi/${trip.slug || trip.id}`, 
                    variant: 'primary' 
                  },
                  { 
                    label: 'Prenota', 
                    href: '/contatti', 
                    variant: 'secondary' 
                  }
                ]}
                className={`min-w-[280px] lg:min-w-0 ${
                  activeTrip === idx ? "lg:scale-105" : ""
                }`}
                onMouseEnter={() => setActiveTrip(idx)}
              />
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
