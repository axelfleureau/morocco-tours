import { Waves, Sun, Wind, Camera, Utensils, MapPin, Clock, Star } from 'lucide-react'
import Link from "next/link"

export default function CostaAtlanticaPage() {
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
      title: "Costa Atlantica Completa",
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-24 lg:py-32 bg-gradient-to-r from-blue-500 to-cyan-500 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/essaouira-coast.png" 
            alt="Costa Atlantica" 
            className="w-full h-full object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Costa Atlantica
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-2 bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
              del Marocco
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8">
            Spiagge dorate, onde perfette e città costiere affascinanti lungo l'Oceano Atlantico
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Surf tutto l'anno</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Spiagge infinite</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Pesce freschissimo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Destinazioni della Costa
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ogni città costiera offre un'esperienza unica tra mare, cultura e relax
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {destinations.map((destination, idx) => (
              <div
                key={destination.id}
                className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <img
                    src={destination.image || "/placeholder.svg?height=400&width=600"}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Location Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold text-gray-900">{destination.name}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-semibold">{destination.rating}</span>
                      <span className="text-white/70 text-sm">({destination.reviews})</span>
                    </div>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-2">{destination.title}</h3>
                    <p className="text-gray-200 text-sm lg:text-base">{destination.description}</p>
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  {/* Info */}
                  <div className="flex items-center space-x-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Sun className="w-4 h-4 text-blue-500" />
                      <span>{destination.bestTime}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Cosa vedere:</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.map((highlight, hidx) => (
                        <span
                          key={hidx}
                          className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Activities */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Attività:</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.activities.map((activity, aidx) => (
                        <span
                          key={aidx}
                          className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 px-3 py-1 rounded-full text-xs font-medium"
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
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-semibold text-center"
                    >
                      Scopri {destination.name}
                    </Link>
                    <Link
                      href="/viaggi/gruppo"
                      className="px-6 py-3 border-2 border-blue-500 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 font-semibold text-center"
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
      <div className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Esperienze sulla Costa
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
              Attività uniche per vivere al meglio l'Oceano Atlantico
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {experiences.map((experience, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <experience.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{experience.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{experience.description}</p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  {experience.locations.join(" • ")}
                </div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{experience.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tours Section */}
      <div className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tour della Costa Atlantica
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
              Pacchetti completi per esplorare la costa marocchina
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tour.image || "/placeholder.svg?height=300&width=400"}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-lg text-gray-900">{tour.price}</span>
                      {tour.originalPrice && (
                        <span className="text-sm line-through text-gray-500">{tour.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{tour.title}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold">{tour.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{tour.duration}</span>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Città incluse:</div>
                    <div className="flex flex-wrap gap-1">
                      {tour.cities.map((city, cidx) => (
                        <span
                          key={cidx}
                          className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs"
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {tour.includes.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/viaggi/gruppo/${tour.id}`}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-semibold text-center block"
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
      <div className="py-16 lg:py-24 bg-gradient-to-r from-blue-500 to-cyan-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Pronto per l'Avventura Oceanica?</h2>
          <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
            Scopri la magia della costa atlantica marocchina tra surf, relax e cultura
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/viaggi/su-misura"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg"
            >
              Crea Tour Personalizzato
            </Link>
            <Link
              href="/contatti"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold text-lg"
            >
              Contattaci
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
