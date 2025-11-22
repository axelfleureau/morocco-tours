"use client"

import { useState, useEffect } from 'react'
import { Search, Edit, Trash2, Plus, Eye, EyeOff } from 'lucide-react'
import { useNotifications } from '@/components/NotificationSystem'
import { useAuth } from '@/context/AuthContext'

interface Travel {
  id: string
  title: string
  category: string
  duration?: string
  price?: number
  published: boolean
  featured: boolean
  description?: string
}

export default function AdminTravelsPage() {
  const { showSuccess, showError } = useNotifications()
  const { user } = useAuth()
  const [travels, setTravels] = useState<Travel[]>([])
  const [filteredTravels, setFilteredTravels] = useState<Travel[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: '', category: '', price: 0, published: true, featured: false })

  const categories = ['desert', 'city', 'coast', 'mountain', 'group']

  useEffect(() => {
    fetchTravels()
  }, [])

  useEffect(() => {
    let filtered = travels
    if (searchTerm) {
      filtered = filtered.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    if (categoryFilter) {
      filtered = filtered.filter(t => t.category === categoryFilter)
    }
    setFilteredTravels(filtered)
  }, [searchTerm, categoryFilter, travels])

  const fetchTravels = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/travels', { cache: 'no-store' })
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setTravels(data.travels || [])
      setFilteredTravels(data.travels || [])
    } catch (error) {
      console.error('Error:', error)
      showError('Errore', 'Nel caricamento viaggi')
    } finally {
      setLoading(false)
    }
  }

  const togglePublished = async (travel: Travel) => {
    try {
      if (!user) return
      const token = await user.getIdToken()
      const response = await fetch(`/api/travels/${travel.id}`, { 
        method: 'PUT', 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ published: !travel.published }) 
      })
      if (!response.ok) throw new Error('Failed to update')
      showSuccess('Successo', travel.published ? 'Nascosto' : 'Pubblicato')
      fetchTravels()
    } catch (error) {
      showError('Errore', 'nell\'aggiornamento')
    }
  }

  const toggleFeatured = async (travel: Travel) => {
    try {
      if (!user) return
      const token = await user.getIdToken()
      const response = await fetch(`/api/travels/${travel.id}`, { 
        method: 'PUT', 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ featured: !travel.featured }) 
      })
      if (!response.ok) throw new Error('Failed to update')
      showSuccess('Successo', travel.featured ? 'Rimosso da in evidenza' : 'Aggiunto a in evidenza')
      fetchTravels()
    } catch (error) {
      showError('Errore', 'nell\'aggiornamento')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Eliminare questo viaggio?')) return
    try {
      if (!user) return
      const token = await user.getIdToken()
      const response = await fetch(`/api/travels/${id}`, { 
        method: 'DELETE', 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) throw new Error('Failed to delete')
      showSuccess('Successo', 'Viaggio eliminato')
      fetchTravels()
    } catch (error) {
      showError('Errore', 'nell\'eliminazione')
    }
  }

  if (loading) return <div className="text-center py-8">Caricamento...</div>

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Viaggi ({travels.length})</h1>
      <div className="flex gap-4">
        <input type="text" placeholder="Cerca..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg" />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-2 border rounded-lg">
          <option value="">Tutte le categorie</option>
          {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
        </select>
      </div>
      <div className="grid gap-4">
        {filteredTravels.map((travel) => (
          <div key={travel.id} className="border rounded-lg p-4 flex items-center justify-between">
            <div><h3 className="font-semibold">{travel.title}</h3><p className="text-sm text-muted-foreground">{travel.category}</p></div>
            <div className="flex gap-2">
              <button onClick={() => togglePublished(travel)} className="p-2 hover:bg-gray-100 rounded">{travel.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</button>
              <button onClick={() => handleDelete(travel.id)} className="p-2 hover:bg-red-100 rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
