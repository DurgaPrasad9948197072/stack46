'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface AnimCardProps {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
  accentColor?: string
  noTilt?: boolean
}

export default function AnimCard({
  children,
  delay = 0,
  className = '',
  style,
  accentColor = '#2AACE2',
  noTilt = false,
}: AnimCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  // Intersection observer for scroll reveal
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1, rootMargin: '-40px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })
  const rotateX = useTransform(springY, [-60, 60], noTilt ? [0, 0] : [7, -7])
  const rotateY = useTransform(springX, [-60, 60], noTilt ? [0, 0] : [-7, 7])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); setHovered(false) }

  return (
    <motion.div
      ref={ref}
      style={{ ...style, rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6 }}
      className={`relative overflow-hidden cursor-default rounded-2xl border border-white/[0.08] ${className}`}
    >
      {/* Gradient border that glows on hover */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `linear-gradient(135deg, ${accentColor}40, transparent, ${accentColor}25)`,
          border: `1px solid ${accentColor}60`,
          boxShadow: `0 0 30px ${accentColor}20, inset 0 0 30px ${accentColor}08`,
        }}
      />

      {/* Shine sweep on hover */}
      <motion.div
        className="absolute inset-y-0 pointer-events-none"
        initial={{ left: '-65%', skewX: -15 }}
        animate={hovered ? { left: '130%' } : { left: '-65%' }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
        style={{
          width: '55%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
        }}
      />

      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-8 right-8 h-px rounded-full pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`, transformOrigin: 'center' }}
      />

      {children}
    </motion.div>
  )
}
