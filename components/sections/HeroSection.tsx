"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      data-slot="hero-section"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover" poster="/images/hero-sahara.png">
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SONY%20ZV-E1%20_%20CINEMATIC%20TRAVEL%20FILM-W9rM8cs9a7erwhqFuKfHDhC6I2Munn.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance drop-shadow-2xl">
          <span className="text-white drop-shadow-2xl">Scopri la Magia del</span>
          <span
            className="block font-extrabold drop-shadow-2xl"
            style={{
              background: "linear-gradient(to right, #f97316, #dc2626, #f97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "#f97316", // Fallback color
            }}
          >
            Marocco Autentico
          </span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white max-w-3xl mx-auto text-pretty leading-relaxed drop-shadow-lg">
          Viaggi su misura nel regno delle mille e una notte
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild variant="cta" size="lg" className="text-base sm:text-lg min-h-[56px] shadow-xl">
            <Link href="/viaggi/su-misura">Pianifica il Tuo Viaggio</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="text-base sm:text-lg min-h-[56px] backdrop-blur-md bg-white/90 border-2 border-white text-black hover:bg-white hover:text-black shadow-xl hover:border-white transition-all duration-300"
          >
            <Link href="/viaggi/gruppo">Scopri le Offerte</Link>
          </Button>
        </div>

        {/* Statistics - Mobile Optimized */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`text-center transition-all duration-500 p-2 ${
                idx === currentStat ? "scale-110 opacity-100" : "scale-100 opacity-90"
              }`}
            >
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-orange-400 mb-2 drop-shadow-lg">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-white leading-tight drop-shadow-md">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"></div>
    </section>
  )
}
