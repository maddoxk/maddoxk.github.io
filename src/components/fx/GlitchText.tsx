import { useEffect, useState } from 'react'

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
    const chars = '!<>-_\\/[]{}—=+*^?#________'
    let frame = 0
    const len = text.length
    const iv = setInterval(() => {
      let out = ''
      for (let i = 0; i < len; i++) {
        if (i < frame) out += text[i]
        else out += chars[Math.floor(Math.random() * chars.length)]
      }
      setDisplay(out)
      frame++
      if (frame > len) {
        clearInterval(iv)
        setDisplay(text)
      }
    }, 40)
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
      <span className="relative">{display}</span>
    </Tag>
  )
}
