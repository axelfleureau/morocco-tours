"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Users, Package, Camera } from 'lucide-react'
import { getCities, getTours } from '@/lib/firebase-operations'

interface City {
  id: string
  name: string
  description: string
  lat: number
  lng: number
  attractions: string[]
  bestTime: string
}

interface Tour {
  id: string
  name: string
  cities: string[]
  price: number
  duration: string
}

export function InteractiveMap() {
  const [cities, setCities] = useState<City[]>([])
  const [tours, setTours] = useState<Tour[]>([])
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [citiesData, toursData] = await Promise.all([
        getCities(),
        getTours()
      ])
      setCities(citiesData)
      setTours(toursData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getToursForCity = (cityId: string) => {
    return tours.filter(tour => tour.cities.includes(cityId))
  }

  // Morocco bounds
  const moroccoCenter = { lat: 31.7917, lng: -7.0926 }
  const mapBounds = {
    north: 35.9224,
    south: 27.6625,
    east: -0.9910,
    west: -13.1681
  }

  // Convert coordinates to SVG positions
  const coordToSVG = (lat: number, lng: number) => {
    const x = ((lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * 800
    const y = ((mapBounds.north - lat) / (mapBounds.north - mapBounds.south)) * 600
    return { x, y }
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
        <p className="text-gray-600">Visualizza città e tour sulla mappa del Marocco</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Mappa del Marocco
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-blue-50 rounded-lg overflow-hidden">
                <svg
                  viewBox="0 0 800 600"
                  className="w-full h-96"
                  style={{ background: 'linear-gradient(to bottom, #e0f2fe 0%, #f3e5ab 100%)' }}
                >
                  {/* Morocco outline (simplified) */}
                  <path
                    d="M100 200 L200 180 L300 160 L400 150 L500 140 L600 145 L700 150 L750 160 L780 180 L790 220 L785 280 L770 340 L750 400 L720 450 L680 480 L620 500 L550 510 L480 515 L400 520 L320 525 L250 530 L180 520 L120 500 L80 470 L60 430 L50 380 L55 320 L70 260 L100 200 Z"
                    fill="#fef3c7"
                    stroke="#d97706"
                    strokeWidth="2"
                  />
                  
                  {/* Cities */}
                  {cities.map((city) => {
                    const pos = coordToSVG(city.lat, city.lng)
                    const cityTours = getToursForCity(city.id!)
                    
                    return (
                      <g key={city.id}>
                        {/* City marker */}
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="8"
                          fill={selectedCity?.id === city.id ? "#dc2626" : "#2563eb"}
                          stroke="white"
                          strokeWidth="2"
                          className="cursor-pointer hover:r-10 transition-all"
                          onClick={() => setSelectedCity(selectedCity?.id === city.id ? null : city)}
                        />
                        
                        {/* City label */}
                        <text
                          x={pos.x}
                          y={pos.y - 15}
                          textAnchor="middle"
                          className="text-xs font-medium fill-gray-800 pointer-events-none"
                        >
                          {city.name}
                        </text>
                        
                        {/* Tour count badge */}
                        {cityTours.length > 0 && (
                          <circle
                            cx={pos.x + 12}
                            cy={pos.y - 8}
                            r="6"
                            fill="#dc2626"
                            className="pointer-events-none"
                          />
                        )}
                        {cityTours.length > 0 && (
                          <text
                            x={pos.x + 12}
                            y={pos.y - 5}
                            textAnchor="middle"
                            className="text-xs font-bold fill-white pointer-events-none"
                          >
                            {cityTours.length}
                          </text>
                        )}
                      </g>
                    )
                  })}
                </svg>
              </div>
              
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  <span>Città</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                  <span>Selezionata</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-600 rounded-full text-white text-xs flex items-center justify-center">
                    N
                  </div>
                  <span>Tour disponibili</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* City Details */}
        <div>
          {selectedCity ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {selectedCity.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  {selectedCity.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Coordinate</h4>
                  <p className="text-sm text-gray-600">
                    {selectedCity.lat.toFixed(4)}, {selectedCity.lng.toFixed(4)}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Periodo Migliore</h4>
                  <p className="text-sm text-gray-600">{selectedCity.bestTime}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Attrazioni</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedCity.attractions.map((attraction, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {attraction}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Tour Disponibili</h4>
                  {getToursForCity(selectedCity.id!).map((tour) => (
                    <div key={tour.id} className="p-2 bg-gray-50 rounded">
                      <div className="font-medium text-sm">{tour.name}</div>
                      <div className="text-xs text-gray-600">
                        €{tour.price} • {tour.duration}
                      </div>
                    </div>
                  ))}
                  {getToursForCity(selectedCity.id!).length === 0 && (
                    <p className="text-sm text-gray-500">Nessun tour disponibile</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Seleziona una città</h3>
                <p className="text-sm text-gray-600">
                  Clicca su una città nella mappa per vedere i dettagli
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{cities.length}</div>
              <div className="text-sm text-gray-600">Città Totali</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{tours.length}</div>
              <div className="text-sm text-gray-600">Tour Totali</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {cities.reduce((acc, city) => acc + getToursForCity(city.id!).length, 0)}
              </div>
              <div className="text-sm text-gray-600">Connessioni Città-Tour</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
