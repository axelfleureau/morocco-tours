"use client";

import { useState, useEffect } from 'react';
import { Users, Trash2, Eye, Loader2, Mail } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/components/NotificationSystem';

interface Friend {
  friendshipId: string;
  friendId: string;
  friendName: string;
  friendEmail: string;
  friendAvatar?: string;
  since: string;
}

interface FriendsListProps {
  onViewWishlist?: (friendId: string, friendName: string) => void;
}

export default function FriendsList({ onViewWishlist }: FriendsListProps) {
  const { user } = useAuth();
  const { showSuccess, showError, showWarning } = useNotifications();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchFriends();
    }
  }, [user]);

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
        setFriends(data.friends || []);
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFriend = async (friendshipId: string, friendName: string) => {
    const confirmed = window.confirm(
      `Sei sicuro di voler rimuovere ${friendName} dai tuoi amici? Non potrete più vedere le vostre wishlist condivise.`
    );

    if (!confirmed) return;

    setRemovingId(friendshipId);
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`/api/friends/${friendshipId}`, {
        method: 'DELETE',
        headers
      });

      if (!response.ok) {
        throw new Error('Failed to remove friend');
      }

      showSuccess(
        'Amico Rimosso',
        `${friendName} è stato rimosso dalla tua lista amici.`
      );
      
      await fetchFriends();
    } catch (error) {
      console.error('Error removing friend:', error);
      showError(
        'Errore',
        'Si è verificato un errore durante la rimozione dell\'amico.'
      );
    } finally {
      setRemovingId(null);
    }
  };

  const handleViewWishlist = (friendId: string, friendName: string) => {
    if (onViewWishlist) {
      onViewWishlist(friendId, friendName);
    } else {
      showWarning(
        'Funzione non disponibile',
        'Passa alla tab "Condivisioni" per vedere le wishlist degli amici.'
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

  return (
    <div className="bg-card border-2 border-border rounded-2xl p-6 lg:p-8 hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            I Tuoi Amici
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {friends.length > 0
              ? `Hai ${friends.length} ${friends.length === 1 ? 'amico' : 'amici'}`
              : 'Ancora nessun amico'}
          </p>
        </div>
        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
          <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
      </div>

      {friends.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400 dark:text-gray-600" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Non hai ancora amici
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Condividi il tuo codice amico o aggiungi qualcuno usando il suo codice!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {friends.map((friend) => (
            <div
              key={friend.friendshipId}
              className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-xl font-semibold flex-shrink-0">
                  {friend.friendName?.charAt(0)?.toUpperCase() || friend.friendEmail?.charAt(0)?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white truncate">
                    {friend.friendName || 'Utente'}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{friend.friendEmail}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleViewWishlist(friend.friendId, friend.friendName)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">Vedi Wishlist</span>
                </button>
                <button
                  onClick={() => handleRemoveFriend(friend.friendshipId, friend.friendName)}
                  disabled={removingId === friend.friendshipId}
                  className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Rimuovi"
                >
                  {removingId === friend.friendshipId ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
