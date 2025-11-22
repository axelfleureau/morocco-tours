"use client"

import { useState, useEffect } from 'react'
import { Search, Edit, Trash2, Plus, DollarSign } from 'lucide-react'
import { useNotifications } from '@/components/NotificationSystem'
import { useAuth } from '@/context/AuthContext'

interface Service {
  id: string
  name: string
  category: string
  price?: number
  published: boolean
  description?: string
}

export default function AdminServicesPage() {
  const { showSuccess, showError } = useNotifications()
  const { user } = useAuth()
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', category: '', price: 0, description: '', published: true })

  const categories = ['transport', 'guide', 'experience', 'accommodation']

  useEffect(() => {
    fetchServices()
  }, [])

  useEffect(() => {
    let filtered = services
    if (searchTerm) {
      filtered = filtered.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    if (categoryFilter) {
      filtered = filtered.filter(s => s.category === categoryFilter)
    }
    setFilteredServices(filtered)
  }, [searchTerm, categoryFilter, services])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/services', { cache: 'no-store' })
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setServices(data.services || [])
      setFilteredServices(data.services || [])
    } catch (error) {
      console.error('Error:', error)
      showError('Errore', 'Nel caricamento servizi')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.name || !formData.category) {
      showError('Errore', 'Riempire i campi obbligatori')
      return
    }
    try {
      if (!user) return
      const token = await user.getIdToken()
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `/api/services/${editingId}` : '/api/services'
      const response = await fetch(url, { 
        method, 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(formData) 
      })
      if (!response.ok) throw new Error('Failed to save')
      showSuccess('Successo', editingId ? 'Servizio aggiornato' : 'Servizio creato')
      setFormData({ name: '', category: '', price: 0, description: '', published: true })
      setEditingId(null)
      fetchServices()
    } catch (error) {
      showError('Errore', 'Nel salvataggio')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Eliminare questo servizio?')) return
    try {
      if (!user) return
      const token = await user.getIdToken()
      const response = await fetch(`/api/services/${id}`, { 
        method: 'DELETE', 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) throw new Error('Failed to delete')
      showSuccess('Successo', 'Servizio eliminato')
      fetchServices()
    } catch (error) {
      showError('Errore', 'Nell\'eliminazione')
    }
  }

  if (loading) return <div className="text-center py-8">Caricamento...</div>

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Servizi ({services.length})</h1>
      </div>

      <div className="bg-white p-6 rounded-lg border">
        <h2 className="font-semibold mb-4">{editingId ? 'Modifica' : 'Nuovo'} Servizio</h2>
        <div className="space-y-4">
          <input type="text" placeholder="Nome" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
            <option value="">Seleziona categoria</option>
            {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
          </select>
          <input type="number" placeholder="Prezzo" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" />
          <textarea placeholder="Descrizione" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-3 py-2 border rounded-lg" />
          <button onClick={handleSave} className="w-full bg-primary text-primary-foreground py-2 rounded-lg">Salva</button>
          {editingId && <button onClick={() => { setEditingId(null); setFormData({ name: '', category: '', price: 0, description: '', published: true }); }} className="w-full bg-gray-200 py-2 rounded-lg">Annulla</button>}
        </div>
      </div>

      <div className="flex gap-4">
        <input type="text" placeholder="Cerca..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg" />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-2 border rounded-lg">
          <option value="">Tutte le categorie</option>
          {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
        </select>
      </div>

      <div className="grid gap-4">
        {filteredServices.map((service) => (
          <div key={service.id} className="border rounded-lg p-4 flex items-center justify-between">
            <div><h3 className="font-semibold">{service.name}</h3><p className="text-sm text-muted-foreground">{service.category}</p></div>
            <div className="flex gap-2">
              <button onClick={() => { setFormData({ name: service.name, category: service.category, price: service.price || 0, description: service.description || '', published: service.published }); setEditingId(service.id); }} className="p-2 hover:bg-gray-100 rounded"><Edit className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(service.id)} className="p-2 hover:bg-red-100 rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
