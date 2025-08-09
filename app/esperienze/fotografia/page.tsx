import ContactBanner from "@/components/cta/contact-banner"
import { Camera, Sun, Map, Users, Clock, Shield, Star, Aperture } from 'lucide-react'
import Link from "next/link"

export default function FotografiaPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ContactBanner
        title="Workshop di Fotografia"
        subtitle="Dalla luce del deserto alle medine colorate: uscite fotografiche e coaching personalizzato."
      />

      {/* Hero Image */}
      <header className="relative">
        <div className="h-[320px] sm:h-[420px] lg:h-[520px] relative overflow-hidden">
          <img
            src="/images/photo-tour.png"
            alt="Workshop di Fotografia in Marocco"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">Workshop di Fotografia</h1>
            <p className="text-lg opacity-90">Cattura l'essenza del Marocco</p>
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
                  Fotografia in Marocco: raccontare storie con la luce
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                  Il Marocco offre scenari fotografici unici al mondo: dalla luce dorata del deserto del Sahara 
                  ai colori vibranti delle medine, dai ritratti berberi alle architetture islamiche. I nostri 
                  workshop fotografici sono guidati da fotografi professionisti che conoscono i luoghi migliori 
                  e i momenti perfetti per ogni scatto. Imparerai tecniche avanzate mentre esplori paesaggi 
                  mozzafiato e culture affascinanti.
                </p>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                  {[
                    { 
                      icon: Camera, 
                      title: "Coaching tecnico", 
                      text: "Esposizione, composizione, uso della luce naturale e post-produzione sul campo" 
                    },
                    { 
                      icon: Sun, 
                      title: "Golden/Blue Hour", 
                      text: "Pianificazione accurata con app specializzate e sopralluoghi per la luce perfetta" 
                    },
                    { 
                      icon: Map, 
                      title: "Location esclusive", 
                      text: "Spot selezionati per medine, deserti, montagne e costa, lontani dal turismo di massa" 
                    },
                    { 
                      icon: Users, 
                      title: "Piccoli gruppi", 
                      text: "Massimo 6 partecipanti per garantire attenzione personalizzata e feedback individuali" 
                    },
                  ].map((feature, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800">
                      <feature.icon className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{feature.text}</p>
                    </div>
                  ))}
                </div>

                {/* Workshop Types */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 lg:p-8 mb-10">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Tipologie di workshop
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Street Photography</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Medine di Marrakech e Fes, mercati, artigiani al lavoro, vita quotidiana autentica
                        </p>
                      </div>
                      <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Ritratto Culturale</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Berberi dell'Atlante, nomadi del deserto, artigiani, con rispetto e autorizzazioni
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Paesaggio</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Sahara all'alba, Atlante innevato, costa atlantica, oasi e palmeti
                        </p>
                      </div>
                      <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Architettura</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Moschee, riad, kasbe, dettagli decorativi, giochi di luce e ombra
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Equipment */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Attrezzatura consigliata</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                        <Aperture className="w-5 h-5" />
                        Obiettivi essenziali
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• Zoom universale 24-70mm f/2.8</li>
                        <li>• Teleobiettivo 70-200mm per ritratti</li>
                        <li>• Grandangolo 16-35mm per architettura</li>
                        <li>• Obiettivo fisso 50mm f/1.4 per low light</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Accessori utili</h4>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• Cavalletto in carbonio leggero</li>
                        <li>• Filtri ND e polarizzatori</li>
                        <li>• Power bank e batterie extra</li>
                        <li>• Protezioni anti-sabbia e polvere</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Techniques */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Tecniche che imparerai</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border-l-4 border-orange-500">
                      <h4 className="font-semibold text-orange-800 dark:text-orange-300">Gestione della luce</h4>
                      <p className="text-orange-700 dark:text-orange-400 text-sm">
                        Luce dura del deserto, controluce, riflessi su superfici, bilanciamento del bianco
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">Composizione avanzata</h4>
                      <p className="text-blue-700 dark:text-blue-400 text-sm">
                        Regola dei terzi, linee guida, pattern geometrici islamici, inquadrature creative
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-300">Post-produzione mobile</h4>
                      <p className="text-purple-700 dark:text-purple-400 text-sm">
                        Editing con Lightroom Mobile, condivisione social, backup cloud durante il viaggio
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ethics */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Fotografia etica e rispettosa</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Insegniamo l'importanza del rispetto culturale nella fotografia di viaggio:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Sempre chiedere il permesso per i ritratti</li>
                    <li>• Rispettare i luoghi sacri e le tradizioni locali</li>
                    <li>• Condividere le foto con i soggetti quando possibile</li>
                    <li>• Contribuire positivamente alle comunità visitate</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Pricing Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-900/40 border border-purple-200/60 dark:border-gray-800">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Prezzo indicativo</h3>
                    <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 mb-1">da €150</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">mezza giornata, mini-gruppo</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-300">Gruppo: 2-6 persone</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-300">4-8 ore di workshop</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-300">Fotografo professionista</span>
                    </div>
                  </div>

                  <Link
                    href="/contatti"
                    className="block w-full text-center px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                  >
                    Prenota / Richiedi Info
                  </Link>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 text-center">
                    Workshop privati e tour fotografici multi-giorno disponibili su richiesta.
                  </p>
                </div>

                {/* Photo Tips */}
                <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">💡 Consigli rapidi</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Golden Hour</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        30 min prima/dopo alba e tramonto per luce calda e morbida
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Blue Hour</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        20-30 min dopo tramonto per cieli drammatici e luci artificiali
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Protezione</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Usa filtri UV e copri l'attrezzatura dalla sabbia del deserto
                      </p>
                    </div>
                  </div>
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
                    <span className="text-sm text-gray-600 dark:text-gray-300">4.9/5 (73 recensioni)</span>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="text-gray-600 dark:text-gray-300 italic">
                        "Ho imparato più in un giorno che in anni di tutorial online!"
                      </p>
                      <p className="text-gray-500 text-xs mt-1">- Andrea, Milano</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-600 dark:text-gray-300 italic">
                        "Location incredibili e consigli preziosi. Portfolio trasformato!"
                      </p>
                      <p className="text-gray-500 text-xs mt-1">- Sofia, Bologna</p>
                    </div>
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
