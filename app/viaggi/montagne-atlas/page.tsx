import { Mountain, Compass, Camera, Users, Clock, Star, TreePine, Sun } from 'lucide-react'
import Link from "next/link"

export default function MontagneAtlasPage() {
  const regions = [
    {
      id: "alto-atlante",
      name: "Alto Atlante",
      title: "Tetto del Nord Africa",
      description: "Vette imponenti, villaggi berberi e il maestoso Monte Toubkal",
      image: "/images/atlas-mountains.png",
      highlights: ["Monte Toubkal (4.167m)", "Valle dell'Ourika", "Villaggi berberi", "Cascate Ouzoud", "Imlil"],
      activities: ["Trekking", "Alpinismo", "Fotografia", "Cultura berbera", "Muli trekking"],
      difficulty: 4,
      bestTime: "Aprile - Ottobre",
      rating: 4.9,
      reviews: 156,
    },
    {
      id: "medio-atlante",
      name: "Medio Atlante",
      title: "Montagne dei Cedri",
      description: "Foreste di cedri, laghi alpini e clima temperato",
      image: "/images/middle-atlas.png",
      highlights: ["Foresta di Azrou", "Lago Ifrane", "Scimmie berbere", "Ifrane", "Cascate Ouzoud"],
      activities: ["Trekking facile", "Wildlife", "Fotografia", "Relax", "Pesca"],
      difficulty: 2,
      bestTime: "Tutto l'anno",
      rating: 4.6,
      reviews: 89,
    },
    {
      id: "anti-atlante",
      name: "Anti Atlante",
      title: "Montagne del Sud",
      description: "Paesaggi lunari, oasi e villaggi tradizionali",
      image: "/images/anti-atlas.png",
      highlights: ["Tafraoute", "Rocce dipinte", "Oasi Ameln", "Villaggi berberi", "Argan"],
      activities: ["Trekking", "Roccia", "Cultura", "Fotografia", "Artigianato"],
      difficulty: 3,
      bestTime: "Ottobre - Aprile",
      rating: 4.7,
      reviews: 67,
    },
  ]

  const trekkingRoutes = [
    {
      id: "toubkal",
      name: "Ascensione al Toubkal",
      duration: "3 giorni / 2 notti",
      difficulty: 5,
      altitude: "4.167m",
      price: "€280",
      image: "/images/toubkal-trek.png",
      description: "La vetta più alta del Nord Africa",
      highlights: ["Vetta più alta", "Rifugio Toubkal", "Alba in vetta", "Panorami mozzafiato"],
    },
    {
      id: "mgoun",
      name: "Traversata del Mgoun",
      duration: "5 giorni / 4 notti",
      difficulty: 4,
      altitude: "4.071m",
      price: "€450",
      image: "/images/mgoun-trek.png",
      description: "Attraverso le valli più belle dell'Atlante",
      highlights: ["Valle delle Rose", "Villaggi berberi", "Gole spettacolari", "Cultura autentica"],
    },
    {
      id: "saghro",
      name: "Massiccio del Saghro",
      duration: "4 giorni / 3 notti",
      difficulty: 3,
      altitude: "2.712m",
      price: "€380",
      image: "/images/saghro-trek.png",
      description: "Paesaggi lunari e formazioni rocciose uniche",
      highlights: ["Formazioni rocciose", "Nomadi", "Stelle", "Geologia unica"],
    },
  ]

  const experiences = [
    {
      icon: Mountain,
      title: "Trekking Guidato",
      description: "Guide berbere esperte per ogni livello di difficoltà",
      duration: "1-7 giorni",
      price: "€45/giorno",
    },
    {
      icon: Compass,
      title: "Alpinismo Tecnico",
      description: "Ascensioni tecniche su roccia e ghiaccio",
      duration: "2-5 giorni",
      price: "€80/giorno",
    },
    {
      icon: Camera,
      title: "Fotografia di Montagna",
      description: "Workshop fotografici nei paesaggi più spettacolari",
      duration: "3-4 giorni",
      price: "€120/giorno",
    },
    {
      icon: Users,
      title: "Cultura Berbera",
      description: "Immersione nella vita dei villaggi di montagna",
      duration: "2-3 giorni",
      price: "€60/giorno",
    },
  ]

  const tours = [
    {
      id: 1,
      title: "Toubkal & Villaggi Berberi",
      duration: "6 giorni / 5 notti",
      price: "€650",
      originalPrice: "€780",
      image: "/images/toubkal-villages.png",
      includes: ["Ascensione Toubkal", "Guide berbere", "Muli da soma", "Pensione completa", "Rifugi montani"],
      difficulty: 4,
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 2,
      title: "Atlante per Famiglie",
      duration: "4 giorni / 3 notti",
      price: "€380",
      originalPrice: "€450",
      image: "/images/atlas-family.png",
      includes: ["Trekking facili", "Attività bambini", "Villaggi berberi", "Cascate", "Guide specializzate"],
      difficulty: 2,
      rating: 4.7,
      reviews: 67,
    },
    {
      id: 3,
      title: "Grande Traversata Atlante",
      duration: "10 giorni / 9 notti",
      price: "€1280",
      originalPrice: "€1450",
      image: "/images/atlas-traverse.png",
      includes: ["3 massicci", "Camping selvaggio", "Guide esperte", "Tutto incluso", "Trasferimenti"],
      difficulty: 5,
      rating: 4.8,
      reviews: 34,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-24 lg:py-32 bg-gradient-to-r from-green-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/atlas-mountains.png" 
            alt="Montagne Atlas" 
            className="w-full h-full object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Montagne
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-2 bg-gradient-to-r from-green-300 to-blue-200 bg-clip-text text-transparent">
              dell'Atlante
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8">
            Trekking epici, vette maestose e villaggi berberi autentici nel cuore delle montagne marocchine
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Monte Toubkal 4.167m</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Villaggi Berberi</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Guide Esperte</span>
            </div>
          </div>
        </div>
      </div>

      {/* Regions Grid */}
      <div className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Le Catene Montuose
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tre catene montuose diverse, ognuna con le sue caratteristiche uniche
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {regions.map((region, idx) => (
              <div
                key={region.id}
                className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <img
                    src={region.image || "/placeholder.svg?height=400&width=600"}
                    alt={region.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Difficulty Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <div className="flex items-center space-x-2">
                      <Mountain className="w-4 h-4 text-green-500" />
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${i < region.difficulty ? "bg-green-500" : "bg-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-semibold">{region.rating}</span>
                      <span className="text-white/70 text-sm">({region.reviews})</span>
                    </div>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-2">{region.title}</h3>
                    <p className="text-gray-200 text-sm lg:text-base">{region.description}</p>
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  {/* Info */}
                  <div className="flex items-center space-x-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Sun className="w-4 h-4 text-green-500" />
                      <span>{region.bestTime}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Cosa vedere:</h4>
                    <div className="flex flex-wrap gap-2">
                      {region.highlights.map((highlight, hidx) => (
                        <span
                          key={hidx}
                          className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs font-medium"
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
                      {region.activities.map((activity, aidx) => (
                        <span
                          key={aidx}
                          className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <Link
                      href={`/viaggi/montagne-atlas/${region.id}`}
                      className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 font-semibold text-center"
                    >
                      Esplora {region.name}
                    </Link>
                    <Link
                      href="/viaggi/gruppo"
                      className="px-6 py-3 border-2 border-green-500 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all duration-300 font-semibold text-center"
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

      {/* Trekking Routes */}
      <div className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trekking Iconici
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
              Le escursioni più spettacolari dell'Atlante marocchino
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trekkingRoutes.map((route) => (
              <div
                key={route.id}
                className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={route.image || "/placeholder.svg?height=300&width=400"}
                    alt={route.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="font-bold text-sm text-gray-900">{route.altitude}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="font-bold text-lg text-gray-900">{route.price}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i < route.difficulty ? "bg-orange-400" : "bg-white/50"}`}
                      />
                    ))}
                    <span className="text-white text-xs ml-2">Difficoltà</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{route.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{route.description}</p>

                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{route.duration}</span>
                  </div>

                  <div className="space-y-2 mb-6">
                    {route.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/esperienze/trekking/${route.id}`}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 font-semibold text-center block"
                  >
                    Prenota Trekking
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experiences Section */}
      <div className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Esperienze di Montagna
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
              Attività specializzate per ogni tipo di avventuriero
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {experiences.map((experience, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <experience.icon className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{experience.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{experience.description}</p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">{experience.duration}</div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">{experience.price}</div>
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
              Tour delle Montagne Atlas
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
              Pacchetti completi per esplorare le montagne marocchine
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
                  <div className="absolute bottom-4 left-4 flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i < tour.difficulty ? "bg-orange-400" : "bg-white/50"}`}
                      />
                    ))}
                    <span className="text-white text-xs ml-2">Difficoltà</span>
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
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/viaggi/gruppo/${tour.id}`}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 font-semibold text-center block"
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
      <div className="py-16 lg:py-24 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Pronto per l'Avventura in Montagna?</h2>
          <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
            Scopri la maestosità dell'Atlante marocchino con guide esperte e itinerari indimenticabili
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/viaggi/su-misura"
              className="bg-white text-green-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg"
            >
              Crea Trekking Personalizzato
            </Link>
            <Link
              href="/contatti"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300 font-semibold text-lg"
            >
              Contattaci
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
