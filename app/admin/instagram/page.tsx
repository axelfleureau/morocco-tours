"use client"

import { useState, useEffect } from 'react'
import { Instagram, Plus, Trash2, Eye } from 'lucide-react'
import { db } from '@/lib/firebase'
import { collection, doc, setDoc, getDocs, Timestamp, query, orderBy } from 'firebase/firestore'
import { useNotifications } from '@/components/NotificationSystem'

interface InstagramVideo {
  id: string
  url: string
  embedUrl: string
  slot: number
  active: boolean
  order: number
}

export default function AdminInstagramPage() {
  const [videos, setVideos] = useState<InstagramVideo[]>([
    { id: 'slot-1', url: '', embedUrl: '', slot: 1, active: false, order: 1 },
    { id: 'slot-2', url: '', embedUrl: '', slot: 2, active: false, order: 2 },
    { id: 'slot-3', url: '', embedUrl: '', slot: 3, active: false, order: 3 }
  ])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [inputUrl, setInputUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const { showSuccess, showError } = useNotifications()

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const videosRef = collection(db, 'instagram_videos')
      const q = query(videosRef, orderBy('order', 'asc'))
      const snapshot = await getDocs(q)
      
      if (!snapshot.empty) {
        const fetchedVideos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as InstagramVideo[]
        
        setVideos(prev => prev.map((v, i) => {
          const fetched = fetchedVideos.find(fv => fv.slot === i + 1)
          return fetched || v
        }))
      }
    } catch (error) {
      console.error('Error fetching videos:', error)
      showError('Errore', 'Impossibile caricare i video')
    } finally {
      setLoading(false)
    }
  }

  const convertToEmbedUrl = (url: string): string => {
    // Support both /p/ (posts) and /reel/ (reels)
    const reelMatch = url.match(/\/reel\/([^\/\?]+)/)
    if (reelMatch) {
      return `https://www.instagram.com/reel/${reelMatch[1]}/embed`
    }
    
    const postMatch = url.match(/\/p\/([^\/\?]+)/)
    if (postMatch) {
      return `https://www.instagram.com/p/${postMatch[1]}/embed`
    }
    
    return url
  }

  const handleSaveVideo = async (index: number) => {
    if (!inputUrl) return
    
    const embedUrl = convertToEmbedUrl(inputUrl)
    const video = videos[index]
    
    try {
      const videoRef = doc(db, 'instagram_videos', video.id)
      await setDoc(videoRef, {
        slot: video.slot,
        url: inputUrl,
        embedUrl,
        active: true,
        order: video.order,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      }, { merge: true })
      
      setVideos(prev => prev.map((v, i) => 
        i === index 
          ? { ...v, url: inputUrl, embedUrl, active: true }
          : v
      ))
      
      showSuccess('Salvato!', 'Video aggiunto con successo')
      setEditingIndex(null)
      setInputUrl('')
    } catch (error) {
      console.error('Error saving video:', error)
      showError('Errore', 'Impossibile salvare il video')
    }
  }

  const handleRemoveVideo = async (index: number) => {
    const video = videos[index]
    
    try {
      const videoRef = doc(db, 'instagram_videos', video.id)
      await setDoc(videoRef, {
        slot: video.slot,
        url: '',
        embedUrl: '',
        active: false,
        order: video.order,
        updatedAt: Timestamp.now()
      }, { merge: true })
      
      setVideos(prev => prev.map((v, i) => 
        i === index 
          ? { ...v, url: '', embedUrl: '', active: false }
          : v
      ))
      
      showSuccess('Rimosso!', 'Video eliminato con successo')
    } catch (error) {
      console.error('Error removing video:', error)
      showError('Errore', 'Impossibile rimuovere il video')
    }
  }

  const toggleActive = async (index: number) => {
    const video = videos[index]
    
    try {
      const videoRef = doc(db, 'instagram_videos', video.id)
      await setDoc(videoRef, {
        active: !video.active,
        updatedAt: Timestamp.now()
      }, { merge: true })
      
      setVideos(prev => prev.map((v, i) => 
        i === index 
          ? { ...v, active: !v.active }
          : v
      ))
      
      showSuccess('Aggiornato!', video.active ? 'Video disattivato' : 'Video attivato')
    } catch (error) {
      console.error('Error toggling video:', error)
      showError('Errore', 'Impossibile aggiornare lo stato')
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestione Instagram Feed</h1>
          <p className="text-muted-foreground mt-1">
            Gestisci i 3 video Instagram mostrati sul sito
          </p>
        </div>
        <a
          href="https://www.instagram.com/omarito_chill/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center gap-2 shadow-lg"
        >
          <Instagram className="w-5 h-5" />
          @omarito_chill
        </a>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Come aggiungere un video:
        </h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <li>Vai su Instagram e apri il post desiderato</li>
          <li>Copia l'URL completo del post (es: https://www.instagram.com/p/ABC123/)</li>
          <li>Incolla l'URL in uno degli slot qui sotto</li>
          <li>Clicca "Salva" per attivare il video</li>
        </ol>
      </div>

      {/* Video Slots */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="bg-card border border-border rounded-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3">
              <h3 className="font-bold text-white">Slot {index + 1}</h3>
            </div>

            <div className="p-4 space-y-4">
              {video.active && video.embedUrl ? (
                <>
                  {/* Preview */}
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <iframe
                      src={video.embedUrl}
                      className="w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground truncate">
                      {video.url}
                    </p>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleActive(index)}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          video.active
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600'
                        }`}
                      >
                        <Eye className="w-4 h-4 inline mr-1" />
                        {video.active ? 'Attivo' : 'Disattivo'}
                      </button>
                      
                      <button
                        onClick={() => handleRemoveVideo(index)}
                        className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {editingIndex === index ? (
                    <div className="space-y-3">
                      <input
                        type="url"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        placeholder="https://www.instagram.com/p/..."
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                        autoFocus
                      />
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveVideo(index)}
                          disabled={!inputUrl}
                          className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                        >
                          Salva
                        </button>
                        <button
                          onClick={() => {
                            setEditingIndex(null)
                            setInputUrl('')
                          }}
                          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                        >
                          Annulla
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingIndex(index)}
                      className="w-full aspect-square flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-all group"
                    >
                      <Plus className="w-12 h-12 text-muted-foreground group-hover:text-orange-500 transition-colors" />
                      <span className="mt-2 text-sm text-muted-foreground group-hover:text-orange-500 transition-colors">
                        Aggiungi Video
                      </span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
