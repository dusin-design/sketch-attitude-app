import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useCharacters(userId) {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    if (!userId) { setLoading(false); return }
    const { data } = await supabase
      .from('character_concepts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    setCharacters(data ?? [])
    setLoading(false)
  }, [userId])

  useEffect(() => { load() }, [load])

  const save = useCallback(async (concept) => {
    if (!userId) return
    const { data, error } = await supabase
      .from('character_concepts')
      .insert({ ...concept, user_id: userId })
      .select()
      .single()
    if (!error) setCharacters(prev => [data, ...prev])
    return { error }
  }, [userId])

  const remove = useCallback(async (id) => {
    await supabase.from('character_concepts').delete().eq('id', id)
    setCharacters(prev => prev.filter(c => c.id !== id))
  }, [])

  return { characters, loading, save, remove }
}