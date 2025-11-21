"use client"

import { useState, useEffect } from 'react'
import { X, Save, Loader2, Plus, Trash2 } from 'lucide-react'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useNotifications } from '../NotificationSystem'
import { validateUrl } from '@/lib/url-validation'

interface BlogPost {
  id?: string
  slug?: string
  title: string
  excerpt: string
  cover: string
  author: string
  date: string
  readingMinutes: number
  tags: string[]
  sections: {
    heading: string
    body: string
    image?: string
  }[]
  published: boolean
  featured: boolean
  createdAt?: any
  updatedAt?: any
}

interface BlogModalProps {
  post: BlogPost | null
  isOpen: boolean
  onClose: () => void
  onSaveSuccess: () => void
}

export default function BlogModal({ post, isOpen, onClose, onSaveSuccess }: BlogModalProps) {
  const { showSuccess, showError } = useNotifications()
  const [formData, setFormData] = useState<BlogPost>({
    title: '',
    excerpt: '',
    cover: '',
    author: 'Morocco Dreams Team',
    date: new Date().toISOString().split('T')[0],
    readingMinutes: 5,
    tags: [],
    sections: [],
    published: false,
    featured: false
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [newTag, setNewTag] = useState('')
  const [coverUrlError, setCoverUrlError] = useState('')
  const [sectionUrlErrors, setSectionUrlErrors] = useState<{[key: number]: string}>({})

  useEffect(() => {
    if (post) {
      setFormData(post)
    } else {
      setFormData({
        title: '',
        excerpt: '',
        cover: '',
        author: 'Morocco Dreams Team',
        date: new Date().toISOString().split('T')[0],
        readingMinutes: 5,
        tags: [],
        sections: [],
        published: false,
        featured: false
      })
    }
  }, [post])

  const handleAddSection = () => {
    setFormData({
      ...formData,
      sections: [
        ...formData.sections,
        { heading: '', body: '', image: '' }
      ]
    })
  }

  const handleRemoveSection = (index: number) => {
    setFormData({
      ...formData,
      sections: formData.sections.filter((_, i) => i !== index)
    })
  }

  const handleSectionChange = (index: number, field: string, value: string) => {
    const newSections = [...formData.sections]
    newSections[index] = { ...newSections[index], [field]: value }
    setFormData({ ...formData, sections: newSections })
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      })
      setNewTag('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    })
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleCoverUrlChange = (url: string) => {
    setFormData({ ...formData, cover: url })
    // Rimuovi errore onChange per campo opzionale - validazione solo al submit
    setCoverUrlError('')
  }

  const handleSectionUrlChange = (index: number, url: string) => {
    const newSections = [...formData.sections]
    newSections[index] = { ...newSections[index], image: url }
    setFormData({ ...formData, sections: newSections })
    
    // Rimuovi errore onChange per campo opzionale - validazione solo al submit
    const newErrors = { ...sectionUrlErrors }
    delete newErrors[index]
    setSectionUrlErrors(newErrors)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.cover && formData.cover.trim()) {
      const coverValidation = validateUrl(formData.cover, true)
      if (!coverValidation.valid) {
        setCoverUrlError(coverValidation.error || 'URL non valido')
        showError('Errore Validazione', coverValidation.error || 'URL copertina non valido')
        return
      }
    }
    
    const newSectionErrors: {[key: number]: string} = {}
    for (let i = 0; i < formData.sections.length; i++) {
      const section = formData.sections[i]
      if (section.image && section.image.trim()) {
        const validation = validateUrl(section.image, false)
        if (!validation.valid) {
          newSectionErrors[i] = validation.error || 'URL non valido'
        }
      }
    }
    
    if (Object.keys(newSectionErrors).length > 0) {
      setSectionUrlErrors(newSectionErrors)
      showError('Errore Validazione', 'Alcuni URL delle sezioni non sono validi')
      return
    }
    
    setSaving(true)
    setError('')
    setCoverUrlError('')
    setSectionUrlErrors({})

    try {
      const slug = post?.slug || generateSlug(formData.title)
      const now = Timestamp.now()
      
      const dataToSave = {
        ...formData,
        slug,
        updatedAt: now,
        ...(!post && { createdAt: now })
      }

      await setDoc(doc(db, 'blog', slug), dataToSave, { merge: true })
      
      showSuccess('Post Salvato', `"${formData.title}" è stato salvato con successo.`)
      onSaveSuccess()
      onClose()
    } catch (err: any) {
      const errorMessage = err.message || 'Errore durante il salvataggio'
      setError(errorMessage)
      showError('Errore Salvataggio', errorMessage)
    } finally {
      setSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-foreground">
            {post ? 'Modifica Articolo' : 'Nuovo Articolo'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Titolo *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Autore *
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Excerpt *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              required
              rows={2}
              placeholder="Breve descrizione dell'articolo..."
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                URL Immagine Copertina (opzionale)
              </label>
              <input
                type="url"
                value={formData.cover}
                onChange={(e) => handleCoverUrlChange(e.target.value)}
                placeholder="https://..."
                className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                  coverUrlError ? 'border-red-500 dark:border-red-400' : 'border-border'
                }`}
              />
              {coverUrlError && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {coverUrlError}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Data Pubblicazione *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tempo di Lettura (min) *
              </label>
              <input
                type="number"
                value={formData.readingMinutes}
                onChange={(e) => setFormData({ ...formData, readingMinutes: parseInt(e.target.value) })}
                required
                min="1"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Aggiungi un tag..."
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-orange-900 dark:hover:text-orange-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-foreground">
                Sezioni Articolo
              </label>
              <button
                type="button"
                onClick={handleAddSection}
                className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1 text-sm"
              >
                <Plus className="w-4 h-4" />
                Aggiungi Sezione
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.sections.map((section, idx) => (
                <div key={idx} className="p-4 border border-border rounded-lg bg-muted/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Sezione {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSection(idx)}
                      className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                  
                  <input
                    type="text"
                    value={section.heading}
                    onChange={(e) => handleSectionChange(idx, 'heading', e.target.value)}
                    placeholder="Titolo della sezione..."
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  
                  <textarea
                    value={section.body}
                    onChange={(e) => handleSectionChange(idx, 'body', e.target.value)}
                    placeholder="Contenuto della sezione..."
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  
                  <div>
                    <input
                      type="url"
                      value={section.image || ''}
                      onChange={(e) => handleSectionUrlChange(idx, e.target.value)}
                      placeholder="URL Immagine (opzionale)..."
                      className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                        sectionUrlErrors[idx] ? 'border-red-500 dark:border-red-400' : 'border-border'
                      }`}
                    />
                    {sectionUrlErrors[idx] && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {sectionUrlErrors[idx]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
              />
              <span className="text-sm font-medium text-foreground">Pubblicato</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
              />
              <span className="text-sm font-medium text-foreground">In Evidenza</span>
            </label>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Salvataggio...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Salva Articolo
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Annulla
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
