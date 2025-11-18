"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore"
import { db } from "@/lib/firebase"
import {
  BarChart3,
  Users,
  MapPin,
  Car,
  TrendingUp,
  Calendar,
  Star,
  Heart
} from "lucide-react"

interface DashboardStats {
  totalExperiences: number
  totalTravels: number
  totalVehicles: number
  totalUsers: number
  publishedExperiences: number
  publishedTravels: number
  averageRating: number
  totalWishlists: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalExperiences: 0,
    totalTravels: 0,
    totalVehicles: 0,
    totalUsers: 0,
    publishedExperiences: 0,
    publishedTravels: 0,
    averageRating: 0,
    totalWishlists: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const [experiencesSnap, travelsSnap, usersSnap] = await Promise.all([
        getDocs(collection(db, "experiences")),
        getDocs(collection(db, "travels")),
        getDocs(collection(db, "userProfiles"))
      ])

      const experiences = experiencesSnap.docs.map(doc => doc.data())
      const travels = travelsSnap.docs.map(doc => doc.data())
      
      const publishedExperiences = experiences.filter(e => e.published).length
      const publishedTravels = travels.filter(t => t.published).length
      
      const allRatings = [
        ...experiences.map(e => e.rating || 0),
        ...travels.map(t => t.rating || 0)
      ].filter(r => r > 0)
      
      const averageRating = allRatings.length > 0
        ? allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length
        : 0

      let totalWishlists = 0
      usersSnap.docs.forEach(doc => {
        const wishlist = doc.data().wishlist || []
        totalWishlists += wishlist.length
      })

      setStats({
        totalExperiences: experiences.length,
        totalTravels: travels.length,
        totalVehicles: 19,
        totalUsers: usersSnap.size,
        publishedExperiences,
        publishedTravels,
        averageRating: Math.round(averageRating * 10) / 10,
        totalWishlists
      })
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: "Esperienze",
      value: stats.totalExperiences,
      subtitle: `${stats.publishedExperiences} pubblicate`,
      icon: MapPin,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Viaggi",
      value: stats.totalTravels,
      subtitle: `${stats.publishedTravels} pubblicati`,
      icon: TrendingUp,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Veicoli",
      value: stats.totalVehicles,
      subtitle: "Noleggio auto",
      icon: Car,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Utenti",
      value: stats.totalUsers,
      subtitle: "Registrati",
      icon: Users,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Rating Medio",
      value: stats.averageRating.toFixed(1),
      subtitle: "Stelle",
      icon: Star,
      color: "from-yellow-500 to-amber-500"
    },
    {
      title: "Wishlist",
      value: stats.totalWishlists,
      subtitle: "Totale items salvati",
      icon: Heart,
      color: "from-red-500 to-pink-500"
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Caricamento statistiche...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Statistiche e metriche generali del sito
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.title}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-foreground mb-1">
                  {card.value}
                </p>
                <p className="text-sm text-muted-foreground">{card.subtitle}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20">
              <BarChart3 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold">Contenuti Pubblicati</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Esperienze</span>
                <span className="text-sm font-medium">
                  {stats.publishedExperiences} / {stats.totalExperiences}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${stats.totalExperiences > 0 ? (stats.publishedExperiences / stats.totalExperiences) * 100 : 0}%`
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Viaggi</span>
                <span className="text-sm font-medium">
                  {stats.publishedTravels} / {stats.totalTravels}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${stats.totalTravels > 0 ? (stats.publishedTravels / stats.totalTravels) * 100 : 0}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold">Azioni Rapide</h3>
          </div>
          
          <div className="space-y-3">
            <a
              href="/admin/experiences"
              className="block p-3 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <p className="font-medium text-sm">Gestisci Esperienze</p>
              <p className="text-xs text-muted-foreground mt-1">
                Modifica prezzi, descrizioni e disponibilità
              </p>
            </a>
            
            <a
              href="/admin/travels"
              className="block p-3 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <p className="font-medium text-sm">Gestisci Viaggi</p>
              <p className="text-xs text-muted-foreground mt-1">
                Tour deserto, città imperiali e costa
              </p>
            </a>
            
            <a
              href="/admin/instagram"
              className="block p-3 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <p className="font-medium text-sm">Aggiorna Instagram</p>
              <p className="text-xs text-muted-foreground mt-1">
                Gestisci video e contenuti social
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
