// Complete Database Population System - Organized Content Structure
// Separates cities, experiences, travels, services properly

import { adminDb } from '@/lib/auth-admin'
import { COLLECTIONS } from '@/lib/firestore-schema'

export async function populateCompleteDatabase(force: boolean = false) {
  if (!adminDb) {
    throw new Error('Admin database not available')
  }

  const results = {
    cities: 0,
    experiences: 0,
    travels: 0,
    services: 0,
    blog: 0,
    errors: [] as string[]
  }

  try {
    // === CITIES DATA ===
    const citiesData = [
      {
        name: "Marrakech",
        slug: "marrakech",
        title: "La Perla Rossa",
        description: "Città vibrante con la famosa piazza Jemaa el-Fnaa e souks colorati",
        region: "Marrakech-Safi",
        coordinates: { lat: 31.6295, lng: -7.9811 },
        population: "928,850",
        image: "/images/marrakech-medina.png",
        gallery: ["/images/marrakech-medina.png", "/images/marrakech-souks.png"],
        highlights: ["Jemaa el-Fnaa", "Souks", "Giardini Majorelle", "Palazzo Bahia", "Koutoubia"],
        overview: {
          description: "Marrakech è una delle quattro città imperiali del Marocco, famosa per la sua energia vibrante e la ricca storia culturale.",
          history: "Fondata nel 1062, è stata la capitale di vari imperi berberi.",
          culture: "Centro culturale con tradizioni millenarie di artigianato e commercio.",
          economy: ["Turismo", "Artigianato", "Agricoltura", "Servizi"]
        },
        category: 'imperial-cities' as const,
        duration: "2-3 giorni",
        bestTime: "Ottobre - Aprile",
        rating: 4.9,
        reviews: 234,
        published: true,
        featured: true
      },
      {
        name: "Fès",
        slug: "fes",
        title: "Capitale Spirituale",
        description: "La medina più grande del mondo e centro della cultura islamica",
        region: "Fès-Meknès",
        coordinates: { lat: 34.0181, lng: -5.0078 },
        population: "1,112,072",
        image: "/images/fes-architecture.png",
        highlights: ["Medina UNESCO", "Università Al Quaraouiyine", "Concerie Chouara", "Palazzo Reale"],
        overview: {
          description: "Fès è il centro spirituale e culturale del Marocco, con la medina meglio conservata del mondo arabo.",
          history: "Fondata nel 789, ospita la più antica università del mondo continuamente operativa.",
          culture: "Centro dell'apprendimento islamico e delle arti tradizionali marocchine."
        },
        category: 'imperial-cities' as const,
        duration: "2-3 giorni",
        bestTime: "Marzo - Maggio, Settembre - Novembre",
        rating: 4.8,
        reviews: 189,
        published: true,
        featured: true
      },
      {
        name: "Chefchaouen",
        slug: "chefchaouen",
        title: "La Perla Blu",
        description: "La perla blu del Rif, città dalle case azzurre",
        region: "Tanger-Tétouan-Al Hoceima",
        coordinates: { lat: 35.1688, lng: -5.2636 },
        population: "42,786",
        image: "/images/chefchaouen-blue.png",
        highlights: ["Medina blu", "Monti del Rif", "Artigianato", "Cascate Akchour"],
        overview: {
          description: "Città montana unica per le sue case dipinte di blu, immersa nei monti del Rif.",
          culture: "Influenze andaluse e berbere in un'atmosfera rilassata e artistica."
        },
        category: 'mountains' as const,
        duration: "1-2 giorni",
        bestTime: "Aprile - Ottobre",
        rating: 4.9,
        reviews: 298,
        published: true,
        featured: true
      },
      {
        name: "Essaouira",
        slug: "essaouira",
        title: "La Città del Vento",
        description: "La città del vento, perla della costa atlantica",
        region: "Marrakech-Safi",
        coordinates: { lat: 31.5085, lng: -9.7595 },
        population: "77,966",
        image: "/images/essaouira-coast.png",
        highlights: ["Medina UNESCO", "Porto", "Spiagge", "Argan"],
        overview: {
          description: "Città costiera fortificata con un'atmosfera bohémien e venti costanti ideali per gli sport acquatici."
        },
        category: 'coast' as const,
        duration: "2-3 giorni",
        bestTime: "Aprile - Ottobre",
        rating: 4.7,
        reviews: 201,
        published: true,
        featured: true
      }
    ]

    // Populate cities
    for (const city of citiesData) {
      try {
        const docData = {
          ...city,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
        // Check if exists by slug
        const existing = await adminDb.collection(COLLECTIONS.cities)
          .where('slug', '==', city.slug).get()
        
        if (existing.empty || force) {
          if (!existing.empty && force) {
            await adminDb.collection(COLLECTIONS.cities).doc(existing.docs[0].id).delete()
          }
          
          await adminDb.collection(COLLECTIONS.cities).add(docData)
          results.cities++
        }
      } catch (error) {
        results.errors.push(`City ${city.name}: ${error}`)
      }
    }

    // === EXPERIENCES DATA ===
    const experiencesData = [
      {
        title: "Cucina Tradizionale Marocchina",
        slug: "cucina-tradizionale",
        description: "Impara a preparare i piatti iconici della cucina marocchina con chef locali",
        longDescription: "Un'esperienza culinaria autentica per scoprire i segreti della cucina marocchina. Imparerai a preparare tagine, couscous e altri piatti tradizionali utilizzando spezie locali e tecniche tramandate da generazioni.",
        images: ["/images/cooking-class.png", "/images/tagine-cooking.png"],
        price: 65,
        currency: "EUR",
        duration: "4 ore",
        maxParticipants: 8,
        category: 'cooking' as const,
        includes: ["Ingredienti freschi", "Ricette scritte", "Pasto completo", "Tè alla menta", "Certificato partecipazione"],
        location: "Marrakech",
        meetingPoint: "Riad della Medina",
        rating: 4.9,
        reviews: 234,
        published: true,
        featured: true
      },
      {
        title: "Hammam Tradizionale",
        slug: "hammam-tradizionale",
        description: "Rituale completo secondo le antiche tradizioni marocchine",
        longDescription: "Sperimenta l'autentico rituale del hammam berbero con sapone nero, guanto kessa e rilassamento totale.",
        images: ["/images/traditional-hammam.jpg"],
        price: 45,
        currency: "EUR", 
        duration: "2-3 ore",
        maxParticipants: 12,
        category: 'hammam' as const,
        includes: ["Bagno turco", "Scrub sapone nero", "Massaggio guanto", "Maschera argilla", "Tè alla menta"],
        location: "Marrakech",
        rating: 4.9,
        reviews: 234,
        published: true,
        featured: true
      },
      {
        title: "Trekking Alto Atlante",
        slug: "trekking-alto-atlante",
        description: "Attraversa villaggi berberi e valli mozzafiato nel cuore dell'Alto Atlante",
        images: ["/images/atlas-mountains.png"],
        price: 180,
        currency: "EUR",
        duration: "3-7 giorni",
        maxParticipants: 12,
        difficulty: 'moderate' as const,
        category: 'trekking' as const,
        includes: ["Guide locali", "Pernottamento rifugi", "Muli per bagagli", "Pasti tradizionali"],
        location: "Alto Atlante",
        rating: 4.8,
        reviews: 167,
        published: true,
        featured: true
      },
      {
        title: "Surf a Taghazout",
        slug: "surf-taghazout",
        description: "Lezioni di surf per tutti i livelli nelle acque di Taghazout",
        images: ["/images/essaouira-coast.png"],
        price: 220,
        currency: "EUR",
        duration: "4-7 giorni",
        maxParticipants: 10,
        category: 'surf' as const,
        includes: ["Tavole e mute", "Istruttori certificati", "Spot sicuri", "Trasporti spiagge"],
        location: "Taghazout",
        rating: 4.7,
        reviews: 198,
        published: true,
        featured: false
      },
      {
        title: "Workshop Fotografia",
        slug: "workshop-fotografia",
        description: "Cattura la magia del Marocco con fotografi professionisti",
        images: ["/images/photo-tour.png"],
        price: 150,
        currency: "EUR",
        duration: "1-2 giorni",
        maxParticipants: 8,
        category: 'photography' as const,
        includes: ["Coaching tecnico", "Golden/Blue Hour", "Elaborazione campo", "Portfolio review"],
        location: "Merzouga",
        rating: 4.9,
        reviews: 112,
        published: true,
        featured: true
      }
    ]

    // Populate experiences
    for (const experience of experiencesData) {
      try {
        const docData = {
          ...experience,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
        const existing = await adminDb.collection(COLLECTIONS.experiences)
          .where('slug', '==', experience.slug).get()
        
        if (existing.empty || force) {
          if (!existing.empty && force) {
            await adminDb.collection(COLLECTIONS.experiences).doc(existing.docs[0].id).delete()
          }
          
          await adminDb.collection(COLLECTIONS.experiences).add(docData)
          results.experiences++
        }
      } catch (error) {
        results.errors.push(`Experience ${experience.title}: ${error}`)
      }
    }

    // === TRAVELS (PACKAGES) DATA ===
    const travelsData = [
      {
        title: "Grand Tour delle 4 Città Imperiali",
        slug: "grand-tour-citta-imperiali",
        description: "Scopri tutte e quattro le città imperiali del Marocco con guide locali esperte",
        images: ["/images/imperial-cities-tour.png"],
        price: 890,
        originalPrice: 1090,
        currency: "EUR",
        duration: "8 giorni / 7 notti",
        category: 'imperial-cities' as const,
        includes: ["Tutte e 4 le città", "Guide locali", "Trasporti privati", "Hotel 4*", "Colazioni"],
        notIncludes: ["Voli internazionali", "Pranzi e cene", "Bevande", "Mance"],
        highlights: ["Fes Medina UNESCO", "Meknes Bab Mansour", "Rabat Hassan Tower", "Marrakech Jemaa el-Fnaa"],
        rating: 4.9,
        reviews: 127,
        published: true,
        featured: true
      },
      {
        title: "Tour del Deserto Sahara - 3 Giorni",
        slug: "tour-deserto-sahara",
        description: "Avventura nel deserto di Merzouga con notte nel campo tendato",
        images: ["/images/sahara-sunset.png"],
        price: 320,
        originalPrice: 420,
        currency: "EUR",
        duration: "3 giorni / 2 notti",
        category: 'desert' as const,
        includes: ["4x4 privato", "Cammellata tramonto", "Campo berbero", "Pasti tradizionali"],
        highlights: ["Dune Erg Chebbi", "Alba nel deserto", "Musica berbera", "Notte stelle"],
        rating: 4.9,
        reviews: 203,
        published: true,
        featured: true
      },
      {
        title: "Costa Atlantica e Essaouira",
        slug: "costa-atlantica-essaouira",
        description: "Relax sulla costa atlantica con Essaouira e le spiagge più belle del Marocco",
        images: ["/images/essaouira-coast.png"],
        price: 450,
        originalPrice: 580,
        currency: "EUR",
        duration: "6 giorni / 5 notti",
        category: 'coast' as const,
        includes: ["Hotel vista mare", "Escursioni costiere", "Degustazioni pesce"],
        highlights: ["Medina Essaouira", "Spiagge Agadir", "Cooperative argan"],
        rating: 4.6,
        reviews: 134,
        published: true,
        featured: false
      }
    ]

    // Populate travels
    for (const travel of travelsData) {
      try {
        const docData = {
          ...travel,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
        const existing = await adminDb.collection(COLLECTIONS.travels)
          .where('slug', '==', travel.slug).get()
        
        if (existing.empty || force) {
          if (!existing.empty && force) {
            await adminDb.collection(COLLECTIONS.travels).doc(existing.docs[0].id).delete()
          }
          
          await adminDb.collection(COLLECTIONS.travels).add(docData)
          results.travels++
        }
      } catch (error) {
        results.errors.push(`Travel ${travel.title}: ${error}`)
      }
    }

    // === SERVICES (EXTRAS) DATA ===
    const servicesData = [
      {
        name: "Trasferimento Aeroporto",
        slug: "trasferimento-aeroporto",
        description: "Servizio di trasferimento privato da/per aeroporto",
        category: 'transport' as const,
        type: 'optional' as const,
        price: 35,
        priceType: 'per_group' as const,
        currency: "EUR",
        locations: ["Marrakech", "Casablanca", "Fes"],
        published: true
      },
      {
        name: "Guida Turistica Privata",
        slug: "guida-privata",
        description: "Guida turistica privata certificata per mezza o intera giornata",
        category: 'guide' as const,
        type: 'addon' as const,
        price: 80,
        priceType: 'per_day' as const,
        currency: "EUR",
        locations: ["Marrakech", "Fes", "Rabat", "Meknes"],
        published: true
      },
      {
        name: "Assicurazione Viaggio",
        slug: "assicurazione-viaggio",
        description: "Copertura assicurativa completa per il viaggio",
        category: 'insurance' as const,
        type: 'optional' as const,
        price: 25,
        priceType: 'per_person' as const,
        currency: "EUR",
        published: true
      }
    ]

    // Populate services
    for (const service of servicesData) {
      try {
        const docData = {
          ...service,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
        const existing = await adminDb.collection(COLLECTIONS.services)
          .where('slug', '==', service.slug).get()
        
        if (existing.empty || force) {
          if (!existing.empty && force) {
            await adminDb.collection(COLLECTIONS.services).doc(existing.docs[0].id).delete()
          }
          
          await adminDb.collection(COLLECTIONS.services).add(docData)
          results.services++
        }
      } catch (error) {
        results.errors.push(`Service ${service.name}: ${error}`)
      }
    }

    return results

  } catch (error) {
    console.error('Database population error:', error)
    results.errors.push(`General error: ${error}`)
    return results
  }
}