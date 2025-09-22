// Upsert by Slug API - Core CMS functionality
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

// Ensure slug uniqueness within collection
async function ensureUniqueSlug(
  collection: string, 
  slug: string, 
  excludeId?: string
): Promise<string> {
  if (!adminDb) throw new Error('Database not initialized')
  
  let uniqueSlug = slug
  let counter = 1
  
  while (true) {
    const query = adminDb.collection(collection).where('slug', '==', uniqueSlug)
    const snapshot = await query.get()
    
    // Check if slug exists (excluding current document if updating)
    const existingDocs = snapshot.docs.filter(doc => doc.id !== excludeId)
    
    if (existingDocs.length === 0) {
      break
    }
    
    uniqueSlug = `${slug}-${counter}`
    counter++
  }
  
  return uniqueSlug
}

// POST: Upsert document by slug
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const idToken = authHeader?.replace('Bearer ', '')
    
    if (!idToken) {
      return NextResponse.json({ error: 'Token required' }, { status: 401 })
    }
    
    await requireAdmin(idToken)
    
    const { collection, slug, data, upsert = true } = await request.json()
    
    if (!collection || !slug || !data) {
      return NextResponse.json({ 
        error: 'Collection, slug, and data required' 
      }, { status: 400 })
    }
    
    if (!adminDb) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }
    
    // Find existing document by slug
    const query = adminDb.collection(collection).where('slug', '==', slug)
    const snapshot = await query.get()
    
    let docRef
    let isUpdate = false
    let finalSlug = slug
    
    if (!snapshot.empty) {
      // Document exists - update it
      docRef = snapshot.docs[0].ref
      isUpdate = true
    } else if (upsert) {
      // Document doesn't exist - create new one
      // Ensure slug is unique (in case of race conditions)
      finalSlug = await ensureUniqueSlug(collection, slug)
      docRef = adminDb.collection(collection).doc()
      isUpdate = false
    } else {
      return NextResponse.json({ 
        error: 'Document not found and upsert disabled' 
      }, { status: 404 })
    }
    
    // Prepare document data
    const now = new Date()
    const docData = {
      ...data,
      slug: finalSlug,
      updatedAt: now,
      ...(isUpdate ? {} : { createdAt: now })
    }
    
    // Validate required fields based on collection
    const requiredFields = getRequiredFieldsForCollection(collection)
    for (const field of requiredFields) {
      if (!(field in docData)) {
        return NextResponse.json({ 
          error: `Required field missing: ${field}` 
        }, { status: 400 })
      }
    }
    
    // Update or create document
    await docRef.set(docData, { merge: isUpdate })
    
    return NextResponse.json({
      success: true,
      id: docRef.id,
      slug: finalSlug,
      operation: isUpdate ? 'updated' : 'created',
      message: `Document ${isUpdate ? 'updated' : 'created'} successfully`
    })
    
  } catch (error) {
    console.error('Upsert by slug error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Error upserting document' 
    }, { status: 500 })
  }
}

// GET: Find document by slug
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const collection = searchParams.get('collection')
    const slug = searchParams.get('slug')
    
    if (!collection || !slug) {
      return NextResponse.json({ 
        error: 'Collection and slug parameters required' 
      }, { status: 400 })
    }
    
    if (!adminDb) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }
    
    // Optional admin authentication for private content
    const authHeader = request.headers.get('authorization')
    let isAdmin = false
    
    if (authHeader) {
      try {
        const idToken = authHeader.replace('Bearer ', '')
        await requireAdmin(idToken)
        isAdmin = true
      } catch {
        // Not admin, continue as public user
      }
    }
    
    // Find document by slug
    const query = adminDb.collection(collection).where('slug', '==', slug)
    const snapshot = await query.get()
    
    if (snapshot.empty) {
      return NextResponse.json({ 
        error: 'Document not found' 
      }, { status: 404 })
    }
    
    const doc = snapshot.docs[0]
    const data = doc.data()
    
    // Check if document is published (unless admin)
    if (!isAdmin && data.published === false) {
      return NextResponse.json({ 
        error: 'Document not published' 
      }, { status: 404 })
    }
    
    return NextResponse.json({
      id: doc.id,
      ...data
    })
    
  } catch (error) {
    console.error('Find by slug error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Error finding document' 
    }, { status: 500 })
  }
}

// Helper function to get required fields for each collection
function getRequiredFieldsForCollection(collection: string): string[] {
  const fieldMap: Record<string, string[]> = {
    [COLLECTIONS.cities]: ['name', 'slug', 'title', 'description'],
    [COLLECTIONS.experiences]: ['title', 'slug', 'description', 'category'],
    [COLLECTIONS.travels]: ['title', 'slug', 'description', 'category'],
    [COLLECTIONS.services]: ['name', 'slug', 'description', 'category'],
    [COLLECTIONS.blog]: ['title', 'slug', 'content'],
    [COLLECTIONS.cmsSections]: ['name', 'type'],
  }
  
  return fieldMap[collection] || ['slug']
}