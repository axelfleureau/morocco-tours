const { PrismaClient } = require("@prisma/client")
const admin = require("firebase-admin")
const fs = require("fs")
const path = require("path")

const prisma = new PrismaClient()

function formatPrivateKey(key) {
  if (!key) return ""
  
  const header = "-----BEGIN PRIVATE KEY-----"
  const footer = "-----END PRIVATE KEY-----"
  
  if (key.startsWith(header) && key.endsWith(footer + "\n")) {
    return key
  }
  
  let cleanKey = key.replace(/\\n/g, "\n")
  
  if (cleanKey.includes(header) && cleanKey.includes(footer)) {
    return cleanKey
  }
  
  cleanKey = cleanKey
    .replace(header, "")
    .replace(footer, "")
    .replace(/\s/g, "")
  
  const formatted = cleanKey.match(/.{1,64}/g)?.join("\n") || cleanKey
  
  return `${header}\n${formatted}\n${footer}`
}

const serviceAccount = {
  type: "service_account",
  project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  private_key: formatPrivateKey(process.env.FIREBASE_ADMIN_PRIVATE_KEY),
  client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const db = admin.firestore()

function parseDate(value) {
  if (!value) return new Date()
  if (value.toDate && typeof value.toDate === 'function') return value.toDate()
  if (typeof value === 'string') return new Date(value)
  return new Date()
}

async function migrateExperiences() {
  console.log("📦 Migrating Experiences...")
  const snapshot = await db.collection("experiences").get()
  let created = 0, updated = 0

  for (const doc of snapshot.docs) {
    const data = doc.data()
    const payload = {
      id: doc.id,
      title: data.title || "Untitled",
      slug: data.slug || doc.id,
      shortDesc: data.shortDesc || null,
      description: data.description || null,
      image: data.image || null,
      category: data.category || "adventure",
      duration: data.duration || null,
      difficulty: data.difficulty || "moderate",
      groupSize: data.groupSize || null,
      itinerary: data.itinerary || null,
      highlights: data.highlights || null,
      included: data.included || null,
      notIncluded: data.notIncluded || null,
      price: data.price ? parseFloat(data.price) : null,
      priceNote: data.priceNote || null,
      published: data.published !== false,
      featured: data.featured === true,
      createdAt: parseDate(data.createdAt),
      updatedAt: parseDate(data.updatedAt)
    }

    try {
      const exists = await prisma.experience.findUnique({ where: { id: doc.id } })
      if (exists) {
        await prisma.experience.update({ where: { id: doc.id }, data: payload })
        updated++
      } else {
        await prisma.experience.create({ data: payload })
        created++
      }
    } catch (err) {
      console.error(`  ❌ Error migrating experience ${doc.id}:`, err.message)
    }
  }

  console.log(`  ✅ Experiences: ${created} created, ${updated} updated\n`)
}

async function migrateTravels() {
  console.log("📦 Migrating Travels...")
  const snapshot = await db.collection("travels").get()
  let created = 0, updated = 0

  for (const doc of snapshot.docs) {
    const data = doc.data()
    const payload = {
      id: doc.id,
      title: data.title || "Untitled",
      slug: data.slug || doc.id,
      description: data.description || null,
      image: data.image || null,
      category: data.category || "tour",
      duration: data.duration || null,
      cities: data.cities || null,
      itinerary: data.itinerary || null,
      highlights: data.highlights || null,
      included: data.included || null,
      notIncluded: data.notIncluded || null,
      price: data.price ? parseFloat(data.price) : null,
      priceNote: data.priceNote || null,
      published: data.published !== false,
      featured: data.featured === true,
      createdAt: parseDate(data.createdAt),
      updatedAt: parseDate(data.updatedAt)
    }

    try {
      const exists = await prisma.travel.findUnique({ where: { id: doc.id } })
      if (exists) {
        await prisma.travel.update({ where: { id: doc.id }, data: payload })
        updated++
      } else {
        await prisma.travel.create({ data: payload })
        created++
      }
    } catch (err) {
      console.error(`  ❌ Error migrating travel ${doc.id}:`, err.message)
    }
  }

  console.log(`  ✅ Travels: ${created} created, ${updated} updated\n`)
}

async function migrateVehicles() {
  console.log("📦 Migrating Vehicles...")
  const snapshot = await db.collection("vehicles").get()
  let created = 0, updated = 0

  for (const doc of snapshot.docs) {
    const data = doc.data()
    const payload = {
      id: doc.id,
      name: data.name || "Unknown Vehicle",
      slug: data.slug || doc.id,
      category: data.category || "economy",
      transmission: data.transmission || "manual",
      fuelType: data.fuelType || "petrol",
      seats: data.seats || 5,
      doors: data.doors || 4,
      luggage: data.luggage || 2,
      image: data.image || null,
      features: data.features || null,
      pricingPeriods: data.pricingPeriods || null,
      published: data.published !== false,
      featured: data.featured === true,
      available: data.available !== false,
      createdAt: parseDate(data.createdAt),
      updatedAt: parseDate(data.updatedAt)
    }

    try {
      const exists = await prisma.vehicle.findUnique({ where: { id: doc.id } })
      if (exists) {
        await prisma.vehicle.update({ where: { id: doc.id }, data: payload })
        updated++
      } else {
        await prisma.vehicle.create({ data: payload })
        created++
      }
    } catch (err) {
      console.error(`  ❌ Error migrating vehicle ${doc.id}:`, err.message)
    }
  }

  console.log(`  ✅ Vehicles: ${created} created, ${updated} updated\n`)
}

async function migrateBlog() {
  console.log("📦 Migrating Blog Posts...")
  const snapshot = await db.collection("blog").get()
  let created = 0, updated = 0

  for (const doc of snapshot.docs) {
    const data = doc.data()
    const payload = {
      id: doc.id,
      title: data.title || "Untitled",
      slug: data.slug || doc.id,
      excerpt: data.excerpt || null,
      coverImage: data.coverImage || null,
      sections: data.sections || null,
      tags: data.tags || null,
      author: data.author || null,
      readTime: data.readTime || null,
      published: data.published !== false,
      featured: data.featured === true,
      publishedAt: data.publishedAt ? parseDate(data.publishedAt) : null,
      createdAt: parseDate(data.createdAt),
      updatedAt: parseDate(data.updatedAt)
    }

    try {
      const exists = await prisma.blogPost.findUnique({ where: { id: doc.id } })
      if (exists) {
        await prisma.blogPost.update({ where: { id: doc.id }, data: payload })
        updated++
      } else {
        await prisma.blogPost.create({ data: payload })
        created++
      }
    } catch (err) {
      console.error(`  ❌ Error migrating blog post ${doc.id}:`, err.message)
    }
  }

  console.log(`  ✅ Blog Posts: ${created} created, ${updated} updated\n`)
}

async function migrateCities() {
  console.log("📦 Migrating Cities...")
  const snapshot = await db.collection("cities").get()
  let created = 0, updated = 0

  for (const doc of snapshot.docs) {
    const data = doc.data()
    const payload = {
      id: doc.id,
      name: data.name || "Unknown City",
      slug: data.slug || doc.id,
      type: data.type || "imperial",
      region: data.region || null,
      description: data.description || null,
      image: data.image || null,
      history: data.history || null,
      attractions: data.attractions || null,
      tourPrice: data.tourPrice ? parseFloat(data.tourPrice) : null,
      tourDuration: data.tourDuration || null,
      coordinates: data.coordinates || null,
      published: data.published !== false,
      featured: data.featured === true,
      createdAt: parseDate(data.createdAt),
      updatedAt: parseDate(data.updatedAt)
    }

    try {
      const exists = await prisma.city.findUnique({ where: { id: doc.id } })
      if (exists) {
        await prisma.city.update({ where: { id: doc.id }, data: payload })
        updated++
      } else {
        await prisma.city.create({ data: payload })
        created++
      }
    } catch (err) {
      console.error(`  ❌ Error migrating city ${doc.id}:`, err.message)
    }
  }

  console.log(`  ✅ Cities: ${created} created, ${updated} updated\n`)
}

async function migrateServices() {
  console.log("📦 Migrating Services...")
  const snapshot = await db.collection("services").get()
  let created = 0, updated = 0

  for (const doc of snapshot.docs) {
    const data = doc.data()
    const payload = {
      id: doc.id,
      name: data.name || "Unknown Service",
      slug: data.slug || doc.id,
      category: data.category || "transport",
      description: data.description || null,
      icon: data.icon || null,
      features: data.features || null,
      pricing: data.pricing || null,
      published: data.published !== false,
      featured: data.featured === true,
      createdAt: parseDate(data.createdAt),
      updatedAt: parseDate(data.updatedAt)
    }

    try {
      const exists = await prisma.service.findUnique({ where: { id: doc.id } })
      if (exists) {
        await prisma.service.update({ where: { id: doc.id }, data: payload })
        updated++
      } else {
        await prisma.service.create({ data: payload })
        created++
      }
    } catch (err) {
      console.error(`  ❌ Error migrating service ${doc.id}:`, err.message)
    }
  }

  console.log(`  ✅ Services: ${created} created, ${updated} updated\n`)
}

async function migrateInstagram() {
  console.log("📦 Migrating Instagram Videos...")
  const snapshot = await db.collection("instagram_videos").get()
  let created = 0, updated = 0

  for (const doc of snapshot.docs) {
    const data = doc.data()
    const payload = {
      id: doc.id,
      slot: data.slot || 1,
      videoUrl: data.videoUrl || "",
      active: data.active !== false,
      createdAt: parseDate(data.createdAt),
      updatedAt: parseDate(data.updatedAt)
    }

    try {
      const exists = await prisma.instagramVideo.findUnique({ where: { slot: payload.slot } })
      if (exists) {
        await prisma.instagramVideo.update({ where: { slot: payload.slot }, data: payload })
        updated++
      } else {
        await prisma.instagramVideo.create({ data: payload })
        created++
      }
    } catch (err) {
      console.error(`  ❌ Error migrating Instagram video ${doc.id}:`, err.message)
    }
  }

  console.log(`  ✅ Instagram Videos: ${created} created, ${updated} updated\n`)
}

async function migrateSiteSettings() {
  console.log("📦 Migrating Site Settings...")
  
  try {
    const doc = await db.collection("site_settings").doc("site_settings").get()
    
    if (!doc.exists) {
      console.log("  ⚠️  No site settings found in Firestore\n")
      return
    }

    const data = doc.data()
    const payload = {
      id: "site_settings",
      hero: data.hero || {},
      contact: data.contact || {},
      social: data.social || {},
      footer: data.footer || {},
      seo: data.seo || {},
      theme: data.theme || {},
      updatedAt: parseDate(data.updatedAt),
      updatedBy: data.updatedBy || null
    }

    await prisma.siteSettings.upsert({
      where: { id: "site_settings" },
      update: payload,
      create: payload
    })

    console.log("  ✅ Site Settings migrated\n")
  } catch (err) {
    console.error("  ❌ Error migrating site settings:", err.message, "\n")
  }
}

async function main() {
  console.log("\n🚀 Starting migration from Firestore to Postgres...\n")

  try {
    await migrateExperiences()
    await migrateTravels()
    await migrateVehicles()
    await migrateBlog()
    await migrateCities()
    await migrateServices()
    await migrateInstagram()
    await migrateSiteSettings()

    console.log("✨ Migration completed successfully!\n")
  } catch (error) {
    console.error("❌ Migration failed:", error)
    process.exit(1)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
