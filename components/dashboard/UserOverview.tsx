"use client";

import { useState, useEffect } from 'react';
import { Calendar, Heart, User, Bell, Star, MapPin, Clock, Euro } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { firestoreService, COLLECTIONS, Booking } from '@/lib/firestore';

export default function UserOverview() {
  const { user, userProfile } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;
      
      try {
        // Get user's bookings
        const userBookings = await firestoreService.getUserBookings(user.uid);
        setBookings(userBookings || []);
      } catch (err: any) {
        console.warn('Bookings not available, using empty array:', err);
        setBookings([]); // Use empty array instead of showing error
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-card rounded-2xl p-6 shadow-sm animate-pulse">
              <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-muted rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300">
        {error}
      </div>
    );
  }

  const stats = {
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    totalSpent: bookings
      .filter(b => b.status === 'confirmed' || b.status === 'completed')
      .reduce((sum, b) => sum + b.totalPrice, 0),
    wishlistItems: userProfile?.profile?.wishlist?.length || 0
  };

  const recentBookings = bookings
    .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
    .slice(0, 3);

  const upcomingBookings = bookings.filter(booking => {
    const departureDate = new Date(booking.personalDetails.departureDate);
    return departureDate > new Date() && booking.status === 'confirmed';
  });

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
            {userProfile?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              Benvenuto, {userProfile?.displayName || 'Viaggiatore'}!
            </h1>
            <p className="text-primary-foreground/80">
              Gestisci le tue prenotazioni e scopri nuove avventure
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Prenotazioni Totali</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalBookings}</p>
            </div>
            <Calendar className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Viaggi Confermati</p>
              <p className="text-2xl font-bold text-foreground">{stats.confirmedBookings}</p>
            </div>
            <Star className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Totale Speso</p>
              <p className="text-2xl font-bold text-foreground">€{stats.totalSpent.toLocaleString()}</p>
            </div>
            <Euro className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Lista Desideri</p>
              <p className="text-2xl font-bold text-foreground">{stats.wishlistItems}</p>
            </div>
            <Heart className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      {/* Upcoming Trips Alert */}
      {upcomingBookings.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">
              Hai {upcomingBookings.length} viaggio{upcomingBookings.length > 1 ? 'i' : ''} in programma!
            </span>
          </div>
        </div>
      )}

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            Prenotazioni Recenti
          </h3>
          {recentBookings.length > 0 ? (
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">
                      Prenotazione #{booking.id?.slice(-6)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Partenza: {booking.personalDetails.departureDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-foreground">
                      €{booking.totalPrice}
                    </p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      booking.status === 'pending' ? 'bg-accent/10 text-accent border border-accent/20' :
                      booking.status === 'confirmed' ? 'bg-primary/10 text-primary border border-primary/20' :
                      booking.status === 'cancelled' ? 'bg-destructive/10 text-destructive border border-destructive/20' :
                      'bg-primary/10 text-primary border border-primary/20'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Nessuna prenotazione ancora
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs">
                Inizia a esplorare i nostri viaggi!
              </p>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Azioni Rapide
          </h3>
          <div className="space-y-3">
            <a
              href="/esperienze"
              className="flex items-center space-x-3 p-3 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
            >
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Esplora Nuovi Viaggi</span>
            </a>
            <a
              href="/dashboard?tab=bookings"
              className="flex items-center space-x-3 p-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Le Mie Prenotazioni</span>
            </a>
            <a
              href="/dashboard?tab=wishlist"
              className="flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span className="font-medium">Lista Desideri</span>
            </a>
            <a
              href="/dashboard?tab=profile"
              className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Il Mio Profilo</span>
            </a>
          </div>
        </div>
      </div>

      {/* Travel Preferences */}
      {userProfile?.profile?.travelPreferences && userProfile.profile.travelPreferences.length > 0 && (
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Le Tue Preferenze di Viaggio
          </h3>
          <div className="flex flex-wrap gap-2">
            {userProfile.profile.travelPreferences.map((preference, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300 rounded-full text-sm"
              >
                {preference}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}