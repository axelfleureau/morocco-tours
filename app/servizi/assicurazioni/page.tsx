import AssicurazioniClientPage from "./AssicurazioniClientPage"

export const metadata = {
  title: "Assicurazioni Viaggio Marocco | Protezione Completa | Morocco Dreams",
  description:
    "Assicurazioni viaggio complete per il Marocco. Copertura medica fino a €200.000, assistenza 24/7 in italiano, rimborsi rapidi. Prenota ora!",
  keywords: "assicurazione viaggio marocco, copertura medica marocco, assicurazione bagagli, annullamento viaggio",
  openGraph: {
    title: "Assicurazioni Viaggio Marocco - Protezione Completa",
    description: "Viaggia in Marocco con la massima tranquillità. Coperture fino a €200.000 e assistenza 24/7.",
    type: "website",
    images: ["/images/insurance-hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Assicurazioni Viaggio Marocco",
    description: "Protezione completa per i tuoi viaggi in Marocco",
  },
}

export default function AssicurazioniPage() {
  return <AssicurazioniClientPage />
}
