import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const CATEGORY_INFO = {
  character: {
    label: 'Character Design',
    desc: 'Study how personality, history, and attitude are built into a single figure.',
    tip: 'Design characters, not generic humans. Every figure should imply a backstory.',
  },
  clothing: {
    label: 'Clothing & Identity',
    desc: 'The jacket tells you who they are before you see their face.',
    tip: 'Design 3 characters you can identify by clothes alone, without faces.',
  },
  expressions: {
    label: 'Expressions',
    desc: 'Asymmetry, heavy lids, and tension carry more personality than symmetrical faces.',
    tip: 'Draw 20 expression variations. Push asymmetry until it feels wrong — then go further.',
  },
  face: {
    label: 'Face Structure',
    desc: 'Cheekbones, jaw angle, brow ridge — architecture before expression.',
    tip: 'Map the skull planes before drawing features. Structure first, character second.',
  },
  gesture: {
    label: 'Gesture & Energy',
    desc: 'Start with the spine. The energy line is the foundation of every good figure.',
    tip: 'Draw 10 gesture lines in 2 minutes. No detail. Pure energy.',
  },
  ink: {
    label: 'Ink Confidence',
    desc: 'Commit to the line. The wobble is not a mistake — it is the character.',
    tip: 'Draw without lifting the pen. No erasing. Bold and fast.',
  },
  linework: {
    label: 'Linework',
    desc: 'Over-polished lines kill the life in a drawing. Controlled mess is more dynamic.',
    tip: 'Draw a character without lifting the pen. Then draw it again even faster.',
  },
  pose: {
    label: 'Attitude & Pose',
    desc: 'Hip tilt + shoulder angle + head tilt = an opinion. Neutral kills the drawing.',
    tip: 'Push every angle 30% further than feels comfortable. Exaggerate.',
  },
  silhouette: {
    label: 'Silhouette',
    desc: 'Fill it black. Does it still work? If yes, the design is solid.',
    tip: 'Draw 5 characters as solid black shapes only. No interior lines allowed.',
  },
}

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
        const category = categoryFromName(file.name)
        return {
          name: file.name,
          url: urlData.publicUrl,
          category,
          info: CATEGORY_INFO[category] ?? { label: category, desc: '', tip: '' },
        }
      })

      setImages(withUrls)
      setLoading(false)
    }
    load()
  }, [])

  return { images, loading }
}