"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'

interface FirebaseContextType {
  user: User | null
  loading: boolean
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  loading: true
})

export function useAuth() {
  const context = useContext(FirebaseContext)
  if (!context) {
    throw new Error('useAuth must be used within FirebaseProvider')
  }
  return context
}

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Dynamic import to ensure client-side only
    const initAuth = async () => {
      try {
        const { auth } = await import('@/lib/firebase')
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user)
          setLoading(false)
        })
        return unsubscribe
      } catch (error) {
        console.error('Firebase auth initialization error:', error)
        setLoading(false)
      }
    }

    let unsubscribe: (() => void) | undefined

    initAuth().then((unsub) => {
      unsubscribe = unsub
    })

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  return (
    <FirebaseContext.Provider value={{ user, loading }}>
      {children}
    </FirebaseContext.Provider>
  )
}
