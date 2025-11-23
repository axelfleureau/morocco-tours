'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react'
import { format } from 'date-fns'
import { 
  UnifiedAdminTable, 
  TableColumn,
  TableAction
} from '@/components/admin/UnifiedAdminTable'

interface Booking {
  id: string
  userId: string
  bookingType: string
  itemId: string
  itemData: {
    title?: string
    slug?: string
    image?: string
    price?: number
  }
  startDate: string | null
  endDate: string | null
  travelers: number | null
  totalPrice: number | null
  currency: string
  customerInfo: any
  status: string
  paymentStatus: string
  notes: string | null
  createdAt: string
  updatedAt: string
}

export default function BookingManagerPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAllBookings()
  }, [])

  const fetchAllBookings = async () => {
    setLoading(true)
    setError(null)

    try {
      if (!user) {
        setError('You must be logged in')
        setLoading(false)
        return
      }

      const token = await user.getIdToken()
      
      const response = await fetch('/api/bookings?admin=true', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch bookings')
      }

      const data = await response.json()
      setBookings(data.bookings || [])
    } catch (err: any) {
      console.error('Error fetching bookings:', err)
      setError(err.message || 'Failed to fetch bookings')
      toast.error('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (bookingId: string, status: string) => {
    try {
      if (!user) {
        toast.error('You must be logged in to perform this action')
        return
      }

      const token = await user.getIdToken()
      
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update booking')
      }

      toast.success(`Booking ${status} successfully`)
      fetchAllBookings()
    } catch (error: any) {
      console.error('Error updating booking:', error)
      toast.error(error.message || 'Failed to update booking')
    }
  }

  const updatePaymentStatus = async (bookingId: string, paymentStatus: string) => {
    try {
      if (!user) {
        toast.error('You must be logged in to perform this action')
        return
      }

      const token = await user.getIdToken()
      
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paymentStatus })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update payment status')
      }

      toast.success(`Payment marked as ${paymentStatus}`)
      fetchAllBookings()
    } catch (error: any) {
      console.error('Error updating payment:', error)
      toast.error(error.message || 'Failed to update payment status')
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'default'
      case 'pending':
        return 'secondary'
      case 'cancelled':
        return 'destructive'
      case 'completed':
        return 'default'
      default:
        return 'secondary'
    }
  }

  const getPaymentVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'default'
      case 'pending':
        return 'secondary'
      case 'failed':
        return 'destructive'
      case 'refunded':
        return 'secondary'
      default:
        return 'secondary'
    }
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-'
    try {
      return format(new Date(dateStr), 'MMM dd, yyyy')
    } catch {
      return '-'
    }
  }

  const columns: TableColumn<Booking>[] = [
    {
      key: 'id',
      label: 'Booking ID',
      render: (booking) => (
        <span className="font-mono text-xs">{booking.id.slice(0, 8)}...</span>
      )
    },
    {
      key: 'item',
      label: 'Item',
      render: (booking) => (
        <div>
          <p className="font-medium">{booking.itemData?.title || 'N/A'}</p>
          <p className="text-xs text-muted-foreground">
            User: {booking.userId.slice(0, 8)}...
          </p>
        </div>
      )
    },
    {
      key: 'bookingType',
      label: 'Type',
      render: (booking) => (
        <Badge variant="outline" className="capitalize">
          {booking.bookingType}
        </Badge>
      )
    },
    {
      key: 'date',
      label: 'Date',
      render: (booking) => (
        <div className="text-sm">
          <p>{formatDate(booking.startDate)}</p>
          {booking.endDate && (
            <p className="text-xs text-muted-foreground">
              to {formatDate(booking.endDate)}
            </p>
          )}
        </div>
      )
    },
    {
      key: 'travelers',
      label: 'Travelers',
      render: (booking) => booking.travelers ? `${booking.travelers} pax` : '-'
    },
    {
      key: 'price',
      label: 'Price',
      render: (booking) => booking.totalPrice ? (
        <span className="font-medium">
          {booking.currency} {booking.totalPrice}
        </span>
      ) : (
        <span className="text-muted-foreground">-</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (booking) => (
        <Badge variant={getStatusVariant(booking.status)} className="capitalize">
          {booking.status}
        </Badge>
      )
    },
    {
      key: 'paymentStatus',
      label: 'Payment',
      render: (booking) => (
        <Badge variant={getPaymentVariant(booking.paymentStatus)} className="capitalize">
          {booking.paymentStatus}
        </Badge>
      )
    }
  ]

  const actions: TableAction<Booking>[] = [
    {
      label: 'Confirm Booking',
      icon: <CheckCircle className="w-4 h-4" />,
      onClick: (booking) => updateStatus(booking.id, 'confirmed'),
      className: 'cursor-pointer'
    },
    {
      label: 'Set Pending',
      icon: <Clock className="w-4 h-4" />,
      onClick: (booking) => updateStatus(booking.id, 'pending'),
      className: 'cursor-pointer'
    },
    {
      label: 'Mark Completed',
      icon: <CheckCircle className="w-4 h-4" />,
      onClick: (booking) => updateStatus(booking.id, 'completed'),
      className: 'cursor-pointer'
    },
    {
      label: 'Cancel Booking',
      icon: <XCircle className="w-4 h-4" />,
      onClick: (booking) => updateStatus(booking.id, 'cancelled'),
      className: 'text-red-600 focus:text-red-600 cursor-pointer',
      separator: true
    },
    {
      label: 'Mark Paid',
      icon: <DollarSign className="w-4 h-4" />,
      onClick: (booking) => updatePaymentStatus(booking.id, 'paid'),
      className: 'cursor-pointer',
      separator: true
    },
    {
      label: 'Mark Refunded',
      icon: <DollarSign className="w-4 h-4" />,
      onClick: (booking) => updatePaymentStatus(booking.id, 'refunded'),
      className: 'cursor-pointer'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Booking Manager</h1>
          <p className="text-muted-foreground mt-1">
            Manage all customer bookings and reservations
          </p>
        </div>
        <Button onClick={fetchAllBookings} variant="outline">
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <Button onClick={fetchAllBookings} className="mt-4">
            Try Again
          </Button>
        </div>
      ) : (
        <>
          <UnifiedAdminTable
            data={bookings}
            columns={columns}
            actions={actions}
            keyExtractor={(booking) => booking.id}
            emptyMessage="No bookings found"
          />
          {bookings.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Showing {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
            </div>
          )}
        </>
      )}
    </div>
  )
}
