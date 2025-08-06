"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, MapPin, Eye, EyeOff } from 'lucide-react'
import { getCities, addCity, updateCity, deleteCity } from '@/lib/firebase-operations'
import { toast } from 'react-hot-toast'

interface City {
  id: string
  name: string
  description: string
  lat: number
  lng: number
  attractions: string[]
  bestTime: string
  images: string[]
  visible: boolean
  createdAt: Date
  updatedAt: Date
}

export const CityManager = () => {
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCity, setEditingCity] = useState<City | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    lat: '',
    lng: '',
    attractions: '',
    bestTime: '',
    visible: true
  })

  useEffect(() => {
    loadCities()
  }, [])

  const loadCities = async () => {
    try {
      setLoading(true)
      const citiesData = await getCities()
      setCities(citiesData)
    } catch (error) {
      toast.error('Errore nel caricamento delle città')
      console.error('Error loading cities:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const cityData = {
        name: formData.name,
        description: formData.description,
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
        attractions: formData.attractions.split(',').map(a => a.trim()),
        bestTime: formData.bestTime,
        images: [],
        visible: formData.visible,
        createdAt: editingCity ? editingCity.createdAt : new Date(),
        updatedAt: new Date()
      }

      if (editingCity) {
        await updateCity(editingCity.id, cityData)
        toast.success('Città aggiornata con successo!')
      } else {
        await addCity(cityData)
        toast.success('Città aggiunta con successo!')
      }

      await loadCities()
      handleCloseModal()
    } catch (error) {
      toast.error('Errore nel salvataggio della città')
      console.error('Error saving city:', error)
    }
  }

  const handleEdit = (city: City) => {
    setEditingCity(city)
    setFormData({
      name: city.name,
      description: city.description,
      lat: city.lat.toString(),
      lng: city.lng.toString(),
      attractions: city.attractions.join(', '),
      bestTime: city.bestTime,
      visible: city.visible
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (cityId: string) => {
    if (!confirm('Sei sicuro di voler eliminare questa città?')) return
    
    try {
      await deleteCity(cityId)
      toast.success('Città eliminata con successo!')
      await loadCities()
    } catch (error) {
      toast.error('Errore nell\'eliminazione della città')
      console.error('Error deleting city:', error)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingCity(null)
    setFormData({
      name: '',
      description: '',
      lat: '',
      lng: '',
      attractions: '',
      bestTime: '',
      visible: true
    })
  }

  const toggleVisibility = async (city: City) => {
    try {
      await updateCity(city.id, { ...city, visible: !city.visible, updatedAt: new Date() })
      toast.success(`Città ${!city.visible ? 'mostrata' : 'nascosta'}`)
      await loadCities()
    } catch (error) {
      toast.error('Errore nell\'aggiornamento della visibilità')
      console.error('Error updating visibility:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Gestione Città</h2>
          <p className="text-gray-600">Gestisci le città del Marocco nel tuo catalogo</p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Aggiungi Città
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCity ? 'Modifica Città' : 'Aggiungi Nuova Città'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome Città</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Es. Marrakech"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Periodo Migliore</label>
                  <Input
                    value={formData.bestTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, bestTime: e.target.value }))}
                    placeholder="Es. Aprile - Ottobre"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descrizione</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrizione dettagliata della città..."
                  className="h-20"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Latitudine</label>
                  <Input
                    type="number"
                    step="any"
                    value={formData.lat}
                    onChange={(e) => setFormData(prev => ({ ...prev, lat: e.target.value }))}
                    placeholder="31.6295"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Longitudine</label>
                  <Input
                    type="number"
                    step="any"
                    value={formData.lng}
                    onChange={(e) => setFormData(prev => ({ ...prev, lng: e.target.value }))}
                    placeholder="-7.9811"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Attrazioni (separate da virgola)</label>
                <Textarea
                  value={formData.attractions}
                  onChange={(e) => setFormData(prev => ({ ...prev, attractions: e.target.value }))}
                  placeholder="Jemaa el-Fnaa, Medina, Giardini Majorelle"
                  className="h-16"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleCloseModal}>
                  Annulla
                </Button>
                <Button type="submit">
                  {editingCity ? 'Aggiorna' : 'Aggiungi'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cities Grid */}
      <div className="grid gap-6">
        {cities.map((city) => (
          <Card key={city.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{city.name}</h3>
                    <Badge variant={city.visible ? "default" : "secondary"}>
                      {city.visible ? "Visibile" : "Nascosta"}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{city.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div>
                      <strong>Coordinate:</strong> {city.lat}, {city.lng}
                    </div>
                    <div>
                      <strong>Periodo migliore:</strong> {city.bestTime}
                    </div>
                    <div className="col-span-2">
                      <strong>Attrazioni:</strong> {city.attractions.join(', ')}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleVisibility(city)}
                  >
                    {city.visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(city)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(city.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {cities.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nessuna città trovata
            </h3>
            <p className="text-gray-600 mb-4">
              Inizia aggiungendo la prima città al tuo catalogo
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Aggiungi Prima Città
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}