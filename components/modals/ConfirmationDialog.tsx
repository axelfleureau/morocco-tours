"use client";

import { useEffect } from 'react';
import { X, CheckCircle, Calendar, Users, DollarSign, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string;
  startDate?: Date;
  endDate?: Date;
  participants: number;
  totalPrice: number;
  onGoToDashboard?: () => void;
}

export default function ConfirmationDialog({
  isOpen,
  onClose,
  itemTitle,
  startDate,
  endDate,
  participants,
  totalPrice,
  onGoToDashboard
}: ConfirmationDialogProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  const formatDateRange = () => {
    if (!startDate) return 'Date da confermare';
    
    const startStr = format(startDate, 'd MMMM yyyy', { locale: it });
    
    if (endDate) {
      const endStr = format(endDate, 'd MMMM yyyy', { locale: it });
      return `${startStr} - ${endStr}`;
    }
    
    return startStr;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border-2 border-green-500/20">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors z-10"
                aria-label="Chiudi"
              >
                <X className="w-6 h-6 text-slate-600 dark:text-slate-300" />
              </button>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
                
                <div className="relative">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                      <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-center mb-2">
                    Richiesta Inviata!
                  </h2>
                  <p className="text-center text-green-50 text-lg">
                    La tua prenotazione è stata ricevuta con successo
                  </p>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800">
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-4">
                    Riepilogo Prenotazione
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                          Esperienza/Viaggio
                        </p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                          {itemTitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                          Date
                        </p>
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">
                          {formatDateRange()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                          Partecipanti
                        </p>
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">
                          {participants} {participants === 1 ? 'persona' : 'persone'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t-2 border-orange-300 dark:border-orange-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-white" />
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                            Prezzo Totale
                          </p>
                        </div>
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                          €{totalPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-900 dark:text-blue-100 text-center">
                    <strong>Prossimo passo:</strong> Ti contatteremo a breve via WhatsApp per confermare i dettagli e finalizzare la prenotazione.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                  >
                    Chiudi
                  </button>
                  {onGoToDashboard && (
                    <button
                      onClick={onGoToDashboard}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <span>Vai a Dashboard</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                  Questo popup si chiuderà automaticamente tra 10 secondi
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
