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

## Architecture
- **Frontend Only**: No backend components, pure client-side application
- **Interactive Map**: Mapbox integration for exploring Morocco cities
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Structure**: Modular React components with TypeScript

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