// lib/firebase-operations.ts
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  where 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "./firebase";

// ===== INTERFACES =====
export interface City {
  id: string
  name: string
  description: string
  lat: number
  lng: number
  attractions: string[]
  bestTime: string
  images: string[]
  visible: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Tour {
  id: string
  name: string
  description: string
  price: number
  duration: string
  cities: string[]
  includes: string[]
  excludes: string[]
  itinerary: string
  images: string[]
  visible: boolean
  category: string
  createdAt: Date
  updatedAt: Date
}

export interface Photo {
  id: string
  url: string
  category: 'city' | 'tour'
  cityId?: string
  tourId?: string
  caption: string
  uploadedAt: Date
}

export interface User {
  id: string
  email: string
  name?: string
  phone?: string
  registrationDate: string
  totalBookings: number
  totalSpent: number
  lastActivity: string
  role?: 'admin' | 'user'
}

// ===== CITIES OPERATIONS =====
export const getCities = async (): Promise<City[]> => {
  try {
    const q = query(collection(db, 'cities'), orderBy('name'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as City[];
  } catch (error) {
    console.error('Error getting cities:', error);
    throw error;
  }
}

export const addCity = async (cityData: Omit<City, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'cities'), {
      ...cityData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding city:', error);
    throw error;
  }
}

export const updateCity = async (cityId: string, updateData: Partial<Omit<City, 'id'>>): Promise<void> => {
  try {
    const cityRef = doc(db, 'cities', cityId);
    await updateDoc(cityRef, {
      ...updateData,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating city:', error);
    throw error;
  }
}

export const deleteCity = async (cityId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'cities', cityId));
  } catch (error) {
    console.error('Error deleting city:', error);
    throw error;
  }
}

// ===== TOURS OPERATIONS =====
export const getTours = async (): Promise<Tour[]> => {
  try {
    const q = query(collection(db, 'tours'), orderBy('name'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Tour[];
  } catch (error) {
    console.error('Error getting tours:', error);
    throw error;
  }
}

export const addTour = async (tourData: Omit<Tour, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'tours'), {
      ...tourData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding tour:', error);
    throw error;
  }
}

export const updateTour = async (tourId: string, updateData: Partial<Omit<Tour, 'id'>>): Promise<void> => {
  try {
    const tourRef = doc(db, 'tours', tourId);
    await updateDoc(tourRef, {
      ...updateData,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating tour:', error);
    throw error;
  }
}

export const deleteTour = async (tourId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'tours', tourId));
  } catch (error) {
    console.error('Error deleting tour:', error);
    throw error;
  }
}

// ===== PHOTOS OPERATIONS =====
export const getPhotos = async (): Promise<Photo[]> => {
  try {
    const q = query(collection(db, 'photos'), orderBy('uploadedAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      uploadedAt: doc.data().uploadedAt?.toDate() || new Date(),
    })) as Photo[];
  } catch (error) {
    console.error('Error getting photos:', error);
    throw error;
  }
}

export const addPhoto = async (photoData: Omit<Photo, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'photos'), {
      ...photoData,
      uploadedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding photo:', error);
    throw error;
  }
}

export const deletePhoto = async (photoId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'photos', photoId));
  } catch (error) {
    console.error('Error deleting photo:', error);
    throw error;
  }
}

// ===== USERS OPERATIONS =====
export const getUsers = async (): Promise<User[]> => {
  try {
    const q = query(collection(db, 'users'), orderBy('registrationDate', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];
  } catch (error) {
    console.error('Error getting users:', error);
    // Ritorna array vuoto se non ci sono utenti invece di lanciare errore
    return [];
  }
}

export const addUser = async (userData: Omit<User, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'users'), userData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
}

// ===== STORAGE OPERATIONS =====
export const uploadImage = async (file: File, path: string): Promise<string> => {
  try {
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export const deleteImage = async (imagePath: string): Promise<void> => {
  try {
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

// ===== UTILITY FUNCTIONS =====
export const createMockData = async () => {
  try {
    // Crea città di esempio
    const mockCities = [
      {
        name: 'Marrakech',
        description: 'La Perla del Sud, città imperiale famosa per la piazza Jemaa el-Fnaa',
        lat: 31.6295,
        lng: -7.9811,
        attractions: ['Jemaa el-Fnaa', 'Medina', 'Giardini Majorelle', 'Palazzo Bahia'],
        bestTime: 'Aprile - Ottobre',
        images: [],
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Casablanca',
        description: 'La capitale economica del Marocco, moderna e cosmopolita',
        lat: 33.5731,
        lng: -7.5898,
        attractions: ['Moschea Hassan II', 'Corniche', 'Medina', 'Quartiere Habous'],
        bestTime: 'Tutto l\'anno',
        images: [],
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fes',
        description: 'L\'antica capitale imperiale, patrimonio UNESCO',
        lat: 34.0181,
        lng: -5.0078,
        attractions: ['Medina di Fes el-Bali', 'Università Al Quaraouiyine', 'Concerie Chouara'],
        bestTime: 'Marzo - Maggio, Settembre - Novembre',
        images: [],
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const cityIds: string[] = [];
    for (const city of mockCities) {
      const cityId = await addCity(city);
      cityIds.push(cityId);
    }

    // Crea tour di esempio
    const mockTours = [
      {
        name: 'Desert Safari 3 Days',
        description: 'Tour indimenticabile nel deserto del Sahara con notte in tenda berbera',
        price: 299,
        duration: '3 giorni / 2 notti',
        cities: [cityIds[0]], // Marrakech
        includes: ['Transport 4x4', 'Guide esperta', 'Pernottamento in tenda', 'Tutti i pasti', 'Escursioni cammelli'],
        excludes: ['Volo', 'Bevande alcoliche', 'Mance', 'Extra personali'],
        itinerary: 'Giorno 1: Marrakech - Valle del Draa - Merzouga\nGiorno 2: Alba nel deserto - Escursioni\nGiorno 3: Merzouga - Ouarzazate - Marrakech',
        images: [],
        visible: true,
        category: 'standard',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Imperial Cities Tour',
        description: 'Tour completo delle quattro città imperiali del Marocco',
        price: 599,
        duration: '7 giorni / 6 notti',
        cities: cityIds, // Tutte le città
        includes: ['Transport privato', 'Guide locali', 'Hotel 4 stelle', 'Colazioni'],
        excludes: ['Voli', 'Pranzi e cene', 'Ingressi monumenti', 'Mance'],
        itinerary: 'Completo tour delle città imperiali: Casablanca, Rabat, Meknes, Fes, Marrakech',
        images: [],
        visible: true,
        category: 'premium',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    for (const tour of mockTours) {
      await addTour(tour);
    }

    console.log('✅ Mock data created successfully!');
    return { cities: cityIds.length, tours: mockTours.length };
  } catch (error) {
    console.error('Error creating mock data:', error);
    throw error;
  }
}