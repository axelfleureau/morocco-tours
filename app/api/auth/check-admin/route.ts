import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseToken } from '@/lib/user-auth-server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    console.log('[CHECK-ADMIN] Checking admin status...');
    
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      console.log('[CHECK-ADMIN] No authorization header');
      return NextResponse.json({ isAdmin: false, role: null }, { status: 200 });
    }
    
    const token = authHeader.replace('Bearer ', '');
    
    if (!token) {
      console.log('[CHECK-ADMIN] No token found');
      return NextResponse.json({ isAdmin: false, role: null }, { status: 200 });
    }
    
    console.log('[CHECK-ADMIN] Verifying Firebase token...');
    const auth = await verifyFirebaseToken(token);
    
    if (!auth) {
      console.log('[CHECK-ADMIN] Token verification failed');
      return NextResponse.json({ isAdmin: false, role: null }, { status: 200 });
    }
    
    console.log('[CHECK-ADMIN] Token verified for UID:', auth.uid);
    console.log('[CHECK-ADMIN] Checking Postgres AdminUser table...');
    
    const adminUser = await db.adminUser.findUnique({
      where: { uid: auth.uid }
    });
    
    if (!adminUser) {
      console.log('[CHECK-ADMIN] User not found in AdminUser table');
      return NextResponse.json({ isAdmin: false, role: null }, { status: 200 });
    }
    
    console.log('[CHECK-ADMIN] AdminUser found:', {
      uid: adminUser.uid,
      email: adminUser.email,
      role: adminUser.role,
      active: adminUser.active
    });
    
    const isAdmin = adminUser.active === true;
    
    return NextResponse.json({ 
      isAdmin,
      role: adminUser.role || null,
      email: adminUser.email
    }, { status: 200 });
    
  } catch (error) {
    console.error('[CHECK-ADMIN] Error checking admin status:', error);
    return NextResponse.json({ 
      isAdmin: false, 
      role: null,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
