import * as admin from 'firebase-admin';
import * as crypto from 'crypto';

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

const privateKey = formatPrivateKey(process.env.FIREBASE_ADMIN_PRIVATE_KEY || '');
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

if (!privateKey || !clientEmail || !projectId) {
  throw new Error('Missing Firebase Admin credentials');
}

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId,
    clientEmail,
    privateKey,
  }),
});

const auth = admin.auth(app);
const db = admin.firestore(app);

function generateSecurePassword(): string {
  const length = 16;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';
  let password = '';
  const randomBytes = crypto.randomBytes(length);
  
  for (let i = 0; i < length; i++) {
    password += charset[randomBytes[i] % charset.length];
  }
  
  return password;
}

async function createDemoAdmin() {
  const email = 'demo-admin@moroccodreams.com';
  const password = generateSecurePassword();
  const displayName = 'Demo Admin';

  try {
    console.log('🔑 Creazione account admin demo...\n');
    
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
      console.log(`✅ Utente ${email} già esiste (UID: ${userRecord.uid})`);
      
      await auth.updateUser(userRecord.uid, {
        password: password,
        displayName: displayName
      });
      console.log('🔄 Password aggiornata\n');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        userRecord = await auth.createUser({
          email,
          password,
          displayName,
          emailVerified: true
        });
        console.log(`✅ Utente creato con successo (UID: ${userRecord.uid})\n`);
      } else {
        throw error;
      }
    }

    const adminData = {
      email,
      displayName,
      role: 'super_admin' as const,
      permissions: [
        'manage_experiences',
        'manage_travels',
        'manage_vehicles',
        'manage_instagram',
        'manage_cities',
        'manage_users',
        'view_analytics'
      ],
      active: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('adminUsers').doc(userRecord.uid).set(adminData, { merge: true });
    console.log('✅ Documento adminUsers creato/aggiornato in Firestore\n');

    console.log('─'.repeat(60));
    console.log('🎉 Account admin demo creato con successo!');
    console.log('─'.repeat(60));
    console.log('\n📧 Credenziali di accesso:');
    console.log(`   Email:    ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   UID:      ${userRecord.uid}`);
    console.log(`   Ruolo:    super_admin`);
    console.log('\n🔗 Accedi a: /admin/login');
    console.log('\n⚠️  IMPORTANTE: Salva queste credenziali in un luogo sicuro!');
    console.log('    La password non sarà mostrata di nuovo.\n');

  } catch (error) {
    console.error('❌ Errore durante creazione account admin:', error);
    throw error;
  }
}

createDemoAdmin()
  .then(() => {
    console.log('\n✅ Script completato con successo');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script fallito:', error);
    process.exit(1);
  });
