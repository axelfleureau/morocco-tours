import NoleggioAutoClientPage from "./NoleggioAutoClientPage"

export const metadata = {
  title: "Noleggio Auto Marrakech | Tariffe Trasparenti | Morocco Dreams",
  description:
    "Noleggio auto a Marrakech con tariffe trasparenti. Chilometraggio illimitato, assistenza 24/7, consegna gratuita. Prenota ora!",
  keywords: "noleggio auto marrakech, car rental morocco, auto economiche marrakech, suv marocco",
  openGraph: {
    title: "Noleggio Auto Marrakech - Tariffe Trasparenti",
    description: "Scopri il Marocco in libertà con la nostra flotta di veicoli selezionati.",
    type: "website",
    images: ["/images/car-rental-hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noleggio Auto Marrakech",
    description: "Tariffe trasparenti e assistenza 24/7",
  },
}

export default function NoleggioAutoPage() {
  return <NoleggioAutoClientPage />
}
