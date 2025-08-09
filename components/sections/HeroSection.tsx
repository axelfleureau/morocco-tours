"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function HeroSection() {
  const [currentStat, setCurrentStat] = useState(0)

  const stats = [
    { number: "500+", label: "Viaggiatori Soddisfatti" },
    { number: "15+", label: "Destinazioni Uniche" },
    { number: "10", label: "Anni di Esperienza" },
    { number: "24/7", label: "Assistenza Locale" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [stats.length])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover" poster="/images/hero-sahara.png">
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SONY%20ZV-E1%20_%20CINEMATIC%20TRAVEL%20FILM-W9rM8cs9a7erwhqFuKfHDhC6I2Munn.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Scopri la Magia del
          <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-orange-500 bg-clip-text text-transparent">
            Marocco Autentico
          </span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
          Viaggi su misura nel regno delle mille e una notte
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/viaggi/su-misura"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 font-semibold text-base sm:text-lg"
          >
            Pianifica il Tuo Viaggio
          </Link>
          <Link
            href="/viaggi/gruppo"
            className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105 font-semibold text-base sm:text-lg backdrop-blur-sm"
          >
            Scopri le Offerte
          </Link>
        </div>

        {/* Statistics - Mobile Optimized */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`text-center transition-all duration-500 ${
                idx === currentStat ? "scale-110 opacity-100" : "scale-100 opacity-80"
              }`}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-400 mb-2">{stat.number}</div>
              <div className="text-xs sm:text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  )
}
