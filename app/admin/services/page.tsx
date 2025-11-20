"use client"

import { useState, useEffect } from 'react'
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Search, Edit, Trash2, Plus, DollarSign } from 'lucide-react'
import ServiceModalNew from '@/components/admin/ServiceModalNew'

interface Service {
  id: string
  name: string
  category: string
  type: string
  price: number
  priceType: string
  locations: string[]
  description: string
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showModal, setShowModal] = useState(false)

  const categories = ['transport', 'guide', 'experience', 'accommodation']

  useEffect(() => {
    fetchServices()
  }, [])

  useEffect(() => {
    let filtered = services

    if (searchTerm) {
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter) {
      filtered = filtered.filter(service => service.category === categoryFilter)
    }

    setFilteredServices(filtered)
  }, [searchTerm, categoryFilter, services])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'services'))
      const servicesData: Service[] = []
      
      querySnapshot.forEach((doc) => {
        servicesData.push({ id: doc.id, ...doc.data() } as Service)
      })
      
      setServices(servicesData)
      setFilteredServices(servicesData)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteService = async (service: Service) => {
    if (!confirm(`Sei sicuro di voler eliminare "${service.name}"?`)) return

    try {
      await deleteDoc(doc(db, 'services', service.id))
      setServices(prev => prev.filter(s => s.id !== service.id))
    } catch (error) {
      console.error('Error deleting service:', error)
      alert('Errore durante l\'eliminazione')
    }
  }

  const handleEdit = (service: Service) => {
    setSelectedService(service)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedService(null)
  }

  const handleSaveSuccess = () => {
    fetchServices()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Caricamento servizi...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestione Servizi</h1>
          <p className="text-muted-foreground mt-1">
            {services.length} servizi totali
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedService(null)
            setShowModal(true)
          }}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Nuovo Servizio
        </button>
      </div>

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
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Servizio</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Categoria</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Tipo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Prezzo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Località</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    Nessun servizio trovato
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">{service.name}</p>
                      {service.description && (
                        <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                          {service.description}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded text-sm capitalize">
                        {service.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-muted-foreground capitalize">{service.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-foreground font-medium">
                        <DollarSign className="w-4 h-4" />
                        {service.price}
                        <span className="text-xs text-muted-foreground ml-1">/ {service.priceType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {service.locations.slice(0, 2).map((loc, idx) => (
                          <span key={idx} className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                            {loc}
                          </span>
                        ))}
                        {service.locations.length > 2 && (
                          <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                            +{service.locations.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors group"
                          title="Modifica"
                        >
                          <Edit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </button>
                        <button
                          onClick={() => deleteService(service)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors group"
                          title="Elimina"
                        >
                          <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ServiceModalNew
        service={selectedService}
        isOpen={showModal}
        onClose={handleCloseModal}
        onSaveSuccess={handleSaveSuccess}
      />
    </div>
  )
}
