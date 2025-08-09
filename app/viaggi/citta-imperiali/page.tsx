import { MapPin, Clock, Users, Star, Camera, Utensils, Building } from 'lucide-react'
import Link from "next/link"

export default function CittaImperialiPage() {
  const cities = [
    {
      id: "marrakech",
      name: "Marrakech",
      title: "La Perla Rossa",
      description: "Città vibrante con la famosa piazza Jemaa el-Fnaa e souks colorati",
      image: "/images/marrakech-medina.png",
      highlights: ["Jemaa el-Fnaa", "Souks", "Giardini Majorelle", "Palazzo Bahia", "Koutoubia"],
      duration: "2-3 giorni",
      bestTime: "Ottobre - Aprile",
      rating: 4.9,
      reviews: 234,
    },
    {
      id: "fes",
      name: "Fes",
      title: "Capitale Spirituale",
      description: "La medina più grande del mondo e centro della cultura islamica",
      image: "/images/fes-architecture.png",
      highlights: ["Medina UNESCO", "Università Al Quaraouiyine", "Concerie Chouara", "Palazzo Reale"],
      duration: "2-3 giorni",
      bestTime: "Marzo - Maggio, Settembre - Novembre",
      rating: 4.8,
      reviews: 189,
    },
    {
      id: "meknes",
      name: "Meknes",
      title: "La Versailles del Marocco",
      description: "Monumenti imperiali grandiosi e atmosfera più rilassata",
      image: "/images/imperial-cities.png",
      highlights: ["Bab Mansour", "Mausoleo Moulay Ismail", "Heri es-Souani", "Volubilis"],
      duration: "1-2 giorni",
      bestTime: "Tutto l'anno",
      rating: 4.7,
      reviews: 156,
    },
    {
      id: "rabat",
      name: "Rabat",
      title: "Capitale Moderna",
      description: "Perfetto equilibrio tra tradizione e modernità",
      image: "/images/imperial-cities-tour.png",
      highlights: ["Torre Hassan", "Kasbah Oudayas", "Mausoleo Mohammed V", "Chellah"],
      duration: "1-2 giorni",
      bestTime: "Tutto l'anno",
      rating: 4.6,
      reviews: 143,
    },
  ]

  const tours = [
    {
      id: 1,
      title: "Grand Tour delle 4 Città Imperiali",
      duration: "8 giorni / 7 notti",
      price: "€890",
      originalPrice: "€1090",
      image: "/images/imperial-cities-tour.png",
      includes: ["Tutte e 4 le città", "Guide locali", "Trasporti privati", "Hotel 4*"],
      rating: 4.9,
      reviews: 127,
    },
    {
      id: 2,
      title: "Marrakech & Fes Express",
      duration: "5 giorni / 4 notti",
      price: "€590",
      originalPrice: "€720",
      image: "/images/marrakech-fes.png",
      includes: ["2 città principali", "Treno veloce", "Riad tradizionali", "Esperienze autentiche"],
      rating: 4.8,
      reviews: 89,
    },
    {
      id: 3,
      title: "Città Imperiali + Deserto",
      duration: "10 giorni / 9 notti",
      price: "€1290",
      originalPrice: "€1490",
      image: "/images/complete-morocco.png",
      includes: ["4 città + Sahara", "Notte nel deserto", "Cammelli", "Esperienza completa"],
      rating: 4.9,
      reviews: 156,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-24 lg:py-32 bg-gradient-to-r from-orange-500 to-red-500 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/imperial-cities-tour.png" 
            alt="Città Imperiali" 
            className="w-full h-full object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Città Imperiali
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-2 bg-gradient-to-r from-yellow-300 to-orange-200 bg-clip-text text-transparent">
              del Marocco
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8">
            Scopri Marrakech, Fes, Meknes e Rabat: quattro gioielli che raccontano la storia millenaria del regno
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">4 Città UNESCO</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Storia Millenaria</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Cultura Autentica</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Le Quattro Città Imperiali
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ogni città ha la sua personalità unica e tesori da scoprire
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {cities.map((city, idx) => (
              <div
                key={city.id}
                className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <img
                    src={city.image || "/placeholder.svg?height=400&width=600"}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* City Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span className="font-semibold text-gray-900">{city.name}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-semibold">{city.rating}</span>
                      <span className="text-white/70 text-sm">({city.reviews})</span>
                    </div>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-2">{city.title}</h3>
                    <p className="text-gray-200 text-sm lg:text-base">{city.description}</p>
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span>{city.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Camera className="w-4 h-4 text-orange-500" />
                      <span>{city.bestTime}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Cosa vedere:</h4>
                    <div className="flex flex-wrap gap-2">
                      {city.highlights.map((highlight, hidx) => (
                        <span
                          key={hidx}
                          className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <Link
                      href={`/viaggi/citta-imperiali/${city.id}`}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-center"
                    >
                      Scopri {city.name}
                    </Link>
                    <Link
                      href="/viaggi/gruppo"
                      className="px-6 py-3 border-2 border-orange-500 text-orange-500 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 font-semibold text-center"
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

      {/* Tours Section */}
      <div className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tour delle Città Imperiali
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
              Scegli il tour perfetto per scoprire le meraviglie imperiali
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
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

                  <div className="space-y-2 mb-6">
                    {tour.includes.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/viaggi/gruppo/${tour.id}`}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-center block"
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
      <div className="py-16 lg:py-24 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Pronto per l'Avventura Imperiale?</h2>
          <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
            Scopri la grandezza del passato marocchino attraverso le sue città più magnifiche
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/viaggi/su-misura"
              className="bg-white text-orange-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg"
            >
              Crea Tour Personalizzato
            </Link>
            <Link
              href="/contatti"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 font-semibold text-lg"
            >
              Contattaci
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
