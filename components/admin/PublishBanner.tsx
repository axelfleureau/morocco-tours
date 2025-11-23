"use client"

import { useState } from 'react'
import { CheckCircle, Rocket, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

export default function PublishBanner() {
  const { user } = useAuth()
  const [isPublished, setIsPublished] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  const handlePublish = async () => {
    if (!user) {
      toast.error('You must be logged in to publish')
      return
    }

    setIsPublishing(true)
    
    try {
      const token = await user.getIdToken()
      
      const response = await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to publish changes')
      }

      const data = await response.json()
      
      setIsPublished(true)
      toast.success('Contenuti pubblicati con successo!')
      
      // Auto-dismiss after 5 seconds
      setTimeout(() => setIsDismissed(true), 5000)
    } catch (error: any) {
      console.error('Error publishing:', error)
      toast.error(error.message || 'Errore durante la pubblicazione')
    } finally {
      setIsPublishing(false)
    }
  }

  if (isDismissed) return null

  if (isPublished) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
        <div className="flex items-start">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-semibold text-green-800 dark:text-green-200">
              ✓ Contenuti Pubblicati
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              Le modifiche salvate sono ora visibili sul sito pubblico. Tutti i contenuti sono stati sincronizzati.
            </p>
          </div>
          <button
            onClick={() => setIsDismissed(true)}
            className="ml-4 p-1 hover:bg-green-100 dark:hover:bg-green-900 rounded transition-colors"
            aria-label="Chiudi"
          >
            <X className="w-4 h-4 text-green-600 dark:text-green-400" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200">
            Pubblicazione Contenuti
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
            Tutte le modifiche salvate vengono sincronizzate automaticamente. Clicca il pulsante per confermare la pubblicazione dei contenuti sul sito pubblico.
          </p>
        </div>
        <div className="flex gap-2 ml-4">
          <Button
            onClick={handlePublish}
            size="sm"
            disabled={isPublishing}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2 whitespace-nowrap"
          >
            {isPublishing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Pubblicazione...
              </>
            ) : (
              <>
                <Rocket className="w-4 h-4" />
                Pubblica Ora
              </>
            )}
          </Button>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition-colors"
            aria-label="Chiudi"
          >
            <X className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </button>
        </div>
      </div>
    </div>
  )
}
