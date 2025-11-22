'use client'

import { useState, useEffect } from 'react'

export interface ContentItem {
  id: string
  type: 'experience' | 'travel' | 'service' | 'blog'
  title: string
  slug: string
  description: string | null
  image: string | null
  category: string | null
  published: boolean
  featured: boolean
  bookable: boolean
  price: number | null
  priceNote: string | null
  duration: string | null
  metadata: any
  createdAt: Date
  updatedAt: Date
  publishedAt: Date | null
}

export interface UseContentOptions {
  type: 'experience' | 'travel' | 'service' | 'blog'
  featured?: boolean
  bookable?: boolean
  category?: string
  limit?: number
  offset?: number
}

export interface UseContentResult {
  items: ContentItem[]
  total: number
  hasMore: boolean
  loading: boolean
  error: Error | null
  refetch: () => void
}

export function useContent(options: UseContentOptions): UseContentResult {
  const [items, setItems] = useState<ContentItem[]>([])
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchContent = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams({ type: options.type })
      if (options.featured !== undefined) params.set('featured', String(options.featured))
      if (options.bookable !== undefined) params.set('bookable', String(options.bookable))
      if (options.category) params.set('category', options.category)
      if (options.limit) params.set('limit', String(options.limit))
      if (options.offset) params.set('offset', String(options.offset))
      
      const response = await fetch(`/api/content?${params}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.statusText}`)
      }
      
      const data = await response.json()
      setItems(data.items || [])
      setTotal(data.total || 0)
      setHasMore(data.hasMore || false)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [options.type, options.featured, options.bookable, options.category, options.limit, options.offset])

  return {
    items,
    total,
    hasMore,
    loading,
    error,
    refetch: fetchContent
  }
}
