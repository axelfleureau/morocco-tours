// Server-side user authentication helper
// Validates Firebase ID tokens without requiring admin privileges

import { getAuth } from 'firebase-admin/auth'
import { initializeApp, cert, getApps, App } from 'firebase-admin/app'
import { formatPrivateKey } from './firebase-admin'

let adminApp: App | null = null

export function getFirebaseAdminApp(): App | null {
  if (adminApp) return adminApp
  
  if (getApps().length > 0) {
    adminApp = getApps()[0]
    return adminApp
  }
  
  try {
    const privateKey = formatPrivateKey(process.env.FIREBASE_ADMIN_PRIVATE_KEY)
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    
    if (!privateKey || !clientEmail || !projectId) {
      console.error('Firebase Admin credentials missing for user auth')
      return null
    }
    
    adminApp = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      })
    })
    
    return adminApp
  } catch (error) {
    console.error('Failed to initialize Firebase Admin for user auth:', error)
    return null
  }
}

/**
 * Verify Firebase ID token and extract user ID
 * Returns null if verification fails
 */
export async function verifyFirebaseToken(idToken: string): Promise<{ uid: string } | null> {
  try {
    console.log('[USER_AUTH] Getting Firebase Admin app...')
    const app = getFirebaseAdminApp()
    if (!app) {
      console.error('[USER_AUTH] Firebase Admin not initialized - check credentials')
      return null
    }
    
    console.log('[USER_AUTH] Firebase Admin app OK, getting auth...')
    const auth = getAuth(app)
    console.log('[USER_AUTH] Verifying ID token...')
    const decodedToken = await auth.verifyIdToken(idToken)
    console.log('[USER_AUTH] Token verified successfully for UID:', decodedToken.uid)
    
    return { uid: decodedToken.uid }
  } catch (error) {
    console.error('[USER_AUTH] Token verification failed:', error)
    return null
  }
}
