"use client"

import { useState, useEffect } from "react"
import { useNotifications } from "@/components/NotificationSystem"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2 } from "lucide-react"

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    service: "",
    rating: 5,
    comment: "",
    published: true,
    order: 0,
  })
  const { showSuccess, showError } = useNotifications()

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials")
      const data = await res.json()
      setTestimonials(data.testimonials || [])
    } catch (error) {
      showError("Errore", "Errore nel caricamento delle testimonianze")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.name || !formData.comment) {
      showError("Campi mancanti", "Riempire i campi obbligatori")
      return
    }

    try {
      const method = editingId ? "PUT" : "POST"
      const url = editingId ? `/api/testimonials/${editingId}` : "/api/testimonials"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed to save")

      showSuccess(editingId ? "Aggiornata" : "Creata", editingId ? "Testimonianza aggiornata con successo" : "Testimonianza creata con successo")
      resetForm()
      loadTestimonials()
    } catch (error) {
      showError("Errore", "Errore nel salvataggio della testimonianza")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Eliminare questa testimonianza?")) return

    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
        },
      })

      if (!res.ok) throw new Error("Failed to delete")

      showSuccess("Eliminata", "Testimonianza eliminata con successo")
      loadTestimonials()
    } catch (error) {
      showError("Errore", "Errore nell'eliminazione della testimonianza")
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      service: "",
      rating: 5,
      comment: "",
      published: true,
      order: 0,
    })
    setEditingId(null)
  }

  const [showModal, setShowModal] = useState(false)

  if (loading) return <div className="text-center py-8">Caricamento...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Testimonianze</h1>
        <Button onClick={() => { resetForm(); setShowModal(true) }}>
          <Plus className="w-4 h-4 mr-2" />
          Nuova Testimonianza
        </Button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">{editingId ? "Modifica" : "Nuova"} Testimonianza</h2>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                  placeholder="Luogo"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <Input
                placeholder="Servizio/Viaggio"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  min="1"
                  max="5"
                  placeholder="Valutazione"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                />
                <Input
                  type="number"
                  placeholder="Ordine"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                />
              </div>
              <Textarea
                placeholder="Commento"
                value={formData.comment}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, comment: e.target.value })}
                rows={4}
              />
              <div className="flex gap-3 justify-end pt-4 border-t">
                <Button variant="outline" onClick={() => { setShowModal(false); resetForm() }}>Annulla</Button>
                <Button onClick={() => { handleSave(); setShowModal(false) }}>Salva</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {testimonials.map((t) => (
          <Card key={t.id}>
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold">{t.name}</h3>
                <p className="text-sm text-muted-foreground">{t.location}</p>
                <p className="text-sm mt-2 line-clamp-2">{t.comment}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFormData(t)
                    setEditingId(t.id)
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(t.id)}
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
