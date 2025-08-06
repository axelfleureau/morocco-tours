"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, MapPin, Upload, X } from 'lucide-react'
import { getCities, addCity, updateCity, deleteCity, uploadImage } from '@/lib/firebase-operations'
import { useToast } from '@/hooks/use-toast'

interface City {
  id?: string
  name: string
  description: string
  lat: number
  lng: number
  attractions: string[]
  bestTime: string
  images: string[]
}

export function CityManager() {
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCity, setEditingCity] = useState<City | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState<City>({
    name: '',
    description: '',
    lat: 0,
    lng: 0,
    attractions: [],
    bestTime: '',
    images: []
  })

  useEffect(() => {
    loadCities()
  }, [])

  const loadCities = async () => {
    try {
      const citiesData = await getCities()
      setCities(citiesData)
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile caricare le città",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingCity?.id) {
        await updateCity(editingCity.id, formData)
        toast({
          title: "Successo",
          description: "Città aggiornata con successo"
        })
      } else {
        await addCity(formData)
        toast({
          title: "Successo",
          description: "Città aggiunta con successo"
        })
      }
      
      setIsDialogOpen(false)
      resetForm()
      loadCities()
    } catch (error) {
      toast({
        title: "Errore",
        description: "Operazione fallita",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Sei sicuro di voler eliminare questa città?')) {
      try {
        await deleteCity(id)
        toast({
          title: "Successo",
          description: "Città eliminata con successo"
        })
        loadCities()
      } catch (error) {
        toast({
          title: "Errore",
          description: "Impossibile eliminare la città",
          variant: "destructive"
        })
      }
    }
  }

  const handleEdit = (city: City) => {
    setEditingCity(city)
    setFormData(city)
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      lat: 0,
      lng: 0,
      attractions: [],
      bestTime: '',
      images: []
    })
    setEditingCity(null)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setUploading(true)
    try {
      const uploadPromises = Array.from(files).map(file => 
        uploadImage(file, `cities/${formData.name}`)
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

  const addAttraction = () => {
    const attraction = prompt('Inserisci una nuova attrazione:')
    if (attraction) {
      setFormData(prev => ({
        ...prev,
        attractions: [...prev.attractions, attraction]
      }))
    }
  }

  const removeAttraction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attractions: prev.attractions.filter((_, i) => i !== index)
    }))
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
          <p className="text-gray-600">Gestisci le città del Marocco</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Aggiungi Città
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCity ? 'Modifica Città' : 'Aggiungi Nuova Città'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Città</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="bestTime">Periodo Migliore</Label>
                  <Input
                    id="bestTime"
                    value={formData.bestTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, bestTime: e.target.value }))}
                    placeholder="es. Marzo - Maggio"
                  />
                </div>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lat">Latitudine</Label>
                  <Input
                    id="lat"
                    type="number"
                    step="any"
                    value={formData.lat}
                    onChange={(e) => setFormData(prev => ({ ...prev, lat: parseFloat(e.target.value) }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="lng">Longitudine</Label>
                  <Input
                    id="lng"
                    type="number"
                    step="any"
                    value={formData.lng}
                    onChange={(e) => setFormData(prev => ({ ...prev, lng: parseFloat(e.target.value) }))}
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Attrazioni</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.attractions.map((attraction, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {attraction}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeAttraction(index)}
                      />
                    </Badge>
                  ))}
                </div>
                <Button type="button" variant="outline" onClick={addAttraction}>
                  <Plus className="h-4 w-4 mr-2" />
                  Aggiungi Attrazione
                </Button>
              </div>

              <div>
                <Label>Immagini</Label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={image || "/placeholder.svg"} 
                        alt={`City ${index}`}
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
                  {editingCity ? 'Aggiorna' : 'Aggiungi'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city) => (
          <Card key={city.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {city.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{city.bestTime}</p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(city)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => city.id && handleDelete(city.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">{city.description}</p>
              
              <div className="space-y-2">
                <div className="text-xs text-gray-500">
                  Coordinate: {city.lat.toFixed(4)}, {city.lng.toFixed(4)}
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {city.attractions.slice(0, 3).map((attraction, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {attraction}
                    </Badge>
                  ))}
                  {city.attractions.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{city.attractions.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="text-xs text-gray-500">
                  {city.images.length} immagini
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
