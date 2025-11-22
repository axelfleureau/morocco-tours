interface ErrorMessageProps {
  error: Error
  retry?: () => void
}

export function ErrorMessage({ error, retry }: ErrorMessageProps) {
  return (
    <div className="text-center py-12">
      <div className="mb-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
          <svg
            className="w-8 h-8 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Si è verificato un errore
        </h3>
        <p className="text-red-600 dark:text-red-400 mb-4">{error.message}</p>
      </div>
      {retry && (
        <button
          onClick={retry}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold"
        >
          Riprova
        </button>
      )}
    </div>
  )
}
