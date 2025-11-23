import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { isAdmin } from "@/lib/auth-helpers"

export async function GET(req: NextRequest) {
  try {
    const category = new URL(req.url).searchParams.get("category")
    
    const faqs = await db.fAQ.findMany({
      where: { 
        published: true,
        ...(category && { category })
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }]
    })
    
    return Response.json({ faqs }, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching FAQs:", error)
    return Response.json({ error: "Failed to fetch FAQs" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const isAdminUser = await isAdmin(req.headers.get("authorization"))
  if (!isAdminUser) {
    return Response.json({ error: "Missing or insufficient permissions." }, { status: 403 })
  }

  try {
    const body = await req.json()
    const faq = await db.fAQ.create({ data: body })
    return Response.json(faq, { status: 201 })
  } catch (error) {
    console.error("Error creating FAQ:", error)
    return Response.json({ error: "Failed to create FAQ" }, { status: 500 })
  }
}
