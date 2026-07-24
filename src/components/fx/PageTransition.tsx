import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const loc = useLocation()

  return (
    <motion.div
      key={loc.pathname}
      initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -8, filter: 'blur(2px)' }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1], // Smooth cubic-bezier ease-out
      }}
    >
      {children}
    </motion.div>
  )
}
