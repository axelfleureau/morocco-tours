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

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navbar onSearchOpen={() => setIsSearchOpen(true)} />
        <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <main className="pt-16 lg:pt-20">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
