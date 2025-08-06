import { initializeApp } from "firebase/app"
import { getFirestore, collection, doc, setDoc, writeBatch } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAkqnD8fBg6zhLtsxS90dQS3Bdcri1RKHE",
  authDomain: "morocco-tours-6ab0d.firebaseapp.com",
  projectId: "morocco-tours-6ab0d",
  storageBucket: "morocco-tours-6ab0d.firebasestorage.app",
  messagingSenderId: "121465422041",
  appId: "1:121465422041:web:e1b232cb0515f99dd0bec8",
  measurementId: "G-T7LC91SBRE"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

// Initial data for cities
const initialCities = [
  {
    id: "marrakech",
    name: "Marrakech",
    description: "La Perla Rossa del Marocco, famosa per la piazza Jemaa el-Fnaa e i suoi souks colorati.",
    lat: 31.6295,
    lng: -7.9811,
    attractions: ["Jemaa el-Fnaa", "Souks", "Giardini Majorelle", "Palazzo Bahia", "Moschea Koutoubia"],
    bestTime: "Marzo - Maggio, Settembre - Novembre",
    images: ["/images/marrakech-medina.png", "/images/marrakech-souks.png"]
  },
  {
    id: "fes",
    name: "Fes",
    description: "La capitale spirituale del Marocco, con la medina più grande del mondo.",
    lat: 34.0181,
    lng: -5.0078,
    attractions: ["Medina UNESCO", "Università Al Quaraouiyine", "Concerie Chouara", "Palazzo Reale"],
    bestTime: "Aprile - Giugno, Settembre - Novembre",
    images: ["/images/fes-architecture.png", "/images/fes-medina.png"]
  },
  {
    id: "casablanca",
    name: "Casablanca",
    description: "La capitale economica del Marocco, moderna e cosmopolita.",
    lat: 33.5731,
    lng: -7.5898,
    attractions: ["Moschea Hassan II", "Corniche", "Quartiere Habous", "Centro Moderno"],
    bestTime: "Tutto l'anno",
    images: ["/images/casablanca-hassan.png"]
  },
  {
    id: "chefchaouen",
    name: "Chefchaouen",
    description: "La perla blu del Rif, città dalle case azzurre.",
    lat: 35.1688,
    lng: -5.2636,
    attractions: ["Medina blu", "Monti del Rif", "Artigianato", "Cascate Akchour"],
    bestTime: "Aprile - Ottobre",
    images: ["/images/chefchaouen-blue.png"]
  },
  {
    id: "essaouira",
    name: "Essaouira",
    description: "La città del vento, perla della costa atlantica.",
    lat: 31.5085,
    lng: -9.7595,
    attractions: ["Medina UNESCO", "Porto", "Spiagge", "Argan"],
    bestTime: "Tutto l'anno",
    images: ["/images/essaouira-coast.png"]
  }
]

// Initial data for tours
const initialTours = [
  {
    id: "imperial-cities",
    name: "Tour delle Città Imperiali",
    description: "Un viaggio completo attraverso le quattro città imperiali del Marocco: Rabat, Meknes, Fes e Marrakech.",
    price: 890,
    duration: "8 giorni / 7 notti",
    cities: ["marrakech", "fes", "casablanca"],
    itinerary: "Giorno 1: Arrivo a Casablanca\nGiorno 2-3: Rabat e Meknes\nGiorno 4-5: Fes\nGiorno 6-8: Marrakech",
    includes: [
      "Trasporti in veicolo climatizzato",
      "Guida locale esperta",
      "7 notti in hotel 4*",
      "Colazione e cena",
      "Ingressi ai monumenti"
    ],
    excludes: [
      "Voli internazionali",
      "Pranzi",
      "Bevande",
      "Mance",
      "Spese personali"
    ],
    images: ["/images/imperial-cities-tour.png"]
  },
  {
    id: "sahara-adventure",
    name: "Avventura nel Sahara",
    description: "Un'esperienza indimenticabile nel deserto del Sahara con notte sotto le stelle.",
    price: 650,
    duration: "5 giorni / 4 notti",
    cities: ["marrakech"],
    itinerary: "Giorno 1: Marrakech - Ouarzazate\nGiorno 2-3: Deserto del Sahara\nGiorno 4-5: Ritorno a Marrakech",
    includes: [
      "Trasporti 4x4",
      "Guida berbera",
      "4 notti (2 hotel + 2 campo tendato)",
      "Tutti i pasti",
      "Trekking cammelli"
    ],
    excludes: [
      "Voli internazionali",
      "Bevande alcoliche",
      "Mance",
      "Spese personali"
    ],
    images: ["/images/sahara-adventure.png"]
  },
  {
    id: "coastal-tour",
    name: "Tour della Costa Atlantica",
    description: "Scopri le meraviglie della costa atlantica marocchina da Casablanca a Essaouira.",
    price: 450,
    duration: "4 giorni / 3 notti",
    cities: ["casablanca", "essaouira"],
    itinerary: "Giorno 1: Casablanca\nGiorno 2-3: Essaouira\nGiorno 4: Ritorno",
    includes: [
      "Trasporti",
      "3 notti in hotel",
      "Colazione",
      "Guida locale"
    ],
    excludes: [
      "Voli",
      "Pranzi e cene",
      "Attività extra"
    ],
    images: ["/images/essaouira-coast.png"]
  }
]

// Initial users
const initialUsers = [
  {
    id: "user1",
    email: "marco.rossi@email.com",
    role: "user",
    preferences: { newsletter: true, language: "it" }
  },
  {
    id: "user2", 
    email: "giulia.bianchi@email.com",
    role: "user",
    preferences: { newsletter: false, language: "it" }
  }
]

export async function initializeFirebaseData() {
  try {
    console.log("🚀 Inizializzazione database Firebase...")

    // Create admin user
    try {
      await createUserWithEmailAndPassword(auth, "admin@moroccodreams.com", "morocco2024")
      console.log("✅ Utente admin creato")
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log("ℹ️ Utente admin già esistente")
      } else {
        console.error("❌ Errore creazione admin:", error)
      }
    }

    const batch = writeBatch(db)

    // Initialize cities
    console.log("📍 Inizializzazione città...")
    for (const city of initialCities) {
      const cityRef = doc(db, 'cities', city.id)
      batch.set(cityRef, {
        ...city,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    // Initialize tours
    console.log("📦 Inizializzazione tour...")
    for (const tour of initialTours) {
      const tourRef = doc(db, 'tours', tour.id)
      batch.set(tourRef, {
        ...tour,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    // Initialize users
    console.log("👥 Inizializzazione utenti...")
    for (const user of initialUsers) {
      const userRef = doc(db, 'users', user.id)
      batch.set(userRef, {
        ...user,
        createdAt: new Date()
      })
    }

    // Execute batch write
    await batch.commit()

    console.log("✅ Database inizializzato con successo!")
    console.log(`📊 Dati creati:`)
    console.log(`   - ${initialCities.length} città`)
    console.log(`   - ${initialTours.length} tour`)
    console.log(`   - ${initialUsers.length} utenti`)
    console.log(`   - 1 utente admin`)

  } catch (error) {
    console.error("❌ Errore durante l'inizializzazione:", error)
    throw error
  }
}

// Execute initialization if called directly
if (typeof window === 'undefined') {
  initializeFirebaseData()
    .then(() => {
      console.log("🎉 Inizializzazione completata!")
      process.exit(0)
    })
    .catch((error) => {
      console.error("💥 Inizializzazione fallita:", error)
      process.exit(1)
    })
}
