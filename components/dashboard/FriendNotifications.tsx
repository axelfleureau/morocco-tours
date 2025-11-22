"use client";

import { useState, useEffect } from 'react';
import { Bell, Loader2, CheckCircle, UserPlus, Heart, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/components/NotificationSystem';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';

interface FriendNotification {
  id: string;
  type: 'friend_request' | 'request_accepted' | 'friend_added_item';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  metadata?: {
    friendName?: string;
    itemTitle?: string;
  };
}

export default function FriendNotifications() {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const [notifications, setNotifications] = useState<FriendNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingAsRead, setMarkingAsRead] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      
      const interval = setInterval(() => {
        fetchNotifications();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [user]);

  const getAuthHeaders = async (): Promise<HeadersInit> => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    
    if (!user) return headers;
    
    try {
      const token = await (user as any).getIdToken();
      headers.set('Authorization', `Bearer ${token}`);
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    
    return headers;
  };

  const fetchNotifications = async () => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/friends/notifications', { headers });
      
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    setMarkingAsRead(notificationId);
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`/api/friends/notifications/${notificationId}/read`, {
        method: 'PATCH',
        headers
      });

      if (!response.ok) {
        throw new Error('Failed to mark as read');
      }

      await fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
      showError(
        'Errore',
        'Impossibile contrassegnare la notifica come letta.'
      );
    } finally {
      setMarkingAsRead(null);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'friend_request':
        return <UserPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'request_accepted':
        return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case 'friend_added_item':
        return <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="bg-card border-2 border-border rounded-2xl p-6 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="bg-card border-2 border-border rounded-2xl p-6 lg:p-8 hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Notifiche Amici
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {unreadCount > 0
              ? `Hai ${unreadCount} ${unreadCount === 1 ? 'notifica non letta' : 'notifiche non lette'}`
              : 'Nessuna notifica non letta'}
          </p>
        </div>
        <div className="relative">
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
            <Bell className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-gray-400 dark:text-gray-600" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Nessuna notifica da mostrare
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all ${
                notification.read
                  ? 'bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700'
                  : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                notification.read
                  ? 'bg-gray-100 dark:bg-gray-800'
                  : 'bg-white dark:bg-gray-900'
              }`}>
                {getNotificationIcon(notification.type)}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                    locale: it
                  })}
                </p>
              </div>

              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  disabled={markingAsRead === notification.id}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
                  title="Segna come letta"
                >
                  {markingAsRead === notification.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
