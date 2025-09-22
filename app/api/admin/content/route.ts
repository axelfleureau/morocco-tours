// CMS Content Management API - Secure server-side operations
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin, adminDb } from '@/lib/auth-admin'
import { COLLECTIONS } from '@/lib/firestore-schema'

// Generate unique slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Ensure slug uniqueness
async function ensureUniqueSlug(collection: string, slug: string, excludeId?: string): Promise<string> {
  if (!adminDb) throw new Error('Database not initialized')
  
  let uniqueSlug = slug
  let counter = 1
  
  while (true) {
    const query = adminDb.collection(collection).where('slug', '==', uniqueSlug)
    const snapshot = await query.get()
    
    // Check if slug exists (excluding current document)
    const existingDocs = snapshot.docs.filter((doc: any) => doc.id !== excludeId)
    
    if (existingDocs.length === 0) {
      break
    }
    
    uniqueSlug = `${slug}-${counter}`
    counter++
  }
  
  return uniqueSlug
}

// GET: Fetch content by collection
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const collection = searchParams.get('collection')
    const id = searchParams.get('id')
    const published = searchParams.get('published')
    
    if (!collection) {
      return NextResponse.json({ error: 'Collection parameter required' }, { status: 400 })
    }
    
    if (!adminDb) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }
    
    // ADMIN API: Always require authentication and admin role
    const authHeader = request.headers.get('authorization')
    const idToken = authHeader?.replace('Bearer ', '')
    
    if (!idToken) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    
    // Verify admin role - this will throw if not admin
    await requireAdmin(idToken)
    
    let query = adminDb.collection(collection)
    
    // Admin can see all content, including unpublished
    // Optional filtering by published status
    if (published === 'true') {
      query = query.where('published', '==', true)
    } else if (published === 'false') {
      query = query.where('published', '==', false)
    }
    
    // Get specific document
    if (id) {
      const doc = await adminDb.collection(collection).doc(id).get()
      if (!doc.exists) {
        return NextResponse.json({ error: 'Document not found' }, { status: 404 })
      }
      
      return NextResponse.json({ 
        id: doc.id, 
        ...doc.data() 
      })
    }
    
    // Get collection
    const snapshot = await query.orderBy('updatedAt', 'desc').get()
    const items = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    }))
    
    return NextResponse.json({ items })
    
  } catch (error) {
    console.error('Get content error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Error fetching content' 
    }, { status: 500 })
  }
}

// POST: Create content
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const idToken = authHeader?.replace('Bearer ', '')
    
    if (!idToken) {
      return NextResponse.json({ error: 'Token required' }, { status: 401 })
    }
    
    await requireAdmin(idToken)
    
    const { collection, data } = await request.json()
    
    if (!collection || !data) {
      return NextResponse.json({ error: 'Collection and data required' }, { status: 400 })
    }
    
    if (!adminDb) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }
    
    // Generate slug if title/name provided
    let slug = data.slug
    if (!slug && (data.title || data.name)) {
      slug = generateSlug(data.title || data.name)
    }
    
    // Ensure unique slug
    if (slug) {
      slug = await ensureUniqueSlug(collection, slug)
    }
    
    // Prepare document data
    const docData = {
      ...data,
      ...(slug && { slug }),
      published: data.published ?? false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    // Create document
    const docRef = await adminDb.collection(collection).add(docData)
    
    return NextResponse.json({ 
      success: true,
      id: docRef.id,
      slug,
      message: 'Content created successfully' 
    })
    
  } catch (error) {
    console.error('Create content error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Error creating content' 
    }, { status: 500 })
  }
}

// PUT: Update content
export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const idToken = authHeader?.replace('Bearer ', '')
    
    if (!idToken) {
      return NextResponse.json({ error: 'Token required' }, { status: 401 })
    }
    
    await requireAdmin(idToken)
    
    const { collection, id, data } = await request.json()
    
    if (!collection || !id || !data) {
      return NextResponse.json({ error: 'Collection, ID and data required' }, { status: 400 })
    }
    
    if (!adminDb) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }
    
    // Handle slug update
    let slug = data.slug
    if (!slug && (data.title || data.name)) {
      slug = generateSlug(data.title || data.name)
    }
    
    if (slug) {
      slug = await ensureUniqueSlug(collection, slug, id)
    }
    
    // Prepare update data
    const updateData = {
      ...data,
      ...(slug && { slug }),
      updatedAt: new Date()
    }
    
    // Update document
    await adminDb.collection(collection).doc(id).update(updateData)
    
    return NextResponse.json({ 
      success: true,
      slug,
      message: 'Content updated successfully' 
    })
    
  } catch (error) {
    console.error('Update content error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Error updating content' 
    }, { status: 500 })
  }
}

// DELETE: Delete content
export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const idToken = authHeader?.replace('Bearer ', '')
    
    if (!idToken) {
      return NextResponse.json({ error: 'Token required' }, { status: 401 })
    }
    
    await requireAdmin(idToken)
    
    const { searchParams } = new URL(request.url)
    const collection = searchParams.get('collection')
    const id = searchParams.get('id')
    
    if (!collection || !id) {
      return NextResponse.json({ error: 'Collection and ID required' }, { status: 400 })
    }
    
    if (!adminDb) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }
    
    // Delete document
    await adminDb.collection(collection).doc(id).delete()
    
    return NextResponse.json({ 
      success: true,
      message: 'Content deleted successfully' 
    })
    
  } catch (error) {
    console.error('Delete content error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Error deleting content' 
    }, { status: 500 })
  }
}