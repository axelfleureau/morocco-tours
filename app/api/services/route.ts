import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"
import { isAdmin } from "@/lib/auth-helpers"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const services = await db.service.findMany({
      where: { published: true },
      orderBy: { name: "asc" }
    })
    return Response.json({ services }, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching services:", error)
    return Response.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const isAdminUser = await isAdmin(req.headers.get("authorization"))
  if (!isAdminUser) {
    return Response.json({ error: "Missing or insufficient permissions." }, { status: 403 })
  }

  try {
    const body = await req.json()
    const service = await db.service.create({
      data: body
    })

    revalidateTag("services")
    return Response.json(service, { status: 201 })
  } catch (error) {
    console.error("Error creating service:", error)
    return Response.json({ error: "Failed to create service" }, { status: 500 })
  }
}
