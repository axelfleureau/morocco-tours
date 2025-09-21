"use client";

import Link from 'next/link';
import SignUp from '@/components/auth/SignUp';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-background dark:to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-orange-600 mb-2">Morocco Dreams</h1>
          </Link>
          <p className="text-muted-foreground">
            Crea il tuo account
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
          <SignUp />
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