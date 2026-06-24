'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Clock } from 'lucide-react'

interface Phase {
  num: string; title: string; icon: string; color: string; duration: string;
  desc: string; activities: string[]; deliverables: string[]; quote: string;
}

export default function ProcessClient({ phases }: { phases: Phase[] }) {
  const [active, setActive] = useState(0)
  const ph = phases[active]

  return (
    <section className="relative z-10 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Timeline nav */}
        <div className="relative mb-12">
          {/* Connecting line */}
          <div className="absolute top-7 left-0 right-0 h-px hidden md:block" style={{ background:'rgba(255,255,255,.08)' }} />
          <div
            className="absolute top-7 left-0 h-px hidden md:block transition-all duration-500"
            style={{ background:'linear-gradient(90deg,#2AACE2,#4DD0C4,#FFC845)', width:`${(active / (phases.length-1)) * 100}%` }}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {phases.map((p, i) => (
              <button
                key={p.num}
                onClick={() => setActive(i)}
                className="flex flex-col items-center gap-3 cursor-pointer group transition-all duration-200"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300"
                  style={{
                    background: active >= i ? p.color : 'rgba(255,255,255,.05)',
                    border: `2px solid ${active >= i ? p.color : 'rgba(255,255,255,.12)'}`,
                    color: active >= i ? '#fff' : '#8892B0',
                    boxShadow: active === i ? `0 0 24px ${p.color}55` : 'none',
                    fontFamily: 'var(--font-grotesk)',
                  }}
                >
                  {active > i ? <Check size={20} /> : p.icon}
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#8892B0] mb-0.5">{p.num}</div>
                  <div className="text-sm font-semibold" style={{ color: active === i ? '#F0F4FF' : '#8892B0' }}>{p.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={ph.num}
            initial={{ opacity:0, y:16 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-16 }}
            transition={{ duration:.35 }}
            className="grid md:grid-cols-[1fr_340px] gap-6"
          >
            {/* Main */}
            <div className="rounded-2xl p-8 md:p-10" style={{ background:'rgba(13,21,48,.85)',border:`1px solid ${ph.color}25` }}>
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background:`${ph.color}18`,border:`1px solid ${ph.color}35` }}>
                  {ph.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: ph.color }}>Phase {ph.num}</div>
                    <div className="flex items-center gap-1.5 text-xs text-[#8892B0]"><Clock size={11} /> {ph.duration}</div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#F0F4FF]" style={{ fontFamily:'var(--font-grotesk)' }}>{ph.title}</h2>
                </div>
              </div>

              <p className="text-[#8892B0] text-base leading-relaxed mb-8">{ph.desc}</p>

              {/* Activities grid */}
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#8892B0] mb-4">Activities</h3>
              <div className="grid sm:grid-cols-2 gap-2.5 mb-8">
                {ph.activities.map(a=>(
                  <div key={a} className="flex items-center gap-2.5 text-sm text-[#8892B0]">
                    <Check size={13} style={{ color: ph.color, flexShrink: 0 }} />
                    {a}
                  </div>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="relative pl-5 italic text-[#8892B0] text-sm leading-relaxed">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full" style={{ background: ph.color }} />
                {ph.quote}
              </blockquote>
            </div>

            {/* Deliverables sidebar */}
            <div className="rounded-2xl p-7" style={{ background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.08)' }}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[#8892B0] mb-5">Deliverables</h3>
              <div className="flex flex-col gap-3">
                {ph.deliverables.map((d,i)=>(
                  <motion.div
                    key={d}
                    initial={{ opacity:0, x:-10 }}
                    animate={{ opacity:1, x:0 }}
                    transition={{ delay: i * .08 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background:`${ph.color}0E`,border:`1px solid ${ph.color}25` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ph.color }} />
                    <span className="text-sm font-medium" style={{ color: ph.color }}>{d}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6" style={{ borderTop:'1px solid rgba(255,255,255,.07)' }}>
                <div className="text-xs text-[#8892B0] mb-2 font-medium uppercase tracking-widest">Timeline</div>
                <div className="text-2xl font-bold" style={{ color: ph.color, fontFamily:'var(--font-grotesk)' }}>{ph.duration}</div>
                <div className="text-xs text-[#8892B0] mt-1">Varies by scope</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => setActive(i => Math.max(0, i - 1))}
            disabled={active === 0}
            className="px-5 py-2.5 rounded-xl text-sm btn-ghost disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            ← Previous
          </button>
          <div className="flex gap-2">
            {phases.map((p, i) => (
              <button key={p.num} onClick={()=>setActive(i)} className="w-2 h-2 rounded-full transition-all duration-200 cursor-pointer"
                style={{ background: active===i ? '#2AACE2' : 'rgba(255,255,255,.15)', transform: active===i ? 'scale(1.4)' : 'scale(1)' }} />
            ))}
          </div>
          <button
            onClick={() => setActive(i => Math.min(phases.length - 1, i + 1))}
            disabled={active === phases.length - 1}
            className="px-5 py-2.5 rounded-xl text-sm btn-ghost disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  )
}
