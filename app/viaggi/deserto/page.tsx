"use client"

import { useState } from "react"
import { Star, Clock, Users, CheckCircle } from "lucide-react"
import Link from "next/link"
import BookingModal from "@/components/modals/BookingModal"
import WishlistButton from "@/components/WishlistButton"

export default function DesertToursPage() {
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

  const desertTours = [
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
          description:
            "Partenza mattutina, esplorazione del deserto di Agafay, pranzo tradizionale, attività opzionali, rientro al tramonto",
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
      title: "Deserto di Agafay con Notte in Tenda - Normale",
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
        "Notte in campo tendato normale",
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
        "1 notte in tenda normale (letti condivisi o privati)",
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
          description:
            "Partenza mattutina, attraversamento dell'Atlante, arrivo al tramonto per l'escursione in cammello",
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

  const packingList = [
    "Scarpe comode chiuse (no sandali)",
    "Abbigliamento a strati",
    "Giacca per la sera (temperature fresche)",
    "Cappello e occhiali da sole",
    "Crema solare alta protezione",
    "Foulard per proteggere dal vento",
    "Torcia/frontalino",
    "Borraccia",
    "Macchina fotografica",
    "Powerbank per dispositivi",
  ];

  const weatherInfo = [
    {
      season: "Primavera (Mar-Mag)",
      description: "Periodo ideale - giornate calde (25-30°C), notti fresche (10-15°C)",
      icon: "🌸",
    },
    {
      season: "Estate (Giu-Ago)",
      description: "Molto caldo di giorno (40-45°C), notti piacevoli (20-25°C)",
      icon: "☀️",
    },
    {
      season: "Autunno (Set-Nov)",
      description: "Ottimo periodo - temperature miti, cieli limpidi",
      icon: "🍂",
    },
    {
      season: "Inverno (Dic-Feb)",
      description: "Giornate miti (20-25°C), notti fredde (0-5°C), possibili gelate",
      icon: "❄️",
    },
  ];

  // ...il resto della tua funzione rimane identico, puoi riprendere dal return(...)


  // ... desertTours, packingList, weatherInfo come da te

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative py-32 bg-gradient-to-r from-orange-600 via-red-500 to-orange-500 dark:from-orange-900 dark:via-red-900 dark:to-orange-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/sahara-sunset.png" alt="Sahara Desert" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Tour del
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-200 bg-clip-text text-transparent">
              Deserto
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Emozioni nei Deserti: dalle dune dorate alle notti stellate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Partenze Giornaliere</span>
            </div>
            <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Guide Berbere Esperte</span>
            </div>
            <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Campi Autentici</span>
            </div>
          </div>
        </div>
      </div>

      {/* What to Expect Section */}
      <div className="py-20 bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Cosa Aspettarsi</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Un viaggio attraverso le tappe tipiche di un'avventura nel Sahara
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🏔️",
                title: "Attraversamento dell'Atlante",
                description: "Paesaggi mozzafiato sui passi montani verso il deserto",
              },
              {
                icon: "🏰",
                title: "Kasbah e Villaggi",
                description: "Antiche fortezze e borghi berberi lungo la strada",
              },
              {
                icon: "🐪",
                title: "Escursione in Cammello",
                description: "Il modo tradizionale per raggiungere il campo nel deserto",
              },
              {
                icon: "⭐",
                title: "Notte sotto le Stelle",
                description: "Cielo stellato impareggiabile lontano dalle luci della città",
              },
            ].map((step, idx) => (
              <div key={idx} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-900 dark:to-red-900 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto group-hover:shadow-xl transition-shadow duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="py-20 bg-muted transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">I Nostri Tour del Deserto</h2>
            <p className="text-xl text-muted-foreground">
              Scegli l'avventura perfetta per te, da 2 a 4 giorni di pura magia
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {desertTours.map((tour) => (
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
                      itemId={`desert-tour-${tour.id}`}
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
                  {/* Difficulty */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${i < tour.difficulty ? "bg-orange-400" : "bg-white/50 dark:bg-card/50"}`}
                        />
                      ))}
                    </div>
                    <span className="text-white text-xs font-medium bg-black/30 px-2 py-1 rounded-full">
                      Difficoltà
                    </span>
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
                  {/* Header */}
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
                  <div className="rounded-xl p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white dark:bg-orange-900/20 dark:text-orange-200 transition-colors">
  <h4 className="font-semibold mb-2 text-white dark:text-orange-300">Perfetto per:</h4>
  <p className="text-sm text-white dark:text-orange-300">{tour.bestFor}</p>
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
                      Prenota Ora
                    </button>
                  </div>
                  {/* Expanded Details */}
                  {selectedTour === tour.id && (
                    <div className="mt-6 pt-6 border-t border-border space-y-6">
                      {/* Itinerary */}
                      <div>
                        <h4 className="font-bold text-foreground mb-4">Itinerario dettagliato:</h4>
                        <div className="space-y-4">
                          {tour.itinerary.map((day, idx) => (
                            <div key={idx} className="flex space-x-4">
                              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
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
                      {/* Includes/Excludes */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-green-600 mb-3">✅ Cosa include:</h4>
                          <ul className="space-y-1">
                            {tour.includes.map((item, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground">
                                • {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-red-600 mb-3">❌ Cosa non include:</h4>
                          <ul className="space-y-1">
                            {tour.notIncludes.map((item, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground">
                                • {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {/* Season Info */}
                      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
                        <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">Stagione consigliata:</h4>
                        <p className="text-sm text-orange-700 dark:text-orange-300">{tour.season}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weather & Seasons */}
      <div className="py-20 bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Meteo e Stagioni</h2>
            <p className="text-xl text-muted-foreground">
              Scegli il periodo migliore per la tua avventura nel deserto
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {weatherInfo.map((season, idx) => (
              <div
                key={idx}
                className="bg-muted rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{season.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-3">{season.season}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{season.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
            {/* Packing List */}
      <div className="py-20 bg-gradient-to-r from-orange-50 to-red-50 dark:from-background dark:to-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Cosa Portare</h2>
            <p className="text-xl text-muted-foreground">Lista essenziale per il tuo viaggio nel Sahara</p>
          </div>
          <div className="bg-card rounded-3xl p-8 shadow-xl transition-colors">
            <div className="grid md:grid-cols-2 gap-6">
              {packingList.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white dark:bg-orange-900/30 dark:text-orange-200 transition-colors">
  <p className="text-sm text-white dark:text-orange-200">
    <strong>Nota importante:</strong> Le temperature nel deserto variano molto tra giorno e notte. Porta
    sempre abbigliamento a strati e una giacca calda per la sera!
  </p>
</div>
          </div>
        </div>
      </div>

      {/* Gallery Preview */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Life in the Desert</h2>
            <p className="text-xl text-muted-foreground">Scorci di vita e momenti magici nel Sahara</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { image: "/images/desert-stars.png", title: "Notti stellate", description: "Cielo impareggiabile" },
              { image: "/images/desert-fire.png", title: "Musica berbera", description: "Attorno al fuoco" },
              { image: "/images/desert-sunrise.png", title: "Alba sulle dune", description: "Spettacolo naturale" },
              { image: "/images/desert-tea.png", title: "Tè nel deserto", description: "Tradizione locale" },
              { image: "/images/desert-sandboarding.png", title: "Sandboarding", description: "Surf sulle dune" },
              { image: "/images/desert-nomads.png", title: "Incontri autentici", description: "Famiglie nomadi" },
            ].map((item, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl aspect-square">
                <img
                  src={item.image || "/placeholder.svg?height=300&width=300"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white drop-shadow">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-200">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-900 dark:to-red-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Pronto per l'Avventura?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Il deserto ti aspetta. Scegli il tuo tour e vivi un'esperienza che ricorderai per sempre.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/viaggi/gruppo"
              className="bg-white dark:bg-card text-orange-600 dark:text-orange-300 px-8 py-4 rounded-xl hover:bg-gray-100 dark:hover:bg-background transition-all duration-300 font-semibold text-lg"
            >
              Vedi Tutti i Tour
            </Link>
            <Link
              href="/viaggi/su-misura"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 font-semibold text-lg"
            >
              Crea Tour Personalizzato
            </Link>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingModal.isOpen && bookingModal.tour && (
        <BookingModal
          isOpen={bookingModal.isOpen}
          onClose={closeBookingModal}
          itemId={bookingModal.tour.id.toString()}
          itemType="travel"
          itemTitle={bookingModal.tour.title}
          basePrice={parseInt(bookingModal.tour.price.replace('€', ''))}
          duration={bookingModal.tour.duration}
        />
      )}
    </div>
  )
}
