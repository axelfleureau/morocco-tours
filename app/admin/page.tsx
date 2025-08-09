"use client"

import type React from "react"

import { useState } from "react"
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
} from "lucide-react"

// Mock Firebase functions (replace with actual Firebase implementation)
const mockAuth = {
  login: async (username: string, password: string) => {
    // Mock authentication - replace with Firebase Auth
    if (username === "admin" && password === "morocco2024") {
      return { success: true, user: { id: "1", username: "admin" } }
    }
    return { success: false, error: "Credenziali non valide" }
  },
  logout: async () => {
    return { success: true }
  },
}

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

  // Data states
  const [cities, setCities] = useState(mockDatabase.cities)
  const [packages, setPackages] = useState(mockDatabase.packages)
  const [sections, setSections] = useState(mockDatabase.sections)
  const [users, setUsers] = useState(mockDatabase.users)

  // Modal states
  const [showCityModal, setShowCityModal] = useState(false)
  const [showPackageModal, setShowPackageModal] = useState(false)
  const [editingCity, setEditingCity] = useState<any>(null)
  const [editingPackage, setEditingPackage] = useState<any>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError("")

    try {
      const result = await mockAuth.login(loginForm.username, loginForm.password)
      if (result.success) {
        setIsAuthenticated(true)
      } else {
        setLoginError(result.error || "Errore di login")
      }
    } catch (error) {
      setLoginError("Errore di connessione")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await mockAuth.logout()
    setIsAuthenticated(false)
    setLoginForm({ username: "", password: "" })
  }

  const toggleSectionVisibility = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) => (section.id === sectionId ? { ...section, visible: !section.visible } : section)),
    )
  }

  const toggleCityVisibility = (cityId: string) => {
    setCities((prev) => prev.map((city) => (city.id === cityId ? { ...city, visible: !city.visible } : city)))
  }

  const handleSaveCity = (cityData: any) => {
    if (editingCity) {
      setCities((prev) => prev.map((city) => (city.id === editingCity.id ? { ...city, ...cityData } : city)))
    } else {
      const newCity = {
        id: Date.now().toString(),
        ...cityData,
        visible: true,
      }
      setCities((prev) => [...prev, newCity])
    }
    setShowCityModal(false)
    setEditingCity(null)
  }

  const handleDeleteCity = (cityId: string) => {
    if (confirm("Sei sicuro di voler eliminare questa città?")) {
      setCities((prev) => prev.filter((city) => city.id !== cityId))
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Morocco Dreams</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm((prev) => ({ ...prev, username: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="morocco2024"
                required
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold disabled:opacity-50"
            >
              {isLoading ? "Accesso in corso..." : "Accedi"}
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-600 text-center">
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Morocco Dreams</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
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
            <nav className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 space-y-2">
              {[
                { id: "dashboard", name: "Dashboard", icon: BarChart3 },
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
                      ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Utenti Totali</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</p>
                      </div>
                      <Users className="w-8 h-8 text-orange-500" />
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Città Attive</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {cities.filter((c) => c.visible).length}
                        </p>
                      </div>
                      <MapPin className="w-8 h-8 text-orange-500" />
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Pacchetti</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{packages.length}</p>
                      </div>
                      <Package className="w-8 h-8 text-orange-500" />
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Sezioni Attive</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {sections.filter((s) => s.visible).length}
                        </p>
                      </div>
                      <Settings className="w-8 h-8 text-orange-500" />
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Attività Recente</h3>
                  <div className="space-y-4">
                    {users.slice(0, 3).map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                      >
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Ultima attività: {user.lastActivity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.totalBookings} prenotazioni
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">€{user.totalSpent}</p>
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
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sezioni Homepage</h2>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Gestisci la visibilità delle sezioni sulla homepage
                    </p>

                    <div className="space-y-4">
                      {sections.map((section) => (
                        <div
                          key={section.id}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                        >
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{section.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">ID: {section.id}</p>
                          </div>
                          <button
                            onClick={() => toggleSectionVisibility(section.id)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                              section.visible
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
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
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestione Città</h2>
                  <button
                    onClick={() => {
                      setEditingCity(null)
                      setShowCityModal(true)
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Aggiungi Città</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {cities.map((city) => (
                    <div key={city.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
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
                              city.visible ? "bg-green-500 text-white" : "bg-red-500 text-white"
                            }`}
                          >
                            {city.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{city.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{city.description}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                          Coordinate: {city.coordinates[0]}, {city.coordinates[1]}
                        </p>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingCity(city)
                              setShowCityModal(true)
                            }}
                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-orange-500 text-orange-500 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Modifica</span>
                          </button>
                          <button
                            onClick={() => handleDeleteCity(city.id)}
                            className="px-4 py-2 border border-red-500 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
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

            {/* Users Management */}
            {activeTab === "users" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestione Utenti</h2>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Utente
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Contatti
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Statistiche
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Ultima Attività
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                                  <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Registrato: {user.registrationDate}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2 text-sm text-gray-900 dark:text-white">
                                  <Mail className="w-4 h-4 text-gray-400" />
                                  <span>{user.email}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                  <Phone className="w-4 h-4 text-gray-400" />
                                  <span>{user.phone}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="space-y-1">
                                <div className="text-sm text-gray-900 dark:text-white">
                                  {user.totalBookings} prenotazioni
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">€{user.totalSpent} spesi</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
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
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {city ? "Modifica Città" : "Aggiungi Città"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nome Città</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Descrizione</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Longitudine</label>
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Latitudine</label>
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">URL Immagine</label>
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
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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
