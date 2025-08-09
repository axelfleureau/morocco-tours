import ContactBanner from "@/components/cta/contact-banner"
import { Shield, Eye, Lock, FileText } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ContactBanner 
        title="Hai domande sulla privacy?" 
        subtitle="Contattaci per qualsiasi chiarimento sui tuoi dati personali." 
      />
      
      <div className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              La tua privacy è importante per noi. Questa informativa descrive come raccogliamo, 
              utilizziamo e proteggiamo i tuoi dati personali.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Ultimo aggiornamento: 15 gennaio 2024
            </div>
          </header>

          <div className="space-y-12">
            {/* Data Collection */}
            <section className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dati che raccogliamo</h2>
              </div>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Raccogliamo esclusivamente i dati che ci fornisci volontariamente attraverso:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Moduli di contatto:</strong> nome, cognome, email, telefono, messaggio</li>
                  <li><strong>Newsletter:</strong> indirizzo email per invio contenuti informativi</li>
                  <li><strong>Prenotazioni:</strong> dati necessari per organizzare il viaggio</li>
                  <li><strong>Cookie tecnici:</strong> per il funzionamento del sito (vedi Cookie Policy)</li>
                </ul>
                <p className="text-sm bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                  <strong>Non raccogliamo mai:</strong> dati sensibili, informazioni finanziarie complete, 
                  dati di navigazione per profilazione commerciale.
                </p>
              </div>
            </section>

            {/* Data Usage */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Come utilizziamo i tuoi dati</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <h3 className="font-bold text-green-800 dark:text-green-300 mb-3">Finalità principali</h3>
                  <ul className="text-green-700 dark:text-green-400 text-sm space-y-2">
                    <li>• Rispondere alle richieste di contatto</li>
                    <li>• Fornire preventivi personalizzati</li>
                    <li>• Organizzare viaggi e esperienze</li>
                    <li>• Assistenza clienti durante il viaggio</li>
                  </ul>
                </div>
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3">Comunicazioni</h3>
                  <ul className="text-blue-700 dark:text-blue-400 text-sm space-y-2">
                    <li>• Newsletter con consigli di viaggio</li>
                    <li>• Aggiornamenti sui servizi</li>
                    <li>• Offerte speciali (solo se richieste)</li>
                    <li>• Comunicazioni di servizio importanti</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Protection */}
            <section className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Come proteggiamo i tuoi dati</h2>
              </div>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Implementiamo misure di sicurezza tecniche e organizzative appropriate per proteggere 
                  i tuoi dati personali:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Sicurezza tecnica</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Crittografia SSL/TLS</li>
                      <li>• Server sicuri in Europa</li>
                      <li>• Backup regolari</li>
                      <li>• Accesso limitato ai dati</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Sicurezza organizzativa</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Formazione del personale</li>
                      <li>• Procedure di sicurezza</li>
                      <li>• Controlli di accesso</li>
                      <li>• Audit periodici</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* User Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">I tuoi diritti</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Accesso",
                    description: "Puoi richiedere una copia di tutti i dati personali che abbiamo su di te"
                  },
                  {
                    title: "Rettifica",
                    description: "Puoi chiedere di correggere dati inesatti o incompleti"
                  },
                  {
                    title: "Cancellazione",
                    description: "Puoi richiedere la cancellazione dei tuoi dati (diritto all'oblio)"
                  },
                  {
                    title: "Limitazione",
                    description: "Puoi chiedere di limitare il trattamento in determinate circostanze"
                  },
                  {
                    title: "Portabilità",
                    description: "Puoi ottenere i tuoi dati in formato strutturato e leggibile"
                  },
                  {
                    title: "Opposizione",
                    description: "Puoi opporti al trattamento per finalità di marketing diretto"
                  }
                ].map((right, index) => (
                  <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{right.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{right.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-yellow-800 dark:text-yellow-300 text-sm">
                  <strong>Come esercitare i tuoi diritti:</strong> Invia una richiesta a{" "}
                  <a href="mailto:privacy@moroccodreams.it" className="underline hover:text-yellow-900 dark:hover:text-yellow-200">
                    privacy@moroccodreams.it
                  </a>{" "}
                  specificando il diritto che vuoi esercitare. Risponderemo entro 30 giorni.
                </p>
              </div>
            </section>

            {/* Data Retention */}
            <section className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Conservazione dei dati</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>Conserviamo i tuoi dati personali solo per il tempo necessario alle finalità per cui sono stati raccolti:</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Richieste di contatto</h4>
                    <p className="text-sm">24 mesi dalla risposta o fino alla conclusione del rapporto commerciale</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Newsletter</h4>
                    <p className="text-sm">Fino alla disiscrizione o richiesta di cancellazione</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Clienti</h4>
                    <p className="text-sm">10 anni per obblighi fiscali, poi cancellazione automatica</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cookie tecnici</h4>
                    <p className="text-sm">Durata della sessione o secondo le impostazioni del browser</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contatti per la privacy</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Per qualsiasi domanda riguardante questa Privacy Policy o il trattamento dei tuoi dati personali:
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
