import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"
import { isValidContentType, VALID_CONTENT_TYPES } from "@/lib/validators/content"
import { isAdmin } from "@/lib/auth-helpers"

export const dynamic = "force-dynamic"

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const isAdminUser = await isAdmin(req.headers.get("authorization"))
  if (!isAdminUser) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = params
    const body = await req.json()
    const { slug, ...rest } = body

    if (body.type && !isValidContentType(body.type)) {
      return Response.json(
        { error: `Invalid type. Must be one of: ${VALID_CONTENT_TYPES.join(", ")}` },
        { status: 400 }
      )
    }

    const existingItem = await db.contentItem.findUnique({
      where: { id }
    })

    if (!existingItem) {
      return Response.json(
        { error: "Content item not found" },
        { status: 404 }
      )
    }

    if (slug && slug !== existingItem.slug) {
      const slugExists = await db.contentItem.findUnique({
        where: { slug }
      })

      if (slugExists) {
        return Response.json(
          { error: "A content item with this slug already exists" },
          { status: 400 }
        )
      }
    }

    const updateData: any = { ...rest }
    if (slug) {
      updateData.slug = slug
    }

    const updatedItem = await db.contentItem.update({
      where: { id },
      data: updateData
    })

    revalidateTag("content")
    revalidateTag(`content-${updatedItem.type}`)

    return Response.json(updatedItem)
  } catch (error) {
    console.error("Error updating content:", error)
    return Response.json(
      { error: "Failed to update content" },
      { status: 500 }
    )
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
    const { id } = params

    const existingItem = await db.contentItem.findUnique({
      where: { id }
    })

    if (!existingItem) {
      return Response.json(
        { error: "Content item not found" },
        { status: 404 }
      )
    }

    await db.contentItem.update({
      where: { id },
      data: { published: false }
    })

    revalidateTag("content")
    revalidateTag(`content-${existingItem.type}`)

    return Response.json({ success: true, id })
  } catch (error) {
    console.error("Error deleting content:", error)
    return Response.json(
      { error: "Failed to delete content" },
      { status: 500 }
    )
  }
}
