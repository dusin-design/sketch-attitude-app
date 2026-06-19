import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { LanguageProvider } from './contexts/LanguageContext'
import { SettingsProvider } from './contexts/SettingsContext'
import BottomNav from './components/BottomNav'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import TrainPage from './pages/TrainPage'
import PrinciplesPage from './pages/PrinciplesPage'
import SettingsPage from './pages/SettingsPage'
import { TimerPage, FaceLabPage, StudioPage, ProgressPage, InspoPage } from './pages/OtherPages'
import GestureStudioPage from './pages/GestureStudioPage'

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontSize: 32,
        color: 'var(--accent)',
        letterSpacing: 2,
      }}>
        LOADING...
      </div>
    )
  }

  if (!user) return <AuthPage />

  return (
    <>
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/train"       element={<TrainPage />} />
        <Route path="/principles"  element={<PrinciplesPage />} />
        <Route path="/timer"       element={<TimerPage />} />
        <Route path="/facelab"     element={<FaceLabPage />} />
        <Route path="/studio"      element={<StudioPage />} />
        <Route path="/inspo"       element={<InspoPage />} />
        <Route path="/progress"    element={<ProgressPage />} />
        <Route path="/settings"    element={<SettingsPage />} />
        <Route path="/gesture-studio" element={<GestureStudioPage />} />
        <Route path="*"            element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNav />
    </>
  )
}

export default function App() {
  return (
    <SettingsProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </LanguageProvider>
    </SettingsProvider>
  )
}
