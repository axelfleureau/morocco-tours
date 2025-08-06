// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAkqnD8fBg6zhLtsxS90dQS3Bdcri1RKHE",
  authDomain: "morocco-tours-6ab0d.firebaseapp.com",
  projectId: "morocco-tours-6ab0d",
  storageBucket: "morocco-tours-6ab0d.firebasestorage.app",
  messagingSenderId: "121465422041",
  appId: "1:121465422041:web:e1b232cb0515f99dd0bec8",
  measurementId: "G-T7LC91SBRE"
};

// Initialize Firebase (solo se non già inizializzato)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics solo lato client
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;