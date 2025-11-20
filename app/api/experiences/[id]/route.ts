import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

function isAuthorized(req: NextRequest) {
  const auth = req.headers.get("authorization") || ""
  const token = auth.replace("Bearer ", "").trim()
  return process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const experience = await db.experience.findUnique({
      where: { id: params.id }
    })

    if (!experience) {
      return Response.json({ error: "Experience not found" }, { status: 404 })
    }

    return Response.json(experience, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching experience:", error)
    return Response.json({ error: "Failed to fetch experience" }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const experience = await db.experience.update({
      where: { id: params.id },
      data: body
    })

    revalidateTag("experiences")
    revalidateTag(`experience-${params.id}`)
    return Response.json(experience)
  } catch (error) {
    console.error("Error updating experience:", error)
    return Response.json({ error: "Failed to update experience" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await db.experience.delete({
      where: { id: params.id }
    })

    revalidateTag("experiences")
    revalidateTag(`experience-${params.id}`)
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting experience:", error)
    return Response.json({ error: "Failed to delete experience" }, { status: 500 })
  }
}
