import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const experiences = await db.experience.findMany({
      where: { published: true },
      orderBy: { updatedAt: "desc" }
    })
    return Response.json(experiences, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return Response.json({ error: "Failed to fetch experiences" }, { status: 500 })
  }
}

function isAuthorized(req: NextRequest) {
  const auth = req.headers.get("authorization") || ""
  const token = auth.replace("Bearer ", "").trim()
  return process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
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

    const experience = await db.experience.create({
      data: {
        title,
        slug,
        shortDesc,
        description,
        image,
        category,
        duration,
        difficulty,
        groupSize,
        itinerary,
        highlights,
        included,
        notIncluded,
        price,
        priceNote,
        published,
        featured
      }
    })

    revalidateTag("experiences")
    return Response.json(experience, { status: 201 })
  } catch (error) {
    console.error("Error creating experience:", error)
    return Response.json({ error: "Failed to create experience" }, { status: 500 })
  }
}
