import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const travels = await db.travel.findMany({
      where: { published: true },
      orderBy: { updatedAt: "desc" }
    })
    return Response.json(travels, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching travels:", error)
    return Response.json({ error: "Failed to fetch travels" }, { status: 500 })
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
    const travel = await db.travel.create({
      data: body
    })

    revalidateTag("travels")
    return Response.json(travel, { status: 201 })
  } catch (error) {
    console.error("Error creating travel:", error)
    return Response.json({ error: "Failed to create travel" }, { status: 500 })
  }
}
