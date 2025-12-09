# 🎬 TICKET TECNICO: GSAP - Libreria Animazioni

**Status:** Ready for AI Integration  
**Priority:** High  
**Framework:** Vite + GSAP v3  
**Data:** 2025-12-04

---

## 📋 OBIETTIVO
Integrare GSAP per animare UI, gestire testi, core animations, scroll-trigger e effetti SVG in applicazioni Vite.

---

## 🔧 INSTALLAZIONE & SETUP

### NPM
```bash
npm install gsap
```

### Import Core
```javascript
import gsap from 'gsap';
```

### Import Plugins (On-Demand)
```javascript
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, TextPlugin, MotionPathPlugin, CustomEase);
```

---

## 🎯 CORE FEATURES (ESSENZIALI)

### 1️⃣ ANIMATE ANYTHING
```javascript
// DOM Elements
gsap.to('.elemento', { duration: 1, opacity: 1, y: -20 });

// CSS Properties
gsap.to('.box', { duration: 0.5, backgroundColor: '#3498db', rotate: 360 });

// SVG Attributes
gsap.to('circle', { duration: 1, r: 50, cx: 100 });

// Objects & Variables
const obj = { count: 0 };
gsap.to(obj, { duration: 2, count: 100 });
```

### 2️⃣ TIMELINE (Choreografia Sequenze)
```javascript
const tl = gsap.timeline({ repeat: -1, yoyo: true });
tl.to('.box', { duration: 0.5, x: 100 })
  .to('.box', { duration: 0.5, y: 100 }, 0.25) // offset
  .to('.circle', { duration: 1, rotation: 360 }, 0)
  .add('etichetta', 1); // Named markers
```

### 3️⃣ EASES (Personality)
```javascript
gsap.to('.elemento', {
  duration: 1,
  y: 100,
  ease: 'back.out',        // bounce-like
  // ease: 'elastic.out',
  // ease: 'power4.inOut',
  // ease: 'sine.out',
  // ease: CustomEase.create() // custom curves
});
```

### 4️⃣ STAGGERS (Staggered animations)
```javascript
gsap.to('.item', {
  duration: 0.5,
  opacity: 1,
  y: 0,
  stagger: 0.1 // 100ms delay between each
});
```

---

## 📜 TEXT PLUGIN (Gestione Testi)

### Setup
```javascript
import { TextPlugin } from 'gsap/TextPlugin';
gsap.registerPlugin(TextPlugin);
```

### Animare Testo
```javascript
// Typewriter Effect
gsap.to('.heading', {
  duration: 2,
  text: 'Testo finale animato'
});

// Numero Counter
gsap.to('.counter', {
  duration: 2,
  innerText: 1000, // anima da 0 a 1000
  snap: { innerText: 1 }
});
```

---

## 🔄 SCROLLTRIGGER PLUGIN (Scroll-based animations)

### Setup
```javascript
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
```

### Animare on Scroll
```javascript
gsap.to('.elemento', {
  scrollTrigger: {
    trigger: '.elemento',
    start: 'top center',      // when trigger.top = viewport.center
    end: 'center center',
    markers: true,            // DEBUG: mostra markers
    scrub: 1,                 // smooth linked to scrollbar
    onEnter: () => console.log('entered'),
    onLeave: () => console.log('left')
  },
  duration: 1,
  y: -50,
  opacity: 0.5
});
```

### Parallax Effect
```javascript
gsap.to('.background', {
  scrollTrigger: '.foreground',
  y: -100,
  ease: 'none'
});
```

### Pin Element During Scroll
```javascript
ScrollTrigger.create({
  trigger: '.section',
  pin: true,
  start: 'top top',
  end: '+=500px',
  markers: true
});
```

---

## 🎨 SVG EFFECTS (Animazioni SVG)

### Morph Paths
```javascript
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
gsap.registerPlugin(MorphSVGPlugin);

gsap.to('path', {
  duration: 1,
  morphSVG: '#target-path',
  fill: '#1698CB'
});
```

### Motion Path Animation
```javascript
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
gsap.registerPlugin(MotionPathPlugin);

gsap.to('.elemento', {
  duration: 3,
  motionPath: {
    path: '#myPath',
    align: '#myPath',
    autoRotate: true
  }
});
```

### Draw SVG Stroke
```javascript
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
gsap.registerPlugin(DrawSVGPlugin);

gsap.to('path', {
  duration: 2,
  strokeDasharray: 'strokeDasharray',
  ease: 'power1.inOut'
});
```

### SVG Attributes Animate
```javascript
gsap.to('#circle', {
  duration: 1,
  attr: {
    r: 50,        // radius
    cx: 100,      // center-x
    cy: 100       // center-y
  }
});

gsap.to('rect', {
  duration: 1,
  attr: { width: 300, height: 200 },
  fill: '#F51E43'
});
```

---

## 🎛️ UI ANIMATIONS (Interfaccia)

### Toggle States
```javascript
let isOpen = false;
const tl = gsap.timeline({ paused: true });
tl.to('.menu', { duration: 0.3, x: 300, opacity: 1 });

document.querySelector('.menu-btn').addEventListener('click', () => {
  isOpen ? tl.reverse() : tl.play();
  isOpen = !isOpen;
});
```

### Hover Effects
```javascript
gsap.to('.button:hover', {
  duration: 0.3,
  scale: 1.1,
  boxShadow: '0 8px 24px rgba(22, 152, 203, 0.4)'
});
```

### Form Validation Shake
```javascript
gsap.to('input.error', {
  duration: 0.1,
  x: 5,
  repeat: 5,
  yoyo: true,
  ease: 'power2.inOut'
});
```

---

## ⚙️ UTILITY METHODS (Essenziali)

```javascript
// Clamping
gsap.utils.clamp(0, 100, value); // limita tra 0-100

// Distribute array values
const arr = gsap.utils.distribute({ base: 0, amount: 100, from: 'center' }, 5);

// Map range
gsap.utils.mapRange(0, 100, 0, 1, 50); // 0.5

// Snap to grid
gsap.utils.snap(10, value); // 10px grid

// Selector (query tutte le varianti)
gsap.utils.toArray('.item').forEach(item => {
  gsap.to(item, { duration: 1, opacity: 1 });
});
```

---

## 🎬 PERFORMANCE & CLEANUP

### Context (Memory Management)
```javascript
const ctx = gsap.context(() => {
  gsap.to('.elemento', { duration: 1, x: 100 });
  gsap.to('.altro', { duration: 1, y: 50 });
});

// Cleanup all
ctx.revert();
```

### Responsivity (matchMedia)
```javascript
gsap.matchMedia().add('(max-width: 768px)', () => {
  // animazioni mobile
  gsap.to('.elemento', { duration: 1, x: 50 });
  
  return () => console.log('cleanup'); // revert function
});
```

### Ticker (RAF Loop)
```javascript
gsap.ticker.add((time) => {
  // Custom animation loop
  console.log('Frame:', time);
});

// Pausa ticker
gsap.ticker.sleep();
gsap.ticker.wake();
```

---

## 📦 BEST PRACTICES

✅ **DO:**
- Registra plugin prima di usarli
- Usa timeline per sequenze complesse
- Pulisci animazioni con `context()` in cleanup
- Usa `matchMedia()` per responsive
- Sfrutta `ScrollTrigger.refresh()` dopo DOM changes

❌ **DON'T:**
- Animare elemento stesso in due timeline
- Lasciare ScrollTrigger attivi senza cleanup
- Abusare di `duration` troppo lunghe
- Dimenticare `gsap.registerPlugin()`

---

## 🔗 RESOURCES

- **Docs:** https://gsap.com/docs/v3/
- **Eases:** https://gsap.com/docs/v3/Eases
- **CodePen Examples:** https://codepen.io/gsap
- **Community:** https://gsap.com/community

---

## 📝 COMMAND QUICK REFERENCE

```javascript
// Basic Animation
gsap.to(target, { duration, property: value });
gsap.from(target, { from, duration });
gsap.fromTo(target, { from }, { to, duration });

// Timeline
const tl = gsap.timeline();
tl.to().to().add().play().reverse().seek();

// ScrollTrigger
gsap.to(target, { scrollTrigger: { trigger, start, end, pin, scrub } });

// SVG
gsap.to('path', { attr: { r, cx, cy }, morphSVG: '#path' });

// Callbacks
{ onStart, onUpdate, onComplete, onReverseComplete }

// Cleanup
ctx.revert();
ScrollTrigger.getAll().forEach(t => t.kill());
```

---

**🚀 Ready to animate!**