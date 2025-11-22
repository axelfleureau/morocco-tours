import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyFirebaseToken } from '@/lib/user-auth-server'

export const dynamic = 'force-dynamic'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    const auth = await verifyFirebaseToken(token || '')
    
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const userId = auth.uid
    const { id } = params

    const notification = await db.friendshipNotification.findUnique({
      where: { id }
    })

    if (!notification) {
      return NextResponse.json(
        { error: 'Notification not found' },
        { status: 404 }
      )
    }

    if (notification.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized to update this notification' },
        { status: 403 }
      )
    }

    await db.friendshipNotification.update({
      where: { id },
      data: {
        read: true
      }
    })

    return NextResponse.json(
      { message: 'Notifica aggiornata' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error marking notification as read:', error)
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    )
  }
}
