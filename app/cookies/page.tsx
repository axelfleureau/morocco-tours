import ContactBanner from "@/components/cta/contact-banner"
import { Cookie, Settings, Info, Shield } from 'lucide-react'

export default function CookiesPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ContactBanner 
        title="Domande sui cookie?" 
        subtitle="Contattaci per informazioni su come gestiamo i cookie sul nostro sito." 
      />
      
      <div className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Cookie className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Cookie Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Questo sito utilizza cookie tecnici necessari per il funzionamento e, previo consenso, 
              cookie per analisi e personalizzazione dell'esperienza.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Ultimo aggiornamento: 15 gennaio 2024
            </div>
          </header>

          <div className="space-y-12">
            {/* What are cookies */}
            <section className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cosa sono i cookie</h2>
              </div>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti un sito web. 
                  Permettono al sito di riconoscerti e ricordare le tue preferenze per migliorare la tua esperienza di navigazione.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Cookie di prima parte</h3>
                    <p className="text-sm">Impostati direttamente dal nostro sito web per funzionalità essenziali</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Cookie di terze parti</h3>
                    <p className="text-sm">Impostati da servizi esterni come Google Analytics (solo con consenso)</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Types of cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tipologie di cookie utilizzati</h2>
              <div className="space-y-6">
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <h3 className="text-lg font-bold text-green-800 dark:text-green-300">Cookie Tecnici (Necessari)</h3>
                    <span className="px-2 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                      Sempre attivi
                    </span>
                  </div>
                  <p className="text-green-700 dark:text-green-400 mb-4">
                    Essenziali per il funzionamento del sito. Non richiedono consenso secondo la normativa europea.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Funzionalità</h4>
                      <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                        <li>• Gestione sessione utente</li>
                        <li>• Preferenze tema (chiaro/scuro)</li>
                        <li>• Lingua selezionata</li>
                        <li>• Sicurezza e prevenzione frodi</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Durata</h4>
                      <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                        <li>• Sessione: fino alla chiusura browser</li>
                        <li>• Persistenti: max 12 mesi</li>
                        <li>• Preferenze: fino a modifica utente</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300">Cookie Analitici</h3>
                    <span className="px-2 py-1 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                      Consenso richiesto
                    </span>
                  </div>
                  <p className="text-blue-700 dark:text-blue-400 mb-4">
                    Ci aiutano a capire come i visitatori interagiscono con il sito per migliorare l'esperienza utente.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Servizi utilizzati</h4>
                      <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                        <li>• Google Analytics 4 (anonimizzato)</li>
                        <li>• Statistiche di utilizzo</li>
                        <li>• Performance del sito</li>
                        <li>• Errori e problemi tecnici</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Dati raccolti</h4>
                      <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                        <li>• Pagine visitate (anonime)</li>
                        <li>• Tempo di permanenza</li>
                        <li>• Dispositivo e browser</li>
                        <li>• Paese di provenienza</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookie management */}
            <section className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Gestione delle preferenze</h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Sul nostro sito</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Puoi modificare le tue preferenze sui cookie in qualsiasi momento:
                    </p>
                    <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                      Gestisci Preferenze Cookie
                    </button>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Nel tuo browser</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Puoi anche gestire i cookie direttamente dalle impostazioni del browser:
                    </p>
                    <div className="space-y-2 text-xs">
                      <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-700">
                        → Chrome
                      </a>
                      <a href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-700">
                        → Firefox
                      </a>
                      <a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-700">
                        → Safari
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">⚠️ Importante</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    Disabilitando i cookie tecnici, alcune funzionalità del sito potrebbero non funzionare correttamente. 
                    I cookie analitici sono opzionali e non influenzano il funzionamento del sito.
                  </p>
                </div>
              </div>
            </section>

            {/* Third party services */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Servizi di terze parti</h2>
              <div className="space-y-4">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="/images/google-analytics-logo.png" alt="Google Analytics" className="w-6 h-6" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Google Analytics 4</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Finalità</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Analisi del traffico web per migliorare l'esperienza utente e ottimizzare i contenuti
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Privacy</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        IP anonimizzato, dati aggregati, conformità GDPR
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Per maggiori informazioni: 
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 ml-1">
                        Privacy Policy Google
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contatti</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Per domande sui cookie o sul trattamento dei dati:
              </p>
              <div className="space-y-2">
                <p className="text-gray-900 dark:text-white font-semibold">Morocco Dreams</p>
                <p className="text-gray-600 dark:text-gray-300">Email: privacy@moroccodreams.it</p>
                <p className="text-gray-600 dark:text-gray-300">Telefono: +39 329 233 3370</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
