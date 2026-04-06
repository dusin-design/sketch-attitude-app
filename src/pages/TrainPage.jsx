import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import { PHASES, QUOTES } from '../data/content'
import { useAuth } from '../hooks/useAuth'
import { useSketches } from '../hooks/useSketches'

export default function TrainPage() {
  const { user } = useAuth()
  const { completedDays, progressPct, completedDaysCount, currentDay, markDayComplete } = useProgress(user?.id)
  const [openDay, setOpenDay] = useState(null)

  return (
    <div className="page">
      <div style={{ paddingTop: 20 }}>
        <h3>Your Journey</h3>
        <h2 style={{ marginBottom: 8 }}>30-DAY PROGRAM</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <p>You're on day {currentDay}. Keep going.</p>
          <span className="tag tag-orange">{progressPct}% DONE</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="notice">Tap any day to open the exercise.</div>
      </div>

      {PHASES.map(phase => (
        <PhaseBlock
          key={phase.label}
          phase={phase}
          completedDays={completedDays}
          currentDay={currentDay}
          onDayClick={setOpenDay}
        />
      ))}

      {openDay && (
        <DayModal
          day={openDay}
          completedDays={completedDays}
          onComplete={() => { markDayComplete(openDay); setOpenDay(null) }}
          onClose={() => setOpenDay(null)}
        />
      )}
    </div>
  )
}

function PhaseBlock({ phase, completedDays, currentDay, onDayClick }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div>
          <h3 style={{ marginBottom: 2 }}>{phase.cat.toUpperCase()} PHASE</h3>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text)' }}>{phase.label}</div>
        </div>
        <span className="tag tag-yellow">{phase.mins} MIN</span>
      </div>
      <div className="card card-accent" style={{ padding: 12 }}>
        <p style={{ marginBottom: 10 }}>{phase.desc}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
          {phase.days.map(d => {
            const done = completedDays.has(d)
            const isToday = d === currentDay
            const locked = d > currentDay
            return (
              <button
                key={d}
                onClick={() => !locked && onDayClick(d)}
                style={{
                  aspectRatio: '1',
                  background: done ? '#f0f9e0' : isToday ? 'var(--accent)' : 'var(--bg2)',
                  border: `1.5px solid ${done ? '#8ac840' : isToday ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: locked ? 'default' : 'pointer',
                  color: done ? '#4a7c10' : isToday ? '#fff' : 'var(--muted)',
                  opacity: locked ? .35 : 1,
                  transition: 'all .15s',
                  boxShadow: isToday ? '0 2px 8px rgba(212,80,10,.3)' : 'none',
                }}
              >
                {done ? '✓' : d}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function DayModal({ day, completedDays, onComplete, onClose }) {
  const phase = PHASES.find(p => p.days.includes(day))
  const [ratings, setRatings] = useState({ Energy: 5, Attitude: 5, Anatomy: 5 })
  const { user } = useAuth()
  const { sketches, uploading, upload, remove } = useSketches(user?.id, day)
  const isDone = completedDays.has(day)

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
      position: 'fixed', inset: 0,
      background: 'rgba(42,37,32,.5)',
      zIndex: 200,
      display: 'flex',
      alignItems: 'center',
      padding: '0 0 60px',
}}
    >
      <div style={{
       background: 'var(--card)',
      borderRadius: 16,
      padding: '20px 20px 32px',
      width: '100%',
      maxWidth: 480,
      margin: '0 auto',
      maxHeight: '85vh',
      overflowY: 'scroll',
      WebkitOverflowScrolling: 'touch',
      boxShadow: '0 4px 32px rgba(42,37,32,.2)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <h3 style={{ marginBottom: 2 }}>DAY {day}</h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700 }}>{phase?.label}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--muted)' }}>✕</button>
        </div>

        <div className="moto-card">
          <div className="moto-text">"{QUOTES[day % QUOTES.length]}"</div>
        </div>

        <h3 style={{ marginBottom: 8 }}>EXERCISE</h3>
        {[
          'Warm up with 5 fast loose gestures. No detail. Pure line.',
          phase?.desc,
          'Review your work. Pick your best result. Note what surprised you.',
        ].map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%',
              background: 'var(--accent)', color: '#fff',
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginTop: 1,
            }}>{i + 1}</div>
            <p style={{ fontSize: 13, lineHeight: 1.6 }}>{step}</p>
          </div>
        ))}

        <h3 style={{ margin: '16px 0 8px' }}>SELF-RATING</h3>
        {Object.entries(ratings).map(([label, val]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', width: 72, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</span>
            <input
              type="range" min="1" max="10" value={val}
              onChange={e => setRatings(r => ({ ...r, [label]: +e.target.value }))}
              style={{ flex: 1 }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', width: 20, textAlign: 'right' }}>{val}</span>
          </div>
        ))}

        <h3 style={{ margin: '16px 0 8px' }}>YOUR SKETCHES</h3>

{sketches.length > 0 && (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
    {sketches.map(s => (
      <div key={s.name} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1.5px solid var(--border)' }}>
        <img src={s.url} alt="sketch" style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
        <button
          onClick={() => remove(s.name)}
          style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,.5)', border: 'none', color: '#fff', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', fontSize: 12 }}
        >✕</button>
      </div>
    ))}
  </div>
)}

<label style={{
  display: 'block', width: '100%', padding: '10px 0',
  border: '1.5px dashed var(--border)', borderRadius: 8,
  textAlign: 'center', cursor: uploading ? 'default' : 'pointer',
  fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)',
  marginBottom: 12, letterSpacing: 1,
}}>
  {uploading ? 'UPLOADING...' : '+ UPLOAD SKETCH'}
  <input
    type="file" accept="image/*" style={{ display: 'none' }}
    onChange={e => e.target.files[0] && upload(e.target.files[0])}
    disabled={uploading}
  />
</label>

        <button
          className={`btn ${isDone ? 'btn-outline' : 'btn-primary'} btn-full`}
          onClick={!isDone ? onComplete : undefined}
          style={{ marginTop: 16 }}
        >
          {isDone ? '✓ COMPLETED' : 'MARK COMPLETE'}
        </button>
      </div>
    </div>
  )
}
