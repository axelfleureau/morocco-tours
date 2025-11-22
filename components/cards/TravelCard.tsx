import * as React from 'react'
import Link from 'next/link'
import { Star, Clock, MapPin, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TravelCardProps } from '@/lib/types/cards'
import { BaseCard } from '@/components/ui/BaseCard'
import { CardBadge } from '@/components/ui/CardBadge'
import WishlistButton from '@/components/WishlistButton'

export function TravelCard({
  id,
  image,
  title,
  description,
  price,
  originalPrice,
  duration,
  rating,
  reviews,
  highlights = [],
  location,
  badges = [],
  ctas = [],
  className,
  onClick,
}: TravelCardProps) {
  const imageUrl = Array.isArray(image) ? image[0] : image

  return (
    <BaseCard className={cn('group', className)} onClick={onClick}>
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
        
        {price !== undefined && (
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-gray-900 dark:text-gray-100">€{price}</span>
              {originalPrice && (
                <span className="text-sm line-through text-gray-500 dark:text-gray-400">€{originalPrice}</span>
              )}
            </div>
          </div>
        )}
        
        {rating !== undefined && (
          <div className="absolute bottom-4 right-16 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-full">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm font-semibold">{rating}</span>
            {reviews !== undefined && (
              <span className="text-white/70 text-sm">({reviews})</span>
            )}
          </div>
        )}
        
        <div className="absolute bottom-4 right-4">
          <WishlistButton
            itemId={id}
            itemType="travel"
            itemTitle={title}
            itemImage={imageUrl}
            itemPrice={price}
            itemDescription={description}
          />
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            {title}
          </h3>
        </div>

        {description && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{description}</p>
        )}

        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          {duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          )}
        </div>

        {highlights.length > 0 && (
          <ul className="mb-6 space-y-2">
            {highlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="text-orange-500 mt-0.5">✓</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {ctas.length > 0 && (
          <div className="flex gap-3">
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

export default TravelCard
