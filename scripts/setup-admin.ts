import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Format private key from environment variable
function formatPrivateKey(key: string | undefined): string {
  if (!key) {
    throw new Error('FIREBASE_ADMIN_PRIVATE_KEY is not set');
  }

  const header = '-----BEGIN PRIVATE KEY-----';
  const footer = '-----END PRIVATE KEY-----';
  
  if (key.startsWith(header) && key.endsWith(footer + '\n')) {
    return key;
  }
  
  let cleanKey = key.replace(/\\n/g, '\n');
  
  if (cleanKey.includes(header) && cleanKey.includes(footer)) {
    return cleanKey;
  }
  
  cleanKey = cleanKey
    .replace(header, '')
    .replace(footer, '')
    .replace(/\s/g, '');
  
  const formatted = cleanKey.match(/.{1,64}/g)?.join('\n') || cleanKey;
  
  return `${header}\n${formatted}\n${footer}`;
}

// Initialize Firebase Admin
function initializeFirebaseAdmin() {
  if (getApps().length === 0) {
    const privateKey = formatPrivateKey(process.env.FIREBASE_ADMIN_PRIVATE_KEY);
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

    if (!privateKey || !clientEmail || !projectId) {
      throw new Error('Missing Firebase Admin credentials');
    }

    const adminConfig = {
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    };
    
    return initializeApp(adminConfig, 'admin-setup');
  }
  
  return getApps()[0];
}

async function createAdminUser() {
  console.log('🔧 Firebase Admin Setup Script\n');
  
  try {
    // Initialize Firebase Admin
    const app = initializeFirebaseAdmin();
    const auth = getAuth(app);
    const db = getFirestore(app);
    
    const adminEmail = 'demo-admin@moroccodreams.com';
    const adminPassword = 'Nbc*%iBvjoA)mFvn';
    
    console.log('📧 Creating admin user...');
    
    // Check if user already exists
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(adminEmail);
      console.log('⚠️  User already exists. Updating...');
      
      // Update password
      await auth.updateUser(userRecord.uid, {
        password: adminPassword,
        emailVerified: true
      });
      
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        // Create new user
        userRecord = await auth.createUser({
          email: adminEmail,
          password: adminPassword,
          emailVerified: true,
          displayName: 'Demo Admin'
        });
        console.log('✅ User created successfully!');
      } else {
        throw error;
      }
    }
    
    // Set admin custom claims
    console.log('🔑 Setting admin privileges...');
    await auth.setCustomUserClaims(userRecord.uid, { isAdmin: true });
    
    // Save to Firestore adminUsers collection
    console.log('💾 Saving to Firestore...');
    await db.collection('adminUsers').doc(userRecord.uid).set({
      email: adminEmail,
      isAdmin: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, { merge: true });
    
    console.log('\n✅ ADMIN USER CREATED SUCCESSFULLY!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 LOGIN CREDENTIALS (save these securely):');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Email:    ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🌐 Login at: /admin/login');
    console.log('🔒 Change password at: /admin/profile\n');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();
