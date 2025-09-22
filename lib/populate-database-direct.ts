// Direct database population with upsert logic and proper error handling
import { firestoreService, COLLECTIONS } from './firestore';

// Safe population with upsert by slug/unique identifiers
export async function populateDatabaseDirect() {
  console.log('🚀 Starting safe database population...');
  
  const results = {
    cities: [] as Array<{ id: string; name: string; action: 'created' | 'updated' }>,
    experiences: [] as Array<{ id: string; title: string; action: 'created' | 'updated' }>,
    travels: [] as Array<{ id: string; title: string; action: 'created' | 'updated' }>,
    blog: [] as Array<{ id: string; title: string; action: 'created' | 'updated' }>,
    packageComponents: [] as Array<{ id: string; name: string; action: 'created' | 'updated' }>,
    errors: [] as string[]
  };

  try {
    // Cities data with upsert by slug - COMPLETE DATA FROM CODEBASE
    const citiesData = [
      {
        name: "Marrakech",
        slug: "marrakech",
        title: "La Perla Rossa",
        description: "Città vibrante con la famosa piazza Jemaa el-Fnaa e souks colorati",
        image: "/images/marrakech-medina.png",
        highlights: ["Jemaa el-Fnaa", "Souks", "Giardini Majorelle", "Palazzo Bahia", "Koutoubia"],
        duration: "2-3 giorni",
        bestTime: "Ottobre - Aprile",
        rating: 4.9,
        reviews: 234,
        category: 'imperial-cities' as const,
        published: true,
        featured: true,
        coordinates: { lat: 31.6295, lng: -7.9811 },
        region: "Marrakech-Safi",
        population: "928,850"
      },
      {
        name: "Fès",
        slug: "fes",
        title: "Capitale Spirituale",
        description: "La medina più grande del mondo e centro della cultura islamica",
        image: "/images/fes-architecture.png",
        highlights: ["Medina UNESCO", "Università Al Quaraouiyine", "Concerie Chouara", "Palazzo Reale"],
        duration: "2-3 giorni",
        bestTime: "Marzo - Maggio, Settembre - Novembre",
        rating: 4.8,
        reviews: 189,
        category: 'imperial-cities' as const,
        published: true,
        featured: true,
        coordinates: { lat: 34.0181, lng: -5.0078 },
        region: "Fès-Meknès",
        population: "1,112,072"
      },
      {
        name: "Casablanca",
        slug: "casablanca",
        title: "Capitale Economica",
        description: "La capitale economica del Marocco, moderna e cosmopolita",
        image: "/images/casablanca-hassan.png",
        highlights: ["Moschea Hassan II", "Corniche", "Quartiere Habous", "Centro Moderno"],
        duration: "1-2 giorni",
        bestTime: "Tutto l'anno",
        rating: 4.5,
        reviews: 167,
        category: 'imperial-cities' as const,
        published: true,
        featured: false,
        coordinates: { lat: 33.5731, lng: -7.5898 },
        region: "Casablanca-Settat",
        population: "3,359,818"
      },
      {
        name: "Rabat",
        slug: "rabat",
        title: "Capitale Moderna",
        description: "La capitale moderna del Marocco, patrimonio UNESCO",
        image: "/images/imperial-cities-tour.png",
        highlights: ["Torre Hassan", "Kasbah Oudayas", "Mausoleo Mohammed V", "Chellah"],
        duration: "1-2 giorni",
        bestTime: "Tutto l'anno",
        rating: 4.6,
        reviews: 143,
        category: 'imperial-cities' as const,
        published: true,
        featured: false,
        coordinates: { lat: 33.9716, lng: -6.8498 },
        region: "Rabat-Salé-Kénitra",
        population: "577,827"
      },
      {
        name: "Chefchaouen",
        slug: "chefchaouen",
        title: "La Perla Blu",
        description: "La perla blu del Rif, città dalle case azzurre",
        image: "/images/chefchaouen-blue.png",
        highlights: ["Medina blu", "Monti del Rif", "Artigianato", "Cascate Akchour"],
        duration: "1-2 giorni",
        bestTime: "Aprile - Ottobre",
        rating: 4.9,
        reviews: 298,
        category: 'mountains' as const,
        published: true,
        featured: true,
        coordinates: { lat: 35.1688, lng: -5.2636 },
        region: "Tanger-Tétouan-Al Hoceima",
        population: "42,786"
      },
      {
        name: "Essaouira",
        slug: "essaouira",
        title: "La Città del Vento",
        description: "La città del vento, perla della costa atlantica",
        image: "/images/essaouira-coast.png",
        highlights: ["Medina UNESCO", "Porto", "Spiagge", "Argan"],
        duration: "2-3 giorni",
        bestTime: "Aprile - Ottobre",
        rating: 4.7,
        reviews: 201,
        category: 'coast' as const,
        published: true,
        featured: true,
        coordinates: { lat: 31.5085, lng: -9.7595 },
        region: "Marrakech-Safi",
        population: "77,966"
      },
      {
        name: "Meknes",
        slug: "meknes",
        title: "La Versailles del Marocco",
        description: "Monumenti imperiali grandiosi e atmosfera più rilassata",
        image: "/images/imperial-cities.png",
        highlights: ["Bab Mansour", "Mausoleo Moulay Ismail", "Heri es-Souani", "Volubilis"],
        duration: "1-2 giorni",
        bestTime: "Tutto l'anno",
        rating: 4.7,
        reviews: 156,
        category: 'imperial-cities' as const,
        published: true,
        featured: false,
        coordinates: { lat: 33.8730, lng: -5.5407 },
        region: "Fès-Meknès",
        population: "632,079"
      }
    ];

    // Upsert cities by slug
    for (const city of citiesData) {
      try {
        const existing = await firestoreService.getWhere(COLLECTIONS.cities, 'slug', '==', city.slug);
        if (existing.length > 0) {
          const existingCity = existing[0] as any;
          await firestoreService.update(COLLECTIONS.cities, existingCity.id!, city);
          results.cities.push({ id: existingCity.id!, name: city.name, action: 'updated' });
        } else {
          const cityId = await firestoreService.create(COLLECTIONS.cities, city);
          results.cities.push({ id: cityId, name: city.name, action: 'created' });
        }
      } catch (error) {
        results.errors.push(`City ${city.name}: ${(error as Error).message}`);
      }
    }

    // Experiences data with upsert by title - COMPLETE DATA FROM CODEBASE
    const experiencesData = [
      // COOKING EXPERIENCES
      {
        title: "Cucina Tradizionale",
        description: "Impara a preparare i piatti iconici della cucina marocchina con chef locali",
        images: ["/images/cooking-class.png"],
        price: 65,
        duration: "4 ore",
        category: 'cooking' as const,
        published: true,
        rating: 4.9,
        reviews: 234,
        maxParticipants: 8,
        includes: ["Tagine di pollo", "Couscous", "Pastilla", "Tè alla menta", "Ingredienti locali", "Ricette scritte"],
        location: "Marrakech"
      },
      {
        title: "Cucina Vegetariana",
        description: "Scopri la ricchezza della cucina vegetariana marocchina",
        images: ["/images/vegetarian-cooking.png"],
        price: 55,
        duration: "3.5 ore",
        category: 'cooking' as const,
        published: true,
        rating: 4.8,
        reviews: 156,
        maxParticipants: 10,
        includes: ["Tagine di verdure", "Couscous vegetariano", "Briouats", "Harira"],
        location: "Marrakech"
      },
      {
        title: "Cucina Avanzata",
        description: "Perfeziona le tue abilità con tecniche avanzate da chef",
        images: ["/images/advanced-cooking.png"],
        price: 120,
        duration: "6 ore",
        category: 'cooking' as const,
        published: true,
        rating: 4.9,
        reviews: 89,
        maxParticipants: 6,
        includes: ["Mechoui", "Pastilla complessa", "Dolci tradizionali", "Conserve"],
        location: "Fes"
      },
      // HAMMAM EXPERIENCES
      {
        title: "Hammam Tradizionale",
        description: "Rituale completo secondo le antiche tradizioni marocchine",
        images: ["/images/traditional-hammam.jpg"],
        price: 45,
        duration: "2-3 ore",
        category: 'hammam' as const,
        published: true,
        rating: 4.9,
        reviews: 234,
        maxParticipants: 12,
        includes: ["Bagno turco", "Scrub con sapone nero", "Massaggio con guanto", "Maschera all'argilla", "Tè alla menta"],
        location: "Marrakech"
      },
      {
        title: "Hammam di Lusso",
        description: "Trattamento esclusivo in ambiente raffinato con prodotti premium",
        images: ["/images/luxury-hammam.jpg"],
        price: 120,
        duration: "3-4 ore",
        category: 'hammam' as const,
        published: true,
        rating: 4.8,
        reviews: 156,
        maxParticipants: 4,
        includes: ["Hammam privato", "Massaggio argan", "Trattamenti viso", "Prodotti biologici", "Refreshment gourmet"],
        location: "Marrakech"
      },
      {
        title: "Hammam di Coppia",
        description: "Esperienza intima per due persone in ambiente riservato",
        images: ["/images/couple-hammam.jpg"],
        price: 180,
        duration: "2.5 ore",
        category: 'hammam' as const,
        published: true,
        rating: 4.9,
        reviews: 89,
        maxParticipants: 2,
        includes: ["Hammam privato coppia", "Massaggio di coppia", "Champagne", "Petali di rosa", "Atmosfera romantica"],
        location: "Essaouira"
      },
      // TREKKING EXPERIENCES
      {
        title: "Trekking Atlante Alto",
        description: "Attraversa villaggi berberi e valli mozzafiato nel cuore dell'Alto Atlante",
        images: ["/images/atlas-mountains.png"],
        price: 180,
        duration: "3-7 giorni",
        category: 'trekking' as const,
        published: true,
        rating: 4.8,
        reviews: 167,
        maxParticipants: 12,
        includes: ["Guide locali", "Pernottamento rifugi", "Muli per bagagli", "Pasti tradizionali"],
        location: "Alto Atlante"
      },
      {
        title: "Trekking Toubkal",
        description: "Conquista la vetta più alta del Nord Africa a 4.167m",
        images: ["/images/toubkal-summit.png"],
        price: 220,
        duration: "2 giorni",
        category: 'trekking' as const,
        published: true,
        rating: 4.9,
        reviews: 145,
        maxParticipants: 8,
        includes: ["Guida di montagna", "Rifugio Toubkal", "Attrezzatura sicurezza", "Certificato sommità"],
        location: "Imlil"
      },
      // SURF EXPERIENCES
      {
        title: "Surf Taghazout Principianti",
        description: "Lezioni di surf per principianti nelle acque di Taghazout",
        images: ["/images/essaouira-coast.png"],
        price: 220,
        duration: "4-7 giorni",
        category: 'surf' as const,
        published: true,
        rating: 4.7,
        reviews: 198,
        maxParticipants: 10,
        includes: ["Tavole e mute", "Istruttori certificati", "Spot sicuri", "Trasporti spiagge"],
        location: "Taghazout"
      },
      {
        title: "Surf Camp Avanzato",
        description: "Perfeziona la tua tecnica negli spot leggendari di Anchor Point",
        images: ["/images/surf-advanced.png"],
        price: 280,
        duration: "5-7 giorni",
        category: 'surf' as const,
        published: true,
        rating: 4.8,
        reviews: 134,
        maxParticipants: 6,
        includes: ["Spot avanzati", "Video analisi", "Coaching personalizzato", "Previsioni onde"],
        location: "Taghazout"
      },
      // PHOTOGRAPHY EXPERIENCES
      {
        title: "Workshop Fotografia Deserto",
        description: "Cattura la magia del deserto con fotografi professionisti",
        images: ["/images/photo-tour.png"],
        price: 150,
        duration: "1-2 giorni",
        category: 'photography' as const,
        published: true,
        rating: 4.9,
        reviews: 112,
        maxParticipants: 8,
        includes: ["Coaching tecnico", "Golden/Blue Hour", "Elaborazione campo", "Portfolio review"],
        location: "Merzouga"
      },
      {
        title: "Street Photography Medina",
        description: "Immortala la vita quotidiana nelle medine storiche",
        images: ["/images/street-photography.png"],
        price: 80,
        duration: "Mezza giornata",
        category: 'photography' as const,
        published: true,
        rating: 4.7,
        reviews: 89,
        maxParticipants: 6,
        includes: ["Permessi speciali", "Guida locale", "Etica fotografica", "Stampe immediate"],
        location: "Fes"
      },
      // CRAFTS EXPERIENCES
      {
        title: "Laboratorio Ceramica",
        description: "Dalla lavorazione dell'argilla alla smaltatura con maestri ceramisti",
        images: ["/images/moroccan-souk.png"],
        price: 45,
        duration: "2-4 ore",
        category: 'crafts' as const,
        published: true,
        rating: 4.8,
        reviews: 234,
        maxParticipants: 12,
        includes: ["Argilla locale", "Tornio pottery", "Smaltatura", "Cottura fornace"],
        location: "Safi"
      },
      {
        title: "Tessitura Berbera",
        description: "Tappeti e tessuti su telai tradizionali con lane naturali",
        images: ["/images/berber-weaving.png"],
        price: 65,
        duration: "4-6 ore",
        category: 'crafts' as const,
        published: true,
        rating: 4.9,
        reviews: 156,
        maxParticipants: 8,
        includes: ["Telaio tradizionale", "Lane colorate", "Motivi berberi", "Piccolo tappeto"],
        location: "Tinghir"
      },
      {
        title: "Lavorazione Pelle",
        description: "Tecniche di concia naturale e cuciture artigianali",
        images: ["/images/leather-crafts.png"],
        price: 55,
        duration: "3-5 ore",
        category: 'crafts' as const,
        published: true,
        rating: 4.7,
        reviews: 98,
        maxParticipants: 10,
        includes: ["Conceria tradizionale", "Strumenti artigiano", "Cuciture mano", "Borsa personalizzata"],
        location: "Fes"
      }
    ];

    // Upsert experiences by title
    for (const experience of experiencesData) {
      try {
        const existing = await firestoreService.getWhere(COLLECTIONS.experiences, 'title', '==', experience.title);
        if (existing.length > 0) {
          const existingExp = existing[0] as any;
          // Only update if the category matches or if we're updating an existing record completely
          await firestoreService.update(COLLECTIONS.experiences, existingExp.id!, { 
            title: experience.title,
            description: experience.description,
            images: experience.images,
            price: experience.price,
            duration: experience.duration,
            category: experience.category,
            published: experience.published,
            rating: experience.rating,
            reviews: experience.reviews,
            maxParticipants: experience.maxParticipants,
            includes: experience.includes,
            location: experience.location,
            updatedAt: new Date(), 
            createdAt: existingExp.createdAt 
          });
          results.experiences.push({ id: existingExp.id!, title: experience.title, action: 'updated' });
        } else {
          const expId = await firestoreService.create(COLLECTIONS.experiences, { 
            ...experience, 
            createdAt: new Date(), 
            updatedAt: new Date() 
          });
          results.experiences.push({ id: expId, title: experience.title, action: 'created' });
        }
      } catch (error) {
        results.errors.push(`Experience ${experience.title}: ${(error as Error).message}`);
      }
    }

    // Travels data (basic package structure)
    const travelsData = [
      {
        id: 'imperial-cities-tour',
        title: 'Tour delle Città Imperiali',
        description: 'Scopri le quattro città imperiali del Marocco: Fez, Meknes, Rabat e Marrakech.',
        duration: '8 giorni',
        price: 1200,
        category: 'cultural',
        published: true,
        featured: true,
        images: ['/images/fez-mosque.jpg', '/images/marrakech-square.jpg'],
        itinerary: ['Giorno 1: Arrivo a Casablanca', 'Giorno 2-3: Fez', 'Giorno 4-5: Meknes e Rabat', 'Giorno 6-8: Marrakech'],
        includes: ['Trasporti privati', 'Guide locali', 'Pernottamenti in riad tradizionali'],
        rating: 4.8,
        reviews: 156
      }
    ];

    // Blog data  
    const blogData = [
      {
        title: 'Guida Completa al Viaggio in Marocco',
        slug: 'guida-completa-viaggio-marocco',
        excerpt: 'Tutto quello che devi sapere per organizzare il tuo primo viaggio in Marocco.',
        content: 'Il Marocco è una destinazione che affascina con i suoi colori, profumi e tradizioni millenarie...',
        author: 'Morocco Dreams Team',
        publishedAt: new Date('2024-01-15'),
        published: true,
        featured: true,
        category: 'guide',
        tags: ['viaggio', 'consigli', 'cultura'],
        readTime: 8,
        image: '/images/blog/morocco-guide.jpg'
      }
    ];

    // Package components data
    const packageComponentsData = [
      {
        name: "Riad Tradizionale",
        type: 'accommodation' as const,
        description: "Riad autentico nel cuore della medina con architettura tradizionale",
        price: 120,
        duration: "per notte",
        capacity: 2,
        category: "Premium",
        location: "Medina",
        available: true,
        providers: ["Riad Atlas", "Riad Marrakech"],
        inclusions: ["Colazione tradizionale", "WiFi", "Aria condizionata", "Terrazza panoramica"],
        exclusions: ["Pranzi", "Cene", "Bevande"]
      }
    ];

    // Upsert package components by name
    for (const component of packageComponentsData) {
      try {
        const existing = await firestoreService.getWhere(COLLECTIONS.packageComponents, 'name', '==', component.name);
        if (existing.length > 0) {
          const existingComp = existing[0] as any;
          await firestoreService.update(COLLECTIONS.packageComponents, existingComp.id!, component);
          results.packageComponents.push({ id: existingComp.id!, name: component.name, action: 'updated' });
        } else {
          const compId = await firestoreService.create(COLLECTIONS.packageComponents, component);
          results.packageComponents.push({ id: compId, name: component.name, action: 'created' });
        }
      } catch (error) {
        results.errors.push(`Component ${component.name}: ${(error as Error).message}`);
      }
    }

    // Upsert travels by title
    for (const travel of travelsData) {
      try {
        const existing = await firestoreService.getWhere(COLLECTIONS.travels, 'title', '==', travel.title);
        if (existing.length > 0) {
          const existingTravel = existing[0] as any;
          await firestoreService.update(COLLECTIONS.travels, existingTravel.id!, travel);
          results.travels.push({ id: existingTravel.id!, title: travel.title, action: 'updated' });
        } else {
          const travelId = await firestoreService.create(COLLECTIONS.travels, travel);
          results.travels.push({ id: travelId, title: travel.title, action: 'created' });
        }
      } catch (error) {
        results.errors.push(`Travel ${travel.title}: ${(error as Error).message}`);
      }
    }

    // Upsert blog posts by slug
    for (const post of blogData) {
      try {
        const existing = await firestoreService.getWhere(COLLECTIONS.blog, 'slug', '==', post.slug);
        if (existing.length > 0) {
          const existingPost = existing[0] as any;
          await firestoreService.update(COLLECTIONS.blog, existingPost.id!, post);
          results.blog.push({ id: existingPost.id!, title: post.title, action: 'updated' });
        } else {
          const postId = await firestoreService.create(COLLECTIONS.blog, post);
          results.blog.push({ id: postId, title: post.title, action: 'created' });
        }
      } catch (error) {
        results.errors.push(`Blog ${post.title}: ${(error as Error).message}`);
      }
    }

    return {
      success: true,
      message: 'Database popolato con successo!',
      results,
      summary: {
        cities: results.cities.length,
        experiences: results.experiences.length,
        travels: results.travels.length,
        blog: results.blog.length,
        packageComponents: results.packageComponents.length,
        errors: results.errors.length
      }
    };

  } catch (error) {
    console.error('Error populating database:', error);
    return {
      success: false,
      error: 'Errore durante la popolazione del database',
      details: error
    };
  }
}