"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, Search, Sun, Moon, ChevronDown, MapPin, Home, Users, Mail, User, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavbarProps {
  onSearchOpen: () => void
  isDarkMode: boolean
  onToggleTheme: () => void
}

export default function Navbar({ onSearchOpen, isDarkMode, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const navRef = useRef(null)
  const pathname = usePathname()

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
    { name: "Home", href: "/", icon: Home },
    { name: "Chi Siamo", href: "/about", icon: Users },
    {
      name: "Viaggi",
      href: "/viaggi",
      icon: MapPin,
      dropdown: [
        { name: "Viaggi di Gruppo", href: "/viaggi/gruppo" },
        { name: "Viaggi su Misura", href: "/viaggi/su-misura" },
        { name: "Tour del Deserto", href: "/viaggi/deserto" },
        { name: "Città Imperiali", href: "/viaggi/citta-imperiali" },
      ],
    },
    {
      name: "Esperienze",
      href: "/esperienze",
      icon: MapPin,
      dropdown: [
        { name: "Hammam & Spa", href: "/esperienze/hammam" },
        { name: "Cucina Marocchina", href: "/esperienze/cucina" },
        { name: "Trekking Atlante", href: "/esperienze/trekking" },
        { name: "Surf Essaouira", href: "/esperienze/surf" },
      ],
    },
    { name: "Contatti", href: "/contatti", icon: Mail },
  ]

  const isActiveRoute = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav
      ref={navRef}
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          scrolled || isOpen
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-lg">M</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Morocco Dreams
              </h1>
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
                        transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800
                        ${
                          isActiveRoute(item.href) || activeDropdown === item.name
                            ? "bg-gray-100 dark:bg-gray-800 text-orange-600 dark:text-orange-400"
                            : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
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
                        absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl
                        border border-gray-200 dark:border-gray-700 overflow-hidden
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
                              flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium 
                              transition-all duration-200 group
                              ${
                                isActiveRoute(subItem.href)
                                  ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400"
                              }
                            `}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full group-hover:scale-125 transition-transform duration-200" />
                            <span className="group-hover:translate-x-1 transition-transform duration-200">
                              {subItem.name}
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
                      transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800
                      ${
                        isActiveRoute(item.href)
                          ? "bg-gray-100 dark:bg-gray-800 text-orange-600 dark:text-orange-400"
                          : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
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
              className="hidden sm:flex items-center space-x-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 group"
            >
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden md:inline">Cerca</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-orange-500 group-hover:rotate-12 transition-transform duration-200" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 group-hover:-rotate-12 transition-transform duration-200" />
              )}
            </button>

            {/* CTA Button */}
            <Link
              href="/viaggi/su-misura"
              className="hidden sm:inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold text-sm"
            >
              Inizia a pianificare
            </Link>

            {/* User Menu */}
            <div className="hidden sm:block">
              <button className="flex items-center space-x-2 p-2.5 rounded-full border border-gray-300 dark:border-gray-600 hover:shadow-md transition-all duration-200 group">
                <Menu className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform duration-200" />
                <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`
          lg:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700
          transition-all duration-300 overflow-hidden
          ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Mobile CTA */}
          <Link
            href="/viaggi/su-misura"
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold"
          >
            Inizia a pianificare
          </Link>

          {/* Mobile Search */}
          <button
            onClick={() => {
              onSearchOpen()
              setIsOpen(false)
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-left"
          >
            <Search className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700 dark:text-gray-300">Cerca destinazioni...</span>
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
                          : "text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
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
                      ${activeDropdown === item.name ? "max-h-64 opacity-100 mt-2" : "max-h-0 opacity-0"}
                    `}
                  >
                    <div className="pl-12 space-y-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`
                            block px-4 py-2 text-sm rounded-lg transition-all duration-200
                            ${
                              isActiveRoute(subItem.href)
                                ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                                : "text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                            }
                          `}
                        >
                          {subItem.name}
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
                        : "text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
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
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
            <button
              onClick={onToggleTheme}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors duration-200"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span>Cambia Tema</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
