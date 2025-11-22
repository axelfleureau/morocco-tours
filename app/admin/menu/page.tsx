"use client"

import { useState, useEffect } from "react"
import { useNotifications } from "@/components/NotificationSystem"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2 } from "lucide-react"

export default function MenuManagement() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ label: "", href: "", description: "", order: 0 })
  const { showSuccess, showError } = useNotifications()
  const { user } = useAuth()

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      const res = await fetch("/api/menu")
      const data = await res.json()
      setItems(data.items || [])
    } catch (error) {
      showError("Errore", "Errore nel caricamento menu")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.label || !formData.href) {
      showError("Validazione", "Riempire i campi obbligatori")
      return
    }

    try {
      if (!user) return
      const token = await user.getIdToken()
      const method = editingId ? "PUT" : "POST"
      const url = editingId ? `/api/menu/${editingId}` : "/api/menu"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed to save")

      showSuccess(editingId ? "Aggiornata" : "Creata", editingId ? "Voce aggiornata con successo" : "Voce creata con successo")
      setFormData({ label: "", href: "", description: "", order: 0 })
      setEditingId(null)
      setShowModal(false)
      loadItems()
    } catch (error) {
      showError("Errore", "Errore nel salvataggio della voce")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Eliminare questa voce?")) return

    try {
      if (!user) return
      const token = await user.getIdToken()
      const res = await fetch(`/api/menu/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) throw new Error("Failed to delete")

      showSuccess("Eliminata", "Voce eliminata con successo")
      loadItems()
    } catch (error) {
      showError("Errore", "Errore nell'eliminazione della voce")
    }
  }

  const resetForm = () => {
    setFormData({ label: "", href: "", description: "", order: 0 })
    setEditingId(null)
  }

  if (loading) {
    return <div className="text-center py-8">Caricamento...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestione Menu</h1>
        <Button onClick={() => { resetForm(); setShowModal(true) }}>
          <Plus className="w-4 h-4 mr-2" />
          Nuova Voce
        </Button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">{editingId ? "Modifica Voce" : "Nuova Voce"}</h2>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              <Input
                placeholder="Etichetta"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              />
              <Input
                placeholder="URL (es: /chi-siamo)"
                value={formData.href}
                onChange={(e) => setFormData({ ...formData, href: e.target.value })}
              />
              <Input
                placeholder="Descrizione (opzionale)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Ordine"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              />
              <div className="flex gap-3 justify-end pt-4 border-t">
                <Button variant="outline" onClick={() => { setShowModal(false); resetForm() }}>Annulla</Button>
                <Button onClick={handleSave}>Salva</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.href}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFormData(item)
                    setEditingId(item.id)
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
