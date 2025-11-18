"use client"

import { useState, useEffect } from 'react'
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Search, Edit, Trash2, Plus, Eye, EyeOff, Star, DollarSign, Clock, Award } from 'lucide-react'
import TravelModal from '@/components/admin/TravelModal'

interface Travel {
  id: string
  title: string
  category: string
  duration: string
  price: number
  rating: number
  published: boolean
  featured: boolean
  image?: string
  description?: string
}

export default function AdminTravelsPage() {
  const [travels, setTravels] = useState<Travel[]>([])
  const [filteredTravels, setFilteredTravels] = useState<Travel[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [selectedTravel, setSelectedTravel] = useState<Travel | null>(null)
  const [showModal, setShowModal] = useState(false)

  const categories = ['desert', 'city', 'coast', 'mountain', 'group']

  useEffect(() => {
    fetchTravels()
  }, [])

  useEffect(() => {
    let filtered = travels

    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter) {
      filtered = filtered.filter(t => t.category === categoryFilter)
    }

    setFilteredTravels(filtered)
  }, [searchTerm, categoryFilter, travels])

  const fetchTravels = async () => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'travels'))
      const trvs: Travel[] = []
      
      querySnapshot.forEach((doc) => {
        trvs.push({ id: doc.id, ...doc.data() } as Travel)
      })
      
      setTravels(trvs)
      setFilteredTravels(trvs)
    } catch (error) {
      console.error('Error fetching travels:', error)
    } finally {
      setLoading(false)
    }
  }

  const togglePublished = async (travel: Travel) => {
    try {
      const travelRef = doc(db, 'travels', travel.id)
      await updateDoc(travelRef, { published: !travel.published })
      
      setTravels(prev => prev.map(t => 
        t.id === travel.id ? { ...t, published: !t.published } : t
      ))
    } catch (error) {
      console.error('Error toggling published:', error)
    }
  }

  const toggleFeatured = async (travel: Travel) => {
    try {
      const travelRef = doc(db, 'travels', travel.id)
      await updateDoc(travelRef, { featured: !travel.featured })
      
      setTravels(prev => prev.map(t => 
        t.id === travel.id ? { ...t, featured: !t.featured } : t
      ))
    } catch (error) {
      console.error('Error toggling featured:', error)
    }
  }

  const deleteTravel = async (travel: Travel) => {
    if (!confirm(`Sei sicuro di voler eliminare "${travel.title}"?`)) return

    try {
      await deleteDoc(doc(db, 'travels', travel.id))
      setTravels(prev => prev.filter(t => t.id !== travel.id))
    } catch (error) {
      console.error('Error deleting travel:', error)
      alert('Errore durante l\'eliminazione')
    }
  }

  const handleEdit = (travel: Travel) => {
    setSelectedTravel(travel)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedTravel(null)
  }

  const handleSaveSuccess = () => {
    fetchTravels()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Caricamento viaggi...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestione Viaggi</h1>
          <p className="text-muted-foreground mt-1">
            {travels.length} viaggi totali, {travels.filter(t => t.published).length} pubblicati, {travels.filter(t => t.featured).length} in evidenza
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedTravel(null)
            setShowModal(true)
          }}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Nuovo Viaggio
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cerca per titolo o categoria..."
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

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Viaggio</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Categoria</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Durata</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Prezzo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rating</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Stato</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTravels.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                    Nessun viaggio trovato
                  </td>
                </tr>
              ) : (
                filteredTravels.map((travel) => (
                  <tr key={travel.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {travel.image && (
                          <img
                            src={travel.image}
                            alt={travel.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground">{travel.title}</p>
                            {travel.featured && (
                              <Award className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            )}
                          </div>
                          {travel.description && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {travel.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded text-sm">
                        {travel.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-foreground">
                        <Clock className="w-4 h-4" />
                        {travel.duration}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-foreground font-medium">
                        <DollarSign className="w-4 h-4" />
                        {travel.price}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-foreground">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {travel.rating || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => togglePublished(travel)}
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            travel.published
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {travel.published ? (
                            <>
                              <Eye className="w-3 h-3" />
                              Pubblicato
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3" />
                              Bozza
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => toggleFeatured(travel)}
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            travel.featured
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          <Award className={`w-3 h-3 ${travel.featured ? 'fill-current' : ''}`} />
                          {travel.featured ? 'Featured' : 'Standard'}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(travel)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors text-blue-600"
                          title="Modifica"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteTravel(travel)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors text-red-600"
                          title="Elimina"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {showModal && (
        <TravelModal
          travel={selectedTravel}
          onClose={handleCloseModal}
          onSave={handleSaveSuccess}
        />
      )}
    </div>
  )
}
