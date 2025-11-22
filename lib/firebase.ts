// Firebase configuration - based on firebase_barebones_javascript integration
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Validate required environment variables
const requiredEnvVars = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const missingVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error('[FIREBASE] Missing environment variables:', missingVars.join(', '));
  console.error('[FIREBASE] Please check your .env file and ensure all Firebase variables are set');
  throw new Error(`Missing Firebase environment variables: ${missingVars.join(', ')}`);
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebasestorage.app`,
  messagingSenderId: "869999205295",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-G6326PNFLF"
};

console.log('[FIREBASE] Initializing Firebase...');
console.log('[FIREBASE] Project ID:', firebaseConfig.projectId);

let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('[FIREBASE] ✅ Firebase app initialized successfully');
} catch (error) {
  console.error('[FIREBASE] ❌ Failed to initialize Firebase app:', error);
  throw error;
}

// Initialize Firebase services
let auth, db, storage, googleProvider;

try {
  auth = getAuth(app);
  console.log('[FIREBASE] ✅ Firebase Auth initialized');
} catch (error) {
  console.error('[FIREBASE] ❌ Failed to initialize Auth:', error);
  throw error;
}

try {
  db = getFirestore(app);
  console.log('[FIREBASE] ✅ Firestore initialized');
} catch (error) {
  console.error('[FIREBASE] ❌ Failed to initialize Firestore:', error);
  throw error;
}

try {
  storage = getStorage(app);
  console.log('[FIREBASE] ✅ Storage initialized');
} catch (error) {
  console.error('[FIREBASE] ❌ Failed to initialize Storage:', error);
  throw error;
}

try {
  googleProvider = new GoogleAuthProvider();
  console.log('[FIREBASE] ✅ Google Auth Provider initialized');
} catch (error) {
  console.error('[FIREBASE] ❌ Failed to initialize Google Auth Provider:', error);
  throw error;
}

export { auth, db, storage, googleProvider };
export default app;