import Link from "next/link"
import { Phone, MessageCircle } from "lucide-react"

interface ContactBannerProps {
  title: string
  subtitle: string
}

export default function ContactBanner({ title, subtitle }: ContactBannerProps) {
  return (
    <div className="py-16 lg:py-20 bg-gradient-to-r from-orange-500 to-red-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-lg lg:text-xl text-orange-100 mb-8 max-w-2xl mx-auto">{subtitle}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contatti"
            className="inline-flex items-center justify-center space-x-2 bg-white text-orange-600 px-8 py-4 rounded-xl hover:bg-orange-50 transition-all duration-300 font-semibold text-lg"
          >
            <Phone className="w-5 h-5" />
            <span>Chiamaci Ora</span>
          </Link>
          <a
            href="https://wa.me/393292333370?text=Ciao! Vorrei informazioni sui viaggi in Marocco."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 font-semibold text-lg"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  )
}
