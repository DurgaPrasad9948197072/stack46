'use client'

import * as React from 'react'
import {
  HTMLMotionProps, MotionValue, motion,
  useMotionTemplate, useScroll, useTransform,
} from 'framer-motion'
import { Star } from 'lucide-react'

/*
 * Scroll-stacked testimonial cards (STACK46 adaptation).
 * Cards start rotated beneath the stack and fly upward + straighten as the
 * pinned section scrolls — each card peels off the deck in sequence.
 * Rewritten for framer-motion without shadcn/cva/radix dependencies.
 */

const cn = (...cls: (string | undefined | false)[]) => cls.filter(Boolean).join(' ')

/* ── Scroll context ── */
interface ContainerScrollContextValue { scrollYProgress: MotionValue<number> }
const ContainerScrollContext = React.createContext<ContainerScrollContextValue | undefined>(undefined)
function useContainerScrollContext() {
  const ctx = React.useContext(ContainerScrollContext)
  if (!ctx) throw new Error('useContainerScrollContext must be used within ContainerScroll')
  return ctx
}

export const ContainerScroll: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, style, className, ...props }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  /* progress 0 exactly when the deck pins — cards respond from the first scroll tick */
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start start', 'end end'] })
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div ref={scrollRef} className={cn('relative w-full', className)} style={{ perspective: '1000px', ...style }} {...props}>
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}

export const CardsContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, style, ...props }) => (
  <div className={cn('relative', className)} style={{ perspective: '1000px', ...style }} {...props}>
    {children}
  </div>
)

/* ── Transformed card ── */
interface CardStickyProps extends HTMLMotionProps<'div'> {
  arrayLength: number
  index: number
  incrementY?: number
  incrementZ?: number
  incrementRotation?: number
}

export const CardTransformed = React.forwardRef<HTMLDivElement, CardStickyProps>(
  function CardTransformed({ arrayLength, index, incrementY = 10, incrementZ = 10, incrementRotation, className, style, ...props }, ref) {
    const { scrollYProgress } = useContainerScrollContext()
    const startRotation = incrementRotation ?? (index % 2 === 0 ? 8 + index * 2 : -(8 + index * 2))

    /* One card per equal scroll slice — strictly one-by-one, fully scrubbed:
       first ~40% of the slice straightens the card into view, the rest
       flies it up and away as the next card begins straightening. */
    const slice = 1 / arrayLength
    const start = index * slice
    const straightenRange: [number, number] = [Math.max(start - slice * 0.5, 0), start + slice * 0.4]
    const flyRange: [number, number] = [start + slice * 0.4, start + slice]

    const y = useTransform(scrollYProgress, flyRange, ['0%', '-190%'])
    const rotate = useTransform(scrollYProgress, straightenRange, [startRotation, 0])
    const transform = useMotionTemplate`translateZ(${index * incrementZ}px) translateY(${y}) rotate(${rotate}deg)`

    /* shadow deepens as the card settles (hooks always called — no conditional) */
    const dx = useTransform(scrollYProgress, straightenRange, [4, 0])
    const dy = useTransform(scrollYProgress, straightenRange, [4, 12])
    const blur = useTransform(scrollYProgress, straightenRange, [2, 24])
    const filter = useMotionTemplate`drop-shadow(${dx}px ${dy}px ${blur}px rgba(0,0,0,.45))`

    return (
      <motion.div
        ref={ref}
        style={{
          top: index * incrementY,
          transform,
          filter,
          backfaceVisibility: 'hidden',
          zIndex: (arrayLength - index) * incrementZ,
          background: 'rgba(13,21,48,.92)',
          border: '1px solid rgba(255,255,255,.1)',
          backdropFilter: 'blur(16px)',
          ...style,
        }}
        className={cn(
          'absolute will-change-transform flex size-full flex-col items-center justify-center gap-6 rounded-2xl p-7',
          className
        )}
        {...props} />
    )
  }
)

/* ── Stars ── */
export function ReviewStars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
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

/* ── Ready-made STACK46 section ── */
export default function TestimonialsStack() {
  return (
    <section className="relative z-10 px-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center pt-24">
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
      <ContainerScroll className="h-[300vh]">
        <div className="sticky left-0 top-0 h-svh w-full py-12 flex items-center justify-center">
          <CardsContainer className="mx-auto h-[430px] w-[340px] md:w-[400px]">
            {TESTIMONIALS.map((t, i) => (
              <CardTransformed
                key={t.id}
                arrayLength={TESTIMONIALS.length}
                index={i}
                role="article"
                aria-labelledby={`card-${t.id}-title`}>
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
              </CardTransformed>
            ))}
          </CardsContainer>
        </div>
      </ContainerScroll>
    </section>
  )
}
