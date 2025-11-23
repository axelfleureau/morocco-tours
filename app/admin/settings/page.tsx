"use client"

import { useState, useEffect } from 'react'
import { auth } from '@/lib/firebase'
import { Save, Loader2, Globe, Mail, Palette, FileText } from 'lucide-react'
import { useNotifications } from '@/components/NotificationSystem'
import { SiteSettings, DEFAULT_SITE_SETTINGS } from '@/lib/site-settings-schema'

export default function AdminSettingsPage() {
  const { showSuccess, showError } = useNotifications()
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'hero' | 'contact' | 'social' | 'footer' | 'seo' | 'theme'>('hero')

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const currentUser = auth.currentUser
      if (!currentUser) {
        showError('Errore', 'Devi essere autenticato')
        setLoading(false)
        return
      }

      const token = await currentUser.getIdToken()
      const res = await fetch('/api/site-settings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (!res.ok) throw new Error('Failed to fetch settings')
      const data = await res.json()
      setSettings(data)
    } catch (error) {
      console.error('Error loading settings:', error)
      showError('Errore Caricamento', 'Impossibile caricare le impostazioni del sito')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    const currentUser = auth.currentUser
    if (!currentUser) {
      showError('Errore', 'Devi essere autenticato per salvare le impostazioni')
      return
    }

    setSaving(true)
    try {
      const token = await currentUser.getIdToken()
      const dataToSave = {
        ...settings,
        updatedAt: new Date().toISOString(),
        updatedBy: currentUser.uid
      }

      const res = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSave)
      })

      if (!res.ok) throw new Error('Failed to save settings')
      
      showSuccess('Salvato', 'Impostazioni del sito aggiornate con successo')
      setSettings(dataToSave)
    } catch (error) {
      console.error('Error saving settings:', error)
      showError('Errore Salvataggio', 'Impossibile salvare le impostazioni')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    )
  }

  const tabs = [
    { id: 'hero', label: 'Hero Homepage', icon: Globe },
    { id: 'contact', label: 'Contatti', icon: Mail },
    { id: 'social', label: 'Social Media', icon: Globe },
    { id: 'footer', label: 'Footer', icon: FileText },
    { id: 'seo', label: 'SEO', icon: FileText },
    { id: 'theme', label: 'Theme', icon: Palette }
  ] as const

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Impostazioni Sito</h1>
          <p className="text-muted-foreground mt-2">Modifica tutti i parametri del sito web</p>
        </div>
        
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Salvataggio...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Salva Modifiche
            </>
          )}
        </button>
      </div>

      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-4">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        {activeTab === 'hero' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">Hero Homepage</h2>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Titolo</label>
              <input
                type="text"
                value={settings.hero.title}
                onChange={(e) => setSettings({
                  ...settings,
                  hero: { ...settings.hero, title: e.target.value }
                })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Sottotitolo</label>
              <input
                type="text"
                value={settings.hero.subtitle}
                onChange={(e) => setSettings({
                  ...settings,
                  hero: { ...settings.hero, subtitle: e.target.value }
                })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Testo Pulsante CTA</label>
                <input
                  type="text"
                  value={settings.hero.ctaText}
                  onChange={(e) => setSettings({
                    ...settings,
                    hero: { ...settings.hero, ctaText: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Link Pulsante CTA</label>
                <input
                  type="text"
                  value={settings.hero.ctaLink}
                  onChange={(e) => setSettings({
                    ...settings,
                    hero: { ...settings.hero, ctaLink: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Immagine di Sfondo (opzionale)</label>
              <input
                type="url"
                value={settings.hero.backgroundImage || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  hero: { ...settings.hero, backgroundImage: e.target.value }
                })}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="showVideoButton"
                checked={settings.hero.showVideoButton}
                onChange={(e) => setSettings({
                  ...settings,
                  hero: { ...settings.hero, showVideoButton: e.target.checked }
                })}
                className="w-4 h-4"
              />
              <label htmlFor="showVideoButton" className="text-sm font-medium text-foreground">
                Mostra pulsante video
              </label>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">Informazioni di Contatto</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={settings.contact.email}
                  onChange={(e) => setSettings({
                    ...settings,
                    contact: { ...settings.contact, email: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Telefono</label>
                <input
                  type="tel"
                  value={settings.contact.phone}
                  onChange={(e) => setSettings({
                    ...settings,
                    contact: { ...settings.contact, phone: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">WhatsApp</label>
                <input
                  type="tel"
                  value={settings.contact.whatsapp}
                  onChange={(e) => setSettings({
                    ...settings,
                    contact: { ...settings.contact, whatsapp: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Indirizzo</label>
                <input
                  type="text"
                  value={settings.contact.address}
                  onChange={(e) => setSettings({
                    ...settings,
                    contact: { ...settings.contact, address: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Città</label>
                <input
                  type="text"
                  value={settings.contact.city}
                  onChange={(e) => setSettings({
                    ...settings,
                    contact: { ...settings.contact, city: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Paese</label>
                <input
                  type="text"
                  value={settings.contact.country}
                  onChange={(e) => setSettings({
                    ...settings,
                    contact: { ...settings.contact, country: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">Social Media</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Facebook (opzionale)</label>
                <input
                  type="url"
                  value={settings.social.facebook || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    social: { ...settings.social, facebook: e.target.value }
                  })}
                  placeholder="https://facebook.com/..."
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Instagram (opzionale)</label>
                <input
                  type="url"
                  value={settings.social.instagram || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    social: { ...settings.social, instagram: e.target.value }
                  })}
                  placeholder="https://instagram.com/..."
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">YouTube (opzionale)</label>
                <input
                  type="url"
                  value={settings.social.youtube || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    social: { ...settings.social, youtube: e.target.value }
                  })}
                  placeholder="https://youtube.com/@..."
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Twitter (opzionale)</label>
                <input
                  type="url"
                  value={settings.social.twitter || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    social: { ...settings.social, twitter: e.target.value }
                  })}
                  placeholder="https://twitter.com/..."
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">LinkedIn (opzionale)</label>
                <input
                  type="url"
                  value={settings.social.linkedin || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    social: { ...settings.social, linkedin: e.target.value }
                  })}
                  placeholder="https://linkedin.com/..."
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">TikTok (opzionale)</label>
                <input
                  type="url"
                  value={settings.social.tiktok || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    social: { ...settings.social, tiktok: e.target.value }
                  })}
                  placeholder="https://tiktok.com/@..."
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'footer' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">Footer</h2>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Testo About</label>
              <textarea
                value={settings.footer.aboutText}
                onChange={(e) => setSettings({
                  ...settings,
                  footer: { ...settings.footer, aboutText: e.target.value }
                })}
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Copyright</label>
              <input
                type="text"
                value={settings.footer.copyrightText}
                onChange={(e) => setSettings({
                  ...settings,
                  footer: { ...settings.footer, copyrightText: e.target.value }
                })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="showNewsletter"
                checked={settings.footer.showNewsletter}
                onChange={(e) => setSettings({
                  ...settings,
                  footer: { ...settings.footer, showNewsletter: e.target.checked }
                })}
                className="w-4 h-4"
              />
              <label htmlFor="showNewsletter" className="text-sm font-medium text-foreground">
                Mostra sezione newsletter
              </label>
            </div>

            {settings.footer.showNewsletter && (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Titolo Newsletter</label>
                  <input
                    type="text"
                    value={settings.footer.newsletterTitle}
                    onChange={(e) => setSettings({
                      ...settings,
                      footer: { ...settings.footer, newsletterTitle: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Descrizione Newsletter</label>
                  <input
                    type="text"
                    value={settings.footer.newsletterDescription}
                    onChange={(e) => setSettings({
                      ...settings,
                      footer: { ...settings.footer, newsletterDescription: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">SEO</h2>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Titolo Default</label>
              <input
                type="text"
                value={settings.seo.defaultTitle}
                onChange={(e) => setSettings({
                  ...settings,
                  seo: { ...settings.seo, defaultTitle: e.target.value }
                })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Descrizione Default</label>
              <textarea
                value={settings.seo.defaultDescription}
                onChange={(e) => setSettings({
                  ...settings,
                  seo: { ...settings.seo, defaultDescription: e.target.value }
                })}
                rows={3}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Keywords (separate con virgola)</label>
              <input
                type="text"
                value={settings.seo.defaultKeywords.join(', ')}
                onChange={(e) => setSettings({
                  ...settings,
                  seo: { 
                    ...settings.seo, 
                    defaultKeywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)
                  }
                })}
                placeholder="marocco, viaggi, tour..."
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nome Sito</label>
                <input
                  type="text"
                  value={settings.seo.siteName}
                  onChange={(e) => setSettings({
                    ...settings,
                    seo: { ...settings.seo, siteName: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Twitter Handle (opzionale)</label>
                <input
                  type="text"
                  value={settings.seo.twitterHandle || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    seo: { ...settings.seo, twitterHandle: e.target.value }
                  })}
                  placeholder="@moroccodreams"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">OG Image (opzionale)</label>
              <input
                type="url"
                value={settings.seo.ogImage || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  seo: { ...settings.seo, ogImage: e.target.value }
                })}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        )}

        {activeTab === 'theme' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">Theme</h2>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Colore Primario</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.theme.primaryColor}
                    onChange={(e) => setSettings({
                      ...settings,
                      theme: { ...settings.theme, primaryColor: e.target.value }
                    })}
                    className="w-12 h-10 border border-border rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.theme.primaryColor}
                    onChange={(e) => setSettings({
                      ...settings,
                      theme: { ...settings.theme, primaryColor: e.target.value }
                    })}
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Colore Secondario</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.theme.secondaryColor}
                    onChange={(e) => setSettings({
                      ...settings,
                      theme: { ...settings.theme, secondaryColor: e.target.value }
                    })}
                    className="w-12 h-10 border border-border rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.theme.secondaryColor}
                    onChange={(e) => setSettings({
                      ...settings,
                      theme: { ...settings.theme, secondaryColor: e.target.value }
                    })}
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Colore Accent</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.theme.accentColor}
                    onChange={(e) => setSettings({
                      ...settings,
                      theme: { ...settings.theme, accentColor: e.target.value }
                    })}
                    className="w-12 h-10 border border-border rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.theme.accentColor}
                    onChange={(e) => setSettings({
                      ...settings,
                      theme: { ...settings.theme, accentColor: e.target.value }
                    })}
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Logo URL (opzionale)</label>
                <input
                  type="url"
                  value={settings.theme.logoUrl || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    theme: { ...settings.theme, logoUrl: e.target.value }
                  })}
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Favicon URL (opzionale)</label>
                <input
                  type="url"
                  value={settings.theme.faviconUrl || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    theme: { ...settings.theme, faviconUrl: e.target.value }
                  })}
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
