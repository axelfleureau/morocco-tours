// Public-facing data queries (only published content)
// This replaces all hardcoded static data with database queries

import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db } from './firebase';
import { COLLECTIONS } from './firestore-schema';
import { Travel, Experience, Service } from './firestore-schema';

// Get published travels for public display
export async function getPublishedTravels(filters?: {
  category?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Travel[]> {
  try {
    let queryConstraints: any[] = [
      where('status', '==', 'published'),
      where('published', '==', true)
    ];
    
    if (filters?.category) {
      queryConstraints.push(where('category', '==', filters.category));
    }
    
    if (filters?.featured !== undefined) {
      queryConstraints.push(where('featured', '==', filters.featured));
    }
    
    queryConstraints.push(orderBy('createdAt', 'desc'));
    
    if (filters?.limit) {
      queryConstraints.push(limit(filters.limit));
    }
    
    const q = query(collection(db, COLLECTIONS.travels), ...queryConstraints);
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Travel[];
  } catch (error) {
    console.error('Error fetching published travels:', error);
    // Throw error instead of returning empty array to expose Firestore issues
    throw new Error(`Database error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Get published experiences for public display
export async function getPublishedExperiences(filters?: {
  category?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Experience[]> {
  try {
    let queryConstraints: any[] = [
      where('status', '==', 'published'),
      where('published', '==', true)
    ];
    
    if (filters?.category) {
      queryConstraints.push(where('category', '==', filters.category));
    }
    
    if (filters?.featured !== undefined) {
      queryConstraints.push(where('featured', '==', filters.featured));
    }
    
    queryConstraints.push(orderBy('createdAt', 'desc'));
    
    if (filters?.limit) {
      queryConstraints.push(limit(filters.limit));
    }
    
    const q = query(collection(db, COLLECTIONS.experiences), ...queryConstraints);
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Experience[];
  } catch (error) {
    console.error('Error fetching published experiences:', error);
    // Throw error instead of returning empty array to expose Firestore issues
    throw new Error(`Database error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Get published services for public display
export async function getPublishedServices(filters?: {
  category?: string;
  limit?: number;
}): Promise<Service[]> {
  try {
    let queryConstraints: any[] = [
      where('status', '==', 'published'),
      where('published', '==', true)
    ];
    
    if (filters?.category) {
      queryConstraints.push(where('category', '==', filters.category));
    }
    
    queryConstraints.push(orderBy('createdAt', 'desc'));
    
    if (filters?.limit) {
      queryConstraints.push(limit(filters.limit));
    }
    
    const q = query(collection(db, COLLECTIONS.services), ...queryConstraints);
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Service[];
  } catch (error) {
    console.error('Error fetching published services:', error);
    // Throw error instead of returning empty array to expose Firestore issues  
    throw new Error(`Database error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Vehicle interface
export interface Vehicle {
  id: string;
  name: string;
  category: "economica" | "suv" | "Premium";
  transmission: "manuale" | "automatica";
  fuel: "benzina" | "diesel";
  hasAC: boolean;
  doors: number;
  seats: number;
  dailyDeductible: number;
  image: string;
  pricing: {
    period1: { short: number; medium: number; long: number };
    period2: { short: number; medium: number; long: number };
    period3: { short: number; medium: number; long: number };
    period4: { short: number; medium: number; long: number };
  };
  published: boolean;
  featured: boolean;
}

// Get published vehicles for car rental page
export async function getPublishedVehicles(filters?: {
  category?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Vehicle[]> {
  try {
    let queryConstraints: any[] = [
      where('published', '==', true)
    ];
    
    if (filters?.category) {
      queryConstraints.push(where('category', '==', filters.category));
    }
    
    if (filters?.featured !== undefined) {
      queryConstraints.push(where('featured', '==', filters.featured));
    }
    
    queryConstraints.push(orderBy('category', 'asc'));
    
    if (filters?.limit) {
      queryConstraints.push(limit(filters.limit));
    }
    
    const q = query(collection(db, 'vehicles'), ...queryConstraints);
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Vehicle[];
  } catch (error) {
    console.error('Error fetching published vehicles:', error);
    throw new Error(`Database error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Blog post interface
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  date: string;
  readingMinutes: number;
  tags: string[];
  sections: {
    heading: string;
    body: string;
    image?: string;
  }[];
  published: boolean;
  featured: boolean;
}

// Get published blog posts
export async function getPublishedBlogPosts(filters?: {
  tag?: string;
  featured?: boolean;
  limit?: number;
}): Promise<BlogPost[]> {
  try {
    let queryConstraints: any[] = [
      where('published', '==', true)
    ];
    
    if (filters?.tag) {
      queryConstraints.push(where('tags', 'array-contains', filters.tag));
    }
    
    if (filters?.featured !== undefined) {
      queryConstraints.push(where('featured', '==', filters.featured));
    }
    
    queryConstraints.push(orderBy('createdAt', 'desc'));
    
    if (filters?.limit) {
      queryConstraints.push(limit(filters.limit));
    }
    
    const q = query(collection(db, 'blog'), ...queryConstraints);
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      slug: doc.id,
      ...doc.data()
    })) as BlogPost[];
  } catch (error) {
    console.error('Error fetching published blog posts:', error);
    throw new Error(`Database error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Get featured content for homepage
export async function getFeaturedContent() {
  try {
    const [travels, experiences, services] = await Promise.all([
      getPublishedTravels({ featured: true, limit: 6 }),
      getPublishedExperiences({ featured: true, limit: 4 }),
      getPublishedServices({ limit: 8 })
    ]);
    
    return {
      travels,
      experiences,
      services
    };
  } catch (error) {
    console.error('Error fetching featured content:', error);
    return {
      travels: [],
      experiences: [],
      services: []
    };
  }
}