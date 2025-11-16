// Authentication utilities - based on firebase_barebones_javascript integration
import { 
  signInWithRedirect, 
  signInWithPopup, 
  signOut,
  getRedirectResult,
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from './firebase';

export interface WishlistItem {
  id: string;
  type: 'vehicle' | 'experience' | 'travel' | 'city' | 'activity';
  title: string;
  image?: string;
  price?: number;
  description?: string;
}

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
    wishlistItems?: WishlistItem[];
    cart: Array<{
      id: string;
      type: 'travel' | 'experience';
      title: string;
      price: number;
      quantity: number;
      addedAt: Date;
    }>;
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
    console.error('Google sign-in error:', error);
    if (error.code === 'auth/popup-blocked') {
      try {
        // Fallback to redirect for mobile or when popup is blocked
        await signInWithRedirect(auth, googleProvider);
        return null; // Redirect in progress
      } catch (redirectError: any) {
        console.error('Redirect sign-in error:', redirectError);
        throw new Error('Impossibile accedere con Google. Riprova più tardi.');
      }
    } else if (error.code === 'auth/cancelled-popup-request') {
      throw new Error('Accesso annullato. Riprova se necessario.');
    } else if (error.code === 'auth/network-request-failed') {
      throw new Error('Errore di connessione. Controlla la tua connessione internet.');
    }
    throw new Error('Errore durante l\'accesso con Google. Riprova.');
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

// Send password reset email
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: `${window.location.origin}/auth/login`, // Redirect after reset
      handleCodeInApp: false
    });
    console.log('Password reset email sent successfully');
  } catch (error: any) {
    console.error('Error sending password reset email:', error);
    
    // Handle specific Firebase errors
    if (error.code === 'auth/user-not-found') {
      throw new Error('Nessun account trovato con questa email');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Formato email non valido');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Troppe richieste di reset. Riprova più tardi');
    } else {
      throw new Error('Errore nell\'invio dell\'email di reset. Riprova');
    }
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
        wishlist: [],
        wishlistItems: [],
        cart: []
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

// Sign up with email and password
export const signUp = async (email: string, password: string, displayName?: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update user profile with display name
    if (displayName && result.user) {
      await updateProfile(result.user, {
        displayName: displayName
      });
    }
    
    // Create user profile in Firestore
    await createUserProfile(result.user);
    return result.user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Create admin user
export const createAdminUser = async (email: string, password: string, displayName: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update user profile with display name
    if (result.user) {
      await updateProfile(result.user, {
        displayName: displayName
      });
    }
    
    // Create admin profile in Firestore
    await createAdminProfile(result.user, displayName);
    return result.user;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
};

// Create admin profile in Firestore
export const createAdminProfile = async (user: User, displayName: string) => {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  const adminProfile: UserProfile = {
    uid: user.uid,
    email: user.email || '',
    displayName: displayName,
    photoURL: user.photoURL || '',
    role: 'admin', // Set role as admin
    createdAt: new Date(),
    preferences: {
      newsletter: true,
      notifications: true,
      language: 'it'
    },
    profile: {
      travelPreferences: [],
      wishlist: [],
      cart: []
    }
  };

  try {
    await setDoc(userRef, adminProfile);
    console.log('Admin profile created successfully');
  } catch (error) {
    console.error('Error creating admin profile:', error);
    throw error;
  }
};

// Update user role (admin function)
export const updateUserRole = async (uid: string, role: 'user' | 'admin' | 'editor') => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { role }, { merge: true });
    console.log(`User role updated to ${role}`);
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

// Auth state listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};