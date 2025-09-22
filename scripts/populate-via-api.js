// Popolamento database tramite API admin esistente
const API_BASE = 'http://localhost:5000/api/admin/content';

// Sample data
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
    slug: "tour-citta-imperiali"
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
    status: "published",
    published: true,
    featured: true,
    slug: "avventura-sahara"
  },
  {
    title: "Costa Atlantica e Surfing",
    description: "Esplora la costa atlantica del Marocco con le sue spiagge infinite e i migliori spot per il surf.",
    category: "coast", 
    duration: "6 giorni / 5 notti",
    price: 650,
    rating: 4.7,
    reviews: 65,
    images: ["/images/atlantic-coast.png"],
    highlights: ["Lezioni di surf", "Essaouira medina", "Spiagge infinite", "Pesce fresco"],
    status: "published",
    published: true,
    featured: false,
    slug: "costa-atlantica-surf"
  }
];

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
    slug: "trasferimenti-aeroporto"
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
    slug: "guide-private"
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
    slug: "noleggio-auto"
  }
];

const sampleExperiences = [
  {
    title: "Corso di Cucina Marocchina",
    description: "Impara i segreti della cucina tradizionale marocchina con chef locali esperti.",
    category: "cooking",
    duration: "4 ore",
    price: 85,
    rating: 4.9,
    reviews: 156,
    images: ["/images/cooking-class.png"],
    highlights: ["Chef professionali", "Ricette autentiche", "Mercato locale", "Cena inclusa"],
    included: ["Ingredienti", "Ricettario", "Cena", "Certificato"],
    excluded: ["Trasporto", "Bevande alcooliche"],
    locations: ["Marrakech", "Fez", "Casablanca"],
    status: "published",
    published: true,
    featured: true,
    slug: "corso-cucina-marocchina"
  }
];

async function populateViaAPI() {
  console.log('🚀 Inizio popolamento via API...');
  
  try {
    // Add travels
    console.log('📍 Aggiunta viaggi...');
    for (const travel of sampleTravels) {
      const response = await fetch(`${API_BASE}?collection=travels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(travel)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Viaggio aggiunto: ${travel.title}`);
      } else {
        console.log(`❌ Errore viaggio: ${travel.title} - ${response.status}`);
      }
    }
    
    // Add services
    console.log('🔧 Aggiunta servizi...');
    for (const service of sampleServices) {
      const response = await fetch(`${API_BASE}?collection=services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service)
      });
      
      if (response.ok) {
        console.log(`✅ Servizio aggiunto: ${service.name}`);
      } else {
        console.log(`❌ Errore servizio: ${service.name} - ${response.status}`);
      }
    }
    
    // Add experiences
    console.log('🎯 Aggiunta esperienze...');
    for (const experience of sampleExperiences) {
      const response = await fetch(`${API_BASE}?collection=experiences`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(experience)
      });
      
      if (response.ok) {
        console.log(`✅ Esperienza aggiunta: ${experience.title}`);
      } else {
        console.log(`❌ Errore esperienza: ${experience.title} - ${response.status}`);
      }
    }
    
    console.log('🎉 Popolamento completato!');
    
  } catch (error) {
    console.error('❌ Errore durante popolamento:', error);
  }
}

populateViaAPI();