"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange, getUserProfile, handleRedirectResult, signIn as authSignIn, signUp as authSignUp, signOutUser, signInWithGoogle as authSignInWithGoogle } from '@/lib/auth';
import { UserProfile } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  adminRole: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signInWithGoogle: () => Promise<User | null>;
  signOut: () => Promise<void>;
  testGetIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  isAdmin: false,
  adminRole: null,
  signIn: async () => {},
  signUp: async () => {},
  signInWithGoogle: async () => null,
  signOut: async () => {},
  testGetIdToken: async () => null,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminRole, setAdminRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check admin status from Postgres via API
  const checkAdminStatus = async (user: User): Promise<{ isAdmin: boolean; role: string | null }> => {
    try {
      console.log('[AUTH] Checking admin status for user:', user.uid);
      
      // Get Firebase ID token
      const token = await user.getIdToken();
      
      if (!token) {
        console.warn('[AUTH] No ID token available');
        return { isAdmin: false, role: null };
      }
      
      console.log('[AUTH] Got ID token (first 20 chars):', token.substring(0, 20) + '...');
      
      // Call API to check admin status
      const response = await fetch('/api/auth/check-admin', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        console.error('[AUTH] API error:', response.status, response.statusText);
        return { isAdmin: false, role: null };
      }
      
      const data = await response.json();
      console.log('[AUTH] Admin check response:', data);
      
      return {
        isAdmin: data.isAdmin || false,
        role: data.role || null
      };
    } catch (error) {
      console.error('[AUTH] Error checking admin status:', error);
      return { isAdmin: false, role: null };
    }
  };

  useEffect(() => {
    console.log('[AUTH] Initializing AuthProvider...');
    
    // Handle redirect result on page load
    handleRedirectResult().catch(console.error);

    // Listen for auth state changes
    const unsubscribe = onAuthStateChange(async (user) => {
      console.log('[AUTH] Auth state changed:', user ? `User: ${user.email} (${user.uid})` : 'No user');
      setUser(user);
      
      if (user) {
        try {
          console.log('[AUTH] Loading user profile and checking admin status...');
          
          const [profile, adminStatus] = await Promise.all([
            getUserProfile(user.uid),
            checkAdminStatus(user)
          ]);
          
          setUserProfile(profile);
          setIsAdmin(adminStatus.isAdmin);
          setAdminRole(adminStatus.role);
          
          console.log('[AUTH] User profile loaded. isAdmin:', adminStatus.isAdmin, 'role:', adminStatus.role);
        } catch (error) {
          console.error('[AUTH] Error loading user profile:', error);
          setIsAdmin(false);
          setAdminRole(null);
        }
      } else {
        console.log('[AUTH] User logged out, clearing state');
        setUserProfile(null);
        setIsAdmin(false);
        setAdminRole(null);
      }
      
      setLoading(false);
      console.log('[AUTH] Auth state update complete');
    });

    return unsubscribe;
  }, []);

  // Auth functions
  const signIn = async (email: string, password: string) => {
    await authSignIn(email, password);
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    await authSignUp(email, password, displayName);
  };

  const signInWithGoogle = async () => {
    return await authSignInWithGoogle();
  };

  const signOut = async () => {
    await signOutUser();
  };

  // Test ID token retrieval
  const testGetIdToken = async (): Promise<string | null> => {
    try {
      if (!user) {
        console.log('[AUTH TEST] No user logged in');
        return null;
      }
      
      console.log('[AUTH TEST] Testing getIdToken for user:', user.uid);
      const token = await user.getIdToken();
      
      if (token) {
        console.log('[AUTH TEST] Token retrieved successfully');
        console.log('[AUTH TEST] Token (first 20 chars):', token.substring(0, 20) + '...');
        console.log('[AUTH TEST] Token length:', token.length);
        return token;
      } else {
        console.warn('[AUTH TEST] Token is null or undefined');
        return null;
      }
    } catch (error) {
      console.error('[AUTH TEST] Error getting ID token:', error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userProfile, 
      loading, 
      isAdmin,
      adminRole,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
      testGetIdToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};