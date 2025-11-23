'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/context/AuthContext'
import { ContentItem } from '@/hooks/useContent'

interface ContentModalProps {
  open: boolean
  onClose: () => void
  type: 'experience' | 'travel' | 'service' | 'blog'
  item?: ContentItem | null
  onSuccess: () => void
}

interface FormData {
  type: string
  title: string
  slug: string
  description: string
  image: string
  category: string
  published: boolean
  featured: boolean
  bookable: boolean
  price: number | null
  priceNote: string
  duration: string
  metadata: any
}

function getDefaultFormData(type: string): FormData {
  return {
    type,
    title: '',
    slug: '',
    description: '',
    image: '',
    category: type === 'experience' ? 'adventure' : type === 'travel' ? 'tour' : type === 'service' ? 'transfer' : 'guide',
    published: true,
    featured: false,
    bookable: type === 'experience' || type === 'travel',
    price: null,
    priceNote: '',
    duration: '',
    metadata: {}
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function ContentModal({ open, onClose, type, item, onSuccess }: ContentModalProps) {
  const { user } = useAuth()
  const [formData, setFormData] = useState<FormData>(
    item ? {
      type: item.type,
      title: item.title,
      slug: item.slug,
      description: item.description || '',
      image: item.image || '',
      category: item.category || '',
      published: item.published,
      featured: item.featured,
      bookable: item.bookable,
      price: item.price,
      priceNote: item.priceNote || '',
      duration: item.duration || '',
      metadata: item.metadata || {}
    } : getDefaultFormData(type)
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (item) {
      setFormData({
        type: item.type,
        title: item.title,
        slug: item.slug,
        description: item.description || '',
        image: item.image || '',
        category: item.category || '',
        published: item.published,
        featured: item.featured,
        bookable: item.bookable,
        price: item.price,
        priceNote: item.priceNote || '',
        duration: item.duration || '',
        metadata: item.metadata || {}
      })
    } else {
      setFormData(getDefaultFormData(type))
    }
  }, [item, type, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast.error('Title is required')
      return
    }

    if (!formData.slug.trim()) {
      toast.error('Slug is required')
      return
    }

    setLoading(true)
    
    try {
      if (!user) {
        toast.error('You must be logged in to perform this action')
        return
      }

      const token = await user.getIdToken()
      
      const url = item ? `/api/content/${item.id}` : '/api/content'
      const method = item ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          price: formData.price ? parseFloat(String(formData.price)) : null
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save content')
      }
      
      toast.success(item ? 'Content updated successfully' : 'Content created successfully')
      onSuccess()
    } catch (error: any) {
      console.error('Error saving content:', error)
      toast.error(error.message || 'Failed to save content')
    } finally {
      setLoading(false)
    }
  }

  const handleTitleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      title: value,
      slug: prev.slug || generateSlug(value)
    }))
  }

  const categories: Record<string, string[]> = {
    experience: ['adventure', 'culture', 'food', 'wellness', 'photography'],
    travel: ['tour', 'desert', 'city', 'mountains', 'coast'],
    service: ['transfer', 'car-rental', 'guide', 'insurance'],
    blog: ['guide', 'tips', 'culture', 'destinations', 'experiences']
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {item ? 'Edit' : 'Create'} {type.charAt(0).toUpperCase() + type.slice(1)}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="url-friendly-slug"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter description"
              rows={4}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="/images/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories[type].map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (EUR)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  price: e.target.value ? parseFloat(e.target.value) : null 
                }))}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceNote">Price Note</Label>
              <Input
                id="priceNote"
                value={formData.priceNote}
                onChange={(e) => setFormData(prev => ({ ...prev, priceNote: e.target.value }))}
                placeholder="per person"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="2-3 hours"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, published: checked as boolean }))
                }
              />
              <Label htmlFor="published" className="cursor-pointer">Published</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, featured: checked as boolean }))
                }
              />
              <Label htmlFor="featured" className="cursor-pointer">Featured</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="bookable"
                checked={formData.bookable}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, bookable: checked as boolean }))
                }
              />
              <Label htmlFor="bookable" className="cursor-pointer">Bookable</Label>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : item ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
