// Firestore Security Rules Generator API
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-admin'

// Generate comprehensive Firestore security rules
function generateSecurityRules() {
  return `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // === USER MANAGEMENT ===
    // Users collection: self-read and admin-write only
    match /users/{userId} {
      allow read: if request.auth != null && 
        (request.auth.uid == userId || hasAdminRole());
      allow write: if hasAdminRole();
    }
    
    // === PUBLIC CONTENT COLLECTIONS ===
    // Cities - public read if published, admin write
    match /cities/{cityId} {
      allow read: if resource.data.published == true || hasAdminRole();
      allow write: if hasAdminRole();
    }
    
    // Experiences - public read if published, admin write  
    match /experiences/{experienceId} {
      allow read: if resource.data.published == true || hasAdminRole();
      allow write: if hasAdminRole();
    }
    
    // Travels (packages) - public read if published, admin write
    match /travels/{travelId} {
      allow read: if resource.data.published == true || hasAdminRole();
      allow write: if hasAdminRole();
    }
    
    // Services - public read if published, admin write
    match /services/{serviceId} {
      allow read: if resource.data.published == true || hasAdminRole();
      allow write: if hasAdminRole();
    }
    
    // Package Components - admin only (internal use)
    match /package_components/{componentId} {
      allow read, write: if hasAdminRole();
    }
    
    // === CONTENT MANAGEMENT ===
    // Blog posts - public read if published, admin write
    match /blog/{postId} {
      allow read: if resource.data.published == true || hasAdminRole();
      allow write: if hasAdminRole();
    }
    
    // CMS Sections - public read if published, admin write
    match /cms_sections/{sectionId} {
      allow read: if resource.data.published == true || hasAdminRole();
      allow write: if hasAdminRole();
    }
    
    // === CONFIGURATION ===
    // Site theme - public read (for styling), admin write
    match /site_theme/{themeId} {
      allow read: if true; // Public for theme loading
      allow write: if hasAdminRole();
    }
    
    // === LEGACY SUPPORT ===
    // Site content (legacy) - public read if visible, admin write
    match /site_content/{contentId} {
      allow read: if resource.data.visible == true || hasAdminRole();
      allow write: if hasAdminRole();
    }
    
    // === ADMIN FUNCTIONS ===
    // Check if user has admin role
    function hasAdminRole() {
      return request.auth != null && 
        (request.auth.token.role == 'admin' || 
         request.auth.token.admin == true);
    }
    
    // Validate required fields for content creation
    function hasRequiredFields(requiredFields) {
      return requiredFields.hasAll(request.resource.data.keys());
    }
    
    // Check if user can edit based on publishing rules
    function canEdit() {
      return hasAdminRole() && 
        request.resource.data.updatedAt is timestamp;
    }
  }
}`.trim()
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const idToken = authHeader?.replace('Bearer ', '')
    
    if (!idToken) {
      return NextResponse.json({ error: 'Token required' }, { status: 401 })
    }
    
    await requireAdmin(idToken)
    
    const rules = generateSecurityRules()
    
    return NextResponse.json({
      rules,
      message: 'Security rules generated successfully'
    })
    
  } catch (error) {
    console.error('Generate security rules error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Error generating security rules' 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const idToken = authHeader?.replace('Bearer ', '')
    
    if (!idToken) {
      return NextResponse.json({ error: 'Token required' }, { status: 401 })
    }
    
    await requireAdmin(idToken)
    
    const rules = generateSecurityRules()
    
    return NextResponse.json({
      success: true,
      rules,
      instructions: [
        "1. Copia le regole di sicurezza generate",
        "2. Vai alla console Firebase -> Firestore Database -> Rules",
        "3. Sostituisci le regole esistenti con quelle generate",
        "4. Clicca 'Pubblica' per applicare le nuove regole",
        "5. Le regole garantiscono: lettura pubblica solo se published=true, scrittura solo per admin"
      ],
      message: 'Security rules ready for deployment'
    })
    
  } catch (error) {
    console.error('Deploy security rules error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Error preparing security rules' 
    }, { status: 500 })
  }
}