import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';

// Firebase config (utilizziamo le variabili d'ambiente)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample travels data
const sampleTravels = [
  {
    title: "Tour delle Città Imperiali",
    description: "Scopri le quattro città imperiali del Marocco in un viaggio indimenticabile attraverso storia, cultura e tradizioni millenarie.",
    category: "imperial-cities",
    duration: "8 giorni / 7 notti",
    price: 890,
    originalPrice: 1090,
    rating: 4.9,
    reviews: 127,
    images: ["/images/imperial-cities-tour.png", "/images/fez-medina.jpg"],
    highlights: ["Medine UNESCO", "Palazzi reali", "Souks autentici", "Guide esperte"],
    itinerary: [
      { day: 1, title: "Arrivo a Marrakech", description: "Transfer dall'aeroporto, check-in hotel, visita Jemaa el-Fnaa" },
      { day: 2, title: "Marrakech", description: "Visita completa: Palazzo Bahia, Saadian Tombs, Koutoubia" },
      { day: 3, title: "Marrakech - Casablanca", description: "Viaggio verso Casablanca, visita Hassan II Mosque" }
    ],
    included: ["Hotel 4 stelle", "Prima colazione", "Guide locali", "Trasporti"],
    excluded: ["Voli internazionali", "Pranzi e cene", "Extra personali"],
    status: "published",
    published: true,
    featured: true,
    slug: "tour-citta-imperiali",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Avventura nel Deserto del Sahara",
    description: "Vivi l'esperienza magica del Sahara con notti sotto le stelle e tramonti mozzafiato sulle dune dorate.",
    category: "desert",
    duration: "4 giorni / 3 notti",
    price: 450,
    originalPrice: 550,
    rating: 4.8,
    reviews: 89,
    images: ["/images/sahara-adventure.png", "/images/desert-camp.jpg"],
    highlights: ["Notte nel deserto", "Cammelli", "Alba sulle dune", "Campo berbero"],
    itinerary: [
      { day: 1, title: "Marrakech - Ouarzazate", description: "Partenza via Atlas Mountains, visita Kasbah Ait Ben Haddou" },
      { day: 2, title: "Ouarzazate - Merzouga", description: "Viaggio verso il deserto, escursione in cammello al tramonto" },
      { day: 3, title: "Merzouga - Erfoud", description: "Alba sulle dune, visita fossili, rientro verso città" }
    ],
    included: ["Campo nel deserto", "Escursione cammelli", "Cena berbera", "Trasporti 4x4"],
    excluded: ["Hotel città", "Pranzi", "Bevande alcooliche"],
    status: "published",
    published: true,
    featured: true,
    slug: "avventura-sahara",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Costa Atlantica e Surfing",
    description: "Esplora la costa atlantica del Marocco con le sue spiagge infinite e i migliori spot per il surf.",
    category: "coast",
    duration: "6 giorni / 5 notti",
    price: 650,
    rating: 4.7,
    reviews: 65,
    images: ["/images/atlantic-coast.png", "/images/essaouira.jpg"],
    highlights: ["Lezioni di surf", "Essaouira medina", "Spiagge infinite", "Pesce fresco"],
    itinerary: [
      { day: 1, title: "Arrivo Agadir", description: "Transfer, check-in, orientamento città" },
      { day: 2, title: "Surf e relax", description: "Lezioni di surf mattina, pomeriggio libero spiaggia" },
      { day: 3, title: "Essaouira", description: "Escursione giornata intera nella città del vento" }
    ],
    included: ["Hotel fronte mare", "Lezioni surf", "Trasporti", "Guide locali"],
    excluded: ["Voli", "Pranzi", "Attrezzatura surf avanzata"],
    status: "published",
    published: true,
    featured: false,
    slug: "costa-atlantica-surf",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Sample experiences data
const sampleExperiences = [
  {
    title: "Corso di Cucina Marocchina",
    description: "Impara i segreti della cucina tradizionale marocchina con chef locali esperti.",
    category: "cooking",
    duration: "4 ore",
    price: 85,
    rating: 4.9,
    reviews: 156,
    images: ["/images/cooking-class.png", "/images/tagine-cooking.jpg"],
    highlights: ["Chef professionali", "Ricette autentiche", "Mercato locale", "Cena inclusa"],
    included: ["Ingredienti", "Ricettario", "Cena", "Certificato"],
    excluded: ["Trasporto", "Bevande alcooliche"],
    locations: ["Marrakech", "Fez", "Casablanca"],
    status: "published",
    published: true,
    featured: true,
    slug: "corso-cucina-marocchina",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Trekking Monte Toubkal",
    description: "Conquista la vetta più alta del Nord Africa con guide esperte berbere.",
    category: "trekking",
    duration: "3 giorni / 2 notti",
    price: 320,
    rating: 4.6,
    reviews: 78,
    images: ["/images/toubkal-trek.png", "/images/atlas-mountains.jpg"],
    highlights: ["Vetta 4167m", "Guide berbere", "Rifugio montagna", "Panorami incredibili"],
    included: ["Guide", "Rifugio", "Attrezzatura base", "Trasporto"],
    excluded: ["Attrezzatura tecnica", "Assicurazione", "Pranzi"],
    locations: ["Imlil", "Atlas Mountains"],
    status: "published",
    published: true,
    featured: true,
    slug: "trekking-toubkal",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Sample services data
const sampleServices = [
  {
    name: "Trasferimenti Aeroporto",
    description: "Servizio di trasferimento professionale dall'aeroporto al tuo hotel con comfort e sicurezza.",
    category: "transport",
    type: "transfer",
    price: 25,
    priceType: "per_trip",
    locations: ["Marrakech", "Casablanca", "Fez", "Agadir"],
    features: ["Disponibile 24/7", "Meet & Greet", "Veicoli moderni", "Autisti professionali"],
    status: "published",
    published: true,
    slug: "trasferimenti-aeroporto",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Guide Private Certificate",
    description: "Guide esperte locali per un'esperienza autentica e personalizzata della cultura marocchina.",
    category: "guide",
    type: "private",
    price: 80,
    priceType: "per_day",
    locations: ["Marrakech", "Fez", "Casablanca", "Meknes", "Chefchaouen"],
    features: ["Guide certificate", "Lingue multiple", "Conoscenza locale", "Flessibilità totale"],
    status: "published",
    published: true,
    slug: "guide-private",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Noleggio Auto Completo",
    description: "Flotta moderna di veicoli per esplorare il Marocco in totale libertà e sicurezza.",
    category: "transport",
    type: "rental",
    price: 18,
    priceType: "per_day",
    locations: ["Marrakech", "Casablanca", "Agadir", "Fez", "Rabat"],
    features: ["Km illimitati", "Assicurazione completa", "Assistenza 24/7", "Consegna aeroporto"],
    status: "published",
    published: true,
    slug: "noleggio-auto",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Assicurazione Viaggio Premium",
    description: "Protezione completa per viaggiare in sicurezza e serenità con copertura medica estesa.",
    category: "insurance",
    type: "comprehensive",
    price: 15,
    priceType: "per_person",
    locations: ["Globale"],
    features: ["Copertura medica", "Annullamento viaggio", "Bagagli protetti", "Assistenza H24"],
    status: "published",
    published: true,
    slug: "assicurazione-premium",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function populateDatabase() {
  try {
    console.log('🚀 Inizio popolamento database...');
    
    // Add travels
    console.log('📍 Aggiunta viaggi...');
    for (const travel of sampleTravels) {
      const docRef = await addDoc(collection(db, 'travels'), travel);
      console.log(`✅ Viaggio aggiunto: ${travel.title} (ID: ${docRef.id})`);
    }
    
    // Add experiences  
    console.log('🎯 Aggiunta esperienze...');
    for (const experience of sampleExperiences) {
      const docRef = await addDoc(collection(db, 'experiences'), experience);
      console.log(`✅ Esperienza aggiunta: ${experience.title} (ID: ${docRef.id})`);
    }
    
    // Add services
    console.log('🔧 Aggiunta servizi...');
    for (const service of sampleServices) {
      const docRef = await addDoc(collection(db, 'services'), service);
      console.log(`✅ Servizio aggiunto: ${service.name} (ID: ${docRef.id})`);
    }
    
    // Add sample cities
    console.log('🏙️ Aggiunta città...');
    const sampleCities = [
      {
        name: "Marrakech",
        description: "La città rossa, cuore pulsante del Marocco",
        image: "/images/marrakech.jpg",
        coordinates: { lat: 31.6295, lng: -7.9811 },
        attractions: ["Jemaa el-Fnaa", "Koutoubia", "Palazzo Bahia"],
        status: "published",
        published: true
      },
      {
        name: "Fez",
        description: "Capitale culturale e spirituale, con la medina più grande al mondo",
        image: "/images/fez.jpg", 
        coordinates: { lat: 34.0181, lng: -5.0078 },
        attractions: ["Medina di Fez", "Università Al-Karaouine", "Concerie"],
        status: "published",
        published: true
      }
    ];
    
    for (const city of sampleCities) {
      const docRef = await addDoc(collection(db, 'cities'), city);
      console.log(`✅ Città aggiunta: ${city.name} (ID: ${docRef.id})`);
    }
    
    console.log('🎉 Database popolato con successo!');
    console.log('📊 Statistiche:');
    console.log(`- ${sampleTravels.length} viaggi`);
    console.log(`- ${sampleExperiences.length} esperienze`); 
    console.log(`- ${sampleServices.length} servizi`);
    console.log(`- ${sampleCities.length} città`);
    
  } catch (error) {
    console.error('❌ Errore durante il popolamento:', error);
    throw error;
  }
}

// Run the population script
populateDatabase()
  .then(() => {
    console.log('✅ Script completato con successo');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script fallito:', error);
    process.exit(1);
  });