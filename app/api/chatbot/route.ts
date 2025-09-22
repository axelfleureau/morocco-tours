import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY
})

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

    const completion = await openai.chat.completions.create({
      model: 'gpt-5', // the newest OpenAI model is "gpt-5" which was released August 7, 2025
      messages: messages,
      max_completion_tokens: 500,
    })

    const response = completion.choices[0]?.message?.content

    if (!response) {
      throw new Error('Nessuna risposta dal modello AI')
    }

    return NextResponse.json({ 
      response: response.trim()
    })

  } catch (error) {
    console.error('Chatbot API error:', error)
    
    // Fallback response
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