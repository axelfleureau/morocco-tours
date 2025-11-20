"use client"

import { useState, useEffect } from 'react'
import { X, Save, Loader2 } from 'lucide-react'
import { doc, setDoc, addDoc, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useNotifications } from '../NotificationSystem'
import { validateUrl } from '@/lib/url-validation'

interface Experience {
  id?: string
  title: string
  category: string
  price: number
  rating: number
  published: boolean
  image?: string
  description?: string
}

interface ExperienceModalProps {
  experience: Experience | null
  onClose: () => void
  onSave: () => void
}

export default function ExperienceModal({ experience, onClose, onSave }: ExperienceModalProps) {
  const { showSuccess, showError } = useNotifications()
  const [formData, setFormData] = useState<Experience>({
    title: '',
    category: 'surf',
    price: 0,
    rating: 4.5,
    published: false,
    image: '',
    description: ''
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [urlError, setUrlError] = useState('')

  useEffect(() => {
    if (experience) {
      setFormData(experience)
    }
  }, [experience])

  const handleUrlChange = (url: string) => {
    setFormData({ ...formData, image: url })
    if (url) {
      const validation = validateUrl(url, false)
      setUrlError(validation.valid ? '' : validation.error || '')
    } else {
      setUrlError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.image) {
      const urlValidation = validateUrl(formData.image, false)
      if (!urlValidation.valid) {
        setUrlError(urlValidation.error || 'URL non valido')
        showError('Errore Validazione', urlValidation.error || 'URL immagine non valido')
        return
      }
    }
    
    setSaving(true)
    setError('')
    setUrlError('')

    try {
      if (experience?.id) {
        // Update existing - use merge to preserve other fields
        await setDoc(doc(db, 'experiences', experience.id), formData, { merge: true })
      } else {
        // Create new
        await addDoc(collection(db, 'experiences'), formData)
      }
      showSuccess('Esperienza Salvata', `"${formData.title}" è stata salvata con successo.`)
      onSave()
      onClose()
    } catch (err: any) {
      const errorMessage = err.message || 'Errore durante il salvataggio'
      setError(errorMessage)
      showError('Errore Salvataggio', errorMessage)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            {experience ? 'Modifica Esperienza' : 'Nuova Esperienza'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Titolo *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Categoria *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="surf">Surf</option>
              <option value="cucina">Cucina</option>
              <option value="trekking">Trekking</option>
              <option value="quad-cammelli">Quad & Cammelli</option>
              <option value="artigianato">Artigianato</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Prezzo (€) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Rating
              </label>
              <input
                type="number"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                min="0"
                max="5"
                step="0.1"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              URL Immagine
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://..."
              className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                urlError ? 'border-red-500 dark:border-red-400' : 'border-border'
              }`}
            />
            {urlError && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {urlError}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Descrizione
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-500"
            />
            <label htmlFor="published" className="text-sm font-medium text-foreground">
              Pubblica immediatamente
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Salvataggio...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Salva
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
