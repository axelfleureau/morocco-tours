import * as admin from 'firebase-admin';

let firebaseAdmin: admin.app.App;

function formatPrivateKey(key: string): string {
  const header = '-----BEGIN PRIVATE KEY-----';
  const footer = '-----END PRIVATE KEY-----';
  
  if (key.includes(header) && key.includes(footer)) {
    return key;
  }
  
  if (key.includes('\\n')) {
    key = key.replace(/\\n/g, '\n');
  }
  
  const cleanKey = key.replace(/\s/g, '').replace(/\\n/g, '');
  
  const formatted = cleanKey.match(/.{1,64}/g)?.join('\n') || cleanKey;
  return `${header}\n${formatted}\n${footer}\n`;
}

export function getFirebaseAdmin() {
  if (!firebaseAdmin) {
    try {
      const privateKey = formatPrivateKey(process.env.FIREBASE_ADMIN_PRIVATE_KEY || '');
      const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
      const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

      if (!privateKey || !clientEmail || !projectId) {
        throw new Error('Missing Firebase Admin credentials in environment variables');
      }

      firebaseAdmin = admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });

      console.log('✅ Firebase Admin SDK initialized successfully');
    } catch (error: any) {
      if (error.code === 'app/duplicate-app') {
        firebaseAdmin = admin.app();
      } else {
        console.error('❌ Firebase Admin initialization error:', error);
        throw error;
      }
    }
  }

  return firebaseAdmin;
}

export function getFirebaseAdminDb() {
  const app = getFirebaseAdmin();
  return admin.firestore(app);
}

export function getFirebaseAdminAuth() {
  const app = getFirebaseAdmin();
  return admin.auth(app);
}
