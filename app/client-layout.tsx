"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import SearchBar from "@/components/ui/SearchBar"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false)
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isSearchOpen])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <header role="banner">
          <Navbar onSearchOpen={() => setIsSearchOpen(true)} />
        </header>

        <SearchBar
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          aria-label="Cerca destinazioni e esperienze"
        />

        <main id="main-content" role="main" className="pt-14 lg:pt-17" tabIndex={-1}>
          {children}
        </main>

        <footer role="contentinfo">
          <Footer />
        </footer>

        <div id="announcements" aria-live="polite" aria-atomic="true" className="sr-only" />
      </div>
    </ThemeProvider>
  )
}
