import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyFirebaseToken } from '@/lib/user-auth-server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    const auth = await verifyFirebaseToken(token || '')
    
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const userId = auth.uid

    const friendships = await db.friendship.findMany({
      where: {
        OR: [
          { senderId: userId, status: 'accepted' },
          { receiverId: userId, status: 'accepted' }
        ]
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            photoURL: true
          }
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
            photoURL: true
          }
        }
      },
      orderBy: {
        acceptedAt: 'desc'
      }
    })

    const formattedFriends = friendships.map(fs => ({
      friendshipId: fs.id,
      friendId: fs.senderId === userId ? fs.receiverId : fs.senderId,
      friend: {
        id: fs.senderId === userId ? fs.receiver.id : fs.sender.id,
        name: fs.senderId === userId ? fs.receiver.name : fs.sender.name,
        email: fs.senderId === userId ? fs.receiver.email : fs.sender.email,
        photoURL: fs.senderId === userId ? fs.receiver.photoURL : fs.sender.photoURL
      },
      acceptedAt: fs.acceptedAt
    }))

    return NextResponse.json({ friends: formattedFriends }, { status: 200 })
  } catch (error) {
    console.error('Error fetching friends:', error)
    return NextResponse.json(
      { error: 'Failed to fetch friends' },
      { status: 500 }
    )
  }
}
