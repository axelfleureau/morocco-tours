'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Calendar as CalendarIcon, Users, Phone, Mail, FileText, Check, ArrowLeft, ArrowRight } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'

interface BookingFormProps {
  contentItem: {
    id: string
    type: string
    title: string
    price: number | null
    image: string | null
  }
  open: boolean
  onClose: () => void
}

export function BookingForm({ contentItem, open, onClose }: BookingFormProps) {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [formData, setFormData] = useState({
    travelers: 2,
    customerInfo: {
      name: user?.displayName || '',
      email: user?.email || '',
      phone: ''
    },
    notes: ''
  })
  
  const handleSubmit = async () => {
    if (!user) {
      toast.error('Devi effettuare il login per prenotare')
      return
    }
    
    if (!dateRange?.from) {
      toast.error('Seleziona almeno una data di partenza')
      return
    }
    
    setLoading(true)
    
    try {
      const token = await user.getIdToken()
      
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bookingType: contentItem.type,
          itemId: contentItem.id,
          startDate: dateRange.from ? dateRange.from.toISOString() : null,
          endDate: dateRange.to ? dateRange.to.toISOString() : (dateRange.from ? dateRange.from.toISOString() : null),
          travelers: formData.travelers,
          customerInfo: formData.customerInfo,
          notes: formData.notes,
          totalPrice: contentItem.price ? contentItem.price * formData.travelers : 0,
          currency: 'EUR'
        })
      })
      
      if (response.ok) {
        toast.success('Prenotazione creata con successo!', {
          description: 'Ti contatteremo presto per confermare i dettagli.'
        })
        onClose()
        setStep(1)
        setDateRange(undefined)
        setFormData({
          travelers: 2,
          customerInfo: {
            name: user?.displayName || '',
            email: user?.email || '',
            phone: ''
          },
          notes: ''
        })
      } else {
        const error = await response.json()
        toast.error('Errore nella prenotazione', {
          description: error.error || 'Riprova più tardi'
        })
      }
    } catch (error) {
      console.error('Booking error:', error)
      toast.error('Errore nella prenotazione', {
        description: 'Si è verificato un errore. Riprova più tardi.'
      })
    } finally {
      setLoading(false)
    }
  }
  
  const totalPrice = contentItem.price ? contentItem.price * formData.travelers : 0
  
  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={`h-2 w-12 rounded-full transition-all ${
            s === step 
              ? 'bg-orange-500' 
              : s < step 
                ? 'bg-orange-300' 
                : 'bg-gray-200 dark:bg-gray-700'
          }`}
        />
      ))}
    </div>
  )
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Prenota: {contentItem.title}
          </DialogTitle>
          <DialogDescription>
            Completa i passaggi per richiedere la prenotazione
          </DialogDescription>
        </DialogHeader>
        
        {renderStepIndicator()}
        
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-orange-500" />
                Seleziona le Date
              </h3>
              <div className="flex justify-center">
                <Calendar 
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>
              {dateRange?.from && (
                <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                    Date selezionate:
                  </p>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    {format(dateRange.from, 'PPP')}
                    {dateRange.to && ` - ${format(dateRange.to, 'PPP')}`}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Annulla
              </Button>
              <Button
                onClick={() => setStep(2)}
                disabled={!dateRange?.from}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                Continua
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" />
                Dettagli Viaggiatori
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="travelers">Numero di Viaggiatori *</Label>
                  <Input
                    id="travelers"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.travelers}
                    onChange={(e) => setFormData({
                      ...formData, 
                      travelers: parseInt(e.target.value) || 1
                    })}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.customerInfo.name}
                    onChange={(e) => setFormData({
                      ...formData,
                      customerInfo: {...formData.customerInfo, name: e.target.value}
                    })}
                    placeholder="Mario Rossi"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.customerInfo.email}
                      onChange={(e) => setFormData({
                        ...formData,
                        customerInfo: {...formData.customerInfo, email: e.target.value}
                      })}
                      placeholder="mario@esempio.it"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">Telefono *</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.customerInfo.phone}
                      onChange={(e) => setFormData({
                        ...formData,
                        customerInfo: {...formData.customerInfo, phone: e.target.value}
                      })}
                      placeholder="+39 329 233 3370"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes">Note o Richieste Speciali</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Allergie, preferenze, richieste particolari..."
                    className="mt-1 resize-none"
                    rows={3}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Indietro
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={
                  !formData.customerInfo.name || 
                  !formData.customerInfo.email || 
                  !formData.customerInfo.phone
                }
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                Continua
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-orange-500" />
                Conferma Prenotazione
              </h3>
              
              <div className="space-y-4">
                {contentItem.image && (
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <img
                      src={contentItem.image}
                      alt={contentItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Esperienza</p>
                      <p className="font-semibold">{contentItem.title}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Date</p>
                    <p className="font-medium">
                      {dateRange?.from && format(dateRange.from, 'PPP')}
                      {dateRange?.to && ` - ${format(dateRange.to, 'PPP')}`}
                    </p>
                  </div>
                  
                  <div className="border-t pt-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Viaggiatori</p>
                    <p className="font-medium">{formData.travelers} {formData.travelers === 1 ? 'persona' : 'persone'}</p>
                  </div>
                  
                  <div className="border-t pt-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Contatti</p>
                    <p className="text-sm">{formData.customerInfo.name}</p>
                    <p className="text-sm">{formData.customerInfo.email}</p>
                    <p className="text-sm">{formData.customerInfo.phone}</p>
                  </div>
                  
                  {formData.notes && (
                    <div className="border-t pt-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Note</p>
                      <p className="text-sm">{formData.notes}</p>
                    </div>
                  )}
                  
                  <div className="border-t pt-3 flex justify-between items-center">
                    <p className="text-lg font-bold">Prezzo Totale Stimato</p>
                    <p className="text-2xl font-bold text-orange-600">
                      €{totalPrice}
                    </p>
                  </div>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Il prezzo finale verrà confermato dal nostro team
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                disabled={loading}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Indietro
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                {loading ? 'Invio...' : 'Conferma Prenotazione'}
                <Check className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
