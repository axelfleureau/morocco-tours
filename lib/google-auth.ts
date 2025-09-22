// Google OAuth Client-side Authentication
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'

// Configure Google OAuth
googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export class GoogleAuthService {
  
  // Sign in with Google popup
  static async signInWithGoogle(): Promise<{ user: any; idToken: string }> {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      const idToken = await user.getIdToken()
      
      return {
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        },
        idToken
      }
    } catch (error: any) {
      console.error('Google sign-in error:', error)
      
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Login annullato dall\'utente')
      } else if (error.code === 'auth/popup-blocked') {
        throw new Error('Popup bloccato dal browser')
      } else {
        throw new Error('Errore durante il login con Google')
      }
    }
  }
  
  // Sign out
  static async signOut(): Promise<void> {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Sign out error:', error)
      throw new Error('Errore durante il logout')
    }
  }
  
  // Get current user ID token
  static async getCurrentUserToken(): Promise<string | null> {
    const user = auth.currentUser
    if (!user) return null
    
    try {
      return await user.getIdToken()
    } catch (error) {
      console.error('Error getting user token:', error)
      return null
    }
  }
  
  // Listen to auth state changes
  static onAuthStateChanged(callback: (user: any) => void): () => void {
    return onAuthStateChanged(auth, callback)
  }
  
  // Verify admin access via API
  static async verifyAdminAccess(idToken: string): Promise<{ isAdmin: boolean; user: any }> {
    try {
      const response = await fetch('/api/admin/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Verification failed')
      }
      
      return {
        isAdmin: data.isAdmin,
        user: data.user
      }
    } catch (error) {
      console.error('Admin verification error:', error)
      throw error
    }
  }
}