import { getAuth } from 'firebase-admin/auth'
import { db } from '@/lib/db'
import { getFirebaseAdminApp } from './user-auth-server'

/**
 * Secure admin authentication helper
 * Verifies Firebase ID token and checks AdminUser table in Postgres
 * 
 * @param authHeader - Authorization header from request (e.g., "Bearer <token>")
 * @returns Promise<boolean> - true if user is an active admin, false otherwise
 */
export async function isAdmin(authHeader: string | null): Promise<boolean> {
  if (!authHeader) {
    console.log('[AUTH_HELPER] No authorization header provided')
    return false
  }
  
  const token = authHeader.replace('Bearer ', '').trim()
  
  if (!token) {
    console.log('[AUTH_HELPER] Empty token after Bearer removal')
    return false
  }
  
  try {
    // Step 1: Verify Firebase ID token using Firebase Admin SDK
    console.log('[AUTH_HELPER] Verifying Firebase token...')
    const app = getFirebaseAdminApp()
    
    if (!app) {
      console.error('[AUTH_HELPER] Firebase Admin app not initialized')
      return false
    }
    
    const auth = getAuth(app)
    const decodedToken = await auth.verifyIdToken(token)
    const uid = decodedToken.uid
    
    console.log('[AUTH_HELPER] Firebase token verified for UID:', uid)
    
    // Step 2: Check AdminUser table in Postgres
    console.log('[AUTH_HELPER] Checking AdminUser table...')
    const adminUser = await db.adminUser.findUnique({
      where: { uid }
    })
    
    if (!adminUser) {
      console.log('[AUTH_HELPER] User not found in AdminUser table')
      return false
    }
    
    if (!adminUser.active) {
      console.log('[AUTH_HELPER] Admin user exists but is not active')
      return false
    }
    
    console.log('[AUTH_HELPER] ✅ Admin verified:', adminUser.email, 'Role:', adminUser.role)
    return true
    
  } catch (error) {
    console.error('[AUTH_HELPER] Admin verification failed:', error)
    return false
  }
}
