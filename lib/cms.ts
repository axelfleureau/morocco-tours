// CMS Content Management System for Morocco Dreams
import { firestoreService } from './firestore';

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
  createdAt: Date;
  updatedAt: Date;
}

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
  updatedAt: Date;
}

export class CMSService {
  // Content Management
  static async getAllContent(type?: string): Promise<CMSContent[]> {
    try {
      if (type) {
        return await firestoreService.getWhere('cms_content', 'type', '==', type);
      }
      return await firestoreService.getAll('cms_content');
    } catch (error) {
      console.error('Error fetching CMS content:', error);
      return [];
    }
  }

  static async getContentBySlug(slug: string): Promise<CMSContent | null> {
    try {
      const results = await firestoreService.getWhere<CMSContent>('cms_content', 'slug', '==', slug);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error('Error fetching content by slug:', error);
      return null;
    }
  }

  static async saveContent(content: Omit<CMSContent, 'id'>): Promise<string> {
    try {
      return await firestoreService.create('cms_content', {
        ...content,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error saving CMS content:', error);
      throw error;
    }
  }

  static async updateContent(id: string, content: Partial<CMSContent>): Promise<void> {
    try {
      await firestoreService.update('cms_content', id, {
        ...content,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating CMS content:', error);
      throw error;
    }
  }

  static async deleteContent(id: string): Promise<void> {
    try {
      await firestoreService.delete('cms_content', id);
    } catch (error) {
      console.error('Error deleting CMS content:', error);
      throw error;
    }
  }

  // Section Management
  static async getAllSections(): Promise<CMSSection[]> {
    try {
      return await firestoreService.getAll('cms_sections');
    } catch (error) {
      console.error('Error fetching CMS sections:', error);
      return [];
    }
  }

  static async saveSection(section: Omit<CMSSection, 'id'>): Promise<string> {
    try {
      return await firestoreService.create('cms_sections', {
        ...section,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error saving CMS section:', error);
      throw error;
    }
  }

  static async updateSection(id: string, section: Partial<CMSSection>): Promise<void> {
    try {
      await firestoreService.update('cms_sections', id, {
        ...section,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating CMS section:', error);
      throw error;
    }
  }

  // Bulk Operations
  static async publishContent(ids: string[]): Promise<void> {
    try {
      const promises = ids.map(id => 
        firestoreService.update('cms_content', id, { published: true, updatedAt: new Date() })
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
        firestoreService.update('cms_content', id, { published: false, updatedAt: new Date() })
      );
      await Promise.all(promises);
    } catch (error) {
      console.error('Error bulk unpublishing content:', error);
      throw error;
    }
  }
}