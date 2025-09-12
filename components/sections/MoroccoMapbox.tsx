"use client"

import { useRef, useEffect, useState } from "react"
import { X, Star, ArrowRight } from "lucide-react"

// Declare global types for Mapbox and GSAP
declare global {
  interface Window {
    mapboxgl: any
    gsap: any
  }
}

interface City {
  id: string
  name: string
  description: string
  coordinates: [number, number]
  image: string
  highlights: string[]
  tours: string[]
  icon: string
}

interface MoroccoMapboxProps {
  cities?: City[]
}

const defaultCities: City[] = [
  {
    id: "marrakech",
    name: "Marrakech",
    description: "La Perla Rossa del Marocco, famosa per la piazza Jemaa el-Fnaa e i suoi souks colorati.",
    coordinates: [-7.9811, 31.6295],
    image: "/images/marrakech-medina.png",
    icon: "/images/marrakech-landmark-icon.png",
    highlights: ["Jemaa el-Fnaa", "Souks", "Giardini Majorelle", "Palazzo Bahia"],
    tours: ["Tour Città Imperiali", "Marocco Completo", "Weekend a Marrakech"],
  },
  {
    id: "casablanca",
    name: "Casablanca",
    description: "La capitale economica del Marocco, moderna e cosmopolita.",
    coordinates: [-7.5898, 33.5731],
    image: "/images/casablanca-hassan.png",
    icon: "/images/casablanca-landmark-icon.png",
    highlights: ["Moschea Hassan II", "Corniche", "Quartiere Habous", "Centro Moderno"],
    tours: ["Marocco Moderno", "Tour Economico", "Città Costiere"],
  },
  {
    id: "fes",
    name: "Fes",
    description: "La capitale spirituale del Marocco, con la medina più grande del mondo.",
    coordinates: [-5.0078, 34.0181],
    image: "/images/fes-architecture.png",
    icon: "/images/fes-landmark-icon.png",
    highlights: ["Medina UNESCO", "Università Al Quaraouiyine", "Concerie Chouara", "Palazzo Reale"],
    tours: ["Tour Città Imperiali", "Cultura e Tradizioni", "Marocco del Nord"],
  },
  {
    id: "rabat",
    name: "Rabat",
    description: "La capitale moderna del Marocco, patrimonio UNESCO.",
    coordinates: [-6.8498, 33.9716],
    image: "/images/imperial-cities-tour.png",
    icon: "/images/rabat-landmark-icon.png",
    highlights: ["Torre Hassan", "Kasbah Oudayas", "Mausoleo Mohammed V", "Chellah"],
    tours: ["Tour Città Imperiali", "Marocco Moderno", "Capitali del Mondo"],
  },
  {
    id: "chefchaouen",
    name: "Chefchaouen",
    description: "La perla blu del Rif, città dalle case azzurre.",
    coordinates: [-5.2636, 35.1688],
    image: "/images/chefchaouen-blue.png",
    icon: "/images/chefchaouen-landmark-icon.png",
    highlights: ["Medina blu", "Monti del Rif", "Artigianato", "Cascate Akchour"],
    tours: ["Marocco del Nord", "Città Colorate", "Trekking Rif"],
  },
  {
    id: "essaouira",
    name: "Essaouira",
    description: "La città del vento, perla della costa atlantica.",
    coordinates: [-9.7595, 31.5085],
    image: "/images/essaouira-coast.png",
    icon: "/images/essaouira-landmark-icon.png",
    highlights: ["Medina UNESCO", "Porto", "Spiagge", "Argan"],
    tours: ["Costa Atlantica", "Surf e Relax", "Marocco Completo"],
  },
  {
    id: "agadir",
    name: "Agadir (Taghazout)",
    description: "Moderna città balneare con spiagge dorate e resort di lusso.",
    coordinates: [-9.5981, 30.4278],
    image: "/images/agadir-beach.png",
    icon: "/images/agadir-landmark-icon.png",
    highlights: ["Spiagge", "Souk El Had", "Kasbah", "Marina"],
    tours: ["Costa Atlantica", "Relax Beach", "Sud del Marocco"],
  },
  {
    id: "meknes",
    name: "Meknes",
    description: "La Versailles del Marocco, con i suoi grandiosi monumenti imperiali.",
    coordinates: [-5.5407, 33.873],
    image: "/images/imperial-cities.png",
    icon: "/images/meknes-landmark-icon.png",
    highlights: ["Bab Mansour", "Mausoleo Moulay Ismail", "Heri es-Souani", "Volubilis"],
    tours: ["Tour Città Imperiali", "Storia Antica", "Patrimoni UNESCO"],
  },
  {
    id: "tangier",
    name: "Tangeri",
    description: "Porta d'ingresso al Marocco, crocevia tra Europa e Africa.",
    coordinates: [-5.834, 35.7595],
    image: "/images/tangier-strait.png",
    icon: "/images/tangier-landmark-icon.png",
    highlights: ["Stretto di Gibilterra", "Medina", "Kasbah", "Grotte di Ercole"],
    tours: ["Marocco del Nord", "Porta d'Africa", "Storia Antica"],
  },
  {
    id: "merzouga",
    name: "Merzouga",
    description: "Porta del Sahara, dune dorate di Erg Chebbi.",
    coordinates: [-4.0134, 31.0802],
    image: "/images/sahara-adventure.png",
    icon: "/images/merzouga-landmark-icon.png",
    highlights: ["Dune Erg Chebbi", "Notti stellate", "Cammelli", "Nomadi"],
    tours: ["Tour del Deserto", "Sahara Adventure", "Marocco Completo"],
  },
  {
    id: "ifrane",
    name: "Ifrane",
    description: "La Svizzera del Marocco, città montana con architettura europea.",
    coordinates: [-5.1106, 33.5228],
    image: "/images/ifrane-mountains.png",
    icon: "/images/ifrane-landmark-icon.png",
    highlights: ["Architettura europea", "Parco nazionale", "Università Al Akhawayn", "Cedri dell'Atlante"],
    tours: ["Marocco del Nord", "Montagne Atlas", "Natura e Relax"],
  },
  {
    id: "tetouan",
    name: "Tétouan",
    description: "La Colomba Bianca, patrimonio UNESCO con influenze andaluse.",
    coordinates: [-5.3684, 35.5889],
    image: "/images/tetouan-medina.png",
    icon: "/images/tetouan-landmark-icon.png",
    highlights: ["Medina UNESCO", "Architettura andalusa", "Museo etnografico", "Artigianato tradizionale"],
    tours: ["Marocco del Nord", "Patrimoni UNESCO", "Cultura Andalusa"],
  },
  {
    id: "nador",
    name: "Nador",
    description: "Città costiera del Mediterraneo, porta verso l'Europa.",
    coordinates: [-2.9287, 35.1681],
    image: "/images/nador-coast.png",
    icon: "/images/nador-landmark-icon.png",
    highlights: ["Costa mediterranea", "Laguna di Marchica", "Porto commerciale", "Spiagge sabbiose"],
    tours: ["Marocco del Nord", "Costa Mediterranea", "Natura Marina"],
  },
]

export default function MoroccoMapbox({ cities = defaultCities }: MoroccoMapboxProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Inject Google Fonts
    const fontLink = document.createElement("link")
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
    fontLink.rel = "stylesheet"
    document.head.appendChild(fontLink)

    // Inject Mapbox CSS
    const mapboxCSS = document.createElement("link")
    mapboxCSS.href = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css"
    mapboxCSS.rel = "stylesheet"
    mapboxCSS.crossOrigin = "anonymous"
    document.head.appendChild(mapboxCSS)

    // Inject GSAP
    const gsapScript = document.createElement("script")
    gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
    gsapScript.crossOrigin = "anonymous"
    document.head.appendChild(gsapScript)

    // Custom styles for Morocco Dreams theme
    const customStyles = document.createElement("style")
    customStyles.textContent = `
      /* Stile per il popup in hover */
      .hover-popup {
        z-index: 9;
        pointer-events: auto !important;
      }

      /* Stile per il popup cliccato */
      .modern-popup:not(.hover-popup) {
        z-index: 10;
      }

      .hover-popup .mapboxgl-popup-content {
        pointer-events: auto !important;
      }

      /* Mobile responsive */
      @media screen and (max-width: 767px) {
        .mapboxgl-popup-content {
          max-height: 80vh;
          overflow-y: auto;
        }
        .mapboxgl-popup {
          max-width: 90vw !important;
          transform-origin: center center !important;
          z-index: 1000 !important;
        }
        .mapboxgl-popup-content {
          transition: transform 0.3s ease-out;
          box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2) !important;
        }
        .popup-image-container {
          min-height: 180px;
        }
        .mapboxgl-popup {
          will-change: transform;
        }
      }

      .mapboxgl-canvas {
        transition: transform 0.05s linear;
      }

      /* Mapbox Styles */
      .mapboxgl-popup {
        z-index: 10;
        max-width: 320px !important;
      }

      .mapboxgl-popup-close-button {
        display: none !important;
      }

      .mapboxgl-popup-content {
        pointer-events: auto !important;
        border-radius: 16px !important;
        padding: 0 !important;
        background-color: white !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
        overflow: hidden !important;
        transform-origin: 50% bottom !important;
        font-family: 'Inter', sans-serif !important;
      }

      .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
        border-top-color: white !important;
        transform-origin: center !important;
      }

      /* Custom Marker Styles */
      .custom-marker {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        border: 3px solid #ffffff;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px;
      }

      .custom-marker img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba(255,255,255,0.8);
      }

      .custom-marker:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        z-index: 10;
      }

      .custom-marker.clicked {
        transform: scale(1.2);
        box-shadow: 0 10px 30px rgba(249, 115, 22, 0.4);
        border-color: #fbbf24;
        z-index: 2;
      }

      .custom-marker:not(.clicked)::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(249, 115, 22, 0.2);
        border-radius: 50%;
        opacity: 0;
        transform: scale(1.5);
        animation: marker-pulse 2s infinite;
      }

      @keyframes marker-pulse {
        0% { transform: scale(1); opacity: 0.7; }
        70% { transform: scale(1.5); opacity: 0; }
        100% { transform: scale(1); opacity: 0; }
      }

      .mapboxgl-ctrl-attrib {
        display: none !important;
      }

      /* Cities List Scrollbar */
      .cities-list-container {
        max-height: 600px;
        overflow-y: auto;
        position: relative;
        scrollbar-width: thin;
        scrollbar-color: #f97316 #f3f4f6;
      }

      .cities-list-container::-webkit-scrollbar {
        width: 6px;
      }

      .cities-list-container::-webkit-scrollbar-track {
        background: #f3f4f6;
        border-radius: 3px;
      }

      .cities-list-container::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        border-radius: 3px;
      }

      .cities-list-container::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #ea580c 0%, #b91c1c 100%);
      }

      /* Fade effect at bottom */
      .cities-list-container::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 40px;
        background: linear-gradient(to bottom, transparent, rgba(249, 250, 251, 0.9));
        pointer-events: none;
        z-index: 1;
      }

      .dark .cities-list-container::after {
        background: linear-gradient(to bottom, transparent, rgba(17, 24, 39, 0.9));
      }

      /* Popup Modern Styles */
      .popup-modern {
        width: 100%;
        background: white;
        position: relative;
        border-radius: 16px;
        overflow: hidden;
      }

      .popup-image-container {
        position: relative;
        width: 100%;
        height: 180px;
        overflow: hidden;
        border-radius: 16px 16px 0 0;
      }

      .popup-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }

      .popup-image:hover {
        transform: scale(1.05);
      }

      .property-type-badge {
        position: absolute;
        top: 12px;
        left: 12px;
        background: rgba(255, 255, 255, 0.85);
        padding: 6px 10px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        font-weight: 600;
        color: #333;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 5;
        font-family: 'Montserrat', sans-serif;
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
      }

      .popup-content-wrapper {
        padding: 16px;
      }

      .popup-title {
        margin: 0 0 8px 0;
        font-size: 18px;
        font-weight: 600;
        color: #1a1a1a;
        line-height: 1.3;
        font-family: 'Montserrat', sans-serif;
      }

      .popup-close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255,255,255,0.9);
        border: none;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #333;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        z-index: 5;
        transition: all 0.2s ease;
      }

      .popup-close-btn:hover {
        background: white;
        transform: scale(1.1);
      }

      .popup-close-btn svg {
        width: 18px;
        height: 18px;
      }

      .popup-actions {
        display: flex;
        gap: 8px;
        margin-top: 16px;
      }

      .popup-btn {
        flex: 1;
        padding: 10px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        transition: all 0.2s ease;
        border: none;
        text-decoration: none;
        font-family: 'Montserrat', sans-serif;
      }

      .popup-btn.primary {
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        color: white !important;
      }

      .popup-btn.primary:hover {
        background: linear-gradient(135deg, #ea580c 0%, #b91c1c 100%);
      }

      .popup-btn.secondary {
        background: #f5f5f5;
        color: #333 !important;
      }

      .popup-btn.secondary:hover {
        background: #e5e5e5;
      }

      .custom-marker:focus {
        outline: 3px solid #4a90e2;
        outline-offset: 2px;
      }

      .popup-btn:focus,
      .popup-close-btn:focus {
        outline: 3px solid #4a90e2;
        outline-offset: 2px;
      }

      .mapboxgl-canvas-container {
        transition: transform 0.5s ease;
      }
    `
    document.head.appendChild(customStyles)

    // Load Mapbox JS
    const mapboxScript = document.createElement("script")
    mapboxScript.src = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"
    mapboxScript.crossOrigin = "anonymous"
    mapboxScript.onload = initializeMap
    document.head.appendChild(mapboxScript)

    function initializeMap() {
      if (!window.mapboxgl || !mapContainerRef.current) return

      window.mapboxgl.accessToken =
        "pk.eyJ1IjoiZWRpc2JhbGkwMyIsImEiOiJjbTFvcnFvbjcxNTNnMmtxdnA0cjJkZGx0In0.gk1glAL0jkmWK1_Tyf4Fow"

      const map = new window.mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [-6.2, 32.2],
        zoom: 5.5,
        attributionControl: false,
      })

      map.addControl(new window.mapboxgl.NavigationControl(), "top-right")

      map.on("load", () => {
        setIsLoading(false)

        // Clear existing markers
        markersRef.current.forEach((marker) => marker.remove())
        markersRef.current = []

        const bounds = new window.mapboxgl.LngLatBounds()
        let openPopup: any = null
        let activeMarker: any = null
        let hoverPopup: any = null
        let hoverTimeout: any = null
        let currentHoverMarker: any = null

        cities.forEach((city) => {
          // Create marker element with city-specific icon
          const markerElement = document.createElement("div")
          markerElement.className = "custom-marker"
          markerElement.setAttribute("aria-label", city.name)
          markerElement.setAttribute("role", "button")
          markerElement.setAttribute("tabindex", "0")
          markerElement.innerHTML = `
            <img 
              src="${city.icon}"
              alt="${city.name}"
              style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;"
            />
          `

          // Create popup for hover
          const popup = new window.mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: [0, -10],
            className: "hover-popup",
          }).setHTML(`
            <div class="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 min-w-[200px]">
              <h4 class="font-bold text-gray-900 dark:text-white mb-1">${city.name}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">${city.description}</p>
              <div class="text-xs text-orange-500 font-medium">Clicca per esplorare</div>
            </div>
          `)

          // Create marker with fixed positioning
          const marker = new window.mapboxgl.Marker({
            element: markerElement,
            anchor: "center",
          })
            .setLngLat(city.coordinates)
            .addTo(map)

          markersRef.current.push(marker)
          bounds.extend(city.coordinates)

          // Add hover events for popup (desktop only)
          if (window.innerWidth > 767) {
            markerElement.addEventListener("mouseenter", () => {
              if (hoverTimeout) {
                clearTimeout(hoverTimeout)
                hoverTimeout = null
              }
              hoverTimeout = setTimeout(() => {
                popup.setLngLat(city.coordinates).addTo(map)
                hoverPopup = popup
                currentHoverMarker = markerElement
              }, 100)
            })

            markerElement.addEventListener("mouseleave", () => {
              if (hoverTimeout) {
                clearTimeout(hoverTimeout)
                hoverTimeout = null
              }
              if (hoverPopup) {
                hoverPopup.remove()
                hoverPopup = null
              }
              if (currentHoverMarker) {
                currentHoverMarker.classList.remove("clicked")
                currentHoverMarker = null
              }
            })
          }

          markerElement.addEventListener("click", () => {
            if (hoverPopup) {
              hoverPopup.remove()
              hoverPopup = null
            }

            setSelectedCity(city)

            // Aggiorna marker styles
            document.querySelectorAll(".custom-marker").forEach((m) => m.classList.remove("clicked"))
            markerElement.classList.add("clicked")

            if (activeMarker && activeMarker !== markerElement) {
              activeMarker.classList.remove("clicked")
            }
            activeMarker = markerElement

            // Chiudi eventuale popup già aperto
            if (openPopup) openPopup.remove()

            // Fly to city e DOPO apri popup centrato
            map.flyTo({
              center: city.coordinates,
              zoom: 8,
              duration: 1500,
            })

            map.once("moveend", () => {
              openPopup = new window.mapboxgl.Popup({
                offset: [0, -15],
                closeButton: true,
                closeOnClick: false,
                className: "modern-popup",
              })
                .setLngLat(city.coordinates)
                .setHTML(`
                  <div class="bg-white p-4 rounded-xl shadow-lg min-w-[200px]">
                    <h4 class="font-bold text-gray-900 mb-1">${city.name}</h4>
                    <p class="text-sm text-gray-600 mb-2">${city.description}</p>
                    <div class="text-xs text-orange-500 font-medium">Clicca per esplorare</div>
                  </div>
                `)
                .addTo(map)
            })
          })

          // Keyboard support
          markerElement.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              markerElement.click()
            }
          })
        })

        // Fit map to bounds
        if (cities.length > 0) {
          map.fitBounds(bounds, {
            padding: 50,
            maxZoom: 6,
          })
        }

        // Handle map click to close popups
        map.on("click", (e) => {
          const target = e.originalEvent.target as Element
          if (!target.closest(".mapboxgl-popup") && !target.closest(".custom-marker")) {
            if (openPopup) {
              openPopup.remove()
              openPopup = null
            }
            if (hoverPopup) {
              hoverPopup.remove()
              hoverPopup = null
            }
            if (activeMarker) {
              activeMarker.classList.remove("clicked")
              activeMarker = null
            }
            setSelectedCity(null)
          }
        })
      })

      mapRef.current = map
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
      }
    }
  }, [cities])

  const handleCitySelect = (city: City) => {
    setSelectedCity(city)

    if (mapRef.current) {
      // Update marker styles
      document.querySelectorAll(".custom-marker").forEach((m) => m.classList.remove("active"))

      // Fly to city
      mapRef.current.flyTo({
        center: city.coordinates,
        zoom: 8,
        duration: 1500,
      })
    }
  }

  return (
    <div className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Esplora le Città del Marocco
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Clicca sui marker per scoprire le meraviglie di ogni destinazione
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Cities List - Mobile First with Scrollbar */}
          <div className="lg:col-span-1 lg:order-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 lg:mb-4">Destinazioni</h3>
            <div className="cities-list-container">
              <div className="space-y-2">
                {cities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => handleCitySelect(city)}
                    className={`
                      w-full p-2 lg:p-3 rounded-lg text-left transition-all duration-300 hover:scale-105
                      ${
                        selectedCity?.id === city.id
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                          : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-md hover:shadow-lg"
                      }
                    `}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`
                          w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-xs font-bold overflow-hidden flex-shrink-0
                          ${
                            selectedCity?.id === city.id
                              ? "bg-white/20 text-white"
                              : "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                          }
                        `}
                      >
                        <img
                          src={city.icon || "/placeholder.svg"}
                          alt={city.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`
                            font-semibold text-xs lg:text-sm truncate
                            ${selectedCity?.id === city.id ? "text-white" : "text-gray-900 dark:text-white"}
                          `}
                        >
                          {city.name}
                        </h4>
                        <p
                          className={`
                            text-xs line-clamp-1 hidden lg:block
                            ${selectedCity?.id === city.id ? "text-white/80" : "text-gray-500 dark:text-gray-400"}
                          `}
                        >
                          {city.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="lg:col-span-3 lg:order-2">
            <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl">
              <div className="relative">
                {isLoading && (
                  <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                  </div>
                )}
                <div ref={mapContainerRef} className="w-full h-64 sm:h-80 lg:h-[600px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Selected City Details */}
        {selectedCity && (
          <div className="mt-8 lg:mt-12">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 lg:p-8 shadow-xl">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedCity.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-base lg:text-lg">{selectedCity.description}</p>
                </div>
                <button
                  onClick={() => setSelectedCity(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {/* Image */}
                <div className="relative h-48 lg:h-64 rounded-2xl overflow-hidden">
                  <img
                    src={selectedCity.image || "/placeholder.svg?height=300&width=400"}
                    alt={selectedCity.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">Destinazione Top</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-6">
                  {/* Highlights */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Cosa vedere</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedCity.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                          <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tours */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Tour disponibili</h4>
                    <div className="space-y-2">
                      {selectedCity.tours.map((tour, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                        >
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{tour}</span>
                          <ArrowRight className="w-4 h-4 text-orange-500" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-sm">
                      Scopri {selectedCity.name}
                    </button>
                    <button className="flex-1 border-2 border-orange-500 text-orange-500 py-3 px-6 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 font-semibold text-sm">
                      Prenota Tour
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
