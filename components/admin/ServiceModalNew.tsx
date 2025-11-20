"use client"

import { useState, useEffect } from 'react'
import { X, Save, Loader2, Plus } from 'lucide-react'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Service {
  id?: string
  name: string
  category: string
  type: string
  price: number
  priceType: string
  locations: string[]
  description: string
}

interface ServiceModalProps {
  service: Service | null
  isOpen: boolean
  onClose: () => void
  onSaveSuccess: () => void
}

export default function ServiceModalNew({ service, isOpen, onClose, onSaveSuccess }: ServiceModalProps) {
  const [formData, setFormData] = useState<Service>({
    name: '',
    category: 'transport',
    type: 'basic',
    price: 0,
    priceType: 'person',
    locations: [],
    description: ''
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [newLocation, setNewLocation] = useState('')

  useEffect(() => {
    if (service) {
      setFormData(service)
    } else {
      setFormData({
        name: '',
        category: 'transport',
        type: 'basic',
        price: 0,
        priceType: 'person',
        locations: [],
        description: ''
      })
    }
  }, [service])

  const handleAddLocation = () => {
    if (newLocation.trim() && !formData.locations.includes(newLocation.trim())) {
      setFormData({
        ...formData,
        locations: [...formData.locations, newLocation.trim()]
      })
      setNewLocation('')
    }
  }

  const handleRemoveLocation = (location: string) => {
    setFormData({
      ...formData,
      locations: formData.locations.filter(l => l !== location)
    })
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const slug = service?.id || generateSlug(formData.name)
      const now = Timestamp.now()
      
      const dataToSave = {
        ...formData,
        updatedAt: now,
        ...(!service && { createdAt: now })
      }

      await setDoc(doc(db, 'services', slug), dataToSave, { merge: true })
      
      onSaveSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message || 'Errore durante il salvataggio')
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
            {service ? 'Modifica Servizio' : 'Nuovo Servizio'}
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
              Nome Servizio *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Es: Transfer aeroporto"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <option value="transport">Transport</option>
                <option value="guide">Guide</option>
                <option value="experience">Experience</option>
                <option value="accommodation">Accommodation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tipo *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                Tipo Prezzo *
              </label>
              <select
                value={formData.priceType}
                onChange={(e) => setFormData({ ...formData, priceType: e.target.value })}
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="person">Per persona</option>
                <option value="day">Per giorno</option>
                <option value="trip">Per viaggio</option>
                <option value="hour">Per ora</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Località Disponibili
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLocation())}
                placeholder="Aggiungi una località..."
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleAddLocation}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.locations.map((location, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm flex items-center gap-2"
                >
                  {location}
                  <button
                    type="button"
                    onClick={() => handleRemoveLocation(location)}
                    className="hover:text-orange-900 dark:hover:text-orange-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
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
              placeholder="Descrizione del servizio..."
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
                  Salva Servizio
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
