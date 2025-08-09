"use client"

import { Shield, Users, Heart } from "lucide-react"

export default function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: "Sicurezza Garantita",
      desc: "Viaggi sicuri con assistenza 24/7 e guide esperte locali certificate",
      image: "/images/safety-morocco.png",
    },
    {
      icon: Users,
      title: "Guide Autentiche",
      desc: "Guide berbere che conoscono ogni segreto del Marocco e parlano la tua lingua",
      image: "/images/berber-guide.png",
    },
    {
      icon: Heart,
      title: "Esperienze Uniche",
      desc: "Vivi il vero spirito marocchino lontano dal turismo di massa",
      image: "/images/authentic-experience.png",
    },
  ]

  return (
    <div className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Perché Scegliere Morocco Dreams</h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            La tua sicurezza e soddisfazione sono la nostra priorità
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, idx) => (
            <div key={idx} className="group text-center hover:scale-105 transition-all duration-500">
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <img
                  src={feature.image || "/placeholder.svg?height=200&width=350"}
                  alt={feature.title}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
