import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  '> ESTABLISHING SECURE CONNECTION...',
  '> IDENTITY: MADDOX_KRAPE',
  '> LOADING PORTFOLIO.sys',
  '> [################] 100%',
  '> READY',
]

export default function BootSequence() {
  const seen = typeof window !== 'undefined' && sessionStorage.getItem('portfolio:booted') === '1'
  const [visible, setVisible] = useState(!seen)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!visible) return
    const timers: number[] = []
    LINES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setShown(i + 1), i * 280))
    })
    timers.push(
      window.setTimeout(() => {
        sessionStorage.setItem('portfolio:booted', '1')
        setVisible(false)
      }, LINES.length * 280 + 400),
    )
    return () => timers.forEach(clearTimeout)
  }, [visible])

  useEffect(() => {
    if (!visible) return
    const skip = () => setVisible(false)
    window.addEventListener('click', skip)
    window.addEventListener('keydown', skip)
    return () => {
      window.removeEventListener('click', skip)
      window.removeEventListener('keydown', skip)
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[var(--bg-void)]"
        >
          <div className="font-mono text-cyan-neon text-lg md:text-xl max-w-2xl px-8 w-full">
            {LINES.slice(0, shown).map((l, i) => (
              <div key={i} className="mb-2" style={{ textShadow: 'var(--glow-cyan-sm)' }}>
                {l}
              </div>
            ))}
            <div className="inline-block w-3 h-5 bg-cyan-neon animate-pulse" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
