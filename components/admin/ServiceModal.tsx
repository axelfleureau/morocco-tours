"use client"

import React, { useState, useEffect } from 'react'
import { X, Save, Check } from 'lucide-react'
import { Service } from '@/lib/firestore-schema'

interface ServiceModalProps {
  isOpen: boolean
  onClose: () => void
  service?: Service | null
  onSave: (service: Partial<Service>) => Promise<void>
}

export default function ServiceModal({ isOpen, onClose, service, onSave }: ServiceModalProps) {
  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    slug: '',
    description: '',
    category: 'transport',
    type: 'optional',
    price: 0,
    priceType: 'per_person',
    currency: 'EUR',
    locations: [],
    travelTypes: [],
    status: 'draft',
    published: false
  })
  const [saving, setSaving] = useState(false)
  const [locationInput, setLocationInput] = useState('')
  const [travelTypeInput, setTravelTypeInput] = useState('')

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || '',
        slug: service.slug || '',
        description: service.description || '',
        category: service.category || 'transport',
        type: service.type || 'optional',
        price: service.price || 0,
        priceType: service.priceType || 'per_person',
        currency: service.currency || 'EUR',
        locations: service.locations || [],
        travelTypes: service.travelTypes || [],
        status: service.status || 'draft',
        published: service.published || false
      })
    } else {
      // Reset for new service
      setFormData({
        name: '',
        slug: '',
        description: '',
        category: 'transport',
        type: 'optional',
        price: 0,
        priceType: 'per_person',
        currency: 'EUR',
        locations: [],
        travelTypes: [],
        status: 'draft',
        published: false
      })
    }
  }, [service, isOpen])

  // Auto-generate slug from name
  useEffect(() => {
    if (formData.name && (!service || !service.slug)) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.name, service])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.slug) return

    setSaving(true)
    try {
      await onSave(formData)
      onClose()
    } catch (error) {
      console.error('Error saving service:', error)
    } finally {
      setSaving(false)
    }
  }

  const addLocation = () => {
    if (locationInput.trim() && !formData.locations?.includes(locationInput.trim())) {
      setFormData(prev => ({
        ...prev,
        locations: [...(prev.locations || []), locationInput.trim()]
      }))
      setLocationInput('')
    }
  }

  const removeLocation = (location: string) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations?.filter(l => l !== location) || []
    }))
  }

  const addTravelType = () => {
    if (travelTypeInput.trim() && !formData.travelTypes?.includes(travelTypeInput.trim())) {
      setFormData(prev => ({
        ...prev,
        travelTypes: [...(prev.travelTypes || []), travelTypeInput.trim()]
      }))
      setTravelTypeInput('')
    }
  }

  const removeTravelType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      travelTypes: prev.travelTypes?.filter(t => t !== type) || []
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {service ? 'Modifica Servizio' : 'Nuovo Servizio'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nome Servizio *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="es. Guida Privata Marrakech"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="guida-privata-marrakech"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Descrizione
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Descrizione dettagliata del servizio..."
            />
          </div>

          {/* Category and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Categoria *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              >
                <option value="transport">Trasporti</option>
                <option value="guide">Guide</option>
                <option value="insurance">Assicurazioni</option>
                <option value="accommodation">Alloggi</option>
                <option value="meal">Pasti</option>
                <option value="activity">Attività</option>
                <option value="equipment">Attrezzature</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tipo Servizio *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              >
                <option value="optional">Opzionale</option>
                <option value="addon">Add-on</option>
                <option value="upgrade">Upgrade</option>
                <option value="required">Richiesto</option>
              </select>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Prezzo *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tipo Prezzo *
              </label>
              <select
                value={formData.priceType}
                onChange={(e) => setFormData(prev => ({ ...prev, priceType: e.target.value as any }))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              >
                <option value="per_person">Per Persona</option>
                <option value="per_group">Per Gruppo</option>
                <option value="per_day">Per Giorno</option>
                <option value="flat_rate">Tariffa Fissa</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Valuta *
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="MAD">MAD (درهم)</option>
              </select>
            </div>
          </div>

          {/* Locations */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Località Disponibili
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Aggiungi località..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLocation())}
              />
              <button
                type="button"
                onClick={addLocation}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Aggiungi
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.locations?.map((location) => (
                <span
                  key={location}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 rounded-full text-sm"
                >
                  {location}
                  <button
                    type="button"
                    onClick={() => removeLocation(location)}
                    className="ml-1 text-orange-600 hover:text-orange-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Travel Types */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tipi di Viaggio Compatibili
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={travelTypeInput}
                onChange={(e) => setTravelTypeInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="es. imperial-cities, desert..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTravelType())}
              />
              <button
                type="button"
                onClick={addTravelType}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Aggiungi
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.travelTypes?.map((type) => (
                <span
                  key={type}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {type}
                  <button
                    type="button"
                    onClick={() => removeTravelType(type)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Publishing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="draft">Bozza</option>
                <option value="published">Pubblicato</option>
              </select>
            </div>
            <div className="flex items-center space-x-3 pt-7">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                  className="w-4 h-4 text-orange-500 border-border rounded focus:ring-orange-500"
                />
                <span className="text-sm text-foreground">Pubblica subito</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 border border-border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={saving || !formData.name || !formData.slug}
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Salvataggio...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {service ? 'Aggiorna' : 'Crea'} Servizio
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}