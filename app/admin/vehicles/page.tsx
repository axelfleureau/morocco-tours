"use client"

import { useState, useEffect } from 'react'
import { Search, Edit, Trash2, Plus, Eye, EyeOff, Star, Car } from 'lucide-react'
import VehicleModal from '@/components/admin/VehicleModal'
import { useNotifications } from '@/components/NotificationSystem'

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
  id: string
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

export default function AdminVehiclesPage() {
  const { showSuccess, showError } = useNotifications()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [showModal, setShowModal] = useState(false)

  const categories = ['economica', 'suv', 'Premium']

  const headers = {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN || process.env.ADMIN_TOKEN}`,
    'Content-Type': 'application/json'
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  useEffect(() => {
    let filtered = vehicles

    if (searchTerm) {
      filtered = filtered.filter(vehicle => 
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter) {
      filtered = filtered.filter(vehicle => vehicle.category === categoryFilter)
    }

    setFilteredVehicles(filtered)
  }, [searchTerm, categoryFilter, vehicles])

  const fetchVehicles = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/vehicles', {
        cache: 'no-store'
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch vehicles')
      }

      const data = await response.json()
      setVehicles(data.vehicles || [])
      setFilteredVehicles(data.vehicles || [])
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      showError('Errore', 'Impossibile caricare i veicoli')
    } finally {
      setLoading(false)
    }
  }

  const togglePublished = async (vehicle: Vehicle) => {
    try {
      const response = await fetch(`/api/vehicles/${vehicle.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ published: !vehicle.published })
      })

      if (!response.ok) {
        throw new Error('Failed to update vehicle')
      }

      setVehicles(prev => prev.map(v => 
        v.id === vehicle.id ? { ...v, published: !v.published } : v
      ))
      showSuccess('Aggiornato', `Veicolo ${!vehicle.published ? 'pubblicato' : 'nascosto'}`)
    } catch (error) {
      console.error('Error toggling published:', error)
      showError('Errore', 'Impossibile aggiornare lo stato di pubblicazione')
    }
  }

  const toggleFeatured = async (vehicle: Vehicle) => {
    try {
      const response = await fetch(`/api/vehicles/${vehicle.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ featured: !vehicle.featured })
      })

      if (!response.ok) {
        throw new Error('Failed to update vehicle')
      }

      setVehicles(prev => prev.map(v => 
        v.id === vehicle.id ? { ...v, featured: !v.featured } : v
      ))
      showSuccess('Aggiornato', `Veicolo ${!vehicle.featured ? 'in evidenza' : 'rimosso dall\'evidenza'}`)
    } catch (error) {
      console.error('Error toggling featured:', error)
      showError('Errore', 'Impossibile aggiornare lo stato in evidenza')
    }
  }

  const deleteVehicle = async (vehicle: Vehicle) => {
    if (!confirm(`Sei sicuro di voler eliminare "${vehicle.name}"?`)) return

    try {
      const response = await fetch(`/api/vehicles/${vehicle.id}`, {
        method: 'DELETE',
        headers
      })

      if (!response.ok) {
        throw new Error('Failed to delete vehicle')
      }

      setVehicles(prev => prev.filter(v => v.id !== vehicle.id))
      showSuccess('Eliminato', 'Veicolo eliminato con successo')
    } catch (error) {
      console.error('Error deleting vehicle:', error)
      showError('Errore', 'Impossibile eliminare il veicolo')
    }
  }

  const handleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedVehicle(null)
  }

  const handleSave = () => {
    fetchVehicles()
    handleCloseModal()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento veicoli...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestione Veicoli</h1>
          <p className="text-gray-600 mt-1">
            {vehicles.length} veicoli totali
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedVehicle(null)
            setShowModal(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nuovo Veicolo
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cerca veicoli..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="">Tutte le categorie</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Veicolo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dettagli
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stato
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredVehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {vehicle.image ? (
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={vehicle.image}
                          alt={vehicle.name}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <Car className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {vehicle.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {vehicle.slug}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {vehicle.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vehicle.transmission} • {vehicle.fuelType}
                  <br />
                  {vehicle.seats} posti • {vehicle.doors} porte
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    {vehicle.published ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Pubblicato
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Bozza
                      </span>
                    )}
                    {vehicle.featured && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        In evidenza
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => togglePublished(vehicle)}
                      className="text-blue-600 hover:text-blue-900"
                      title={vehicle.published ? 'Nascondi' : 'Pubblica'}
                    >
                      {vehicle.published ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleFeatured(vehicle)}
                      className={`${
                        vehicle.featured ? 'text-yellow-500' : 'text-gray-400'
                      } hover:text-yellow-600`}
                      title={vehicle.featured ? 'Rimuovi evidenza' : 'Metti in evidenza'}
                    >
                      <Star className="w-5 h-5" fill={vehicle.featured ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => handleEdit(vehicle)}
                      className="text-indigo-600 hover:text-indigo-900"
                      title="Modifica"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteVehicle(vehicle)}
                      className="text-red-600 hover:text-red-900"
                      title="Elimina"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <Car className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nessun veicolo trovato</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || categoryFilter
                ? 'Prova a modificare i filtri di ricerca'
                : 'Inizia creando un nuovo veicolo'}
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <VehicleModal
          vehicle={selectedVehicle}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
