import { db } from '../lib/firebase'
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore'

interface InstagramVideoData {
  slot: number
  url: string
  embedUrl: string
  active: boolean
  order: number
}

const instagramVideos: InstagramVideoData[] = [
  {
    slot: 1,
    url: 'https://www.instagram.com/reel/DPhC4GrjcxQ/',
    embedUrl: 'https://www.instagram.com/reel/DPhC4GrjcxQ/embed',
    active: true,
    order: 1
  },
  {
    slot: 2,
    url: 'https://www.instagram.com/reel/DQuSWaHjZpi/',
    embedUrl: 'https://www.instagram.com/reel/DQuSWaHjZpi/embed',
    active: true,
    order: 2
  },
  {
    slot: 3,
    url: 'https://www.instagram.com/reel/DNEMbjKtgY2/',
    embedUrl: 'https://www.instagram.com/reel/DNEMbjKtgY2/embed',
    active: true,
    order: 3
  }
]

async function populateInstagramVideos() {
  console.log('🎬 Starting Instagram videos population...')
  
  const instagramRef = collection(db, 'instagram_videos')
  
  for (const video of instagramVideos) {
    const videoId = `slot-${video.slot}`
    const videoRef = doc(instagramRef, videoId)
    
    const videoData = {
      ...video,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    }
    
    await setDoc(videoRef, videoData, { merge: true })
    console.log(`✅ Saved video slot ${video.slot}: ${video.url}`)
  }
  
  console.log('\n🎉 All Instagram videos populated successfully!')
  console.log('\nVideos:')
  instagramVideos.forEach(v => {
    console.log(`  Slot ${v.slot}: ${v.url}`)
  })
}

populateInstagramVideos()
  .then(() => {
    console.log('\n✨ Script completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Error populating Instagram videos:', error)
    process.exit(1)
  })
