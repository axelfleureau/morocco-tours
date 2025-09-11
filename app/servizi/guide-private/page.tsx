import GuidePrivateClientPage from "./GuidePrivateClientPage"

export const metadata = {
  title: "Guide Private Marocco | Guide Locali Esperte | Morocco Dreams",
  description:
    "Guide private certificate per il Marocco. Esperienze personalizzate con guide locali multilingue. Prenota la tua guida esperta ora!",
  keywords: "guide private marocco, guida turistica marocco, tour personalizzati marocco, guide locali",
  openGraph: {
    title: "Guide Private Esperte Marocco - Esperienze Autentiche",
    description: "Scopri il Marocco autentico con le nostre guide locali certificate e multilingue.",
    type: "website",
    images: ["/images/guides-hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guide Private Marocco",
    description: "Guide locali esperte per esperienze autentiche",
  },
}

export default function GuidePrivatePage() {
  return <GuidePrivateClientPage />
}
