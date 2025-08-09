import ContactBanner from "@/components/cta/contact-banner"
import { Scissors, Palette, Shield, Hand, Users, Clock, Star, Award } from 'lucide-react'
import Link from "next/link"

export default function ArtigianatoPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ContactBanner
        title="Laboratori di Artigianato"
        subtitle="Ceramica, tessitura, pelle e zellige: impara con maestri artigiani. Prenota ora."
      />

      {/* Hero Image */}
      <header className="relative">
        <div className="h-[320px] sm:h-[420px] lg:h-[520px] relative overflow-hidden">
          <img
            src="/images/moroccan-souk.png"
            alt="Laboratori di Artigianato in Marocco"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">Laboratori di Artigianato</h1>
            <p className="text-lg opacity-90">Il sapere delle mani maestre</p>
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
                  Artigianato marocchino: tradizioni millenarie tra le tue mani
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                  L'artigianato marocchino è patrimonio UNESCO e rappresenta secoli di sapienza tramandata di 
                  generazione in generazione. I nostri laboratori ti permettono di incontrare maestri artigiani 
                  nelle loro botteghe autentiche, imparare tecniche antiche e creare con le tue mani oggetti 
                  unici. Ogni esperienza sostiene direttamente le comunità locali e preserva tradizioni a 
                  rischio di scomparsa.
                </p>

                {/* Crafts Grid */}
                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                  {[
                    { 
                      icon: Palette, 
                      title: "Ceramica & Zellige", 
                      text: "Dalla lavorazione dell'argilla alla smaltatura, fino ai mosaici geometrici tradizionali" 
                    },
                    { 
                      icon: Scissors, 
                      title: "Tessitura", 
                      text: "Tappeti berberi, coperte e tessuti su telai tradizionali con lane naturali" 
                    },
                    { 
                      icon: Hand, 
                      title: "Lavorazione pelle", 
                      text: "Tecniche di concia naturale e cuciture artigianali per borse e accessori" 
                    },
                    { 
                      icon: Shield, 
                      title: "Commercio equo", 
                      text: "Compensi equi agli artigiani e filiera trasparente per un turismo responsabile" 
                    },
                  ].map((craft, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800">
                      <craft.icon className="w-8 h-8 text-amber-600 dark:text-amber-400 mb-4" />
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{craft.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{craft.text}</p>
                    </div>
                  ))}
                </div>

                {/* Workshop Types */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 lg:p-8 mb-10">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Laboratori disponibili
                  </h3>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                          <Palette className="w-5 h-5 text-blue-600" />
                          Ceramica di Salé
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                          Modellazione, decorazione e cottura di ceramiche tradizionali
                        </p>
                        <div className="text-xs text-gray-500">Durata: 3-6 ore | Livello: Principiante</div>
                      </div>
                      <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                          <div className="w-5 h-5 bg-green-600 rounded-sm" />
                          Zellige di Fes
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                          Taglio e posa dei mosaici geometrici più famosi del mondo
                        </p>
                        <div className="text-xs text-gray-500">Durata: 4-8 ore | Livello: Intermedio</div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                          <Scissors className="w-5 h-5 text-purple-600" />
                          Tessitura berbera
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                          Tappeti e tessuti con simboli tradizionali dell'Alto Atlante
                        </p>
                        <div className="text-xs text-gray-500">Durata: 1-3 giorni | Livello: Tutti</div>
                      </div>
                      <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                          <Hand className="w-5 h-5 text-amber-600" />
                          Pelletteria di Marrakech
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                          Borse, cinture e accessori con tecniche di concia naturale
                        </p>
                        <div className="text-xs text-gray-500">Durata: 2-4 ore | Livello: Principiante</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Process */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Come funziona il laboratorio</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Accoglienza e presentazione</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Incontro con il maestro artigiano, storia della tecnica e visita della bottega
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Dimostrazione pratica</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Il maestro mostra le tecniche base e i segreti tramandati nella famiglia
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Creazione guidata</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Realizzi il tuo oggetto con assistenza costante e consigli personalizzati
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Finalizzazione e ricordo</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Completamento dell'opera, confezionamento e certificato di autenticità
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
                      "Maestro artigiano dedicato",
                      "Tutti i materiali necessari",
                      "Strumenti e attrezzature",
                      "Traduzione quando necessaria",
                      "Tè alla menta e dolci locali",
                      "Certificato di partecipazione",
                      "Confezionamento dell'opera",
                      "Trasferimenti dalla medina"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sustainability */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                    <Award className="w-6 h-6 text-green-600" />
                    Turismo sostenibile e responsabile
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    I nostri laboratori seguono principi di commercio equo e turismo responsabile:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• 70% del prezzo va direttamente agli artigiani</li>
                    <li>• Materiali locali e tecniche tradizionali</li>
                    <li>• Supporto alla preservazione delle competenze</li>
                    <li>• Piccoli gruppi per non disturbare il lavoro quotidiano</li>
                    <li>• Collaborazione con cooperative femminili</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Pricing Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-900/40 border border-amber-200/60 dark:border-gray-800">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Prezzo indicativo</h3>
                    <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mb-1">da €45</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">workshop introduttivo 2-3 ore</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-300">Gruppo: 2-8 persone</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-300">Durata: 2-8 ore</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-300">Maestri certificati</span>
                    </div>
                  </div>

                  <Link
                    href="/contatti"
                    className="block w-full text-center px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
                  >
                    Prenota / Richiedi Info
                  </Link>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 text-center">
                    Laboratori privati e percorsi multi-giorno disponibili su richiesta.
                  </p>
                </div>

                {/* Craft Calendar */}
                <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📅 Disponibilità</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Ceramica:</span>
                      <span className="font-semibold text-green-600">Tutti i giorni</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Zellige:</span>
                      <span className="font-semibold text-blue-600">Lun-Ven</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Tessitura:</span>
                      <span className="font-semibold text-purple-600">Mar-Sab</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Pelletteria:</span>
                      <span className="font-semibold text-amber-600">Tutti i giorni</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Prenotazione consigliata 48h prima</p>
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
                    <span className="text-sm text-gray-600 dark:text-gray-300">4.8/5 (156 recensioni)</span>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="text-gray-600 dark:text-gray-300 italic">
                        "Esperienza autentica! Il maestro ceramista era incredibilmente paziente."
                      </p>
                      <p className="text-gray-500 text-xs mt-1">- Giulia, Venezia</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-600 dark:text-gray-300 italic">
                        "Ho creato un tappeto bellissimo. Ricordo indimenticabile!"
                      </p>
                      <p className="text-gray-500 text-xs mt-1">- Roberto, Napoli</p>
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
