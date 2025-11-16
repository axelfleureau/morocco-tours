"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Car,
  Settings,
  Fuel,
  Users,
  DoorClosed,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Euro,
  Calendar,
  Shield,
} from "lucide-react"
import { vehicles, includedServices, extraServices, type Vehicle, calculateRentalPrice, periodNames } from "@/data/vehicles"
import WishlistButton from "@/components/WishlistButton"

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Noleggio Auto Marrakech",
  description: "Servizio di noleggio auto a Marrakech con tariffe trasparenti e assistenza 24/7",
  provider: {
    "@type": "Organization",
    name: "Morocco Dreams",
  },
  areaServed: "Morocco",
}

const WHATSAPP_NUMBER = "393292333370"

export default function NoleggioAutoClientPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(vehicles[0])
  const [categoryFilter, setCategoryFilter] = useState<"all" | "economica" | "suv" | "Premium">("all")
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [customerName, setCustomerName] = useState<string>("")
  const [customerPhone, setCustomerPhone] = useState<string>("")

  const filteredVehicles = useMemo(() => {
    if (categoryFilter === "all") return vehicles
    return vehicles.filter((v) => v.category === categoryFilter)
  }, [categoryFilter])

  const priceInfo = useMemo(() => {
    if (!startDate || !endDate) return null
    return calculateRentalPrice(selectedVehicle, new Date(startDate), new Date(endDate))
  }, [selectedVehicle, startDate, endDate])

  const categories = [
    { value: "all", label: "Tutte", icon: Car, count: vehicles.length },
    { value: "economica", label: "Economica", icon: Euro, count: vehicles.filter((v) => v.category === "economica").length },
    { value: "suv", label: "SUV", icon: Car, count: vehicles.filter((v) => v.category === "suv").length },
    { value: "Premium", label: "Premium", icon: Shield, count: vehicles.filter((v) => v.category === "Premium").length },
  ]

  const composeWhatsappMessage = () => {
    const priceText = priceInfo
      ? `€${priceInfo.dailyRate}/giorno x ${priceInfo.totalDays} giorni = €${priceInfo.totalPrice} (Periodo: ${periodNames[priceInfo.period]})`
      : "Da calcolare"

    return `Ciao Morocco Dreams! Vorrei noleggiare un'auto:

🚗 *Veicolo selezionato*
Modello: ${selectedVehicle.name}
Categoria: ${selectedVehicle.category}
Cambio: ${selectedVehicle.transmission}
Carburante: ${selectedVehicle.fuel}

👤 *Dati personali*
Nome: ${customerName || "-"}
Telefono: ${customerPhone || "-"}

📅 *Date noleggio*
Data Inizio: ${startDate || "?"}
Data Fine: ${endDate || "?"}
${priceInfo ? `Durata: ${priceInfo.totalDays} giorni` : ""}

💰 *Prezzo*
${priceText}

✅ *Servizi inclusi*
${includedServices.map((s) => "• " + s.name).join("\n")}

_Grazie!_`
  }

  const handleWhatsappBooking = () => {
    if (!startDate || !endDate || !customerName) {
      alert("Per favore compila i campi obbligatori: Nome, Data Inizio e Data Fine")
      return
    }
    const msg = encodeURIComponent(composeWhatsappMessage())
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank")
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="min-h-screen bg-background">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                  <Car className="h-12 w-12 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Noleggio Auto a <span className="text-orange-600 dark:text-orange-400">Marrakech</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Scopri il Marocco in totale libertà con la nostra flotta di veicoli selezionati. Tariffe trasparenti,
                assistenza 24/7 e chilometraggio illimitato incluso.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Chilometraggio illimitato</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Assistenza 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Consegna gratuita</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={categoryFilter === cat.value ? "default" : "outline"}
                  onClick={() => setCategoryFilter(cat.value as any)}
                  className={categoryFilter === cat.value ? "bg-orange-600 hover:bg-orange-700" : ""}
                >
                  <cat.icon className="h-4 w-4 mr-2" />
                  {cat.label} ({cat.count})
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">La Nostra Flotta</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Scegli il veicolo perfetto per la tua avventura in Marocco
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {filteredVehicles.map((vehicle) => (
                <Card
                  key={vehicle.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    selectedVehicle.id === vehicle.id 
                      ? "ring-4 ring-orange-500 shadow-2xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 scale-105" 
                      : "hover:shadow-xl"
                  }`}
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <CardHeader className="text-center relative">
                    <div className="mb-4 flex items-center justify-between">
                      <Badge
                        className={`${
                          vehicle.category === "economica"
                            ? "bg-green-500"
                            : vehicle.category === "suv"
                              ? "bg-blue-500"
                              : "bg-purple-500"
                        }`}
                      >
                        {vehicle.category}
                      </Badge>
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold">
                        Da €{Math.min(vehicle.pricing.period1.short, vehicle.pricing.period2.short, vehicle.pricing.period3.short, vehicle.pricing.period4.short)}/gg
                      </Badge>
                    </div>
                    {selectedVehicle.id === vehicle.id && (
                      <div className="absolute top-2 right-2 z-10">
                        <CheckCircle className="h-6 w-6 text-orange-500 fill-current" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2 z-10">
                      <WishlistButton
                        itemId={vehicle.id}
                        itemType="vehicle"
                        itemTitle={vehicle.name}
                        itemImage={vehicle.image}
                        itemPrice={Math.min(vehicle.pricing.period1.short, vehicle.pricing.period2.short, vehicle.pricing.period3.short, vehicle.pricing.period4.short)}
                        itemDescription={`${vehicle.category} - ${vehicle.transmission} - ${vehicle.seats} posti`}
                      />
                    </div>
                    <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={vehicle.image}
                        alt={vehicle.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <CardTitle className="text-xl">{vehicle.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Settings className="h-3 w-3" />
                        {vehicle.transmission}
                      </div>
                      <div className="flex items-center gap-1">
                        <Fuel className="h-3 w-3" />
                        {vehicle.fuel}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {vehicle.seats} posti
                      </div>
                      <div className="flex items-center gap-1">
                        <DoorClosed className="h-3 w-3" />
                        {vehicle.doors} porte
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">Franchigia: €{vehicle.dailyDeductible}/gg</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Car className="h-6 w-6 text-orange-600" />
                  {selectedVehicle.name} - Dettagli e Prenotazione
                </CardTitle>
                <CardDescription>Completa i dati per ricevere un preventivo personalizzato</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-md">
                      <Image
                        src={selectedVehicle.image}
                        alt={selectedVehicle.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </div>
                    <h4 className="font-semibold mb-4 text-lg">Caratteristiche Veicolo</h4>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Categoria: {selectedVehicle.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Cambio: {selectedVehicle.transmission}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Carburante: {selectedVehicle.fuel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Posti: {selectedVehicle.seats}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Porte: {selectedVehicle.doors}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Aria condizionata</span>
                      </div>
                    </div>

                    <h4 className="font-semibold mb-4 text-lg text-green-600 dark:text-green-400">
                      Servizi Inclusi SENZA FRANCHIGIA
                    </h4>
                    <ul className="space-y-2 mb-6">
                      {includedServices.map((service, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{service.name}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="font-semibold mb-4 text-lg text-blue-600 dark:text-blue-400">
                      Servizi Extra Disponibili
                    </h4>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                      <p className="text-sm text-blue-800 dark:text-blue-200 font-medium flex items-start gap-2">
                        <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>La <strong>franchigia ridotta o azzerata</strong> è disponibile come extra opzionale su ogni veicolo. Contattaci per maggiori dettagli.</span>
                      </p>
                    </div>
                    <ul className="space-y-2">
                      {extraServices.map((service, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{service.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg mb-6">
                      <h4 className="font-semibold mb-4 text-lg">Dati Prenotazione</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Nome <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Il tuo nome"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Telefono</label>
                          <input
                            type="tel"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="+39 ..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Data Inizio <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Data Fine <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                          />
                        </div>
                      </div>
                    </div>

                    {priceInfo && (
                      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
                        <h4 className="font-semibold mb-4 text-lg">Riepilogo Prezzo</h4>
                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex justify-between">
                            <span>Periodo:</span>
                            <span className="font-medium">{periodNames[priceInfo.period]}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Durata:</span>
                            <span className="font-medium">{priceInfo.totalDays} giorni</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tariffa giornaliera:</span>
                            <span className="font-medium">€{priceInfo.dailyRate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Franchigia giornaliera:</span>
                            <span className="font-medium">€{selectedVehicle.dailyDeductible}</span>
                          </div>
                        </div>
                        <div className="border-t pt-4">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-lg">Prezzo Totale:</span>
                            <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                              €{priceInfo.totalPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handleWhatsappBooking}
                      className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                      size="lg"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Prenota su WhatsApp
                    </Button>

                    {!priceInfo && (
                      <p className="text-sm text-muted-foreground text-center mt-4">
                        Seleziona le date per visualizzare il prezzo
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Prenota la Tua Auto Ora</h2>
            <p className="text-xl text-orange-100 mb-8">
              Tariffe trasparenti • Assistenza 24/7 • Chilometraggio illimitato
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
                onClick={() => document.querySelector("input[type='text']")?.scrollIntoView({ behavior: "smooth" })}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Prenota Online
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
