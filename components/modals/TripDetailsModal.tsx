"use client"
import { X, Clock, Users, Star, Check, Phone, Mail } from "lucide-react"
import Link from "next/link"

interface TripDetailsModalProps {
  trip: any
  isOpen: boolean
  onClose: () => void
}

export default function TripDetailsModal({ trip, isOpen, onClose }: TripDetailsModalProps) {
  if (!isOpen || !trip) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl w-full max-h-[92vh] overflow-y-auto">
        <div className="relative">
          <img
            src={
              trip.image ||
              `/placeholder.svg?height=300&width=800&query=${encodeURIComponent(trip.title + " marocco viaggio")}`
            }
            alt={trip.title}
            className="w-full h-48 sm:h-64 object-cover rounded-t-2xl sm:rounded-t-3xl"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors touch-manipulation"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" />
          </button>
          {trip.badge && (
            <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white dark:bg-orange-900/40 dark:text-orange-200 shadow-sm transition-colors">
                {trip.badge}
              </span>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 sm:mb-6">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-balance">
                {trip.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 text-pretty">
                {trip.subtitle || trip.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{trip.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{trip.groupSize || trip.maxParticipants || "2-12 persone"}</span>
                </div>
                {trip.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                    <span>
                      {trip.rating} ({trip.reviews} recensioni)
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600">{trip.price}</div>
              {trip.originalPrice && (
                <div className="text-base sm:text-lg text-gray-500 line-through">{trip.originalPrice}</div>
              )}
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">per persona</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
              {/* Detailed Description */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Descrizione Completa
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base text-pretty">
                  {trip.detailedDescription || trip.description}
                </p>
              </div>

              {/* Highlights */}
              {trip.highlights && (
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    Punti Salienti
                  </h3>
                  <div className="grid gap-2 sm:gap-3">
                    {trip.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Itinerary */}
              {trip.itinerary && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Itinerario Dettagliato</h3>
                  <div className="space-y-4">
                    {trip.itinerary.map((day: any, index: number) => (
                      <div key={index} className="flex space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{day.title}</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{day.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What's Included/Not Included */}
              {(trip.includes || trip.included) && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-4">✅ Incluso</h3>
                    <ul className="space-y-2">
                      {(trip.includes || trip.included).map((item: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start space-x-2 text-sm text-green-700 dark:text-green-400"
                        >
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {(trip.notIncludes || trip.notIncluded) && (
                    <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-red-800 dark:text-red-300 mb-4">❌ Non Incluso</h3>
                      <ul className="space-y-2">
                        {(trip.notIncludes || trip.notIncluded).map((item: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2 text-sm text-red-700 dark:text-red-400">
                            <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Info */}
              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-orange-800 dark:text-orange-300 mb-4">Informazioni Prenotazione</h3>
                <div className="space-y-3 text-sm">
                  {trip.nextDeparture && (
                    <div>
                      <span className="font-medium text-blue-700 dark:text-blue-400">Prossima Partenza:</span>
                      <p className="text-blue-600 dark:text-blue-300">{trip.nextDeparture}</p>
                    </div>
                  )}
                  {trip.spotsLeft && (
                    <div>
                      <span className="font-medium text-blue-700 dark:text-blue-400">Posti Disponibili:</span>
                      <p className="text-blue-600 dark:text-blue-300">{trip.spotsLeft} posti rimasti</p>
                    </div>
                  )}
                  {trip.meetingPoint && (
                    <div>
                      <span className="font-medium text-blue-700 dark:text-blue-400">Punto di Ritrovo:</span>
                      <p className="text-blue-600 dark:text-blue-300">{trip.meetingPoint}</p>
                    </div>
                  )}
                  {trip.cancellationPolicy && (
                    <div>
                      <span className="font-medium text-blue-700 dark:text-blue-400">Cancellazione:</span>
                      <p className="text-blue-600 dark:text-blue-300">{trip.cancellationPolicy}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-orange-800 dark:text-orange-300 mb-4">Hai Domande?</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+393292333370"
                    className="flex items-center space-x-2 text-orange-700 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+39 329 233 3370</span>
                  </a>
                  <a
                    href="mailto:info@moroccodreams.it"
                    className="flex items-center space-x-2 text-orange-700 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300"
                  >
                    <Mail className="w-4 h-4" />
                    <span>info@moroccodreams.it</span>
                  </a>
                  <a
                    href="https://wa.me/393292333370"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                  >
                    <span>💬</span>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  href="/contatti"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-sm sm:text-base lg:text-lg text-center block transform hover:scale-105 active:scale-95 touch-manipulation"
                >
                  Prenota Ora - {trip.price}
                </Link>
                <Link
                  href="/contatti"
                  className="w-full border-2 border-orange-500 text-orange-500 dark:text-orange-400 py-2 sm:py-3 px-4 sm:px-6 rounded-xl hover:bg-orange-500 hover:text-white dark:hover:text-white transition-all duration-300 font-semibold text-sm sm:text-base text-center block transform hover:scale-105 active:scale-95 touch-manipulation"
                >
                  Richiedi Informazioni
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
