"use client"

import { useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down'
}

export function ParallaxSection({
  children,
  className,
  speed = 0.5,
  direction = 'up'
}: ParallaxSectionProps) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const factor = direction === 'up' ? -1 : 1
  const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed * factor])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  if (prefersReducedMotion) {
    return <div ref={ref} className={cn(className)}>{children}</div>
  }

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={cn(className)}>
      {children}
    </motion.div>
  )
}

interface ScrollProgressProps {
  className?: string
  color?: string
}

export function ScrollProgress({ className, color = 'var(--primary)' }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) return null

  return (
    <motion.div
      style={{ scaleX, backgroundColor: color }}
      className={cn('fixed top-0 left-0 right-0 h-1 origin-left z-50', className)}
    />
  )
}

interface RevealOnScrollProps {
  children: ReactNode
  className?: string
  width?: 'fit-content' | '100%'
  delay?: number
}

export function RevealOnScroll({
  children,
  className,
  width = 'fit-content',
  delay = 0
}: RevealOnScrollProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div style={{ width }} className={cn(className)}>{children}</div>
  }

  return (
    <div ref={ref} style={{ width }} className={cn('relative overflow-hidden', className)}>
      <motion.div
        initial={{ opacity: 0, y: 75 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 75 }}
        transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ left: 0 }}
        animate={isInView ? { left: '100%' } : { left: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.1, ease: 'easeIn' }}
        className="absolute top-0 bottom-0 left-0 right-0 bg-primary z-10"
        style={{ width: '100%' }}
      />
    </div>
  )
}

interface ScaleOnScrollProps {
  children: ReactNode
  className?: string
}

export function ScaleOnScroll({ children, className }: ScaleOnScrollProps) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  if (prefersReducedMotion) {
    return <div ref={ref} className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

interface HorizontalScrollSectionProps {
  children: ReactNode
  className?: string
}

export function HorizontalScrollSection({ children, className }: HorizontalScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%'])

  return (
    <section ref={containerRef} className={cn('relative h-[300vh]', className)}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8">
          {children}
        </motion.div>
      </div>
    </section>
  )
}

interface FadeInWhenVisibleProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function FadeInWhenVisible({ children, className, delay = 0 }: FadeInWhenVisibleProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

interface BlurInProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function BlurIn({ children, className, delay = 0 }: BlurInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: 'blur(20px)' }}
      animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
