import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { isAdmin } from "@/lib/auth-helpers"

export async function GET() {
  try {
    const items = await db.menuItem.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }]
    })
    
    return Response.json({ items }, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching menu:", error)
    return Response.json({ error: "Failed to fetch menu" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const isAdminUser = await isAdmin(req.headers.get("authorization"))
  if (!isAdminUser) {
    return Response.json({ error: "Missing or insufficient permissions." }, { status: 403 })
  }

  try {
    const body = await req.json()
    const item = await db.menuItem.create({ data: body })
    return Response.json(item, { status: 201 })
  } catch (error) {
    console.error("Error creating menu item:", error)
    return Response.json({ error: "Failed to create menu item" }, { status: 500 })
  }
}
