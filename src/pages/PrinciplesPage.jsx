import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import { PRINCIPLES } from '../data/content'

export default function PrinciplesPage() {
  const { user } = useAuth()
  const { completedPrinciples, markPrincipleComplete } = useProgress(user?.id)
  const [open, setOpen] = useState(null)

  return (
    <div className="page">
      <div style={{ paddingTop: 20 }}>
        <h3>The Method</h3>
        <h2 style={{ marginBottom: 8 }}>12 PRINCIPLES</h2>
        <p style={{ marginBottom: 16 }}>The complete visual language of expressive punk-inspired character design.</p>
      </div>

      {PRINCIPLES.map((p) => {
        const done = completedPrinciples.has(p.id)
        const isOpen = open === p.id
        return (
          <div
            key={p.id}
            onClick={() => setOpen(isOpen ? null : p.id)}
            style={{
              background: done ? '#f8fdf2' : 'var(--card)',
              border: `1.5px solid ${done ? '#8ac840' : isOpen ? 'var(--accent)' : 'var(--border)'}`,
              borderLeft: done ? '4px solid #4a7c10' : isOpen ? '4px solid var(--accent)' : '1.5px solid var(--border)',
              borderRadius: 12,
              padding: 16,
              marginBottom: 10,
              cursor: 'pointer',
              transition: 'all .2s',
              boxShadow: '0 1px 4px rgba(42,37,32,.05)',
            }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 42, color: 'var(--bg3)', lineHeight: 1, float: 'right', marginLeft: 8 }}>
              {String(p.id).padStart(2, '0')}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
              {p.title.toUpperCase()}
            </div>
            <p style={{ fontSize: 13 }}>{p.short}</p>

            {isOpen && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1.5px dashed var(--border)' }}
                onClick={e => e.stopPropagation()}>
                {[
                  { label: 'Why it matters', text: p.why },
                  { label: 'Common mistakes', text: p.mistakes },
                  { label: 'Mini exercise', text: p.task },
                ].map(({ label, text }) => (
                  <div key={label} style={{ marginBottom: 10 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
                    <p style={{ fontSize: 13 }}>{text}</p>
                  </div>
                ))}
                <button
                  className={`btn ${done ? 'btn-outline' : 'btn-primary'} btn-full`}
                  onClick={() => !done && markPrincipleComplete(p.id)}
                  style={{ marginTop: 8 }}
                >
                  {done ? '✓ DONE' : 'MARK COMPLETE'}
                </button>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
