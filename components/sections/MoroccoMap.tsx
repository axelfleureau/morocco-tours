"use client"

import { useRef, useEffect, useState } from "react"
import { Star, Heart, ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

interface City {
  id: string
  name: string
  coordinates: [number, number]
  description: string
  image: string
  category: "imperial" | "coastal" | "mountain" | "modern"
  rating: number
  tours: number
  highlights: string[]
  pageUrl: string
}

const MOROCCO_CITIES: City[] = [
  {
    id: "marrakech",
    name: "Marrakech",
    coordinates: [-7.9811, 31.6295],
    description: "La Perla Rossa del Marocco, famosa per la piazza Jemaa el-Fnaa e i suoi souks colorati.",
    image: "/images/marrakech-medina.png",
    category: "imperial",
    rating: 4.8,
    tours: 12,
    highlights: ["Jemaa el-Fnaa", "Souks", "Giardini Majorelle", "Palazzo Bahia"],
    pageUrl: "/viaggi/citta-imperiali",
  },
  {
    id: "casablanca",
    name: "Casablanca",
    coordinates: [-7.5898, 33.5731],
    description: "La capitale economica del Marocco, moderna e cosmopolita.",
    image: "/images/casablanca-hassan.png",
    category: "modern",
    rating: 4.5,
    tours: 8,
    highlights: ["Moschea Hassan II", "Corniche", "Quartiere Habous", "Centro Moderno"],
    pageUrl: "/viaggi/citta-imperiali",
  },
  {
    id: "fes",
    name: "Fès",
    coordinates: [-5.0078, 34.0181],
    description: "La capitale spirituale del Marocco, con la medina più grande del mondo.",
    image: "/images/fes-architecture.png",
    category: "imperial",
    rating: 4.9,
    tours: 15,
    highlights: ["Medina UNESCO", "Università Al Quaraouiyine", "Concerie Chouara", "Palazzo Reale"],
    pageUrl: "/viaggi/citta-imperiali",
  },
  {
    id: "rabat",
    name: "Rabat",
    coordinates: [-6.8498, 33.9716],
    description: "La capitale moderna del Marocco, patrimonio UNESCO.",
    image: "/images/imperial-cities-tour.png",
    category: "imperial",
    rating: 4.6,
    tours: 10,
    highlights: ["Torre Hassan", "Kasbah Oudayas", "Mausoleo Mohammed V", "Chellah"],
    pageUrl: "/viaggi/citta-imperiali",
  },
  {
    id: "chefchaouen",
    name: "Chefchaouen",
    coordinates: [-5.2636, 35.1688],
    description: "La perla blu del Rif, città dalle case azzurre.",
    image: "/images/chefchaouen-blue.png",
    category: "mountain",
    rating: 4.9,
    tours: 6,
    highlights: ["Medina blu", "Monti del Rif", "Artigianato", "Cascate Akchour"],
    pageUrl: "/viaggi/montagne-atlas",
  },
  {
    id: "essaouira",
    name: "Essaouira",
    coordinates: [-9.7595, 31.5085],
    description: "La città del vento, perla della costa atlantica.",
    image: "/images/essaouira-coast.png",
    category: "coastal",
    rating: 4.7,
    tours: 9,
    highlights: ["Medina UNESCO", "Porto", "Spiagge", "Argan"],
    pageUrl: "/viaggi/costa-atlantica",
  },
]

const categoryConfig = {
  imperial: {
    color: "from-amber-500 to-orange-600",
    icon: "👑",
    label: "Imperiale",
  },
  coastal: {
    color: "from-blue-500 to-cyan-600",
    icon: "🌊",
    label: "Costiera",
  },
  mountain: {
    color: "from-green-500 to-emerald-600",
    icon: "⛰️",
    label: "Montagna",
  },
  modern: {
    color: "from-gray-500 to-slate-600",
    icon: "🏙️",
    label: "Moderna",
  },
}

export default function MoroccoMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const popupsRef = useRef<any[]>([])
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleFavorite = (cityId: string) => {
    setFavorites((prev) => (prev.includes(cityId) ? prev.filter((id) => id !== cityId) : [...prev, cityId]))
  }

  const handleCitySelect = (city: City) => {
    setSelectedCity(city)

    if (mapRef.current) {
      // Centra la mappa sulla città selezionata
      mapRef.current.flyTo({
        center: city.coordinates,
        zoom: 8,
        duration: 1500,
        padding: { top: 100, bottom: 100, left: 50, right: 50 },
      })

      // Chiudi tutti i popup esistenti
      popupsRef.current.forEach((popup) => popup.remove())
      popupsRef.current = []

      // Trova il marker corrispondente e mostra il popup
      setTimeout(() => {
        const cityIndex = MOROCCO_CITIES.findIndex((c) => c.id === city.id)
        if (cityIndex !== -1 && markersRef.current[cityIndex]) {
          const marker = markersRef.current[cityIndex]
          const popup = createPopup(city, isDark)
          popup.setLngLat(city.coordinates).addTo(mapRef.current)
          popupsRef.current.push(popup)

          // Aggiorna stili marker
          document.querySelectorAll(".morocco-marker").forEach((m) => m.classList.remove("selected"))
          marker.getElement().classList.add("selected")
        }
      }, 1600) // Aspetta che l'animazione flyTo finisca
    }
  }

  const createPopup = (city: City, isDark: boolean) => {
    return new (window as any).mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false,
      offset: [0, -20],
      anchor: "bottom",
      maxWidth: "380px",
    }).setHTML(`
      <div class="p-0 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"} rounded-xl overflow-hidden">
        <div class="relative h-32 overflow-hidden">
          <img src="${city.image || "/placeholder.svg"}" alt="${city.name}" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute bottom-3 left-3 text-white">
            <h3 class="font-bold text-lg">${city.name}</h3>
            <div class="flex items-center gap-2">
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span class="text-sm font-medium">${city.rating}</span>
              </div>
              <span class="text-xs opacity-80">${city.tours} tour</span>
            </div>
          </div>
        </div>
        
        <div class="p-4">
          <p class="text-sm ${isDark ? "text-gray-300" : "text-gray-600"} mb-3 line-clamp-2">${city.description}</p>
          
          <div class="mb-3">
            <p class="text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"} mb-2">Highlights:</p>
            <div class="flex flex-wrap gap-1">
              ${city.highlights
                .slice(0, 3)
                .map(
                  (highlight) => `
                <span class="px-2 py-1 text-xs rounded-full ${isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}">${highlight}</span>
              `,
                )
                .join("")}
            </div>
          </div>
          
          <div class="flex gap-2">
            <button onclick="window.location.href='${city.pageUrl}'" class="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-red-700 transition-all flex items-center justify-center gap-1">
              Scopri
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            <button onclick="event.stopPropagation(); toggleCityFavorite('${city.id}')" class="px-3 py-2 border ${
              isDark
                ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            } rounded-lg text-sm transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `)
  }

  useEffect(() => {
    if (!mounted) return

    // Load Mapbox CSS
    const mapboxCSS = document.createElement("link")
    mapboxCSS.rel = "stylesheet"
    mapboxCSS.href = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css"
    document.head.appendChild(mapboxCSS)

    // Load Mapbox JS
    const mapboxJS = document.createElement("script")
    mapboxJS.src = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"
    mapboxJS.onload = initializeMap
    document.head.appendChild(mapboxJS)

    // Add custom styles
    const customStyles = document.createElement("style")
    customStyles.textContent = `
      .mapboxgl-popup {
        z-index: 50;
      }
      .mapboxgl-popup-content {
        padding: 0 !important;
        border-radius: 1rem !important;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
        border: none !important;
        max-width: 380px !important;
      }
      .mapboxgl-popup-close-button {
        color: ${isDark ? "#9ca3af" : "#6b7280"} !important;
        font-size: 20px !important;
        padding: 8px !important;
        right: 8px !important;
        top: 8px !important;
      }
      .mapboxgl-popup-close-button:hover {
        background-color: ${isDark ? "rgba(55, 65, 81, 0.8)" : "rgba(0, 0, 0, 0.1)"} !important;
        border-radius: 50% !important;
      }
      .mapboxgl-popup-tip {
        border-top-color: ${isDark ? "rgb(17 24 39)" : "white"} !important;
      }
      .mapboxgl-ctrl-attrib {
        display: none !important;
      }
      .morocco-marker {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
      }
      .morocco-marker:hover {
        transform: scale(1.2) translateY(-4px);
        z-index: 10;
      }
      .morocco-marker.selected {
        transform: scale(1.3) translateY(-6px);
        z-index: 20;
      }
    `
    document.head.appendChild(customStyles)

    function initializeMap() {
      if (!(window as any).mapboxgl || !mapContainerRef.current) return
      ;(window as any).mapboxgl.accessToken =
        "pk.eyJ1IjoiZWRpc2JhbGkwMyIsImEiOiJjbTFvcnFvbjcxNTNnMmtxdnA0cjJkZGx0In0.gk1glAL0jkmWK1_Tyf4Fow"

      const map = new (window as any).mapboxgl.Map({
        container: mapContainerRef.current,
        style: isDark ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/satellite-streets-v12",
        center: [-6.2, 32.2],
        zoom: 5.5,
        attributionControl: false,
      })

      map.addControl(new (window as any).mapboxgl.NavigationControl(), "top-right")

      map.on("load", () => {
        setIsLoading(false)
        createMarkers(map)
      })

      mapRef.current = map
    }

    function createMarkers(map: any) {
      // Clear existing markers and popups
      markersRef.current.forEach((marker) => marker.remove())
      popupsRef.current.forEach((popup) => popup.remove())
      markersRef.current = []
      popupsRef.current = []

      MOROCCO_CITIES.forEach((city, index) => {
        // Create marker element
        const markerEl = document.createElement("div")
        markerEl.className = "morocco-marker"
        markerEl.innerHTML = `
          <div class="w-12 h-12 rounded-full bg-gradient-to-br ${
            categoryConfig[city.category].color
          } border-4 border-white shadow-lg flex items-center justify-center text-white text-lg font-bold relative">
            ${categoryConfig[city.category].icon}
            <div class="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              ${city.tours}
            </div>
          </div>
        `

        // Create marker
        const marker = new (window as any).mapboxgl.Marker({
          element: markerEl,
          anchor: "bottom",
        })
          .setLngLat(city.coordinates)
          .addTo(map)

        markersRef.current.push(marker)

        // Add click event to marker
        markerEl.addEventListener("click", () => {
          handleCitySelect(city)
        })

        // Add hover events for temporary popup
        let hoverPopup: any = null
        markerEl.addEventListener("mouseenter", () => {
          if (!selectedCity || selectedCity.id !== city.id) {
            hoverPopup = createPopup(city, isDark)
            hoverPopup.setLngLat(city.coordinates).addTo(map)
          }
        })

        markerEl.addEventListener("mouseleave", () => {
          if (hoverPopup && (!selectedCity || selectedCity.id !== city.id)) {
            setTimeout(() => {
              if (hoverPopup && !hoverPopup.getElement()?.matches(":hover")) {
                hoverPopup.remove()
                hoverPopup = null
              }
            }, 300)
          }
        })
      })

      // Fit bounds to show all cities
      if (MOROCCO_CITIES.length > 0) {
        const bounds = new (window as any).mapboxgl.LngLatBounds()
        MOROCCO_CITIES.forEach((city) => bounds.extend(city.coordinates))
        map.fitBounds(bounds, { padding: 100, maxZoom: 8 })
      }
    }
    // Global function for popup buttons
    ;(window as any).toggleCityFavorite = (cityId: string) => {
      toggleFavorite(cityId)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
      }
    }
  }, [isDark, mounted])

  // Update map style when theme changes
  useEffect(() => {
    if (mapRef.current && mounted) {
      const newStyle = isDark ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/satellite-streets-v12"
      mapRef.current.setStyle(newStyle)
    }
  }, [isDark, mounted])

  if (!mounted) {
    return (
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-medium text-foreground">Caricamento mappa del Marocco...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Esplora le Città del Marocco</h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Scopri le meraviglie del Regno del Marocco attraverso le sue città più affascinanti
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Cities List */}
            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-4">Città ({MOROCCO_CITIES.length})</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {MOROCCO_CITIES.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => handleCitySelect(city)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedCity?.id === city.id
                        ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                          categoryConfig[city.category].color
                        } flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                      >
                        {categoryConfig[city.category].icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4
                            className={`font-semibold text-sm truncate ${
                              selectedCity?.id === city.id ? "text-white" : "text-foreground"
                            }`}
                          >
                            {city.name}
                          </h4>
                          <div
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(city.id)
                            }}
                            className="p-0.5 cursor-pointer"
                          >
                            <Heart
                              className={`w-3 h-3 ${
                                favorites.includes(city.id)
                                  ? "fill-red-500 text-red-500"
                                  : selectedCity?.id === city.id
                                    ? "text-white/70"
                                    : "text-muted-foreground"
                              }`}
                            />
                          </div>
                        </div>
                        <p
                          className={`text-xs line-clamp-2 mb-2 ${
                            selectedCity?.id === city.id ? "text-white/80" : "text-muted-foreground"
                          }`}
                        >
                          {city.description}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className={selectedCity?.id === city.id ? "text-white/80" : "text-muted-foreground"}>
                              {city.rating}
                            </span>
                          </div>
                          <span className={selectedCity?.id === city.id ? "text-white/80" : "text-muted-foreground"}>
                            {city.tours} tour
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-2xl overflow-hidden shadow-lg relative">
              {isLoading && (
                <div className="absolute inset-0 bg-muted/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg font-medium text-foreground">Caricamento mappa...</p>
                  </div>
                </div>
              )}
              <div ref={mapContainerRef} className="w-full h-[600px]" />
            </div>
          </div>
        </div>

        {/* Mobile Selected City Details */}
        {selectedCity && (
          <div className="lg:hidden mt-8 bg-card rounded-2xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-1">{selectedCity.name}</h3>
                <p className="text-muted-foreground text-sm">{selectedCity.description}</p>
              </div>
              <button
                onClick={() => setSelectedCity(null)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <img
                src={selectedCity.image || "/placeholder.svg"}
                alt={selectedCity.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-bold text-orange-500">{selectedCity.rating}</div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-bold text-orange-500">{selectedCity.tours}</div>
                <div className="text-xs text-muted-foreground">Tour</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-bold text-orange-500">{categoryConfig[selectedCity.category].icon}</div>
                <div className="text-xs text-muted-foreground">{categoryConfig[selectedCity.category].label}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Highlights</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCity.highlights.map((highlight, index) => (
                    <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-lg">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Link
                  href={selectedCity.pageUrl}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all flex items-center justify-center gap-2"
                >
                  Scopri {selectedCity.name}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => toggleFavorite(selectedCity.id)}
                  className="px-4 py-3 border-2 border-orange-500 text-orange-500 rounded-xl font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all"
                >
                  <Heart className={`w-5 h-5 ${favorites.includes(selectedCity.id) ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
