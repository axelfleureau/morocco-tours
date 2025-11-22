// Shared card types and interfaces for standardized components

export type BadgeVariant = 'default' | 'featured' | 'new' | 'popular' | 'sale' | 'verified';
export type CTAVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

export interface CardBadge {
  label: string;
  variant: BadgeVariant;
}

export interface CardCTA {
  label: string;
  href?: string;
  onClick?: () => void;
  variant: CTAVariant;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface CardQuickInfo {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

// Base card props - shared across all card types
export interface BaseCardProps {
  id: string;
  image: string | string[];
  title: string;
  description?: string;
  badges?: CardBadge[];
  quickInfo?: CardQuickInfo[];
  className?: string;
  onClick?: () => void;
}

// Travel card specific props
export interface TravelCardProps extends BaseCardProps {
  price?: number;
  originalPrice?: number;
  duration?: string;
  rating?: number;
  reviews?: number;
  highlights?: string[];
  location?: string;
  category?: 'city' | 'desert' | 'coast' | 'mountain';
  featured?: boolean;
  ctas?: CardCTA[];
}

// Experience card specific props
export interface ExperienceCardProps extends BaseCardProps {
  price?: number;
  duration?: string;
  difficulty?: 'easy' | 'moderate' | 'hard';
  groupSize?: string;
  included?: string[];
  category?: string;
  slug?: string;
  ctas?: CardCTA[];
}

// Vehicle card specific props
export interface VehicleCardProps extends BaseCardProps {
  pricePerDay?: number;
  seats?: number;
  transmission?: 'manual' | 'automatic';
  fuelType?: string;
  luggage?: number;
  features?: string[];
  availability?: 'available' | 'limited' | 'unavailable';
  category?: string;
  ctas?: CardCTA[];
}

// City card specific props
export interface CityCardProps extends BaseCardProps {
  tagline?: string;
  distance?: string;
  population?: string;
  attractions?: string[];
  bestSeason?: string;
  region?: string;
  ctas?: CardCTA[];
}

// Service card specific props
export interface ServiceCardProps extends BaseCardProps {
  icon?: React.ComponentType<{ className?: string }>;
  price?: number | string;
  priceType?: 'per_person' | 'per_day' | 'per_trip' | 'fixed';
  category?: string;
  type?: string;
  locations?: string[];
  ctas?: CardCTA[];
}

// Blog card specific props
export interface BlogCardProps extends BaseCardProps {
  author?: {
    name: string;
    avatar?: string;
  };
  publishedAt?: Date | string;
  readTime?: string;
  tags?: string[];
  excerpt?: string;
  slug?: string;
  ctas?: CardCTA[];
}

// Wishlist item data for all card types
export interface WishlistCardData {
  itemId: string;
  itemType: 'vehicle' | 'experience' | 'travel' | 'city' | 'service' | 'activity';
  itemTitle: string;
  itemImage?: string;
  itemPrice?: number;
  itemDescription?: string;
}
