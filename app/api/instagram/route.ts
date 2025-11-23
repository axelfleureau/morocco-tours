import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"
import { isAdmin } from "@/lib/auth-helpers"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const videos = await db.instagramVideo.findMany({
      where: { active: true },
      orderBy: { slot: "asc" }
    })
    return Response.json({ videos }, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching Instagram videos:", error)
    return Response.json({ error: "Failed to fetch Instagram videos" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const isAdminUser = await isAdmin(req.headers.get("authorization"))
  if (!isAdminUser) {
    return Response.json({ error: "Missing or insufficient permissions." }, { status: 403 })
  }

  try {
    const body = await req.json()
    const { slot, videoUrl, active = true } = body

    if (!slot || !videoUrl) {
      return Response.json(
        { error: "Slot and videoUrl are required" },
        { status: 400 }
      )
    }

    const video = await db.instagramVideo.upsert({
      where: { slot },
      update: { videoUrl, active },
      create: { slot, videoUrl, active }
    })

    revalidateTag("instagram")
    return Response.json(video)
  } catch (error) {
    console.error("Error updating Instagram video:", error)
    return Response.json({ error: "Failed to update Instagram video" }, { status: 500 })
  }
}
