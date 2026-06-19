import { useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../data/strings'
import { useUIChrome } from '../contexts/UIChromeContext'

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const { immersive } = useUIChrome()
  if (immersive) return null

  const NAV_ITEMS = [
    { path: '/',          labelKey: 'nav_home',  icon: HomeIcon },
    { path: '/inspo',     labelKey: 'nav_inspo', icon: InspoIcon },
    { path: '/train',     labelKey: 'nav_train', icon: TrainIcon },
    { path: '/timer',     labelKey: 'nav_timer', icon: TimerIcon },
    { path: '/progress',  labelKey: 'nav_stats', icon: StatsIcon },
  ]

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'var(--card)',
      borderTop: '2px solid var(--border)',
      display: 'flex',
      zIndex: 100,
      paddingBottom: 'env(safe-area-inset-bottom)',
      boxShadow: '0 -2px 12px rgba(42,37,32,.08)',
    }}>
      {NAV_ITEMS.map(({ path, labelKey, icon: Icon }) => {
        const active = location.pathname === path
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              padding: '10px 4px 8px',
              background: 'none',
              border: 'none',
              color: active ? 'var(--accent)' : 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              cursor: 'pointer',
              letterSpacing: '.5px',
              transition: 'color .2s',
            }}
          >
            <Icon size={20} />
            {t(labelKey, language)}
          </button>
        )
      })}
    </nav>
  )
}

function HomeIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
    </svg>
  )
}
function InspoIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="3" width="16" height="13" rx="2" />
      <path d="M2 13l4-4 3 3 3-4 6 5" />
    </svg>
  )
}
function TrainIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="10" cy="10" r="7" />
      <path d="M10 7v3l2 2" />
    </svg>
  )
}
function TimerIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M10 6v4l2.5 2.5M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}
function StatsIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4 14l4-4 3 3 5-6" />
    </svg>
  )
}
