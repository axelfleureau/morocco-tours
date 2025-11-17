"use client"

import { useState } from "react"
import ContactBanner from "@/components/cta/contact-banner"
import { Scissors, Palette, Shield, Hand, Users, Clock, Star, Award } from "lucide-react"
import Link from "next/link"
import WishlistButton from "@/components/WishlistButton"
import BookingModal from "@/components/modals/BookingModal"

export default function ArtigianatoPage() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  const workshopData = {
    id: "artigianato-workshop",
    name: "Laboratorio Artigianato Marocchino",
    price: 45,
    duration: "2-8 ore"
  };

  return (
    <div className="min-h-screen bg-background">
      <ContactBanner
        title="Laboratori di Artigianato"
        subtitle="Ceramica, tessitura, pelle e zellige: impara con maestri artigiani. Prenota ora."
      />

      {/* Hero Image */}
      <header className="relative">
        <div className="h-[320px] sm:h-[420px] lg:h-[520px] relative overflow-hidden">
          {/* Wishlist Button */}
          <div className="absolute top-6 right-6 z-10">
            <WishlistButton
              itemId="artigianato-laboratori"
              itemType="experience"
              itemTitle="Laboratori di Artigianato"
              itemImage="/images/moroccan-souk.png"
              itemDescription="Ceramica, tessitura, pelle e zellige con maestri artigiani"
            />
          </div>
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
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">
                  Artigianato marocchino: tradizioni millenarie tra le tue mani
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  L'artigianato marocchino è patrimonio UNESCO e rappresenta secoli di sapienza tramandata di
                  generazione in generazione. I nostri laboratori ti permettono di incontrare maestri artigiani nelle
                  loro botteghe autentiche, imparare tecniche antiche e creare con le tue mani oggetti unici. Ogni
                  esperienza sostiene direttamente le comunità locali e preserva tradizioni a rischio di scomparsa.
                </p>

                {/* Crafts Grid */}
                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                  {[
                    {
                      icon: Palette,
                      title: "Ceramica & Zellige",
                      text: "Dalla lavorazione dell'argilla alla smaltatura, fino ai mosaici geometrici tradizionali",
                    },
                    {
                      icon: Scissors,
                      title: "Tessitura",
                      text: "Tappeti berberi, coperte e tessuti su telai tradizionali con lane naturali",
                    },
                    {
                      icon: Hand,
                      title: "Lavorazione pelle",
                      text: "Tecniche di concia naturale e cuciture artigianali per borse e accessori",
                    },
                    {
                      icon: Shield,
                      title: "Commercio equo",
                      text: "Compensi equi agli artigiani e filiera trasparente per un turismo responsabile",
                    },
                  ].map((craft, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-card border border-border">
                      <craft.icon className="w-8 h-8 text-amber-600 dark:text-amber-400 mb-4" />
                      <h3 className="font-bold text-lg mb-2 text-card-foreground">{craft.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{craft.text}</p>
                    </div>
                  ))}
                </div>

                {/* Workshop Types */}
                <div className="bg-gradient-to-r from-card to-muted rounded-2xl p-6 lg:p-8 mb-10">
                  <h3 className="text-2xl font-bold mb-6 text-card-foreground">Laboratori disponibili</h3>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 bg-background/50 rounded-xl">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Palette className="w-5 h-5 text-orange-600" />
                          Ceramica di Salé
                        </h4>
                        <p className="text-muted-foreground text-sm mb-2">
                          Modellazione, decorazione e cottura di ceramiche tradizionali
                        </p>
                        <div className="text-xs text-muted-foreground/70">Durata: 3-6 ore | Livello: Principiante</div>
                      </div>
                      <div className="p-4 bg-background/50 rounded-xl">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <div className="w-5 h-5 bg-green-600 rounded-sm" />
                          Zellige di Fes
                        </h4>
                        <p className="text-muted-foreground text-sm mb-2">
                          Taglio e posa dei mosaici geometrici più famosi del mondo
                        </p>
                        <div className="text-xs text-muted-foreground/70">Durata: 4-8 ore | Livello: Intermedio</div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 bg-background/50 rounded-xl">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Scissors className="w-5 h-5 text-purple-600" />
                          Tessitura berbera
                        </h4>
                        <p className="text-muted-foreground text-sm mb-2">
                          Tappeti e tessuti con simboli tradizionali dell'Alto Atlante
                        </p>
                        <div className="text-xs text-muted-foreground/70">Durata: 1-3 giorni | Livello: Tutti</div>
                      </div>
                      <div className="p-4 bg-background/50 rounded-xl">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Hand className="w-5 h-5 text-amber-600" />
                          Pelletteria di Marrakech
                        </h4>
                        <p className="text-muted-foreground text-sm mb-2">
                          Borse, cinture e accessori con tecniche di concia naturale
                        </p>
                        <div className="text-xs text-muted-foreground/70">Durata: 2-4 ore | Livello: Principiante</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Process */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Come funziona il laboratorio</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Accoglienza e presentazione</h4>
                        <p className="text-muted-foreground text-sm">
                          Incontro con il maestro artigiano, storia della tecnica e visita della bottega
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Dimostrazione pratica</h4>
                        <p className="text-muted-foreground text-sm">
                          Il maestro mostra le tecniche base e i segreti tramandati nella famiglia
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Creazione guidata</h4>
                        <p className="text-muted-foreground text-sm">
                          Realizzi il tuo oggetto con assistenza costante e consigli personalizzati
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Finalizzazione e ricordo</h4>
                        <p className="text-muted-foreground text-sm">
                          Completamento dell'opera, confezionamento e certificato di autenticità
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What's Included */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Cosa è incluso</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      "Maestro artigiano dedicato",
                      "Tutti i materiali necessari",
                      "Strumenti e attrezzature",
                      "Traduzione quando necessaria",
                      "Tè alla menta e dolci locali",
                      "Certificato di partecipazione",
                      "Confezionamento dell'opera",
                      "Trasferimenti dalla medina",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sustainability */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground flex items-center gap-2">
                    <Award className="w-6 h-6 text-green-600" />
                    Turismo sostenibile e responsabile
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    I nostri laboratori seguono principi di commercio equo e turismo responsabile:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
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
                <div className="p-6 rounded-2xl bg-gradient-to-b from-card to-muted border border-border">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-card-foreground mb-2">Prezzo indicativo</h3>
                    <div className="text-3xl font-extrabold text-primary mb-1">da €45</div>
                    <p className="text-sm text-muted-foreground">workshop introduttivo 2-3 ore</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Gruppo: 2-8 persone</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Durata: 2-8 ore</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Maestri certificati</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowBookingModal(true)}
                    className="block w-full text-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
                  >
                    Prenota / Richiedi Info
                  </button>

                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Laboratori privati e percorsi multi-giorno disponibili su richiesta.
                  </p>
                </div>

                {/* Craft Calendar */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="text-lg font-bold text-card-foreground mb-4">📅 Disponibilità</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ceramica:</span>
                      <span className="font-semibold text-green-600">Tutti i giorni</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Zellige:</span>
                      <span className="font-semibold text-orange-600">Lun-Ven</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tessitura:</span>
                      <span className="font-semibold text-purple-600">Mar-Sab</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pelletteria:</span>
                      <span className="font-semibold text-amber-600">Tutti i giorni</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground/70 mt-3">Prenotazione consigliata 48h prima</p>
                </div>

                {/* Reviews */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="text-lg font-bold text-card-foreground mb-4">Recensioni</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">4.8/5 (156 recensioni)</span>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="text-muted-foreground italic">
                        "Esperienza autentica! Il maestro ceramista era incredibilmente paziente."
                      </p>
                      <p className="text-muted-foreground/70 text-xs mt-1">- Giulia, Venezia</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground italic">
                        "Ho creato un tappeto bellissimo. Ricordo indimenticabile!"
                      </p>
                      <p className="text-muted-foreground/70 text-xs mt-1">- Roberto, Napoli</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          itemId={workshopData.id}
          itemType="experience"
          itemTitle={workshopData.name}
          basePrice={workshopData.price}
          duration={workshopData.duration}
        />
      )}
    </div>
  )
}
