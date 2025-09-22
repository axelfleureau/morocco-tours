// CMS Content Management System for Morocco Dreams
import { firestoreService, COLLECTIONS, CMSContent, City, PackageComponent, PackageTemplate, UserTheme, Guide, BlogPost } from './firestore';
import { Timestamp } from 'firebase/firestore';

// Re-export types using export type for isolatedModules
export type { CMSContent, City, PackageComponent, PackageTemplate, UserTheme, Guide, BlogPost } from './firestore';

export interface CMSSection {
  id?: string;
  name: string;
  component: string;
  visible: boolean;
  order: number;
  props: Record<string, any>;
  content: {
    [language: string]: Record<string, any>;
  };
  updatedAt: Timestamp;
}

export class CMSService {
  // Content Management
  static async getAllContent(type?: string): Promise<CMSContent[]> {
    try {
      if (type) {
        return await firestoreService.getWhere(COLLECTIONS.cmsContent, 'type', '==', type);
      }
      return await firestoreService.getAll(COLLECTIONS.cmsContent);
    } catch (error) {
      console.error('Error fetching CMS content:', error);
      return [];
    }
  }

  static async getContentBySlug(slug: string): Promise<CMSContent | null> {
    try {
      const results = await firestoreService.getWhere<CMSContent>(COLLECTIONS.cmsContent, 'slug', '==', slug);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error('Error fetching content by slug:', error);
      return null;
    }
  }

  static async saveContent(content: Omit<CMSContent, 'id'>): Promise<string> {
    try {
      return await firestoreService.create(COLLECTIONS.cmsContent, content);
    } catch (error) {
      console.error('Error saving CMS content:', error);
      throw error;
    }
  }

  static async updateContent(id: string, content: Partial<CMSContent>): Promise<void> {
    try {
      await firestoreService.update(COLLECTIONS.cmsContent, id, content);
    } catch (error) {
      console.error('Error updating CMS content:', error);
      throw error;
    }
  }

  static async deleteContent(id: string): Promise<void> {
    try {
      await firestoreService.delete(COLLECTIONS.cmsContent, id);
    } catch (error) {
      console.error('Error deleting CMS content:', error);
      throw error;
    }
  }

  // Section Management
  static async getAllSections(): Promise<CMSSection[]> {
    try {
      return await firestoreService.getAll(COLLECTIONS.cmsSections);
    } catch (error) {
      console.error('Error fetching CMS sections:', error);
      return [];
    }
  }

  static async saveSection(section: Omit<CMSSection, 'id'>): Promise<string> {
    try {
      return await firestoreService.create(COLLECTIONS.cmsSections, section);
    } catch (error) {
      console.error('Error saving CMS section:', error);
      throw error;
    }
  }

  static async updateSection(id: string, section: Partial<CMSSection>): Promise<void> {
    try {
      await firestoreService.update(COLLECTIONS.cmsSections, id, section);
    } catch (error) {
      console.error('Error updating CMS section:', error);
      throw error;
    }
  }

  // Bulk Operations
  static async publishContent(ids: string[]): Promise<void> {
    try {
      const promises = ids.map(id => 
        firestoreService.update(COLLECTIONS.cmsContent, id, { published: true })
      );
      await Promise.all(promises);
    } catch (error) {
      console.error('Error bulk publishing content:', error);
      throw error;
    }
  }

  static async unpublishContent(ids: string[]): Promise<void> {
    try {
      const promises = ids.map(id => 
        firestoreService.update(COLLECTIONS.cmsContent, id, { published: false })
      );
      await Promise.all(promises);
    } catch (error) {
      console.error('Error bulk unpublishing content:', error);
      throw error;
    }
  }

  // City Management
  static async getAllCities(): Promise<City[]> {
    try {
      return await firestoreService.getWhere(COLLECTIONS.cities, 'published', '==', true);
    } catch (error) {
      console.error('Error fetching cities:', error);
      return [];
    }
  }

  static async getCityBySlug(slug: string): Promise<City | null> {
    try {
      const results = await firestoreService.getWhere<City>(COLLECTIONS.cities, 'slug', '==', slug);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error('Error fetching city by slug:', error);
      return null;
    }
  }

  static async saveCity(city: Omit<City, 'id'>): Promise<string> {
    try {
      return await firestoreService.create(COLLECTIONS.cities, city);
    } catch (error) {
      console.error('Error saving city:', error);
      throw error;
    }
  }

  // Package Management
  static async getAllPackageComponents(): Promise<PackageComponent[]> {
    try {
      return await firestoreService.getWhere(COLLECTIONS.packageComponents, 'available', '==', true);
    } catch (error) {
      console.error('Error fetching package components:', error);
      return [];
    }
  }

  static async getPackageTemplates(): Promise<PackageTemplate[]> {
    try {
      return await firestoreService.getWhere(COLLECTIONS.packageTemplates, 'published', '==', true);
    } catch (error) {
      console.error('Error fetching package templates:', error);
      return [];
    }
  }

  static async savePackageTemplate(template: Omit<PackageTemplate, 'id'>): Promise<string> {
    try {
      return await firestoreService.create(COLLECTIONS.packageTemplates, template);
    } catch (error) {
      console.error('Error saving package template:', error);
      throw error;
    }
  }

  // Blog Management
  static async getAllBlogPosts(published?: boolean): Promise<BlogPost[]> {
    try {
      if (published !== undefined) {
        return await firestoreService.getWhere(COLLECTIONS.blog, 'published', '==', published);
      }
      return await firestoreService.getAll(COLLECTIONS.blog);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  static async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const results = await firestoreService.getWhere<BlogPost>(COLLECTIONS.blog, 'slug', '==', slug);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error('Error fetching blog post by slug:', error);
      return null;
    }
  }

  static async saveBlogPost(post: Omit<BlogPost, 'id'>): Promise<string> {
    try {
      return await firestoreService.create(COLLECTIONS.blog, post);
    } catch (error) {
      console.error('Error saving blog post:', error);
      throw error;
    }
  }

  // Guide Management
  static async getAllGuides(): Promise<Guide[]> {
    try {
      return await firestoreService.getWhere(COLLECTIONS.guides, 'isPublic', '==', true);
    } catch (error) {
      console.error('Error fetching guides:', error);
      return [];
    }
  }

  static async saveGuide(guide: Omit<Guide, 'id'>): Promise<string> {
    try {
      return await firestoreService.create(COLLECTIONS.guides, guide);
    } catch (error) {
      console.error('Error saving guide:', error);
      throw error;
    }
  }

  // User Theme Management
  static async getUserThemes(userId: string): Promise<UserTheme[]> {
    try {
      return await firestoreService.getWhere(COLLECTIONS.userThemes, 'userId', '==', userId);
    } catch (error) {
      console.error('Error fetching user themes:', error);
      return [];
    }
  }

  static async saveUserTheme(theme: Omit<UserTheme, 'id'>): Promise<string> {
    try {
      return await firestoreService.create(COLLECTIONS.userThemes, theme);
    } catch (error) {
      console.error('Error saving user theme:', error);
      throw error;
    }
  }
}