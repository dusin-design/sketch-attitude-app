// ── TIMER PAGE ──────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../data/strings'
import { POSE_PROMPTS, localize } from '../data/content'

export function TimerPage() {
  const { language } = useLanguage()
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
        <h3>{t('timer_label', language)}</h3>
        <h2 style={{ marginBottom: 4 }}>{t('timer_title', language)}</h2>
        <p style={{ marginBottom: 20 }}>{t('timer_intro', language)}</p>
      </div>

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
            {s < 60 ? `${s} ${t('sec', language)}` : `${s / 60} ${t('min', language)}`}
          </button>
        ))}
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', textAlign: 'center', letterSpacing: 2, marginBottom: 8 }}>
        {t('timer_round', language)} {round} {t('timer_of', language)} {totalRounds}
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
          {running ? t('timer_pause', language) : remaining === 0 ? t('timer_done', language) : t('timer_start', language)}
        </button>
        <button className="btn btn-outline" onClick={reset}>{t('timer_reset', language)}</button>
        <button className="btn btn-outline" onClick={skip}>{t('timer_skip', language)}</button>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 8 }}>{t('timer_pose_prompt', language)}</h3>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{localize(prompt, language)}</p>
        <button className="btn btn-outline btn-full" onClick={newPrompt} style={{ marginTop: 10 }}>{t('timer_new_prompt', language)}</button>
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 8 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>{t('timer_rounds', language)}</span>
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
  const { language } = useLanguage()
  const [current, setCurrent] = useState(FACE_PROMPTS[0])
  const randomize = () => setCurrent(FACE_PROMPTS[Math.floor(Math.random() * FACE_PROMPTS.length)])

  return (
    <div className="page">
      <div style={{ paddingTop: 20 }}>
        <h3>{t('facelab_label', language)}</h3>
        <h2 style={{ marginBottom: 8 }}>{t('facelab_title', language)}</h2>
        <p style={{ marginBottom: 16 }}>{t('facelab_intro', language)}</p>
      </div>

      <div style={{ background: 'var(--card)', border: '2px solid var(--accent3)', borderRadius: 12, padding: 20, textAlign: 'center', marginBottom: 16, boxShadow: '0 2px 8px rgba(37,99,168,.12)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--accent3)', marginBottom: 4 }}>{localize(current.title, language)}</div>
        <p style={{ fontSize: 13 }}>{localize(current.desc, language)}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
        {[
          [t('facelab_eyes', language), localize(current.eyes, language)],
          [t('facelab_jaw', language), localize(current.jaw, language)],
          [t('facelab_mouth', language), localize(current.mouth, language)],
          [t('facelab_energy', language), localize(current.energy, language)],
        ].map(([label, val]) => (
          <div key={label} style={{ background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 8, padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.5px' }}>
            {label}<span style={{ display: 'block', fontSize: 13, color: 'var(--text)', fontWeight: 700, marginTop: 2 }}>{val}</span>
          </div>
        ))}
      </div>

      <button className="btn btn-primary btn-full" onClick={randomize} style={{ marginBottom: 16 }}>{t('facelab_randomize', language)}</button>

      <div style={{ background: 'var(--bg3)', border: '1.5px dashed var(--border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 180, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: 1, textTransform: 'uppercase' }}>
        {t('facelab_placeholder', language)}
      </div>
    </div>
  )
}

// ── STUDIO PAGE ──────────────────────────────────────────────────────────────
import { CHAR_ARCHETYPES, CHAR_POSES, CHAR_EXPRESSIONS } from '../data/content'
import { useAuth } from '../hooks/useAuth'
import { useCharacters } from '../hooks/useCharacters'
import { useProgress } from '../hooks/useProgress'

const RANDOM_CHARS = [
  { name: 'ZERO', arch: { en: 'Antihero', no: 'Antihelt' }, pose: { en: 'Slouched swagger', no: 'Sammensunket swagger' }, clothes: { en: 'Military surplus coat, torn shirt, unlaced boots', no: 'Militærovreskuddsfrakk, revet skjorte, uknyttede støvler' }, expr: { en: 'Tired contempt', no: 'Trøtt forakt' }, notes: { en: 'Former session musician who burned every bridge. Still plays better than anyone in the room.', no: 'Tidligere sessionmusiker som har brent alle broer. Spiller fortsatt bedre enn alle andre i rommet.' } },
  { name: 'RYN', arch: { en: 'Streetwise Musician', no: 'Streetwise musiker' }, pose: { en: 'Arms crossed, weight shifted', no: 'Armer i kors, vekt forskjøvet' }, clothes: { en: 'Sleeveless denim vest covered in patches, tight jeans, platforms', no: 'Ermeløs dongerivest full av merker, tette jeans, plattformsko' }, expr: { en: 'Cold stare', no: 'Kaldt blikk' }, notes: { en: 'Bassist. Never smiles on stage. Crowds love her for it.', no: 'Bassist. Smiler aldri på scenen. Publikum elsker henne for det.' } },
  { name: 'BLAZE', arch: { en: 'Underground DJ', no: 'Undergrunns-DJ' }, pose: { en: 'Mid-motion stride', no: 'Skritt i bevegelse' }, clothes: { en: 'Oversized tracksuit, chain necklace, wraparound shades', no: 'Oversized treningsdress, kjedehalskjede, wraparound solbriller' }, expr: { en: 'Sharp grin', no: 'Skarpt grin' }, notes: { en: "Hasn't slept in two days. This is his natural state.", no: 'Har ikke sovet på to dager. Dette er hans naturlige tilstand.' } },
  { name: 'MOTH', arch: { en: 'Punk Witch', no: 'Punk-heks' }, pose: { en: 'Looking over shoulder', no: 'Ser over skulderen' }, clothes: { en: 'Long tattered coat, rings on every finger, heavy boots', no: 'Lang fillete frakk, ringer på hver finger, tunge støvler' }, expr: { en: 'Bitter smirk', no: 'Bittert smil' }, notes: { en: "Everyone thinks she's from somewhere else. She lets them think that.", no: 'Alle tror hun kommer fra et annet sted. Hun lar dem tro det.' } },
]

export function StudioPage() {
  const { language } = useLanguage()
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
      clothing: form.clothes, expression: form.expr, notes: form.notes,
    })
    if (!error) setSaved(true)
  }

  const random = () => {
    const c = RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)]
    setForm({
      name: c.name,
      arch: localize(c.arch, language),
      pose: localize(c.pose, language),
      clothes: localize(c.clothes, language),
      expr: localize(c.expr, language),
      notes: localize(c.notes, language),
    })
  }

  return (
    <div className="page">
      <div style={{ paddingTop: 20 }}>
        <h3>{t('studio_label', language)}</h3>
        <h2 style={{ marginBottom: 8 }}>{t('studio_title', language)}</h2>
        <p style={{ marginBottom: 16 }}>{t('studio_intro', language)}</p>
      </div>

      <div className="field">
        <label>{t('studio_name', language)}</label>
        <input type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder={t('studio_name_placeholder', language)} />
      </div>

      {[
        { key: 'arch', labelKey: 'studio_archetype', options: CHAR_ARCHETYPES },
        { key: 'pose', labelKey: 'studio_pose', options: CHAR_POSES },
        { key: 'expr', labelKey: 'studio_expression', options: CHAR_EXPRESSIONS },
      ].map(f => (
        <div className="field" key={f.key}>
          <label>{t(f.labelKey, language)}</label>
          <select value={form[f.key]} onChange={e => set(f.key, e.target.value)}>
            <option value="">{t('studio_select', language)}</option>
            {f.options.map((o, i) => (
              <option key={i} value={localize(o, language)}>{localize(o, language)}</option>
            ))}
          </select>
        </div>
      ))}

      <div className="field">
        <label>{t('studio_clothing', language)}</label>
        <input type="text" value={form.clothes} onChange={e => set('clothes', e.target.value)} placeholder={t('studio_clothing_placeholder', language)} />
      </div>
      <div className="field">
        <label>{t('studio_notes', language)}</label>
        <textarea rows="3" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder={t('studio_notes_placeholder', language)} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <button className="btn btn-primary" onClick={build} style={{ flex: 1 }}>{t('studio_build', language)}</button>
        <button className="btn btn-outline" onClick={random} style={{ flex: 1 }}>{t('studio_random', language)}</button>
      </div>

      {card && (
        <div style={{ background: 'var(--card)', border: '2px solid var(--accent)', borderRadius: 12, padding: 20, marginTop: 16, animation: 'fadeIn .3s ease', boxShadow: '0 3px 12px rgba(212,80,10,.15)' }}>
          <span className="tag tag-orange" style={{ marginBottom: 8, display: 'inline-block' }}>{t('studio_concept_tag', language)}</span>
          <h2 style={{ color: 'var(--accent)', marginBottom: 4 }}>{card.name || t('studio_unnamed', language)}</h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, marginBottom: 12 }}>{card.arch?.toUpperCase()}</p>
          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: 12 }} />
          {[
            [t('studio_detail_pose', language), card.pose],
            [t('studio_detail_clothing', language), card.clothes],
            [t('studio_detail_expression', language), card.expr],
            [t('studio_detail_backstory', language), card.notes],
          ].map(([l, v]) => v ? (
            <div key={l} style={{ marginBottom: 8 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 }}>{l}</div>
              <p style={{ fontSize: 13 }}>{v}</p>
            </div>
          ) : null)}
          <div className="moto-card" style={{ marginTop: 14 }}>
            <div className="moto-text" style={{ fontSize: 11 }}>
              {t('studio_prompt_template', language)(
                card.arch?.toLowerCase() || '',
                card.expr?.toLowerCase() || '',
                card.pose?.toLowerCase() || '',
                card.clothes?.toLowerCase() || ''
              )}
            </div>
          </div>
          <button
            className={`btn ${saved ? 'btn-outline' : 'btn-primary'} btn-full`}
            onClick={!saved ? saveCard : undefined}
            style={{ marginTop: 12 }}
          >
            {saved ? t('studio_saved', language) : t('studio_save', language)}
          </button>
        </div>
      )}

      {characters.length > 0 && (
        <>
          <div className="section-div" style={{ marginTop: 24 }}><h3 style={{ margin: 0 }}>{t('studio_your_characters', language)}</h3></div>
          {characters.map(c => (
            <CharacterListCard key={c.id} character={c} onRemove={remove} />
          ))}
        </>
      )}
    </div>
  )
}

function CharacterListCard({ character: c, onRemove }) {
  const { language } = useLanguage()
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
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{c.name || t('studio_unnamed', language)}</div>
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
            [t('studio_detail_pose', language), c.pose],
            [t('studio_detail_clothing', language), c.clothing],
            [t('studio_detail_expression', language), c.expression],
            [t('studio_detail_backstory', language), c.notes],
          ].map(([label, value]) => value ? (
            <div key={label} style={{ marginBottom: 8 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
              <p style={{ fontSize: 13 }}>{value}</p>
            </div>
          ) : null)}
          <div className="moto-card" style={{ marginTop: 12 }}>
            <div className="moto-text" style={{ fontSize: 11 }}>
              {t('studio_prompt_template', language)(
                c.archetype?.toLowerCase() || '',
                c.expression?.toLowerCase() || '',
                c.pose?.toLowerCase() || '',
                c.clothing?.toLowerCase() || ''
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── PROGRESS PAGE ─────────────────────────────────────────────────────────────
import { ACHIEVEMENTS } from '../data/content'

export function ProgressPage() {
  const { language } = useLanguage()
  const { user } = useAuth()
  const { completedDaysCount, progressPct, streak, totalMinutes, completedPrinciples } = useProgress(user?.id)

  const unlockedIds = new Set()
  if (completedDaysCount >= 1) unlockedIds.add('first_sketch')
  if (streak >= 3) unlockedIds.add('streak_3')
  if (streak >= 7) unlockedIds.add('streak_7')
  if (completedPrinciples.size >= 12) unlockedIds.add('char_architect')
  if (completedDaysCount >= 30) unlockedIds.add('finisher')

  return (
    <div className="page">
      <div style={{ paddingTop: 20 }}>
        <h3>{t('progress_stats', language)}</h3>
        <h2 style={{ marginBottom: 16 }}>{t('progress_title', language)}</h2>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div className="streak-badge">🔥 {streak}-{t('progress_streak_suffix', language)}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        {[
          [completedDaysCount, t('progress_days_done', language)],
          [completedPrinciples.size, t('progress_principles', language)],
          [totalMinutes, t('progress_min_practiced', language)],
          [`${progressPct}%`, t('progress_plan_pct', language)],
        ].map(([v, l]) => (
          <div key={l} style={{ background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 10, padding: 14, textAlign: 'center', boxShadow: '0 1px 4px rgba(42,37,32,.06)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--accent)', lineHeight: 1 }}>{v}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      <div className="section-div"><h3 style={{ margin: 0 }}>{t('progress_overview', language)}</h3></div>
      <div className="progress-bar" style={{ height: 8 }}>
        <div className="progress-fill" style={{ width: `${progressPct}%` }} />
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', margin: '4px 0 16px', textAlign: 'right' }}>
        {completedDaysCount} / 30 {t('progress_days_of_30', language)} — {progressPct}%
      </div>

      <div className="section-div"><h3 style={{ margin: 0 }}>{t('progress_achievements', language)}</h3></div>
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
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{localize(a.title, language)}</div>
              <p style={{ fontSize: 12 }}>{localize(a.desc, language)}</p>
            </div>
            {unlocked && <span className="tag tag-green" style={{ marginLeft: 'auto' }}>{t('progress_earned', language)}</span>}
          </div>
        )
      })}
    </div>
  )
}

// ── INSPO PAGE ─────────────────────────────────────────────────────────────
import { useReferences } from '../hooks/useReferences'

const ALL_TAGS = ['all', 'gesture', 'pose', 'face', 'expressions', 'silhouette', 'character', 'clothing', 'ink', 'linework']

export function InspoPage() {
  const { language } = useLanguage()
  const { images, loading } = useReferences()
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = filter === 'all' ? images : images.filter(img => img.category === filter)

  return (
    <div className="page">
      <div style={{ paddingTop: 20 }}>
        <h3>{t('inspo_label', language)}</h3>
        <h2 style={{ marginBottom: 8 }}>{t('inspo_title', language)}</h2>
        <p style={{ marginBottom: 14 }}>{t('inspo_intro', language)}</p>
      </div>

      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8, marginBottom: 14, scrollbarWidth: 'none' }}>
        {ALL_TAGS.map(cat => (
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
            {cat === 'all'
              ? `${t('inspo_all', language)} (${images.length})`
              : `${cat} (${images.filter(i => i.category === cat).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', letterSpacing: 2 }}>
          {t('inspo_loading', language)}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', letterSpacing: 2 }}>
          {t('inspo_empty', language)}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
          {filtered.map((img) => (
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
                {localize(img.info.label, language)}
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(42,37,32,.85)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
        >
          <div onClick={e => e.stopPropagation()}
            style={{ maxWidth: 440, width: '100%', background: 'var(--card)', borderRadius: 14, overflow: 'hidden', position: 'relative', boxShadow: '0 8px 32px rgba(42,37,32,.3)' }}>
            <img src={selected.url} alt={selected.name} style={{ width: '100%', maxHeight: '45vh', objectFit: 'cover', display: 'block', background: 'var(--bg3)' }} />
            <button onClick={() => setSelected(null)}
              style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(42,37,32,.6)', border: 'none', color: '#fff', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 16 }}>
              ✕
            </button>
            <div style={{ padding: 16 }}>
              <h3 style={{ marginBottom: 4 }}>{t('inspo_reference', language)}</h3>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text)', marginBottom: 10 }}>
                {localize(selected.info.label, language).toUpperCase()}
              </div>
              {localize(selected.info.desc, language) && (
                <p style={{ fontSize: 13, marginBottom: 12, lineHeight: 1.6 }}>{localize(selected.info.desc, language)}</p>
              )}
              {localize(selected.info.tip, language) && (
                <div className="moto-card">
                  <div className="moto-text" style={{ fontSize: 12 }}>{t('inspo_try_this', language)} {localize(selected.info.tip, language)}</div>
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
        <p style={{ fontSize: 11, lineHeight: 1.6 }}>{t('inspo_legal', language)}</p>
      </div>
    </div>
  )
}
