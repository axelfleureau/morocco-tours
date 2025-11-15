export interface Vehicle {
  id: string
  name: string
  category: "economica" | "suv" | "Premium"
  transmission: "manuale" | "automatica"
  fuel: "benzina" | "diesel"
  hasAC: boolean
  doors: number
  seats: number
  dailyDeductible: number
  image: string
  pricing: {
    period1: { short: number; medium: number; long: number }
    period2: { short: number; medium: number; long: number }
    period3: { short: number; medium: number; long: number }
    period4: { short: number; medium: number; long: number }
  }
}

export const vehicles: Vehicle[] = [
  {
    id: "dacia-sandero-benzina",
    name: "Dacia Sandero",
    category: "economica",
    transmission: "manuale",
    fuel: "benzina",
    hasAC: true,
    doors: 5,
    seats: 5,
    dailyDeductible: 6,
    image: "/images/vehicles/dacia-sandero.png",
    pricing: {
      period1: { short: 38, medium: 36, long: 33 },
      period2: { short: 42, medium: 41, long: 40 },
      period3: { short: 40, medium: 38, long: 36 },
      period4: { short: 38, medium: 35, long: 32 },
    },
  },
  {
    id: "peugeot-208",
    name: "Peugeot 208",
    category: "economica",
    transmission: "manuale",
    fuel: "diesel",
    hasAC: true,
    doors: 5,
    seats: 5,
    dailyDeductible: 6,
    image: "/images/vehicles/peugeot-208.png",
    pricing: {
      period1: { short: 45, medium: 42, long: 40 },
      period2: { short: 50, medium: 48, long: 48 },
      period3: { short: 45, medium: 40, long: 38 },
      period4: { short: 42, medium: 39, long: 37 },
    },
  },
  {
    id: "renault-clio-5",
    name: "Renault Clio 5",
    category: "economica",
    transmission: "manuale",
    fuel: "diesel",
    hasAC: true,
    doors: 5,
    seats: 5,
    dailyDeductible: 7,
    image: "/images/vehicles/renault-clio-5.png",
    pricing: {
      period1: { short: 50, medium: 48, long: 48 },
      period2: { short: 43, medium: 40, long: 38 },
      period3: { short: 45, medium: 42, long: 40 },
      period4: { short: 43, medium: 40, long: 38 },
    },
  },
  {
    id: "t-roc",
    name: "T-roc",
    category: "Premium",
    transmission: "automatica",
    fuel: "diesel",
    hasAC: true,
    doors: 5,
    seats: 5,
    dailyDeductible: 12,
    image: "/images/vehicles/t-roc.png",
    pricing: {
      period1: { short: 70, medium: 68, long: 63 },
      period2: { short: 80, medium: 75, long: 72 },
      period3: { short: 75, medium: 72, long: 68 },
      period4: { short: 70, medium: 65, long: 60 },
    },
  },
  {
    id: "touareg",
    name: "Touareg",
    category: "Premium",
    transmission: "automatica",
    fuel: "diesel",
    hasAC: true,
    doors: 5,
    seats: 5,
    dailyDeductible: 20,
    image: "/images/vehicles/touareg.png",
    pricing: {
      period1: { short: 115, medium: 110, long: 105 },
      period2: { short: 109, medium: 100, long: 95 },
      period3: { short: 115, medium: 105, long: 100 },
      period4: { short: 110, medium: 105, long: 100 },
    },
  },
  {
    id: "dacia-logan-automatica-benzina",
    name: "Dacia Logan",
    category: "economica",
    transmission: "automatica",
    fuel: "benzina",
    hasAC: true,
    doors: 5,
    seats: 5,
    dailyDeductible: 6,
    image: "/images/vehicles/dacia-logan.png",
    pricing: {
      period1: { short: 43, medium: 39, long: 37 },
      period2: { short: 46, medium: 44, long: 44 },
      period3: { short: 45, medium: 40, long: 38 },
      period4: { short: 42, medium: 39, long: 37 },
    },
  },
  {
    id: "dacia-logan-manuale-benzina",
    name: "Dacia Logan",
    category: "economica",
    transmission: "manuale",
    fuel: "benzina",
    hasAC: true,
    doors: 5,
    seats: 5,
    dailyDeductible: 6,
    image: "/images/vehicles/dacia-logan.png",
    pricing: {
      period1: { short: 39, medium: 37, long: 36 },
      period2: { short: 43, medium: 42, long: 40 },
      period3: { short: 41, medium: 38, long: 36 },
      period4: { short: 39, medium: 36, long: 33 },
    },
  },
  {
    id: "citroen-c3",
    name: "Citroen C3",
    category: "economica",
    transmission: "manuale",
    fuel: "diesel",
    hasAC: true,
    doors: 5,
    seats: 5,
    dailyDeductible: 6,
    image: "/images/vehicles/citroen-c3.png",
    pricing: {
      period1: { short: 43, medium: 38, long: 36 },
      period2: { short: 48, medium: 46, long: 46 },
      period3: { short: 45, medium: 40, long: 38 },
      period4: { short: 42, medium: 38, long: 36 },
    },
  },
  {
    id: "citroen-c-elysee",
    name: "Citroen C Elysee",
    category: "economica",
    transmission: "manuale",
    fuel: "diesel",
    hasAC: true,
    doors: 5,
    seats: 5,
    dailyDeductible: 6,
    image: "/images/vehicles/citroen-c-elysee.png",
    pricing: {
      period1: { short: 42, medium: 39, long: 38 },
      period2: { short: 46, medium: 44, long: 44 },
      period3: { short: 43, medium: 40, long: 39 },
      period4: { short: 42, medium: 38, long: 36 },
    },
  },
  {
    id: "dacia-logan-manuale-diesel",
    name: "Dacia Logan",
    category: "economica",
    transmission: "manuale",
    fuel: "diesel",
    hasAC: true,
    doors: 5,
    seats: 5,
    dailyDeductible: 6,
    image: "/images/vehicles/dacia-logan.png",
    pricing: {
      period1: { short: 41, medium: 40, long: 36 },
      period2: { short: 46, medium: 44, long: 44 },
      period3: { short: 43, medium: 39, long: 38 },
      period4: { short: 40, medium: 38, long: 35 },
    },
  },
  {
    id: "dacia-lodgy",
    name: "Dacia Lodgy",
    category: "suv",
    transmission: "manuale",
    fuel: "diesel",
    hasAC: true,
    doors: 5,
    seats: 7,
    dailyDeductible: 8,
    image: "/images/vehicles/dacia-lodgy.png",
    pricing: {
      period1: { short: 65, medium: 62, long: 60 },
      period2: { short: 55, medium: 48, long: 45 },
      period3: { short: 58, medium: 50, long: 48 },
      period4: { short: 53, medium: 48, long: 45 },
    },
  },
  {
    id: "clio-5-automatica",
    name: "Clio 5",
    category: "economica",
    transmission: "automatica",
    fuel: "benzina",
    hasAC: true,
    doors: 5,
    seats: 5,
    dailyDeductible: 7,
    image: "/images/vehicles/renault-clio-5.png",
    pricing: {
      period1: { short: 45, medium: 42, long: 39 },
      period2: { short: 50, medium: 48, long: 48 },
      period3: { short: 48, medium: 45, long: 40 },
      period4: { short: 45, medium: 43, long: 38 },
    },
  },
  {
    id: "kia-picanto",
    name: "Kia Picanto",
    category: "economica",
    transmission: "automatica",
    fuel: "benzina",
    hasAC: true,
    doors: 5,
    seats: 5,
    dailyDeductible: 6,
    image: "/images/vehicles/kia-picanto.png",
    pricing: {
      period1: { short: 42, medium: 38, long: 36 },
      period2: { short: 45, medium: 43, long: 42 },
      period3: { short: 43, medium: 40, long: 38 },
      period4: { short: 40, medium: 36, long: 35 },
    },
  },
  {
    id: "dacia-duster-manuale",
    name: "Dacia Duster",
    category: "suv",
    transmission: "manuale",
    fuel: "diesel",
    hasAC: true,
    doors: 5,
    seats: 5,
    dailyDeductible: 8,
    image: "/images/vehicles/dacia-duster.png",
    pricing: {
      period1: { short: 50, medium: 48, long: 46 },
      period2: { short: 60, medium: 58, long: 55 },
      period3: { short: 55, medium: 53, long: 50 },
      period4: { short: 53, medium: 50, long: 45 },
    },
  },
  {
    id: "dacia-duster-automatica",
    name: "Dacia Duster",
    category: "suv",
    transmission: "automatica",
    fuel: "diesel",
    hasAC: true,
    doors: 5,
    seats: 5,
    dailyDeductible: 8,
    image: "/images/vehicles/dacia-duster.png",
    pricing: {
      period1: { short: 65, medium: 62, long: 60 },
      period2: { short: 55, medium: 53, long: 50 },
      period3: { short: 42, medium: 58, long: 55 },
      period4: { short: 58, medium: 55, long: 53 },
    },
  },
  {
    id: "fiat-500",
    name: "Fiat 500",
    category: "economica",
    transmission: "manuale",
    fuel: "benzina",
    hasAC: true,
    doors: 3,
    seats: 5,
    dailyDeductible: 6,
    image: "/images/vehicles/fiat-500.png",
    pricing: {
      period1: { short: 42, medium: 39, long: 37 },
      period2: { short: 46, medium: 43, long: 43 },
      period3: { short: 43, medium: 40, long: 38 },
      period4: { short: 43, medium: 39, long: 35 },
    },
  },
  {
    id: "hyundai-tucson",
    name: "Hyundai Tucson",
    category: "Premium",
    transmission: "automatica",
    fuel: "diesel",
    hasAC: true,
    doors: 5,
    seats: 5,
    dailyDeductible: 11,
    image: "/images/vehicles/hyundai-tucson.png",
    pricing: {
      period1: { short: 80, medium: 75, long: 72 },
      period2: { short: 70, medium: 65, long: 60 },
      period3: { short: 75, medium: 70, long: 68 },
      period4: { short: 70, medium: 65, long: 62 },
    },
  },
  {
    id: "citroen-c4",
    name: "Citroen C4",
    category: "Premium",
    transmission: "automatica",
    fuel: "diesel",
    hasAC: true,
    doors: 5,
    seats: 5,
    dailyDeductible: 9,
    image: "/images/vehicles/citroen-c4.png",
    pricing: {
      period1: { short: 65, medium: 62, long: 58 },
      period2: { short: 70, medium: 68, long: 68 },
      period3: { short: 70, medium: 65, long: 62 },
      period4: { short: 65, medium: 60, long: 55 },
    },
  },
  {
    id: "dacia-sandero-diesel",
    name: "Dacia Sandero",
    category: "economica",
    transmission: "manuale",
    fuel: "diesel",
    hasAC: true,
    doors: 5,
    seats: 5,
    dailyDeductible: 6,
    image: "/images/vehicles/dacia-sandero.png",
    pricing: {
      period1: { short: 41, medium: 39, long: 37 },
      period2: { short: 46, medium: 44, long: 44 },
      period3: { short: 42, medium: 40, long: 38 },
      period4: { short: 40, medium: 38, long: 35 },
    },
  },
];

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
  if (!startDate || !endDate || endDate <= startDate) return null

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
