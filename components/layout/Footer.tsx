import { Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Link from "next/link"
import NewsletterForm from "@/components/forms/NewsletterForm"

export default function Footer() {

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4 text-orange-600">Morocco Dreams</h3>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              La tua porta d'accesso al Marocco autentico. Viaggi personalizzati, esperienze uniche e servizi
              professionali per scoprire la magia del Regno del Marocco.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 group">
                <Phone className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-orange-500 group-hover:underline transition-colors cursor-pointer">+39 329 233 3370</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-orange-500 group-hover:underline transition-colors cursor-pointer">info@moroccodreams.it</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Clock className="w-4 h-4 text-orange-500 group-hover:rotate-6 transition-transform" />
                <span className="text-sm text-muted-foreground group-hover:text-orange-600 transition-colors">Lun-Dom: 9:00-20:00</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Link Rapidi</h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "Chi Siamo" },
                { href: "/viaggi/gruppo", label: "Viaggi di Gruppo" },
                { href: "/viaggi/su-misura", label: "Viaggi su Misura" },
                { href: "/esperienze", label: "Esperienze" },
                { href: "/servizi", label: "Servizi" },
                { href: "/blog", label: "Blog" },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-muted-foreground hover:text-orange-500 text-sm transition-colors flex items-center"
                  >
                    <span className="group-hover:underline">{link.label}</span>
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">&#8594;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Destinazioni</h3>
            <ul className="space-y-2">
              {[
                { href: "/viaggi/citta-imperiali", label: "Città Imperiali" },
                { href: "/viaggi/deserto", label: "Deserto del Sahara" },
                { href: "/viaggi/costa-atlantica", label: "Costa Atlantica" },
                { href: "/viaggi/montagne-atlas", label: "Montagne Atlas" },
                { href: "/esperienze/hammam", label: "Hammam & Spa" },
                { href: "/esperienze/cucina", label: "Cucina Marocchina" },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-muted-foreground hover:text-orange-500 text-sm transition-colors flex items-center"
                  >
                    <span className="group-hover:underline">{link.label}</span>
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">&#8594;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Social/Legal */}
          <div className="lg:col-span-2 flex flex-col justify-between space-y-8 lg:space-y-0">
            {/* Newsletter */}
            <div className="mb-8">
              <NewsletterForm />
            </div>
            {/* Social & Legal */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-foreground">Seguici</h4>
              <div className="flex space-x-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="group w-9 h-9 bg-muted rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transition-all"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="group w-9 h-9 bg-muted rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transition-all"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="group w-9 h-9 bg-muted rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transition-all"
                  title="Twitter"
                >
                  <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="#"
                  aria-label="Youtube"
                  className="group w-9 h-9 bg-muted rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transition-all"
                  title="Youtube"
                >
                  <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
            {/* Legal links */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-3 text-foreground">Informazioni Legali</h4>
              <div className="flex flex-wrap gap-4">
                {[
                  { href: "/privacy", label: "Privacy Policy" },
                  { href: "/cookies", label: "Cookie Policy" },
                  { href: "/terms", label: "Termini di Servizio" },
                  { href: "/contatti", label: "Contatti" },
                ].map(link => (
                  <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-orange-500 text-xs transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer bottom bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">© 2024 Morocco Dreams. Tutti i diritti riservati.</p>
            <p className="text-muted-foreground text-sm mt-2 md:mt-0">Realizzato con <span className="text-orange-500">❤️</span> per gli amanti del Marocco</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
