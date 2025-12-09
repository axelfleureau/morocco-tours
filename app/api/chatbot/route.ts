import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return null
  }
  return new OpenAI({ apiKey })
}

const SYSTEM_PROMPT = `Sei l'assistente virtuale di "Morocco Dreams", un'agenzia di viaggi specializzata in viaggi autentici in Marocco.

INFORMAZIONI AZIENDA:
- Nome: Morocco Dreams
- Specializzazione: Viaggi autentici e personalizzati in Marocco
- Servizi: Tour delle città imperiali, avventure nel deserto, esperienze costiere, montagne dell'Atlante
- Valori: Autenticità, sostenibilità, esperienze locali, rispetto della cultura

SERVIZI DISPONIBILI:
- Guide private locali
- Noleggio auto con autista
- Assicurazioni viaggio
- Trasferimenti aeroportuali
- Tour personalizzati
- Escursioni nel deserto del Sahara
- Visite alle città imperiali (Marrakech, Fez, Meknes, Rabat)
- Esperienze culinarie e artigianato locale

STILE COMUNICAZIONE:
- Caloroso e accogliente come l'ospitalità marocchina
- Professionale ma amichevole
- Usa emoji occasionalmente per essere più cordiale
- Parla sempre in italiano
- Sii entusiasta del Marocco e delle sue bellezze
- Offri suggerimenti personalizzati
- Se non conosci informazioni specifiche, suggerisci di contattare l'agenzia

RISPOSTE:
- Mantieni risposte concise ma informative
- Chiedi sempre come puoi aiutare ulteriormente
- Suggerisci servizi correlati quando appropriato
- Per prenotazioni, indirizza al contatto diretto con l'agenzia
- Condividi curiosità sul Marocco quando rilevanti

Rispondi sempre con passione e conoscenza del Marocco!`

export async function POST(request: NextRequest) {
  try {
    const openai = getOpenAIClient()
    
    if (!openai) {
      return NextResponse.json({ 
        response: "🔑 L'assistente AI non è attualmente configurato. " +
                 "Contatta il nostro team per assistenza immediata - siamo qui per aiutarti! 🇲🇦"
      })
    }

    const { message, conversation } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Messaggio richiesto' },
        { status: 400 }
      )
    }

    // Build conversation history for context
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversation.slice(-10).map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ]

    // Use GPT-4o-mini for cost efficiency
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Most cost-effective model for production
      messages: messages,
      max_tokens: 350, // Reduced for maximum cost savings
      temperature: 0.6, // Slightly more focused responses
    })

    const response = completion.choices[0]?.message?.content

    if (!response) {
      throw new Error('Nessuna risposta dal modello AI')
    }

    return NextResponse.json({ 
      response: response.trim()
    })

  } catch (error: any) {
    console.error('Chatbot API error:', error)
    
    // Detect specific OpenAI quota/billing errors
    const errorMessage = error?.message || error?.toString() || ''
    const errorCode = error?.code || error?.type || ''
    const isQuotaError = 
      errorCode === 'insufficient_quota' ||
      errorMessage.includes('quota') ||
      errorMessage.includes('billing') ||
      errorMessage.includes('exceeded') ||
      errorCode === 'rate_limit_exceeded'
    
    if (isQuotaError) {
      // Specific message for OpenAI quota/billing issues
      return NextResponse.json({ 
        response: "🔋 Al momento il nostro assistente AI ha esaurito il credito disponibile. " +
                 "Per ricevere assistenza immediata, contatta direttamente il nostro team Morocco Dreams! " +
                 "Siamo sempre pronti ad aiutarti a pianificare il tuo viaggio perfetto in Marocco. ✨"
      })
    }
    
    // Check for API key issues
    if (errorMessage.includes('API key') || errorCode === 'invalid_api_key') {
      return NextResponse.json({ 
        response: "🔑 C'è un problema tecnico con la configurazione. " +
                 "Contatta il nostro team per assistenza immediata - siamo qui per aiutarti! 🇲🇦"
      })
    }
    
    // Generic fallback responses for other errors
    const fallbackResponses = [
      "Mi dispiace, sto avendo problemi tecnici al momento. 🔧 Puoi contattarci direttamente per assistenza immediata!",
      "Ops! Sembra che ci sia un piccolo intoppo tecnico. 💻 I nostri esperti sono disponibili via email o telefono per aiutarti.",
      "Al momento non riesco a elaborare la tua richiesta. 🛠️ Ti consiglio di contattare il nostro team per assistenza personalizzata!"
    ]
    
    const randomFallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
    
    return NextResponse.json({ 
      response: randomFallback
    })
  }
}