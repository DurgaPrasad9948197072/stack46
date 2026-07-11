'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion, useInView, useTransform, useScroll,
  useMotionValue, useSpring, useMotionTemplate,
} from 'framer-motion'
import { useReveal } from '@/hooks/useReveal'
import TrionnHero from '@/components/home/TrionnHero'
import HorizontalWork from '@/components/home/HorizontalWork'
import ScrollMorphSection from '@/components/ui/scroll-morph-hero'
import TestimonialsStack from '@/components/ui/animated-cards-stack'
import AnimatedText from '@/components/ui/AnimatedText'
import {
  Code2, Cloud, Sparkles, Smartphone, Plug, ShieldCheck,
  ArrowUpRight,
} from 'lucide-react'

/* ══════════════════ DATA ══════════════════ */
const MARQUEE_TECH = ['React','Next.js','TypeScript','Node.js','Python','Go','AWS','GCP','Azure','Docker','Kubernetes','PostgreSQL','GraphQL','Figma','Flutter','Terraform']

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
            style={{ width: 300, height: 400, flexShrink: 0, border: '1px solid rgba(255,255,255,.08)' }}
            whileHover={!dragging ? { scale: 1.04, rotateY: i % 2 === 0 ? -4 : 4, z: 30 } : {}}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="rounded-3xl overflow-hidden relative">
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

/* Giant outline word strip — position is driven by scroll, not a timer (Trionn-style) */
function ScrollStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['6%', '-38%'])
  return (
    <div ref={ref} className="relative z-10 py-12 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div style={{ x }} className="flex whitespace-nowrap items-center will-change-transform">
        {[0, 1].map(half => (
          <span key={half} className="flex items-center flex-shrink-0">
            {['STACK46', 'DESIGN', 'DEVELOP', 'DEPLOY'].map(word => (
              <span key={word} className="flex items-center">
                <span className="text-outline-faint font-black uppercase leading-none mx-8"
                  style={{ fontSize: 'clamp(4rem,11vw,10rem)', fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.02em' }}>
                  {word}
                </span>
                <span className="grad-anim font-black leading-none" style={{ fontSize: 'clamp(2rem,5vw,4rem)' }}>✦</span>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ══════════════════ HOME PAGE ══════════════════ */
export default function HomePage() {
  useReveal()

  return (
    <div className="relative overflow-x-hidden">

      {/* ████████ HERO — Trionn-style, tubes cursor + intro node motif ████████ */}
      <TrionnHero />

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
              <AnimatedText segments={[
                { text: 'One agency.' },
                { text: 'Zero gaps.', className: 'grad-anim' },
              ]} />
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

      {/* ████████ CASE STUDIES — Pinned Horizontal Journey ████████ */}
      <HorizontalWork />

      {/* ████████ PORTFOLIO — Drag Gallery ████████ */}
      <section className="relative z-10 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <motion.div className="flex items-end justify-between" initial={{ opacity:0,y:32 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5" style={{ background:'rgba(77,208,196,.1)',border:'1px solid rgba(77,208,196,.25)',color:'#4DD0C4' }}>Portfolio</span>
              <h2 className="text-5xl md:text-6xl font-black leading-[0.97]" style={{ fontFamily:'var(--font-grotesk)',letterSpacing:'-0.035em' }}>
                <AnimatedText segments={[
                  { text: 'Any project.', style: { background: 'linear-gradient(135deg,#06b6d4,#2AACE2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } },
                  { text: 'Any scale.' },
                ]} />
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

      {/* ████████ WORK IN MOTION — Sticky Scroll Morph (scatter→line→circle→arc) ████████ */}
      <ScrollMorphSection />

      {/* ████████ STATS — SVG Rings ████████ */}
      <section className="relative z-10 py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2 className="text-center text-4xl md:text-5xl font-black mb-16 leading-[1.06]"
            style={{ fontFamily:'var(--font-grotesk)',letterSpacing:'-0.02em' }}
            initial={{ opacity:0,y:32 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
            <AnimatedText segments={[
              { text: 'Our track record' },
              { text: 'speaks.', style: { background: 'linear-gradient(135deg,#2AACE2,#FFC845)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } },
            ]} />
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
            <h2 className="text-4xl md:text-5xl font-black leading-[1.06]" style={{ fontFamily:'var(--font-grotesk)',letterSpacing:'-0.02em' }}>
              <AnimatedText segments={[{ text: 'How we operate' }]} />
            </h2>
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

      {/* ████████ TESTIMONIALS — Scroll-Stacked Deck ████████ */}
      <TestimonialsStack />

      {/* ████████ GIANT OUTLINE STRIP — scroll-driven, Trionn signature ████████ */}
      <ScrollStrip />

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
