'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/*
 * Scroll-stacked testimonial deck, pinned by GSAP ScrollTrigger (same engine
 * as the Case Studies section): the deck locks centered in the viewport and
 * each card straightens then peels off in strict sequence, 1:1 with the
 * scrollbar — pause mid-peel and it freezes, scroll up and it re-stacks.
 * The final card stays on top for a beat, then the section releases.
 */

/* ── Stars ── */
export function ReviewStars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className ?? ''}`}>
      {[...Array(Math.round(rating))].map((_, i) => (
        <Star key={i} size={14} fill="#FFC845" style={{ color: '#FFC845' }} />
      ))}
      <p className="sr-only">{rating} out of 5</p>
    </div>
  )
}

/* ── STACK46 testimonials data ── */
const TESTIMONIALS = [
  { id: 't1', name: 'Sarah Mitchell', profession: 'CTO, LogiFlow', rating: 5, initials: 'SM', accent: '#2AACE2', description: 'STACK46 delivered our platform 2 weeks early and 25% under budget. Best engineering team I have worked with, full stop.' },
  { id: 't2', name: 'James Okonkwo', profession: 'Founder, NexusAI', rating: 5, initials: 'JO', accent: '#FFC845', description: 'Their AI pipeline tripled our data throughput overnight. They treated our product like it was their own company.' },
  { id: 't3', name: 'Priya Anand', profession: 'CPO, RetailHub', rating: 5, initials: 'PA', accent: '#22c55e', description: '4.9 stars on the App Store in month three. Their design and engineering is genuinely in a different league.' },
  { id: 't4', name: 'Emma Thompson', profession: 'VP Eng, CloudBase', rating: 5, initials: 'ET', accent: '#a855f7', description: 'Every engineer was senior-level in practice, not just on paper. Code quality so good we kept two of them full-time.' },
  { id: 't5', name: 'Omar Hassan', profession: 'Founder, MedTrack', rating: 5, initials: 'OH', accent: '#4DD0C4', description: 'HIPAA-compliant mobile app shipped in 10 weeks. They handled the compliance maze without slowing development.' },
]

const startRotation = (i: number) => (i % 2 === 0 ? 8 + i * 2 : -(8 + i * 2))

export default function TestimonialsStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const deckRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const deck = deckRef.current
    if (!section || !deck) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-deck-card]', deck)
      const n = cards.length
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          /* ~85vh of scroll per card, plus a settle beat for the last one */
          end: () => `+=${(n + 0.6) * window.innerHeight * 0.85}`,
          pin: true,
          scrub: true, /* 1:1 with the scrollbar, reverses on scroll up */
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      cards.forEach((card, i) => {
        /* each card owns the time slice [i, i+1]: first it straightens into
           place, then it flies off as the next one begins straightening */
        const straightenStart = Math.max(i - 0.5, 0)
        tl.to(card, { rotation: 0, ease: 'none', duration: i + 0.4 - straightenStart }, straightenStart)
        if (i < n - 1) {
          tl.to(card, { yPercent: -190, ease: 'none', duration: 0.6 }, i + 0.4)
        }
      })
      /* hold the final card centered before the section releases */
      tl.to({}, { duration: 0.6 }, n - 1 + 0.4)
    }, section)

    const refresh = () => ScrollTrigger.refresh()
    const late = setTimeout(refresh, 600)
    return () => { clearTimeout(late); ctx.revert() }
  }, [])

  return (
    <section ref={sectionRef} className="relative z-10 px-6 h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
          style={{ background: 'rgba(255,200,69,.1)', border: '1px solid rgba(255,200,69,.25)', color: '#FFC845' }}>
          Testimonials
        </span>
        <h2 className="text-4xl md:text-5xl font-black leading-[1.06]" style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.02em' }}>
          150+ companies{' '}
          <span style={{ background: 'linear-gradient(135deg,#FFC845,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            trust us.
          </span>
        </h2>
        <p className="text-[#8892B0] mt-4 text-sm md:text-base">Scroll — each card peels off the deck.</p>
      </div>

      {/* Stacked deck */}
      <div ref={deckRef} className="relative h-[430px] w-[340px] md:w-[400px]" style={{ perspective: '1000px' }}>
        {TESTIMONIALS.map((t, i) => (
          <div
            key={t.id}
            data-deck-card
            role="article"
            aria-labelledby={`card-${t.id}-title`}
            className="absolute will-change-transform flex size-full flex-col items-center justify-center gap-6 rounded-2xl p-7"
            style={{
              top: i * 10,
              transform: `rotate(${startRotation(i)}deg) translateZ(${i * 10}px)`,
              zIndex: (TESTIMONIALS.length - i) * 10,
              backfaceVisibility: 'hidden',
              background: 'rgba(13,21,48,.92)',
              border: '1px solid rgba(255,255,255,.1)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 12px 32px rgba(0,0,0,.45)',
            }}>
            <div className="flex flex-col items-center space-y-4 text-center">
              <ReviewStars rating={t.rating} />
              <blockquote className="mx-auto w-[92%] text-base md:text-lg text-[#F0F4FF] leading-relaxed italic">
                &ldquo;{t.description}&rdquo;
              </blockquote>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                style={{ background: `${t.accent}20`, color: t.accent, border: `1px solid ${t.accent}40` }}>
                {t.initials}
              </div>
              <div className="text-left">
                <span id={`card-${t.id}-title`} className="block text-base font-bold text-[#F0F4FF]" style={{ fontFamily: 'var(--font-grotesk)' }}>
                  {t.name}
                </span>
                <span className="block text-xs text-[#8892B0]">{t.profession}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
