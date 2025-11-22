import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"
import { isAdmin } from "@/lib/auth-helpers"

export const dynamic = "force-dynamic"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await db.blogPost.findUnique({
      where: { id: params.id }
    })

    if (!post) {
      return Response.json({ error: "Blog post not found" }, { status: 404 })
    }

    return Response.json(post, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return Response.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const isAdminUser = await isAdmin(req.headers.get("authorization"))
  if (!isAdminUser) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const post = await db.blogPost.update({
      where: { id: params.id },
      data: body
    })

    revalidateTag("blog")
    revalidateTag(`blog-${params.id}`)
    return Response.json(post)
  } catch (error) {
    console.error("Error updating blog post:", error)
    return Response.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const isAdminUser = await isAdmin(req.headers.get("authorization"))
  if (!isAdminUser) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await db.blogPost.delete({
      where: { id: params.id }
    })

    revalidateTag("blog")
    revalidateTag(`blog-${params.id}`)
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return Response.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
