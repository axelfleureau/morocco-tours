// Morocco Dreams CMS - Complete Data Model Schema
// Webflow-style CMS with separate collections and visual editing capabilities

import { Timestamp } from "firebase/firestore"

// === CORE ENTITY TYPES ===

// Cities - Separate collection for destinations
export interface City {
  id?: string
  name: string
  slug: string // unique identifier  
  title: string
  description: string
  arabicName?: string
  region: string
  coordinates: { lat: number; lng: number }
  population?: string
  climate?: {
    averageTemp: { summer: { min: number; max: number }; winter: { min: number; max: number } }
    rainfall: string
  }
  
  // Content
  image: string
  gallery?: string[]
  highlights: string[]
  overview: {
    description: string
    history?: string
    culture?: string
    economy?: string[]
  }
  
  // Meta
  category: 'imperial-cities' | 'coast' | 'mountains' | 'desert' | 'modern' | 'other'
  duration: string
  bestTime: string
  rating: number
  reviews: number
  
  // Publishing
  published: boolean
  featured: boolean
  seoTitle?: string
  seoDescription?: string
  
  // System
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Experiences - Separate collection for activities
export interface Experience {
  id?: string
  title: string
  slug: string
  description: string
  longDescription?: string
  images: string[]
  
  // Pricing & Logistics
  price: number
  currency: string
  duration: string
  maxParticipants?: number
  minAge?: number
  difficulty?: 'easy' | 'moderate' | 'hard'
  
  // Content
  category: 'hammam' | 'cooking' | 'trekking' | 'photography' | 'crafts' | 'surf' | 'desert' | 'cultural'
  includes: string[]
  notIncludes?: string[]
  requirements?: string[]
  location: string
  meetingPoint?: string
  
  // Meta
  rating: number
  reviews: number
  
  // Publishing
  published: boolean
  featured: boolean
  
  // System
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Travels - Separate collection for packages
export interface Travel {
  id?: string
  title: string
  slug: string
  description: string
  longDescription?: string
  images: string[]
  
  // Pricing
  price: number
  originalPrice?: number
  currency: string
  duration: string
  
  // Content
  category: 'imperial-cities' | 'desert' | 'coast' | 'mountains' | 'custom' | 'cultural'
  includes: string[]
  notIncludes?: string[]
  highlights: string[]
  itinerary?: Array<{
    day: number
    title: string
    description: string
    activities: string[]
    accommodation?: string
    meals?: string[]
  }>
  
  // Components (references to cities, experiences, services)
  cityIds?: string[] // References to City collection
  experienceIds?: string[] // References to Experience collection
  serviceIds?: string[] // References to Service collection
  
  // Meta
  rating: number
  reviews: number
  
  // Publishing
  published: boolean
  featured: boolean
  
  // System
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Services - SEPARATED from packages (extras, add-ons)
export interface Service {
  id?: string
  name: string
  slug: string
  description: string
  category: 'transport' | 'accommodation' | 'meal' | 'guide' | 'insurance' | 'activity' | 'equipment'
  type: 'addon' | 'upgrade' | 'optional' | 'required'
  
  // Pricing
  price: number
  priceType: 'per_person' | 'per_group' | 'per_day' | 'flat_rate'
  currency: string
  
  // Availability
  locations?: string[] // Where this service is available
  travelTypes?: string[] // Which travel categories can use this
  
  // Publishing
  published: boolean
  
  // System
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Package Components - Reusable components for building packages
export interface PackageComponent {
  id?: string
  name: string
  type: 'accommodation' | 'transport' | 'activity' | 'meal' | 'guide' | 'equipment'
  description: string
  provider?: string
  
  // Configuration
  pricing: {
    basePrice: number
    currency: string
    priceType: 'per_person' | 'per_group' | 'per_day'
  }
  
  // Availability
  locations: string[]
  seasons?: string[]
  capacity?: { min: number; max: number }
  
  // Publishing
  published: boolean
  
  // System
  createdAt: Timestamp
  updatedAt: Timestamp
}

// === CMS CONTENT TYPES ===

// Blog Posts
export interface BlogPost {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string // Rich text content
  coverImage: string
  gallery?: string[]
  
  // Meta
  author: string
  readingTime?: number
  tags: string[]
  category: string
  
  // SEO
  seoTitle?: string
  seoDescription?: string
  
  // Publishing
  published: boolean
  featured: boolean
  
  // System
  createdAt: Timestamp
  updatedAt: Timestamp
}

// CMS Sections - For visual page builder (Webflow-style)
export interface CMSSection {
  id?: string
  name: string
  pageType: 'homepage' | 'city' | 'experience' | 'travel' | 'about' | 'contact' | 'custom'
  pageSlug?: string // Which specific page this belongs to
  
  // Section configuration
  type: 'hero' | 'content' | 'gallery' | 'testimonials' | 'cta' | 'features' | 'grid' | 'custom'
  order: number
  
  // Content blocks
  blocks: Array<{
    id: string
    type: 'text' | 'image' | 'video' | 'button' | 'form' | 'map' | 'custom'
    content: any // Flexible content structure
    styling?: {
      colors?: { background?: string; text?: string; accent?: string }
      typography?: { fontSize?: string; fontWeight?: string; fontFamily?: string }
      spacing?: { padding?: string; margin?: string }
      layout?: { width?: string; alignment?: string }
    }
  }>
  
  // Section styling
  styling?: {
    background?: { type: 'color' | 'image' | 'gradient'; value: string }
    padding?: { top: string; bottom: string; left: string; right: string }
    margin?: { top: string; bottom: string }
  }
  
  // Publishing
  published: boolean
  
  // System
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Site Theme Configuration - For advanced customization
export interface SiteTheme {
  id?: string
  name: string
  isActive: boolean
  
  // Color palette
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
    success: string
    warning: string
    error: string
  }
  
  // Typography
  typography: {
    headingFont: string
    bodyFont: string
    sizes: {
      xs: string
      sm: string
      base: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
      '4xl': string
    }
    weights: {
      light: number
      normal: number
      medium: number
      semibold: number
      bold: number
    }
  }
  
  // Layout
  layout: {
    maxWidth: string
    containerPadding: string
    borderRadius: {
      sm: string
      md: string
      lg: string
      xl: string
    }
    shadows: {
      sm: string
      md: string
      lg: string
      xl: string
    }
  }
  
  // System
  createdAt: Timestamp
  updatedAt: Timestamp
}

// User Management
export interface User {
  id?: string
  email: string
  displayName?: string
  photoURL?: string
  role: 'admin' | 'editor' | 'user'
  
  // Admin capabilities
  permissions?: {
    canEditContent?: boolean
    canManageUsers?: boolean
    canEditTheme?: boolean
    canPublish?: boolean
  }
  
  // Activity tracking
  lastLogin?: Timestamp
  loginCount?: number
  
  // System
  createdAt: Timestamp
  updatedAt: Timestamp
}

// === COLLECTION NAMES ===
export const COLLECTIONS = {
  // Core entities
  cities: 'cities',
  experiences: 'experiences', 
  travels: 'travels',
  services: 'services',
  packageComponents: 'package_components',
  
  // Content
  blog: 'blog',
  cmsSections: 'cms_sections',
  
  // Configuration
  siteTheme: 'site_theme',
  
  // System
  users: 'users',
  
  // Legacy (to be migrated)
  siteContent: 'site_content'
} as const

// === TYPE GUARDS ===
export function isCity(obj: any): obj is City {
  return obj && typeof obj.name === 'string' && typeof obj.slug === 'string'
}

export function isExperience(obj: any): obj is Experience {
  return obj && typeof obj.title === 'string' && typeof obj.category === 'string'
}

export function isTravel(obj: any): obj is Travel {
  return obj && typeof obj.title === 'string' && typeof obj.duration === 'string'
}

export function isService(obj: any): obj is Service {
  return obj && typeof obj.name === 'string' && typeof obj.category === 'string'
}

// === UTILITY TYPES ===
export type EntityType = 'city' | 'experience' | 'travel' | 'service' | 'blog' | 'component'

export interface CMSContentMeta {
  collection: string
  entity: EntityType
  lastModified: Timestamp
  version: number
  isDraft: boolean
}

// Collection type mapping
export type CollectionTypeMap = {
  [COLLECTIONS.cities]: City
  [COLLECTIONS.experiences]: Experience
  [COLLECTIONS.travels]: Travel
  [COLLECTIONS.services]: Service
  [COLLECTIONS.packageComponents]: PackageComponent
  [COLLECTIONS.blog]: BlogPost
  [COLLECTIONS.cmsSections]: CMSSection
  [COLLECTIONS.siteTheme]: SiteTheme
  [COLLECTIONS.users]: User
}