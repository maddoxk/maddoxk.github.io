import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    let rx = 0, ry = 0
    const onMove = (e: MouseEvent) => {
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`
      }
      const target = e.target as HTMLElement
      setHover(!!target.closest('a, button, [data-cursor="hover"]'))
      requestAnimationFrame(() => {
        rx += (e.clientX - rx) * 0.2
        ry += (e.clientY - ry) * 0.2
        if (ring.current) {
          ring.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`
        }
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[200]"
        style={{ background: 'var(--neon-cyan)', boxShadow: 'var(--glow-cyan-sm)' }}
      />
      <div
        ref={ring}
        aria-hidden
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[199] transition-[width,height,border-color] duration-200"
        style={{
          border: `1px solid ${hover ? 'var(--neon-magenta)' : 'var(--neon-cyan)'}`,
          transform: hover ? 'scale(1.6)' : undefined,
        }}
      />
    </>
  )
}
