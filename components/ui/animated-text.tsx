"use client"

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  once?: boolean
  animation?: 'typewriter' | 'fadeWords' | 'slideUp' | 'gradient'
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  once = true,
  animation = 'fadeWords',
  tag: Tag = 'p'
}: AnimatedTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.5 })
  const words = text.split(' ')

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay
      }
    }
  }

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  if (animation === 'gradient') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Tag
          className={cn(
            'bg-gradient-to-r from-primary via-orange-500 to-red-500 bg-clip-text text-transparent animate-gradient-x',
            className
          )}
        >
          {text}
        </Tag>
      </motion.div>
    )
  }

  if (animation === 'slideUp') {
    return (
      <motion.div
        ref={ref}
        className="overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={isInView ? { y: 0 } : { y: '100%' }}
          transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Tag className={cn(className)}>{text}</Tag>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={cn('flex flex-wrap', className)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

interface TypewriterTextProps {
  text: string
  className?: string
  delay?: number
  speed?: number
  cursor?: boolean
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

export function TypewriterText({
  text,
  className,
  delay = 0,
  speed = 50,
  cursor = true,
  tag: Tag = 'p'
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(cursor)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return

    let currentIndex = 0
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(interval)
          setTimeout(() => setShowCursor(false), 1000)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [isInView, text, delay, speed])

  return (
    <Tag ref={ref} className={cn(className)}>
      {displayedText}
      {showCursor && (
        <span className="animate-pulse ml-0.5 inline-block w-0.5 h-[1em] bg-current align-middle" />
      )}
    </Tag>
  )
}

interface CountUpProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  decimals?: number
}

export function CountUp({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  className,
  decimals = 0
}: CountUpProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const endTime = startTime + duration * 1000

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = end * easeOutQuart

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isInView, end, duration])

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}
