import { NextRequest } from "next/server"
import { db } from "@/lib/db"

function isAuthorized(req: NextRequest) {
  const auth = req.headers.get("authorization") || ""
  const token = auth.replace("Bearer ", "").trim()
  return process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN
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
    const faq = await db.fAQ.update({
      where: { id: params.id },
      data: body
    })
    return Response.json(faq)
  } catch (error) {
    console.error("Error updating FAQ:", error)
    return Response.json({ error: "Failed to update FAQ" }, { status: 500 })
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
    await db.fAQ.delete({ where: { id: params.id } })
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting FAQ:", error)
    return Response.json({ error: "Failed to delete FAQ" }, { status: 500 })
  }
}
