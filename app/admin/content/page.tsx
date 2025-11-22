'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useContent, ContentItem } from '@/hooks/useContent'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ContentModal } from '@/components/admin/ContentModal'
import { getAdminToken } from '@/lib/admin-token'
import { Plus, MoreVertical, Edit, Eye, EyeOff, Star, StarOff, Trash2 } from 'lucide-react'

export default function ContentManagerPage() {
  const [selectedType, setSelectedType] = useState<'experience' | 'travel' | 'service' | 'blog'>('experience')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
  
  const { items, loading, error, refetch } = useContent({ 
    type: selectedType,
    limit: 100 
  })

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item? It will be unpublished.')) {
      return
    }

    try {
      const token = await getAdminToken()
      
      const response = await fetch(`/api/content/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete content')
      }

      toast.success('Content deleted successfully')
      refetch()
    } catch (error: any) {
      console.error('Error deleting content:', error)
      toast.error(error.message || 'Failed to delete content')
    }
  }

  const handleTogglePublished = async (item: ContentItem) => {
    try {
      const token = await getAdminToken()
      
      const response = await fetch(`/api/content/${item.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          published: !item.published
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update content')
      }

      toast.success(item.published ? 'Content unpublished' : 'Content published')
      refetch()
    } catch (error: any) {
      console.error('Error toggling published:', error)
      toast.error(error.message || 'Failed to update content')
    }
  }

  const handleToggleFeatured = async (item: ContentItem) => {
    try {
      const token = await getAdminToken()
      
      const response = await fetch(`/api/content/${item.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          featured: !item.featured
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update content')
      }

      toast.success(item.featured ? 'Removed from featured' : 'Added to featured')
      refetch()
    } catch (error: any) {
      console.error('Error toggling featured:', error)
      toast.error(error.message || 'Failed to update content')
    }
  }

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item)
    setModalOpen(true)
  }

  const handleAddNew = () => {
    setEditingItem(null)
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setEditingItem(null)
  }

  const handleSuccess = () => {
    handleModalClose()
    refetch()
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      experience: 'Experiences',
      travel: 'Travels',
      service: 'Services',
      blog: 'Blog Posts'
    }
    return labels[type as keyof typeof labels] || type
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Manager</h1>
          <p className="text-muted-foreground mt-1">
            Manage all content items across the website
          </p>
        </div>
      </div>

      <Tabs value={selectedType} onValueChange={(val) => setSelectedType(val as any)}>
        <div className="flex items-center justify-between">
          <TabsList className="grid grid-cols-4 w-auto">
            <TabsTrigger value="experience">Experiences</TabsTrigger>
            <TabsTrigger value="travel">Travels</TabsTrigger>
            <TabsTrigger value="service">Services</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
          </TabsList>

          <Button onClick={handleAddNew} className="gap-2">
            <Plus className="w-4 h-4" />
            Add New {getTypeLabel(selectedType).slice(0, -1)}
          </Button>
        </div>

        <TabsContent value={selectedType} className="mt-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">Error loading content: {error.message}</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 bg-muted/50 rounded-lg border-2 border-dashed">
              <p className="text-muted-foreground text-lg">No {getTypeLabel(selectedType).toLowerCase()} found</p>
              <Button onClick={handleAddNew} className="mt-4 gap-2">
                <Plus className="w-4 h-4" />
                Create your first {getTypeLabel(selectedType).slice(0, -1).toLowerCase()}
              </Button>
            </div>
          ) : (
            <div className="bg-card border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-center">Published</TableHead>
                    <TableHead className="text-center">Featured</TableHead>
                    <TableHead className="text-center">Bookable</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-xs text-muted-foreground">/{item.slug}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {item.category || 'N/A'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.price ? (
                          <span className="font-medium">€{item.price}</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.published ? (
                          <Badge variant="default" className="bg-green-500">Published</Badge>
                        ) : (
                          <Badge variant="secondary">Draft</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.featured ? (
                          <Star className="w-4 h-4 fill-orange-500 text-orange-500 mx-auto" />
                        ) : (
                          <StarOff className="w-4 h-4 text-muted-foreground mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.bookable ? (
                          <Badge variant="default" className="bg-blue-500">Yes</Badge>
                        ) : (
                          <Badge variant="secondary">No</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(item)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleTogglePublished(item)}>
                              {item.published ? (
                                <>
                                  <EyeOff className="w-4 h-4 mr-2" />
                                  Unpublish
                                </>
                              ) : (
                                <>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Publish
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleFeatured(item)}>
                              {item.featured ? (
                                <>
                                  <StarOff className="w-4 h-4 mr-2" />
                                  Remove Featured
                                </>
                              ) : (
                                <>
                                  <Star className="w-4 h-4 mr-2" />
                                  Add Featured
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {items.length} {getTypeLabel(selectedType).toLowerCase()}
          </div>
        </TabsContent>
      </Tabs>

      <ContentModal
        open={modalOpen}
        onClose={handleModalClose}
        type={selectedType}
        item={editingItem}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
