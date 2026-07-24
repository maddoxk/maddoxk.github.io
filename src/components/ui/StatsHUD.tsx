import { useEffect, useState } from 'react'
import { STATS } from '@/data/stats'
import { useInView } from '@/hooks/useInView'
import { Card, CardContent } from '@/components/ui/card'

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
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map(s => (
        <Card key={s.label} className="bg-card/40 border-border/50 backdrop-blur-md hover:border-primary/40 transition-colors">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{s.label}</span>
            <div className="mt-3">
              <div className="text-3xl font-bold font-sans tracking-tight text-foreground tabular-nums">
                {inView ? <Counter value={s.value} /> : '0'}<span className="text-primary">{s.suffix}</span>
              </div>
              <div className="h-1.5 w-full bg-muted/60 rounded-full overflow-hidden mt-3">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out rounded-full"
                  style={{
                    width: inView ? `${s.fill * 100}%` : '0%',
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
