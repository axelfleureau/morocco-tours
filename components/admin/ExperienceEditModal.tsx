"use client"

import React, { useState, useEffect } from 'react'
import { X, Save, Loader2 } from 'lucide-react'
import VisualEditor from './VisualEditor'
import { useNotifications } from '../NotificationSystem'
import { useAuth } from '@/context/AuthContext'

interface ExperienceEditModalProps {
  isOpen: boolean
  onClose: () => void
  experience: any
  onSave?: () => void
  onRefreshData?: () => void
}

export default function ExperienceEditModal({ 
  isOpen, 
  onClose, 
  experience, 
  onSave,
  onRefreshData 
}: ExperienceEditModalProps) {
  const { showSuccess, showError } = useNotifications()
  const { user } = useAuth()
  const [saving, setSaving] = useState(false)
  const [editingBlocks, setEditingBlocks] = useState<any[]>([])

  useEffect(() => {
    if (experience && isOpen) {
      // Initialize blocks from experience data
      setEditingBlocks(experience.content || [])
    }
  }, [experience, isOpen])

  const handleSave = async (blocks: any[]) => {
    if (!experience || !user) return

    setSaving(true)
    try {
      const token = await user.getIdToken()
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      
      const response = await fetch(`/api/experiences/${experience.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          ...experience,
          content: blocks,
          updatedAt: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save experience')
      }

      // Success feedback
      showSuccess('Salvata', 'Esperienza salvata con successo!')
      onSave?.()
      onRefreshData && onRefreshData()
      onClose()
    } catch (error) {
      console.error('Error saving experience:', error)
      showError('Errore', 'Errore nel salvataggio dell\'esperienza')
    } finally {
      setSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              ✏️ Modifica Esperienza
            </h2>
            <p className="text-muted-foreground mt-1">
              {experience?.title || 'Esperienza senza titolo'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSave(editingBlocks)}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? 'Salvataggio...' : 'Salva'}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Visual Editor */}
        <div className="flex-1 overflow-hidden">
          <VisualEditor
            pageId={experience?.id}
            pageType="experience"
            onSave={setEditingBlocks}
          />
        </div>
      </div>
    </div>
  )
}