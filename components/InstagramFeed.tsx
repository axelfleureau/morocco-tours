"use client"

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import Script from 'next/script'

interface InstagramVideo {
  id: string
  url: string
  embedUrl: string
  slot: number
  active: boolean
  order: number
}

export default function InstagramFeed() {
  const [videos, setVideos] = useState<InstagramVideo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVideos()
  }, [])

  useEffect(() => {
    if (videos.length > 0 && typeof window !== 'undefined' && (window as any).instgrm) {
      (window as any).instgrm.Embeds.process()
    }
  }, [videos])

  const fetchVideos = async () => {
    try {
      const videosRef = collection(db, 'instagram_videos')
      const q = query(
        videosRef,
        where('active', '==', true),
        orderBy('order', 'asc')
      )
      const snapshot = await getDocs(q)
      
      if (!snapshot.empty) {
        const fetchedVideos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as InstagramVideo[]
        
        setVideos(fetchedVideos)
      }
    } catch (error) {
      console.error('Error fetching Instagram videos:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-card rounded-2xl overflow-hidden shadow-lg h-96 animate-pulse"
          >
            <div className="w-full h-full bg-muted" />
          </div>
        ))}
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Nessun video Instagram disponibile al momento
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <blockquote 
              className="instagram-media" 
              data-instgrm-permalink={`${video.url}?utm_source=ig_embed&utm_campaign=loading`}
              data-instgrm-version="14"
              style={{
                background: '#FFF',
                border: 0,
                borderRadius: '3px',
                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
                margin: '1px',
                maxWidth: '540px',
                minWidth: '326px',
                padding: 0,
                width: '99.375%'
              }}
            >
              <div style={{ padding: '16px' }}>
                <a 
                  href={`${video.url}?utm_source=ig_embed&utm_campaign=loading`}
                  style={{
                    background: '#FFFFFF',
                    lineHeight: 0,
                    padding: '0 0',
                    textAlign: 'center',
                    textDecoration: 'none',
                    width: '100%'
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visualizza post su Instagram
                </a>
              </div>
            </blockquote>
          </div>
        ))}
      </div>

      {/* Instagram Embed Script */}
      <Script
        async
        src="//www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== 'undefined' && (window as any).instgrm) {
            (window as any).instgrm.Embeds.process()
          }
        }}
      />
    </>
  )
}
