"use client"

import Link from "next/link"
import { Calendar, ArrowRight, Clock } from "lucide-react"

export default function BlogTeaser() {
  const blogPosts = [
    {
      slug: "cucina-marocchina-guida-completa",
      title: "Cucina Marocchina: Guida Completa ai Sapori Autentici",
      excerpt: "Scopri i segreti della cucina marocchina: dal tagine al couscous, dalle spezie ai dolci tradizionali.",
      image: "/images/blog/moroccan-tagine-cooking.png",
      date: "15 Gennaio 2024",
      readTime: "8 min",
      category: "Gastronomia",
    },
    {
      slug: "hammam-tradizionale-esperienza-autentica",
      title: "Hammam Tradizionale: Un'Esperienza di Benessere Autentica",
      excerpt:
        "Tutto quello che devi sapere sull'hammam marocchino: rituali, benefici e dove vivere questa esperienza unica.",
      image: "/images/blog/hammam-traditional-spa.png",
      date: "12 Gennaio 2024",
      readTime: "6 min",
      category: "Benessere",
    },
    {
      slug: "deserto-sahara-guida-viaggio",
      title: "Deserto del Sahara: Guida Completa per il Tuo Viaggio",
      excerpt: "Consigli pratici, cosa portare e come vivere al meglio l'esperienza nel deserto più grande del mondo.",
      image: "/images/blog/sahara-desert-camping.png",
      date: "8 Gennaio 2024",
      readTime: "10 min",
      category: "Viaggi",
    },
  ]

  return (
    <div className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Dal Nostro Blog</h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Consigli, guide e storie per preparare al meglio il tuo viaggio in Marocco
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <article
              key={post.slug}
              className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg?height=300&width=400"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-orange-600 transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-semibold group-hover:translate-x-1 transition-all duration-300"
                >
                  <span>Leggi di più</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-lg hover:scale-105"
          >
            <span>Vedi Tutti gli Articoli</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
