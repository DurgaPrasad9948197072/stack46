'use client'

import * as React from 'react'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUp, CalendarDays } from 'lucide-react'

// Register ScrollTrigger safely for React
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/* local class combiner (project doesn't use shadcn/clsx) */
const cn = (...cls: (string | undefined | false)[]) => cls.filter(Boolean).join(' ')

// -------------------------------------------------------------------------
// 1. STACK46-THEMED INLINE STYLES (shadcn tokens mapped to brand palette)
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  font-family: var(--font-dm), 'Instrument Sans', sans-serif;
  -webkit-font-smoothing: antialiased;

  /* STACK46 brand tokens */
  --background: #070B1A;
  --foreground: #F0F4FF;
  --primary: #2AACE2;
  --secondary: #FFC845;
  --destructive: #ef4444;

  --pill-bg-1: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);

  --pill-bg-1-hover: color-mix(in oklch, var(--primary) 14%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--primary) 4%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--primary) 45%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--primary) 30%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px color-mix(in oklch, var(--destructive) 50%, transparent)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px color-mix(in oklch, var(--destructive) 80%, transparent)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 40s linear infinite; }
.animate-footer-heartbeat { animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite; }

/* Grid background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

/* Aurora glow — brand blue into gold */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in oklch, var(--primary) 16%, transparent) 0%,
    color-mix(in oklch, var(--secondary) 12%, transparent) 40%,
    transparent 70%
  );
}

/* Glass pill */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
      0 10px 30px -10px var(--pill-shadow),
      inset 0 1px 1px var(--pill-highlight),
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
      0 20px 40px -10px var(--pill-shadow-hover),
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

/* Giant background text */
.footer-giant-bg-text {
  font-size: 23vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--primary) 22%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--primary) 18%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
  font-family: var(--font-grotesk), sans-serif;
}

/* Metallic heading glow */
.footer-text-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 40%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--primary) 25%, transparent));
}
`

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType
    href?: string
  }

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  function MagneticButton({ className, children, as: Component = 'button', ...props }, forwardedRef) {
    const localRef = useRef<HTMLElement>(null)

    useEffect(() => {
      if (typeof window === 'undefined') return
      if (!window.matchMedia('(pointer: fine)').matches) return
      const element = localRef.current
      if (!element) return

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect()
          const h = rect.width / 2
          const w = rect.height / 2
          const x = e.clientX - rect.left - h
          const y = e.clientY - rect.top - w
          gsap.to(element, {
            x: x * 0.4, y: y * 0.4,
            rotationX: -y * 0.15, rotationY: x * 0.15,
            scale: 1.05, ease: 'power2.out', duration: 0.4,
          })
        }
        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1,
            ease: 'elastic.out(1, 0.3)', duration: 1.2,
          })
        }
        element.addEventListener('mousemove', handleMouseMove)
        element.addEventListener('mouseleave', handleMouseLeave)
        return () => {
          element.removeEventListener('mousemove', handleMouseMove)
          element.removeEventListener('mouseleave', handleMouseLeave)
        }
      }, element)

      return () => ctx.revert()
    }, [])

    return (
      <Component
        ref={(node: HTMLElement) => {
          ;(localRef as React.MutableRefObject<HTMLElement | null>).current = node
          if (typeof forwardedRef === 'function') forwardedRef(node)
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node
        }}
        className={cn('cursor-pointer', className)}
        {...props}>
        {children}
      </Component>
    )
  }
)

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Full-Stack Development</span> <span className="text-[#2AACE2]/70">✦</span>
    <span>AI &amp; Cloud Engineering</span> <span className="text-[#FFC845]/70">✦</span>
    <span>150+ Projects Shipped</span> <span className="text-[#2AACE2]/70">✦</span>
    <span>London · Remote-First</span> <span className="text-[#FFC845]/70">✦</span>
    <span>99.9% Uptime SLA</span> <span className="text-[#2AACE2]/70">✦</span>
  </div>
)

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Security', href: '/security' },
  { label: 'Status', href: '/status' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
]

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const giantTextRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  /* the footer lives in the root layout and survives client navigation —
     re-key the animations on every route so trigger positions are measured
     against the NEW page's height, not the first page visited */
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!wrapperRef.current) return

    const ctx = gsap.context(() => {
      // Giant text parallax rise
      gsap.fromTo(
        giantTextRef.current,
        { y: '10vh', scale: 0.8, opacity: 0 },
        {
          y: '0vh', scale: 1, opacity: 1, ease: 'power1.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 80%', end: 'bottom bottom', scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      )
      // Staggered content reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 40%', end: 'bottom bottom', scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      )
    }, wrapperRef)

    /* re-measure once the new route's content (fonts, images, pinned
       sections) has settled so start/end land exactly right */
    const early = setTimeout(() => ScrollTrigger.refresh(), 150)
    const late = setTimeout(() => ScrollTrigger.refresh(), 800)
    return () => {
      clearTimeout(early)
      clearTimeout(late)
      ctx.revert()
    }
  }, [pathname])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Curtain-reveal wrapper: clip-path confines the fixed footer to this box */}
      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}>

        <footer className="cinematic-footer-wrapper fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#070B1A] text-[#F0F4FF]">

          {/* Ambient light + grid */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background wordmark */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[4vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none">
            STACK46
          </div>

          {/* 1. Diagonal marquee */}
          <div className="absolute top-12 left-0 w-full overflow-hidden border-y border-white/10 bg-[#070B1A]/60 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-[#8892B0] uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Center content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto">
            <h2
              ref={headingRef}
              className="footer-text-glow text-5xl md:text-8xl font-black tracking-tighter mb-12 text-center"
              style={{ fontFamily: 'var(--font-grotesk)' }}>
              Ready to <span className="accent-serif">build?</span>
            </h2>

            <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
              {/* Primary CTAs */}
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton as={Link} href="/contact"
                  className="footer-glass-pill px-10 py-5 rounded-full text-[#F0F4FF] font-bold text-sm md:text-base flex items-center gap-3 group">
                  <CalendarDays className="w-5 h-5 text-[#8892B0] group-hover:text-[#2AACE2] transition-colors" />
                  Start Your Project
                  <ArrowRight className="w-4 h-4 text-[#8892B0] group-hover:text-[#2AACE2] group-hover:translate-x-1 transition-all" />
                </MagneticButton>

                <MagneticButton as={Link} href="/fleet"
                  className="footer-glass-pill px-10 py-5 rounded-full text-[#F0F4FF] font-bold text-sm md:text-base flex items-center gap-3 group">
                  View Our Work
                  <ArrowRight className="w-4 h-4 text-[#8892B0] group-hover:text-[#FFC845] group-hover:translate-x-1 transition-all" />
                </MagneticButton>
              </div>

              {/* Secondary pills */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 w-full mt-2">
                {LEGAL_LINKS.map(l => (
                  <MagneticButton key={l.label} as={Link} href={l.href}
                    className="footer-glass-pill px-6 py-3 rounded-full text-[#8892B0] font-medium text-xs md:text-sm hover:text-[#F0F4FF]">
                    {l.label}
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Bottom bar */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-[#8892B0] text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1">
              © {new Date().getFullYear()} FourSix46 Global Ltd · Company No. 16712658
            </div>

            <div className="footer-glass-pill px-6 py-3 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default">
              <span className="text-[#8892B0] text-[10px] md:text-xs font-bold uppercase tracking-widest">Crafted with</span>
              <span className="animate-footer-heartbeat text-sm md:text-base text-[#ef4444]">❤</span>
              <span className="text-[#8892B0] text-[10px] md:text-xs font-bold uppercase tracking-widest">by</span>
              <span className="text-[#F0F4FF] font-black text-xs md:text-sm tracking-normal ml-1 grad" style={{ fontFamily: 'var(--font-grotesk)' }}>STACK46</span>
            </div>

            <MagneticButton as="button" onClick={scrollToTop} aria-label="Back to top"
              className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-[#8892B0] hover:text-[#F0F4FF] group order-3">
              <ArrowUp className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" />
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  )
}
