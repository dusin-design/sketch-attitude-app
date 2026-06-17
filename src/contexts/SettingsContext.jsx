import { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext(null)

const THEME_KEY = 'sketch-attitude-theme'
const TEXT_SCALE_KEY = 'sketch-attitude-text-scale'

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem(THEME_KEY) || 'light'
  })

  const [textScale, setTextScale] = useState(() => {
    if (typeof window === 'undefined') return 100
    return Number(localStorage.getItem(TEXT_SCALE_KEY)) || 100
  })

  // Apply theme as a data attribute on <html> so CSS variables can switch
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  // Apply text scale using CSS zoom — scales all text, spacing, and icons
  // uniformly, the same mechanism as native browser zoom.
  useEffect(() => {
    document.documentElement.style.zoom = `${textScale}%`
    localStorage.setItem(TEXT_SCALE_KEY, String(textScale))
  }, [textScale])

  return (
    <SettingsContext.Provider value={{ theme, setTheme, textScale, setTextScale }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return ctx
}
