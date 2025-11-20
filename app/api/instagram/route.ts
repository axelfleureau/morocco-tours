import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const videos = await db.instagramVideo.findMany({
      where: { active: true },
      orderBy: { slot: "asc" }
    })
    return Response.json(videos, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching Instagram videos:", error)
    return Response.json({ error: "Failed to fetch Instagram videos" }, { status: 500 })
  }
}

function isAuthorized(req: NextRequest) {
  const auth = req.headers.get("authorization") || ""
  const token = auth.replace("Bearer ", "").trim()
  return process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
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
