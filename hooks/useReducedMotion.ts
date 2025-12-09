"use client"

import { useState, useEffect } from 'react'

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

export function getReducedMotionVariants<T extends Record<string, any>>(
  variants: T,
  reducedMotion: boolean
): T {
  if (!reducedMotion) return variants

  const reducedVariants = { ...variants }
  
  for (const key in reducedVariants) {
    if (typeof reducedVariants[key] === 'object') {
      reducedVariants[key] = {
        ...reducedVariants[key],
        transition: { duration: 0 }
      }
    }
  }
  
  return reducedVariants
}
