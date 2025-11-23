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
    const vehicle = await db.vehicle.findUnique({
      where: { id: params.id }
    })

    if (!vehicle) {
      return Response.json({ error: "Vehicle not found" }, { status: 404 })
    }

    return Response.json(vehicle, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching vehicle:", error)
    return Response.json({ error: "Failed to fetch vehicle" }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const isAdminUser = await isAdmin(req.headers.get("authorization"))
  if (!isAdminUser) {
    return Response.json({ error: "Missing or insufficient permissions." }, { status: 403 })
  }

  try {
    const body = await req.json()
    const vehicle = await db.vehicle.update({
      where: { id: params.id },
      data: body
    })

    revalidateTag("vehicles")
    revalidateTag(`vehicle-${params.id}`)
    return Response.json(vehicle)
  } catch (error) {
    console.error("Error updating vehicle:", error)
    return Response.json({ error: "Failed to update vehicle" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const isAdminUser = await isAdmin(req.headers.get("authorization"))
  if (!isAdminUser) {
    return Response.json({ error: "Missing or insufficient permissions." }, { status: 403 })
  }

  try {
    await db.vehicle.delete({
      where: { id: params.id }
    })

    revalidateTag("vehicles")
    revalidateTag(`vehicle-${params.id}`)
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting vehicle:", error)
    return Response.json({ error: "Failed to delete vehicle" }, { status: 500 })
  }
}
