// Database Population API - Server-side secure population
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin, adminDb } from '@/lib/auth-admin'
import { COLLECTIONS } from '@/lib/firestore-schema'

// Import all the organized content data
import { populateCompleteDatabase } from '@/lib/database-populator'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const idToken = authHeader?.replace('Bearer ', '')
    
    if (!idToken) {
      return NextResponse.json({ error: 'Token required' }, { status: 401 })
    }
    
    await requireAdmin(idToken)
    
    const { force = false } = await request.json()
    
    if (!adminDb) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }
    
    // Run database population
    const result = await populateCompleteDatabase(force)
    
    return NextResponse.json({
      success: true,
      result,
      message: 'Database populated successfully'
    })
    
  } catch (error) {
    console.error('Populate database error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Error populating database' 
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const idToken = authHeader?.replace('Bearer ', '')
    
    if (!idToken) {
      return NextResponse.json({ error: 'Token required' }, { status: 401 })
    }
    
    await requireAdmin(idToken)
    
    if (!adminDb) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }
    
    // Get collection counts for overview
    const collections = Object.values(COLLECTIONS)
    const counts: Record<string, number> = {}
    
    for (const collection of collections) {
      try {
        const snapshot = await adminDb.collection(collection).get()
        counts[collection] = snapshot.size
      } catch (error) {
        counts[collection] = 0
      }
    }
    
    return NextResponse.json({
      collections: counts,
      total: Object.values(counts).reduce((sum, count) => sum + count, 0)
    })
    
  } catch (error) {
    console.error('Get database status error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Error getting database status' 
    }, { status: 500 })
  }
}