"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Edit, Trash2, Package, Euro, Clock, X } from 'lucide-react'
import { getTours, addTour, updateTour, deleteTour, getCities, uploadImage } from '@/lib/firebase-operations'
import { useToast } from '@/hooks/use-toast'

interface Tour {
  id?: string
  name: string
  description: string
  price: number
  duration: string
  cities: string[]
  itinerary: string
  includes: string[]
  excludes: string[]
  images: string[]
}

interface City {
  id: string
  name: string
}

export function TourManager() {
  const [tours, setTours] = useState<Tour[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)
  const [editingTour, setEditingTour] = useState<Tour | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState<Tour>({
    name: '',
    description: '',
    price: 0,
    duration: '',
    cities: [],
    itinerary: '',
    includes: [],
    excludes: [],
    images: []
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [toursData, citiesData] = await Promise.all([
        getTours(),
        getCities()
      ])
      setTours(toursData)
      setCities(citiesData)
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile caricare i dati",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingTour?.id) {
        await updateTour(editingTour.id, formData)
        toast({
          title: "Successo",
          description: "Tour aggiornato con successo"
        })
      } else {
        await addTour(formData)
        toast({
          title: "Successo",
          description: "Tour aggiunto con successo"
        })
      }
      
      setIsDialogOpen(false)
      resetForm()
      loadData()
    } catch (error) {
      toast({
        title: "Errore",
        description: "Operazione fallita",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Sei sicuro di voler eliminare questo tour?')) {
      try {
        await deleteTour(id)
        toast({
          title: "Successo",
          description: "Tour eliminato con successo"
        })
        loadData()
      } catch (error) {
        toast({
          title: "Errore",
          description: "Impossibile eliminare il tour",
          variant: "destructive"
        })
      }
    }
  }

  const handleEdit = (tour: Tour) => {
    setEditingTour(tour)
    setFormData(tour)
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      duration: '',
      cities: [],
      itinerary: '',
      includes: [],
      excludes: [],
      images: []
    })
    setEditingTour(null)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setUploading(true)
    try {
      const uploadPromises = Array.from(files).map(file => 
        uploadImage(file, `tours/${formData.name}`)
      )
      
      const imageUrls = await Promise.all(uploadPromises)
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls]
      }))
      
      toast({
        title: "Successo",
        description: `${imageUrls.length} immagini caricate`
      })
    } catch (error) {
      toast({
        title: "Errore",
        description: "Errore nel caricamento delle immagini",
        variant: "destructive"
      })
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const addInclude = () => {
    const include = prompt('Cosa è incluso nel tour?')
    if (include) {
      setFormData(prev => ({
        ...prev,
        includes: [...prev.includes, include]
      }))
    }
  }

  const removeInclude = (index: number) => {
    setFormData(prev => ({
      ...prev,
      includes: prev.includes.filter((_, i) => i !== index)
    }))
  }

  const addExclude = () => {
    const exclude = prompt('Cosa NON è incluso nel tour?')
    if (exclude) {
      setFormData(prev => ({
        ...prev,
        excludes: [...prev.excludes, exclude]
      }))
    }
  }

  const removeExclude = (index: number) => {
    setFormData(prev => ({
      ...prev,
      excludes: prev.excludes.filter((_, i) => i !== index)
    }))
  }

  const getCityName = (cityId: string) => {
    const city = cities.find(c => c.id === cityId)
    return city ? city.name : cityId
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
          <p className="text-gray-600">Gestisci i pacchetti turistici</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
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
                  <Label htmlFor="name">Nome Tour</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="duration">Durata</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="es. 7 giorni / 6 notti"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="price">Prezzo (€)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Descrizione</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="itinerary">Itinerario Dettagliato</Label>
                <Textarea
                  id="itinerary"
                  value={formData.itinerary}
                  onChange={(e) => setFormData(prev => ({ ...prev, itinerary: e.target.value }))}
                  rows={5}
                  placeholder="Giorno 1: Arrivo a Marrakech..."
                />
              </div>

              <div>
                <Label>Città Incluse</Label>
                <Select
                  onValueChange={(value) => {
                    if (!formData.cities.includes(value)) {
                      setFormData(prev => ({
                        ...prev,
                        cities: [...prev.cities, value]
                      }))
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona città" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.cities.map((cityId, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {getCityName(cityId)}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          cities: prev.cities.filter((_, i) => i !== index)
                        }))}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Incluso nel Prezzo</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.includes.map((include, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {include}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeInclude(index)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <Button type="button" variant="outline" onClick={addInclude}>
                    <Plus className="h-4 w-4 mr-2" />
                    Aggiungi Inclusione
                  </Button>
                </div>

                <div>
                  <Label>Non Incluso</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.excludes.map((exclude, index) => (
                      <Badge key={index} variant="destructive" className="flex items-center gap-1">
                        {exclude}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeExclude(index)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <Button type="button" variant="outline" onClick={addExclude}>
                    <Plus className="h-4 w-4 mr-2" />
                    Aggiungi Esclusione
                  </Button>
                </div>
              </div>

              <div>
                <Label>Immagini</Label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={image || "/placeholder.svg"} 
                        alt={`Tour ${index}`}
                        className="w-full h-20 object-cover rounded"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                  {uploading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <Card key={tour.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    {tour.name}
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Euro className="h-4 w-4" />
                      {tour.price}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {tour.duration}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(tour)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => tour.id && handleDelete(tour.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">{tour.description}</p>
              
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {tour.cities.slice(0, 3).map((cityId, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {getCityName(cityId)}
                    </Badge>
                  ))}
                  {tour.cities.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{tour.cities.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="text-xs text-gray-500">
                  {tour.includes.length} inclusioni • {tour.images.length} immagini
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
