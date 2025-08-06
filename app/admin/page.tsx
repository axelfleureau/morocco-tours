"use client"

import { useState, useEffect } from "react"
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth'
import { auth, db, storage } from '@/lib/firebase'
import { toast, Toaster } from 'react-hot-toast'
import AdminDashboard from '@/components/admin/AdminDashboard'
import CityModal from '@/components/admin/CityModal'
import PackageModal from '@/components/admin/PackageModal'
import { getDocs, collection, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

interface City {
  id: string
  name: string
  description: string
  coordinates: [number, number]
  image: string
  icon: string
  highlights: string[]
  tours: string[]
  visible: boolean
}

interface Package {
  id: string
  title: string
  duration: string
  price: number
  description: string
  visible: boolean
  category: string
  includes: string[]
  excludes: string[]
  itinerary: Array<{
    day: number
    title: string
    description: string
  }>
}

interface Section {
  id: string
  name: string
  visible: boolean
}

interface UserData {
  id: string
  name: string
  email: string
  phone: string
  registrationDate: string
  totalBookings: number
  totalSpent: number
  lastActivity: string
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loginLoading, setLoginLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [cities, setCities] = useState<City[]>([])
  const [packages, setPackages] = useState<Package[]>([])
  const [sections, setSections] = useState<Section[]>([])
  const [users, setUsers] = useState<UserData[]>([])
  const [showCityModal, setShowCityModal] = useState(false)
  const [showPackageModal, setShowPackageModal] = useState(false)
  const [editingCity, setEditingCity] = useState<City | null>(null)
  const [editingPackage, setEditingPackage] = useState<Package | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
      if (user) {
        loadData()
      }
    })

    return () => unsubscribe()
  }, [])

  const loadData = async () => {
    try {
      // Load cities
      const citiesSnapshot = await getDocs(collection(db, 'cities'))
      const citiesData: City[] = []
      citiesSnapshot.forEach((doc) => {
        citiesData.push({ id: doc.id, ...doc.data() } as City)
      })
      setCities(citiesData)

      // Load packages
      const packagesSnapshot = await getDocs(collection(db, 'packages'))
      const packagesData: Package[] = []
      packagesSnapshot.forEach((doc) => {
        packagesData.push({ id: doc.id, ...doc.data() } as Package)
      })
      setPackages(packagesData)

      // Load sections
      const sectionsSnapshot = await getDocs(collection(db, 'sections'))
      const sectionsData: Section[] = []
      sectionsSnapshot.forEach((doc) => {
        sectionsData.push({ id: doc.id, ...doc.data() } as Section)
      })
      setSections(sectionsData)

      // Load users
      const usersSnapshot = await getDocs(collection(db, 'users'))
      const usersData: UserData[] = []
      usersSnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() } as UserData)
      })
      setUsers(usersData)

    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)

    try {
      await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
      toast.success('Login effettuato con successo')
    } catch (error: any) {
      toast.error('Credenziali non valide')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast.success('Logout effettuato')
    } catch (error) {
      toast.error('Errore durante il logout')
    }
  }

  const toggleSectionVisibility = async (sectionId: string) => {
    try {
      const section = sections.find(s => s.id === sectionId)
      if (section) {
        await updateDoc(doc(db, 'sections', sectionId), {
          visible: !section.visible
        })
        setSections(prev => 
          prev.map(s => s.id === sectionId ? { ...s, visible: !s.visible } : s)
        )
      }
    } catch (error) {
      console.error('Error updating section:', error)
    }
  }

  const toggleCityVisibility = async (cityId: string) => {
    try {
      const city = cities.find(c => c.id === cityId)
      if (city) {
        await updateDoc(doc(db, 'cities', cityId), {
          visible: !city.visible
        })
        setCities(prev => 
          prev.map(c => c.id === cityId ? { ...c, visible: !c.visible } : c)
        )
      }
    } catch (error) {
      console.error('Error updating city:', error)
    }
  }

  const handleSaveCity = async (cityData: Omit<City, 'id'>) => {
    try {
      if (editingCity) {
        await updateDoc(doc(db, 'cities', editingCity.id), cityData)
        setCities(prev => 
          prev.map(city => city.id === editingCity.id ? { ...city, ...cityData } : city)
        )
      } else {
        const docRef = await addDoc(collection(db, 'cities'), {
          ...cityData,
          visible: true
        })
        setCities(prev => [...prev, { id: docRef.id, ...cityData, visible: true }])
      }
      setShowCityModal(false)
      setEditingCity(null)
    } catch (error) {
      console.error('Error saving city:', error)
    }
  }

  const handleDeleteCity = async (cityId: string) => {
    if (confirm("Sei sicuro di voler eliminare questa città?")) {
      try {
        await deleteDoc(doc(db, 'cities', cityId))
        setCities(prev => prev.filter(city => city.id !== cityId))
      } catch (error) {
        console.error('Error deleting city:', error)
      }
    }
  }

  const uploadImage = async (file: File, path: string): Promise<string> => {
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`)
    const snapshot = await uploadBytes(storageRef, file)
    return await getDownloadURL(snapshot.ref)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <Toaster position="top-right" />
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Morocco Dreams Tours</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="admin@moroccodreams.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold disabled:opacity-50 flex items-center justify-center"
            >
              {loginLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Accedi alla Dashboard'
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-600 text-center">
              <strong>Credenziali Demo:</strong><br />
              Email: admin@moroccodreams.com<br />
              Password: morocco2024
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <AdminDashboard />
      
      {/* Logout Button */}
      {/* Removed as per updates */}

      {/* City Modal */}
      {/* Removed as per updates */}

      {/* Package Modal */}
      {/* Removed as per updates */}

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  )
}
