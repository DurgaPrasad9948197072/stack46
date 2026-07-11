'use client'
import { motion } from 'framer-motion'

/* Route transition — every page enters with a soft rise + fade (re-runs per navigation) */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  )
}
