// Google OAuth Admin Login API
import { NextRequest, NextResponse } from 'next/server'
import { AdminAuthService } from '@/lib/auth-admin'

// Allowed admin emails/domains
const ADMIN_EMAILS = [
  'admin@moroccodreams.com',
  'info@moroccodreams.com'
]

const ADMIN_DOMAINS = ['moroccodreams.com']

function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase()) || 
         ADMIN_DOMAINS.some(domain => email.toLowerCase().endsWith(`@${domain}`))
}

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json()
    
    if (!idToken) {
      return NextResponse.json({ error: 'ID token required' }, { status: 400 })
    }
    
    // Verify token and get user info
    const verification = await AdminAuthService.verifyAdminToken(idToken)
    
    // Check if email is in admin list
    if (!isAdminEmail(verification.user.email)) {
      return NextResponse.json({ 
        error: 'Accesso non autorizzato - email non in whitelist admin' 
      }, { status: 403 })
    }
    
    // Set admin role if not already set
    if (!verification.isAdmin) {
      await AdminAuthService.setAdminRole(verification.uid, true)
    }
    
    return NextResponse.json({
      success: true,
      user: verification.user,
      isAdmin: true
    })
    
  } catch (error) {
    console.error('Google OAuth admin error:', error)
    return NextResponse.json({ 
      error: 'Errore di autenticazione' 
    }, { status: 401 })
  }
}