// Deprecated: This component is no longer needed.
// Google OAuth is now unified in AuthContext and available through useAuth hook.
// Use components/auth/SignIn.tsx instead.

export default function GoogleAuthButton() {
  return (
    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
      <p className="text-sm text-yellow-800 dark:text-yellow-300">
        Questo componente è deprecato. L'autenticazione Google è ora unificata nell'AuthContext.
      </p>
    </div>
  )
}