"use client"

import { useState, useEffect } from "react"
import { Search, X, MapPin, Calendar, Users } from "lucide-react"
import Link from "next/link"

interface SearchBarProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])

  const searchData = [
    {
      type: "destination",
      title: "Marrakech",
      subtitle: "Città Imperiale",
      href: "/viaggi/citta-imperiali",
      icon: MapPin,
    },
    {
      type: "destination",
      title: "Deserto del Sahara",
      subtitle: "Avventura nel deserto",
      href: "/viaggi/deserto",
      icon: MapPin,
    },
    {
      type: "destination",
      title: "Fes",
      subtitle: "Capitale spirituale",
      href: "/viaggi/citta-imperiali",
      icon: MapPin,
    },
    {
      type: "destination",
      title: "Essaouira",
      subtitle: "Costa atlantica",
      href: "/viaggi/costa-atlantica",
      icon: MapPin,
    },
    { type: "destination", title: "Chefchaouen", subtitle: "Perla blu", href: "/viaggi/montagne-atlas", icon: MapPin },
    {
      type: "experience",
      title: "Hammam Tradizionale",
      subtitle: "Benessere autentico",
      href: "/esperienze/hammam",
      icon: Users,
    },
    {
      type: "experience",
      title: "Cucina Marocchina",
      subtitle: "Corsi di cucina",
      href: "/esperienze/cucina",
      icon: Users,
    },
    {
      type: "experience",
      title: "Trekking Atlas",
      subtitle: "Montagne e natura",
      href: "/esperienze/trekking",
      icon: Users,
    },
    { type: "tour", title: "Tour delle Città Imperiali", subtitle: "8 giorni", href: "/viaggi/gruppo", icon: Calendar },
    { type: "tour", title: "Avventura nel Deserto", subtitle: "4 giorni", href: "/viaggi/deserto", icon: Calendar },
  ]

  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cerca destinazioni, esperienze, tour..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-muted border border-border rounded-2xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                autoFocus
              />
            </div>
            <button onClick={onClose} className="p-3 hover:bg-muted rounded-full transition-colors">
              <X className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {query.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Cosa stai cercando?</h3>
            <p className="text-muted-foreground">Inizia a digitare per cercare destinazioni, esperienze o tour</p>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-2">
            {results.map((result, idx) => (
              <Link
                key={idx}
                href={result.href}
                onClick={onClose}
                className="flex items-center space-x-4 p-4 bg-card hover:bg-muted rounded-xl transition-colors group"
              >
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <result.icon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground group-hover:text-orange-600 transition-colors">
                    {result.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{result.subtitle}</p>
                </div>
                <div className="text-xs text-muted-foreground capitalize bg-muted px-2 py-1 rounded-full">
                  {result.type}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Nessun risultato trovato</h3>
            <p className="text-muted-foreground">Prova con parole chiave diverse</p>
          </div>
        )}
      </div>
    </div>
  )
}
