import Link from "next/link"
import ContactBanner from "@/components/cta/contact-banner"
import { Mountain, Waves, Hammer } from "lucide-react"

const experiences = [
  {
    slug: "trekking",
    title: "Trekking Atlante",
    icon: Mountain,
    excerpt: "Attraversa villaggi berberi e valli mozzafiato nel cuore dell'Alto Atlante con guide locali esperte.",
    image: "/images/atlas-mountains.png",
    price: "da €180",
    duration: "3-7 giorni",
  },
  {
    slug: "surf",
    title: "Surf",
    icon: Waves,
    excerpt: "Surf camp e lezioni sulla costa atlantica: onde consistenti e atmosfera rilassata.",
    image: "/images/essaouira-coast.png",
    price: "da €220",
    duration: "4-7 giorni",
  },
  {
    slug: "artigianato",
    title: "Artigianato",
    icon: Hammer,
    excerpt: "Laboratori con maestri artigiani: ceramica, tessitura, pelle e zellige per vivere la tradizione.",
    image: "/images/moroccan-souk.png",
    price: "da €45",
    duration: "2-8 ore",
  },
]

export default function EsperienzeIndexPage() {
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
            {experiences.map((exp) => (
              <article
                key={exp.slug}
                className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/60 dark:border-gray-800"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={exp.image || "/placeholder.svg?height=400&width=600"}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-gray-900">{exp.price}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm text-white">{exp.duration}</span>
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                      <exp.icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{exp.title}</h2>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{exp.excerpt}</p>

                  <div className="flex gap-3">
                    <Link
                      href={`/esperienze/${exp.slug}`}
                      className="flex-1 inline-flex justify-center items-center px-5 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      Scopri i dettagli
                    </Link>
                    <Link
                      href="/contatti"
                      className="flex-1 inline-flex justify-center items-center px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                    >
                      Prenota ora
                    </Link>
                  </div>
                </div>
              </article>
            ))}
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
