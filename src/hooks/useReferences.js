import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const CATEGORY_INFO = {
  character: {
    label: { en: 'Character Design', no: 'Karakterdesign' },
    desc: {
      en: 'Study how personality, history, and attitude are built into a single figure.',
      no: 'Studer hvordan personlighet, historie og attitude bygges inn i én figur.',
    },
    tip: {
      en: 'Design characters, not generic humans. Every figure should imply a backstory.',
      no: 'Design karakterer, ikke generiske mennesker. Hver figur bør antyde en bakgrunnshistorie.',
    },
  },
  clothing: {
    label: { en: 'Clothing & Identity', no: 'Klær og identitet' },
    desc: {
      en: 'The jacket tells you who they are before you see their face.',
      no: 'Jakken forteller deg hvem de er før du ser ansiktet.',
    },
    tip: {
      en: 'Design 3 characters you can identify by clothes alone, without faces.',
      no: 'Design 3 karakterer du kan identifisere kun ved klærne, uten ansikter.',
    },
  },
  expressions: {
    label: { en: 'Expressions', no: 'Uttrykk' },
    desc: {
      en: 'Asymmetry, heavy lids, and tension carry more personality than symmetrical faces.',
      no: 'Asymmetri, tunge øyelokk og spenning bærer mer personlighet enn symmetriske ansikter.',
    },
    tip: {
      en: 'Draw 20 expression variations. Push asymmetry until it feels wrong — then go further.',
      no: 'Tegn 20 uttrykksvariasjoner. Press asymmetrien til det føles feil — og gå lenger.',
    },
  },
  face: {
    label: { en: 'Face Structure', no: 'Ansiktsstruktur' },
    desc: {
      en: 'Cheekbones, jaw angle, brow ridge — architecture before expression.',
      no: 'Kinnbein, kjevevinkel, brynbue — arkitektur før uttrykk.',
    },
    tip: {
      en: 'Map the skull planes before drawing features. Structure first, character second.',
      no: 'Kartlegg kraniets flater før du tegner detaljer. Struktur først, karakter etterpå.',
    },
  },
  gesture: {
    label: { en: 'Gesture & Energy', no: 'Gest og energi' },
    desc: {
      en: 'Start with the spine. The energy line is the foundation of every good figure.',
      no: 'Start med ryggraden. Energilinjen er fundamentet for hver god figur.',
    },
    tip: {
      en: 'Draw 10 gesture lines in 2 minutes. No detail. Pure energy.',
      no: 'Tegn 10 gestelinjer på 2 minutter. Ingen detaljer. Bare energi.',
    },
  },
  ink: {
    label: { en: 'Ink Confidence', no: 'Blekksikkerhet' },
    desc: {
      en: 'Commit to the line. The wobble is not a mistake — it is the character.',
      no: 'Forplikt deg til linjen. Vinglingen er ikke en feil — den er karakteren.',
    },
    tip: {
      en: 'Draw without lifting the pen. No erasing. Bold and fast.',
      no: 'Tegn uten å lette pennen. Ingen utvisking. Dristig og raskt.',
    },
  },
  linework: {
    label: { en: 'Linework', no: 'Linjearbeid' },
    desc: {
      en: 'Over-polished lines kill the life in a drawing. Controlled mess is more dynamic.',
      no: 'Overpolerte linjer dreper livet i en tegning. Kontrollert rot er mer dynamisk.',
    },
    tip: {
      en: 'Draw a character without lifting the pen. Then draw it again even faster.',
      no: 'Tegn en karakter uten å lette pennen. Tegn den deretter på nytt, enda raskere.',
    },
  },
  pose: {
    label: { en: 'Attitude & Pose', no: 'Attitude og pose' },
    desc: {
      en: 'Hip tilt + shoulder angle + head tilt = an opinion. Neutral kills the drawing.',
      no: 'Hoftehelling + skuldervinkel + hodevinkel = en mening. Neutralt dreper tegningen.',
    },
    tip: {
      en: 'Push every angle 30% further than feels comfortable. Exaggerate.',
      no: 'Press hver vinkel 30% lenger enn det føles komfortabelt. Eksagerer.',
    },
  },
  silhouette: {
    label: { en: 'Silhouette', no: 'Silhuett' },
    desc: {
      en: 'Fill it black. Does it still work? If yes, the design is solid.',
      no: 'Fyll den svart. Fungerer den fortsatt? Hvis ja, er designet solid.',
    },
    tip: {
      en: 'Draw 5 characters as solid black shapes only. No interior lines allowed.',
      no: 'Tegn 5 karakterer som kun solide svarte former. Ingen indre linjer tillatt.',
    },
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
          info: CATEGORY_INFO[category] ?? {
            label: { en: category, no: category },
            desc: { en: '', no: '' },
            tip: { en: '', no: '' },
          },
        }
      })

      setImages(withUrls)
      setLoading(false)
    }
    load()
  }, [])

  return { images, loading }
}
