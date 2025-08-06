"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Upload, Trash2, Camera, Eye, Download } from 'lucide-react'
import { getPhotos, addPhoto } from '@/lib/firebase-operations'
import { toast } from 'react-hot-toast'

interface Photo {
  id: string
  url: string
  category: 'city' | 'tour'
  cityId?: string
  tourId?: string
  caption: string
  uploadedAt: Date
}

export const PhotoManager = () => {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([])
  const [caption, setCaption] = useState('')
  const [category, setCategory] = useState<'city' | 'tour'>('city')

  useEffect(() => {
    loadPhotos()
  }, [])

  const loadPhotos = async () => {
    try {
      setLoading(true)
      const photosData = await getPhotos()
      setPhotos(photosData)
    } catch (error) {
      toast.error('Errore nel caricamento delle foto')
      console.error('Error loading photos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setUploadingFiles(files)
    }
  }

  const handleUpload = async () => {
    if (uploadingFiles.length === 0) return

    try {
      for (const file of uploadingFiles) {
        // Simuliamo l'upload - in realtà dovresti caricare su Firebase Storage
        const mockUrl = URL.createObjectURL(file)
        
        const photoData = {
          url: mockUrl,
          category,
          caption: caption || file.name,
          uploadedAt: new Date()
        }

        await addPhoto(photoData)
      }

      toast.success(`${uploadingFiles.length} foto caricate con successo!`)
      await loadPhotos()
      handleCloseModal()
    } catch (error) {
      toast.error('Errore nel caricamento delle foto')
      console.error('Error uploading photos:', error)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setUploadingFiles([])
    setCaption('')
    setCategory('city')
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
          <h2 className="text-3xl font-bold text-gray-900">Gestione Foto</h2>
          <p className="text-gray-600">Gestisci le immagini per città e tour</p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Carica Foto
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Carica Nuove Foto</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Seleziona File</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {uploadingFiles.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-2">File Selezionati</label>
                  <div className="space-y-2">
                    {uploadingFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Camera className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{file.name}</span>
                        <Badge variant="secondary">{(file.size / 1024 / 1024).toFixed(2)} MB</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Didascalia</label>
                <Input
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Descrizione delle foto (opzionale)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Categoria</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as 'city' | 'tour')}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="city">Città</option>
                  <option value="tour">Tour</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleCloseModal}>
                  Annulla
                </Button>
                <Button onClick={handleUpload} disabled={uploadingFiles.length === 0}>
                  <Upload className="h-4 w-4 mr-2" />
                  Carica {uploadingFiles.length} foto
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Photos Grid */}
      {photos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden">
              <div className="aspect-square relative bg-gray-100">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant={photo.category === 'city' ? 'default' : 'secondary'}>
                    {photo.category === 'city' ? 'Città' : 'Tour'}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" className="h-8 w-8 p-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {photo.caption}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Caricata: {photo.uploadedAt.toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nessuna foto trovata
            </h3>
            <p className="text-gray-600 mb-4">
              Inizia caricando le prime immagini per le tue città e tour
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Carica Prime Foto
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}