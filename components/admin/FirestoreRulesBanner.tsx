"use client"

import { useState, useEffect } from 'react'
import { AlertTriangle, X, ExternalLink, CheckCircle } from 'lucide-react'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function FirestoreRulesBanner() {
  const [isRulesDeployed, setIsRulesDeployed] = useState<boolean | null>(null)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    checkFirestoreRules()
  }, [])

  const checkFirestoreRules = async () => {
    try {
      const testCollections = ['cities', 'travels', 'experiences', 'vehicles', 'blog']
      let canReadPublic = true

      for (const collectionName of testCollections) {
        try {
          const q = query(collection(db, collectionName), limit(1))
          await getDocs(q)
        } catch (error: any) {
          if (error.code === 'permission-denied') {
            canReadPublic = false
            break
          }
        }
      }

      setIsRulesDeployed(canReadPublic)
    } catch (error) {
      console.error('Error checking Firestore rules:', error)
      setIsRulesDeployed(false)
    } finally {
      setIsChecking(false)
    }
  }

  if (isChecking) {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
        <div className="flex items-center">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3" />
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Verifica configurazione Firestore in corso...
          </p>
        </div>
      </div>
    )
  }

  if (isRulesDeployed === true) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
        <div className="flex items-start">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-semibold text-green-800 dark:text-green-200">
              Firestore Configurato Correttamente
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              Le regole di sicurezza sono attive. Le modifiche salvate qui appariranno automaticamente sul sito pubblico.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (isDismissed) return null

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
      <div className="flex items-start">
        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
        <div className="ml-3 flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-800 dark:text-red-200">
                ⚠️ AZIONE RICHIESTA: Deploy Regole Firestore
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 mt-2">
                <strong>Le modifiche salvate qui NON appariranno sul sito pubblico</strong> finché non deploi le regole di sicurezza Firestore.
              </p>
              
              <div className="mt-3 bg-white dark:bg-gray-800 rounded-lg p-3 border border-red-200 dark:border-red-800">
                <p className="text-sm font-medium text-red-900 dark:text-red-100 mb-2">
                  Passi per risolvere:
                </p>
                <ol className="text-sm text-red-800 dark:text-red-200 space-y-2 list-decimal list-inside">
                  <li>Vai su <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-600 dark:hover:text-red-300 inline-flex items-center">Firebase Console <ExternalLink className="w-3 h-3 ml-1" /></a></li>
                  <li>Seleziona il tuo progetto</li>
                  <li>Nel menu laterale, clicca <strong>Firestore Database</strong> → <strong>Rules</strong></li>
                  <li>Copia il contenuto del file <code className="bg-red-100 dark:bg-red-900 px-1 py-0.5 rounded">firestore.rules</code> dalla root del progetto</li>
                  <li>Incollalo nell'editor e clicca <strong>Publish</strong></li>
                  <li>Ricarica questa pagina per verificare</li>
                </ol>
              </div>

              <p className="text-xs text-red-600 dark:text-red-400 mt-3 italic">
                Senza questo deploy, il sito pubblico non può leggere i dati da Firestore e le tue modifiche rimarranno invisibili.
              </p>
            </div>
            <button
              onClick={() => setIsDismissed(true)}
              className="ml-4 p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
              aria-label="Chiudi avviso"
            >
              <X className="w-4 h-4 text-red-600 dark:text-red-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
