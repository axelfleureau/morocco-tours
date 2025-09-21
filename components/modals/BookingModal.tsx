"use client";

import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BookingForm from '@/components/forms/BookingForm';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
  itemType: 'travel' | 'experience';
  itemTitle: string;
  basePrice: number;
  duration: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  itemId,
  itemType,
  itemTitle,
  basePrice,
  duration
}: BookingModalProps) {
  const handleSuccess = () => {
    // Keep modal open to show success message
    // User can close manually or it will auto-close after 8 seconds
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Prenota ora</h2>
                  <p className="text-muted-foreground">Compila il form per richiedere la prenotazione</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                  aria-label="Chiudi"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <BookingForm
                  itemId={itemId}
                  itemType={itemType}
                  itemTitle={itemTitle}
                  basePrice={basePrice}
                  duration={duration}
                  onSuccess={handleSuccess}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}