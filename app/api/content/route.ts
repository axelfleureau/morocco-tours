import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"
import { isValidContentType, VALID_CONTENT_TYPES, ContentType } from "@/lib/validators/content"

export const dynamic = "force-dynamic"

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get("authorization") || ""
  const token = auth.replace("Bearer ", "").trim()
  return Boolean(process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN)
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    
    const type = searchParams.get("type")
    if (!type) {
      return Response.json(
        { error: "type parameter is required" },
        { status: 400 }
      )
    }

    if (!isValidContentType(type)) {
      return Response.json(
        { error: `Invalid type. Must be one of: ${VALID_CONTENT_TYPES.join(", ")}` },
        { status: 400 }
      )
    }

    const publishedParam = searchParams.get("published")
    const published = publishedParam === null ? true : publishedParam === "true"
    
    const featuredParam = searchParams.get("featured")
    const featured = featuredParam === "true" ? true : undefined
    
    const bookableParam = searchParams.get("bookable")
    const bookable = bookableParam === "true" ? true : undefined
    
    const category = searchParams.get("category") || undefined
    const limit = parseInt(searchParams.get("limit") || "50", 10)
    const offset = parseInt(searchParams.get("offset") || "0", 10)

    const where: any = {
      type
    }

    if (publishedParam !== "false") {
      where.published = published
    }

    if (featured !== undefined) {
      where.featured = featured
    }

    if (bookable !== undefined) {
      where.bookable = bookable
    }

    if (category) {
      where.category = category
    }

    const [items, total] = await Promise.all([
      db.contentItem.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset
      }),
      db.contentItem.count({ where })
    ])

    const hasMore = offset + items.length < total

    return Response.json(
      { items, total, hasMore },
      { headers: { "Cache-Control": "no-store" } }
    )
  } catch (error) {
    console.error("Error fetching content:", error)
    return Response.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { type, title, slug, ...rest } = body

    if (!type) {
      return Response.json(
        { error: "type is required" },
        { status: 400 }
      )
    }

    if (!isValidContentType(type)) {
      return Response.json(
        { error: `Invalid type. Must be one of: ${VALID_CONTENT_TYPES.join(", ")}` },
        { status: 400 }
      )
    }

    if (!title || !slug) {
      return Response.json(
        { error: "title and slug are required" },
        { status: 400 }
      )
    }

    const existingItem = await db.contentItem.findUnique({
      where: { slug }
    })

    if (existingItem) {
      return Response.json(
        { error: "A content item with this slug already exists" },
        { status: 400 }
      )
    }

    const item = await db.contentItem.create({
      data: {
        type,
        title,
        slug,
        ...rest
      }
    })

    revalidateTag("content")
    revalidateTag(`content-${type}`)

    return Response.json(item, { status: 201 })
  } catch (error) {
    console.error("Error creating content:", error)
    return Response.json(
      { error: "Failed to create content" },
      { status: 500 }
    )
  }
}
