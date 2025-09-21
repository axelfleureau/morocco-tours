// Authentication utilities - based on firebase_barebones_javascript integration
import { 
  signInWithRedirect, 
  signInWithPopup, 
  signOut,
  getRedirectResult,
  GoogleAuthProvider,
  User,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from './firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'admin' | 'editor';
  createdAt: Date;
  preferences: {
    newsletter: boolean;
    notifications: boolean;
    language: string;
  };
  profile: {
    phone?: string;
    birthDate?: string;
    nationality?: string;
    travelPreferences: string[];
    wishlist: string[];
  };
}

// Sign in with Google (popup for desktop, redirect for mobile)
export const signInWithGoogle = async () => {
  try {
    // Use popup for better UX on desktop
    const result = await signInWithPopup(auth, googleProvider);
    await createUserProfile(result.user);
    return result.user;
  } catch (error: any) {
    if (error.code === 'auth/popup-blocked') {
      // Fallback to redirect for mobile or when popup is blocked
      await signInWithRedirect(auth, googleProvider);
    }
    throw error;
  }
};

// Handle redirect result after sign-in
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      await createUserProfile(result.user);
      return result.user;
    }
  } catch (error) {
    console.error('Error handling redirect result:', error);
    throw error;
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Create or update user profile in Firestore
export const createUserProfile = async (user: User) => {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      role: 'user',
      createdAt: new Date(),
      preferences: {
        newsletter: false,
        notifications: true,
        language: 'it'
      },
      profile: {
        travelPreferences: [],
        wishlist: []
      }
    };

    try {
      await setDoc(userRef, userProfile);
      console.log('User profile created successfully');
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  }
};

// Get user profile from Firestore
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

// Auth state listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};