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

    const friendCode = await db.friendCode.findUnique({
      where: { userId }
    })

    if (!friendCode) {
      return NextResponse.json({ friendCode: null }, { status: 200 })
    }

    return NextResponse.json({ friendCode: friendCode.code }, { status: 200 })
  } catch (error) {
    console.error('Error fetching friend code:', error)
    return NextResponse.json(
      { error: 'Failed to fetch friend code' },
      { status: 500 }
    )
  }
}
