import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import { QUOTES, PHASES } from '../data/content'

export default function HomePage() {
  const { user, signOut } = useAuth()
  const { completedDaysCount, progressPct, streak, currentDay } = useProgress(user?.id)
  const navigate = useNavigate()

  const todayPhase = PHASES.find(p => p.days.includes(currentDay)) ?? PHASES[0]
  const quote = QUOTES[new Date().getDay() % QUOTES.length]

  return (
    <div className="page">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 24 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 4 }}>
            ★ Daily Training App
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, lineHeight: .9 }}>
            SKETCH<br /><span style={{ color: 'var(--accent)' }}>ATTITUDE</span>
          </div>
        </div>
        <button
          onClick={signOut}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', marginTop: 8 }}
        >
          SIGN OUT
        </button>
      </div>

      <hr className="divider" style={{ marginTop: 20 }} />

      {/* Quote */}
      <h3>Today's Motivation</h3>
      <div className="moto-card">
        <div className="moto-text">"{quote}"</div>
      </div>

      {/* Stats */}
      <h3>Your Progress</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        <StatCard value={streak} label="Day streak" />
        <StatCard value={`${progressPct}%`} label="30-day plan" />
        <StatCard value={completedDaysCount} label="Days done" />
        <StatCard value={currentDay} label="Current day" />
      </div>

      {/* Today's mission */}
      <div className="card card-accent">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <h3 style={{ marginBottom: 2 }}>TODAY'S MISSION</h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text)', fontWeight: 700 }}>
              Day {currentDay} — {todayPhase.label}
            </div>
          </div>
          <span className="tag tag-yellow">{todayPhase.mins} MIN</span>
        </div>
        <p style={{ marginBottom: 12 }}>{todayPhase.desc}</p>
        <button className="btn btn-primary btn-full" onClick={() => navigate('/train')}>
          OPEN TODAY'S EXERCISE →
        </button>
      </div>

      {/* Quick access */}
      <div className="section-div"><h3 style={{ margin: 0 }}>QUICK ACCESS</h3></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          { label: '⏱ TIMER',    path: '/timer'     },
          { label: '✦ STUDIO',   path: '/studio'    },
          { label: '◑ FACE LAB', path: '/facelab'   },
          { label: '📐 PRINCIPLES', path: '/principles' },
        ].map(({ label, path }) => (
          <button key={path} className="btn btn-outline" onClick={() => navigate(path)}
            style={{ justifyContent: 'center', padding: 14 }}>
            {label}
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
