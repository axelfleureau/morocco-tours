"use client"

import { useState, useEffect } from 'react'
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Search, Edit, Trash2, Plus, Eye, EyeOff, Star, Calendar } from 'lucide-react'
import BlogModal from '@/components/admin/BlogModal'

interface BlogPost {
  id: string
  slug: string
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
}

export default function AdminBlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [showModal, setShowModal] = useState(false)

  const allTags = ['Gastronomia', 'Benessere', 'Viaggi', 'Cultura', 'Storia', 'Natura']

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  useEffect(() => {
    let filtered = blogPosts

    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (tagFilter) {
      filtered = filtered.filter(post => post.tags.includes(tagFilter))
    }

    setFilteredPosts(filtered)
  }, [searchTerm, tagFilter, blogPosts])

  const fetchBlogPosts = async () => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'blog'))
      const posts: BlogPost[] = []
      
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, slug: doc.id, ...doc.data() } as BlogPost)
      })
      
      setBlogPosts(posts)
      setFilteredPosts(posts)
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const togglePublished = async (post: BlogPost) => {
    try {
      const postRef = doc(db, 'blog', post.id)
      await updateDoc(postRef, { published: !post.published })
      
      setBlogPosts(prev => prev.map(p => 
        p.id === post.id ? { ...p, published: !p.published } : p
      ))
    } catch (error) {
      console.error('Error toggling published:', error)
    }
  }

  const toggleFeatured = async (post: BlogPost) => {
    try {
      const postRef = doc(db, 'blog', post.id)
      await updateDoc(postRef, { featured: !post.featured })
      
      setBlogPosts(prev => prev.map(p => 
        p.id === post.id ? { ...p, featured: !p.featured } : p
      ))
    } catch (error) {
      console.error('Error toggling featured:', error)
    }
  }

  const deletePost = async (post: BlogPost) => {
    if (!confirm(`Sei sicuro di voler eliminare "${post.title}"?`)) return

    try {
      await deleteDoc(doc(db, 'blog', post.id))
      setBlogPosts(prev => prev.filter(p => p.id !== post.id))
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Errore durante l\'eliminazione')
    }
  }

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedPost(null)
  }

  const handleSaveSuccess = () => {
    fetchBlogPosts()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Caricamento articoli blog...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestione Blog</h1>
          <p className="text-muted-foreground mt-1">
            {blogPosts.length} articoli totali, {blogPosts.filter(p => p.published).length} pubblicati
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedPost(null)
            setShowModal(true)
          }}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Nuovo Articolo
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cerca per titolo, excerpt o autore..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Tutti i tag</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Articolo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Autore</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Tag</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Data</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Stato</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    Nessun articolo trovato
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {post.cover && (
                          <img
                            src={post.cover}
                            alt={post.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        )}
                        <div className="max-w-md">
                          <p className="font-medium text-foreground line-clamp-1">{post.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-foreground">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.readingMinutes} min lettura</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('it-IT')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => togglePublished(post)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                            post.published
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {post.published ? 'Pubblicato' : 'Bozza'}
                        </button>
                        <button
                          onClick={() => toggleFeatured(post)}
                          className={`flex items-center justify-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                            post.featured
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          <Star className="w-3 h-3" />
                          {post.featured ? 'In evidenza' : 'Normale'}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors group"
                          title="Modifica"
                        >
                          <Edit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </button>
                        <button
                          onClick={() => deletePost(post)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors group"
                          title="Elimina"
                        >
                          <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <BlogModal
        isOpen={showModal}
        onClose={handleCloseModal}
        post={selectedPost}
        onSaveSuccess={handleSaveSuccess}
      />
    </div>
  )
}
