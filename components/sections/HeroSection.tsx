"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { CountUp } from "@/components/ui/animated-text"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  const [currentStat, setCurrentStat] = useState(0)
  const heroRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 150])

  const stats = [
    { number: 500, suffix: "+", label: "Viaggiatori Soddisfatti" },
    { number: 15, suffix: "+", label: "Destinazioni Uniche" },
    { number: 10, suffix: "", label: "Anni di Esperienza" },
    { number: 24, suffix: "/7", label: "Assistenza Locale" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [stats.length])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      data-slot="hero-section"
    >
      {/* Video Background with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: videoY }}
      >
        <video autoPlay muted loop playsInline className="w-full h-full object-cover scale-110" poster="/images/hero-sahara.png">
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SONY%20ZV-E1%20_%20CINEMATIC%20TRAVEL%20FILM-W9rM8cs9a7erwhqFuKfHDhC6I2Munn.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Hero Content with Entrance Animations */}
      <motion.div 
        className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance drop-shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="text-white drop-shadow-2xl">
            Scopri la Magia del
          </span>
          <span
            className="block font-extrabold drop-shadow-2xl"
            style={{
              background: "linear-gradient(to right, #f97316, #dc2626, #f97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Marocco Autentico
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl mb-8 text-white max-w-3xl mx-auto text-pretty leading-relaxed drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Viaggi su misura nel regno delle mille e una notte
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild variant="cta" size="default" className="text-sm sm:text-base min-h-[44px] shadow-lg">
              <Link href="/viaggi/su-misura">Pianifica il Tuo Viaggio</Link>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              size="default"
              className="text-sm sm:text-base min-h-[44px] backdrop-blur-md bg-white/90 border-2 border-white text-black hover:bg-white hover:text-black shadow-lg hover:border-white transition-all duration-300"
            >
              <Link href="/viaggi/gruppo">Scopri le Offerte</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Statistics with Stagger Animation and CountUp */}
        <StaggerContainer 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto"
          staggerDelay={0.1}
          delayChildren={0.5}
        >
          {stats.map((stat, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                className={`text-center transition-all duration-500 p-2 ${
                  idx === currentStat ? "scale-110 opacity-100" : "scale-100 opacity-90"
                }`}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              >
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-orange-400 mb-2 drop-shadow-lg">
                  <CountUp 
                    end={stat.number} 
                    duration={2} 
                    suffix={stat.suffix}
                  />
                </div>
                <div className="text-xs sm:text-sm text-white leading-tight drop-shadow-md">{stat.label}</div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </motion.div>

      {/* Scroll Indicator with Animation */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <span className="text-white/70 text-sm font-medium drop-shadow-md">
          Scorri per scoprire
        </span>
        <motion.div
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChevronDown className="w-6 h-6 text-white/80 drop-shadow-lg" />
        </motion.div>
      </motion.div>
    </section>
  )
}
