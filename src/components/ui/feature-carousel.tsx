'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Layers, ShoppingCart, Smartphone, Sparkles, CreditCard,
  Building2, HeartPulse, GraduationCap, ArrowUpRight,
} from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/*
 * Portfolio feature carousel, pinned by GSAP ScrollTrigger (same engine as
 * the Case Studies section): the section locks in the viewport and vertical
 * scroll steps through the portfolio one item at a time — the chip rail
 * slides and the card deck swaps in strict sequence, 1:1 with the scrollbar.
 * Scroll up and it plays backwards; the section releases exactly after the
 * last item has had its beat.
 */

const FEATURES = [
  { id: 'saas',       label: 'SaaS Platforms', count: '28+', icon: Layers,        color: '#2AACE2', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80',      description: 'Multi-tenant platforms engineered to scale from MVP to millions of users.' },
  { id: 'ecommerce',  label: 'E-Commerce',     count: '31+', icon: ShoppingCart,  color: '#FFC845', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',      description: 'Headless storefronts that convert — sub-second loads, frictionless checkout.' },
  { id: 'mobile',     label: 'Mobile Apps',    count: '22+', icon: Smartphone,    color: '#22c55e', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',   description: 'React Native & Flutter apps with native performance and 5-star UX.' },
  { id: 'ai',         label: 'AI Solutions',   count: '14+', icon: Sparkles,      color: '#a855f7', img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',   description: 'LLMs, computer vision and predictive analytics — running in production.' },
  { id: 'fintech',    label: 'FinTech',        count: '19+', icon: CreditCard,    color: '#ef4444', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',   description: 'Payment rails and ledgers built for compliance at £2M/day scale.' },
  { id: 'enterprise', label: 'Enterprise',     count: '15+', icon: Building2,     color: '#06b6d4', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',   description: 'Legacy modernisation and zero-downtime migrations to the cloud.' },
  { id: 'health',     label: 'HealthTech',     count: '11+', icon: HeartPulse,    color: '#f97316', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',   description: 'HIPAA-grade patient platforms shipped in weeks, not quarters.' },
  { id: 'edtech',     label: 'EdTech',         count: '8+',  icon: GraduationCap, color: '#4DD0C4', img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&q=80',   description: 'Learning platforms serving hundreds of thousands of students daily.' },
]

const ITEM_HEIGHT = 60

export default function PortfolioCarousel() {
  const sectionRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const n = FEATURES.length

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          /* ~65vh of scroll per portfolio item — same cadence as the deck */
          end: () => `+=${n * window.innerHeight * 0.65}`,
          pin: true,
          scrub: true, /* 1:1 with the scrollbar, reverses on scroll up */
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: self => {
            /* each item owns an equal slice of the pin; the last slice holds
               until release so the section never ends on a dead frame */
            const idx = Math.min(n - 1, Math.floor(self.progress * n))
            setActive(prev => (prev === idx ? prev : idx))
          },
        },
      })
      if (railRef.current) tl.to(railRef.current, { scaleX: 1, ease: 'none' }, 0)
    }, section)

    const refresh = () => ScrollTrigger.refresh()
    const late = setTimeout(refresh, 600)
    window.addEventListener('load', refresh)
    return () => {
      clearTimeout(late)
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [n])

  const getCardStatus = (index: number) => {
    const diff = index - active
    if (diff === 0) return 'active'
    if (diff === -1) return 'prev'
    if (diff === 1) return 'next'
    return 'hidden'
  }

  return (
    <section ref={sectionRef} className="relative z-10 h-screen overflow-hidden flex flex-col justify-center px-6">
      <div className="max-w-7xl mx-auto w-full">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ background: 'rgba(77,208,196,.1)', border: '1px solid rgba(77,208,196,.25)', color: '#4DD0C4' }}>
              Portfolio
            </span>
            <h2 className="text-4xl md:text-6xl font-black leading-[0.97]" style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.035em' }}>
              <span className="accent-serif" style={{ background: 'linear-gradient(135deg,#06b6d4,#2AACE2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Any project.
              </span>{' '}
              Any scale.
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2 mb-1">
            <Link href="/fleet" className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#2AACE2' }}>
              View all work <ArrowUpRight size={15} />
            </Link>
            <span className="text-xs font-mono tracking-[0.25em] text-[#8892B0]">
              0{active + 1} / 0{n}
            </span>
          </div>
        </div>

        {/* Carousel body */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">

          {/* ── Chip rail (desktop) — slides one step per scroll slice ── */}
          <div className="hidden lg:flex w-[42%] relative rounded-3xl overflow-hidden items-center"
            style={{ height: 'min(54vh, 500px)', background: 'rgba(13,21,48,.55)', border: '1px solid rgba(255,255,255,.07)', backdropFilter: 'blur(12px)' }}>
            {/* Edge fades so chips melt in/out of the panel */}
            <div className="absolute inset-x-0 top-0 h-16 z-20 pointer-events-none" style={{ background: 'linear-gradient(to bottom,#0B1230,rgba(11,18,48,0))' }} />
            <div className="absolute inset-x-0 bottom-0 h-16 z-20 pointer-events-none" style={{ background: 'linear-gradient(to top,#0B1230,rgba(11,18,48,0))' }} />

            <div className="relative w-full h-full flex items-center justify-start pl-10 z-10">
              {FEATURES.map((f, index) => {
                const distance = index - active
                const isActive = distance === 0
                return (
                  <motion.div key={f.id}
                    style={{ height: ITEM_HEIGHT }}
                    animate={{
                      y: distance * ITEM_HEIGHT,
                      opacity: Math.max(1 - Math.abs(distance) * 0.28, 0),
                      x: isActive ? 8 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 90, damping: 22, mass: 1 }}
                    className="absolute flex items-center">
                    <div
                      className="flex items-center gap-4 px-7 py-3.5 rounded-full border transition-colors duration-500"
                      style={isActive
                        ? { background: `${f.color}16`, borderColor: `${f.color}55`, color: f.color, boxShadow: `0 0 28px ${f.color}25` }
                        : { background: 'transparent', borderColor: 'rgba(255,255,255,.1)', color: '#8892B0' }}>
                      <f.icon size={17} strokeWidth={2} />
                      <span className="font-semibold text-sm tracking-tight whitespace-nowrap uppercase">
                        {f.label}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={isActive
                          ? { background: `${f.color}22`, color: f.color }
                          : { background: 'rgba(255,255,255,.05)', color: '#8892B0' }}>
                        {f.count}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* ── Mobile label chip ── */}
          <div className="lg:hidden h-10 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div key={FEATURES[active].id}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 px-5 py-2 rounded-full border"
                style={{ background: `${FEATURES[active].color}14`, borderColor: `${FEATURES[active].color}50`, color: FEATURES[active].color }}>
                {(() => { const Icon = FEATURES[active].icon; return <Icon size={15} /> })()}
                <span className="font-semibold text-xs tracking-tight uppercase">{FEATURES[active].label}</span>
                <span className="text-[10px] font-bold">{FEATURES[active].count}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Card deck — active card front, neighbours peek behind ── */}
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="relative w-full max-w-[380px]" style={{ height: 'min(52vh, 480px)' }}>
              {FEATURES.map((f, index) => {
                const status = getCardStatus(index)
                const isActive = status === 'active'
                const isPrev = status === 'prev'
                const isNext = status === 'next'
                return (
                  <motion.div key={f.id}
                    initial={false}
                    animate={{
                      x: isActive ? 0 : isPrev ? -90 : isNext ? 90 : 0,
                      scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.72,
                      opacity: isActive ? 1 : isPrev || isNext ? 0.35 : 0,
                      rotate: isPrev ? -4 : isNext ? 4 : 0,
                      zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 25, mass: 0.8 }}
                    className="absolute inset-0 rounded-[2rem] overflow-hidden origin-center will-change-transform"
                    style={{ border: '1px solid rgba(255,255,255,.1)', background: '#0D1530', boxShadow: isActive ? `0 24px 64px rgba(0,0,0,.5), 0 0 48px ${f.color}18` : '0 12px 32px rgba(0,0,0,.4)' }}>
                    <img src={f.img} alt={f.label}
                      className={`w-full h-full object-cover transition-all duration-700 ${isActive ? 'grayscale-0 blur-0 brightness-100' : 'grayscale blur-[2px] brightness-50'}`}
                      draggable={false} loading="lazy" />

                    {/* Live-marker */}
                    <div className={`absolute top-7 left-7 flex items-center gap-2.5 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="w-2 h-2 rounded-full" style={{ background: f.color, boxShadow: `0 0 10px ${f.color}` }} />
                      <span className="text-white/80 text-[10px] font-semibold uppercase tracking-[0.3em] font-mono">
                        {f.count} shipped
                      </span>
                    </div>

                    {/* Caption */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.35 }}
                          className="absolute inset-x-0 bottom-0 p-7 pt-28 flex flex-col justify-end pointer-events-none"
                          style={{ background: 'linear-gradient(to top, rgba(7,11,26,.95) 0%, rgba(7,11,26,.4) 60%, transparent 100%)' }}>
                          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] w-fit mb-3"
                            style={{ background: `${f.color}20`, color: f.color, border: `1px solid ${f.color}40` }}>
                            {f.label}
                          </span>
                          <p className="text-[#F0F4FF] font-bold text-lg md:text-xl leading-snug tracking-tight" style={{ fontFamily: 'var(--font-grotesk)' }}>
                            {f.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Scroll progress rail — scrubbed 1:1 like Case Studies */}
        <div className="w-full mt-8">
          <div className="h-px w-full relative" style={{ background: 'rgba(255,255,255,.08)' }}>
            <div ref={railRef} className="absolute inset-y-0 left-0 w-full"
              style={{ transform: 'scaleX(0)', transformOrigin: '0% 50%', background: 'linear-gradient(90deg,#06b6d4,#2AACE2,#4DD0C4)' }} />
          </div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#8892B0] mt-3">Scroll to explore</p>
        </div>
      </div>
    </section>
  )
}
