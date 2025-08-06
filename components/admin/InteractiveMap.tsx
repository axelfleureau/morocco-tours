"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Navigation, Layers } from 'lucide-react'
import { getCities } from '@/lib/firebase-operations'
import { toast } from 'react-hot-toast'

interface City {
  id: string
  name: string
  description: string
  lat: number
  lng: number
  attractions: string[]
  visible: boolean
}

export const InteractiveMap = () => {
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  useEffect(() => {
    loadCities()
  }, [])

  const loadCities = async () => {
    try {
      setLoading(true)
      const citiesData = await getCities()
      setCities(citiesData)
    } catch (error) {
      toast.error('Errore nel caricamento delle città')
      console.error('Error loading cities:', error)
    } finally {
      setLoading(false)
    }
  }

  // Coordinate del Marocco per centrare la mappa
  const moroccoCenter = { lat: 31.7917, lng: -7.0926 }
  const mapBounds = {
    north: 36.0,
    south: 27.0,
    east: -1.0,
    west: -17.0
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Mappa Interattiva</h2>
        <p className="text-gray-600">Visualizza le città del Marocco sulla mappa</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Mappa Placeholder */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-0">
              <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
                {/* Sfondo mappa stilizzato */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50"></div>
                
                {/* Griglia per simulare una mappa */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#000" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Marker delle città */}
                {cities.map((city, index) => {
                  // Calcola la posizione relativa basata sulle coordinate reali
                  const x = ((city.lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * 100
                  const y = ((mapBounds.north - city.lat) / (mapBounds.north - mapBounds.south)) * 100
                  
                  return (
                    <div
                      key={city.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${
                        selectedCity?.id === city.id ? 'scale-125 z-20' : 'z-10'
                      }`}
                      style={{
                        left: `${Math.max(5, Math.min(95, x))}%`,
                        top: `${Math.max(5, Math.min(95, y))}%`,
                      }}
                      onClick={() => setSelectedCity(city)}
                    >
                      {/* Marker */}
                      <div className={`relative ${city.visible ? '' : 'opacity-50'}`}>
                        <div className={`w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center ${
                          city.visible 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-400 text-white'
                        }`}>
                          <MapPin className="h-4 w-4" />
                        </div>
                        
                        {/* Tooltip */}
                        <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 ${
                          selectedCity?.id === city.id ? 'block' : 'hidden group-hover:block'
                        }`}>
                          <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                            {city.name}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-black"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* Legenda */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Layers className="h-4 w-4 text-gray-600" />
                    <span className="font-medium">Legenda</span>
                  </div>
                  <div className="mt-2 space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Città Visibili</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span>Città Nascoste</span>
                    </div>
                  </div>
                </div>

                {/* Contatore città */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Navigation className="h-4 w-4 text-gray-600" />
                    <span className="font-medium">{cities.length} città totali</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {cities.filter(c => c.visible).length} visibili
                  </div>
                </div>

                {/* Messaggio per mappa reale */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-100 border border-blue-300 rounded-lg p-4 max-w-sm text-center">
                  <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-blue-800 mb-2">
                    <strong>Mappa Simulata</strong>
                  </p>
                  <p className="text-xs text-blue-700">
                    Per una mappa reale, integra Google Maps, Mapbox o Leaflet. 
                    I marker sono posizionati in base alle coordinate GPS delle città.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar con dettagli */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Città sulla Mappa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cities.map((city) => (
                  <div
                    key={city.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedCity?.id === city.id 
                        ? 'bg-blue-50 border-blue-300' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedCity(city)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{city.name}</h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {city.lat.toFixed(4)}, {city.lng.toFixed(4)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {city.description}
                        </p>
                      </div>
                      <Badge variant={city.visible ? "default" : "secondary"} className="text-xs">
                        {city.visible ? "Visibile" : "Nascosta"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedCity && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dettagli Città</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-lg">{selectedCity.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{selectedCity.description}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm mb-2">Coordinate GPS</h5>
                    <p className="text-xs font-mono bg-gray-100 p-2 rounded">
                      {selectedCity.lat}, {selectedCity.lng}
                    </p>
                  </div>

                  {selectedCity.attractions.length > 0 && (
                    <div>
                      <h5 className="font-medium text-sm mb-2">Attrazioni</h5>
                      <div className="space-y-1">
                        {selectedCity.attractions.map((attraction, index) => (
                          <div key={index} className="text-xs text-gray-600 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            {attraction}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t">
                    <Badge variant={selectedCity.visible ? "default" : "secondary"}>
                      {selectedCity.visible ? "Città Visibile" : "Città Nascosta"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}