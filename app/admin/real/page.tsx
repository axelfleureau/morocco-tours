"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminRealPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to unified dashboard
    router.replace('/dashboard')
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Reindirizzamento...</h1>
        <p className="text-muted-foreground">
          L'area admin è ora integrata nella dashboard utente. 
          Reindirizzamento in corso...
        </p>
      </div>
    </div>
  )
}