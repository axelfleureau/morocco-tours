const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedMenu() {
  try {
    // Main menu items
    const menuItems = [
      { label: "Chi Siamo", href: "/about", order: 1 },
      { label: "Viaggi", href: "/viaggi", order: 2, description: "Scopri i nostri tour" },
      { label: "Esperienze", href: "/esperienze", order: 3, description: "Vivi esperienze autentiche" },
      { label: "Servizi", href: "/servizi", order: 4, description: "Servizi professionali" },
      { label: "Blog", href: "/blog", order: 5 },
      { label: "Contatti", href: "/contatti", order: 6 },
    ];

    for (const item of menuItems) {
      const existing = await prisma.menuItem.findFirst({
        where: { label: item.label }
      });
      
      if (!existing) {
        await prisma.menuItem.create({ data: item });
        console.log(`✅ Created menu item: ${item.label}`);
      }
    }

    // Sample testimonials
    const testimonials = [
      {
        name: "Marco & Giulia",
        location: "Milano, Italia",
        service: "Tour Imperiali + Deserto",
        rating: 5,
        comment: "Un viaggio incredibile! Le guide locali ci hanno fatto scoprire il vero Marocco, lontano dai percorsi turistici. Il deserto è stato magico.",
        order: 1,
      },
      {
        name: "Sarah Johnson",
        location: "London, UK",
        service: "Viaggio su Misura",
        rating: 5,
        comment: "Morocco Dreams ha organizzato tutto perfettamente. Dall'hammam tradizionale alle notti nel deserto, ogni momento è stato autentico.",
        order: 2,
      },
      {
        name: "Pierre & Marie",
        location: "Paris, France",
        service: "Tour Gastronomico",
        rating: 5,
        comment: "L'esperienza culinaria è stata fantastica! Abbiamo imparato a cucinare il tagine e il couscous con una famiglia berbera.",
        order: 3,
      },
    ];

    for (const testimonial of testimonials) {
      const existing = await prisma.testimonial.findFirst({
        where: { name: testimonial.name }
      });
      
      if (!existing) {
        await prisma.testimonial.create({ data: testimonial });
        console.log(`✅ Created testimonial: ${testimonial.name}`);
      }
    }

    // Sample FAQs
    const faqs = [
      {
        category: "general",
        question: "Ho bisogno di un visto per visitare il Marocco?",
        answer: "I cittadini italiani non hanno bisogno di visto per soggiorni turistici fino a 90 giorni. È sufficiente un passaporto valido con almeno 6 mesi di validità residua.",
        order: 1,
      },
      {
        category: "general",
        question: "Il Marocco è sicuro per i turisti?",
        answer: "Sì, il Marocco è generalmente molto sicuro per i turisti. Le nostre guide locali ti accompagneranno sempre e forniamo assistenza 24/7 durante tutto il viaggio.",
        order: 2,
      },
      {
        category: "general",
        question: "Che tipo di alloggi offrite?",
        answer: "Offriamo una vasta gamma di alloggi: dai riad tradizionali nella medina agli hotel di lusso, dai campi nel deserto alle guesthouse berbere in montagna.",
        order: 3,
      },
      {
        category: "general",
        question: "Posso personalizzare il mio viaggio?",
        answer: "Assolutamente! Tutti i nostri viaggi sono completamente personalizzabili. Puoi modificare l'itinerario, la durata, gli alloggi e le attività secondo le tue preferenze.",
        order: 4,
      },
      {
        category: "general",
        question: "Qual è il periodo migliore per visitare il Marocco?",
        answer: "Il Marocco si può visitare tutto l'anno. Primavera (marzo-maggio) e autunno (settembre-novembre) sono ideali per il clima mite. L'inverno è perfetto per il deserto, l'estate per la costa.",
        order: 5,
      },
      {
        category: "general",
        question: "Cosa include il prezzo del viaggio?",
        answer: "I nostri prezzi includono alloggi, trasporti privati, guide locali, alcune attività e assistenza 24/7. Voli internazionali, pasti non specificati e spese personali sono esclusi.",
        order: 6,
      },
    ];

    for (const faq of faqs) {
      const existing = await prisma.fAQ.findFirst({
        where: { question: faq.question }
      });
      
      if (!existing) {
        await prisma.fAQ.create({ data: faq });
        console.log(`✅ Created FAQ: ${faq.question.substring(0, 40)}...`);
      }
    }

    console.log("\n🎉 Seeding completed!");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

seedMenu();
