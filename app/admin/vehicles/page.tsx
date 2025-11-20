"use client"

import { useState, useEffect } from 'react'
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Search, Edit, Trash2, Plus, Eye, EyeOff, Star, Car } from 'lucide-react'
import VehicleModal from '@/components/admin/VehicleModal'

interface Vehicle {
  id: string
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

export default function AdminVehiclesPage() {
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
      const querySnapshot = await getDocs(collection(db, 'vehicles'))
      const vehiclesList: Vehicle[] = []
      
      querySnapshot.forEach((doc) => {
        vehiclesList.push({ id: doc.id, ...doc.data() } as Vehicle)
      })
      
      setVehicles(vehiclesList)
      setFilteredVehicles(vehiclesList)
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    } finally {
      setLoading(false)
    }
  }

  const togglePublished = async (vehicle: Vehicle) => {
    try {
      const vehicleRef = doc(db, 'vehicles', vehicle.id)
      await updateDoc(vehicleRef, { published: !vehicle.published })
      
      setVehicles(prev => prev.map(v => 
        v.id === vehicle.id ? { ...v, published: !v.published } : v
      ))
    } catch (error) {
      console.error('Error toggling published:', error)
    }
  }

  const toggleFeatured = async (vehicle: Vehicle) => {
    try {
      const vehicleRef = doc(db, 'vehicles', vehicle.id)
      await updateDoc(vehicleRef, { featured: !vehicle.featured })
      
      setVehicles(prev => prev.map(v => 
        v.id === vehicle.id ? { ...v, featured: !v.featured } : v
      ))
    } catch (error) {
      console.error('Error toggling featured:', error)
    }
  }

  const deleteVehicle = async (vehicle: Vehicle) => {
    if (!confirm(`Sei sicuro di voler eliminare "${vehicle.name}"?`)) return

    try {
      await deleteDoc(doc(db, 'vehicles', vehicle.id))
      setVehicles(prev => prev.filter(v => v.id !== vehicle.id))
    } catch (error) {
      console.error('Error deleting vehicle:', error)
      alert('Errore durante l\'eliminazione')
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

  const handleSaveSuccess = () => {
    fetchVehicles()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Caricamento veicoli...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestione Veicoli</h1>
          <p className="text-muted-foreground mt-1">
            {vehicles.length} veicoli totali, {vehicles.filter(v => v.published).length} pubblicati
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedVehicle(null)
            setShowModal(true)
          }}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Nuovo Veicolo
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cerca per nome o categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Tutte le categorie</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Veicolo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Categoria</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Trasmissione</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Prezzo Min</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Stato</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredVehicles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    Nessun veicolo trovato
                  </td>
                </tr>
              ) : (
                filteredVehicles.map((vehicle) => {
                  const minPrice = Math.min(
                    vehicle.pricing.period1.long,
                    vehicle.pricing.period2.long,
                    vehicle.pricing.period3.long,
                    vehicle.pricing.period4.long
                  )
                  
                  return (
                    <tr key={vehicle.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                            {vehicle.image ? (
                              <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
                            ) : (
                              <Car className="w-6 h-6 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{vehicle.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {vehicle.seats} posti • {vehicle.fuel}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                          {vehicle.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-foreground capitalize">{vehicle.transmission}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-foreground">€{minPrice}/giorno</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          {vehicle.published ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                              Pubblicato
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">
                              Bozza
                            </span>
                          )}
                          {vehicle.featured && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                              ⭐ In evidenza
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => togglePublished(vehicle)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title={vehicle.published ? 'Nascondi' : 'Pubblica'}
                          >
                            {vehicle.published ? (
                              <EyeOff className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <Eye className="w-4 h-4 text-muted-foreground" />
                            )}
                          </button>
                          <button
                            onClick={() => toggleFeatured(vehicle)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title={vehicle.featured ? 'Rimuovi da evidenza' : 'Metti in evidenza'}
                          >
                            <Star className={`w-4 h-4 ${vehicle.featured ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
                          </button>
                          <button
                            onClick={() => handleEdit(vehicle)}
                            className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                            title="Modifica"
                          >
                            <Edit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </button>
                          <button
                            onClick={() => deleteVehicle(vehicle)}
                            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                            title="Elimina"
                          >
                            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <VehicleModal
          vehicle={selectedVehicle}
          onClose={handleCloseModal}
          onSave={handleSaveSuccess}
        />
      )}
    </div>
  )
}
