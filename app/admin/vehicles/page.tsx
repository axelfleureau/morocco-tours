"use client"

import { useState, useEffect } from 'react'
import { Search, Plus, Car } from 'lucide-react'
import VehicleModal from '@/components/admin/VehicleModal'
import { useNotifications } from '@/components/NotificationSystem'
import { useAuth } from '@/context/AuthContext'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  UnifiedAdminTable, 
  TableColumn,
  createPublishedColumn, 
  createFeaturedColumn,
  createBooleanBadgeColumn,
  createStandardActions 
} from '@/components/admin/UnifiedAdminTable'

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
  const { user } = useAuth()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [showModal, setShowModal] = useState(false)

  const categories = ['economica', 'suv', 'Premium']

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
      if (!user) return
      const token = await user.getIdToken()
      const response = await fetch(`/api/vehicles/${vehicle.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
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
      if (!user) return
      const token = await user.getIdToken()
      const response = await fetch(`/api/vehicles/${vehicle.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
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
      if (!user) return
      const token = await user.getIdToken()
      const response = await fetch(`/api/vehicles/${vehicle.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
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

  const columns: TableColumn<Vehicle>[] = [
    {
      key: 'name',
      label: 'Vehicle',
      render: (vehicle) => (
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
            <div className="text-sm font-medium">{vehicle.name}</div>
            <div className="text-sm text-muted-foreground">{vehicle.slug}</div>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      render: (vehicle) => (
        <Badge variant="outline" className="capitalize">
          {vehicle.category}
        </Badge>
      )
    },
    {
      key: 'transmission',
      label: 'Details',
      render: (vehicle) => (
        <div className="text-sm">
          <div>{vehicle.transmission} • {vehicle.fuelType}</div>
          <div className="text-muted-foreground">
            {vehicle.seats} seats • {vehicle.doors} doors
          </div>
        </div>
      )
    },
    createPublishedColumn<Vehicle>(),
    createFeaturedColumn<Vehicle>(),
    createBooleanBadgeColumn<Vehicle>('available', 'Available', 'Yes', 'No')
  ]

  const actions = createStandardActions<Vehicle>({
    onEdit: handleEdit,
    onTogglePublished: togglePublished,
    onToggleFeatured: toggleFeatured,
    onDelete: deleteVehicle
  })

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
          <p className="text-muted-foreground mt-1">
            {vehicles.length} veicoli totali
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedVehicle(null)
            setShowModal(true)
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Nuovo Veicolo
        </Button>
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

      <UnifiedAdminTable
        data={filteredVehicles}
        columns={columns}
        actions={actions}
        keyExtractor={(vehicle) => vehicle.id}
        emptyMessage={
          <div className="text-center">
            <Car className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium">Nessun veicolo trovato</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {searchTerm || categoryFilter
                ? 'Prova a modificare i filtri di ricerca'
                : 'Inizia creando un nuovo veicolo'}
            </p>
          </div>
        }
      />

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
