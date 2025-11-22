import * as admin from 'firebase-admin';
import * as crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

async function seedAdminUser() {
  const email = 'admin@moroccodreams.com';
  const password = generateSecurePassword();
  const displayName = 'Morocco Dreams Admin';

  try {
    console.log('🔑 Creating admin account in Firebase and Postgres...\n');
    
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
      console.log(`✅ Firebase user ${email} already exists (UID: ${userRecord.uid})`);
      
      await auth.updateUser(userRecord.uid, {
        password: password,
        displayName: displayName
      });
      console.log('🔄 Password updated in Firebase\n');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        userRecord = await auth.createUser({
          email,
          password,
          displayName,
          emailVerified: true
        });
        console.log(`✅ Firebase user created successfully (UID: ${userRecord.uid})\n`);
      } else {
        throw error;
      }
    }

    // Create or update admin user in Postgres
    console.log('💾 Saving admin user to Postgres...');
    
    const adminUser = await prisma.adminUser.upsert({
      where: { uid: userRecord.uid },
      update: {
        email,
        role: 'super_admin',
        active: true,
        updatedAt: new Date()
      },
      create: {
        uid: userRecord.uid,
        email,
        role: 'super_admin',
        active: true
      }
    });
    
    console.log('✅ AdminUser record created/updated in Postgres\n');
    console.log('AdminUser details:', {
      id: adminUser.id,
      uid: adminUser.uid,
      email: adminUser.email,
      role: adminUser.role,
      active: adminUser.active
    });

    console.log('\n' + '─'.repeat(60));
    console.log('🎉 Admin account created successfully!');
    console.log('─'.repeat(60));
    console.log('\n📧 Login Credentials:');
    console.log(`   Email:    ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   UID:      ${userRecord.uid}`);
    console.log(`   Role:     super_admin`);
    console.log('\n🔗 Login at: /admin/login');
    console.log('\n⚠️  IMPORTANT: Save these credentials in a secure location!');
    console.log('    The password will not be shown again.\n');

  } catch (error) {
    console.error('❌ Error creating admin account:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedAdminUser()
  .then(() => {
    console.log('\n✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
