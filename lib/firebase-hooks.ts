import { useState, useEffect } from 'react'
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  DocumentData,
  QueryConstraint 
} from 'firebase/firestore'
import { db } from './firebase'

// Hook per dati real-time
export function useFirestoreCollection<T = DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = []
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const q = query(collection(db, collectionName), ...constraints)
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: T[] = []
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as T)
        })
        setData(items)
        setLoading(false)
        setError(null)
      },
      (err) => {
        console.error(`Error fetching ${collectionName}:`, err)
        setError(err.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [collectionName, JSON.stringify(constraints)])

  return { data, loading, error }
}

// Hook specifico per città visibili
export function useVisibleCities() {
  return useFirestoreCollection('cities', [
    where('visible', '==', true),
    orderBy('name')
  ])
}

// Hook specifico per pacchetti attivi
export function useActivePackages() {
  return useFirestoreCollection('packages', [
    where('visible', '==', true),
    orderBy('price')
  ])
}

// Hook per sezioni homepage
export function useHomepageSections() {
  return useFirestoreCollection('sections', [
    orderBy('name')
  ])
}

// Hook per statistiche admin
export function useAdminStats() {
  const { data: cities } = useFirestoreCollection('cities')
  const { data: packages } = useFirestoreCollection('packages')
  const { data: users } = useFirestoreCollection('users')
  const { data: sections } = useFirestoreCollection('sections')

  return {
    totalCities: cities.length,
    visibleCities: cities.filter(c => c.visible).length,
    totalPackages: packages.length,
    activePackages: packages.filter(p => p.visible).length,
    totalUsers: users.length,
    activeSections: sections.filter(s => s.visible).length,
    cities,
    packages,
    users,
    sections
  }
}
