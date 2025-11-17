"use client"

import { Calendar, Clock, User } from 'lucide-react'
import WishlistButton from '@/components/WishlistButton'

interface BlogPostHeaderProps {
  post: {
    id: string
    slug: string
    title: string
    cover?: string
    author: string
    date: string
    readingMinutes: number
    excerpt: string
  }
}

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <header className="relative">
      <div className="h-[280px] sm:h-[360px] lg:h-[460px] relative overflow-hidden">
        <img 
          src={post.cover || "/placeholder.svg?height=460&width=800"} 
          alt={post.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Wishlist Button - top right */}
        <div className="absolute top-4 right-4 z-20">
          <WishlistButton
            itemId={`blog-${post.slug}`}
            itemType="activity"
            itemTitle={post.title}
            itemImage={post.cover}
            itemDescription={post.excerpt}
          />
        </div>
        
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <div className="max-w-4xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString("it-IT")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingMinutes} min di lettura</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
