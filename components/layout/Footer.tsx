"use client"

import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Morocco Dreams
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              La tua finestra sul Marocco autentico. Creiamo viaggi su misura che trasformano i sogni in realtà.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Link Rapidi</h4>
            <ul className="space-y-2">
              {[
                { name: "Chi Siamo", href: "/about" },
                { name: "Viaggi di Gruppo", href: "/viaggi/gruppo" },
                { name: "Viaggi su Misura", href: "/viaggi/su-misura" },
                { name: "Tour del Deserto", href: "/viaggi/deserto" },
                { name: "Blog", href: "/blog" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Esperienze</h4>
            <ul className="space-y-2">
              {[
                { name: "Hammam & Spa", href: "/esperienze/hammam" },
                { name: "Cucina Marocchina", href: "/esperienze/cucina" },
                { name: "Trekking Atlante", href: "/esperienze/trekking" },
                { name: "Surf Essaouira", href: "/esperienze/surf" },
                { name: "Città Imperiali", href: "/viaggi/citta-imperiali" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contatti</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-300">
                  <p>Via Roma 123</p>
                  <p>20100 Milano, Italia</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <a href="tel:+393123456789" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  +39 312 345 6789
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <a
                  href="mailto:info@moroccodreams.it"
                  className="text-sm text-gray-300 hover:text-orange-400 transition-colors"
                >
                  info@moroccodreams.it
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <a
                  href="https://wa.me/393123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-green-400 transition-colors"
                >
                  WhatsApp 24/7
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">© 2024 Morocco Dreams. Tutti i diritti riservati.</p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-orange-400 transition-colors">
              Termini di Servizio
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-orange-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
