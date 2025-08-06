"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash2, Camera, Upload, ImageIcon } from 'lucide-react'
import { getPhotos, addPhoto, deletePhoto, uploadImage, getCities, getTours } from '@/lib/firebase-operations'
import { useToast } from '@/hooks/use-toast'

interface Photo {
  id?: string
  url: string
  category: 'city' | 'tour' | 'general'
  cityId?: string
  tourId?: string
  caption: string
}

interface City {
  id: string
  name: string
}

interface Tour {
  id: string
  name: string
}

export function PhotoManager() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    category: 'general' as 'city' | 'tour' | 'general',
    cityId: '',
    tourId: '',
    caption: '',
    files: null as FileList | null
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [photosData, citiesData, toursData] = await Promise.all([
        getPhotos(),
        getCities(),
        getTours()
      ])
      setPhotos(photosData)
      setCities(citiesData)
      setTours(toursData)
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
    
    if (!formData.files || formData.files.length === 0) {
      toast({
        title: "Errore",
        description: "Seleziona almeno un'immagine",
        variant: "destructive"
      })
      return
    }

    setUploading(true)
    try {
      const uploadPromises = Array.from(formData.files).map(async (file) => {
        const url = await uploadImage(file, `photos/${formData.category}`)
        
        const photoData = {
          url,
          category: formData.category,
          caption: formData.caption || file.name,
          ...(formData.category === 'city' && formData.cityId && { cityId: formData.cityId }),
          ...(formData.category === 'tour' && formData.tourId && { tourId: formData.tourId })
        }
        
        return addPhoto(photoData)
      })
      
      await Promise.all(uploadPromises)
      
      toast({
        title: "Successo",
        description: `${formData.files.length} foto caricate con successo`
      })
      
      setIsDialogOpen(false)
      resetForm()
      loadData()
    } catch (error) {
      toast({
        title: "Errore",
        description: "Errore nel caricamento delle foto",
        variant: "destructive"
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string, url: string) => {
    if (confirm('Sei sicuro di voler eliminare questa foto?')) {
      try {
        await deletePhoto(id)
        toast({
          title: "Successo",
          description: "Foto eliminata con successo"
        })
        loadData()
      } catch (error) {
        toast({
          title: "Errore",
          description: "Impossibile eliminare la foto",
          variant: "destructive"
        })
      }
    }
  }

  const resetForm = () => {
    setFormData({
      category: 'general',
      cityId: '',
      tourId: '',
      caption: '',
      files: null
    })
  }

  const getCityName = (cityId: string) => {
    const city = cities.find(c => c.id === cityId)
    return city ? city.name : 'Città sconosciuta'
  }

  const getTourName = (tourId: string) => {
    const tour = tours.find(t => t.id === tourId)
    return tour ? tour.name : 'Tour sconosciuto'
  }

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory)

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
          <h2 className="text-3xl font-bold text-gray-900">Gestione Foto</h2>
          <p className="text-gray-600">Gestisci la galleria fotografica</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Carica Foto
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Carica Nuove Foto</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Categoria</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: 'city' | 'tour' | 'general') => 
                    setFormData(prev => ({ ...prev, category: value, cityId: '', tourId: '' }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Generale</SelectItem>
                    <SelectItem value="city">Città</SelectItem>
                    <SelectItem value="tour">Tour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.category === 'city' && (
                <div>
                  <Label>Città</Label>
                  <Select
                    value={formData.cityId}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, cityId: value }))}
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
                </div>
              )}

              {formData.category === 'tour' && (
                <div>
                  <Label>Tour</Label>
                  <Select
                    value={formData.tourId}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, tourId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona tour" />
                    </SelectTrigger>
                    <SelectContent>
                      {tours.map((tour) => (
                        <SelectItem key={tour.id} value={tour.id}>
                          {tour.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="caption">Didascalia</Label>
                <Input
                  id="caption"
                  value={formData.caption}
                  onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
                  placeholder="Descrizione della foto..."
                />
              </div>

              <div>
                <Label htmlFor="files">Seleziona Immagini</Label>
                <Input
                  id="files"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setFormData(prev => ({ ...prev, files: e.target.files }))}
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annulla
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Caricamento...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Carica
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('all')}
        >
          Tutte ({photos.length})
        </Button>
        <Button
          variant={selectedCategory === 'general' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('general')}
        >
          Generali ({photos.filter(p => p.category === 'general').length})
        </Button>
        <Button
          variant={selectedCategory === 'city' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('city')}
        >
          Città ({photos.filter(p => p.category === 'city').length})
        </Button>
        <Button
          variant={selectedCategory === 'tour' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('tour')}
        >
          Tour ({photos.filter(p => p.category === 'tour').length})
        </Button>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <img
                src={photo.url || "/placeholder.svg"}
                alt={photo.caption}
                className="w-full h-full object-cover"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => photo.id && handleDelete(photo.id, photo.url)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <CardContent className="p-3">
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs">
                  {photo.category === 'general' && 'Generale'}
                  {photo.category === 'city' && `Città: ${photo.cityId ? getCityName(photo.cityId) : 'N/A'}`}
                  {photo.category === 'tour' && `Tour: ${photo.tourId ? getTourName(photo.tourId) : 'N/A'}`}
                </Badge>
                
                <p className="text-sm text-gray-600 line-clamp-2">
                  {photo.caption}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPhotos.length === 0 && (
        <div className="text-center py-12">
          <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nessuna foto trovata</h3>
          <p className="text-gray-600">
            {selectedCategory === 'all' 
              ? 'Non ci sono foto nella galleria.' 
              : `Non ci sono foto nella categoria "${selectedCategory}".`
            }
          </p>
        </div>
      )}
    </div>
  )
}
