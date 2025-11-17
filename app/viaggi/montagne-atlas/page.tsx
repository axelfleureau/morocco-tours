import { Mountain, Compass, Camera, Users, Clock, Star, TreePine, Sun } from 'lucide-react'
import Link from "next/link"
import WishlistButton from "@/components/WishlistButton"

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
    <div className="min-h-screen bg-background transition-colors">
      {/* Hero Section */}
      <div className="relative py-24 lg:py-32 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-600 dark:from-slate-900 dark:via-green-950 dark:to-emerald-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/atlas-mountains.png" 
            alt="Montagne Atlas" 
            className="w-full h-full object-cover opacity-20 dark:opacity-30" 
          />
          <div className="absolute inset-0 bg-white/20 dark:bg-black/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-900 dark:text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Montagne
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-2 bg-gradient-to-r from-green-700 to-emerald-600 dark:from-emerald-300 dark:to-green-200 bg-clip-text text-transparent">
              dell'Atlante
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 text-slate-800 dark:text-slate-200">
            Trekking epici, vette maestose e villaggi berberi autentici nel cuore delle montagne marocchine
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/30 dark:bg-slate-800/60 backdrop-blur-sm px-6 py-3 rounded-full border border-green-200 dark:border-slate-600">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Monte Toubkal 4.167m</span>
            </div>
            <div className="bg-white/30 dark:bg-slate-800/60 backdrop-blur-sm px-6 py-3 rounded-full border border-green-200 dark:border-slate-600">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Villaggi Berberi</span>
            </div>
            <div className="bg-white/30 dark:bg-slate-800/60 backdrop-blur-sm px-6 py-3 rounded-full border border-green-200 dark:border-slate-600">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Guide Esperte</span>
            </div>
          </div>
        </div>
      </div>

      {/* Regions Grid */}
      <div className="py-16 lg:py-24 bg-background transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Le Catene Montuose
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Tre catene montuose diverse, ognuna con le sue caratteristiche uniche
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {regions.map((region, idx) => (
              <div
                key={region.id}
                className="group bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-slate-200 dark:border-slate-700"
              >
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <img
                    src={region.image || "/placeholder.svg?height=400&width=600"}
                    alt={region.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 dark:from-slate-950/90 to-transparent" />
                  
                  {/* Difficulty Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-slate-200 dark:border-slate-600">
                    <div className="flex items-center space-x-2">
                      <Mountain className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${i < region.difficulty ? "bg-emerald-500 dark:bg-emerald-400" : "bg-slate-300 dark:bg-slate-600"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-white/20 dark:bg-slate-800/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30 dark:border-slate-600/50">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-semibold">{region.rating}</span>
                      <span className="text-white/80 text-sm">({region.reviews})</span>
                    </div>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-6 left-6 text-white drop-shadow-lg">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-2">{region.title}</h3>
                    <p className="text-slate-200 text-sm lg:text-base">{region.description}</p>
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  {/* Info */}
                  <div className="flex items-center space-x-4 mb-6 text-sm text-emerald-700 dark:text-emerald-300">
                    <div className="flex items-center space-x-2">
                      <Sun className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span>{region.bestTime}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Cosa vedere:</h4>
                    <div className="flex flex-wrap gap-2">
                      {region.highlights.map((highlight, hidx) => (
                        <span
                          key={hidx}
                          className="bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 dark:from-green-600 dark:via-emerald-600 dark:to-slate-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
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
                      {region.activities.map((activity, aidx) => (
                        <span
                          key={aidx}
                          className="bg-gradient-to-r from-teal-400 to-green-500 dark:from-emerald-600 dark:to-green-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
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
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 dark:from-green-600 dark:to-emerald-700 text-white py-3 px-4 rounded-xl hover:from-emerald-600 hover:to-green-700 dark:hover:from-green-700 dark:hover:to-emerald-800 transition-all duration-300 font-semibold text-center shadow-md"
                    >
                      Esplora {region.name}
                    </Link>
                    <Link
                      href="/viaggi/gruppo"
                      className="px-6 py-3 border-2 border-emerald-500 dark:border-green-500 text-emerald-700 dark:text-green-400 rounded-xl hover:bg-emerald-500 hover:text-white dark:hover:bg-green-600 dark:hover:text-white dark:hover:border-green-600 transition-all duration-300 font-semibold text-center"
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
      <div className="py-16 lg:py-24 bg-gradient-to-b from-orange-50 via-orange-100 to-white dark:bg-slate-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Trekking Iconici
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground">
              Le escursioni più spettacolari dell'Atlante marocchino
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trekkingRoutes.map((route) => (
              <div
                key={route.id}
                className="bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-slate-200 dark:border-slate-700"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={route.image || "/placeholder.svg?height=300&width=400"}
                    alt={route.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Wishlist Button */}
                  <div className="absolute top-16 left-4 z-10">
                    <WishlistButton
                      itemId={`atlas-trek-${route.id}`}
                      itemType="experience"
                      itemTitle={route.name}
                      itemImage={route.image}
                      itemPrice={parseInt(route.price.replace(/[^0-9]/g, '')) || 0}
                      itemDescription={route.description}
                    />
                  </div>
                  
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-slate-200 dark:border-slate-600">
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{route.altitude}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-green-700 dark:from-green-600 dark:to-emerald-800 text-white px-3 py-1 rounded-full shadow-lg">
                    <span className="font-bold text-lg">{route.price}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i < route.difficulty ? "bg-orange-400 dark:bg-orange-300" : "bg-white/50 dark:bg-slate-500"}`}
                      />
                    ))}
                    <span className="text-white text-xs ml-2 font-medium">Difficoltà</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{route.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{route.description}</p>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{route.duration}</span>
                  </div>

                  <div className="space-y-2 mb-6">
                    {route.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/esperienze/trekking/${route.id}`}
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-700 dark:from-green-700 dark:to-emerald-800 text-white py-3 px-4 rounded-xl hover:from-emerald-700 hover:to-green-800 dark:hover:from-green-800 dark:hover:to-emerald-900 transition-all duration-300 font-semibold text-center block shadow-md"
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
      <div className="py-16 lg:py-24 bg-background transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Esperienze di Montagna
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground">
              Attività specializzate per ogni tipo di avventuriero
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {experiences.map((experience, idx) => (
              <div
                key={idx}
                className="bg-card rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border border-slate-200 dark:border-slate-700"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-600 dark:from-green-600 dark:via-emerald-700 dark:to-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <experience.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{experience.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{experience.description}</p>
                <div className="text-xs text-emerald-600 dark:text-green-400 mb-3 font-medium">{experience.duration}</div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">{experience.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tours Section */}
      <div className="py-16 lg:py-24 bg-gradient-to-b from-orange-50 via-orange-100 to-white dark:bg-slate-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Tour delle Montagne Atlas
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground">
              Pacchetti completi per esplorare le montagne marocchine
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
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-green-700 dark:from-green-600 dark:to-emerald-800 text-white px-4 py-2 rounded-full shadow-lg">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-lg">{tour.price}</span>
                      {tour.originalPrice && (
                        <span className="text-sm line-through text-slate-200">{tour.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i < tour.difficulty ? "bg-orange-400 dark:bg-orange-300" : "bg-white/50 dark:bg-slate-500"}`}
                      />
                    ))}
                    <span className="text-white text-xs ml-2 font-medium">Difficoltà</span>
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

                  <div className="space-y-2 mb-6">
                    {tour.includes.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/viaggi/gruppo/${tour.id}`}
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-700 dark:from-green-700 dark:to-emerald-800 text-white py-3 px-4 rounded-xl hover:from-emerald-700 hover:to-green-800 dark:hover:from-green-800 dark:hover:to-emerald-900 transition-all duration-300 font-semibold text-center block shadow-md"
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
      <div className="py-16 lg:py-24 bg-gradient-to-r from-emerald-500 via-green-600 to-teal-700 dark:from-slate-900 dark:via-green-950 dark:to-emerald-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-900 dark:text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Pronto per l'Avventura in Montagna?</h2>
          <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto text-slate-800 dark:text-slate-200">
            Scopri la maestosità dell'Atlante marocchino con guide esperte e itinerari indimenticabili
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/viaggi/su-misura"
              className="bg-white dark:bg-slate-800 text-emerald-700 dark:text-green-300 px-8 py-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 font-semibold text-lg shadow-lg border border-slate-200 dark:border-slate-600"
            >
              Crea Trekking Personalizzato
            </Link>
            <Link
              href="/contatti"
              className="border-2 border-white dark:border-slate-300 text-slate-800 dark:text-white px-8 py-4 rounded-xl hover:bg-white hover:text-emerald-700 dark:hover:bg-slate-200 dark:hover:text-slate-900 transition-all duration-300 font-semibold text-lg"
            >
              Contattaci
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
