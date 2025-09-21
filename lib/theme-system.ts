// Advanced Theme Customization System for Morocco Dreams
import { firestoreService } from './firestore';

export interface ThemeConfig {
  id?: string;
  userId: string;
  pagePath: string; // e.g., '/', '/viaggi', '/admin'
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
    gradient?: {
      from: string;
      to: string;
      direction: 'to-r' | 'to-br' | 'to-b' | 'to-bl' | 'to-l';
    };
  };
  typography: {
    fontFamily: string;
    headingFont?: string;
    fontSize: {
      base: string;
      heading: string;
      small: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      bold: number;
    };
  };
  layout: {
    containerMaxWidth: string;
    borderRadius: string;
    spacing: string;
    headerHeight: string;
  };
  components: {
    button: {
      style: 'rounded' | 'square' | 'pill';
      shadow: boolean;
      animation: boolean;
    };
    card: {
      style: 'flat' | 'elevated' | 'bordered';
      padding: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export const DEFAULT_THEME: Omit<ThemeConfig, 'id' | 'userId' | 'pagePath' | 'createdAt' | 'updatedAt'> = {
  colors: {
    primary: '#ea580c', // orange-600
    secondary: '#dc2626', // red-600  
    accent: '#f97316', // orange-500
    background: '#ffffff',
    foreground: '#0f172a', // slate-900
    muted: '#f1f5f9', // slate-100
    border: '#e2e8f0', // slate-200
    gradient: {
      from: '#ea580c',
      to: '#dc2626',
      direction: 'to-br'
    }
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    headingFont: 'Playfair Display, serif',
    fontSize: {
      base: '16px',
      heading: '24px',
      small: '14px'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700
    }
  },
  layout: {
    containerMaxWidth: '1200px',
    borderRadius: '12px',
    spacing: '16px',
    headerHeight: '80px'
  },
  components: {
    button: {
      style: 'rounded',
      shadow: true,
      animation: true
    },
    card: {
      style: 'elevated',
      padding: '24px'
    }
  }
};

export class ThemeService {
  // Get theme for specific page/user
  static async getTheme(userId: string, pagePath: string): Promise<ThemeConfig | null> {
    try {
      const themes = await firestoreService.getWhere<ThemeConfig>(
        'user_themes', 
        'userId', 
        '==', 
        userId
      );
      return themes.find(theme => theme.pagePath === pagePath) || null;
    } catch (error) {
      console.error('Error fetching theme:', error);
      return null;
    }
  }

  // Save theme configuration
  static async saveTheme(theme: Omit<ThemeConfig, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      return await firestoreService.create('user_themes', {
        ...theme,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error saving theme:', error);
      throw error;
    }
  }

  // Update existing theme
  static async updateTheme(themeId: string, updates: Partial<ThemeConfig>): Promise<void> {
    try {
      await firestoreService.update('user_themes', themeId, {
        ...updates,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating theme:', error);
      throw error;
    }
  }

  // Generate CSS variables from theme config
  static generateCSSVariables(theme: ThemeConfig): string {
    return `
      :root {
        --primary: ${theme.colors.primary};
        --secondary: ${theme.colors.secondary};
        --accent: ${theme.colors.accent};
        --background: ${theme.colors.background};
        --foreground: ${theme.colors.foreground};
        --muted: ${theme.colors.muted};
        --border: ${theme.colors.border};
        --font-family: ${theme.typography.fontFamily};
        --heading-font: ${theme.typography.headingFont || theme.typography.fontFamily};
        --font-size-base: ${theme.typography.fontSize.base};
        --font-size-heading: ${theme.typography.fontSize.heading};
        --font-size-small: ${theme.typography.fontSize.small};
        --font-weight-normal: ${theme.typography.fontWeight.normal};
        --font-weight-medium: ${theme.typography.fontWeight.medium};
        --font-weight-bold: ${theme.typography.fontWeight.bold};
        --container-max-width: ${theme.layout.containerMaxWidth};
        --border-radius: ${theme.layout.borderRadius};
        --spacing: ${theme.layout.spacing};
        --header-height: ${theme.layout.headerHeight};
      }
      
      ${theme.colors.gradient ? `
        .gradient-bg {
          background: linear-gradient(${theme.colors.gradient.direction}, ${theme.colors.gradient.from}, ${theme.colors.gradient.to});
        }
      ` : ''}
    `;
  }

  // Apply theme to page
  static applyTheme(theme: ThemeConfig): void {
    const styleElement = document.getElementById('dynamic-theme') || document.createElement('style');
    styleElement.id = 'dynamic-theme';
    styleElement.textContent = this.generateCSSVariables(theme);
    
    if (!document.getElementById('dynamic-theme')) {
      document.head.appendChild(styleElement);
    }
  }

  // Get all user themes
  static async getUserThemes(userId: string): Promise<ThemeConfig[]> {
    try {
      return await firestoreService.getWhere<ThemeConfig>('user_themes', 'userId', '==', userId);
    } catch (error) {
      console.error('Error fetching user themes:', error);
      return [];
    }
  }

  // Delete theme
  static async deleteTheme(themeId: string): Promise<void> {
    try {
      await firestoreService.delete('user_themes', themeId);
    } catch (error) {
      console.error('Error deleting theme:', error);
      throw error;
    }
  }

  // Preset themes
  static getPresetThemes(): Partial<ThemeConfig>[] {
    return [
      {
        colors: {
          primary: '#ea580c',
          secondary: '#dc2626',
          accent: '#f97316',
          background: '#ffffff',
          foreground: '#0f172a',
          muted: '#f1f5f9',
          border: '#e2e8f0',
          gradient: { from: '#ea580c', to: '#dc2626', direction: 'to-br' }
        }
      },
      {
        colors: {
          primary: '#0f766e',
          secondary: '#0891b2',
          accent: '#06b6d4',
          background: '#ffffff',
          foreground: '#0f172a',
          muted: '#f0f9ff',
          border: '#e0f2fe',
          gradient: { from: '#0f766e', to: '#0891b2', direction: 'to-br' }
        }
      },
      {
        colors: {
          primary: '#7c3aed',
          secondary: '#c026d3',
          accent: '#a855f7',
          background: '#ffffff',
          foreground: '#0f172a',
          muted: '#faf5ff',
          border: '#f3e8ff',
          gradient: { from: '#7c3aed', to: '#c026d3', direction: 'to-br' }
        }
      }
    ];
  }
}