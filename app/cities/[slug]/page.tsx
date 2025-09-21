"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Clock, MapPin, Star, Users, Calendar, Car, Utensils, Camera, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { CityPagesService, CityData } from '@/lib/city-pages';
import { EnhancedMapboxService, MarkerData } from '@/lib/mapbox-enhanced';

export default function CityPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [city, setCity] = useState<CityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const loadCity = async () => {
      try {
        const cityData = await CityPagesService.getCityBySlug(slug);
        if (cityData) {
          setCity(cityData);
        } else {
          setError('Città non trovata');
        }
      } catch (err) {
        setError('Errore nel caricamento della città');
        console.error('City loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCity();
  }, [slug]);

  // Initialize Mapbox when city data is loaded
  useEffect(() => {
    if (city && city.coordinates) {
      const initMap = async () => {
        try {
          const mapbox = EnhancedMapboxService.getInstance();
          if (mapbox) {
            await mapbox.initializeMap({
              container: 'city-map',
              center: city.coordinates,
              zoom: 12,
              style: 'mapbox://styles/mapbox/satellite-streets-v12',
              interactive: true
            });
            
            // Add city marker
            const marker: MarkerData = {
              id: `city-${city.id}`,
              coordinates: city.coordinates,
              title: city.name,
              description: city.description,
              color: '#ff6b35',
              type: 'city'
            };
            await mapbox.addMarkers([marker]);
          }
        } catch (error) {
          console.error('Mapbox initialization error:', error);
        }
      };

      initMap();
    }
  }, [city]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-64 bg-muted rounded-xl"></div>
            <div className="h-8 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !city) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {error || 'Città non trovata'}
          </h1>
          <Link
            href="/viaggi"
            className="inline-flex items-center space-x-2 text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Torna ai viaggi</span>
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Panoramica', icon: MapPin },
    { id: 'attractions', name: 'Attrazioni', icon: Camera },
    { id: 'practical', name: 'Info Pratiche', icon: Clock },
    { id: 'experiences', name: 'Esperienze', icon: Star }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* City Facts */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="font-medium">Popolazione</span>
                </div>
                <p className="text-2xl font-bold">{city.population.toLocaleString()}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-medium">Regione</span>
                </div>
                <p className="text-lg font-semibold">{city.region}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-medium">Clima</span>
                </div>
                <p className="text-lg font-semibold">{city.climate.type}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-medium">Miglior periodo</span>
                </div>
                <p className="text-sm">{city.climate.bestVisitMonths.join(', ')}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Storia</h3>
              <p className="text-muted-foreground leading-relaxed">{city.overview.history}</p>
            </div>

            {/* Districts */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quartieri</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {city.districts.map((district, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-6">
                    <h4 className="font-semibold text-lg mb-2">{district.name}</h4>
                    <p className="text-muted-foreground mb-4">{district.description}</p>
                    <div className="space-y-2">
                      <h5 className="font-medium">Caratteristiche:</h5>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {district.characteristics.map((char, i) => (
                          <li key={i}>{char}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'attractions':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {city.attractions.map((attraction, index) => (
              <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
                {attraction.images && attraction.images.length > 0 && (
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-primary/50" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-lg">{attraction.name}</h4>
                    {attraction.unescoBySite && (
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                        UNESCO
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-4">{attraction.description}</p>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{attraction.rating}</span>
                      <span className="text-muted-foreground text-sm">({attraction.reviews})</span>
                    </div>
                    {attraction.entryFee && (
                      <div className="text-sm text-muted-foreground">
                        €{attraction.entryFee.adult} adulti
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{attraction.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{attraction.openingHours}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'practical':
        return (
          <div className="space-y-8">
            {/* Transportation */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Car className="w-6 h-6 mr-2 text-primary" />
                Trasporti
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {city.transportation.airport && (
                  <div>
                    <h4 className="font-medium mb-2">Aeroporto</h4>
                    <p className="text-muted-foreground">
                      {city.transportation.airport.name} ({city.transportation.airport.code})
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {city.transportation.airport.distance}
                    </p>
                  </div>
                )}
                {city.transportation.trainStation && (
                  <div>
                    <h4 className="font-medium mb-2">Stazione ferroviaria</h4>
                    <p className="text-muted-foreground">{city.transportation.trainStation.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Connessioni: {city.transportation.trainStation.connections.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Emergency Info */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Emergenze</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Polizia:</strong> {city.practicalInfo.emergencyNumbers.police}</p>
                </div>
                <div>
                  <p><strong>Emergenze mediche:</strong> {city.practicalInfo.emergencyNumbers.medical}</p>
                </div>
                <div>
                  <p><strong>Vigili del fuoco:</strong> {city.practicalInfo.emergencyNumbers.fire}</p>
                </div>
                <div>
                  <p><strong>Informazioni turistiche:</strong> {city.practicalInfo.emergencyNumbers.tourist}</p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Consigli Utili</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Culturali</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {city.practicalInfo.tips.cultural.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Sicurezza</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {city.practicalInfo.tips.safety.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'experiences':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {city.experiences.map((experience, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-2">{experience.name}</h4>
                <p className="text-muted-foreground mb-4">{experience.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">{experience.duration}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < experience.difficulty
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      €{experience.priceRange.min} - €{experience.priceRange.max}
                    </div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p><strong>Tipo:</strong> {experience.type}</p>
                  <p><strong>Miglior periodo:</strong> {experience.bestTime.join(', ')}</p>
                  {experience.bookingRequired && (
                    <p className="text-primary font-medium mt-2">Prenotazione richiesta</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <div className="mb-4">
              <Link
                href="/viaggi"
                className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Torna ai viaggi</span>
              </Link>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              {city.name}
            </h1>
            <p className="text-xl mb-2">{city.nameArabic}</p>
            <p className="text-lg opacity-90 leading-relaxed">
              {city.overview.description}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {renderTabContent()}
        
        {/* Mapbox Container */}
        {activeTab === 'overview' && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Posizione</h3>
            <div id="city-map" className="w-full h-96 rounded-xl border border-border"></div>
          </div>
        )}
      </div>
    </div>
  );
}