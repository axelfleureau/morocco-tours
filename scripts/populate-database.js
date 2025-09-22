// Script per popolare database con servizi via API admin autenticata
console.log('🚀 Popolamento Database Servizi - Morocco Dreams');

// Simula chiamata API da admin autenticato
const populateServices = async () => {
  try {
    // Questo script simula la chiamata che farebbe un admin loggato
    console.log('📋 Preparazione servizi per popolamento database...');
    
    const servicesData = [
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

    console.log(`✅ ${servicesData.length} servizi preparati per il database`);
    console.log('\n📄 Riepilogo servizi:');
    
    servicesData.forEach((service, index) => {
      console.log(`${index + 1}. ${service.name}`);
      console.log(`   📂 ${service.category} | 💰 ${service.price}€ (${service.priceType})`);
    });
    
    console.log('\n🔧 Per popolare il database:');
    console.log('1. Accedi come admin alla dashboard');
    console.log('2. Vai su "Gestione Servizi"');
    console.log('3. Usa il pulsante "Crea" per aggiungere i servizi');
    console.log('4. Oppure chiama POST /api/admin/populate-services con auth token');
    
    return servicesData;
  } catch (error) {
    console.error('❌ Errore:', error);
  }
};

populateServices();