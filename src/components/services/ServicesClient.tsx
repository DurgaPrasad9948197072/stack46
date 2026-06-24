'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Clock, Package } from 'lucide-react'
import Link from 'next/link'
import AnimCard from '@/components/ui/AnimCard'

interface Service {
  id: string
  icon: string
  title: string
  color: string
  headline: string
  desc: string
  features: string[]
  deliverables: string[]
  timeline: string
}

export default function ServicesClient({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0)
  const svc = services[active]

  return (
    <section className="relative z-10 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar tabs */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {services.map((s, i) => (
              <AnimCard
                key={s.id}
                delay={i * 0.06}
                accentColor={s.color}
                noTilt
                style={{
                  background: active === i ? `${s.color}15` : 'rgba(255,255,255,.03)',
                }}
                className="flex-shrink-0 lg:flex-shrink"
              >
                <button
                  onClick={() => setActive(i)}
                  className="flex items-center gap-3 px-4 py-3.5 text-left whitespace-nowrap lg:whitespace-normal cursor-pointer w-full"
                  style={{
                    color: active === i ? '#F0F4FF' : '#8892B0',
                  }}
                >
                  <span className="text-xl">{s.icon}</span>
                  <span className="text-sm font-medium">{s.title}</span>
                  {active === i && (
                    <motion.div layoutId="service-indicator" className="ml-auto w-1.5 h-1.5 rounded-full hidden lg:block" style={{ background: s.color }} />
                  )}
                </button>
              </AnimCard>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, x: 20, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -20, y: -8 }}
              transition={{ duration: .4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl p-8 md:p-10"
              style={{ background:'rgba(13,21,48,.8)',border:'1px solid rgba(255,255,255,.09)' }}
            >
              {/* Header */}
              <div className="flex items-start gap-5 mb-8">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background:`${svc.color}1A`,border:`1px solid ${svc.color}35` }}>
                  {svc.icon}
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: svc.color }}>Service</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#F0F4FF]" style={{ fontFamily:'var(--font-grotesk)' }}>{svc.headline}</h2>
                </div>
              </div>

              <p className="text-[#8892B0] text-base leading-relaxed mb-8">{svc.desc}</p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Features */}
                <div>
                  <h3 className="text-sm font-semibold text-[#F0F4FF] mb-4 tracking-wide uppercase">What&apos;s Included</h3>
                  <ul className="flex flex-col gap-2.5">
                    {svc.features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-[#8892B0]">
                        <Check size={14} style={{ color: svc.color, flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables + timeline */}
                <div>
                  <h3 className="text-sm font-semibold text-[#F0F4FF] mb-4 tracking-wide uppercase">Deliverables</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {svc.deliverables.map(d => (
                      <span key={d} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{ background:`${svc.color}12`,color:svc.color,border:`1px solid ${svc.color}30` }}>
                        <Package size={10} /> {d}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#8892B0] mt-4">
                    <Clock size={14} style={{ color: svc.color }} />
                    <span>Typical timeline: <span className="text-[#F0F4FF] font-medium">{svc.timeline}</span></span>
                  </div>
                </div>
              </div>

              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm btn-primary">
                Get a Quote for {svc.title} →
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
