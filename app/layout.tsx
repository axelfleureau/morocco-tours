import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./client-layout"
import { ThemeProvider } from "@/components/theme-provider"
import { MoroccoThemeProvider } from "@/context/ThemeContext"
import { AuthProvider } from "@/context/AuthContext"
import { NotificationProvider } from "@/components/NotificationSystem"
import ChatBot from "@/components/ChatBot"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Morocco Dreams - Viaggi Autentici in Marocco",
  description:
    "Scopri il Marocco autentico con Morocco Dreams. Viaggi su misura, tour del deserto, città imperiali e esperienze uniche nel regno delle mille e una notte.",
  keywords: "Marocco, viaggi, tour, deserto, Marrakech, Fes, Casablanca, Sahara, viaggi su misura",
  authors: [{ name: "Morocco Dreams" }],
  creator: "Morocco Dreams",
  publisher: "Morocco Dreams",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://morocco-dreams.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "it-IT": "/",
      "en-US": "/en",
      "fr-FR": "/fr",
    },
  },
  openGraph: {
    title: "Morocco Dreams - Viaggi Autentici in Marocco",
    description:
      "Scopri il Marocco autentico con Morocco Dreams. Viaggi su misura, tour del deserto, città imperiali e esperienze uniche.",
    url: "https://morocco-dreams.vercel.app",
    siteName: "Morocco Dreams",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Morocco Dreams - Viaggi Autentici in Marocco",
    description:
      "Scopri il Marocco autentico con Morocco Dreams. Viaggi su misura, tour del deserto, città imperiali e esperienze uniche.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" suppressHydrationWarning className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ea580c" />
        <meta name="color-scheme" content="light dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MoroccoThemeProvider>
            <AuthProvider>
              <NotificationProvider>
                <a
                  href="#main-content"
                  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
                >
                  Salta al contenuto principale
                </a>
                <ClientLayout>{children}</ClientLayout>
                <ChatBot />
              </NotificationProvider>
            </AuthProvider>
          </MoroccoThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
