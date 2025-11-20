import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const posts = await db.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" }
    })
    return Response.json(posts, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return Response.json({ error: "Failed to fetch blog posts" }, { status: 500 })
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
    const post = await db.blogPost.create({
      data: body
    })

    revalidateTag("blog")
    return Response.json(post, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return Response.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
