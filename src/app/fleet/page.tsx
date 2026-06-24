'use client'
import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'
import { MapPin, CheckCircle2 } from 'lucide-react'

const STATS = [
  { val: '150+', label: 'Projects Delivered' },
  { val: '6',    label: 'Industries' },
  { val: '200+', label: 'Integrations Built' },
  { val: '50+',  label: 'Countries Served' },
]

const INDUSTRIES = [
  { name: 'FinTech',         sub: '23 projects delivered', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&q=80', accent: '#2AACE2',  count: '23+' },
  { name: 'HealthTech',      sub: '12 projects delivered', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80', accent: '#ef4444',  count: '12+' },
  { name: 'E-Commerce',      sub: '31 projects delivered', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80', accent: '#f97316',  count: '31+' },
  { name: 'EdTech',          sub: '18 projects delivered', img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=700&q=80', accent: '#22c55e',  count: '18+' },
  { name: 'SaaS Platforms',  sub: '28 projects delivered', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=700&q=80', accent: '#06b6d4',  count: '28+' },
  { name: 'Enterprise',      sub: '19 projects delivered', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80', accent: '#FFC845', count: '19+' },
]

const CASE_STUDIES = [
  {
    name: 'LogiFlow',
    tag: 'FinTech · Supply Chain',
    result: '25% cost reduction across 120-person engineering team',
    detail: '800+ vehicles tracked',
    color: '#2AACE2',
  },
  {
    name: 'NexusAI Platform',
    tag: 'SaaS · AI/ML',
    result: '3× faster data processing with zero unexpected downtime',
    detail: '50TB migrated in 72 hrs',
    color: '#FFC845',
  },
  {
    name: 'RetailHub',
    tag: 'E-Commerce · Mobile',
    result: '4.9 App Store rating — 2M daily active users in month 3',
    detail: '86 enterprise clients',
    color: '#22c55e',
  },
]

export default function FleetPage() {
  useReveal()

  return (
    <div className="relative z-10 overflow-x-hidden">
      {/* Hero */}
      <section className="py-28 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
            style={{ background: 'rgba(42,172,226,.1)', border: '1px solid rgba(42,172,226,.25)', color: '#2AACE2' }}>Our Work</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.06]" style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.02em' }}>
            Every industry.<br />
            <span style={{ background: 'linear-gradient(135deg,#2AACE2,#FFC845)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              One unified agency.
            </span>
          </h1>
          <p className="text-[#8892B0] text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            From FinTech to HealthTech — we build digital products that define market leaders.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup" className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition-all hover:scale-[1.03]"
              style={{ background: 'linear-gradient(135deg,#1E2A78,#2AACE2)', color: '#fff', boxShadow: '0 0 32px rgba(42,172,226,.3)' }}>
              Start Your Project
            </Link>
            <Link href="/platform" className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold glass" style={{ color: '#F0F4FF' }}>
              Explore Platform
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-md rounded-2xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {STATS.map(s => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-[#F0F4FF] mb-1" style={{ fontFamily: 'var(--font-grotesk)', color: '#2AACE2' }}>{s.val}</div>
                  <div className="text-xs text-[#8892B0]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry cards */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12" style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.02em' }}>
            Industries we serve
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map((ind, i) => (
              <div key={ind.name} className={`glass-md rounded-2xl overflow-hidden card-hover border border-transparent ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'} d${(i % 3) + 1}`}>
                <div className="h-52 overflow-hidden relative group">
                  <img src={ind.img} alt={ind.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(7,11,26,.85) 0%,rgba(7,11,26,.1) 60%)' }} />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-3xl font-black" style={{ color: ind.accent, fontFamily: 'var(--font-grotesk)', opacity: .9 }}>{ind.count}</span>
                    <span className="text-[#8892B0] text-xs ml-2">projects</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#F0F4FF] mb-1" style={{ fontFamily: 'var(--font-grotesk)' }}>{ind.name}</h3>
                  <p className="text-sm text-[#8892B0]">{ind.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12" style={{ fontFamily: 'var(--font-grotesk)' }}>Featured case studies</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {CASE_STUDIES.map(cs => (
              <div key={cs.name} className="glass-md rounded-2xl p-6 card-hover border border-transparent reveal-bottom d2">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={14} style={{ color: cs.color }} />
                  <span className="text-xs text-[#8892B0]">{cs.tag}</span>
                </div>
                <h3 className="font-black text-xl mb-3" style={{ fontFamily: 'var(--font-grotesk)', color: cs.color }}>{cs.name}</h3>
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 size={15} style={{ color: cs.color, flexShrink: 0, marginTop: 2 }} />
                  <p className="text-sm text-[#F0F4FF]">{cs.result}</p>
                </div>
                <p className="text-xs text-[#8892B0] mt-3 pl-5">{cs.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto glass-md rounded-3xl p-12">
          <h2 className="text-3xl font-black mb-4" style={{ fontFamily: 'var(--font-grotesk)' }}>Ready to join our portfolio?</h2>
          <p className="text-[#8892B0] mb-8">Let&apos;s build your next big product together.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all hover:scale-[1.03]"
              style={{ background: 'linear-gradient(135deg,#1E2A78,#2AACE2)', color: '#fff', boxShadow: '0 0 32px rgba(42,172,226,.3)' }}>
              Get Started Free
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold glass" style={{ color: '#F0F4FF' }}>
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
