"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, AlertCircle, Loader2 } from 'lucide-react';
import { firestoreService, COLLECTIONS } from '@/lib/firestore';

interface NewsletterSubscription {
  email: string;
  subscribedAt: Date;
  active: boolean;
  source: string;
}

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');

    try {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Per favore inserisci un indirizzo email valido');
      }

      // Check if email already exists
      const existingSubscriptions = await firestoreService.getWhere<NewsletterSubscription>(
        'newsletter_subscriptions', 
        'email', 
        '==', 
        email
      );

      if (existingSubscriptions.length > 0) {
        throw new Error('Questa email è già iscritta alla newsletter');
      }

      // Create new subscription
      const subscription: Omit<NewsletterSubscription, 'id'> = {
        email: email.toLowerCase().trim(),
        subscribedAt: new Date(),
        active: true,
        source: 'footer'
      };

      await firestoreService.create<NewsletterSubscription>('newsletter_subscriptions', subscription);

      setEmail('');
      setSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

    } catch (err: any) {
      setError(err.message || 'Si è verificato un errore. Riprova più tardi.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <Check className="w-4 h-4 text-white" />
        </motion.div>
        <div>
          <p className="text-green-800 dark:text-green-200 font-medium text-sm">
            Iscrizione completata!
          </p>
          <p className="text-green-600 dark:text-green-400 text-xs">
            Riceverai le nostre migliori offerte
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="newsletter-email" className="block text-sm font-medium text-foreground mb-2">
          Newsletter
        </label>
        <p className="text-muted-foreground text-sm mb-3">
          Ricevi le migliori offerte e novità sui viaggi in Marocco
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-red-700 dark:text-red-300 text-xs">{error}</p>
        </motion.div>
      )}

      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="la-tua-email@esempio.com"
          className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
          required
        />
        <button
          type="submit"
          disabled={loading || !email}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Iscriviti
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}