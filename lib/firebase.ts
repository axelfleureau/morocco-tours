import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { getStorage, connectStorageEmulator } from "firebase/storage"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyAkqnD8fBg6zhLtsxS90dQS3Bdcri1RKHE",
  authDomain: "morocco-tours-6ab0d.firebaseapp.com",
  projectId: "morocco-tours-6ab0d",
  storageBucket: "morocco-tours-6ab0d.firebasestorage.app",
  messagingSenderId: "121465422041",
  appId: "1:121465422041:web:e1b232cb0515f99dd0bec8",
  measurementId: "G-T7LC91SBRE"
}

// Initialize Firebase app only once
let app
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApp()
}

// Initialize services
let auth
let db
let storage
let analytics

if (typeof window !== 'undefined') {
  // Client-side initialization
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
  analytics = getAnalytics(app)
} else {
  // Server-side - create minimal instances
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
  analytics = null
}

export { auth, db, storage, analytics }
export default app
