'use client'
import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, CheckCircle2, ArrowUpRight, Calendar, Timer, Building2 } from 'lucide-react'
import { CASE_STUDIES, getCaseStudy } from '@/data/caseStudies'

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const cs = getCaseStudy(slug)
  if (!cs) notFound()

  const next = CASE_STUDIES[(CASE_STUDIES.findIndex(c => c.slug === cs.slug) + 1) % CASE_STUDIES.length]

  return (
    <div className="relative z-10">
      <article className="max-w-5xl mx-auto px-6 py-16">

        {/* Back */}
        <Link href="/#services" className="inline-flex items-center gap-2 text-sm text-[#8892B0] hover:text-[#F0F4FF] transition-colors mb-10 group">
          <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Case Studies
        </Link>

        {/* Tag + meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: `${cs.accent}20`, color: cs.accent, border: `1px solid ${cs.accent}35` }}>
            {cs.tag}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-[#8892B0]"><Building2 size={12} />{cs.client}</div>
          <div className="flex items-center gap-1.5 text-xs text-[#8892B0]"><Calendar size={12} />{cs.year}</div>
          <div className="flex items-center gap-1.5 text-xs text-[#8892B0]"><Timer size={12} />{cs.duration}</div>
        </div>

        {/* Title + lede */}
        <h1 className="text-4xl md:text-6xl font-black text-[#F0F4FF] mb-5 leading-[1.02]"
          style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.03em' }}>
          {cs.title}
        </h1>
        <p className="text-xl md:text-2xl leading-snug max-w-3xl mb-10 accent-serif"
          style={{ background: `linear-gradient(135deg, ${cs.accent}, #F0F4FF)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {cs.result}
        </p>

        {/* Hero image */}
        <div className="h-72 sm:h-[480px] rounded-3xl overflow-hidden mb-8 relative" style={{ border: '1px solid rgba(255,255,255,.08)' }}>
          <img src={cs.img} alt={cs.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(7,11,26,.5) 0%, transparent 40%)' }} />
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {cs.kpis.map(k => (
            <div key={k.label} className="glass-md rounded-2xl p-6 text-center">
              <div className="text-3xl md:text-4xl font-black mb-1" style={{ fontFamily: 'var(--font-grotesk)', color: cs.accent }}>
                {k.value}
              </div>
              <div className="text-xs text-[#8892B0]">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Challenge / Solution */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-2xl font-black text-[#F0F4FF] mb-4" style={{ fontFamily: 'var(--font-grotesk)' }}>
              The <span className="accent-serif" style={{ color: cs.accent }}>challenge</span>
            </h2>
            <p className="text-[#8892B0] leading-relaxed">{cs.challenge}</p>
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#F0F4FF] mb-4" style={{ fontFamily: 'var(--font-grotesk)' }}>
              The <span className="accent-serif" style={{ color: cs.accent }}>solution</span>
            </h2>
            <p className="text-[#8892B0] leading-relaxed">{cs.solution}</p>
          </div>
        </div>

        {/* Outcomes */}
        <div className="glass-md rounded-3xl p-8 md:p-10 mb-16">
          <h2 className="text-2xl font-black text-[#F0F4FF] mb-6" style={{ fontFamily: 'var(--font-grotesk)' }}>
            What we <span className="accent-serif" style={{ color: cs.accent }}>delivered</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mb-8">
            {cs.outcomes.map(o => (
              <div key={o} className="flex items-start gap-3">
                <CheckCircle2 size={17} style={{ color: cs.accent, flexShrink: 0, marginTop: 3 }} />
                <p className="text-sm text-[#F0F4FF]/90 leading-relaxed">{o}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,.07)' }}>
            <span className="text-xs text-[#8892B0] font-semibold uppercase tracking-widest w-full mb-1">Services &amp; stack</span>
            {[...cs.services, ...cs.stack].map(t => (
              <span key={t} className="px-3 py-1 rounded-full text-[11px] font-semibold text-[#8892B0]"
                style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.09)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Next case study */}
        <Link href={`/work/${next.slug}`}
          className="group relative block rounded-3xl overflow-hidden mb-16"
          style={{ border: '1px solid rgba(255,255,255,.08)' }}>
          <div className="h-56 relative">
            <img src={next.img} alt={next.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(7,11,26,.92) 0%, rgba(7,11,26,.55) 60%, rgba(7,11,26,.25) 100%)' }} />
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8892B0] mb-2">Next case study</span>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl md:text-3xl font-black text-[#F0F4FF]" style={{ fontFamily: 'var(--font-grotesk)' }}>{next.title}</h3>
                <ArrowUpRight size={22} style={{ color: next.accent }} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <p className="text-sm text-[#8892B0] mt-1 max-w-md">{next.result}</p>
            </div>
          </div>
        </Link>

        {/* CTA */}
        <div className="glass-md rounded-3xl p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-[#F0F4FF] mb-3" style={{ fontFamily: 'var(--font-grotesk)' }}>
            Want results like <span className="accent-serif grad">these?</span>
          </h2>
          <p className="text-[#8892B0] text-sm mb-8 max-w-md mx-auto">Proposal within 48 hours. Free discovery call, no commitment.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold transition-all hover:scale-[1.03]"
              style={{ background: 'linear-gradient(135deg,#1E2A78,#2AACE2)', color: '#fff', boxShadow: '0 0 32px rgba(42,172,226,.35)' }}>
              Start Your Project
            </Link>
            <Link href="/fleet" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold glass" style={{ color: '#F0F4FF' }}>
              View All Work
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
