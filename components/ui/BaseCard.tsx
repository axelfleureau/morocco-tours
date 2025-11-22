import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BaseCardProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function BaseCard({ children, className, onClick, ...props }: BaseCardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/60 dark:border-gray-800 overflow-hidden',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}

export default BaseCard
