import { useEffect, useRef, useState } from 'react'
import { STATS } from '@/data/stats'

function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true)
        io.disconnect()
      }
    }, { threshold: 0.3 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return { ref, inView }
}

function Counter({ value, duration = 1200 }: { value: number; duration?: number }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(value * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])
  return <>{n.toLocaleString()}</>
}

export default function StatsHUD() {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className="panel cyber-border p-6 font-mono text-sm">
      <div className="text-xs text-cyan-neon tracking-widest mb-4">&gt; STATS.db</div>
      <ul className="space-y-3">
        {STATS.map(s => (
          <li key={s.label} className="grid grid-cols-[160px_1fr_auto] gap-4 items-center">
            <span className="text-muted">&gt; {s.label}</span>
            <div className="h-2 bg-deep overflow-hidden relative">
              <div
                className="h-full transition-[width] duration-1000 ease-out"
                style={{
                  width: inView ? `${s.fill * 100}%` : '0%',
                  background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))',
                  boxShadow: 'var(--glow-cyan-sm)',
                }}
              />
            </div>
            <span className="text-cyan-neon tabular-nums">
              {inView ? <Counter value={s.value} /> : '0'}{s.suffix}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
