import * as React from 'react'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ServiceCardProps } from '@/lib/types/cards'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CardBadge } from '@/components/ui/CardBadge'

export function ServiceCard({
  id,
  image,
  title,
  description,
  icon: Icon,
  price,
  priceType = 'per_person',
  locations = [],
  badges = [],
  ctas = [],
  className,
  onClick,
}: ServiceCardProps) {
  const imageUrl = Array.isArray(image) ? image[0] : image

  const priceTypeLabels = {
    per_person: 'a persona',
    per_day: 'al giorno',
    per_trip: 'per viaggio',
    fixed: 'fisso',
  }

  const formatPrice = () => {
    if (typeof price === 'string') return price
    if (price === undefined) return 'Su richiesta'
    return `€${price} ${priceTypeLabels[priceType]}`
  }

  return (
    <Card 
      className={cn(
        'group hover:shadow-2xl transition-all duration-300 border-border hover:border-orange-200 dark:hover:border-orange-800 cursor-pointer',
        className
      )} 
      onClick={onClick}
    >
      <CardHeader className="pb-4">
        {Icon && (
          <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Icon className="w-7 h-7 text-orange-600 dark:text-orange-400" />
          </div>
        )}
        
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {badges.map((badge, idx) => (
              <CardBadge key={idx} label={badge.label} variant={badge.variant} />
            ))}
          </div>
        )}
        
        <CardTitle className="text-xl font-bold text-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
          {title}
        </CardTitle>
        
        {description && (
          <CardDescription className="text-muted-foreground mt-2">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {imageUrl && (
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="space-y-3">
          {price !== undefined && (
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium text-muted-foreground">Prezzo</span>
              <span className="font-bold text-lg text-foreground">{formatPrice()}</span>
            </div>
          )}

          {locations.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Località disponibili:
              </p>
              <div className="flex flex-wrap gap-2">
                {locations.slice(0, 3).map((location, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                  >
                    {location}
                  </span>
                ))}
                {locations.length > 3 && (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                    +{locations.length - 3} altre
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {ctas.length > 0 && (
          <div className="flex gap-3 pt-2">
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
      </CardContent>
    </Card>
  )
}

export default ServiceCard
