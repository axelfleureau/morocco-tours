"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Users,
  MapPin,
  Package,
  Settings,
  Eye,
  EyeOff,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  BarChart3,
  Mail,
  Phone,
  FileText,
} from "lucide-react"

// Firebase imports
import { firestoreService, COLLECTIONS } from "@/lib/firestore"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import CMSInterface from "@/components/admin/CMSInterface"

// Firebase Authentication is handled by onAuthStateChanged listener below

const mockDatabase = {
  cities: [
    {
      id: "1",
      name: "Marrakech",
      description: "La Perla Rossa del Marocco",
      coordinates: [-7.9811, 31.6295],
      image: "/images/marrakech-medina.png",
      visible: true,
    },
    {
      id: "2",
      name: "Fes",
      description: "La capitale spirituale del Marocco",
      coordinates: [-5.0003, 34.0181],
      image: "/images/fes-architecture.png",
      visible: true,
    },
  ],
  packages: [
    {
      id: "1",
      title: "Tour delle Città Imperiali",
      duration: "8 giorni / 7 notti",
      price: 890,
      description: "Un viaggio completo attraverso le quattro città imperiali",
      visible: true,
      category: "group",
    },
  ],
  sections: [
    { id: "hero", name: "Hero Section", visible: true },
    { id: "whyChooseUs", name: "Perché Sceglierci", visible: true },
    { id: "popularTrips", name: "Viaggi Popolari", visible: true },
    { id: "experiences", name: "Esperienze Autentiche", visible: true },
    { id: "testimonials", name: "Testimonianze", visible: true },
    { id: "contact", name: "Form Contatto", visible: true },
    { id: "map", name: "Mappa Interattiva", visible: true },
    { id: "faq", name: "FAQ", visible: true },
  ],
  users: [
    {
      id: "1",
      name: "Marco Rossi",
      email: "marco.rossi@email.com",
      phone: "+39 123 456 7890",
      registrationDate: "2024-01-15",
      totalBookings: 2,
      totalSpent: 1780,
      lastActivity: "2024-01-20",
    },
    {
      id: "2",
      name: "Giulia Bianchi",
      email: "giulia.bianchi@email.com",
      phone: "+39 987 654 3210",
      registrationDate: "2024-01-10",
      totalBookings: 1,
      totalSpent: 650,
      lastActivity: "2024-01-18",
    },
  ],
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [loginError, setLoginError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  // Data states (now dynamic from Firebase)
  const [cities, setCities] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const [sections, setSections] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Modal states
  const [showCityModal, setShowCityModal] = useState(false)
  const [showPackageModal, setShowPackageModal] = useState(false)
  const [editingCity, setEditingCity] = useState<any>(null)
  const [editingPackage, setEditingPackage] = useState<any>(null)

  // Firebase data loading
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        
        // Load data from Firebase collections
        const [citiesData, packagesData, usersData, sectionsData] = await Promise.all([
          firestoreService.getAll('cities'),
          firestoreService.getAll(COLLECTIONS.travels),
          firestoreService.getAll(COLLECTIONS.users),
          firestoreService.getAll(COLLECTIONS.siteContent)
        ])

        setCities(citiesData || [])
        setPackages(packagesData || [])
        setUsers(usersData || [])
        setSections(sectionsData || [])
        
      } catch (error) {
        console.error('Error loading data:', error)
        // Fallback to mock data if Firebase fails
        setCities(mockDatabase.cities)
        setPackages(mockDatabase.packages)
        setUsers(mockDatabase.users)
        setSections(mockDatabase.sections)
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  // Firebase Authentication listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Check if user has admin role in Firestore
          const userProfile = await firestoreService.getById(COLLECTIONS.users, user.uid)
          if (userProfile && typeof userProfile === 'object' && 'role' in userProfile && userProfile.role === 'admin') {
            setCurrentUser(userProfile)
            setIsAuthenticated(true)
            setLoginError("")
          } else {
            setLoginError("Accesso non autorizzato - solo admin")
            setIsAuthenticated(false)
          }
        } catch (error) {
          console.error('Error checking user role:', error)
          setLoginError("Errore verifica utente")
          setIsAuthenticated(false)
        }
      } else {
        setCurrentUser(null)
        setIsAuthenticated(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError("")

    try {
      // Use Firebase Auth
      const { signInWithEmailAndPassword } = await import('firebase/auth')
      await signInWithEmailAndPassword(auth, loginForm.username, loginForm.password)
      // The onAuthStateChanged listener will handle authentication and role verification
    } catch (error: any) {
      console.error('Admin login error:', error)
      if (error.code === 'auth/user-not-found') {
        setLoginError("Admin non trovato")
      } else if (error.code === 'auth/wrong-password') {
        setLoginError("Password errata")
      } else if (error.code === 'auth/invalid-email') {
        setLoginError("Email non valida")
      } else {
        setLoginError("Errore di login. Verifica le credenziali.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      const { signOut } = await import('firebase/auth')
      await signOut(auth)
      setIsAuthenticated(false)
      setLoginForm({ username: "", password: "" })
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const toggleSectionVisibility = async (sectionId: string) => {
    try {
      const section = sections.find(s => s.id === sectionId)
      if (section) {
        await firestoreService.update(COLLECTIONS.siteContent, sectionId, { 
          visible: !section.visible 
        })
      }
      setSections((prev) =>
        prev.map((section) => (section.id === sectionId ? { ...section, visible: !section.visible } : section)),
      )
    } catch (error) {
      console.error('Error toggling section visibility:', error)
      // Fallback to local state update
      setSections((prev) =>
        prev.map((section) => (section.id === sectionId ? { ...section, visible: !section.visible } : section)),
      )
    }
  }

  const toggleCityVisibility = async (cityId: string) => {
    try {
      const city = cities.find(c => c.id === cityId)
      if (city) {
        await firestoreService.update('cities', cityId, { 
          visible: !city.visible 
        })
      }
      setCities((prev) => prev.map((city) => (city.id === cityId ? { ...city, visible: !city.visible } : city)))
    } catch (error) {
      console.error('Error toggling city visibility:', error)
      // Fallback to local state update
      setCities((prev) => prev.map((city) => (city.id === cityId ? { ...city, visible: !city.visible } : city)))
    }
  }

  const handleSaveCity = async (cityData: any) => {
    try {
      if (editingCity) {
        // Update existing city in Firebase
        await firestoreService.update('cities', editingCity.id, cityData)
        setCities((prev) => prev.map((city) => (city.id === editingCity.id ? { ...city, ...cityData } : city)))
      } else {
        // Create new city in Firebase
        const newCityId = await firestoreService.create('cities', {
          ...cityData,
          visible: true,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        const newCity = { id: newCityId, ...cityData, visible: true }
        setCities((prev) => [...prev, newCity])
      }
    } catch (error) {
      console.error('Error saving city:', error)
      // Fallback to local state update
      if (editingCity) {
        setCities((prev) => prev.map((city) => (city.id === editingCity.id ? { ...city, ...cityData } : city)))
      } else {
        const newCity = { id: Date.now().toString(), ...cityData, visible: true }
        setCities((prev) => [...prev, newCity])
      }
    }
    setShowCityModal(false)
    setEditingCity(null)
  }

  const handleDeleteCity = async (cityId: string) => {
    if (confirm("Sei sicuro di voler eliminare questa città?")) {
      try {
        // Delete from Firebase
        await firestoreService.delete('cities', cityId)
        setCities((prev) => prev.filter((city) => city.id !== cityId))
      } catch (error) {
        console.error('Error deleting city:', error)
        // Fallback to local state update
        setCities((prev) => prev.filter((city) => city.id !== cityId))
      }
    }
  }

  // Package CRUD operations with Firebase
  const handleSavePackage = async (packageData: any) => {
    try {
      if (editingPackage) {
        // Update existing package in Firebase
        await firestoreService.update(COLLECTIONS.travels, editingPackage.id, packageData)
        setPackages((prev) => prev.map((pkg) => (pkg.id === editingPackage.id ? { ...pkg, ...packageData } : pkg)))
      } else {
        // Create new package in Firebase
        const newPackageId = await firestoreService.create(COLLECTIONS.travels, {
          ...packageData,
          visible: true,
          published: true,
          featured: false,
          rating: 0,
          reviews: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        const newPackage = { id: newPackageId, ...packageData, visible: true }
        setPackages((prev) => [...prev, newPackage])
      }
    } catch (error) {
      console.error('Error saving package:', error)
      // Fallback to local state update
      if (editingPackage) {
        setPackages((prev) => prev.map((pkg) => (pkg.id === editingPackage.id ? { ...pkg, ...packageData } : pkg)))
      } else {
        const newPackage = { id: Date.now().toString(), ...packageData, visible: true }
        setPackages((prev) => [...prev, newPackage])
      }
    }
    setShowPackageModal(false)
    setEditingPackage(null)
  }

  const handleDeletePackage = async (packageId: string) => {
    if (confirm("Sei sicuro di voler eliminare questo pacchetto?")) {
      try {
        // Delete from Firebase
        await firestoreService.delete(COLLECTIONS.travels, packageId)
        setPackages((prev) => prev.filter((pkg) => pkg.id !== packageId))
      } catch (error) {
        console.error('Error deleting package:', error)
        // Fallback to local state update
        setPackages((prev) => prev.filter((pkg) => pkg.id !== packageId))
      }
    }
  }

  const togglePackageVisibility = async (packageId: string) => {
    try {
      const pkg = packages.find(p => p.id === packageId)
      if (pkg) {
        await firestoreService.update(COLLECTIONS.travels, packageId, { 
          visible: !pkg.visible 
        })
      }
      setPackages((prev) => prev.map((pkg) => (pkg.id === packageId ? { ...pkg, visible: !pkg.visible } : pkg)))
    } catch (error) {
      console.error('Error toggling package visibility:', error)
      // Fallback to local state update
      setPackages((prev) => prev.map((pkg) => (pkg.id === packageId ? { ...pkg, visible: !pkg.visible } : pkg)))
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground font-bold text-2xl">M</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Morocco Dreams</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm((prev) => ({ ...prev, username: e.target.value }))}
                className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="morocco2024"
                required
              />
            </div>

            {loginError && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold disabled:opacity-50"
            >
              {isLoading ? "Accesso in corso..." : "Accedi"}
            </button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-xl">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Credenziali di test:</strong>
              <br />
              Username: admin
              <br />
              Password: morocco2024
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
                <p className="text-sm text-muted-foreground">Morocco Dreams</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-card rounded-2xl shadow-sm p-4 space-y-2">
              {[
                { id: "dashboard", name: "Dashboard", icon: BarChart3 },
                { id: "content", name: "Gestione Contenuti", icon: FileText },
                { id: "sections", name: "Sezioni Homepage", icon: Settings },
                { id: "cities", name: "Gestione Città", icon: MapPin },
                { id: "packages", name: "Pacchetti Viaggio", icon: Package },
                { id: "users", name: "Utenti", icon: Users },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-primary/10 text-primary"
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
          <div className="lg:col-span-3">
            {/* Dashboard */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Utenti Totali</p>
                        <p className="text-2xl font-bold text-foreground">{users.length}</p>
                      </div>
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Città Attive</p>
                        <p className="text-2xl font-bold text-foreground">
                          {cities.filter((c) => c.visible).length}
                        </p>
                      </div>
                      <MapPin className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Pacchetti</p>
                        <p className="text-2xl font-bold text-foreground">{packages.length}</p>
                      </div>
                      <Package className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Sezioni Attive</p>
                        <p className="text-2xl font-bold text-foreground">
                          {sections.filter((s) => s.visible).length}
                        </p>
                      </div>
                      <Settings className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-4">Attività Recente</h3>
                  <div className="space-y-4">
                    {users.slice(0, 3).map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center space-x-4 p-4 bg-muted/50 rounded-xl"
                      >
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Ultima attività: {user.lastActivity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">
                            {user.totalBookings} prenotazioni
                          </p>
                          <p className="text-sm text-muted-foreground">€{user.totalSpent}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Sections Management */}
            {activeTab === "sections" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Sezioni Homepage</h2>
                </div>

                <div className="bg-card rounded-2xl shadow-sm overflow-hidden border border-border">
                  <div className="p-6">
                    <p className="text-muted-foreground mb-6">
                      Gestisci la visibilità delle sezioni sulla homepage
                    </p>

                    <div className="space-y-4">
                      {sections.map((section) => (
                        <div
                          key={section.id}
                          className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
                        >
                          <div>
                            <h3 className="font-medium text-foreground">{section.name}</h3>
                            <p className="text-sm text-muted-foreground">ID: {section.id}</p>
                          </div>
                          <button
                            onClick={() => toggleSectionVisibility(section.id)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                              section.visible
                                ? "bg-primary/10 text-primary"
                                : "bg-destructive/10 text-destructive"
                            }`}
                          >
                            {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            <span className="text-sm font-medium">{section.visible ? "Visibile" : "Nascosta"}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cities Management */}
            {activeTab === "cities" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Gestione Città</h2>
                  <button
                    onClick={() => {
                      setEditingCity(null)
                      setShowCityModal(true)
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Aggiungi Città</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {cities.map((city) => (
                    <div key={city.id} className="bg-card rounded-2xl shadow-sm overflow-hidden border border-border">
                      <div className="relative h-48">
                        <img
                          src={city.image || "/placeholder.svg?height=200&width=400"}
                          alt={city.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <button
                            onClick={() => toggleCityVisibility(city.id)}
                            className={`p-2 rounded-full ${
                              city.visible ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                            }`}
                          >
                            {city.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-lg font-bold text-foreground mb-2">{city.name}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{city.description}</p>
                        <p className="text-xs text-muted-foreground mb-4">
                          Coordinate: {city.coordinates[0]}, {city.coordinates[1]}
                        </p>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingCity(city)
                              setShowCityModal(true)
                            }}
                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-primary text-primary rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Modifica</span>
                          </button>
                          <button
                            onClick={() => handleDeleteCity(city.id)}
                            className="px-4 py-2 border border-destructive text-destructive rounded-xl hover:bg-destructive hover:text-destructive-foreground transition-all duration-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content Management */}
            {activeTab === "content" && (
              <CMSInterface />
            )}

            {/* Users Management */}
            {activeTab === "users" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Gestione Utenti</h2>

                <div className="bg-card rounded-2xl shadow-sm overflow-hidden border border-border">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Utente
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Contatti
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Statistiche
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Ultima Attività
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-muted/50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                  <Users className="w-5 h-5 text-primary" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-foreground">{user.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    Registrato: {user.registrationDate}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2 text-sm text-foreground">
                                  <Mail className="w-4 h-4 text-muted-foreground" />
                                  <span>{user.email}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                  <Phone className="w-4 h-4 text-muted-foreground" />
                                  <span>{user.phone}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="space-y-1">
                                <div className="text-sm text-foreground">
                                  {user.totalBookings} prenotazioni
                                </div>
                                <div className="text-sm text-muted-foreground">€{user.totalSpent} spesi</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                              {user.lastActivity}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* City Modal */}
      {showCityModal && (
        <CityModal
          city={editingCity}
          onSave={handleSaveCity}
          onClose={() => {
            setShowCityModal(false)
            setEditingCity(null)
          }}
        />
      )}
    </div>
  )
}

// City Modal Component
function CityModal({ city, onSave, onClose }: { city: any; onSave: (data: any) => void; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: city?.name || "",
    description: city?.description || "",
    coordinates: city?.coordinates || [0, 0],
    image: city?.image || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">
            {city ? "Modifica Città" : "Aggiungi Città"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Nome Città</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Descrizione</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Longitudine</label>
              <input
                type="number"
                step="any"
                value={formData.coordinates[0]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    coordinates: [Number.parseFloat(e.target.value), prev.coordinates[1]],
                  }))
                }
                className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Latitudine</label>
              <input
                type="number"
                step="any"
                value={formData.coordinates[1]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    coordinates: [prev.coordinates[0], Number.parseFloat(e.target.value)],
                  }))
                }
                className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">URL Immagine</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="https://esempio.com/immagine.jpg"
            />
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-border bg-background text-foreground rounded-xl hover:bg-muted transition-colors"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold"
            >
              <Save className="w-4 h-4 mr-2" />
              {city ? "Salva Modifiche" : "Aggiungi Città"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
