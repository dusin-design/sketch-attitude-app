import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useProgress(userId) {
  const [completedDays, setCompletedDays] = useState(new Set())
  const [completedPrinciples, setCompletedPrinciples] = useState(new Set())
  const [streak, setStreak] = useState(0)
  const [totalMinutes, setTotalMinutes] = useState(0)
  const [loading, setLoading] = useState(true)

  // Load progress from Supabase
  const loadProgress = useCallback(async () => {
    if (!userId) { setLoading(false); return }
    setLoading(true)

    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error loading progress:', error)
    }

    if (data) {
      setCompletedDays(new Set(data.completed_days ?? []))
      setCompletedPrinciples(new Set(data.completed_principles ?? []))
      setStreak(data.streak ?? 0)
      setTotalMinutes(data.total_minutes ?? 0)
    }
    setLoading(false)
  }, [userId])

  useEffect(() => { loadProgress() }, [loadProgress])

  // Save progress back to Supabase (upsert = insert or update)
  const saveProgress = useCallback(async (updates) => {
    if (!userId) return
    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        completed_days: Array.from(updates.completedDays ?? completedDays),
        completed_principles: Array.from(updates.completedPrinciples ?? completedPrinciples),
        streak: updates.streak ?? streak,
        total_minutes: updates.totalMinutes ?? totalMinutes,
        updated_at: new Date().toISOString(),
      })
    if (error) console.error('Error saving progress:', error)
  }, [userId, completedDays, completedPrinciples, streak, totalMinutes])

  // Auto streak
 const markDayComplete = useCallback(async (day) => {
  const next = new Set(completedDays)
  next.add(day)
  setCompletedDays(next)

  // Lagre dagen
  await saveProgress({ completedDays: next })

  // Beregn ny streak via Supabase-funksjonen
  const { data, error } = await supabase.rpc('calculate_streak', {
    p_user_id: userId,
    p_completed_days: Array.from(next),
  })

  if (!error && data !== null) {
    setStreak(data)
  }
}, [userId, completedDays, saveProgress])

  const markPrincipleComplete = useCallback(async (principleId) => {
    const next = new Set(completedPrinciples)
    next.add(principleId)
    setCompletedPrinciples(next)
    await saveProgress({ completedPrinciples: next })
  }, [completedPrinciples, saveProgress])

  const addMinutes = useCallback(async (mins) => {
    const next = totalMinutes + mins
    setTotalMinutes(next)
    await saveProgress({ totalMinutes: next })
  }, [totalMinutes, saveProgress])

  const completedDaysCount = completedDays.size
  const progressPct = Math.round((completedDaysCount / 30) * 100)
  const currentDay = completedDaysCount + 1

  return {
    loading,
    completedDays,
    completedPrinciples,
    streak,
    totalMinutes,
    completedDaysCount,
    progressPct,
    currentDay,
    markDayComplete,
    markPrincipleComplete,
    addMinutes,
  }
}
