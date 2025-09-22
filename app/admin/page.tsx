"use client"

import React, { useState, useEffect } from "react"
import {
  Users,
  MapPin,
  Package,
  Settings,
  BarChart3,
  FileText,
  Database,
  Palette,
  Globe
} from "lucide-react"

// Components
import GoogleAuthButton from "@/components/admin/GoogleAuthButton"
import ContentDataGrid from "@/components/admin/ContentDataGrid"
import VisualEditor from "@/components/admin/VisualEditor"
import ThemeCustomizer from "@/components/admin/ThemeCustomizer"
import { GoogleAuthService } from "@/lib/google-auth"
import { COLLECTIONS } from "@/lib/firestore-schema"

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [loginError, setLoginError] = useState("")
  const [loading, setLoading] = useState(true)

  // Dashboard stats
  const [stats, setStats] = useState({
    cities: 0,
    experiences: 0,
    travels: 0,
    services: 0,
    total: 0
  })

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = GoogleAuthService.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await GoogleAuthService.getCurrentUserToken()
          if (token) {
            const verification = await GoogleAuthService.verifyAdminAccess(token)
            if (verification.isAdmin) {
              setCurrentUser(verification.user)
              setIsAuthenticated(true)
              setLoginError("")
            } else {
              setLoginError("Accesso non autorizzato - solo admin")
              setIsAuthenticated(false)
            }
          }
        } catch (error: any) {
          console.error('Auth verification error:', error)
          setLoginError("Errore verifica utente")
          setIsAuthenticated(false)
        }
      } else {
        setCurrentUser(null)
        setIsAuthenticated(false)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Load dashboard stats
  useEffect(() => {
    if (isAuthenticated) {
      loadStats()
    }
  }, [isAuthenticated])

  const loadStats = async () => {
    try {
      const token = await GoogleAuthService.getCurrentUserToken()
      if (!token) return

      const response = await fetch('/api/admin/populate', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats({
          cities: data.collections?.cities || 0,
          experiences: data.collections?.experiences || 0,
          travels: data.collections?.travels || 0,
          services: data.collections?.services || 0,
          total: data.total || 0
        })
      }
    } catch (error) {
      console.error('Stats loading error:', error)
    }
  }

  const handleAuthSuccess = (user: any) => {
    setCurrentUser(user)
    setIsAuthenticated(true)
    setLoginError("")
  }

  const handleAuthError = (error: string) => {
    setLoginError(error)
    setIsAuthenticated(false)
  }

  const handleLogout = async () => {
    try {
      await GoogleAuthService.signOut()
      setIsAuthenticated(false)
      setCurrentUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const populateDatabase = async () => {
    try {
      const token = await GoogleAuthService.getCurrentUserToken()
      if (!token) return

      const response = await fetch('/api/admin/populate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ force: true })
      })

      const data = await response.json()
      
      if (response.ok) {
        alert(`Database popolato con successo!\nCittà: ${data.result.cities}\nEsperienze: ${data.result.experiences}\nViaggi: ${data.result.travels}\nServizi: ${data.result.services}`)
        loadStats()
      } else {
        alert(`Errore: ${data.error}`)
      }
    } catch (error) {
      console.error('Populate error:', error)
      alert('Errore durante la popolazione del database')
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Caricamento...</p>
        </div>
      </div>
    )
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin CMS</h1>
            <p className="text-muted-foreground">Morocco Dreams - Sistema di gestione contenuti</p>
          </div>

          <div className="space-y-6">
            <GoogleAuthButton 
              onAuthSuccess={handleAuthSuccess}
              onAuthError={handleAuthError}
            />

            {loginError && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl text-sm">
                {loginError}
              </div>
            )}

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Accesso riservato agli amministratori autorizzati
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main admin interface
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-orange-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">CMS Admin</h1>
                <p className="text-sm text-muted-foreground">Morocco Dreams</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{currentUser?.displayName || currentUser?.email}</p>
                <p className="text-xs text-muted-foreground">Amministratore</p>
              </div>
              {currentUser?.photoURL && (
                <img 
                  src={currentUser.photoURL} 
                  alt="Avatar" 
                  className="w-8 h-8 rounded-full"
                />
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-card rounded-2xl shadow-sm p-4 space-y-2 sticky top-24">
              {[
                { id: "dashboard", name: "Dashboard", icon: BarChart3 },
                { id: "cities", name: "Città", icon: MapPin },
                { id: "experiences", name: "Esperienze", icon: FileText },
                { id: "travels", name: "Viaggi", icon: Package },
                { id: "services", name: "Servizi", icon: Settings },
                { id: "blog", name: "Blog", icon: FileText },
                { id: "database", name: "Database", icon: Database },
                { id: "theme", name: "Tema", icon: Palette },
                { id: "site", name: "Sito", icon: Globe },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {/* Dashboard */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
                  <div className="text-sm text-muted-foreground">
                    Ultimo accesso: {new Date().toLocaleString('it-IT')}
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: "Città", value: stats.cities, icon: MapPin, color: "blue" },
                    { label: "Esperienze", value: stats.experiences, icon: FileText, color: "green" },
                    { label: "Viaggi", value: stats.travels, icon: Package, color: "orange" },
                    { label: "Servizi", value: stats.services, icon: Settings, color: "purple" }
                  ].map((stat, index) => (
                    <div key={index} className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                        </div>
                        <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-4">Azioni Rapide</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button
                      onClick={populateDatabase}
                      className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-left"
                    >
                      <Database className="w-6 h-6 mb-2" />
                      <div className="font-medium">Popola Database</div>
                      <div className="text-sm opacity-75">Carica contenuti esempio</div>
                    </button>
                    <button
                      onClick={() => setActiveTab("cities")}
                      className="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-left"
                    >
                      <MapPin className="w-6 h-6 mb-2" />
                      <div className="font-medium">Gestisci Città</div>
                      <div className="text-sm opacity-75">Aggiungi e modifica città</div>
                    </button>
                    <button
                      onClick={() => setActiveTab("theme")}
                      className="p-4 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-left"
                    >
                      <Palette className="w-6 h-6 mb-2" />
                      <div className="font-medium">Personalizza Tema</div>
                      <div className="text-sm opacity-75">Colori e stili</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Cities Management */}
            {activeTab === "cities" && (
              <ContentDataGrid
                collection={COLLECTIONS.cities}
                title="Gestione Città"
                columns={[
                  { key: 'image', label: 'Immagine', type: 'image' },
                  { key: 'name', label: 'Nome', type: 'text', sortable: true },
                  { key: 'title', label: 'Titolo', type: 'text' },
                  { key: 'category', label: 'Categoria', type: 'text' },
                  { key: 'rating', label: 'Rating', type: 'number', sortable: true },
                  { key: 'reviews', label: 'Recensioni', type: 'number' },
                  { key: 'updatedAt', label: 'Aggiornato', type: 'date', sortable: true }
                ]}
                onCreate={() => alert('Modal creazione città - da implementare')}
                onEdit={(item) => alert(`Modifica città: ${item.name} - da implementare`)}
              />
            )}

            {/* Experiences Management */}
            {activeTab === "experiences" && (
              <ContentDataGrid
                collection={COLLECTIONS.experiences}
                title="Gestione Esperienze"
                columns={[
                  { key: 'images', label: 'Immagine', type: 'image' },
                  { key: 'title', label: 'Titolo', type: 'text', sortable: true },
                  { key: 'category', label: 'Categoria', type: 'text' },
                  { key: 'price', label: 'Prezzo', type: 'number', sortable: true },
                  { key: 'duration', label: 'Durata', type: 'text' },
                  { key: 'location', label: 'Luogo', type: 'text' },
                  { key: 'rating', label: 'Rating', type: 'number', sortable: true }
                ]}
                onCreate={() => alert('Modal creazione esperienza - da implementare')}
                onEdit={(item) => alert(`Modifica esperienza: ${item.title} - da implementare`)}
              />
            )}

            {/* Travels Management */}
            {activeTab === "travels" && (
              <ContentDataGrid
                collection={COLLECTIONS.travels}
                title="Gestione Viaggi"
                columns={[
                  { key: 'images', label: 'Immagine', type: 'image' },
                  { key: 'title', label: 'Titolo', type: 'text', sortable: true },
                  { key: 'category', label: 'Categoria', type: 'text' },
                  { key: 'price', label: 'Prezzo', type: 'number', sortable: true },
                  { key: 'duration', label: 'Durata', type: 'text' },
                  { key: 'rating', label: 'Rating', type: 'number', sortable: true }
                ]}
                onCreate={() => alert('Modal creazione viaggio - da implementare')}
                onEdit={(item) => alert(`Modifica viaggio: ${item.title} - da implementare`)}
              />
            )}

            {/* Services Management */}
            {activeTab === "services" && (
              <ContentDataGrid
                collection={COLLECTIONS.services}
                title="Gestione Servizi"
                columns={[
                  { key: 'name', label: 'Nome', type: 'text', sortable: true },
                  { key: 'category', label: 'Categoria', type: 'text' },
                  { key: 'type', label: 'Tipo', type: 'text' },
                  { key: 'price', label: 'Prezzo', type: 'number', sortable: true },
                  { key: 'priceType', label: 'Tipo Prezzo', type: 'text' },
                  { key: 'locations', label: 'Località', type: 'array' }
                ]}
                onCreate={() => alert('Modal creazione servizio - da implementare')}
                onEdit={(item) => alert(`Modifica servizio: ${item.name} - da implementare`)}
              />
            )}

            {/* Database Management */}
            {activeTab === "database" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Gestione Database</h2>
                
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-4">Statistiche Collezioni</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(stats).filter(([key]) => key !== 'total').map(([key, value]) => (
                      <div key={key} className="flex justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium capitalize">{key}</span>
                        <span className="text-primary font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-border">
                    <button
                      onClick={populateDatabase}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 font-medium"
                    >
                      Ripopola Database Completo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Blog Management */}
            {activeTab === "blog" && (
              <ContentDataGrid
                collection={COLLECTIONS.blog}
                title="Gestione Blog"
                columns={[
                  { key: 'coverImage', label: 'Immagine', type: 'image' },
                  { key: 'title', label: 'Titolo', type: 'text', sortable: true },
                  { key: 'excerpt', label: 'Estratto', type: 'text' },
                  { key: 'author', label: 'Autore', type: 'text' },
                  { key: 'category', label: 'Categoria', type: 'text' },
                  { key: 'tags', label: 'Tag', type: 'array' },
                  { key: 'updatedAt', label: 'Aggiornato', type: 'date', sortable: true }
                ]}
                onCreate={() => alert('Modal creazione post - da implementare')}
                onEdit={(item) => alert(`Modifica post: ${item.title} - da implementare`)}
              />
            )}

            {/* Theme Customization */}
            {activeTab === "theme" && (
              <ThemeCustomizer />
            )}

            {/* Visual Site Editor */}
            {activeTab === "site" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Editor Visuale Sito</h2>
                <VisualEditor
                  pageType="homepage"
                  onSave={(blocks) => {
                    console.log('Saving page blocks:', blocks)
                    alert('Blocchi pagina salvati! (funzionalità da completare)')
                  }}
                />
              </div>
            )}

            {/* Placeholder for other tabs */}
            {!["dashboard", "cities", "experiences", "travels", "services", "database", "blog", "theme", "site"].includes(activeTab) && (
              <div className="bg-card rounded-2xl p-8 text-center">
                <div className="text-muted-foreground">
                  <Settings className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Sezione in Sviluppo</h3>
                  <p>La sezione "{activeTab}" sarà disponibile nelle prossime versioni del CMS.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}