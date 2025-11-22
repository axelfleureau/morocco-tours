import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyFirebaseToken } from '@/lib/user-auth-server'
import { isAdmin } from '@/lib/auth-helpers'

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

// GET - Get single booking details (authenticated, owner only)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = await verifyAuth(request)
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const booking = await db.booking.findUnique({
      where: { id: params.id }
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Verify user owns this booking (or is admin)
    const admin = await isAdmin(request.headers.get('authorization'))
    if (booking.userId !== authUser.uid && !admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ booking }, { status: 200 })
  } catch (error) {
    console.error('Error fetching booking:', error)
    return NextResponse.json({ error: 'Failed to fetch booking' }, { status: 500 })
  }
}

// PUT - Update booking status (authenticated, owner or admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = await verifyAuth(request)
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const booking = await db.booking.findUnique({
      where: { id: params.id }
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Verify user owns this booking or is admin
    const admin = await isAdmin(request.headers.get('authorization'))
    if (booking.userId !== authUser.uid && !admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { status, paymentStatus, notes, totalPrice, startDate, endDate, travelers } = body

    // Users can only update certain fields, admins can update all
    const updateData: any = {}
    
    if (admin) {
      // Admins can update any field
      if (status !== undefined) updateData.status = status
      if (paymentStatus !== undefined) updateData.paymentStatus = paymentStatus
      if (notes !== undefined) updateData.notes = notes
      if (totalPrice !== undefined) updateData.totalPrice = totalPrice
      if (startDate !== undefined) updateData.startDate = new Date(startDate)
      if (endDate !== undefined) updateData.endDate = new Date(endDate)
      if (travelers !== undefined) updateData.travelers = travelers
    } else {
      // Regular users can only update limited fields
      if (notes !== undefined) updateData.notes = notes
      // Users can cancel their own bookings
      if (status === 'cancelled') updateData.status = 'cancelled'
    }

    const updatedBooking = await db.booking.update({
      where: { id: params.id },
      data: updateData
    })

    return NextResponse.json({ booking: updatedBooking }, { status: 200 })
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  }
}

// DELETE - Cancel booking (authenticated, owner or admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = await verifyAuth(request)
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const booking = await db.booking.findUnique({
      where: { id: params.id }
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Verify user owns this booking or is admin
    const admin = await isAdmin(request.headers.get('authorization'))
    if (booking.userId !== authUser.uid && !admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Soft delete - set status to cancelled instead of deleting
    await db.booking.update({
      where: { id: params.id },
      data: { 
        status: 'cancelled',
        updatedAt: new Date()
      }
    })

    return NextResponse.json(
      { success: true, id: params.id, message: 'Booking cancelled' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error cancelling booking:', error)
    return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 })
  }
}
