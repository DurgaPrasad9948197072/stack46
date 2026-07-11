'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import { motion, useTransform, useSpring, useMotionValue, useScroll } from 'framer-motion'

/*
 * STACK46 scroll-morph gallery.
 * Adapted from the virtual-wheel original: the morph is driven by REAL page
 * scroll through a tall sticky section, so it never traps the wheel and works
 * with Lenis. Sequence: scatter → line → circle, then scroll morphs the ring
 * into a rainbow arc and sweeps through the cards.
 */

export type AnimationPhase = 'scatter' | 'line' | 'circle'

interface CardTarget { x: number; y: number; rotation: number; scale: number; opacity: number }

const IMG_WIDTH = 60
const IMG_HEIGHT = 85
const TOTAL_IMAGES = 16

const IMAGES = [
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&q=80',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&q=80',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&q=80',
  'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=300&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&q=80',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&q=80',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&q=80',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=300&q=80',
  'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=300&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&q=80',
  'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=300&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&q=80',
]

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t

/* Flip card — front image, brand back face on hover */
function FlipCard({ src, index, target }: { src: string; index: number; target: CardTarget }) {
  return (
    <motion.div
      animate={{ x: target.x, y: target.y, rotate: target.rotation, scale: target.scale, opacity: target.opacity }}
      transition={{ type: 'spring', stiffness: 120, damping: 22 }}
      style={{ position: 'absolute', width: IMG_WIDTH, height: IMG_HEIGHT, transformStyle: 'preserve-3d', perspective: '1000px' }}
      className="cursor-pointer group">
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}>
        {/* Front */}
        <div className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg"
          style={{ backfaceVisibility: 'hidden', background: '#0D1530', border: '1px solid rgba(255,255,255,.1)' }}>
          <img src={src} alt={`work-${index}`} className="h-full w-full object-cover" draggable={false} />
          <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-transparent" />
        </div>
        {/* Back */}
        <div className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg flex flex-col items-center justify-center p-2"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'rgba(13,21,48,.98)', border: '1px solid rgba(42,172,226,.4)' }}>
          <div className="text-center">
            <p className="text-[7px] font-bold uppercase tracking-widest mb-1" style={{ color: '#2AACE2' }}>STACK46</p>
            <p className="text-[10px] font-medium" style={{ color: '#F0F4FF' }}>View Work</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ScrollMorphSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  const [introPhase, setIntroPhase] = useState<AnimationPhase>('scatter')
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  /* Sticky stage size */
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height })
      }
    })
    observer.observe(el)
    setContainerSize({ width: el.offsetWidth, height: el.offsetHeight })
    return () => observer.disconnect()
  }, [])

  /* Real page-scroll drives EVERYTHING — phases included — so scrolling up
     plays the whole sequence backwards. Track starts before the pin so the
     scatter→line→circle intro is scrubbed while the section approaches. */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end end'] })

  /* Phase thresholds on raw progress (reversible by construction) */
  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      setIntroPhase(v < 0.12 ? 'scatter' : v < 0.24 ? 'line' : 'circle')
    })
    return unsub
  }, [scrollYProgress])

  /* No springs on the scrub paths — 1:1 with the scrollbar */
  const morphProgress = useTransform(scrollYProgress, [0.32, 0.55], [0, 1])
  const sweepProgress = useTransform(scrollYProgress, [0.58, 0.97], [0, 1])

  /* Mouse parallax on the arc */
  const mouseX = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 })
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseX.set(normalizedX * 100)
    }
    el.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => el.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX])

  /* Scatter positions (client-only, stable) */
  const scatterPositions = useMemo(() =>
    IMAGES.map((_, i) => ({
      x: (((i * 7919) % 100) / 100 - 0.5) * 1500,
      y: (((i * 104729) % 100) / 100 - 0.5) * 1000,
      rotation: (((i * 1299709) % 100) / 100 - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    })), [])

  /* Subscribe motion values into state for the manual morph math */
  const [morphValue, setMorphValue] = useState(0)
  const [sweepValue, setSweepValue] = useState(0)
  const [parallaxValue, setParallaxValue] = useState(0)
  useEffect(() => {
    const u1 = morphProgress.on('change', setMorphValue)
    const u2 = sweepProgress.on('change', setSweepValue)
    const u3 = smoothMouseX.on('change', setParallaxValue)
    return () => { u1(); u2(); u3() }
  }, [morphProgress, sweepProgress, smoothMouseX])

  /* Arc-state content */
  const contentOpacity = useTransform(morphProgress, [0.8, 1], [0, 1])
  const contentY = useTransform(morphProgress, [0.8, 1], [20, 0])

  return (
    /* Tall track: the sticky stage pins while scroll drives the morph */
    <section ref={sectionRef} className="relative z-10" style={{ height: '260vh' }}>
      <div ref={stageRef} className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="flex h-full w-full flex-col items-center justify-center" style={{ perspective: 1000 }}>

          {/* Ring-state caption (fades out as morph begins) */}
          <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2 px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={introPhase === 'circle' && morphValue < 0.5
                ? { opacity: 1 - morphValue * 2, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 1 }}
              className="text-2xl md:text-4xl font-black tracking-tight text-[#F0F4FF]"
              style={{ fontFamily: 'var(--font-grotesk)' }}>
              Every pixel has a story.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={introPhase === 'circle' && morphValue < 0.5 ? { opacity: 0.6 - morphValue } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-4 text-xs font-bold tracking-[0.25em] text-[#8892B0] uppercase">
              Keep scrolling
            </motion.p>
          </div>

          {/* Arc-state content (fades in when arc forms) */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="absolute top-[12%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-[#F0F4FF]" style={{ fontFamily: 'var(--font-grotesk)' }}>
              <span style={{ background: 'linear-gradient(135deg,#2AACE2,#4DD0C4,#FFC845)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                150+ projects,
              </span>{' '}
              one standard.
            </h2>
            <p className="text-sm md:text-base text-[#8892B0] max-w-lg leading-relaxed">
              SaaS, e-commerce, AI, mobile — scroll to sweep through the work that made our clients market leaders.
            </p>
          </motion.div>

          {/* Card field */}
          <div className="relative flex items-center justify-center w-full h-full">
            {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
              let target: CardTarget = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 }

              if (introPhase === 'scatter') {
                target = scatterPositions[i]
              } else if (introPhase === 'line') {
                const lineSpacing = 70
                const lineTotalWidth = TOTAL_IMAGES * lineSpacing
                target = { x: i * lineSpacing - lineTotalWidth / 2, y: 0, rotation: 0, scale: 1, opacity: 1 }
              } else {
                const isMobile = containerSize.width < 768
                const minDimension = Math.min(containerSize.width, containerSize.height)

                /* Circle position */
                const circleRadius = Math.min(minDimension * 0.35, 350)
                const circleAngle = (i / TOTAL_IMAGES) * 360
                const circleRad = (circleAngle * Math.PI) / 180
                const circlePos = {
                  x: Math.cos(circleRad) * circleRadius,
                  y: Math.sin(circleRad) * circleRadius,
                  rotation: circleAngle + 90,
                }

                /* Rainbow arc position */
                const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5)
                const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1)
                const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25)
                const arcCenterY = arcApexY + arcRadius
                const spreadAngle = isMobile ? 100 : 130
                const startAngle = -90 - spreadAngle / 2
                const step = spreadAngle / (TOTAL_IMAGES - 1)

                const maxRotation = spreadAngle * 0.8
                const boundedRotation = -sweepValue * maxRotation

                const currentArcAngle = startAngle + i * step + boundedRotation
                const arcRad = (currentArcAngle * Math.PI) / 180
                const arcPos = {
                  x: Math.cos(arcRad) * arcRadius + parallaxValue,
                  y: Math.sin(arcRad) * arcRadius + arcCenterY,
                  rotation: currentArcAngle + 90,
                  scale: isMobile ? 1.4 : 1.8,
                }

                target = {
                  x: lerp(circlePos.x, arcPos.x, morphValue),
                  y: lerp(circlePos.y, arcPos.y, morphValue),
                  rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                  scale: lerp(1, arcPos.scale, morphValue),
                  opacity: 1,
                }
              }

              return <FlipCard key={i} src={src} index={i} target={target} />
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
