"use client"
import { NextRequest } from "next/server"
import { db } from "@/lib/db"

function isAuthorized(req: NextRequest) {
  const auth = req.headers.get("authorization") || ""
  const token = auth.replace("Bearer ", "").trim()
  return process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN
}

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }]
    })
    
    return Response.json({ testimonials }, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return Response.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const testimonial = await db.testimonial.create({ data: body })
    return Response.json(testimonial, { status: 201 })
  } catch (error) {
    console.error("Error creating testimonial:", error)
    return Response.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}
