import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyFirebaseToken } from '@/lib/user-auth-server'

export const dynamic = 'force-dynamic'

function generateRandomCode(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    const auth = await verifyFirebaseToken(token || '')
    
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const userId = auth.uid

    const existingCode = await db.friendCode.findUnique({
      where: { userId }
    })

    if (existingCode) {
      return NextResponse.json(
        { error: 'Friend code already exists for this user', friendCode: existingCode.code },
        { status: 400 }
      )
    }

    let code: string
    let attempts = 0
    const maxAttempts = 10

    while (attempts < maxAttempts) {
      code = `MOR-${generateRandomCode(6)}`
      
      const existing = await db.friendCode.findUnique({
        where: { code }
      })

      if (!existing) {
        const friendCode = await db.friendCode.create({
          data: {
            userId,
            code
          }
        })

        return NextResponse.json({ friendCode: friendCode.code }, { status: 201 })
      }

      attempts++
    }

    return NextResponse.json(
      { error: 'Failed to generate unique code, please try again' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Error generating friend code:', error)
    return NextResponse.json(
      { error: 'Failed to generate friend code' },
      { status: 500 }
    )
  }
}
