import * as React from 'react'
import Link from 'next/link'
import { MapPin, Navigation, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CityCardProps } from '@/lib/types/cards'
import { BaseCard } from '@/components/ui/BaseCard'
import { CardBadge } from '@/components/ui/CardBadge'

export function CityCard({
  id,
  image,
  title,
  description,
  tagline,
  distance,
  population,
  attractions = [],
  bestSeason,
  region,
  badges = [],
  ctas = [],
  className,
  onClick,
}: CityCardProps) {
  const imageUrl = Array.isArray(image) ? image[0] : image

  return (
    <BaseCard className={cn('group', className)} onClick={onClick}>
      <div className="relative aspect-[16/10] lg:aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl || '/placeholder.svg'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {badges.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {badges.map((badge, idx) => (
              <CardBadge key={idx} label={badge.label} variant={badge.variant} />
            ))}
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">{title}</h2>
          {tagline && (
            <p className="text-lg text-white/90 mb-4">{tagline}</p>
          )}
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
            {region && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{region}</span>
              </div>
            )}
            {distance && (
              <div className="flex items-center gap-1">
                <Navigation className="w-4 h-4" />
                <span>{distance}</span>
              </div>
            )}
            {population && (
              <div className="flex items-center gap-1">
                <span>{population} abitanti</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-8">
        {description && (
          <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        )}

        {attractions.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Attrazioni Principali:</p>
            <ul className="space-y-2">
              {attractions.slice(0, 3).map((attraction, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span>{attraction}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {bestSeason && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Periodo migliore:</span> {bestSeason}
            </p>
          </div>
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

export default CityCard
