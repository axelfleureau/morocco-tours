// Firebase configuration - based on firebase_barebones_javascript integration
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCExNo12riEK2JEIpwj4MZ3AOrOCPLMvXQ",
  authDomain: "maroccotours-228d7.firebaseapp.com",
  projectId: "maroccotours-228d7",
  storageBucket: "maroccotours-228d7.firebasestorage.app",
  messagingSenderId: "869999205295",
  appId: "1:869999205295:web:9e830ce4b58e5ffdaa2d5a",
  measurementId: "G-G6326PNFLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;