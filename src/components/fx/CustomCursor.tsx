import { useEffect, useRef, useState } from 'react'

const HOVER_SELECTOR = 'a, button, [data-cursor="hover"]'
const RING_LERP = 0.2
const HOVER_SCALE = 1.6

function isTouchDevice() {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || !window.matchMedia('(pointer: fine)').matches
}

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const hoverRef = useRef(false)
  const [hover, setHover] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Touch / coarse-pointer guard lives inside the effect so we never bind
    // a mousemove listener on devices that don't need the custom cursor.
    if (isTouchDevice()) return
    setEnabled(true)

    let rafId = 0

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`
      }
      const el = e.target as HTMLElement | null
      const isHover = !!el?.closest?.(HOVER_SELECTOR)
      if (isHover !== hoverRef.current) {
        hoverRef.current = isHover
        setHover(isHover)
      }
    }

    // Single persistent rAF loop — real smoothing because the lerp toward
    // the latest target position runs every frame, not only on mousemove.
    // Combining translate + scale in one transform keeps hover sizing from
    // being clobbered by inline transform writes.
    const loop = () => {
      ringPos.current.x += (target.current.x - ringPos.current.x) * RING_LERP
      ringPos.current.y += (target.current.y - ringPos.current.y) * RING_LERP
      if (ring.current) {
        const tx = ringPos.current.x - 16
        const ty = ringPos.current.y - 16
        const scale = hoverRef.current ? HOVER_SCALE : 1
        ring.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`
      }
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (!enabled) return null

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
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[199] transition-[border-color] duration-200"
        style={{
          border: `1px solid ${hover ? 'var(--neon-magenta)' : 'var(--neon-cyan)'}`,
          willChange: 'transform',
        }}
      />
    </>
  )
}
