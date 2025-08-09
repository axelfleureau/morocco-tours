import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./client-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Morocco Dreams - Viaggi Autentici in Marocco",
  description:
    "Scopri il Marocco autentico con Morocco Dreams. Viaggi su misura, tour del deserto, città imperiali e esperienze uniche nel regno delle mille e una notte.",
  keywords: "Marocco, viaggi, tour, deserto, Marrakech, Fes, Casablanca, Sahara, viaggi su misura",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
