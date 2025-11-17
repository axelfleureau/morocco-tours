"use client";

import { useState, useEffect } from 'react';
import { Calendar, Download, Search, Filter, Eye, Star, MapPin, Users, Plane, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { firestoreService, Booking } from '@/lib/firestore';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { COLLECTIONS, CustomTripRequest } from '@/lib/firestore-schema';

export default function UserBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [customTrips, setCustomTrips] = useState<CustomTripRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedTrip, setExpandedTrip] = useState<string | null>(null);

  useEffect(() => {
    const loadBookings = async () => {
      if (!user) return;
      
      try {
        // Load normal bookings
        const userBookings = await firestoreService.getUserBookings(user.uid);
        setBookings(userBookings);
        
        // Load custom trip requests
        const customTripsQuery = query(
          collection(db, COLLECTIONS.customTripRequests),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const customTripsSnap = await getDocs(customTripsQuery);
        const customTripsData = customTripsSnap.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        })) as CustomTripRequest[];
        setCustomTrips(customTripsData);
        
      } catch (err: any) {
        setError('Errore nel caricamento delle prenotazioni');
        console.error('Bookings loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [user]);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = !searchTerm || 
      booking.personalDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-primary/10 text-primary border border-primary/20';
      case 'pending':
        return 'bg-accent/10 text-accent border border-accent/20';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border border-destructive/20';
      case 'completed':
        return 'bg-primary/10 text-primary border border-primary/20';
      default:
        return 'bg-muted text-muted-foreground border border-border';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confermata';
      case 'pending': return 'In Attesa';
      case 'cancelled': return 'Cancellata';
      case 'completed': return 'Completata';
      default: return status;
    }
  };

  const isUpcoming = (departureDate: string) => {
    return new Date(departureDate) > new Date();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Le Mie Prenotazioni</h2>
        <div className="bg-card rounded-2xl p-6 shadow-sm">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Le Mie Prenotazioni</h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Le Mie Prenotazioni</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-muted-foreground">{filteredBookings.length} di {bookings.length} prenotazioni</span>
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
              placeholder="Cerca per nome o ID prenotazione..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            >
              <option value="all">Tutti gli stati</option>
              <option value="pending">In Attesa</option>
              <option value="confirmed">Confermate</option>
              <option value="completed">Completate</option>
              <option value="cancelled">Cancellate</option>
            </select>
          </div>
        </div>
      </div>

      {/* Custom Trip Requests Section */}
      {customTrips.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Plane className="w-5 h-5 text-orange-600" />
              Richieste Viaggi su Misura
            </h3>
            <span className="text-sm text-muted-foreground">{customTrips.length} richieste</span>
          </div>

          {customTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-2xl p-6 shadow-sm border border-orange-200 dark:border-orange-800"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-foreground">{trip.name}</h4>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      trip.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      trip.status === 'reviewed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                      trip.status === 'quoted' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                      trip.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                    }`}>
                      {trip.status === 'pending' ? 'In Attesa' : trip.status === 'reviewed' ? 'Esaminata' : trip.status === 'quoted' ? 'Preventivo Inviato' : trip.status === 'confirmed' ? 'Confermata' : 'Cancellata'}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{trip.departureDate} → {trip.returnDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{trip.travelers} adulti{trip.children > 0 && `, ${trip.children} bambini`}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{trip.destinations.slice(0, 2).join(', ')}{trip.destinations.length > 2 && '...'}</span>
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      Budget: €{trip.budget}/persona
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setExpandedTrip(expandedTrip === trip.id ? null : trip.id)}
                  className="ml-4 p-2 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-lg transition-colors"
                >
                  {expandedTrip === trip.id ? 
                    <ChevronUp className="w-5 h-5 text-orange-600" /> : 
                    <ChevronDown className="w-5 h-5 text-orange-600" />
                  }
                </button>
              </div>

              {/* Expanded Details */}
              {expandedTrip === trip.id && (
                <div className="mt-4 pt-4 border-t border-orange-200 dark:border-orange-800 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-sm text-foreground mb-2">Contatti</h5>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Email: {trip.email}</p>
                        <p>Telefono: {trip.phone}</p>
                        <p>Città partenza: {trip.departureCity}</p>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm text-foreground mb-2">Destinazioni</h5>
                      <div className="flex flex-wrap gap-1">
                        {trip.destinations.map(dest => (
                          <span key={dest} className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs">
                            {dest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-sm text-foreground mb-2">Interessi</h5>
                    <div className="flex flex-wrap gap-1">
                      {trip.interests.map(interest => (
                        <span key={interest} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-sm text-foreground mb-2">Preferenze Viaggio</h5>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Alloggio: {trip.accommodation}</p>
                        <p>Trasporto: {trip.transport}</p>
                        <p>Ritmo: {trip.travelPace}</p>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm text-foreground mb-2">Info Aggiuntive</h5>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        {trip.occasion && <p>Occasione: {trip.occasion}</p>}
                        {trip.dietaryRestrictions && <p>Restrizioni alimentari: {trip.dietaryRestrictions}</p>}
                        {trip.accessibility && <p>Accessibilità: {trip.accessibility}</p>}
                      </div>
                    </div>
                  </div>

                  {trip.specialRequests && (
                    <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-3">
                      <h5 className="font-semibold text-sm text-foreground mb-1">Richieste Speciali</h5>
                      <p className="text-sm text-muted-foreground">{trip.specialRequests}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-orange-200 dark:border-orange-800">
                    <div className="text-xs text-muted-foreground">
                      Richiesto il: {new Date(trip.createdAt.seconds * 1000).toLocaleDateString('it-IT')}
                    </div>
                    <div className="flex gap-2">
                      {trip.sentToWhatsApp && (
                        <button
                          onClick={() => {
                            const msg = encodeURIComponent(`Ciao! Vorrei informazioni sulla mia richiesta viaggio su misura del ${new Date(trip.createdAt.seconds * 1000).toLocaleDateString('it-IT')} per ${trip.destinations.join(', ')}.`);
                            window.open(`https://wa.me/393292333370?text=${msg}`, "_blank");
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Contatta WhatsApp
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      Prenotazione #{booking.id?.slice(-8).toUpperCase()}
                    </h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {getStatusText(booking.status)}
                    </span>
                    {isUpcoming(booking.personalDetails.departureDate) && booking.status === 'confirmed' && (
                      <span className="px-2 py-1 text-xs bg-primary/10 text-primary border border-primary/20 rounded-full">
                        Prossimo
                      </span>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Partenza: {booking.personalDetails.departureDate}</span>
                      </div>
                      {booking.personalDetails.returnDate && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Ritorno: {booking.personalDetails.returnDate}</span>
                        </div>
                      )}
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-2" />
                        <span>
                          {booking.personalDetails.travelers} adulti
                          {booking.personalDetails.children && booking.personalDetails.children > 0 && 
                            `, ${booking.personalDetails.children} bambini`
                          }
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Nome:</strong> {booking.personalDetails.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Email:</strong> {booking.personalDetails.email}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Telefono:</strong> {booking.personalDetails.phone}
                      </div>
                    </div>
                  </div>

                  {booking.personalDetails.departureCity && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Città di partenza: {booking.personalDetails.departureCity}</span>
                    </div>
                  )}

                  {booking.customRequests && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Richieste speciali:</strong> {booking.customRequests}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Prenotato il: {new Date(booking.createdAt.seconds * 1000).toLocaleDateString('it-IT')}
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      €{booking.totalPrice.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Eye className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-border text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {bookings.length === 0 ? 'Nessuna prenotazione ancora' : 'Nessuna prenotazione trovata'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {bookings.length === 0 
                ? 'Inizia a esplorare i nostri incredibili viaggi e crea ricordi indimenticabili!'
                : 'Prova a cambiare i filtri di ricerca per trovare le prenotazioni che stai cercando.'
              }
            </p>
            {bookings.length === 0 && (
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
      </div>

      {/* Summary Stats */}
      {bookings.length > 0 && (
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Totale</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{bookings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="flex items-center space-x-3">
              <Star className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Confermate</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {bookings.filter(b => b.status === 'confirmed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Prossimi Viaggi</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {bookings.filter(b => 
                    new Date(b.personalDetails.departureDate) > new Date() && 
                    b.status === 'confirmed'
                  ).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">💰</span>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Totale Speso</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  €{bookings
                    .filter(b => b.status === 'confirmed' || b.status === 'completed')
                    .reduce((sum, b) => sum + b.totalPrice, 0)
                    .toLocaleString()
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}