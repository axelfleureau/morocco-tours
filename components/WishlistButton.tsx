"use client";

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/components/NotificationSystem';

interface WishlistButtonProps {
  itemId: string;
  itemType: 'vehicle' | 'experience' | 'travel' | 'city' | 'activity' | 'service';
  itemTitle: string;
  itemImage?: string;
  itemPrice?: number;
  itemDescription?: string;
  className?: string;
}

export default function WishlistButton({ 
  itemId, 
  itemType, 
  itemTitle, 
  itemImage,
  itemPrice,
  itemDescription,
  className = '' 
}: WishlistButtonProps) {
  const { user } = useAuth();
  const { showSuccess, showInfo, showWarning } = useNotifications();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      checkWishlistStatus();
    } else {
      setIsInWishlist(false);
    }
  }, [user, itemId, itemType]);

  const getAuthHeaders = async (): Promise<HeadersInit> => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    
    if (!user) return headers;
    
    try {
      const token = await (user as any).getIdToken();
      headers.set('Authorization', `Bearer ${token}`);
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    
    return headers;
  };

  const checkWishlistStatus = async () => {
    if (!user) return;

    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`/api/wishlist`, { headers });
      if (!response.ok) return;

      const data = await response.json();
      const found = data.wishlist.some(
        (item: any) => item.itemId === itemId && item.itemType === itemType
      );
      setIsInWishlist(found);
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    }
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!itemId || itemId === 'undefined') {
      console.error('WishlistButton: Invalid itemId', itemId);
      showWarning(
        'Errore',
        'ID elemento non valido. Impossibile aggiungere alla wishlist.'
      );
      return;
    }

    if (!user) {
      showWarning(
        'Login Richiesto',
        'Devi effettuare il login per aggiungere elementi alla wishlist',
        [
          {
            label: 'Vai al Login',
            onClick: () => window.location.href = '/auth/signin',
            variant: 'primary'
          }
        ]
      );
      return;
    }

    if (isLoading) return;

    setIsLoading(true);

    try {
      const headers = await getAuthHeaders();

      if (isInWishlist) {
        // Remove from wishlist
        const response = await fetch(
          `/api/wishlist?itemType=${itemType}&itemId=${itemId}`,
          { method: 'DELETE', headers }
        );

        if (!response.ok) throw new Error('Failed to remove from wishlist');

        setIsInWishlist(false);
        showInfo(
          'Rimosso dalla Wishlist',
          `"${itemTitle}" è stato rimosso dalla tua lista desideri`
        );
      } else {
        // Add to wishlist
        const response = await fetch('/api/wishlist', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            itemType,
            itemId,
            itemData: {
              title: itemTitle,
              image: itemImage,
              price: itemPrice,
              description: itemDescription
            }
          })
        });

        if (!response.ok) throw new Error('Failed to add to wishlist');

        setIsInWishlist(true);
        showSuccess(
          'Aggiunto alla Wishlist',
          `"${itemTitle}" è stato aggiunto alla tua lista desideri`,
          [
            {
              label: 'Vedi Wishlist',
              onClick: () => window.location.href = '/dashboard',
              variant: 'primary'
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      showWarning(
        'Errore',
        'Si è verificato un errore. Riprova più tardi.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={isLoading}
      className={`
        group flex items-center justify-center
        p-2 rounded-full transition-all duration-200
        ${isInWishlist 
          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
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
  );
}
