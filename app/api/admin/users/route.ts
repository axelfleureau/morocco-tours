// Admin User Management API
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin, AdminAuthService } from '@/lib/auth-admin'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const idToken = authHeader?.replace('Bearer ', '')
    
    if (!idToken) {
      return NextResponse.json({ error: 'Token required' }, { status: 401 })
    }
    
    // Require admin privileges
    await requireAdmin(idToken)
    
    // Get all users
    const users = await AdminAuthService.listUsers()
    
    return NextResponse.json({ users })
    
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Error fetching users' 
    }, { status: 403 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const idToken = authHeader?.replace('Bearer ', '')
    
    if (!idToken) {
      return NextResponse.json({ error: 'Token required' }, { status: 401 })
    }
    
    // Require admin privileges
    await requireAdmin(idToken)
    
    const { email, password, displayName, isAdmin } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }
    
    // Create user
    const uid = await AdminAuthService.createAdminUser(email, password, displayName)
    
    // Set admin role if requested
    if (isAdmin) {
      await AdminAuthService.setAdminRole(uid, true)
    }
    
    return NextResponse.json({ 
      success: true, 
      uid,
      message: 'User created successfully' 
    })
    
  } catch (error) {
    console.error('Create user error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Error creating user' 
    }, { status: 500 })
  }
}