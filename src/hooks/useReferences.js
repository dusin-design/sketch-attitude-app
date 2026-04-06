import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// Utled kategori fra filnavn: "inspo_character_01.jpg" → "character"
function categoryFromName(name) {
  const match = name.match(/^inspo_([a-z]+)_/)
  return match ? match[1] : 'other'
}

export function useReferences() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.storage
        .from('sketches')
        .list('references', { sortBy: { column: 'name', order: 'asc' } })

      if (error) { console.error(error); setLoading(false); return }

      const withUrls = (data ?? []).map(file => {
        const { data: urlData } = supabase.storage
          .from('sketches')
          .getPublicUrl(`references/${file.name}`)
        return {
          name: file.name,
          url: urlData.publicUrl,
          category: categoryFromName(file.name),
        }
      })

      setImages(withUrls)
      setLoading(false)
    }
    load()
  }, [])

  return { images, loading }
}