import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BootSequence() {
  const seen = typeof window !== 'undefined' && sessionStorage.getItem('portfolio:loaded') === '1'
  const [visible, setVisible] = useState(!seen)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!visible) return

    // Smooth progress counter from 0 to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        const next = prev + Math.floor(Math.random() * 18) + 8
        return next > 100 ? 100 : next
      })
    }, 90)

    const timer = setTimeout(() => {
      sessionStorage.setItem('portfolio:loaded', '1')
      setVisible(false)
    }, 1400)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-background select-none px-6"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          {/* Minimalist Monogram Logo & Progress Indicator */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex flex-col items-center max-w-xs w-full"
          >
            {/* Monogram Box */}
            <div className="w-14 h-14 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-xl flex items-center justify-center mb-6 shadow-xl shadow-primary/5 ring-1 ring-primary/20">
              <span className="font-mono font-bold text-xl tracking-tighter text-foreground">
                MK<span className="text-primary">.</span>
              </span>
            </div>

            {/* Title */}
            <div className="font-sans font-semibold text-sm tracking-wide text-foreground mb-1">
              MADDOX KRAPE
            </div>
            <div className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-6">
              SYSTEM INITIALIZING
            </div>

            {/* Minimal Progress Bar */}
            <div className="w-full h-1 bg-secondary/80 rounded-full overflow-hidden mb-3 border border-border/40">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Percentage Indicator */}
            <div className="font-mono text-[10px] text-muted-foreground tracking-widest">
              {progress}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
