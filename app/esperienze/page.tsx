"use client";

import Link from "next/link"
import ContactBanner from "@/components/cta/contact-banner"
import { Mountain, Waves, Hammer } from "lucide-react"
import { ExperienceCard } from "@/components/cards/ExperienceCard"
import { useContent } from "@/hooks/useContent"
import { LoadingSkeleton } from "@/components/ui/loading-skeleton"
import { ErrorMessage } from "@/components/ui/error-message"
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { AnimatedCard } from "@/components/ui/animated-card"
import { FadeInWhenVisible } from "@/components/ui/scroll-reveal"

const iconMap: Record<string, any> = {
  'trekking': Mountain,
  'surf': Waves,
  'artigianato': Hammer,
};

export default function EsperienzeIndexPage() {
  const { items: experiences, loading, error, refetch } = useContent({ type: 'experience' })

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <ContactBanner
          title="Vuoi prenotare un'esperienza?"
          subtitle="Contattaci subito: progettiamo tutto su misura per te."
        />
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Esperienze Autentiche in Marocco
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
                Scegli tra attività uniche per vivere il Marocco come un locale. Ogni esperienza è guidata da esperti
                locali e progettata per offrirti momenti indimenticabili.
              </p>
            </header>
            <LoadingSkeleton count={4} />
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <ContactBanner
          title="Vuoi prenotare un'esperienza?"
          subtitle="Contattaci subito: progettiamo tutto su misura per te."
        />
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ErrorMessage error={error} retry={refetch} />
          </div>
        </section>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ContactBanner
        title="Vuoi prenotare un'esperienza?"
        subtitle="Contattaci subito: progettiamo tutto su misura per te."
      />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <header className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Esperienze Autentiche in Marocco
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
                Scegli tra attività uniche per vivere il Marocco come un locale. Ogni esperienza è guidata da esperti
                locali e progettata per offrirti momenti indimenticabili.
              </p>
            </header>
          </FadeInWhenVisible>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {experiences.map((exp) => {
              const IconComponent = iconMap[exp.slug] || Mountain;
              
              return (
                <StaggerItem key={exp.id}>
                  <AnimatedCard hoverScale={1.02} hoverY={-8}>
                    <ExperienceCard
                      id={exp.id || exp.slug}
                      image={exp.image || "/placeholder.svg?height=400&width=600"}
                      title={exp.title}
                      description={exp.description || undefined}
                      price={exp.price || undefined}
                      duration={exp.duration || 'Varia'}
                      quickInfo={[
                        {
                          icon: IconComponent,
                          label: exp.category || 'Esperienza',
                          value: exp.category || ''
                        }
                      ]}
                      ctas={[
                        { 
                          label: 'Scopri i dettagli', 
                          href: `/esperienze/${exp.slug}`, 
                          variant: 'secondary' 
                        },
                        { 
                          label: 'Prenota ora', 
                          href: '/contatti', 
                          variant: 'primary' 
                        }
                      ]}
                    />
                  </AnimatedCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Choose Our Experiences */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Perché Scegliere le Nostre Esperienze
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Ogni esperienza è curata nei minimi dettagli per garantirti autenticità e sicurezza
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Guide Locali Esperte",
                description: "Accompagnatori certificati che conoscono ogni segreto del territorio",
                icon: "👨‍🏫",
              },
              {
                title: "Piccoli Gruppi",
                description: "Massimo 8 persone per garantire un'esperienza personalizzata",
                icon: "👥",
              },
              {
                title: "Assistenza 24/7",
                description: "Supporto continuo durante tutta l'esperienza via WhatsApp",
                icon: "📞",
              },
            ].map((feature, idx) => (
              <StaggerItem key={idx}>
                <AnimatedCard hoverScale={1.03} hoverY={-6}>
                  <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg h-full">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Pronto per la Tua Prossima Avventura?
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Contattaci per personalizzare la tua esperienza o per ricevere consigli sui migliori periodi per ogni
            attività.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contatti"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-lg"
            >
              Pianifica la Tua Esperienza
            </Link>
            <a
              href="https://wa.me/393292333370?text=Ciao! Vorrei informazioni sulle esperienze in Marocco."
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 font-semibold text-lg"
            >
              Scrivici su WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
