"use client"

import { Calendar, User, Clock, ArrowRight, Tag, Search, TrendingUp, Eye, MessageCircle, Share2, Bookmark } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import ContactBanner from "@/components/cta/contact-banner"
import { blogPosts } from "@/content/blog-posts"
import WishlistButton from "@/components/WishlistButton"

export default function BlogPage() {
  const featuredPost = {
    id: 1,
    title: "Guida Completa al Viaggio in Marocco: Tutto quello che Devi Sapere nel 2024",
    excerpt: "Una guida dettagliata e aggiornata per pianificare il tuo primo viaggio in Marocco, con consigli pratici, itinerari consigliati, informazioni essenziali su visti, clima, cultura e molto altro ancora.",
    image: "/images/blog/morocco-complete-guide.png",
    author: "Ahmed El Fassi",
    date: "15 Gennaio 2024",
    readTime: "12 min",
    category: "Guide di Viaggio",
    tags: ["Marocco", "Guida", "Consigli", "Pianificazione", "Cultura"],
    featured: true,
    views: 15420,
    comments: 89,
  }

  const categories = [
    { name: "Guide di Viaggio", count: 15, color: "bg-orange-500", description: "Consigli pratici e itinerari" },
    { name: "Gastronomia", count: 12, color: "bg-orange-500", description: "Cucina e tradizioni culinarie" },
    { name: "Cultura", count: 18, color: "bg-purple-500", description: "Tradizioni e storia marocchina" },
    { name: "Avventura", count: 9, color: "bg-green-500", description: "Trekking e attività outdoor" },
    { name: "Benessere", count: 7, color: "bg-pink-500", description: "Hammam e relax" },
    { name: "Shopping", count: 5, color: "bg-yellow-500", description: "Souks e artigianato" },
    { name: "Mare", count: 8, color: "bg-orange-500", description: "Spiagge e costa atlantica" },
    { name: "Montagna", count: 6, color: "bg-emerald-500", description: "Atlante e natura" },
  ]

  const popularTags = [
    "Marocco", "Marrakech", "Fes", "Sahara", "Cucina", "Hammam", "Trekking", "Souks", "Tradizioni", "Consigli", "Atlante", "Deserto"
  ]

  const recentPosts = [
    {
      id: 10,
      title: "Come Vestirsi in Marocco: Guida al Dress Code",
      date: "20 Gennaio 2024",
      views: 3240,
    },
    {
      id: 11,
      title: "I Migliori Riad di Marrakech per Ogni Budget",
      date: "18 Gennaio 2024",
      views: 5670,
    },
    {
      id: 12,
      title: "Trasporti in Marocco: Treni, Bus e Taxi",
      date: "16 Gennaio 2024",
      views: 4320,
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative py-24 lg:py-32 bg-gradient-to-r from-indigo-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/blog/morocco-blog-hero.png" 
            alt="Blog Morocco Dreams" 
            fill
            className="object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Blog
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-2 bg-gradient-to-r from-indigo-300 to-purple-200 bg-clip-text text-transparent">
              Morocco Dreams
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8">
            Storie, consigli e guide per scoprire il Marocco autentico attraverso gli occhi di chi lo vive ogni giorno
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">✓ Guide Esperte</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">✓ Consigli Pratici</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">✓ Storie Autentiche</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Banner */}
      <ContactBanner title="Domande sui nostri viaggi?" subtitle="Scrivici: ti consigliamo l’itinerario perfetto." />

      {/* Search and Filters */}
      <div className="py-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cerca articoli, destinazioni, consigli..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-indigo-500 text-white rounded-full text-sm font-medium hover:bg-indigo-600 transition-colors">
                Tutti gli Articoli
              </button>
              {categories.slice(0, 4).map((category) => (
                <button
                  key={category.name}
                  className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Articolo in Evidenza
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Il nostro articolo più letto e apprezzato dai viaggiatori
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-full overflow-hidden">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-indigo-500 px-4 py-2 rounded-full">
                  <span className="text-white text-sm font-semibold">✨ In Evidenza</span>
                </div>
                
                {/* Wishlist Button - top right */}
                <div className="absolute top-4 right-4 z-10">
                  <WishlistButton
                    itemId={`blog-${featuredPost.id}`}
                    itemType="activity"
                    itemTitle={featuredPost.title}
                    itemImage={featuredPost.image}
                    itemDescription={featuredPost.excerpt}
                  />
                </div>
                <div className="absolute bottom-4 left-4 flex items-center space-x-4">
                  <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    <Eye className="w-4 h-4 text-white" />
                    <span className="text-white text-sm">{featuredPost.views.toLocaleString()}</span>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span className="text-white text-sm">{featuredPost.comments}</span>
                  </div>
                </div>
              </div>

              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{featuredPost.author}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{featuredPost.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 font-semibold group"
                >
                  <span>Leggi l'articolo completo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Ultimi Articoli
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Scopri le nostre guide più recenti e i consigli aggiornati per il tuo viaggio in Marocco
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200/60 dark:border-gray-800 hover:shadow-lg transition"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img src={post.cover || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        
                        {/* Wishlist Button - top left */}
                        <div className="absolute top-2 left-2 z-10" onClick={(e) => e.preventDefault()}>
                          <WishlistButton
                            itemId={`blog-${post.slug}`}
                            itemType="activity"
                            itemTitle={post.title}
                            itemImage={post.cover}
                            itemDescription={post.excerpt}
                          />
                        </div>
                      </div>
                    </Link>
                    <div className="p-6">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {new Date(post.date).toLocaleDateString("it-IT")} • {post.readingMinutes} min
                      </div>
                      <h2 className="text-xl font-bold mb-2">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                      <div className="flex gap-2 flex-wrap">
                        {(post.tags || []).map((t) => (
                          <span key={t} className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 font-semibold hover:scale-105">
                  Carica Altri Articoli
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Categories */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-indigo-500" />
                  Categorie
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={`/blog/categoria/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 ${category.color} rounded-full`} />
                        <div>
                          <span className="text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 font-medium">
                            {category.name}
                          </span>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{category.description}</div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-indigo-500" />
                  Tag Popolari
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag.toLowerCase()}`}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Articoli Recenti
                </h3>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.id}`}
                      className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mb-2 line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>{post.date}</span>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-3">📧 Newsletter</h3>
                <p className="text-sm mb-4 text-indigo-100">
                  Ricevi i nostri ultimi articoli, consigli di viaggio e offerte esclusive direttamente nella tua email
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="La tua email"
                    className="w-full px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                  />
                  <button className="w-full bg-white text-indigo-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Iscriviti Gratis
                  </button>
                </div>
                <p className="text-xs text-indigo-200 mt-3">
                  Niente spam, solo contenuti di qualità. Cancellati quando vuoi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Pronto per il Tuo Viaggio in Marocco?
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Dopo aver letto le nostre guide, è il momento di trasformare i tuoi sogni in realtà. Pianifica il tuo viaggio perfetto con noi!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/viaggi/su-misura"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 font-semibold text-lg hover:scale-105"
            >
              Pianifica il Tuo Viaggio
            </Link>
            <Link
              href="/contatti"
              className="border-2 border-indigo-500 text-indigo-500 px-8 py-4 rounded-xl hover:bg-indigo-500 hover:text-white transition-all duration-300 font-semibold text-lg"
            >
              Parla con un Esperto
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
