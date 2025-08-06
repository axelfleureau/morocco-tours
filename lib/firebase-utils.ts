import { 
  doc, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  collection,
  serverTimestamp,
  increment 
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from './firebase'

// Utility per upload immagini ottimizzato
export async function uploadImageOptimized(
  file: File, 
  path: string,
  maxWidth: number = 1200,
  quality: number = 0.8
): Promise<string> {
  try {
    // Comprimi immagine se necessario
    const compressedFile = await compressImage(file, maxWidth, quality)
    
    // Upload su Firebase Storage
    const storageRef = ref(storage, `${path}/${Date.now()}_${compressedFile.name}`)
    const snapshot = await uploadBytes(storageRef, compressedFile)
    
    // Ottieni URL download
    const downloadURL = await getDownloadURL(snapshot.ref)
    
    return downloadURL
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

// Comprimi immagine
async function compressImage(
  file: File, 
  maxWidth: number, 
  quality: number
): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const img = new Image()
    
    img.onload = () => {
      // Calcola nuove dimensioni mantenendo aspect ratio
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
      canvas.width = img.width * ratio
      canvas.height = img.height * ratio
      
      // Disegna immagine compressa
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      
      // Converti in blob
      canvas.toBlob(
        (blob) => {
          const compressedFile = new File([blob!], file.name, {
            type: file.type,
            lastModified: Date.now()
          })
          resolve(compressedFile)
        },
        file.type,
        quality
      )
    }
    
    img.src = URL.createObjectURL(file)
  })
}

// Elimina immagine da Storage
export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    const imageRef = ref(storage, imageUrl)
    await deleteObject(imageRef)
  } catch (error) {
    console.error('Error deleting image:', error)
    // Non lanciare errore se l'immagine non esiste
  }
}

// Utility per aggiornare città
export async function updateCity(cityId: string, data: any) {
  try {
    await updateDoc(doc(db, 'cities', cityId), {
      ...data,
      updatedAt: serverTimestamp()
    })
  } catch (error) {
    console.error('Error updating city:', error)
    throw error
  }
}

// Utility per eliminare città
export async function deleteCity(cityId: string) {
  try {
    await deleteDoc(doc(db, 'cities', cityId))
  } catch (error) {
    console.error('Error deleting city:', error)
    throw error
  }
}

// Utility per creare pacchetto
export async function createPackage(packageData: any) {
  try {
    const docRef = await addDoc(collection(db, 'packages'), {
      ...packageData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating package:', error)
    throw error
  }
}

// Utility per tracking utenti
export async function trackUserActivity(userId: string, activity: string) {
  try {
    await updateDoc(doc(db, 'users', userId), {
      lastActivity: serverTimestamp(),
      [`activities.${activity}`]: increment(1)
    })
  } catch (error) {
    console.error('Error tracking user activity:', error)
  }
}

// Utility per analytics
export async function logEvent(eventName: string, parameters: any = {}) {
  try {
    // Salva evento in Firestore per analytics personalizzati
    await addDoc(collection(db, 'analytics'), {
      event: eventName,
      parameters,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      url: window.location.href
    })
  } catch (error) {
    console.error('Error logging event:', error)
  }
}

// Utility per backup dati
export async function backupData() {
  try {
    const collections = ['cities', 'packages', 'sections', 'users']
    const backup: any = {}
    
    for (const collectionName of collections) {
      // Implementa backup logic qui
      backup[collectionName] = []
    }
    
    // Salva backup
    await addDoc(collection(db, 'backups'), {
      data: backup,
      timestamp: serverTimestamp()
    })
    
    return backup
  } catch (error) {
    console.error('Error creating backup:', error)
    throw error
  }
}
