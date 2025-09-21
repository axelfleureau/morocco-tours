// Dynamic City Pages System for Morocco Dreams
import { firestoreService } from './firestore';
import { CMSService, CMSContent } from './cms';

export interface CityData {
  id?: string;
  name: string;
  slug: string;
  nameArabic: string;
  region: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  population: number;
  elevation?: number;
  timezone: string;
  climate: {
    type: string;
    bestVisitMonths: string[];
    averageTemp: {
      summer: { min: number; max: number };
      winter: { min: number; max: number };
    };
    rainfall: string;
  };
  overview: {
    description: string;
    history: string;
    culture: string;
    economy: string[];
  };
  attractions: Array<{
    id: string;
    name: string;
    type: 'monument' | 'museum' | 'market' | 'garden' | 'architectural' | 'religious' | 'natural';
    description: string;
    address: string;
    coordinates: { lat: number; lng: number };
    openingHours: string;
    entryFee?: { adult: number; child: number; currency: string };
    rating: number;
    reviews: number;
    images: string[];
    highlights: string[];
    unescoBySite?: boolean;
  }>;
  districts: Array<{
    name: string;
    description: string;
    characteristics: string[];
    mainAttractions: string[];
    accommodation: 'luxury' | 'mid-range' | 'budget' | 'all';
  }>;
  transportation: {
    airport?: {
      name: string;
      code: string;
      distance: string;
    };
    trainStation?: {
      name: string;
      connections: string[];
    };
    busStation: {
      name: string;
      companies: string[];
    };
    localTransport: string[];
    taxis: {
      available: boolean;
      tips: string[];
    };
  };
  accommodation: Array<{
    id: string;
    name: string;
    type: 'hotel' | 'riad' | 'hostel' | 'apartment' | 'guesthouse';
    category: 'luxury' | 'mid-range' | 'budget';
    rating: number;
    priceRange: { min: number; max: number; currency: string };
    location: string;
    amenities: string[];
    bookingUrl?: string;
  }>;
  dining: Array<{
    id: string;
    name: string;
    type: 'restaurant' | 'cafe' | 'street-food' | 'traditional';
    cuisine: string[];
    priceLevel: 1 | 2 | 3 | 4; // 1 = budget, 4 = fine dining
    rating: number;
    specialties: string[];
    location: string;
    atmosphere: string;
  }>;
  shopping: Array<{
    id: string;
    name: string;
    type: 'souk' | 'market' | 'boutique' | 'mall' | 'craft-center';
    description: string;
    location: string;
    specialties: string[];
    openingHours: string;
    tips: string[];
  }>;
  experiences: Array<{
    id: string;
    name: string;
    type: 'cultural' | 'adventure' | 'culinary' | 'wellness' | 'educational';
    description: string;
    duration: string;
    priceRange: { min: number; max: number; currency: string };
    difficulty: 1 | 2 | 3 | 4 | 5;
    bestTime: string[];
    included: string[];
    bookingRequired: boolean;
  }>;
  practicalInfo: {
    currency: string;
    languages: string[];
    emergencyNumbers: {
      police: string;
      medical: string;
      fire: string;
      tourist: string;
    };
    hospitals: Array<{
      name: string;
      address: string;
      phone: string;
      type: 'public' | 'private';
    }>;
    banks: Array<{
      name: string;
      locations: string[];
      atmAvailable: boolean;
    }>;
    tips: {
      cultural: string[];
      safety: string[];
      bargaining: string[];
      photography: string[];
    };
  };
  weather: {
    currentSeason: string;
    forecast?: Array<{
      date: string;
      temp: { min: number; max: number };
      condition: string;
      humidity: number;
    }>;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    structuredData: any;
  };
  images: {
    hero: string;
    gallery: string[];
    map: string;
  };
  published: boolean;
  featured: boolean;
  priority: number; // for homepage ordering
  createdAt: Date;
  updatedAt: Date;
}

// Mock data per le città principali - sostituisce temporaneamente Firestore
const CITIES_DATA: CityData[] = [
  {
    id: 'casablanca',
    name: 'Casablanca',
    slug: 'casablanca',
    nameArabic: 'الدار البيضاء',
    region: 'Casablanca-Settat',
    coordinates: { latitude: 33.5731, longitude: -7.5898 },
    population: 3359818,
    elevation: 50,
    timezone: 'UTC+1',
    climate: {
      type: 'Mediterraneo',
      bestVisitMonths: ['Marzo', 'Aprile', 'Maggio', 'Settembre', 'Ottobre'],
      averageTemp: { summer: { min: 20, max: 26 }, winter: { min: 9, max: 18 } },
      rainfall: 'Moderata (400mm/anno)'
    },
    overview: {
      description: 'Casablanca è il centro economico del Marocco, famosa per la Grande Moschea Hassan II.',
      history: 'Fondata dai Berberi nel VII secolo, cresciuta da piccolo porto a metropoli moderna.',
      culture: 'Mix di tradizioni berbere, arabe e influenze francesi',
      economy: ['Finanza', 'Industria', 'Porto commerciale', 'Turismo']
    },
    attractions: [{
      id: 'hassan-ii-mosque',
      name: 'Moschea Hassan II',
      type: 'religious' as const,
      description: 'Una delle moschee più grandi al mondo con un minareto di 210m',
      address: 'Boulevard de la Corniche, Casablanca',
      coordinates: { lat: 33.6084, lng: -7.6325 },
      openingHours: '09:00-18:00',
      entryFee: { adult: 12, child: 6, currency: 'EUR' },
      rating: 4.6,
      reviews: 15420,
      images: ['/images/hassan-ii-mosque.jpg'],
      highlights: ['Architettura moderna', 'Vista oceano', 'Visita guidata'],
      unescoBySite: false
    }],
    districts: [{
      name: 'Medina Antica',
      description: 'Centro storico tradizionale',
      characteristics: ['Mercati tradizionali', 'Architettura storica'],
      mainAttractions: ['Mercato centrale'],
      accommodation: 'all' as const
    }],
    transportation: {
      airport: { name: 'Mohammed V', code: 'CMN', distance: '30km' },
      trainStation: { name: 'Casa Port', connections: ['Rabat', 'Fez'] },
      busStation: { name: 'Gare Routière', companies: ['CTM', 'Supratours'] },
      localTransport: ['Tram', 'Bus', 'Taxi'],
      taxis: { available: true, tips: ['Concordare il prezzo'] }
    },
    accommodation: [],
    dining: [],
    shopping: [],
    experiences: [],
    practicalInfo: {
      currency: 'Dirham marocchino (MAD)',
      languages: ['Arabo', 'Francese', 'Berbero'],
      emergencyNumbers: { police: '19', medical: '15', fire: '15', tourist: '177' },
      hospitals: [],
      banks: [],
      tips: { cultural: [], safety: [], bargaining: [], photography: [] }
    },
    weather: { currentSeason: 'Inverno' },
    seo: {
      metaTitle: 'Casablanca Marocco: Guida Completa 2025 | Morocco Dreams',
      metaDescription: 'Scopri Casablanca: la Moschea Hassan II, quartieri storici, ristoranti.',
      keywords: ['Casablanca', 'Marocco', 'Hassan II'],
      structuredData: {}
    },
    images: {
      hero: '/images/casablanca-hero.jpg',
      gallery: ['/images/casablanca-1.jpg'],
      map: '/images/casablanca-map.jpg'
    },
    published: true,
    featured: true,
    priority: 1,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-15')
  }
];

export class CityPagesService {
  // Get all cities
  static async getAllCities(): Promise<CityData[]> {
    try {
      // Usa dati statici per evitare errori Firestore
      return CITIES_DATA;
    } catch (error) {
      console.error('Error fetching cities:', error);
      return CITIES_DATA;
    }
  }

  // Get published cities
  static async getPublishedCities(): Promise<CityData[]> {
    try {
      return CITIES_DATA.filter(city => city.published);
    } catch (error) {
      console.error('Error fetching published cities:', error);
      return CITIES_DATA.filter(city => city.published);
    }
  }

  // Get city by slug
  static async getCityBySlug(slug: string): Promise<CityData | null> {
    try {
      const cities = await firestoreService.getWhere<CityData>('cities', 'slug', '==', slug);
      return cities.length > 0 ? cities[0] : null;
    } catch (error) {
      console.error('Error fetching city by slug:', error);
      return null;
    }
  }

  // Save city
  static async saveCity(city: Omit<CityData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      return await firestoreService.create('cities', {
        ...city,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error saving city:', error);
      throw error;
    }
  }

  // Update city
  static async updateCity(cityId: string, updates: Partial<CityData>): Promise<void> {
    try {
      await firestoreService.update('cities', cityId, {
        ...updates,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating city:', error);
      throw error;
    }
  }

  // Generate city page content
  static generateCityPageContent(city: CityData): CMSContent {
    return {
      type: 'page',
      title: `Guida Completa a ${city.name}`,
      slug: `citta/${city.slug}`,
      content: {
        it: {
          title: `${city.name} - ${city.nameArabic}`,
          description: city.overview.description,
          body: this.generateCityPageHTML(city),
          meta: {
            title: city.seo.metaTitle,
            description: city.seo.metaDescription,
            keywords: city.seo.keywords
          }
        }
      },
      published: city.published,
      featured: city.featured,
      category: 'city',
      tags: [city.region, 'città', 'guida', 'marocco'],
      images: [city.images.hero, ...city.images.gallery],
      author: 'Morocco Dreams',
      createdAt: city.createdAt || new Date(),
      updatedAt: city.updatedAt || new Date()
    };
  }

  // Generate HTML content for city page
  private static generateCityPageHTML(city: CityData): string {
    return `
      <div class="city-page">
        <!-- Hero Section -->
        <section class="hero-section">
          <h1>${city.name} - ${city.nameArabic}</h1>
          <p class="lead">${city.overview.description}</p>
        </section>

        <!-- Overview -->
        <section class="overview">
          <h2>Panoramica</h2>
          <div class="city-facts">
            <div class="fact">
              <strong>Regione:</strong> ${city.region}
            </div>
            <div class="fact">
              <strong>Popolazione:</strong> ${city.population.toLocaleString()}
            </div>
            <div class="fact">
              <strong>Clima:</strong> ${city.climate.type}
            </div>
            <div class="fact">
              <strong>Miglior periodo:</strong> ${city.climate.bestVisitMonths.join(', ')}
            </div>
          </div>
          <p>${city.overview.history}</p>
        </section>

        <!-- Attractions -->
        <section class="attractions">
          <h2>Principali Attrazioni</h2>
          <div class="attractions-grid">
            ${city.attractions.map(attraction => `
              <div class="attraction-card">
                <h3>${attraction.name}</h3>
                <p>${attraction.description}</p>
                <div class="attraction-meta">
                  <span class="rating">⭐ ${attraction.rating}</span>
                  <span class="reviews">(${attraction.reviews} recensioni)</span>
                  ${attraction.unescoBySite ? '<span class="unesco">UNESCO</span>' : ''}
                </div>
                ${attraction.entryFee ? `
                  <div class="entry-fee">
                    Ingresso: €${attraction.entryFee.adult} adulti, €${attraction.entryFee.child} bambini
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Districts -->
        <section class="districts">
          <h2>Quartieri</h2>
          ${city.districts.map(district => `
            <div class="district">
              <h3>${district.name}</h3>
              <p>${district.description}</p>
              <ul>
                ${district.characteristics.map(char => `<li>${char}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </section>

        <!-- Practical Info -->
        <section class="practical-info">
          <h2>Informazioni Pratiche</h2>
          
          <h3>Trasporti</h3>
          ${city.transportation.airport ? `
            <p><strong>Aeroporto:</strong> ${city.transportation.airport.name} (${city.transportation.airport.code}) - ${city.transportation.airport.distance}</p>
          ` : ''}
          
          <h3>Emergenze</h3>
          <ul>
            <li>Polizia: ${city.practicalInfo.emergencyNumbers.police}</li>
            <li>Emergenze mediche: ${city.practicalInfo.emergencyNumbers.medical}</li>
            <li>Vigili del fuoco: ${city.practicalInfo.emergencyNumbers.fire}</li>
            <li>Informazioni turistiche: ${city.practicalInfo.emergencyNumbers.tourist}</li>
          </ul>

          <h3>Consigli Utili</h3>
          <div class="tips">
            <h4>Culturali</h4>
            <ul>
              ${city.practicalInfo.tips.cultural.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
            
            <h4>Sicurezza</h4>
            <ul>
              ${city.practicalInfo.tips.safety.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
          </div>
        </section>
      </div>
    `;
  }

  // Create sample cities data
  static async createSampleCities(): Promise<void> {
    const sampleCities: Omit<CityData, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: 'Marrakech',
        slug: 'marrakech',
        nameArabic: 'مراكش',
        region: 'Marrakech-Safi',
        coordinates: { latitude: 31.6295, longitude: -7.9811 },
        population: 928850,
        elevation: 466,
        timezone: 'UTC+1',
        climate: {
          type: 'Semi-arido',
          bestVisitMonths: ['Marzo', 'Aprile', 'Maggio', 'Ottobre', 'Novembre'],
          averageTemp: {
            summer: { min: 20, max: 37 },
            winter: { min: 6, max: 18 }
          },
          rainfall: 'Scarsa (250mm/anno)'
        },
        overview: {
          description: 'Marrakech, la "Perla Rossa", è una delle città imperiali del Marocco, famosa per la sua medina patrimonio UNESCO, i suoi giardini lussureggianti e l\'atmosfera magica dei suoi souq.',
          history: 'Fondata nel 1062 dalla dinastia Almoravide, Marrakech è stata per secoli un importante centro commerciale e culturale, punto di incontro tra il Sahara e le coste atlantiche.',
          culture: 'Centro vitale della cultura berbera e araba, con tradizioni musicali, artigianali e culinarie uniche.',
          economy: ['Turismo', 'Artigianato', 'Agricoltura', 'Servizi']
        },
        attractions: [
          {
            id: 'jemaa-el-fnaa',
            name: 'Piazza Jemaa el-Fnaa',
            type: 'market',
            description: 'Il cuore pulsante di Marrakech, dichiarata Patrimonio UNESCO, dove ogni sera si anima con artisti di strada, bancarelle di cibo e spettacoli tradizionali.',
            address: 'Medina, Marrakech',
            coordinates: { lat: 31.6260, lng: -7.9890 },
            openingHours: '24/7',
            rating: 4.8,
            reviews: 15420,
            images: ['/images/jemaa-el-fnaa.png'],
            highlights: ['Patrimonio UNESCO', 'Spettacoli serali', 'Cibo di strada'],
            unescoBySite: true
          },
          {
            id: 'koutoubia',
            name: 'Moschea della Koutoubia',
            type: 'religious',
            description: 'Il minareto più famoso di Marrakech, simbolo della città e capolavoro dell\'architettura almohade del XII secolo.',
            address: 'Avenue Mohammed V, Marrakech',
            coordinates: { lat: 31.6236, lng: -7.9926 },
            openingHours: 'Solo esterno visitabile',
            rating: 4.7,
            reviews: 8930,
            images: ['/images/koutoubia.png'],
            highlights: ['Architettura almohade', 'Simbolo della città', 'Giardini panoramici']
          }
        ],
        districts: [
          {
            name: 'Medina',
            description: 'Il centro storico patrimonio UNESCO con la famosa piazza Jemaa el-Fnaa e i souq tradizionali.',
            characteristics: ['Architettura tradizionale', 'Souq autentici', 'Riad storici'],
            mainAttractions: ['Jemaa el-Fnaa', 'Koutoubia', 'Souq'],
            accommodation: 'all'
          },
          {
            name: 'Gueliz',
            description: 'Il quartiere moderno con negozi, ristoranti e vita notturna contemporanea.',
            characteristics: ['Architettura coloniale', 'Shopping moderno', 'Ristoranti internazionali'],
            mainAttractions: ['Teatro Reale', 'Mercato centrale'],
            accommodation: 'luxury'
          }
        ],
        transportation: {
          airport: {
            name: 'Aeroporto Internazionale Marrakech Menara',
            code: 'RAK',
            distance: '6 km dal centro'
          },
          trainStation: {
            name: 'Stazione di Marrakech',
            connections: ['Casablanca', 'Rabat', 'Fes']
          },
          busStation: {
            name: 'Gare Routière',
            companies: ['CTM', 'Supratours', 'ONCF']
          },
          localTransport: ['Taxi', 'Autobus', 'Calesse'],
          taxis: {
            available: true,
            tips: ['Concordare il prezzo prima', 'Piccoli taxi rossi per la città']
          }
        },
        accommodation: [],
        dining: [],
        shopping: [],
        experiences: [],
        practicalInfo: {
          currency: 'Dirham marocchino (MAD)',
          languages: ['Arabo', 'Berbero', 'Francese'],
          emergencyNumbers: {
            police: '190',
            medical: '150',
            fire: '150',
            tourist: '+212 524 206 479'
          },
          hospitals: [
            {
              name: 'Clinique du Sud',
              address: 'Rue Yougoslavie, Gueliz',
              phone: '+212 524 447 999',
              type: 'private'
            }
          ],
          banks: [
            {
              name: 'Attijariwafa Bank',
              locations: ['Gueliz', 'Medina', 'Aeroporto'],
              atmAvailable: true
            }
          ],
          tips: {
            cultural: ['Vestirsi modestamente nelle moschee', 'Rispettare il Ramadan'],
            safety: ['Tenere i documenti al sicuro', 'Evitare zone isolate di notte'],
            bargaining: ['Contrattare nei souq è normale', 'Iniziare con 1/3 del prezzo richiesto'],
            photography: ['Chiedere permesso per ritratti', 'Evitare foto nelle moschee']
          }
        },
        weather: {
          currentSeason: 'Primavera'
        },
        seo: {
          metaTitle: 'Marrakech: Guida Completa alla Perla Rossa del Marocco',
          metaDescription: 'Scopri Marrakech: attrazioni, quartieri, consigli pratici e tutto quello che devi sapere sulla città imperiale del Marocco.',
          keywords: ['Marrakech', 'Marocco', 'Jemaa el-Fnaa', 'Medina', 'Koutoubia', 'Viaggi'],
          structuredData: {}
        },
        images: {
          hero: '/images/marrakech-hero.png',
          gallery: ['/images/marrakech-1.png', '/images/marrakech-2.png'],
          map: '/images/marrakech-map.png'
        },
        published: true,
        featured: true,
        priority: 1
      }
    ];

    for (const city of sampleCities) {
      await this.saveCity(city);
    }
  }

  // Search cities
  static searchCities(cities: CityData[], query: string): CityData[] {
    const searchTerm = query.toLowerCase();
    return cities.filter(city =>
      city.name.toLowerCase().includes(searchTerm) ||
      city.nameArabic.includes(searchTerm) ||
      city.region.toLowerCase().includes(searchTerm) ||
      city.overview.description.toLowerCase().includes(searchTerm)
    );
  }

  // Get cities by region
  static getCitiesByRegion(cities: CityData[], region: string): CityData[] {
    return cities.filter(city => city.region === region);
  }

  // Get featured cities
  static getFeaturedCities(cities: CityData[]): CityData[] {
    return cities.filter(city => city.featured && city.published)
                .sort((a, b) => a.priority - b.priority);
  }
}