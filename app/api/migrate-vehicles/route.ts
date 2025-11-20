import { NextResponse } from 'next/server';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';

export async function POST() {
  try {
    const db = getFirebaseAdminDb();
    const vehiclesRef = db.collection('vehicles');
    const snapshot = await vehiclesRef.get();
    
    if (snapshot.empty) {
      return NextResponse.json({ 
        success: false, 
        message: 'No vehicles found in Firestore' 
      });
    }

    const batch = db.batch();
    let updateCount = 0;

    snapshot.docs.forEach((doc: any) => {
      batch.update(doc.ref, {
        published: true,
        featured: false,
        updatedAt: new Date()
      });
      updateCount++;
    });

    if (updateCount > 0) {
      await batch.commit();
    }

    return NextResponse.json({ 
      success: true, 
      message: `Updated ${updateCount} vehicles with published and featured flags`,
      totalVehicles: snapshot.size
    });

  } catch (error) {
    console.error('Vehicle migration error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
