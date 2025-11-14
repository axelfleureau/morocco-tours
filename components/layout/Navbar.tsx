"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, Search, Sun, Moon, ChevronDown, MapPin, Users, X, Camera, LogOut, User, Settings, Mail } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"

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
  const navRef = useRef(null)
  const pathname = usePathname()
  const router = useRouter()
  const { user, userProfile, loading, isAdmin, signOut } = useAuth()

  const [lastScrollY, setLastScrollY] = useState(0)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check system theme preference
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !(navRef.current as HTMLElement).contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  useEffect(() => {
    if (!mounted) return
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          if (currentScrollY > lastScrollY && currentScrollY > 60) {
            setIsHidden(true)
          } else {
            setIsHidden(false)
          }
          setLastScrollY(currentScrollY)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, mounted])

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

  // Get appropriate logo based on device and theme
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

  if (!mounted) {
    return null
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
  bg-background/80 backdrop-blur-lg shadow-lg border-b border-border
  ${isHidden ? "pointer-events-none select-none opacity-0 -translate-y-full" : "opacity-100 translate-y-0"}
`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-17">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative transition-transform duration-300 group-hover:scale-105">
              <Image
                src={getLogoSrc() || "/placeholder.svg"}
                alt="Morocco Dreams - Viaggi in Marocco"
                width={getLogoSize().width}
                height={getLogoSize().height}
                className="h-auto w-auto max-h-10 sm:max-h-11 lg:max-h-13 object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`
                        flex items-center space-x-2 px-4 py-3 rounded-full text-sm font-medium min-h-[44px]
                        transition-all duration-200 hover:bg-muted
                        ${
                          isActiveRoute(item.href) || activeDropdown === item.name
                            ? "bg-muted text-orange-600 dark:text-orange-400"
                            : "text-foreground hover:text-foreground"
                        }
                      `}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      className={`
    absolute top-full left-0 mt-2 w-80 
    bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700
    rounded-2xl shadow-xl overflow-hidden
    transition-all duration-200 origin-top-left
    ${activeDropdown === item.name ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-2 invisible"}
  `}
                    >
                      <div className="p-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.href}
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
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`
                      flex items-center space-x-2 px-4 py-3 rounded-full text-sm font-medium min-h-[44px]
                      transition-all duration-200 hover:bg-muted
                      ${
                        isActiveRoute(item.href)
                          ? "bg-muted text-orange-600 dark:text-orange-400"
                          : "text-foreground hover:text-foreground"
                      }
                    `}
                  >
                    <span>{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <button
              onClick={onSearchOpen}
              className="hidden sm:flex items-center space-x-2 px-4 py-3 bg-muted hover:bg-muted/80 rounded-full text-sm font-medium text-foreground transition-all duration-200 group min-h-[44px]"
            >
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden md:inline">Cerca</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-full hover:bg-muted transition-all duration-200 group min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-orange-500 group-hover:rotate-12 transition-transform duration-200" />
              ) : (
                <Moon className="w-5 h-5 text-foreground group-hover:-rotate-12 transition-transform duration-200" />
              )}
            </button>

            {/* Authentication Buttons */}
            {loading ? (
              <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                  className="flex items-center space-x-2 px-4 py-3 rounded-full bg-muted hover:bg-muted/80 transition-all duration-200 min-h-[44px]"
                >
                  {isAdmin ? (
                    <Settings className="w-5 h-5 text-orange-600" />
                  ) : (
                    <User className="w-5 h-5 text-foreground" />
                  )}
                  <span className="hidden md:inline text-sm font-medium">
                    {isAdmin ? 'Admin' : userProfile?.displayName || 'Utente'}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === 'user' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* User Dropdown */}
                {activeDropdown === 'user' && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-lg py-2 z-50">
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
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/auth/signin"
                  className="hidden sm:inline-flex items-center px-4 py-3 rounded-full border border-border text-sm font-medium text-foreground hover:bg-muted transition-all duration-200 min-h-[44px]"
                >
                  Accedi
                </Link>
                <Link
                  href="/contatti"
                  className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-sm min-h-[44px] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{
                    background: "linear-gradient(to right, #f97316, #dc2626) !important",
                    color: "#ffffff !important",
                  }}
                >
                  <span className="hidden sm:inline">Pianifica Viaggio</span>
                  <span className="sm:hidden">Contatti</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-3 rounded-full hover:bg-muted transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              {isOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`
          lg:hidden absolute top-full left-0 w-full bg-card border-t border-border
          transition-all duration-300 overflow-hidden
          ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Mobile Authentication */}
          {loading ? (
            <div className="w-full h-12 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <div className="space-y-3">
              {/* Mobile User Info */}
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
              
              {/* Mobile User Actions */}
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
            </div>
          ) : (
            <div className="space-y-3">
              <Link
                href="/auth/signin"
                className="w-full flex items-center justify-center px-6 py-4 border-2 border-border rounded-full font-semibold min-h-[48px] transition-all duration-300 text-foreground hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                Accedi / Registrati
              </Link>
              <Link
                href="/contatti"
                className="w-full flex items-center justify-center px-6 py-4 rounded-full font-semibold min-h-[48px] transition-all duration-300"
                style={{
                  background: "linear-gradient(to right, #f97316, #dc2626)",
                  color: "#ffffff",
                }}
                onClick={() => setIsOpen(false)}
              >
                Pianifica il Tuo Viaggio
              </Link>
            </div>
          )}

          {/* Mobile Search */}
          <button
            onClick={() => {
              onSearchOpen()
              setIsOpen(false)
            }}
            className="w-full flex items-center space-x-3 px-4 py-4 bg-muted rounded-xl text-left min-h-[48px]"
          >
            <Search className="w-5 h-5 text-muted-foreground" />
            <span className="text-foreground">Cerca destinazioni...</span>
          </button>

          {/* Mobile Menu Items */}
          {navItems.map((item) => (
            <div key={item.name}>
              {item.dropdown ? (
                <div>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    className={`
                      w-full flex items-center justify-between px-4 py-4 text-left font-medium rounded-xl transition-colors duration-200 min-h-[48px]
                      ${
                        isActiveRoute(item.href)
                          ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                          : "text-foreground hover:bg-muted"
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`
                      overflow-hidden transition-all duration-200
                      ${activeDropdown === item.name ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}
                    `}
                  >
                    <div className="pl-12 space-y-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`
                            block px-4 py-4 text-sm rounded-lg transition-all duration-200 min-h-[48px]
                            ${isActiveRoute(subItem.href) ? "bg-orange-50 dark:bg-orange-900/20" : "hover:bg-muted"}
                          `}
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
                      ))}
                    </div>
                  </div>
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
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )}
            </div>
          ))}

          {/* Mobile Actions */}
          <div className="pt-4 border-t border-border space-y-3">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center space-x-3 px-4 py-4 text-foreground hover:bg-muted rounded-xl transition-colors duration-200 min-h-[48px]"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span>Cambia Tema</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
