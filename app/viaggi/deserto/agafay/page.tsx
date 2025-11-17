"use client"

import { useState } from "react"
import { Star, Clock, Users, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import BookingModal from "@/components/modals/BookingModal"
import WishlistButton from "@/components/WishlistButton"

export default function AgafayToursPage() {
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

  const agafayTours = [
    {
      id: 0,
      title: "Deserto di Agafay - Giornata",
      subtitle: "Fuga dal caos cittadino a 40 minuti da Marrakech",
      duration: "1 giorno (8 ore)",
      price: "€50",
      originalPrice: "",
      image: "/images/agafay-desert.png",
      difficulty: 1,
      rating: 4.6,
      reviews: 124,
      groupSize: "2-15 persone",
      highlights: [
        "Deserto roccioso di Agafay",
        "Pranzo berbero incluso",
        "Quad o cammelli (opzionale)",
        "Vista sull'Atlante",
        "Trasporto da/per Marrakech",
      ],
      itinerary: [
        {
          day: 1,
          title: "Marrakech → Agafay → Marrakech",
          description: "Partenza mattutina, esplorazione del deserto di Agafay, pranzo tradizionale, attività opzionali, rientro al tramonto",
        },
      ],
      includes: [
        "Trasporto in minivan/4x4",
        "Pranzo berbero tradizionale",
        "Guida parlante italiano",
        "Tè alla menta",
      ],
      notIncludes: ["Quad/cammelli (opzionali)", "Bevande extra", "Mance"],
      bestFor: "Chi ha poco tempo o vuole un assaggio del deserto vicino a Marrakech",
      season: "Tutto l'anno",
    },
    {
      id: -1,
      title: "Deserto di Agafay con Notte in Tenda - Standard",
      subtitle: "Esperienza autentica nel deserto roccioso",
      duration: "1 giorno / 1 notte",
      price: "€76",
      originalPrice: "",
      image: "/images/agafay-night.png",
      difficulty: 1,
      rating: 4.7,
      reviews: 98,
      groupSize: "2-12 persone",
      highlights: [
        "Notte in campo tendato standard",
        "Tramonto e alba nel deserto",
        "Cena e colazione berbere",
        "Musica tradizionale attorno al fuoco",
        "Vista spettacolare sull'Atlante",
      ],
      itinerary: [
        {
          day: 1,
          title: "Marrakech → Agafay",
          description: "Partenza pomeridiana, arrivo al campo, tè di benvenuto, tramonto, cena tradizionale, musica",
        },
        {
          day: 2,
          title: "Alba → Marrakech",
          description: "Sveglia per l'alba, colazione, rientro a Marrakech",
        },
      ],
      includes: [
        "Trasporto in minivan",
        "1 notte in tenda standard (letti condivisi o privati)",
        "Cena e colazione berbere",
        "Tè alla menta e dolcetti",
        "Musica live",
      ],
      notIncludes: ["Pranzi", "Bevande alcoliche", "Attività extra"],
      bestFor: "Budget-conscious travelers che vogliono vivere il deserto",
      season: "Tutto l'anno",
    },
    {
      id: -2,
      title: "Deserto di Agafay con Notte in Tenda - Luxury",
      subtitle: "Glamping esclusivo con vista sull'Atlante",
      duration: "1 giorno / 1 notte",
      price: "€230",
      originalPrice: "",
      image: "/images/agafay-luxury.png",
      difficulty: 1,
      rating: 4.9,
      reviews: 67,
      groupSize: "2-8 persone",
      highlights: [
        "Tenda luxury con bagno privato",
        "Cena gourmet sotto le stelle",
        "Piscina panoramica (alcuni campi)",
        "Servizio premium",
        "Spa e massaggi (opzionali)",
      ],
      itinerary: [
        {
          day: 1,
          title: "Marrakech → Agafay Luxury",
          description: "Transfer privato, check-in luxury camp, aperitivo panoramico, cena gourmet, intrattenimento",
        },
        {
          day: 2,
          title: "Relax → Marrakech",
          description: "Colazione gourmet, tempo libero, rientro con soste panoramiche",
        },
      ],
      includes: [
        "Trasporto premium",
        "Tenda luxury con bagno en-suite",
        "Cena e colazione gourmet",
        "Champagne di benvenuto",
        "Servizio maggiordomo",
        "Wi-Fi nel campo",
      ],
      notIncludes: ["Trattamenti spa", "Bevande premium", "Trasferimenti extra"],
      bestFor: "Coppie romantiche, luna di miele, viaggi di lusso",
      season: "Tutto l'anno",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative py-32 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-500 dark:from-amber-900 dark:via-yellow-900 dark:to-amber-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/agafay-desert.png" alt="Agafay Desert" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <Link href="/viaggi/deserto" className="inline-flex items-center space-x-2 text-white/90 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Torna alla scelta deserto</span>
          </Link>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Tour del Deserto di
            <span className="block bg-gradient-to-r from-yellow-300 to-amber-200 bg-clip-text text-transparent">
              Agafay
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-8">
            Il deserto roccioso a 40 minuti da Marrakech con vista sull'Atlante
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">40 km da Marrakech</span>
            </div>
            <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Paesaggio lunare</span>
            </div>
            <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Glamping di lusso</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Tour Disponibili ad Agafay</h2>
            <p className="text-xl text-muted-foreground">
              Da escursioni giornaliere a notti in campi luxury
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {agafayTours.map((tour) => (
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
                      itemId={`agafay-tour-${tour.id}`}
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
                    <h3 className="text-xl font-bold text-foreground mb-2">{tour.title}</h3>
                    <p className="text-amber-600 dark:text-amber-400 font-medium mb-3">{tour.subtitle}</p>
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
                        <div className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                          +{tour.highlights.length - 3} altre esperienze
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Best For */}
                  <div className="rounded-xl p-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white">
                    <h4 className="font-semibold mb-2">Perfetto per:</h4>
                    <p className="text-sm">{tour.bestFor}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setSelectedTour(selectedTour === tour.id ? null : tour.id)}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 dark:from-amber-900 dark:to-yellow-900 text-white py-3 px-4 rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 font-semibold text-center"
                    >
                      {selectedTour === tour.id ? "Nascondi" : "Vedi Dettagli"}
                    </button>
                    <button
                      onClick={() => openBookingModal(tour)}
                      className="px-6 py-3 border-2 border-amber-500 text-amber-500 rounded-xl hover:bg-amber-500 hover:text-white transition-all duration-300 font-semibold"
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
                              <div className="flex-shrink-0 w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold">
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
        itemId={`agafay-tour-${bookingModal.tour?.id || 0}`}
        itemType="travel"
        itemTitle={bookingModal.tour?.title || ""}
        basePrice={parseInt(bookingModal.tour?.price?.replace('€', '') || '0')}
        duration={bookingModal.tour?.duration || ""}
      />
    </div>
  )
}
