import ContactBanner from "@/components/cta/contact-banner"
import { FileText, AlertTriangle, CreditCard, Shield } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ContactBanner 
        title="Domande sui termini di servizio?" 
        subtitle="Contattaci per chiarimenti sui nostri termini e condizioni." 
      />
      
      <div className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Termini di Servizio
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              I presenti termini regolano l'uso del sito web e i servizi di viaggio offerti da Morocco Dreams.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Ultimo aggiornamento: 15 gennaio 2024
            </div>
          </header>

          <div className="space-y-12">
            {/* General Terms */}
            <section className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Termini generali</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Utilizzando il sito web moroccodreams.it e i nostri servizi, accetti automaticamente 
                  i presenti termini e condizioni. Se non sei d'accordo con questi termini, 
                  ti preghiamo di non utilizzare i nostri servizi.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Chi siamo</h3>
                    <p className="text-sm">
                      Morocco Dreams è un tour operator specializzato in viaggi autentici in Marocco, 
                      con sede operativa in Italia e partner locali certificati.
                    </p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">I nostri servizi</h3>
                    <p className="text-sm">
                      Organizziamo viaggi su misura, tour di gruppo, esperienze culturali e 
                      servizi di assistenza turistica in Marocco.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Bookings and Payments */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Prenotazioni e pagamenti</h2>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-4">Processo di prenotazione</h3>
                  <div className="space-y-3 text-green-700 dark:text-green-400">
                    <div className="flex gap-3">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                      <p className="text-sm">Richiesta preventivo gratuito tramite form o WhatsApp</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                      <p className="text-sm">Invio proposta personalizzata entro 24-48 ore</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                      <p className="text-sm">Conferma prenotazione con acconto del 30%</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                      <p className="text-sm">Saldo finale 30 giorni prima della partenza</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Modalità di pagamento</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                      <li>• Bonifico bancario (preferito)</li>
                      <li>• Carta di credito/debito</li>
                      <li>• PayPal per importi fino a €1.000</li>
                      <li>• Contanti solo per servizi locali</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Cosa include il prezzo</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                      <li>• Alloggi selezionati</li>
                      <li>• Trasporti privati in Marocco</li>
                      <li>• Guide locali certificate</li>
                      <li>• Assistenza 24/7 durante il viaggio</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Cancellations */}
            <section className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Modifiche e cancellazioni</h2>
              </div>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Modifiche al viaggio</h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <p><strong>Fino a 30 giorni:</strong> Modifiche gratuite</p>
                      <p><strong>15-29 giorni:</strong> Penale 10% del totale</p>
                      <p><strong>7-14 giorni:</strong> Penale 25% del totale</p>
                      <p><strong>Meno di 7 giorni:</strong> Modifiche soggette a disponibilità</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Cancellazioni</h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <p><strong>Oltre 45 giorni:</strong> Rimborso 90%</p>
                      <p><strong>30-44 giorni:</strong> Rimborso 75%</p>
                      <p><strong>15-29 giorni:</strong> Rimborso 50%</p>
                      <p><strong>Meno di 15 giorni:</strong> Nessun rimborso</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">💡 Consiglio</h4>
                  <p className="text-sm text-orange-700 dark:text-orange-400">
                    Ti consigliamo vivamente di sottoscrivere un'assicurazione di viaggio che copra 
                    cancellazioni per motivi di salute, lavoro o altre emergenze impreviste.
                  </p>
                </div>
              </div>
            </section>

            {/* Responsibilities */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Responsabilità e limitazioni</h2>
              </div>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-3">Le nostre responsabilità</h3>
                    <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-2">
                      <li>• Organizzazione professionale del viaggio</li>
                      <li>• Selezione di partner locali affidabili</li>
                      <li>• Assistenza durante tutto il soggiorno</li>
                      <li>• Rispetto degli standard di qualità promessi</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-3">Limitazioni</h3>
                    <ul className="text-sm text-orange-700 dark:text-orange-400 space-y-2">
                      <li>• Eventi di forza maggiore (meteo, scioperi)</li>
                      <li>• Modifiche imposte da autorità locali</li>
                      <li>• Comportamenti inappropriati dei viaggiatori</li>
                      <li>• Danni a proprietà di terzi</li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-300 mb-4">Forza maggiore</h3>
                  <p className="text-yellow-700 dark:text-yellow-400 text-sm mb-4">
                    Non siamo responsabili per ritardi, modifiche o cancellazioni causati da eventi 
                    al di fuori del nostro controllo, inclusi ma non limitati a:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm text-yellow-700 dark:text-yellow-400">
                    <ul className="space-y-1">
                      <li>• Condizioni meteorologiche estreme</li>
                      <li>• Scioperi e manifestazioni</li>
                      <li>• Emergenze sanitarie</li>
                    </ul>
                    <ul className="space-y-1">
                      <li>• Chiusure governative</li>
                      <li>• Disastri naturali</li>
                      <li>• Problemi di sicurezza nazionale</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Travel Requirements */}
            <section className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Requisiti di viaggio</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  È responsabilità del viaggiatore assicurarsi di avere tutti i documenti necessari 
                  e di rispettare i requisiti sanitari del paese di destinazione.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Documenti richiesti</h3>
                    <ul className="text-sm space-y-2">
                      <li>• Passaporto valido (min. 6 mesi)</li>
                      <li>• Visto (se richiesto per la nazionalità)</li>
                      <li>• Certificati sanitari (se applicabili)</li>
                      <li>• Assicurazione di viaggio (consigliata)</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Comportamento</h3>
                    <ul className="text-sm space-y-2">
                      <li>• Rispetto delle leggi locali</li>
                      <li>• Comportamento rispettoso verso la cultura</li>
                      <li>• Seguire le indicazioni delle guide</li>
                      <li>• Rispetto degli altri viaggiatori</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Disputes */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Risoluzione delle controversie</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  In caso di problemi o controversie, ci impegniamo a risolverli in modo amichevole 
                  e professionale attraverso il dialogo diretto.
                </p>
                <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                  <h3 className="text-lg font-bold text-orange-800 dark:text-orange-300 mb-4">Procedura di reclamo</h3>
                  <div className="space-y-3 text-orange-700 dark:text-orange-400">
                    <div className="flex gap-3">
                      <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                      <p className="text-sm">Contatta immediatamente la nostra assistenza durante il viaggio</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                      <p className="text-sm">Invia reclamo scritto entro 10 giorni dal rientro</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                      <p className="text-sm">Riceverai risposta entro 30 giorni lavorativi</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm">
                  Per controversie non risolte amichevolmente, è competente il Foro di Milano. 
                  Si applica la legge italiana per tutti i contratti.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contatti</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Per domande sui termini di servizio o chiarimenti contrattuali:
              </p>
              <div className="space-y-2">
                <p className="text-gray-900 dark:text-white font-semibold">Morocco Dreams</p>
                <p className="text-gray-600 dark:text-gray-300">Email: info@moroccodreams.it</p>
                <p className="text-gray-600 dark:text-gray-300">Telefono: +39 329 233 3370</p>
                <p className="text-gray-600 dark:text-gray-300">WhatsApp: +39 329 233 3370</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
