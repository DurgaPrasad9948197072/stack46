'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/*
 * Trionn-style custom cursor: a precise brand dot + a trailing spring ring
 * that swells over interactive elements. Desktop pointers only — never
 * rendered on touch devices. Native cursor stays for accessibility.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    const onMove = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      setHovering(!!t?.closest?.('a, button, [role="button"], input, textarea, select, .cursor-pointer'))
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [x, y])

  if (!enabled) return null
  return (
    <>
      {/* precise dot */}
      <motion.div
        className="fixed top-0 left-0 z-[400] pointer-events-none rounded-full"
        style={{ x, y, translateX: '-50%', translateY: '-50%', width: 6, height: 6, background: '#2AACE2', boxShadow: '0 0 10px rgba(42,172,226,.8)' }} />
      {/* trailing ring */}
      <motion.div
        className="fixed top-0 left-0 z-[400] pointer-events-none rounded-full"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%', border: '1px solid rgba(42,172,226,.55)' }}
        animate={{
          width: hovering ? 54 : 32,
          height: hovering ? 54 : 32,
          opacity: hovering ? 1 : 0.55,
          backgroundColor: hovering ? 'rgba(42,172,226,.08)' : 'rgba(42,172,226,0)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }} />
    </>
  )
}
