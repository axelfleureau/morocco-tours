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