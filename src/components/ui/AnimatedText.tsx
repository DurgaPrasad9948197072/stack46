'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

/*
 * True scroll-scrubbed masked word reveal.
 * Word position is a pure function of scroll progress — scrolling down
 * reveals, scrolling up plays the exact animation backwards. No timers.
 */
export interface TextSegment {
  text: string
  className?: string
  style?: React.CSSProperties
}

function Word({ progress, range, className, style, children }: {
  progress: MotionValue<number>
  range: [number, number]
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  const y = useTransform(progress, range, ['118%', '0%'])
  return (
    <span className="inline-block overflow-hidden align-bottom"
      style={{ padding: '0.12em 0.02em', margin: '-0.12em -0.02em' }}>
      <motion.span className={`inline-block will-change-transform ${className ?? ''}`} style={{ y, ...style }}>
        {children}
      </motion.span>
    </span>
  )
}

export default function AnimatedText({ segments, delay = 0 }: {
  segments: TextSegment[]
  delay?: number
  stagger?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  /* Reveal happens while the heading travels from 95% to 55% of the viewport */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.55'] })

  const words = segments.flatMap(seg =>
    seg.text.split(' ').map(word => ({ word, className: seg.className, style: seg.style }))
  )
  const n = Math.max(words.length, 1)
  /* delay (formerly seconds) becomes a progress offset so multi-line staggering still works */
  const offset = Math.min(delay * 0.9, 0.4)

  return (
    <span ref={ref}>
      {words.map((w, i) => {
        const start = Math.min(offset + (i / n) * 0.5, 0.55)
        const end = Math.min(start + 0.45, 1)
        return (
          <span key={i}>
            <Word progress={scrollYProgress} range={[start, end]} className={w.className} style={w.style}>
              {w.word}
            </Word>
            {' '}
          </span>
        )
      })}
    </span>
  )
}
