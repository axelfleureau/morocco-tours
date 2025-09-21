import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

// IMPORTANT: This middleware is currently DISABLED due to security concerns.
// In a production environment, implement proper Firebase session cookie validation.
// See: https://firebase.google.com/docs/auth/admin/manage-cookies

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // For now, just pass through all requests
  // Client-side protection is handled by ProtectedRoute component
  return NextResponse.next();
  
  /* 
  TODO: Implement secure server-side authentication
  
  1. Set up Firebase session cookies:
     - Create API route to exchange ID token for session cookie
     - Use httpOnly, secure, sameSite=Lax cookies
  
  2. Verify session cookies in middleware:
     - Use Firebase Admin SDK to verify session cookies
     - Check user roles/claims for admin routes
  
  3. Example implementation:
     const sessionCookie = request.cookies.get('__session')?.value;
     if (sessionCookie) {
       try {
         const decodedClaims = await auth.verifySessionCookie(sessionCookie);
         // User is authenticated
       } catch (error) {
         // Invalid session
       }
     }
  */
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    // Match all routes except static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};