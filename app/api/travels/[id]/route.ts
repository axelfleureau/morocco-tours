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
    const travel = await db.travel.findUnique({
      where: { id: params.id }
    })

    if (!travel) {
      return Response.json({ error: "Travel not found" }, { status: 404 })
    }

    return Response.json(travel, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching travel:", error)
    return Response.json({ error: "Failed to fetch travel" }, { status: 500 })
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
    const travel = await db.travel.update({
      where: { id: params.id },
      data: body
    })

    revalidateTag("travels")
    revalidateTag(`travel-${params.id}`)
    return Response.json(travel)
  } catch (error) {
    console.error("Error updating travel:", error)
    return Response.json({ error: "Failed to update travel" }, { status: 500 })
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
    await db.travel.delete({
      where: { id: params.id }
    })

    revalidateTag("travels")
    revalidateTag(`travel-${params.id}`)
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting travel:", error)
    return Response.json({ error: "Failed to delete travel" }, { status: 500 })
  }
}
