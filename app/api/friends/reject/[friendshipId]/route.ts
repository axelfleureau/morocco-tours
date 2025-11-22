import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyFirebaseToken } from '@/lib/user-auth-server'

export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  { params }: { params: { friendshipId: string } }
) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    const auth = await verifyFirebaseToken(token || '')
    
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const userId = auth.uid
    const { friendshipId } = params

    const friendship = await db.friendship.findUnique({
      where: { id: friendshipId }
    })

    if (!friendship) {
      return NextResponse.json(
        { error: 'Friendship not found' },
        { status: 404 }
      )
    }

    if (friendship.receiverId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized to reject this request' },
        { status: 403 }
      )
    }

    if (friendship.status !== 'pending') {
      return NextResponse.json(
        { error: 'Friendship is not pending' },
        { status: 400 }
      )
    }

    await db.friendship.update({
      where: { id: friendshipId },
      data: {
        status: 'rejected'
      }
    })

    return NextResponse.json(
      { message: 'Richiesta rifiutata' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error rejecting friend request:', error)
    return NextResponse.json(
      { error: 'Failed to reject friend request' },
      { status: 500 }
    )
  }
}
