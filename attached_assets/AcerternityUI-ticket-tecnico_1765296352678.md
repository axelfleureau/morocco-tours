# ✨ TICKET TECNICO: ACETERNITY UI - Premium Tailwind + Framer Motion Components

**Status:** Ready for AI Integration  
**Priority:** High  
**Framework:** React + Next.js + Aceternity UI  
**Stack:** Tailwind CSS v3 + Framer Motion + TypeScript  
**Date:** 2025-12-04

---

## 📋 OBIETTIVO
Integrare Aceternity UI per implementare componenti animati premium (70+ componenti) basati su Tailwind CSS + Framer Motion, usando copy-paste diretto o CLI aceternity-ui.

---

## 🎯 COSA È ACETERNITY UI

**Aceternity UI** = Collezione di 70+ componenti React premium:
- ✅ Copy-paste components (no npm install singolo)
- ✅ Tailwind CSS v3 + Framer Motion
- ✅ TypeScript ready
- ✅ Fully customizable
- ✅ Used by major companies (GitHub, Vercel, etc.)

**Approcci di installazione:**
1. **CLI Method** (raccomandato): `npx aceternity-ui add [component]`
2. **Copy-Paste**: Copia il codice dal sito
3. **Manual Setup**: Setup manuale con Tailwind + dependencies

---

## 🔧 SETUP INIZIALE

### OPZIONE 1: CLI Setup (Consigliato)

```bash
# 1. Crea progetto React/Next.js
npm create vite@latest my-app -- --template react
cd my-app

# Oppure: Next.js
npx create-next-app@latest my-app --typescript --tailwind
cd my-app

# 2. Initialize Aceternity UI
npx aceternity-ui init

# Questo crea:
# - components.json
# - tailwind.config.js aggiornato
# - Installa: framer-motion, clsx, tailwind-merge
```

### OPZIONE 2: Manual Setup (Se non usi CLI)

```bash
# 1. Installa dipendenze base
npm install framer-motion clsx tailwind-merge

# 2. Installa Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Configura tailwind.config.js
```

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```bash
# 4. Crea cartelle struttura
mkdir -p src/components/ui
mkdir -p src/utils

# 5. Crea cn.ts utility
```

```typescript
// src/utils/cn.ts
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```bash
# 6. Configura CSS globale
# In src/index.css (o main.css in Vite)
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🎯 COMPONENTI ESSENZIALI (20 TOP)

### 1️⃣ SPARKLES (Particelle Animate)
```jsx
import { Sparkles } from '@/components/ui/sparkles';

export function SparklesDemo() {
  return (
    <div className="relative w-full h-screen bg-black">
      <Sparkles 
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={1200}
        className="w-full h-full"
        particleColor="#FFFFFF"
      />
    </div>
  );
}
```

### 2️⃣ BACKGROUND BEAMS (Fasci Animati)
```jsx
import { BackgroundBeams } from '@/components/ui/background-beams';

export function BeamsDemo() {
  return (
    <div className="relative w-full min-h-screen bg-neutral-950">
      <BackgroundBeams className="absolute inset-0" />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <h1 className="text-4xl text-white">Content over Beams</h1>
      </div>
    </div>
  );
}
```

### 3️⃣ INFINITE MOVING CARDS (Carousel Infinito)
```jsx
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

const testimonials = [
  { quote: 'Excellent service!', name: 'John', title: 'CEO' },
  { quote: 'Highly recommended', name: 'Jane', title: 'Designer' },
];

export function CardCarousel() {
  return (
    <InfiniteMovingCards
      items={testimonials}
      direction="right"
      speed="slow"
    />
  );
}
```

### 4️⃣ EVERVAULT CARD (3D Encrypted Card)
```jsx
import { EvervaultCard } from '@/components/ui/evervault-card';

export function EncryptedCardDemo() {
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <EvervaultCard text="hover me" />
    </div>
  );
}
```

### 5️⃣ GLOWING EFFECT (Border Glow)
```jsx
import { GlowingBorder } from '@/components/ui/glowing-border';

export function GlowButton() {
  return (
    <GlowingBorder>
      <button className="px-6 py-3 bg-black text-white">
        Click Me
      </button>
    </GlowingBorder>
  );
}
```

### 6️⃣ HERO PARALLAX (Scroll Parallax 3D)
```jsx
import { HeroParallax } from '@/components/ui/hero-parallax';

const products = [
  { title: 'Product 1', thumbnail: '/img1.jpg', id: 1 },
  { title: 'Product 2', thumbnail: '/img2.jpg', id: 2 },
];

export function ParallaxHero() {
  return <HeroParallax products={products} />;
}
```

### 7️⃣ CONTAINER SCROLL ANIMATION (3D Scroll Reveal)
```jsx
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

export function ScrollAnimationDemo() {
  return (
    <ContainerScroll
      users={[
        { name: 'User 1' },
        { name: 'User 2' },
      ]}
    />
  );
}
```

### 8️⃣ STICKY SCROLL REVEAL (Reveal on Scroll)
```jsx
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';

const content = [
  { title: 'Section 1', description: 'Content 1' },
  { title: 'Section 2', description: 'Content 2' },
];

export function StickyDemo() {
  return <StickyScroll content={content} />;
}
```

### 9️⃣ ANIMATED TABS (Schede Animate)
```jsx
import { Tabs } from '@/components/ui/animated-tabs';

const tabs = [
  { label: 'Tab 1', id: 'tab1', content: <div>Content 1</div> },
  { label: 'Tab 2', id: 'tab2', content: <div>Content 2</div> },
];

export function TabsDemo() {
  return <Tabs tabs={tabs} />;
}
```

### 🔟 BACKGROUND GRADIENT ANIMATION (Gradient Animato)
```jsx
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';

export function GradientBgDemo() {
  return (
    <BackgroundGradientAnimation>
      <div className="text-white text-center">
        <h1>Animated Gradient Background</h1>
      </div>
    </BackgroundGradientAnimation>
  );
}
```

### 1️⃣1️⃣ BENTO GRID (Layout Skewed)
```jsx
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';

const items = [
  { title: 'Item 1', description: 'Desc 1', header: <div>Header 1</div> },
  { title: 'Item 2', description: 'Desc 2', header: <div>Header 2</div> },
];

export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem key={i} {...item} />
      ))}
    </BentoGrid>
  );
}
```

### 1️⃣2️⃣ FLIP WORDS (Text Flip Animation)
```jsx
import { FlipWords } from '@/components/ui/flip-words';

export function FlipWordsDemo() {
  const words = ['beautiful', 'amazing', 'wonderful', 'fantastic'];
  
  return (
    <div className="text-4xl">
      This website is <FlipWords words={words} /> to use
    </div>
  );
}
```

### 1️⃣3️⃣ TEXT GENERATE EFFECT (Typewriter Fade)
```jsx
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

export function TextGenerateDemo() {
  return (
    <TextGenerateEffect 
      words="Your text content here will fade in word by word"
    />
  );
}
```

### 1️⃣4️⃣ SPOTLIGHT (Focus Spotlight)
```jsx
import { Spotlight } from '@/components/ui/spotlight';

export function SpotlightDemo() {
  return (
    <div className="relative w-full min-h-screen bg-black">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="relative z-10">Your content</div>
    </div>
  );
}
```

### 1️⃣5️⃣ MOVING BORDER (Border Animato)
```jsx
import { MovingBorder } from '@/components/ui/moving-border';

export function MovingBorderDemo() {
  return (
    <MovingBorder
      borderRadius="1.75rem"
      boxShadow="0px 0px 60px rgba(34, 197, 94, 0.3)"
      containerClassName="w-full h-32"
    >
      <button className="px-6 py-3">Animated Button</button>
    </MovingBorder>
  );
}
```

### 1️⃣6️⃣ CARD STACK (Pile di Carte)
```jsx
import { CardStack, Highlight } from '@/components/ui/card-stack';

const cards = [
  { id: 1, name: 'Card 1', designation: 'Role', content: <p>Content</p> },
];

export function CardStackDemo() {
  return (
    <CardStack 
      items={cards}
      offset={10}
      scaleFactor={0.06}
    />
  );
}
```

### 1️⃣7️⃣ ANIMATED MODAL (Modal Animato)
```jsx
import { Modal, ModalBody, ModalContent, ModalTrigger } from '@/components/ui/animated-modal';

export function ModalDemo() {
  return (
    <Modal>
      <ModalTrigger className="bg-black text-white px-4 py-2">
        Open Modal
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <p>Modal content here</p>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}
```

### 1️⃣8️⃣ FOCUS CARDS (Blur Hover)
```jsx
import { FocusCards } from '@/components/ui/focus-cards';

const cards = [
  { src: '/img1.jpg', title: 'Card 1' },
  { src: '/img2.jpg', title: 'Card 2' },
];

export function FocusCardsDemo() {
  return <FocusCards cards={cards} />;
}
```

### 1️⃣9️⃣ LAMP EFFECT (Linear Lamp Header)
```jsx
import { LampContainer } from '@/components/ui/lamp';

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1 className="text-4xl text-white">
        Section Title
      </motion.h1>
    </LampContainer>
  );
}
```

### 2️⃣0️⃣ NAVBAR MENU (Big Nav Animato)
```jsx
import { Menu, MenuItem, HoveredLink } from '@/components/ui/navbar-menu';

export function NavbarMenuDemo() {
  return (
    <Menu setActive={setActive} active={active}>
      <MenuItem setActive={setActive} active={active} item="Products">
        <div className="flex flex-col">
          <HoveredLink href="#">Product 1</HoveredLink>
          <HoveredLink href="#">Product 2</HoveredLink>
        </div>
      </MenuItem>
    </Menu>
  );
}
```

---

## 📦 INSTALLARE COMPONENTI via CLI

```bash
# Installa singolo componente
npx aceternity-ui add sparkles

# Installa con examples
npx aceternity-ui add sparkles -e

# Installa tutti i componenti
npx aceternity-ui add --all

# Lista di tutti i componenti disponibili
npx aceternity-ui add

# Stack TypeScript + Tailwind (auto-detect)
npx aceternity-ui add background-beams
```

---

## 🎛️ STRUTTURA PROGETTO

```
src/
├── components/
│   ├── ui/
│   │   ├── sparkles.tsx
│   │   ├── background-beams.tsx
│   │   ├── infinite-moving-cards.tsx
│   │   ├── evervault-card.tsx
│   │   ├── [altri componenti...]
│   └── sections/
│       ├── HeroSection.tsx
│       ├── FeaturesSection.tsx
├── utils/
│   └── cn.ts
├── App.tsx
└── index.css
```

---

## 🔧 CONFIGURAZIONE TAILWIND

```javascript
// tailwind.config.js
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Personalizza colori
      },
      animation: {
        // Personalizza animazioni
      },
    },
  },
  plugins: [],
}
export default config
```

---

## 🎨 USAGE PATTERNS

### Pattern 1: Composizione Componenti
```jsx
import { BackgroundBeams } from '@/components/ui/background-beams';
import { SpotlightNew } from '@/components/ui/spotlight-new';

export function HeroSection() {
  return (
    <div className="relative w-full min-h-screen bg-black">
      <BackgroundBeams />
      <SpotlightNew />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <h1 className="text-5xl text-white">Your Title</h1>
      </div>
    </div>
  );
}
```

### Pattern 2: Responsive Behavior
```jsx
import { useMediaQuery } from 'react-responsive';

export function ResponsiveComponent() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  return (
    <div className={isMobile ? 'px-4' : 'px-8'}>
      <Component />
    </div>
  );
}
```

### Pattern 3: Dark Mode Support
```jsx
// Aceternity UI componenti sono dark-mode ready
// Usa className con dark: prefix per Tailwind dark mode

<div className="bg-white dark:bg-black text-black dark:text-white">
  <Component />
</div>
```

---

## 📚 DIPENDENZE COMUNI

```bash
# Framer Motion (per tutte le animazioni)
npm install framer-motion

# Tailwind CSS (styling)
npm install -D tailwindcss postcss autoprefixer

# Utility CSS
npm install clsx tailwind-merge

# Per sensori mouse/scroll
npm install react-use

# Per icone
npm install lucide-react

# Per link preview
npm install react-rss-parser
```

---

## 🎯 ADVANCED FEATURES

### Custom Animation Props
```typescript
interface AnimationProps {
  duration?: number;        // millisecondi
  delay?: number;           // millisecondi
  repeat?: number | boolean; // repeat count
  ease?: string;            // easing function
  direction?: 'forward' | 'reverse';
}
```

### Accessing Component States
```jsx
import { useState } from 'react';

export function InteractiveComponent() {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <Component 
      onStateChange={(state) => setIsActive(state)}
      isActive={isActive}
    />
  );
}
```

### Performance Optimization
```jsx
import dynamic from 'next/dynamic';

// Lazy load heavy components
const Sparkles = dynamic(
  () => import('@/components/ui/sparkles').then(mod => mod.Sparkles),
  { ssr: false }
);

export function Page() {
  return <Sparkles />;
}
```

---

## ⚡ BEST PRACTICES

✅ **DO:**
- Installa via `npx aceternity-ui add [component]`
- Usa TypeScript per type safety
- Personalizza colori via Tailwind config
- Lazy-load componenti heavy (Sparkles, Beams)
- Combina componenti per sezioni complesse
- Testa responsive behavior
- Usa dark mode classes
- Sfrutta Framer Motion docs per customization

❌ **DON'T:**
- Non modificare direttamente i componenti UI
- Non usare troppi background effects (performance)
- Non dimentcare di installare dependencies
- Non usare colori hardcoded (usa Tailwind config)
- Non ignorare accessibility
- Non sovrappesare animazioni (max 1s duration)

---

## 🔗 COMPONENTI PER CATEGORIA

| Categoria | Componenti |
|-----------|-----------|
| **Backgrounds** | Sparkles, BeamsWithCollision, BeamsBackground, GradientAnimation, AuroraBackground |
| **Cards** | EvervaultCard, CometCard, GlareCard, WobbleCard, FocusCards, CardStack |
| **Text Effects** | FlipWords, TextGenerateEffect, EncryptedText, TypewriterEffect |
| **Scroll** | HeroParallax, StickyScrollReveal, ContainerScrollAnimation, ParallaxGridScroll |
| **Navigation** | NavbarMenu, FloatingNavbar, FloatingDock, Sidebar |
| **Forms** | SignupForm, FileUpload, PlaceholdersAndVanishInput |
| **Utility** | Spotlight, MovingBorder, GlowingBorder, FollowingPointer |

---

## 📝 COMMAND QUICK REFERENCE

```bash
# Setup
npx aceternity-ui init

# Installazione
npx aceternity-ui add [component-name]
npx aceternity-ui add [component] -e          # con examples
npx aceternity-ui add --all                   # tutti

# Development
npm run dev                                    # Vite
npm run dev                                    # Next.js

# Build
npm run build
npm run start
```

---

## 🚀 STARTER TEMPLATE

```jsx
'use client';

import { SparklesCore } from '@/components/ui/sparkles';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { motion } from 'framer-motion';

export default function App() {
  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Background */}
      <div className="w-full absolute inset-0">
        <SparklesCore
          id="tsparticles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <motion.h1 
          className="text-6xl font-bold text-white text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Aceternity UI
        </motion.h1>

        <motion.p
          className="text-xl text-neutral-300 mt-4 max-w-2xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Beautiful Tailwind CSS and Framer Motion Components
        </motion.p>

        <BackgroundGradient className="mt-12 p-8 rounded-xl">
          <button className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:scale-105 transition">
            Get Started
          </button>
        </BackgroundGradient>
      </div>

      {/* Testimonials */}
      <div className="relative z-10 mt-20">
        <InfiniteMovingCards
          items={[
            { quote: 'Amazing components!', name: 'User 1' },
            { quote: 'Highly customizable', name: 'User 2' },
          ]}
          direction="right"
          speed="slow"
        />
      </div>
    </div>
  );
}
```

---

## 🔗 RESOURCES

- **Official Site**: https://ui.aceternity.com
- **NPM Package**: https://www.npmjs.com/package/aceternity-ui
- **GitHub**: https://github.com/shuding/codemod-aceternity
- **Framer Motion Docs**: https://www.framer.com/motion
- **Tailwind CSS Docs**: https://tailwindcss.com

---

**✨ Ready to build premium UIs with Aceternity!**

Ricorda: Aceternity UI = Copy + Customize + Deploy 🚀