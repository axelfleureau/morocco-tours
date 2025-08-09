import { Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4 text-foreground">Morocco Dreams</h3>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              La tua porta d'accesso al Marocco autentico. Viaggi personalizzati, esperienze uniche e servizi
              professionali per scoprire la magia del Regno del Marocco.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-muted-foreground">+39 329 233 3370</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-muted-foreground">info@moroccodreams.it</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-muted-foreground">Lun-Dom: 9:00-20:00</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Link Rapidi</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link
                  href="/viaggi/gruppo"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  Viaggi di Gruppo
                </Link>
              </li>
              <li>
                <Link
                  href="/viaggi/su-misura"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  Viaggi su Misura
                </Link>
              </li>
              <li>
                <Link
                  href="/esperienze"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  Esperienze
                </Link>
              </li>
              <li>
                <Link href="/servizi" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                  Servizi
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Destinazioni</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/viaggi/citta-imperiali"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  Città Imperiali
                </Link>
              </li>
              <li>
                <Link
                  href="/viaggi/deserto"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  Deserto del Sahara
                </Link>
              </li>
              <li>
                <Link
                  href="/viaggi/costa-atlantica"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  Costa Atlantica
                </Link>
              </li>
              <li>
                <Link
                  href="/viaggi/montagne-atlas"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  Montagne Atlas
                </Link>
              </li>
              <li>
                <Link
                  href="/esperienze/hammam"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  Hammam & Spa
                </Link>
              </li>
              <li>
                <Link
                  href="/esperienze/cucina"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  Cucina Marocchina
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Informazioni Legali</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                  Termini di Servizio
                </Link>
              </li>
              <li>
                <Link
                  href="/contatti"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  Contatti
                </Link>
              </li>
            </ul>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-foreground">Seguici</h4>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">© 2024 Morocco Dreams. Tutti i diritti riservati.</p>
            <p className="text-muted-foreground text-sm mt-2 md:mt-0">Realizzato con ❤️ per gli amanti del Marocco</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
