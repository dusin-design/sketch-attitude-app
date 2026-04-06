import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useSketches(userId, day) {
  const [sketches, setSketches] = useState([])
  const [uploading, setUploading] = useState(false)

  const load = useCallback(async () => {
    if (!userId || !day) return
    const { data } = await supabase.storage
      .from('sketches')
      .list(`${userId}/day-${day}`)
    if (data) {
      const urls = await Promise.all(data.map(async file => {
        const { data: url } = supabase.storage
          .from('sketches')
          .getPublicUrl(`${userId}/day-${day}/${file.name}`)
        return { name: file.name, url: url.publicUrl }
      }))
      setSketches(urls)
    }
  }, [userId, day])

  useEffect(() => { load() }, [load])

  const upload = useCallback(async (file) => {
    if (!userId || !file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `${userId}/day-${day}/${Date.now()}.${ext}`
    const { error } = await supabase.storage
      .from('sketches')
      .upload(path, file)
    if (!error) await load()
    setUploading(false)
    return { error }
  }, [userId, day, load])

  const remove = useCallback(async (name) => {
    await supabase.storage
      .from('sketches')
      .remove([`${userId}/day-${day}/${name}`])
    setSketches(prev => prev.filter(s => s.name !== name))
  }, [userId, day])

  return { sketches, uploading, upload, remove }
}