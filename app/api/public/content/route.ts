// Public Content API - Client-side safe access to published content
import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/auth-admin'

// Public read-only access to published content
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const collection = searchParams.get('collection')
    const id = searchParams.get('id')
    const slug = searchParams.get('slug')
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '50')
    
    if (!collection) {
      return NextResponse.json({ error: 'Collection parameter required' }, { status: 400 })
    }
    
    if (!adminDb) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }
    
    let query = adminDb.collection(collection)
    
    // Always filter by published = true for public API
    query = query.where('published', '==', true)
    
    // Get specific document by ID
    if (id) {
      const doc = await adminDb.collection(collection).doc(id).get()
      if (!doc.exists) {
        return NextResponse.json({ error: 'Document not found' }, { status: 404 })
      }
      
      const data = doc.data()
      if (!data?.published) {
        return NextResponse.json({ error: 'Document not published' }, { status: 404 })
      }
      
      return NextResponse.json({ 
        id: doc.id, 
        ...data 
      })
    }
    
    // Get specific document by slug
    if (slug) {
      const slugQuery = query.where('slug', '==', slug)
      const snapshot = await slugQuery.get()
      
      if (snapshot.empty) {
        return NextResponse.json({ error: 'Document not found' }, { status: 404 })
      }
      
      const doc = snapshot.docs[0]
      return NextResponse.json({ 
        id: doc.id, 
        ...doc.data() 
      })
    }
    
    // Filter by featured
    if (featured === 'true') {
      query = query.where('featured', '==', true)
    }
    
    // Filter by category
    if (category) {
      query = query.where('category', '==', category)
    }
    
    // Apply limit and ordering - with Firestore index fallback
    let items: any[] = []
    let indexMissing = false
    
    try {
      // Try query with ordering (requires composite index)
      query = query.orderBy('updatedAt', 'desc').limit(Math.min(limit, 100))
      const snapshot = await query.get()
      items = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error: any) {
      // Check if it's a Firestore index error
      if (error?.code === 9 || error?.message?.includes('requires an index')) {
        console.warn(`🔥 Firestore index missing for collection '${collection}'. Using fallback query without ordering.`)
        indexMissing = true
        
        // Fallback: Query without ordering (no index required)
        let fallbackQuery = adminDb.collection(collection).where('published', '==', true)
        
        // Re-apply filters
        if (featured === 'true') {
          fallbackQuery = fallbackQuery.where('featured', '==', true)
        }
        if (category) {
          fallbackQuery = fallbackQuery.where('category', '==', category)
        }
        
        fallbackQuery = fallbackQuery.limit(Math.min(limit, 100))
        const snapshot = await fallbackQuery.get()
        items = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data()
        }))
      } else {
        // Re-throw non-index errors
        throw error
      }
    }
    
    // Add pagination info with index status
    const response = {
      items,
      count: items.length,
      hasMore: items.length === limit,
      filters: {
        collection,
        ...(featured && { featured }),
        ...(category && { category }),
        limit
      },
      // Include index status for debugging
      meta: {
        indexMissing,
        ...(indexMissing && {
          message: `⚠️ Database optimization needed: Create Firestore composite index for faster queries`,
          indexNeeded: `Collection: ${collection}, Fields: (published, updatedAt)`,
          performance: "Queries are working but not optimized - results may be unordered"
        })
      }
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Public content API error:', error)
    return NextResponse.json({ 
      error: 'Error fetching content' 
    }, { status: 500 })
  }
}

// OPTIONS: CORS preflight for public API
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}