"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Home, Calendar, Heart, User, Settings, LogOut, Menu, X, Shield, Database, MapPin, FileText, Package, Globe, Palette } from 'lucide-react';
import UserOverview from '@/components/dashboard/UserOverview';
import UserBookings from '@/components/dashboard/UserBookings';
import UserWishlist from '@/components/dashboard/UserWishlist';
import UserProfile from '@/components/dashboard/UserProfile';
import AdminOverview from '@/components/dashboard/AdminOverview';
import ContentDataGrid from '@/components/admin/ContentDataGrid';
import VisualEditor from '@/components/admin/VisualEditor';
import ThemeCustomizer from '@/components/admin/ThemeCustomizer';
import { COLLECTIONS } from '@/lib/firestore-schema';
import ServiceModal from '@/components/admin/ServiceModal';
import PageManager from '@/components/admin/PageManager';
import ExperienceEditModal from '@/components/admin/ExperienceEditModal';
import { NotificationCenter, useNotifications } from '@/components/NotificationSystem';

function UserDashboardContent() {
  const { user, userProfile, signOut, isAdmin } = useAuth();
  const { showSuccess, showInfo } = useNotifications();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [experienceModalOpen, setExperienceModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  // Read tab from URL query params on mount
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const userNavigation = [
    { id: "overview", name: "Panoramica", icon: Home },
    { id: "bookings", name: "Le Mie Prenotazioni", icon: Calendar },
    { id: "wishlist", name: "Lista Desideri", icon: Heart },
    { id: "profile", name: "Il Mio Profilo", icon: User },
  ];

  const adminNavigation = [
    { id: "admin-overview", name: "Admin Dashboard", icon: Shield },
    { id: "admin-cities", name: "Gestione Città", icon: MapPin },
    { id: "admin-experiences", name: "Gestione Esperienze", icon: FileText },
    { id: "admin-travels", name: "Gestione Viaggi", icon: Package },
    { id: "admin-services", name: "Gestione Servizi", icon: Settings },
    { id: "admin-theme", name: "Personalizza Tema", icon: Palette },
    { id: "admin-site", name: "Editor Sito", icon: Globe },
  ];

  const navigation = [...userNavigation, ...(isAdmin ? adminNavigation : [])];

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Service modal handlers
  const handleCreateService = () => {
    setEditingService(null);
    setServiceModalOpen(true);
  };

  const handleEditService = (service: any) => {
    setEditingService(service);
    setServiceModalOpen(true);
  };

  const handleSaveService = async (serviceData: any) => {
    try {
      const token = user ? await user.getIdToken() : null;
      if (!token) throw new Error('Token not available');

      const method = editingService ? 'PUT' : 'POST';
      const body = editingService
        ? { collection: 'services', id: (editingService as any).id, data: serviceData }
        : { collection: 'services', data: serviceData };

      const response = await fetch('/api/admin/content', {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error('Failed to save service');
      }

      // Refresh the data in ContentDataGrid
      window.location.reload(); // Simple refresh for now
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Errore nel salvataggio del servizio');
    }
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "overview":
        return <UserOverview />;
      case "bookings":
        return <UserBookings />;
      case "wishlist":
        return <UserWishlist />;
      case "profile":
        return <UserProfile />;
      case "admin-overview":
        return <AdminOverview />;
      case "admin-cities":
        return (
          <ContentDataGrid
            collection={COLLECTIONS.cities}
            title="Gestione Città"
            columns={[
              { key: 'image', label: 'Immagine', type: 'image' },
              { key: 'name', label: 'Nome', type: 'text', sortable: true },
              { key: 'title', label: 'Titolo', type: 'text' },
              { key: 'category', label: 'Categoria', type: 'text' },
              { key: 'rating', label: 'Rating', type: 'number', sortable: true },
              { key: 'reviews', label: 'Recensioni', type: 'number' },
              { key: 'updatedAt', label: 'Aggiornato', type: 'date', sortable: true }
            ]}
            onCreate={() => alert('Modal creazione città - da implementare')}
            onEdit={(item) => alert(`Modifica città: ${item.name} - da implementare`)}
          />
        );
      case "admin-experiences":
        return (
          <ContentDataGrid
            collection={COLLECTIONS.experiences}
            title="Gestione Esperienze"
            columns={[
              { key: 'images', label: 'Immagine', type: 'image' },
              { key: 'title', label: 'Titolo', type: 'text', sortable: true },
              { key: 'category', label: 'Categoria', type: 'text' },
              { key: 'price', label: 'Prezzo', type: 'number', sortable: true },
              { key: 'duration', label: 'Durata', type: 'text' },
              { key: 'location', label: 'Luogo', type: 'text' },
              { key: 'rating', label: 'Rating', type: 'number', sortable: true }
            ]}
            onCreate={() => alert('Modal creazione esperienza - da implementare')}
            onEdit={(item) => {
              setEditingExperience(item);
              setExperienceModalOpen(true);
            }}
          />
        );
      case "admin-travels":
        return (
          <ContentDataGrid
            collection={COLLECTIONS.travels}
            title="Gestione Viaggi"
            columns={[
              { key: 'images', label: 'Immagine', type: 'image' },
              { key: 'title', label: 'Titolo', type: 'text', sortable: true },
              { key: 'category', label: 'Categoria', type: 'text' },
              { key: 'price', label: 'Prezzo', type: 'number', sortable: true },
              { key: 'duration', label: 'Durata', type: 'text' },
              { key: 'rating', label: 'Rating', type: 'number', sortable: true }
            ]}
            onCreate={() => alert('Modal creazione viaggio - da implementare')}
            onEdit={(item) => alert(`Modifica viaggio: ${item.title} - da implementare`)}
          />
        );
      case "admin-services":
        return (
          <ContentDataGrid
            collection={COLLECTIONS.services}
            title="Gestione Servizi"
            columns={[
              { key: 'name', label: 'Nome', type: 'text', sortable: true },
              { key: 'category', label: 'Categoria', type: 'text' },
              { key: 'type', label: 'Tipo', type: 'text' },
              { key: 'price', label: 'Prezzo', type: 'number', sortable: true },
              { key: 'priceType', label: 'Tipo Prezzo', type: 'text' },
              { key: 'locations', label: 'Località', type: 'array' }
            ]}
            onCreate={handleCreateService}
            onEdit={handleEditService}
          />
        );
      case "admin-theme":
        return <ThemeCustomizer />;
      case "admin-site":
        return <PageManager />;
      default:
        return <UserOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64 bg-card shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-card-foreground">Dashboard</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-accent/10 rounded-lg">
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent/10"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
              <div className="pt-4 border-t border-border">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Esci</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-accent/10 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold text-card-foreground">
                La Mia Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationCenter />
              <div className="hidden sm:block text-sm text-muted-foreground">
                Benvenuto, {userProfile?.displayName || user?.email}
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {userProfile?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 bg-card border-r border-border min-h-screen">
          <nav className="p-4 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent/10"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
            
            <div className="pt-4 border-t border-border">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Esci</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8">
          {renderActiveComponent()}
        </div>
      </div>

      {/* Service Modal */}
      <ServiceModal
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        service={editingService}
        onSave={handleSaveService}
      />

      {/* Experience Edit Modal */}
      <ExperienceEditModal
        isOpen={experienceModalOpen}
        onClose={() => setExperienceModalOpen(false)}
        experience={editingExperience}
        onSave={() => {
          // Success callback
        }}
        onRefreshData={() => {
          // Refresh data without full page reload
          window.location.reload();
        }}
      />
    </div>
  );
}

export default function UserDashboard() {
  return (
    <ProtectedRoute>
      <UserDashboardContent />
    </ProtectedRoute>
  );
}