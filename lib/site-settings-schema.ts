export interface HeroSettings {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  showVideoButton: boolean;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  country: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
  tiktok?: string;
}

export interface FooterSettings {
  aboutText: string;
  copyrightText: string;
  showNewsletter: boolean;
  newsletterTitle: string;
  newsletterDescription: string;
}

export interface SEOSettings {
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  ogImage?: string;
  siteName: string;
  twitterHandle?: string;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoUrl?: string;
  faviconUrl?: string;
}

export interface SiteSettings {
  id: string;
  hero: HeroSettings;
  contact: ContactInfo;
  social: SocialLinks;
  footer: FooterSettings;
  seo: SEOSettings;
  theme: ThemeSettings;
  updatedAt: string;
  updatedBy?: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: 'site_settings',
  hero: {
    title: 'Scopri il Marocco Autentico',
    subtitle: 'Viaggi personalizzati tra deserto, città imperiali e costa atlantica',
    ctaText: 'Pianifica il Tuo Viaggio',
    ctaLink: '/pianifica-viaggio',
    showVideoButton: true
  },
  contact: {
    email: 'info@moroccodreams.com',
    phone: '+212 123 456 789',
    whatsapp: '+212 123 456 789',
    address: 'Via Example, 123',
    city: 'Marrakech',
    country: 'Morocco'
  },
  social: {
    facebook: 'https://facebook.com/moroccodreams',
    instagram: 'https://instagram.com/moroccodreams',
    youtube: 'https://youtube.com/@moroccodreams'
  },
  footer: {
    aboutText: 'Morocco Dreams è la tua porta d\'accesso al Marocco autentico. Offriamo esperienze di viaggio personalizzate che combinano avventura, cultura e relax.',
    copyrightText: 'Morocco Dreams. Tutti i diritti riservati.',
    showNewsletter: true,
    newsletterTitle: 'Rimani Aggiornato',
    newsletterDescription: 'Ricevi offerte esclusive e consigli di viaggio direttamente nella tua casella di posta.'
  },
  seo: {
    defaultTitle: 'Morocco Dreams - Viaggi Autentici in Marocco',
    defaultDescription: 'Scopri il Marocco con Morocco Dreams: tour personalizzati, esperienze autentiche nel deserto, città imperiali e costa atlantica. Prenota il tuo viaggio da sogno.',
    defaultKeywords: ['marocco', 'viaggi marocco', 'tour marocco', 'deserto sahara', 'città imperiali', 'marrakech', 'fes'],
    siteName: 'Morocco Dreams',
  },
  theme: {
    primaryColor: '#FF6B35',
    secondaryColor: '#1A1A1A',
    accentColor: '#F7931E'
  },
  updatedAt: new Date().toISOString()
};
