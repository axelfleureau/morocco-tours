"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, Users, Star, MapPin, Calendar, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore"
import WishlistButton from "@/components/WishlistButton"
import { BookingForm } from "@/components/booking/BookingForm"

interface Experience {
  id: string
  title: string
  description: string
  slug: string
  images?: string[]
  price?: number
  duration?: string
  difficulty?: string
  groupSize?: string
  highlights?: string[]
  included?: string[]
  excluded?: string[]
  rating?: number
  reviews?: number
  category?: string
  location?: string
  status?: string
}

export default function ExperienceDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [experience, setExperience] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [bookingOpen, setBookingOpen] = useState(false)

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true)
        
        let q = query(
          collection(db, 'experiences'),
          where('slug', '==', slug),
          where('status', '==', 'published')
        )
        
        let snapshot = await getDocs(q)
        
        if (snapshot.empty) {
          try {
            const docRef = doc(db, 'experiences', slug)
            const docSnap = await getDoc(docRef)
            
            if (docSnap.exists() && docSnap.data()?.status === 'published') {
              setExperience({ id: docSnap.id, ...docSnap.data() } as Experience)
              return
            }
          } catch (idError) {
            console.log('Document ID lookup failed:', idError)
          }
          
          setError("Esperienza non trovata")
          return
        }
        
        const docData = snapshot.docs[0]
        setExperience({ id: docData.id, ...docData.data() } as Experience)
        
      } catch (err) {
        console.error('Error fetching experience:', err)
        setError("Errore nel caricamento dell'esperienza")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchExperience()
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

  if (error || !experience) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Oops!</h1>
          <p className="text-muted-foreground mb-6">{error || "Esperienza non trovata"}</p>
          <Button asChild>
            <Link href="/esperienze">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna alle Esperienze
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-96 overflow-hidden">
        <img
          src={experience.images?.[0] || "/images/placeholder-travel.jpg"}
          alt={experience.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="absolute top-4 right-4 z-20">
          <WishlistButton
            itemId={`experience-${experience.id}`}
            itemType="experience"
            itemTitle={experience.title}
            itemImage={experience.images?.[0]}
            itemPrice={experience.price || 0}
            itemDescription={experience.description}
          />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{experience.title}</h1>
            <p className="text-xl text-gray-200 mb-6">{experience.description}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {experience.duration && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {experience.duration}
                </div>
              )}
              {experience.groupSize && (
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  {experience.groupSize}
                </div>
              )}
              {experience.rating && (
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                  {experience.rating} {experience.reviews && `(${experience.reviews} recensioni)`}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Descrizione</h2>
              <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
            </CardContent>
          </Card>

          {experience.highlights && experience.highlights.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Punti Salienti</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {experience.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {experience.included && experience.included.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Incluso</h3>
                  <ul className="space-y-2">
                    {experience.included.map((item, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {experience.excluded && experience.excluded.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Non Incluso</h3>
                  <ul className="space-y-2">
                    {experience.excluded.map((item, index) => (
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

        <div className="space-y-6">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-foreground">
                    €{experience.price || 0}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">per persona</p>
              </div>

              <div className="space-y-4">
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600" 
                  size="lg"
                  onClick={() => setBookingOpen(true)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Prenota Ora
                </Button>
              </div>

              <div className="border-t pt-4 mt-6">
                {experience.category && (
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Categoria:</span>
                    <Badge variant="secondary">{experience.category}</Badge>
                  </div>
                )}
                {experience.duration && (
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Durata:</span>
                    <span className="font-medium">{experience.duration}</span>
                  </div>
                )}
                {experience.difficulty && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Difficoltà:</span>
                    <span className="font-medium capitalize">{experience.difficulty}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Hai domande?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Il nostro team è sempre disponibile per aiutarti a pianificare l'esperienza perfetta.
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

      <BookingForm
        contentItem={{
          id: experience.id,
          type: 'experience',
          title: experience.title,
          price: experience.price || null,
          image: experience.images?.[0] || null
        }}
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  )
}
