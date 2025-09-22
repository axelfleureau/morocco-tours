"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, Users, Star, MapPin, Calendar, Check, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore"
import { Travel } from "@/lib/firestore-schema"

export default function TravelDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [travel, setTravel] = useState<Travel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTravel = async () => {
      try {
        setLoading(true)
        
        // Try query by slug first
        let q = query(
          collection(db, 'travels'),
          where('slug', '==', slug),
          where('status', '==', 'published')
        )
        
        let snapshot = await getDocs(q)
        
        // If not found by slug, try by document ID (fallback during migration)
        if (snapshot.empty) {
          try {
            const docRef = doc(db, 'travels', slug)
            const docSnap = await getDoc(docRef)
            
            if (docSnap.exists() && docSnap.data()?.status === 'published') {
              setTravel({ id: docSnap.id, ...docSnap.data() } as Travel)
              return
            }
          } catch (idError) {
            console.log('Document ID lookup failed:', idError)
          }
          
          setError("Viaggio non trovato")
          return
        }
        
        const doc = snapshot.docs[0]
        setTravel({ id: doc.id, ...doc.data() } as Travel)
        
      } catch (err) {
        console.error('Error fetching travel:', err)
        setError("Errore nel caricamento del viaggio")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchTravel()
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

  if (error || !travel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Oops!</h1>
          <p className="text-muted-foreground mb-6">{error || "Viaggio non trovato"}</p>
          <Button asChild>
            <Link href="/viaggi">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna ai Viaggi
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={travel.images?.[0] || "/images/placeholder-travel.jpg"}
          alt={travel.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{travel.title}</h1>
            <p className="text-xl text-gray-200 mb-6">{travel.description}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {travel.duration}
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Max 12 persone
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                {travel.rating} ({travel.reviews} recensioni)
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Descrizione</h2>
              <p className="text-muted-foreground leading-relaxed">{travel.description}</p>
            </CardContent>
          </Card>

          {/* Highlights */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Punti Salienti</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {travel.highlights?.map((highlight, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Itinerary */}
          {travel.itinerary && travel.itinerary.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Itinerario</h2>
                <div className="space-y-4">
                  {travel.itinerary.map((day, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {day.day}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{day.title}</h3>
                        <p className="text-muted-foreground text-sm">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Included/Excluded */}
          <div className="grid md:grid-cols-2 gap-6">
            {travel.included && travel.included.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Incluso nel Prezzo</h3>
                  <ul className="space-y-2">
                    {travel.included.map((item, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {travel.excluded && travel.excluded.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Non Incluso</h3>
                  <ul className="space-y-2">
                    {travel.excluded.map((item, index) => (
                      <li key={index} className="flex items-center text-sm text-muted-foreground">
                        <span className="w-4 h-4 mr-2 flex-shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Booking Card */}
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-foreground">€{travel.price}</span>
                  {travel.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      €{travel.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">per persona</p>
              </div>

              <div className="space-y-4">
                <Button className="w-full bg-orange-500 hover:bg-orange-600" size="lg">
                  <Calendar className="w-4 h-4 mr-2" />
                  Prenota Ora
                </Button>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Salva
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Condividi
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4 mt-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Categoria:</span>
                  <Badge variant="secondary">{travel.category}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Durata:</span>
                  <span className="font-medium">{travel.duration}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Hai domande?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Il nostro team è sempre disponibile per aiutarti a pianificare il viaggio perfetto.
              </p>
              <Button variant="outline" className="w-full" asChild>
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