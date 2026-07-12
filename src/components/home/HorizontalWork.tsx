'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { CASE_STUDIES } from '@/data/caseStudies'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/*
 * Pinned horizontal case-study journey (Trionn pattern), driven by GSAP
 * ScrollTrigger's native pin: the section locks centered in the viewport
 * and vertical scroll sweeps the strip sideways. The pin distance is
 * derived from the real strip width (1px of travel = 1.6px of scroll), so
 * the section releases the exact moment the last card is fully shown —
 * no dead scroll before or after, on any screen size.
 */

const PANELS = CASE_STUDIES

export default function HorizontalWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const strip = stripRef.current
    if (!section || !strip) return

    const getShift = () => Math.max(strip.scrollWidth - window.innerWidth + 48, 0)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          /* pin lasts exactly as long as the sweep needs — recomputed on refresh */
          end: () => `+=${getShift() * 1.6}`,
          pin: true,
          scrub: true, /* 1:1 with the scrollbar, plays backwards on scroll up */
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      tl.to(strip, { x: () => -getShift(), ease: 'none' }, 0)
      if (railRef.current) tl.to(railRef.current, { scaleX: 1, ease: 'none' }, 0)
    }, section)

    /* re-measure after fonts/images settle so the end point stays pixel-exact */
    const refresh = () => ScrollTrigger.refresh()
    const late = setTimeout(refresh, 600)
    window.addEventListener('load', refresh)
    return () => {
      clearTimeout(late)
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative z-10 h-screen overflow-hidden flex flex-col justify-center">

      {/* Header */}
      <div className="max-w-7xl mx-auto w-full px-6 mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ background: 'rgba(42,172,226,.1)', border: '1px solid rgba(42,172,226,.25)', color: '#2AACE2' }}>
          Case Studies
        </span>
        <h2 className="text-4xl md:text-6xl font-black leading-[0.97]" style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.035em' }}>
          The journey{' '}
          <span className="accent-serif" style={{ background: 'linear-gradient(135deg,#2AACE2,#FFC845)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            sideways.
          </span>
        </h2>
      </div>

      {/* Horizontal strip */}
      <div ref={stripRef} className="flex gap-6 pl-6 md:pl-[8vw] will-change-transform">
        {PANELS.map(p => (
          <Link key={p.n} href={`/work/${p.slug}`}
            className="relative flex-shrink-0 rounded-3xl overflow-hidden group block"
            style={{ width: 'min(78vw, 640px)', height: 'min(54vh, 460px)', border: '1px solid rgba(255,255,255,.08)' }}>
            <img src={p.img} alt={p.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              draggable={false} loading="lazy" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,11,26,.95) 0%, rgba(7,11,26,.35) 55%, rgba(7,11,26,.1) 100%)' }} />

            {/* Copy */}
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold mb-3"
                style={{ background: `${p.accent}20`, color: p.accent, border: `1px solid ${p.accent}40` }}>
                {p.tag}
              </span>
              <h3 className="font-black text-2xl md:text-3xl text-[#F0F4FF] mb-2" style={{ fontFamily: 'var(--font-grotesk)' }}>{p.title}</h3>
              <p className="text-sm text-[#8892B0] max-w-md leading-relaxed">{p.result}</p>
            </div>

            {/* Hover veil + read-more CTA */}
            <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'rgba(7,11,26,.45)', backdropFilter: 'blur(2px)' }}>
              <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold translate-y-3 group-hover:translate-y-0 transition-transform duration-300"
                style={{ background: 'rgba(13,21,48,.85)', color: '#F0F4FF', border: `1px solid ${p.accent}`, boxShadow: `0 0 28px ${p.accent}45`, backdropFilter: 'blur(10px)' }}>
                Read Case Study <ArrowUpRight size={15} style={{ color: p.accent }} />
              </span>
            </div>
          </Link>
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
      </div>

      {/* Scroll progress rail */}
      <div className="max-w-7xl mx-auto w-full px-6 mt-10">
        <div className="h-px w-full relative" style={{ background: 'rgba(255,255,255,.08)' }}>
          <div ref={railRef} className="absolute inset-y-0 left-0 w-full"
            style={{ transform: 'scaleX(0)', transformOrigin: '0% 50%', background: 'linear-gradient(90deg,#1E2A78,#2AACE2,#FFC845)' }} />
        </div>
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#8892B0] mt-3">Scroll to travel</p>
      </div>
    </section>
  )
}
