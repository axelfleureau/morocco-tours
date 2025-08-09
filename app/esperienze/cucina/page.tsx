"use client"

import { ChefHat, Utensils, Clock, Users, Star, Flame, Leaf, Heart } from 'lucide-react'
import Link from "next/link"
import { useState } from 'react'

export default function CucinaPage() {
  const cookingClasses = [
    {
      id: "tradizionale",
      name: "Cucina Tradizionale",
      title: "I Classici della Tradizione",
      description: "Impara a preparare i piatti iconici della cucina marocchina",
      image: "/images/cooking-class.png",
      duration: "4 ore",
      price: "€65",
      dishes: ["Tagine di pollo", "Couscous", "Pastilla", "Tè alla menta"],
      level: "Principiante",
      maxParticipants: 8,
      rating: 4.9,
      reviews: 234,
    },
    {
      id: "vegetariana",
      name: "Cucina Vegetariana",
      title: "Sapori Vegetali del Marocco",
      description: "Scopri la ricchezza della cucina vegetariana marocchina",
      image: "/images/vegetarian-cooking.png",
      duration: "3.5 ore",
      price: "€55",
      dishes: ["Tagine di verdure", "Couscous vegetariano", "Briouats", "Harira"],
      level: "Principiante",
      maxParticipants: 10,
      rating: 4.8,
      reviews: 156,
    },
    {
      id: "avanzata",
      name: "Cucina Avanzata",
      title: "Tecniche da Chef",
      description: "Perfeziona le tue abilità con tecniche avanzate",
      image: "/images/advanced-cooking.png",
      duration: "6 ore",
      price: "€120",
      dishes: ["Mechoui", "Pastilla complessa", "Dolci tradizionali", "Conserve"],
      level: "Avanzato",
      maxParticipants: 6,
      rating: 4.9,
      reviews: 89,
    },
  ]

  const dishes = [
    {
      name: "Tagine",
      description: "Stufato cotto lentamente nel caratteristico piatto conico",
      image: "/images/tagine-dish.png",
      difficulty: 2,
      cookingTime: "2 ore",
      ingredients: ["Carne o verdure", "Spezie", "Olive", "Limoni conservati"],
    },
    {
      name: "Couscous",
      description: "Il piatto nazionale del Marocco, servito il venerdì",
      image: "/images/couscous-dish.png",
      difficulty: 3,
      cookingTime: "3 ore",
      ingredients: ["Semola", "Verdure", "Carne", "Brodo speziato"],
    },
    {
      name: "Pastilla",
      description: "Torta salata con pasta fillo, piccione e mandorle",
      image: "/images/pastilla-dish.png",
      difficulty: 4,
      cookingTime: "4 ore",
      ingredients: ["Pasta fillo", "Piccione/pollo", "Mandorle", "Spezie dolci"],
    },
    {
      name: "Harira",
      description: "Zuppa tradizionale consumata durante il Ramadan",
      image: "/images/harira-soup.png",
      difficulty: 2,
      cookingTime: "1.5 ore",
      ingredients: ["Lenticchie", "Pomodori", "Carne", "Erbe fresche"],
    },
  ]

  const locations = [
    {
      id: "marrakech",
      name: "Marrakech",
      venues: [
        {
          name: "Riad Cooking School",
          type: "Riad tradizionale",
          rating: 4.9,
          price: "€65",
          image: "/images/riad-cooking.png",
          specialty: "Cucina familiare",
        },
        {
          name: "Souk Cooking Class",
          type: "Tour + Cucina",
          rating: 4.8,
          price: "€85",
          image: "/images/souk-cooking.png",
          specialty: "Mercato + Cucina",
        },
      ],
    },
    {
      id: "fes",
      name: "Fes",
      venues: [
        {
          name: "Medina Culinary",
          type: "Scuola tradizionale",
          rating: 4.7,
          price: "€60",
          image: "/images/medina-cooking.png",
          specialty: "Ricette antiche",
        },
      ],
    },
  ]

  const spices = [
    { name: "Ras el Hanout", description: "Miscela di 20+ spezie", color: "bg-orange-500" },
    { name: "Curcuma", description: "Colore dorato", color: "bg-yellow-500" },
    { name: "Cannella", description: "Dolce e aromatica", color: "bg-amber-600" },
    { name: "Zenzero", description: "Piccante e fresco", color: "bg-orange-400" },
    { name: "Cumino", description: "Terroso e intenso", color: "bg-amber-700" },
    { name: "Coriandolo", description: "Fresco e citrico", color: "bg-green-500" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-24 lg:py-32 bg-gradient-to-r from-orange-500 to-red-600 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/cooking-class.png" 
            alt="Cucina Marocchina" 
            className="w-full h-full object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Cucina
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-2 bg-gradient-to-r from-yellow-300 to-orange-200 bg-clip-text text-transparent">
              Marocchina
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8">
            Impara i segreti della cucina marocchina con chef locali esperti
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Chef Locali</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Ricette Autentiche</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">Ingredienti Freschi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cooking Classes */}
      <div className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Corsi di Cucina
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Scegli il corso perfetto per il tuo livello e i tuoi interessi culinari
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {cookingClasses.map((course, idx) => (
              <div
                key={course.id}
                className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg?height=400&width=600"}
                    alt={course.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="font-bold text-lg text-gray-900">{course.price}</span>
                  </div>

                  {/* Level Badge */}
                  <div className="absolute top-4 left-4 bg-orange-500 px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-semibold">{course.level}</span>
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-20 right-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-semibold">{course.rating}</span>
                    </div>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-200 text-sm lg:text-base">{course.description}</p>
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span>Max {course.maxParticipants}</span>
                    </div>
                  </div>

                  {/* Dishes */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Imparerai a cucinare:</h4>
                    <div className="space-y-2">
                      {course.dishes.map((dish, didx) => (
                        <div key={didx} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                          <ChefHat className="w-4 h-4 text-orange-500" />
                          <span>{dish}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <Link
                      href="/contatti"
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-center"
                    >
                      Prenota Corso
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Signature Dishes */}
      <div className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Piatti Iconici
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
              I capolavori della cucina marocchina che imparerai a preparare
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dishes.map((dish, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={dish.image || "/placeholder.svg?height=300&width=400"}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i < dish.difficulty ? "bg-orange-400" : "bg-white/50"}`}
                      />
                    ))}
                    <span className="text-white text-xs ml-2">Difficoltà</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{dish.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{dish.description}</p>

                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span>{dish.cookingTime}</span>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Ingredienti principali:</h4>
                    <div className="flex flex-wrap gap-1">
                      {dish.ingredients.map((ingredient, iidx) => (
                        <span
                          key={iidx}
                          className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-2 py-1 rounded-full text-xs"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spices Section */}
      <div className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Le Spezie del Marocco
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
              Scopri i segreti delle spezie che rendono unica la cucina marocchina
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spices.map((spice, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${spice.color} rounded-full flex items-center justify-center`}>
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{spice.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{spice.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Locations */}
      <div className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Dove Cucinare
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
              Le migliori scuole di cucina nelle città imperiali
            </p>
          </div>

          {locations.map((location, idx) => (
            <div key={location.id} className="mb-12 lg:mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">{location.name}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {location.venues.map((venue, vidx) => (
                  <div
                    key={vidx}
                    className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={venue.image || "/placeholder.svg?height=300&width=400"}
                        alt={venue.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="font-bold text-gray-900">{venue.price}</span>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white text-sm">{venue.type}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">{venue.name}</h4>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-semibold">{venue.rating}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        Specialità: {venue.specialty}
                      </p>

                      <Link
                        href="/contatti"
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-center block"
                      >
                        Prenota da {venue.name}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What You'll Learn */}
      <div className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Cosa Imparerai
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
              Molto più di semplici ricette: una vera immersione culturale
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ChefHat,
                title: "Tecniche Tradizionali",
                description: "Metodi di cottura tramandati da generazioni",
              },
              {
                icon: Utensils,
                title: "Uso delle Spezie",
                description: "Come bilanciare e combinare le spezie marocchine",
              },
              {
                icon: Flame,
                title: "Cottura nel Tagine",
                description: "Padroneggia l'arte della cottura lenta",
              },
              {
                icon: Heart,
                title: "Cultura Culinaria",
                description: "Storia e tradizioni dietro ogni piatto",
              },
            ].map((skill, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <skill.icon className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{skill.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 lg:py-24 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Pronto a Diventare uno Chef Marocchino?</h2>
          <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
            Unisciti ai nostri corsi di cucina e porta a casa i sapori autentici del Marocco
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contatti"
              className="bg-white text-orange-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg"
            >
              Prenota Corso
            </Link>
            <Link
              href="/contatti"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 font-semibold text-lg"
            >
              Informazioni
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
