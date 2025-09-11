import ContactBanner from "@/components/cta/contact-banner"
import { Zap, Mountain, Users, Clock, Shield, Star, MapPin, Calendar, Camera, Heart } from "lucide-react"
import Link from "next/link"

export default function QuadCammelliPage() {
  return (
    <div className="min-h-screen bg-background">
      <ContactBanner
        title="Quad e Cammelli - Avventura nel Deserto"
        subtitle="Prenota ora la tua esperienza unica tra adrenalina e tradizione nel Sahara marocchino."
      />

      {/* Hero Section */}
      <header className="relative">
        <div className="h-[400px] sm:h-[500px] lg:h-[600px] relative overflow-hidden">
          <img
            src="/images/sahara-sunset.png"
            alt="Quad e Cammelli nel deserto del Sahara"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">Quad e Cammelli</h1>
            <p className="text-xl lg:text-2xl opacity-90 text-pretty">
              Esplora le dune dorate tra adrenalina e tradizione
            </p>
            <p className="text-lg mt-4 opacity-80">Un'avventura indimenticabile nel cuore del Sahara marocchino</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Content */}
            <div className="lg:col-span-2">
              {/* Overview */}
              <div className="mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                  L'Avventura Perfetta nel Deserto
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Vivi un'esperienza unica combinando l'emozione dei quad sulle dune sabbiose con la magia di un
                  trekking in cammello al tramonto. Questa avventura ti permetterà di esplorare il deserto del Sahara da
                  due prospettive completamente diverse: l'adrenalina moderna dei quad e la tradizione millenaria dei
                  cammelli.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Le nostre guide esperte ti accompagneranno attraverso paesaggi mozzafiato, condividendo storie e
                  tradizioni berbere mentre attraversi le dune dorate di Merzouga e Erg Chebbi.
                </p>
              </div>

              {/* Two Main Activities */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Quad Adventures */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-card-foreground">Avventure in Quad</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Sfreccia sulle dune con i nostri quad di ultima generazione. Percorsi adatti a tutti i livelli,
                    dalla guida base alle acrobazie avanzate.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Quad Yamaha 350cc automatici</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Percorsi di 2-4 ore nelle dune</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Equipaggiamento di sicurezza incluso</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Istruttore qualificato</span>
                    </li>
                  </ul>
                </div>

                {/* Camel Trekking */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Mountain className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-bold text-card-foreground">Trekking in Cammello</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Immergiti nella tradizione berbera con un'esperienza autentica sui "vascelli del deserto". Perfetto
                    per il tramonto e l'alba.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full" />
                      <span>Cammelli docili e ben addestrati</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full" />
                      <span>Guide berbere esperte</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full" />
                      <span>Tè nel deserto incluso</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full" />
                      <span>Tramonto/alba sulle dune</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Sample Itinerary */}
              <div className="bg-gradient-to-r from-card to-muted rounded-2xl p-6 lg:p-8 mb-12">
                <h3 className="text-2xl font-bold mb-6 text-card-foreground">Programma Giornata Completa</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      09:00
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-1">Partenza e Briefing</h4>
                      <p className="text-muted-foreground text-sm">
                        Ritrovo al campo base, briefing sicurezza, distribuzione equipaggiamento e prime prove con i
                        quad.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      10:00
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-1">Avventura in Quad</h4>
                      <p className="text-muted-foreground text-sm">
                        3 ore di esplorazione delle dune con i quad, soste panoramiche e sessioni fotografiche.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold">
                      13:00
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-1">Pranzo Berbero</h4>
                      <p className="text-muted-foreground text-sm">
                        Pranzo tradizionale in un campo tendato con specialità locali e tè alla menta.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold">
                      16:00
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-1">Trekking in Cammello</h4>
                      <p className="text-muted-foreground text-sm">
                        2 ore di trekking al tramonto, arrivo al campo per assistere al tramonto sulle dune.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold">
                      19:00
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-1">Rientro</h4>
                      <p className="text-muted-foreground text-sm">
                        Rientro al punto di partenza con trasferimento incluso e consegna foto/video della giornata.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Cosa è incluso</h3>
                  <div className="space-y-3">
                    {[
                      "Quad Yamaha 350cc con carburante",
                      "Casco e equipaggiamento di sicurezza",
                      "Guida esperta multilingue",
                      "Trekking in cammello (2 ore)",
                      "Pranzo berbero tradizionale",
                      "Tè e dolci nel deserto",
                      "Trasferimenti da/per hotel",
                      "Foto e video della giornata",
                      "Assicurazione completa",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Non incluso</h3>
                  <div className="space-y-3">
                    {[
                      "Bevande extra durante i pasti",
                      "Mance per guide e staff",
                      "Souvenir e acquisti personali",
                      "Assicurazione medica personale",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Safety & Requirements */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-6 mb-12">
                <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <Shield className="w-5 h-5 text-yellow-600" />
                  Sicurezza e Requisiti
                </h3>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Requisiti per i Quad</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Età minima: 16 anni</li>
                      <li>• Patente di guida (anche patentino)</li>
                      <li>• Buone condizioni fisiche</li>
                      <li>• Abbigliamento adeguato</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Sicurezza Cammelli</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Adatto a tutte le età</li>
                      <li>• Cammelli docili e addestrati</li>
                      <li>• Guide esperte sempre presenti</li>
                      <li>• Primo soccorso disponibile</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Testimonials */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-foreground">Cosa Dicono i Nostri Ospiti</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">5/5</span>
                    </div>
                    <p className="text-muted-foreground italic mb-3">
                      "Un'esperienza incredibile! I quad sono stati divertentissimi e il tramonto in cammello è stato
                      magico. Le guide sono state fantastiche e molto professionali."
                    </p>
                    <p className="text-sm font-semibold text-card-foreground">- Marco, Milano</p>
                  </div>
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">5/5</span>
                    </div>
                    <p className="text-muted-foreground italic mb-3">
                      "Perfetto mix di adrenalina e cultura. I bambini si sono divertiti moltissimo con i quad e anche i
                      nonni hanno apprezzato il trekking in cammello. Consigliatissimo!"
                    </p>
                    <p className="text-sm font-semibold text-card-foreground">- Famiglia Rossi, Roma</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Pricing Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-card to-muted border border-border">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-card-foreground mb-2">Prezzo per persona</h3>
                    <div className="text-3xl font-extrabold text-primary mb-1">€120</div>
                    <p className="text-sm text-muted-foreground">Giornata completa (9 ore)</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Gruppo: 4-12 persone</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Durata: 9 ore complete</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Partenza: Merzouga</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Disponibile tutto l'anno</span>
                    </div>
                  </div>

                  <Link
                    href="/contatti"
                    className="block w-full text-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
                  >
                    Prenota Ora
                  </Link>

                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Sconto 10% per gruppi di 8+ persone. Bambini sotto 12 anni: -20%
                  </p>
                </div>

                {/* Best Time */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="text-lg font-bold text-card-foreground mb-4">Periodo Migliore</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h4 className="font-semibold mb-1 text-card-foreground">Ottobre - Aprile</h4>
                      <p className="text-muted-foreground">
                        Temperature ideali (15-25°C), cieli sereni, condizioni perfette per entrambe le attività.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-card-foreground">Maggio - Settembre</h4>
                      <p className="text-muted-foreground">
                        Più caldo (25-35°C), partenze mattutine consigliate, tramonto spettacolare.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="text-lg font-bold text-card-foreground mb-4">Informazioni</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Foto/video inclusi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Esperienza per famiglie</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Assicurazione inclusa</span>
                    </div>
                  </div>
                  <Link
                    href="https://wa.me/393292333370?text=Ciao! Vorrei informazioni su Quad e Cammelli."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-2 mt-4 rounded-xl border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium"
                  >
                    WhatsApp
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
