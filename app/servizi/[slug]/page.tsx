"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Star, Calendar, Check, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore"
import { Service } from "@/lib/firestore-schema"
import WishlistButton from "@/components/WishlistButton"

export default function ServiceDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true)
        
        // Try query by slug first
        let q = query(
          collection(db, 'services'),
          where('slug', '==', slug),
          where('status', '==', 'published')
        )
        
        let snapshot = await getDocs(q)
        
        // If not found by slug, try by document ID (fallback during migration)
        if (snapshot.empty) {
          try {
            const docRef = doc(db, 'services', slug)
            const docSnap = await getDoc(docRef)
            
            if (docSnap.exists() && docSnap.data()?.status === 'published') {
              setService({ id: docSnap.id, ...docSnap.data() } as Service)
              return
            }
          } catch (idError) {
            console.log('Document ID lookup failed:', idError)
          }
          
          setError("Servizio non trovato")
          return
        }
        
        const doc = snapshot.docs[0]
        setService({ id: doc.id, ...doc.data() } as Service)
        
      } catch (err) {
        console.error('Error fetching service:', err)
        setError("Errore nel caricamento del servizio")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchService()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl mb-8"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Oops!</h1>
          <p className="text-muted-foreground mb-6">{error || "Servizio non trovato"}</p>
          <Button asChild>
            <Link href="/servizi">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna ai Servizi
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'transport':
        return '🚗'
      case 'guide':
        return '👨‍🏫'
      case 'insurance':
        return '🛡️'
      case 'accommodation':
        return '🏨'
      default:
        return '⭐'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 py-20">
        {/* Wishlist Button - top right */}
        <div className="absolute top-4 right-4 z-20">
          <WishlistButton
            itemId={`service-${service.id}`}
            itemType="service"
            itemTitle={service.name}
            itemImage={service.images?.[0]}
            itemPrice={service.price || 0}
            itemDescription={service.description}
          />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4">{getServiceIcon(service.category)}</div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">{service.name}</h1>
          <p className="text-xl text-muted-foreground mb-8">{service.description}</p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {service.category}
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              €{service.price} {service.priceType.replace('_', ' ')}
            </Badge>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Descrizione del Servizio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </CardContent>
          </Card>

          {/* Features */}
          {service.features && service.features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Caratteristiche Incluse</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Locations */}
          {service.locations && service.locations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Disponibile nelle seguenti località</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {service.locations.map((location, index) => (
                    <Badge key={index} variant="outline" className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {location}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Service Details */}
          <Card>
            <CardHeader>
              <CardTitle>Dettagli del Servizio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Categoria</h4>
                  <p className="text-muted-foreground capitalize">{service.category}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Tipo</h4>
                  <p className="text-muted-foreground capitalize">{service.type}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Prezzo</h4>
                  <p className="text-2xl font-bold text-orange-600">
                    €{service.price}
                    <span className="text-sm text-muted-foreground ml-2">
                      {service.priceType.replace('_', ' ')}
                    </span>
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Disponibilità</h4>
                  <p className="text-muted-foreground">
                    {service.locations?.length || 0} località
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Booking Card */}
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-center">Prenota Questo Servizio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-foreground mb-2">
                  €{service.price}
                </div>
                <p className="text-sm text-muted-foreground">
                  {service.priceType.replace('_', ' ')}
                </p>
              </div>

              <div className="space-y-4">
                <Button className="w-full bg-orange-500 hover:bg-orange-600" size="lg">
                  <Calendar className="w-4 h-4 mr-2" />
                  Prenota Ora
                </Button>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/contatti">
                    <Phone className="w-4 h-4 mr-2" />
                    Richiedi Info
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Hai domande?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                Il nostro team è sempre disponibile per aiutarti a scegliere il servizio più adatto alle tue esigenze.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-2 text-orange-500" />
                  <span>+212 524 123 456</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-2 text-orange-500" />
                  <span>info@moroccotours.com</span>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/contatti">
                  Contattaci
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}