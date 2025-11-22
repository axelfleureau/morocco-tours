import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyFirebaseToken } from '@/lib/user-auth-server'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { friendId: string } }
) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    const auth = await verifyFirebaseToken(token || '')
    
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const userId = auth.uid
    const { friendId } = params

    const friendship = await db.friendship.findFirst({
      where: {
        OR: [
          { senderId: userId, receiverId: friendId, status: 'accepted' },
          { senderId: friendId, receiverId: userId, status: 'accepted' }
        ]
      }
    })

    if (!friendship) {
      return NextResponse.json(
        { error: 'You are not friends with this user' },
        { status: 403 }
      )
    }

    const items = await db.wishlist.findMany({
      where: {
        userId: friendId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const wishlistItems = items.map(item => ({
      ...item,
      itemData: item.itemData || {
        title: `Item ${item.itemId}`,
        description: 'Nessuna descrizione disponibile',
        image: '/placeholder.svg'
      }
    }))

    return NextResponse.json({ wishlist: wishlistItems }, { status: 200 })
  } catch (error) {
    console.error('Error fetching friend wishlist:', error)
    return NextResponse.json(
      { error: 'Failed to fetch friend wishlist' },
      { status: 500 }
    )
  }
}
