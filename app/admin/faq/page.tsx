"use client"

import { useState, useEffect } from "react"
import { useNotifications } from "@/components/NotificationSystem"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

const CATEGORIES = [
  { value: "general", label: "Generale" },
  { value: "booking", label: "Prenotazioni" },
  { value: "travel", label: "Viaggi" },
  { value: "payment", label: "Pagamenti" },
]

export default function FAQManagement() {
  const [faqs, setFaqs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    category: "general",
    question: "",
    answer: "",
    published: true,
    order: 0,
  })
  const { showSuccess, showError } = useNotifications()
  const { user } = useAuth()

  useEffect(() => {
    loadFAQs()
  }, [])

  const loadFAQs = async () => {
    try {
      const res = await fetch("/api/faq")
      const data = await res.json()
      setFaqs(data.faqs || [])
    } catch (error) {
      showError("Errore", "Errore nel caricamento delle domande")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.question || !formData.answer) {
      showError("Campi mancanti", "Riempire i campi obbligatori")
      return
    }
    
    if (!user) {
      showError("Non autorizzato", "Devi effettuare il login")
      return
    }

    try {
      const token = await user.getIdToken()
      const method = editingId ? "PUT" : "POST"
      const url = editingId ? `/api/faq/${editingId}` : "/api/faq"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed to save")

      showSuccess(editingId ? "Aggiornata" : "Creata", editingId ? "Domanda aggiornata con successo" : "Domanda creata con successo")
      resetForm()
      loadFAQs()
    } catch (error) {
      showError("Errore", "Errore nel salvataggio della domanda")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Eliminare questa domanda?")) return
    
    if (!user) {
      showError("Non autorizzato", "Devi effettuare il login")
      return
    }

    try {
      const token = await user.getIdToken()
      const res = await fetch(`/api/faq/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) throw new Error("Failed to delete")

      showSuccess("Eliminata", "Domanda eliminata con successo")
      loadFAQs()
    } catch (error) {
      showError("Errore", "Errore nell'eliminazione della domanda")
    }
  }

  const resetForm = () => {
    setFormData({
      category: "general",
      question: "",
      answer: "",
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
        <h1 className="text-3xl font-bold">Domande Frequenti</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Nuova Domanda
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? "Modifica" : "Nuova"} Domanda</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Domanda"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              />
              <Textarea
                placeholder="Risposta"
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                rows={5}
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
        {faqs.map((faq) => (
          <Card key={faq.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <p className="text-xs text-muted-foreground mt-1 mb-2">
                    {CATEGORIES.find((c) => c.value === faq.category)?.label}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{faq.answer}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFormData(faq)
                      setEditingId(faq.id)
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(faq.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
