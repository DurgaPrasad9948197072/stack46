'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import TubesCursor, { TubesCursorHandle } from '@/components/ui/tubes-cursor'

/* ───────────────────────────────────────────────
   Waits for the site intro overlay to finish
   (IntroAnimation removes data-intro from <html>)
   so the hero cascade plays right as it reveals.
─────────────────────────────────────────────── */
function useIntroDone() {
  const [done, setDone] = useState(false)
  useEffect(() => {
    const el = document.documentElement
    if (el.getAttribute('data-intro') !== 'true') { setDone(true); return }
    const obs = new MutationObserver(() => {
      if (el.getAttribute('data-intro') !== 'true') { setDone(true); obs.disconnect() }
    })
    obs.observe(el, { attributes: true, attributeFilter: ['data-intro'] })
    return () => obs.disconnect()
  }, [])
  return done
}

/* Per-letter masked reveal — each character rises out of an overflow-hidden line */
function Letters({ text, active, delay = 0, className = '', hoverLift = true, style }: {
  text: string; active: boolean; delay?: number; className?: string; hoverLift?: boolean; style?: React.CSSProperties
}) {
  return (
    <span className="block overflow-hidden" style={{ padding: '0.06em 0.02em' }}>
      {text.split('').map((ch, i) => (
        <motion.span key={i}
          className={`inline-block will-change-transform ${className}`}
          style={style}
          initial={{ y: '115%', rotate: 5 }}
          animate={active ? { y: 0, rotate: 0 } : { y: '115%', rotate: 5 }}
          transition={{ duration: 0.9, delay: delay + i * 0.038, ease: [0.16, 1, 0.3, 1] }}
          whileHover={hoverLift ? { y: -12, transition: { duration: 0.2, ease: 'easeOut' } } : undefined}>
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  )
}

/* Same node-constellation motif as the intro animation */
function NodeGraph() {
  const nodes = [{ cx: '8%', cy: '20%' }, { cx: '28%', cy: '8%' }, { cx: '52%', cy: '15%' }, { cx: '75%', cy: '5%' }, { cx: '90%', cy: '30%' }, { cx: '82%', cy: '60%' }, { cx: '60%', cy: '75%' }, { cx: '35%', cy: '80%' }, { cx: '15%', cy: '65%' }]
  const lines = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 0], [2, 6], [1, 7]]
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.14, zIndex: 1 }}>
      <defs>
        <linearGradient id="hero-nlg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E2A78" /><stop offset="50%" stopColor="#2AACE2" /><stop offset="100%" stopColor="#FFC845" />
        </linearGradient>
      </defs>
      {lines.map(([a, b], i) => (
        <line key={i} x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="url(#hero-nlg)" strokeWidth="1"
          style={{ animation: `nodePulse ${3 + i % 4}s ease-in-out ${i * 0.3}s infinite` }} />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r="4" fill="url(#hero-nlg)"
          style={{ animation: `nodePulse ${2 + i % 3}s ease-in-out ${i * 0.4}s infinite` }} />
      ))}
    </svg>
  )
}

/* Rotating circular text badge (Trionn-style) — click scrolls to services */
function SpinBadge({ active }: { active: boolean }) {
  return (
    <motion.button
      onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      className="relative w-28 h-28 md:w-36 md:h-36 cursor-pointer group flex-shrink-0"
      initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
      animate={active ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ duration: 1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
      aria-label="Scroll to services">
      <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
        <defs>
          <path id="hero-circle-path" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text style={{ fontSize: 8, letterSpacing: '1.6px', fontWeight: 600 }} fill="#8892B0">
          <textPath href="#hero-circle-path">SCROLL • STACK46 • DIGITAL AGENCY •&nbsp;</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[rgba(42,172,226,.2)]"
          style={{ background: 'rgba(42,172,226,.1)', border: '1px solid rgba(42,172,226,.3)' }}>
          <ArrowDown size={16} style={{ color: '#2AACE2' }} className="transition-transform duration-300 group-hover:translate-y-0.5" />
        </span>
      </span>
    </motion.button>
  )
}

/* ══════════════════ HERO ══════════════════ */
export default function TrionnHero() {
  const tubesRef = useRef<TubesCursorHandle>(null)
  const ready = useIntroDone()

  return (
    <section
      onClick={() => tubesRef.current?.shuffle()}
      className="relative z-10 min-h-screen flex flex-col overflow-hidden select-none"
      style={{ cursor: 'default' }}>

      {/* WebGL tubes following the cursor — brand palette, click shifts colours */}
      <TubesCursor ref={tubesRef} className="z-0 opacity-90" />

      {/* Intro node-constellation motif */}
      <NodeGraph />

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[2]"
        style={{ background: 'linear-gradient(to top, #070B1A 0%, transparent 100%)' }} />

      {/* ── Eyebrow ── */}
      <div className="relative z-10 flex justify-center pt-32 md:pt-36 px-6">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full text-xs font-semibold tracking-[0.22em] uppercase"
          style={{ background: 'rgba(7,11,26,.55)', border: '1px solid rgba(42,172,226,.25)', color: '#8892B0', backdropFilter: 'blur(12px)' }}>
          {/* mini node motif */}
          <svg width="26" height="14" viewBox="0 0 26 14" className="flex-shrink-0">
            <line x1="3" y1="11" x2="12" y2="3" stroke="#2AACE2" strokeWidth="1" />
            <line x1="12" y1="3" x2="23" y2="9" stroke="#4DD0C4" strokeWidth="1" />
            <circle cx="3" cy="11" r="2.2" fill="#1E2A78" />
            <circle cx="12" cy="3" r="2.2" fill="#2AACE2" />
            <circle cx="23" cy="9" r="2.2" fill="#FFC845" />
          </svg>
          Software Agency — London
        </motion.div>
      </div>

      {/* ── Headline ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center -mt-6">
        <h1 className="font-black leading-[0.92]"
          style={{ fontSize: 'clamp(3.4rem, 11.5vw, 9.5rem)', fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.03em' }}>
          <Letters text="WE BUILD" active={ready} delay={0.3} className="text-outline" />
          <Letters text="EXCEPTIONAL" active={ready} delay={0.62} className="grad-anim" hoverLift={false} />
          <Letters text="SOFTWARE" active={ready} delay={1.0} className="text-[#F0F4FF]" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 text-base md:text-lg text-[#8892B0] max-w-xl leading-relaxed"
          style={{ textShadow: '0 0 24px rgba(7,11,26,.9)' }}>
          Full-stack digital agency trusted by 150+ companies — web, mobile, AI and cloud, owned end-to-end.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.96 }}>
            <Link href="/contact"
              onClick={e => e.stopPropagation()}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold"
              style={{ background: 'linear-gradient(135deg,#1E2A78,#2AACE2)', color: '#fff', boxShadow: '0 0 48px rgba(42,172,226,.5), inset 0 1px 0 rgba(255,255,255,.15)' }}>
              Start Your Project <ArrowRight size={15} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link href="/fleet"
              onClick={e => e.stopPropagation()}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(7,11,26,.55)', border: '1px solid rgba(255,255,255,.14)', color: '#F0F4FF', backdropFilter: 'blur(12px)' }}>
              View Our Work
            </Link>
          </motion.div>
        </motion.div>

        {/* colour-shift hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2.4 }}
          className="mt-8 text-[11px] tracking-[0.18em] uppercase text-[#8892B0]/70">
          ✦ Click anywhere to shift the colours
        </motion.p>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-10 flex items-end justify-between px-6 md:px-12 pb-8 gap-6">
        {/* left: stats strip */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={ready ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-x-8 gap-y-2">
          {[
            { v: '150+', l: 'Projects shipped' },
            { v: '50+', l: 'Global clients' },
            { v: '99.9%', l: 'Uptime SLA' },
          ].map(s => (
            <div key={s.l} className="flex items-baseline gap-2">
              <span className="font-black text-lg md:text-xl text-[#F0F4FF]" style={{ fontFamily: 'var(--font-grotesk)' }}>{s.v}</span>
              <span className="text-xs text-[#8892B0]">{s.l}</span>
            </div>
          ))}
        </motion.div>

        {/* right: spinning badge */}
        <div className="hidden sm:block">
          <SpinBadge active={ready} />
        </div>
      </div>
    </section>
  )
}
