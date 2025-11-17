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
  Timestamp,
  serverTimestamp
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
  analytics: 'analytics',
  // New CMS Collections
  cmsContent: 'cms_content',
  cmsSections: 'cms_sections',
  cities: 'cities',
  packageComponents: 'package_components',
  packageTemplates: 'package_templates',
  guides: 'guides',
  userThemes: 'user_themes',
  blog: 'blog',
  // Group Chat Collections
  conversations: 'conversations',
  messages: 'messages'
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

// Booking Participant - For group bookings
export interface BookingParticipant {
  userId: string;
  name: string;
  email: string;
  phone?: string;
  joinedAt: Timestamp;
  status: 'invited' | 'joined' | 'declined';
  role: 'organizer' | 'participant';
}

// Chat Message - For group conversations
export interface ChatMessage {
  id?: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: Timestamp;
  readBy: string[]; // Array of userIds who read this message
  edited?: boolean;
  editedAt?: Timestamp;
}

// Conversation - Group chat room
export interface Conversation {
  id?: string;
  groupId: string; // Links to Booking.groupId
  bookingId: string; // Reference to booking
  participants: Array<{
    userId: string;
    name: string;
    avatar?: string;
  }>;
  // Separate map for lastRead timestamps (userId -> timestamp)
  lastReadMap?: {
    [userId: string]: Timestamp;
  };
  lastMessage?: {
    text: string;
    senderId: string;
    senderName: string;
    timestamp: Timestamp;
  };
  unreadCount?: {
    [userId: string]: number;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Booking Types
export interface Booking {
  id?: string;
  userId: string;
  travelId?: string;
  experienceId?: string;
  vehicleId?: string; // For vehicle rental bookings
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
  
  // Vehicle rental specific fields
  vehicleDetails?: {
    driverLicense: string;
    insuranceExtra: boolean;
    gps: boolean;
    childSeats: number;
    additionalDriver: boolean;
    pickupLocation?: string;
    dropoffLocation?: string;
    rentalDays?: number;
    dailyRate?: number;
  };
  
  // Group booking fields
  groupId?: string;
  participants?: BookingParticipant[];
  chatRoomId?: string;
  shareToken?: string;
  
  // Pricing flag (prevents recalculation of confirmed totals)
  hasConfirmedTotal?: boolean;
  
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

// City Types
export interface City {
  id?: string;
  name: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  highlights: string[];
  duration: string;
  bestTime: string;
  rating: number;
  reviews: number;
  category: 'imperial-cities' | 'coast' | 'mountains' | 'desert' | 'other';
  arabicName?: string;
  region?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  population?: string;
  climate?: string;
  overview?: string;
  attractions?: Array<{
    name: string;
    description: string;
    image?: string;
  }>;
  transportation?: {
    airport?: string;
    trainStation?: string;
    busStation?: string;
  };
  accommodation?: Array<{
    type: string;
    name: string;
    priceRange: string;
  }>;
  seoData?: {
    title: string;
    description: string;
    keywords: string[];
  };
  published: boolean;
  featured: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// CMS Content Types (extending from cms.ts)
export interface CMSContent {
  id?: string;
  type: 'page' | 'section' | 'travel' | 'experience' | 'blog';
  title: string;
  slug: string;
  content: {
    [language: string]: {
      title: string;
      description: string;
      body?: string;
      meta?: {
        title?: string;
        description?: string;
        keywords?: string[];
      };
    };
  };
  published: boolean;
  featured: boolean;
  category?: string;
  tags?: string[];
  images?: string[];
  author?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Package Components
export interface PackageComponent {
  id?: string;
  name: string;
  type: 'accommodation' | 'transport' | 'activity' | 'meal' | 'guide' | 'insurance';
  description: string;
  price: number;
  duration?: string;
  capacity?: number;
  category: string;
  location?: string;
  available: boolean;
  providers?: string[];
  inclusions?: string[];
  exclusions?: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Package Templates
export interface PackageTemplate {
  id?: string;
  name: string;
  category: 'economy' | 'standard' | 'premium' | 'luxury';
  description: string;
  duration: string;
  basePrice: number;
  components: string[]; // Array of component IDs
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
    activities: string[];
  }>;
  inclusions: string[];
  exclusions: string[];
  maxParticipants: number;
  difficulty: number;
  bestFor: string;
  seasons: string[];
  published: boolean;
  featured: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// User Themes
export interface UserTheme {
  id?: string;
  userId: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  layout: {
    headerStyle: string;
    footerStyle: string;
    sidebarPosition: 'left' | 'right' | 'none';
  };
  isActive: boolean;
  isDefault: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// PDF Guides
export interface Guide {
  id?: string;
  title: string;
  type: 'city' | 'travel' | 'experience' | 'custom';
  content: {
    sections: Array<{
      title: string;
      content: string;
      images?: string[];
    }>;
  };
  templateId?: string;
  associatedIds?: string[]; // Related travel, experience, or city IDs
  language: string;
  fileUrl?: string;
  fileSize?: number;
  downloadCount: number;
  isPublic: boolean;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Blog Posts
export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  images?: string[];
  category: 'travel-tips' | 'culture' | 'food' | 'adventure' | 'photography' | 'news';
  tags: string[];
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  seoData: {
    title: string;
    description: string;
    keywords: string[];
  };
  readTime: number; // minutes
  published: boolean;
  featured: boolean;
  views: number;
  likes: number;
  comments?: Array<{
    id: string;
    author: string;
    content: string;
    createdAt: Timestamp;
  }>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp;
}

// Generic CRUD operations
export const firestoreService = {
  // Create
  async create<T>(collectionName: string, data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    // Remove undefined values to prevent Firestore errors
    const cleanData = this.removeUndefinedValues({
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    const docRef = await addDoc(collection(db, collectionName), cleanData);
    return docRef.id;
  },

  // Helper method to remove undefined values recursively
  removeUndefinedValues(obj: any): any {
    if (obj === null || obj === undefined) {
      return null;
    }
    
    if (Array.isArray(obj)) {
      // Filter out undefined elements instead of converting to null
      return obj
        .filter(item => item !== undefined)
        .map(item => this.removeUndefinedValues(item));
    }
    
    if (typeof obj === 'object') {
      const cleaned: any = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value !== undefined) {
          cleaned[key] = this.removeUndefinedValues(value);
        }
      }
      return cleaned;
    }
    
    return obj;
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
    // Remove undefined values to prevent Firestore errors
    const cleanData = this.removeUndefinedValues({
      ...data,
      updatedAt: serverTimestamp()
    });
    await updateDoc(docRef, cleanData);
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
      ...doc.data(),
      id: doc.id
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
      ...doc.data(),
      id: doc.id
    })) as Experience[];
  },

  // Get user bookings
  async getUserBookings(userId: string): Promise<Booking[]> {
    try {
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
    } catch (error: any) {
      console.error('Error fetching user bookings:', error);
      // If error is due to missing index, return empty array
      if (error.code === 'failed-precondition') {
        console.warn('Firestore index missing for bookings orderBy, returning empty array');
        return [];
      }
      throw error;
    }
  },

  // Create sample bookings for testing (dev only)
  async createSampleBookings(userId: string): Promise<void> {
    const sampleBookings = [
      {
        userId,
        status: 'confirmed' as const,
        personalDetails: {
          name: 'Mario Rossi',
          email: 'mario.rossi@email.com',
          phone: '+39 123 456 7890',
          travelers: 2,
          children: 0,
          departureDate: '2024-12-15',
          returnDate: '2024-12-22',
          departureCity: 'Milano'
        },
        totalPrice: 890,
        customRequests: 'Camera vista mare se possibile',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      },
      {
        userId,
        status: 'pending' as const,
        personalDetails: {
          name: 'Mario Rossi',
          email: 'mario.rossi@email.com', 
          phone: '+39 123 456 7890',
          travelers: 1,
          children: 1,
          departureDate: '2025-03-20',
          returnDate: '2025-03-27',
          departureCity: 'Roma'
        },
        totalPrice: 650,
        customRequests: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
    ];

    for (const booking of sampleBookings) {
      await this.create(COLLECTIONS.bookings, booking);
    }
  }
};