"use client"

import { useState, useEffect } from 'react'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Search, Edit, Shield, User, Clock } from 'lucide-react'

interface AdminUser {
  id: string
  email: string
  displayName: string
  role: 'super_admin' | 'content_editor' | 'viewer'
  permissions: string[]
  active: boolean
  createdAt: any
  lastLogin?: any
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('')

  const roles = [
    { value: 'super_admin', label: 'Super Admin', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' },
    { value: 'content_editor', label: 'Content Editor', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
    { value: 'viewer', label: 'Viewer', color: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400' }
  ]

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    let filtered = users

    if (searchTerm) {
      filtered = filtered.filter(u => 
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (roleFilter) {
      filtered = filtered.filter(u => u.role === roleFilter)
    }

    setFilteredUsers(filtered)
  }, [searchTerm, roleFilter, users])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'adminUsers'))
      const usrs: AdminUser[] = []
      
      querySnapshot.forEach((doc) => {
        usrs.push({ id: doc.id, ...doc.data() } as AdminUser)
      })
      
      setUsers(usrs)
      setFilteredUsers(usrs)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleActive = async (user: AdminUser) => {
    try {
      const userRef = doc(db, 'adminUsers', user.id)
      await updateDoc(userRef, { active: !user.active })
      
      setUsers(prev => prev.map(u => 
        u.id === user.id ? { ...u, active: !u.active } : u
      ))
    } catch (error) {
      console.error('Error toggling active:', error)
    }
  }

  const getRoleBadge = (role: string) => {
    const roleInfo = roles.find(r => r.value === role)
    return roleInfo || roles[2]
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Mai'
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
      return new Intl.DateTimeFormat('it-IT', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date)
    } catch {
      return 'N/A'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Caricamento utenti admin...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestione Utenti Admin</h1>
          <p className="text-muted-foreground mt-1">
            {users.length} admin totali, {users.filter(u => u.active).length} attivi
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cerca per email o nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Tutti i ruoli</option>
            {roles.map(role => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Utente</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Ruolo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Permessi</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Ultimo Accesso</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Stato</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    Nessun utente trovato
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const roleBadge = getRoleBadge(user.role)
                  return (
                    <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                            {user.displayName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{user.displayName}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${roleBadge.color}`}>
                          <Shield className="w-3 h-3 inline mr-1" />
                          {roleBadge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {user.permissions?.slice(0, 3).map((perm, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs"
                            >
                              {perm.replace('_', ' ')}
                            </span>
                          ))}
                          {user.permissions?.length > 3 && (
                            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs">
                              +{user.permissions.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {formatDate(user.lastLogin)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleActive(user)}
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            user.active
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {user.active ? 'Attivo' : 'Disattivato'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="p-2 hover:bg-muted rounded-lg transition-colors text-blue-600"
                            title="Modifica"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
