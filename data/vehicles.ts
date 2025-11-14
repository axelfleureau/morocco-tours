export interface Vehicle {
  id: string;
  name: string;
  model: string;
  category: "Economica" | "SUV" | "Premium";
  transmission: "Manuale" | "Automatica";
  fuel: "Benzina" | "Diesel";
  doors: number;
  seats: number;
  airConditioning: boolean;
  dailyFranchise: string;
  image: string;
  description: string;
  pricing: {
    period1: { short: number; medium: number; long: number };
    period2: { short: number; medium: number; long: number };
    period3: { short: number; medium: number; long: number };
    period4: { short: number; medium: number; long: number };
  };
}

export const vehicles: Vehicle[] = [
  {
    id: "fiat-panda",
    name: "Fiat Panda",
    model: "1.2 Pop",
    category: "Economica",
    transmission: "Manuale",
    fuel: "Benzina",
    doors: 5,
    seats: 5,
    airConditioning: true,
    dailyFranchise: "3.000 MAD",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format",
    description: "Ideale per esplorare Marrakech. Compatta, economica e facile da guidare.",
    pricing: {
      period1: { short: 25, medium: 22, long: 20 },
      period2: { short: 35, medium: 30, long: 28 },
      period3: { short: 45, medium: 40, long: 35 },
      period4: { short: 28, medium: 25, long: 23 },
    },
  },
  {
    id: "renault-clio",
    name: "Renault Clio",
    model: "1.5 dCi",
    category: "Economica",
    transmission: "Manuale",
    fuel: "Diesel",
    doors: 5,
    seats: 5,
    airConditioning: true,
    dailyFranchise: "3.000 MAD",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format",
    description: "Auto affidabile con ottimi consumi. Perfetta per lunghi viaggi.",
    pricing: {
      period1: { short: 28, medium: 25, long: 22 },
      period2: { short: 38, medium: 33, long: 30 },
      period3: { short: 48, medium: 43, long: 38 },
      period4: { short: 30, medium: 27, long: 25 },
    },
  },
  {
    id: "hyundai-i20",
    name: "Hyundai i20",
    model: "1.4 CRDI",
    category: "Economica",
    transmission: "Automatica",
    fuel: "Diesel",
    doors: 5,
    seats: 5,
    airConditioning: true,
    dailyFranchise: "3.500 MAD",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format",
    description: "Cambio automatico per il massimo comfort in città.",
    pricing: {
      period1: { short: 32, medium: 28, long: 25 },
      period2: { short: 42, medium: 37, long: 33 },
      period3: { short: 52, medium: 47, long: 42 },
      period4: { short: 35, medium: 30, long: 28 },
    },
  },
  {
    id: "dacia-duster",
    name: "Dacia Duster",
    model: "4x4 Prestige",
    category: "SUV",
    transmission: "Manuale",
    fuel: "Diesel",
    doors: 5,
    seats: 5,
    airConditioning: true,
    dailyFranchise: "5.000 MAD",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format",
    description: "SUV robusto ideale per esplorare il deserto e le montagne dell'Atlas.",
    pricing: {
      period1: { short: 45, medium: 40, long: 35 },
      period2: { short: 55, medium: 48, long: 43 },
      period3: { short: 70, medium: 62, long: 55 },
      period4: { short: 48, medium: 42, long: 38 },
    },
  },
  {
    id: "toyota-rav4",
    name: "Toyota RAV4",
    model: "2.5 Hybrid AWD",
    category: "SUV",
    transmission: "Automatica",
    fuel: "Benzina",
    doors: 5,
    seats: 5,
    airConditioning: true,
    dailyFranchise: "6.000 MAD",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format",
    description: "SUV premium con trazione integrale. Comfort e prestazioni eccellenti.",
    pricing: {
      period1: { short: 65, medium: 58, long: 52 },
      period2: { short: 80, medium: 72, long: 65 },
      period3: { short: 100, medium: 90, long: 82 },
      period4: { short: 70, medium: 62, long: 55 },
    },
  },
  {
    id: "nissan-qashqai",
    name: "Nissan Qashqai",
    model: "1.6 dCi Tekna",
    category: "SUV",
    transmission: "Automatica",
    fuel: "Diesel",
    doors: 5,
    seats: 5,
    airConditioning: true,
    dailyFranchise: "5.500 MAD",
    image: "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800&auto=format",
    description: "Crossover elegante con tecnologia avanzata e spazio generoso.",
    pricing: {
      period1: { short: 55, medium: 48, long: 43 },
      period2: { short: 68, medium: 60, long: 53 },
      period3: { short: 85, medium: 75, long: 68 },
      period4: { short: 58, medium: 52, long: 46 },
    },
  },
  {
    id: "mercedes-c-class",
    name: "Mercedes-Benz Classe C",
    model: "C 220d AMG Line",
    category: "Premium",
    transmission: "Automatica",
    fuel: "Diesel",
    doors: 4,
    seats: 5,
    airConditioning: true,
    dailyFranchise: "8.000 MAD",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format",
    description: "Lusso tedesco per un'esperienza di guida indimenticabile.",
    pricing: {
      period1: { short: 85, medium: 75, long: 68 },
      period2: { short: 105, medium: 95, long: 85 },
      period3: { short: 135, medium: 120, long: 110 },
      period4: { short: 90, medium: 80, long: 72 },
    },
  },
  {
    id: "bmw-5-series",
    name: "BMW Serie 5",
    model: "530d M Sport",
    category: "Premium",
    transmission: "Automatica",
    fuel: "Diesel",
    doors: 4,
    seats: 5,
    airConditioning: true,
    dailyFranchise: "10.000 MAD",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format",
    description: "Berlina premium con prestazioni eccezionali e massimo comfort.",
    pricing: {
      period1: { short: 95, medium: 85, long: 75 },
      period2: { short: 120, medium: 108, long: 95 },
      period3: { short: 155, medium: 140, long: 125 },
      period4: { short: 100, medium: 90, long: 80 },
    },
  },
  {
    id: "audi-a6",
    name: "Audi A6",
    model: "3.0 TDI Quattro",
    category: "Premium",
    transmission: "Automatica",
    fuel: "Diesel",
    doors: 4,
    seats: 5,
    airConditioning: true,
    dailyFranchise: "10.000 MAD",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format",
    description: "Eleganza e tecnologia al massimo livello. Trazione integrale Quattro.",
    pricing: {
      period1: { short: 100, medium: 90, long: 80 },
      period2: { short: 125, medium: 112, long: 100 },
      period3: { short: 160, medium: 145, long: 130 },
      period4: { short: 105, medium: 95, long: 85 },
    },
  },
];

export interface RentalService {
  id: string;
  name: string;
  type: "included" | "extra";
  price?: number;
  description: string;
}

export const rentalServices: RentalService[] = [
  {
    id: "unlimited-km",
    name: "Chilometraggio illimitato",
    type: "included",
    description: "Viaggia senza limiti di chilometraggio",
  },
  {
    id: "second-driver",
    name: "Secondo conducente gratuito",
    type: "included",
    description: "Condividi la guida senza costi aggiuntivi",
  },
  {
    id: "free-delivery",
    name: "Consegna gratuita a Marrakech",
    type: "included",
    description: "Ritiro e consegna nel centro di Marrakech inclusi",
  },
  {
    id: "assistance-24-7",
    name: "Assistenza 24/7",
    type: "included",
    description: "Supporto sempre disponibile in caso di necessità",
  },
  {
    id: "vat-included",
    name: "IVA inclusa",
    type: "included",
    description: "Prezzo finale senza sorprese",
  },
  {
    id: "zero-franchise",
    name: "Assicurazione a franchigia zero",
    type: "extra",
    price: 15,
    description: "Elimina completamente la franchigia in caso di danni",
  },
  {
    id: "cdw",
    name: "Esenzione danni da collisione (CDW)",
    type: "extra",
    price: 12,
    description: "Protezione estesa per danni da collisione",
  },
  {
    id: "theft-protection",
    name: "Protezione antifurto",
    type: "extra",
    price: 10,
    description: "Copertura completa in caso di furto del veicolo",
  },
  {
    id: "gps",
    name: "Navigatore GPS",
    type: "extra",
    price: 8,
    description: "Navigatore satellitare per orientarti facilmente",
  },
  {
    id: "baby-seat",
    name: "Seggiolino bambini",
    type: "extra",
    price: 5,
    description: "Seggiolino omologato per la sicurezza dei più piccoli",
  },
];

export function calculatePeriod(startDate: Date): 1 | 2 | 3 | 4 {
  const month = startDate.getMonth() + 1;
  const day = startDate.getDate();

  if ((month === 12 && day >= 20) || (month === 1 && day <= 10)) {
    return 3;
  }

  if ((month === 7 && day >= 15) || (month === 8) || (month === 9 && day <= 5)) {
    return 2;
  }

  if ((month === 1 && day >= 10) || (month >= 2 && month <= 6) || (month === 7 && day < 15)) {
    return 1;
  }

  return 4;
}

export function calculateDurationCategory(days: number): "short" | "medium" | "long" {
  if (days <= 5) return "short";
  if (days <= 20) return "medium";
  return "long";
}

export function calculateRentalPrice(
  vehicle: Vehicle,
  startDate: Date,
  endDate: Date
): number {
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (days <= 0) return 0;

  const period = calculatePeriod(startDate);
  const category = calculateDurationCategory(days);

  const periodKey = `period${period}` as keyof typeof vehicle.pricing;
  const dailyRate = vehicle.pricing[periodKey][category];

  return dailyRate * days;
}
