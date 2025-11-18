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
- **Dynamic Content**: Experiences, travels, and city pages load content dynamically, primarily from Firestore.
- **Wishlist System**: A universal wishlist system allows users to save various item types (vehicles, experiences, travels, cities, services, blog posts) across 15+ pages, with data persistence via Firestore and visual feedback using toast notifications.
- **Custom Trip Requests**: A multi-step, validated form captures custom travel requests, saving data to Firestore for logged-in users and offering direct WhatsApp redirection for guests.
- **Car Rental Redesign**: A dedicated, fully redesigned section for car rentals features 19 real vehicles, dynamic pricing based on seasonal periods and rental duration, and automated WhatsApp booking. Data is structured in `data/vehicles.ts`.
- **Imperial Cities System**: 9 imperial cities are implemented with a uniform data structure including attractions, history, and tour pricing, accessible via dynamic pages.
- **Instagram Video Integration**: A system to embed Instagram reels dynamically from Firestore, with an Admin Panel for managing up to 3 video slots.
- **Admin UI**: A comprehensive Admin Panel provides:
    - **Authentication**: Dual-layer authentication with Firebase Auth and Firestore `adminUsers` collection.
    - **Protected Routes**: Secure layout with authentication guards and role-based access control.
    - **Dashboard**: Live statistics, content progress, and quick action links.
    - **CRUD Operations**: Full Create, Read, Update, Delete functionality for Experiences, Travels, Vehicles, Instagram videos, and Admin Users.
    - **Content Management**: Features like toggling published/featured status, category filtering, and real-time updates.

**System Design Choices:**
- **Modular Architecture**: Components are designed to be modular and reusable, adhering to React best practices.
- **Server-Side Rendering (SSR) / Static Site Generation (SSG)**: Leverages Next.js capabilities for optimal performance and SEO, with client components used where interactivity is required (e.g., BlogPostHeader).
- **Data Schemas**: Strongly typed data schemas (e.g., `Travel`, `City`, `CustomTripRequest`, `AdminUser`, `InstagramVideo`) ensure data consistency.
- **Security**: Firebase security rules are implemented for granular access control to Firestore collections. Firebase Admin SDK is configured for secure server-side operations, with robust private key handling.
- **Error Handling**: Graceful degradation ensures the application can start even if Firebase Admin credentials are missing, disabling admin-specific features.

### External Dependencies
- **Firebase**:
    - **Firestore**: Primary database for dynamic content (experiences, travels, user profiles, custom trip requests, admin users, Instagram videos).
    - **Firebase Authentication**: User authentication and authorization, particularly for the Admin UI.
    - **Firebase Admin SDK**: Used for secure server-side interactions with Firestore and user management in the Admin UI.
- **Mapbox**: Integrated for interactive geographical maps displaying Moroccan cities and tour locations.
- **npm**: Package manager for all project dependencies.