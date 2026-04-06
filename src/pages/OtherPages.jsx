// ── TIMER PAGE ──────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from 'react'
import { POSE_PROMPTS } from '../data/content'
import { useCharacters } from '../hooks/useCharacters'
import { useReferences } from '../hooks/useReferences'

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

function CharacterListCard({ character: c, onRemove }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{ background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 10, padding: 14, marginBottom: 8, cursor: 'pointer', transition: 'border-color .2s' }}
      onClick={() => setOpen(o => !o)}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{c.name || 'Unnamed'}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>{c.archetype}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>{open ? '▲' : '▼'}</span>
          <button
            onClick={e => { e.stopPropagation(); onRemove(c.id) }}
            style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}
          >✕</button>
        </div>
      </div>

      {open && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed var(--border)' }}>
          {[
            ['Pose', c.pose],
            ['Clothing', c.clothing],
            ['Expression', c.expression],
            ['Backstory', c.notes],
          ].map(([label, value]) => value ? (
            <div key={label} style={{ marginBottom: 8 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
              <p style={{ fontSize: 13 }}>{value}</p>
            </div>
          ) : null)}
          <div className="moto-card" style={{ marginTop: 12 }}>
            <div className="moto-text" style={{ fontSize: 11 }}>
              Draw a long-limbed {c.archetype?.toLowerCase()} with {c.expression?.toLowerCase()} eyes and {c.pose?.toLowerCase()} stance.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function StudioPage() {
  const { user } = useAuth()
  const { characters, save, remove } = useCharacters(user?.id)
  const [form, setForm] = useState({ name: '', arch: '', pose: '', clothes: '', expr: '', notes: '' })
  const [card, setCard] = useState(null)
  const [saved, setSaved] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const build = () => { setCard({ ...form }); setSaved(false) }

  const saveCard = async () => {
    const { error } = await save({
      name: form.name, archetype: form.arch, pose: form.pose,
      clothing: form.clothes, expression: form.expr, notes: form.notes
    })
    if (!error) setSaved(true)
  }

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

      {[{ key: 'name', label: 'Character Name', placeholder: 'e.g. Ryn, Zero, Blaze...' }].map(f => (
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
        <input type="text" value={form.clothes} onChange={e => set('clothes', e.target.value)} placeholder="e.g. oversized jacket, torn tights..." />
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
        <div style={{ background: 'var(--card)', border: '2px solid var(--accent)', borderRadius: 12, padding: 20, marginTop: 16, boxShadow: '0 3px 12px rgba(212,80,10,.15)' }}>
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
          <button
            className={`btn ${saved ? 'btn-outline' : 'btn-primary'} btn-full`}
            onClick={!saved ? saveCard : undefined}
            style={{ marginTop: 12 }}
          >
            {saved ? '✓ SAVED TO YOUR COLLECTION' : 'SAVE CHARACTER'}
          </button>
        </div>
      )}

      {/* Saved characters */}
      {characters.length > 0 && (
        <>
          <div className="section-div" style={{ marginTop: 24 }}><h3 style={{ margin: 0 }}>YOUR CHARACTERS</h3></div>
          {characters.map(c => (
  <CharacterListCard key={c.id} character={c} onRemove={remove} />
))}
        </>
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
  const { images, loading } = useReferences()
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const categories = ['all', 'character', 'clothing', 'expressions', 'face', 'gesture', 'ink', 'linework', 'pose', 'silhouette']

  const filtered = filter === 'all'
    ? images
    : images.filter(img => img.category === filter)

  return (
    <div className="page">
      <div style={{ paddingTop: 20 }}>
        <h3>Visual References</h3>
        <h2 style={{ marginBottom: 8 }}>INSPIRATION</h2>
        <p style={{ marginBottom: 14 }}>
          Study these references. Notice the attitude, the lines, the shapes. Then put the phone down and draw.
        </p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8, marginBottom: 14, scrollbarWidth: 'none' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            style={{
              flexShrink: 0, padding: '6px 14px',
              background: filter === cat ? 'var(--accent)' : 'var(--card)',
              border: `1.5px solid ${filter === cat ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 20,
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: filter === cat ? '#fff' : 'var(--muted)',
              cursor: 'pointer', transition: 'all .15s',
              letterSpacing: 1, textTransform: 'uppercase',
            }}>
            {cat === 'all' ? `ALL (${images.length})` : `${cat} (${images.filter(i => i.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', letterSpacing: 2 }}>
          LOADING REFERENCES...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', letterSpacing: 2 }}>
          NO IMAGES YET — UPLOAD TO SUPABASE STORAGE
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
          {filtered.map((img, i) => (
            <div key={img.name} onClick={() => setSelected(img)}
              style={{
                borderRadius: 10, overflow: 'hidden',
                border: '1.5px solid var(--border)',
                cursor: 'pointer', transition: 'all .2s',
                boxShadow: '0 1px 3px rgba(42,37,32,.06)',
                position: 'relative',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}
            >
              <img
                src={img.url}
                alt={img.name}
                style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block', background: 'var(--bg3)' }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(transparent, rgba(42,37,32,.7))',
                padding: '20px 8px 7px',
                fontFamily: 'var(--font-mono)', fontSize: 9,
                color: '#f7f4ef', letterSpacing: 1, textTransform: 'uppercase',
              }}>
                {img.category}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selected && (
  <div
    onClick={() => setSelected(null)}
    style={{ position: 'fixed', inset: 0, background: 'rgba(42,37,32,.85)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
  >
    <div onClick={e => e.stopPropagation()}
      style={{ maxWidth: 440, width: '100%', background: 'var(--card)', borderRadius: 14, overflow: 'hidden', position: 'relative', boxShadow: '0 8px 32px rgba(42,37,32,.3)' }}>
      <img
        src={selected.url}
        alt={selected.name}
        style={{ width: '100%', maxHeight: '45vh', objectFit: 'cover', display: 'block', background: 'var(--bg3)' }}
      />
      <button onClick={() => setSelected(null)}
        style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(42,37,32,.6)', border: 'none', color: '#fff', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 16 }}>
        ✕
      </button>
      <div style={{ padding: 16 }}>
        <h3 style={{ marginBottom: 4 }}>REFERENCE</h3>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text)', marginBottom: 10 }}>
          {selected.info.label?.toUpperCase()}
        </div>
        {selected.info.desc && (
          <p style={{ fontSize: 13, marginBottom: 12, lineHeight: 1.6 }}>{selected.info.desc}</p>
        )}
        {selected.info.tip && (
          <div className="moto-card">
            <div className="moto-text" style={{ fontSize: 12 }}>Try this: {selected.info.tip}</div>
          </div>
        )}
        <span className="tag tag-orange" style={{ marginTop: 10, display: 'inline-block' }}>
          {selected.category.toUpperCase()}
        </span>
      </div>
    </div>
  </div>
)}

      <div style={{ background: 'var(--bg3)', border: '1.5px solid var(--border)', borderRadius: 8, padding: 12, marginTop: 4 }}>
        <p style={{ fontSize: 11, lineHeight: 1.6 }}>
          Images are for educational reference only. All rights belong to their respective creators.
        </p>
      </div>
    </div>
  )
}
