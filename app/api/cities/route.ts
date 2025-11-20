import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"

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
