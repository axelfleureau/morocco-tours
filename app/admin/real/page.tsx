"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { BarChart3, MapPin, Package, Users, Calendar, Settings, FileText } from 'lucide-react';
import DashboardOverview from '@/components/admin/DashboardOverview';
import UsersManagement from '@/components/admin/UsersManagement';

function RealAdminPanelContent() {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: BarChart3 },
    { id: "travels", name: "Gestione Viaggi", icon: MapPin },
    { id: "experiences", name: "Gestione Esperienze", icon: Package },
    { id: "bookings", name: "Prenotazioni", icon: Calendar },
    { id: "users", name: "Utenti", icon: Users },
    { id: "content", name: "Contenuti", icon: FileText },
    { id: "settings", name: "Impostazioni", icon: Settings },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "users":
        return <UsersManagement />;
      case "travels":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestione Viaggi</h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-border text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Gestione viaggi in fase di implementazione...
              </p>
            </div>
          </div>
        );
      case "experiences":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestione Esperienze</h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-border text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Gestione esperienze in fase di implementazione...
              </p>
            </div>
          </div>
        );
      case "bookings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestione Prenotazioni</h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-border text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Gestione prenotazioni in fase di implementazione...
              </p>
            </div>
          </div>
        );
      case "content":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestione Contenuti</h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-border text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                CMS in fase di implementazione...
              </p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Impostazioni</h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-border text-center">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Impostazioni in fase di implementazione...
              </p>
            </div>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Morocco Dreams Admin
              </h1>
              <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300 rounded-full">
                Real Dashboard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
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
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-900 border-r border-border min-h-screen">
          <nav className="p-4 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
}

export default function RealAdminPanel() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <RealAdminPanelContent />
    </ProtectedRoute>
  );
}