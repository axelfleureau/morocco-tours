'use client';

import { useAuth } from '@/context/AuthContext';

interface RoleBasedAccessProps {
  children: React.ReactNode;
  allowedRoles: ('user' | 'admin')[];
  fallback?: React.ReactNode;
}

export default function RoleBasedAccess({ 
  children, 
  allowedRoles, 
  fallback = null 
}: RoleBasedAccessProps) {
  const { user, userProfile, loading } = useAuth();

  // Don't render anything while loading
  if (loading) {
    return null;
  }

  // Not authenticated
  if (!user || !userProfile) {
    return fallback;
  }

  // Check if user has allowed role
  const userRole = userProfile.role as 'user' | 'admin';
  const hasAccess = allowedRoles.includes(userRole);

  return hasAccess ? <>{children}</> : fallback;
}