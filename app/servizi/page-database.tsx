"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, Users, Shield, MapPin, Phone, Star, CheckCircle, ArrowRight, Clock, UserCheck } from "lucide-react"
import { getPublishedServices } from "@/lib/public-data"
import { Service } from "@/lib/firestore-schema"

export default function ServiziPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Load published services from database
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true)
        const publishedServices = await getPublishedServices({ limit: 20 })
        setServices(publishedServices)
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
      <section className="relative bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              I Nostri Servizi
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Servizi professionali per rendere il tuo viaggio in Marocco perfetto e senza pensieri
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Servizi Certificati
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Disponibili 24/7
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Prezzi Trasparenti
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service) => {
              const Icon = getServiceIcon(service.category)
              const color = getServiceColor(service.category)
              
              return (
                <Card key={service.id} className="group hover:shadow-2xl transition-all duration-300 border-border hover:border-orange-200 dark:hover:border-orange-800">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-xl bg-${color}-100 dark:bg-${color}-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-orange-600 transition-colors">
                      {service.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold text-foreground">
                          €{service.price}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {service.priceType.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {service.category} • {service.type}
                      </p>
                    </div>

                    {/* Locations */}
                    {service.locations && service.locations.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">Disponibile in:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {service.locations.slice(0, 3).map((location, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {location}
                            </Badge>
                          ))}
                          {service.locations.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{service.locations.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <Button 
                      asChild 
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <Link href={`/servizi/${service.slug || service.id}`}>
                        <span>Scopri di più</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
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

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Hai bisogno di un servizio personalizzato?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Contattaci per servizi su misura per le tue esigenze specifiche
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contatti">
                <Phone className="w-5 h-5 mr-2" />
                Contattaci
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/viaggi">
                <Star className="w-5 h-5 mr-2" />
                Scopri i Viaggi
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}