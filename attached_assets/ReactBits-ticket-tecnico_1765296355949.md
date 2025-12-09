# 🎨 TICKET TECNICO: REACT BITS - Componenti Animati Interattivi

**Status:** Ready for AI Integration  
**Priority:** High  
**Framework:** Vite + React + React Bits  
**Date:** 2025-12-04

---

## 📋 OBIETTIVO
Integrare React Bits per implementare componenti animati, interattivi e fully-customizable in applicazioni React/Vite con supporto a più tech stack (JS/TS + CSS/Tailwind).

---

## 🔧 INSTALLAZIONE & SETUP

### Setup JSRepo CLI (One-time)
```bash
# Installa il CLI di React Bits
npm install -g @jsrepo/cli
```

### Per Ogni Progetto - Scegli il Tuo Stack

#### 📦 JavaScript + CSS
```bash
jsrepo install react-bits/[COMPONENT_NAME]
# Esempio: jsrepo install react-bits/ballpit
```

#### 📦 JavaScript + Tailwind CSS
```bash
jsrepo install react-bits/[COMPONENT_NAME]:tailwind
# Esempio: jsrepo install react-bits/hyperspeed:tailwind
```

#### 📦 TypeScript + CSS
```bash
jsrepo install react-bits/[COMPONENT_NAME]:typescript
# Esempio: jsrepo install react-bits/profile-card:typescript
```

#### 📦 TypeScript + Tailwind CSS
```bash
jsrepo install react-bits/[COMPONENT_NAME]:typescript:tailwind
# Esempio: jsrepo install react-bits/tilted-card:typescript:tailwind
```

### Alternative: Copy-Paste (No CLI)
Copia direttamente dal sito https://reactbits.dev senza CLI setup - perfetto per prototipazione veloce.

---

## 🎯 COMPONENTI PRINCIPALI (ESSENZIALI)

### 1️⃣ BALLPIT (3D Interactive Ball Physics)
```jsx
import { Ballpit } from 'react-bits';

export default function App() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <Ballpit 
        count={50}           // numero palline (default: 50)
        gravity={9.8}        // gravità (default: 9.8)
        friction={0.95}      // frizione (default: 0.95)
        radius={15}          // raggio pallina (default: 15)
        color="#FF6B6B"      // colore custom
        wireframe={false}    // debug wireframe
      />
    </div>
  );
}
```

### 2️⃣ HYPERSPEED (Warp Speed Text Animation)
```jsx
import { Hyperspeed } from 'react-bits';

export default function App() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Hyperspeed 
        text="Futuristic Motion"
        speed={0.5}          // velocità animazione (0-1)
        glow={true}          // effetto glow
        distortion={1}       // distorsione
        color="#00FF88"      // colore del testo
        intensity={2}        // intensità effetto
      />
    </div>
  );
}
```

### 3️⃣ PROFILE CARD (Animated Bio Reveals)
```jsx
import { ProfileCard } from 'react-bits';

export default function App() {
  return (
    <ProfileCard
      name="John Doe"
      role="Full-stack Developer"
      image="https://example.com/avatar.jpg"
      bio="Passionate about web animations"
      gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      animationDuration={0.8}
      hover={true}
    />
  );
}
```

### 4️⃣ TILTED CARD (3D Hover Tilt Effect)
```jsx
import { TiltedCard } from 'react-bits';

export default function App() {
  return (
    <TiltedCard
      scale={1.05}          // zoom on hover
      rotationX={15}        // rotazione asse X
      rotationY={15}        // rotazione asse Y
      shine={true}          // effetto shine
      shineOpacity={0.5}    // opacità shine
    >
      <div className="p-6 bg-white rounded-lg">
        <h2>Tilted Content</h2>
        <p>Hover per vedere l'effetto 3D</p>
      </div>
    </TiltedCard>
  );
}
```

### 5️⃣ SPOTLIGHT CARD (Focused Light Animation)
```jsx
import { SpotlightCard } from 'react-bits';

export default function App() {
  return (
    <SpotlightCard
      spotlightColor="rgba(255, 255, 255, 0.1)"
      shadowColor="rgba(0, 0, 0, 0.5)"
      borderRadius={12}
      blur={8}
    >
      <div className="p-8 text-white">
        <h3>Premium Content</h3>
        <p>Muovi il mouse per illuminare</p>
      </div>
    </SpotlightCard>
  );
}
```

### 6️⃣ LETTER GLITCH (Text Distortion Hover)
```jsx
import { LetterGlitch } from 'react-bits';

export default function App() {
  return (
    <LetterGlitch
      text="GLITCH EFFECT"
      speed={0.05}          // velocità glitch
      intensity={3}         // quanto distorquere
      glitchColor="#FF00FF"
      hover={true}          // trigger on hover
    />
  );
}
```

### 7️⃣ BEAMS (Shimmering Background)
```jsx
import { Beams } from 'react-bits';

export default function App() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Beams
        beamCount={5}        // numero di fasci
        speed={2}            // velocità animazione
        color="#00FFFF"
        opacity={0.3}
        blurAmount={40}
      />
      <div className="relative z-10 p-12 text-white">
        <h1>Content Above Beams</h1>
      </div>
    </div>
  );
}
```

### 8️⃣ MODEL VIEWER (3D Object Interaction)
```jsx
import { ModelViewer } from 'react-bits';

export default function App() {
  return (
    <ModelViewer
      modelPath="/path/to/model.gltf"
      autoRotate={true}
      controlType="orbit"   // orbit | pan | zoom
      backgroundColor="#1a1a1a"
      zoom={1}
      rotationSpeed={0.5}
    />
  );
}
```

### 9️⃣ IRIDESCENCE (Shimmering Overlay)
```jsx
import { Iridescence } from 'react-bits';

export default function App() {
  return (
    <Iridescence
      angle={45}            // angolo shimmer
      speed={3}
      intensity={0.8}
      colors={['#FF00FF', '#00FFFF', '#FFFF00']}
    >
      <div className="p-8">
        <p>Contenuto con effetto iridescente</p>
      </div>
    </Iridescence>
  );
}
```

### 🔟 CHROMA GRID (Color-Shifting Interactive Grid)
```jsx
import { ChromaGrid } from 'react-bits';

export default function App() {
  return (
    <ChromaGrid
      rows={4}
      columns={6}
      gap={8}
      animationSpeed={2}
      colorMode="rainbow"   // rainbow | gradient | random
      onCellClick={(row, col) => console.log(`Cell: ${row}, ${col}`)}
    />
  );
}
```

---

## 🎛️ PROPS COMUNI (Pattern Ricorrente)

### Animazione & Performance
```javascript
{
  duration: 0.8,           // durata animazione
  delay: 0.2,              // delay all'inizio
  ease: 'ease-out',        // timing function
  repeat: 'loop',          // loop | once | reverse
  fps: 60                  // frame rate target
}
```

### Styling & Appearance
```javascript
{
  color: '#FF6B6B',        // colore primario
  backgroundColor: '#000',  // colore sfondo
  borderRadius: 12,        // border radius
  shadow: 'lg',            // shadow level
  opacity: 0.9             // trasparenza
}
```

### Interazione
```javascript
{
  interactive: true,       // abilita interazione
  hover: true,             // effetto hover
  onClick: (e) => {},      // callback click
  onHover: (state) => {},  // callback hover
  responsive: true         // auto-responsive
}
```

---

## 🔧 CUSTOM SETUP (Advanced)

### Setup Manuale con Framer Motion
```jsx
import { motion } from 'framer-motion';

export function CustomAnimated({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false }}
    >
      {children}
    </motion.div>
  );
}
```

### Stack Detection (Auto-Select)
```jsx
// React Bits auto-detect TSX/JSX e CSS/Tailwind
// Non serve configurazione manuale
import { ComponenteReactBits } from 'react-bits';
```

### Tailwind Config (Se usi Tailwind)
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./node_modules/react-bits/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## 🎨 PATTERN DI USO COMMON

### Composizione di Componenti
```jsx
import { Beams, SpotlightCard } from 'react-bits';

export function HeroSection() {
  return (
    <div className="relative w-full h-screen">
      <Beams speed={1.5} />
      <div className="absolute inset-0 flex items-center justify-center">
        <SpotlightCard>
          <h1>Stunning Hero</h1>
        </SpotlightCard>
      </div>
    </div>
  );
}
```

### Responsive Behavior
```jsx
import { TiltedCard } from 'react-bits';
import { useMediaQuery } from 'react-use';

export function ResponsiveCard() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <TiltedCard 
      rotationX={isMobile ? 0 : 15}
      rotationY={isMobile ? 0 : 15}
      scale={isMobile ? 1 : 1.05}
    >
      Content
    </TiltedCard>
  );
}
```

### Staggered Animation
```jsx
import { motion } from 'framer-motion';
import { TiltedCard } from 'react-bits';

export function CardGrid() {
  const cards = [1, 2, 3, 4];
  
  return (
    <div className="grid grid-cols-2 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <TiltedCard>Card {card}</TiltedCard>
        </motion.div>
      ))}
    </div>
  );
}
```

---

## ⚡ PERFORMANCE OPTIMIZATION

### Lazy Load Components
```jsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Ballpit = dynamic(() => import('react-bits').then(m => m.Ballpit), {
  loading: () => <div>Loading 3D Scene...</div>
});

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Ballpit count={50} />
    </Suspense>
  );
}
```

### Throttle Scroll Events
```jsx
import { throttle } from 'lodash';
import { useState } from 'react';

export function ScrollAnimated() {
  const [isVisible, setIsVisible] = useState(false);
  
  const handleScroll = throttle(() => {
    // trigger animation
    setIsVisible(true);
  }, 500);
  
  return <div onScroll={handleScroll}>Content</div>;
}
```

### GPU Acceleration (Tailwind)
```jsx
// Usa transform3d per GPU acceleration
<div className="transform-gpu scale-100 translate-z-0">
  Content
</div>
```

---

## 🎛️ UTILITY & HELPERS

```javascript
// Detect if element is in viewport
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
};

// Smooth scroll to element
const smoothScroll = (selector) => {
  document.querySelector(selector)?.scrollIntoView({ 
    behavior: 'smooth' 
  });
};

// Calculate viewport height
const vh = () => window.innerHeight * 0.01;

// Clamp value between min-max
const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

// Map value from range A to range B
const map = (val, inMin, inMax, outMin, outMax) => {
  return ((val - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};
```

---

## 📚 BEST PRACTICES

✅ **DO:**
- Installa via CLI per il tuo stack specifico (JS/TS + CSS/Tailwind)
- Usa componenti in modo composabile
- Sfrutta Tailwind CSS per customizzazione veloce
- Lazy-load componenti heavy come Ballpit
- Combina Framer Motion con React Bits
- Testa su mobile con matchMedia

❌ **DON'T:**
- Usare troppi componenti 3D nella stessa pagina (performance)
- Non customizzare colori via props
- Dimenticare responsive behavior
- Usare animazioni troppo lunghe (> 1s)
- Stack mismatch (non forzare TypeScript su JS-only setup)

---

## 🎯 MATRICE DI COMPATIBILITÀ

| Stack | CLI Command | Notes |
|-------|---|---|
| JS + CSS | `jsrepo install react-bits/component` | Lightweight, vanilla CSS |
| JS + Tailwind | `jsrepo install react-bits/component:tailwind` | Tailwind utilities |
| TS + CSS | `jsrepo install react-bits/component:typescript` | Type-safe, vanilla CSS |
| TS + Tailwind | `jsrepo install react-bits/component:typescript:tailwind` | Fully typed + Tailwind |
| No CLI | Copy-paste from site | Fast prototyping |

---

## 🔗 RESOURCES

- **Docs:** https://reactbits.dev
- **GitHub:** https://github.com/DavidHDev/react-bits
- **Community Showcase:** https://reactbits.dev/showcase
- **Framer Motion Integration:** https://www.framer.com/motion
- **Tailwind CSS:** https://tailwindcss.com

---

## 📝 COMMAND QUICK REFERENCE

```bash
# Installation
jsrepo install react-bits/COMPONENT_NAME
jsrepo install react-bits/COMPONENT_NAME:tailwind
jsrepo install react-bits/COMPONENT_NAME:typescript:tailwind

# Import
import { ComponentName } from 'react-bits';

# Basic Usage
<ComponentName prop1="value" prop2={123} />

# With Children
<TiltedCard scale={1.1}>
  <div>Content</div>
</TiltedCard>

# Responsive
useMediaQuery('(max-width: 768px)') ? mobileProps : desktopProps
```

---

## 🚀 STARTER TEMPLATE

```jsx
import { Beams, TiltedCard, LetterGlitch } from 'react-bits';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <Beams speed={1.5} opacity={0.2} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <LetterGlitch 
          text="REACT BITS" 
          speed={0.05}
          intensity={2}
        />
        
        <TiltedCard className="mt-12 max-w-md">
          <div className="p-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Interactive Demo</h2>
            <p className="mb-6">Click the button per animare</p>
            <button
              onClick={() => setCount(count + 1)}
              className="px-6 py-2 bg-white text-black font-bold rounded hover:scale-105 transition-transform"
            >
              Count: {count}
            </button>
          </div>
        </TiltedCard>
      </div>
    </div>
  );
}
```

---

**🎬 Ready to create amazing React UIs!**