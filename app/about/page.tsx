import { Users, Shield, Heart, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-24 lg:py-32 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Chi Siamo</h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto">
            La tua finestra sul Marocco autentico, dove ogni viaggio diventa un'esperienza indimenticabile
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 lg:mb-24">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">La Nostra Storia</h2>
              <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Morocco Dreams nasce dalla passione per questa terra magica e dal desiderio di condividere la sua
                bellezza autentica con viaggiatori di tutto il mondo. Fondata da esperti locali che conoscono ogni
                angolo del regno, offriamo esperienze genuine e rispettose delle tradizioni locali.
              </p>
              <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                La nostra missione è quella di creare ponti culturali attraverso viaggi responsabili, permettendo ai
                nostri ospiti di vivere il vero spirito marocchino attraverso incontri autentici con le comunità locali.
              </p>

              <div className="grid grid-cols-3 gap-6 lg:gap-8">
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-orange-600 mb-2">500+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Viaggiatori Felici</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-orange-600 mb-2">10</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Anni di Esperienza</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-orange-600 mb-2">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Tour Organizzati</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/moroccan-team.png"
                alt="Il nostro team"
                className="w-full h-80 lg:h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl lg:text-2xl font-bold mb-2">Il Nostro Team</h3>
                <p className="text-gray-200">Guide esperte e staff dedicato</p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16 lg:mb-24">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">I Nostri Valori</h2>
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Principi che guidano ogni nostro viaggio e ogni esperienza che creiamo
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                {
                  icon: Shield,
                  title: "Sicurezza",
                  description: "La sicurezza dei nostri viaggiatori è sempre la nostra priorità assoluta",
                },
                {
                  icon: Heart,
                  title: "Autenticità",
                  description: "Esperienze genuine che rispettano le tradizioni e la cultura locale",
                },
                {
                  icon: Users,
                  title: "Comunità",
                  description: "Supportiamo le comunità locali attraverso il turismo responsabile",
                },
                {
                  icon: Award,
                  title: "Eccellenza",
                  description: "Standard elevati in ogni aspetto del servizio che offriamo",
                },
              ].map((value, idx) => (
                <div
                  key={idx}
                  className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Il Nostro Team</h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Professionisti appassionati che rendono ogni viaggio speciale
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: "Ahmed El Fassi",
                role: "Fondatore & CEO",
                image: "/images/team-ahmed.png",
                description: "Guida esperta con 15 anni di esperienza nel turismo marocchino",
              },
              {
                name: "Fatima Benali",
                role: "Responsabile Esperienze",
                image: "/images/team-fatima.png",
                description: "Specialista in cultura berbera e tradizioni locali",
              },
              {
                name: "Youssef Alami",
                role: "Guida del Deserto",
                image: "/images/team-youssef.png",
                description: "Esperto del Sahara e delle rotte carovaniere tradizionali",
              },
            ].map((member, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={member.image || "/placeholder.svg?height=300&width=300&text=Team+Member"}
                  alt={member.name}
                  className="w-full h-56 lg:h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                  <p className="text-orange-600 dark:text-orange-400 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 lg:py-24 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Pronto per la Tua Avventura?</h2>
          <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
            Lascia che il nostro team di esperti crei per te un'esperienza indimenticabile nel cuore del Marocco
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contatti"
              className="bg-white text-orange-600 px-6 lg:px-8 py-3 lg:py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-base lg:text-lg"
            >
              Contattaci Ora
            </a>
            <a
              href="/viaggi/su-misura"
              className="border-2 border-white text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 font-semibold text-base lg:text-lg"
            >
              Pianifica il Tuo Viaggio
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
