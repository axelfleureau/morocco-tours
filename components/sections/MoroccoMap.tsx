"use client"

import { useRef, useEffect } from "react"

// Declare global types for external libraries
declare global {
  interface Window {
    mapboxgl: any
  }
}

export default function MoroccoMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  const imperialCities = [
    {
      name: "Marrakech",
      description: "La Perla Rossa del Marocco, famosa per la piazza Jemaa el-Fnaa e i suoi souks colorati.",
      coordinates: [-7.9811, 31.6295],
      image: "/images/marrakech-medina.png",
    },
    {
      name: "Fes",
      description: "La capitale spirituale del Marocco, con la medina più grande del mondo.",
      coordinates: [-5.0003, 34.0181],
      image: "/images/fes-architecture.png",
    },
    {
      name: "Meknes",
      description: "La Versailles del Marocco, con i suoi grandiosi monumenti imperiali.",
      coordinates: [-5.5471, 33.8935],
      image: "/images/imperial-cities.png",
    },
    {
      name: "Rabat",
      description: "La capitale moderna del Marocco, patrimonio UNESCO.",
      coordinates: [-6.8498, 34.0209],
      image: "/images/imperial-cities-tour.png",
    },
  ]

  useEffect(() => {
    // Inject CSS
    const mapboxCSS = document.createElement("link")
    mapboxCSS.href = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css"
    mapboxCSS.rel = "stylesheet"
    mapboxCSS.crossOrigin = "anonymous"
    document.head.appendChild(mapboxCSS)

    // Custom styles for Morocco Dreams theme
    const customStyles = document.createElement("style")
    customStyles.textContent = `
      .mapboxgl-popup-content {
        padding: 0 !important;
        border-radius: 20px !important;
        background: transparent !important;
        max-width: none !important;
        box-shadow: none !important;
      }
      .mapboxgl-popup-tip {
        display: none !important;
      }
      .mapboxgl-popup-close-button {
        display: none !important;
      }
      .morocco-popup {
        background: white !important;
        border-radius: 20px !important;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15) !important;
        overflow: hidden !important;
        max-width: 350px !important;
        min-width: 320px !important;
        border: 1px solid rgba(0, 0, 0, 0.05) !important;
      }
      .morocco-marker {
        width: 50px !important;
        height: 50px !important;
        border-radius: 50% !important;
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%) !important;
        border: 3px solid #ffffff !important;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2) !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        transition: all 0.3s ease !important;
        color: white !important;
        font-weight: bold !important;
        font-size: 11px !important;
        position: relative !important;
      }
      .morocco-marker:hover {
        transform: scale(1.1) !important;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3) !important;
        z-index: 10 !important;
      }
      .morocco-marker::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid #f97316;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
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
        imperialCities.forEach((city) => {
          // Create marker element
          const markerElement = document.createElement("div")
          markerElement.className = "morocco-marker"
          markerElement.innerHTML = city.name.substring(0, 3).toUpperCase()

          // Create popup content
          const popupContent = document.createElement("div")
          popupContent.className = "morocco-popup"
          popupContent.innerHTML = `
            <div style="position: relative; height: 180px; overflow: hidden;">
              <img src="${city.image}" alt="${city.name}" style="width: 100%; height: 100%; object-fit: cover;">
              <button style="position: absolute; top: 12px; right: 12px; background: rgba(0, 0, 0, 0.5); border: none; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: white; font-size: 18px; line-height: 1;" onclick="this.closest('.mapboxgl-popup').remove()">
                ×
              </button>
            </div>
            <div style="padding: 20px;">
              <h3 style="font-size: 18px; font-weight: 700; margin: 0 0 12px 0; color: #1e293b;">${city.name}</h3>
              <p style="font-size: 14px; line-height: 1.6; color: #64748b; margin-bottom: 20px;">${city.description}</p>
              <div style="display: flex; gap: 10px;">
                <button style="flex: 1; padding: 12px 16px; border-radius: 12px; border: none; background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); color: white; font-weight: 600; cursor: pointer; font-size: 14px;">
                  Scopri ${city.name}
                </button>
                <button style="flex: 1; padding: 12px 16px; border-radius: 12px; border: 2px solid #e2e8f0; background: #f8fafc; color: #475569; font-weight: 600; cursor: pointer; font-size: 14px;">
                  Prenota Tour
                </button>
              </div>
            </div>
          `

          // Create popup
          const popup = new window.mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: [0, -15],
            anchor: "bottom",
            maxWidth: "none",
          }).setDOMContent(popupContent)

          // Create marker with popup - Fixed positioning
          const marker = new window.mapboxgl.Marker({
            element: markerElement,
            anchor: "bottom",
          })
            .setLngLat(city.coordinates)
            .addTo(map)

          // Add hover events to show/hide popup
          markerElement.addEventListener("mouseenter", () => {
            popup.addTo(map)
            marker.setPopup(popup)
          })

          markerElement.addEventListener("mouseleave", () => {
            popup.remove()
          })

          // Add click event to toggle popup
          markerElement.addEventListener("click", () => {
            if (popup.isOpen()) {
              popup.remove()
            } else {
              popup.addTo(map)
              marker.setPopup(popup)
            }
          })
        })
      })

      mapRef.current = map
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
      }
    }
  }, [])

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Esplora le Città Imperiali</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Passa il mouse sui marker per scoprire le meraviglie di ogni città
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl">
          <div ref={mapContainerRef} className="w-full h-96" />
        </div>
      </div>
    </div>
  )
}
