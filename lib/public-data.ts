// Public-facing data queries using PostgreSQL API
// This replaces all Firestore queries with REST API calls

// Base API URL - works on both server and client
function getAPIBase() {
  if (typeof window !== 'undefined') {
    // Client-side: use relative URLs
    return '';
  }
  // Server-side: use absolute URLs
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000';
}

// Travel interface
export interface Travel {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image?: string;
  duration: string;
  price: number;
  itinerary?: any[];
  includes?: string[];
  excludes?: string[];
  published: boolean;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Experience interface
export interface Experience {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image?: string;
  duration: string;
  price: number;
  highlights?: string[];
  itinerary?: any[];
  published: boolean;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Service interface
export interface Service {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  icon?: string;
  features?: string[];
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Vehicle interface
export interface Vehicle {
  id: string;
  name: string;
  category: "economica" | "suv" | "Premium";
  transmission: "manuale" | "automatica";
  fuel: "benzina" | "diesel";
  fuelType?: string;
  hasAC: boolean;
  doors: number;
  seats: number;
  luggage?: number;
  dailyDeductible: number;
  image: string;
  features?: string[];
  pricingPeriods?: {
    name: string;
    startDate: string;
    endDate: string;
    shortTerm: number;
    mediumTerm: number;
    longTerm: number;
  }[];
  pricing?: {
    period1: { short: number; medium: number; long: number };
    period2: { short: number; medium: number; long: number };
    period3: { short: number; medium: number; long: number };
    period4: { short: number; medium: number; long: number };
  };
  published: boolean;
  featured: boolean;
}

// Blog post interface
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  authorRole?: string;
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

// City interface
export interface City {
  id: string;
  name: string;
  slug: string;
  type: string;
  description: string;
  image?: string;
  attractions?: string[];
  history?: string;
  tourPrice?: number;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Get published travels for public display
export async function getPublishedTravels(filters?: {
  category?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Travel[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.featured !== undefined) params.append('featured', String(filters.featured));
    if (filters?.limit) params.append('limit', String(filters.limit));
    
    const url = `${getAPIBase()}/api/travels${params.toString() ? `?${params}` : ''}`;
    const response = await fetch(url, {
      next: { tags: ['travels'] }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.travels || [];
  } catch (error) {
    console.error('Error fetching published travels:', error);
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
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.featured !== undefined) params.append('featured', String(filters.featured));
    if (filters?.limit) params.append('limit', String(filters.limit));
    
    const url = `${getAPIBase()}/api/experiences${params.toString() ? `?${params}` : ''}`;
    const response = await fetch(url, {
      next: { tags: ['experiences'] }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.experiences || [];
  } catch (error) {
    console.error('Error fetching published experiences:', error);
    throw new Error(`Database error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Get published services for public display
export async function getPublishedServices(filters?: {
  category?: string;
  limit?: number;
}): Promise<Service[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.limit) params.append('limit', String(filters.limit));
    
    const url = `${getAPIBase()}/api/services${params.toString() ? `?${params}` : ''}`;
    const response = await fetch(url, {
      next: { tags: ['services'] }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.services || [];
  } catch (error) {
    console.error('Error fetching published services:', error);
    throw new Error(`Database error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Get published vehicles for car rental page
export async function getPublishedVehicles(filters?: {
  category?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Vehicle[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.featured !== undefined) params.append('featured', String(filters.featured));
    if (filters?.limit) params.append('limit', String(filters.limit));
    
    const url = `${getAPIBase()}/api/vehicles${params.toString() ? `?${params}` : ''}`;
    const response = await fetch(url, {
      next: { tags: ['vehicles'] }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.vehicles || [];
  } catch (error) {
    console.error('Error fetching published vehicles:', error);
    throw new Error(`Database error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Get published blog posts
export async function getPublishedBlogPosts(filters?: {
  tag?: string;
  featured?: boolean;
  limit?: number;
}): Promise<BlogPost[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.tag) params.append('tag', filters.tag);
    if (filters?.featured !== undefined) params.append('featured', String(filters.featured));
    if (filters?.limit) params.append('limit', String(filters.limit));
    
    const url = `${getAPIBase()}/api/blog${params.toString() ? `?${params}` : ''}`;
    const response = await fetch(url, {
      next: { tags: ['blog'] }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching published blog posts:', error);
    throw new Error(`Database error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Get published cities
export async function getPublishedCities(filters?: {
  type?: string;
  limit?: number;
}): Promise<City[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.type) params.append('type', filters.type);
    if (filters?.limit) params.append('limit', String(filters.limit));
    
    const url = `${getAPIBase()}/api/cities${params.toString() ? `?${params}` : ''}`;
    const response = await fetch(url, {
      next: { tags: ['cities'] }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.cities || [];
  } catch (error) {
    console.error('Error fetching published cities:', error);
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
