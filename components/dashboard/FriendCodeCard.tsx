"use client";

import { useState, useEffect } from 'react';
import { Copy, Loader2, UserPlus, Ticket } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/components/NotificationSystem';

export default function FriendCodeCard() {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const [friendCode, setFriendCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (user) {
      fetchFriendCode();
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

  const fetchFriendCode = async () => {
    setLoading(true);
    try {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/friends/code', { headers });
      
      if (response.ok) {
        const data = await response.json();
        setFriendCode(data.friendCode);
      }
    } catch (error) {
      console.error('Error fetching friend code:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateFriendCode = async () => {
    setGenerating(true);
    try {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/friends/code/generate', {
        method: 'POST',
        headers
      });

      if (!response.ok) {
        throw new Error('Failed to generate friend code');
      }

      const data = await response.json();
      setFriendCode(data.friendCode);
      showSuccess(
        'Codice Amico Generato',
        'Il tuo codice amico è stato creato con successo!'
      );
    } catch (error) {
      console.error('Error generating friend code:', error);
      showError(
        'Errore',
        'Si è verificato un errore durante la generazione del codice.'
      );
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (!friendCode) return;

    try {
      await navigator.clipboard.writeText(friendCode);
      showSuccess(
        'Codice Copiato!',
        'Il tuo codice amico è stato copiato negli appunti.'
      );
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      showError(
        'Errore',
        'Impossibile copiare il codice negli appunti.'
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
    <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-6 lg:p-8 hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Il Tuo Codice Amico
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Condividi questo codice con i tuoi amici per connettervi
          </p>
        </div>
        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
          <Ticket className="w-6 h-6 text-orange-600 dark:text-orange-400" />
        </div>
      </div>

      {friendCode ? (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 border-2 border-dashed border-orange-300 dark:border-orange-700 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 tracking-wider mb-2">
              {friendCode}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Il tuo codice univoco
            </p>
          </div>

          <button
            onClick={copyToClipboard}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg"
          >
            <Copy className="w-5 h-5" />
            <span>Copia Codice</span>
          </button>
        </div>
      ) : (
        <button
          onClick={generateFriendCode}
          disabled={generating}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {generating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generazione...</span>
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              <span>Genera il Tuo Codice</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
