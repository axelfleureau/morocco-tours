"use client"

import { useState } from 'react'
import { vehicles } from '@/data/vehicles'
import { Search, Edit, Car, DollarSign } from 'lucide-react'

export default function AdminVehiclesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  const categories = ['Economiche', 'SUV', 'Premium']

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryFilter || v.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestione Veicoli</h1>
          <p className="text-muted-foreground mt-1">
            {vehicles.length} veicoli totali
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cerca veicolo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Tutte le categorie</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                {vehicle.category}
              </span>
            </div>
            
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-bold text-lg text-foreground">{vehicle.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Car className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {vehicle.transmission === 'manuale' ? 'Manuale' : 'Automatica'} • {vehicle.seats} posti
                  </span>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-sm text-muted-foreground">Da</span>
                <span className="text-2xl font-bold text-orange-600">€{vehicle.pricing.period1.short}</span>
                <span className="text-sm text-muted-foreground">/giorno</span>
              </div>

              <div className="pt-3 border-t border-border">
                <button
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Modifica Prezzi
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
