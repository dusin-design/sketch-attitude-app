import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../data/strings'
import { PRINCIPLES, localize } from '../data/content'

export default function PrinciplesPage() {
  const { user } = useAuth()
  const { language } = useLanguage()
  const { completedPrinciples, markPrincipleComplete } = useProgress(user?.id)
  const [open, setOpen] = useState(null)

  return (
    <div className="page">
      <div style={{ paddingTop: 20 }}>
        <h3>{t('principles_method', language)}</h3>
        <h2 style={{ marginBottom: 8 }}>{t('principles_title', language)}</h2>
        <p style={{ marginBottom: 16 }}>{t('principles_intro', language)}</p>
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
              {localize(p.title, language).toUpperCase()}
            </div>
            <p style={{ fontSize: 13 }}>{localize(p.short, language)}</p>

            {isOpen && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1.5px dashed var(--border)' }}
                onClick={e => e.stopPropagation()}>
                {[
                  { label: t('principles_why', language), text: localize(p.why, language) },
                  { label: t('principles_mistakes', language), text: localize(p.mistakes, language) },
                  { label: t('principles_task', language), text: localize(p.task, language) },
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
                  {done ? t('principles_done', language) : t('principles_mark_complete', language)}
                </button>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
