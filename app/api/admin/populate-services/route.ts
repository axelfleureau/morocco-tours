// API Endpoint for Populating Services Database
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin, adminDb } from '@/lib/auth-admin'
import { serverTimestamp } from 'firebase-admin/firestore'

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

export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    const authHeader = request.headers.get('authorization')
    const idToken = authHeader?.replace('Bearer ', '')
    
    if (!idToken) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    await requireAdmin(idToken)

    if (!adminDb) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }

    const results = []
    
    for (const serviceData of servicesData) {
      try {
        // Check if service already exists
        const existingQuery = await adminDb
          .collection('services')
          .where('slug', '==', serviceData.slug)
          .get()

        if (!existingQuery.empty) {
          console.log(`Service ${serviceData.name} already exists, skipping...`)
          results.push({
            name: serviceData.name,
            status: 'skipped',
            reason: 'already exists'
          })
          continue
        }

        // Create new service
        const docData = {
          ...serviceData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }

        const docRef = await adminDb.collection('services').add(docData)
        
        results.push({
          id: docRef.id,
          name: serviceData.name,
          status: 'created',
          category: serviceData.category
        })

        console.log(`✅ Created service: ${serviceData.name} (${docRef.id})`)
      } catch (error) {
        console.error(`❌ Error creating service ${serviceData.name}:`, error)
        results.push({
          name: serviceData.name,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${servicesData.length} services`,
      results,
      summary: {
        created: results.filter(r => r.status === 'created').length,
        skipped: results.filter(r => r.status === 'skipped').length,
        errors: results.filter(r => r.status === 'error').length
      }
    })

  } catch (error) {
    console.error('Populate services error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Services population endpoint',
    services: servicesData.map(s => ({
      name: s.name,
      category: s.category,
      price: `${s.price} ${s.currency}`,
      type: s.type
    }))
  })
}