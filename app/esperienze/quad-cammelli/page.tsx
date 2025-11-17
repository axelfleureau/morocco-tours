"use client"

import { useState } from "react"
import { Zap, Mountain, Users, Clock, Star, MapPin, MessageCircle, Check, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import ContactBanner from "@/components/cta/contact-banner"
import WishlistButton from "@/components/WishlistButton"

export default function QuadCammelliPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numPeople: "1",
    vehicleType: "quad" as "quad" | "buggy" | "motocross" | "cammelli" | "mixed",
    duration: "2h" as "2h" | "4h" | "fullday",
    preferredTime: "sunset" as "sunset" | "sunrise" | "morning" | "afternoon",
    notes: "",
    extras: {
      panoramicDinner: false,
      sandboarding: false,
      stargazing: false,
      photography: false,
    }
  })

  const vehicleTypes = [
    { id: "quad", name: "Quad", description: "Yamaha 350cc automatici" },
    { id: "buggy", name: "Buggy", description: "2 posti, ideale per coppie" },
    { id: "motocross", name: "Motocross", description: "Per esperti, adrenalina pura" },
    { id: "cammelli", name: "Cammelli", description: "Tradizione berbera autentica" },
    { id: "mixed", name: "Mix Completo", description: "Quad + Cammelli combinati" },
  ]

  const handleWhatsappBooking = () => {
    const vehicleTypeName = vehicleTypes.find(t => t.id === formData.vehicleType)?.name || ""
    const durationText = formData.duration === "2h" ? "2 ore" : formData.duration === "4h" ? "4 ore" : "Giornata intera"
    const timeText = formData.preferredTime === "sunset" ? "Tramonto" : formData.preferredTime === "sunrise" ? "Alba" : formData.preferredTime === "morning" ? "Mattina" : "Pomeriggio"
    
    const extras = []
    if (formData.extras.panoramicDinner) extras.push("Cena panoramica mozzafiato")
    if (formData.extras.sandboarding) extras.push("Sandboarding")
    if (formData.extras.stargazing) extras.push("Osservazione stelle")
    if (formData.extras.photography) extras.push("Servizio fotografico professionale")
    
    let message = `🏜️ *PRENOTAZIONE QUAD & CAMMELLI DESERTO*\n\n`
    message += `👤 *Nome:* ${formData.name}\n`
    message += `📧 *Email:* ${formData.email}\n`
    message += `📱 *Telefono:* ${formData.phone}\n\n`
    message += `👥 *Numero partecipanti:* ${formData.numPeople}\n`
    message += `🏍️ *Tipo veicolo:* ${vehicleTypeName}\n`
    message += `⏱️ *Durata:* ${durationText}\n`
    message += `🌅 *Orario preferito:* ${timeText}\n`
    
    if (extras.length > 0) {
      message += `\n✨ *Servizi extra:*\n${extras.map(e => `• ${e}`).join('\n')}\n`
    }
    
    if (formData.notes) {
      message += `\n💬 *Note:* ${formData.notes}`
    }

    const whatsappUrl = `https://wa.me/393292333370?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-background">
      <ContactBanner
        title="Quad e Cammelli - Avventura nel Deserto"
        subtitle="Prenota ora la tua esperienza unica tra adrenalina e tradizione nel Sahara marocchino."
      />

      <header className="relative">
        <div className="h-[400px] sm:h-[500px] lg:h-[600px] relative overflow-hidden">
          {/* Wishlist Button */}
          <div className="absolute top-6 right-6 z-10">
            <WishlistButton
              itemId="quad-cammelli-deserto"
              itemType="experience"
              itemTitle="Quad e Cammelli nel Deserto"
              itemImage="/images/sahara-sunset.png"
              itemDescription="Esplora le dune dorate tra adrenalina e tradizione"
            />
          </div>
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
          </div>
        </div>
      </header>

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                  L'Avventura Perfetta nel Deserto
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Vivi un'esperienza unica combinando l'emozione dei quad sulle dune sabbiose con la magia di un
                  trekking in cammello al tramonto. Questa avventura ti permetterà di esplorare il deserto del Sahara da
                  due prospettive completamente diverse: l'adrenalina moderna e la tradizione millenaria.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-card-foreground">Avventure in Quad</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Sfreccia sulle dune con quad, buggy o motocross. Percorsi adatti a tutti i livelli di esperienza.
                  </p>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Quad Yamaha 350cc automatici",
                      "Buggy biposto per coppie",
                      "Motocross per esperti",
                      "Equipaggiamento di sicurezza",
                      "Istruttore qualificato"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Mountain className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-bold text-card-foreground">Trekking in Cammello</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Immergiti nella tradizione berbera con un'esperienza autentica sui "vascelli del deserto".
                  </p>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Cammelli docili e addestrati",
                      "Guide berbere esperte",
                      "Tramonti spettacolari",
                      "Fotografie memorabili",
                      "Tè nel deserto"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-2xl p-6 lg:p-8 border border-border mb-12">
                <h3 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <Star className="w-6 h-6 text-orange-600" />
                  Cosa Include
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Guida esperta parlante italiano",
                    "Equipaggiamento di sicurezza completo",
                    "Acqua e snack durante il tour",
                    "Assicurazione RC inclusa",
                    "Pick-up dal tuo riad/hotel",
                    "Foto ricordo professionali",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 rounded-2xl p-6 lg:p-8 border border-border">
                <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                  <Utensils className="w-6 h-6 text-orange-600" />
                  Cena Panoramica Opzionale
                </h3>
                <p className="text-muted-foreground mb-4">
                  Aggiungi una cena berbera tradizionale con vista mozzafiato sulle dune al tramonto. 
                  Tajine, couscous, pane fresco e tè alla menta serviti in un campo tendato autentico 
                  con musica tradizionale e cielo stellato.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <span className="text-muted-foreground">Location esclusiva tra le dune di Merzouga</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-6 text-foreground">Prenota la Tua Avventura</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="name">Nome e Cognome *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Mario Rossi"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="mario@email.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Telefono *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+39 123 456 7890"
                      />
                    </div>

                    <div>
                      <Label htmlFor="numPeople">Numero Partecipanti</Label>
                      <Input
                        id="numPeople"
                        type="number"
                        min="1"
                        value={formData.numPeople}
                        onChange={(e) => setFormData({ ...formData, numPeople: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label className="mb-3 block">Tipo di Veicolo/Esperienza *</Label>
                      <RadioGroup
                        value={formData.vehicleType}
                        onValueChange={(value: string) => setFormData({ ...formData, vehicleType: value as "quad" | "buggy" | "motocross" | "cammelli" | "mixed" })}
                      >
                        {vehicleTypes.map((type) => (
                          <div key={type.id} className="flex items-start space-x-3 mb-3">
                            <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor={type.id} className="cursor-pointer font-medium">
                                {type.name}
                              </Label>
                              <p className="text-xs text-muted-foreground">{type.description}</p>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="mb-3 block">Durata</Label>
                      <RadioGroup
                        value={formData.duration}
                        onValueChange={(value: string) => setFormData({ ...formData, duration: value as "2h" | "4h" | "fullday" })}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2h" id="2h" />
                          <Label htmlFor="2h" className="cursor-pointer">2 ore</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="4h" id="4h" />
                          <Label htmlFor="4h" className="cursor-pointer">4 ore</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fullday" id="fullday" />
                          <Label htmlFor="fullday" className="cursor-pointer">Giornata intera</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="mb-3 block">Orario Preferito</Label>
                      <RadioGroup
                        value={formData.preferredTime}
                        onValueChange={(value: string) => setFormData({ ...formData, preferredTime: value as "sunset" | "sunrise" | "morning" | "afternoon" })}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sunset" id="sunset" />
                          <Label htmlFor="sunset" className="cursor-pointer">Tramonto (consigliato)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sunrise" id="sunrise" />
                          <Label htmlFor="sunrise" className="cursor-pointer">Alba</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="morning" id="morning" />
                          <Label htmlFor="morning" className="cursor-pointer">Mattina</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="afternoon" id="afternoon" />
                          <Label htmlFor="afternoon" className="cursor-pointer">Pomeriggio</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="mb-3 block">Servizi Extra</Label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="panoramicDinner"
                            checked={formData.extras.panoramicDinner}
                            onCheckedChange={(checked: boolean) =>
                              setFormData({
                                ...formData,
                                extras: { ...formData.extras, panoramicDinner: checked }
                              })
                            }
                          />
                          <Label htmlFor="panoramicDinner" className="cursor-pointer text-sm">
                            🍽️ Cena panoramica con vista mozzafiato sulle dune
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="sandboarding"
                            checked={formData.extras.sandboarding}
                            onCheckedChange={(checked: boolean) =>
                              setFormData({
                                ...formData,
                                extras: { ...formData.extras, sandboarding: checked }
                              })
                            }
                          />
                          <Label htmlFor="sandboarding" className="cursor-pointer text-sm">
                            🏄 Sandboarding sulle dune
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="stargazing"
                            checked={formData.extras.stargazing}
                            onCheckedChange={(checked: boolean) =>
                              setFormData({
                                ...formData,
                                extras: { ...formData.extras, stargazing: checked }
                              })
                            }
                          />
                          <Label htmlFor="stargazing" className="cursor-pointer text-sm">
                            ⭐ Osservazione stelle con guida astronomo
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="photography"
                            checked={formData.extras.photography}
                            onCheckedChange={(checked: boolean) =>
                              setFormData({
                                ...formData,
                                extras: { ...formData.extras, photography: checked }
                              })
                            }
                          />
                          <Label htmlFor="photography" className="cursor-pointer text-sm">
                            📸 Servizio fotografico professionale
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes">Note Aggiuntive</Label>
                      <textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Esperienza di guida, esigenze particolari, allergie alimentari..."
                        className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                      />
                    </div>

                    <Button
                      onClick={handleWhatsappBooking}
                      className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                      size="lg"
                      disabled={!formData.name || !formData.email || !formData.phone}
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Prenota su WhatsApp
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Ti risponderemo entro 24 ore con preventivo personalizzato
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-orange-600 to-yellow-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Pronto per l'Avventura?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Quad, Buggy, Motocross o Cammelli • Guide esperte • Sicurezza garantita
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
              onClick={() => document.querySelector("input[type='text']")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Zap className="mr-2 h-5 w-5" />
              Prenota Ora
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
