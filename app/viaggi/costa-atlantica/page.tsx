import { Waves, Sun, Wind, Camera, Utensils, MapPin, Clock, Star } from 'lucide-react'
import Link from "next/link"

export default function CostaBluPage() {
  const destinations = [
    {
      id: "essaouira",
      name: "Essaouira",
      title: "La Città del Vento",
      description: "Perla della costa atlantica con medina UNESCO e spiagge perfette per il surf",
      image: "/images/essaouira-coast.png",
      highlights: ["Medina UNESCO", "Porto dei pescatori", "Spiagge per surf", "Artigianato locale", "Musica Gnawa"],
      activities: ["Surf", "Kitesurf", "Pesca", "Arte", "Gastronomia"],
      bestTime: "Aprile - Ottobre",
      rating: 4.8,
      reviews: 189,
    },
    {
      id: "agadir",
      name: "Agadir",
      title: "Riviera Marocchina",
      description: "Moderna città balneare con resort di lusso e spiagge dorate",
      image: "/images/agadir-beach.png",
      highlights: ["Spiagge dorate", "Marina moderna", "Souk El Had", "Kasbah", "Golf"],
      activities: ["Beach", "Golf", "Shopping", "Spa", "Nightlife"],
      bestTime: "Tutto l'anno",
      rating: 4.6,
      reviews: 234,
    },
    {
      id: "casablanca",
      name: "Casablanca",
      title: "Metropoli dell'Atlantico",
      description: "Capitale economica con la maestosa Moschea Hassan II",
      image: "/images/casablanca-hassan.png",
      highlights: ["Moschea Hassan II", "Corniche", "Quartiere Habous", "Art Déco", "Vita notturna"],
      activities: ["Cultura", "Business", "Shopping", "Gastronomia", "Architettura"],
      bestTime: "Marzo - Novembre",
      rating: 4.5,
      reviews: 156,
    },
    {
      id: "el-jadida",
      name: "El Jadida",
      title: "Fortezza Portoghese",
      description: "Città fortificata patrimonio UNESCO con influenze portoghesi",
      image: "/images/el-jadida-fortress.png",
      highlights: ["Cittadella portoghese", "Cisterna sotterranea", "Spiagge", "Golf", "Storia"],
      activities: ["Storia", "Beach", "Golf", "Fotografia", "Relax"],
      bestTime: "Maggio - Settembre",
      rating: 4.4,
      reviews: 98,
    },
  ]

  const experiences = [
    {
      icon: Waves,
      title: "Surf & Kitesurf",
      description: "Onde perfette tutto l'anno sulla costa atlantica",
      locations: ["Essaouira", "Taghazout", "Imsouane"],
      price: "€45/giorno",
    },
    {
      icon: Wind,
      title: "Windsurf",
      description: "Venti costanti ideali per gli sport velici",
      locations: ["Essaouira", "Dakhla", "Moulay Bouzerktoun"],
      price: "€35/giorno",
    },
    {
      icon: Sun,
      title: "Beach & Relax",
      description: "Spiagge dorate e resort di lusso",
      locations: ["Agadir", "Taghazout", "Plage Blanche"],
      price: "€80/giorno",
    },
    {
      icon: Utensils,
      title: "Gastronomia Marina",
      description: "Pesce fresco e specialità della costa",
      locations: ["Essaouira", "Casablanca", "Agadir"],
      price: "€25/pasto",
    },
  ]

  const tours = [
    {
      id: 1,
      title: "Costa Blu Completa",
      duration: "7 giorni / 6 notti",
      price: "€780",
      originalPrice: "€920",
      image: "/images/atlantic-coast-tour.png",
      cities: ["Casablanca", "El Jadida", "Essaouira", "Agadir"],
      includes: ["Tutte le città costiere", "Hotel fronte mare", "Attività surf", "Degustazioni pesce"],
      rating: 4.7,
      reviews: 143,
    },
    {
      id: 2,
      title: "Essaouira & Surf Experience",
      duration: "4 giorni / 3 notti",
      price: "€450",
      originalPrice: "€550",
      image: "/images/essaouira-surf.png",
      cities: ["Essaouira", "Taghazout"],
      includes: ["Lezioni surf", "Riad tradizionale", "Escursioni", "Artigianato locale"],
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 3,
      title: "Agadir Luxury Beach",
      duration: "5 giorni / 4 notti",
      price: "€890",
      originalPrice: "€1090",
      image: "/images/agadir-luxury.png",
      cities: ["Agadir", "Paradise Valley"],
      includes: ["Resort 5*", "Spa treatments", "Golf", "Escursioni private"],
      rating: 4.8,
      reviews: 67,
    },
  ]

  return (
    <div className="min-h-screen bg-background transition-colors">
      {/* Hero Section */}
      <div className="relative py-24 lg:py-32 bg-gradient-to-r from-sky-300 via-cyan-400 to-blue-500 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/essaouira-coast.png" 
            alt="Costa Blu" 
            className="w-full h-full object-cover opacity-20 dark:opacity-30" 
          />
          <div className="absolute inset-0 bg-white/20 dark:bg-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-900 dark:text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Costa Blu
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-2 bg-gradient-to-r from-blue-700 to-cyan-600 dark:from-cyan-300 dark:to-blue-200 bg-clip-text text-transparent">
              del Marocco
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 text-slate-800 dark:text-slate-200">
            Spiagge, onde, relax e tradizione lungo la costa atlantica marocchina
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/30 dark:bg-slate-800/60 backdrop-blur-sm px-6 py-3 rounded-full border border-blue-200 dark:border-slate-600">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Surf tutto l'anno</span>
            </div>
            <div className="bg-white/30 dark:bg-slate-800/60 backdrop-blur-sm px-6 py-3 rounded-full border border-blue-200 dark:border-slate-600">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Costa iconica</span>
            </div>
            <div className="bg-white/30 dark:bg-slate-800/60 backdrop-blur-sm px-6 py-3 rounded-full border border-blue-200 dark:border-slate-600">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Pesce freschissimo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="py-16 lg:py-24 bg-background transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Le Mete Blu</h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Le città costiere più affascinanti e oceaniche del Marocco
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="group bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-slate-200 dark:border-slate-700"
              >
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <img
                    src={destination.image || "/placeholder.svg?height=400&width=600"}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 dark:from-slate-950/90 to-transparent" />
                  {/* Location Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-sky-500 to-blue-600 dark:from-blue-600 dark:to-indigo-700 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-white" />
                      <span>{destination.name}</span>
                    </div>
                  </div>
                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-white/20 dark:bg-slate-800/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30 dark:border-slate-600/50">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-semibold">{destination.rating}</span>
                      <span className="text-white/80 text-sm">({destination.reviews})</span>
                    </div>
                  </div>
                  {/* Title Overlay */}
                  <div className="absolute bottom-6 left-6 text-white drop-shadow-lg">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-2">{destination.title}</h3>
                    <p className="text-slate-200 text-sm lg:text-base">{destination.description}</p>
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  {/* Info */}
                  <div className="flex items-center space-x-4 mb-6 text-sm text-sky-700 dark:text-sky-300">
                    <div className="flex items-center space-x-2">
                      <Sun className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span>{destination.bestTime}</span>
                    </div>
                  </div>
                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Cosa vedere:</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.map((highlight, hidx) => (
                        <span
                          key={hidx}
                          className="bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-500 dark:from-blue-600 dark:via-indigo-600 dark:to-slate-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Activities */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Attività:</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.activities.map((activity, aidx) => (
                        <span
                          key={aidx}
                          className="bg-gradient-to-r from-cyan-400 to-sky-500 dark:from-indigo-600 dark:to-blue-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <Link
                      href={`/viaggi/costa-atlantica/${destination.id}`}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-700 dark:hover:from-orange-700 dark:hover:to-red-800 transition-all duration-300 font-semibold text-center shadow-md"
                    >
                      Scopri {destination.name}
                    </Link>
                    <Link
                      href="/viaggi/gruppo"
                      className="px-6 py-3 border-2 border-orange-500 dark:border-orange-500 text-orange-700 dark:text-orange-400 rounded-xl hover:bg-orange-500 hover:text-white dark:hover:bg-orange-600 dark:hover:text-white dark:hover:border-orange-600 transition-all duration-300 font-semibold text-center"
                    >
                      Tour
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experiences Section */}
      <div className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Esperienze Blu
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground">
              Il meglio dell'oceano, tra sport e gusto
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {experiences.map((experience, idx) => (
              <div
                key={idx}
                className="bg-card rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border border-slate-200 dark:border-slate-700"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-600 dark:from-blue-600 dark:via-indigo-700 dark:to-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <experience.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{experience.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{experience.description}</p>
                <div className="text-xs text-sky-600 dark:text-cyan-400 mb-3 font-medium">
                  {experience.locations.join(" • ")}
                </div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{experience.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tours Section */}
      <div className="py-16 lg:py-24 bg-background transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Tour Costa Blu
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground">
              I migliori viaggi lungo il mare più wild del Marocco
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-slate-200 dark:border-slate-700"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tour.image || "/placeholder.svg?height=300&width=400"}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-sky-500 to-blue-700 dark:from-blue-600 dark:to-indigo-800 text-white px-4 py-2 rounded-full shadow-lg">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-lg">{tour.price}</span>
                      {tour.originalPrice && (
                        <span className="text-sm line-through text-slate-200">{tour.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-foreground">{tour.title}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-foreground">{tour.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-muted-foreground mb-2">Città incluse:</div>
                    <div className="flex flex-wrap gap-1">
                      {tour.cities.map((city, cidx) => (
                        <span
                          key={cidx}
                          className="bg-gradient-to-r from-sky-500 to-blue-600 dark:from-blue-600 dark:to-indigo-700 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-sm"
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    {tour.includes.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-sky-600 dark:bg-blue-500 rounded-full" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/viaggi/gruppo/${tour.id}`}
                    className="w-full bg-gradient-to-r from-sky-600 to-blue-700 dark:from-blue-700 dark:to-indigo-800 text-white py-3 px-4 rounded-xl hover:from-sky-700 hover:to-blue-800 dark:hover:from-blue-800 dark:hover:to-indigo-900 transition-all duration-300 font-semibold text-center block shadow-md"
                  >
                    Prenota Tour
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 lg:py-24 bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-600 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-900 dark:text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Pronto per l'Avventura Blu?</h2>
          <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto text-slate-800 dark:text-slate-200">
            Vivi il meglio dell'oceano tra vibe surf, cultura e paesaggi indimenticabili
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/viaggi/su-misura"
              className="bg-white dark:bg-slate-800 text-sky-700 dark:text-blue-300 px-8 py-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 font-semibold text-lg shadow-lg border border-slate-200 dark:border-slate-600"
            >
              Crea Tour Personalizzato
            </Link>
            <Link
              href="/contatti"
              className="border-2 border-white dark:border-slate-300 text-slate-800 dark:text-white px-8 py-4 rounded-xl hover:bg-white hover:text-sky-700 dark:hover:bg-slate-200 dark:hover:text-slate-900 transition-all duration-300 font-semibold text-lg"
            >
              Contattaci
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
