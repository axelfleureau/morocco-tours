"use client"

import { useState } from "react"
import { Star, Clock, Users, MapPin, Heart, ArrowRight, Filter } from 'lucide-react'
import { useActivePackages } from "@/lib/firebase-hooks"
import { logEvent } from "@/lib/firebase-utils"

interface Package {
  id: string
  title: string
  duration: string
  price: number
  description: string
  category: string
  includes: string[]
  image?: string
  rating?: number
  reviews?: number
  difficulty?: string
  groupSize?: string
}

export default function PopularTrips() {
  const { data: packages, loading, error } = useActivePackages()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const categories = [
    { id: "all", name: "Tutti i Tour", icon: MapPin },
    { id: "group", name: "Viaggi di Gruppo", icon: Users },
    { id: "desert", name: "Tour del Deserto", icon: MapPin },
    { id: "cultural", name: "Tour Culturali", icon: Star },
    { id: "adventure", name: "Avventura", icon: ArrowRight },
  ]

  const filteredPackages = selectedCategory === "all" 
    ? packages 
    : packages.filter(pkg => pkg.category === selectedCategory)

  const toggleFavorite = async (packageId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(packageId)) {
      newFavorites.delete(packageId)
      await logEvent('remove_from_favorites', { packageId })
    } else {
      newFavorites.add(packageId)
      await logEvent('add_to_favorites', { packageId })
    }
    setFavorites(newFavorites)
  }

  const handlePackageClick = async (packageId: string, title: string) => {
    await logEvent('package_view', { packageId, title })
  }

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-3xl h-96 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-red-500 mb-4">Errore nel caricamento dei pacchetti</div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
          >
            Riprova
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            I Nostri Tour Più Popolari
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Scopri le esperienze più amate dai nostri viaggiatori, dai tour culturali alle avventure nel deserto
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300
                ${selectedCategory === category.id
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }
              `}
            >
              <category.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pkg.image || "/placeholder.svg?height=300&width=400&query=morocco tour"}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(pkg.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <Heart 
                    className={`w-5 h-5 ${
                      favorites.has(pkg.id) 
                        ? "text-red-500 fill-current" 
                        : "text-gray-600 dark:text-gray-400"
                    }`} 
                  />
                </button>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {categories.find(c => c.id === pkg.category)?.name || pkg.category}
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 px-3 py-2 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold text-orange-600">€{pkg.price}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">per persona</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (pkg.rating || 5) 
                            ? "text-yellow-400 fill-current" 
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                      ({pkg.reviews || 127} recensioni)
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 transition-colors">
                  {pkg.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {pkg.description}
                </p>

                {/* Trip Details */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{pkg.groupSize || "2-12 persone"}</span>
                  </div>
                </div>

                {/* Includes Preview */}
                {pkg.includes && pkg.includes.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Include:</div>
                    <div className="flex flex-wrap gap-1">
                      {pkg.includes.slice(0, 2).map((item, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                      {pkg.includes.length > 2 && (
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                          +{pkg.includes.length - 2} altro
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handlePackageClick(pkg.id, pkg.title)}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-sm flex items-center justify-center space-x-2"
                  >
                    <span>Scopri di più</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="px-4 py-3 border-2 border-orange-500 text-orange-500 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 font-semibold text-sm">
                    Prenota
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Nessun tour trovato
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Non ci sono tour disponibili per questa categoria al momento.
            </p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
            >
              Mostra tutti i tour
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Non trovi il tour perfetto per te?
            </h3>
            <p className="text-lg lg:text-xl mb-8 opacity-90">
              Creiamo insieme il tuo viaggio su misura in Marocco
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors font-semibold">
                Richiedi Preventivo
              </button>
              <button className="border-2 border-white text-white py-3 px-8 rounded-xl hover:bg-white hover:text-orange-600 transition-colors font-semibold">
                Contattaci
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
