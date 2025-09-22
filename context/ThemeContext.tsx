"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SiteTheme } from '@/lib/firestore-schema'

interface ThemeContextType {
  currentTheme: SiteTheme | null
  setTheme: (theme: SiteTheme) => void
  applyTheme: (theme: SiteTheme) => void
  resetTheme: () => void
  isLoading: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

// Default Morocco Dreams theme
const defaultTheme: SiteTheme = {
  name: 'Morocco Dreams Default',
  isActive: true,
  colors: {
    primary: '#ea580c',
    secondary: '#dc2626', 
    accent: '#f59e0b',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  },
  typography: {
    headingFont: 'Inter, sans-serif',
    bodyFont: 'Inter, sans-serif',
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem', 
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  layout: {
    maxWidth: '1200px',
    containerPadding: '1rem',
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
    }
  },
  createdAt: new Date() as any,
  updatedAt: new Date() as any
}

export function MoroccoThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<SiteTheme | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load active theme from database
  useEffect(() => {
    loadActiveTheme()
  }, [])

  const loadActiveTheme = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/public/content?collection=site_theme&published=true')
      
      if (response.ok) {
        const data = await response.json()
        if (data.items && data.items.length > 0) {
          const activeTheme = data.items.find((theme: SiteTheme) => theme.isActive) || data.items[0]
          setCurrentTheme(activeTheme)
          applyTheme(activeTheme)
        } else {
          // No theme in database, use default
          setCurrentTheme(defaultTheme)
          applyTheme(defaultTheme)
        }
      } else {
        // API error, use default
        setCurrentTheme(defaultTheme)
        applyTheme(defaultTheme)
      }
    } catch (error) {
      console.error('Error loading theme:', error)
      setCurrentTheme(defaultTheme)
      applyTheme(defaultTheme)
    } finally {
      setIsLoading(false)
    }
  }

  const applyTheme = (theme: SiteTheme) => {
    if (typeof window === 'undefined') return

    // Generate CSS variables
    const cssVariables = [
      // Colors
      `--color-primary: ${theme.colors.primary}`,
      `--color-secondary: ${theme.colors.secondary}`,
      `--color-accent: ${theme.colors.accent}`,
      `--color-background: ${theme.colors.background}`,
      `--color-surface: ${theme.colors.surface}`,
      `--color-text: ${theme.colors.text}`,
      `--color-text-secondary: ${theme.colors.textSecondary}`,
      `--color-border: ${theme.colors.border}`,
      `--color-success: ${theme.colors.success}`,
      `--color-warning: ${theme.colors.warning}`,
      `--color-error: ${theme.colors.error}`,
      
      // Typography
      `--font-heading: ${theme.typography.headingFont}`,
      `--font-body: ${theme.typography.bodyFont}`,
      `--font-size-xs: ${theme.typography.sizes.xs}`,
      `--font-size-sm: ${theme.typography.sizes.sm}`,
      `--font-size-base: ${theme.typography.sizes.base}`,
      `--font-size-lg: ${theme.typography.sizes.lg}`,
      `--font-size-xl: ${theme.typography.sizes.xl}`,
      `--font-size-2xl: ${theme.typography.sizes['2xl']}`,
      `--font-size-3xl: ${theme.typography.sizes['3xl']}`,
      `--font-size-4xl: ${theme.typography.sizes['4xl']}`,
      
      // Layout
      `--max-width: ${theme.layout.maxWidth}`,
      `--container-padding: ${theme.layout.containerPadding}`,
      `--border-radius-sm: ${theme.layout.borderRadius.sm}`,
      `--border-radius-md: ${theme.layout.borderRadius.md}`,
      `--border-radius-lg: ${theme.layout.borderRadius.lg}`,
      `--border-radius-xl: ${theme.layout.borderRadius.xl}`,
      
      // Tailwind CSS compatible variables
      `--primary: ${theme.colors.primary}`,
      `--secondary: ${theme.colors.secondary}`,
      `--background: ${theme.colors.background}`,
      `--foreground: ${theme.colors.text}`,
      `--muted: ${theme.colors.surface}`,
      `--muted-foreground: ${theme.colors.textSecondary}`,
      `--border: ${theme.colors.border}`,
      `--ring: ${theme.colors.primary}`
    ].join(';\n')

    // Remove existing theme styles
    const existingStyle = document.getElementById('morocco-dynamic-theme')
    if (existingStyle) {
      existingStyle.remove()
    }

    // Apply new theme styles
    const style = document.createElement('style')
    style.id = 'morocco-dynamic-theme'
    style.textContent = `:root { ${cssVariables} }`
    document.head.appendChild(style)

    // Update document classes for theme-aware components
    document.documentElement.setAttribute('data-theme', theme.name.toLowerCase().replace(/\s+/g, '-'))
    
    console.log('🎨 Applied theme:', theme.name)
  }

  const setTheme = (theme: SiteTheme) => {
    setCurrentTheme(theme)
    applyTheme(theme)
  }

  const resetTheme = () => {
    setCurrentTheme(defaultTheme)
    applyTheme(defaultTheme)
  }

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    applyTheme,
    resetTheme,
    isLoading
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useMoroccoTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useMoroccoTheme must be used within a MoroccoThemeProvider')
  }
  return context
}

// Hook for theme-aware styling
export function useThemeStyles() {
  const { currentTheme } = useMoroccoTheme()
  
  if (!currentTheme) return {}
  
  return {
    primaryColor: currentTheme.colors.primary,
    secondaryColor: currentTheme.colors.secondary,
    accentColor: currentTheme.colors.accent,
    backgroundColor: currentTheme.colors.background,
    textColor: currentTheme.colors.text,
    headingFont: currentTheme.typography.headingFont,
    bodyFont: currentTheme.typography.bodyFont,
    maxWidth: currentTheme.layout.maxWidth,
    borderRadius: currentTheme.layout.borderRadius.md
  }
}