# Morocco Dreams - Travel Website

### Overview
This project is a Next.js-based travel website for "Morocco Dreams," a service offering authentic travel experiences in Morocco. The platform showcases tours of imperial cities, desert adventures, and coastal experiences. The business vision is to provide a comprehensive, interactive, and user-friendly portal for exploring Moroccan travel opportunities, leveraging modern web technologies to deliver a rich user experience.

### User Preferences
- Development setup prioritizes Replit environment compatibility
- Frontend-only architecture maintained as originally designed
- Existing project structure and dependencies preserved

### System Architecture
The "Morocco Dreams" website is built with a modern web stack designed for performance, scalability, and maintainability.

**UI/UX Decisions:**
- **Design System**: Mobile-first approach using Tailwind CSS for utility-first styling.
- **Component Library**: Radix UI components are integrated for accessible and customizable UI primitives.
- **Interactive Map**: Mapbox is used to provide an interactive map for exploring Moroccan cities and tour locations.
- **Visuals**: Prominent use of gradients (e.g., Instagram-style, orange for car rentals) and AI-generated vehicle images for a visually appealing interface.
- **Theming**: Dark/light mode toggle available in the Admin UI.

**Technical Implementations & Feature Specifications:**
- **Next.js Framework**: Utilizes Next.js 14.2.16 with TypeScript for a robust and type-safe frontend.
- **Dynamic Content System**: ALL primary content (experiences, travels, vehicles, blog posts) loads dynamically from Firestore collections. Public pages use helper functions in `lib/public-data.ts` that filter for published content with proper loading states and error handling.
- **Wishlist System**: A universal wishlist system allows users to save various item types (vehicles, experiences, travels, cities, services, blog posts) across 15+ pages, with data persistence via Firestore and visual feedback using toast notifications.
- **Custom Trip Requests**: A multi-step, validated form captures custom travel requests, saving data to Firestore for logged-in users and offering direct WhatsApp redirection for guests.
- **Car Rental System**: 19 vehicles migrated to Firestore with dynamic pricing based on seasonal periods and rental duration, automated WhatsApp booking, and real-time availability. Public page (`app/servizi/noleggio-auto/`) loads from Firestore using `getPublishedVehicles()`.
- **Blog System**: 6 blog posts migrated to Firestore with sections, tags, author metadata. Homepage BlogTeaser component dynamically loads latest 3 published posts using `getPublishedBlogPosts()`.
- **Imperial Cities System**: 9 imperial cities are implemented with a uniform data structure including attractions, history, and tour pricing, accessible via dynamic pages.
- **Instagram Video Integration**: A system to embed Instagram reels dynamically from Firestore, with an Admin Panel for managing up to 3 video slots.
- **Admin UI**: A unified Admin Panel at `/admin` provides:
    - **Authentication**: Dual-layer authentication with Firebase Auth and Firestore `adminUsers` collection.
    - **Protected Routes**: Secure layout with authentication guards and role-based access control. Admin users are automatically redirected from `/dashboard` to `/admin`.
    - **Dashboard**: Live statistics, content progress, and quick action links.
    - **CRUD Operations**: Full Create, Read, Update, Delete functionality for ALL content types via modal-driven interfaces:
        - **Experiences**: ExperienceModal with itinerary editor, highlights, pricing
        - **Travels**: TravelModal with complete travel package management
        - **Vehicles**: VehicleModal with complex seasonal pricing periods
        - **Blog**: BlogModal with sections editor, tags, SEO metadata
        - **Cities**: CityModal for managing imperial/coastal/desert cities
        - **Services**: ServiceModalNew for transport, guides, accommodation
        - **Instagram**: Video slot management for homepage reels
        - **Admin Users**: User role and access management
    - **Content Management**: Features like toggling published/featured status, category filtering, real-time updates, and Firestore auto-propagation to public pages.
    - **Consistent Patterns**: All modals follow same design with Firestore setDoc/merge, Timestamp auditing, refetch-on-save pattern.

**System Design Choices:**
- **Modular Architecture**: Components are designed to be modular and reusable, adhering to React best practices.
- **Server-Side Rendering (SSR) / Static Site Generation (SSG)**: Leverages Next.js capabilities for optimal performance and SEO, with client components used where interactivity is required (e.g., BlogPostHeader).
- **Data Schemas**: Strongly typed data schemas (e.g., `Travel`, `City`, `CustomTripRequest`, `AdminUser`, `InstagramVideo`) ensure data consistency.
- **Security**: Firebase security rules are implemented for granular access control to Firestore collections. Firebase Admin SDK is configured for secure server-side operations, with robust private key handling.
- **Error Handling**: Graceful degradation ensures the application can start even if Firebase Admin credentials are missing, disabling admin-specific features.

### External Dependencies
- **Firebase**:
    - **Firestore**: Primary database for ALL dynamic content (experiences, travels, vehicles, blog posts, user profiles, custom trip requests, admin users, Instagram videos).
    - **Firebase Authentication**: User authentication and authorization, particularly for the Admin UI.
    - **Firebase Admin SDK**: Used for secure server-side interactions with Firestore and user management in the Admin UI.
    - **⚠️ CRITICAL SETUP**: Firestore security rules MUST be manually deployed via Firebase Console (Firestore → Rules) using the `firestore.rules` file. Without this, public pages cannot read data.
- **Mapbox**: Integrated for interactive geographical maps displaying Moroccan cities and tour locations.
- **npm**: Package manager for all project dependencies.

### Recent Changes

**OPZIONE A - Migrazione a Postgres con Prisma (November 20, 2025)**:
- **Database Postgres**: Creato database Neon Postgres via Replit (schema con 13 models: Experience, Travel, Vehicle, BlogPost, City, Service, InstagramVideo, SiteSettings, User, AdminUser, Wishlist, CustomTripRequest, Booking)
- **Prisma ORM**: Installato Prisma 5.19.1 con schema completo in `prisma/schema.prisma`, client singleton in `lib/db.ts`
- **API Routes Unificate**: Create 8 API routes complete (`/api/experiences`, `/api/travels`, `/api/vehicles`, `/api/blog`, `/api/cities`, `/api/services`, `/api/instagram`, `/api/site-settings`) con:
    - GET pubblico (published=true) per frontend
    - POST/PUT/DELETE protetti con ADMIN_TOKEN per admin panel
    - Invalidazione cache via `revalidateTag` per aggiornamenti real-time
- **Migrazione Dati Completa**: Script `scripts/migrate-from-firestore.js` eseguito con successo:
    - ✅ 16 Experiences migrate
    - ✅ 9 Travels migrate
    - ✅ 19 Vehicles migrate
    - ✅ 8 Blog Posts migrate
    - ✅ 7 Cities migrate (1 skip per slug duplicato)
    - ✅ 3 Instagram Videos migrate
- **Admin Panel Refactored**:
    - `app/admin/vehicles/page.tsx` completamente riscritta per usare API Postgres (fetch invece Firestore)
    - `components/admin/VehicleModal.tsx` aggiornato con nuovo schema (pricingPeriods, features array, fuelType, luggage)
    - Pattern unificato: useNotifications + fetch con Authorization Bearer token
- **Package.json**: Aggiunti script `db:push`, `db:studio`, `migrate`, `seed` per gestione database
- **Architettura Unificata**: Admin e frontend ora consumano STESSA API/DB Postgres (no più duplicazione logica Firestore)
- **Prossimi Step**: Completare refactor degli altri pannelli admin (experiences, travels, blog, cities, services, instagram, settings) e pagine pubbliche per usare API Postgres

**Dashboard Unification (Earlier November 20, 2025)**:
- **Dashboard Unification**: Consolidated two separate admin interfaces (`/admin` and `/dashboard` admin tabs) into single unified dashboard at `/admin`.
    - Created `app/admin/blog/page.tsx`, `app/admin/cities/page.tsx`, `app/admin/services/page.tsx` with full CRUD operations
    - Built modal components: `BlogModal`, `CityModal`, `ServiceModal` following existing patterns
    - Updated `app/admin/layout.tsx` sidebar to include all 8 management sections: Experiences, Travels, Vehicles, Blog, Cities, Services, Instagram, Users
    - Configured `/dashboard` to redirect admin users to `/admin`, keeping only user sections (bookings, wishlist, profile) for regular users
- **Vehicles Migration**: All 19 vehicles migrated from `data/vehicles.ts` to Firestore collection 'vehicles' with published/featured/status fields. Car rental page updated to load dynamically.
- **Blog Migration**: All 6 blog posts migrated from `content/blog-posts.ts` to Firestore collection 'blog' with sections, tags, timestamps. Homepage BlogTeaser updated to load dynamically.
- **Admin Vehicles Panel**: Created `app/admin/vehicles/page.tsx` with complete CRUD operations, VehicleModal for editing complex pricing periods, toggle published/featured status.
- **Public Data Helpers**: Added `getPublishedVehicles()` and `getPublishedBlogPosts()` in `lib/public-data.ts` following same pattern as existing helpers with proper error handling.
- **Firestore Rules**: Updated `firestore.rules` with public read/admin write for vehicles, blog, cities, and services collections. **MUST BE DEPLOYED VIA FIREBASE CONSOLE**.
- **CRUD Parity**: All admin panels now have complete Create/Read/Update/Delete functionality with consistent modal-driven UX and automatic Firestore propagation to public pages.
- **Admin System Cleanup & URL Validation (November 20, 2025)**:
    - **Deprecated Code Removal**: Eliminated GoogleAuthButton.tsx, app/admin/setup/page.tsx, app/admin/real/page.tsx, ServiceModalNew.tsx (duplicates/unused files)
    - **Error Handling Unification**: Integrated useNotifications hook across all admin modals (City, Travel, Experience, Vehicle, Blog, Service) with consistent toast notifications (showSuccess/showError)
    - **URL Validation System**: Created `lib/url-validation.ts` with reusable validateUrl helper for robust URL input validation
        - Real-time onChange validation with visual feedback (red borders, inline errors)
        - Pre-submit validation blocking invalid URLs
        - User-friendly error messages via toast notifications
        - **CRITICAL FIX**: Optional URL fields now allow empty values - validation triggers ONLY if user enters text
        - Integrated in ALL modals with URL fields:
            * CityModal (image - validates if filled)
            * TravelModal (image - optional, validates if filled)
            * ExperienceModal (image - optional, validates if filled)
            * VehicleModal (image - optional, validates if filled)
            * BlogModal (cover - validates if filled, sections[].image - optional with validation if filled)
            * ServiceModal (no URL fields - correctly excluded)
    - **Pattern Consistency**: All admin modals follow unified architecture: useNotifications for user feedback, validateUrl for URL inputs, consistent error handling and success messages
    - **Admin Layout Isolation**: Created `app/conditional-layout.tsx` to exclude public navbar/footer from `/admin` routes - admin now has clean, dedicated UI without public site interference
    - **Firestore Rules Detection**: Created `components/admin/FirestoreRulesBanner.tsx` - smart banner that:
        - Automatically detects if Firestore security rules are deployed
        - Shows green success message when rules are active
        - Shows red warning banner with step-by-step Firebase Console instructions when rules are NOT deployed
        - Explains clearly that admin changes won't appear on public site until rules are deployed
        - Integrated in all admin pages via admin layout
    - **Z-index Fix**: Admin sidebar set to z-40, modals remain z-50 - prevents UI overlap issues