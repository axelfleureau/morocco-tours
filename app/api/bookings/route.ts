import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyFirebaseToken } from '@/lib/user-auth-server'

export const dynamic = 'force-dynamic'

// Helper to verify user authentication
async function verifyAuth(request: NextRequest): Promise<{ uid: string } | null> {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('[BOOKINGS AUTH] No auth header or invalid format')
      return null
    }

    const idToken = authHeader.replace('Bearer ', '')
    console.log('[BOOKINGS AUTH] Verifying token...')
    const verification = await verifyFirebaseToken(idToken)
    
    if (!verification) {
      console.error('[BOOKINGS AUTH] Token verification returned null')
    } else {
      console.log('[BOOKINGS AUTH] Token verified for user:', verification.uid)
    }
    
    return verification
  } catch (error) {
    console.error('[BOOKINGS AUTH] Auth verification error:', error)
    return null
  }
}

// GET - Get user's bookings list (authenticated)
export async function GET(request: NextRequest) {
  try {
    const authUser = await verifyAuth(request)
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')

    // Build where clause - CRITICAL: Use userId from verified token
    const where: any = { userId: authUser.uid }
    if (status) {
      where.status = status
    }

    // Get total count
    const total = await db.booking.count({ where })

    // Get bookings with pagination
    const bookings = await db.booking.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
      skip: offset ? parseInt(offset) : undefined
    })

    return NextResponse.json({ bookings, total }, { status: 200 })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

// POST - Create new booking (authenticated)
export async function POST(request: NextRequest) {
  try {
    const authUser = await verifyAuth(request)
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      bookingType,
      itemId,
      startDate,
      endDate,
      travelers,
      totalPrice,
      currency,
      customerInfo,
      notes
    } = body

    // Validate required fields
    if (!bookingType || !itemId) {
      return NextResponse.json(
        { error: 'bookingType and itemId are required' },
        { status: 400 }
      )
    }

    // Validate bookingType
    const validTypes = ['experience', 'travel', 'vehicle']
    if (!validTypes.includes(bookingType)) {
      return NextResponse.json(
        { error: `bookingType must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate itemId exists in ContentItem with matching type
    const contentItem = await db.contentItem.findUnique({
      where: { id: itemId }
    })

    if (!contentItem) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      )
    }

    // Verify content type matches booking type
    if (contentItem.type !== bookingType) {
      return NextResponse.json(
        { error: `Item type (${contentItem.type}) does not match booking type (${bookingType})` },
        { status: 400 }
      )
    }

    // Check if item is bookable
    if (!contentItem.bookable) {
      return NextResponse.json(
        { error: 'This item is not available for booking' },
        { status: 400 }
      )
    }

    // Create booking
    const booking = await db.booking.create({
      data: {
        userId: authUser.uid,
        bookingType,
        itemId,
        itemData: {
          title: contentItem.title,
          slug: contentItem.slug,
          image: contentItem.image,
          price: contentItem.price
        },
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        travelers: travelers || null,
        totalPrice: totalPrice || contentItem.price || null,
        currency: currency || 'EUR',
        customerInfo: customerInfo || {},
        status: 'pending',
        paymentStatus: 'pending',
        notes: notes || null
      }
    })

    return NextResponse.json({ booking }, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
