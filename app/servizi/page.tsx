"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, Users, Shield, MapPin, Phone, Star, CheckCircle, Clock, UserCheck } from "lucide-react"
import { getPublishedServices } from "@/lib/public-data"
import { Service } from "@/lib/firestore-schema"
import { ServiceCard } from "@/components/cards/ServiceCard"

const testimonials = [
  {
    name: "Marco Rossi",
    location: "Milano, Italia",
    service: "Trasferimenti + Guida Privata",
    rating: 5,
    comment:
      "Servizio impeccabile dall'inizio alla fine. La guida Hassan è stata fantastica, ci ha fatto scoprire angoli nascosti di Marrakech che non avremmo mai trovato da soli.",
    date: "20 Gennaio 2024",
  },
  {
    name: "Sophie Dubois",
    location: "Paris, France",
    service: "Noleggio Auto",
    rating: 5,
    comment:
      "Voiture parfaite pour notre road trip au Maroc. Service client excellent et véhicule en parfait état. Je recommande vivement!",
    date: "15 Gennaio 2024",
  },
  {
    name: "James Wilson",
    location: "London, UK",
    service: "Pacchetto Completo",
    rating: 5,
    comment:
      "Amazing experience! From airport pickup to guided tours, everything was perfectly organized. Morocco Dreams made our trip unforgettable.",
    date: "10 Gennaio 2024",
  },
]

const advantages = [
  {
    icon: CheckCircle,
    title: "Qualità Garantita",
    description: "Servizi certificati e partner affidabili selezionati con cura",
  },
  {
    icon: Clock,
    title: "Disponibilità 24/7",
    description: "Assistenza continua durante tutto il tuo soggiorno in Marocco",
  },
  {
    icon: Users,
    title: "Team Locale",
    description: "Staff marocchino esperto che conosce ogni angolo del paese",
  },
  {
    icon: Shield,
    title: "Sicurezza Totale",
    description: "Tutti i servizi sono assicurati e rispettano gli standard internazionali",
  },
]

export default function ServiziPage() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Load published services from database
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true)
        const publishedServices = await getPublishedServices({ limit: 20 })
        setServices(publishedServices as any[])
        setError("")
      } catch (err) {
        console.error('Error loading services:', err)
        setError("Errore nel caricamento dei servizi")
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'transport':
        return Car
      case 'guide':
        return UserCheck
      case 'insurance':
        return Shield
      default:
        return Users
    }
  }

  const getServiceColor = (category: string) => {
    switch (category) {
      case 'transport':
        return 'orange'
      case 'guide':
        return 'blue'
      case 'insurance':
        return 'purple'
      case 'accommodation':
        return 'green'
      default:
        return 'gray'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">I Nostri Servizi</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Servizi professionali per rendere il tuo viaggio in Marocco perfetto e senza pensieri
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">I Nostri Servizi</h1>
            <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-muted/50 to-background">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                <Users className="h-12 w-12 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              I Nostri <span className="text-orange-600 dark:text-orange-400">Servizi</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Servizi professionali per rendere il tuo viaggio in Marocco indimenticabile. Dalla pianificazione al
              ritorno a casa, ci occupiamo di ogni dettaglio.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Servizi certificati</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Assistenza 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Prezzi trasparenti</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Scegli il Servizio Perfetto</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ogni servizio è progettato per offrirti la massima comodità e sicurezza durante il tuo viaggio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service) => {
              const Icon = getServiceIcon(service.category)
              
              return (
                <ServiceCard
                  key={service.id}
                  id={service.id || service.slug || ''}
                  title={service.name}
                  description={service.description}
                  icon={Icon}
                  price={service.price}
                  priceType={service.priceType as 'per_person' | 'per_day' | 'per_trip' | 'fixed'}
                  locations={service.locations || []}
                  badges={[
                    { label: service.category, variant: 'default' },
                    { label: service.type, variant: 'default' }
                  ]}
                  ctas={[
                    { 
                      label: 'Scopri di più', 
                      href: `/servizi/${service.slug || service.id}`, 
                      variant: 'primary' 
                    }
                  ]}
                />
              )
            })}
          </div>

          {services.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nessun servizio disponibile al momento.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Perché Scegliere Morocco Dreams</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              La nostra esperienza e dedizione fanno la differenza
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <advantage.icon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{advantage.title}</h3>
                <p className="text-muted-foreground text-sm">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Cosa Dicono i Nostri Clienti</h2>
            <p className="text-lg text-muted-foreground">Recensioni autentiche sui nostri servizi</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>

                  <div className="border-t pt-4">
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    <p className="text-sm text-orange-600 dark:text-orange-400">Servizio: {testimonial.service}</p>
                    <p className="text-xs text-muted-foreground mt-1">{testimonial.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Hai Bisogno di Aiuto?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Il nostro team è sempre disponibile per consigliarti il servizio più adatto alle tue esigenze
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contatti">
              <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
                <Phone className="mr-2 h-5 w-5" />
                Contattaci Ora
              </Button>
            </Link>
            <Link href="/contatti">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Richiedi Preventivo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
