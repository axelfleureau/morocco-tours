"use client"

import { useState, useEffect } from 'react'
import { X, Save, Loader2, Plus, Trash2 } from 'lucide-react'
import { useNotifications } from '../NotificationSystem'
import { validateUrl } from '@/lib/url-validation'

interface PricingPeriod {
  name: string
  startDate: string
  endDate: string
  prices: {
    short: number
    medium: number
    long: number
  }
}

interface Vehicle {
  id?: string
  name: string
  slug: string
  category: string
  transmission: string
  fuelType: string
  seats: number
  doors: number
  luggage: number
  image?: string
  features?: string[]
  pricingPeriods?: PricingPeriod[]
  published: boolean
  featured: boolean
  available: boolean
}

interface VehicleModalProps {
  vehicle: Vehicle | null
  onClose: () => void
  onSave: () => void
}

export default function VehicleModal({ vehicle, onClose, onSave }: VehicleModalProps) {
  const { showSuccess, showError } = useNotifications()
  const [formData, setFormData] = useState<Vehicle>({
    name: '',
    slug: '',
    category: 'economica',
    transmission: 'manuale',
    fuelType: 'benzina',
    seats: 5,
    doors: 4,
    luggage: 2,
    image: '',
    features: [],
    pricingPeriods: [
      {
        name: 'Bassa Stagione',
        startDate: '2025-01-01',
        endDate: '2025-06-30',
        prices: { short: 40, medium: 38, long: 35 }
      }
    ],
    published: true,
    featured: false,
    available: true
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [urlError, setUrlError] = useState('')

  const headers = {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN || process.env.ADMIN_TOKEN}`,
    'Content-Type': 'application/json'
  }

  useEffect(() => {
    if (vehicle) {
      setFormData({
        ...vehicle,
        features: vehicle.features || [],
        pricingPeriods: vehicle.pricingPeriods || [
          {
            name: 'Bassa Stagione',
            startDate: '2025-01-01',
            endDate: '2025-06-30',
            prices: { short: 40, medium: 38, long: 35 }
          }
        ]
      })
    }
  }, [vehicle])

  const handleUrlChange = (url: string) => {
    setFormData({ ...formData, image: url })
    // Rimuovi errore onChange per campo opzionale - validazione solo al submit
    setUrlError('')
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: vehicle?.id ? formData.slug : generateSlug(name)
    })
  }

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...(formData.features || []), '']
    })
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [])]
    newFeatures[index] = value
    setFormData({ ...formData, features: newFeatures })
  }

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: (formData.features || []).filter((_, i) => i !== index)
    })
  }

  const addPricingPeriod = () => {
    setFormData({
      ...formData,
      pricingPeriods: [
        ...(formData.pricingPeriods || []),
        {
          name: '',
          startDate: '',
          endDate: '',
          prices: { short: 40, medium: 38, long: 35 }
        }
      ]
    })
  }

  const updatePricingPeriod = (index: number, field: string, value: any) => {
    const newPeriods = [...(formData.pricingPeriods || [])]
    if (field.startsWith('prices.')) {
      const priceType = field.split('.')[1]
      newPeriods[index] = {
        ...newPeriods[index],
        prices: {
          ...newPeriods[index].prices,
          [priceType]: parseFloat(value) || 0
        }
      }
    } else {
      newPeriods[index] = {
        ...newPeriods[index],
        [field]: value
      }
    }
    setFormData({ ...formData, pricingPeriods: newPeriods })
  }

  const removePricingPeriod = (index: number) => {
    setFormData({
      ...formData,
      pricingPeriods: (formData.pricingPeriods || []).filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.image && formData.image.trim()) {
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
      const dataToSave = {
        name: formData.name,
        slug: formData.slug,
        category: formData.category,
        transmission: formData.transmission,
        fuelType: formData.fuelType,
        seats: parseInt(formData.seats as any) || 5,
        doors: parseInt(formData.doors as any) || 4,
        luggage: parseInt(formData.luggage as any) || 2,
        image: formData.image || null,
        features: (formData.features || []).filter(f => f.trim() !== ''),
        pricingPeriods: formData.pricingPeriods,
        published: formData.published,
        featured: formData.featured,
        available: formData.available
      }

      const url = vehicle?.id ? `/api/vehicles/${vehicle.id}` : '/api/vehicles'
      const method = vehicle?.id ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(dataToSave)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save vehicle')
      }

      showSuccess('Veicolo Salvato', `"${formData.name}" è stato salvato con successo.`)
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {vehicle ? 'Modifica Veicolo' : 'Nuovo Veicolo'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Veicolo *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              >
                <option value="economica">Economica</option>
                <option value="suv">SUV</option>
                <option value="Premium">Premium</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trasmissione *
              </label>
              <select
                value={formData.transmission}
                onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              >
                <option value="manuale">Manuale</option>
                <option value="automatica">Automatica</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Carburante *
              </label>
              <select
                value={formData.fuelType}
                onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              >
                <option value="benzina">Benzina</option>
                <option value="diesel">Diesel</option>
                <option value="ibrida">Ibrida</option>
                <option value="elettrica">Elettrica</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Posti *
              </label>
              <input
                type="number"
                value={formData.seats}
                onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) || 5 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                min="2"
                max="9"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Porte *
              </label>
              <input
                type="number"
                value={formData.doors}
                onChange={(e) => setFormData({ ...formData, doors: parseInt(e.target.value) || 4 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                min="2"
                max="5"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bagagli *
              </label>
              <input
                type="number"
                value={formData.luggage}
                onChange={(e) => setFormData({ ...formData, luggage: parseInt(e.target.value) || 2 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                min="1"
                max="10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL Immagine (opzionale)
            </label>
            <input
              type="text"
              value={formData.image || ''}
              onChange={(e) => handleUrlChange(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                urlError ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://example.com/vehicle.jpg"
            />
            {urlError && (
              <p className="text-red-600 text-sm mt-1">{urlError}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Caratteristiche
              </label>
              <button
                type="button"
                onClick={addFeature}
                className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Aggiungi
              </button>
            </div>
            {(formData.features || []).map((feature, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Es: Aria condizionata"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Periodi di Prezzo
              </label>
              <button
                type="button"
                onClick={addPricingPeriod}
                className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Aggiungi Periodo
              </button>
            </div>
            {(formData.pricingPeriods || []).map((period, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-gray-900">Periodo {index + 1}</h4>
                  {(formData.pricingPeriods || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePricingPeriod(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={period.name}
                      onChange={(e) => updatePricingPeriod(index, 'name', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                      placeholder="Es: Alta Stagione"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Data Inizio
                    </label>
                    <input
                      type="date"
                      value={period.startDate}
                      onChange={(e) => updatePricingPeriod(index, 'startDate', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Data Fine
                    </label>
                    <input
                      type="date"
                      value={period.endDate}
                      onChange={(e) => updatePricingPeriod(index, 'endDate', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      1-3 giorni (€)
                    </label>
                    <input
                      type="number"
                      value={period.prices.short}
                      onChange={(e) => updatePricingPeriod(index, 'prices.short', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      4-7 giorni (€)
                    </label>
                    <input
                      type="number"
                      value={period.prices.medium}
                      onChange={(e) => updatePricingPeriod(index, 'prices.medium', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      8+ giorni (€)
                    </label>
                    <input
                      type="number"
                      value={period.prices.long}
                      onChange={(e) => updatePricingPeriod(index, 'prices.long', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="text-sm font-medium text-gray-700">Pubblicato</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="text-sm font-medium text-gray-700">In Evidenza</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.available}
                onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="text-sm font-medium text-gray-700">Disponibile</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Salvataggio...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Salva Veicolo
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annulla
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
