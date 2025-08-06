"use client"

import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { FirebaseProvider } from '@/components/providers/FirebaseProvider'
import { Toaster } from 'react-hot-toast'

export default function AdminPage() {
  return (
    <FirebaseProvider>
      <AdminDashboard />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </FirebaseProvider>
  )
}