"use client";

import { useState, useEffect } from 'react';
import { Share2, Loader2, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/components/NotificationSystem';
import { TravelCard } from '@/components/cards/TravelCard';
import { ExperienceCard } from '@/components/cards/ExperienceCard';
import { VehicleCard } from '@/components/cards/VehicleCard';

interface Friend {
  friendId: string;
  friendName: string;
  friendEmail: string;
}

interface WishlistItem {
  id: string;
  itemType: 'travel' | 'experience' | 'vehicle' | 'city' | 'activity' | 'service';
  itemId: string;
  itemData: any;
  addedAt: string;
}

export default function SharedCollections() {
  const { user } = useAuth();
  const { showError } = useNotifications();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriendId, setSelectedFriendId] = useState<string>('');
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchFriends();
    }
  }, [user]);

  useEffect(() => {
    if (selectedFriendId) {
      fetchFriendWishlist(selectedFriendId);
    } else {
      setWishlistItems([]);
    }
  }, [selectedFriendId]);

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

  const fetchFriends = async () => {
    setLoading(true);
    try {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/friends', { headers });
      
      if (response.ok) {
        const data = await response.json();
        const friendsList = data.friends || [];
        setFriends(friendsList);
        
        if (friendsList.length > 0 && !selectedFriendId) {
          setSelectedFriendId(friendsList[0].friendId);
        }
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFriendWishlist = async (friendId: string) => {
    setLoadingWishlist(true);
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`/api/friends/shared/wishlist/${friendId}`, { headers });
      
      if (response.ok) {
        const data = await response.json();
        setWishlistItems(data.wishlist || []);
      } else {
        setWishlistItems([]);
      }
    } catch (error) {
      console.error('Error fetching friend wishlist:', error);
      showError(
        'Errore',
        'Impossibile caricare la wishlist dell\'amico.'
      );
      setWishlistItems([]);
    } finally {
      setLoadingWishlist(false);
    }
  };

  const selectedFriend = friends.find(f => f.friendId === selectedFriendId);

  const renderWishlistItem = (item: WishlistItem) => {
    const itemData = item.itemData || {};
    
    switch (item.itemType) {
      case 'travel':
        return (
          <div key={item.id} className="relative">
            <div className="absolute top-4 left-4 z-10 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Read-only
            </div>
            <TravelCard
              id={item.itemId}
              image={itemData.image || itemData.images?.[0] || '/placeholder.svg'}
              title={itemData.title || 'Titolo non disponibile'}
              description={itemData.description}
              price={itemData.price}
              duration={itemData.duration}
              rating={itemData.rating}
              location={itemData.location}
              ctas={[]}
            />
          </div>
        );
      
      case 'experience':
        return (
          <div key={item.id} className="relative">
            <div className="absolute top-4 left-4 z-10 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Read-only
            </div>
            <ExperienceCard
              id={item.itemId}
              image={itemData.image || itemData.images?.[0] || '/placeholder.svg'}
              title={itemData.title || 'Titolo non disponibile'}
              description={itemData.description}
              price={itemData.price}
              duration={itemData.duration}
              difficulty={itemData.difficulty}
              ctas={[]}
            />
          </div>
        );
      
      case 'vehicle':
        return (
          <div key={item.id} className="relative">
            <div className="absolute top-4 left-4 z-10 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Read-only
            </div>
            <VehicleCard
              id={item.itemId}
              image={itemData.image || itemData.images?.[0] || '/placeholder.svg'}
              title={itemData.title || 'Titolo non disponibile'}
              description={itemData.description}
              pricePerDay={itemData.price || itemData.pricePerDay}
              seats={itemData.seats}
              transmission={itemData.transmission}
              ctas={[]}
            />
          </div>
        );
      
      default:
        return (
          <div key={item.id} className="p-6 bg-card border-2 border-border rounded-2xl">
            <div className="mb-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold inline-block">
              Read-only
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {itemData.title || 'Elemento Wishlist'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {itemData.description || 'Nessuna descrizione disponibile'}
            </p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="bg-card border-2 border-border rounded-2xl p-6 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (friends.length === 0) {
    return (
      <div className="bg-card border-2 border-border rounded-2xl p-6 lg:p-8">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Share2 className="w-8 h-8 text-gray-400 dark:text-gray-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Nessun Amico
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Aggiungi degli amici per vedere le loro wishlist condivise
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border-2 border-border rounded-2xl p-6 lg:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Wishlist Condivise
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Esplora le wishlist dei tuoi amici
            </p>
          </div>
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
            <Share2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Seleziona Amico
          </label>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white hover:border-orange-300 dark:hover:border-orange-700 transition-all"
            >
              <span className="truncate">
                {selectedFriend ? selectedFriend.friendName : 'Seleziona un amico'}
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                {friends.map((friend) => (
                  <button
                    key={friend.friendId}
                    onClick={() => {
                      setSelectedFriendId(friend.friendId);
                      setDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      selectedFriendId === friend.friendId ? 'bg-orange-50 dark:bg-orange-900/20' : ''
                    }`}
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {friend.friendName}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {friend.friendEmail}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {loadingWishlist ? (
        <div className="bg-card border-2 border-border rounded-2xl p-12 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : wishlistItems.length === 0 ? (
        <div className="bg-card border-2 border-border rounded-2xl p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Share2 className="w-8 h-8 text-gray-400 dark:text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Wishlist Vuota
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {selectedFriend?.friendName} non ha ancora aggiunto elementi alla wishlist
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map(renderWishlistItem)}
        </div>
      )}
    </div>
  );
}
