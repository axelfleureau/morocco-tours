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