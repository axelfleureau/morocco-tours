"use client"

import { useState } from "react"
import { Star, Clock, Users, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import BookingModal from "@/components/modals/BookingModal"
import WishlistButton from "@/components/WishlistButton"

export default function SaharaToursPage() {
  const [selectedTour, setSelectedTour] = useState<number | null>(null);
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    tour: any;
  }>({ isOpen: false, tour: null });

  const openBookingModal = (tour: any) => {
    setBookingModal({ isOpen: true, tour });
  };

  const closeBookingModal = () => {
    setBookingModal({ isOpen: false, tour: null });
  };

  const saharaTours = [
    {
      id: 1,
      title: "Deserto Express",
      subtitle: "L'essenza del Sahara in 48 ore",
      duration: "2 giorni / 1 notte",
      price: "€180",
      originalPrice: "€220",
      image: "/images/desert-express.png",
      difficulty: 1,
      rating: 4.7,
      reviews: 89,
      groupSize: "2-8 persone",
      highlights: [
        "Tramonto sulle dune di Erg Chebbi",
        "Notte in campo tendato tradizionale",
        "Escursione in cammello",
        "Alba nel deserto",
        "Trasporto da/per Marrakech",
      ],
      itinerary: [
        {
          day: 1,
          title: "Marrakech → Merzouga",
          description: "Partenza mattutina, attraversamento dell'Atlante, arrivo al tramonto per l'escursione in cammello",
        },
        {
          day: 2,
          title: "Alba nel deserto → Marrakech",
          description: "Sveglia per l'alba, colazione berbera, rientro a Marrakech nel pomeriggio",
        },
      ],
      includes: [
        "Trasporto in 4x4/minivan climatizzato",
        "1 notte in campo tendato standard",
        "Cena e colazione nel deserto",
        "Escursione in cammello (1h)",
        "Guida locale parlante italiano",
      ],
      notIncludes: ["Pranzi", "Bevande", "Mance", "Spese personali"],
      bestFor: "Chi ha poco tempo ma non vuole perdersi l'esperienza del Sahara",
      season: "Tutto l'anno (migliore: Mar-Mag, Set-Nov)",
    },
    {
      id: 2,
      title: "Classic Desert Adventure",
      subtitle: "Il tour del deserto più completo",
      duration: "3 giorni / 2 notti",
      price: "€320",
      originalPrice: "€380",
      image: "/images/classic-desert.png",
      difficulty: 2,
      rating: 4.9,
      reviews: 156,
      groupSize: "2-12 persone",
      highlights: [
        "Kasbah di Ait Benhaddou (UNESCO)",
        "Gole del Todra",
        "2 notti nel deserto",
        "Musica berbera attorno al fuoco",
        "Visita a famiglia nomade",
      ],
      itinerary: [
        {
          day: 1,
          title: "Marrakech → Ouarzazate",
          description: "Attraversamento dell'Atlante, visita Ait Benhaddou, pernottamento a Ouarzazate",
        },
        {
          day: 2,
          title: "Ouarzazate → Merzouga",
          description: "Gole del Todra, arrivo nel deserto, escursione in cammello, notte in campo",
        },
        {
          day: 3,
          title: "Merzouga → Fes",
          description: "Alba nel deserto, viaggio verso Fes attraverso la valle dello Ziz",
        },
      ],
      includes: [
        "Trasporto privato 4x4",
        "2 notti: 1 hotel + 1 campo berbero",
        "Mezza pensione (colazioni e cene)",
        "Escursione in cammello",
        "Guida esperta multilingue",
        "Ingressi monumenti principali",
      ],
      notIncludes: ["Pranzi", "Bevande alcoliche", "Assicurazione viaggio", "Voli"],
      bestFor: "Perfetto equilibrio tra avventura e comfort",
      season: "Tutto l'anno (evitare Luglio-Agosto per il caldo)",
    },
    {
      id: 3,
      title: "Grand Desert Journey",
      subtitle: "Immersione totale nel Sahara",
      duration: "4 giorni / 3 notti",
      price: "€480",
      originalPrice: "€560",
      image: "/images/grand-desert.png",
      difficulty: 3,
      rating: 4.8,
      reviews: 73,
      groupSize: "2-8 persone",
      highlights: [
        "3 notti nel deserto",
        "Trekking sulle dune",
        "Incontro con nomadi",
        "Sandboarding",
        "Osservazione stelle con telescopio",
      ],
      itinerary: [
        {
          day: 1,
          title: "Marrakech → Valle del Draa",
          description: "Kasbah Telouet, valle del Draa, pernottamento in kasbah tradizionale",
        },
        {
          day: 2,
          title: "Valle del Draa → Erg Chebbi",
          description: "Arrivo nel deserto, prima notte in campo fisso",
        },
        {
          day: 3,
          title: "Giornata nel deserto",
          description: "Trekking, sandboarding, visita nomadi, notte in campo mobile",
        },
        {
          day: 4,
          title: "Deserto → Marrakech",
          description: "Alba finale, rientro via Ouarzazate",
        },
      ],
      includes: [
        "Trasporto 4x4 premium",
        "3 notti: kasbah + 2 campi diversi",
        "Pensione completa",
        "Tutte le attività nel deserto",
        "Guida berbera esperta",
        "Telescopio per stelle",
        "Attrezzatura sandboarding",
      ],
      notIncludes: ["Bevande alcoliche", "Spese personali", "Assicurazione", "Equipaggiamento personale"],
      bestFor: "Avventurieri che vogliono vivere il deserto a 360°",
      season: "Mar-Mag, Set-Nov (temperature ideali)",
    },
    {
      id: 4,
      title: "Luxury Desert Experience",
      subtitle: "Il deserto con tutti i comfort",
      duration: "3 giorni / 2 notti",
      price: "€750",
      originalPrice: "€890",
      image: "/images/luxury-desert.png",
      difficulty: 1,
      rating: 5.0,
      reviews: 42,
      groupSize: "2-6 persone",
      highlights: [
        "Campo tendato 5 stelle",
        "Bagno privato in tenda",
        "Cena gourmet nel deserto",
        "Massaggio berbero",
        "Trasporto di lusso",
      ],
      itinerary: [
        {
          day: 1,
          title: "Marrakech → Deserto VIP",
          description: "Trasferimento in veicolo di lusso, arrivo al campo deluxe, aperitivo al tramonto",
        },
        {
          day: 2,
          title: "Giornata di relax nel deserto",
          description: "Escursioni opzionali, trattamenti spa, cena sotto le stelle",
        },
        {
          day: 3,
          title: "Deserto → Marrakech",
          description: "Colazione gourmet, rientro con soste panoramiche",
        },
      ],
      includes: [
        "Trasporto Mercedes/BMW",
        "Campo tendato luxury (bagno privato)",
        "Pensione completa gourmet",
        "Champagne di benvenuto",
        "Trattamento spa incluso",
        "Maggiordomo personale",
        "Fotografo professionale (su richiesta)",
      ],
      notIncludes: ["Voli internazionali", "Assicurazione premium", "Servizi extra spa"],
      bestFor: "Coppie in luna di miele, viaggi di lusso, occasioni speciali",
      season: "Tutto l'anno (clima controllato)",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative py-32 bg-gradient-to-r from-orange-600 via-red-500 to-orange-500 dark:from-orange-900 dark:via-red-900 dark:to-orange-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/sahara-sunset.png" alt="Sahara Desert" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <Link href="/viaggi/deserto" className="inline-flex items-center space-x-2 text-white/90 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Torna alla scelta deserto</span>
          </Link>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Tour del
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-200 bg-clip-text text-transparent">
              Sahara
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-8">
            Le leggendarie dune dorate di Erg Chebbi ti aspettano
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">550 km da Marrakech</span>
            </div>
            <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Dune di sabbia dorata</span>
            </div>
            <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Campi berberi autentici</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Tour Disponibili nel Sahara</h2>
            <p className="text-xl text-muted-foreground">
              Da 2 a 4 giorni di avventura autentica nelle dune
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {saharaTours.map((tour) => (
              <div
                key={tour.id}
                className="bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-border"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tour.image || "/placeholder.svg?height=256&width=500"}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Wishlist Button */}
                  <div className="absolute top-4 left-4 z-10">
                    <WishlistButton
                      itemId={`sahara-tour-${tour.id}`}
                      itemType="travel"
                      itemTitle={tour.title}
                      itemImage={tour.image}
                      itemPrice={parseInt(tour.price.replace('€', ''))}
                      itemDescription={tour.subtitle}
                    />
                  </div>
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 dark:bg-card/80 backdrop-blur-sm rounded-full px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-lg text-foreground">{tour.price}</span>
                      {tour.originalPrice && (
                        <span className="text-sm line-through text-muted-foreground">{tour.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm font-semibold">{tour.rating}</span>
                    <span className="text-white/70 text-sm">({tour.reviews})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{tour.title}</h3>
                    <p className="text-orange-600 dark:text-orange-400 font-medium mb-3">{tour.subtitle}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{tour.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{tour.groupSize}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Highlights principali:</h4>
                    <div className="space-y-2">
                      {tour.highlights.slice(0, 3).map((highlight, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{highlight}</span>
                        </div>
                      ))}
                      {tour.highlights.length > 3 && (
                        <div className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                          +{tour.highlights.length - 3} altre esperienze
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Best For */}
                  <div className="rounded-xl p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    <h4 className="font-semibold mb-2">Perfetto per:</h4>
                    <p className="text-sm">{tour.bestFor}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setSelectedTour(selectedTour === tour.id ? null : tour.id)}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-900 dark:to-red-900 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-center"
                    >
                      {selectedTour === tour.id ? "Nascondi Dettagli" : "Vedi Dettagli"}
                    </button>
                    <button
                      onClick={() => openBookingModal(tour)}
                      className="px-6 py-3 border-2 border-orange-500 text-orange-500 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 font-semibold"
                    >
                      Prenota
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {selectedTour === tour.id && (
                    <div className="mt-6 pt-6 border-t border-border space-y-6">
                      {/* Itinerary */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Itinerario:</h4>
                        <div className="space-y-4">
                          {tour.itinerary.map((day, idx) => (
                            <div key={idx} className="flex space-x-4">
                              <div className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                                {day.day}
                              </div>
                              <div>
                                <h5 className="font-semibold text-foreground">{day.title}</h5>
                                <p className="text-sm text-muted-foreground mt-1">{day.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Includes/Not Includes */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-green-600 mb-3">✓ Incluso:</h4>
                          <ul className="space-y-1">
                            {tour.includes.map((item, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground">• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-600 mb-3">✗ Non incluso:</h4>
                          <ul className="space-y-1">
                            {tour.notIncludes.map((item, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground">• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={closeBookingModal}
        itemId={`sahara-tour-${bookingModal.tour?.id || 0}`}
        itemType="travel"
        itemTitle={bookingModal.tour?.title || ""}
        basePrice={parseInt(bookingModal.tour?.price?.replace('€', '') || '0')}
        duration={bookingModal.tour?.duration || ""}
      />
    </div>
  )
}
