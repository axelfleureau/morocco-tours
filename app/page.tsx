"use client"

import { useState, Suspense } from "react"
import { Users, Heart, Mountain } from "lucide-react"
import Link from "next/link"
import HeroSection from "@/components/sections/HeroSection"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
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
              icon: Mountain,
              title: "Quad e Cammelli",
              description: "L'avventura perfetta nel deserto di Agafay",
              price: "€50",
              image: "/images/sahara-sunset.png",
              duration: "4 ore",
              href: "/esperienze/quad-cammelli",
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
                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm text-card-foreground px-3 py-1 rounded-full text-sm font-bold">
                  {experience.price}
                </div>
                <div className="absolute bottom-4 left-4 bg-foreground/50 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-sm">
                  {experience.duration}
                </div>
              </div>

              <CardContent className="text-center bg-card p-6">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <experience.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg mb-2 text-card-foreground">{experience.title}</CardTitle>
                <p className="text-muted-foreground text-sm mb-4 text-pretty">{experience.description}</p>
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
              className="hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation bg-card"
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
                    <h4 className="font-bold text-card-foreground">{testimonial.name}</h4>
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

                <p className="text-muted-foreground mb-4 italic text-pretty leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="text-sm text-primary font-semibold">{testimonial.trip}</div>
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
              className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 touch-manipulation bg-card"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent/10 transition-colors duration-200 min-h-[44px] touch-manipulation"
              >
                <span className="font-semibold text-card-foreground pr-4 text-balance">{faq.question}</span>
                {openFAQ === idx ? (
                  <span className="text-primary text-xl">−</span>
                ) : (
                  <span className="text-primary text-xl">+</span>
                )}
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openFAQ === idx ? "max-h-96 pb-4" : "max-h-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed text-pretty">{faq.answer}</p>
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
      
      {/* Instagram Section - @omarito_chill */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Seguici su Instagram
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Scopri le avventure dei nostri viaggiatori in Marocco
            </p>
            <a
              href="https://www.instagram.com/omarito_chill/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-full hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @omarito_chill
            </a>
          </div>

          {/* Video Grid - 3 Instagram video embeds */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Video 1 - Replace data-instgrm-permalink with your @omarito_chill post URL */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <blockquote 
                className="instagram-media" 
                data-instgrm-permalink="https://www.instagram.com/reel/EXAMPLE1/?utm_source=ig_embed&amp;utm_campaign=loading" 
                data-instgrm-version="14"
                style={{
                  background: '#FFF',
                  border: 0,
                  borderRadius: '3px',
                  boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                  margin: '1px',
                  maxWidth: '100%',
                  minWidth: '326px',
                  padding: 0,
                  width: 'calc(100% - 2px)'
                }}
              >
                <div style={{ padding: '16px' }}>
                  <a 
                    href="https://www.instagram.com/reel/EXAMPLE1/?utm_source=ig_embed&amp;utm_campaign=loading" 
                    style={{
                      background: '#FFFFFF',
                      lineHeight: 0,
                      padding: '0 0',
                      textAlign: 'center',
                      textDecoration: 'none',
                      width: '100%'
                    }} 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View this post on Instagram
                  </a>
                </div>
              </blockquote>
            </div>

            {/* Video 2 - Replace data-instgrm-permalink with your @omarito_chill post URL */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <blockquote 
                className="instagram-media" 
                data-instgrm-permalink="https://www.instagram.com/reel/EXAMPLE2/?utm_source=ig_embed&amp;utm_campaign=loading" 
                data-instgrm-version="14"
                style={{
                  background: '#FFF',
                  border: 0,
                  borderRadius: '3px',
                  boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                  margin: '1px',
                  maxWidth: '100%',
                  minWidth: '326px',
                  padding: 0,
                  width: 'calc(100% - 2px)'
                }}
              >
                <div style={{ padding: '16px' }}>
                  <a 
                    href="https://www.instagram.com/reel/EXAMPLE2/?utm_source=ig_embed&amp;utm_campaign=loading" 
                    style={{
                      background: '#FFFFFF',
                      lineHeight: 0,
                      padding: '0 0',
                      textAlign: 'center',
                      textDecoration: 'none',
                      width: '100%'
                    }} 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View this post on Instagram
                  </a>
                </div>
              </blockquote>
            </div>

            {/* Video 3 - Replace data-instgrm-permalink with your @omarito_chill post URL */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <blockquote 
                className="instagram-media" 
                data-instgrm-permalink="https://www.instagram.com/reel/EXAMPLE3/?utm_source=ig_embed&amp;utm_campaign=loading" 
                data-instgrm-version="14"
                style={{
                  background: '#FFF',
                  border: 0,
                  borderRadius: '3px',
                  boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                  margin: '1px',
                  maxWidth: '100%',
                  minWidth: '326px',
                  padding: 0,
                  width: 'calc(100% - 2px)'
                }}
              >
                <div style={{ padding: '16px' }}>
                  <a 
                    href="https://www.instagram.com/reel/EXAMPLE3/?utm_source=ig_embed&amp;utm_campaign=loading" 
                    style={{
                      background: '#FFFFFF',
                      lineHeight: 0,
                      padding: '0 0',
                      textAlign: 'center',
                      textDecoration: 'none',
                      width: '100%'
                    }} 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View this post on Instagram
                  </a>
                </div>
              </blockquote>
            </div>
          </div>
          
          {/* Instagram Embed Script - Loads all Instagram embeds on the page */}
          <script async src="//www.instagram.com/embed.js"></script>

          {/* Note per developer */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-lg">
            <p className="text-sm text-blue-900 dark:text-blue-100 font-semibold mb-3">
              🎬 <strong>Come aggiungere i tuoi video Instagram:</strong>
            </p>
            <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-2 list-decimal list-inside">
              <li>Vai su <a href="https://www.instagram.com/omarito_chill/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">instagram.com/omarito_chill</a></li>
              <li>Scegli 3 post/reel da mostrare (es: deserto, città, costa)</li>
              <li>Per ogni post: apri il post → click "..." in alto → seleziona "Incorpora" (o "Embed")</li>
              <li>Copia l'URL del post (es: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">https://www.instagram.com/p/ABC123/</code>)</li>
              <li>In questo file (<code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">app/page.tsx</code>), sostituisci <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">EXAMPLE1</code>, <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">EXAMPLE2</code>, <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">EXAMPLE3</code> con i tuoi URL reali</li>
              <li>Lo script Instagram caricherà automaticamente i video! 🎉</li>
            </ol>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-3 italic">
              Cerca "EXAMPLE1" in questo file e sostituisci con l'URL del tuo primo post, poi ripeti per EXAMPLE2 e EXAMPLE3.
            </p>
          </div>
        </div>
      </section>
      
      <WhyChooseUs />
      {/* PopularTrips temporaneamente disabilitato - riattivare quando ci saranno viaggi pubblicati */}
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
