"use client"

import { useState } from "react"
import { X, Clock, Users, MapPin, Star, Check, Droplets, Heart, Phone, Mail } from 'lucide-react'
import Link from "next/link"

interface ExperienceDetailsModalProps {
  experience: any
  isOpen: boolean
  onClose: () => void
}

export default function ExperienceDetailsModal({ experience, isOpen, onClose }: ExperienceDetailsModalProps) {
  if (!isOpen || !experience) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={experience.image || "/placeholder.svg?height=300&width=800"}
            alt={experience.title || experience.name}
            className="w-full h-64 object-cover rounded-t-3xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <X className="w-5 h-5 text-gray-900" />
          </button>
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="font-bold text-lg text-gray-900">{experience.price}</span>
          </div>
        </div>

        <div className="p-6 lg:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {experience.title || experience.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
                {experience.subtitle || experience.description}
              </p>
              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{experience.duration}</span>
                </div>
                {experience.maxParticipants && (
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>Max {experience.maxParticipants}</span>
                  </div>
                )}
                {experience.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{experience.rating} ({experience.reviews} recensioni)</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-pink-600">{experience.price}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">per persona</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Detailed Description */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Descrizione Completa</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {experience.detailedDescription || experience.description}
                </p>
              </div>

              {/* What's Included */}
              {experience.includes && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Cosa Include</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {experience.includes.map((item: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {experience.benefits && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Benefici</h3>
                  <div className="flex flex-wrap gap-3">
                    {experience.benefits.map((benefit: string, index: number) => (
                      <span
                        key={index}
                        className="bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Steps/Process */}
              {experience.steps && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Il Processo</h3>
                  <div className="space-y-4">
                    {experience.steps.map((step: any, index: number) => (
                      <div key={index} className="flex space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <div className="flex-shrink-0 w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
                          {step.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{step.title}</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{step.description}</p>
                          <div className="flex items-center space-x-2 text-xs text-pink-600 dark:text-pink-400 mt-2">
                            <Clock className="w-3 h-3" />
                            <span>{step.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dishes (for cooking classes) */}
              {experience.dishes && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Piatti che Imparerai</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {experience.dishes.map((dish: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-2xl">👨‍🍳</span>
                        <span className="text-gray-600 dark:text-gray-300">{dish}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Experience Info */}
              <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-pink-800 dark:text-pink-300 mb-4">Dettagli Esperienza</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-pink-700 dark:text-pink-400">Durata:</span>
                    <p className="text-pink-600 dark:text-pink-300">{experience.duration}</p>
                  </div>
                  {experience.level && (
                    <div>
                      <span className="font-medium text-pink-700 dark:text-pink-400">Livello:</span>
                      <p className="text-pink-600 dark:text-pink-300">{experience.level}</p>
                    </div>
                  )}
                  {experience.maxParticipants && (
                    <div>
                      <span className="font-medium text-pink-700 dark:text-pink-400">Partecipanti:</span>
                      <p className="text-pink-600 dark:text-pink-300">Max {experience.maxParticipants} persone</p>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-pink-700 dark:text-pink-400">Disponibilità:</span>
                    <p className="text-pink-600 dark:text-pink-300">Tutti i giorni su prenotazione</p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-orange-800 dark:text-orange-300 mb-4">Prenota Ora</h3>
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
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-6 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-semibold text-lg text-center block"
                >
                  Prenota - {experience.price}
                </Link>
                <Link
                  href="/contatti"
                  className="w-full border-2 border-pink-500 text-pink-500 py-3 px-6 rounded-xl hover:bg-pink-500 hover:text-white transition-all duration-300 font-semibold text-center block"
                >
                  Maggiori Informazioni
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
