"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Edit, Trash2, Package, Eye, EyeOff, MapPin } from 'lucide-react'
import { getTours, addTour, updateTour, deleteTour, getCities } from '@/lib/firebase-operations'
import { toast } from 'react-hot-toast'

interface Tour {
  id: string
  name: string
  description: string
  price: number
  duration: string
  cities: string[]
  includes: string[]
  excludes: string[]
  itinerary: string
  images: string[]
  visible: boolean
  category: string
  createdAt: Date
  updatedAt: Date
}

interface City {
  id: string
  name: string
}

export const TourManager = () => {
  const [tours, setTours] = useState<Tour[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTour, setEditingTour] = useState<Tour | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    cities: [] as string[],
    includes: '',
    excludes: '',
    itinerary: '',
    category: 'standard',
    visible: true
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [toursData, citiesData] = await Promise.all([
        getTours(),
        getCities()
      ])
      setTours(toursData)
      setCities(citiesData)
    } catch (error) {
      toast.error('Errore nel caricamento dei dati')
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const tourData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        duration: formData.duration,
        cities: formData.cities,
        includes: formData.includes.split(',').map(i => i.trim()),
        excludes: formData.excludes.split(',').map(e => e.trim()),
        itinerary: formData.itinerary,
        category: formData.category,
        images: [],
        visible: formData.visible,
        createdAt: editingTour ? editingTour.createdAt : new Date(),
        updatedAt: new Date()
      }

      if (editingTour) {
        await updateTour(editingTour.id, tourData)
        toast.success('Tour aggiornato con successo!')
      } else {
        await addTour(tourData)
        toast.success('Tour aggiunto con successo!')
      }

      await loadData()
      handleCloseModal()
    } catch (error) {
      toast.error('Errore nel salvataggio del tour')
      console.error('Error saving tour:', error)
    }
  }

  const handleEdit = (tour: Tour) => {
    setEditingTour(tour)
    setFormData({
      name: tour.name,
      description: tour.description,
      price: tour.price.toString(),
      duration: tour.duration,
      cities: tour.cities,
      includes: tour.includes.join(', '),
      excludes: tour.excludes.join(', '),
      itinerary: tour.itinerary,
      category: tour.category,
      visible: tour.visible
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (tourId: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo tour?')) return
    
    try {
      await deleteTour(tourId)
      toast.success('Tour eliminato con successo!')
      await loadData()
    } catch (error) {
      toast.error('Errore nell\'eliminazione del tour')
      console.error('Error deleting tour:', error)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTour(null)
    setFormData({
      name: '',
      description: '',
      price: '',
      duration: '',
      cities: [],
      includes: '',
      excludes: '',
      itinerary: '',
      category: 'standard',
      visible: true
    })
  }

  const toggleVisibility = async (tour: Tour) => {
    try {
      await updateTour(tour.id, { ...tour, visible: !tour.visible, updatedAt: new Date() })
      toast.success(`Tour ${!tour.visible ? 'mostrato' : 'nascosto'}`)
      await loadData()
    } catch (error) {
      toast.error('Errore nell\'aggiornamento della visibilità')
      console.error('Error updating visibility:', error)
    }
  }

  const getCityNames = (cityIds: string[]) => {
    return cityIds.map(id => {
      const city = cities.find(c => c.id === id)
      return city ? city.name : 'Sconosciuta'
    }).join(', ')
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
          <h2 className="text-3xl font-bold text-gray-900">Gestione Tour</h2>
          <p className="text-gray-600">Gestisci i pacchetti turistici del Marocco</p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Aggiungi Tour
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTour ? 'Modifica Tour' : 'Aggiungi Nuovo Tour'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome Tour</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Es. Desert Safari 3 Days"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Categoria</label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descrizione</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrizione dettagliata del tour..."
                  className="h-20"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Prezzo (€)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="299.00"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Durata</label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="3 giorni / 2 notti"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Città Incluse</label>
                <Select value={formData.cities[0] || ""} onValueChange={(value) => setFormData(prev => ({ ...prev, cities: value ? [value] : [] }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona città" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Include (separato da virgola)</label>
                  <Textarea
                    value={formData.includes}
                    onChange={(e) => setFormData(prev => ({ ...prev, includes: e.target.value }))}
                    placeholder="Transport 4x4, Guide esperta, Pernottamenti"
                    className="h-20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Esclude (separato da virgola)</label>
                  <Textarea
                    value={formData.excludes}
                    onChange={(e) => setFormData(prev => ({ ...prev, excludes: e.target.value }))}
                    placeholder="Voli, Bevande, Mance"
                    className="h-20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Itinerario</label>
                <Textarea
                  value={formData.itinerary}
                  onChange={(e) => setFormData(prev => ({ ...prev, itinerary: e.target.value }))}
                  placeholder="Giorno 1: Partenza da Marrakech..."
                  className="h-32"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleCloseModal}>
                  Annulla
                </Button>
                <Button type="submit">
                  {editingTour ? 'Aggiorna' : 'Aggiungi'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tours Grid */}
      <div className="grid gap-6">
        {tours.map((tour) => (
          <Card key={tour.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{tour.name}</h3>
                    <Badge variant={tour.visible ? "default" : "secondary"}>
                      {tour.visible ? "Visibile" : "Nascosto"}
                    </Badge>
                    <Badge variant={
                      tour.category === 'luxury' ? 'default' :
                      tour.category === 'premium' ? 'secondary' :
                      'outline'
                    }>
                      {tour.category}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{tour.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-3">
                    <div>
                      <strong>Prezzo:</strong> €{tour.price}
                    </div>
                    <div>
                      <strong>Durata:</strong> {tour.duration}
                    </div>
                    <div className="col-span-2">
                      <strong>Città:</strong> {getCityNames(tour.cities)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-green-600">Include:</strong>
                      <ul className="list-disc list-inside text-gray-600">
                        {tour.includes.slice(0, 3).map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                        {tour.includes.length > 3 && <li>...e altro</li>}
                      </ul>
                    </div>
                    <div>
                      <strong className="text-red-600">Esclude:</strong>
                      <ul className="list-disc list-inside text-gray-600">
                        {tour.excludes.slice(0, 3).map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                        {tour.excludes.length > 3 && <li>...e altro</li>}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleVisibility(tour)}
                  >
                    {tour.visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(tour)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(tour.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {tours.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nessun tour trovato
            </h3>
            <p className="text-gray-600 mb-4">
              Inizia creando il primo pacchetto turistico
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Aggiungi Primo Tour
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}