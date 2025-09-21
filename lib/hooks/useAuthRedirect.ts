'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// Helper function to sanitize redirect paths
function sanitizeRedirectPath(path: string | null): string | null {
  if (!path) return null;
  
  // Only allow internal paths starting with '/' and not containing '://'
  if (path.startsWith('/') && !path.includes('://')) {
    return path;
  }
  
  return null; // Invalid path
}

export function useAuthRedirect() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Check for stored redirect path
      const rawRedirectPath = sessionStorage.getItem('redirectAfterLogin');
      const redirectPath = sanitizeRedirectPath(rawRedirectPath);
      if (redirectPath) {
        sessionStorage.removeItem('redirectAfterLogin');
        router.push(redirectPath);
      }
    }
  }, [user, router]);
}

export function useRequireAuth(redirectTo: string = '/auth/signin') {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Store current path for redirect after login (only if it's a safe internal path)
      const currentPath = window.location.pathname;
      const sanitizedPath = sanitizeRedirectPath(currentPath);
      if (sanitizedPath && sanitizedPath !== redirectTo) {
        sessionStorage.setItem('redirectAfterLogin', sanitizedPath);
      }
      router.push(redirectTo);
    }
  }, [user, loading, redirectTo, router]);

  return { user, loading, isAuthenticated: !!user };
}

export function useRequireAdmin(redirectTo: string = '/') {
  const { user, userProfile, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth/signin');
      } else if (!isAdmin) {
        router.push(redirectTo);
      }
    }
  }, [user, userProfile, loading, isAdmin, redirectTo, router]);

  return { user, userProfile, loading, isAdmin, isAuthorized: !!user && isAdmin };
}