import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"
import { isAdmin } from "@/lib/auth-helpers"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const isAdminUser = await isAdmin(req.headers.get("authorization"))
  if (!isAdminUser) {
    return Response.json({ error: "Missing or insufficient permissions." }, { status: 403 })
  }

  try {
    let settings = await db.siteSettings.findUnique({
      where: { id: "site_settings" }
    })

    if (!settings) {
      settings = await db.siteSettings.create({
        data: {
          id: "site_settings",
          hero: {},
          contact: {},
          social: {},
          footer: {},
          seo: {},
          theme: {}
        }
      })
    }

    return Response.json(settings, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching site settings:", error)
    return Response.json({ error: "Failed to fetch site settings" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const isAdminUser = await isAdmin(req.headers.get("authorization"))
  if (!isAdminUser) {
    return Response.json({ error: "Missing or insufficient permissions." }, { status: 403 })
  }

  try {
    const body = await req.json()
    
    const settings = await db.siteSettings.upsert({
      where: { id: "site_settings" },
      update: body,
      create: {
        id: "site_settings",
        ...body
      }
    })

    revalidateTag("site-settings")
    return Response.json(settings)
  } catch (error) {
    console.error("Error updating site settings:", error)
    return Response.json({ error: "Failed to update site settings" }, { status: 500 })
  }
}
