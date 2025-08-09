import { Phone, Mail, MessageCircle, Clock, Globe } from 'lucide-react'

export default function ContactsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-32 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contatti</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Siamo qui per aiutarti a pianificare il tuo viaggio perfetto in Marocco
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Come Contattarci</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
                Il nostro team è sempre disponibile per rispondere alle tue domande e aiutarti a creare l'esperienza di
                viaggio perfetta.
              </p>

              <div className="space-y-8">
                {[
                  {
                    icon: Phone,
                    title: "+39 329 233 3370",
                    subtitle: "Chiamaci dal Lunedì al Venerdì",
                    description: "9:00 - 18:00 (ora italiana)",
                    action: "tel:+393292333370",
                  },
                  {
                    icon: Mail,
                    title: "info@moroccodreams.it",
                    subtitle: "Rispondiamo entro 24 ore",
                    description: "Per preventivi e informazioni generali",
                    action: "mailto:info@moroccodreams.it",
                  },
                  {
                    icon: MessageCircle,
                    title: "WhatsApp +39 329 233 3370",
                    subtitle: "Assistenza 24/7",
                    description: "Risposta immediata per urgenze",
                    action: "https://wa.me/393292333370",
                  },
                ].map((contact, idx) => (
                  <a
                    key={idx}
                    href={contact.action}
                    target={contact.action.startsWith("http") ? "_blank" : undefined}
                    rel={contact.action.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-start space-x-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <contact.icon className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{contact.title}</h3>
                      <p className="text-orange-600 dark:text-orange-400 font-semibold mb-1">{contact.subtitle}</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{contact.description}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Office Hours */}
              <div className="mt-12 p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Orari di Apertura</h3>
                </div>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>Lunedì - Venerdì:</span>
                    <span className="font-semibold">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sabato:</span>
                    <span className="font-semibold">9:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domenica:</span>
                    <span className="font-semibold">Chiuso</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <Globe className="w-4 h-4 text-orange-600" />
                    <span className="text-sm">Assistenza WhatsApp 24/7 per emergenze</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Invia un Messaggio</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Compila il form e ti ricontatteremo entro 24 ore con tutte le informazioni di cui hai bisogno.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nome</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Il tuo nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cognome</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Il tuo cognome"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="la-tua-email@esempio.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Telefono</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="+39 329 233 3370"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tipo di viaggio
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                    <option value="">Seleziona il tipo di viaggio</option>
                    <option value="gruppo">Viaggio di Gruppo</option>
                    <option value="misura">Viaggio su Misura</option>
                    <option value="deserto">Tour del Deserto</option>
                    <option value="citta">Città Imperiali</option>
                    <option value="esperienze">Esperienze Speciali</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Messaggio</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                    placeholder="Raccontaci il tuo sogno di viaggio in Marocco..."
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600 dark:text-gray-300">
                    Accetto la{" "}
                    <a href="/privacy" className="text-orange-600 hover:text-orange-700 underline">
                      Privacy Policy
                    </a>{" "}
                    e autorizzo il trattamento dei miei dati personali per ricevere informazioni sui viaggi.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-lg"
                >
                  Invia Messaggio
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  Preferisci parlare direttamente con noi?
                </p>
                <div className="flex justify-center mt-4">
                  <a
                    href="https://wa.me/393292333370?text=Ciao! Vorrei informazioni sui vostri viaggi in Marocco."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors duration-300 font-semibold"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Scrivici su WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Domande Frequenti</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Le risposte alle domande più comuni sui nostri servizi
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Quanto tempo prima devo prenotare?",
                answer:
                  "Consigliamo di prenotare almeno 30 giorni prima della partenza per i viaggi di gruppo e 45-60 giorni per i viaggi su misura, specialmente durante l'alta stagione.",
              },
              {
                question: "Cosa include il prezzo del viaggio?",
                answer:
                  "I nostri prezzi includono alloggi, trasporti privati in Marocco, guide locali, alcune attività e assistenza 24/7. Non includono voli internazionali, pasti non specificati e spese personali.",
              },
              {
                question: "Posso modificare o cancellare la prenotazione?",
                answer:
                  "Sì, offriamo condizioni flessibili. Le modifiche sono possibili fino a 15 giorni prima della partenza. Per le cancellazioni, si applicano le nostre condizioni generali disponibili nei Termini di Servizio.",
              },
              {
                question: "Che tipo di assistenza fornite durante il viaggio?",
                answer:
                  "Forniamo assistenza 24/7 tramite WhatsApp, guide locali esperte che parlano italiano, e un referente in Italia sempre disponibile per qualsiasi necessità.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
