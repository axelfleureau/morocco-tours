"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "next-themes"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import SearchBar from "@/components/ui/SearchBar"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar onSearchOpen={() => setIsSearchOpen(true)} />
        <main className="pt-16 lg:pt-20">{children}</main>
        <Footer />
        <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
    </ThemeProvider>
  )
}
