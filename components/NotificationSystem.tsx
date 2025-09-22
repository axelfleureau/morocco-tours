"use client"

import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle, Bell, ExternalLink } from 'lucide-react'

interface NotificationAction {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'danger'
}

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number // Auto-dismiss time in ms, 0 for persistent
  actions?: NotificationAction[]
  persistent?: boolean
  createdAt: Date
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => string
  removeNotification: (id: string) => void
  clearAll: () => void
  // Convenience methods
  showSuccess: (title: string, message: string, actions?: NotificationAction[]) => string
  showError: (title: string, message: string, actions?: NotificationAction[]) => string
  showWarning: (title: string, message: string, actions?: NotificationAction[]) => string
  showInfo: (title: string, message: string, actions?: NotificationAction[]) => string
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

interface NotificationProviderProps {
  children: ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    const newNotification: Notification = {
      ...notification,
      id,
      createdAt: new Date(),
      duration: notification.duration ?? (notification.type === 'error' ? 8000 : 5000)
    }

    setNotifications(prev => [newNotification, ...prev])

    // Auto-dismiss if duration is set and > 0
    if (newNotification.duration && newNotification.duration > 0 && !newNotification.persistent) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }

    return id
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  // Convenience methods for common notification types
  const showSuccess = (title: string, message: string, actions?: NotificationAction[]) => 
    addNotification({ type: 'success', title, message, actions })

  const showError = (title: string, message: string, actions?: NotificationAction[]) => 
    addNotification({ type: 'error', title, message, actions, persistent: true })

  const showWarning = (title: string, message: string, actions?: NotificationAction[]) => 
    addNotification({ type: 'warning', title, message, actions })

  const showInfo = (title: string, message: string, actions?: NotificationAction[]) => 
    addNotification({ type: 'info', title, message, actions })

  const value: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

// Toast Container Component
function ToastContainer() {
  const { notifications, removeNotification } = useNotifications()

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.slice(0, 5).map((notification) => (
        <Toast
          key={notification.id}
          notification={notification}
          onDismiss={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}

// Individual Toast Component
interface ToastProps {
  notification: Notification
  onDismiss: () => void
}

function Toast({ notification, onDismiss }: ToastProps) {
  const { type, title, message, actions } = notification

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'error': return <AlertCircle className="w-5 h-5 text-red-600" />
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'info': return <Info className="w-5 h-5 text-blue-600" />
    }
  }

  const getBorderColor = () => {
    switch (type) {
      case 'success': return 'border-green-400'
      case 'error': return 'border-red-400'
      case 'warning': return 'border-yellow-400'
      case 'info': return 'border-blue-400'
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return 'bg-green-50'
      case 'error': return 'bg-red-50'
      case 'warning': return 'bg-yellow-50'
      case 'info': return 'bg-blue-50'
    }
  }

  return (
    <div
      className={`
        bg-white border-l-4 ${getBorderColor()} ${getBackgroundColor()}
        rounded-lg shadow-lg p-4 min-w-80 max-w-sm
        transform transition-all duration-300 ease-in-out
        animate-in slide-in-from-right
      `}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3 mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 mb-1">
            {title}
          </h4>
          <p className="text-sm text-gray-700 mb-3">
            {message}
          </p>
          
          {/* Action buttons */}
          {actions && actions.length > 0 && (
            <div className="flex gap-2 mt-3">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    action.onClick()
                    onDismiss()
                  }}
                  className={`
                    px-3 py-1 text-xs font-medium rounded
                    ${action.variant === 'primary' ? 'bg-orange-500 text-white hover:bg-orange-600' :
                      action.variant === 'danger' ? 'bg-red-500 text-white hover:bg-red-600' :
                      'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                    transition-colors
                  `}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button
          onClick={onDismiss}
          className="flex-shrink-0 ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// Notification Center Component for Dashboard
export function NotificationCenter() {
  const { notifications, removeNotification, clearAll } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.length

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Notifiche</h3>
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancella tutto
                </button>
              )}
            </div>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Nessuna notifica</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => removeNotification(notification.id)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      {notification.type === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                      {notification.type === 'error' && <AlertCircle className="w-4 h-4 text-red-600" />}
                      {notification.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                      {notification.type === 'info' && <Info className="w-4 h-4 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {notification.createdAt.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Pre-built notification templates for common use cases
export const NotificationTemplates = {
  // Content Management
  contentSaved: (itemType: string, itemName: string) => ({
    type: 'success' as const,
    title: 'Contenuto Salvato',
    message: `${itemType} "${itemName}" salvato con successo.`,
    actions: [
      {
        label: 'Visualizza',
        onClick: () => window.location.reload(),
        variant: 'primary' as const
      }
    ]
  }),

  contentPublished: (itemType: string, itemName: string) => ({
    type: 'success' as const,
    title: 'Contenuto Pubblicato',
    message: `${itemType} "${itemName}" è ora pubblico.`,
    actions: [
      {
        label: 'Vedi Live',
        onClick: () => window.open('/', '_blank'),
        variant: 'primary' as const
      }
    ]
  }),

  contentDeleted: (itemType: string, itemName: string) => ({
    type: 'info' as const,
    title: 'Contenuto Eliminato',
    message: `${itemType} "${itemName}" è stato eliminato.`
  }),

  // System Operations
  systemError: (operation: string, error: string) => ({
    type: 'error' as const,
    title: 'Errore Sistema',
    message: `Errore durante ${operation}: ${error}`,
    persistent: true,
    actions: [
      {
        label: 'Riprova',
        onClick: () => window.location.reload(),
        variant: 'primary' as const
      },
      {
        label: 'Supporto',
        onClick: () => alert('Contatta il supporto tecnico'),
        variant: 'secondary' as const
      }
    ]
  }),

  // User Actions
  loginSuccess: (userName: string) => ({
    type: 'success' as const,
    title: 'Accesso Effettuato',
    message: `Benvenuto, ${userName}!`
  }),

  logoutSuccess: () => ({
    type: 'info' as const,
    title: 'Logout Effettuato',
    message: 'Sei stato disconnesso con successo.'
  }),

  // Database Operations
  dataImported: (count: number, type: string) => ({
    type: 'success' as const,
    title: 'Importazione Completata',
    message: `${count} ${type} importati con successo.`,
    actions: [
      {
        label: 'Visualizza',
        onClick: () => window.location.reload(),
        variant: 'primary' as const
      }
    ]
  }),

  // Maintenance
  maintenanceWarning: (scheduledTime: string) => ({
    type: 'warning' as const,
    title: 'Manutenzione Programmata',
    message: `Il sistema sarà in manutenzione ${scheduledTime}. Salva il tuo lavoro.`,
    persistent: true,
    actions: [
      {
        label: 'Salva Ora',
        onClick: () => alert('Salvataggio automatico...'),
        variant: 'primary' as const
      }
    ]
  })
}