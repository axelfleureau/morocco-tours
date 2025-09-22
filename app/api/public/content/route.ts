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
    
    // Apply limit and ordering
    query = query.orderBy('updatedAt', 'desc').limit(Math.min(limit, 100))
    
    // Get collection
    const snapshot = await query.get()
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    // Add pagination info
    const response = {
      items,
      count: items.length,
      hasMore: items.length === limit,
      filters: {
        collection,
        ...(featured && { featured }),
        ...(category && { category }),
        limit
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