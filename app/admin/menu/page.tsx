"use client"

import { useState, useEffect } from "react"
import { useNotifications } from "@/hooks/useNotifications"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"

export default function MenuManagement() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ label: "", href: "", description: "", order: 0 })
  const { showSuccess, showError } = useNotifications()

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      const res = await fetch("/api/menu")
      const data = await res.json()
      setItems(data.items || [])
    } catch (error) {
      showError("Errore nel caricamento menu")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.label || !formData.href) {
      showError("Riempire i campi obbligatori")
      return
    }

    try {
      const method = editingId ? "PUT" : "POST"
      const url = editingId ? `/api/menu/${editingId}` : "/api/menu"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed to save")

      showSuccess(editingId ? "Voce aggiornata" : "Voce creata")
      setFormData({ label: "", href: "", description: "", order: 0 })
      setEditingId(null)
      loadItems()
    } catch (error) {
      showError("Errore nel salvataggio")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Eliminare questa voce?")) return

    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
        },
      })

      if (!res.ok) throw new Error("Failed to delete")

      showSuccess("Voce eliminata")
      loadItems()
    } catch (error) {
      showError("Errore nell'eliminazione")
    }
  }

  if (loading) {
    return <div className="text-center py-8">Caricamento...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestione Menu</h1>
        <Dialog
          open={editingId === null && formData.label !== ""}
          onOpenChange={(open) => {
            if (!open) {
              setFormData({ label: "", href: "", description: "", order: 0 })
              setEditingId(null)
            }
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setFormData({ label: "", href: "", description: "", order: 0 })}>
              <Plus className="w-4 h-4 mr-2" />
              Nuova Voce
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Modifica Voce" : "Nuova Voce"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
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
              <Textarea
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
              <Button onClick={handleSave} className="w-full">
                Salva
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
