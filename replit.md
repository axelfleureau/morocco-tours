# Morocco Dreams - Travel Website

## Overview
This is a Next.js-based travel website for "Morocco Dreams" - a service offering authentic travel experiences in Morocco. The website features tours of imperial cities, desert adventures, coastal experiences, and more.

## Project Structure
- **Frontend**: Next.js 14.2.16 with TypeScript
- **Styling**: Tailwind CSS with Radix UI components
- **Content**: Static content with interactive map using Mapbox
- **Package Manager**: npm (originally used pnpm)

## Recent Changes (September 21, 2025)
- ✅ Installed all Node.js dependencies
- ✅ Configured Next.js for Replit environment (port 5000, hostname 0.0.0.0)
- ✅ Set up development workflow for frontend server
- ✅ Fixed critical hydration error from nested button elements in MoroccoMap component
- ✅ Configured deployment settings for production (autoscale target)
- ✅ Successfully imported and set up GitHub project in Replit

## Omarito Chill Website Updates - TUTTE LE FASI COMPLETATE (November 14, 2025)

### FASE 1: Aggiornamento Esperienze e Contenuti ✅
- Semplificata categoria Surf (rimossa sub-navigazione categorie)
- Rimossa card "Fotografia" dalla sezione esperienze
- Aggiornato team: solo El Kharroubi Omar e Latifa Abkal
- Campo "Data Ritorno" ora obbligatorio con indicatore visivo rosso

### FASE 2: Dashboard e Wishlist ✅
- Fix pulsante "Esplora Viaggi" (ora naviga a /esperienze invece di /viaggi)
- Sistema Wishlist completo con autenticazione Firebase
- Persistenza dati in Firestore (collection: userProfiles)
- Feedback visuale con notifiche toast
- Pagina esperienze convertita a dinamica con caricamento da Firestore
- Fix critico: spread order in getPublishedExperiences/getPublishedTravels per garantire ID persistence

### FASE 3: Integrazione Social Media ✅
- Aggiunto link Instagram: https://www.instagram.com/omarito_chill/
- Design prominente con gradient Instagram-style
- Username @omarito_chill visibile
- Rimossi social inattivi (Facebook, Twitter, Youtube)

### FASE 4: Sezione Noleggio Auto - REDESIGN COMPLETO ✅ (November 15, 2025)
- **Pagina completamente ridisegnata**: /servizi/noleggio-auto
- **Layout identico a guide-private/assicurazioni**: Hero section con gradient arancione, grid card veicoli, card dettagli espansa, CTA finale
- **19 veicoli REALI da CSV** (12 Economiche, 3 SUV, 4 Premium):
  - Dacia Sandero/Logan, Peugeot 208, Renault Clio 5, Citroen C3/C-Elysee/C4, Kia Picanto, Fiat 500, Hyundai i10/Tucson
  - Dacia Lodgy/Duster (manuale/automatica), T-roc, Touareg
- **14 immagini veicoli uniche** generate con AI (stile 3/4 front, sfondo neutro)
- **Pricing da CSV originali**: 4 periodi stagionali × 3 fasce durata con prezzi esatti
  - Periodo 1: 10/01 - 15/07 | Periodo 2: 15/07 - 05/09 (Estate)
  - Periodo 3: 20/12 - 10/01 (Capodanno) | Periodo 4: 05/09 - 20/12
- **Servizi inclusi e extra** da secondo CSV con prezzi reali
- **WhatsApp booking automation**: Numero 393292333370, messaggio auto-compilato con veicolo/date/prezzo
- **Data/vehicles.ts**: 950+ righe con tutti i dati reali strutturati in TypeScript
- ⚠️ **Nota qualità dati**: Dacia Duster automatica period3 ha pricing illogico nel CSV originale (short 42€ < medium 58€) - trascritto fedelmente ma potrebbe richiedere verifica utente

### FASE 5: Sistema Wishlist Universale + Viaggi su Misura ✅ (November 17, 2025)
- **Sistema Wishlist Universale (15+ pagine):**
  - ✅ WishlistButton integrato su tutte le 6 pagine esperienze (cucina, trekking, quad-cammelli, surf, artigianato)
  - ✅ Pagine viaggi: deserto, gruppo, città-imperiali, montagne-atlas, costa-atlantica, [slug] dynamic
  - ✅ Pagine servizi: noleggio-auto, trasferimenti, guide-private, assicurazioni, [slug] dynamic
  - ✅ Blog: index list cards + [slug] dynamic (BlogPostHeader client component per SSR compatibility)
  - ✅ TypeScript: itemType esteso a 'vehicle' | 'experience' | 'travel' | 'city' | 'activity' | 'service' | 'blog'
  - ✅ Price parsing: regex defensivo /[^0-9]/g per gestire stringhe formattate "€280"
  - ✅ Design pattern: top-left su cards, top-right in hero sections

- **Sistema Viaggi su Misura Completo:**
  - ✅ Schema Firestore: CustomTripRequest con 26 campi (info personali, date, destinazioni, preferenze, budget, richieste speciali)
  - ✅ Form multi-step validato (3 step): Step 1 campi obbligatori, validazione inline, blocco avanzamento
  - ✅ Guest flow ottimizzato: showInfo notification → redirect WhatsApp immediato (no Firestore save)
  - ✅ Logged user flow: save Firestore → showSuccess notification → delay 1.5s → redirect WhatsApp
  - ✅ Dashboard integration: sezione "Richieste Viaggi su Misura" con card espandibili (accordion)
  - ✅ Card details: nome, date, destinazioni tags, budget, status badge, info contatti, preferenze, button WhatsApp follow-up
  - ✅ Error handling: fallback WhatsApp se Firestore save fallisce
  - ✅ NotificationSystem: useNotifications con showSuccess, showError, showWarning, showInfo tutti disponibili

## FASE 6: Admin UI Foundation + Desert Tours Data ✅ (November 18, 2025)

### Firebase Admin SDK & Backend Infrastructure ✅
- **Firebase Admin SDK**: Configurato in lib/firebase-admin.ts con credentials da Replit Secrets
  - FIREBASE_ADMIN_PRIVATE_KEY e FIREBASE_ADMIN_CLIENT_EMAIL stored securely
  - PEM key formatting function per compatibility
  - Server-side Firestore operations enabled
  
### Desert Tours Firestore Population ✅
- **7 tour deserto completi** salvati in Firestore collection `travels`:
  - **4 Sahara Tours**: Deserto Express (€180), Classic Adventure (€320), Grand Journey (€480), Luxury Experience (€750)
  - **3 Agafay Tours**: Giornata (€50), Notte Standard (€76), Notte Luxury (€230)
  - Tutti con itinerari dettagliati, includes/notIncludes, highlights, ratings, reviews
  - IDs: sahara-tour-1/2/3/4, agafay-tour-0/-1/-2
  - Schema compliant: Travel interface con category='desert', published=true, featured flags

### Admin Panel System ✅
- **Schema AdminUser** (lib/firestore-schema.ts):
  - Fields: email, displayName, role (super_admin|content_editor|viewer), permissions[], active, createdAt, lastLogin
  - Firestore collection: `adminUsers`
  
- **Admin Login Page** (app/admin/login/page.tsx):
  - Dual-layer authentication: Firebase Auth + adminUsers Firestore verification
  - Security: Auto-logout on unauthorized access (missing doc, inactive account)
  - Professional UI: gradient background, email/password form, error handling
  - Access control: redirects unauthorized users to /admin/login
  
- **Admin Layout** (app/admin/layout.tsx):
  - Protected route wrapper con authentication guard
  - Responsive sidebar navigation: Dashboard, Esperienze, Viaggi, Veicoli, Instagram, Utenti
  - Features: dark/light mode toggle, logout button, admin profile badge
  - Security fix: signOut() before redirect per unauthorized users (architect validated)
  - Mobile: hamburger menu + overlay, Desktop: fixed sidebar (w-72)
  
- **Admin Dashboard** (app/admin/page.tsx):
  - Live statistics from Firestore: total/published experiences, travels, users, vehicles
  - Average rating calculation (experiences + travels combined)
  - Wishlist items count across all users
  - Progress bars: published content percentage
  - Quick actions links: Gestisci Esperienze, Viaggi, Instagram
  
- **Demo Admin Account** (scripts/create-demo-admin.ts):
  - Email: demo-admin@moroccodreams.com
  - Password: Nbc*%iBvjoA)mFvn (auto-generated secure 16 chars)
  - UID: AlxWxeuwXdW6t7NjRVUPnSZSSAb2
  - Role: super_admin with 7 permissions
  - Idempotent script: updates if exists, creates if new

### Admin UI Status
- ✅ Login/Authentication system complete
- ✅ Layout & Dashboard operational
- ✅ Demo account active and tested
- ⏳ CRUD pages pending (Experiences, Travels, Vehicles, Instagram, Users)

## Architecture
- **Frontend**: Next.js 14.2.16 with TypeScript
- **Backend**: Firebase (Firestore + Auth)
- **Database**: Firestore collections (experiences, travels, userProfiles)
- **Interactive Map**: Mapbox integration for exploring Morocco cities
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Structure**: Modular React components with TypeScript
- **Data Management**: Dynamic content loading from Firestore with real-time updates

## Setup Configuration
- **Development Server**: Runs on port 5000 with hostname 0.0.0.0 
- **Replit Environment**: Configured to work with Replit's proxy system
- **Build Process**: Standard Next.js build with deployment via npm start
- **Deployment**: Configured for autoscale deployment target

## Known Issues Fixed
- ❌ Button nesting HTML validation error → ✅ Fixed by replacing nested button with div
- ❌ LSP type errors → ✅ Fixed by installing dependencies
- ❌ Replit proxy compatibility → ✅ Fixed with proper hostname configuration

## User Preferences
- Development setup prioritizes Replit environment compatibility
- Frontend-only architecture maintained as originally designed
- Existing project structure and dependencies preserved