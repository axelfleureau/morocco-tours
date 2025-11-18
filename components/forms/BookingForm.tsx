"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Users, Baby, MapPin, CreditCard, Check, AlertCircle, Loader2, Download } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { firestoreService, COLLECTIONS, Booking } from '@/lib/firestore';
import ConfirmationDialog from '@/components/modals/ConfirmationDialog';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  travelers: number;
  children: number;
  childrenAges: string;
  departureDate: string;
  returnDate: string;
  departureCity: string;
  customRequests: string;
}

interface BookingFormProps {
  itemId: string;
  itemType: 'travel' | 'experience';
  itemTitle: string;
  basePrice: number;
  duration: string;
  className?: string;
  onSuccess?: () => void;
}

export default function BookingForm({ 
  itemId, 
  itemType, 
  itemTitle, 
  basePrice, 
  duration,
  className = '',
  onSuccess 
}: BookingFormProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<BookingFormData>({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    travelers: 2,
    children: 0,
    childrenAges: '',
    departureDate: '',
    returnDate: '',
    departureCity: '',
    customRequests: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const [dynamicPrice, setDynamicPrice] = useState(basePrice);
  const [daysDuration, setDaysDuration] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (formData.departureDate && formData.returnDate) {
      const start = new Date(formData.departureDate);
      const end = new Date(formData.returnDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        setDaysDuration(diffDays);
        setDynamicPrice(basePrice * diffDays);
      } else {
        setDaysDuration(0);
        setDynamicPrice(basePrice);
      }
    } else {
      setDaysDuration(0);
      setDynamicPrice(basePrice);
    }
  }, [formData.departureDate, formData.returnDate, basePrice]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Inserisci il tuo nome completo';
    }

    if (!formData.email.trim()) {
      errors.email = 'Inserisci la tua email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Inserisci un indirizzo email valido';
    }

    if (!formData.departureDate) {
      errors.departureDate = 'Seleziona una data di partenza';
    }

    setFieldErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementsByName(firstErrorField)[0];
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
      return false;
    }

    return true;
  };

  const calculateTotalPrice = () => {
    const adultPrice = dynamicPrice * formData.travelers;
    const childPrice = dynamicPrice * 0.7 * formData.children;
    return Math.round(adultPrice + childPrice);
  };

  const generateBookingPDF = () => {
    const pdf = new jsPDF();
    let yPosition = 20;

    // Header with Morocco Dreams branding
    pdf.setFillColor(234, 88, 12); // Orange background
    pdf.rect(0, 0, 210, 30, 'F');
    
    pdf.setFontSize(24);
    pdf.setTextColor(255, 255, 255);
    pdf.text('Morocco Dreams', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(14);
    pdf.text('Conferma Prenotazione', 20, yPosition);
    yPosition += 20;

    // Booking details
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Dettagli Prenotazione', 20, yPosition);
    yPosition += 10;

    const bookingData = [
      ['Esperienza', itemTitle],
      ['Nome', formData.name],
      ['Email', formData.email],
      ['Telefono', formData.phone || 'Non specificato'],
      ['Viaggiatori', `${formData.travelers} adulti`],
      ['Bambini', formData.children > 0 ? `${formData.children} bambini` : 'Nessuno'],
      ['Data partenza', formData.departureDate],
      ['Data ritorno', formData.returnDate || 'Non specificata'],
      ['Città partenza', formData.departureCity || 'Non specificata'],
      ['Durata', duration],
      ['Prezzo totale', `€${calculateTotalPrice()}`],
      ['Stato', 'In attesa di conferma']
    ];

    (pdf as any).autoTable({
      startY: yPosition,
      head: [['Campo', 'Valore']],
      body: bookingData,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [234, 88, 12] }
    });

    yPosition = (pdf as any).lastAutoTable.finalY + 15;

    if (formData.customRequests) {
      pdf.setFontSize(14);
      pdf.text('Richieste Speciali:', 20, yPosition);
      yPosition += 8;
      pdf.setFontSize(10);
      const requestLines = pdf.splitTextToSize(formData.customRequests, 170);
      pdf.text(requestLines, 20, yPosition);
      yPosition += requestLines.length * 4 + 10;
    }

    // Footer
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Ti contatteremo entro 24 ore per confermare la prenotazione.', 20, yPosition + 10);
    pdf.text('WhatsApp: +39 329 233 3370 | Email: info@moroccodreams.com', 20, yPosition + 20);

    pdf.save(`MoroccoDreams_Prenotazione_${formData.name.replace(/\s+/g, '_')}.pdf`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      setError(`Compila tutti i campi obbligatori (${Object.keys(fieldErrors).length} campi mancanti)`);
      return;
    }

    if (!user) {
      setError('Devi essere loggato per effettuare una prenotazione');
      return;
    }

    setLoading(true);

    try {

      // Create booking object
      const booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'> = {
        userId: user.uid,
        ...(itemType === 'travel' ? { travelId: itemId } : { experienceId: itemId }),
        status: 'pending',
        personalDetails: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          travelers: formData.travelers,
          children: formData.children > 0 ? formData.children : undefined,
          childrenAges: formData.children > 0 ? formData.childrenAges : undefined,
          departureDate: formData.departureDate,
          returnDate: formData.returnDate || undefined,
          departureCity: formData.departureCity || undefined,
        },
        customRequests: formData.customRequests || undefined,
        totalPrice: calculateTotalPrice(),
      };

      // Save to Firestore
      const bookingId = await firestoreService.create<Booking>(COLLECTIONS.bookings, booking);

      // Create inquiry for follow-up
      await firestoreService.create(COLLECTIONS.inquiries, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Nuova prenotazione per ${itemTitle}. ID prenotazione: ${bookingId}. Richieste speciali: ${formData.customRequests || 'Nessuna'}`,
        type: 'booking',
        status: 'new'
      });

      setSuccess(true);
      setShowConfirmation(true);
      if (onSuccess) onSuccess();

    } catch (err: any) {
      setError(err.message || 'Si è verificato un errore. Riprova più tardi.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleGoToDashboard = () => {
    setShowConfirmation(false);
    router.push('/dashboard?tab=bookings');
  };

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

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">Prenota: {itemTitle}</h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Durata: {duration}</span>
          <span className="font-semibold text-orange-600">Da €{basePrice} per persona</span>
        </div>
      </div>

      {/* Personal Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent bg-background text-foreground transition-colors ${
              fieldErrors.name 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-border focus:ring-orange-500'
            }`}
            placeholder="Il tuo nome completo"
          />
          {fieldErrors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {fieldErrors.name}
            </p>
          )}
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
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent bg-background text-foreground transition-colors ${
              fieldErrors.email 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-border focus:ring-orange-500'
            }`}
            placeholder="la-tua-email@esempio.com"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {fieldErrors.email}
            </p>
          )}
        </div>
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

      {/* Group Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            <Users className="w-4 h-4 inline mr-1" />
            Adulti *
          </label>
          <select
            name="travelers"
            value={formData.travelers}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground transition-colors"
          >
            {[1,2,3,4,5,6,7,8,9,10].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'persona' : 'persone'}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            <Baby className="w-4 h-4 inline mr-1" />
            Bambini (0-12 anni)
          </label>
          <select
            name="children"
            value={formData.children}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground transition-colors"
          >
            {[0,1,2,3,4,5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        {formData.children > 0 && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Età bambini
            </label>
            <input
              type="text"
              name="childrenAges"
              value={formData.childrenAges}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground transition-colors"
              placeholder="es. 8, 12"
            />
          </div>
        )}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Data Partenza *
          </label>
          <input
            type="date"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent bg-background text-foreground transition-colors ${
              fieldErrors.departureDate 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-border focus:ring-orange-500'
            }`}
          />
          {fieldErrors.departureDate && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {fieldErrors.departureDate}
            </p>
          )}
        </div>
        {itemType === 'travel' && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Data Ritorno
            </label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              min={formData.departureDate || new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground transition-colors"
            />
          </div>
        )}
      </div>

      {daysDuration > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-4 flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6" />
            <div>
              <p className="text-sm font-medium">Prezzo calcolato per la durata</p>
              <p className="text-xs opacity-90">{daysDuration} {daysDuration === 1 ? 'giorno' : 'giorni'}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">€{dynamicPrice}</p>
            <p className="text-xs opacity-90">per persona</p>
          </div>
        </motion.div>
      )}

      {/* Departure City */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          <MapPin className="w-4 h-4 inline mr-1" />
          Città di Partenza
        </label>
        <select
          name="departureCity"
          value={formData.departureCity}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground transition-colors"
        >
          <option value="">Seleziona...</option>
          <option value="marrakech">Marrakech</option>
          <option value="casablanca">Casablanca</option>
          <option value="fes">Fes</option>
          <option value="rabat">Rabat</option>
          <option value="agadir">Agadir</option>
          <option value="aeroporto">Dall'aeroporto</option>
          <option value="hotel">Dal mio hotel</option>
          <option value="altro">Altro (specificare nelle richieste)</option>
        </select>
      </div>

      {/* Custom Requests */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Richieste Speciali
        </label>
        <textarea
          name="customRequests"
          value={formData.customRequests}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground transition-colors resize-vertical"
          placeholder="Diete speciali, esigenze particolari, richieste speciali..."
        />
      </div>

      {/* Price Summary */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Prezzo totale stimato</p>
            <p className="text-xs text-muted-foreground">
              {formData.travelers} {formData.travelers === 1 ? 'adulto' : 'adulti'} 
              {formData.children > 0 && ` + ${formData.children} ${formData.children === 1 ? 'bambino' : 'bambini'} (sconto 30%)`}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-orange-600">€{calculateTotalPrice()}</p>
            <p className="text-xs text-muted-foreground">Prezzo finale da confermare</p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Invio in corso...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            Richiedi Prenotazione
          </>
        )}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Cliccando su "Richiedi Prenotazione" invii una richiesta di prenotazione. 
        Ti contatteremo per confermare la disponibilità e finalizzare la prenotazione con il pagamento.
      </p>

      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        itemTitle={itemTitle}
        startDate={formData.departureDate ? new Date(formData.departureDate) : undefined}
        endDate={formData.returnDate ? new Date(formData.returnDate) : undefined}
        participants={formData.travelers + formData.children}
        totalPrice={calculateTotalPrice()}
        onGoToDashboard={handleGoToDashboard}
      />
    </form>
  );
}