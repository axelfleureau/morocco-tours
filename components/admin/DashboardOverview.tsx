"use client";

import { useState, useEffect } from 'react';
import { Users, Package, Calendar, TrendingUp, MapPin, DollarSign, Clock, Star } from 'lucide-react';
import { AdminService, DashboardStats } from '@/lib/admin';

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        const dashboardStats = await AdminService.getDashboardStats();
        setStats(dashboardStats);
      } catch (err: any) {
        setError('Errore nel caricamento delle statistiche');
        console.error('Dashboard stats error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300">
          {error}
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const statCards = [
    {
      title: "Utenti Totali",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Viaggi Pubblicati",
      value: stats.totalTravels,
      icon: MapPin,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Prenotazioni",
      value: stats.totalBookings,
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      title: "Fatturato Totale",
      value: `€${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
        <div className="text-sm text-gray-500">
          Ultimo aggiornamento: {new Date().toLocaleString('it-IT')}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pending Bookings Alert */}
      {stats.pendingBookings > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-yellow-600" />
            <span className="text-yellow-800 dark:text-yellow-200 font-medium">
              {stats.pendingBookings} prenotazioni in attesa di conferma
            </span>
          </div>
        </div>
      )}

      {/* Quick Stats Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Prenotazioni Recenti</h3>
          {stats.recentBookings.length > 0 ? (
            <div className="space-y-3">
              {stats.recentBookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-sm text-gray-900 dark:text-white">
                      {booking.personalDetails.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {booking.personalDetails.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">
                      €{booking.totalPrice}
                    </p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm">Nessuna prenotazione recente</p>
          )}
        </div>

        {/* Popular Travels */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Viaggi Popolari</h3>
          {stats.popularTravels.length > 0 ? (
            <div className="space-y-3">
              {stats.popularTravels.slice(0, 5).map((travel) => (
                <div key={travel.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900 dark:text-white">
                      {travel.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {travel.rating} ({travel.reviews} recensioni)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">
                      €{travel.price}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {travel.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm">Nessun viaggio disponibile</p>
          )}
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex items-center space-x-3">
            <Package className="w-8 h-8 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Esperienze</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.totalExperiences}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-emerald-600" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tasso Conversione</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {stats.totalBookings > 0 ? Math.round((stats.totalBookings / stats.totalUsers) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-8 h-8 text-amber-600" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Prezzo Medio</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                €{stats.totalBookings > 0 ? Math.round(stats.totalRevenue / stats.totalBookings) : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}