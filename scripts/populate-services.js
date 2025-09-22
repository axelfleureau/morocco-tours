// Populate Services Database - Morocco Dreams
// Popola il database con i 4 servizi richiesti dal utente

const servicesData = [
  // 1. Guide Private
  {
    name: "Guida Privata Professionale",
    slug: "guida-privata-professionale", 
    description: "Guide turistiche locali esperte e certificate per esperienze personalizzate. Parlano italiano, francese, inglese e arabo. Perfette per scoprire i segreti nascosti del Marocco.",
    category: "guide",
    type: "optional",
    price: 50,
    priceType: "per_day",
    currency: "EUR",
    locations: ["Marrakech", "Fes", "Casablanca", "Rabat", "Chefchaouen", "Essaouira", "Merzouga"],
    travelTypes: ["imperial-cities", "desert", "coast", "mountains", "cultural", "custom"],
    status: "published",
    published: true
  },

  // 2. Noleggio Auto 
  {
    name: "Noleggio Auto con Conducente",
    slug: "noleggio-auto-conducente",
    description: "Servizio noleggio auto con conducente professionale. Veicoli moderni, climatizzati e confortevoli. Include assicurazione completa e conducente esperto delle strade marocchine.",
    category: "transport", 
    type: "optional",
    price: 80,
    priceType: "per_day",
    currency: "EUR",
    locations: ["Tutto il Marocco", "Aeroporti", "Hotel", "Stazioni"],
    travelTypes: ["imperial-cities", "desert", "coast", "mountains", "custom"],
    status: "published",
    published: true
  },

  // 3. Assicurazioni
  {
    name: "Assicurazione Viaggio Completa",
    slug: "assicurazione-viaggio-completa",
    description: "Copertura assicurativa completa per il tuo viaggio in Marocco. Include assistenza medica, rimborso spese, bagagli, annullamento viaggio e assistenza 24/7 in italiano.",
    category: "insurance",
    type: "optional", 
    price: 25,
    priceType: "per_person",
    currency: "EUR",
    locations: ["Valida in tutto il Marocco"],
    travelTypes: ["imperial-cities", "desert", "coast", "mountains", "cultural", "custom"],
    status: "published",
    published: true
  },

  // 4. Trasferimenti
  {
    name: "Trasferimenti Aeroporto-Hotel",
    slug: "trasferimenti-aeroporto-hotel",
    description: "Servizio trasferimenti privati da/per aeroporti e hotel. Veicoli confortevoli, conducenti professionali, meet & greet all'arrivo. Disponibile 24/7 per tutti i principali aeroporti.",
    category: "transport",
    type: "addon",
    price: 35,
    priceType: "flat_rate", 
    currency: "EUR",
    locations: ["Aeroporto Mohammed V Casablanca", "Aeroporto Marrakech", "Aeroporto Fes", "Aeroporto Agadir", "Aeroporto Tangeri"],
    travelTypes: ["imperial-cities", "desert", "coast", "mountains", "cultural", "custom"],
    status: "published", 
    published: true
  }
];

console.log('🚀 Popolamento Database Servizi - Morocco Dreams');
console.log(`📋 Servizi da creare: ${servicesData.length}`);

servicesData.forEach((service, index) => {
  console.log(`${index + 1}. ${service.name}`);
  console.log(`   📂 Categoria: ${service.category}`);
  console.log(`   💰 Prezzo: ${service.price} ${service.currency} (${service.priceType})`);
  console.log(`   📍 Località: ${service.locations.slice(0, 2).join(', ')}${service.locations.length > 2 ? '...' : ''}`);
  console.log(`   ✅ Status: ${service.status}\n`);
});

console.log('✅ Dati servizi preparati. Usa questo script con l\'API admin per popolare il database.');
console.log('🔧 Comando: node scripts/populate-services.js');

// Export per uso con API
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { servicesData };
}