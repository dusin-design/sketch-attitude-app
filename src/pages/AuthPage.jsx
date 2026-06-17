import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../data/strings'
import LanguageToggle from '../components/LanguageToggle'

export default function AuthPage() {
  const { signIn, signUp, signInWithGoogle } = useAuth()
  const { language } = useLanguage()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    if (mode === 'login') {
      const { error } = await signIn(email, password)
      if (error) setError(error.message)
    } else {
      const { error } = await signUp(email, password)
      if (error) setError(error.message)
      else setMessage(t('auth_check_email', language))
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      background: 'var(--bg)',
      position: 'relative',
      zIndex: 1,
    }}>
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <LanguageToggle />
      </div>

      <div style={{ width: '100%', maxWidth: 380 }}>

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, lineHeight: .9, color: 'var(--text)' }}>
            SKETCH<br /><span style={{ color: 'var(--accent)' }}>ATTITUDE</span>
          </div>
          <p style={{ marginTop: 8, fontSize: 13 }}>
            {t('tagline', language)}
          </p>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginBottom: 20 }}>
            {mode === 'login' ? t('auth_welcome_back', language) : t('auth_create_account', language)}
          </h3>

          <button
            className="btn btn-outline btn-full"
            onClick={signInWithGoogle}
            style={{ marginBottom: 16, gap: 8 }}
          >
            <GoogleIcon />
            {t('auth_continue_google', language)}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>{t('auth_or', language)}</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>{t('auth_email', language)}</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('auth_email_placeholder', language)}
                required
                autoComplete="email"
              />
            </div>
            <div className="field">
              <label>{t('auth_password', language)}</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                minLength={6}
              />
            </div>

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, padding: '8px 12px', marginBottom: 12 }}>
                <p style={{ fontSize: 13, color: 'var(--accent2)', margin: 0 }}>{error}</p>
              </div>
            )}
            {message && (
              <div style={{ background: '#f0f9e0', border: '1px solid #8ac840', borderRadius: 8, padding: '8px 12px', marginBottom: 12 }}>
                <p style={{ fontSize: 13, color: '#4a7c10', margin: 0 }}>{message}</p>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
              style={{ marginTop: 4 }}
            >
              {loading ? t('auth_loading', language) : mode === 'login' ? t('auth_sign_in', language) : t('auth_create_account', language)}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 13 }}>
          {mode === 'login' ? t('auth_no_account', language) : t('auth_has_account', language)}
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setMessage('') }}
            style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700 }}
          >
            {mode === 'login' ? t('auth_sign_up', language) : t('auth_sign_in_link', language)}
          </button>
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}
