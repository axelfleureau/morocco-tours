"use client"

import { useState, useEffect } from 'react'
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Search, Edit, Trash2, Plus, Eye, EyeOff, Star, DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'

interface Experience {
  id: string
  title: string
  category: string
  price: number
  rating: number
  published: boolean
  image?: string
  description?: string
}

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [showModal, setShowModal] = useState(false)

  const categories = ['surf', 'cucina', 'trekking', 'quad-cammelli', 'artigianato']

  useEffect(() => {
    fetchExperiences()
  }, [])

  useEffect(() => {
    let filtered = experiences

    if (searchTerm) {
      filtered = filtered.filter(exp => 
        exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter) {
      filtered = filtered.filter(exp => exp.category === categoryFilter)
    }

    setFilteredExperiences(filtered)
  }, [searchTerm, categoryFilter, experiences])

  const fetchExperiences = async () => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'experiences'))
      const exps: Experience[] = []
      
      querySnapshot.forEach((doc) => {
        exps.push({ id: doc.id, ...doc.data() } as Experience)
      })
      
      setExperiences(exps)
      setFilteredExperiences(exps)
    } catch (error) {
      console.error('Error fetching experiences:', error)
    } finally {
      setLoading(false)
    }
  }

  const togglePublished = async (exp: Experience) => {
    try {
      const expRef = doc(db, 'experiences', exp.id)
      await updateDoc(expRef, { published: !exp.published })
      
      setExperiences(prev => prev.map(e => 
        e.id === exp.id ? { ...e, published: !e.published } : e
      ))
    } catch (error) {
      console.error('Error toggling published:', error)
    }
  }

  const deleteExperience = async (exp: Experience) => {
    if (!confirm(`Sei sicuro di voler eliminare "${exp.title}"?`)) return

    try {
      await deleteDoc(doc(db, 'experiences', exp.id))
      setExperiences(prev => prev.filter(e => e.id !== exp.id))
    } catch (error) {
      console.error('Error deleting experience:', error)
      alert('Errore durante l\'eliminazione')
    }
  }

  const handleEdit = (exp: Experience) => {
    setSelectedExperience(exp)
    setShowModal(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Caricamento esperienze...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestione Esperienze</h1>
          <p className="text-muted-foreground mt-1">
            {experiences.length} esperienze totali, {experiences.filter(e => e.published).length} pubblicate
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedExperience(null)
            setShowModal(true)
          }}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Nuova Esperienza
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Esperienza</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Categoria</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Prezzo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rating</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Stato</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredExperiences.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    Nessuna esperienza trovata
                  </td>
                </tr>
              ) : (
                filteredExperiences.map((exp) => (
                  <tr key={exp.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {exp.image && (
                          <img
                            src={exp.image}
                            alt={exp.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium text-foreground">{exp.title}</p>
                          {exp.description && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded text-sm">
                        {exp.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-foreground font-medium">
                        <DollarSign className="w-4 h-4" />
                        {exp.price}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-foreground">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {exp.rating || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => togglePublished(exp)}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          exp.published
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {exp.published ? (
                          <>
                            <Eye className="w-4 h-4" />
                            Pubblicata
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-4 h-4" />
                            Bozza
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(exp)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors text-blue-600"
                          title="Modifica"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteExperience(exp)}
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
    </div>
  )
}
