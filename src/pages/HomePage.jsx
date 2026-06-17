import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../data/strings'
import { QUOTES, PHASES, localize } from '../data/content'
import LanguageToggle from '../components/LanguageToggle'

export default function HomePage() {
  const { user, signOut } = useAuth()
  const { language } = useLanguage()
  const { completedDaysCount, progressPct, streak, currentDay } = useProgress(user?.id)
  const navigate = useNavigate()

  const todayPhase = PHASES.find(p => p.days.includes(currentDay)) ?? PHASES[0]
  const quote = QUOTES[new Date().getDay() % QUOTES.length]

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 24 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 4 }}>
            {t('auth_eyebrow', language)}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, lineHeight: .9 }}>
            SKETCH<br /><span style={{ color: 'var(--accent)' }}>ATTITUDE</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, marginTop: 6 }}>
          <LanguageToggle />
          <button
            onClick={signOut}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}
          >
            {t('home_sign_out', language)}
          </button>
        </div>
      </div>

      <hr className="divider" style={{ marginTop: 20 }} />

      <h3>{t('home_motivation', language)}</h3>
      <div className="moto-card">
        <div className="moto-text">"{localize(quote, language)}"</div>
      </div>

      <h3>{t('home_progress', language)}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        <StatCard value={streak} label={t('home_day_streak', language)} />
        <StatCard value={`${progressPct}%`} label={t('home_plan_pct', language)} />
        <StatCard value={completedDaysCount} label={t('home_days_done', language)} />
        <StatCard value={currentDay} label={t('home_current_day', language)} />
      </div>

      <div className="card card-accent">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <h3 style={{ marginBottom: 2 }}>{t('home_mission', language)}</h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text)', fontWeight: 700 }}>
              {t('home_day_label', language)} {currentDay} — {localize(todayPhase.label, language)}
            </div>
          </div>
          <span className="tag tag-yellow">{todayPhase.mins} {t('min_suffix', language)}</span>
        </div>
        <p style={{ marginBottom: 12 }}>{localize(todayPhase.desc, language)}</p>
        <button className="btn btn-primary btn-full" onClick={() => navigate('/train')}>
          {t('home_open_exercise', language)}
        </button>
      </div>

      <div className="section-div"><h3 style={{ margin: 0 }}>{t('home_quick_access', language)}</h3></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          { labelKey: 'home_timer',    path: '/timer'     },
          { labelKey: 'home_studio',   path: '/studio'    },
          { labelKey: 'home_facelab',  path: '/facelab'   },
          { labelKey: 'home_principles', path: '/principles' },
        ].map(({ labelKey, path }) => (
          <button key={path} className="btn btn-outline" onClick={() => navigate(path)}
            style={{ justifyContent: 'center', padding: 14 }}>
            {t(labelKey, language)}
          </button>
        ))}
      </div>
    </div>
  )
}

function StatCard({ value, label }) {
  return (
    <div style={{
      background: 'var(--card)',
      border: '1.5px solid var(--border)',
      borderRadius: 10,
      padding: 14,
      textAlign: 'center',
      boxShadow: '0 1px 4px rgba(42,37,32,.06)',
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--accent)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: 2 }}>{label}</div>
    </div>
  )
}
