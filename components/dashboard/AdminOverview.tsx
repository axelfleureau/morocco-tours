"use client"

import React, { useState, useEffect } from 'react'
import { MapPin, FileText, Package, Settings, Database, Users, BarChart3 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function AdminOverview() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    cities: 0,
    experiences: 0,
    travels: 0,
    services: 0,
    total: 0
  })

  const statCards = [
    { label: "Città", value: stats.cities, icon: MapPin, color: "orange" },
    { label: "Esperienze", value: stats.experiences, icon: FileText, color: "green" },
    { label: "Viaggi", value: stats.travels, icon: Package, color: "orange" },
    { label: "Servizi", value: stats.services, icon: Settings, color: "purple" }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Admin Dashboard</h2>
        <div className="text-sm text-muted-foreground">
          Benvenuto, {user?.email}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
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
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-xl">
            <Database className="w-6 h-6 mb-2" />
            <div className="font-medium">Database</div>
            <div className="text-sm opacity-75">Gestisci contenuti</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-xl">
            <MapPin className="w-6 h-6 mb-2" />
            <div className="font-medium">Città</div>
            <div className="text-sm opacity-75">Aggiungi destinazioni</div>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-xl">
            <BarChart3 className="w-6 h-6 mb-2" />
            <div className="font-medium">Analytics</div>
            <div className="text-sm opacity-75">Visualizza statistiche</div>
          </div>
        </div>
      </div>

      {/* Admin Info */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
        <h3 className="text-lg font-bold mb-2">Sistema CMS Integrato</h3>
        <p className="text-sm opacity-90">
          Tutte le funzionalità di amministrazione sono ora integrate nella tua dashboard utente. 
          Naviga tra le sezioni admin usando la barra laterale per gestire contenuti, tema e struttura del sito.
        </p>
      </div>
    </div>
  )
}