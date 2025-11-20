export interface UrlValidationResult {
  valid: boolean
  error?: string
}

/**
 * Valida un URL e ritorna un risultato strutturato con feedback user-friendly
 * 
 * @param url - L'URL da validare
 * @param required - Se l'URL è richiesto (default: true)
 * @returns UrlValidationResult con valid e opzionale messaggio di errore
 */
export function validateUrl(url: string, required: boolean = true): UrlValidationResult {
  if (!url || url.trim() === '') {
    if (required) {
      return { valid: false, error: 'L\'URL è richiesto' }
    }
    return { valid: true }
  }

  const trimmedUrl = url.trim()

  if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
    return { 
      valid: false, 
      error: 'L\'URL deve iniziare con http:// o https://' 
    }
  }

  try {
    const urlObj = new URL(trimmedUrl)
    
    if (!urlObj.protocol || (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:')) {
      return {
        valid: false,
        error: 'Protocollo non valido. Usa http:// o https://'
      }
    }

    if (!urlObj.hostname || urlObj.hostname === '') {
      return {
        valid: false,
        error: 'L\'URL non contiene un dominio valido'
      }
    }

    const hostnameParts = urlObj.hostname.split('.')
    if (hostnameParts.length < 2 || hostnameParts.some(part => part === '')) {
      return {
        valid: false,
        error: 'Il dominio dell\'URL non è valido (es: esempio.com)'
      }
    }

    return { valid: true }
  } catch (error) {
    return {
      valid: false,
      error: 'URL malformato. Esempio valido: https://esempio.com/percorso'
    }
  }
}

/**
 * Hook per usare la validazione URL in tempo reale nei form
 */
export function useUrlValidation() {
  const validateField = (url: string, required: boolean = true) => {
    return validateUrl(url, required)
  }

  const getFieldProps = (url: string, required: boolean = true) => {
    const validation = validateUrl(url, required)
    return {
      isValid: validation.valid,
      error: validation.error,
      className: validation.valid 
        ? 'border-border' 
        : 'border-red-500 dark:border-red-400'
    }
  }

  return { validateField, getFieldProps }
}
