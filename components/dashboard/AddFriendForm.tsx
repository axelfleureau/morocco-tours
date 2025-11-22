"use client";

import { useState } from 'react';
import { UserPlus, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/components/NotificationSystem';

export default function AddFriendForm() {
  const { user } = useAuth();
  const { showSuccess, showError, showWarning } = useNotifications();
  const [friendCode, setFriendCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const validateFriendCode = (code: string): boolean => {
    const friendCodeRegex = /^MOR-[A-Z0-9]{6}$/;
    return friendCodeRegex.test(code);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedCode = friendCode.trim().toUpperCase();

    if (!trimmedCode) {
      setError('Inserisci un codice amico');
      return;
    }

    if (!validateFriendCode(trimmedCode)) {
      setError('Formato codice non valido. Deve essere MOR-XXXXXX');
      return;
    }

    setLoading(true);

    try {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/friends/request', {
        method: 'POST',
        headers,
        body: JSON.stringify({ friendCode: trimmedCode })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send friend request');
      }

      showSuccess(
        'Richiesta Inviata!',
        'La tua richiesta di amicizia è stata inviata con successo.'
      );
      setFriendCode('');
    } catch (error: any) {
      console.error('Error sending friend request:', error);
      
      if (error.message.includes('already friends')) {
        showWarning(
          'Già Amici',
          'Sei già amico con questo utente.'
        );
      } else if (error.message.includes('pending')) {
        showWarning(
          'Richiesta Pending',
          'Hai già inviato una richiesta a questo utente.'
        );
      } else if (error.message.includes('not found')) {
        showError(
          'Codice Non Valido',
          'Nessun utente trovato con questo codice amico.'
        );
      } else {
        showError(
          'Errore',
          'Si è verificato un errore durante l\'invio della richiesta.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border-2 border-border rounded-2xl p-6 lg:p-8 hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Aggiungi Amico
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Inserisci il codice amico per inviare una richiesta
          </p>
        </div>
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
          <UserPlus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="friendCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Codice Amico
          </label>
          <input
            id="friendCode"
            type="text"
            value={friendCode}
            onChange={(e) => {
              setFriendCode(e.target.value.toUpperCase());
              setError('');
            }}
            placeholder="MOR-ABC123"
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            disabled={loading}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !friendCode.trim()}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Invio in corso...</span>
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              <span>Invia Richiesta</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
