"use client"

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, Globe, FileText, Save, Check } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useNotifications } from '../NotificationSystem'
import VisualEditor from './VisualEditor'

interface Page {
  id?: string
  title: string
  slug: string
  pageType: 'homepage' | 'city' | 'experience' | 'travel' | 'about' | 'contact' | 'custom'
  blocks: any[]
  status: 'draft' | 'published'
  seoTitle?: string
  seoDescription?: string
  createdAt?: any
  updatedAt?: any
}

export default function PageManager() {
  const { user } = useAuth()
  const { showSuccess, showError } = useNotifications()
  const [pages, setPages] = useState<Page[]>([])
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // New page form data
  const [newPageData, setNewPageData] = useState({
    title: '',
    slug: '',
    pageType: 'custom' as const,
    seoTitle: '',
    seoDescription: ''
  })

  // Load all pages
  useEffect(() => {
    loadPages()
  }, [])

  const loadPages = async () => {
    try {
      setLoading(true)
      const token = user ? await user.getIdToken() : null
      
      const response = await fetch('/api/admin/content?collection=pages', {
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setPages(data.items || [])
      } else {
        console.error('Failed to load pages')
      }
    } catch (error) {
      console.error('Error loading pages:', error)
    } finally {
      setLoading(false)
    }
  }

  // Create new page
  const createPageWithStatus = async (status: 'draft' | 'published') => {
    if (!newPageData.title || !newPageData.slug) return

    try {
      setSaving(true)
      const token = user ? await user.getIdToken() : null
      if (!token) throw new Error('Authentication required')

      const pageData: Page = {
        title: newPageData.title,
        slug: newPageData.slug,
        pageType: newPageData.pageType,
        blocks: [],
        status,
        seoTitle: newPageData.seoTitle || newPageData.title,
        seoDescription: newPageData.seoDescription
      }

      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          collection: 'pages',
          data: pageData
        })
      })

      if (response.ok) {
        const result = await response.json()
        const newPage = { ...pageData, id: result.id }
        setPages(prev => [...prev, newPage])
        setSelectedPage(newPage)
        setIsCreating(false)
        setIsEditing(true)
        
        // Show success notification
        if (status === 'published') {
          showSuccess('Pagina Pubblicata', `"${newPageData.title}" è ora pubblica.`)
        } else {
          showSuccess('Bozza Creata', `"${newPageData.title}" salvata come bozza.`)
        }
        
        // Reset form
        setNewPageData({
          title: '',
          slug: '',
          pageType: 'custom',
          seoTitle: '',
          seoDescription: ''
        })
      } else {
        const error = await response.json()
        showError('Errore Creazione', `Errore: ${error.error}`)
      }
    } catch (error) {
      console.error('Error creating page:', error)
      showError('Errore Creazione', 'Errore durante la creazione della pagina')
    } finally {
      setSaving(false)
    }
  }

  // Save page content
  const savePage = async (pageId: string, blocks: any[]) => {
    try {
      setSaving(true)
      const token = user ? await user.getIdToken() : null
      if (!token) throw new Error('Authentication required')

      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          collection: 'pages',
          id: pageId,
          data: { blocks }
        })
      })

      if (response.ok) {
        // Update local state
        setPages(prev => prev.map(page => 
          page.id === pageId ? { ...page, blocks } : page
        ))
        if (selectedPage?.id === pageId) {
          setSelectedPage(prev => prev ? { ...prev, blocks } : null)
        }
        showSuccess('Pagina Salvata', 'Contenuto della pagina aggiornato con successo!')
      } else {
        const error = await response.json()
        showError('Errore Salvataggio', `Errore: ${error.error}`)
      }
    } catch (error) {
      console.error('Error saving page:', error)
      showError('Errore Sistema', 'Errore durante il salvataggio della pagina')
    } finally {
      setSaving(false)
    }
  }

  // Publish/unpublish page
  const togglePageStatus = async (page: Page) => {
    try {
      const token = user ? await user.getIdToken() : null
      if (!token) throw new Error('Authentication required')

      const newStatus = page.status === 'published' ? 'draft' : 'published'

      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          collection: 'pages',
          id: page.id,
          data: { status: newStatus }
        })
      })

      if (response.ok) {
        setPages(prev => prev.map(p => 
          p.id === page.id ? { ...p, status: newStatus } : p
        ))
      }
    } catch (error) {
      console.error('Error updating page status:', error)
    }
  }

  // Delete page
  const deletePage = async (page: Page) => {
    if (!confirm(`Sei sicuro di voler eliminare la pagina "${page.title}"?`)) return

    try {
      const token = user ? await user.getIdToken() : null
      if (!token) throw new Error('Authentication required')

      const response = await fetch(`/api/admin/content?collection=pages&id=${page.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setPages(prev => prev.filter(p => p.id !== page.id))
        if (selectedPage?.id === page.id) {
          setSelectedPage(null)
          setIsEditing(false)
        }
      }
    } catch (error) {
      console.error('Error deleting page:', error)
    }
  }

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  if (isEditing && selectedPage) {
    return (
      <div className="h-full">
        <div className="mb-4 flex items-center justify-between bg-white p-4 border-b">
          <div>
            <h2 className="text-xl font-semibold">Modifica Pagina: {selectedPage.title}</h2>
            <p className="text-sm text-gray-600">
              Tipo: {selectedPage.pageType} | Stato: {selectedPage.status}
            </p>
          </div>
          <button
            onClick={() => {
              setIsEditing(false)
              setSelectedPage(null)
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Torna alla Lista
          </button>
        </div>
        
        <VisualEditor
          pageId={selectedPage.id}
          pageType={selectedPage.pageType}
          onSave={(blocks) => selectedPage.id && savePage(selectedPage.id, blocks)}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Gestione Pagine</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nuova Pagina
        </button>
      </div>

      {/* Create Page Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Crea Nuova Pagina</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Titolo *</label>
                <input
                  type="text"
                  value={newPageData.title}
                  onChange={(e) => {
                    const title = e.target.value
                    setNewPageData(prev => ({
                      ...prev,
                      title,
                      slug: generateSlug(title),
                      seoTitle: title
                    }))
                  }}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Titolo della pagina"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Slug *</label>
                <input
                  type="text"
                  value={newPageData.slug}
                  onChange={(e) => setNewPageData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="url-della-pagina"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Tipo Pagina</label>
                <select
                  value={newPageData.pageType}
                  onChange={(e) => setNewPageData(prev => ({ ...prev, pageType: e.target.value as any }))}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="custom">Pagina Personalizzata</option>
                  <option value="homepage">Homepage</option>
                  <option value="about">Chi Siamo</option>
                  <option value="contact">Contatti</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Descrizione SEO</label>
                <textarea
                  value={newPageData.seoDescription}
                  onChange={(e) => setNewPageData(prev => ({ ...prev, seoDescription: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                  placeholder="Descrizione per i motori di ricerca"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50"
              >
                Annulla
              </button>
              
              <button
                onClick={() => createPageWithStatus('draft')}
                disabled={saving || !newPageData.title || !newPageData.slug}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    Salva Bozza
                  </>
                )}
              </button>
              
              <button
                onClick={() => createPageWithStatus('published')}
                disabled={saving || !newPageData.title || !newPageData.slug}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Pubblicando...
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4" />
                    Pubblica
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pages List */}
      <div className="bg-white rounded-lg border">
        {loading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
            <p>Caricamento pagine...</p>
          </div>
        ) : pages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nessuna pagina presente. Crea la prima pagina per iniziare.</p>
          </div>
        ) : (
          <div className="divide-y">
            {pages.map((page) => (
              <div key={page.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex-1">
                  <h3 className="font-medium">{page.title}</h3>
                  <div className="text-sm text-gray-600 mt-1">
                    <span>/{page.slug}</span>
                    <span className="mx-2">•</span>
                    <span className="capitalize">{page.pageType}</span>
                    <span className="mx-2">•</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      page.status === 'published' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {page.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePageStatus(page)}
                    className={`p-2 rounded ${
                      page.status === 'published'
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-yellow-600 hover:bg-yellow-50'
                    }`}
                    title={page.status === 'published' ? 'Nascondi' : 'Pubblica'}
                  >
                    <Globe className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => {
                      setSelectedPage(page)
                      setIsEditing(true)
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    title="Modifica"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => deletePage(page)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                    title="Elimina"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}