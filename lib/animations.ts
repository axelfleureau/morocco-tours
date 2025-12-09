"use client"

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
}

export const fadeInDown = {
  initial: { opacity: 0, y: -40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
}

export const fadeInRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' }
}

export const heroTextReveal = {
  initial: { opacity: 0, y: 60, rotateX: -15 },
  animate: { opacity: 1, y: 0, rotateX: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
}

export const cardHover = {
  scale: 1.02,
  y: -8,
  transition: { duration: 0.3, ease: 'easeOut' }
}

export const cardTap = {
  scale: 0.98,
  transition: { duration: 0.1 }
}

export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2, ease: 'easeOut' }
}

export const buttonTap = {
  scale: 0.95,
  transition: { duration: 0.1 }
}

export const slideInFromBottom = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
}

export const parallaxY = (amount: number = 50) => ({
  initial: { y: 0 },
  animate: { y: -amount },
  transition: { duration: 1 }
})

export function initScrollAnimations() {
  if (typeof window === 'undefined') return

  gsap.utils.toArray('[data-animate]').forEach((element: any) => {
    const animation = element.dataset.animate
    const delay = parseFloat(element.dataset.delay || '0')
    
    let animationProps: gsap.TweenVars = {}
    
    switch (animation) {
      case 'fade-up':
        gsap.set(element, { opacity: 0, y: 50 })
        animationProps = { opacity: 1, y: 0 }
        break
      case 'fade-down':
        gsap.set(element, { opacity: 0, y: -50 })
        animationProps = { opacity: 1, y: 0 }
        break
      case 'fade-left':
        gsap.set(element, { opacity: 0, x: -50 })
        animationProps = { opacity: 1, x: 0 }
        break
      case 'fade-right':
        gsap.set(element, { opacity: 0, x: 50 })
        animationProps = { opacity: 1, x: 0 }
        break
      case 'scale':
        gsap.set(element, { opacity: 0, scale: 0.8 })
        animationProps = { opacity: 1, scale: 1 }
        break
      default:
        gsap.set(element, { opacity: 0 })
        animationProps = { opacity: 1 }
    }

    gsap.to(element, {
      ...animationProps,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse'
      }
    })
  })
}

export function animateCounter(
  element: HTMLElement, 
  endValue: number, 
  duration: number = 2,
  prefix: string = '',
  suffix: string = ''
) {
  const obj = { value: 0 }
  
  gsap.to(obj, {
    value: endValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = `${prefix}${Math.round(obj.value)}${suffix}`
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      once: true
    }
  })
}

export function createParallax(element: HTMLElement, speed: number = 0.5) {
  gsap.to(element, {
    yPercent: -30 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })
}

export function createTextReveal(element: HTMLElement) {
  const text = element.textContent || ''
  element.textContent = ''
  
  gsap.to(element, {
    duration: 1.5,
    text: { value: text, delimiter: '' },
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      once: true
    }
  })
}

export function cleanupScrollTriggers() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

export { gsap, ScrollTrigger }
