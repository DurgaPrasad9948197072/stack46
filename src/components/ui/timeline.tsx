'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

/*
 * Scroll-beam timeline (Aceternity pattern, STACK46 dark theme): a vertical
 * rail runs down the left edge and a gradient beam fills it 1:1 with scroll —
 * pause and it freezes, scroll up and it drains back. Each entry's title
 * sticks beside its dot while the content scrolls past, and rows reveal with
 * a scrubbed fade-up as they enter the viewport.
 */

export interface TimelineEntry {
  title: string
  accent: string
  content: React.ReactNode
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (ref.current) setHeight(ref.current.getBoundingClientRect().height)
    }
    measure()
    /* re-measure once images settle and on resize so the beam end stays exact */
    const late = setTimeout(measure, 600)
    window.addEventListener('resize', measure)
    window.addEventListener('load', measure)
    return () => {
      clearTimeout(late)
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div className="w-full md:px-10" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-14 md:pt-32 md:gap-10">

            {/* Sticky dot + title */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full flex items-center justify-center"
                style={{ background: '#0D1530', border: '1px solid rgba(255,255,255,.1)' }}>
                <div className="h-3.5 w-3.5 rounded-full"
                  style={{ background: item.accent, boxShadow: `0 0 14px ${item.accent}`, border: '2px solid rgba(7,11,26,.6)' }} />
              </div>
              <h3 className="hidden md:flex items-center gap-4 text-xl md:pl-20 md:text-4xl lg:text-5xl font-black"
                style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.03em', color: item.accent }}>
                <span className="text-sm font-mono font-bold tracking-[0.3em] text-[#8892B0]">
                  0{index + 1}
                </span>
                {item.title}
              </h3>
            </div>

            {/* Content — scrubbed fade-up reveal, reverses on scroll up */}
            <motion.div className="relative pl-20 pr-4 md:pl-4 w-full"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <h3 className="md:hidden block text-2xl mb-4 text-left font-black"
                style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.02em', color: item.accent }}>
                <span className="text-xs font-mono font-bold tracking-[0.3em] text-[#8892B0] mr-3">0{index + 1}</span>
                {item.title}
              </h3>
              {item.content}
            </motion.div>
          </div>
        ))}

        {/* Rail + scroll-scrubbed gradient beam */}
        <div style={{ height: height + 'px' }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]">
          <div className="absolute inset-0 w-[2px]" style={{ background: 'rgba(255,255,255,.08)' }} />
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full"
          >
            <div className="absolute inset-0 rounded-full"
              style={{ background: 'linear-gradient(to bottom, transparent 0%, #2AACE2 12%, #4DD0C4 55%, #FFC845 100%)', boxShadow: '0 0 12px rgba(42,172,226,.6)' }} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Timeline
