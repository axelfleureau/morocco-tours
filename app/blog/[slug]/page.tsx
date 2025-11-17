import { notFound } from "next/navigation"
import ContactBanner from "@/components/cta/contact-banner"
import { BlogPost } from "@/lib/firestore-schema"
import Link from "next/link"
import { ArrowLeft, Share2, Bookmark } from 'lucide-react'
import BlogPostHeader from './BlogPostHeader'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Use public API for database-driven content with publication system
  // Direct API call in server component to avoid SSR fetch issues
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:5000';
  const response = await fetch(`${baseUrl}/api/public/content?collection=blogPosts&slug=${params.slug}`, { cache: 'no-store' })
  
  if (!response.ok) {
    return notFound()
  }
  
  const post = await response.json() as BlogPost

  return (
    <article className="min-h-screen bg-white dark:bg-gray-950">
      <ContactBanner 
        title="Hai bisogno di aiuto per organizzare il viaggio?" 
        subtitle="Contattaci: rispondiamo entro 24 ore con consigli personalizzati." 
      />

      {/* Hero Image with Wishlist */}
      <BlogPostHeader post={post} />

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna al blog
          </Link>
        </div>

        {/* Article Meta */}
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Article Sections */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {post.sections.map((section, index) => (
            <section key={index} className="mb-10">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {section.heading}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {section.body}
              </p>
              {section.image && (
                <div className="my-8">
                  <img 
                    src={section.image || "/placeholder.svg?height=400&width=600"} 
                    alt={section.heading} 
                    className="w-full rounded-2xl border border-gray-200/60 dark:border-gray-800 shadow-lg" 
                  />
                </div>
              )}
            </section>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 p-8 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-orange-200/60 dark:border-gray-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Pronto per il tuo viaggio in Marocco?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Dopo aver letto questa guida, è il momento di trasformare i tuoi sogni in realtà. 
            Contattaci per un itinerario personalizzato basato sui tuoi interessi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contatti"
              className="inline-flex justify-center items-center px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
            >
              Contattaci per un itinerario su misura
            </Link>
            <a
              href="https://wa.me/393292333370?text=Ciao! Ho letto il vostro articolo e vorrei informazioni sui viaggi in Marocco."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center px-6 py-3 rounded-xl border-2 border-orange-500 text-orange-500 font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              Scrivici su WhatsApp
            </a>
          </div>
        </div>

        {/* Related Articles - Database-driven */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Altri articoli che potrebbero interessarti</h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Articoli correlati saranno mostrati quando il contenuto del blog sarà popolato nel database.</p>
          </div>
        </div>
      </div>
    </article>
  )
}
