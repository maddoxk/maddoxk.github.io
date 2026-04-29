import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const loc = useLocation()
  const [prevKey, setPrevKey] = useState(loc.pathname)
  const [sweeping, setSweeping] = useState(false)

  useEffect(() => {
    if (prevKey !== loc.pathname) {
      setSweeping(true)
      const t = setTimeout(() => {
        setSweeping(false)
        setPrevKey(loc.pathname)
      }, 700)
      return () => clearTimeout(t)
    }
  }, [loc.pathname, prevKey])

  return (
    <>
      <AnimatePresence>
        {sweeping && (
          <motion.div
            key="scan"
            initial={{ y: '-100%' }}
            animate={{ y: '100%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[500] pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(0, 240, 255, 0.15) 48%, var(--neon-cyan) 50%, rgba(0, 240, 255, 0.15) 52%, transparent 100%)',
              boxShadow: '0 0 60px rgba(0, 240, 255, 0.5)',
            }}
          />
        )}
      </AnimatePresence>
      <motion.div
        key={loc.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  )
}
