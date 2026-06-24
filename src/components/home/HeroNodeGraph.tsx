'use client'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

/* ── Same nodes & edges as the intro animation ── */
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

function gradColor(nx: number): string {
  const stops = GRAD_COLORS.length - 1
  const pos   = Math.min(Math.max(nx * stops, 0), stops)
  const lo    = Math.floor(pos)
  const hi    = Math.min(lo + 1, stops)
  const t     = pos - lo
  const hr    = (h: string) => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)]
  const a     = hr(GRAD_COLORS[lo])
  const b     = hr(GRAD_COLORS[hi])
  return `rgb(${Math.round(a[0]+(b[0]-a[0])*t)},${Math.round(a[1]+(b[1]-a[1])*t)},${Math.round(a[2]+(b[2]-a[2])*t)})`
}

function nodeColor(id: number) {
  const xNorm = (NODES.find(n => n.id === id)!.x - X_MIN) / (X_MAX - X_MIN)
  return gradColor(xNorm)
}

function linePath(from: number, to: number) {
  const a = NODES.find(n => n.id === from)!
  const b = NODES.find(n => n.id === to)!
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`
}

const NODE_STAGGER = 0.10

export default function HeroNodeGraph() {
  const [nodesIn, setNodesIn] = useState(false)
  const [edgesIn, setEdgesIn] = useState(false)
  // Continuous edge "travel" animation — light sweeps along each edge repeatedly
  const [pulse, setPulse] = useState(false)
  const pulseRef = useRef<ReturnType<typeof setInterval>|null>(null)

  useEffect(() => {
    // Small delay so it starts after the hero text animates in
    const t1 = setTimeout(() => setNodesIn(true), 600)
    const t2 = setTimeout(() => setEdgesIn(true), 600 + 11 * NODE_STAGGER * 1000 + 200)

    // Subtle pulse every 4 s
    const t3 = setTimeout(() => {
      pulseRef.current = setInterval(() => {
        setPulse(true)
        setTimeout(() => setPulse(false), 700)
      }, 4000)
    }, 600 + 11 * NODE_STAGGER * 1000 + 10 * 180 + 600)

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
      if (pulseRef.current) clearInterval(pulseRef.current)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-full flex items-center justify-center"
      style={{ minHeight: 340 }}
    >
      {/* Soft background glow behind the graph */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '85%', height: '85%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30,42,120,0.28) 0%, rgba(42,172,226,0.08) 55%, transparent 75%)',
          filter: 'blur(32px)',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      />

      <svg
        viewBox="0 0 1000 700"
        style={{
          width: '100%',
          maxWidth: 480,
          overflow: 'visible',
          filter: 'drop-shadow(0 0 1px rgba(42,172,226,0.08))',
        }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="heroGrad" x1="80" y1="0" x2="860" y2="0" gradientUnits="userSpaceOnUse">
            {GRAD_COLORS.map((c, i) => (
              <stop key={c} offset={`${(i/(GRAD_COLORS.length-1))*100}%`} stopColor={c} />
            ))}
          </linearGradient>

          {/* Shimmer gradient for edge travel animation */}
          <linearGradient id="heroShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
            <stop offset="50%"  stopColor="rgba(255,255,255,0.55)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* ── EDGES ── drawn after nodes appear */}
        {EDGES.map(([from, to], idx) => (
          <motion.path
            key={`he${from}-${to}`}
            d={linePath(from, to)}
            stroke="url(#heroGrad)"
            strokeWidth={14}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeOpacity={0.75}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={edgesIn ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 0.55, delay: idx * 0.14, ease: [0.4,0,0.2,1] },
              opacity:    { duration: 0.1,  delay: idx * 0.14 },
            }}
          />
        ))}

        {/* ── NODES ── appear first, staggered */}
        {NODES.map((n, idx) => {
          const nc = nodeColor(n.id)
          return (
            <motion.circle
              key={`hn${n.id}`}
              cx={n.x} cy={n.y} r={n.r}
              fill={nc}
              fillOpacity={0.9}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={
                nodesIn
                  ? { scale: pulse ? 1.1 : 1, opacity: 1 }
                  : { scale: 0, opacity: 0 }
              }
              transition={
                nodesIn
                  ? pulse
                    ? { duration: 0.55, ease: 'easeInOut' }
                    : { scale: { type: 'spring', stiffness: 300, damping: 20, delay: idx * NODE_STAGGER }, opacity: { duration: 0.2, delay: idx * NODE_STAGGER } }
                  : { duration: 0.15 }
              }
            />
          )
        })}
      </svg>
    </motion.div>
  )
}
