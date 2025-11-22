"use client"

import { useState, useEffect } from 'react'
import { X, Save, Loader2 } from 'lucide-react'
import { useNotifications } from '../NotificationSystem'
import { validateUrl } from '@/lib/url-validation'
import { useAuth } from '@/context/AuthContext'

interface City {
  id?: string
  name: string
  title: string
  category: string
  image: string
  rating: number
  reviews: number
  description: string
}

interface CityModalProps {
  city: City | null
  isOpen: boolean
  onClose: () => void
  onSaveSuccess: () => void
}

export default function CityModal({ city, isOpen, onClose, onSaveSuccess }: CityModalProps) {
  const { showSuccess, showError } = useNotifications()
  const { user } = useAuth()
  const [formData, setFormData] = useState<City>({
    name: '',
    title: '',
    category: 'imperial',
    image: '',
    rating: 4.5,
    reviews: 0,
    description: ''
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [urlError, setUrlError] = useState('')

  useEffect(() => {
    if (city) {
      setFormData(city)
    } else {
      setFormData({
        name: '',
        title: '',
        category: 'imperial',
        image: '',
        rating: 4.5,
        reviews: 0,
        description: ''
      })
    }
  }, [city])

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleUrlChange = (url: string) => {
    setFormData({ ...formData, image: url })
    // Rimuovi errore onChange per campo opzionale - validazione solo al submit
    setUrlError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      showError('Non autorizzato', 'Devi effettuare il login')
      return
    }
    
    if (formData.image && formData.image.trim()) {
      const urlValidation = validateUrl(formData.image, true)
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
      const token = await user.getIdToken()
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      
      const method = city?.id ? 'PUT' : 'POST'
      const url = city?.id ? `/api/cities/${city.id}` : '/api/cities'
      
      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to save city')
      
      showSuccess('Città Salvata', `"${formData.name}" è stata salvata con successo.`)
      onSaveSuccess()
      onClose()
    } catch (err: any) {
      const errorMessage = err.message || 'Errore durante il salvataggio'
      setError(errorMessage)
      showError('Errore Salvataggio', errorMessage)
    } finally {
      setSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-foreground">
            {city ? 'Modifica Città' : 'Nuova Città'}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nome Città *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                <option value="imperial">Imperial</option>
                <option value="coastal">Coastal</option>
                <option value="desert">Desert</option>
                <option value="mountain">Mountain</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Titolo *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Es: La Perla del Nord"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              URL Immagine (opzionale)
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://esempio.com/immagine.jpg"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Rating *
              </label>
              <input
                type="number"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                required
                min="0"
                max="5"
                step="0.1"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Recensioni *
              </label>
              <input
                type="number"
                value={formData.reviews}
                onChange={(e) => setFormData({ ...formData, reviews: parseInt(e.target.value) })}
                required
                min="0"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Descrizione
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              placeholder="Descrizione della città..."
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Salvataggio...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Salva Città
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Annulla
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
