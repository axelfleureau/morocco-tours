import * as admin from 'firebase-admin';

function formatPrivateKey(key: string): string {
  const header = '-----BEGIN PRIVATE KEY-----';
  const footer = '-----END PRIVATE KEY-----';
  
  if (key.includes(header) && key.includes(footer)) {
    return key;
  }
  
  if (key.includes('\\n')) {
    key = key.replace(/\\n/g, '\n');
  }
  
  const cleanKey = key.replace(/\s/g, '').replace(/\\n/g, '');
  
  const formatted = cleanKey.match(/.{1,64}/g)?.join('\n') || cleanKey;
  return `${header}\n${formatted}\n${footer}\n`;
}

const privateKey = formatPrivateKey(process.env.FIREBASE_ADMIN_PRIVATE_KEY || '');
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

if (!privateKey || !clientEmail || !projectId) {
  throw new Error('Missing Firebase Admin credentials');
}

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId,
    clientEmail,
    privateKey,
  }),
});

const db = admin.firestore(app);

const saharaTours = [
  {
    id: 'sahara-tour-1',
    title: 'Deserto Express',
    slug: 'sahara-deserto-express',
    description: 'L\'essenza del Sahara in 48 ore',
    longDescription: 'Un tour intenso di 2 giorni che ti porta nel cuore del Sahara. Attraversa l\'Atlante, raggiungi le dune dorate di Erg Chebbi al tramonto, dormi in un campo berbero tradizionale e svegliati con l\'alba nel deserto.',
    images: ['/images/desert-express.png'],
    price: 180,
    originalPrice: 220,
    currency: 'EUR',
    duration: '2 giorni / 1 notte',
    category: 'desert' as const,
    includes: [
      'Trasporto in 4x4/minivan climatizzato',
      '1 notte in campo tendato standard',
      'Cena e colazione nel deserto',
      'Escursione in cammello (1h)',
      'Guida locale parlante italiano'
    ],
    notIncludes: ['Pranzi', 'Bevande', 'Mance', 'Spese personali'],
    highlights: [
      'Tramonto sulle dune di Erg Chebbi',
      'Notte in campo tendato tradizionale',
      'Escursione in cammello',
      'Alba nel deserto',
      'Trasporto da/per Marrakech'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Marrakech → Merzouga',
        description: 'Partenza mattutina, attraversamento dell\'Atlante, arrivo al tramonto per l\'escursione in cammello',
        activities: ['Attraversamento Atlante', 'Escursione cammello', 'Tramonto dune'],
        accommodation: 'Campo tendato standard',
        meals: ['Cena']
      },
      {
        day: 2,
        title: 'Alba nel deserto → Marrakech',
        description: 'Sveglia per l\'alba, colazione berbera, rientro a Marrakech nel pomeriggio',
        activities: ['Alba deserto', 'Rientro Marrakech'],
        accommodation: '',
        meals: ['Colazione']
      }
    ],
    rating: 4.7,
    reviews: 89,
    status: 'published' as const,
    published: true,
    featured: true
  },
  {
    id: 'sahara-tour-2',
    title: 'Classic Desert Adventure',
    slug: 'sahara-classic-adventure',
    description: 'Il tour del deserto più completo',
    longDescription: '3 giorni attraverso l\'Atlante, le kasbah storiche, le gole spettacolari fino al cuore del Sahara. Due notti che uniscono comfort e autenticità.',
    images: ['/images/classic-desert.png'],
    price: 320,
    originalPrice: 380,
    currency: 'EUR',
    duration: '3 giorni / 2 notti',
    category: 'desert' as const,
    includes: [
      'Trasporto privato 4x4',
      '2 notti: 1 hotel + 1 campo berbero',
      'Mezza pensione (colazioni e cene)',
      'Escursione in cammello',
      'Guida esperta multilingue',
      'Ingressi monumenti principali'
    ],
    notIncludes: ['Pranzi', 'Bevande alcoliche', 'Assicurazione viaggio', 'Voli'],
    highlights: [
      'Kasbah di Ait Benhaddou (UNESCO)',
      'Gole del Todra',
      '2 notti nel deserto',
      'Musica berbera attorno al fuoco',
      'Visita a famiglia nomade'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Marrakech → Ouarzazate',
        description: 'Attraversamento dell\'Atlante, visita Ait Benhaddou, pernottamento a Ouarzazate',
        activities: ['Atlante', 'Ait Benhaddou UNESCO', 'Ouarzazate'],
        accommodation: 'Hotel Ouarzazate',
        meals: ['Cena']
      },
      {
        day: 2,
        title: 'Ouarzazate → Merzouga',
        description: 'Gole del Todra, arrivo nel deserto, escursione in cammello, notte in campo',
        activities: ['Gole Todra', 'Escursione cammello', 'Musica berbera'],
        accommodation: 'Campo tendato',
        meals: ['Colazione', 'Cena']
      },
      {
        day: 3,
        title: 'Merzouga → Fes',
        description: 'Alba nel deserto, viaggio verso Fes attraverso la valle dello Ziz',
        activities: ['Alba deserto', 'Valle Ziz', 'Fes'],
        accommodation: '',
        meals: ['Colazione']
      }
    ],
    rating: 4.9,
    reviews: 156,
    status: 'published' as const,
    published: true,
    featured: true
  },
  {
    id: 'sahara-tour-3',
    title: 'Grand Desert Journey',
    slug: 'sahara-grand-journey',
    description: 'Immersione totale nel Sahara',
    longDescription: '4 giorni di vera avventura nel deserto. Trekking sulle dune, incontro con nomadi, sandboarding, osservazione stelle con telescopio. Per chi vuole vivere il Sahara a 360°.',
    images: ['/images/grand-desert.png'],
    price: 480,
    originalPrice: 560,
    currency: 'EUR',
    duration: '4 giorni / 3 notti',
    category: 'desert' as const,
    includes: [
      'Trasporto 4x4 premium',
      '3 notti: kasbah + 2 campi diversi',
      'Pensione completa',
      'Tutte le attività nel deserto',
      'Guida berbera esperta',
      'Telescopio per stelle',
      'Attrezzatura sandboarding'
    ],
    notIncludes: ['Bevande alcoliche', 'Spese personali', 'Assicurazione', 'Equipaggiamento personale'],
    highlights: [
      '3 notti nel deserto',
      'Trekking sulle dune',
      'Incontro con nomadi',
      'Sandboarding',
      'Osservazione stelle con telescopio'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Marrakech → Valle del Draa',
        description: 'Kasbah Telouet, valle del Draa, pernottamento in kasbah tradizionale',
        activities: ['Kasbah Telouet', 'Valle Draa'],
        accommodation: 'Kasbah tradizionale',
        meals: ['Cena']
      },
      {
        day: 2,
        title: 'Valle del Draa → Erg Chebbi',
        description: 'Arrivo nel deserto, prima notte in campo fisso',
        activities: ['Viaggio deserto', 'Campo fisso'],
        accommodation: 'Campo fisso',
        meals: ['Colazione', 'Cena']
      },
      {
        day: 3,
        title: 'Giornata nel deserto',
        description: 'Trekking, sandboarding, visita nomadi, notte in campo mobile',
        activities: ['Trekking dune', 'Sandboarding', 'Nomadi', 'Stelle telescopio'],
        accommodation: 'Campo mobile',
        meals: ['Colazione', 'Pranzo', 'Cena']
      },
      {
        day: 4,
        title: 'Deserto → Marrakech',
        description: 'Alba finale, rientro via Ouarzazate',
        activities: ['Alba finale', 'Rientro'],
        accommodation: '',
        meals: ['Colazione']
      }
    ],
    rating: 4.8,
    reviews: 73,
    status: 'published' as const,
    published: true,
    featured: true
  },
  {
    id: 'sahara-tour-4',
    title: 'Luxury Desert Experience',
    slug: 'sahara-luxury-experience',
    description: 'Il deserto con tutti i comfort',
    longDescription: 'Esperienza esclusiva nel Sahara con campo 5 stelle, bagno privato, cena gourmet, trattamenti spa e trasporto di lusso. Il perfetto equilibrio tra avventura e comfort.',
    images: ['/images/luxury-desert.png'],
    price: 750,
    originalPrice: 890,
    currency: 'EUR',
    duration: '3 giorni / 2 notti',
    category: 'desert' as const,
    includes: [
      'Trasporto Mercedes/BMW',
      'Campo tendato luxury (bagno privato)',
      'Pensione completa gourmet',
      'Champagne di benvenuto',
      'Trattamento spa incluso',
      'Maggiordomo personale',
      'Fotografo professionale (su richiesta)'
    ],
    notIncludes: ['Voli internazionali', 'Assicurazione premium', 'Servizi extra spa'],
    highlights: [
      'Campo tendato 5 stelle',
      'Bagno privato in tenda',
      'Cena gourmet nel deserto',
      'Massaggio berbero',
      'Trasporto di lusso'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Marrakech → Deserto VIP',
        description: 'Trasferimento in veicolo di lusso, arrivo al campo deluxe, aperitivo al tramonto',
        activities: ['Transfer luxury', 'Aperitivo tramonto'],
        accommodation: 'Campo luxury 5 stelle',
        meals: ['Cena gourmet']
      },
      {
        day: 2,
        title: 'Giornata di relax nel deserto',
        description: 'Escursioni opzionali, trattamenti spa, cena sotto le stelle',
        activities: ['Relax', 'Spa', 'Escursioni opzionali'],
        accommodation: 'Campo luxury 5 stelle',
        meals: ['Colazione', 'Pranzo', 'Cena gourmet']
      },
      {
        day: 3,
        title: 'Deserto → Marrakech',
        description: 'Colazione gourmet, rientro con soste panoramiche',
        activities: ['Soste panoramiche', 'Rientro'],
        accommodation: '',
        meals: ['Colazione']
      }
    ],
    rating: 5.0,
    reviews: 42,
    status: 'published' as const,
    published: true,
    featured: true
  }
];

const agafayTours = [
  {
    id: 'agafay-tour-0',
    title: 'Deserto di Agafay - Giornata',
    slug: 'agafay-giornata',
    description: 'Fuga dal caos cittadino a 40 minuti da Marrakech',
    longDescription: 'Escursione giornaliera nel deserto roccioso di Agafay. Paesaggio lunare con vista sull\'Atlante, pranzo berbero tradizionale e possibilità di aggiungere quad o cammelli.',
    images: ['/images/agafay-desert.png'],
    price: 50,
    currency: 'EUR',
    duration: '1 giorno (8 ore)',
    category: 'desert' as const,
    includes: [
      'Trasporto in minivan/4x4',
      'Pranzo berbero tradizionale',
      'Guida parlante italiano',
      'Tè alla menta'
    ],
    notIncludes: ['Quad/cammelli (opzionali)', 'Bevande extra', 'Mance'],
    highlights: [
      'Deserto roccioso di Agafay',
      'Pranzo berbero incluso',
      'Quad o cammelli (opzionale)',
      'Vista sull\'Atlante',
      'Trasporto da/per Marrakech'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Marrakech → Agafay → Marrakech',
        description: 'Partenza mattutina, esplorazione del deserto di Agafay, pranzo tradizionale, attività opzionali, rientro al tramonto',
        activities: ['Esplorazione Agafay', 'Pranzo berbero', 'Attività opzionali', 'Vista Atlante'],
        accommodation: '',
        meals: ['Pranzo']
      }
    ],
    rating: 4.6,
    reviews: 124,
    status: 'published' as const,
    published: true,
    featured: false
  },
  {
    id: 'agafay-tour--1',
    title: 'Deserto di Agafay con Notte in Tenda - Standard',
    slug: 'agafay-notte-standard',
    description: 'Esperienza autentica nel deserto roccioso',
    longDescription: 'Notte sotto le stelle nel deserto di Agafay. Campo tendato standard con cena berbera, musica tradizionale e vista spettacolare sull\'Atlante.',
    images: ['/images/agafay-night.png'],
    price: 76,
    currency: 'EUR',
    duration: '1 giorno / 1 notte',
    category: 'desert' as const,
    includes: [
      'Trasporto in minivan',
      '1 notte in tenda standard (letti condivisi o privati)',
      'Cena e colazione berbere',
      'Tè alla menta e dolcetti',
      'Musica live'
    ],
    notIncludes: ['Pranzi', 'Bevande alcoliche', 'Attività extra'],
    highlights: [
      'Notte in campo tendato standard',
      'Tramonto e alba nel deserto',
      'Cena e colazione berbere',
      'Musica tradizionale attorno al fuoco',
      'Vista spettacolare sull\'Atlante'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Marrakech → Agafay',
        description: 'Partenza pomeridiana, arrivo al campo, tè di benvenuto, tramonto, cena tradizionale, musica',
        activities: ['Arrivo campo', 'Tramonto', 'Cena berbera', 'Musica live'],
        accommodation: 'Campo tendato standard',
        meals: ['Cena']
      },
      {
        day: 2,
        title: 'Alba → Marrakech',
        description: 'Sveglia per l\'alba, colazione, rientro a Marrakech',
        activities: ['Alba deserto', 'Rientro'],
        accommodation: '',
        meals: ['Colazione']
      }
    ],
    rating: 4.7,
    reviews: 98,
    status: 'published' as const,
    published: true,
    featured: false
  },
  {
    id: 'agafay-tour--2',
    title: 'Deserto di Agafay con Notte in Tenda - Luxury',
    slug: 'agafay-luxury',
    description: 'Glamping esclusivo con vista sull\'Atlante',
    longDescription: 'Esperienza luxury nel deserto di Agafay. Tenda con bagno privato, cena gourmet sotto le stelle, piscina panoramica e servizio premium.',
    images: ['/images/agafay-luxury.png'],
    price: 230,
    currency: 'EUR',
    duration: '1 giorno / 1 notte',
    category: 'desert' as const,
    includes: [
      'Trasporto premium',
      'Tenda luxury con bagno en-suite',
      'Cena e colazione gourmet',
      'Champagne di benvenuto',
      'Servizio maggiordomo',
      'Wi-Fi nel campo'
    ],
    notIncludes: ['Trattamenti spa', 'Bevande premium', 'Trasferimenti extra'],
    highlights: [
      'Tenda luxury con bagno privato',
      'Cena gourmet sotto le stelle',
      'Piscina panoramica (alcuni campi)',
      'Servizio premium',
      'Spa e massaggi (opzionali)'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Marrakech → Agafay Luxury',
        description: 'Transfer privato, check-in luxury camp, aperitivo panoramico, cena gourmet, intrattenimento',
        activities: ['Transfer luxury', 'Aperitivo panoramico', 'Cena gourmet'],
        accommodation: 'Campo luxury con bagno privato',
        meals: ['Cena gourmet']
      },
      {
        day: 2,
        title: 'Relax → Marrakech',
        description: 'Colazione gourmet, tempo libero, rientro con soste panoramiche',
        activities: ['Relax', 'Soste panoramiche'],
        accommodation: '',
        meals: ['Colazione']
      }
    ],
    rating: 4.9,
    reviews: 67,
    status: 'published' as const,
    published: true,
    featured: true
  }
];

async function populateDesertTours() {
  try {
    console.log('🏜️  Inizio popolamento tour deserto...\n');
    
    const travelsRef = db.collection('travels');
    
    console.log('📍 Popolamento 4 tour Sahara...\n');
    for (const tour of saharaTours) {
      const { id, ...tourData } = tour;
      await travelsRef.doc(id).set({
        ...tourData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`✅ Sahara tour salvato: ${tour.title} (${tour.price}€, ${tour.duration})`);
      console.log(`   ID: ${id}, Slug: ${tour.slug}, Rating: ${tour.rating}\n`);
    }
    
    console.log('📍 Popolamento 3 tour Agafay...\n');
    for (const tour of agafayTours) {
      const { id, ...tourData } = tour;
      await travelsRef.doc(id).set({
        ...tourData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`✅ Agafay tour salvato: ${tour.title} (${tour.price}€, ${tour.duration})`);
      console.log(`   ID: ${id}, Slug: ${tour.slug}, Rating: ${tour.rating}\n`);
    }
    
    console.log('─'.repeat(50));
    console.log('🎉 Popolamento completato!');
    console.log(`📊 Statistiche:`);
    console.log(`   - Tour Sahara salvati: ${saharaTours.length}`);
    console.log(`   - Tour Agafay salvati: ${agafayTours.length}`);
    console.log(`   - Totale tour deserto: ${saharaTours.length + agafayTours.length}`);
    
  } catch (error) {
    console.error('❌ Errore durante popolamento:', error);
    throw error;
  }
}

populateDesertTours()
  .then(() => {
    console.log('\n✅ Script completato con successo');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script fallito:', error);
    process.exit(1);
  });
