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
    const service = await db.service.findUnique({
      where: { id: params.id }
    })

    if (!service) {
      return Response.json({ error: "Service not found" }, { status: 404 })
    }

    return Response.json(service, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching service:", error)
    return Response.json({ error: "Failed to fetch service" }, { status: 500 })
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
    const service = await db.service.update({
      where: { id: params.id },
      data: body
    })

    revalidateTag("services")
    revalidateTag(`service-${params.id}`)
    return Response.json(service)
  } catch (error) {
    console.error("Error updating service:", error)
    return Response.json({ error: "Failed to update service" }, { status: 500 })
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
    await db.service.delete({
      where: { id: params.id }
    })

    revalidateTag("services")
    revalidateTag(`service-${params.id}`)
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting service:", error)
    return Response.json({ error: "Failed to delete service" }, { status: 500 })
  }
}
