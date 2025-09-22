// Firebase Admin Authentication - Server-side only
// Handles custom claims, user verification, and admin privileges

import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

// Initialize Firebase Admin (server-side only)
function initializeFirebaseAdmin() {
  if (getApps().length === 0) {
    // Initialize with service account credentials
    // In production, use environment variables
    const adminConfig = {
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`
    }
    
    try {
      return initializeApp(adminConfig, 'admin')
    } catch (error) {
      console.error('Failed to initialize Firebase Admin:', error)
      throw error
    }
  }
  
  return getApps()[0]
}

let adminApp: any = null
let adminAuth: any = null
let adminDb: any = null

try {
  adminApp = initializeFirebaseAdmin()
  adminAuth = getAuth(adminApp)
  adminDb = getFirestore(adminApp)
} catch (error) {
  console.error('Firebase Admin initialization error:', error)
}

// Admin user management
export class AdminAuthService {
  
  // Verify ID token and check admin role
  static async verifyAdminToken(idToken: string): Promise<{ uid: string; isAdmin: boolean; user: any }> {
    try {
      if (!adminAuth) {
        throw new Error('Firebase Admin not initialized')
      }
      
      const decodedToken = await adminAuth.verifyIdToken(idToken)
      const uid = decodedToken.uid
      
      // Check custom claims
      const isAdmin = decodedToken.role === 'admin' || decodedToken.admin === true
      
      // Get user profile from Firestore
      const userDoc = await adminDb.collection('users').doc(uid).get()
      const userProfile = userDoc.exists ? userDoc.data() : null
      
      return {
        uid,
        isAdmin: isAdmin || (userProfile?.role === 'admin'),
        user: {
          uid,
          email: decodedToken.email,
          name: decodedToken.name,
          role: userProfile?.role || 'user',
          ...userProfile
        }
      }
    } catch (error) {
      console.error('Token verification error:', error)
      throw new Error('Invalid or expired token')
    }
  }
  
  // Set custom claims for admin users
  static async setAdminRole(uid: string, isAdmin: boolean = true): Promise<void> {
    try {
      if (!adminAuth) {
        throw new Error('Firebase Admin not initialized')
      }
      
      await adminAuth.setCustomUserClaims(uid, { 
        role: isAdmin ? 'admin' : 'user',
        admin: isAdmin 
      })
      
      // Also update in Firestore
      if (adminDb) {
        await adminDb.collection('users').doc(uid).set({
          role: isAdmin ? 'admin' : 'user',
          permissions: isAdmin ? {
            canEditContent: true,
            canManageUsers: true,
            canEditTheme: true,
            canPublish: true
          } : {},
          updatedAt: new Date()
        }, { merge: true })
      }
      
    } catch (error) {
      console.error('Error setting admin role:', error)
      throw error
    }
  }
  
  // Create admin user
  static async createAdminUser(email: string, password: string, displayName?: string): Promise<string> {
    try {
      if (!adminAuth) {
        throw new Error('Firebase Admin not initialized')
      }
      
      const userRecord = await adminAuth.createUser({
        email,
        password,
        displayName,
        emailVerified: true
      })
      
      // Set admin claims
      await this.setAdminRole(userRecord.uid, true)
      
      return userRecord.uid
    } catch (error) {
      console.error('Error creating admin user:', error)
      throw error
    }
  }
  
  // List all users with pagination
  static async listUsers(maxResults: number = 1000): Promise<any[]> {
    try {
      if (!adminAuth) {
        throw new Error('Firebase Admin not initialized')
      }
      
      const listUsersResult = await adminAuth.listUsers(maxResults)
      return listUsersResult.users.map(user => ({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
        disabled: user.disabled,
        customClaims: user.customClaims,
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime
      }))
    } catch (error) {
      console.error('Error listing users:', error)
      throw error
    }
  }
  
  // Delete user
  static async deleteUser(uid: string): Promise<void> {
    try {
      if (!adminAuth) {
        throw new Error('Firebase Admin not initialized')
      }
      
      await adminAuth.deleteUser(uid)
      
      // Also delete from Firestore
      if (adminDb) {
        await adminDb.collection('users').doc(uid).delete()
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  }
  
  // Check if user exists and is admin
  static async isUserAdmin(uid: string): Promise<boolean> {
    try {
      if (!adminAuth) return false
      
      const userRecord = await adminAuth.getUser(uid)
      return userRecord.customClaims?.admin === true || userRecord.customClaims?.role === 'admin'
    } catch (error) {
      console.error('Error checking admin status:', error)
      return false
    }
  }
}

// Middleware helper for API routes
export async function requireAdmin(idToken: string) {
  const verification = await AdminAuthService.verifyAdminToken(idToken)
  
  if (!verification.isAdmin) {
    throw new Error('Insufficient permissions - admin role required')
  }
  
  return verification
}

// Export for Next.js API routes
export { adminAuth, adminDb }