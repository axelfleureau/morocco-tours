"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Home, Calendar, Heart, User, LogOut, Menu, X, Users, Share2 } from 'lucide-react';
import UserOverview from '@/components/dashboard/UserOverview';
import UserBookings from '@/components/dashboard/UserBookings';
import UserWishlist from '@/components/dashboard/UserWishlist';
import UserProfile from '@/components/dashboard/UserProfile';
import { NotificationCenter } from '@/components/NotificationSystem';
import FriendCodeCard from '@/components/dashboard/FriendCodeCard';
import AddFriendForm from '@/components/dashboard/AddFriendForm';
import FriendRequests from '@/components/dashboard/FriendRequests';
import FriendsList from '@/components/dashboard/FriendsList';
import SharedCollections from '@/components/dashboard/SharedCollections';
import FriendNotifications from '@/components/dashboard/FriendNotifications';

function UserDashboardContent() {
  const { user, userProfile, signOut, isAdmin } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect admin users to the unified /admin dashboard
  useEffect(() => {
    if (isAdmin) {
      router.replace('/admin');
    }
  }, [isAdmin, router]);

  // Read tab from URL query params on mount
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const navigation = [
    { id: "overview", name: "Panoramica", icon: Home },
    { id: "wishlist", name: "Lista Desideri", icon: Heart },
    { id: "friends", name: "Amici", icon: Users },
    { id: "shared", name: "Condivisioni", icon: Share2 },
    { id: "bookings", name: "Le Mie Prenotazioni", icon: Calendar },
    { id: "profile", name: "Il Mio Profilo", icon: User },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleViewWishlist = (friendId: string, friendName: string) => {
    setActiveTab("shared");
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "overview":
        return <UserOverview />;
      case "wishlist":
        return <UserWishlist />;
      case "friends":
        return (
          <div className="space-y-8">
            <FriendCodeCard />
            <AddFriendForm />
            <FriendRequests />
            <FriendsList onViewWishlist={handleViewWishlist} />
          </div>
        );
      case "shared":
        return <SharedCollections />;
      case "bookings":
        return <UserBookings />;
      case "profile":
        return <UserProfile />;
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
                className="p-2 hover:bg-accent/10 rounded-lg"
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