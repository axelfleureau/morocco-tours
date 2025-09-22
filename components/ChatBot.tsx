"use client"

import React, { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react'
import { useNotifications } from './NotificationSystem'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatBot() {
  const { showError } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: '👋 Ciao! Sono l\'assistente virtuale di Morocco Dreams. Posso aiutarti con informazioni sui nostri viaggi, servizi, itinerari e tutto quello che vuoi sapere sul Marocco. Come posso aiutarti oggi?',
        timestamp: new Date()
      }])
    }
  }, [isOpen, messages.length])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input.trim(),
          conversation: messages
        }),
      })

      if (!response.ok) {
        throw new Error('Errore nella comunicazione con il chatbot')
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])

    } catch (error) {
      console.error('Chat error:', error)
      showError('Errore Chat', 'Si è verificato un errore. Riprova tra qualche minuto.')
      
      // Fallback response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '⚠️ Mi dispiace, sto avendo problemi tecnici. Puoi contattarci direttamente via email o telefono per assistenza immediata. I nostri recapiti sono nella sezione contatti del sito.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Apri chat assistenza"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-orange-500 text-white rounded-t-xl">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6" />
          <div>
            <h3 className="font-semibold">Assistente Morocco Dreams</h3>
            <p className="text-sm opacity-90">Sempre qui per te</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-orange-600 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
            )}
            
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className={`text-xs mt-1 opacity-70 ${
                message.role === 'user' ? 'text-orange-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString('it-IT', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>

            {message.role === 'user' && (
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Sto pensando...
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Scrivi il tuo messaggio..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none max-h-20 min-h-[40px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Premi Invio per inviare, Shift+Invio per andare a capo
        </p>
      </div>
    </div>
  )
}