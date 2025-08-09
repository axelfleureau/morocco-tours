import ContactBanner from "@/components/cta/contact-banner"
import { Mountain, Map, Compass, Sun, Users, Clock, Shield, Star } from 'lucide-react'
import Link from "next/link"

export default function TrekkingAtlantePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ContactBanner
        title="Trekking nell'Alto Atlante"
        subtitle="Prenota subito una consulenza gratuita: itinerari su misura con guide locali certificate."
      />

      {/* Hero Image */}
      <header className="relative">
        <div className="h-[320px] sm:h-[420px] lg:h-[520px] relative overflow-hidden">
          <img
            src="/images/atlas-mountains.png"
            alt="Trekking nell'Alto Atlante"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">Trekking nell'Alto Atlante</h1>
            <p className="text-lg opacity-90">Tra villaggi berberi e vette maestose</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  Scopri l'Alto Atlante: tra villaggi berberi e valli alpine
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                  L'Alto Atlante marocchino offre alcuni dei paesaggi più spettacolari del Nord Africa. I nostri trekking 
                  ti porteranno attraverso valli verdeggianti, villaggi berberi autentici e sentieri che si snodano tra 
                  vette che superano i 4.000 metri. Ogni percorso è adatto a diversi livelli di esperienza, dalle 
                  passeggiate giornaliere ai trekking di più giorni con pernottamento in rifugi tradizionali.
                </p>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                  {[
                    { 
                      icon: Mountain, 
                      title: "Livelli per tutti", 
                      text: "Da principianti ad esperti, itinerari personalizzati in base alla tua preparazione fisica" 
                    },
                    { 
                      icon: Map, 
                      title: "Guide certificate", 
                      text: "Guide UIAGM e accompagnatori berberi locali con esperienza pluriennale" 
                    },
                    { 
                      icon: Sun, 
                      title: "Stagioni ideali", 
                      text: "Primavera (marzo-maggio) e autunno (settembre-novembre) con clima perfetto" 
                    },
                    { 
                      icon: Compass, 
                      title: "Destinazioni iconiche", 
                      text: "Imlil, Toubkal, Valle Ourika, Ait Bouguemez e sentieri nascosti" 
                    },
                  ].map((feature, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800">
                      <feature.icon className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-4" />
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{feature.text}</p>
                    </div>
                  ))}
                </div>

                {/* Sample Itinerary */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 lg:p-8 mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    Programma suggerito 3 giorni - Circuito Imlil
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Marrakech → Imlil → Aroumd</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Partenza da Marrakech, arrivo a Imlil (1.740m). Trekking verso il villaggio di Aroumd, 
                          pranzo con famiglia berbera, pernottamento in guesthouse tradizionale.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Ascesa verso Tizi n'Tamatert</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Trekking verso il passo Tizi n'Tamatert (2.279m), panorami mozzafiato sulla valle Imnane, 
                          discesa ad Ait Souka, pernottamento in rifugio.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Villaggi berberi e rientro</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Circuito nei villaggi berberi, visita a un laboratorio di pane tradizionale, 
                          rientro a Marrakech nel pomeriggio.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What's Included */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Cosa è incluso</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      "Guida certificata di montagna",
                      "Mulattiere per il trasporto bagagli",
                      "Pernottamenti in rifugi/guesthouse",
                      "Tutti i pasti durante il trekking",
                      "Trasferimenti privati da/per Marrakech",
                      "Assicurazione locale e assistenza 24/7",
                      "Attrezzatura di sicurezza",
                      "Permessi e tasse locali"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipment List */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Equipaggiamento consigliato</h3>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Abbigliamento</h4>
                        <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                          <li>• Scarponi da trekking</li>
                          <li>• Abbigliamento a strati</li>
                          <li>• Giacca impermeabile</li>
                          <li>• Cappello e occhiali da sole</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Attrezzatura</h4>
                        <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                          <li>• Zaino da trekking (30-40L)</li>
                          <li>• Sacco a pelo (fornito)</li>
                          <li>• Borraccia e purificatore</li>
                          <li>• Kit di primo soccorso</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Pricing Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-900/40 border border-orange-200/60 dark:border-gray-800">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Prezzo indicativo</h3>
                    <div className="text-3xl font-extrabold text-orange-600 dark:text-orange-400 mb-1">da €180</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">per persona, gruppo 4+, 3 giorni</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-300">Gruppo: 2-8 persone</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-300">Durata: 3-7 giorni</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-300">Assicurazione inclusa</span>
                    </div>
                  </div>

                  <Link
                    href="/contatti"
                    className="block w-full text-center px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                  >
                    Prenota / Richiedi Info
                  </Link>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 text-center">
                    Il prezzo varia in base a stagione, numero partecipanti e servizi aggiuntivi.
                  </p>
                </div>

                {/* Reviews */}
                <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recensioni</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">4.9/5 (127 recensioni)</span>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="text-gray-600 dark:text-gray-300 italic">
                        "Esperienza incredibile! La guida Hassan ci ha fatto scoprire luoghi magici."
                      </p>
                      <p className="text-gray-500 text-xs mt-1">- Marco, Milano</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-600 dark:text-gray-300 italic">
                        "Organizzazione perfetta, paesaggi mozzafiato. Consigliatissimo!"
                      </p>
                      <p className="text-gray-500 text-xs mt-1">- Sarah, Roma</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200/60 dark:border-gray-800">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Hai domande?</h3>
                  <div className="space-y-3 text-sm">
                    <a href="tel:+393292333370" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-orange-600">
                      📞 +39 329 233 3370
                    </a>
                    <a href="mailto:info@moroccodreams.it" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-orange-600">
                      ✉️ info@moroccodreams.it
                    </a>
                    <a href="https://wa.me/393292333370" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600">
                      💬 WhatsApp 24/7
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
