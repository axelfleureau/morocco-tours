import ContactBanner from "@/components/cta/contact-banner"
import { Waves, Wind, Sun, Compass, Users, Clock, Shield, Star } from 'lucide-react'
import Link from "next/link"

export default function SurfEssaouiraPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ContactBanner
        title="Surf a Essaouira"
        subtitle="Lezioni e coaching per tutti i livelli. Prenota ora la tua esperienza sulla costa atlantica."
      />

      {/* Hero Image */}
      <header className="relative">
        <div className="h-[320px] sm:h-[420px] lg:h-[520px] relative overflow-hidden">
          <img
            src="/images/essaouira-coast.png"
            alt="Surf a Essaouira"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">Surf a Essaouira</h1>
            <p className="text-lg opacity-90">Onde perfette e vibe boho-chic</p>
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
                  Essaouira: il paradiso del surf marocchino
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                  Essaouira è considerata la capitale del surf del Marocco, grazie alle sue onde costanti, 
                  ai venti alisei e all'atmosfera rilassata che caratterizza questa città patrimonio UNESCO. 
                  Le nostre scuole partner offrono lezioni per tutti i livelli, dal principiante assoluto 
                  al surfista esperto che vuole perfezionare la tecnica. Gli spot variano dalle onde dolci 
                  per principianti alle reef break più impegnative.
                </p>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                  {[
                    { 
                      icon: Waves, 
                      title: "Spot leggendari", 
                      text: "Essaouira Bay, Sidi Kaouki, Moulay Bouzerktoun e spot segreti accessibili solo con le guide" 
                    },
                    { 
                      icon: Wind, 
                      title: "Venti costanti", 
                      text: "Aprile-Settembre con alisei perfetti per surf e windsurf, condizioni ideali tutto l'anno" 
                    },
                    { 
                      icon: Sun, 
                      title: "Stagione onde", 
                      text: "Ottobre-Marzo per swell atlantici più consistenti, Aprile-Settembre per principianti" 
                    },
                    { 
                      icon: Compass, 
                      title: "Tutti i livelli", 
                      text: "Dalle prime onde in schiuma bianca al perfezionamento su reef break impegnative" 
                    },
                  ].map((feature, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800">
                      <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{feature.text}</p>
                    </div>
                  ))}
                </div>

                {/* Sample Program */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 lg:p-8 mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    Programma surf camp 5 giorni
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Arrivo e prime onde</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Check-in, briefing sicurezza, prima lezione in spiaggia con tavole soft, 
                          teoria delle onde e posizionamento.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2-3</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Tecnica e progressione</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Lezioni mattutine (2h), analisi video, pomeriggi liberi per praticare, 
                          introduzione al lineup e alle priorità.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4-5</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Spot avanzati e cultura</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Esplorazione spot diversi, sessioni autonome supervisionate, 
                          visita della medina e workshop di artigianato locale.
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
                      "Istruttore ISA certificato",
                      "Tavole e mute per tutta la durata",
                      "Trasferimenti agli spot",
                      "Analisi video delle sessioni",
                      "Alloggio in surf house/riad",
                      "Colazione e cena",
                      "Assicurazione e assistenza medica",
                      "Certificato di partecipazione"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Levels */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Livelli e progressione</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-800 dark:text-green-300">Principiante</h4>
                      <p className="text-green-700 dark:text-green-400 text-sm">
                        Prime onde in schiuma, equilibrio sulla tavola, remata e alzata di base
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">Intermedio</h4>
                      <p className="text-blue-700 dark:text-blue-400 text-sm">
                        Onde non frangenti, curve di base, lettura delle onde e posizionamento
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-300">Avanzato</h4>
                      <p className="text-purple-700 dark:text-purple-400 text-sm">
                        Manovre avanzate, tube riding, spot impegnativi e coaching personalizzato
                      </p>
                    </div>
                  </div>
                </div>

                {/* Best Time */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Quando andare</h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Ottobre - Marzo</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Swell atlantici più consistenti, onde 1-3m, acqua 18-20°C, 
                        ideale per intermedi/avanzati
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Aprile - Settembre</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Onde più piccole e costanti, acqua 20-22°C, venti per windsurf, 
                        perfetto per principianti
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Pricing Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-900/40 border border-blue-200/60 dark:border-gray-800">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Prezzo indicativo</h3>
                    <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-1">da €220</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">5 giorni surf camp completo</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-300">Gruppo: 4-8 persone</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-300">2h lezione al giorno</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-300">Istruttori certificati ISA</span>
                    </div>
                  </div>

                  <Link
                    href="/contatti"
                    className="block w-full text-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                  >
                    Prenota / Richiedi Info
                  </Link>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 text-center">
                    Lezioni singole da €35. Noleggio attrezzatura disponibile.
                  </p>
                </div>

                {/* Weather Info */}
                <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Condizioni attuali</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Altezza onde:</span>
                      <span className="font-semibold text-blue-600">1.2 - 1.8m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Vento:</span>
                      <span className="font-semibold text-green-600">15-20 knots NW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Temp. acqua:</span>
                      <span className="font-semibold text-blue-600">19°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Condizioni:</span>
                      <span className="font-semibold text-green-600">Ottime</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Aggiornato oggi alle 14:00</p>
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
                    <span className="text-sm text-gray-600 dark:text-gray-300">4.8/5 (94 recensioni)</span>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="text-gray-600 dark:text-gray-300 italic">
                        "Istruttori fantastici, ho imparato a surfare in 3 giorni!"
                      </p>
                      <p className="text-gray-500 text-xs mt-1">- Luca, Torino</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-600 dark:text-gray-300 italic">
                        "Spot incredibili e atmosfera rilassata. Tornerò sicuramente!"
                      </p>
                      <p className="text-gray-500 text-xs mt-1">- Emma, Firenze</p>
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
