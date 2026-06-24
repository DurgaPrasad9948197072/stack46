'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown, Zap, Shield, Globe } from 'lucide-react'
import Link from 'next/link'

/* ─────────────────────────────────────────────────────────
   CURSOR NODE NETWORK  —  pure Canvas 2D, no React re-renders
   Nodes spawn near the cursor, connect when close, drift + fade.
───────────────────────────────────────────────────────── */
interface CNode {
  x: number; y: number
  vx: number; vy: number
  r: number
  life: number       // frames lived
  maxLife: number    // total lifespan in frames
  color: string
}

const PALETTE = ['#2AACE2','#4DD0C4','#2E49C9','#00B8D9','#FFC845','#1E2A78']

function CursorNodeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Size canvas to its CSS size
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const mouse = { x: -9999, y: -9999 }
    let lastSpawn = 0

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    canvas.addEventListener('mousemove', onMouseMove)

    const nodes: CNode[] = []
    const CONN_DIST  = 130   // px — max distance to draw an edge
    const SPAWN_GAP  = 65    // ms between spawns
    const MAX_NODES  = 70

    let raf = 0
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const W = canvas.width, H = canvas.height

      // Spawn near cursor
      if (now - lastSpawn > SPAWN_GAP && mouse.x > 0 && mouse.x < W && mouse.y > 0 && mouse.y < H) {
        lastSpawn = now
        if (nodes.length < MAX_NODES) {
          const angle  = Math.random() * Math.PI * 2
          const spread = 14 + Math.random() * 24
          nodes.push({
            x:       mouse.x + Math.cos(angle) * spread,
            y:       mouse.y + Math.sin(angle) * spread,
            vx:      (Math.random() - 0.5) * 0.55,
            vy:      (Math.random() - 0.5) * 0.55,
            r:       2.5 + Math.random() * 4,
            life:    0,
            maxLife: 200 + Math.random() * 200,
            color:   PALETTE[Math.floor(Math.random() * PALETTE.length)],
          })
        }
      }

      // Update nodes & remove dead
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i]
        n.x    += n.vx
        n.y    += n.vy
        n.vx   *= 0.994
        n.vy   *= 0.994
        n.life += 1
        if (n.life >= n.maxLife) nodes.splice(i, 1)
      }

      // Clear frame
      ctx.clearRect(0, 0, W, H)

      // Draw edges first (below nodes)
      ctx.lineWidth = 1.1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a  = nodes[i], b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d  = Math.sqrt(dx*dx + dy*dy)
          if (d > CONN_DIST) continue

          // Alpha: fade in for first 30 frames, fade out near end, diminish with distance
          const fadeA = Math.min(a.life / 30, 1) * Math.max(1 - a.life / a.maxLife, 0)
          const fadeB = Math.min(b.life / 30, 1) * Math.max(1 - b.life / b.maxLife, 0)
          const alpha = Math.min(fadeA, fadeB) * (1 - d / CONN_DIST) * 0.55

          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
          grad.addColorStop(0, a.color)
          grad.addColorStop(1, b.color)

          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = grad
          ctx.globalAlpha = alpha
          ctx.stroke()
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const alpha = Math.min(n.life / 30, 1) * Math.max(1 - n.life / n.maxLife, 0)
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = n.color
        ctx.fill()
      })

      ctx.globalAlpha = 1
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener('mousemove', onMouseMove)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'all', zIndex: 0 }}
    />
  )
}

/* ─── Magnetic CTA button ─── */
function MagneticButton({ children, href, primary }: { children: React.ReactNode; href: string; primary?: boolean }) {
  const ref  = useRef<HTMLDivElement>(null)
  const x    = useMotionValue(0)
  const y    = useMotionValue(0)
  const sx   = useSpring(x, { stiffness: 350, damping: 30 })
  const sy   = useSpring(y, { stiffness: 350, damping: 30 })
  const rotX = useTransform(sy, [-20, 20], [6, -6])
  const rotY = useTransform(sx, [-50, 50], [-6, 6])

  const onMove  = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set(e.clientX - r.left - r.width  / 2)
    y.set(e.clientY - r.top  - r.height / 2)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', display: 'inline-flex' }}
      whileTap={{ scale: 0.96 }}
    >
      <Link
        href={href}
        className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold cursor-pointer select-none transition-shadow duration-200 ${primary ? 'btn-primary' : 'btn-ghost'}`}
      >
        {children}
      </Link>
    </motion.div>
  )
}

const WORDS1    = ['We', 'Build']
const WORDS2    = ['Digital', 'Futures']
const SPEC_WORDS = ['Web Applications','Mobile Apps','AI Solutions','Cloud Infrastructure','SaaS Products','Digital Experiences']

const wv = {
  hidden:  { opacity: 0, y: 34 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.82, delay: 0.22 + i * 0.13, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

/* ─── Main export ─── */
export default function HomeHero() {
  const [wordIdx, setWordIdx] = useState(0)
  const [display, setDisplay] = useState('')
  const [typing,  setTyping]  = useState(true)
  const timer = useRef<ReturnType<typeof setTimeout>|null>(null)

  useEffect(() => {
    const word = SPEC_WORDS[wordIdx]
    if (typing) {
      if (display.length < word.length) {
        timer.current = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), 55)
      } else {
        timer.current = setTimeout(() => setTyping(false), 2000)
      }
    } else {
      if (display.length > 0) {
        timer.current = setTimeout(() => setDisplay(display.slice(0, -1)), 28)
      } else {
        setWordIdx(i => (i + 1) % SPEC_WORDS.length)
        setTyping(true)
      }
    }
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [display, typing, wordIdx])

  return (
    /* The section is the positioning root for the canvas */
    <div className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Interactive cursor node network fills entire hero ── */}
      <CursorNodeCanvas />

      {/* ── Text content — above the canvas ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-28">
        <div className="max-w-2xl">

          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 relative overflow-hidden"
            style={{ background: 'rgba(42,172,226,0.1)', border: '1px solid rgba(42,172,226,0.3)' }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg,#1E2A78,#2AACE2,#4DD0C4,#FFC845,#2AACE2,#1E2A78)',
                backgroundSize: '300% 100%', opacity: 0.5,
              }}
              animate={{ backgroundPosition: ['0% 50%','100% 50%','0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-[1px] rounded-full" style={{ background: '#070B1A' }} />
            <span className="relative z-10 w-2 h-2 rounded-full bg-[#4DD0C4] animate-pulse" />
            <span className="relative z-10 text-xs font-semibold text-[#2AACE2] tracking-wide">
              🇬🇧 UK Software Agency · Est. 2020 · Accepting Projects
            </span>
          </motion.div>

          {/* Headline — word by word */}
          <h1
            className="font-bold leading-[1.06] mb-6"
            style={{ fontSize: 'clamp(2.8rem,6vw,5.5rem)', fontFamily: 'var(--font-grotesk)' }}
          >
            <div className="flex flex-wrap gap-x-4 mb-1">
              {WORDS1.map((w, i) => (
                <motion.span key={w} custom={i} variants={wv} initial="hidden" animate="visible"
                  className="inline-block text-[#F0F4FF]">{w}</motion.span>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4">
              {WORDS2.map((w, i) => (
                <motion.span
                  key={w} custom={WORDS1.length + i} variants={wv} initial="hidden" animate="visible"
                  className="inline-block"
                  style={{
                    background: 'linear-gradient(135deg,#F0F4FF 0%,#C8D8FF 20%,#2AACE2 50%,#4DD0C4 75%,#FFC845 100%)',
                    backgroundSize: '300% 300%',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    animation: 'gradShift 7s ease infinite',
                  }}
                >{w}</motion.span>
              ))}
            </div>
          </h1>

          {/* Typing line */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap items-baseline gap-2 mb-6"
          >
            <span className="text-[#8892B0] text-xl">Specializing in</span>
            <span className="font-bold text-xl min-w-[240px]" style={{ fontFamily: 'var(--font-grotesk)', color: '#2AACE2' }}>
              {display}
              <span style={{ borderRight: '2px solid #2AACE2', marginLeft: 1, animation: 'blink 1.1s step-end infinite' }}>&nbsp;</span>
            </span>
          </motion.div>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-[#8892B0] text-lg leading-relaxed mb-10 max-w-[520px]"
          >
            A team of senior engineers, product designers, and strategists who turn ambitious ideas into exceptional digital products — on time, every time.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <MagneticButton href="/work" primary>
              View Our Work <ArrowRight size={15} />
            </MagneticButton>
            <MagneticButton href="/contact">
              Start a Project
            </MagneticButton>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="flex flex-wrap items-center gap-6"
          >
            {[
              { icon: Zap,    label: '5-day sprints' },
              { icon: Shield, label: 'UK-based team' },
              { icon: Globe,  label: 'Global delivery' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-[#8892B0]">
                <Icon size={14} style={{ color: '#4DD0C4' }} /> {label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
      >
        <span className="text-[10px] tracking-[.25em] text-[#8892B0] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ChevronDown size={15} style={{ color: '#2AACE2' }} />
        </motion.div>
      </motion.div>
    </div>
  )
}
