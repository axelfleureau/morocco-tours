// Script to populate Firestore database with existing page data
import { firestoreService, COLLECTIONS } from '../lib/firestore';
import { serverTimestamp } from 'firebase/firestore';

// Cities data from app/viaggi/citta-imperiali/page.tsx
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
    coordinates: { lat: 33.8935, lng: -5.5473 },
    region: "Fès-Meknès",
    population: "632,079"
  },
  {
    name: "Rabat",
    slug: "rabat",
    title: "Capitale Moderna",
    description: "Perfetto equilibrio tra tradizione e modernità",
    image: "/images/imperial-cities-tour.png",
    highlights: ["Torre Hassan", "Kasbah Oudayas", "Mausoleo Mohammed V", "Chellah"],
    duration: "1-2 giorni",
    bestTime: "Tutto l'anno",
    rating: 4.6,
    reviews: 143,
    category: 'imperial-cities' as const,
    published: true,
    featured: false,
    coordinates: { lat: 34.0209, lng: -6.8416 },
    region: "Rabat-Salé-Kénitra",
    population: "577,827"
  }
];

// Experiences data from various experience pages
const experiencesData = [
  // Cooking Classes
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
    description: "Perfeziona le tue abilità con tecniche avanzate",
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
  // Hammam Experiences
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
    maxParticipants: 6,
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
    location: "Marrakech"
  },
  // Photography Workshops
  {
    title: "Workshop di Fotografia - Medina",
    description: "Cattura l'essenza delle medine marocchine con guida professionale",
    images: ["/images/photo-tour.png"],
    price: 85,
    duration: "5 ore",
    category: 'photography' as const,
    published: true,
    rating: 4.8,
    reviews: 124,
    maxParticipants: 8,
    includes: ["Guida fotografo", "Location esclusive", "Tecniche avanzate", "Post-produzione"],
    location: "Fes"
  },
  // Desert Adventures
  {
    title: "Quad e Cammelli nel Sahara",
    description: "Combina adrenalina e tradizione nel cuore del deserto",
    images: ["/images/sahara-sunset.png"],
    price: 150,
    duration: "1 giorno",
    category: 'trekking' as const,
    published: true,
    rating: 4.9,
    reviews: 198,
    maxParticipants: 12,
    includes: ["Quad bike", "Trekking cammelli", "Pranzo nel deserto", "Guide berbere"],
    location: "Merzouga"
  }
];

// Travels data from group tours and imperial cities
const travelsData = [
  {
    title: "Grand Tour delle 4 Città Imperiali",
    description: "Un viaggio completo attraverso le quattro città imperiali del Marocco, scoprendo palazzi, medine e tradizioni millenarie.",
    images: ["/images/imperial-cities-tour.png"],
    price: 890,
    originalPrice: 1090,
    duration: "8 giorni / 7 notti",
    category: 'imperial-cities' as const,
    featured: true,
    published: true,
    rating: 4.9,
    reviews: 127,
    includes: ["Tutte e 4 le città", "Guide locali", "Trasporti privati", "Hotel 4*"],
    notIncludes: ["Voli internazionali", "Pranzi", "Bevande", "Spese personali"],
    highlights: ["Marrakech", "Fes", "Meknes", "Rabat"],
    itinerary: [
      { day: 1, title: "Arrivo a Marrakech", description: "Trasferimento dall'aeroporto, check-in hotel, prima esplorazione della medina" },
      { day: 2, title: "Marrakech - Città Rossa", description: "Visita completa: Palazzo Bahia, Giardini Majorelle, Piazza Jemaa el-Fnaa" },
      { day: 3, title: "Marrakech - Fes", description: "Partenza per Fes attraverso il Medio Atlante, sosta a Ifrane" },
      { day: 4, title: "Fes - Capitale Spirituale", description: "Tour completo della medina: Università Al Quaraouiyine, concerie, souks" },
      { day: 5, title: "Fes - Meknes", description: "Visita di Meknes: Bab Mansour, Mausoleo Moulay Ismail, scuderie reali" },
      { day: 6, title: "Meknes - Rabat", description: "Trasferimento a Rabat, visita Torre Hassan e Kasbah degli Oudayas" },
      { day: 7, title: "Rabat - Casablanca", description: "Visita di Casablanca: Moschea Hassan II, Corniche" },
      { day: 8, title: "Partenza", description: "Trasferimento in aeroporto e volo di ritorno" }
    ],
    maxParticipants: 16,
    difficulty: 2,
    bestFor: "Chi vuole vedere tutte le città iconiche con zero pensieri",
    season: "Tutto l'anno"
  },
  {
    title: "Avventura nel Deserto del Sahara",
    description: "Un'esperienza magica nel cuore del Sahara con notti in campo tendato e trekking sui cammelli.",
    images: ["/images/sahara-adventure.png"],
    price: 650,
    originalPrice: 750,
    duration: "5 giorni / 4 notti",
    category: 'desert' as const,
    featured: true,
    published: true,
    rating: 4.8,
    reviews: 89,
    includes: ["4 notti in hotel/campo tendato", "Trasferimenti 4x4", "Guida berbera", "Trekking cammelli", "Assicurazione base"],
    notIncludes: ["Voli internazionali", "Pranzi", "Bevande", "Mance", "Assicurazione annullamento"],
    highlights: ["Merzouga", "Cammelli", "Notte sotto le stelle", "Berberi"],
    itinerary: [
      { day: 1, title: "Arrivo a Merzouga", description: "Trasferimento in hotel, preparazione per l'escursione nel deserto" },
      { day: 2, title: "Merzouga - Erg Chebbi", description: "Trekking a dorso di cammello, notte in campo tendato nel deserto" },
      { day: 3, title: "Deserto del Sahara", description: "Esplorazione delle dune, incontro con nomadi berberi" },
      { day: 4, title: "Merzouga - Rissani", description: "Visita al mercato di Rissani, rientro a Merzouga" },
      { day: 5, title: "Partenza", description: "Trasferimento in aeroporto e volo di ritorno" }
    ],
    maxParticipants: 8,
    difficulty: 3,
    bestFor: "Cercatori di avventura e natura",
    season: "Ottobre - Aprile"
  },
  {
    title: "Tesori del Sud",
    description: "Esplora le meraviglie del sud del Marocco, dalle kasbah alle gole spettacolari dell'Atlante.",
    images: ["/images/south-treasures.png"],
    price: 1290,
    originalPrice: 1490,
    duration: "7 giorni / 6 notti",
    category: 'mountains' as const,
    featured: false,
    published: true,
    rating: 4.7,
    reviews: 45,
    includes: ["6 notti hotel", "Trasferimenti", "Guide locali", "Visite incluse"],
    notIncludes: ["Voli", "Pranzi", "Bevande", "Extra"],
    highlights: ["Ouarzazate", "Aït Benhaddou", "Dadès", "Todra"],
    itinerary: [
      { day: 1, title: "Arrivo a Ouarzazate", description: "Check-in e visita della città del cinema" },
      { day: 2, title: "Ouarzazate - Aït Benhaddou", description: "Visita della kasbah patrimonio UNESCO" },
      { day: 3, title: "Valle del Dadès", description: "Escursione nelle gole del Dadès" },
      { day: 4, title: "Gole del Todra", description: "Trekking nelle spettacolari gole" },
      { day: 5, title: "Valle delle Rose", description: "Visita dei villaggi berberi" },
      { day: 6, title: "Ritorno Ouarzazate", description: "Relax e shopping" },
      { day: 7, title: "Partenza", description: "Trasferimento aeroporto" }
    ],
    maxParticipants: 12,
    difficulty: 2,
    bestFor: "Amanti della natura e cultura berbera",
    season: "Marzo - Novembre"
  }
];

// Blog posts data
const blogData = [
  {
    title: "10 Piatti Marocchini che Devi Assolutamente Provare",
    slug: "10-piatti-marocchini-da-provare",
    excerpt: "Scopri i sapori autentici del Marocco attraverso i suoi piatti tradizionali più amati.",
    content: `
La cucina marocchina è un viaggio sensoriale unico che combina spezie aromatiche, ingredienti freschi e tecniche culinarie millenarie. Ecco i 10 piatti che non puoi perdere durante il tuo viaggio in Marocco.

## 1. Tagine
Il piatto nazionale del Marocco, cotto lentamente nel caratteristico recipiente conico di terracotta. Che sia di pollo con olive e limoni conservati o di agnello con prugne, ogni tagine è un'esplosione di sapori.

## 2. Couscous
Servito tradizionalmente il venerdì, il couscous è preparato con verdure di stagione e carne, accompagnato da un brodo speziato che esalta ogni ingrediente.

## 3. Pastilla
Una torta salata ripiena di piccione (o pollo), mandorle e spezie dolci, avvolta in sottili fogli di pasta fillo. Un perfetto equilibrio tra dolce e salato.

## 4. Harira
La zuppa tradizionale consumata durante il Ramadan, a base di lenticchie, pomodori, carne e erbe fresche. Nutriente e ricca di sapore.

## 5. Mechoui
Agnello arrosto cotto lentamente fino a diventare tenerissimo, servito con spezie locali. Una specialità delle regioni del sud.

## 6. Briouats
Triangoli di pasta fillo croccanti ripieni di carne speziata, formaggio o mandorle dolci. Perfetti come aperitivo o dessert.

## 7. Rfissa
Un piatto comfort a base di pollo sfilacciato servito su letti di pasta spezzata e lenticchie, aromatizzato con fenugreek.

## 8. Kefta
Polpette di carne speziata, spesso servite in salsa di pomodoro o grigliate su spiedini. Semplici ma deliziose.

## 9. Chebakia
Un dolce tradizionale a forma di fiore, fritto e immerso nel miele, spesso servito durante il Ramadan con tè alla menta.

## 10. Tè alla Menta
Non è un piatto, ma nessun pasto marocchino è completo senza il tradizionale atay - tè verde con menta fresca e zucchero, servito in piccoli bicchieri decorati.

Ogni piatto racconta una storia e rappresenta secoli di tradizioni culinarie che si tramandano di generazione in generazione. Durante il tuo viaggio in Marocco, non perdere l'opportunità di partecipare a un corso di cucina per imparare a preparare questi deliziosi piatti!
    `,
    featuredImage: "/images/moroccan-cuisine.jpg",
    images: ["/images/tagine-dish.png", "/images/couscous-dish.png", "/images/pastilla-dish.png"],
    category: 'food' as const,
    tags: ["cucina", "tradizioni", "gastronomia", "ricette"],
    author: {
      name: "Sara El Mansouri",
      avatar: "/images/chef-sara.jpg",
      bio: "Chef specializzata in cucina tradizionale marocchina"
    },
    seoData: {
      title: "10 Piatti Marocchini Tradizionali da Provare - Morocco Dreams",
      description: "Scopri i sapori autentici del Marocco: dalla tagine al couscous, ecco i 10 piatti tradizionali che devi assolutamente provare durante il tuo viaggio.",
      keywords: ["cucina marocchina", "piatti tradizionali", "tagine", "couscous", "gastronomia"]
    },
    readTime: 8,
    published: true,
    featured: true,
    views: 1250,
    likes: 89
  },
  {
    title: "Guida Completa alle Città Imperiali del Marocco",
    slug: "guida-citta-imperiali-marocco",
    excerpt: "Marrakech, Fes, Meknes e Rabat: scopri la storia, l'architettura e i segreti delle quattro capitali storiche del Marocco.",
    content: `
Le quattro città imperiali del Marocco - Marrakech, Fes, Meknes e Rabat - sono testimoni viventi di secoli di storia, arte e cultura. Ogni città ha servito come capitale dell'impero in epoche diverse, lasciando un patrimonio architettonico e culturale straordinario.

## Marrakech - La Perla del Sud
Fondata nel 1062, Marrakech è famosa per la sua medina vibrante e la celebre piazza Jemaa el-Fnaa. La città offre:
- **Palazzo Bahia**: Capolavoro dell'architettura marocchina
- **Giardini Majorelle**: Oasi di pace created da Yves Saint Laurent
- **Koutoubia**: Il minareto simbolo della città
- **Souks**: Labirinto di mercati tradizionali

## Fes - La Capitale Spirituale
Capitale culturale e spirituale del Marocco, Fes ospita:
- **Medina Patrimonio UNESCO**: La più grande del mondo
- **Università Al Quaraouiyine**: La più antica università ancora funzionante
- **Concerie Chouara**: Laboratori di pelletteria tradizionali
- **Palazzo Reale**: Magnifiche porte dorate

## Meknes - La Versailles del Marocco
Voluta dal sultano Moulay Ismail, Meknes impressiona con:
- **Bab Mansour**: Una delle porte più belle del Marocco
- **Mausoleo Moulay Ismail**: Architettura imperiale raffinata
- **Heri es-Souani**: Granai e scuderie reali
- **Volubilis**: Rovine romane nelle vicinanze

## Rabat - La Capitale Moderna
Attuale capitale del regno, Rabat bilancia tradizione e modernità:
- **Torre Hassan**: Minareto incompiuto del XII secolo
- **Kasbah degli Oudayas**: Cittadella con vista sull'oceano
- **Mausoleo Mohammed V**: Architettura contemporanea
- **Chellah**: Necropoli antica

## Consigli per la Visita
- **Durata**: Dedica almeno 2 giorni a Marrakech e Fes, 1-2 giorni a Meknes e Rabat
- **Periodo migliore**: Primavera e autunno per clima ideale
- **Trasporti**: Treno ad alta velocità tra le città principali
- **Guide**: Consigliata per comprendere la storia e le tradizioni

Ogni città imperiale offre un'esperienza unica e rappresenta un capitolo diverso della storia marocchina. Un viaggio attraverso tutte e quattro è un'immersione completa nella ricchezza culturale del regno.
    `,
    featuredImage: "/images/imperial-cities-overview.jpg",
    images: ["/images/marrakech-medina.png", "/images/fes-architecture.png", "/images/imperial-cities.png"],
    category: 'travel-tips' as const,
    tags: ["città imperiali", "storia", "architettura", "cultura", "viaggio"],
    author: {
      name: "Ahmed Benali",
      avatar: "/images/guide-ahmed.jpg", 
      bio: "Guida turistica specializzata in storia del Marocco"
    },
    seoData: {
      title: "Guida alle Città Imperiali del Marocco: Marrakech, Fes, Meknes, Rabat",
      description: "Scopri le quattro città imperiali del Marocco: storia, architettura e cosa vedere a Marrakech, Fes, Meknes e Rabat. Guida completa per il tuo viaggio.",
      keywords: ["città imperiali", "Marrakech", "Fes", "Meknes", "Rabat", "viaggio Marocco"]
    },
    readTime: 12,
    published: true,
    featured: true,
    views: 2100,
    likes: 156
  }
];

// Package components for package builder
const packageComponentsData = [
  // Accommodation
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
  },
  {
    name: "Hotel 4 Stelle",
    type: 'accommodation' as const,
    description: "Hotel moderno con tutti i comfort e servizi internazionali",
    price: 80,
    duration: "per notte",
    capacity: 2,
    category: "Standard",
    location: "Città Nuova",
    available: true,
    providers: ["Hotel Atlas", "Hotel Marrakech"],
    inclusions: ["Colazione buffet", "WiFi", "Piscina", "Palestra"],
    exclusions: ["Pasti", "Minibar", "Spa"]
  },
  // Transport
  {
    name: "Trasferimento Privato",
    type: 'transport' as const,
    description: "Trasporto privato con autista esperto per massimo comfort",
    price: 150,
    duration: "per giorno",
    capacity: 4,
    category: "Premium",
    location: "Tutto il Marocco",
    available: true,
    providers: ["Morocco Transport", "Atlas Tours"],
    inclusions: ["Autista esperto", "Carburante", "Pedaggi", "Acqua"],
    exclusions: ["Mance", "Pasti autista"]
  },
  {
    name: "Minibus Gruppo",
    type: 'transport' as const,
    description: "Trasporto di gruppo per viaggi economici e socializzazione",
    price: 60,
    duration: "per giorno",
    capacity: 16,
    category: "Economy",
    location: "Principali destinazioni",
    available: true,
    providers: ["Group Travel", "Morocco Bus"],
    inclusions: ["Autista", "Carburante", "Aria condizionata"],
    exclusions: ["Guide", "Biglietti ingresso"]
  },
  // Activities
  {
    name: "Tour Medina con Guida",
    type: 'activity' as const,
    description: "Esplorazione guidata della medina con guida locale esperta",
    price: 45,
    duration: "3 ore",
    capacity: 8,
    category: "Cultura",
    location: "Medina",
    available: true,
    providers: ["Local Guides", "Medina Tours"],
    inclusions: ["Guida locale", "Biglietti monumenti", "Tè di benvenuto"],
    exclusions: ["Pranzo", "Shopping", "Mance"]
  },
  {
    name: "Corso di Cucina",
    type: 'activity' as const,
    description: "Impara a cucinare piatti tradizionali marocchini",
    price: 65,
    duration: "4 ore",
    capacity: 8,
    category: "Cucina",
    location: "Cucina tradizionale",
    available: true,
    providers: ["Cooking Class", "Culinary Morocco"],
    inclusions: ["Ingredienti", "Ricette", "Pranzo preparato", "Certificato"],
    exclusions: ["Trasporti", "Bevande alcoliche"]
  },
  // Meals
  {
    name: "Cena Tradizionale",
    type: 'meal' as const,
    description: "Cena tipica marocchina con spettacolo folkloristico",
    price: 35,
    duration: "2 ore",
    capacity: 50,
    category: "Tradizionale",
    location: "Ristorante tipico",
    available: true,
    providers: ["Restaurant Atlas", "Folklore Dinner"],
    inclusions: ["Menu 3 portate", "Spettacolo", "Tè alla menta"],
    exclusions: ["Bevande alcoliche", "Trasporti"]
  },
  // Guide services
  {
    name: "Guida Privata",
    type: 'guide' as const,
    description: "Guida turistica privata parlante italiano",
    price: 100,
    duration: "per giorno",
    capacity: 8,
    category: "Premium",
    location: "Ovunque",
    available: true,
    providers: ["Professional Guides", "Morocco Experts"],
    inclusions: ["Guida qualificata", "Spiegazioni dettagliate", "Consigli personali"],
    exclusions: ["Trasporti", "Biglietti", "Pasti"]
  }
];

export async function populateDatabase() {
  console.log('🚀 Starting database population...');
  
  try {
    // Populate Cities
    console.log('📍 Populating cities...');
    for (const city of citiesData) {
      const cityId = await firestoreService.create(COLLECTIONS.cities, city);
      console.log(`✅ Created city: ${city.name} (${cityId})`);
    }

    // Populate Experiences
    console.log('🎯 Populating experiences...');
    for (const experience of experiencesData) {
      const expId = await firestoreService.create(COLLECTIONS.experiences, experience);
      console.log(`✅ Created experience: ${experience.title} (${expId})`);
    }

    // Populate Travels
    console.log('🗺️ Populating travels...');
    for (const travel of travelsData) {
      const travelId = await firestoreService.create(COLLECTIONS.travels, travel);
      console.log(`✅ Created travel: ${travel.title} (${travelId})`);
    }

    // Populate Blog Posts
    console.log('📝 Populating blog posts...');
    for (const post of blogData) {
      const postId = await firestoreService.create(COLLECTIONS.blog, post);
      console.log(`✅ Created blog post: ${post.title} (${postId})`);
    }

    // Populate Package Components
    console.log('📦 Populating package components...');
    for (const component of packageComponentsData) {
      const compId = await firestoreService.create(COLLECTIONS.packageComponents, component);
      console.log(`✅ Created component: ${component.name} (${compId})`);
    }

    console.log('🎉 Database population completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - ${citiesData.length} cities`);
    console.log(`   - ${experiencesData.length} experiences`);
    console.log(`   - ${travelsData.length} travels`);
    console.log(`   - ${blogData.length} blog posts`);
    console.log(`   - ${packageComponentsData.length} package components`);

  } catch (error) {
    console.error('❌ Error populating database:', error);
    throw error;
  }
}

// Run the script if called directly
if (require.main === module) {
  populateDatabase().catch(console.error);
}