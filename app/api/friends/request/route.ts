import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyFirebaseToken } from '@/lib/user-auth-server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    const auth = await verifyFirebaseToken(token || '')
    
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const userId = auth.uid
    const body = await request.json()
    const { friendCode } = body

    if (!friendCode) {
      return NextResponse.json(
        { error: 'Friend code is required' },
        { status: 400 }
      )
    }

    const friendCodeRecord = await db.friendCode.findUnique({
      where: { code: friendCode }
    })

    if (!friendCodeRecord) {
      return NextResponse.json(
        { error: 'Friend code not found' },
        { status: 404 }
      )
    }

    const receiverId = friendCodeRecord.userId

    if (receiverId === userId) {
      return NextResponse.json(
        { error: 'Cannot send friend request to yourself' },
        { status: 400 }
      )
    }

    const existingFriendship = await db.friendship.findFirst({
      where: {
        OR: [
          { senderId: userId, receiverId },
          { senderId: receiverId, receiverId: userId }
        ]
      }
    })

    if (existingFriendship) {
      return NextResponse.json(
        { error: 'Friendship already exists or pending', friendship: existingFriendship },
        { status: 400 }
      )
    }

    const friendship = await db.friendship.create({
      data: {
        senderId: userId,
        receiverId,
        status: 'pending'
      }
    })

    const sender = await db.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true }
    })

    await db.friendshipNotification.create({
      data: {
        userId: receiverId,
        type: 'friend_request',
        title: 'Nuova richiesta di amicizia',
        message: `${sender?.name || sender?.email || 'Un utente'} ti ha inviato una richiesta di amicizia`,
        data: {
          friendshipId: friendship.id,
          senderId: userId,
          senderName: sender?.name || sender?.email
        }
      }
    })

    return NextResponse.json(
      {
        friendship,
        message: 'Richiesta inviata'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error sending friend request:', error)
    return NextResponse.json(
      { error: 'Failed to send friend request' },
      { status: 500 }
    )
  }
}
