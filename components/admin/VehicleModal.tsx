"use client"

import { useState, useEffect } from 'react'
import { X, Save, Loader2 } from 'lucide-react'
import { doc, setDoc, addDoc, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useNotifications } from '../NotificationSystem'
import { validateUrl } from '@/lib/url-validation'

interface Vehicle {
  id?: string
  name: string
  category: "economica" | "suv" | "Premium"
  transmission: "manuale" | "automatica"
  fuel: "benzina" | "diesel"
  hasAC: boolean
  doors: number
  seats: number
  dailyDeductible: number
  image: string
  pricing: {
    period1: { short: number; medium: number; long: number }
    period2: { short: number; medium: number; long: number }
    period3: { short: number; medium: number; long: number }
    period4: { short: number; medium: number; long: number }
  }
  published: boolean
  featured: boolean
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
    category: 'economica',
    transmission: 'manuale',
    fuel: 'benzina',
    hasAC: true,
    doors: 5,
    seats: 5,
    dailyDeductible: 6,
    image: '',
    pricing: {
      period1: { short: 40, medium: 38, long: 35 },
      period2: { short: 45, medium: 43, long: 40 },
      period3: { short: 42, medium: 40, long: 37 },
      period4: { short: 40, medium: 37, long: 34 }
    },
    published: false,
    featured: false
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [urlError, setUrlError] = useState('')

  useEffect(() => {
    if (vehicle) {
      setFormData(vehicle)
    }
  }, [vehicle])

  const handleUrlChange = (url: string) => {
    setFormData({ ...formData, image: url })
    if (url && url.trim()) {
      const validation = validateUrl(url, false)
      setUrlError(validation.valid ? '' : validation.error || '')
    } else {
      setUrlError('')
    }
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
        ...formData,
        updatedAt: new Date().toISOString()
      }

      if (vehicle?.id) {
        await setDoc(doc(db, 'vehicles', vehicle.id), dataToSave, { merge: true })
      } else {
        await addDoc(collection(db, 'vehicles'), {
          ...dataToSave,
          createdAt: new Date().toISOString()
        })
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

  const updatePricing = (period: 'period1' | 'period2' | 'period3' | 'period4', duration: 'short' | 'medium' | 'long', value: number) => {
    setFormData({
      ...formData,
      pricing: {
        ...formData.pricing,
        [period]: {
          ...formData.pricing[period],
          [duration]: value
        }
      }
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-card border border-border rounded-xl max-w-4xl w-full my-8">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-2xl font-bold text-foreground">
            {vehicle ? 'Modifica Veicolo' : 'Nuovo Veicolo'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          {/* Info Base */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Informazioni Base</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome Veicolo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="es. Dacia Sandero"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Categoria *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="economica">Economica</option>
                  <option value="suv">SUV</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Trasmissione *
                </label>
                <select
                  value={formData.transmission}
                  onChange={(e) => setFormData({ ...formData, transmission: e.target.value as any })}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="manuale">Manuale</option>
                  <option value="automatica">Automatica</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Carburante *
                </label>
                <select
                  value={formData.fuel}
                  onChange={(e) => setFormData({ ...formData, fuel: e.target.value as any })}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="benzina">Benzina</option>
                  <option value="diesel">Diesel</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="hasAC"
                  checked={formData.hasAC}
                  onChange={(e) => setFormData({ ...formData, hasAC: e.target.checked })}
                  className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-500"
                />
                <label htmlFor="hasAC" className="text-sm font-medium text-foreground">
                  Aria Condizionata
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Posti *
                </label>
                <input
                  type="number"
                  value={formData.seats}
                  onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                  required
                  min="2"
                  max="9"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Porte *
                </label>
                <input
                  type="number"
                  value={formData.doors}
                  onChange={(e) => setFormData({ ...formData, doors: parseInt(e.target.value) })}
                  required
                  min="2"
                  max="5"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Franchigia Giornaliera (€)
                </label>
                <input
                  type="number"
                  value={formData.dailyDeductible}
                  onChange={(e) => setFormData({ ...formData, dailyDeductible: parseInt(e.target.value) })}
                  min="0"
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
                placeholder="/images/vehicles/nome-veicolo.png"
                className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                  urlError ? 'border-red-500 dark:border-red-400' : 'border-border'
                }`}
              />
              {urlError && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {urlError}
                </p>
              )}
              {formData.image && !urlError && (
                <div className="mt-2">
                  <img src={formData.image} alt="Preview" className="h-24 rounded-lg object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Prezzi */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Prezzi Stagionali</h3>
            <p className="text-sm text-muted-foreground">
              Imposta i prezzi per giornata in base alla stagione e alla durata del noleggio
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Period 1 */}
              <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-foreground">Periodo 1 (Bassa Stagione)</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">1-6 gg</label>
                    <input
                      type="number"
                      value={formData.pricing.period1.short}
                      onChange={(e) => updatePricing('period1', 'short', parseInt(e.target.value))}
                      min="0"
                      className="w-full px-2 py-1.5 text-sm border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">7-20 gg</label>
                    <input
                      type="number"
                      value={formData.pricing.period1.medium}
                      onChange={(e) => updatePricing('period1', 'medium', parseInt(e.target.value))}
                      min="0"
                      className="w-full px-2 py-1.5 text-sm border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">21+ gg</label>
                    <input
                      type="number"
                      value={formData.pricing.period1.long}
                      onChange={(e) => updatePricing('period1', 'long', parseInt(e.target.value))}
                      min="0"
                      className="w-full px-2 py-1.5 text-sm border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Period 2 */}
              <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-foreground">Periodo 2 (Media Stagione)</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">1-6 gg</label>
                    <input
                      type="number"
                      value={formData.pricing.period2.short}
                      onChange={(e) => updatePricing('period2', 'short', parseInt(e.target.value))}
                      min="0"
                      className="w-full px-2 py-1.5 text-sm border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">7-20 gg</label>
                    <input
                      type="number"
                      value={formData.pricing.period2.medium}
                      onChange={(e) => updatePricing('period2', 'medium', parseInt(e.target.value))}
                      min="0"
                      className="w-full px-2 py-1.5 text-sm border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">21+ gg</label>
                    <input
                      type="number"
                      value={formData.pricing.period2.long}
                      onChange={(e) => updatePricing('period2', 'long', parseInt(e.target.value))}
                      min="0"
                      className="w-full px-2 py-1.5 text-sm border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Period 3 */}
              <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-foreground">Periodo 3 (Alta Stagione)</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">1-6 gg</label>
                    <input
                      type="number"
                      value={formData.pricing.period3.short}
                      onChange={(e) => updatePricing('period3', 'short', parseInt(e.target.value))}
                      min="0"
                      className="w-full px-2 py-1.5 text-sm border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">7-20 gg</label>
                    <input
                      type="number"
                      value={formData.pricing.period3.medium}
                      onChange={(e) => updatePricing('period3', 'medium', parseInt(e.target.value))}
                      min="0"
                      className="w-full px-2 py-1.5 text-sm border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">21+ gg</label>
                    <input
                      type="number"
                      value={formData.pricing.period3.long}
                      onChange={(e) => updatePricing('period3', 'long', parseInt(e.target.value))}
                      min="0"
                      className="w-full px-2 py-1.5 text-sm border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Period 4 */}
              <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-foreground">Periodo 4 (Estiva)</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">1-6 gg</label>
                    <input
                      type="number"
                      value={formData.pricing.period4.short}
                      onChange={(e) => updatePricing('period4', 'short', parseInt(e.target.value))}
                      min="0"
                      className="w-full px-2 py-1.5 text-sm border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">7-20 gg</label>
                    <input
                      type="number"
                      value={formData.pricing.period4.medium}
                      onChange={(e) => updatePricing('period4', 'medium', parseInt(e.target.value))}
                      min="0"
                      className="w-full px-2 py-1.5 text-sm border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">21+ gg</label>
                    <input
                      type="number"
                      value={formData.pricing.period4.long}
                      onChange={(e) => updatePricing('period4', 'long', parseInt(e.target.value))}
                      min="0"
                      className="w-full px-2 py-1.5 text-sm border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pubblicazione */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Stato Pubblicazione</h3>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-500"
                />
                <label htmlFor="published" className="text-sm font-medium text-foreground">
                  Pubblica sul sito
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
                  In evidenza (homepage)
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
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
                  Salva Veicolo
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
