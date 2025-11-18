import * as admin from 'firebase-admin';

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

const db = admin.firestore(app);

const priceUpdates: Record<string, number> = {
  'surf-taghazout': 35,
  'trekking-atlante': 35,
  'hammam-tradizionale': 50,
  'artigianato-laboratori': 45,
  'fotografia-workshop': 60,
  'quad-cammelli-deserto': 180,
  'cucina-tradizionale': 46,
  'corso-cucina-marocchina': 46
};

async function updateExperiencePrices() {
  try {
    console.log('🔄 Inizio aggiornamento prezzi esperienze...\n');
    
    const experiencesRef = db.collection('experiences');
    const snapshot = await experiencesRef.get();
    
    console.log(`📊 Trovate ${snapshot.docs.length} esperienze in Firestore\n`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const docSnapshot of snapshot.docs) {
      const data = docSnapshot.data();
      const slug = data.slug || docSnapshot.id;
      const currentPrice = data.price;
      
      if (priceUpdates[slug]) {
        const newPrice = priceUpdates[slug];
        
        if (currentPrice !== newPrice) {
          await docSnapshot.ref.update({
            price: newPrice,
            currency: 'EUR',
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          });
          
          console.log(`✅ Aggiornato: ${data.title || slug}`);
          console.log(`   Prezzo: €${currentPrice} → €${newPrice}`);
          console.log(`   Slug: ${slug}\n`);
          updatedCount++;
        } else {
          console.log(`⏭️  Saltato: ${data.title || slug}`);
          console.log(`   Prezzo già corretto: €${currentPrice}`);
          console.log(`   Slug: ${slug}\n`);
          skippedCount++;
        }
      } else {
        console.log(`ℹ️  Nessun update previsto per: ${data.title || slug}`);
        console.log(`   Prezzo attuale: €${currentPrice || 'N/A'}`);
        console.log(`   Slug: ${slug}\n`);
        skippedCount++;
      }
    }
    
    console.log('─'.repeat(50));
    console.log('🎉 Aggiornamento completato!');
    console.log(`📊 Statistiche:`);
    console.log(`   - Esperienze aggiornate: ${updatedCount}`);
    console.log(`   - Esperienze saltate: ${skippedCount}`);
    console.log(`   - Totale esperienze: ${snapshot.docs.length}`);
    
  } catch (error) {
    console.error('❌ Errore durante aggiornamento:', error);
    throw error;
  }
}

updateExperiencePrices()
  .then(() => {
    console.log('\n✅ Script completato con successo');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script fallito:', error);
    process.exit(1);
  });
