import { useEffect, useState } from 'react'

const TAGLINES = ['PROBLEM_SOLVER', 'DEVELOPER', 'STUDENT', 'DEBUGGER', 'COLLABORATOR']

// Tuning knobs:
// TYPE_MS - per-character delay while typing forward (~14 chars/sec).
// HOLD_MS - delay after the full word is shown before erasing begins.
// ERASE_MS - per-character delay while deleting (faster than typing).
const TYPE_MS = 70
const HOLD_MS = 1400
const ERASE_MS = 35

type Phase = 'typing' | 'erasing'

export default function CyclingTagline() {
  const [i, setI] = useState(0)
  const [txt, setTxt] = useState('')
  const [phase, setPhase] = useState<Phase>('typing')

  useEffect(() => {
    const target = TAGLINES[i]
    if (phase === 'typing') {
      if (txt.length < target.length) {
        const t = setTimeout(() => setTxt(target.slice(0, txt.length + 1)), TYPE_MS)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setPhase('erasing'), HOLD_MS)
      return () => clearTimeout(t)
    }
    // phase === 'erasing'
    if (txt.length > 0) {
      const t = setTimeout(() => setTxt(txt.slice(0, -1)), ERASE_MS)
      return () => clearTimeout(t)
    }
    setPhase('typing')
    setI((i + 1) % TAGLINES.length)
  }, [txt, phase, i])

  return (
    <span className="text-cyan-neon font-mono">
      {txt}
      <span className="inline-block w-2 h-5 bg-cyan-neon ml-1 animate-pulse" />
    </span>
  )
}
