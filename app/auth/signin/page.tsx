"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SignIn from '@/components/auth/SignIn';

// Helper function to sanitize redirect paths
function sanitizeRedirectPath(path: string | null): string {
  if (!path) return '/dashboard';
  
  // Only allow internal paths starting with '/' and not containing '://'
  if (path.startsWith('/') && !path.includes('://')) {
    return path;
  }
  
  return '/dashboard'; // Fallback to safe default
}

export default function SignInPage() {
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get('from');
  const redirectTo = sanitizeRedirectPath(rawRedirect);
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-background dark:to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-orange-600 mb-2">Morocco Dreams</h1>
          </Link>
          <p className="text-muted-foreground">
            Accedi al tuo account
          </p>
        </div>

        {/* Sign In Form */}
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
          <SignIn redirectTo={redirectTo} />
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <Link 
            href="/" 
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            ← Torna al sito
          </Link>
        </div>
      </div>
    </div>
  );
}