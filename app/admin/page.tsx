"use client"

import { useEffect, useState } from "react"
import { useNotifications } from "@/components/NotificationSystem"
import {
  BarChart3,
  Users,
  MapPin,
  Car,
  TrendingUp,
  Calendar,
  Star,
  Heart,
  Plus,
  Settings,
  Instagram,
  MessageSquare,
  FileText,
  Map
} from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  experiences: {
    total: number
    published: number
  }
  travels: {
    total: number
    published: number
  }
  vehicles: {
    total: number
    published: number
  }
  users: {
    total: number
  }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    experiences: { total: 0, published: 0 },
    travels: { total: 0, published: 0 },
    vehicles: { total: 0, published: 0 },
    users: { total: 0 }
  })
  const [loading, setLoading] = useState(true)
  const { showError } = useNotifications()

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')
      
      const data = await response.json()
      setStats(data.stats)
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
      showError("Errore", "Impossibile caricare le statistiche")
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: "Esperienze",
      value: stats.experiences.total,
      published: stats.experiences.published,
      subtitle: `${stats.experiences.published} pubblicate`,
      icon: MapPin,
      color: "from-blue-500 to-cyan-600",
      link: "/admin/experiences",
      showPercentage: true
    },
    {
      title: "Viaggi",
      value: stats.travels.total,
      published: stats.travels.published,
      subtitle: `${stats.travels.published} pubblicati`,
      icon: TrendingUp,
      color: "from-orange-500 to-red-600",
      link: "/admin/travels",
      showPercentage: true
    },
    {
      title: "Veicoli",
      value: stats.vehicles.total,
      published: stats.vehicles.published,
      subtitle: `${stats.vehicles.published} pubblicati`,
      icon: Car,
      color: "from-green-500 to-emerald-600",
      link: "/admin/vehicles",
      showPercentage: true
    },
    {
      title: "Utenti",
      value: stats.users.total,
      published: 0,
      subtitle: "Registrati",
      icon: Users,
      color: "from-purple-500 to-pink-600",
      link: "/admin/users",
      showPercentage: false
    }
  ]

  const quickActions = [
    {
      icon: FileText,
      title: "Gestisci Contenuti",
      description: "Esperienze, Viaggi, Servizi, Blog & Veicoli",
      link: "/admin/content?tab=experience",
      color: "bg-blue-500"
    },
    {
      icon: Calendar,
      title: "Gestisci Prenotazioni",
      description: "Visualizza e gestisci tutte le prenotazioni",
      link: "/admin/content?tab=bookings",
      color: "bg-orange-500"
    },
    {
      icon: Users,
      title: "Gestisci Utenti",
      description: "Admin, permessi e ruoli utente",
      link: "/admin/users",
      color: "bg-green-500"
    },
    {
      icon: Map,
      title: "Gestisci Città",
      description: "Destinazioni marocchine",
      link: "/admin/cities",
      color: "bg-indigo-500"
    },
    {
      icon: Settings,
      title: "Gestisci Servizi",
      description: "Guide, trasferimenti, assicurazioni",
      link: "/admin/services",
      color: "bg-purple-500"
    },
    {
      icon: Instagram,
      title: "Gestisci Instagram",
      description: "Video feed homepage",
      link: "/admin/instagram",
      color: "bg-teal-500"
    }
  ]

  const managementSections = [
    {
      icon: MessageSquare,
      title: "Testimonianze",
      description: "Gestisci recensioni clienti",
      link: "/admin/testimonials",
      count: 0
    },
    {
      icon: FileText,
      title: "FAQ",
      description: "Domande frequenti",
      link: "/admin/faq",
      count: 0
    },
    {
      icon: Instagram,
      title: "Instagram",
      description: "Video feed homepage",
      link: "/admin/instagram",
      count: 3
    },
    {
      icon: Settings,
      title: "Menu",
      description: "Navigazione sito",
      link: "/admin/menu",
      count: 0
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">Caricamento dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Morocco Dreams CMS
            </h1>
            <p className="text-orange-100 text-lg">
              Dashboard Amministratore - Gestione Contenuti
            </p>
          </div>
          <BarChart3 className="w-16 h-16 text-white/30" />
        </div>
      </div>

      {/* Stats Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-foreground">Statistiche Contenuti</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => {
            const Icon = card.icon
            const percentage = card.showPercentage && card.value > 0 
              ? (card.published / card.value) * 100 
              : 0
            
            return (
              <Link
                key={card.title}
                href={card.link}
                className="bg-card border-2 border-border rounded-2xl p-6 hover:shadow-xl hover:border-orange-500/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  {card.showPercentage && (
                    <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {Math.round(percentage)}%
                    </span>
                  )}
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1 font-medium">{card.title}</p>
                  <p className="text-4xl font-bold text-foreground mb-2 group-hover:text-orange-600 transition-colors">
                    {card.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{card.subtitle}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Content Progress */}
      <div className="bg-card border border-border rounded-2xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/20">
            <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h2 className="text-2xl font-bold">Stato Pubblicazioni</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-muted-foreground">Esperienze</span>
              <span className="text-sm font-bold">
                {stats.experiences.published} / {stats.experiences.total}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-600 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${stats.experiences.total > 0 ? (stats.experiences.published / stats.experiences.total) * 100 : 0}%`
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-muted-foreground">Viaggi</span>
              <span className="text-sm font-bold">
                {stats.travels.published} / {stats.travels.total}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${stats.travels.total > 0 ? (stats.travels.published / stats.travels.total) * 100 : 0}%`
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-muted-foreground">Veicoli</span>
              <span className="text-sm font-bold">
                {stats.vehicles.published} / {stats.vehicles.total}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${stats.vehicles.total > 0 ? (stats.vehicles.published / stats.vehicles.total) * 100 : 0}%`
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
          <Plus className="w-6 h-6" />
          Azioni Rapide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.title}
                href={action.link}
                className="group bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-orange-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${action.color} text-white shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground group-hover:text-orange-600 transition-colors">
                      {action.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Management Sections */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-foreground">Gestione Sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {managementSections.map((section) => {
            const Icon = section.icon
            return (
              <Link
                key={section.title}
                href={section.link}
                className="bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-orange-500/50 transition-all group"
              >
                <Icon className="w-8 h-8 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-bold text-foreground mb-1 group-hover:text-orange-600 transition-colors">
                  {section.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {section.description}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
