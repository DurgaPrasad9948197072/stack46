'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion, AnimatePresence, useInView, useScroll, useTransform,
  useMotionValue, useSpring, useMotionTemplate,
} from 'framer-motion'
import { useReveal } from '@/hooks/useReveal'
import {
  Code2, Cloud, Sparkles, Smartphone, Plug, ShieldCheck,
  Star, ArrowRight, GitBranch, Check, TrendingUp, ArrowUpRight,
} from 'lucide-react'

/* ══════════════════ DATA ══════════════════ */
const MARQUEE_TECH = ['React','Next.js','TypeScript','Node.js','Python','Go','AWS','GCP','Azure','Docker','Kubernetes','PostgreSQL','GraphQL','Figma','Flutter','Terraform']

const COMMITS = [
  { hash: 'a3f2c1d', msg: 'feat: real-time WebSocket subscriptions', author: 'SC', branch: 'main' },
  { hash: 'b9e4d7a', msg: 'perf: bundle size -34% → 102kB gzip',    author: 'JO', branch: 'main' },
  { hash: 'c1f8e9b', msg: 'fix: SQL query latency -60% via index',  author: 'PA', branch: 'hotfix' },
  { hash: 'd4a2f1c', msg: 'feat: AI inference pipeline v2 (94%)',    author: 'SC', branch: 'main' },
  { hash: 'e7b3c9d', msg: 'test: 847 suites → all green',           author: 'JO', branch: 'ci' },
  { hash: 'f1d6e8a', msg: 'chore: deploy v2.4.1 to production',     author: 'PA', branch: 'main' },
  { hash: 'g8c5b2e', msg: 'feat: Stripe webhook handler + retry',   author: 'SC', branch: 'main' },
  { hash: 'h3f9d1a', msg: 'refactor: auth middleware, -18% mem',    author: 'JO', branch: 'main' },
]

const HERO_PROJECTS = [
  { name: 'LogiFlow',   tag: 'FinTech · Supply Chain', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80', color: '#2AACE2', metric: '25% cost cut' },
  { name: 'NexusAI',   tag: 'SaaS · AI Platform',     img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80', color: '#FFC845', metric: '3× speed' },
  { name: 'RetailHub',  tag: 'E-Commerce · Mobile',   img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80', color: '#22c55e', metric: '4.9★ App Store' },
]

const FEATURES = [
  { icon: Code2,      title: 'Full-Stack Development', desc: 'Next.js, Node.js, TypeScript — pixel-perfect UIs to bulletproof APIs, owned end-to-end.', accent: '#2AACE2', span: 1 },
  { icon: Cloud,      title: 'Cloud & DevOps',          desc: 'AWS, GCP, Kubernetes — zero-downtime deployments, IaC and automated pipelines from day one.', accent: '#1E2A78', span: 1 },
  { icon: Sparkles,   title: 'AI & ML Solutions',       desc: 'LLMs, computer vision and predictive analytics — production grade, not proof-of-concept.', accent: '#FFC845', span: 1 },
  { icon: Smartphone, title: 'Mobile Development',      desc: 'React Native & Flutter — iOS and Android apps with native performance and 5-star UX.',    accent: '#22c55e', span: 1 },
  { icon: Plug,       title: 'API & Integrations',      desc: 'REST, GraphQL, webhooks — every tool in your ecosystem connected seamlessly at scale.',    accent: '#06b6d4', span: 2 },
  { icon: ShieldCheck,title: 'Security & Compliance',   desc: 'SOC 2, GDPR, OWASP Top 10 — security baked in from the very first commit, not bolted on.',  accent: '#a855f7', span: 1 },
]

const GALLERY_ITEMS = [
  { label: 'SaaS Platforms', count: '28+', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=700&q=80', color: '#2AACE2' },
  { label: 'E-Commerce',     count: '31+', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80', color: '#FFC845' },
  { label: 'Mobile Apps',    count: '22+', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80', color: '#22c55e' },
  { label: 'AI Solutions',   count: '14+', img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&q=80', color: '#a855f7' },
  { label: 'FinTech',        count: '19+', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&q=80', color: '#ef4444' },
  { label: 'Enterprise',     count: '15+', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80', color: '#06b6d4' },
  { label: 'HealthTech',     count: '11+', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80', color: '#f97316' },
  { label: 'EdTech',         count: '8+',  img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=700&q=80', color: '#4DD0C4' },
]

const STATS = [
  { val: 150, suffix: '+', label: 'Projects Delivered', color: '#2AACE2', max: 150, pct: 1 },
  { val: 50,  suffix: '+', label: 'Happy Clients',      color: '#FFC845', max: 50,  pct: 0.85 },
  { val: 8,   suffix: '+', label: 'Years Experience',   color: '#4DD0C4', max: 10,  pct: 0.8 },
  { val: 99,  suffix: '.9%',label:'Uptime SLA',         color: '#22c55e', max: 100, pct: 0.999 },
]

const STEPS = [
  { n: '01', title: 'Discovery & Strategy', desc: 'We learn your goals, users and constraints — then map the fastest path forward.', color: '#2AACE2' },
  { n: '02', title: 'Design & Prototype',   desc: 'Hi-fi Figma prototypes in 5 days. Validate the idea before writing a line of code.', color: '#FFC845' },
  { n: '03', title: 'Build & Deploy',       desc: '2-week sprints, daily standups, automated CI/CD — shipped fast without shortcuts.', color: '#06b6d4' },
  { n: '04', title: 'Scale & Support',      desc: 'Engineering retainers, SLA monitoring and long-term roadmap ownership.', color: '#22c55e' },
]

const ALL_TESTIMONIALS = [
  { name: 'Sarah Mitchell',  role: 'CTO, LogiFlow',           quote: "STACK46 delivered our platform 2 weeks early and 25% under budget. Best engineering team I have worked with, full stop.", stars: 5, initials: 'SM' },
  { name: 'James Okonkwo',   role: 'Founder, NexusAI',        quote: "Their AI pipeline tripled our data throughput overnight. They treated our product like it was their own company — obsessive.", stars: 5, initials: 'JO' },
  { name: 'Priya Anand',     role: 'CPO, RetailHub',          quote: "4.9 stars on the App Store in month three of launch. STACK46's design and engineering is genuinely in a different league.", stars: 5, initials: 'PA' },
  { name: 'David Chen',      role: 'CEO, DataSync',           quote: "They rebuilt our entire data platform in 6 weeks and didn't break a single production query. Incredible technical discipline.", stars: 5, initials: 'DC' },
  { name: 'Emma Thompson',   role: 'VP Engineering, CloudBase',quote: "Every engineer they placed was senior-level in practice, not just on paper. Code quality is outstanding — we kept two of them full-time.", stars: 5, initials: 'ET' },
  { name: 'Alex Rodriguez',  role: 'CTO, FinCore',            quote: "SOC 2 compliant, zero critical security findings post-audit. Rare to find an agency that treats security as seriously as we do.", stars: 5, initials: 'AR' },
  { name: 'Mei Lin',         role: 'Product Lead, ShopFlow',  quote: "Conversion rate up 34% post-launch. The UX thinking they brought to our checkout flow was beyond what we could have done internally.", stars: 5, initials: 'ML' },
  { name: 'Omar Hassan',     role: 'Founder, MedTrack',       quote: "HIPAA-compliant mobile app shipped in 10 weeks. They navigated the compliance complexity without slowing down development.", stars: 5, initials: 'OH' },
]
const TEST_ROW1 = ALL_TESTIMONIALS.slice(0, 4)
const TEST_ROW2 = ALL_TESTIMONIALS.slice(4)

/* ══════════════════ SUB-COMPONENTS ══════════════════ */

/* Animated count-up */
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let cur = 0; const step = target / 45
    const t = setInterval(() => { cur = Math.min(cur + step, target); setVal(Math.round(cur)); if (cur >= target) clearInterval(t) }, 28)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{val}{suffix}</span>
}

/* SVG ring + count-up stat */
function StatRing({ val, suffix, label, color, pct }: { val: number; suffix: string; label: string; color: string; pct: number }) {
  const ref = useRef<SVGCircleElement>(null)
  const inView = useInView(ref, { once: true })
  const r = 44; const circ = 2 * Math.PI * r
  return (
    <motion.div className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, scale: 0.7, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16,1,.3,1] }}>
      <div className="relative w-28 h-28">
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="7" />
          <motion.circle ref={ref} cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="7"
            strokeLinecap="round" strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={inView ? { strokeDashoffset: circ * (1 - pct) } : {}}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.4 }} />
        </svg>
        {/* Glow */}
        <div className="absolute inset-0 rounded-full pointer-events-none"
          style={{ boxShadow: `0 0 24px ${color}40`, borderRadius: '50%' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-black text-xl leading-none" style={{ color, fontFamily: 'var(--font-grotesk)' }}>
            <CountUp target={val} suffix={suffix} />
          </span>
        </div>
      </div>
      <p className="text-sm text-[#8892B0] text-center font-medium">{label}</p>
    </motion.div>
  )
}

/* 3D mouse-tilt card wrapper */
function TiltCard({ children, accent, className = '', style }: { children: React.ReactNode; accent: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0); const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 130, damping: 18 })
  const sy = useSpring(my, { stiffness: 130, damping: 18 })
  const rotX = useTransform(sy, [-0.5, 0.5], [9, -9])
  const rotY = useTransform(sx, [-0.5, 0.5], [-9, 9])
  const glowX = useTransform(sx, [-0.5, 0.5], [10, 90])
  const glowY = useTransform(sy, [-0.5, 0.5], [10, 90])
  const bg = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, ${accent}28 0%, transparent 55%)`
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0) }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', ...style }}
      whileHover={{ scale: 1.025, z: 24 }} className={`group relative cursor-default ${className}`}>
      <motion.div className="absolute inset-0 rounded-2xl pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: bg }} />
      {children}
    </motion.div>
  )
}

/* Horizontal drag gallery */
function DragGallery() {
  const [dragging, setDragging] = useState(false)
  const constraintRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={constraintRef} className="overflow-hidden cursor-grab active:cursor-grabbing select-none" style={{ perspective: 900 }}>
      <motion.div drag="x" dragConstraints={constraintRef} dragElastic={0.08}
        onDragStart={() => setDragging(true)} onDragEnd={() => setDragging(false)}
        className="flex gap-5 py-6 px-2" style={{ width: 'max-content' }}>
        {GALLERY_ITEMS.map((g, i) => (
          <motion.div key={g.label}
            style={{ width: 300, height: 400, flexShrink: 0 }}
            whileHover={!dragging ? { scale: 1.04, rotateY: i % 2 === 0 ? -4 : 4, z: 30 } : {}}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="rounded-3xl overflow-hidden relative border"
            style2={{ border: `1px solid rgba(255,255,255,.08)` } as React.CSSProperties}>
            <img src={g.img} alt={g.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" draggable={false} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(7,11,26,.9) 0%,rgba(7,11,26,.1) 55%,transparent 100%)' }} />
            <div className="absolute top-5 right-5 font-black text-5xl select-none" style={{ color: g.color, opacity: 0.15, fontFamily: 'var(--font-grotesk)' }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold mb-2"
                style={{ background: `${g.color}20`, color: g.color, border: `1px solid ${g.color}40` }}>{g.count} delivered</span>
              <h3 className="font-black text-xl text-[#F0F4FF]" style={{ fontFamily: 'var(--font-grotesk)' }}>{g.label}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

/* Testimonial card */
function TestCard({ t }: { t: typeof ALL_TESTIMONIALS[0] }) {
  return (
    <div className="flex-shrink-0 glass-md rounded-2xl p-6 mx-3 border border-white/[0.07] overflow-hidden"
      style={{ width: 320, whiteSpace: 'normal', wordBreak: 'break-word' }}>
      <div className="flex gap-1 mb-3">
        {[...Array(t.stars)].map((_, i) => <Star key={i} size={12} fill="#FFC845" style={{ color: '#FFC845' }} />)}
      </div>
      <p className="text-sm text-[#8892B0] leading-relaxed mb-5 italic"
        style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
          style={{ background: 'rgba(42,172,226,.18)', color: '#2AACE2' }}>{t.initials}</div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[#F0F4FF] truncate">{t.name}</p>
          <p className="text-[10px] text-[#8892B0] truncate">{t.role}</p>
        </div>
      </div>
    </div>
  )
}

/* Floating dot particles (client-only) */
function FloatingDots() {
  const [dots, setDots] = useState<{ x: number; y: number; s: number; d: number; dl: number }[]>([])
  useEffect(() => {
    setDots(Array.from({ length: 24 }, () => ({ x: Math.random() * 100, y: Math.random() * 100, s: 2 + Math.random() * 3, d: 4 + Math.random() * 5, dl: Math.random() * 3 })))
  }, [])
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ left: `${dot.x}%`, top: `${dot.y}%`, width: dot.s, height: dot.s, background: i % 3 === 0 ? '#FFC845' : i % 3 === 1 ? '#2AACE2' : '#4DD0C4', opacity: 0.35 }}
          animate={{ y: [-18, 18, -18], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: dot.d, delay: dot.dl, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  )
}

/* SVG node graph hero background */
function NodeGraph() {
  const nodes = [{ cx: '8%', cy: '20%' }, { cx: '28%', cy: '8%' }, { cx: '52%', cy: '15%' }, { cx: '75%', cy: '5%' }, { cx: '90%', cy: '30%' }, { cx: '82%', cy: '60%' }, { cx: '60%', cy: '75%' }, { cx: '35%', cy: '80%' }, { cx: '15%', cy: '65%' }]
  const lines = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,0],[2,6],[1,7]]
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.16, zIndex: 0 }}>
      <defs>
        <linearGradient id="nlg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E2A78" /><stop offset="50%" stopColor="#2AACE2" /><stop offset="100%" stopColor="#FFC845" />
        </linearGradient>
      </defs>
      {lines.map(([a, b], i) => <line key={i} x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy} stroke="url(#nlg)" strokeWidth="1" style={{ animation: `nodePulse ${3 + i % 4}s ease-in-out ${i * 0.3}s infinite` }} />)}
      {nodes.map((n, i) => <circle key={i} cx={n.cx} cy={n.cy} r="4" fill="url(#nlg)" style={{ animation: `nodePulse ${2 + i % 3}s ease-in-out ${i * 0.4}s infinite` }} />)}
    </svg>
  )
}

/* Commits feed */
function CommitsFeed() {
  const doubled = [...COMMITS, ...COMMITS]
  return (
    <div className="overflow-hidden" style={{ height: 220 }}>
      <div className="commits-scroll">
        {doubled.map((c, i) => (
          <div key={i} className="flex items-start gap-2.5 px-1 py-2 rounded-xl transition-colors hover:bg-white/[0.04]">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black flex-shrink-0 mt-0.5" style={{ background: 'rgba(42,172,226,.2)', color: '#2AACE2' }}>{c.author}</div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <GitBranch size={9} style={{ color: '#8892B0', flexShrink: 0 }} />
                <span className="text-[9px] text-[#8892B0] truncate">{c.branch}</span>
                <span className="text-[9px] font-mono text-[#4DD0C4] flex-shrink-0">{c.hash.slice(0, 7)}</span>
              </div>
              <p className="text-[11px] text-[#F0F4FF] leading-tight truncate">{c.msg}</p>
            </div>
            <Check size={11} style={{ color: '#22c55e', flexShrink: 0, marginTop: 2 }} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* Project carousel */
function ProjectCarousel() {
  const [active, setActive] = useState(0)
  useEffect(() => { const t = setInterval(() => setActive(i => (i + 1) % HERO_PROJECTS.length), 4200); return () => clearInterval(t) }, [])
  const p = HERO_PROJECTS[active]
  return (
    <div className="relative h-full overflow-hidden rounded-[inherit]">
      <AnimatePresence mode="wait">
        <motion.img key={active} src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16,1,.3,1] }} />
      </AnimatePresence>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(7,11,26,.95) 0%,rgba(7,11,26,.3) 55%,transparent 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: `${p.color}22`, color: p.color, border: `1px solid ${p.color}40` }}>{p.tag}</span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold glass" style={{ color: '#22c55e' }}>{p.metric}</span>
            </div>
            <p className="font-black text-xl text-[#F0F4FF]" style={{ fontFamily: 'var(--font-grotesk)' }}>{p.name}</p>
          </motion.div>
        </AnimatePresence>
        <div className="flex gap-1.5 mt-3">
          {HERO_PROJECTS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className="cursor-pointer transition-all duration-300"
              style={{ width: active === i ? 20 : 6, height: 6, borderRadius: 3, background: active === i ? p.color : 'rgba(255,255,255,.3)' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* Headline word stagger */
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } } }
const wordAnim   = { hidden: { opacity: 0, y: 52, filter: 'blur(14px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.88, ease: [0.16,1,.3,1] } } }

/* ══════════════════ HOME PAGE ══════════════════ */
export default function HomePage() {
  useReveal()

  return (
    <div className="relative overflow-x-hidden">

      {/* ████████ HERO — Bento Dashboard ████████ */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 py-16 pt-24">
        <NodeGraph />
        {/* scan line */}
        <div style={{ position:'absolute',left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(42,172,226,.5),transparent)',animation:'scanLine 6s linear infinite',top:0,pointerEvents:'none' }} />

        {/* live badge */}
        <motion.div initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{ background:'rgba(34,197,94,.08)', border:'1px solid rgba(34,197,94,.25)', color:'#22c55e' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation:'pulse-glow 2s ease-in-out infinite' }} />
            3 client projects in active development · Next delivery Thursday
          </div>
        </motion.div>

        {/* BENTO */}
        <div className="max-w-[1320px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Headline */}
          <motion.div initial={{ opacity:0,x:-40 }} animate={{ opacity:1,x:0 }} transition={{ duration:0.8,ease:[0.16,1,.3,1] }}
            className="lg:col-span-7 glass-md rounded-3xl p-8 md:p-10 border border-white/[0.07] flex flex-col justify-between relative overflow-hidden bento-card">
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full pointer-events-none" style={{ background:'radial-gradient(circle,rgba(30,42,120,.6) 0%,transparent 70%)',transform:'translate(-30%,-30%)' }} />
            <div className="relative z-10">
              <motion.h1 variants={container} initial="hidden" animate="visible"
                className="font-black leading-[0.97] mb-6 overflow-visible"
                style={{ fontSize:'clamp(3rem,7vw,5.4rem)', fontFamily:'var(--font-grotesk)', letterSpacing:'-0.03em' }}>
                <motion.span variants={wordAnim} className="block text-[#F0F4FF]">We build</motion.span>
                <motion.span variants={wordAnim} className="block grad-anim">exceptional</motion.span>
                <motion.span variants={wordAnim} className="block text-[#F0F4FF]">software.</motion.span>
              </motion.h1>
              <motion.p initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.8,duration:0.7 }}
                className="text-base md:text-lg text-[#8892B0] leading-relaxed mb-8 max-w-md">
                Full-stack agency trusted by 150+ companies — from London startups to global market leaders.
              </motion.p>
              <motion.div initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:1,duration:0.6 }} className="flex flex-wrap gap-3 mb-8">
                <motion.div whileHover={{ scale:1.04,y:-2 }} whileTap={{ scale:0.97 }}>
                  <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold"
                    style={{ background:'linear-gradient(135deg,#1E2A78,#2AACE2)',color:'#fff',boxShadow:'0 0 40px rgba(42,172,226,.45),inset 0 1px 0 rgba(255,255,255,.15)' }}>
                    Start Your Project <ArrowRight size={14} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}>
                  <Link href="/fleet" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold glass" style={{ color:'#F0F4FF' }}>
                    View Our Work
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.3 }}
              className="flex flex-wrap gap-3 pt-6 relative z-10" style={{ borderTop:'1px solid rgba(255,255,255,.07)' }}>
              {[{ v:'150+',l:'Projects',c:'#2AACE2' },{ v:'50+',l:'Clients',c:'#FFC845' },{ v:'99.9%',l:'SLA',c:'#22c55e' },{ v:'14-day',l:'Sprints',c:'#4DD0C4' }].map(s => (
                <div key={s.l} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background:`${s.c}12`,border:`1px solid ${s.c}30` }}>
                  <span className="font-black text-sm" style={{ color:s.c,fontFamily:'var(--font-grotesk)' }}>{s.v}</span>
                  <span className="text-xs text-[#8892B0]">{s.l}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right col */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <motion.div initial={{ opacity:0,y:-24 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.3,duration:0.7,ease:[0.16,1,.3,1] }}
              className="col-span-1 glass-md rounded-3xl p-5 bento-card border border-white/[0.07] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none" style={{ background:'radial-gradient(circle,rgba(34,197,94,.25) 0%,transparent 70%)',transform:'translate(30%,-30%)' }} />
              <div className="flex items-center gap-2 mb-4"><div className="w-2 h-2 rounded-full bg-green-400" style={{ animation:'pulse-glow 2s ease-in-out infinite' }} /><span className="text-xs font-semibold text-[#22c55e]">Deployed</span></div>
              <div className="font-black text-3xl mb-1" style={{ fontFamily:'var(--font-grotesk)',color:'#F0F4FF' }}>4.2s</div>
              <div className="text-xs text-[#8892B0] mb-4">build time</div>
              {[{ l:'Tests',v:'847 ✓',c:'#22c55e' },{ l:'Bundle',v:'102kB',c:'#2AACE2' },{ l:'Latency',v:'9ms',c:'#FFC845' }].map(r => (
                <div key={r.l} className="flex justify-between text-xs mb-1"><span className="text-[#8892B0]">{r.l}</span><span className="font-semibold" style={{ color:r.c }}>{r.v}</span></div>
              ))}
            </motion.div>
            <motion.div initial={{ opacity:0,y:-24 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.45,duration:0.7,ease:[0.16,1,.3,1] }}
              className="col-span-1 glass-md rounded-3xl p-5 bento-card border border-white/[0.07] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background:'radial-gradient(ellipse at 50% 120%,rgba(255,200,69,.18) 0%,transparent 70%)' }} />
              <div className="text-xs font-semibold text-[#8892B0] mb-2">Avg client ROI</div>
              <div className="font-black leading-none mb-1" style={{ fontSize:'3rem',fontFamily:'var(--font-grotesk)',color:'#FFC845' }}>3.2×</div>
              <div className="text-xs text-[#22c55e] flex items-center gap-1"><TrendingUp size={11} /> +42% this quarter</div>
              <div className="mt-4 grid grid-cols-3 gap-1">
                {[75,90,60,85,95,70].map((h,i) => <div key={i} className="rounded-sm" style={{ height:32,background:`rgba(255,200,69,${0.1+h/100*0.5})` }} />)}
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0,x:40 }} animate={{ opacity:1,x:0 }} transition={{ delay:0.6,duration:0.8,ease:[0.16,1,.3,1] }}
              className="col-span-2 glass-md rounded-3xl bento-card border border-white/[0.07] overflow-hidden" style={{ height:240 }}>
              <ProjectCarousel />
            </motion.div>
          </div>

          {/* Commits */}
          <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.75,duration:0.8,ease:[0.16,1,.3,1] }}
            className="lg:col-span-4 glass-md rounded-3xl p-5 bento-card border border-white/[0.07] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-6 z-10 pointer-events-none" style={{ background:'linear-gradient(180deg,rgba(13,21,48,.95) 0%,transparent 100%)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-10 z-10 pointer-events-none" style={{ background:'linear-gradient(0deg,rgba(13,21,48,.95) 0%,transparent 100%)' }} />
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400" style={{ animation:'pulse-glow 2s ease-in-out infinite' }} /><span className="text-xs font-semibold text-[#F0F4FF]">Live commits</span></div>
              <span className="text-[10px] text-[#8892B0]">stack46/main</span>
            </div>
            <CommitsFeed />
          </motion.div>

          {/* Tech stack */}
          <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.9,duration:0.8,ease:[0.16,1,.3,1] }}
            className="lg:col-span-8 glass-md rounded-3xl p-6 bento-card border border-white/[0.07] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at 80% 50%,rgba(30,42,120,.35) 0%,transparent 60%)' }} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4"><span className="text-xs font-semibold text-[#F0F4FF]">Technologies we master</span><span className="text-[10px] text-[#8892B0]">20+ stacks</span></div>
              <div className="flex flex-wrap gap-2">
                {MARQUEE_TECH.map((t, i) => (
                  <motion.span key={t} initial={{ opacity:0,scale:0.8 }} animate={{ opacity:1,scale:1 }} transition={{ delay:1+i*0.035,duration:0.4 }}
                    whileHover={{ scale:1.12,y:-3 }}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold cursor-default"
                    style={{ background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.09)',color:'#8892B0',transition:'all .2s ease' }}>
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
            <div className="relative z-10 flex items-center justify-between pt-4 mt-2" style={{ borderTop:'1px solid rgba(255,255,255,.06)' }}>
              <span className="text-xs text-[#8892B0]">From pixel to production — we own every layer.</span>
              <Link href="/platform" className="text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200" style={{ color:'#2AACE2' }}>See platform <ArrowRight size={11} /></Link>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2 }} className="flex flex-col items-center gap-2 mt-10 mx-auto">
          <span className="text-[10px] tracking-widest uppercase text-[#8892B0]">Scroll</span>
          <motion.div animate={{ y:[0,7,0] }} transition={{ duration:1.6,repeat:Infinity,ease:'easeInOut' }} className="w-px h-8" style={{ background:'linear-gradient(180deg,rgba(42,172,226,.8),transparent)' }} />
        </motion.div>
      </section>

      {/* ████████ MARQUEE ████████ */}
      <div className="relative z-10 py-4 overflow-hidden" style={{ borderTop:'1px solid rgba(255,255,255,.06)',borderBottom:'1px solid rgba(255,255,255,.06)',background:'rgba(13,21,48,.6)',backdropFilter:'blur(8px)' }}>
        <div style={{ position:'absolute',left:0,top:0,bottom:0,width:100,background:'linear-gradient(90deg,#070B1A,transparent)',zIndex:10,pointerEvents:'none' }} />
        <div style={{ position:'absolute',right:0,top:0,bottom:0,width:100,background:'linear-gradient(270deg,#070B1A,transparent)',zIndex:10,pointerEvents:'none' }} />
        <div className="marquee-inner flex whitespace-nowrap">
          {[...MARQUEE_TECH,...MARQUEE_TECH].map((t,i) => (
            <span key={i} className="inline-flex items-center gap-4 mx-8">
              <span className="text-sm font-semibold uppercase tracking-[0.15em] text-white/25">{t}</span>
              <span className="w-1 h-1 rounded-full" style={{ background:'rgba(42,172,226,.5)' }} />
            </span>
          ))}
        </div>
      </div>

      {/* ████████ SERVICES — 3D Tilt Cards ████████ */}
      <section id="services" className="relative z-10 py-32 px-6" style={{ perspective:1400 }}>
        <div className="max-w-7xl mx-auto">
          <motion.div className="mb-20" initial={{ opacity:0,y:40 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.9,ease:[0.16,1,.3,1] }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5" style={{ background:'rgba(42,172,226,.1)',border:'1px solid rgba(42,172,226,.25)',color:'#2AACE2' }}>What We Build</span>
            <h2 className="text-5xl md:text-6xl font-black leading-[0.97] max-w-3xl" style={{ fontFamily:'var(--font-grotesk)',letterSpacing:'-0.035em' }}>
              One agency.{' '}
              <span style={{ background:'linear-gradient(135deg,#2AACE2,#4DD0C4,#FFC845)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
                Zero gaps.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity:0,y:50,rotateX:-15 }} whileInView={{ opacity:1,y:0,rotateX:0 }}
                viewport={{ once:true,margin:'-60px' }}
                transition={{ duration:0.8,delay:i*0.09,ease:[0.16,1,.3,1] }}
                className={f.span===2 ? 'sm:col-span-2' : ''}>
                <TiltCard accent={f.accent} className="h-full">
                  <div className="glass-md rounded-2xl p-6 border border-white/[0.07] h-full relative z-10 transition-border duration-300 group-hover:border-white/[0.14]">
                    <motion.div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ background:`${f.accent}20`,border:`1px solid ${f.accent}35` }}
                      whileHover={{ rotate:[0,5,-5,0],scale:1.1 }}
                      transition={{ duration:0.4 }}>
                      <f.icon size={22} style={{ color:f.accent }} />
                    </motion.div>
                    <h3 className="font-bold text-base text-[#F0F4FF] mb-2 break-words" style={{ fontFamily:'var(--font-grotesk)' }}>{f.title}</h3>
                    <p className="text-[#8892B0] text-sm leading-relaxed break-words">{f.desc}</p>
                    <motion.div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      whileHover={{ x:2 }}>
                      <ArrowUpRight size={16} style={{ color:f.accent }} />
                    </motion.div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ████████ PORTFOLIO — Drag Gallery ████████ */}
      <section className="relative z-10 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <motion.div className="flex items-end justify-between" initial={{ opacity:0,y:32 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5" style={{ background:'rgba(77,208,196,.1)',border:'1px solid rgba(77,208,196,.25)',color:'#4DD0C4' }}>Portfolio</span>
              <h2 className="text-5xl md:text-6xl font-black leading-[0.97]" style={{ fontFamily:'var(--font-grotesk)',letterSpacing:'-0.035em' }}>
                <span style={{ background:'linear-gradient(135deg,#06b6d4,#2AACE2)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>Any project.</span>{' '}
                Any scale.
              </h2>
            </div>
            <Link href="/fleet" className="hidden md:flex items-center gap-2 text-sm font-semibold mb-2" style={{ color:'#2AACE2' }}>
              View all work <ArrowUpRight size={15} />
            </Link>
          </motion.div>
        </div>
        {/* Drag hint */}
        <motion.p className="text-center text-xs text-[#8892B0] mb-4" initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}>
          ← Drag to explore →
        </motion.p>
        <DragGallery />
      </section>

      {/* ████████ STATS — SVG Rings ████████ */}
      <section className="relative z-10 py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2 className="text-center text-4xl md:text-5xl font-black mb-16 leading-[1.06]"
            style={{ fontFamily:'var(--font-grotesk)',letterSpacing:'-0.02em' }}
            initial={{ opacity:0,y:32 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
            Our track record <span style={{ background:'linear-gradient(135deg,#2AACE2,#FFC845)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>speaks.</span>
          </motion.h2>
          {/* Spinning border container */}
          <div className="grad-border-wrap">
            <div className="grad-border-inner glass-md py-14 px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 justify-items-center">
                {STATS.map(s => <StatRing key={s.label} val={s.val} suffix={s.suffix} label={s.label} color={s.color} pct={s.pct} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ████████ PROCESS — Animated Timeline ████████ */}
      <section className="relative z-10 py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-20" initial={{ opacity:0,y:32 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5" style={{ background:'rgba(255,200,69,.1)',border:'1px solid rgba(255,200,69,.25)',color:'#FFC845' }}>Our Process</span>
            <h2 className="text-4xl md:text-5xl font-black leading-[1.06]" style={{ fontFamily:'var(--font-grotesk)',letterSpacing:'-0.02em' }}>How we operate</h2>
          </motion.div>

          {/* Connector line */}
          <div className="hidden lg:block relative h-px mb-16 mx-[8%]">
            <div className="absolute inset-0" style={{ background:'rgba(255,255,255,.06)' }} />
            <motion.div className="absolute top-0 left-0 h-full"
              style={{ background:'linear-gradient(90deg,#2AACE2,#4DD0C4,#FFC845)',originX:0 }}
              initial={{ scaleX:0 }} whileInView={{ scaleX:1 }}
              viewport={{ once:true }} transition={{ duration:2,ease:[0.25,1,.5,1],delay:0.4 }} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <motion.div key={s.n}
                initial={{ opacity:0,y:50 }} whileInView={{ opacity:1,y:0 }}
                viewport={{ once:true,margin:'-40px' }} transition={{ duration:0.8,delay:i*0.15,ease:[0.16,1,.3,1] }}
                whileHover={{ y:-10 }} style={{ perspective:600 }}>
                {/* Number circle with pulse */}
                <div className="flex flex-col items-center lg:items-start">
                  <div className="relative mb-6">
                    <motion.div className="w-14 h-14 rounded-full flex items-center justify-center font-black text-lg relative z-10"
                      style={{ fontFamily:'var(--font-grotesk)',background:`${s.color}18`,border:`2px solid ${s.color}50`,color:s.color }}
                      initial={{ scale:0.4,rotate:-15 }} whileInView={{ scale:1,rotate:0 }}
                      viewport={{ once:true }} transition={{ duration:0.6,delay:i*0.15+0.4,type:'spring',stiffness:200 }}>
                      {s.n}
                    </motion.div>
                    <motion.div className="absolute inset-0 rounded-full"
                      style={{ border:`2px solid ${s.color}` }}
                      animate={{ scale:[1,1.5,1],opacity:[0.6,0,0.6] }}
                      transition={{ duration:2.5,repeat:Infinity,delay:i*0.5,ease:'easeInOut' }} />
                  </div>
                  <h3 className="font-bold text-[#F0F4FF] mb-2 text-center lg:text-left">{s.title}</h3>
                  <p className="text-[#8892B0] text-sm leading-relaxed text-center lg:text-left">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ████████ TESTIMONIALS — Dual Infinite Marquee ████████ */}
      <section className="relative z-10 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <motion.div className="text-center" initial={{ opacity:0,y:32 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5" style={{ background:'rgba(255,200,69,.1)',border:'1px solid rgba(255,200,69,.25)',color:'#FFC845' }}>Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-black leading-[1.06]" style={{ fontFamily:'var(--font-grotesk)',letterSpacing:'-0.02em' }}>
              150+ companies{' '}
              <span style={{ background:'linear-gradient(135deg,#FFC845,#f97316)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>trust us.</span>
            </h2>
          </motion.div>
        </div>

        {/* Row 1 — left */}
        <div className="relative mb-5 overflow-hidden">
          <div style={{ position:'absolute',left:0,top:0,bottom:0,width:120,background:'linear-gradient(90deg,#070B1A,transparent)',zIndex:10,pointerEvents:'none' }} />
          <div style={{ position:'absolute',right:0,top:0,bottom:0,width:120,background:'linear-gradient(270deg,#070B1A,transparent)',zIndex:10,pointerEvents:'none' }} />
          <div className="marquee-inner flex whitespace-nowrap">
            {[...TEST_ROW1,...TEST_ROW1,...TEST_ROW1,...TEST_ROW1].map((t,i) => <TestCard key={i} t={t} />)}
          </div>
        </div>

        {/* Row 2 — right */}
        <div className="relative overflow-hidden">
          <div style={{ position:'absolute',left:0,top:0,bottom:0,width:120,background:'linear-gradient(90deg,#070B1A,transparent)',zIndex:10,pointerEvents:'none' }} />
          <div style={{ position:'absolute',right:0,top:0,bottom:0,width:120,background:'linear-gradient(270deg,#070B1A,transparent)',zIndex:10,pointerEvents:'none' }} />
          <div className="marquee-rev flex whitespace-nowrap">
            {[...TEST_ROW2,...TEST_ROW2,...TEST_ROW2,...TEST_ROW2].map((t,i) => <TestCard key={i} t={t} />)}
          </div>
        </div>
      </section>

      {/* ████████ CTA — Floating Particles + Split Text ████████ */}
      <section className="relative z-10 py-16 px-6 pb-32">
        <div className="max-w-5xl mx-auto">
          <motion.div className="glass-md rounded-3xl p-14 text-center relative overflow-hidden"
            initial={{ opacity:0,y:40 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.9,ease:[0.16,1,.3,1] }}>
            <FloatingDots />
            {/* Radial glows */}
            <div style={{ position:'absolute',top:-80,left:-80,width:320,height:320,background:'radial-gradient(circle,rgba(42,172,226,.22) 0%,transparent 70%)',pointerEvents:'none' }} />
            <div style={{ position:'absolute',bottom:-80,right:-80,width:280,height:280,background:'radial-gradient(circle,rgba(168,85,247,.18) 0%,transparent 70%)',pointerEvents:'none' }} />

            <div className="relative z-10">
              <motion.div initial={{ scale:0.5,opacity:0 }} whileInView={{ scale:1,opacity:1 }} viewport={{ once:true }} transition={{ duration:0.5,type:'spring',stiffness:200 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
                style={{ background:'rgba(42,172,226,.12)',border:'1px solid rgba(42,172,226,.3)',color:'#2AACE2' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation:'pulse-glow 2s ease-in-out infinite' }} />
                Ready to ship · Free discovery call included
              </motion.div>

              <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-5 leading-[1.06]"
                style={{ fontFamily:'var(--font-grotesk)',letterSpacing:'-0.02em' }}
                initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.8,delay:0.1 }}>
                Ready to build something{' '}
                <span className="grad-anim">extraordinary?</span>
              </motion.h2>

              <motion.p className="text-[#8892B0] text-lg mb-10 max-w-xl mx-auto"
                initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.8,delay:0.2 }}>
                Proposal in 48 hours. No commitment. Just a conversation about your product.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.8,delay:0.3 }}>
                <motion.div whileHover={{ scale:1.05,y:-3 }} whileTap={{ scale:0.96 }}>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full text-sm font-bold relative overflow-hidden"
                    style={{ background:'linear-gradient(135deg,#1E2A78,#2AACE2)',color:'#fff',boxShadow:'0 0 48px rgba(42,172,226,.45),inset 0 1px 0 rgba(255,255,255,.15)' }}>
                    Book a Free Call
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale:1.04,y:-2 }} whileTap={{ scale:0.97 }}>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full text-sm font-semibold glass" style={{ color:'#F0F4FF' }}>
                    Send Us a Message
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
