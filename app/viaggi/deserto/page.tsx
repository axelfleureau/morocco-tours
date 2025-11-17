"use client"

import Link from "next/link"
import { ArrowRight, Sun, Mountain, Star, Clock } from "lucide-react"

export default function DesertChoicePage() {
  const desertTypes = [
    {
      id: "sahara",
      name: "Deserto del Sahara",
      slug: "/viaggi/deserto/sahara",
      subtitle: "Le leggendarie dune dorate del Sahara",
      description: "Vivi l'esperienza autentica del grande deserto con le sue dune di sabbia dorata, notti stellate indimenticabili e l'ospitalità berbera",
      image: "/images/sahara-sunset.png",
      gradient: "from-orange-600 via-red-500 to-orange-500",
      darkGradient: "dark:from-orange-900 dark:via-red-900 dark:to-orange-900",
      icon: Sun,
      highlights: [
        "Dune di Erg Chebbi",
        "Notti sotto le stelle",
        "Escursioni in cammello",
        "Campi berberi autentici",
        "Musica tradizionale"
      ],
      tours: "4 tour disponibili",
      duration: "2-4 giorni",
      distance: "550 km da Marrakech",
      bestSeason: "Mar-Mag, Set-Nov"
    },
    {
      id: "agafay",
      name: "Deserto di Agafay",
      slug: "/viaggi/deserto/agafay",
      subtitle: "Il deserto roccioso vicino a Marrakech",
      description: "A soli 40 minuti da Marrakech, scopri un paesaggio lunare fatto di colline rocciose, con vista mozzafiato sulle montagne dell'Atlante",
      image: "/images/agafay-desert.png",
      gradient: "from-amber-600 via-yellow-600 to-amber-500",
      darkGradient: "dark:from-amber-900 dark:via-yellow-900 dark:to-amber-900",
      icon: Mountain,
      highlights: [
        "40 min da Marrakech",
        "Paesaggio roccioso",
        "Vista sull'Atlante",
        "Glamping di lusso",
        "Quad e cammelli"
      ],
      tours: "3 tour disponibili",
      duration: "1 giorno / 1 notte",
      distance: "40 km da Marrakech",
      bestSeason: "Tutto l'anno"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative py-24 md:py-32 bg-gradient-to-r from-orange-600 via-red-500 to-amber-600 dark:from-orange-900 dark:via-red-900 dark:to-amber-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Scegli il Tuo
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-200 bg-clip-text text-transparent">
              Deserto
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8">
            Due deserti, due esperienze uniche: dal Sahara leggendario al fascino lunare di Agafay
          </p>
        </div>
      </div>

      {/* Desert Comparison Cards */}
      <div className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Quale Deserto Vuoi Esplorare?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Confronta le due destinazioni e scegli l'avventura perfetta per te
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {desertTypes.map((desert) => {
              const IconComponent = desert.icon
              return (
                <div
                  key={desert.id}
                  className="group bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border"
                >
                  {/* Image Hero */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={desert.image}
                      alt={desert.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-6 right-6 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {desert.name}
                      </h3>
                      <p className="text-white/90 text-lg">
                        {desert.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 space-y-6">
                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {desert.description}
                    </p>

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex items-center space-x-2 text-orange-600 dark:text-orange-400 mb-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs font-semibold uppercase">Durata</span>
                        </div>
                        <p className="text-sm font-bold text-foreground">{desert.duration}</p>
                      </div>
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex items-center space-x-2 text-orange-600 dark:text-orange-400 mb-1">
                          <Star className="w-4 h-4" />
                          <span className="text-xs font-semibold uppercase">Tour</span>
                        </div>
                        <p className="text-sm font-bold text-foreground">{desert.tours}</p>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Highlights:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {desert.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                            <span className="text-sm text-muted-foreground">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Distanza</p>
                        <p className="text-sm font-semibold text-foreground">{desert.distance}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Periodo migliore</p>
                        <p className="text-sm font-semibold text-foreground">{desert.bestSeason}</p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link href={desert.slug}>
                      <button className={`w-full bg-gradient-to-r ${desert.gradient} ${desert.darkGradient} text-white py-4 px-6 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 group`}>
                        <span>Esplora {desert.id === 'sahara' ? 'Sahara' : 'Agafay'}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="py-16 bg-muted">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Confronto Rapido
          </h2>
          
          <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-900 dark:to-red-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Caratteristica</th>
                    <th className="px-6 py-4 text-left font-semibold">Sahara</th>
                    <th className="px-6 py-4 text-left font-semibold">Agafay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { label: "Tipo di Deserto", sahara: "Sabbia (Erg)", agafay: "Roccioso" },
                    { label: "Distanza da Marrakech", sahara: "550 km (7-8 ore)", agafay: "40 km (40 min)" },
                    { label: "Durata Minima", sahara: "2 giorni", agafay: "1 giorno" },
                    { label: "Esperienza", sahara: "Avventura autentica", agafay: "Escapade di lusso" },
                    { label: "Prezzo da", sahara: "€180", agafay: "€50" },
                    { label: "Livello Difficoltà", sahara: "Medio-Alto", agafay: "Basso" },
                    { label: "Migliore per", sahara: "Avventurieri, fotografi", agafay: "Coppie, famiglie, chi ha poco tempo" }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{row.label}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.sahara}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.agafay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 lg:py-20 bg-gradient-to-r from-orange-600 via-red-500 to-amber-600 dark:from-orange-900 dark:via-red-900 dark:to-amber-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Non Riesci a Decidere?
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Contattaci per una consulenza personalizzata e ti aiuteremo a scegliere l'esperienza perfetta
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contatti">
              <button className="px-8 py-4 bg-white text-orange-600 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-lg">
                Contattaci
              </button>
            </Link>
            <Link href="/viaggi/su-misura">
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 font-semibold text-lg">
                Viaggio su Misura
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
