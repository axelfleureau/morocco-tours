"use client";

import { useState, useEffect } from 'react';
import { Check, X, Loader2, UserCheck, Mail } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/components/NotificationSystem';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';

interface FriendRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  requesterAvatar?: string;
  createdAt: string;
}

export default function FriendRequests() {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchRequests();
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

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/friends/requests', { headers });
      
      if (response.ok) {
        const data = await response.json();
        setRequests(data.requests || []);
      }
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (friendshipId: string) => {
    setProcessingId(friendshipId);
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`/api/friends/accept/${friendshipId}`, {
        method: 'POST',
        headers
      });

      if (!response.ok) {
        throw new Error('Failed to accept request');
      }

      showSuccess(
        'Richiesta Accettata!',
        'Ora siete amici! Potete vedere le vostre wishlist condivise.'
      );
      
      await fetchRequests();
    } catch (error) {
      console.error('Error accepting friend request:', error);
      showError(
        'Errore',
        'Si è verificato un errore durante l\'accettazione della richiesta.'
      );
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (friendshipId: string) => {
    setProcessingId(friendshipId);
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`/api/friends/reject/${friendshipId}`, {
        method: 'POST',
        headers
      });

      if (!response.ok) {
        throw new Error('Failed to reject request');
      }

      showSuccess(
        'Richiesta Rifiutata',
        'La richiesta di amicizia è stata rifiutata.'
      );
      
      await fetchRequests();
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      showError(
        'Errore',
        'Si è verificato un errore durante il rifiuto della richiesta.'
      );
    } finally {
      setProcessingId(null);
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
            Richieste di Amicizia
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {requests.length > 0
              ? `Hai ${requests.length} ${requests.length === 1 ? 'richiesta in attesa' : 'richieste in attesa'}`
              : 'Nessuna richiesta pending'}
          </p>
        </div>
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
          <UserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserCheck className="w-8 h-8 text-gray-400 dark:text-gray-600" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Al momento non hai richieste di amicizia
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700 transition-all"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-lg font-semibold flex-shrink-0">
                  {request.requesterName?.charAt(0)?.toUpperCase() || request.requesterEmail?.charAt(0)?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                    {request.requesterName || 'Utente'}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{request.requesterEmail}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(request.createdAt), {
                      addSuffix: true,
                      locale: it
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handleAccept(request.id)}
                  disabled={processingId === request.id}
                  className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Accetta"
                >
                  {processingId === request.id ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Check className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  disabled={processingId === request.id}
                  className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Rifiuta"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
