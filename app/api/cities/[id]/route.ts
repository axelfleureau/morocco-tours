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
    const city = await db.city.findUnique({
      where: { id: params.id }
    })

    if (!city) {
      return Response.json({ error: "City not found" }, { status: 404 })
    }

    return Response.json(city, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching city:", error)
    return Response.json({ error: "Failed to fetch city" }, { status: 500 })
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
    const city = await db.city.update({
      where: { id: params.id },
      data: body
    })

    revalidateTag("cities")
    revalidateTag(`city-${params.id}`)
    return Response.json(city)
  } catch (error) {
    console.error("Error updating city:", error)
    return Response.json({ error: "Failed to update city" }, { status: 500 })
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
    await db.city.delete({
      where: { id: params.id }
    })

    revalidateTag("cities")
    revalidateTag(`city-${params.id}`)
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting city:", error)
    return Response.json({ error: "Failed to delete city" }, { status: 500 })
  }
}
