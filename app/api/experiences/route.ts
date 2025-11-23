import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"
import { isAdmin } from "@/lib/auth-helpers"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')

    const where: any = {
      type: 'experience',
      published: true
    }

    if (featured === 'true') {
      where.featured = true
    }

    if (category) {
      where.category = category
    }

    const items = await db.contentItem.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
      skip: offset ? parseInt(offset) : undefined
    })
    
    const experiences = items.map(item => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      shortDesc: item.metadata?.shortDesc,
      description: item.description,
      image: item.image,
      category: item.category || 'adventure',
      duration: item.duration,
      difficulty: item.metadata?.difficulty || 'moderate',
      groupSize: item.metadata?.groupSize,
      itinerary: item.metadata?.itinerary,
      highlights: item.metadata?.highlights,
      included: item.metadata?.included,
      notIncluded: item.metadata?.notIncluded,
      price: item.price,
      priceNote: item.priceNote,
      published: item.published,
      featured: item.featured,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }))
    
    return Response.json({ experiences }, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return Response.json({ error: "Failed to fetch experiences" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const isAdminUser = await isAdmin(req.headers.get("authorization"))
  if (!isAdminUser) {
    return Response.json({ error: "Missing or insufficient permissions." }, { status: 403 })
  }

  try {
    const body = await req.json()
    const {
      title,
      slug,
      shortDesc,
      description,
      image,
      category = "adventure",
      duration,
      difficulty = "moderate",
      groupSize,
      itinerary,
      highlights,
      included,
      notIncluded,
      price,
      priceNote,
      published = true,
      featured = false
    } = body

    if (!title || !slug) {
      return Response.json(
        { error: "Title and slug are required" },
        { status: 400 }
      )
    }

    const contentItem = await db.contentItem.create({
      data: {
        type: 'experience',
        title,
        slug,
        description,
        image,
        category,
        duration,
        price,
        priceNote,
        published,
        featured,
        metadata: {
          shortDesc,
          difficulty,
          groupSize,
          itinerary,
          highlights,
          included,
          notIncluded
        }
      }
    })

    const experience = {
      id: contentItem.id,
      title: contentItem.title,
      slug: contentItem.slug,
      shortDesc: contentItem.metadata?.shortDesc,
      description: contentItem.description,
      image: contentItem.image,
      category: contentItem.category,
      duration: contentItem.duration,
      difficulty: contentItem.metadata?.difficulty,
      groupSize: contentItem.metadata?.groupSize,
      itinerary: contentItem.metadata?.itinerary,
      highlights: contentItem.metadata?.highlights,
      included: contentItem.metadata?.included,
      notIncluded: contentItem.metadata?.notIncluded,
      price: contentItem.price,
      priceNote: contentItem.priceNote,
      published: contentItem.published,
      featured: contentItem.featured,
      createdAt: contentItem.createdAt,
      updatedAt: contentItem.updatedAt
    }

    revalidateTag("experiences")
    return Response.json(experience, { status: 201 })
  } catch (error) {
    console.error("Error creating experience:", error)
    return Response.json({ error: "Failed to create experience" }, { status: 500 })
  }
}
