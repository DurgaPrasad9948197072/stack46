'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, useTransform, useScroll } from 'framer-motion'
import { useReveal } from '@/hooks/useReveal'
import TrionnHero from '@/components/home/TrionnHero'
import HorizontalWork from '@/components/home/HorizontalWork'
import ServicesTimeline from '@/components/home/ServicesTimeline'
import TestimonialsStack from '@/components/ui/animated-cards-stack'
import PortfolioCarousel from '@/components/ui/feature-carousel'
import AnimatedText from '@/components/ui/AnimatedText'

/* ══════════════════ DATA ══════════════════ */
const MARQUEE_TECH = ['React','Next.js','TypeScript','Node.js','Python','Go','AWS','GCP','Azure','Docker','Kubernetes','PostgreSQL','GraphQL','Figma','Flutter','Terraform']

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
  const inView = useInView(ref, { once: false, amount: 0.6 })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) { setVal(0); return }
    let cur = 0; const step = target / 45
    const t = setInterval(() => { cur = Math.min(cur + step, target); setVal(Math.round(cur)); if (cur >= target) clearInterval(t) }, 28)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{val}{suffix}</span>
}

/* SVG ring + count-up stat */
function StatRing({ val, suffix, label, color, pct }: { val: number; suffix: string; label: string; color: string; pct: number }) {
  const ref = useRef<SVGCircleElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.5 })
  const r = 44; const circ = 2 * Math.PI * r
  return (
    <motion.div className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, scale: 0.7, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.7, ease: [0.16,1,.3,1] }}>
      <div className="relative w-28 h-28">
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="7" />
          <motion.circle ref={ref} cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="7"
            strokeLinecap="round" strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={inView ? { strokeDashoffset: circ * (1 - pct) } : { strokeDashoffset: circ }}
            transition={{ duration: inView ? 2 : 0.6, ease: 'easeOut', delay: inView ? 0.4 : 0 }} />
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

      {/* ████████ SERVICES — Scroll-Beam Timeline ████████ */}
      <ServicesTimeline />

      {/* ████████ CASE STUDIES — Pinned Horizontal Journey ████████ */}
      <HorizontalWork />

      {/* ████████ PORTFOLIO — Pinned Scroll Carousel (same engine as Case Studies) ████████ */}
      <PortfolioCarousel />

      {/* ████████ STATS — SVG Rings ████████ */}
      <section className="relative z-10 py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2 className="text-center text-4xl md:text-5xl font-black mb-16 leading-[1.06]"
            style={{ fontFamily:'var(--font-grotesk)',letterSpacing:'-0.02em' }}
            initial={{ opacity:0,y:32 }} whileInView={{ opacity:1,y:0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration:0.8 }}>
            <AnimatedText segments={[
              { text: 'Our track record' },
              { text: 'speaks.', className: 'accent-serif', style: { background: 'linear-gradient(135deg,#2AACE2,#FFC845)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } },
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
          <motion.div className="text-center mb-20" initial={{ opacity:0,y:32 }} whileInView={{ opacity:1,y:0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration:0.8 }}>
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
              viewport={{ once: false, amount: 0.2 }} transition={{ duration:2,ease:[0.25,1,.5,1],delay:0.4 }} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <motion.div key={s.n}
                initial={{ opacity:0,y:50 }} whileInView={{ opacity:1,y:0 }}
                viewport={{ once: false, margin: '-40px' }} transition={{ duration:0.8,delay:i*0.15,ease:[0.16,1,.3,1] }}
                whileHover={{ y:-10 }} style={{ perspective:600 }}>
                {/* Number circle with pulse */}
                <div className="flex flex-col items-center lg:items-start">
                  <div className="relative mb-6">
                    <motion.div className="w-14 h-14 rounded-full flex items-center justify-center font-black text-lg relative z-10"
                      style={{ fontFamily:'var(--font-grotesk)',background:`${s.color}18`,border:`2px solid ${s.color}50`,color:s.color }}
                      initial={{ scale:0.4,rotate:-15 }} whileInView={{ scale:1,rotate:0 }}
                      viewport={{ once: false, amount: 0.2 }} transition={{ duration:0.6,delay:i*0.15+0.4,type:'spring',stiffness:200 }}>
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
            initial={{ opacity:0,y:40 }} whileInView={{ opacity:1,y:0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration:0.9,ease:[0.16,1,.3,1] }}>
            <FloatingDots />
            {/* Radial glows */}
            <div style={{ position:'absolute',top:-80,left:-80,width:320,height:320,background:'radial-gradient(circle,rgba(42,172,226,.22) 0%,transparent 70%)',pointerEvents:'none' }} />
            <div style={{ position:'absolute',bottom:-80,right:-80,width:280,height:280,background:'radial-gradient(circle,rgba(168,85,247,.18) 0%,transparent 70%)',pointerEvents:'none' }} />

            <div className="relative z-10">
              <motion.div initial={{ scale:0.5,opacity:0 }} whileInView={{ scale:1,opacity:1 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration:0.5,type:'spring',stiffness:200 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
                style={{ background:'rgba(42,172,226,.12)',border:'1px solid rgba(42,172,226,.3)',color:'#2AACE2' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation:'pulse-glow 2s ease-in-out infinite' }} />
                Ready to ship · Free discovery call included
              </motion.div>

              <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-5 leading-[1.06]"
                style={{ fontFamily:'var(--font-grotesk)',letterSpacing:'-0.02em' }}
                initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration:0.8,delay:0.1 }}>
                Ready to build something{' '}
                <span className="grad-anim accent-serif">extraordinary?</span>
              </motion.h2>

              <motion.p className="text-[#8892B0] text-lg mb-10 max-w-xl mx-auto"
                initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration:0.8,delay:0.2 }}>
                Proposal in 48 hours. No commitment. Just a conversation about your product.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration:0.8,delay:0.3 }}>
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
