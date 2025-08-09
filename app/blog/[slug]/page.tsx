import { notFound } from "next/navigation"
import ContactBanner from "@/components/cta/contact-banner"
import { blogPosts } from "@/content/blog-posts"
import Link from "next/link"
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark } from 'lucide-react'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return notFound()

  return (
    <article className="min-h-screen bg-white dark:bg-gray-950">
      <ContactBanner 
        title="Hai bisogno di aiuto per organizzare il viaggio?" 
        subtitle="Contattaci: rispondiamo entro 24 ore con consigli personalizzati." 
      />

      {/* Hero Image */}
      <header className="relative">
        <div className="h-[280px] sm:h-[360px] lg:h-[460px] relative overflow-hidden">
          <img 
            src={post.cover || "/placeholder.svg?height=460&width=800"} 
            alt={post.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="max-w-4xl">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString("it-IT")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingMinutes} min di lettura</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

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

        {/* Related Articles */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Altri articoli che potrebbero interessarti</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts
              .filter(p => p.slug !== post.slug)
              .slice(0, 2)
              .map((relatedPost) => (
                <article key={relatedPost.slug} className="group">
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="aspect-[16/9] overflow-hidden rounded-xl mb-4">
                      <img 
                        src={relatedPost.cover || "/placeholder.svg?height=200&width=300"} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {relatedPost.excerpt}
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(relatedPost.date).toLocaleDateString("it-IT")} • {relatedPost.readingMinutes} min
                    </div>
                  </Link>
                </article>
              ))}
          </div>
        </div>
      </div>
    </article>
  )
}
