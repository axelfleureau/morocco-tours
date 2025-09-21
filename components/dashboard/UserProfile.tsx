"use client";

import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Bell, Shield, Save, Edit2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { firestoreService } from '@/lib/firestore';

export default function UserProfile() {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    displayName: '',
    phone: '',
    birthDate: '',
    nationality: '',
    preferences: {
      newsletter: false,
      notifications: false,
      language: 'it'
    },
    profile: {
      travelPreferences: [] as string[],
      wishlist: [] as string[]
    }
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        displayName: userProfile.displayName || '',
        phone: userProfile.profile?.phone || '',
        birthDate: userProfile.profile?.birthDate || '',
        nationality: userProfile.profile?.nationality || 'Italy',
        preferences: {
          newsletter: userProfile.preferences?.newsletter || false,
          notifications: userProfile.preferences?.notifications || false,
          language: userProfile.preferences?.language || 'it'
        },
        profile: {
          travelPreferences: userProfile.profile?.travelPreferences || [],
          wishlist: userProfile.profile?.wishlist || []
        }
      });
    }
  }, [userProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const handleTravelPreferenceToggle = (preference: string) => {
    setFormData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        travelPreferences: prev.profile.travelPreferences.includes(preference)
          ? prev.profile.travelPreferences.filter(p => p !== preference)
          : [...prev.profile.travelPreferences, preference]
      }
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // In a real implementation, you would update the profile in Firestore
      console.log('Saving profile:', formData);
      setSuccess('Profilo aggiornato con successo!');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError('Errore nell\'aggiornamento del profilo');
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const travelPreferenceOptions = [
    'Avventura', 'Cultura', 'Gastronomia', 'Relax', 'Storia', 'Natura',
    'Fotografia', 'Sport', 'Famiglia', 'Romantico', 'Economico', 'Lusso'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Il Mio Profilo</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Edit2 className="w-4 h-4" />
          <span>{isEditing ? 'Annulla' : 'Modifica'}</span>
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-green-700 dark:text-green-300">
          {success}
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-orange-500" />
            Informazioni Personali
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground disabled:bg-gray-50 dark:disabled:bg-gray-700"
                placeholder="Il tuo nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-3 py-2 border border-border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Telefono
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground disabled:bg-gray-50 dark:disabled:bg-gray-700"
                placeholder="+39 123 456 7890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Data di Nascita
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground disabled:bg-gray-50 dark:disabled:bg-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nazionalità
              </label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground disabled:bg-gray-50 dark:disabled:bg-gray-700"
                placeholder="Italia"
              />
            </div>

          </div>
        </div>

        {/* Travel Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-orange-500" />
            Preferenze di Viaggio
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              name="profile.bio"
              value={formData.profile.bio}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground disabled:bg-gray-50 dark:disabled:bg-gray-700"
              placeholder="Raccontaci qualcosa di te e dei tuoi interessi di viaggio..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Interessi di Viaggio
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {travelPreferenceOptions.map((preference) => (
                <label
                  key={preference}
                  className={`flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                    formData.profile.travelPreferences.includes(preference)
                      ? 'bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-300'
                      : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
                  } ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={formData.profile.travelPreferences.includes(preference)}
                    onChange={() => handleTravelPreferenceToggle(preference)}
                    disabled={!isEditing}
                    className="rounded text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm">{preference}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-orange-500" />
            Contatto di Emergenza
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome
              </label>
              <input
                type="text"
                name="profile.emergencyContact.name"
                value={formData.profile.emergencyContact.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground disabled:bg-gray-50 dark:disabled:bg-gray-700"
                placeholder="Nome del contatto"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Telefono
              </label>
              <input
                type="tel"
                name="profile.emergencyContact.phone"
                value={formData.profile.emergencyContact.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground disabled:bg-gray-50 dark:disabled:bg-gray-700"
                placeholder="+39 123 456 7890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Parentela
              </label>
              <select
                name="profile.emergencyContact.relationship"
                value={formData.profile.emergencyContact.relationship}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground disabled:bg-gray-50 dark:disabled:bg-gray-700"
              >
                <option value="">Seleziona...</option>
                <option value="parent">Genitore</option>
                <option value="spouse">Coniuge</option>
                <option value="sibling">Fratello/Sorella</option>
                <option value="child">Figlio/a</option>
                <option value="friend">Amico/a</option>
                <option value="other">Altro</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-orange-500" />
            Preferenze Notifiche
          </h3>
          
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="preferences.newsletter"
                checked={formData.preferences.newsletter}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="rounded text-orange-500 focus:ring-orange-500 disabled:opacity-60"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Newsletter</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ricevi offerte speciali e novità sui viaggi
                </p>
              </div>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="preferences.notifications"
                checked={formData.preferences.notifications}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="rounded text-orange-500 focus:ring-orange-500 disabled:opacity-60"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Notifiche Push</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Aggiornamenti su prenotazioni e promemoria
                </p>
              </div>
            </label>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Lingua Preferita
              </label>
              <select
                name="preferences.language"
                value={formData.preferences.language}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-32 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground disabled:bg-gray-50 dark:disabled:bg-gray-700"
              >
                <option value="it">Italiano</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Salvando...' : 'Salva Modifiche'}</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}