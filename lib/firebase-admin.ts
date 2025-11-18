import * as admin from 'firebase-admin';

let firebaseAdmin: admin.app.App;

function formatPrivateKey(key: string): string {
  if (!key) return '';
  
  const header = '-----BEGIN PRIVATE KEY-----';
  const footer = '-----END PRIVATE KEY-----';
  
  // If already properly formatted, return as-is
  if (key.startsWith(header) && key.endsWith(footer + '\n')) {
    return key;
  }
  
  // Replace literal \n strings with actual newlines
  let cleanKey = key.replace(/\\n/g, '\n');
  
  // If already has proper structure, return
  if (cleanKey.includes(header) && cleanKey.includes(footer)) {
    return cleanKey;
  }
  
  // Remove header/footer if present for reconstruction
  cleanKey = cleanKey
    .replace(header, '')
    .replace(footer, '')
    .replace(/\s/g, ''); // Remove all whitespace
  
  // Split into 64-character lines
  const formatted = cleanKey.match(/.{1,64}/g)?.join('\n') || cleanKey;
  
  return `${header}\n${formatted}\n${footer}`;
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
