"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react';
import { firestoreService, COLLECTIONS, Inquiry } from '@/lib/firestore';

interface ContactFormData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  travelType: string;
  message: string;
}

interface ContactFormProps {
  type?: 'general' | 'travel_plan' | 'booking';
  className?: string;
}

export default function ContactForm({ type = 'general', className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    surname: '',
    email: '',
    phone: '',
    travelType: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Per favore compila tutti i campi obbligatori');
      }

      // Create inquiry object
      const inquiry: Omit<Inquiry, 'id'> = {
        name: `${formData.name} ${formData.surname}`.trim(),
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        travelType: formData.travelType,
        type: type,
        status: 'new'
      };

      // Save to Firestore
      await firestoreService.create<Inquiry>(COLLECTIONS.inquiries, inquiry);

      // Reset form and show success
      setFormData({
        name: '',
        surname: '',
        email: '',
        phone: '',
        travelType: '',
        message: ''
      });
      setSuccess(true);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);

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
        className={`bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center ${className}`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Check className="w-8 h-8 text-white" />
        </motion.div>
        <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">
          Messaggio Inviato!
        </h3>
        <p className="text-green-700 dark:text-green-300">
          Grazie per il tuo messaggio. Ti ricontatteremo entro 24 ore.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nome *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground transition-colors"
            placeholder="Il tuo nome"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Cognome
          </label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground transition-colors"
            placeholder="Il tuo cognome"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground transition-colors"
          placeholder="la-tua-email@esempio.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Telefono
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground transition-colors"
          placeholder="+39 329 233 3370"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Tipo di viaggio
        </label>
        <select
          name="travelType"
          value={formData.travelType}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground transition-colors"
        >
          <option value="">Seleziona...</option>
          <option value="citta-imperiali">Città Imperiali</option>
          <option value="deserto">Tour del Deserto</option>
          <option value="costa-atlantica">Costa Atlantica</option>
          <option value="montagne-atlas">Montagne dell'Atlas</option>
          <option value="su-misura">Viaggio su Misura</option>
          <option value="gruppo">Viaggio di Gruppo</option>
          <option value="esperienze">Esperienze</option>
          <option value="servizi">Servizi (Auto, Guide, etc.)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Messaggio *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground transition-colors resize-vertical"
          placeholder="Raccontaci del tuo viaggio ideale in Marocco..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Invio in corso...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Invia Messaggio
          </>
        )}
      </button>
    </form>
  );
}