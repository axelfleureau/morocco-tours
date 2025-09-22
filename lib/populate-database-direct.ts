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
    // Cities data with upsert by slug
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
        name: "Fes",
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

    // Experiences data with upsert by title
    const experiencesData = [
      {
        title: "Cucina Tradizionale",
        description: "Impara a preparare i piatti iconici della cucina marocchina",
        images: ["/images/cooking-class.png"],
        price: 65,
        duration: "4 ore",
        category: 'cooking' as const,
        published: true,
        rating: 4.9,
        reviews: 234,
        maxParticipants: 8,
        includes: ["Tagine di pollo", "Couscous", "Pastilla", "Tè alla menta"],
        location: "Marrakech"
      },
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
      }
    ];

    // Upsert experiences by title
    for (const experience of experiencesData) {
      try {
        const existing = await firestoreService.getWhere(COLLECTIONS.experiences, 'title', '==', experience.title);
        if (existing.length > 0) {
          const existingExp = existing[0] as any;
          await firestoreService.update(COLLECTIONS.experiences, existingExp.id!, { 
            ...experience, 
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