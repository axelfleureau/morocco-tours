import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp
} from 'firebase/firestore'
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage'

// Dynamic imports to ensure client-side execution
const getFirebaseServices = async () => {
  const { db, storage } = await import('./firebase')
  return { db, storage }
}

// City Operations
export const addCity = async (cityData: any) => {
  try {
    const { db } = await getFirebaseServices()
    const docRef = await addDoc(collection(db, 'cities'), {
      ...cityData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding city:', error)
    throw error
  }
}

export const updateCity = async (id: string, cityData: any) => {
  try {
    const { db } = await getFirebaseServices()
    const cityRef = doc(db, 'cities', id)
    await updateDoc(cityRef, {
      ...cityData,
      updatedAt: serverTimestamp()
    })
  } catch (error) {
    console.error('Error updating city:', error)
    throw error
  }
}

export const deleteCity = async (id: string) => {
  try {
    const { db } = await getFirebaseServices()
    await deleteDoc(doc(db, 'cities', id))
  } catch (error) {
    console.error('Error deleting city:', error)
    throw error
  }
}

export const getCities = async () => {
  try {
    const { db } = await getFirebaseServices()
    const q = query(collection(db, 'cities'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error getting cities:', error)
    throw error
  }
}

export const getCity = async (id: string) => {
  try {
    const { db } = await getFirebaseServices()
    const docRef = doc(db, 'cities', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    }
    return null
  } catch (error) {
    console.error('Error getting city:', error)
    throw error
  }
}

// Tour Operations
export const addTour = async (tourData: any) => {
  try {
    const { db } = await getFirebaseServices()
    const docRef = await addDoc(collection(db, 'tours'), {
      ...tourData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding tour:', error)
    throw error
  }
}

export const updateTour = async (id: string, tourData: any) => {
  try {
    const { db } = await getFirebaseServices()
    const tourRef = doc(db, 'tours', id)
    await updateDoc(tourRef, {
      ...tourData,
      updatedAt: serverTimestamp()
    })
  } catch (error) {
    console.error('Error updating tour:', error)
    throw error
  }
}

export const deleteTour = async (id: string) => {
  try {
    const { db } = await getFirebaseServices()
    await deleteDoc(doc(db, 'tours', id))
  } catch (error) {
    console.error('Error deleting tour:', error)
    throw error
  }
}

export const getTours = async () => {
  try {
    const { db } = await getFirebaseServices()
    const q = query(collection(db, 'tours'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error getting tours:', error)
    throw error
  }
}

export const getTour = async (id: string) => {
  try {
    const { db } = await getFirebaseServices()
    const docRef = doc(db, 'tours', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    }
    return null
  } catch (error) {
    console.error('Error getting tour:', error)
    throw error
  }
}

// Photo Operations
export const uploadImage = async (file: File, path: string) => {
  try {
    const { storage } = await getFirebaseServices()
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    return downloadURL
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export const deleteImage = async (path: string) => {
  try {
    const { storage } = await getFirebaseServices()
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
  } catch (error) {
    console.error('Error deleting image:', error)
    throw error
  }
}

export const addPhoto = async (photoData: any) => {
  try {
    const { db } = await getFirebaseServices()
    const docRef = await addDoc(collection(db, 'photos'), {
      ...photoData,
      uploadedAt: serverTimestamp()
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding photo:', error)
    throw error
  }
}

export const getPhotos = async () => {
  try {
    const { db } = await getFirebaseServices()
    const q = query(collection(db, 'photos'), orderBy('uploadedAt', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error getting photos:', error)
    throw error
  }
}

export const deletePhoto = async (id: string) => {
  try {
    const { db } = await getFirebaseServices()
    await deleteDoc(doc(db, 'photos', id))
  } catch (error) {
    console.error('Error deleting photo:', error)
    throw error
  }
}

// User Operations
export const getUsers = async () => {
  try {
    const { db } = await getFirebaseServices()
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error getting users:', error)
    throw error
  }
}

export const addUser = async (userData: any) => {
  try {
    const { db } = await getFirebaseServices()
    const docRef = await addDoc(collection(db, 'users'), {
      ...userData,
      createdAt: serverTimestamp()
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding user:', error)
    throw error
  }
}

export const updateUser = async (id: string, userData: any) => {
  try {
    const { db } = await getFirebaseServices()
    const userRef = doc(db, 'users', id)
    await updateDoc(userRef, userData)
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

export const deleteUser = async (id: string) => {
  try {
    const { db } = await getFirebaseServices()
    await deleteDoc(doc(db, 'users', id))
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}
