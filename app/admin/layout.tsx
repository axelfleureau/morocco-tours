"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import {
  LayoutDashboard,
  Compass,
  MapPin,
  Car,
  Instagram,
  Users,
  Menu,
  X,
  LogOut,
  Sun,
  Moon,
  FileText,
  Settings,
  Calendar
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import PublishBanner from "@/components/admin/PublishBanner"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading, isAdmin } = useAuth()
  const { theme, setTheme } = useTheme()
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (pathname === "/admin/login") return
    
    // Check auth/admin status after loading completes
    if (!loading) {
      if (!user) {
        router.push("/admin/login")
      } else if (!isAdmin) {
        // User is not admin, redirect to home
        router.push("/")
      }
    }
  }, [user, isAdmin, loading, pathname, router])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (pathname === "/admin/login") {
    return children
  }

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifica accesso...</p>
        </div>
      </div>
    )
  }

  // Don't render if user is not admin (will redirect via useEffect)
  if (!user || !isAdmin) {
    return null
  }

  const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/content", icon: FileText, label: "Content Manager" },
    { href: "/admin/bookings", icon: Calendar, label: "Bookings" },
    { href: "/admin/cities", icon: MapPin, label: "Città" },
    { href: "/admin/services", icon: Settings, label: "Servizi" },
    { href: "/admin/instagram", icon: Instagram, label: "Instagram" },
    { href: "/admin/settings", icon: Settings, label: "Impostazioni Sito" },
    { href: "/admin/users", icon: Users, label: "Utenti Admin" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-card border-r border-border z-40 transform transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Morocco Dreams
                </h1>
                <p className="text-sm text-muted-foreground mt-1">Admin Panel</p>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold">
                {user?.displayName?.charAt(0).toUpperCase() || "A"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.displayName || "Admin"}</p>
                <p className="text-xs text-muted-foreground truncate capitalize">
                  super_admin
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-border space-y-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span className="font-medium">
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </span>
              </button>
            )}
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 bg-card border-b border-border px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="hidden lg:block">
              <h2 className="text-2xl font-bold text-foreground">
                {navItems.find((item) => item.href === pathname)?.label || "Admin Panel"}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/"
                target="_blank"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Visita sito →
              </Link>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <PublishBanner />
          <div className="mt-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
