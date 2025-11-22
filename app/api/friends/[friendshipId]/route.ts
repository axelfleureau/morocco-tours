import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyFirebaseToken } from '@/lib/user-auth-server'

export const dynamic = 'force-dynamic'

export async function DELETE(
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

    if (friendship.senderId !== userId && friendship.receiverId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized to remove this friendship' },
        { status: 403 }
      )
    }

    await db.friendship.delete({
      where: { id: friendshipId }
    })

    return NextResponse.json(
      { message: 'Amicizia rimossa' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error removing friend:', error)
    return NextResponse.json(
      { error: 'Failed to remove friend' },
      { status: 500 }
    )
  }
}
