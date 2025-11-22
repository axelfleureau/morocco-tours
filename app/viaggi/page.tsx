"use client"

import Link from "next/link"
import ContactBanner from "@/components/cta/contact-banner"
import { TravelCard } from "@/components/cards/TravelCard"
import { useContent } from "@/hooks/useContent"
import { LoadingSkeleton } from "@/components/ui/loading-skeleton"
import { ErrorMessage } from "@/components/ui/error-message"
import { MapPin, Calendar, Users } from "lucide-react"

export default function ViaggiPage() {
  const { items: travels, loading, error, refetch } = useContent({ type: 'travel' })

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <ContactBanner
          title="Pianifica il tuo viaggio in Marocco"
          subtitle="Contattaci per creare il tour perfetto su misura per te."
        />
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                I Nostri Viaggi in Marocco
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
                Esplora le città imperiali, il deserto del Sahara e le meraviglie del Marocco con i nostri tour guidati
              </p>
            </header>
            <LoadingSkeleton count={6} />
          </div>
        </section>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <ContactBanner
          title="Pianifica il tuo viaggio in Marocco"
          subtitle="Contattaci per creare il tour perfetto su misura per te."
        />
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ErrorMessage error={error} retry={refetch} />
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ContactBanner
        title="Pianifica il tuo viaggio in Marocco"
        subtitle="Contattaci per creare il tour perfetto su misura per te."
      />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              I Nostri Viaggi in Marocco
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
              Esplora le città imperiali, il deserto del Sahara e le meraviglie del Marocco con i nostri tour guidati
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {travels.map((travel) => (
              <TravelCard
                key={travel.id}
                id={travel.id}
                image={travel.image || "/placeholder.svg"}
                title={travel.title}
                description={travel.description || ""}
                price={travel.price || undefined}
                duration={travel.duration || undefined}
                location={travel.category || undefined}
                badges={travel.featured ? [{ label: "In Evidenza", variant: "featured" as const }] : []}
                ctas={[
                  {
                    label: "Scopri i dettagli",
                    href: `/viaggi/${travel.slug}`,
                    variant: "secondary" as const
                  },
                  {
                    label: "Prenota ora",
                    href: "/contatti",
                    variant: "primary" as const
                  }
                ]}
              />
            ))}
          </div>

          {travels.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Nessun viaggio disponibile al momento. Torna presto per scoprire le nostre nuove offerte!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Viaggi per Categoria
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Scegli il tipo di avventura che fa per te
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Città Imperiali",
                description: "Scopri Marrakech, Fes, Meknes e Rabat",
                href: "/viaggi/citta-imperiali",
                icon: "🏛️"
              },
              {
                title: "Deserto del Sahara",
                description: "Avventure nel deserto sotto le stelle",
                href: "/viaggi/deserto",
                icon: "🏜️"
              },
              {
                title: "Costa Atlantica",
                description: "Essaouira, Agadir e le spiagge marocchine",
                href: "/viaggi/costa-atlantica",
                icon: "🌊"
              },
              {
                title: "Montagne dell'Atlante",
                description: "Trekking e villaggi berberi",
                href: "/viaggi/montagne-atlas",
                icon: "⛰️"
              }
            ].map((category, idx) => (
              <Link
                key={idx}
                href={category.href}
                className="group p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Perché Scegliere i Nostri Tour
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ogni viaggio è curato nei minimi dettagli per garantirti un'esperienza autentica e indimenticabile
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Guide Locali Certificate",
                description: "Guide esperte che parlano italiano e conoscono ogni angolo del Marocco"
              },
              {
                icon: Calendar,
                title: "Itinerari Flessibili",
                description: "Tour personalizzabili in base alle tue esigenze e interessi"
              },
              {
                icon: Users,
                title: "Gruppi Piccoli",
                description: "Massimo 8 persone per garantire un'esperienza intima e personalizzata"
              }
            ].map((feature, idx) => (
              <div key={idx} className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Pronto per la Tua Avventura in Marocco?
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Contattaci per creare il viaggio perfetto su misura per te, oppure scegli uno dei nostri tour organizzati
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/viaggi/su-misura"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-lg"
            >
              Crea il Tuo Viaggio
            </Link>
            <a
              href="https://wa.me/393292333370?text=Ciao! Vorrei informazioni sui viaggi in Marocco."
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
