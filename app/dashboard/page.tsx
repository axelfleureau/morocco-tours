"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { firestoreService, COLLECTIONS, Booking } from '@/lib/firestore';
import { Calendar, Clock, Users, MessageCircle, Eye, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UserDashboard() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    fetchUserBookings();
  }, [user]);

  const fetchUserBookings = async () => {
    if (!user) return;

    try {
      const userBookings = await firestoreService.getUserBookings(user.uid);
      setBookings(userBookings);
    } catch (err) {
      setError('Errore nel caricamento delle prenotazioni');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confermata';
      case 'pending':
        return 'In attesa';
      case 'cancelled':
        return 'Cancellata';
      case 'completed':
        return 'Completata';
      default:
        return 'Sconosciuto';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (!user) {
    return null; // Router will redirect
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Ciao {user.displayName || user.email}!</h1>
              <p className="text-orange-100 mt-2">Gestisci le tue prenotazioni e scopri nuove avventure</p>
            </div>
            <button
              onClick={signOut}
              className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Prenotazioni Totali</p>
                <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Attesa</p>
                <p className="text-2xl font-bold text-foreground">
                  {bookings.filter(b => b.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confermate</p>
                <p className="text-2xl font-bold text-foreground">
                  {bookings.filter(b => b.status === 'confirmed').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Le Tue Prenotazioni</h2>
            <p className="text-muted-foreground text-sm">Gestisci e monitora tutte le tue prenotazioni</p>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-500" />
              <p className="text-muted-foreground">Caricamento prenotazioni...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-500" />
              <p className="text-red-600">{error}</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-8 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Nessuna prenotazione ancora</h3>
              <p className="text-muted-foreground mb-4">
                Inizia la tua avventura in Marocco prenotando un tour o un'esperienza!
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => router.push('/viaggi')}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all"
                >
                  Esplora Tour
                </button>
                <button
                  onClick={() => router.push('/esperienze')}
                  className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-50 transition-all"
                >
                  Scopri Esperienze
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {bookings.map((booking) => (
                <div key={booking.id} className="p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">
                          {booking.travelId ? `Tour ID: ${booking.travelId}` : `Esperienza ID: ${booking.experienceId}`}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1">{getStatusText(booking.status)}</span>
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Partenza: {booking.personalDetails.departureDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>
                            {booking.personalDetails.travelers} {booking.personalDetails.travelers === 1 ? 'persona' : 'persone'}
                            {booking.personalDetails.children && ` + ${booking.personalDetails.children} bambini`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-orange-600">€{booking.totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {booking.customRequests && (
                    <div className="bg-muted rounded-lg p-3 mb-4">
                      <div className="flex items-start gap-2">
                        <MessageCircle className="w-4 h-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Richieste speciali:</p>
                          <p className="text-sm text-foreground">{booking.customRequests}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      Prenotata il: {booking.createdAt?.toDate?.()?.toLocaleDateString('it-IT') || 'Data non disponibile'}
                    </div>
                    <div className="space-x-2">
                      {booking.status === 'pending' && (
                        <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                          Ti contatteremo presto per confermare
                        </span>
                      )}
                      {booking.status === 'confirmed' && (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                          Prenotazione confermata!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-2">Serve aiuto?</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Contattaci per assistenza con le tue prenotazioni o per organizzare il tuo viaggio perfetto
            </p>
            <button
              onClick={() => router.push('/contatti')}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Contattaci
            </button>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-2">Scopri di più</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Esplora altri tour ed esperienze uniche per arricchire il tuo viaggio in Marocco
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Esplora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}