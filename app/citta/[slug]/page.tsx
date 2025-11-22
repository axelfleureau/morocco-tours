"use client"

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { MapPin, Clock, Euro, Calendar, Plane, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default function CityPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [city, setCity] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchCity = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/cities?slug=${slug}`, { cache: 'no-store' })
        const data = await response.json()
        
        if (data.cities && data.cities.length > 0) {
          setCity(data.cities[0])
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Error loading city:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    
    if (slug) {
      fetchCity()
    }
  }, [slug])

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

  if (error || !city) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <img
          src={city.heroImage}
          alt={city.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
            <Link
              href="/citta"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Tutte le città
            </Link>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {city.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
              {city.tagline}
            </p>
            
            <div className="flex flex-wrap gap-3 mt-6">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                <MapPin className="w-4 h-4" />
                <span>{city.location.distance}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg md:text-xl text-foreground leading-relaxed">
            {city.description}
          </p>
        </div>
      </div>

      {/* History */}
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Storia
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {city.history}
          </p>
        </div>
      </div>

      {/* Attractions */}
      <div className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Attrazioni Principali
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {city.attractions.map((attraction, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border"
              >
                <div className="relative h-64">
                  <img
                    src={attraction.image}
                    alt={attraction.title}
                    className="w-full h-full object-cover"
                  />
                  {attraction.price && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full font-semibold">
                      {attraction.price}
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {attraction.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {attraction.description}
                  </p>
                  {attraction.duration && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{attraction.duration}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Practical Info */}
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* When to Visit */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Quando Visitare
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {city.bestTime}
              </p>
            </div>

            {/* How to Arrive */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Plane className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Come Arrivare
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {city.howToArrive}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Prices */}
      <div className="py-16 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Prezzi Tour Indicativi
            </h2>
            <p className="text-lg text-muted-foreground">
              Scopri {city.name} con le nostre guide locali
            </p>
          </div>

          <div className={`grid gap-6 max-w-4xl mx-auto ${city.tourPrices.multiDay ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            <div className="bg-card rounded-2xl p-8 text-center shadow-lg border border-border">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Mezza Giornata</h3>
              <p className="text-3xl font-bold text-orange-600 mb-2">{city.tourPrices.halfDay}</p>
              <p className="text-sm text-muted-foreground">4 ore circa</p>
            </div>

            <div className="bg-card rounded-2xl p-8 text-center shadow-lg border border-border">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Euro className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Giornata Intera</h3>
              <p className="text-3xl font-bold text-orange-600 mb-2">{city.tourPrices.fullDay}</p>
              <p className="text-sm text-muted-foreground">8 ore circa</p>
            </div>

            {city.tourPrices.multiDay && (
              <div className="bg-card rounded-2xl p-8 text-center shadow-lg border border-border">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Tour Multi-Giorno</h3>
                <p className="text-3xl font-bold text-orange-600 mb-2">{city.tourPrices.multiDay}</p>
                <p className="text-sm text-muted-foreground">2-3 giorni</p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contatti"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg text-lg font-semibold"
            >
              Richiedi un Tour Personalizzato
            </Link>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            Da Non Perdere
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            {city.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-muted/50 rounded-xl p-4 border border-border"
              >
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <span className="text-foreground font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
