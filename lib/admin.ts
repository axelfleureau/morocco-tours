// Admin-specific services for dashboard operations
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  query, 
  where, 
  orderBy, 
  limit as firestoreLimit,
  Timestamp,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebase';
import { COLLECTIONS, Travel, Experience, Booking } from './firestore';
import { UserProfile } from './auth';

// Dashboard Statistics Interface
export interface DashboardStats {
  totalUsers: number;
  totalTravels: number;
  totalExperiences: number;
  totalBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  recentBookings: Booking[];
  popularTravels: Travel[];
}

// Admin Services Class
export class AdminService {
  
  // Get comprehensive dashboard statistics
  static async getDashboardStats(): Promise<DashboardStats> {
    try {
      // Get all collections in parallel for better performance
      const [usersSnap, travelsSnap, experiencesSnap, bookingsSnap] = await Promise.all([
        getDocs(collection(db, COLLECTIONS.users)),
        getDocs(collection(db, COLLECTIONS.travels)),
        getDocs(collection(db, COLLECTIONS.experiences)),
        getDocs(collection(db, COLLECTIONS.bookings))
      ]);

      // Process bookings data
      const bookings = bookingsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Booking[];
      const pendingBookings = bookings.filter(booking => booking.status === 'pending');
      const totalRevenue = bookings
        .filter(booking => booking.status === 'confirmed' || booking.status === 'completed')
        .reduce((sum, booking) => sum + booking.totalPrice, 0);

      // Get recent bookings (last 10)
      const recentBookingsQuery = query(
        collection(db, COLLECTIONS.bookings),
        orderBy('createdAt', 'desc'),
        firestoreLimit(10)
      );
      const recentBookingsSnap = await getDocs(recentBookingsQuery);
      const recentBookings = recentBookingsSnap.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as Booking[];

      // Get popular travels (featured and published)
      const popularTravelsQuery = query(
        collection(db, COLLECTIONS.travels),
        where('featured', '==', true),
        where('published', '==', true),
        orderBy('rating', 'desc'),
        firestoreLimit(5)
      );
      const popularTravelsSnap = await getDocs(popularTravelsQuery);
      const popularTravels = popularTravelsSnap.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as Travel[];

      return {
        totalUsers: usersSnap.size,
        totalTravels: travelsSnap.size,
        totalExperiences: experiencesSnap.size,
        totalBookings: bookingsSnap.size,
        pendingBookings: pendingBookings.length,
        totalRevenue,
        recentBookings,
        popularTravels
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }

  // Get all users with pagination
  static async getUsers(limit: number = 50): Promise<UserProfile[]> {
    try {
      const usersQuery = query(
        collection(db, COLLECTIONS.users),
        orderBy('createdAt', 'desc'),
        firestoreLimit(limit)
      );
      const snapshot = await getDocs(usersQuery);
      return snapshot.docs.map(doc => ({ 
        uid: doc.id, 
        ...doc.data() 
      } as UserProfile));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // Get all travels with filters
  static async getTravels(filters?: {
    published?: boolean;
    featured?: boolean;
    category?: string;
  }): Promise<Travel[]> {
    try {
      const baseCollection = collection(db, COLLECTIONS.travels);
      
      if (filters) {
        const constraints = [];
        if (filters.published !== undefined) constraints.push(where('published', '==', filters.published));
        if (filters.featured !== undefined) constraints.push(where('featured', '==', filters.featured));
        if (filters.category) constraints.push(where('category', '==', filters.category));
        
        if (constraints.length > 0) {
          constraints.push(orderBy('createdAt', 'desc'));
          const travelsQuery = query(baseCollection, ...constraints);
          const snapshot = await getDocs(travelsQuery);
          return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Travel[];
        }
      }
      
      const snapshot = await getDocs(baseCollection);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Travel[];
    } catch (error) {
      console.error('Error fetching travels:', error);
      throw error;
    }
  }

  // Get all experiences with filters  
  static async getExperiences(filters?: {
    published?: boolean;
    category?: string;
  }): Promise<Experience[]> {
    try {
      const baseCollection = collection(db, COLLECTIONS.experiences);
      
      if (filters) {
        const constraints = [];
        if (filters.published !== undefined) constraints.push(where('published', '==', filters.published));
        if (filters.category) constraints.push(where('category', '==', filters.category));
        
        if (constraints.length > 0) {
          constraints.push(orderBy('createdAt', 'desc'));
          const experiencesQuery = query(baseCollection, ...constraints);
          const snapshot = await getDocs(experiencesQuery);
          return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Experience[];
        }
      }
      
      const snapshot = await getDocs(baseCollection);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Experience[];
    } catch (error) {
      console.error('Error fetching experiences:', error);
      throw error;
    }
  }

  // Get all bookings with filters
  static async getBookings(filters?: {
    status?: string;
    userId?: string;
    limit?: number;
  }): Promise<Booking[]> {
    try {
      const baseCollection = collection(db, COLLECTIONS.bookings);
      const constraints = [];
      
      if (filters?.status) constraints.push(where('status', '==', filters.status));
      if (filters?.userId) constraints.push(where('userId', '==', filters.userId));
      
      constraints.push(orderBy('createdAt', 'desc'));
      if (filters?.limit) constraints.push(firestoreLimit(filters.limit));
      
      const bookingsQuery = query(baseCollection, ...constraints);
      const snapshot = await getDocs(bookingsQuery);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Booking[];
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  }

  // Get user details with their booking history
  static async getUserDetails(userId: string): Promise<{
    user: UserProfile | null;
    bookings: Booking[];
  }> {
    try {
      const [userDoc, bookingsSnap] = await Promise.all([
        getDoc(doc(db, COLLECTIONS.users, userId)),
        getDocs(query(
          collection(db, COLLECTIONS.bookings),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        ))
      ]);

      const user = userDoc.exists() ? { uid: userDoc.id, ...userDoc.data() } as UserProfile : null;
      const bookings = bookingsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Booking[];

      return { user, bookings };
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  }

  // Get booking analytics
  static async getBookingAnalytics(): Promise<{
    bookingsByStatus: { [key: string]: number };
    bookingsByMonth: { month: string; count: number; revenue: number }[];
    topDestinations: { name: string; bookings: number }[];
  }> {
    try {
      const bookingsSnap = await getDocs(collection(db, COLLECTIONS.bookings));
      const bookings = bookingsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Booking[];

      // Bookings by status
      const bookingsByStatus = bookings.reduce((acc, booking) => {
        acc[booking.status] = (acc[booking.status] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });

      // Bookings by month (last 12 months)
      const monthlyData: { [key: string]: { count: number; revenue: number } } = {};
      bookings.forEach(booking => {
        const date = booking.createdAt.toDate();
        const monthKey = date.toLocaleDateString('it-IT', { year: 'numeric', month: 'short' });
        
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = { count: 0, revenue: 0 };
        }
        
        monthlyData[monthKey].count++;
        if (booking.status === 'confirmed' || booking.status === 'completed') {
          monthlyData[monthKey].revenue += booking.totalPrice;
        }
      });

      const bookingsByMonth = Object.entries(monthlyData).map(([month, data]) => ({
        month,
        count: data.count,
        revenue: data.revenue
      }));

      // Top destinations would require travel data cross-reference
      // For now, return empty array
      const topDestinations: { name: string; bookings: number }[] = [];

      return {
        bookingsByStatus,
        bookingsByMonth,
        topDestinations
      };
    } catch (error) {
      console.error('Error fetching booking analytics:', error);
      throw error;
    }
  }
}