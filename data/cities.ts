export interface CityAttraction {
  title: string
  description: string
  image: string
  price?: string
  duration?: string
}

export interface City {
  id: string
  name: string
  slug: string
  tagline: string
  heroImage: string
  description: string
  history: string
  attractions: CityAttraction[]
  bestTime: string
  howToArrive: string
  tourPrices: {
    halfDay: string
    fullDay: string
    multiDay?: string
  }
  highlights: string[]
  location: {
    distance: string
    coordinates?: { lat: number; lng: number }
  }
}

export const cities: City[] = [
  {
    id: 'marrakech',
    name: 'Marrakech',
    slug: 'marrakech',
    tagline: 'La Perla del Sud, città dei colori e dei profumi',
    heroImage: '/images/marrakech-hero.png',
    description: 'Marrakech è una delle quattro città imperiali del Marocco, famosa per i suoi mercati vivaci, i giardini lussureggianti e la piazza Jemaa el-Fna, cuore pulsante della medina.',
    history: 'Fondata nel 1062 da Yusuf ibn Tashfin, Marrakech è stata la capitale di potenti dinastie come gli Almoravidi e gli Almohadi. La città ha conservato il suo fascino antico con palazzi, moschee e giardini che testimoniano secoli di storia.',
    attractions: [
      {
        title: 'Piazza Jemaa el-Fna',
        description: 'Il cuore pulsante di Marrakech, patrimonio UNESCO, con incantatori di serpenti, musicisti e bancarelle di cibo',
        image: '/images/jemaa-el-fna.png',
        duration: '2-3 ore'
      },
      {
        title: 'Giardini Majorelle',
        description: 'Oasi di pace creata da Jacques Majorelle, ora di proprietà Yves Saint Laurent',
        image: '/images/majorelle.png',
        price: '€7',
        duration: '1-2 ore'
      },
      {
        title: 'Palazzo Bahia',
        description: 'Capolavoro architettonico del XIX secolo con cortili, giardini e decorazioni mozzafiato',
        image: '/images/bahia.png',
        price: '€7',
        duration: '1 ora'
      },
      {
        title: 'Souks della Medina',
        description: 'Labirinto di mercati tradizionali con artigianato, spezie, tessuti e gioielli',
        image: '/images/souks.png',
        duration: '2-4 ore'
      }
    ],
    bestTime: 'Primavera (marzo-maggio) e autunno (settembre-novembre) sono ideali. Evita luglio-agosto per il caldo intenso.',
    howToArrive: 'Aeroporto Marrakech-Menara (RAK) con voli diretti da tutta Europa. Transfer per il centro in 15-20 minuti.',
    tourPrices: {
      halfDay: '€40-60',
      fullDay: '€80-120',
      multiDay: '€200-400'
    },
    highlights: [
      'Piazza Jemaa el-Fna UNESCO',
      'Giardini Majorelle',
      'Palazzo Bahia',
      'Souks tradizionali',
      'Moschea Koutoubia',
      'Tombe Saadiane'
    ],
    location: {
      distance: 'Centro città',
      coordinates: { lat: 31.6295, lng: -7.9811 }
    }
  },
  {
    id: 'fes',
    name: 'Fès',
    slug: 'fes',
    tagline: 'La Capitale Spirituale, cuore culturale del Marocco',
    heroImage: '/images/fes-hero.png',
    description: 'Fès è la città medievale meglio conservata del mondo arabo, famosa per la sua medina labirintica, le concerie storiche e l\'università Al Quaraouiyine, la più antica del mondo.',
    history: 'Fondata nell\'808 d.C. da Idris II, Fès è stata per secoli il centro culturale e spirituale del Marocco. La sua medina, patrimonio UNESCO, è rimasta praticamente immutata da mille anni.',
    attractions: [
      {
        title: 'Medina di Fès el-Bali',
        description: 'La più grande area urbana pedonale del mondo, patrimonio UNESCO dal 1981',
        image: '/images/fes-medina.png',
        duration: 'Mezza giornata'
      },
      {
        title: 'Concerie Chouara',
        description: 'Le storiche concerie del XIII secolo dove si lavora la pelle con metodi tradizionali',
        image: '/images/chouara.png',
        duration: '1 ora'
      },
      {
        title: 'Università Al Quaraouiyine',
        description: 'La più antica università del mondo ancora funzionante, fondata nell\'859',
        image: '/images/al-quaraouiyine.png',
        duration: '30 min (esterno)'
      },
      {
        title: 'Palazzo Reale',
        description: 'Magnifico palazzo con porte dorate e architettura mozzafiato',
        image: '/images/fes-palace.png',
        duration: '30 min (esterno)'
      }
    ],
    bestTime: 'Primavera (marzo-maggio) e autunno (ottobre-novembre). Evita l\'estate per il caldo nella medina.',
    howToArrive: 'Aeroporto Fès-Saïss (FEZ) o treno da Marrakech (7 ore) o Casablanca (4 ore).',
    tourPrices: {
      halfDay: '€35-50',
      fullDay: '€70-100'
    },
    highlights: [
      'Medina UNESCO più grande del mondo',
      'Concerie Chouara storiche',
      'Università Al Quaraouiyine',
      'Madrasa Bou Inania',
      'Souks artigianali',
      'Palazzo Reale'
    ],
    location: {
      distance: '280 km da Casablanca',
      coordinates: { lat: 34.0181, lng: -5.0078 }
    }
  },
  {
    id: 'meknes',
    name: 'Meknès',
    slug: 'meknes',
    tagline: 'La Versailles del Marocco',
    heroImage: '/images/meknes-hero.png',
    description: 'Meknès è una delle quattro città imperiali del Marocco, conosciuta come la "Versailles del Marocco" per i suoi grandiosi monumenti e palazzi. La città combina magnificenza imperiale con un\'atmosfera rilassata, offrendo un\'esperienza autentica lontano dalle folle turistiche. La sua medina, patrimonio UNESCO, racchiude tesori architettonici straordinari.',
    history: 'Fondata nell\'XI secolo, Meknès raggiunse il suo splendore sotto il sultano Moulay Ismail (1672-1727) che la trasformò in una capitale imperiale maestosa. Il sultano costruì oltre 50 km di mura, palazzi sontuosi e monumenti grandiosi, impiegando migliaia di schiavi e artigiani. La città conserva ancora oggi la grandiosità di quel periodo d\'oro.',
    attractions: [
      {
        title: 'Bab Mansour',
        description: 'La porta monumentale più bella del Marocco, capolavoro di architettura islamica con decorazioni in zellige e calligrafia araba',
        image: '/images/meknes-bab-mansour.png',
        duration: '30 min'
      },
      {
        title: 'Mausoleo Moulay Ismail',
        description: 'L\'unico mausoleo reale in Marocco accessibile ai non musulmani, con cortili eleganti e decorazioni raffinate',
        image: '/images/meknes-mausoleo.png',
        price: '€5',
        duration: '45 min'
      },
      {
        title: 'Rovine di Volubilis',
        description: 'Sito archeologico romano patrimonio UNESCO a 30 km da Meknès, con mosaici straordinari e rovine ben conservate',
        image: '/images/meknes-volubilis.png',
        price: '€7',
        duration: '2-3 ore'
      },
      {
        title: 'Medina e Souks',
        description: 'Medina autentica e meno turistica con souks tradizionali, artigiani locali e atmosfera rilassata',
        image: '/images/meknes-medina.png',
        duration: '2-3 ore'
      },
      {
        title: 'Heri es-Souani',
        description: 'Antichi granai e scuderie imperiali, testimonianza dell\'ambizione architettonica di Moulay Ismail',
        image: '/images/meknes-heri.png',
        price: '€3',
        duration: '1 ora'
      }
    ],
    bestTime: 'Primavera (marzo-maggio) e autunno (settembre-novembre) offrono temperature piacevoli. L\'inverno può essere freddo.',
    howToArrive: 'Treno da Fès (45 min), Rabat (2 ore) o Casablanca (3 ore). L\'aeroporto più vicino è Fès-Saïss (60 km).',
    tourPrices: {
      halfDay: '€30-45',
      fullDay: '€60-90',
      multiDay: '€150-250'
    },
    highlights: [
      'Bab Mansour monumentale',
      'Mausoleo Moulay Ismail',
      'Rovine romane Volubilis UNESCO',
      'Heri es-Souani granai imperiali',
      'Medina autentica',
      'Palazzo Reale Dar el-Makhzen'
    ],
    location: {
      distance: '60 km da Fès',
      coordinates: { lat: 33.8935, lng: -5.5473 }
    }
  },
  {
    id: 'rabat',
    name: 'Rabat',
    slug: 'rabat',
    tagline: 'La Capitale Moderna',
    heroImage: '/images/rabat-hero.png',
    description: 'Rabat è la capitale politica e amministrativa del Marocco, una città moderna ed elegante che combina armoniosamente tradizione e modernità. Meno caotica di Marrakech o Casablanca, offre monumenti storici straordinari, giardini curati, una bella corniche atlantica e un\'atmosfera sofisticata. La città è patrimonio UNESCO dal 2012.',
    history: 'Fondata nel XII secolo dagli Almohadi come ribat (fortezza), Rabat divenne capitale del Marocco nel 1912 sotto il Protettorato francese. La città conserva importanti monumenti di diverse epoche: la Torre Hassan e il Mausoleo Mohammed V testimoniano la grandezza almohade, mentre la Kasbah des Oudaias racconta secoli di storia andalusa e berbera.',
    attractions: [
      {
        title: 'Torre Hassan e Mausoleo Mohammed V',
        description: 'Minareto incompiuto del XII secolo e magnifico mausoleo in marmo bianco, simboli della città',
        image: '/images/rabat-hassan.png',
        duration: '1-2 ore'
      },
      {
        title: 'Kasbah des Oudaias',
        description: 'Fortezza del XII secolo con vicoli blu e bianchi, giardini andalusi e vista sull\'oceano',
        image: '/images/rabat-kasbah.png',
        duration: '2 ore'
      },
      {
        title: 'Chellah',
        description: 'Necropoli medievale su rovine romane, sito archeologico affascinante con giardini rigogliosi',
        image: '/images/rabat-chellah.png',
        price: '€7',
        duration: '1-2 ore'
      },
      {
        title: 'Medina di Rabat',
        description: 'Medina ordinata e pulita con souks tradizionali, rue des Consuls e artigianato locale',
        image: '/images/rabat-medina.png',
        duration: '2-3 ore'
      },
      {
        title: 'Giardini Esotici di Bouknadel',
        description: 'Splendidi giardini botanici con piante da tutto il mondo e atmosfera rilassante',
        image: '/images/rabat-giardini.png',
        price: '€5',
        duration: '1-2 ore'
      }
    ],
    bestTime: 'Tutto l\'anno. Primavera e autunno sono ideali, l\'estate è mite grazie all\'oceano.',
    howToArrive: 'Aeroporto Rabat-Salé (RBA) a 10 km. Treno da Casablanca (1 ora), Marrakech (4 ore), Tangeri (4,5 ore).',
    tourPrices: {
      halfDay: '€35-50',
      fullDay: '€70-100'
    },
    highlights: [
      'Torre Hassan e Mausoleo UNESCO',
      'Kasbah des Oudaias blu e bianca',
      'Chellah necropoli medievale',
      'Medina ordinata e moderna',
      'Corniche atlantica',
      'Palazzo Reale'
    ],
    location: {
      distance: '90 km da Casablanca',
      coordinates: { lat: 33.9716, lng: -6.8498 }
    }
  },
  {
    id: 'casablanca',
    name: 'Casablanca',
    slug: 'casablanca',
    tagline: 'La Metropoli Economica',
    heroImage: '/images/casablanca-hero.png',
    description: 'Casablanca è la capitale economica del Marocco, una metropoli moderna e dinamica affacciata sull\'Atlantico. Con oltre 4 milioni di abitanti, è il cuore finanziario e commerciale del paese. La città combina architettura art déco, modernità urbana e la maestosa Moschea Hassan II, terza moschea più grande del mondo.',
    history: 'Originariamente un piccolo porto berbero chiamato Anfa, Casablanca si sviluppò durante il Protettorato francese (1912-1956) diventando il principale porto del Marocco. L\'architettura art déco degli anni \'20-\'30 caratterizza ancora il centro, mentre la Moschea Hassan II (completata nel 1993) rappresenta il rinnovamento religioso e culturale del Marocco moderno.',
    attractions: [
      {
        title: 'Moschea Hassan II',
        description: 'Capolavoro architettonico sul mare, seconda moschea più alta del mondo con minareto di 210m',
        image: '/images/casablanca-hassan-ii.png',
        price: '€13',
        duration: '1-2 ore'
      },
      {
        title: 'Corniche Ain Diab',
        description: 'Lungomare moderno con beach club, ristoranti, locali notturni e spiagge urbane',
        image: '/images/casablanca-corniche.png',
        duration: '2-3 ore'
      },
      {
        title: 'Quartiere Art Déco',
        description: 'Centro storico con splendidi edifici coloniali art déco degli anni \'20-\'30',
        image: '/images/casablanca-art-deco.png',
        duration: '2 ore'
      },
      {
        title: 'Morocco Mall',
        description: 'Uno dei più grandi centri commerciali d\'Africa con acquario gigante e marchi internazionali',
        image: '/images/casablanca-mall.png',
        duration: '2-3 ore'
      },
      {
        title: 'Antica Medina',
        description: 'Piccola medina ricostruita nel XVIII secolo con souks, artigianato e atmosfera tradizionale',
        image: '/images/casablanca-medina.png',
        duration: '1-2 ore'
      },
      {
        title: 'Rick\'s Café',
        description: 'Ristorante ispirato al film "Casablanca", ricreazione fedele del café del film',
        image: '/images/casablanca-ricks.png',
        price: '€30-50',
        duration: '2 ore'
      }
    ],
    bestTime: 'Tutto l\'anno. Primavera e autunno ideali. Estate mite grazie alla brezza atlantica.',
    howToArrive: 'Aeroporto Mohammed V (CMN), principale hub internazionale del Marocco. Treno per il centro in 45 min.',
    tourPrices: {
      halfDay: '€40-60',
      fullDay: '€80-120'
    },
    highlights: [
      'Moschea Hassan II monumentale',
      'Architettura Art Déco',
      'Corniche Ain Diab',
      'Morocco Mall',
      'Rick\'s Café',
      'Vita notturna moderna'
    ],
    location: {
      distance: 'Centro città',
      coordinates: { lat: 33.5731, lng: -7.5898 }
    }
  },
  {
    id: 'essaouira',
    name: 'Essaouira',
    slug: 'essaouira',
    tagline: 'La Perla dell\'Atlantico',
    heroImage: '/images/essaouira-hero.png',
    description: 'Essaouira è una pittoresca città fortificata sulla costa atlantica, famosa per le sue mura bianche e blu, il porto peschereccio vivace e l\'atmosfera bohémien. Patrimonio UNESCO, è un paradiso per surfisti, artisti e amanti della tranquillità. La brezza costante rende il clima piacevole tutto l\'anno.',
    history: 'Fondata nel XVIII secolo dal sultano Sidi Mohammed ben Abdallah che incaricò l\'architetto francese Théodore Cornut di progettare una città-fortezza. Essaouira divenne un importante porto commerciale con una comunità ebraica fiorente. Negli anni \'60-\'70 attrasse musicisti come Jimi Hendrix, diventando rifugio di artisti. Oggi conserva il suo fascino autentico.',
    attractions: [
      {
        title: 'Medina di Essaouira',
        description: 'Medina fortificata patrimonio UNESCO con vicoli bianchi e blu, gallerie d\'arte e artigianato del legno di tuia',
        image: '/images/essaouira-medina.png',
        duration: '2-3 ore'
      },
      {
        title: 'Porto Peschereccio',
        description: 'Porto autentico con barche blu, gabbiani, pescatori e bancarelle di pesce fresco grigliato',
        image: '/images/essaouira-porto.png',
        duration: '1-2 ore'
      },
      {
        title: 'Bastioni e Skala',
        description: 'Fortificazioni del XVIII secolo con cannoni portoghesi affacciati sull\'oceano, panorami spettacolari',
        image: '/images/essaouira-bastioni.png',
        duration: '1 ora'
      },
      {
        title: 'Spiaggia di Essaouira',
        description: 'Lunga spiaggia perfetta per surf, kitesurf e passeggiate al tramonto con vento costante',
        image: '/images/essaouira-spiaggia.png',
        duration: 'Mezza giornata'
      },
      {
        title: 'Isola di Mogador',
        description: 'Riserva ornitologica al largo della costa, rifugio del falco di Eleonora (visibile solo dall\'esterno)',
        image: '/images/essaouira-mogador.png',
        duration: '30 min'
      }
    ],
    bestTime: 'Tutto l\'anno. Primavera per i festival musicali, estate per sport acquatici. Evita l\'inverno se sensibili al vento.',
    howToArrive: 'Voli diretti per aeroporto Essaouira-Mogador. In auto da Marrakech (2,5 ore) o Agadir (2,5 ore).',
    tourPrices: {
      halfDay: '€30-45',
      fullDay: '€60-90',
      multiDay: '€150-280'
    },
    highlights: [
      'Medina UNESCO bianca e blu',
      'Porto peschereccio autentico',
      'Bastioni storici Skala',
      'Surf e kitesurf',
      'Festival Gnaoua di musica',
      'Artigianato legno di tuia'
    ],
    location: {
      distance: '180 km da Marrakech',
      coordinates: { lat: 31.5125, lng: -9.7695 }
    }
  },
  {
    id: 'chefchaouen',
    name: 'Chefchaouen',
    slug: 'chefchaouen',
    tagline: 'La Città Blu',
    heroImage: '/images/chefchaouen-hero.png',
    description: 'Chefchaouen, la "Perla Blu" del Marocco, è una città magica incastonata nelle montagne del Rif. Famosa per i suoi edifici dipinti in infinite sfumature di blu, stradine acciottolate e atmosfera rilassata, è un paradiso per fotografi e viaggiatori in cerca di autenticità. L\'architettura andalusa e l\'artigianato locale completano il fascino unico di questa città.',
    history: 'Fondata nel 1471 da Moulay Ali Ben Moussa Ben Rached El Alami come fortezza contro le invasioni portoghesi, Chefchaouen accolse rifugiati musulmani ed ebrei dalla Spagna dopo la Reconquista. L\'influenza andalusa è evidente nell\'architettura. La tradizione di dipingere le case di blu risale agli anni \'30, quando la comunità ebraica introdusse questa usanza per ragioni religiose e pratiche.',
    attractions: [
      {
        title: 'Medina Blu',
        description: 'Labirinto incantevole di vicoli dipinti in infinite tonalità di blu, con porte colorate e angoli fotografici',
        image: '/images/chefchaouen-medina.png',
        duration: '3-4 ore'
      },
      {
        title: 'Kasbah e Museo',
        description: 'Fortezza del XV secolo nel cuore della medina con museo etnografico e giardini andalusi',
        image: '/images/chefchaouen-kasbah.png',
        price: '€5',
        duration: '1 ora'
      },
      {
        title: 'Cascata Ras el-Maa',
        description: 'Cascata ai margini della medina, luogo di ritrovo per locali e punto di partenza per escursioni',
        image: '/images/chefchaouen-cascata.png',
        duration: '30 min'
      },
      {
        title: 'Moschea Spagnola',
        description: 'Moschea abbandonata su una collina con vista panoramica spettacolare sulla città blu',
        image: '/images/chefchaouen-moschea.png',
        duration: '1-2 ore (con escursione)'
      },
      {
        title: 'Souks Artigianali',
        description: 'Mercati con tessuti berberi, ceramiche dipinte a mano, formaggio di capra e artigianato locale',
        image: '/images/chefchaouen-souks.png',
        duration: '1-2 ore'
      },
      {
        title: 'Parco Nazionale Talassemtane',
        description: 'Parco montano con trekking, foreste di cedri, sorgenti naturali e villaggio berbero di Akchour',
        image: '/images/chefchaouen-parco.png',
        duration: 'Giornata intera'
      }
    ],
    bestTime: 'Primavera (aprile-giugno) e autunno (settembre-ottobre). Estate calda ma piacevole. Inverno freddo in montagna.',
    howToArrive: 'In auto da Tangeri (2 ore), Fès (4 ore) o Tétouan (1 ora). Autobus da tutte le città principali.',
    tourPrices: {
      halfDay: '€25-40',
      fullDay: '€50-80',
      multiDay: '€180-300'
    },
    highlights: [
      'Medina blu Instagram-friendly',
      'Kasbah del XV secolo',
      'Vista dalla Moschea Spagnola',
      'Cascata Ras el-Maa',
      'Artigianato berbero',
      'Trekking montagne del Rif'
    ],
    location: {
      distance: '110 km da Tangeri',
      coordinates: { lat: 35.1689, lng: -5.2636 }
    }
  },
  {
    id: 'tangier',
    name: 'Tangeri',
    slug: 'tangier',
    tagline: 'La Porta d\'Africa',
    heroImage: '/images/tangier-hero.png',
    description: 'Tangeri, affacciata sullo Stretto di Gibilterra, è la porta tra Europa e Africa, un crocevia di culture che ha ispirato artisti e scrittori per secoli. La città combina fascino cosmopolita, storia stratificata e paesaggi mozzafiato. Oggi è una metropoli moderna in rapida crescita, con nuovi sviluppi e il più grande porto del Mediterraneo.',
    history: 'Città antichissima, Tangeri è stata sotto il controllo di fenici, romani, vandali, bizantini, arabi, portoghesi, spagnoli e britannici. Dal 1923 al 1956 fu Zona Internazionale, paradiso fiscale che attrasse artisti, spie e avventurieri come Paul Bowles, William Burroughs e Matisse. Questo periodo bohémien ha lasciato un\'eredità culturale unica che ancora permea la città.',
    attractions: [
      {
        title: 'Grotte di Ercole',
        description: 'Grotte naturali sul promontorio di Cap Spartel, con apertura a forma di Africa e leggende mitologiche',
        image: '/images/tangier-grotte.png',
        price: '€5',
        duration: '1-2 ore'
      },
      {
        title: 'Kasbah e Museo',
        description: 'Antica fortezza con Palazzo del Sultano, museo d\'arte marocchina e terrazza con vista sullo Stretto',
        image: '/images/tangier-kasbah.png',
        price: '€3',
        duration: '1-2 ore'
      },
      {
        title: 'Medina di Tangeri',
        description: 'Medina vivace con Petit Socco, Grande Socco, souks tradizionali e atmosfera cosmopolita',
        image: '/images/tangier-medina.png',
        duration: '2-3 ore'
      },
      {
        title: 'Cap Spartel',
        description: 'Promontorio all\'estremo nord-ovest dell\'Africa dove Atlantico e Mediterraneo si incontrano, con faro storico',
        image: '/images/tangier-cap-spartel.png',
        duration: '1 ora'
      },
      {
        title: 'Café Hafa',
        description: 'Caffè storico a picco sul mare, frequentato da artisti e scrittori, con vista spettacolare sullo Stretto',
        image: '/images/tangier-cafe-hafa.png',
        duration: '1 ora'
      },
      {
        title: 'Cinema Rif e Grand Socco',
        description: 'Cuore pulsante della città moderna, piazza vivace con architettura coloniale e vita locale',
        image: '/images/tangier-grand-socco.png',
        duration: '1 ora'
      }
    ],
    bestTime: 'Primavera (aprile-giugno) e autunno (settembre-novembre). Estate mite grazie alla posizione costiera.',
    howToArrive: 'Aeroporto Ibn Battouta (TNG) a 15 km. Ferry dalla Spagna (Tarifa 35 min, Algeciras 1,5 ore). Treno da Casablanca, Rabat.',
    tourPrices: {
      halfDay: '€35-50',
      fullDay: '€70-100',
      multiDay: '€180-320'
    },
    highlights: [
      'Grotte di Ercole mitologiche',
      'Kasbah e vista sullo Stretto',
      'Cap Spartel punto estremo',
      'Café Hafa storico',
      'Medina cosmopolita',
      'Storia internazionale unica'
    ],
    location: {
      distance: '14 km dalla Spagna (via mare)',
      coordinates: { lat: 35.7595, lng: -5.8340 }
    }
  },
  {
    id: 'agadir',
    name: 'Agadir',
    slug: 'agadir',
    tagline: 'La Riviera Marocchina',
    heroImage: '/images/agadir-hero.png',
    description: 'Agadir è la principale destinazione balneare del Marocco, con 300 giorni di sole all\'anno, una lunga spiaggia dorata e un\'atmosfera rilassata. Ricostruita dopo il devastante terremoto del 1960, è una città moderna con resort, golf, sport acquatici e vita notturna. Perfetta per chi cerca mare, relax e clima mite tutto l\'anno.',
    history: 'Fondata nel XVI secolo come porto fortificato portoghese, Agadir divenne importante centro commerciale. Il terribile terremoto del 29 febbraio 1960 distrusse completamente la città, causando 15.000 vittime. La città fu ricostruita 2 km più a sud con criteri antisismici moderni. L\'antica Kasbah in collina testimonia il passato pre-terremoto. Oggi Agadir è la capitale turistica del sud del Marocco.',
    attractions: [
      {
        title: 'Spiaggia di Agadir',
        description: 'Spiaggia urbana di 10 km con sabbia dorata, lungomare moderno, sport acquatici e stabilimenti balneari',
        image: '/images/agadir-spiaggia.png',
        duration: 'Giornata intera'
      },
      {
        title: 'Kasbah di Agadir Oufella',
        description: 'Rovine dell\'antica fortezza del 1540 su una collina, con vista panoramica mozzafiato sulla baia',
        image: '/images/agadir-kasbah.png',
        duration: '1-2 ore'
      },
      {
        title: 'Souk El Had',
        description: 'Enorme mercato coperto con 6.000 negozi, il più grande del Marocco, aperto il martedì-domenica',
        image: '/images/agadir-souk.png',
        duration: '2-3 ore'
      },
      {
        title: 'Vallee des Oiseaux',
        description: 'Giardino zoologico urbano con uccelli esotici, lama, cervi e spazi verdi rilassanti',
        image: '/images/agadir-vallee.png',
        duration: '1 ora'
      },
      {
        title: 'Marina di Agadir',
        description: 'Porto turistico moderno con ristoranti, boutique, passeggiate serali e yacht di lusso',
        image: '/images/agadir-marina.png',
        duration: '2 ore'
      },
      {
        title: 'Paradise Valley',
        description: 'Oasi naturale a 30 km dalla città con piscine naturali, palme e gole spettacolari',
        image: '/images/agadir-paradise-valley.png',
        duration: 'Mezza giornata'
      }
    ],
    bestTime: 'Tutto l\'anno grazie al clima mite. Inverno perfetto per sfuggire al freddo europeo (18-22°C).',
    howToArrive: 'Aeroporto Al Massira (AGA) a 25 km con voli da tutta Europa. In auto da Marrakech (3 ore) o Essaouira (2,5 ore).',
    tourPrices: {
      halfDay: '€30-50',
      fullDay: '€60-100',
      multiDay: '€200-400'
    },
    highlights: [
      'Spiaggia di 10 km',
      '300 giorni di sole',
      'Kasbah panoramica',
      'Souk El Had gigante',
      'Sport acquatici e golf',
      'Paradise Valley oasi'
    ],
    location: {
      distance: '240 km da Marrakech',
      coordinates: { lat: 30.4278, lng: -9.5981 }
    }
  }
]
