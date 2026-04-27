import { useEffect, useState } from 'react'

// Pool of glyphs the scrambler picks from. Underscores are weighted heavily
// so the scramble has the empty-terminal-cell look during the reveal sweep.
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________'
const TICK_MS = 40

export default function GlitchText({
  text,
  className = '',
  as: Tag = 'span',
}: {
  text: string
  className?: string
  as?: 'span' | 'h1' | 'h2' | 'h3'
}) {
  const [display, setDisplay] = useState('')
  useEffect(() => {
    let frame = 0
    const len = text.length
    const iv = setInterval(() => {
      let out = ''
      for (let i = 0; i < len; i++) {
        if (i < frame) out += text[i]
        else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      }
      setDisplay(out)
      frame++
      if (frame > len) {
        clearInterval(iv)
        setDisplay(text)
      }
    }, TICK_MS)
    return () => clearInterval(iv)
  }, [text])

  return (
    <Tag className={`relative inline-block ${className}`} aria-label={text}>
      <span
        aria-hidden
        className="absolute inset-0"
        style={{ color: 'var(--neon-magenta)', transform: 'translate(-2px, 0)', mixBlendMode: 'screen' }}
      >
        {display}
      </span>
      <span
        aria-hidden
        className="absolute inset-0"
        style={{ color: 'var(--neon-cyan)', transform: 'translate(2px, 0)', mixBlendMode: 'screen' }}
      >
        {display}
      </span>
      {/* aria-hidden because the wrapper carries aria-label={text}; without
          this the screen reader would announce the scrambled glyphs too. */}
      <span aria-hidden className="relative">{display}</span>
    </Tag>
  )
}
