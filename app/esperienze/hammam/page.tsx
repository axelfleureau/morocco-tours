"use client"

import { useState } from "react"
import { Droplets, Heart, Sparkles, Clock, Star, Thermometer, Leaf } from "lucide-react"
import Link from "next/link"
import BookingModal from "@/components/modals/BookingModal"

export default function HammamPage() {
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    hammam: any;
  }>({ isOpen: false, hammam: null });

  const openBookingModal = (hammam: any) => {
    setBookingModal({ isOpen: true, hammam });
  };

  const closeBookingModal = () => {
    setBookingModal({ isOpen: false, hammam: null });
  };
  const hammamTypes = [
    {
      id: "tradizionale",
      name: "Hammam Tradizionale",
      title: "Autentica Esperienza Berbera",
      description: "Rituale completo secondo le antiche tradizioni marocchine",
      image: "/images/traditional-hammam.jpg",
      duration: "2-3 ore",
      price: "€45",
      includes: [
        "Bagno turco",
        "Scrub con sapone nero",
        "Massaggio con guanto",
        "Maschera all'argilla",
        "Tè alla menta",
      ],
      benefits: ["Purificazione profonda", "Esfoliazione naturale", "Rilassamento totale", "Pelle morbida"],
      rating: 4.9,
      reviews: 234,
    },
    {
      id: "lusso",
      name: "Hammam di Lusso",
      title: "Spa Experience Premium",
      description: "Trattamento esclusivo in ambiente raffinato con prodotti premium",
      image: "/images/luxury-hammam.jpg",
      duration: "3-4 ore",
      price: "€120",
      includes: ["Hammam privato", "Massaggio argan", "Trattamenti viso", "Prodotti biologici", "Refreshment gourmet"],
      benefits: ["Esperienza privata", "Prodotti premium", "Servizio personalizzato", "Ambiente esclusivo"],
      rating: 4.8,
      reviews: 156,
    },
    {
      id: "coppia",
      name: "Hammam di Coppia",
      title: "Relax Romantico",
      description: "Esperienza intima per due persone in ambiente riservato",
      image: "/images/couple-hammam.jpg",
      duration: "2.5 ore",
      price: "€180",
      includes: ["Hammam privato coppia", "Massaggio di coppia", "Champagne", "Petali di rosa", "Atmosfera romantica"],
      benefits: ["Momento intimo", "Esperienza condivisa", "Atmosfera romantica", "Privacy totale"],
      rating: 4.9,
      reviews: 89,
    },
  ]

  const ritualSteps = [
    {
      step: 1,
      title: "Preparazione",
      description: "Accoglienza con tè alla menta e preparazione del corpo",
      icon: Heart,
      duration: "15 min",
    },
    {
      step: 2,
      title: "Bagno Turco",
      description: "Rilassamento nel vapore caldo per aprire i pori",
      icon: Droplets,
      duration: "20 min",
    },
    {
      step: 3,
      title: "Scrub con Sapone Nero",
      description: "Applicazione del sapone nero tradizionale",
      icon: Sparkles,
      duration: "15 min",
    },
    {
      step: 4,
      title: "Esfoliazione",
      description: "Massaggio vigoroso con guanto per rimuovere le cellule morte",
      icon: Thermometer,
      duration: "30 min",
    },
    {
      step: 5,
      title: "Risciacquo",
      description: "Pulizia completa con acqua tiepida",
      icon: Droplets,
      duration: "10 min",
    },
    {
      step: 6,
      title: "Massaggio Finale",
      description: "Massaggio rilassante con olio di argan",
      icon: Leaf,
      duration: "30 min",
    },
  ]

  const locations = [
    {
      id: "marrakech",
      name: "Marrakech",
      venues: [
        {
          name: "Hammam de la Rose",
          type: "Tradizionale",
          rating: 4.9,
          price: "€45",
          image: "/images/hammam-rose.jpg",
        },
        {
          name: "La Mamounia Spa",
          type: "Lusso",
          rating: 4.8,
          price: "€150",
          image: "/images/mamounia-spa.jpg",
        },
      ],
    },
    {
      id: "fes",
      name: "Fes",
      venues: [
        {
          name: "Hammam Mouassine",
          type: "Autentico",
          rating: 4.7,
          price: "€35",
          image: "/images/hammam-mouassine.jpg",
        },
        {
          name: "Riad Fes Spa",
          type: "Boutique",
          rating: 4.6,
          price: "€80",
          image: "/images/riad-fes-spa.jpg",
        },
      ],
    },
    {
      id: "essaouira",
      name: "Essaouira",
      venues: [
        {
          name: "Hammam Lalla Mira",
          type: "Vista mare",
          rating: 4.8,
          price: "€55",
          image: "/images/hammam-lalla-mira.jpg",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative py-24 lg:py-32 bg-gradient-to-r from-pink-500 to-purple-600 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/traditional-hammam.jpg"
            alt="Hammam Tradizionale"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Hammam
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-2 bg-gradient-to-r from-pink-300 to-purple-200 bg-clip-text text-transparent">
              Tradizionale
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8">
            Purificazione del corpo e dell'anima secondo le antiche tradizioni marocchine
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Rituale Autentico</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Prodotti Naturali</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Relax Totale</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hammam Types */}
      <div className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Tipi di Hammam</h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Scegli l'esperienza perfetta per le tue esigenze di benessere
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {hammamTypes.map((hammam, idx) => (
              <div
                key={hammam.id}
                className="group bg-card border border-border rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <img
                    src={hammam.image || "/placeholder.svg?height=400&width=600"}
                    alt={hammam.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
                    <span className="font-bold text-lg text-foreground">{hammam.price}</span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-semibold">{hammam.rating}</span>
                      <span className="text-white/70 text-sm">({hammam.reviews})</span>
                    </div>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-2">{hammam.title}</h3>
                    <p className="text-gray-200 text-sm lg:text-base">{hammam.description}</p>
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  {/* Duration */}
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
                    <Clock className="w-4 h-4 text-pink-500" />
                    <span>{hammam.duration}</span>
                  </div>

                  {/* Includes */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-card-foreground mb-3">Include:</h4>
                    <div className="space-y-2">
                      {hammam.includes.map((item, iidx) => (
                        <div key={iidx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-pink-500 rounded-full" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-card-foreground mb-3">Benefici:</h4>
                    <div className="flex flex-wrap gap-2">
                      {hammam.benefits.map((benefit, bidx) => (
                        <span
                          key={bidx}
                          className="bg-gray-800 dark:bg-gray-700 text-pink-300 dark:text-pink-300 px-3 py-1 rounded-full text-xs font-medium border border-gray-600"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <button
                      onClick={() => openBookingModal(hammam)}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-4 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-semibold text-center"
                    >
                      Prenota Ora
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ritual Steps */}
      <div className="py-16 lg:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Il Rituale del Hammam</h2>
            <p className="text-lg lg:text-xl text-muted-foreground">
              Un viaggio di purificazione in 6 passi tradizionali
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ritualSteps.map((step, idx) => (
              <div
                key={step.step}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-card-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{step.description}</p>
                <div className="flex items-center justify-center space-x-2 text-sm text-pink-600 dark:text-pink-400">
                  <Clock className="w-4 h-4" />
                  <span>{step.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Locations */}
      <div className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Dove Vivere l'Esperienza</h2>
            <p className="text-lg lg:text-xl text-muted-foreground">
              I migliori hammam nelle città imperiali del Marocco
            </p>
          </div>

          {locations.map((location, idx) => (
            <div key={location.id} className="mb-12 lg:mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">{location.name}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {location.venues.map((venue, vidx) => (
                  <div
                    key={vidx}
                    className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={venue.image || "/placeholder.svg?height=300&width=400"}
                        alt={venue.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full border border-border">
                        <span className="font-bold text-foreground">{venue.price}</span>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white text-sm">{venue.type}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-bold text-card-foreground">{venue.name}</h4>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-semibold">{venue.rating}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => openBookingModal({
                          id: `${location.id}-${venue.name.toLowerCase().replace(/\s+/g, '-')}`,
                          name: `${venue.name} - ${location.name}`,
                          price: venue.price,
                          duration: venue.duration || '2-3 ore',
                          type: venue.type,
                          rating: venue.rating
                        })}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-4 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-semibold text-center block"
                      >
                        Prenota {venue.name}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 lg:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Benefici del Hammam</h2>
            <p className="text-lg lg:text-xl text-muted-foreground">
              Più di un semplice bagno: un rituale di benessere completo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Droplets,
                title: "Purificazione",
                description: "Eliminazione delle tossine attraverso il vapore e la sudorazione",
              },
              {
                icon: Sparkles,
                title: "Esfoliazione",
                description: "Rimozione delle cellule morte per una pelle morbida e luminosa",
              },
              {
                icon: Heart,
                title: "Rilassamento",
                description: "Riduzione dello stress e tensioni muscolari",
              },
              {
                icon: Leaf,
                title: "Idratazione",
                description: "Nutrimento profondo con oli naturali di argan",
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-lg font-bold text-card-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 lg:py-24 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Pronto per il Relax Totale?</h2>
          <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
            Concediti un momento di puro benessere con l'autentico hammam marocchino
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openBookingModal(hammamTypes[0])} 
              className="bg-white text-pink-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg"
            >
              Prenota Hammam
            </button>
            <Link
              href="/contatti"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-pink-600 transition-all duration-300 font-semibold text-lg"
            >
              Informazioni
            </Link>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingModal.isOpen && bookingModal.hammam && (
        <BookingModal
          isOpen={bookingModal.isOpen}
          onClose={closeBookingModal}
          itemId={bookingModal.hammam.id}
          itemType="experience"
          itemTitle={bookingModal.hammam.name}
          basePrice={parseInt(bookingModal.hammam.price.replace('€', ''))}
          duration={bookingModal.hammam.duration}
        />
      )}
    </div>
  )
}
