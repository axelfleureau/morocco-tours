export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  cover: string
  author: string
  date: string
  readingMinutes: number
  tags: string[]
  sections: {
    heading: string
    body: string
    image?: string
  }[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "guida-completa-marocco-2024",
    title: "Guida Completa al Viaggio in Marocco: Tutto quello che Devi Sapere nel 2024",
    excerpt: "Una guida dettagliata e aggiornata per pianificare il tuo primo viaggio in Marocco, con consigli pratici, itinerari consigliati e informazioni essenziali.",
    cover: "/images/blog/morocco-complete-guide.png",
    author: "Ahmed El Fassi",
    date: "2024-01-15",
    readingMinutes: 12,
    tags: ["Marocco", "Guida", "Consigli", "Pianificazione"],
    sections: [
      {
        heading: "Quando andare in Marocco",
        body: "Il Marocco si può visitare tutto l'anno, ma ogni stagione ha le sue caratteristiche. La primavera (marzo-maggio) e l'autunno (settembre-novembre) offrono temperature ideali per esplorare le città imperiali e fare trekking nell'Atlante. L'inverno è perfetto per il deserto del Sahara, mentre l'estate è ideale per la costa atlantica.",
        image: "/images/blog/morocco-seasons.png"
      },
      {
        heading: "Documenti necessari",
        body: "I cittadini italiani non hanno bisogno di visto per soggiorni turistici fino a 90 giorni. È sufficiente un passaporto valido con almeno 6 mesi di validità residua dalla data di ingresso. All'arrivo riceverete un timbro di ingresso che dovrete conservare per l'uscita dal paese."
      },
      {
        heading: "Itinerari consigliati",
        body: "Per un primo viaggio, consigliamo almeno 7-10 giorni. Un itinerario classico include Marrakech (2-3 giorni), Fes (2 giorni), il deserto del Sahara (2 giorni) e una città costiera come Essaouira (1-2 giorni). Per chi ha più tempo, vale la pena aggiungere Chefchaouen e l'Alto Atlante.",
        image: "/images/blog/morocco-itinerary-map.png"
      },
      {
        heading: "Consigli pratici",
        body: "La moneta locale è il dirham marocchino (MAD). È consigliabile portare contanti in euro da cambiare localmente. La contrattazione nei souks è normale e fa parte della cultura. Rispettate le tradizioni locali nell'abbigliamento, soprattutto nei luoghi sacri. Imparate qualche parola in arabo o francese: sarà molto apprezzato."
      }
    ]
  },
  {
    slug: "piatti-marocchini-da-provare",
    title: "I 15 Piatti Marocchini che Devi Assolutamente Provare",
    excerpt: "Scopri i sapori autentici del Marocco attraverso i suoi piatti più iconici e dove trovarli nelle città imperiali.",
    cover: "/images/blog/moroccan-tagine-cooking.png",
    author: "Fatima Benali",
    date: "2024-01-12",
    readingMinutes: 8,
    tags: ["Cucina", "Tradizioni", "Ristoranti", "Street Food"],
    sections: [
      {
        heading: "Tagine: il piatto simbolo",
        body: "Il tagine non è solo un piatto, ma anche il recipiente di terracotta in cui viene cucinato. Questo metodo di cottura lenta concentra i sapori e mantiene la carne tenerissima. I tagine più famosi sono quello di pollo con olive e limone conservato, quello di agnello con prugne e mandorle, e quello vegetariano con verdure di stagione.",
        image: "/images/blog/tagine-varieties.png"
      },
      {
        heading: "Couscous: il re del venerdì",
        body: "Tradizionalmente servito il venerdì dopo la preghiera, il couscous è considerato il piatto nazionale. La semola viene cotta al vapore in una couscoussiera speciale e servita con verdure, carne o pesce. Ogni regione ha la sua variante: quello di Fes con sette verdure, quello berbero dell'Atlante con carne secca."
      },
      {
        heading: "Street food imperdibile",
        body: "Nelle strade del Marocco troverete delizie come la harira (zuppa di lenticchie e pomodoro), i msemen (crepes sfogliate), i chebakia (dolci fritti al miele) e il famoso tè alla menta servito in piccoli bicchieri decorati. Non perdete i panini con merguez nella piazza Jemaa el-Fnaa di Marrakech.",
        image: "/images/blog/moroccan-street-food.png"
      },
      {
        heading: "Dove mangiare autentico",
        body: "Per un'esperienza autentica, cercate i piccoli ristoranti frequentati dai locali. A Marrakech provate Chez Lamine Hadj Mustapha per il migliore tagine della città. A Fes, il ristorante Nur nella medina offre cucina tradizionale in un riad storico. Evitate i ristoranti troppo turistici intorno alle piazze principali."
      }
    ]
  },
  {
    slug: "hammam-tradizionale-guida",
    title: "Hammam Tradizionale: Guida Completa al Rituale di Benessere Marocchino",
    excerpt: "Tutto quello che devi sapere sull'hammam tradizionale: come funziona, cosa aspettarsi e dove vivere l'esperienza migliore.",
    cover: "/images/blog/hammam-traditional-spa.png",
    author: "Youssef Alami",
    date: "2024-01-10",
    readingMinutes: 6,
    tags: ["Hammam", "Tradizioni", "Relax", "Spa"],
    sections: [
      {
        heading: "Cos'è l'hammam tradizionale",
        body: "L'hammam è molto più di un semplice bagno: è un rituale sociale e di purificazione che risale all'epoca romana. In Marocco, ogni quartiere ha il suo hammam pubblico dove le famiglie si recano settimanalmente. L'esperienza combina vapore, esfoliazione e massaggio in un ambiente di marmo e vapore.",
        image: "/images/blog/hammam-interior.png"
      },
      {
        heading: "Come funziona il rituale",
        body: "Il rituale inizia nella sala tiepida dove ci si abitua gradualmente al calore. Si passa poi alla sala calda dove il vapore apre i pori. Qui avviene l'esfoliazione con il guanto kessa e il sapone nero (savon noir) a base di olive. Infine, ci si rilassa nella sala fresca con tè alla menta e dolci."
      },
      {
        heading: "Cosa portare e aspettarsi",
        body: "Portate un costume da bagno, ciabatte antiscivolo e un asciugamano. Molti hammam forniscono il guanto kessa e il sapone nero. L'esperienza dura 2-3 ore e può essere intensa per chi non è abituato al calore. È normale sentirsi stanchi dopo: è segno che il corpo si sta disintossicando."
      },
      {
        heading: "I migliori hammam autentici",
        body: "A Marrakech, l'Hammam de la Rose nella medina offre un'esperienza autentica a prezzi locali. A Fes, provate l'Hammam Sidi Harazem, frequentato dalle famiglie del posto. Per un'esperienza di lusso, La Mamounia a Marrakech ha uno dei più bei hammam del mondo, ma a prezzi decisamente più alti."
      }
    ]
  },
  {
    slug: "trekking-sahara-guida-definitiva",
    title: "Trekking nel Deserto del Sahara: La Guida Definitiva per l'Avventura Perfetta",
    excerpt: "Come prepararsi per un trekking nel Sahara: equipaggiamento essenziale, periodo migliore e cosa aspettarsi dall'esperienza.",
    cover: "/images/blog/sahara-desert-camping.png",
    author: "Omar Berrada",
    date: "2024-01-08",
    readingMinutes: 10,
    tags: ["Sahara", "Trekking", "Deserto", "Avventura"],
    sections: [
      {
        heading: "Quando andare nel Sahara",
        body: "Il periodo migliore per il trekking nel Sahara va da ottobre ad aprile, quando le temperature diurne sono sopportabili (20-25°C) e quelle notturne fresche (5-10°C). Evitate assolutamente l'estate quando le temperature possono superare i 50°C. I mesi di dicembre e gennaio possono essere molto freddi di notte, quindi preparatevi adeguatamente.",
        image: "/images/blog/sahara-seasons.png"
      },
      {
        heading: "Equipaggiamento essenziale",
        body: "Per il trekking nel deserto servono: abbigliamento a strati per gestire gli sbalzi termici, scarponi chiusi per proteggere dalla sabbia, cappello e occhiali da sole, crema solare ad alta protezione, sacco a pelo per temperature sotto zero, torcia frontale e batterie di riserva. Portate sempre più acqua del previsto."
      },
      {
        heading: "Tipi di trekking disponibili",
        body: "I trekking variano da escursioni giornaliere a spedizioni di una settimana. Il classico tour di 2-3 giorni include trasferimento in 4x4, trekking con cammelli, pernottamento in campo tendato e alba sulle dune. Per i più avventurosi, ci sono trekking di 5-7 giorni che attraversano diverse oasi e formazioni rocciose.",
        image: "/images/blog/camel-trekking-types.png"
      },
      {
        heading: "Sicurezza e guide locali",
        body: "Non avventuratevi mai da soli nel deserto. Affidate sempre a guide locali esperte che conoscono il territorio, i punti d'acqua e le condizioni meteorologiche. Le guide berbere hanno una conoscenza ancestrale del deserto tramandata di generazione in generazione. Verificate sempre che abbiano le licenze necessarie."
      }
    ]
  },
  {
    slug: "marrakech-vs-fes-confronto",
    title: "Marrakech vs Fes: Quale Città Imperiale Scegliere per il Tuo Primo Viaggio?",
    excerpt: "Un confronto dettagliato tra le due città imperiali più famose del Marocco per aiutarti a scegliere la destinazione perfetta.",
    cover: "/images/blog/marrakech-medina-souks.png",
    author: "Aicha Mansouri",
    date: "2024-01-05",
    readingMinutes: 7,
    tags: ["Marrakech", "Fes", "Città Imperiali", "Confronto"],
    sections: [
      {
        heading: "Atmosfera e carattere",
        body: "Marrakech è la città del glamour e del turismo internazionale, con una medina vivace e colorata dominata dalla famosa piazza Jemaa el-Fnaa. Fes è più autentica e tradizionale, considerata la capitale spirituale e culturale del Marocco, con la medina medievale meglio conservata al mondo. Marrakech è più cosmopolita, Fes più genuina.",
        image: "/images/blog/marrakech-vs-fes-atmosphere.png"
      },
      {
        heading: "Attrazioni principali",
        body: "Marrakech offre i Giardini Majorelle, il Palazzo Bahia, la Moschea Koutoubia e i souks colorati. Fes vanta l'Università Al Quaraouiyine (la più antica del mondo), le concerie tradizionali, la Madrasa Bou Inania e una medina labirintica di 9.000 vicoli. Entrambe hanno souks incredibili, ma quelli di Fes sono più autentici."
      },
      {
        heading: "Facilità di visita",
        body: "Marrakech è più facile per i primi viaggi: più turistica, con più persone che parlano inglese/francese e infrastrutture moderne. Fes richiede più spirito di avventura: la medina è più complessa da navigare e l'esperienza è più immersiva ma anche più impegnativa. Marrakech ha più opzioni di alloggio di lusso."
      },
      {
        heading: "Il nostro consiglio",
        body: "Per un primo viaggio in Marocco, Marrakech è più accessibile e offre un buon mix di tradizione e comfort moderno. Se cercate autenticità e non temete di perdervi in vicoli medievali, scegliete Fes. L'ideale sarebbe visitare entrambe: sono complementari e offrono facce diverse dello stesso affascinante paese."
      }
    ]
  },
  {
    slug: "shopping-souks-guida-contrattazione",
    title: "Shopping nei Souks: Come Contrattare e Cosa Comprare in Marocco",
    excerpt: "Guida pratica per fare shopping nei souks marocchini: tecniche di contrattazione, migliori prodotti e come riconoscere la qualità.",
    cover: "/images/blog/souk-shopping-guide.png",
    author: "Rachid Tazi",
    date: "2024-01-03",
    readingMinutes: 5,
    tags: ["Souks", "Shopping", "Artigianato", "Contrattazione"],
    sections: [
      {
        heading: "L'arte della contrattazione",
        body: "La contrattazione nei souks è un rituale sociale, non una battaglia. Iniziate sempre offrendo il 30-40% del prezzo richiesto. Siate pazienti, sorridete e mostrate interesse genuino per l'oggetto. Se il venditore non accetta la vostra offerta, alzatevi e andate via: spesso vi richiamerà con un prezzo migliore. Non abbiate fretta e godetevi il processo.",
        image: "/images/blog/souk-negotiation.png"
      },
      {
        heading: "Cosa comprare di autentico",
        body: "I migliori acquisti includono: tappeti berberi (verificate l'origine e la lavorazione a mano), ceramiche di Salé e Fes, oggetti in pelle di Marrakech, gioielli berberi in argento, spezie e tè, olio di argan puro, babouches (pantofole tradizionali) e tessuti. Evitate oggetti 'antichi' a prezzi stracciati: sono quasi sempre falsi."
      },
      {
        heading: "Come riconoscere la qualità",
        body: "Per i tappeti, controllate che i nodi siano regolari e che i colori non stingano. Per la pelle, verificate che sia morbida e ben rifinita. L'argento autentico ha il marchio 925. L'olio di argan puro ha un colore dorato e un odore caratteristico. Diffidate di prezzi troppo bassi: la qualità ha sempre un costo."
      },
      {
        heading: "Consigli pratici",
        body: "Portate contanti in piccoli tagli per facilitare la contrattazione. Non mostrate troppo entusiasmo per un oggetto. Confrontate i prezzi in più negozi prima di decidere. Chiedete sempre il certificato di autenticità per oggetti costosi. Ricordate che molti negozi spediscono in tutto il mondo se acquistate oggetti voluminosi."
      }
    ]
  }
]
