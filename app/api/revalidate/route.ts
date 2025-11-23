import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'
import { isAdmin } from '@/lib/auth-helpers'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const adminStatus = await isAdmin(token)

    if (!adminStatus) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
    }

    // Revalidate all content tags
    revalidateTag('content')
    revalidateTag('experiences')
    revalidateTag('travels')
    revalidateTag('services')
    revalidateTag('blog')
    revalidateTag('vehicles')
    revalidateTag('bookings')
    
    // Revalidate all main paths
    revalidatePath('/', 'layout')
    revalidatePath('/esperienze')
    revalidatePath('/viaggi')
    revalidatePath('/servizi')
    revalidatePath('/blog')
    revalidatePath('/veicoli')

    return NextResponse.json({ 
      success: true, 
      message: 'All content revalidated successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error revalidating:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate content' },
      { status: 500 }
    )
  }
}
