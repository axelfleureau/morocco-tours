import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const vehicles = await db.vehicle.findMany({
      where: { published: true },
      orderBy: { updatedAt: "desc" }
    })
    return Response.json(vehicles, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching vehicles:", error)
    return Response.json({ error: "Failed to fetch vehicles" }, { status: 500 })
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
    const vehicle = await db.vehicle.create({
      data: body
    })

    revalidateTag("vehicles")
    return Response.json(vehicle, { status: 201 })
  } catch (error) {
    console.error("Error creating vehicle:", error)
    return Response.json({ error: "Failed to create vehicle" }, { status: 500 })
  }
}
