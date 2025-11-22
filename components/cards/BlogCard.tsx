import * as React from 'react'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { it } from 'date-fns/locale'
import { BlogCardProps } from '@/lib/types/cards'
import { BaseCard } from '@/components/ui/BaseCard'
import { CardBadge } from '@/components/ui/CardBadge'

export function BlogCard({
  id,
  image,
  title,
  description,
  excerpt,
  author,
  publishedAt,
  readTime,
  tags = [],
  badges = [],
  ctas = [],
  className,
  onClick,
}: BlogCardProps) {
  const imageUrl = Array.isArray(image) ? image[0] : image

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return format(dateObj, 'd MMMM yyyy', { locale: it })
  }

  return (
    <BaseCard className={cn('group flex flex-col', className)} onClick={onClick}>
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={imageUrl || '/placeholder.svg'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {badges.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {badges.map((badge, idx) => (
              <CardBadge key={idx} label={badge.label} variant={badge.variant} />
            ))}
          </div>
        )}
        
        {author && (
          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            {author.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center border-2 border-white shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
            <div>
              <p className="text-white font-semibold text-sm">{author.name}</p>
              <div className="flex items-center gap-2 text-xs text-white/80">
                {publishedAt && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(publishedAt)}
                  </span>
                )}
                {readTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {readTime}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 lg:p-8 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
          {title}
        </h3>

        {(excerpt || description) && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-1">
            {excerpt || description}
          </p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {ctas.length > 0 && (
          <div className="flex gap-3 mt-auto">
            {ctas.map((cta, idx) => {
              const isPrimary = cta.variant === 'primary'
              const content = (
                <>
                  {cta.icon && <cta.icon className="w-5 h-5" />}
                  <span>{cta.label}</span>
                  {isPrimary && <ArrowRight className="w-4 h-4 ml-1" />}
                </>
              )

              const buttonClasses = cn(
                'flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300',
                isPrimary
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-md hover:shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
              )

              if (cta.href) {
                return (
                  <Link key={idx} href={cta.href} className={buttonClasses}>
                    {content}
                  </Link>
                )
              }

              return (
                <button key={idx} onClick={cta.onClick} className={buttonClasses}>
                  {content}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </BaseCard>
  )
}

export default BlogCard
