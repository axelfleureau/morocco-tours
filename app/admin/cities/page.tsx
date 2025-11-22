"use client"

import { useState, useEffect } from 'react'
import { Search, Edit, Trash2, Plus } from 'lucide-react'
import { useNotifications } from '@/components/NotificationSystem'
import { useAuth } from '@/context/AuthContext'

interface City {
  id: string
  name: string
  type: string
  published: boolean
  description?: string
}

export default function AdminCitiesPage() {
  const { showSuccess, showError } = useNotifications()
  const { user } = useAuth()
  const [cities, setCities] = useState<City[]>([])
  const [filteredCities, setFilteredCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', type: 'imperial', published: true })

  const categories = ['imperial', 'coastal', 'desert', 'mountain']

  useEffect(() => {
    fetchCities()
  }, [])

  useEffect(() => {
    let filtered = cities
    if (searchTerm) {
      filtered = filtered.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    if (categoryFilter) {
      filtered = filtered.filter(c => c.type === categoryFilter)
    }
    setFilteredCities(filtered)
  }, [searchTerm, categoryFilter, cities])

  const fetchCities = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/cities', { cache: 'no-store' })
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setCities(data.cities || [])
      setFilteredCities(data.cities || [])
    } catch (error) {
      console.error('Error:', error)
      showError('Errore', 'Nel caricamento città')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.name || !formData.type) {
      showError('Errore', 'Riempire i campi obbligatori')
      return
    }
    try {
      if (!user) return
      const token = await user.getIdToken()
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `/api/cities/${editingId}` : '/api/cities'
      const response = await fetch(url, { 
        method, 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(formData) 
      })
      if (!response.ok) throw new Error('Failed to save')
      showSuccess('Successo', editingId ? 'Città aggiornata' : 'Città creata')
      setFormData({ name: '', type: 'imperial', published: true })
      setEditingId(null)
      fetchCities()
    } catch (error) {
      showError('Errore', 'Nel salvataggio')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Eliminare questa città?')) return
    try {
      if (!user) return
      const token = await user.getIdToken()
      const response = await fetch(`/api/cities/${id}`, { 
        method: 'DELETE', 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) throw new Error('Failed to delete')
      showSuccess('Successo', 'Città eliminata')
      fetchCities()
    } catch (error) {
      showError('Errore', 'nell\'eliminazione')
    }
  }

  if (loading) return <div className="text-center py-8">Caricamento...</div>

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Città ({cities.length})</h1>
      <div className="flex gap-4">
        <input type="text" placeholder="Cerca..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg" />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-2 border rounded-lg">
          <option value="">Tutte le categorie</option>
          {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
        </select>
      </div>
      <div className="grid gap-4">
        {filteredCities.map((city) => (
          <div key={city.id} className="border rounded-lg p-4 flex items-center justify-between">
            <div><h3 className="font-semibold">{city.name}</h3><p className="text-sm text-muted-foreground">{city.type}</p></div>
            <div className="flex gap-2">
              <button onClick={() => { setFormData(city); setEditingId(city.id); }} className="p-2 hover:bg-gray-100 rounded"><Edit className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(city.id)} className="p-2 hover:bg-red-100 rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
