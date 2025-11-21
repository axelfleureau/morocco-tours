"use client"

import { useState, useEffect } from 'react'
import { X, Save, Loader2 } from 'lucide-react'
import { useNotifications } from '../NotificationSystem'
import { validateUrl } from '@/lib/url-validation'

interface Travel {
  id?: string
  title: string
  category: string
  duration: string
  price: number
  rating: number
  published: boolean
  featured: boolean
  image?: string
  description?: string
}

interface TravelModalProps {
  travel: Travel | null
  onClose: () => void
  onSave: () => void
}

export default function TravelModal({ travel, onClose, onSave }: TravelModalProps) {
  const { showSuccess, showError } = useNotifications()
  const [formData, setFormData] = useState<Travel>({
    title: '',
    category: 'desert',
    duration: '',
    price: 0,
    rating: 4.5,
    published: false,
    featured: false,
    image: '',
    description: ''
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [urlError, setUrlError] = useState('')

  useEffect(() => {
    if (travel) {
      setFormData(travel)
    }
  }, [travel])

  const handleUrlChange = (url: string) => {
    setFormData({ ...formData, image: url })
    // Rimuovi errore onChange per campo opzionale - validazione solo al submit
    setUrlError('')
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
      const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN || process.env.ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
      
      const method = travel?.id ? 'PUT' : 'POST'
      const url = travel?.id ? `/api/travels/${travel.id}` : '/api/travels'
      
      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to save travel')
      
      showSuccess('Viaggio Salvato', `"${formData.title}" è stato salvato con successo.`)
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
            {travel ? 'Modifica Viaggio' : 'Nuovo Viaggio'}
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
              <option value="desert">Desert</option>
              <option value="city">City</option>
              <option value="coast">Coast</option>
              <option value="mountain">Mountain</option>
              <option value="group">Group</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Durata *
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
              placeholder="es. 3 giorni, 1 settimana"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
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

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-500"
            />
            <label htmlFor="featured" className="text-sm font-medium text-foreground">
              Metti in evidenza
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
