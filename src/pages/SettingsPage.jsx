import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useSettings } from '../contexts/SettingsContext'
import { t } from '../data/strings'
import LanguageToggle from '../components/LanguageToggle'

const SIZE_OPTIONS = [
  { value: 90,  key: 'settings_size_small' },
  { value: 100, key: 'settings_size_normal' },
  { value: 115, key: 'settings_size_large' },
  { value: 130, key: 'settings_size_xlarge' },
]

export default function SettingsPage() {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const { theme, setTheme, textScale, setTextScale } = useSettings()

  return (
    <div className="page">
      <div style={{ paddingTop: 20 }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', marginBottom: 14, padding: 0 }}
        >
          {t('settings_back', language)}
        </button>
        <h2 style={{ marginBottom: 20 }}>{t('settings_title', language)}</h2>
      </div>

      <h3>{t('settings_appearance', language)}</h3>
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: 1, marginBottom: 10, textTransform: 'uppercase' }}>
            {t('settings_theme', language)}
          </div>
          <div className="lang-toggle" style={{ width: '100%' }}>
            <button
              className={theme === 'light' ? 'active' : ''}
              onClick={() => setTheme('light')}
              style={{ flex: 1, padding: '10px 0' }}
            >
              ☀ {t('settings_theme_light', language)}
            </button>
            <button
              className={theme === 'dark' ? 'active' : ''}
              onClick={() => setTheme('dark')}
              style={{ flex: 1, padding: '10px 0' }}
            >
              ☾ {t('settings_theme_dark', language)}
            </button>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>
            {t('settings_text_size', language)}
          </div>
          <p style={{ fontSize: 12, marginBottom: 10 }}>{t('settings_text_size_hint', language)}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 6 }}>
            {SIZE_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setTextScale(opt.value)}
                style={{
                  padding: '12px 4px',
                  background: textScale === opt.value ? 'var(--accent)' : 'var(--bg2)',
                  border: `1.5px solid ${textScale === opt.value ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: 8,
                  color: textScale === opt.value ? '#fff' : 'var(--muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '.5px',
                  cursor: 'pointer',
                  transition: 'all .15s',
                }}
              >
                {t(opt.key, language)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <h3>{t('settings_language', language)}</h3>
      <div className="card">
        <LanguageToggle />
      </div>
    </div>
  )
}
