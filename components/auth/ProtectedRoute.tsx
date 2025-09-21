'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
  loadingComponent?: React.ReactNode;
}

export default function ProtectedRoute({ 
  children, 
  requireAdmin = false, 
  redirectTo = '/auth/signin',
  loadingComponent 
}: ProtectedRouteProps) {
  const { user, userProfile, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Not authenticated - redirect to sign in
      if (!user) {
        // Store the current URL to redirect back after login (only safe internal paths)
        const currentPath = window.location.pathname;
        if (currentPath !== redirectTo && currentPath.startsWith('/') && !currentPath.includes('://')) {
          sessionStorage.setItem('redirectAfterLogin', currentPath);
        }
        router.push(redirectTo);
        return;
      }

      // Authenticated but requires admin role
      if (requireAdmin && !isAdmin) {
        router.push('/'); // Redirect to homepage
        return;
      }
    }
  }, [user, userProfile, loading, isAdmin, requireAdmin, redirectTo, router]);

  // Show loading while checking authentication
  if (loading) {
    return loadingComponent || (
      <div className="min-h-screen bg-gray-50 dark:bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Verifica autenticazione...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated or doesn't have required role
  if (!user || (requireAdmin && !isAdmin)) {
    return null;
  }

  return <>{children}</>;
}