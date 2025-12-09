"use client"

import { useState, useEffect, Suspense } from "react"
import { Users, Heart, Mountain, Loader2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import HeroSection from "@/components/sections/HeroSection"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import BlogTeaser from "@/components/sections/blog-teaser"
import ContactBanner from "@/components/cta/contact-banner"
import MoroccoMap from "@/components/sections/MoroccoMap"
import InstagramFeed from "@/components/InstagramFeed"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExperienceCard } from "@/components/cards/ExperienceCard"
import { TravelCard } from "@/components/cards/TravelCard"
import { getPublishedExperiences, getPublishedTravels, Experience, Travel } from "@/lib/public-data"
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { FadeInWhenVisible, BlurIn } from "@/components/ui/scroll-reveal"
import { AnimatedCard } from "@/components/ui/animated-card"

const getIconForCategory = (category?: string) => {
  switch (category?.toLowerCase()) {
    case 'adventure':
    case 'trekking':
      return Mountain
    case 'wellness':
    case 'relaxation':
      return Heart
    case 'culture':
    case 'cooking':
      return Users
    default:
      return Mountain
  }
}

const AuthenticExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const data = await getPublishedExperiences({ 
          featured: true, 
          limit: 4 
        })
        setExperiences(data)
      } catch (error) {
        console.error('Error loading experiences:', error)
      } finally {
        setLoading(false)
      }
    }

    loadExperiences()
  }, [])

  return (
    <AnimatedSection animation="fadeUp" className="py-16 lg:py-24 bg-background" data-slot="authentic-experiences">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible className="text-center mb-12 lg:mb-16">
          <BlurIn>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 lg:mb-6 text-balance">
              Esperienze Autentiche
            </h2>
          </BlurIn>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Immergiti nella cultura marocchina con le nostre esperienze uniche
          </p>
        </FadeInWhenVisible>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Caricamento esperienze...</span>
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nessuna esperienza disponibile al momento.</p>
          </div>
        ) : (
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {experiences.map((experience) => {
              const IconComponent = getIconForCategory(experience.category)
              
              return (
                <StaggerItem key={experience.id}>
                  <AnimatedCard hoverScale={1.03} hoverY={-6} glowEnabled glowColor="rgba(249, 115, 22, 0.2)">
                    <ExperienceCard
                      id={experience.id}
                      image={experience.image || `/placeholder.svg?height=200&width=300&query=${encodeURIComponent("esperienza marocco " + experience.title)}`}
                      title={experience.title}
                      description={experience.description}
                      price={experience.price}
                      duration={experience.duration || 'Durata variabile'}
                      quickInfo={[
                        {
                          icon: IconComponent,
                          label: experience.category || 'Esperienza',
                          value: experience.category || ''
                        }
                      ]}
                      ctas={[
                        { 
                          label: 'Dettagli', 
                          href: `/esperienze/${experience.id}`, 
                          variant: 'secondary' 
                        },
                        { 
                          label: 'Prenota', 
                          href: '/contatti', 
                          variant: 'primary' 
                        }
                      ]}
                    />
                  </AnimatedCard>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        )}
      </div>
    </AnimatedSection>
  )
}

const FeaturedTravels = () => {
  const [travels, setTravels] = useState<Travel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTravels = async () => {
      try {
        const data = await getPublishedTravels({ 
          featured: true, 
          limit: 6 
        })
        setTravels(data)
      } catch (error) {
        console.error('Error loading travels:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTravels()
  }, [])

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-muted/50" data-slot="featured-travels">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Caricamento viaggi...</span>
          </div>
        </div>
      </section>
    )
  }

  if (travels.length === 0) {
    return null
  }

  return (
    <AnimatedSection animation="fadeUp" className="py-16 lg:py-24 bg-muted/50" data-slot="featured-travels">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible className="text-center mb-12 lg:mb-16">
          <BlurIn>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 lg:mb-6 text-balance">
              Viaggi in Evidenza
            </h2>
          </BlurIn>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Scopri i nostri tour più popolari attraverso il Marocco
          </p>
        </FadeInWhenVisible>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.12}>
          {travels.map((travel) => {
            const highlights = travel.itinerary && Array.isArray(travel.itinerary) && travel.itinerary.length > 0 
              ? travel.itinerary.slice(0, 3).map((item, idx) => {
                  return typeof item === 'string' ? item : (item as any).title || (item as any).description || 'Giorno ' + ((item as any).day || idx + 1);
                })
              : [];
            
            return (
              <StaggerItem key={travel.id}>
                <AnimatedCard hoverScale={1.03} hoverY={-8} glowEnabled glowColor="rgba(249, 115, 22, 0.15)">
                  <TravelCard
                    id={travel.id}
                    image={travel.image || `/placeholder.svg?height=300&width=400&query=${encodeURIComponent("viaggio marocco " + travel.title)}`}
                    title={travel.title}
                    description={travel.description}
                    price={travel.price}
                    duration={travel.duration || 'Durata variabile'}
                    highlights={highlights}
                    badges={travel.category ? [{ label: travel.category.replace('-', ' '), variant: 'default' }] : []}
                    ctas={[
                      { 
                        label: 'Dettagli', 
                        href: `/viaggi/${travel.id}`, 
                        variant: 'secondary' 
                      },
                      { 
                        label: 'Prenota', 
                        href: '/contatti', 
                        variant: 'primary' 
                      }
                    ]}
                  />
                </AnimatedCard>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        <FadeInWhenVisible delay={0.4} className="text-center mt-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="touch-manipulation"
            >
              <Link href="/viaggi">Vedi Tutti i Viaggi</Link>
            </Button>
          </motion.div>
        </FadeInWhenVisible>
      </div>
    </AnimatedSection>
  )
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setTestimonials(data.testimonials || [])
      } catch (error) {
        console.error('Error loading testimonials:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  return (
    <AnimatedSection animation="fadeUp" className="py-16 lg:py-24 bg-gradient-to-b from-card to-muted" data-slot="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible className="text-center mb-12 lg:mb-16">
          <BlurIn>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 lg:mb-6 text-balance">
              Cosa Dicono i Nostri Viaggiatori
            </h2>
          </BlurIn>
          <p className="text-lg lg:text-xl text-muted-foreground text-pretty leading-relaxed">
            Testimonianze autentiche dai nostri clienti
          </p>
        </FadeInWhenVisible>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Testimonianze non disponibili al momento</p>
          </div>
        ) : (
          <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.15}>
            {testimonials.map((testimonial) => (
              <StaggerItem key={testimonial.id}>
                <AnimatedCard hoverScale={1.03} hoverY={-6}>
                  <Card className="bg-card h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <img
                          src={
                            testimonial.image ||
                            `/placeholder.svg?height=50&width=50&query=${encodeURIComponent("testimonial " + testimonial.name)}`
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
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <div key={i} className="w-5 h-5 text-yellow-400 fill-current">
                            ⭐
                          </div>
                        ))}
                      </div>

                      <p className="text-muted-foreground mb-4 italic text-pretty leading-relaxed">
                        "{testimonial.comment}"
                      </p>

                      {testimonial.service && (
                        <div className="text-sm text-primary font-semibold">{testimonial.service}</div>
                      )}
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </AnimatedSection>
  )
}

const FAQSection = () => {
  const [faqs, setFaqs] = useState<any[]>([])
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const res = await fetch('/api/faq')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setFaqs(data.faqs || [])
      } catch (error) {
        console.error('Error loading FAQs:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFAQs()
  }, [])

  return (
    <AnimatedSection animation="fadeUp" className="py-16 lg:py-24 bg-background" data-slot="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible className="text-center mb-12 lg:mb-16">
          <BlurIn>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 lg:mb-6 text-balance">
              Domande Frequenti
            </h2>
          </BlurIn>
          <p className="text-lg lg:text-xl text-muted-foreground text-pretty leading-relaxed">
            Tutto quello che devi sapere per il tuo viaggio in Marocco
          </p>
        </FadeInWhenVisible>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Domande frequenti non disponibili al momento</p>
          </div>
        ) : (
          <StaggerContainer className="space-y-4" staggerDelay={0.08}>
            {faqs.map((faq) => (
              <StaggerItem key={faq.id}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-card">
                    <button
                      onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent/10 transition-colors duration-200 min-h-[44px] touch-manipulation"
                    >
                      <span className="font-semibold text-card-foreground pr-4 text-balance">{faq.question}</span>
                      <motion.span 
                        className="text-primary text-xl"
                        animate={{ rotate: openFAQ === faq.id ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        +
                      </motion.span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFAQ === faq.id ? "auto" : 0,
                        opacity: openFAQ === faq.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <p className="text-muted-foreground leading-relaxed text-pretty">{faq.answer}</p>
                      </div>
                    </motion.div>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </AnimatedSection>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      
      {/* Instagram Section - @omarito_chill */}
      <AnimatedSection animation="fadeUp" className="py-16 lg:py-24 bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <FadeInWhenVisible className="text-center mb-12">
            <BlurIn>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Seguici su Instagram
              </h2>
            </BlurIn>
            <p className="text-lg text-muted-foreground mb-6">
              Scopri le avventure dei nostri viaggiatori in Marocco
            </p>
            <motion.a
              href="https://www.instagram.com/omarito_chill/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-full hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @omarito_chill
            </motion.a>
          </FadeInWhenVisible>

          {/* Video Grid - Dynamic Instagram feed from Firestore */}
          <InstagramFeed />
        </div>
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <WhyChooseUs />
      </AnimatedSection>
      
      <AnimatedSection animation="scale">
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
      </AnimatedSection>
      
      <AuthenticExperiences />
      <FeaturedTravels />
      <TestimonialsSection />
      <FAQSection />
      
      <AnimatedSection animation="fadeUp">
        <BlogTeaser />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <ContactBanner
          title="Pronto per la tua avventura in Marocco?"
          subtitle="Contattaci per pianificare il viaggio dei tuoi sogni"
        />
      </AnimatedSection>
    </main>
  )
}
