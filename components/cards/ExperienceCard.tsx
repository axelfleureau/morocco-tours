import * as React from 'react'
import Link from 'next/link'
import { Clock, Users, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ExperienceCardProps } from '@/lib/types/cards'
import { BaseCard } from '@/components/ui/BaseCard'
import { CardBadge } from '@/components/ui/CardBadge'
import WishlistButton from '@/components/WishlistButton'

export function ExperienceCard({
  id,
  image,
  title,
  description,
  price,
  duration,
  difficulty,
  groupSize,
  included = [],
  badges = [],
  quickInfo = [],
  ctas = [],
  className,
  onClick,
}: ExperienceCardProps) {
  const imageUrl = Array.isArray(image) ? image[0] : image

  return (
    <BaseCard className={cn('group', className)} onClick={onClick}>
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={imageUrl || '/placeholder.svg'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, idx) => (
              <CardBadge key={idx} label={badge.label} variant={badge.variant} />
            ))}
          </div>
          
          {(price !== undefined || duration) && (
            <div className="flex gap-2">
              {price !== undefined && (
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    da €{price}
                  </span>
                </div>
              )}
              {duration && (
                <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm text-white">{duration}</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="absolute bottom-4 right-4">
          <WishlistButton
            itemId={id}
            itemType="experience"
            itemTitle={title}
            itemImage={imageUrl}
            itemPrice={price}
            itemDescription={description}
          />
        </div>
      </div>

      <div className="p-6 lg:p-8">
        {quickInfo.length > 0 && quickInfo[0] && (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
              {React.createElement(quickInfo[0].icon, { className: "w-6 h-6 text-orange-600 dark:text-orange-400" })}
            </div>
          </div>
        )}

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
          {title}
        </h3>

        {description && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{description}</p>
        )}

        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          {difficulty && (
            <div className="flex items-center gap-1">
              <span className="font-medium">Difficoltà:</span>
              <span className="capitalize">{difficulty}</span>
            </div>
          )}
          {groupSize && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{groupSize}</span>
            </div>
          )}
        </div>

        {included.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Incluso:</p>
            <ul className="space-y-1">
              {included.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {ctas.length > 0 && (
          <div className="flex gap-3">
            {ctas.slice(0, 2).map((cta, idx) => {
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

export default ExperienceCard
