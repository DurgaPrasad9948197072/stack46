'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

/*
 * Pinned horizontal scroll journey (Trionn pattern): the section is a tall
 * vertical track; while it's pinned, vertical scroll translates the panel
 * strip horizontally. Transform-only — no layout thrash.
 */

const PANELS = [
  { n: '01', title: 'LogiFlow', tag: 'FinTech · Supply Chain', result: '25% operating cost cut across an 800-vehicle network.', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80', accent: '#2AACE2' },
  { n: '02', title: 'NexusAI', tag: 'SaaS · AI Platform', result: '3× data throughput. 50TB migrated in one weekend, zero loss.', img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80', accent: '#FFC845' },
  { n: '03', title: 'RetailHub', tag: 'E-Commerce · Mobile', result: '4.9★ App Store rating and 2M DAU within ninety days.', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80', accent: '#22c55e' },
  { n: '04', title: 'MedTrack', tag: 'HealthTech · Compliance', result: 'HIPAA-compliant mobile platform shipped in ten weeks.', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80', accent: '#a855f7' },
  { n: '05', title: 'CloudBase', tag: 'Enterprise · Platform', result: 'Legacy monolith to microservices with zero downtime.', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80', accent: '#06b6d4' },
  { n: '06', title: 'EduSpark', tag: 'EdTech · Web Platform', result: '400k students onboarded in the first enrolment season.', img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=900&q=80', accent: '#4DD0C4' },
  { n: '07', title: 'PayNest', tag: 'FinTech · Payments', result: 'PCI-DSS payment rails processing £2M/day at 99.99% uptime.', img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80', accent: '#f97316' },
  { n: '08', title: 'TerraGrid', tag: 'Energy · IoT', result: '12,000 smart meters streaming live telemetry, 40% grid savings.', img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=80', accent: '#ec4899' },
]

export default function HorizontalWork() {
  const trackRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  /* MotionValue (not state) so the x-transform always reads the live width */
  const shiftMV = useMotionValue(0)
  /* Pin length derived from the real strip width: 1px of horizontal travel
     costs 1.6px of vertical scroll — slow, deliberate sweep on every device. */
  const [trackH, setTrackH] = useState<string>('420vh')

  /* Measure the real strip width so the sweep ends EXACTLY when the last
     panel is fully in view — no dead scroll, no cut-off panels. */
  useEffect(() => {
    const measure = () => {
      if (!stripRef.current) return
      const total = stripRef.current.scrollWidth
      const shift = Math.max(total - window.innerWidth + 48, 0)
      shiftMV.set(shift)
      setTrackH(`${Math.round(window.innerHeight + shift * 1.6)}px`)
    }
    measure()
    const late = setTimeout(measure, 400) /* after fonts/images settle */
    window.addEventListener('resize', measure)
    const ro = new ResizeObserver(measure)
    if (stripRef.current) ro.observe(stripRef.current)
    return () => { clearTimeout(late); window.removeEventListener('resize', measure); ro.disconnect() }
  }, [shiftMV])

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  /* Pixel-exact: progress 1 ⇒ last card flush at right edge ⇒ section unpins.
     Combined transform stays live even when the measured width updates. */
  const x = useTransform([scrollYProgress, shiftMV], (latest: number[]) => -latest[0] * latest[1])
  const progressScale = scrollYProgress

  return (
    <section ref={trackRef} className="relative z-10" style={{ height: trackH }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

        {/* Header */}
        <div className="max-w-7xl mx-auto w-full px-6 mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(42,172,226,.1)', border: '1px solid rgba(42,172,226,.25)', color: '#2AACE2' }}>
            Case Studies
          </span>
          <h2 className="text-4xl md:text-6xl font-black leading-[0.97]" style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.035em' }}>
            The journey{' '}
            <span style={{ background: 'linear-gradient(135deg,#2AACE2,#FFC845)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              sideways.
            </span>
          </h2>
        </div>

        {/* Horizontal strip */}
        <motion.div ref={stripRef} style={{ x }} className="flex gap-6 pl-6 md:pl-[8vw] will-change-transform">
          {PANELS.map(p => (
            <div key={p.n}
              className="relative flex-shrink-0 rounded-3xl overflow-hidden group"
              style={{ width: 'min(78vw, 640px)', height: 'min(54vh, 460px)', border: '1px solid rgba(255,255,255,.08)' }}>
              <img src={p.img} alt={p.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                draggable={false} loading="lazy" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,11,26,.95) 0%, rgba(7,11,26,.35) 55%, rgba(7,11,26,.1) 100%)' }} />

              {/* Giant index */}
              <div className="absolute top-6 right-8 font-black select-none leading-none"
                style={{ fontSize: 'clamp(4rem,8vw,7rem)', color: p.accent, opacity: 0.2, fontFamily: 'var(--font-grotesk)' }}>
                {p.n}
              </div>

              {/* Copy */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold mb-3"
                  style={{ background: `${p.accent}20`, color: p.accent, border: `1px solid ${p.accent}40` }}>
                  {p.tag}
                </span>
                <h3 className="font-black text-2xl md:text-3xl text-[#F0F4FF] mb-2" style={{ fontFamily: 'var(--font-grotesk)' }}>{p.title}</h3>
                <p className="text-sm text-[#8892B0] max-w-md leading-relaxed">{p.result}</p>
              </div>
            </div>
          ))}

          {/* End CTA panel */}
          <div className="relative flex-shrink-0 rounded-3xl overflow-hidden glass-md border border-white/[0.08] flex flex-col items-center justify-center text-center p-10"
            style={{ width: 'min(78vw, 640px)', height: 'min(54vh, 460px)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 60%, rgba(42,172,226,.16) 0%, transparent 70%)' }} />
            <h3 className="font-black text-3xl md:text-4xl text-[#F0F4FF] mb-4 relative z-10" style={{ fontFamily: 'var(--font-grotesk)' }}>
              Your project{' '}
              <span style={{ background: 'linear-gradient(135deg,#2AACE2,#FFC845)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>next?</span>
            </h3>
            <p className="text-sm text-[#8892B0] mb-8 max-w-sm relative z-10">Proposal within 48 hours. Free discovery call, no commitment.</p>
            <Link href="/contact"
              className="relative z-10 inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold transition-transform duration-200 hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#1E2A78,#2AACE2)', color: '#fff', boxShadow: '0 0 40px rgba(42,172,226,.4)' }}>
              Start the Conversation <ArrowUpRight size={15} />
            </Link>
          </div>
        </motion.div>

        {/* Scroll progress rail */}
        <div className="max-w-7xl mx-auto w-full px-6 mt-10">
          <div className="h-px w-full relative" style={{ background: 'rgba(255,255,255,.08)' }}>
            <motion.div className="absolute inset-y-0 left-0 w-full"
              style={{ scaleX: progressScale, transformOrigin: '0% 50%', background: 'linear-gradient(90deg,#1E2A78,#2AACE2,#FFC845)' }} />
          </div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#8892B0] mt-3">Scroll to travel</p>
        </div>
      </div>
    </section>
  )
}
