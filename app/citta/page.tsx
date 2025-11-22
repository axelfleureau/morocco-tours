"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, ArrowRight, Loader2 } from 'lucide-react'

export default function CitiesIndexPage() {
  const [cities, setCities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/cities', { cache: 'no-store' })
        const data = await response.json()
        setCities(data.cities || [])
      } catch (error) {
        console.error('Error loading cities:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCities()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-muted-foreground">Caricamento città...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative py-24 md:py-32 bg-gradient-to-r from-orange-600 via-red-500 to-amber-600 dark:from-orange-900 dark:via-red-900 dark:to-amber-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Città Imperiali
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-200 bg-clip-text text-transparent">
              del Marocco
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto">
            Scopri le meraviglie storiche e culturali delle città marocchine
          </p>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cities.map((city) => (
              <Link
                key={city.id}
                href={`/citta/${city.slug}`}
                className="group bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-border"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={city.heroImage}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-3xl font-bold text-white mb-1">
                      {city.name}
                    </h2>
                    <p className="text-white/90 text-sm">
                      {city.tagline}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-muted-foreground line-clamp-3">
                    {city.description}
                  </p>

                  {/* Info */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{city.location.distance}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold">
                      Scopri di più
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Highlights Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {city.highlights.slice(0, 3).map((highlight, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Crea il Tuo Viaggio su Misura
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Vuoi visitare più città? Organizziamo tour personalizzati combinando le destinazioni che preferisci
          </p>
          <Link
            href="/viaggi-su-misura"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg text-lg font-semibold"
          >
            Richiedi un Preventivo Gratuito
          </Link>
        </div>
      </div>
    </div>
  )
}
