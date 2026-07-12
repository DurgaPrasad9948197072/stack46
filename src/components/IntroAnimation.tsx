'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/*
 * STACK46 intro — the brand logo traced live, like a circuit powering up.
 *
 * The node/edge layout is the exact structure of the logo mark (the "46"
 * built from dots and connecting lines). Choreography:
 *
 *   1. The dark navy anchor node (bottom-left of the "4") lands first.
 *   2. Lines draw outward along the logo's real geometry, and every node
 *      pops at the exact moment its line reaches it — the "4" first, the
 *      "6" following, both strokes racing in parallel.
 *   3. The final line closes the "6" into the "4"'s bar and fires a
 *      ripple at the junction — the circuit completes.
 *   4. STACK46 rises letter-by-letter through a mask, tagline follows.
 *   5. The overlay lifts away like a curtain (with a curved trailing
 *      edge), revealing the page underneath.
 *
 * Plays once per session (sessionStorage), respects reduced motion, and
 * keeps the html[data-intro] contract: content stays hidden until the
 * curtain starts to lift.
 */

/* ─── Logo geometry (matches public/logo.png) ─── */
const NODES = [
  { id: 1,  x: 80,  y: 500, r: 40 },
  { id: 2,  x: 450, y: 90,  r: 35 },
  { id: 3,  x: 420, y: 300, r: 35 },
  { id: 4,  x: 700, y: 100, r: 35 },
  { id: 5,  x: 860, y: 100, r: 35 },
  { id: 6,  x: 860, y: 230, r: 35 },
  { id: 7,  x: 720, y: 300, r: 35 },
  { id: 8,  x: 860, y: 500, r: 35 },
  { id: 9,  x: 700, y: 650, r: 35 },
  { id: 10, x: 520, y: 650, r: 35 },
  { id: 11, x: 520, y: 500, r: 35 },
]

/* Each edge draws in sequence; `start`/`dur` in seconds. Two strokes race
   in parallel: the "4" (from the navy anchor) and the "6" (from its top). */
const EDGES: { from: number; to: number; start: number; dur: number }[] = [
  /* the "4" */
  { from: 1,  to: 2,  start: 0.50, dur: 0.45 },
  { from: 1,  to: 11, start: 0.65, dur: 0.40 },
  /* the "6" — top hook */
  { from: 4,  to: 5,  start: 0.95, dur: 0.30 },
  { from: 5,  to: 6,  start: 1.30, dur: 0.30 },
  /* the "6" — spine and bowl, walking down to meet the "4" */
  { from: 4,  to: 3,  start: 1.05, dur: 0.35 },
  { from: 3,  to: 7,  start: 1.45, dur: 0.30 },
  { from: 7,  to: 8,  start: 1.80, dur: 0.30 },
  { from: 8,  to: 9,  start: 2.15, dur: 0.25 },
  { from: 9,  to: 10, start: 2.45, dur: 0.25 },
  { from: 10, to: 11, start: 2.75, dur: 0.25 },
]

/* A node pops the moment a line arrives at it (or, for stroke origins,
   just before its first line leaves). */
const NODE_TIMES: Record<number, number> = {
  1: 0.32, 2: 0.90, 11: 1.00,
  4: 0.80, 5: 1.20, 6: 1.55,
  3: 1.35, 7: 1.70, 8: 2.05, 9: 2.35, 10: 2.65,
}

/* The moment the last edge closes the circuit at node 11 */
const RIPPLE_AT = 3.0

const GRAD_COLORS = ['#241D8F', '#2E49C9', '#2395F0', '#34C4F5', '#7EC8B6', '#F2D34D']

const X_MIN = Math.min(...NODES.map(n => n.x))
const X_MAX = Math.max(...NODES.map(n => n.x))

function gradColor(nx: number): string {
  const stops = GRAD_COLORS.length - 1
  const pos = Math.min(Math.max(nx * stops, 0), stops)
  const lo = Math.floor(pos)
  const hi = Math.min(lo + 1, stops)
  const t = pos - lo
  const hr = (h: string) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]
  const a = hr(GRAD_COLORS[lo])
  const b = hr(GRAD_COLORS[hi])
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(a[2] + (b[2] - a[2]) * t)})`
}

const node = (id: number) => NODES.find(n => n.id === id)!
const nodeColor = (id: number) => gradColor((node(id).x - X_MIN) / (X_MAX - X_MIN))
const linePath = (from: number, to: number) =>
  `M ${node(from).x} ${node(from).y} L ${node(to).x} ${node(to).y}`

const LABEL = 'STACK46'
const TEXT_AT = 2.7        /* letters start rising while the bowl finishes */
const TAGLINE_AT = 3.35
const EXIT_MS = 4300       /* content scales away */
const REVEAL_MS = 4450     /* curtain starts lifting + page becomes visible */
const DONE_MS = 5500       /* overlay unmounts */

const RISE = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }

export default function IntroAnimation() {
  const [show, setShow] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const done = () => {
      document.documentElement.removeAttribute('data-intro')
      document.body.style.overflow = ''
    }
    /* already played this session, or the visitor prefers reduced motion */
    if (sessionStorage.getItem('s46-intro-done') ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sessionStorage.setItem('s46-intro-done', '1')
      done()
      return
    }

    setShow(true)
    document.body.style.overflow = 'hidden'

    const t1 = setTimeout(() => setExiting(true), EXIT_MS)
    const t2 = setTimeout(() => {
      /* page content fades in underneath while the curtain lifts */
      sessionStorage.setItem('s46-intro-done', '1')
      done()
    }, REVEAL_MS)
    const t3 = setTimeout(() => setShow(false), DONE_MS)

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
      done()
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          id="intro-overlay"
          key="intro"
          initial={{ y: 0 }}
          animate={exiting ? { y: '-102%' } : { y: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#05081A', userSelect: 'none',
          }}
        >
          {/* Curved trailing edge — reads as the curtain's belly as it lifts */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: '100%', left: '-10%', width: '120%', height: 120,
            background: '#05081A', borderRadius: '0 0 100% 100%', marginTop: -1,
          }} />

          {/* Dot grid */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(rgba(42,172,226,0.38) 1px, transparent 1px)',
            backgroundSize: '52px 52px', opacity: 0.15,
          }} />

          {/* Glow orbs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            style={{
              position: 'absolute', width: 800, height: 800, borderRadius: '50%',
              left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
              background: 'radial-gradient(circle, rgba(36,29,143,0.55) 0%, rgba(46,73,201,0.16) 45%, transparent 70%)',
              filter: 'blur(55px)', pointerEvents: 'none',
            }}
          />
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 0.14 }}
            transition={{ duration: 1.4, delay: 0.3 }}
            style={{
              position: 'absolute', width: 460, height: 360, borderRadius: '50%',
              right: '6%', top: '8%',
              background: 'radial-gradient(circle, rgba(52,196,245,0.3) 0%, transparent 70%)',
              filter: 'blur(65px)', pointerEvents: 'none',
            }}
          />
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 0.12 }}
            transition={{ duration: 1.4, delay: 0.5 }}
            style={{
              position: 'absolute', width: 380, height: 380, borderRadius: '50%',
              left: '4%', bottom: '8%',
              background: 'radial-gradient(circle, rgba(242,211,77,0.18) 0%, transparent 70%)',
              filter: 'blur(65px)', pointerEvents: 'none',
            }}
          />

          {/* ── Content (scales away just before the curtain lifts) ── */}
          <motion.div
            animate={exiting ? { scale: 0.92, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'relative', zIndex: 1,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30,
              width: '100%', maxWidth: 620, padding: '0 24px',
            }}
          >
            {/* SVG logo — traced exactly along the mark's geometry */}
            <svg
              viewBox="0 0 1000 700"
              style={{ width: '100%', maxWidth: 480, overflow: 'visible' }}
              aria-label="STACK46 logo"
            >
              <defs>
                <linearGradient id="lg46" x1="80" y1="0" x2="860" y2="0" gradientUnits="userSpaceOnUse">
                  {GRAD_COLORS.map((c, i) => (
                    <stop key={c} offset={`${(i / (GRAD_COLORS.length - 1)) * 100}%`} stopColor={c} />
                  ))}
                </linearGradient>
                <filter id="nodeGlow" x="-120%" y="-120%" width="340%" height="340%">
                  <feGaussianBlur stdDeviation="16" />
                </filter>
              </defs>

              {/* Edges — each line draws in sequence along the logo */}
              {EDGES.map(e => (
                <motion.path
                  key={`e${e.from}-${e.to}`}
                  d={linePath(e.from, e.to)}
                  stroke="url(#lg46)"
                  strokeWidth={18}
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: e.dur, delay: e.start, ease: [0.4, 0, 0.2, 1] },
                    opacity: { duration: 0.05, delay: e.start },
                  }}
                />
              ))}

              {/* Nodes — soft glow behind, dot pops as its line arrives */}
              {NODES.map(n => (
                <g key={`n${n.id}`}>
                  <motion.circle
                    cx={n.x} cy={n.y} r={n.r * 1.7}
                    fill={nodeColor(n.id)}
                    filter="url(#nodeGlow)"
                    style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.28 }}
                    transition={{ duration: 0.5, delay: NODE_TIMES[n.id], ease: 'easeOut' }}
                  />
                  <motion.circle
                    cx={n.x} cy={n.y} r={n.r}
                    fill={nodeColor(n.id)}
                    style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      scale: { type: 'spring', stiffness: 340, damping: 20, delay: NODE_TIMES[n.id] },
                      opacity: { duration: 0.18, delay: NODE_TIMES[n.id] },
                    }}
                  />
                </g>
              ))}

              {/* Circuit-complete ripple where the "6" meets the "4" */}
              <motion.circle
                cx={node(11).x} cy={node(11).y} r={node(11).r}
                fill="none" stroke={nodeColor(11)} strokeWidth={6}
                style={{ transformOrigin: `${node(11).x}px ${node(11).y}px` }}
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: [1, 2.6], opacity: [0.8, 0] }}
                transition={{ duration: 0.8, delay: RIPPLE_AT, ease: 'easeOut' }}
              />
            </svg>

            {/* Brand name — letters rise through a mask, gradient continuous */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', overflow: 'hidden', padding: '0.08em 0' }} aria-label="STACK46">
                {LABEL.split('').map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: '115%' }}
                    animate={{ y: 0 }}
                    transition={{ ...RISE, delay: TEXT_AT + i * 0.06 }}
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-grotesk, sans-serif)',
                      fontSize: 'clamp(1.9rem,5.5vw,3rem)',
                      fontWeight: 800,
                      letterSpacing: '0.22em',
                      backgroundImage: 'linear-gradient(90deg,#241D8F 0%,#2395F0 38%,#4DD0C4 68%,#F2D34D 100%)',
                      backgroundSize: `${LABEL.length * 100}% 100%`,
                      backgroundPosition: `${(i / (LABEL.length - 1)) * 100}% 0`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.55, y: 0 }}
                transition={{ duration: 0.5, delay: TAGLINE_AT }}
                style={{
                  color: '#8892B0', fontSize: '0.68rem',
                  letterSpacing: '0.32em', textTransform: 'uppercase',
                  fontFamily: 'var(--font-dm, sans-serif)', margin: 0,
                }}
              >
                We Build Digital Futures
              </motion.p>
            </div>

            {/* Progress hairline — fills across the whole trace */}
            <div style={{ width: 210, height: 2, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 3.4, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  height: '100%', borderRadius: 999, transformOrigin: '0% 50%',
                  background: 'linear-gradient(90deg,#241D8F,#2395F0,#4DD0C4,#F2D34D)',
                  boxShadow: '0 0 8px rgba(42,172,226,0.65)',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
