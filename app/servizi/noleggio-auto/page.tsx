"use client";

import { useState, useMemo } from "react";
import { Calendar, Car, Settings, Fuel, Users, DoorClosed, Check, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { vehicles, rentalServices, calculateRentalPrice, type Vehicle } from "@/data/vehicles";
import Image from "next/image";

export default function NoleggioAutoPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [transmissionFilter, setTransmissionFilter] = useState<string>("all");
  const [fuelFilter, setFuelFilter] = useState<string>("all");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      if (categoryFilter !== "all" && vehicle.category !== categoryFilter) return false;
      if (transmissionFilter !== "all" && vehicle.transmission !== transmissionFilter) return false;
      if (fuelFilter !== "all" && vehicle.fuel !== fuelFilter) return false;
      return true;
    });
  }, [categoryFilter, transmissionFilter, fuelFilter]);

  const calculatePrice = (vehicle: Vehicle) => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end) return null;
    return calculateRentalPrice(vehicle, start, end);
  };

  const getDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const includedServices = rentalServices.filter((s) => s.type === "included");
  const extraServices = rentalServices.filter((s) => s.type === "extra");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-background to-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Noleggio Auto a Marrakech
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Scopri il Marocco in totale libertà con la nostra flotta di veicoli selezionati.
            Tariffe trasparenti, assistenza 24/7 e chilometraggio illimitato incluso.
          </p>
        </div>

        <Card className="mb-8 shadow-lg border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-orange-600" />
              Filtra la tua auto ideale
            </CardTitle>
            <CardDescription>
              Seleziona le caratteristiche che desideri e scegli le date del noleggio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Tutte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutte le categorie</SelectItem>
                    <SelectItem value="Economica">Economica</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="transmission">Cambio</Label>
                <Select value={transmissionFilter} onValueChange={setTransmissionFilter}>
                  <SelectTrigger id="transmission">
                    <SelectValue placeholder="Tutti" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti i cambi</SelectItem>
                    <SelectItem value="Manuale">Manuale</SelectItem>
                    <SelectItem value="Automatica">Automatica</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="fuel">Carburante</Label>
                <Select value={fuelFilter} onValueChange={setFuelFilter}>
                  <SelectTrigger id="fuel">
                    <SelectValue placeholder="Tutti" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti i carburanti</SelectItem>
                    <SelectItem value="Benzina">Benzina</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="start-date" className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Data Inizio <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border-orange-200 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="end-date" className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Data Fine <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className="border-orange-200 focus:border-orange-500"
                  required
                />
              </div>
            </div>

            {startDate && endDate && getDays() > 0 && (
              <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm font-medium text-orange-900">
                  Durata noleggio: <span className="font-bold">{getDays()} giorni</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Car className="w-6 h-6 text-orange-600" />
            Veicoli disponibili ({filteredVehicles.length})
          </h2>
          {!startDate || !endDate ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 text-sm font-medium">
                ⚠️ Seleziona le date di inizio e fine per visualizzare i prezzi
              </p>
            </div>
          ) : null}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredVehicles.map((vehicle) => {
            const price = calculatePrice(vehicle);
            const days = getDays();

            return (
              <Card key={vehicle.id} className="overflow-hidden hover:shadow-xl transition-shadow border-orange-100">
                <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-50">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-orange-600 hover:bg-orange-700">
                    {vehicle.category}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{vehicle.name}</CardTitle>
                  <CardDescription>{vehicle.model}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {vehicle.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-orange-600" />
                      <span>{vehicle.transmission}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel className="w-4 h-4 text-orange-600" />
                      <span>{vehicle.fuel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DoorClosed className="w-4 h-4 text-orange-600" />
                      <span>{vehicle.doors} porte</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-orange-600" />
                      <span>{vehicle.seats} posti</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Franchigia giornaliera</p>
                    <p className="font-semibold text-sm">{vehicle.dailyFranchise}</p>
                  </div>

                  {price !== null && days > 0 ? (
                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                      <p className="text-xs text-muted-foreground mb-1">Prezzo totale</p>
                      <p className="text-3xl font-bold text-orange-600">
                        {price}€
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {days} {days === 1 ? "giorno" : "giorni"} • {(price / days).toFixed(0)}€/giorno
                      </p>
                    </div>
                  ) : (
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground text-center">
                        Seleziona le date per vedere il prezzo
                      </p>
                    </div>
                  )}
                </CardContent>

                <CardFooter>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                    {price !== null ? "Prenota Ora" : "Visualizza Dettagli"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nessun veicolo trovato</h3>
            <p className="text-muted-foreground">
              Prova a modificare i filtri per vedere più opzioni
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Check className="w-5 h-5" />
                Servizi Inclusi nel Prezzo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {includedServices.map((service) => (
                  <li key={service.id} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Euro className="w-5 h-5" />
                Servizi Extra Disponibili
              </CardTitle>
              <CardDescription>Opzionali a pagamento</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {extraServices.map((service) => (
                  <li key={service.id} className="flex items-start gap-3">
                    <div className="w-16 flex-shrink-0">
                      <Badge variant="outline" className="border-blue-300 text-blue-700">
                        +{service.price}€/g
                      </Badge>
                    </div>
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Hai bisogno di aiuto?</h2>
            <p className="text-orange-100 mb-6">
              Il nostro team è disponibile 24/7 per assisterti nella scelta del veicolo perfetto
              e rispondere a tutte le tue domande sul noleggio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
                Contattaci su WhatsApp
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Chiama +39 329 233 3370
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
