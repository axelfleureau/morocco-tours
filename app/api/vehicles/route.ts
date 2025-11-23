import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"
import { isAdmin } from "@/lib/auth-helpers"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const vehicles = await db.vehicle.findMany({
      where: { published: true },
      orderBy: { updatedAt: "desc" }
    })
    
    const transformedVehicles = vehicles.map(vehicle => {
      const pricingPeriods = vehicle.pricingPeriods as any[] || []
      
      const pricing = {
        period1: pricingPeriods[0] ? { 
          short: pricingPeriods[0].shortTerm, 
          medium: pricingPeriods[0].mediumTerm, 
          long: pricingPeriods[0].longTerm 
        } : { short: 0, medium: 0, long: 0 },
        period2: pricingPeriods[1] ? { 
          short: pricingPeriods[1].shortTerm, 
          medium: pricingPeriods[1].mediumTerm, 
          long: pricingPeriods[1].longTerm 
        } : { short: 0, medium: 0, long: 0 },
        period3: pricingPeriods[2] ? { 
          short: pricingPeriods[2].shortTerm, 
          medium: pricingPeriods[2].mediumTerm, 
          long: pricingPeriods[2].longTerm 
        } : { short: 0, medium: 0, long: 0 },
        period4: pricingPeriods[3] ? { 
          short: pricingPeriods[3].shortTerm, 
          medium: pricingPeriods[3].mediumTerm, 
          long: pricingPeriods[3].longTerm 
        } : { short: 0, medium: 0, long: 0 }
      }
      
      const dailyDeductible = 
        vehicle.category === 'economica' ? 6 :
        vehicle.category === 'suv' ? 8 :
        vehicle.category === 'Premium' ? 10 : 6
      
      return {
        id: vehicle.id,
        name: vehicle.name,
        category: vehicle.category,
        transmission: vehicle.transmission,
        fuel: vehicle.fuelType || 'benzina',
        hasAC: true,
        doors: vehicle.doors,
        seats: vehicle.seats,
        dailyDeductible,
        image: vehicle.image || '',
        pricing,
        pricingPeriods: vehicle.pricingPeriods,
        features: vehicle.features,
        luggage: vehicle.luggage,
        published: vehicle.published,
        featured: vehicle.featured
      }
    })
    
    return Response.json({ vehicles: transformedVehicles }, {
      headers: { "Cache-Control": "no-store" }
    })
  } catch (error) {
    console.error("Error fetching vehicles:", error)
    return Response.json({ error: "Failed to fetch vehicles" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const isAdminUser = await isAdmin(req.headers.get("authorization"))
  if (!isAdminUser) {
    return Response.json({ error: "Missing or insufficient permissions." }, { status: 403 })
  }

  try {
    const body = await req.json()
    const vehicle = await db.vehicle.create({
      data: body
    })

    revalidateTag("vehicles")
    return Response.json(vehicle, { status: 201 })
  } catch (error) {
    console.error("Error creating vehicle:", error)
    return Response.json({ error: "Failed to create vehicle" }, { status: 500 })
  }
}
