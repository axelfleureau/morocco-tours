import { Calendar, Users, MapPin, Star, Heart } from "lucide-react"

export default function GroupTripsPage() {
  const trips = [
    {
      id: 1,
      title: "Tour delle Città Imperiali",
      duration: "8 giorni / 7 notti",
      price: "€890",
      originalPrice: "€1090",
      image: "/images/imperial-cities-tour.png",
      highlights: ["Marrakech", "Fes", "Meknes", "Rabat"],
      badge: "Bestseller",
      difficulty: 2,
      rating: 4.9,
      reviews: 127,
      nextDeparture: "15 Marzo 2024",
      spotsLeft: 3,
      description:
        "Un viaggio completo attraverso le quattro città imperiali del Marocco, scoprendo palazzi, medine e tradizioni millenarie.",
    },
    {
      id: 2,
      title: "Avventura nel Deserto del Sahara",
      duration: "5 giorni / 4 notti",
      price: "€650",
      originalPrice: "€750",
      image: "/images/sahara-adventure.png",
      highlights: ["Merzouga", "Cammelli", "Notte sotto le stelle", "Berberi"],
      badge: "Più Amato",
      difficulty: 3,
      rating: 4.8,
      reviews: 89,
      nextDeparture: "22 Marzo 2024",
      spotsLeft: 5,
      description: "Un'esperienza magica nel cuore del Sahara con notti in campo tendato e trekking sui cammelli.",
    },
    {
      id: 3,
      title: "Tesori del Sud",
      duration: "7 giorni / 6 notti",
      price: "€1290",
      originalPrice: "€1490",
      image: "/images/south-treasures.png",
      highlights: ["Ouarzazate", "Aït Benhaddou", "Dadès", "Todra"],
      badge: "Novità",
      difficulty: 2,
      rating: 4.7,
      reviews: 45,
      nextDeparture: "5 Aprile 2024",
      spotsLeft: 8,
      description: "Esplora le meraviglie del sud del Marocco, dalle kasbah alle gole spettacolari dell'Atlante.",
    },
    {
      id: 4,
      title: "Costa Atlantica e Essaouira",
      duration: "6 giorni / 5 notti",
      price: "€780",
      originalPrice: "€920",
      image: "/images/essaouira-coast.png",
      highlights: ["Essaouira", "Surf", "Argan", "Medina"],
      badge: "Relax",
      difficulty: 1,
      rating: 4.6,
      reviews: 67,
      nextDeparture: "12 Aprile 2024",
      spotsLeft: 6,
      description: "Rilassati sulla costa atlantica, scopri la città dei venti e le tradizioni dell'olio di argan.",
    },
    {
      id: 5,
      title: "Marocco Completo",
      duration: "12 giorni / 11 notti",
      price: "€1890",
      originalPrice: "€2190",
      image: "/images/complete-morocco.png",
      highlights: ["Città imperiali", "Deserto", "Costa", "Montagne"],
      badge: "Completo",
      difficulty: 2,
      rating: 4.9,
      reviews: 156,
      nextDeparture: "20 Aprile 2024",
      spotsLeft: 2,
      description:
        "Il viaggio definitivo per scoprire tutti gli aspetti del Marocco in un'unica esperienza indimenticabile.",
    },
    {
      id: 6,
      title: "Trekking nell'Atlante",
      duration: "6 giorni / 5 notti",
      price: "€950",
      originalPrice: "€1150",
      image: "/images/atlas-mountains.png",
      highlights: ["Toubkal", "Berberi", "Trekking", "Villaggi"],
      badge: "Avventura",
      difficulty: 4,
      rating: 4.8,
      reviews: 73,
      nextDeparture: "28 Aprile 2024",
      spotsLeft: 4,
      description: "Sfida te stesso con il trekking verso la vetta più alta del Nord Africa nel cuore dell'Atlante.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-32 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Viaggi di Gruppo</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Unisciti ai nostri gruppi per vivere il Marocco in compagnia di altri viaggiatori
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Partenze garantite</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Gruppi piccoli (max 12 persone)</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Guide esperte</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="py-8 bg-gray-50 dark:bg-gray-800 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>Tutte le durate</option>
                <option>3-5 giorni</option>
                <option>6-8 giorni</option>
                <option>9+ giorni</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>Tutti i prezzi</option>
                <option>€500-€800</option>
                <option>€800-€1200</option>
                <option>€1200+</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>Tutte le difficoltà</option>
                <option>Facile</option>
                <option>Moderato</option>
                <option>Impegnativo</option>
              </select>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{trips.length} viaggi disponibili</div>
          </div>
        </div>
      </div>

      {/* Trips Grid */}
      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={trip.image || "/placeholder.svg"}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {trip.badge}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full">
                    <div className="flex items-center space-x-1">
                      <span className="font-bold text-lg">{trip.price}</span>
                      <span className="text-sm line-through text-gray-500">{trip.originalPrice}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i < trip.difficulty ? "bg-orange-400" : "bg-white/50"}`}
                      />
                    ))}
                    <span className="text-white text-xs ml-2">Difficoltà</span>
                  </div>
                  <button className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Heart className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{trip.title}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{trip.rating}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">({trip.reviews})</span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{trip.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {trip.highlights.map((highlight, hidx) => (
                      <span
                        key={hidx}
                        className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{trip.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{trip.spotsLeft} posti rimasti</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>Prossima partenza: {trip.nextDeparture}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold">
                      Prenota Ora
                    </button>
                    <button className="px-4 py-3 border-2 border-orange-500 text-orange-500 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300">
                      Dettagli
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Non Trovi il Viaggio Perfetto?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Creiamo viaggi su misura per le tue esigenze specifiche. Contattaci per un preventivo personalizzato.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/viaggi/su-misura"
              className="bg-white text-orange-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg"
            >
              Viaggio su Misura
            </a>
            <a
              href="/contatti"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 font-semibold text-lg"
            >
              Contattaci
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
