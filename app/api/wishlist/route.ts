import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyFirebaseToken } from '@/lib/user-auth-server'

export const dynamic = 'force-dynamic'

// Helper to verify user authentication
async function verifyAuth(request: NextRequest): Promise<{ uid: string } | null> {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('[WISHLIST AUTH] No auth header or invalid format')
      return null
    }

    const idToken = authHeader.replace('Bearer ', '')
    console.log('[WISHLIST AUTH] Verifying token...')
    const verification = await verifyFirebaseToken(idToken)
    
    if (!verification) {
      console.error('[WISHLIST AUTH] Token verification returned null')
    } else {
      console.log('[WISHLIST AUTH] Token verified for user:', verification.uid)
    }
    
    return verification
  } catch (error) {
    console.error('[WISHLIST AUTH] Auth verification error:', error)
    return null
  }
}

// GET - Get user's wishlist items (authenticated)
export async function GET(request: NextRequest) {
  try {
    const authUser = await verifyAuth(request)
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const wishlistItems = await db.wishlist.findMany({
      where: { userId: authUser.uid },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ wishlist: wishlistItems }, { status: 200 })
  } catch (error) {
    console.error('Error fetching wishlist:', error)
    return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 })
  }
}

// POST - Add item to wishlist (authenticated)
export async function POST(request: NextRequest) {
  try {
    const authUser = await verifyAuth(request)
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { itemType, itemId, itemData } = body

    if (!itemType || !itemId) {
      return NextResponse.json(
        { error: 'itemType and itemId are required' },
        { status: 400 }
      )
    }

    // Check if item already in wishlist
    const existing = await db.wishlist.findUnique({
      where: {
        userId_itemType_itemId: {
          userId: authUser.uid,
          itemType,
          itemId
        }
      }
    })

    if (existing) {
      return NextResponse.json(
        { message: 'Item already in wishlist', wishlistItem: existing },
        { status: 200 }
      )
    }

    // Add to wishlist
    const wishlistItem = await db.wishlist.create({
      data: {
        userId: authUser.uid,
        itemType,
        itemId,
        itemData: itemData || {}
      }
    })

    return NextResponse.json({ wishlistItem }, { status: 201 })
  } catch (error) {
    console.error('Error adding to wishlist:', error)
    return NextResponse.json({ error: 'Failed to add to wishlist' }, { status: 500 })
  }
}

// DELETE - Remove item from wishlist (authenticated)
export async function DELETE(request: NextRequest) {
  try {
    const authUser = await verifyAuth(request)
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const itemType = searchParams.get('itemType')
    const itemId = searchParams.get('itemId')

    if (!itemType || !itemId) {
      return NextResponse.json(
        { error: 'itemType and itemId are required' },
        { status: 400 }
      )
    }

    await db.wishlist.delete({
      where: {
        userId_itemType_itemId: {
          userId: authUser.uid,
          itemType,
          itemId
        }
      }
    })

    return NextResponse.json({ message: 'Item removed from wishlist' }, { status: 200 })
  } catch (error) {
    console.error('Error removing from wishlist:', error)
    return NextResponse.json({ error: 'Failed to remove from wishlist' }, { status: 500 })
  }
}
