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
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

// Authentic Experiences Component
const AuthenticExperiences = () => {
  return (
    <section className="py-16 lg:py-24 bg-background" data-slot="authentic-experiences">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 lg:mb-6 text-balance">
            Esperienze Autentiche
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Immergiti nella cultura marocchina con le nostre esperienze uniche
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <Card
              key={idx}
              className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105 active:scale-95 touch-manipulation cursor-pointer"
              onTouchStart={(e) => {
                e.currentTarget.style.transform = "scale(0.98)"
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = ""
              }}
            >
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={
                    experience.image ||
                    `/placeholder.svg?height=200&width=300&query=${encodeURIComponent("esperienza marocco " + experience.title)}`
                  }
                  alt={experience.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold">
                  {experience.price}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  {experience.duration}
                </div>
              </div>

              <CardContent className="text-center bg-white dark:bg-gray-900 p-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <experience.icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-lg mb-2 text-gray-900 dark:text-gray-100">{experience.title}</CardTitle>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 text-pretty">{experience.description}</p>
                <div className="flex gap-2">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="flex-1 hover:scale-105 active:scale-95 touch-manipulation"
                  >
                    <Link href={experience.href}>Dettagli</Link>
                  </Button>
                  <Button
                    asChild
                    variant="cta"
                    size="sm"
                    className="flex-1 hover:scale-105 active:scale-95 touch-manipulation"
                  >
                    <Link href="/contatti">Prenota</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Component
const TestimonialsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-card to-muted" data-slot="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 lg:mb-6 text-balance">
            Cosa Dicono i Nostri Viaggiatori
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground text-pretty leading-relaxed">
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
            <Card
              key={idx}
              className="hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation bg-white dark:bg-gray-900"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={
                      testimonial.image ||
                      `/placeholder.svg?height=50&width=50&query=${encodeURIComponent("testimonial avatar " + testimonial.name)}`
                    }
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="w-5 h-5 text-yellow-400 fill-current">
                      ⭐
                    </div>
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4 italic text-pretty leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="text-sm text-orange-600 dark:text-orange-400 font-semibold">{testimonial.trip}</div>
              </CardContent>
            </Card>
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
    <section className="py-16 lg:py-24 bg-background" data-slot="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 lg:mb-6 text-balance">
            Domande Frequenti
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground text-pretty leading-relaxed">
            Tutto quello che devi sapere per il tuo viaggio in Marocco
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Card
              key={idx}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 touch-manipulation bg-white dark:bg-gray-900"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 min-h-[44px] touch-manipulation"
              >
                <span className="font-semibold text-gray-900 dark:text-gray-100 pr-4 text-balance">{faq.question}</span>
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
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-pretty">{faq.answer}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <WhyChooseUs />
      <PopularTrips />
      <Suspense
        fallback={
          <section className="py-16 lg:py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
