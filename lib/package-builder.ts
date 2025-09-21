// Advanced Package Builder System for Morocco Dreams
import { firestoreService } from './firestore';

export interface PackageComponent {
  id: string;
  type: 'accommodation' | 'transport' | 'activity' | 'meal' | 'guide' | 'experience';
  name: string;
  description: string;
  duration: number; // in days or hours
  price: number;
  maxPersons: number;
  location?: string;
  included: string[];
  optional: boolean;
  category: string;
  images: string[];
  rating?: number;
  availability: {
    seasons: string[];
    daysOfWeek: number[];
    timeSlots?: string[];
  };
}

export interface PackageTemplate {
  id?: string;
  name: string;
  description: string;
  category: 'imperial-cities' | 'desert' | 'coast' | 'mountains' | 'cultural' | 'adventure';
  duration: number;
  basePrice: number;
  components: PackageComponent[];
  routes: Array<{
    from: string;
    to: string;
    transport: string;
    duration: string;
  }>;
  seasons: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  groupSize: {
    min: number;
    max: number;
  };
  highlights: string[];
  includes: string[];
  notIncludes: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
    location: string;
    activities: string[];
    meals: string[];
    accommodation?: string;
  }>;
  published: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomPackage {
  id?: string;
  userId?: string;
  templateId?: string;
  name: string;
  selectedComponents: Array<{
    componentId: string;
    quantity: number;
    customizations?: Record<string, any>;
  }>;
  totalPrice: number;
  totalDuration: number;
  personalizations: {
    budget: 'economy' | 'standard' | 'luxury';
    interests: string[];
    specialRequests: string[];
    groupSize: number;
  };
  status: 'draft' | 'requested' | 'confirmed' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export class PackageBuilderService {
  // Get all available components
  static async getComponents(type?: string): Promise<PackageComponent[]> {
    try {
      if (type) {
        return await firestoreService.getWhere<PackageComponent>('package_components', 'type', '==', type);
      }
      return await firestoreService.getAll<PackageComponent>('package_components');
    } catch (error) {
      console.error('Error fetching components:', error);
      return [];
    }
  }

  // Get package templates
  static async getTemplates(): Promise<PackageTemplate[]> {
    try {
      return await firestoreService.getWhere<PackageTemplate>('package_templates', 'published', '==', true);
    } catch (error) {
      console.error('Error fetching templates:', error);
      return [];
    }
  }

  // Create custom package
  static async createCustomPackage(packageData: Omit<CustomPackage, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      return await firestoreService.create('custom_packages', {
        ...packageData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error creating custom package:', error);
      throw error;
    }
  }

  // Calculate package price
  static calculatePackagePrice(components: Array<{ componentId: string; quantity: number }>, componentsList: PackageComponent[]): number {
    return components.reduce((total, item) => {
      const component = componentsList.find(c => c.id === item.componentId);
      return total + (component ? component.price * item.quantity : 0);
    }, 0);
  }

  // Validate package compatibility
  static validatePackageCompatibility(components: PackageComponent[]): { valid: boolean; issues: string[] } {
    const issues: string[] = [];
    
    // Check for accommodation in multi-day packages
    const totalDuration = components.reduce((sum, c) => sum + c.duration, 0);
    const hasAccommodation = components.some(c => c.type === 'accommodation');
    
    if (totalDuration > 1 && !hasAccommodation) {
      issues.push('Pacchetto multi-giorno senza alloggio');
    }

    // Check for transport between locations
    const locations = components.map(c => c.location).filter(Boolean);
    const uniqueLocations = [...new Set(locations)];
    const hasTransport = components.some(c => c.type === 'transport');
    
    if (uniqueLocations.length > 1 && !hasTransport) {
      issues.push('Più destinazioni senza trasporto');
    }

    // Check for guide in complex packages
    const hasActivities = components.filter(c => c.type === 'activity').length > 2;
    const hasGuide = components.some(c => c.type === 'guide');
    
    if (hasActivities && !hasGuide) {
      issues.push('Molte attività senza guida - consigliabile aggiungerne una');
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }

  // Generate itinerary from components
  static generateItinerary(components: PackageComponent[]): Array<{
    day: number;
    title: string;
    description: string;
    location: string;
    activities: string[];
    meals: string[];
    accommodation?: string;
  }> {
    const sortedComponents = components.sort((a, b) => a.duration - b.duration);
    const itinerary: Array<any> = [];
    let currentDay = 1;

    // Group components by location and day
    const accommodations = components.filter(c => c.type === 'accommodation');
    const activities = components.filter(c => c.type === 'activity');
    const meals = components.filter(c => c.type === 'meal');

    // Calculate total days
    const totalDays = Math.max(1, accommodations.reduce((sum, acc) => sum + acc.duration, 0) + 1);

    for (let day = 1; day <= totalDays; day++) {
      const dayAccommodation = accommodations.find(acc => 
        day >= currentDay && day < currentDay + acc.duration
      );

      const dayActivities = activities.filter(act => 
        // Simple logic: distribute activities across days
        Math.ceil(activities.indexOf(act) / activities.length * totalDays) === day
      );

      const dayMeals = meals.filter(meal =>
        Math.ceil(meals.indexOf(meal) / meals.length * totalDays) === day
      );

      itinerary.push({
        day,
        title: `Giorno ${day}${dayActivities.length > 0 ? ` - ${dayActivities[0].location || 'Esperienza'}` : ''}`,
        description: dayActivities.map(act => act.description).join('. ') || 'Giornata libera',
        location: dayActivities[0]?.location || dayAccommodation?.location || '',
        activities: dayActivities.map(act => act.name),
        meals: dayMeals.map(meal => meal.name),
        accommodation: dayAccommodation?.name
      });
    }

    return itinerary;
  }

  // Get user's custom packages
  static async getUserPackages(userId: string): Promise<CustomPackage[]> {
    try {
      return await firestoreService.getWhere<CustomPackage>('custom_packages', 'userId', '==', userId);
    } catch (error) {
      console.error('Error fetching user packages:', error);
      return [];
    }
  }

  // Update custom package
  static async updateCustomPackage(packageId: string, updates: Partial<CustomPackage>): Promise<void> {
    try {
      await firestoreService.update('custom_packages', packageId, {
        ...updates,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating custom package:', error);
      throw error;
    }
  }

  // Create sample components
  static async createSampleComponents(): Promise<void> {
    const sampleComponents: Omit<PackageComponent, 'id'>[] = [
      {
        type: 'accommodation',
        name: 'Riad Tradizionale Marrakech',
        description: 'Autentico riad nel cuore della medina con patio interno e terrazza panoramica',
        duration: 3,
        price: 85,
        maxPersons: 2,
        location: 'Marrakech',
        included: ['Colazione', 'WiFi', 'Hammam tradizionale'],
        optional: false,
        category: 'standard',
        images: ['/images/riad-marrakech.png'],
        rating: 4.6,
        availability: {
          seasons: ['primavera', 'autunno', 'inverno'],
          daysOfWeek: [1, 2, 3, 4, 5, 6, 7]
        }
      },
      {
        type: 'activity',
        name: 'Tour Guidato della Medina',
        description: 'Esplorazione dei souq e monumenti storici con guida esperta locale',
        duration: 4,
        price: 45,
        maxPersons: 8,
        location: 'Marrakech',
        included: ['Guida certificata', 'Ingresso monumenti', 'Tè alla menta'],
        optional: false,
        category: 'culturale',
        images: ['/images/medina-tour.png'],
        rating: 4.8,
        availability: {
          seasons: ['tutto-anno'],
          daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
          timeSlots: ['09:00', '14:00']
        }
      },
      {
        type: 'experience',
        name: 'Notte nel Deserto del Sahara',
        description: 'Campo tendato tradizionale con cena berbera e musica sotto le stelle',
        duration: 1,
        price: 180,
        maxPersons: 12,
        location: 'Merzouga',
        included: ['Escursione cammelli', 'Cena e colazione', 'Musica tradizionale'],
        optional: false,
        category: 'avventura',
        images: ['/images/desert-camp.png'],
        rating: 4.9,
        availability: {
          seasons: ['primavera', 'autunno', 'inverno'],
          daysOfWeek: [1, 2, 3, 4, 5, 6, 7]
        }
      },
      {
        type: 'transport',
        name: 'Trasporto Privato 4x4',
        description: 'Veicolo fuoristrada con autista esperto per deserti e montagne',
        duration: 1,
        price: 120,
        maxPersons: 4,
        location: 'varie',
        included: ['Autista', 'Carburante', 'Assicurazione'],
        optional: false,
        category: 'trasporto',
        images: ['/images/4x4-transport.png'],
        availability: {
          seasons: ['tutto-anno'],
          daysOfWeek: [1, 2, 3, 4, 5, 6, 7]
        }
      }
    ];

    for (const component of sampleComponents) {
      await firestoreService.create('package_components', component);
    }
  }

  // Search components
  static searchComponents(components: PackageComponent[], query: string): PackageComponent[] {
    const searchTerm = query.toLowerCase();
    return components.filter(component =>
      component.name.toLowerCase().includes(searchTerm) ||
      component.description.toLowerCase().includes(searchTerm) ||
      component.location?.toLowerCase().includes(searchTerm) ||
      component.category.toLowerCase().includes(searchTerm)
    );
  }

  // Filter components
  static filterComponents(
    components: PackageComponent[], 
    filters: {
      type?: string;
      category?: string;
      maxPrice?: number;
      location?: string;
    }
  ): PackageComponent[] {
    return components.filter(component => {
      if (filters.type && component.type !== filters.type) return false;
      if (filters.category && component.category !== filters.category) return false;
      if (filters.maxPrice && component.price > filters.maxPrice) return false;
      if (filters.location && component.location !== filters.location) return false;
      return true;
    });
  }
}