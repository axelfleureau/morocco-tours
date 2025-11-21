"use client"

import { useState, useEffect } from 'react'
import { Search, Edit, Trash2, Plus, Eye, EyeOff } from 'lucide-react'
import ExperienceModal from '@/components/admin/ExperienceModal'
import { useNotifications } from '@/components/NotificationSystem'

interface Experience {
  id: string
  title: string
  category: string
  price?: number
  published: boolean
  featured: boolean
  image?: string
  description?: string
  slug: string
}

export default function AdminExperiencesPage() {
  const { showSuccess, showError } = useNotifications()
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [showModal, setShowModal] = useState(false)

  const categories = ['adventure', 'wellness', 'culture', 'food', 'sports']

  const headers = {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN || process.env.ADMIN_TOKEN}`,
    'Content-Type': 'application/json'
  }

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
      const response = await fetch('/api/experiences', { cache: 'no-store' })
      
      if (!response.ok) throw new Error('Failed to fetch')

      const data = await response.json()
      setExperiences(data.experiences || [])
      setFilteredExperiences(data.experiences || [])
    } catch (error) {
      console.error('Error:', error)
      showError('Errore nel caricamento esperienze')
    } finally {
      setLoading(false)
    }
  }

  const togglePublished = async (exp: Experience) => {
    try {
      const response = await fetch(`/api/experiences/${exp.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ published: !exp.published })
      })

      if (!response.ok) throw new Error('Failed to update')

      showSuccess(exp.published ? 'Nascosta' : 'Pubblicata')
      fetchExperiences()
    } catch (error) {
      showError('Errore nell\'aggiornamento')
    }
  }

  const toggleFeatured = async (exp: Experience) => {
    try {
      const response = await fetch(`/api/experiences/${exp.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ featured: !exp.featured })
      })

      if (!response.ok) throw new Error('Failed to update')

      showSuccess(exp.featured ? 'Rimosso da in evidenza' : 'Aggiunto a in evidenza')
      fetchExperiences()
    } catch (error) {
      showError('Errore nell\'aggiornamento')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Eliminare questa esperienza?')) return

    try {
      const response = await fetch(`/api/experiences/${id}`, {
        method: 'DELETE',
        headers
      })

      if (!response.ok) throw new Error('Failed to delete')

      showSuccess('Esperienza eliminata')
      fetchExperiences()
    } catch (error) {
      showError('Errore nell\'eliminazione')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Caricamento...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Esperienze</h1>
        <button 
          onClick={() => { setSelectedExperience(null); setShowModal(true) }}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nuova
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Cerca..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">Tutte le categorie</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4">
        {filteredExperiences.map((exp) => (
          <div key={exp.id} className="border rounded-lg p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{exp.title}</h3>
              <p className="text-sm text-muted-foreground">{exp.category}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => togglePublished(exp)}
                className="p-2 hover:bg-gray-100 rounded"
                title={exp.published ? 'Nascondi' : 'Pubblica'}
              >
                {exp.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => { setSelectedExperience(exp); setShowModal(true) }}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="p-2 hover:bg-red-100 rounded text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <ExperienceModal
          experience={selectedExperience}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false)
            fetchExperiences()
          }}
          onSaveSuccess={() => {
            setShowModal(false)
            fetchExperiences()
          }}
        />
      )}
    </div>
  )
}
