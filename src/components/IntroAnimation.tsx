'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Node / Edge data (original spec) ─── */
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

const EDGES: [number, number][] = [
  [1, 2], [1, 11], [4, 3], [3, 7], [4, 5],
  [5, 6], [7, 8],  [8, 9], [9, 10],[10, 11],
]

const GRAD_COLORS = ['#241D8F','#2E49C9','#2395F0','#34C4F5','#7EC8B6','#F2D34D']

const X_MIN = Math.min(...NODES.map(n => n.x))
const X_MAX = Math.max(...NODES.map(n => n.x))
const xNorm = (x: number) => (x - X_MIN) / (X_MAX - X_MIN)

function gradColor(nx: number): string {
  const stops = GRAD_COLORS.length - 1
  const pos   = Math.min(Math.max(nx * stops, 0), stops)
  const lo    = Math.floor(pos)
  const hi    = Math.min(lo + 1, stops)
  const t     = pos - lo
  const hr    = (h: string) => [
    parseInt(h.slice(1,3), 16),
    parseInt(h.slice(3,5), 16),
    parseInt(h.slice(5,7), 16),
  ]
  const a = hr(GRAD_COLORS[lo])
  const b = hr(GRAD_COLORS[hi])
  return `rgb(${Math.round(a[0]+(b[0]-a[0])*t)},${Math.round(a[1]+(b[1]-a[1])*t)},${Math.round(a[2]+(b[2]-a[2])*t)})`
}

function nodeColor(id: number) {
  return gradColor(xNorm(NODES.find(n => n.id === id)!.x))
}

function linePath(from: number, to: number) {
  const a = NODES.find(n => n.id === from)!
  const b = NODES.find(n => n.id === to)!
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`
}

const LABEL         = 'STACK46'
const NODE_STAGGER  = 0.11
const NODE_START_MS = 400
const EDGE_START_MS = NODE_START_MS + Math.round(11 * NODE_STAGGER * 1000) + 200
const TEXT_START_MS = EDGE_START_MS + 10 * 170 + 500
const BAR_START_MS  = TEXT_START_MS + LABEL.length * 100 + 350
const DONE_MS       = BAR_START_MS + 1600 + 700

export default function IntroAnimation() {
  const [show,      setShow]      = useState(false)
  const [phase,     setPhase]     = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [barW,      setBarW]      = useState(0)
  const barTimer = useRef<ReturnType<typeof setInterval>|null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('s46-intro-done')) {
      document.documentElement.removeAttribute('data-intro')
      document.body.style.overflow = ''
      return
    }

    setShow(true)
    document.body.style.overflow = 'hidden'

    const t1 = setTimeout(() => setPhase(1), NODE_START_MS)
    const t2 = setTimeout(() => setPhase(2), EDGE_START_MS)
    const t3 = setTimeout(() => setPhase(3), TEXT_START_MS)
    const t4 = setTimeout(() => setPhase(4), BAR_START_MS)
    const t5 = setTimeout(() => {
      let w = 0
      barTimer.current = setInterval(() => {
        w += 2
        setBarW(Math.min(w, 100))
        if (w >= 100) { clearInterval(barTimer.current!); setPhase(5) }
      }, 22)
    }, BAR_START_MS + 150)

    const t6 = setTimeout(() => {
      document.documentElement.removeAttribute('data-intro')
      document.body.style.overflow = ''
      sessionStorage.setItem('s46-intro-done', '1')
      setShow(false)
    }, DONE_MS)

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
      clearTimeout(t4); clearTimeout(t5); clearTimeout(t6)
      if (barTimer.current) clearInterval(barTimer.current)
      document.documentElement.removeAttribute('data-intro')
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (phase !== 3) return
    let i = 0
    const t = setInterval(() => {
      i++; setCharCount(i)
      if (i >= LABEL.length) clearInterval(t)
    }, 100)
    return () => clearInterval(t)
  }, [phase])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          id="intro-overlay"
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#05081A', userSelect: 'none', overflow: 'hidden',
          }}
        >
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

          {/* ── Content ── */}
          <div style={{
            position: 'relative', zIndex: 1,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32,
            width: '100%', maxWidth: 620, padding: '0 24px',
          }}>

            {/* SVG Logo */}
            <motion.svg
              viewBox="0 0 1000 700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.08 }}
              style={{ width: '100%', maxWidth: 500, overflow: 'visible' }}
              aria-label="STACK46 logo"
            >
              <defs>
                <linearGradient id="lg46" x1="80" y1="0" x2="860" y2="0" gradientUnits="userSpaceOnUse">
                  {GRAD_COLORS.map((c, i) => (
                    <stop key={c} offset={`${(i/(GRAD_COLORS.length-1))*100}%`} stopColor={c} />
                  ))}
                </linearGradient>
              </defs>

              {/* Phase 1 — nodes pop in staggered */}
              {NODES.map((n, idx) => (
                <motion.circle
                  key={`n${n.id}`}
                  cx={n.x} cy={n.y} r={n.r}
                  fill={nodeColor(n.id)}
                  style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={phase >= 1 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{
                    scale:   { type: 'spring', stiffness: 320, damping: 22, delay: idx * NODE_STAGGER },
                    opacity: { duration: 0.22, delay: idx * NODE_STAGGER },
                  }}
                />
              ))}

              {/* Phase 2 — edges draw one by one */}
              {EDGES.map(([from, to], idx) => (
                <motion.path
                  key={`e${from}-${to}`}
                  d={linePath(from, to)}
                  stroke="url(#lg46)"
                  strokeWidth={18}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={phase >= 2 ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  transition={{
                    pathLength: { duration: 0.5, delay: idx * 0.17, ease: [0.4,0,0.2,1] },
                    opacity:    { duration: 0.08, delay: idx * 0.17 },
                  }}
                />
              ))}
            </motion.svg>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 8 }}
              transition={{ duration: 0.28 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
            >
              <div style={{
                fontFamily: 'var(--font-grotesk, sans-serif)',
                fontSize: 'clamp(1.8rem,5.5vw,3rem)',
                fontWeight: 700,
                letterSpacing: '0.24em',
                background: 'linear-gradient(135deg,#241D8F 0%,#2AACE2 40%,#4DD0C4 70%,#F2D34D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                minHeight: '1.2em',
              }}>
                {LABEL.slice(0, charCount)}
                {charCount < LABEL.length && phase >= 3 && (
                  <span style={{
                    display: 'inline-block', width: 3, height: '0.8em',
                    background: '#2AACE2', verticalAlign: 'middle',
                    marginLeft: 3, borderRadius: 2,
                    animation: 'introBlink 1s step-end infinite',
                  }} />
                )}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: charCount >= LABEL.length ? 0.55 : 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  color: '#8892B0', fontSize: '0.68rem',
                  letterSpacing: '0.32em', textTransform: 'uppercase',
                  fontFamily: 'var(--font-dm, sans-serif)',
                  margin: 0,
                }}
              >
                We Build Digital Futures
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 4 ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ width: 200, height: 2, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}
            >
              <div style={{
                height: '100%', borderRadius: 999,
                width: `${barW}%`,
                background: 'linear-gradient(90deg,#241D8F,#2395F0,#4DD0C4,#F2D34D)',
                boxShadow: '0 0 8px rgba(42,172,226,0.65)',
                transition: 'width 0.022s linear',
              }} />
            </motion.div>
          </div>

          {/* Exit vignette */}
          <motion.div
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, #05081A 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 5 ? 1 : 0 }}
            transition={{ duration: 0.7 }}
          />

          <style>{`@keyframes introBlink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
