'use client'
import { motion } from 'framer-motion'

/*
 * Trionn-style masked word reveal. Each word rises out of its own
 * overflow-hidden mask when the heading scrolls into view.
 * Segments allow mixed styling (e.g. gradient words) in one heading.
 */
export interface TextSegment {
  text: string
  className?: string
  style?: React.CSSProperties
}

export default function AnimatedText({ segments, delay = 0, stagger = 0.055 }: {
  segments: TextSegment[]
  delay?: number
  stagger?: number
}) {
  let wordIdx = 0
  return (
    <>
      {segments.map((seg, si) =>
        seg.text.split(' ').map((word, wi) => {
          const d = delay + wordIdx++ * stagger
          return (
            <span key={`${si}-${wi}`}>
              <span className="inline-block overflow-hidden align-bottom"
                style={{ padding: '0.12em 0.02em', margin: '-0.12em -0.02em' }}>
                <motion.span
                  className={`inline-block will-change-transform ${seg.className ?? ''}`}
                  style={seg.style}
                  initial={{ y: '118%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] }}>
                  {word}
                </motion.span>
              </span>
              {' '}
            </span>
          )
        })
      )}
    </>
  )
}
