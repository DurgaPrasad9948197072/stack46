'use client'
import { motion, useScroll, useSpring } from 'framer-motion'

/* Thin scroll-linked gradient progress bar pinned above everything */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[300] pointer-events-none"
      style={{
        scaleX,
        transformOrigin: '0% 50%',
        background: 'linear-gradient(90deg,#1E2A78,#2AACE2,#4DD0C4,#FFC845)',
        boxShadow: '0 0 12px rgba(42,172,226,.6)',
      }} />
  )
}
