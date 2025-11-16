"use client"

import { useState } from "react"
import { Camera, Sun, Map, Users, Clock, Star, Aperture, MessageCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import ContactBanner from "@/components/cta/contact-banner"

export default function FotografiaPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numPeople: "1",
    workshopType: "street" as "street" | "portrait" | "landscape" | "architecture" | "mixed",
    duration: "half-day" as "half-day" | "full-day" | "multi-day",
    preferredLocation: "",
    experienceLevel: "beginner" as "beginner" | "intermediate" | "advanced",
    notes: "",
    extras: {
      equipmentRental: false,
      postProduction: false,
      privateTour: false,
    }
  })

  const workshopTypes = [
    { id: "street", name: "Street Photography", description: "Medine, mercati, vita quotidiana" },
    { id: "portrait", name: "Ritratto Culturale", description: "Berberi, nomadi, artigiani" },
    { id: "landscape", name: "Paesaggio", description: "Deserto, montagne, costa" },
    { id: "architecture", name: "Architettura", description: "Moschee, riad, kasbe" },
    { id: "mixed", name: "Mix Completo", description: "Tutti gli stili combinati" },
  ]

  const handleWhatsappBooking = () => {
    const workshopTypeName = workshopTypes.find(t => t.id === formData.workshopType)?.name || ""
    const durationText = formData.duration === "half-day" ? "Mezza giornata" : formData.duration === "full-day" ? "Giornata intera" : "Più giorni"
    const levelText = formData.experienceLevel === "beginner" ? "Principiante" : formData.experienceLevel === "intermediate" ? "Intermedio" : "Avanzato"
    
    const extras = []
    if (formData.extras.equipmentRental) extras.push("Noleggio attrezzatura")
    if (formData.extras.postProduction) extras.push("Post-produzione")
    if (formData.extras.privateTour) extras.push("Tour privato")
    
    let message = `🎨 *PRENOTAZIONE WORKSHOP FOTOGRAFIA*\n\n`
    message += `👤 *Nome:* ${formData.name}\n`
    message += `📧 *Email:* ${formData.email}\n`
    message += `📱 *Telefono:* ${formData.phone}\n\n`
    message += `👥 *Numero partecipanti:* ${formData.numPeople}\n`
    message += `📸 *Tipo workshop:* ${workshopTypeName}\n`
    message += `⏱️ *Durata:* ${durationText}\n`
    message += `📊 *Livello esperienza:* ${levelText}\n`
    
    if (formData.preferredLocation) {
      message += `📍 *Luogo preferito:* ${formData.preferredLocation}\n`
    }
    
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
        title="Workshop di Fotografia"
        subtitle="Dalla luce del deserto alle medine colorate: uscite fotografiche e coaching personalizzato."
      />

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

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">
                  Fotografia in Marocco: raccontare storie con la luce
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Il Marocco offre scenari fotografici unici al mondo: dalla luce dorata del deserto del Sahara ai
                  colori vibranti delle medine, dai ritratti berberi alle architetture islamiche. I nostri workshop
                  fotografici sono guidati da fotografi professionisti che conoscono i luoghi migliori e i momenti
                  perfetti per ogni scatto.
                </p>

                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                  {[
                    {
                      icon: Camera,
                      title: "Coaching tecnico",
                      text: "Esposizione, composizione, uso della luce naturale e post-produzione sul campo",
                    },
                    {
                      icon: Sun,
                      title: "Golden/Blue Hour",
                      text: "Pianificazione accurata con app specializzate per la luce perfetta",
                    },
                    {
                      icon: Map,
                      title: "Location esclusive",
                      text: "Spot selezionati lontani dal turismo di massa",
                    },
                    {
                      icon: Users,
                      title: "Piccoli gruppi",
                      text: "Massimo 6 partecipanti per attenzione personalizzata",
                    },
                  ].map((feature, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-card border border-border">
                      <feature.icon className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
                      <h3 className="font-bold text-lg mb-2 text-card-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.text}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-muted/50 rounded-2xl p-6 lg:p-8 mb-10 border border-border">
                  <h3 className="text-2xl font-bold mb-6 text-foreground">Tipologie di workshop</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-card/50 rounded-xl border border-border">
                        <h4 className="font-semibold text-card-foreground mb-2">Street Photography</h4>
                        <p className="text-muted-foreground text-sm">
                          Medine di Marrakech e Fes, mercati, artigiani al lavoro, vita quotidiana autentica
                        </p>
                      </div>
                      <div className="p-4 bg-card/50 rounded-xl border border-border">
                        <h4 className="font-semibold text-card-foreground mb-2">Ritratto Culturale</h4>
                        <p className="text-muted-foreground text-sm">
                          Berberi dell'Atlante, nomadi del deserto, artigiani, con rispetto e autorizzazioni
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-card/50 rounded-xl border border-border">
                        <h4 className="font-semibold text-card-foreground mb-2">Paesaggio</h4>
                        <p className="text-muted-foreground text-sm">
                          Sahara all'alba, Atlante innevato, costa atlantica, oasi e palmeti
                        </p>
                      </div>
                      <div className="p-4 bg-card/50 rounded-xl border border-border">
                        <h4 className="font-semibold text-card-foreground mb-2">Architettura</h4>
                        <p className="text-muted-foreground text-sm">
                          Moschee, riad, kasbe, dettagli decorativi, giochi di luce e ombra
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 lg:p-8 border border-border">
                  <h3 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                    <Star className="w-6 h-6 text-purple-600" />
                    Cosa include
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Guida fotografo professionista",
                      "Permessi per location esclusive",
                      "Trasporto durante il workshop",
                      "Briefing tecnico personalizzato",
                      "Revisione portfolio al termine",
                      "Consigli post-produzione",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-6 text-foreground">Prenota il tuo Workshop</h3>
                  
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
                        max="6"
                        value={formData.numPeople}
                        onChange={(e) => setFormData({ ...formData, numPeople: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label className="mb-3 block">Tipo di Workshop *</Label>
                      <RadioGroup
                        value={formData.workshopType}
                        onValueChange={(value: string) => setFormData({ ...formData, workshopType: value as "street" | "portrait" | "landscape" | "architecture" | "mixed" })}
                      >
                        {workshopTypes.map((type) => (
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
                        onValueChange={(value: string) => setFormData({ ...formData, duration: value as "half-day" | "full-day" | "multi-day" })}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="half-day" id="half-day" />
                          <Label htmlFor="half-day" className="cursor-pointer">Mezza giornata (4 ore)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="full-day" id="full-day" />
                          <Label htmlFor="full-day" className="cursor-pointer">Giornata intera (8 ore)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="multi-day" id="multi-day" />
                          <Label htmlFor="multi-day" className="cursor-pointer">Più giorni (personalizzato)</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="mb-3 block">Livello di Esperienza</Label>
                      <RadioGroup
                        value={formData.experienceLevel}
                        onValueChange={(value: string) => setFormData({ ...formData, experienceLevel: value as "beginner" | "intermediate" | "advanced" })}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="beginner" id="beginner" />
                          <Label htmlFor="beginner" className="cursor-pointer">Principiante</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="intermediate" id="intermediate" />
                          <Label htmlFor="intermediate" className="cursor-pointer">Intermedio</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="advanced" id="advanced" />
                          <Label htmlFor="advanced" className="cursor-pointer">Avanzato</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="preferredLocation">Luogo Preferito (opzionale)</Label>
                      <Input
                        id="preferredLocation"
                        value={formData.preferredLocation}
                        onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                        placeholder="Es: Medina di Marrakech, Deserto..."
                      />
                    </div>

                    <div>
                      <Label className="mb-3 block">Servizi Extra</Label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="equipmentRental"
                            checked={formData.extras.equipmentRental}
                            onCheckedChange={(checked: boolean) =>
                              setFormData({
                                ...formData,
                                extras: { ...formData.extras, equipmentRental: checked }
                              })
                            }
                          />
                          <Label htmlFor="equipmentRental" className="cursor-pointer text-sm">
                            Noleggio attrezzatura fotografica
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="postProduction"
                            checked={formData.extras.postProduction}
                            onCheckedChange={(checked: boolean) =>
                              setFormData({
                                ...formData,
                                extras: { ...formData.extras, postProduction: checked }
                              })
                            }
                          />
                          <Label htmlFor="postProduction" className="cursor-pointer text-sm">
                            Sessione post-produzione (Lightroom/Photoshop)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="privateTour"
                            checked={formData.extras.privateTour}
                            onCheckedChange={(checked: boolean) =>
                              setFormData({
                                ...formData,
                                extras: { ...formData.extras, privateTour: checked }
                              })
                            }
                          />
                          <Label htmlFor="privateTour" className="cursor-pointer text-sm">
                            Tour privato esclusivo
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
                        placeholder="Esigenze particolari, attrezzatura disponibile, preferenze..."
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
                      Ti risponderemo entro 24 ore con un preventivo personalizzato
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Pronto a Catturare il Marocco?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Workshop personalizzati • Fotografi professionisti • Location esclusive
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
              onClick={() => document.querySelector("input[type='text']")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Camera className="mr-2 h-5 w-5" />
              Prenota Ora
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
