"use client"

import { Calendar, Users, MapPin, Star, X, Check } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function GroupTripsPage() {
  const [selectedTrip, setSelectedTrip] = useState<any | null>(null)
  const [showDetails, setShowDetails] = useState(false)

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
      detailedDescription:
        "Immergiti nella storia millenaria del Marocco attraverso un tour completo delle quattro città imperiali. Inizierai a Marrakech, la 'Perla del Sud', dove visiterai la famosa piazza Jemaa el-Fnaa, i giardini Majorelle e il palazzo Bahia. Proseguirai verso Fes, la capitale spirituale, con la sua medina medievale patrimonio UNESCO. A Meknes scoprirai l'imponente Bab Mansour e le scuderie reali, mentre a Rabat, capitale moderna, visiterai la Torre Hassan e il mausoleo di Mohammed V.",
      itinerary: [
        {
          day: 1,
          title: "Arrivo a Marrakech",
          description: "Trasferimento dall'aeroporto, check-in hotel, prima esplorazione della medina",
        },
        {
          day: 2,
          title: "Marrakech - Città Rossa",
          description: "Visita completa: Palazzo Bahia, Giardini Majorelle, Piazza Jemaa el-Fnaa",
        },
        {
          day: 3,
          title: "Marrakech - Fes",
          description: "Partenza per Fes attraverso il Medio Atlante, sosta a Ifrane",
        },
        {
          day: 4,
          title: "Fes - Capitale Spirituale",
          description: "Tour completo della medina: Università Al Quaraouiyine, concerie, souks",
        },
        {
          day: 5,
          title: "Fes - Meknes",
          description: "Visita di Meknes: Bab Mansour, Mausoleo Moulay Ismail, scuderie reali",
        },
        {
          day: 6,
          title: "Meknes - Rabat",
          description: "Trasferimento a Rabat, visita Torre Hassan e Kasbah degli Oudayas",
        },
        { day: 7, title: "Rabat - Casablanca", description: "Visita di Casablanca: Moschea Hassan II, Corniche" },
        { day: 8, title: "Partenza", description: "Trasferimento in aeroporto e volo di ritorno" },
      ],
      included: [
        "7 notti in hotel 4* con colazione",
        "Trasferimenti privati in veicolo climatizzato",
        "Guida locale certificata parlante italiano",
        "Ingressi a monumenti e siti storici",
        "Assicurazione di viaggio base",
      ],
      notIncluded: [
        "Voli internazionali",
        "Pranzi e cene (tranne dove specificato)",
        "Bevande durante i pasti",
        "Mance e spese personali",
        "Assicurazione annullamento",
      ],
      groupSize: "6-12 persone",
      meetingPoint: "Aeroporto di Marrakech - Terminal 1",
      cancellationPolicy: "Cancellazione gratuita fino a 30 giorni prima della partenza",
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
      detailedDescription:
        "Parti per un'avventura indimenticabile nel cuore del deserto del Sahara. Da Merzouga, salirai a dorso di cammello per esplorare le dune dorate dell'Erg Chebbi, ammirando tramonti mozzafiato e trascorrendo notti sotto un cielo stellato senza pari. Incontrerai le popolazioni berbere locali, scoprendo le loro tradizioni e la loro ospitalità unica. Un'esperienza autentica e coinvolgente che ti lascerà ricordi indelebili.",
      itinerary: [
        {
          day: 1,
          title: "Arrivo a Merzouga",
          description: "Trasferimento in hotel, preparazione per l'escursione nel deserto",
        },
        {
          day: 2,
          title: "Merzouga - Erg Chebbi",
          description: "Trekking a dorso di cammello, notte in campo tendato nel deserto",
        },
        {
          day: 3,
          title: "Deserto del Sahara",
          description: "Esplorazione delle dune, incontro con nomadi berberi",
        },
        {
          day: 4,
          title: "Merzouga - Rissani",
          description: "Visita al mercato di Rissani, rientro a Merzouga",
        },
        { day: 5, title: "Partenza", description: "Trasferimento in aeroporto e volo di ritorno" },
      ],
      included: [
        "4 notti in hotel/campo tendato con colazione e cena",
        "Trasferimenti privati in veicolo 4x4",
        "Guida locale berbera parlante italiano",
        "Trekking a dorso di cammello",
        "Assicurazione di viaggio base",
      ],
      notIncluded: [
        "Voli internazionali",
        "Pranzi (tranne dove specificato)",
        "Bevande durante i pasti",
        "Mance e spese personali",
        "Assicurazione annullamento",
      ],
      groupSize: "4-8 persone",
      meetingPoint: "Aeroporto di Errachidia",
      cancellationPolicy: "Cancellazione gratuita fino a 20 giorni prima della partenza",
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
      detailedDescription:
        "Scopri i tesori nascosti del sud del Marocco in un viaggio che ti porterà attraverso paesaggi mozzafiato e città fortificate. Visiterai Ouarzazate, la 'Hollywood del Marocco', e l'iconica kasbah di Aït Benhaddou, patrimonio UNESCO. Esplorerai le gole del Dadès e del Todra, con le loro pareti rocciose imponenti, e ti immergerai nella cultura berbera locale. Un'esperienza unica che ti farà innamorare del Marocco più autentico.",
      itinerary: [
        {
          day: 1,
          title: "Arrivo a Ouarzazate",
          description: "Trasferimento in hotel, visita panoramica della città",
        },
        {
          day: 2,
          title: "Ouarzazate - Aït Benhaddou",
          description: "Visita della kasbah di Aït Benhaddou, patrimonio UNESCO",
        },
        {
          day: 3,
          title: "Aït Benhaddou - Gole del Dadès",
          description: "Percorso attraverso la Valle delle Rose, visita alle gole del Dadès",
        },
        {
          day: 4,
          title: "Gole del Dadès - Gole del Todra",
          description: "Escursione alle gole del Todra, trekking nella valle",
        },
        {
          day: 5,
          title: "Gole del Todra - Erfoud",
          description: "Visita di Erfoud, città delle oasi",
        },
        {
          day: 6,
          title: "Erfoud - Ouarzazate",
          description: "Rientro a Ouarzazate attraverso la Valle del Draa",
        },
        { day: 7, title: "Partenza", description: "Trasferimento in aeroporto e volo di ritorno" },
      ],
      included: [
        "6 notti in hotel/riad con colazione e cena",
        "Trasferimenti privati in veicolo climatizzato",
        "Guida locale parlante italiano",
        "Ingressi a monumenti e siti storici",
        "Assicurazione di viaggio base",
      ],
      notIncluded: [
        "Voli internazionali",
        "Pranzi (tranne dove specificato)",
        "Bevande durante i pasti",
        "Mance e spese personali",
        "Assicurazione annullamento",
      ],
      groupSize: "6-10 persone",
      meetingPoint: "Aeroporto di Ouarzazate",
      cancellationPolicy: "Cancellazione gratuita fino a 25 giorni prima della partenza",
    },
  ]

  const openDetails = (trip: any) => {
    setSelectedTrip(trip)
    setShowDetails(true)
  }

  const closeDetails = () => {
    setShowDetails(false)
    setSelectedTrip(null)
  }

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
            <div className="grid md:grid-cols-2 gap-4 flex-1">
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
              <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white md:col-span-2">
                <option>Tutte le difficoltà</option>
                <option>Avventuroso</option>
                <option>Rilassante</option>
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
                    <Link
                      href="/contatti"
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-center"
                    >
                      Richiedi Info
                    </Link>
                    <button
                      onClick={() => openDetails(trip)}
                      className="px-4 py-3 border-2 border-orange-500 text-orange-500 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300"
                    >
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
            <Link
              href="/viaggi/su-misura"
              className="bg-white text-orange-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg"
            >
              Viaggio su Misura
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

      {/* Trip Details Modal */}
      {showDetails && selectedTrip && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedTrip.image || "/placeholder.svg"}
                alt={selectedTrip.title}
                className="w-full h-64 object-cover rounded-t-3xl"
              />
              <button
                onClick={closeDetails}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <X className="w-5 h-5 text-gray-900" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold">
                  {selectedTrip.badge}
                </span>
              </div>
            </div>

            <div className="p-6 lg:p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{selectedTrip.title}</h2>
                  <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedTrip.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{selectedTrip.groupSize}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>
                        {selectedTrip.rating} ({selectedTrip.reviews} recensioni)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-orange-600">{selectedTrip.price}</div>
                  <div className="text-lg text-gray-500 line-through">{selectedTrip.originalPrice}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">per persona</div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Descrizione</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {selectedTrip.detailedDescription}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Itinerario Dettagliato</h3>
                    <div className="space-y-4">
                      {selectedTrip.itinerary?.map((day, index) => (
                        <div key={index} className="flex space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                          <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                            {day.day}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{day.title}</h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{day.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-4">Incluso nel Prezzo</h3>
                    <ul className="space-y-2">
                      {selectedTrip.included?.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start space-x-2 text-sm text-green-700 dark:text-green-400"
                        >
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-red-800 dark:text-red-300 mb-4">Non Incluso</h3>
                    <ul className="space-y-2">
                      {selectedTrip.notIncluded?.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-red-700 dark:text-red-400">
                          <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-4">Informazioni Pratiche</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-blue-700 dark:text-blue-400">Punto di Ritrovo:</span>
                        <p className="text-blue-600 dark:text-blue-300">{selectedTrip.meetingPoint}</p>
                      </div>
                      <div>
                        <span className="font-medium text-blue-700 dark:text-blue-400">Prossima Partenza:</span>
                        <p className="text-blue-600 dark:text-blue-300">{selectedTrip.nextDeparture}</p>
                      </div>
                      <div>
                        <span className="font-medium text-blue-700 dark:text-blue-400">Posti Disponibili:</span>
                        <p className="text-blue-600 dark:text-blue-300">{selectedTrip.spotsLeft} posti rimasti</p>
                      </div>
                      <div>
                        <span className="font-medium text-blue-700 dark:text-blue-400">Cancellazione:</span>
                        <p className="text-blue-600 dark:text-blue-300">{selectedTrip.cancellationPolicy}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="/contatti"
                      className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-lg text-center"
                    >
                      Richiedi Informazioni - {selectedTrip.price}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
