"use client";

import { useState, useEffect } from 'react';
import Link from "next/link"
import ContactBanner from "@/components/cta/contact-banner"
import { Mountain, Waves, Hammer, Loader2 } from "lucide-react"
import { firestoreService } from "@/lib/firestore"
import { ExperienceCard } from "@/components/cards/ExperienceCard"

const iconMap: Record<string, any> = {
  'trekking': Mountain,
  'surf': Waves,
  'artigianato': Hammer,
};

export default function EsperienzeIndexPage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const data = await firestoreService.getPublishedExperiences();
        setExperiences(data);
      } catch (error) {
        console.error('Error loading experiences:', error);
      } finally {
        setLoading(false);
      }
    };

    loadExperiences();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Caricamento esperienze...</p>
        </div>
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
          <header className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Esperienze Autentiche in Marocco
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
              Scegli tra attività uniche per vivere il Marocco come un locale. Ogni esperienza è guidata da esperti
              locali e progettata per offrirti momenti indimenticabili.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {experiences.map((exp) => {
              const IconComponent = iconMap[exp.slug] || Mountain;
              
              return (
                <ExperienceCard
                  key={exp.id}
                  id={exp.id || exp.slug}
                  image={exp.images?.[0] || exp.image || "/placeholder.svg?height=400&width=600"}
                  title={exp.title}
                  description={exp.description}
                  price={exp.price}
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Our Experiences */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Perché Scegliere le Nostre Esperienze
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ogni esperienza è curata nei minimi dettagli per garantirti autenticità e sicurezza
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
              <div key={idx} className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <div className="text-4xl mb-4">{feature.icon}</div>
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
