"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { signIn, signUp } = useAuth();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!isLogin && formData.password !== formData.confirmPassword) {
        throw new Error('Le password non coincidono');
      }

      if (isLogin) {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(formData.email, formData.password, formData.name);
      }
      
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Si è verificato un errore');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-background dark:to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-orange-600 mb-2">Morocco Dreams</h1>
          </Link>
          <p className="text-muted-foreground">
            {isLogin ? 'Accedi al tuo account' : 'Crea il tuo account'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300 text-sm">
                {error}
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground transition-colors"
                  placeholder="Il tuo nome completo"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground transition-colors"
                  placeholder="la-tua-email@esempio.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground transition-colors"
                  placeholder="La tua password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Conferma Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground transition-colors"
                    placeholder="Conferma la password"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {isLogin ? 'Accesso in corso...' : 'Registrazione in corso...'}
                </>
              ) : (
                isLogin ? 'Accedi' : 'Registrati'
              )}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {isLogin ? 'Non hai un account?' : 'Hai già un account?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors"
              >
                {isLogin ? 'Registrati' : 'Accedi'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Torna al sito
          </Link>
        </div>
      </div>
    </div>
  );
}