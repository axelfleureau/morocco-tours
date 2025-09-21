// Firestore database operations
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

// Database Collections
export const COLLECTIONS = {
  users: 'users',
  travels: 'travels',
  experiences: 'experiences',
  bookings: 'bookings',
  inquiries: 'inquiries',
  services: 'services',
  siteContent: 'site_content',
  analytics: 'analytics'
} as const;

// Travel/Tour Types
export interface Travel {
  id?: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  originalPrice?: number;
  duration: string;
  category: 'imperial-cities' | 'desert' | 'coast' | 'mountains' | 'custom';
  featured: boolean;
  published: boolean;
  rating: number;
  reviews: number;
  includes: string[];
  notIncludes?: string[];
  highlights: string[];
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  maxParticipants?: number;
  difficulty?: number;
  bestFor?: string;
  season?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Experience Types
export interface Experience {
  id?: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  duration: string;
  category: 'hammam' | 'cooking' | 'trekking' | 'photography' | 'crafts' | 'surf';
  published: boolean;
  rating: number;
  reviews: number;
  maxParticipants?: number;
  includes: string[];
  location: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Booking Types
export interface Booking {
  id?: string;
  userId: string;
  travelId?: string;
  experienceId?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  personalDetails: {
    name: string;
    email: string;
    phone: string;
    travelers: number;
    children?: number;
    childrenAges?: string;
    departureDate: string;
    returnDate?: string;
    departureCity?: string;
  };
  customRequests?: string;
  totalPrice: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Inquiry Types
export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  travelType?: string; // Type of travel requested
  type: 'general' | 'travel_plan' | 'booking' | 'custom_trip';
  tripDetails?: any; // For custom trip planner data
  status: 'new' | 'replied' | 'closed';
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

// Generic CRUD operations
export const firestoreService = {
  // Create
  async create<T>(collectionName: string, data: Omit<T, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  },

  // Read single document
  async getById<T>(collectionName: string, id: string): Promise<T | null> {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  },

  // Read all documents
  async getAll<T>(collectionName: string): Promise<T[]> {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
  },

  // Read with query
  async getWhere<T>(
    collectionName: string, 
    field: string, 
    operator: any, 
    value: any
  ): Promise<T[]> {
    const q = query(collection(db, collectionName), where(field, operator, value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
  },

  // Update
  async update<T>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  },

  // Delete
  async delete(collectionName: string, id: string): Promise<void> {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  },

  // Get published travels
  async getPublishedTravels(): Promise<Travel[]> {
    const q = query(
      collection(db, COLLECTIONS.travels),
      where('published', '==', true),
      orderBy('featured', 'desc'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Travel[];
  },

  // Get published experiences
  async getPublishedExperiences(): Promise<Experience[]> {
    const q = query(
      collection(db, COLLECTIONS.experiences),
      where('published', '==', true),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Experience[];
  },

  // Get user bookings
  async getUserBookings(userId: string): Promise<Booking[]> {
    const q = query(
      collection(db, COLLECTIONS.bookings),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Booking[];
  }
};