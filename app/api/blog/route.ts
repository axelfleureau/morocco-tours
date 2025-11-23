import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"
import { isAdmin } from "@/lib/auth-helpers"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')

    const where: any = {
      type: 'blog',
      published: true
    }

    if (featured === 'true') {
      where.featured = true
    }

    if (category) {
      where.category = category
    }

    const items = await db.contentItem.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
      skip: offset ? parseInt(offset) : undefined
    })
    
    const posts = items.map(item => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      excerpt: item.metadata?.excerpt || item.description,
      coverImage: item.metadata?.coverImage || item.image,
      sections: item.metadata?.sections,
      tags: item.metadata?.tags,
      author: item.metadata?.author,
      readTime: item.metadata?.readTime,
      published: item.published,
      featured: item.featured,
      publishedAt: item.publishedAt,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }))
    
    return Response.json({ posts }, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return Response.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const isAdminUser = await isAdmin(req.headers.get("authorization"))
  if (!isAdminUser) {
    return Response.json({ error: "Missing or insufficient permissions." }, { status: 403 })
  }

  try {
    const body = await req.json()
    const {
      title,
      slug,
      excerpt,
      coverImage,
      sections,
      tags,
      author,
      readTime,
      published = true,
      featured = false,
      publishedAt
    } = body

    const contentItem = await db.contentItem.create({
      data: {
        type: 'blog',
        title,
        slug,
        description: excerpt,
        image: coverImage,
        published,
        featured,
        publishedAt,
        metadata: {
          excerpt,
          coverImage,
          sections,
          tags,
          author,
          readTime
        }
      }
    })

    const post = {
      id: contentItem.id,
      title: contentItem.title,
      slug: contentItem.slug,
      excerpt: contentItem.metadata?.excerpt,
      coverImage: contentItem.metadata?.coverImage,
      sections: contentItem.metadata?.sections,
      tags: contentItem.metadata?.tags,
      author: contentItem.metadata?.author,
      readTime: contentItem.metadata?.readTime,
      published: contentItem.published,
      featured: contentItem.featured,
      publishedAt: contentItem.publishedAt,
      createdAt: contentItem.createdAt,
      updatedAt: contentItem.updatedAt
    }

    revalidateTag("blog")
    return Response.json(post, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return Response.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
