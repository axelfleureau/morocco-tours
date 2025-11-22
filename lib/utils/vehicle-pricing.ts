import type { Vehicle } from '@/lib/public-data'

export interface RentalService {
  name: string
  included: boolean
}

export const includedServices: RentalService[] = [
  { name: "Chilometraggio illimitato", included: true },
  { name: "Secondo conducente gratuito", included: true },
  { name: "Consegna gratuita a Marrakech", included: true },
  { name: "Assistenza 24 ore su 24, 7 giorni su 7", included: true },
  { name: "IVA", included: true },
]

export const extraServices: RentalService[] = [
  { name: "Assicurazione a franchigia zero", included: false },
  { name: "Esenzione danni da collisione", included: false },
  { name: "Protezione antifurto", included: false },
]

export function getPeriodFromDate(date: Date): 1 | 2 | 3 | 4 {
  const month = date.getMonth() + 1
  const day = date.getDate()

  if ((month === 1 && day >= 10) || (month > 1 && month < 7) || (month === 7 && day < 15)) {
    return 1
  }

  if ((month === 7 && day >= 15) || month === 8 || (month === 9 && day < 5)) {
    return 2
  }

  if ((month === 12 && day >= 20) || (month === 1 && day < 10)) {
    return 3
  }

  return 4
}

export function getDurationCategory(days: number): "short" | "medium" | "long" {
  if (days >= 2 && days <= 5) return "short"
  if (days >= 6 && days <= 20) return "medium"
  return "long"
}

export function calculateRentalPrice(
  vehicle: Vehicle,
  startDate: Date,
  endDate: Date
): { dailyRate: number; totalDays: number; totalPrice: number; period: 1 | 2 | 3 | 4 } | null {
  if (!startDate || !endDate || endDate <= startDate || !vehicle.pricing) return null

  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  if (totalDays < 2) return null

  const period = getPeriodFromDate(startDate)
  const durationCategory = getDurationCategory(totalDays)

  const periodKey = `period${period}` as keyof typeof vehicle.pricing
  const dailyRate = vehicle.pricing[periodKey][durationCategory]
  const totalPrice = dailyRate * totalDays

  return { dailyRate, totalDays, totalPrice, period }
}

export const periodNames = {
  1: "10/01 - 15/07",
  2: "15/07 - 05/09 (Estate)",
  3: "20/12 - 10/01 (Capodanno)",
  4: "05/09 - 20/12",
}
