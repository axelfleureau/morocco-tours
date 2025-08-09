"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, Search, Sun, Moon, ChevronDown, MapPin, Users, Mail, X, Camera } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import Image from "next/image"

interface NavbarProps {
  onSearchOpen: () => void
}

export default function Navbar({ onSearchOpen }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [mounted, setMounted] = useState(false)
  const navRef = useRef(null)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  // Device detection
  useEffect(() => {
    setMounted(true)
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
        { name: "Surf Essaouira", href: "/esperienze/surf", description: "Onde perfette sulla costa" },
        { name: "Fotografia", href: "/esperienze/fotografia", description: "Tour fotografici guidati" },
        { name: "Artigianato", href: "/esperienze/artigianato", description: "Laboratori con maestri artigiani" },
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
    setTheme(theme === "dark" ? "light" : "dark")
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
    if (isMobile) return { width: 160, height: 70 }
    if (isTablet) return { width: 200, height: 90 }
    return { width: 280, height: 100 }
  }

  if (!mounted) {
    return null
  }

  return (
    <nav
      ref={navRef}
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled || isOpen ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border" : "bg-transparent"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative transition-transform duration-300 group-hover:scale-105">
              <Image
                src={getLogoSrc() || "/placeholder.svg"}
                alt="Morocco Dreams - Viaggi in Marocco"
                width={getLogoSize().width}
                height={getLogoSize().height}
                className="h-auto w-auto max-h-12 sm:max-h-16 lg:max-h-20 object-contain"
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
                        flex items-center space-x-2 px-4 py-2.5 rounded-full text-sm font-medium
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
                        absolute top-full left-0 mt-2 w-80 bg-card rounded-2xl shadow-xl
                        border border-border overflow-hidden
                        transition-all duration-200 origin-top-left
                        ${
                          activeDropdown === item.name
                            ? "opacity-100 scale-100 translate-y-0 visible"
                            : "opacity-0 scale-95 -translate-y-2 invisible"
                        }
                      `}
                    >
                      <div className="p-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`
                              flex flex-col space-y-1 px-4 py-3 rounded-xl text-sm font-medium 
                              transition-all duration-200 group
                              ${
                                isActiveRoute(subItem.href)
                                  ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                                  : "text-card-foreground hover:bg-muted hover:text-orange-600 dark:hover:text-orange-400"
                              }
                            `}
                          >
                            <span className="group-hover:translate-x-1 transition-transform duration-200">
                              {subItem.name}
                            </span>
                            <span className="text-xs text-muted-foreground group-hover:text-orange-500 dark:group-hover:text-orange-400">
                              {subItem.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`
                      flex items-center space-x-2 px-4 py-2.5 rounded-full text-sm font-medium 
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
              className="hidden sm:flex items-center space-x-2 px-4 py-2.5 bg-muted hover:bg-muted/80 rounded-full text-sm font-medium text-foreground transition-all duration-200 group"
            >
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden md:inline">Cerca</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-muted transition-all duration-200 group"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-orange-500 group-hover:rotate-12 transition-transform duration-200" />
              ) : (
                <Moon className="w-5 h-5 text-foreground group-hover:-rotate-12 transition-transform duration-200" />
              )}
            </button>

            {/* CTA Button */}
            <Link
              href="/contatti"
              className="hidden sm:inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold text-sm"
            >
              Pianifica Viaggio
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-full hover:bg-muted transition-all duration-200"
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
          {/* Mobile CTA */}
          <Link
            href="/contatti"
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold"
          >
            Pianifica il Tuo Viaggio
          </Link>

          {/* Mobile Search */}
          <button
            onClick={() => {
              onSearchOpen()
              setIsOpen(false)
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 bg-muted rounded-xl text-left"
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
                      w-full flex items-center justify-between px-4 py-3 text-left font-medium rounded-xl transition-colors duration-200
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
                            block px-4 py-3 text-sm rounded-lg transition-all duration-200
                            ${
                              isActiveRoute(subItem.href)
                                ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                                : "text-muted-foreground hover:text-orange-600 dark:hover:text-orange-400 hover:bg-muted"
                            }
                          `}
                        >
                          <div className="font-medium">{subItem.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">{subItem.description}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 font-medium rounded-xl transition-colors duration-200
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
              className="w-full flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-muted rounded-xl transition-colors duration-200"
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
