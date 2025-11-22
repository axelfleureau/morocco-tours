'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'

interface WishlistButtonProps {
  contentItem: {
    id: string
    type: string
    title: string
    image?: string | null
    price?: number | null
    description?: string
  }
  variant?: 'default' | 'icon'
  className?: string
}

export function WishlistButton({ contentItem, variant = 'default', className = '' }: WishlistButtonProps) {
  const { user } = useAuth()
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if (!user) {
      setIsInWishlist(false)
      return
    }
    
    const checkWishlist = async () => {
      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/wishlist', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        
        if (response.ok) {
          const data = await response.json()
          const found = data.wishlist?.some((item: any) => 
            item.itemId === contentItem.id && item.itemType === contentItem.type
          )
          setIsInWishlist(found)
        }
      } catch (error) {
        console.error('Error checking wishlist:', error)
      }
    }
    
    checkWishlist()
  }, [user, contentItem.id, contentItem.type])
  
  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      toast.error('Devi effettuare il login per usare la wishlist', {
        action: {
          label: 'Login',
          onClick: () => window.location.href = '/auth/signin'
        }
      })
      return
    }
    
    setLoading(true)
    
    try {
      const token = await user.getIdToken()
      
      if (isInWishlist) {
        const response = await fetch(
          `/api/wishlist?itemType=${contentItem.type}&itemId=${contentItem.id}`,
          {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          }
        )
        
        if (response.ok) {
          setIsInWishlist(false)
          toast.success('Rimosso dalla wishlist')
        } else {
          toast.error('Errore nella rimozione')
        }
      } else {
        const response = await fetch('/api/wishlist', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            itemType: contentItem.type,
            itemId: contentItem.id,
            itemData: {
              title: contentItem.title,
              image: contentItem.image,
              price: contentItem.price,
              description: contentItem.description
            }
          })
        })
        
        if (response.ok) {
          setIsInWishlist(true)
          toast.success('Aggiunto alla wishlist', {
            action: {
              label: 'Vedi',
              onClick: () => window.location.href = '/dashboard?tab=wishlist'
            }
          })
        } else {
          toast.error('Errore nell\'aggiunta')
        }
      }
    } catch (error) {
      console.error('Wishlist error:', error)
      toast.error('Si è verificato un errore')
    } finally {
      setLoading(false)
    }
  }
  
  if (variant === 'icon') {
    return (
      <button
        onClick={toggleWishlist}
        disabled={loading}
        className={`
          group flex items-center justify-center
          p-2 rounded-full transition-all duration-200
          ${isInWishlist 
            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
          }
          ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
          shadow-md hover:shadow-lg
          ${className}
        `}
        aria-label={isInWishlist ? 'Rimuovi dalla wishlist' : 'Aggiungi alla wishlist'}
        title={isInWishlist ? 'Rimuovi dalla wishlist' : 'Aggiungi alla wishlist'}
      >
        <Heart 
          className={`w-5 h-5 transition-all ${isInWishlist ? 'fill-current' : ''}`}
        />
      </button>
    )
  }
  
  return (
    <Button 
      variant={isInWishlist ? "default" : "outline"}
      onClick={toggleWishlist}
      disabled={loading}
      className={className}
    >
      <Heart 
        className={`w-4 h-4 mr-2 ${isInWishlist ? 'fill-current' : ''}`}
      />
      {isInWishlist ? 'Salvato' : 'Salva'}
    </Button>
  )
}
