"use client"

import { useState, Suspense } from "react"
import { Users, Heart, Mountain, Camera } from "lucide-react"
import Link from "next/link"
import HeroSection from "@/components/sections/HeroSection"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import PopularTrips from "@/components/sections/PopularTrips"
import BlogTeaser from "@/components/sections/blog-teaser"
import ContactBanner from "@/components/cta/contact-banner"
import MoroccoMap from "@/components/sections/MoroccoMap"

// Authentic Experiences Component
const AuthenticExperiences = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Esperienze Autentiche</h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
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
              href: "/esperienze/trekking",
            },
            {
              icon: Heart,
              title: "Hammam Tradizionale",
              description: "Rilassati con un autentico bagno turco marocchino",
              price: "€45",
              image: "/images/traditional-hammam.png",
              duration: "2 ore",
              href: "/esperienze/hammam",
            },
            {
              icon: Users,
              title: "Lezione di Cucina",
              description: "Impara a cucinare i piatti tipici marocchini",
              price: "€65",
              image: "/images/cooking-class.png",
              duration: "4 ore",
              href: "/esperienze/cucina",
            },
            {
              icon: Camera,
              title: "Tour Fotografico",
              description: "Cattura la bellezza del Marocco con un fotografo",
              price: "€85",
              image: "/images/photo-tour.png",
              duration: "6 ore",
              href: "/esperienze/fotografia",
            },
          ].map((experience, idx) => (
            <div
              key={idx}
              className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
            >
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={experience.image || "/placeholder.svg?height=200&width=300&query=esperienza%20marocco"}
                  alt={experience.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-sm font-bold">
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
                <h3 className="text-lg font-bold text-foreground mb-2">{experience.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{experience.description}</p>
                <div className="flex gap-2">
                  <Link
                    href={experience.href}
                    className="w-1/2 bg-muted text-foreground py-2 px-4 rounded-xl hover:bg-muted/80 transition-all duration-300 font-semibold text-center"
                  >
                    Dettagli
                  </Link>
                  <Link
                    href="/contatti"
                    className="w-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-center"
                  >
                    Prenota
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Component
const TestimonialsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Cosa Dicono i Nostri Viaggiatori</h2>
          <p className="text-lg lg:text-xl text-muted-foreground">Testimonianze autentiche dai nostri clienti</p>
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
            <div key={idx} className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg?height=50&width=50&query=testimonial%20avatar"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <div key={i} className="w-5 h-5 text-yellow-400 fill-current">
                    ⭐
                  </div>
                ))}
              </div>

              <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>

              <div className="text-sm text-orange-600 dark:text-orange-400 font-semibold">{testimonial.trip}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
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
        "I nostre prezzi includono alloggi, trasporti privati, guide locali, alcune attività e assistenza 24/7. Voli internazionali, pasti non specificati e spese personali sono esclusi.",
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Domande Frequenti</h2>
          <p className="text-lg lg:text-xl text-muted-foreground">
            Tutto quello che devi sapere per il tuo viaggio in Marocco
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-card rounded-2xl overflow-hidden transition-all duration-300 shadow-lg">
              <button
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
              >
                <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                {openFAQ === idx ? (
                  <span className="text-orange-500 text-xl">−</span>
                ) : (
                  <span className="text-orange-500 text-xl">+</span>
                )}
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openFAQ === idx ? "max-h-96 pb-4" : "max-h-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <WhyChooseUs />
      <PopularTrips />
      <Suspense
        fallback={
          <section className="py-16 lg:py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg font-medium text-foreground">Caricamento mappa del Marocco...</p>
              </div>
            </div>
          </section>
        }
      >
        <MoroccoMap />
      </Suspense>
      <AuthenticExperiences />
      <TestimonialsSection />
      <FAQSection />
      <BlogTeaser />
      <ContactBanner
        title="Pronto per la tua avventura in Marocco?"
        subtitle="Contattaci per pianificare il viaggio dei tuoi sogni"
      />
    </main>
  )
}
