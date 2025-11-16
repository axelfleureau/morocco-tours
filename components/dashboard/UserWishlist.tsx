"use client";

import { useState, useEffect } from 'react';
import { Heart, Search, Filter, MapPin, Star, Euro, Calendar, Trash2, Car } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { firestoreService } from '@/lib/firestore';
import { WishlistItem as AuthWishlistItem } from '@/lib/auth';

interface DisplayWishlistItem {
  id: string;
  type: 'vehicle' | 'experience' | 'travel' | 'city' | 'activity';
  title: string;
  description?: string;
  price?: number;
  image?: string;
  location?: string;
  rating?: number;
  addedAt: Date;
}

const typeLabels = {
  vehicle: 'Veicolo',
  experience: 'Esperienza',
  travel: 'Viaggio',
  city: 'Città',
  activity: 'Attività'
};

const typeColors = {
  vehicle: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  experience: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  travel: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  city: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  activity: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20'
};

export default function UserWishlist() {
  const { user, userProfile } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<DisplayWishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    const loadWishlist = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const wishlistItemsData = userProfile?.profile?.wishlistItems || [];
      
      if (wishlistItemsData.length === 0) {
        setLoading(false);
        return;
      }
      
      try {
        const displayItems: DisplayWishlistItem[] = wishlistItemsData.map((item: AuthWishlistItem) => ({
          id: item.id,
          type: item.type,
          title: item.title,
          description: item.description,
          price: item.price,
          image: item.image,
          location: 'Marocco',
          rating: 4.5,
          addedAt: new Date()
        }));
        
        setWishlistItems(displayItems);
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
      (item.location?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || item.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const removeFromWishlist = async (itemId: string, itemType: string) => {
    if (!user || !userProfile) return;
    
    try {
      const updatedWishlistItems = (userProfile.profile.wishlistItems || []).filter(
        (item: AuthWishlistItem) => !(item.id === itemId && item.type === itemType)
      );
      const updatedWishlist = (userProfile.profile.wishlist || []).filter((id: string) => id !== itemId);
      
      await firestoreService.update('users', user.uid, {
        'profile.wishlistItems': updatedWishlistItems,
        'profile.wishlist': updatedWishlist
      });

      setWishlistItems(prev => prev.filter(item => !(item.id === itemId && item.type === itemType)));
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
              <option value="vehicle">Veicoli</option>
              <option value="experience">Esperienze</option>
              <option value="travel">Viaggi</option>
              <option value="city">Città</option>
              <option value="activity">Attività</option>
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
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${typeColors[item.type]}`}>
                    {typeLabels[item.type]}
                  </span>
                </div>
                <button
                  onClick={() => removeFromWishlist(item.id, item.type)}
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
            <div className="flex flex-col items-center text-center">
              <Car className="w-8 h-8 text-blue-600 mb-2" />
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Veicoli</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {wishlistItems.filter(item => item.type === 'vehicle').length}
              </p>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
            <div className="flex flex-col items-center text-center">
              <Star className="w-8 h-8 text-green-600 mb-2" />
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Esperienze</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {wishlistItems.filter(item => item.type === 'experience').length}
              </p>
            </div>
          </div>
          
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
            <div className="flex flex-col items-center text-center">
              <MapPin className="w-8 h-8 text-orange-600 mb-2" />
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Viaggi</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {wishlistItems.filter(item => item.type === 'travel').length}
              </p>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
            <div className="flex flex-col items-center text-center">
              <Heart className="w-8 h-8 text-pink-600 mb-2" />
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Totale</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {wishlistItems.length}
              </p>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
            <div className="flex flex-col items-center text-center">
              <Euro className="w-8 h-8 text-purple-600 mb-2" />
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Valore</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                €{wishlistItems.reduce((sum, item) => sum + (item.price || 0), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}