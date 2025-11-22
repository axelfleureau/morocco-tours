import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const [
      experiencesTotal,
      experiencesPublished,
      travelsTotal,
      travelsPublished,
      vehiclesTotal,
      vehiclesPublished,
      usersTotal
    ] = await Promise.all([
      db.experience.count(),
      db.experience.count({ where: { published: true } }),
      db.travel.count(),
      db.travel.count({ where: { published: true } }),
      db.vehicle.count(),
      db.vehicle.count({ where: { published: true } }),
      db.user.count()
    ])

    const stats = {
      experiences: {
        total: experiencesTotal,
        published: experiencesPublished
      },
      travels: {
        total: travelsTotal,
        published: travelsPublished
      },
      vehicles: {
        total: vehiclesTotal,
        published: vehiclesPublished
      },
      users: {
        total: usersTotal
      }
    }

    return NextResponse.json({ stats }, { status: 200 })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
