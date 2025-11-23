import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"
import { isAdmin } from "@/lib/auth-helpers"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const cities = await db.city.findMany({
      where: { published: true },
      orderBy: { name: "asc" }
    })
    return Response.json({ cities }, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching cities:", error)
    return Response.json({ error: "Failed to fetch cities" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const isAdminUser = await isAdmin(req.headers.get("authorization"))
  if (!isAdminUser) {
    return Response.json({ error: "Missing or insufficient permissions." }, { status: 403 })
  }

  try {
    const body = await req.json()
    const city = await db.city.create({
      data: body
    })

    revalidateTag("cities")
    return Response.json(city, { status: 201 })
  } catch (error) {
    console.error("Error creating city:", error)
    return Response.json({ error: "Failed to create city" }, { status: 500 })
  }
}
