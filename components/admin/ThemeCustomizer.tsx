"use client"

import React, { useState, useEffect } from 'react'
import { Palette, Type, Layout, Save, RotateCcw, Eye, Sparkles } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useMoroccoTheme } from '@/context/ThemeContext'
import { SiteTheme } from '@/lib/firestore-schema'

interface ThemeConfig {
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
}

const defaultTheme: ThemeConfig = {
  colors: {
    primary: '#ea580c',
    secondary: '#f97316',
    accent: '#06b6d4',
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
  }
}

export default function ThemeCustomizer() {
  const { user } = useAuth()
  const { currentTheme, setTheme: setGlobalTheme, applyTheme, resetTheme: resetGlobalTheme } = useMoroccoTheme()
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme)
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'layout'>('colors')
  const [isLoading, setIsLoading] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  // Load current theme from context
  useEffect(() => {
    if (currentTheme) {
      setTheme({
        colors: currentTheme.colors,
        typography: currentTheme.typography,
        layout: currentTheme.layout
      })
    }
  }, [currentTheme])

  const loadCurrentTheme = async () => {
    try {
      const response = await fetch('/api/site-settings')
      if (response.ok) {
        const data = await response.json()
        if (data.theme && typeof data.theme === 'object') {
          setTheme({
            colors: data.theme.colors || defaultTheme.colors,
            typography: data.theme.typography || defaultTheme.typography,
            layout: data.theme.layout || defaultTheme.layout
          })
        }
      }
    } catch (error) {
      console.error('Error loading theme:', error)
    }
  }

  // Save theme
  const saveTheme = async () => {
    try {
      setIsLoading(true)
      
      const adminToken = process.env.NEXT_PUBLIC_ADMIN_TOKEN || localStorage.getItem('admin_token')
      
      if (!adminToken) {
        alert('Token di autenticazione admin necessario')
        return
      }

      const response = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          theme: {
            name: 'Default Theme',
            isActive: true,
            colors: theme.colors,
            typography: theme.typography,
            layout: theme.layout
          }
        })
      })

      if (response.ok) {
        alert('Tema salvato con successo!')
        
        // Apply the saved theme globally
        const siteTheme: SiteTheme = {
          name: 'Custom Theme',
          isActive: true,
          colors: theme.colors,
          typography: theme.typography,
          layout: theme.layout,
          createdAt: new Date() as any,
          updatedAt: new Date() as any
        }
        setGlobalTheme(siteTheme)
      } else {
        const error = await response.json()
        alert(`Errore nel salvataggio: ${error.error}`)
      }
    } catch (error) {
      console.error('Save theme error:', error)
      alert('Errore durante il salvataggio del tema')
    } finally {
      setIsLoading(false)
    }
  }

  // Apply preview instantly via context
  const applyPreview = () => {
    const siteTheme: SiteTheme = {
      name: 'Preview Theme',
      isActive: true,
      colors: theme.colors,
      typography: theme.typography,
      layout: theme.layout,
      createdAt: new Date() as any,
      updatedAt: new Date() as any
    }
    
    setGlobalTheme(siteTheme)
  }

  // Reset to default
  const resetTheme = () => {
    if (confirm('Ripristinare il tema predefinito? Tutte le personalizzazioni andranno perse.')) {
      setTheme(defaultTheme)
      resetGlobalTheme()
    }
  }

  // Update theme property
  const updateTheme = (section: keyof ThemeConfig, key: string, value: any) => {
    setTheme(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  // Color palette presets
  const colorPresets = [
    {
      name: 'Morocco Sand',
      colors: { primary: '#ea580c', secondary: '#dc2626', accent: '#f59e0b' }
    },
    {
      name: 'Desert Sand',
      colors: { primary: '#d97706', secondary: '#dc2626', accent: '#059669' }
    },
    {
      name: 'Imperial Purple',
      colors: { primary: '#7c3aed', secondary: '#db2777', accent: '#0891b2' }
    },
    {
      name: 'Ocean Teal',
      colors: { primary: '#0f766e', secondary: '#ea580c', accent: '#7c2d12' }
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Personalizzazione Tema</h2>
        <div className="flex gap-2">
          <button
            onClick={applyPreview}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Anteprima Live
          </button>
          <button
            onClick={resetTheme}
            className="px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={saveTheme}
            disabled={isLoading}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isLoading ? 'Salvando...' : 'Salva Tema'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-border">
        {[
          { id: 'colors', name: 'Colori', icon: Palette },
          { id: 'typography', name: 'Tipografia', icon: Type },
          { id: 'layout', name: 'Layout', icon: Layout }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.name}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          {/* Colors Tab */}
          {activeTab === 'colors' && (
            <div className="space-y-6">
              {/* Color Presets */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Palette Predefinite</h3>
                <div className="grid grid-cols-2 gap-3">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        updateTheme('colors', 'primary', preset.colors.primary)
                        updateTheme('colors', 'secondary', preset.colors.secondary)
                        updateTheme('colors', 'accent', preset.colors.accent)
                      }}
                      className="p-3 border rounded-lg hover:bg-gray-50 text-left"
                    >
                      <div className="flex gap-2 mb-2">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: preset.colors.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: preset.colors.secondary }}
                        />
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: preset.colors.accent }}
                        />
                      </div>
                      <div className="text-sm font-medium">{preset.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Individual Colors */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Colori Personalizzati</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(theme.colors).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium mb-2 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) => updateTheme('colors', key, e.target.value)}
                          className="w-12 h-10 border rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => updateTheme('colors', key, e.target.value)}
                          className="flex-1 px-3 py-2 border rounded text-sm font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Typography Tab */}
          {activeTab === 'typography' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Font</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Font Titoli</label>
                    <select
                      value={theme.typography.headingFont}
                      onChange={(e) => updateTheme('typography', 'headingFont', e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    >
                      <option value="Inter, sans-serif">Inter</option>
                      <option value="Playfair Display, serif">Playfair Display</option>
                      <option value="Montserrat, sans-serif">Montserrat</option>
                      <option value="Lora, serif">Lora</option>
                      <option value="Roboto, sans-serif">Roboto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Font Corpo</label>
                    <select
                      value={theme.typography.bodyFont}
                      onChange={(e) => updateTheme('typography', 'bodyFont', e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    >
                      <option value="Inter, sans-serif">Inter</option>
                      <option value="Open Sans, sans-serif">Open Sans</option>
                      <option value="Source Sans Pro, sans-serif">Source Sans Pro</option>
                      <option value="Nunito, sans-serif">Nunito</option>
                      <option value="Roboto, sans-serif">Roboto</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Dimensioni Font</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(theme.typography.sizes).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium mb-2">{key}</label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateTheme('typography', 'sizes', {
                          ...theme.typography.sizes,
                          [key]: e.target.value
                        })}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Layout Tab */}
          {activeTab === 'layout' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Dimensioni Container</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Larghezza Massima</label>
                    <input
                      type="text"
                      value={theme.layout.maxWidth}
                      onChange={(e) => updateTheme('layout', 'maxWidth', e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="1200px"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Padding Container</label>
                    <input
                      type="text"
                      value={theme.layout.containerPadding}
                      onChange={(e) => updateTheme('layout', 'containerPadding', e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="1rem"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Border Radius</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(theme.layout.borderRadius).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium mb-2">{key}</label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateTheme('layout', 'borderRadius', {
                          ...theme.layout.borderRadius,
                          [key]: e.target.value
                        })}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="bg-card border rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Anteprima</h3>
          <div 
            className="space-y-4 p-4 border rounded-lg"
            style={{
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              fontFamily: theme.typography.bodyFont
            }}
          >
            <h1 
              style={{
                color: theme.colors.primary,
                fontFamily: theme.typography.headingFont,
                fontSize: theme.typography.sizes['3xl'],
                fontWeight: theme.typography.weights.bold
              }}
            >
              Morocco Dreams
            </h1>
            <p style={{ color: theme.colors.textSecondary }}>
              Scopri la magia del Marocco con i nostri tour autentici
            </p>
            <button
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.background,
                padding: '12px 24px',
                borderRadius: theme.layout.borderRadius.md,
                border: 'none',
                fontWeight: theme.typography.weights.semibold
              }}
            >
              Scopri i Tour
            </button>
            <div
              style={{
                backgroundColor: theme.colors.surface,
                padding: '16px',
                borderRadius: theme.layout.borderRadius.lg,
                border: `1px solid ${theme.colors.border}`
              }}
            >
              <h3 
                style={{
                  color: theme.colors.secondary,
                  fontFamily: theme.typography.headingFont,
                  fontSize: theme.typography.sizes.xl,
                  fontWeight: theme.typography.weights.semibold,
                  marginBottom: '8px'
                }}
              >
                Le Città Imperiali
              </h3>
              <p style={{ fontSize: theme.typography.sizes.sm }}>
                Un viaggio attraverso la storia del Marocco
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}