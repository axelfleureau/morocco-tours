"use client";

import { useState, useEffect } from 'react';
import { Heart, Search, Filter, MapPin, Star, Euro, Calendar, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { firestoreService } from '@/lib/firestore';

interface WishlistItem {
  id: string;
  type: 'travel' | 'experience';
  title: string;
  description: string;
  price: number;
  image: string;
  location: string;
  rating: number;
  addedAt: Date;
}

export default function UserWishlist() {
  const { user, userProfile } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    const loadWishlist = async () => {
      if (!user || !userProfile?.profile?.wishlist || userProfile.profile.wishlist.length === 0) {
        setLoading(false);
        return;
      }
      
      try {
        // Fetch real travels and experiences data from Firestore
        const [travels, experiences] = await Promise.all([
          firestoreService.getPublishedTravels(),
          firestoreService.getPublishedExperiences()
        ]);

        // Filter items that are in the user's wishlist
        const wishlistTravels = travels.filter(travel => 
          travel.id && userProfile.profile.wishlist.includes(travel.id)
        ).map(travel => ({
          id: travel.id!,
          type: 'travel' as const,
          title: travel.title,
          description: travel.description,
          price: travel.price,
          image: travel.images?.[0] || '/images/sahara-adventure.png',
          location: travel.category || 'Marocco',
          rating: travel.rating || 4.5,
          addedAt: new Date() // We don't have the exact date it was added to wishlist
        }));

        const wishlistExperiences = experiences.filter(experience => 
          experience.id && userProfile.profile.wishlist.includes(experience.id)
        ).map(experience => ({
          id: experience.id!,
          type: 'experience' as const,
          title: experience.title,
          description: experience.description,
          price: experience.price,
          image: experience.images?.[0] || '/images/couple-hammam.jpg',
          location: experience.location || experience.category || 'Marocco',
          rating: experience.rating || 4.3,
          addedAt: new Date() // We don't have the exact date it was added to wishlist
        }));

        const allWishlistItems = [...wishlistTravels, ...wishlistExperiences];
        setWishlistItems(allWishlistItems);
      } catch (err: any) {
        setError('Errore nel caricamento della lista desideri');
        console.error('Wishlist loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [user, userProfile]);

  const filteredItems = wishlistItems.filter(item => {
    const matchesSearch = !searchTerm || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || item.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const removeFromWishlist = async (itemId: string) => {
    if (!user || !userProfile) return;
    
    try {
      // Update user profile in Firestore to remove item from wishlist
      const updatedWishlist = userProfile.profile.wishlist.filter(id => id !== itemId);
      
      await firestoreService.update('users', user.uid, {
        'profile.wishlist': updatedWishlist
      });

      // Update local state immediately for better UX
      setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      setError('Errore nella rimozione dalla lista desideri');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Lista Desideri</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-card rounded-2xl shadow-sm animate-pulse">
              <div className="h-48 bg-muted rounded-t-2xl"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
                <div className="h-6 bg-muted rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Lista Desideri</h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Lista Desideri</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Heart className="w-4 h-4" />
          <span>{filteredItems.length} di {wishlistItems.length} elementi</span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cerca per titolo o destinazione..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-8 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            >
              <option value="all">Tutti</option>
              <option value="travel">Viaggi</option>
              <option value="experience">Esperienze</option>
            </select>
          </div>
        </div>
      </div>

      {/* Wishlist Items */}
      {filteredItems.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-border hover:shadow-lg transition-all group"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.type === 'travel'
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20'
                  }`}>
                    {item.type === 'travel' ? 'Viaggio' : 'Esperienza'}
                  </span>
                </div>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {item.title}
                  </h3>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{item.rating.toFixed(1)}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center space-x-2 mb-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Euro className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {item.price}
                    </span>
                    <span className="text-sm text-gray-500">/ persona</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {item.addedAt.toLocaleDateString('it-IT')}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all">
                    Prenota Ora
                  </button>
                  <button className="w-full border border-border text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Vedi Dettagli
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-border text-center">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {wishlistItems.length === 0 ? 'Lista desideri vuota' : 'Nessun elemento trovato'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {wishlistItems.length === 0 
              ? 'Inizia ad aggiungere i tuoi viaggi ed esperienze preferiti alla lista desideri!'
              : 'Prova a cambiare i filtri di ricerca per trovare gli elementi che stai cercando.'
            }
          </p>
          {wishlistItems.length === 0 && (
            <a
              href="/viaggi"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Esplora Viaggi
            </a>
          )}
        </div>
      )}

      {/* Summary Stats */}
      {wishlistItems.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="flex items-center space-x-3">
              <MapPin className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Viaggi</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {wishlistItems.filter(item => item.type === 'travel').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="flex items-center space-x-3">
              <Star className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Esperienze</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {wishlistItems.filter(item => item.type === 'experience').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="flex items-center space-x-3">
              <Euro className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Valore Totale</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  €{wishlistItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}