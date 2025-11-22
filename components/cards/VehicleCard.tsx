import * as React from 'react'
import Link from 'next/link'
import { Users, Settings, Luggage, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { VehicleCardProps } from '@/lib/types/cards'
import { BaseCard } from '@/components/ui/BaseCard'
import { CardBadge } from '@/components/ui/CardBadge'
import WishlistButton from '@/components/WishlistButton'

export function VehicleCard({
  id,
  image,
  title,
  description,
  pricePerDay,
  seats,
  transmission,
  fuelType,
  luggage,
  features = [],
  availability = 'available',
  badges = [],
  ctas = [],
  className,
  onClick,
}: VehicleCardProps) {
  const images = Array.isArray(image) ? image : [image]
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const availabilityConfig = {
    available: { label: 'Disponibile', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
    limited: { label: 'Disponibilità Limitata', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' },
    unavailable: { label: 'Non Disponibile', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' },
  }

  return (
    <BaseCard className={cn('group', className)} onClick={onClick}>
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={images[currentImageIndex] || '/placeholder.svg'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
              aria-label="Immagine precedente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
              aria-label="Immagine successiva"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                  )}
                />
              ))}
            </div>
          </>
        )}
        
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {badges.map((badge, idx) => (
            <CardBadge key={idx} label={badge.label} variant={badge.variant} />
          ))}
          <div className={cn('px-3 py-1 rounded-full text-xs font-semibold', availabilityConfig[availability].color)}>
            {availabilityConfig[availability].label}
          </div>
        </div>
        
        {pricePerDay !== undefined && (
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <div className="text-center">
              <span className="font-bold text-lg text-gray-900 dark:text-gray-100">€{pricePerDay}</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 block">al giorno</span>
            </div>
          </div>
        )}
        
        <div className="absolute bottom-4 right-4">
          <WishlistButton
            itemId={id}
            itemType="vehicle"
            itemTitle={title}
            itemImage={images[0]}
            itemPrice={pricePerDay}
            itemDescription={description}
          />
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
          {title}
        </h3>

        {description && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{description}</p>
        )}

        <div className="grid grid-cols-3 gap-3 mb-4">
          {seats !== undefined && (
            <div className="flex flex-col items-center gap-1 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-xs text-gray-600 dark:text-gray-400">{seats} posti</span>
            </div>
          )}
          {transmission && (
            <div className="flex flex-col items-center gap-1 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">{transmission}</span>
            </div>
          )}
          {luggage !== undefined && (
            <div className="flex flex-col items-center gap-1 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Luggage className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-xs text-gray-600 dark:text-gray-400">{luggage} bagagli</span>
            </div>
          )}
        </div>

        {features.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Caratteristiche:</p>
            <ul className="grid grid-cols-2 gap-2">
              {features.slice(0, 4).map((feature, idx) => (
                <li key={idx} className="flex items-start gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-orange-500 mt-0.5">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
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

export default VehicleCard
