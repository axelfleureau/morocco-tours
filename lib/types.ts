// lib/types.ts
export interface City {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  attractions: string[];
  bestTime: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Tour {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  cities: string[]; // Array di City IDs
  includes: string[];
  excludes: string[];
  itinerary: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Photo {
  id: string;
  url: string;
  category: 'city' | 'tour';
  cityId?: string;
  tourId?: string;
  caption: string;
  uploadedAt: Date;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
  preferences: Record<string, any>;
}