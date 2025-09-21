// Enhanced Mapbox Integration System for Morocco Dreams
import mapboxgl from 'mapbox-gl';

export interface MapConfig {
  container: string;
  style: string;
  center: [number, number];
  zoom: number;
  interactive: boolean;
}

export interface MarkerData {
  id: string;
  coordinates: [number, number];
  title: string;
  description?: string;
  type: 'city' | 'destination' | 'experience' | 'hotel' | 'activity';
  image?: string;
  price?: number;
  rating?: number;
  duration?: string;
}

export interface ItineraryRoute {
  id: string;
  name: string;
  coordinates: [number, number][];
  color: string;
  duration: string;
  highlights: string[];
  type: 'driving' | 'walking' | 'flight';
}

export class EnhancedMapboxService {
  private static instance: EnhancedMapboxService | null = null;
  private map: mapboxgl.Map | null = null;
  private markers: mapboxgl.Marker[] = [];
  private apiKey: string = '';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';
    if (this.apiKey) {
      mapboxgl.accessToken = this.apiKey;
    }
  }

  static getInstance(): EnhancedMapboxService {
    if (!EnhancedMapboxService.instance) {
      EnhancedMapboxService.instance = new EnhancedMapboxService();
    }
    return EnhancedMapboxService.instance;
  }

  // Initialize map with enhanced features
  initializeMap(config: MapConfig): mapboxgl.Map {
    this.map = new mapboxgl.Map({
      container: config.container,
      style: config.style || 'mapbox://styles/mapbox/satellite-streets-v12',
      center: config.center,
      zoom: config.zoom,
      interactive: config.interactive !== false
    });

    // Add navigation controls
    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add fullscreen control
    this.map.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    // Add geolocation control
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      }), 
      'top-right'
    );

    return this.map;
  }

  // Add custom markers with popups
  addMarkers(markersData: MarkerData[]): void {
    if (!this.map) return;

    markersData.forEach((markerData) => {
      // Create custom marker element
      const markerElement = this.createCustomMarkerElement(markerData);

      // Create marker
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(markerData.coordinates)
        .addTo(this.map!);

      // Create popup content
      const popupContent = this.createPopupContent(markerData);

      // Add popup
      const popup = new mapboxgl.Popup({ 
        offset: 25,
        closeButton: true,
        closeOnClick: false 
      }).setHTML(popupContent);

      marker.setPopup(popup);
      this.markers.push(marker);
    });
  }

  // Create custom marker element
  private createCustomMarkerElement(markerData: MarkerData): HTMLElement {
    const element = document.createElement('div');
    element.className = 'custom-marker';
    
    const iconMap = {
      city: '🏛️',
      destination: '📍',
      experience: '🎯',
      hotel: '🏨',
      activity: '⭐'
    };

    element.innerHTML = `
      <div class="marker-icon ${markerData.type}">
        <span class="marker-emoji">${iconMap[markerData.type] || '📍'}</span>
      </div>
    `;

    // Add styles
    element.style.cssText = `
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #ea580c, #dc2626);
      border: 3px solid white;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s ease;
    `;

    // Add hover effect
    element.addEventListener('mouseenter', () => {
      element.style.transform = 'scale(1.1)';
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = 'scale(1)';
    });

    return element;
  }

  // Create popup content
  private createPopupContent(markerData: MarkerData): string {
    return `
      <div class="custom-popup" style="min-width: 250px;">
        ${markerData.image ? `
          <img src="${markerData.image}" alt="${markerData.title}" 
               style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 12px;">
        ` : ''}
        
        <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1f2937;">
          ${markerData.title}
        </h3>
        
        ${markerData.description ? `
          <p style="margin: 0 0 12px 0; font-size: 14px; color: #6b7280; line-height: 1.4;">
            ${markerData.description}
          </p>
        ` : ''}
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          ${markerData.rating ? `
            <div style="display: flex; align-items: center; gap: 4px;">
              <span style="color: #f59e0b;">⭐</span>
              <span style="font-size: 14px; font-weight: 500;">${markerData.rating}</span>
            </div>
          ` : ''}
          
          ${markerData.duration ? `
            <span style="font-size: 12px; color: #6b7280; background: #f3f4f6; padding: 2px 8px; border-radius: 12px;">
              ${markerData.duration}
            </span>
          ` : ''}
        </div>
        
        ${markerData.price ? `
          <div style="text-align: center; margin-top: 12px;">
            <span style="font-size: 18px; font-weight: 700; color: #ea580c;">
              €${markerData.price}
            </span>
            <button onclick="window.openBookingModal('${markerData.id}')" 
                    style="display: block; width: 100%; margin-top: 8px; background: linear-gradient(135deg, #ea580c, #dc2626); 
                           color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 500; cursor: pointer;">
              Prenota Ora
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  // Add itinerary route
  addItineraryRoute(route: ItineraryRoute): void {
    if (!this.map) return;

    const routeId = `route-${route.id}`;

    // Add source
    this.map.addSource(routeId, {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route.coordinates
        }
      }
    });

    // Add layer
    this.map.addLayer({
      id: routeId,
      type: 'line',
      source: routeId,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': route.color,
        'line-width': 4,
        'line-opacity': 0.8
      }
    });

    // Add animated route (optional)
    this.animateRoute(routeId, route.coordinates);
  }

  // Animate route drawing
  private animateRoute(routeId: string, coordinates: [number, number][]): void {
    if (!this.map) return;

    let step = 0;
    const numSteps = coordinates.length;

    const animate = () => {
      if (step < numSteps) {
        const currentCoords = coordinates.slice(0, step + 1);
        
        const source = this.map!.getSource(routeId);
        if (source && 'setData' in source) {
          (source as any).setData({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: currentCoords
            }
          });
        }

        step++;
        setTimeout(animate, 100);
      }
    };

    animate();
  }

  // Fit map to show all markers
  fitToMarkers(): void {
    if (!this.map || this.markers.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds();
    
    this.markers.forEach(marker => {
      bounds.extend(marker.getLngLat());
    });

    this.map.fitBounds(bounds, {
      padding: 50,
      maxZoom: 12
    });
  }

  // Search locations (geocoding)
  async searchLocation(query: string): Promise<any[]> {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${this.apiKey}&country=ma&limit=5`
      );
      const data = await response.json();
      return data.features || [];
    } catch (error) {
      console.error('Error searching location:', error);
      return [];
    }
  }

  // Get directions between points
  async getDirections(origin: [number, number], destination: [number, number]): Promise<any> {
    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?access_token=${this.apiKey}&geometries=geojson`
      );
      return await response.json();
    } catch (error) {
      console.error('Error getting directions:', error);
      return null;
    }
  }

  // Clear all markers
  clearMarkers(): void {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }

  // Update map style
  updateStyle(styleUrl: string): void {
    if (this.map) {
      this.map.setStyle(styleUrl);
    }
  }

  // Destroy map
  destroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
    this.markers = [];
  }

  // Get Morocco-specific locations
  static getMoroccoLocations(): MarkerData[] {
    return [
      {
        id: 'marrakech',
        coordinates: [-7.9811, 31.6295],
        title: 'Marrakech',
        description: 'La Perla Rossa del Marocco',
        type: 'city',
        image: '/images/marrakech-medina.png',
        rating: 4.8,
        duration: '3-4 giorni'
      },
      {
        id: 'fes',
        coordinates: [-5.0003, 34.0181],
        title: 'Fes',
        description: 'Capitale spirituale e culturale',
        type: 'city',
        image: '/images/fes-architecture.png',
        rating: 4.7,
        duration: '2-3 giorni'
      },
      {
        id: 'sahara',
        coordinates: [-4.0, 30.0],
        title: 'Deserto del Sahara',
        description: 'Dune di Erg Chebbi e notti stellate',
        type: 'destination',
        image: '/images/sahara-dunes.png',
        rating: 4.9,
        duration: '2-3 giorni',
        price: 320
      },
      {
        id: 'essaouira',
        coordinates: [-9.7767, 31.5085],
        title: 'Essaouira',
        description: 'Perla dell\'Atlantico',
        type: 'city',
        image: '/images/essaouira-port.png',
        rating: 4.6,
        duration: '1-2 giorni'
      },
      {
        id: 'atlas-mountains',
        coordinates: [-7.9, 31.0],
        title: 'Montagne dell\'Atlante',
        description: 'Trekking e villaggi berberi',
        type: 'destination',
        image: '/images/atlas-mountains.png',
        rating: 4.5,
        duration: '3-5 giorni',
        price: 180
      }
    ];
  }
}