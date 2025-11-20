"use client"

import { useState, useEffect } from 'react'
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Search, Edit, Trash2, Plus, Star } from 'lucide-react'
import CityModal from '@/components/admin/CityModal'

interface City {
  id: string
  name: string
  title: string
  category: string
  image: string
  rating: number
  reviews: number
  description: string
}

export default function AdminCitiesPage() {
  const [cities, setCities] = useState<City[]>([])
  const [filteredCities, setFilteredCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [showModal, setShowModal] = useState(false)

  const categories = ['imperial', 'coastal', 'desert', 'mountain']

  useEffect(() => {
    fetchCities()
  }, [])

  useEffect(() => {
    let filtered = cities

    if (searchTerm) {
      filtered = filtered.filter(city => 
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter) {
      filtered = filtered.filter(city => city.category === categoryFilter)
    }

    setFilteredCities(filtered)
  }, [searchTerm, categoryFilter, cities])

  const fetchCities = async () => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'cities'))
      const citiesData: City[] = []
      
      querySnapshot.forEach((doc) => {
        citiesData.push({ id: doc.id, ...doc.data() } as City)
      })
      
      setCities(citiesData)
      setFilteredCities(citiesData)
    } catch (error) {
      console.error('Error fetching cities:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCity = async (city: City) => {
    if (!confirm(`Sei sicuro di voler eliminare "${city.name}"?`)) return

    try {
      await deleteDoc(doc(db, 'cities', city.id))
      setCities(prev => prev.filter(c => c.id !== city.id))
    } catch (error) {
      console.error('Error deleting city:', error)
      alert('Errore durante l\'eliminazione')
    }
  }

  const handleEdit = (city: City) => {
    setSelectedCity(city)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedCity(null)
  }

  const handleSaveSuccess = () => {
    fetchCities()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Caricamento città...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestione Città</h1>
          <p className="text-muted-foreground mt-1">
            {cities.length} città totali
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedCity(null)
            setShowModal(true)
          }}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Nuova Città
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cerca per nome o titolo..."
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Città</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Categoria</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rating</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Recensioni</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCities.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    Nessuna città trovata
                  </td>
                </tr>
              ) : (
                filteredCities.map((city) => (
                  <tr key={city.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {city.image && (
                          <img
                            src={city.image}
                            alt={city.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium text-foreground">{city.name}</p>
                          <p className="text-sm text-muted-foreground">{city.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded text-sm capitalize">
                        {city.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-foreground">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{city.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-muted-foreground">{city.reviews} recensioni</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(city)}
                          className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors group"
                          title="Modifica"
                        >
                          <Edit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </button>
                        <button
                          onClick={() => deleteCity(city)}
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

      <CityModal
        city={selectedCity}
        isOpen={showModal}
        onClose={handleCloseModal}
        onSaveSuccess={handleSaveSuccess}
      />
    </div>
  )
}
