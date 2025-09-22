"use client"

import React, { useState, useEffect } from 'react'
import { Eye, EyeOff, Edit, Trash2, Plus, Search, Filter } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

interface ContentDataGridProps {
  collection: string
  title: string
  columns: Array<{
    key: string
    label: string
    type?: 'text' | 'number' | 'boolean' | 'date' | 'array' | 'image'
    sortable?: boolean
  }>
  onEdit?: (item: any) => void
  onCreate?: () => void
}

export default function ContentDataGrid({ 
  collection, 
  title, 
  columns, 
  onEdit, 
  onCreate 
}: ContentDataGridProps) {
  const { user } = useAuth()
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [showPublishedOnly, setShowPublishedOnly] = useState(false)

  // Load data from API
  const loadData = async () => {
    try {
      setLoading(true)
      const token = user ? await user.getIdToken() : null
      
      const params = new URLSearchParams({
        collection,
        ...(showPublishedOnly && { published: 'true' })
      })
      
      const response = await fetch(`/api/admin/content?${params}`, {
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to load data')
      }
      
      const data = await response.json()
      setItems(data.items || [])
      setError('')
    } catch (error: any) {
      console.error('Load data error:', error)
      setError(error.message || 'Errore nel caricamento dei dati')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [collection, showPublishedOnly])

  // Toggle published status
  const togglePublished = async (item: any) => {
    try {
      const token = user ? await user.getIdToken() : null
      if (!token) throw new Error('Token not available')
      
      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          collection,
          id: item.id,
          data: { published: !item.published }
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to update item')
      }
      
      // Update local state
      setItems(prev => prev.map(i => 
        i.id === item.id ? { ...i, published: !i.published } : i
      ))
    } catch (error: any) {
      console.error('Toggle published error:', error)
      setError(error.message || 'Errore durante l\'aggiornamento')
    }
  }

  // Delete item
  const deleteItem = async (item: any) => {
    if (!confirm(`Sei sicuro di voler eliminare "${item.title || item.name}"?`)) {
      return
    }

    try {
      const token = user ? await user.getIdToken() : null
      if (!token) throw new Error('Token not available')
      
      const response = await fetch(`/api/admin/content?collection=${collection}&id=${item.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete item')
      }
      
      // Remove from local state
      setItems(prev => prev.filter(i => i.id !== item.id))
    } catch (error: any) {
      console.error('Delete error:', error)
      setError(error.message || 'Errore durante l\'eliminazione')
    }
  }

  // Format cell value based on type
  const formatCellValue = (value: any, type: string = 'text') => {
    if (value === null || value === undefined) return '-'
    
    switch (type) {
      case 'boolean':
        return value ? 'Sì' : 'No'
      case 'date':
        return new Date(value.seconds ? value.seconds * 1000 : value).toLocaleDateString('it-IT')
      case 'array':
        return Array.isArray(value) ? value.join(', ') : '-'
      case 'image':
        return value ? (
          <img src={value} alt="" className="w-12 h-12 object-cover rounded-lg" />
        ) : '-'
      case 'number':
        return typeof value === 'number' ? value.toLocaleString() : value
      default:
        return typeof value === 'string' ? (value.length > 50 ? `${value.substring(0, 50)}...` : value) : String(value)
    }
  }

  // Filter and sort items
  const filteredItems = items
    .filter(item => {
      if (!searchTerm) return true
      const searchFields = ['title', 'name', 'description', 'slug']
      return searchFields.some(field => 
        item[field]?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    .sort((a, b) => {
      if (!sortBy) return 0
      
      const aVal = a[sortBy]
      const bVal = b[sortBy]
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

  if (loading) {
    return (
      <div className="bg-card rounded-2xl p-8 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">Caricamento {title.toLowerCase()}...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {onCreate && (
          <button
            onClick={onCreate}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            Aggiungi
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-card rounded-2xl p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cerca..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Published filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={showPublishedOnly}
                onChange={(e) => setShowPublishedOnly(e.target.checked)}
                className="rounded border-border"
              />
              Solo pubblicati
            </label>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {filteredItems.length} di {items.length} elementi
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Data Grid */}
      <div className="bg-card rounded-2xl overflow-hidden border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                {columns.map((column) => (
                  <th 
                    key={column.key} 
                    className={`px-4 py-3 text-left text-sm font-medium text-foreground ${
                      column.sortable ? 'cursor-pointer hover:bg-muted' : ''
                    }`}
                    onClick={() => {
                      if (column.sortable) {
                        if (sortBy === column.key) {
                          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                        } else {
                          setSortBy(column.key)
                          setSortOrder('asc')
                        }
                      }
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {column.sortable && sortBy === column.key && (
                        <span className="text-xs">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Stato</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 text-sm text-foreground">
                      {formatCellValue(item[column.key], column.type)}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      item.published 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {item.published ? 'Pubblicato' : 'Bozza'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePublished(item)}
                        className={`p-1 rounded-lg transition-colors ${
                          item.published 
                            ? 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900'
                            : 'text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900'
                        }`}
                        title={item.published ? 'Nascondi' : 'Pubblica'}
                      >
                        {item.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="p-1 text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-900 rounded-lg transition-colors"
                          title="Modifica"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteItem(item)}
                        className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                        title="Elimina"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? 'Nessun risultato trovato' : 'Nessun elemento presente'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}