import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { FirebaseProvider } from "@/components/providers/FirebaseProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Morocco Dreams - Viaggi Autentici in Marocco",
  description: "Scopri il Marocco autentico con i nostri tour personalizzati. Dalle città imperiali al deserto del Sahara, vivi un'esperienza indimenticabile.",
  keywords: "Marocco, viaggi, tour, deserto, Sahara, Marrakech, Fes, Casablanca, vacanze",
  authors: [{ name: "Morocco Dreams" }],
  openGraph: {
    title: "Morocco Dreams - Viaggi Autentici in Marocco",
    description: "Scopri il Marocco autentico con i nostri tour personalizzati",
    url: "https://moroccodreams.com",
    siteName: "Morocco Dreams",
    images: [
      {
        url: "/images/hero-sahara.png",
        width: 1200,
        height: 630,
        alt: "Morocco Dreams - Sahara Desert"
      }
    ],
    locale: "it_IT",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Morocco Dreams - Viaggi Autentici in Marocco",
    description: "Scopri il Marocco autentico con i nostri tour personalizzati",
    images: ["/images/hero-sahara.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code"
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#f97316" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={inter.className}>
        <FirebaseProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </FirebaseProvider>
      </body>
    </html>
  )
}
