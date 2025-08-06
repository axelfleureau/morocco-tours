"use client"

import { useState } from "react"
import { MessageCircle, Users, Heart, Mountain, Camera, Plus, Minus } from "lucide-react"
import HeroSection from "@/components/sections/HeroSection"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import PopularTrips from "@/components/sections/PopularTrips"
import MoroccoMapbox from "@/components/sections/MoroccoMapbox"

// Authentic Experiences Component
const AuthenticExperiences = () => {
  return (
    <div className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Esperienze Autentiche</h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Immergiti nella cultura marocchina con le nostre esperienze uniche
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Mountain,
              title: "Notte nel Deserto",
              description: "Dormi sotto le stelle nel cuore del Sahara",
              price: "€120",
              image: "/images/desert-night.png",
              duration: "1 notte",
            },
            {
              icon: Heart,
              title: "Hammam Tradizionale",
              description: "Rilassati con un autentico bagno turco marocchino",
              price: "€45",
              image: "/images/traditional-hammam.png",
              duration: "2 ore",
            },
            {
              icon: Users,
              title: "Lezione di Cucina",
              description: "Impara a cucinare i piatti tipici marocchini",
              price: "€65",
              image: "/images/cooking-class.png",
              duration: "4 ore",
            },
            {
              icon: Camera,
              title: "Tour Fotografico",
              description: "Cattura la bellezza del Marocco con un fotografo",
              price: "€85",
              image: "/images/photo-tour.png",
              duration: "6 ore",
            },
          ].map((experience, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
            >
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={experience.image || "/placeholder.svg?height=200&width=300"}
                  alt={experience.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                  {experience.price}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  {experience.duration}
                </div>
              </div>

              <div className="p-4 sm:p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <experience.icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{experience.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{experience.description}</p>
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold">
                  Prenota Ora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Testimonials Component
const TestimonialsSection = () => {
  return (
    <div className="py-16 lg:py-24 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Cosa Dicono i Nostri Viaggiatori
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
            Testimonianze autentiche dai nostri clienti
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              name: "Marco & Giulia",
              location: "Milano, Italia",
              rating: 5,
              text: "Un viaggio incredibile! Le guide locali ci hanno fatto scoprire il vero Marocco, lontano dai percorsi turistici. Il deserto è stato magico.",
              image: "/images/testimonial-1.png",
              trip: "Tour Imperiali + Deserto",
            },
            {
              name: "Sarah Johnson",
              location: "London, UK",
              rating: 5,
              text: "Morocco Dreams ha organizzato tutto perfettamente. Dall'hammam tradizionale alle notti nel deserto, ogni momento è stato autentico.",
              image: "/images/testimonial-2.png",
              trip: "Viaggio su Misura",
            },
            {
              name: "Pierre & Marie",
              location: "Paris, France",
              rating: 5,
              text: "L'esperienza culinaria è stata fantastica! Abbiamo imparato a cucinare il tagine e il couscous con una famiglia berbera.",
              image: "/images/testimonial-3.png",
              trip: "Tour Gastronomico",
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg?height=50&width=50"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <div key={i} className="w-5 h-5 text-yellow-400 fill-current">
                    ⭐
                  </div>
                ))}
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.text}"</p>

              <div className="text-sm text-orange-600 dark:text-orange-400 font-semibold">{testimonial.trip}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Quick Contact Form Component
const QuickContactForm = () => {
  return (
    <div className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Inizia a Pianificare il Tuo Viaggio
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
            Contattaci per una consulenza gratuita personalizzata
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-6 lg:p-8 text-white">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nome e Cognome"
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
              />
              <input
                type="tel"
                placeholder="Telefono"
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
              />
            </div>
            <div className="space-y-4">
              <textarea
                placeholder="Raccontaci il tuo sogno di viaggio in Marocco..."
                rows={4}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm resize-none"
              />
              <select className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm">
                <option value="">Tipo di viaggio preferito</option>
                <option value="culturale">Culturale</option>
                <option value="avventura">Avventura</option>
                <option value="relax">Relax & Benessere</option>
                <option value="gastronomico">Gastronomico</option>
                <option value="famiglia">Famiglia</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button className="bg-white text-orange-600 px-6 lg:px-8 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold">
              Richiedi Preventivo Gratuito
            </button>
            <a
              href="https://wa.me/393123456789?text=Ciao! Vorrei informazioni sui vostri viaggi in Marocco."
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-6 lg:px-8 py-3 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 font-semibold inline-flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// FAQ Section Component
const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: "Ho bisogno di un visto per visitare il Marocco?",
      answer:
        "I cittadini italiani non hanno bisogno di visto per soggiorni turistici fino a 90 giorni. È sufficiente un passaporto valido con almeno 6 mesi di validità residua.",
    },
    {
      question: "Il Marocco è sicuro per i turisti?",
      answer:
        "Sì, il Marocco è generalmente molto sicuro per i turisti. Le nostre guide locali ti accompagneranno sempre e forniamo assistenza 24/7 durante tutto il viaggio.",
    },
    {
      question: "Che tipo di alloggi offrite?",
      answer:
        "Offriamo una vasta gamma di alloggi: dai riad tradizionali nella medina agli hotel di lusso, dai campi nel deserto alle guesthouse berbere in montagna.",
    },
    {
      question: "Posso personalizzare il mio viaggio?",
      answer:
        "Assolutamente! Tutti i nostri viaggi sono completamente personalizzabili. Puoi modificare l'itinerario, la durata, gli alloggi e le attività secondo le tue preferenze.",
    },
    {
      question: "Qual è il periodo migliore per visitare il Marocco?",
      answer:
        "Il Marocco si può visitare tutto l'anno. Primavera (marzo-maggio) e autunno (settembre-novembre) sono ideali per il clima mite. L'inverno è perfetto per il deserto, l'estate per la costa.",
    },
    {
      question: "Cosa include il prezzo del viaggio?",
      answer:
        "I nostri prezzi includono alloggi, trasporti privati, guide locali, alcune attività e assistenza 24/7. Voli internazionali, pasti non specificati e spese personali sono esclusi.",
    },
  ]

  return (
    <div className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Domande Frequenti</h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
            Tutto quello che devi sapere per il tuo viaggio in Marocco
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <span className="font-semibold text-gray-900 dark:text-white pr-4">{faq.question}</span>
                {openFAQ === idx ? (
                  <Minus className="w-5 h-5 text-orange-500 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-orange-500 flex-shrink-0" />
                )}
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openFAQ === idx ? "max-h-96 pb-4" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <HeroSection />
      <WhyChooseUs />
      <PopularTrips />
      <AuthenticExperiences />
      <TestimonialsSection />
      <QuickContactForm />
      <MoroccoMapbox />
      <FAQSection />
    </div>
  )
}
