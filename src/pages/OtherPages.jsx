// ── TIMER PAGE ──────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from 'react'
import { POSE_PROMPTS } from '../data/content'

export function TimerPage() {
  const [preset, setPreset] = useState(30)
  const [remaining, setRemaining] = useState(30)
  const [running, setRunning] = useState(false)
  const [round, setRound] = useState(1)
  const [totalRounds, setTotalRounds] = useState(10)
  const [prompt, setPrompt] = useState(POSE_PROMPTS[0])
  const intervalRef = useRef(null)

  const pct = (remaining / preset) * 100

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining(r => {
          if (r <= 1) {
            clearInterval(intervalRef.current)
            setRunning(false)
            setRound(rd => {
              if (rd < totalRounds) {
                setTimeout(() => { setRemaining(preset); setRunning(false) }, 0)
                newPrompt()
                return rd + 1
              }
              return rd
            })
            return 0
          }
          return r - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [running, preset, totalRounds])

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  const newPrompt = () => setPrompt(POSE_PROMPTS[Math.floor(Math.random() * POSE_PROMPTS.length)])
  const reset = () => { clearInterval(intervalRef.current); setRunning(false); setRemaining(preset); setRound(1) }
  const skip = () => { clearInterval(intervalRef.current); setRunning(false); if (round < totalRounds) { setRound(r => r + 1); setRemaining(preset); newPrompt() } }
  const selectPreset = (s) => { reset(); setPreset(s); setRemaining(s) }

  return (
    <div className="page">
      <div style={{ paddingTop: 20, textAlign: 'center' }}>
        <h3>Gesture Timer</h3>
        <h2 style={{ marginBottom: 4 }}>TIMED DRILL MODE</h2>
        <p style={{ marginBottom: 20 }}>Fast drawing preserves energy. Set a time, draw fast, repeat.</p>
      </div>

      {/* Presets */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
        {[30, 60, 120, 300].map(s => (
          <button key={s} onClick={() => selectPreset(s)}
            style={{
              padding: '8px 14px',
              background: preset === s ? 'var(--accent)' : 'var(--card)',
              border: `1.5px solid ${preset === s ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 8,
              fontFamily: 'var(--font-mono)', fontSize: 11,
              color: preset === s ? '#fff' : 'var(--muted)',
              cursor: 'pointer', transition: 'all .15s',
            }}>
            {s < 60 ? `${s} SEC` : `${s / 60} MIN`}
          </button>
        ))}
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', textAlign: 'center', letterSpacing: 2, marginBottom: 8 }}>
        ROUND {round} OF {totalRounds}
      </div>

      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 96, letterSpacing: 2,
        textAlign: 'center', lineHeight: 1, margin: '24px 0',
        color: remaining <= 5 ? 'var(--accent2)' : 'var(--text)',
      }}>
        {fmt(remaining)}
      </div>

      <div className="progress-bar" style={{ marginBottom: 20 }}>
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 20 }}>
        <button className="btn btn-primary" onClick={() => setRunning(r => !r)}>
          {running ? 'PAUSE' : remaining === 0 ? 'DONE ✓' : 'START'}
        </button>
        <button className="btn btn-outline" onClick={reset}>RESET</button>
        <button className="btn btn-outline" onClick={skip}>SKIP ▶</button>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 8 }}>POSE PROMPT</h3>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{prompt}</p>
        <button className="btn btn-outline btn-full" onClick={newPrompt} style={{ marginTop: 10 }}>NEW PROMPT</button>
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 8 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>ROUNDS:</span>
        <input type="range" min="1" max="30" value={totalRounds}
          onChange={e => setTotalRounds(+e.target.value)} style={{ flex: 1 }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', width: 20, textAlign: 'right' }}>{totalRounds}</span>
      </div>
    </div>
  )
}

// ── FACE LAB PAGE ────────────────────────────────────────────────────────────
import { FACE_PROMPTS } from '../data/content'

export function FaceLabPage() {
  const [current, setCurrent] = useState(FACE_PROMPTS[0])
  const randomize = () => setCurrent(FACE_PROMPTS[Math.floor(Math.random() * FACE_PROMPTS.length)])

  return (
    <div className="page">
      <div style={{ paddingTop: 20 }}>
        <h3>Anatomy Focus</h3>
        <h2 style={{ marginBottom: 8 }}>FACE LAB</h2>
        <p style={{ marginBottom: 16 }}>Targeted expression and feature training. Hit randomize for a new prompt.</p>
      </div>

      <div style={{ background: 'var(--card)', border: '2px solid var(--accent3)', borderRadius: 12, padding: 20, textAlign: 'center', marginBottom: 16, boxShadow: '0 2px 8px rgba(37,99,168,.12)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--accent3)', marginBottom: 4 }}>{current.title}</div>
        <p style={{ fontSize: 13 }}>{current.desc}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
        {[['EYES', current.eyes], ['JAW', current.jaw], ['MOUTH', current.mouth], ['ENERGY', current.energy]].map(([label, val]) => (
          <div key={label} style={{ background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 8, padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.5px' }}>
            {label}<span style={{ display: 'block', fontSize: 13, color: 'var(--text)', fontWeight: 700, marginTop: 2 }}>{val}</span>
          </div>
        ))}
      </div>

      <button className="btn btn-primary btn-full" onClick={randomize} style={{ marginBottom: 16 }}>↻ RANDOMIZE FACE</button>

      <div style={{ background: 'var(--bg3)', border: '1.5px dashed var(--border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 180, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: 1, textTransform: 'uppercase' }}>
        [ Draw your interpretation here ]
      </div>
    </div>
  )
}

// ── STUDIO PAGE ──────────────────────────────────────────────────────────────
import { CHAR_ARCHETYPES, CHAR_POSES, CHAR_EXPRESSIONS } from '../data/content'

const RANDOM_CHARS = [
  { name: 'ZERO', arch: 'Antihero', pose: 'Slouched swagger', clothes: 'Military surplus coat, torn shirt, unlaced boots', expr: 'Tired contempt', notes: 'Former session musician who burned every bridge. Still plays better than anyone in the room.' },
  { name: 'RYN', arch: 'Streetwise Musician', pose: 'Arms crossed, weight shifted', clothes: 'Sleeveless denim vest covered in patches, tight jeans, platforms', expr: 'Cold stare', notes: 'Bassist. Never smiles on stage. Crowds love her for it.' },
  { name: 'BLAZE', arch: 'Underground DJ', pose: 'Mid-motion stride', clothes: 'Oversized tracksuit, chain necklace, wraparound shades', expr: 'Sharp grin', notes: "Hasn't slept in two days. This is his natural state." },
  { name: 'MOTH', arch: 'Punk Witch', pose: 'Looking over shoulder', clothes: 'Long tattered coat, rings on every finger, heavy boots', expr: 'Bitter smirk', notes: "Everyone thinks she's from somewhere else. She lets them think that." },
]

export function StudioPage() {
  const [form, setForm] = useState({ name: '', arch: '', pose: '', clothes: '', expr: '', notes: '' })
  const [card, setCard] = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const build = () => setCard({ ...form })
  const random = () => {
    const c = RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)]
    setForm({ name: c.name, arch: c.arch, pose: c.pose, clothes: c.clothes, expr: c.expr, notes: c.notes })
  }

  return (
    <div className="page">
      <div style={{ paddingTop: 20 }}>
        <h3>Build Your Character</h3>
        <h2 style={{ marginBottom: 8 }}>CHARACTER STUDIO</h2>
        <p style={{ marginBottom: 16 }}>Define a character. Build their identity. Draw them with attitude.</p>
      </div>

      {[
        { key: 'name', label: 'Character Name', placeholder: 'e.g. Ryn, Zero, Blaze...' },
      ].map(f => (
        <div className="field" key={f.key}>
          <label>{f.label}</label>
          <input type="text" value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} />
        </div>
      ))}

      {[
        { key: 'arch', label: 'Archetype / Vibe', options: CHAR_ARCHETYPES },
        { key: 'pose', label: 'Pose Style', options: CHAR_POSES },
        { key: 'expr', label: 'Expression', options: CHAR_EXPRESSIONS },
      ].map(f => (
        <div className="field" key={f.key}>
          <label>{f.label}</label>
          <select value={form[f.key]} onChange={e => set(f.key, e.target.value)}>
            <option value="">Select...</option>
            {f.options.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      ))}

      <div className="field">
        <label>Clothing Keywords</label>
        <input type="text" value={form.clothes} onChange={e => set('clothes', e.target.value)} placeholder="e.g. oversized jacket, torn tights, platform boots..." />
      </div>
      <div className="field">
        <label>Notes / Backstory Hook</label>
        <textarea rows="3" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="e.g. lost their band, now plays alone on rooftops..." />
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <button className="btn btn-primary" onClick={build} style={{ flex: 1 }}>BUILD CARD</button>
        <button className="btn btn-outline" onClick={random} style={{ flex: 1 }}>↻ RANDOM</button>
      </div>

      {card && (
        <div style={{ background: 'var(--card)', border: '2px solid var(--accent)', borderRadius: 12, padding: 20, marginTop: 16, animation: 'fadeIn .3s ease', boxShadow: '0 3px 12px rgba(212,80,10,.15)' }}>
          <span className="tag tag-orange" style={{ marginBottom: 8, display: 'inline-block' }}>CHARACTER CONCEPT</span>
          <h2 style={{ color: 'var(--accent)', marginBottom: 4 }}>{card.name || 'UNNAMED'}</h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, marginBottom: 12 }}>{card.arch?.toUpperCase()}</p>
          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: 12 }} />
          {[['Pose', card.pose], ['Clothing', card.clothes], ['Expression', card.expr], ['Backstory', card.notes]].map(([l, v]) => v ? (
            <div key={l} style={{ marginBottom: 8 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 }}>{l}</div>
              <p style={{ fontSize: 13 }}>{v}</p>
            </div>
          ) : null)}
          <div className="moto-card" style={{ marginTop: 14 }}>
            <div className="moto-text" style={{ fontSize: 11 }}>
              Draw a long-limbed {card.arch?.toLowerCase()} with {card.expr?.toLowerCase()} eyes, {card.pose?.toLowerCase()} stance, and {card.clothes?.toLowerCase()}.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── PROGRESS PAGE ─────────────────────────────────────────────────────────────
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import { ACHIEVEMENTS } from '../data/content'

export function ProgressPage() {
  const { user } = useAuth()
  const { completedDaysCount, progressPct, streak, totalMinutes, completedPrinciples } = useProgress(user?.id)

  // Simple achievement unlocking logic
  const unlockedIds = new Set()
  if (completedDaysCount >= 1) unlockedIds.add('first_sketch')
  if (streak >= 3) unlockedIds.add('streak_3')
  if (streak >= 7) unlockedIds.add('streak_7')
  if (completedPrinciples.size >= 12) unlockedIds.add('char_architect')
  if (completedDaysCount >= 30) unlockedIds.add('finisher')

  return (
    <div className="page">
      <div style={{ paddingTop: 20 }}>
        <h3>Your Stats</h3>
        <h2 style={{ marginBottom: 16 }}>PROGRESS</h2>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div className="streak-badge">🔥 {streak}-DAY STREAK</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        {[
          [completedDaysCount, 'Days Done'],
          [completedPrinciples.size, 'Principles'],
          [totalMinutes, 'Min Practiced'],
          [`${progressPct}%`, '30-Day Plan'],
        ].map(([v, l]) => (
          <div key={l} style={{ background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 10, padding: 14, textAlign: 'center', boxShadow: '0 1px 4px rgba(42,37,32,.06)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--accent)', lineHeight: 1 }}>{v}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      <div className="section-div"><h3 style={{ margin: 0 }}>30-DAY OVERVIEW</h3></div>
      <div className="progress-bar" style={{ height: 8 }}>
        <div className="progress-fill" style={{ width: `${progressPct}%` }} />
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', margin: '4px 0 16px', textAlign: 'right' }}>
        {completedDaysCount} / 30 DAYS — {progressPct}%
      </div>

      <div className="section-div"><h3 style={{ margin: 0 }}>ACHIEVEMENTS</h3></div>
      {ACHIEVEMENTS.map(a => {
        const unlocked = unlockedIds.has(a.id)
        return (
          <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 10, padding: '12px 14px', marginBottom: 8 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
              background: unlocked ? '#f0f9e0' : 'var(--bg3)',
              border: `1.5px solid ${unlocked ? '#8ac840' : 'var(--border)'}`,
              filter: unlocked ? 'none' : 'grayscale(1)',
              opacity: unlocked ? 1 : .4,
            }}>{a.icon}</div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{a.title}</div>
              <p style={{ fontSize: 12 }}>{a.desc}</p>
            </div>
            {unlocked && <span className="tag tag-green" style={{ marginLeft: 'auto' }}>EARNED</span>}
          </div>
        )
      })}
    </div>
  )
}

// ── INSPO PAGE ─────────────────────────────────────────────────────────────
const ALL_TAGS = ['all', 'gesture', 'pose', 'face', 'expressions', 'silhouette', 'character', 'clothing', 'ink']

// Illustration prompts — since we can't hotlink images, we describe what to study
const INSPO_CARDS = [
  { title: 'Energy & gesture', desc: 'Start with the spine. The energy line is the foundation of every good figure. Everything else is detail.', tags: ['gesture', 'pose'], tip: 'Draw 10 gesture lines in 2 minutes. No detail.' },
  { title: 'Attitude in stance', desc: 'Hip tilt + shoulder angle + head tilt = an opinion. Neutral kills the drawing.', tags: ['pose', 'character'], tip: 'Push every angle 30% further than feels comfortable.' },
  { title: 'Strong silhouette', desc: 'Fill it black. Does it still work? If yes, the design is solid.', tags: ['silhouette', 'character'], tip: 'Draw 5 characters as solid black shapes only.' },
  { title: 'Expressive eyes', desc: 'Half-lidded, asymmetric, heavy-browed. Eyes carry the whole personality.', tags: ['face', 'expressions'], tip: 'Draw 20 eye pairs. Vary lid weight, angle, asymmetry.' },
  { title: 'Clothing as identity', desc: "The jacket tells you who they are before you see their face.", tags: ['clothing', 'character'], tip: 'Design 3 characters identifiable by clothes alone.' },
  { title: 'Ink confidence', desc: 'Commit to the line. The wobble is not a mistake — it is the character.', tags: ['ink'], tip: 'Draw without lifting the pen. No erasing.' },
  { title: 'Abstract punk shapes', desc: 'Study the shapes: angular, spiky, asymmetric. Design is attitude.', tags: ['silhouette', 'character'], tip: 'Build a character from triangles and sharp angles only.' },
  { title: 'Contrast: detail vs. rest', desc: 'The busy area pops because the quiet area gives it room.', tags: ['character'], tip: '70% flat shapes, 30% dense detail. Not 50/50.' },
  { title: 'Face structure', desc: 'Cheekbones, jaw angle, brow ridge — architecture before expression.', tags: ['face', 'expressions'], tip: 'Map the skull planes before drawing features.' },
  { title: 'Performance energy', desc: 'Live performance = pure gesture. Body communicates before the face does.', tags: ['gesture', 'pose'], tip: 'Sketch performers from video paused at peak motion.' },
]

export function InspoPage() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = filter === 'all' ? INSPO_CARDS : INSPO_CARDS.filter(c => c.tags.includes(filter))

  return (
    <div className="page">
      <div style={{ paddingTop: 20 }}>
        <h3>Visual References</h3>
        <h2 style={{ marginBottom: 8 }}>INSPIRATION</h2>
        <p style={{ marginBottom: 14 }}>Study these concepts. Notice the attitude, the lines, the shapes. Then put the phone down and draw.</p>
      </div>

      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8, marginBottom: 14, scrollbarWidth: 'none' }}>
        {ALL_TAGS.map(t => (
          <button key={t} onClick={() => setFilter(t)}
            style={{
              flexShrink: 0, padding: '6px 14px',
              background: filter === t ? 'var(--accent)' : 'var(--card)',
              border: `1.5px solid ${filter === t ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 20, fontFamily: 'var(--font-mono)', fontSize: 10,
              color: filter === t ? '#fff' : 'var(--muted)',
              cursor: 'pointer', transition: 'all .15s', letterSpacing: 1, textTransform: 'uppercase',
            }}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
        {filtered.map((card, i) => (
          <div key={i} onClick={() => setSelected(card)}
            style={{
              background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 10,
              padding: 14, cursor: 'pointer', transition: 'all .2s',
              boxShadow: '0 1px 3px rgba(42,37,32,.06)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--text)', marginBottom: 6, textTransform: 'uppercase' }}>{card.title}</div>
            <p style={{ fontSize: 11, lineHeight: 1.5 }}>{card.desc.substring(0, 60)}...</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
              {card.tags.slice(0, 2).map(t => <span key={t} className="tag tag-orange" style={{ fontSize: 9 }}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div onClick={() => setSelected(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(42,37,32,.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: 'var(--card)', borderRadius: 14, padding: 20, maxWidth: 380, width: '100%', boxShadow: '0 8px 32px rgba(42,37,32,.2)', position: 'relative' }}>
            <button onClick={() => setSelected(null)}
              style={{ position: 'absolute', top: 10, right: 10, background: 'var(--bg2)', border: '1.5px solid var(--border)', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer', color: 'var(--muted)', fontSize: 14 }}>✕</button>
            <h3 style={{ marginBottom: 4 }}>REFERENCE</h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 12, textTransform: 'uppercase' }}>{selected.title}</div>
            <p style={{ marginBottom: 12 }}>{selected.desc}</p>
            <div className="moto-card">
              <div className="moto-text">Try this: {selected.tip}</div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
              {selected.tags.map(t => <span key={t} className="tag tag-blue">{t}</span>)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
