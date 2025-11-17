'use client'

import { useState } from 'react'
import { Share2, Copy, Check } from 'lucide-react'
import { getShareInviteLink } from '@/lib/utils/booking-utils'
import { useNotifications } from '@/components/NotificationSystem'

interface ShareInviteButtonProps {
  shareToken?: string
  bookingId?: string
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

export default function ShareInviteButton({ 
  shareToken, 
  bookingId,
  className = '',
  variant = 'secondary'
}: ShareInviteButtonProps) {
  const { showSuccess, showInfo } = useNotifications()
  const [copied, setCopied] = useState(false)

  if (!shareToken) {
    return null
  }

  const handleShare = async () => {
    const shareLink = getShareInviteLink(shareToken)
    
    try {
      await navigator.clipboard.writeText(shareLink)
      setCopied(true)
      showSuccess(
        'Link Copiato!',
        'Il link di invito è stato copiato negli appunti. Condividilo con i tuoi amici!'
      )
      
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Error copying link:', error)
      showInfo('Link di Invito', shareLink)
    }
  }

  const variantStyles = {
    primary: 'bg-orange-600 hover:bg-orange-700 text-white',
    secondary: 'bg-orange-100 hover:bg-orange-200 text-orange-700',
    ghost: 'bg-transparent hover:bg-orange-50 text-orange-600 border border-orange-200'
  }

  return (
    <button
      onClick={handleShare}
      className={`flex items-center gap-2 font-semibold py-2 px-4 rounded-lg transition-colors ${variantStyles[variant]} ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Copiato!
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          Invita Amici
        </>
      )}
    </button>
  )
}
