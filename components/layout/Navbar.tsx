"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, Search, Sun, Moon, ChevronDown, MapPin, Users, X, Camera, LogOut, User, Settings, Mail } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"

interface NavbarProps {
  onSearchOpen: () => void
}

export default function Navbar({ onSearchOpen }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [theme, setThemeState] = useState<"light" | "dark">("light")
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef(null)
  const pathname = usePathname()
  const router = useRouter()
  const { user, userProfile, loading, isAdmin, signOut } = useAuth()

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20)
  })

  useEffect(() => {
    setMounted(true)
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setThemeState(isDark ? "dark" : "light")

    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !(navRef.current as HTMLElement).contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navItems = [
    { name: "Chi Siamo", href: "/about", icon: Users },
    {
      name: "Viaggi",
      href: "/viaggi",
      icon: MapPin,
      dropdown: [
        { name: "Viaggi di Gruppo", href: "/viaggi/gruppo", description: "Tour organizzati con altri viaggiatori" },
        { name: "Viaggi su Misura", href: "/viaggi/su-misura", description: "Itinerari personalizzati per te" },
        { name: "Tour del Deserto", href: "/viaggi/deserto", description: "Avventure nel Sahara" },
        { name: "Città Imperiali", href: "/viaggi/citta-imperiali", description: "Marrakech, Fes, Meknes, Rabat" },
        { name: "Costa Atlantica", href: "/viaggi/costa-atlantica", description: "Essaouira, Agadir e spiagge" },
        { name: "Montagne Atlas", href: "/viaggi/montagne-atlas", description: "Trekking e natura" },
      ],
    },
    {
      name: "Esperienze",
      href: "/esperienze",
      icon: Camera,
      dropdown: [
        { name: "Hammam & Spa", href: "/esperienze/hammam", description: "Benessere tradizionale marocchino" },
        { name: "Cucina Marocchina", href: "/esperienze/cucina", description: "Corsi di cucina autentica" },
        { name: "Trekking Atlante", href: "/esperienze/trekking", description: "Escursioni in montagna" },
        { name: "Surf", href: "/esperienze/surf", description: "Onde perfette sulla costa" },
        { name: "Artigianato", href: "/esperienze/artigianato", description: "Laboratori con maestri artigiani" },
        { name: "Fotografia", href: "/esperienze/fotografia", description: "Workshop fotografici guidati" },
        { name: "Quad e Cammelli", href: "/esperienze/quad-cammelli", description: "Avventure nel deserto" },
      ],
    },
    {
      name: "Servizi",
      href: "/servizi",
      icon: Users,
      dropdown: [
        { name: "Trasferimenti", href: "/servizi/trasferimenti", description: "Aeroporto e città" },
        { name: "Guide Private", href: "/servizi/guide-private", description: "Guide esperte locali" },
        { name: "Noleggio Auto", href: "/servizi/noleggio-auto", description: "Veicoli per ogni esigenza" },
        { name: "Assicurazioni", href: "/servizi/assicurazioni", description: "Protezione completa" },
      ],
    },
    { name: "Blog", href: "/blog", icon: Camera },
    { name: "Contatti", href: "/contatti", icon: Mail },
  ]

  const isActiveRoute = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setThemeState(newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const getLogoSrc = () => {
    if (!mounted) return "/placeholder.svg"

    if (isMobile) {
      return theme === "dark"
        ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MaroccoDreams_compatto_white-esK9LQBcJ2mGaingRuRkl4XWJp4pBb.png"
        : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MaroccoDreams_compatto_gold-w40Hd0YYDmtt31HRTxAfD1SMob4Y2k.png"
    }
    if (isTablet) {
      return theme === "dark"
        ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MaroccoDreams_compatto_white-esK9LQBcJ2mGaingRuRkl4XWJp4pBb.png"
        : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MaroccoDreams_compatto_gold-w40Hd0YYDmtt31HRTxAfD1SMob4Y2k.png"
    }
    return theme === "dark"
      ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MaroccoDreams_orrizontale_white-IKSXx80rwYXglT1fPiH0ZffcA8ByqK.png"
      : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MaroccoDreams_orrizontale_gold-1yU66LDNR61slC5F2AzysFae8BkwQF.png"
  }

  const getLogoSize = () => {
    if (isMobile) return { width: 96, height: 42 }
    if (isTablet) return { width: 120, height: 54 }
    return { width: 168, height: 60 }
  }

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24
      }
    }
  }

  const mobileMenuVariants = {
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  }

  const mobileItemVariants = {
    closed: { x: 50, opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24
      }
    }
  }

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  }

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15
      }
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <motion.nav
      ref={navRef}
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${isScrolled 
          ? "bg-background/95 backdrop-blur-xl shadow-lg border-b border-border" 
          : "bg-background/60 backdrop-blur-md border-b border-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-17">
          <motion.div variants={navItemVariants}>
            <Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="relative"
              >
                <Image
                  src={getLogoSrc() || "/placeholder.svg"}
                  alt="Morocco Dreams - Viaggi in Marocco"
                  width={getLogoSize().width}
                  height={getLogoSize().height}
                  className="h-auto w-auto max-h-10 sm:max-h-11 lg:max-h-13 object-contain"
                  priority
                />
              </motion.div>
            </Link>
          </motion.div>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                variants={navItemVariants}
                custom={index}
                className="relative"
              >
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <motion.button
                      className={`
                        relative flex items-center space-x-2 px-4 py-3 rounded-full text-sm font-medium min-h-[44px]
                        transition-colors duration-200 hover:bg-muted
                        ${
                          isActiveRoute(item.href) || activeDropdown === item.name
                            ? "text-orange-600 dark:text-orange-400"
                            : "text-foreground"
                        }
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{item.name}</span>
                      <motion.div
                        animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                      <motion.span
                        className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isActiveRoute(item.href) ? 1 : 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>

                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={dropdownVariants}
                          className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden"
                        >
                          <div className="p-2">
                            {item.dropdown.map((subItem, subIndex) => (
                              <motion.div
                                key={subItem.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: subIndex * 0.05 }}
                              >
                                <Link
                                  href={subItem.href}
                                  className="block p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transition-all duration-200 group"
                                >
                                  <div className="flex flex-col gap-1">
                                    <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-white text-sm">
                                      {subItem.name}
                                    </span>
                                    <span className="text-gray-600 dark:text-gray-400 group-hover:text-white text-xs">
                                      {subItem.description}
                                    </span>
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link href={item.href}>
                    <motion.div
                      className={`
                        relative flex items-center space-x-2 px-4 py-3 rounded-full text-sm font-medium min-h-[44px]
                        transition-colors duration-200 hover:bg-muted
                        ${
                          isActiveRoute(item.href)
                            ? "text-orange-600 dark:text-orange-400"
                            : "text-foreground"
                        }
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{item.name}</span>
                      <motion.span
                        className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isActiveRoute(item.href) ? 1 : 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  </Link>
                )}
              </motion.div>
            ))}
            
            <motion.div variants={navItemVariants}>
              <Link href="/viaggi/su-misura">
                <motion.div
                  className="ml-2 px-5 py-3 rounded-full text-sm font-semibold min-h-[44px] flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(249, 115, 22, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span>✨ Viaggi su Misura</span>
                </motion.div>
              </Link>
            </motion.div>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              variants={navItemVariants}
              onClick={onSearchOpen}
              className="hidden sm:flex items-center space-x-2 px-4 py-3 bg-muted hover:bg-muted/80 rounded-full text-sm font-medium text-foreground transition-all duration-200 min-h-[44px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline">Cerca</span>
            </motion.button>

            <motion.button
              variants={navItemVariants}
              onClick={toggleTheme}
              className="p-3 rounded-full hover:bg-muted transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5 text-orange-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5 text-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {loading ? (
              <motion.div
                variants={navItemVariants}
                className="w-10 h-10 rounded-full bg-muted"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            ) : user ? (
              <motion.div variants={navItemVariants} className="relative">
                <motion.button
                  onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                  className="flex items-center space-x-2 px-4 py-3 rounded-full bg-muted hover:bg-muted/80 transition-all duration-200 min-h-[44px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isAdmin ? (
                    <Settings className="w-5 h-5 text-orange-600" />
                  ) : (
                    <User className="w-5 h-5 text-foreground" />
                  )}
                  <span className="hidden md:inline text-sm font-medium">
                    {isAdmin ? 'Admin' : userProfile?.displayName || 'Utente'}
                  </span>
                  <motion.div
                    animate={{ rotate: activeDropdown === 'user' ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {activeDropdown === 'user' && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={dropdownVariants}
                      className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-lg py-2 z-50"
                    >
                      <Link
                        href="/dashboard"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <User className="w-4 h-4" />
                        <span>La Mia Area</span>
                      </Link>
                      <button
                        onClick={() => {
                          setActiveDropdown(null)
                          handleLogout()
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div variants={navItemVariants} className="flex items-center space-x-2">
                <Link
                  href="/auth/signin"
                  className="hidden sm:inline-flex items-center px-4 py-3 rounded-full border border-border text-sm font-medium text-foreground hover:bg-muted transition-all duration-200 min-h-[44px]"
                >
                  Accedi
                </Link>
                <Link href="/contatti">
                  <motion.div
                    className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-sm min-h-[44px] bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(249, 115, 22, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="hidden sm:inline">Pianifica Viaggio</span>
                    <span className="sm:hidden">Contatti</span>
                  </motion.div>
                </Link>
              </motion.div>
            )}

            <motion.button
              variants={navItemVariants}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-3 rounded-full hover:bg-muted transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 text-foreground" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={backdropVariants}
              className="lg:hidden fixed inset-0 top-14 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="lg:hidden fixed top-14 right-0 bottom-0 w-full sm:w-96 bg-card border-l border-border z-50 overflow-y-auto"
            >
              <div className="px-4 py-6 space-y-4">
                {loading ? (
                  <motion.div
                    variants={mobileItemVariants}
                    className="w-full h-12 rounded-full bg-muted"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                ) : user ? (
                  <motion.div variants={mobileItemVariants} className="space-y-3">
                    <div className="flex items-center space-x-3 px-4 py-3 bg-muted rounded-xl">
                      {isAdmin ? (
                        <Settings className="w-6 h-6 text-orange-600" />
                      ) : (
                        <User className="w-6 h-6 text-foreground" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">
                          {isAdmin ? 'Admin Panel' : userProfile?.displayName || 'Utente'}
                        </p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    
                    <Link
                      href="/dashboard"
                      className="w-full flex items-center space-x-3 px-4 py-4 bg-muted hover:bg-muted/80 rounded-xl transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span className="font-medium">La Mia Area</span>
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false)
                        handleLogout()
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div variants={mobileItemVariants} className="space-y-3">
                    <Link
                      href="/auth/signin"
                      className="w-full flex items-center justify-center px-6 py-4 border-2 border-border rounded-full font-semibold min-h-[48px] transition-all duration-300 text-foreground hover:bg-muted"
                      onClick={() => setIsOpen(false)}
                    >
                      Accedi / Registrati
                    </Link>
                    <Link
                      href="/contatti"
                      className="w-full flex items-center justify-center px-6 py-4 rounded-full font-semibold min-h-[48px] bg-gradient-to-r from-orange-500 to-red-500 text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      Pianifica il Tuo Viaggio
                    </Link>
                  </motion.div>
                )}

                <motion.button
                  variants={mobileItemVariants}
                  onClick={() => {
                    onSearchOpen()
                    setIsOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-4 bg-muted rounded-xl text-left min-h-[48px]"
                  whileTap={{ scale: 0.98 }}
                >
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">Cerca destinazioni...</span>
                </motion.button>

                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={mobileItemVariants}
                    custom={index}
                  >
                    {item.dropdown ? (
                      <div>
                        <motion.button
                          onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                          className={`
                            w-full flex items-center justify-between px-4 py-4 text-left font-medium rounded-xl transition-colors duration-200 min-h-[48px]
                            ${
                              isActiveRoute(item.href)
                                ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                                : "text-foreground hover:bg-muted"
                            }
                          `}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-3">
                            <item.icon className="w-5 h-5" />
                            <span>{item.name}</span>
                          </div>
                          <motion.div
                            animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        </motion.button>
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-12 pt-2 space-y-2">
                                {item.dropdown.map((subItem, subIndex) => (
                                  <motion.div
                                    key={subItem.href}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: subIndex * 0.05 }}
                                  >
                                    <Link
                                      href={subItem.href}
                                      className={`
                                        block px-4 py-4 text-sm rounded-lg transition-all duration-200 min-h-[48px]
                                        ${isActiveRoute(subItem.href) ? "bg-orange-50 dark:bg-orange-900/20" : "hover:bg-muted"}
                                      `}
                                      onClick={() => setIsOpen(false)}
                                    >
                                      <div
                                        className="font-medium"
                                        style={{
                                          color: isActiveRoute(subItem.href)
                                            ? theme === "dark"
                                              ? "#fb923c"
                                              : "#ea580c"
                                            : theme === "dark"
                                              ? "#ffffff"
                                              : "#111827",
                                        }}
                                      >
                                        {subItem.name}
                                      </div>
                                      <div
                                        className="text-xs mt-1"
                                        style={{
                                          color: isActiveRoute(subItem.href)
                                            ? theme === "dark"
                                              ? "#fb923c"
                                              : "#ea580c"
                                            : theme === "dark"
                                              ? "#e5e7eb"
                                              : "#4b5563",
                                        }}
                                      >
                                        {subItem.description}
                                      </div>
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`
                          flex items-center space-x-3 px-4 py-4 font-medium rounded-xl transition-colors duration-200 min-h-[48px]
                          ${
                            isActiveRoute(item.href)
                              ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                              : "text-foreground hover:bg-muted"
                          }
                        `}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    )}
                  </motion.div>
                ))}

                <motion.div variants={mobileItemVariants}>
                  <Link
                    href="/viaggi/su-misura"
                    className="w-full flex items-center justify-center px-6 py-4 rounded-full font-semibold min-h-[48px] shadow-md bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>✨ Viaggi su Misura</span>
                  </Link>
                </motion.div>

                <motion.div variants={mobileItemVariants} className="pt-4 border-t border-border">
                  <motion.button
                    onClick={toggleTheme}
                    className="w-full flex items-center space-x-3 px-4 py-4 text-foreground hover:bg-muted rounded-xl transition-colors duration-200 min-h-[48px]"
                    whileTap={{ scale: 0.98 }}
                  >
                    {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    <span>Cambia Tema</span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
