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
        { error: 'Unauthorized to accept this request' },
        { status: 403 }
      )
    }

    if (friendship.status !== 'pending') {
      return NextResponse.json(
        { error: 'Friendship is not pending' },
        { status: 400 }
      )
    }

    const updatedFriendship = await db.friendship.update({
      where: { id: friendshipId },
      data: {
        status: 'accepted',
        acceptedAt: new Date()
      }
    })

    const receiver = await db.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true }
    })

    await db.friendshipNotification.create({
      data: {
        userId: friendship.senderId,
        type: 'request_accepted',
        title: 'Richiesta di amicizia accettata',
        message: `${receiver?.name || receiver?.email || 'Un utente'} ha accettato la tua richiesta di amicizia`,
        data: {
          friendshipId: updatedFriendship.id,
          acceptedBy: userId,
          acceptedByName: receiver?.name || receiver?.email
        }
      }
    })

    return NextResponse.json(
      {
        friendship: updatedFriendship,
        message: 'Amicizia accettata'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error accepting friend request:', error)
    return NextResponse.json(
      { error: 'Failed to accept friend request' },
      { status: 500 }
    )
  }
}
