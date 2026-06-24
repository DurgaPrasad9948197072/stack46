'use client'
import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { X, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import AnimCard from '@/components/ui/AnimCard'

interface Project {
  id: string; name: string; cat: string; tag: string; year: string;
  gradient: string; color: string; desc: string; problem: string;
  solution: string; results: string[]; stack: string[]; featured: boolean;
}

export default function WorkClient({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>('All')
  const [selected, setSelected] = useState<Project | null>(null)

  const cats = ['All', ...Array.from(new Set(projects.map(p => p.cat)))]
  const filtered = filter === 'All' ? projects : projects.filter(p => p.cat === filter)

  return (
    <section className="relative z-10 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer"
              style={{ background: filter===c ? 'linear-gradient(135deg,#1E2A78,#2AACE2)' : 'rgba(255,255,255,.05)', border: filter===c ? 'none' : '1px solid rgba(255,255,255,.1)', color: filter===c ? '#fff' : '#8892B0' }}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <LayoutGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity:0, scale:.95 }}
                animate={{ opacity:1, scale:1 }}
                exit={{ opacity:0, scale:.9 }}
                transition={{ duration:.3, delay: i * .05 }}
                onClick={() => setSelected(p)}
                className="cursor-pointer"
              >
                <AnimCard
                  delay={i * 0.08}
                  accentColor={p.color}
                  className="group"
                  style={{ background:'rgba(255,255,255,.03)' }}
                >
                  {/* Thumb */}
                  <div className="h-48 relative overflow-hidden" style={{ background: p.gradient }}>
                    {p.featured && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background:'rgba(0,0,0,.4)',backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,.2)',color:'#fff' }}>
                        Featured
                      </div>
                    )}
                    <div className="absolute top-3 right-3 px-2 py-1 rounded text-[10px] font-medium" style={{ background:'rgba(0,0,0,.35)',color:'rgba(255,255,255,.8)' }}>{p.year}</div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-black text-6xl text-white/20 select-none" style={{ fontFamily:'var(--font-grotesk)' }}>
                        {p.name.split(' ').map(w=>w[0]).join('')}
                      </span>
                    </div>
                    <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse at 25% 25%,rgba(255,255,255,.1) 0%,transparent 60%)' }} />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background:'rgba(0,0,0,.45)' }}>
                      <span className="text-sm font-semibold text-white">View Case Study →</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ background:`${p.color}18`,color:p.color,border:`1px solid ${p.color}35` }}>
                        {p.tag} · {p.cat}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-[#F0F4FF] mb-2" style={{ fontFamily:'var(--font-grotesk)' }}>{p.name}</h3>
                    <p className="text-[#8892B0] text-sm leading-relaxed line-clamp-2">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {p.stack.slice(0,4).map(s=>(
                        <span key={s} className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ background:'rgba(255,255,255,.06)',color:'#8892B0' }}>{s}</span>
                      ))}
                      {p.stack.length > 4 && <span className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ background:'rgba(255,255,255,.06)',color:'#8892B0' }}>+{p.stack.length-4}</span>}
                    </div>
                  </div>
                </AnimCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        </LayoutGroup>

        {/* Case study modal */}
        <AnimatePresence>
          {selected && (
            <>
              <motion.div
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                exit={{ opacity:0 }}
                className="fixed inset-0 z-50"
                style={{ background:'rgba(0,0,0,.75)',backdropFilter:'blur(8px)' }}
                onClick={() => setSelected(null)}
              />
              <motion.div
                initial={{ opacity:0, scale:.95, y:20 }}
                animate={{ opacity:1, scale:1, y:0 }}
                exit={{ opacity:0, scale:.95, y:20 }}
                transition={{ duration:.3, ease:[.16,1,.3,1] }}
                className="fixed inset-4 md:inset-12 lg:inset-20 z-50 rounded-2xl overflow-auto"
                style={{ background:'#0D1530',border:'1px solid rgba(255,255,255,.12)',boxShadow:'0 40px 120px rgba(0,0,0,.7)' }}
              >
                {/* Modal header */}
                <div className="h-52 relative flex-shrink-0" style={{ background: selected.gradient }}>
                  <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse at 20% 30%,rgba(255,255,255,.12) 0%,transparent 60%)' }} />
                  <button onClick={()=>setSelected(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer" style={{ background:'rgba(0,0,0,.35)',color:'#fff' }}>
                    <X size={16} />
                  </button>
                  <div className="absolute bottom-6 left-8">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2" style={{ background:'rgba(0,0,0,.35)',color:'rgba(255,255,255,.9)' }}>
                      {selected.tag} · {selected.cat} · {selected.year}
                    </span>
                    <h2 className="text-3xl font-bold text-white" style={{ fontFamily:'var(--font-grotesk)' }}>{selected.name}</h2>
                  </div>
                </div>

                {/* Modal body */}
                <div className="p-8 md:p-12">
                  <p className="text-[#8892B0] text-lg leading-relaxed mb-10">{selected.desc}</p>

                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div className="rounded-2xl p-6" style={{ background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)' }}>
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-[#8892B0] mb-3">The Challenge</h3>
                      <p className="text-[#F0F4FF] text-sm leading-relaxed">{selected.problem}</p>
                    </div>
                    <div className="rounded-2xl p-6" style={{ background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)' }}>
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-[#8892B0] mb-3">Our Solution</h3>
                      <p className="text-[#F0F4FF] text-sm leading-relaxed">{selected.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-[#8892B0] mb-4">Results</h3>
                    <div className="flex flex-wrap gap-3">
                      {selected.results.map(r=>(
                        <div key={r} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm" style={{ background:`${selected.color}12`,border:`1px solid ${selected.color}30` }}>
                          <CheckCircle size={14} style={{ color: selected.color }} />
                          <span style={{ color: selected.color }}>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stack */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-[#8892B0] mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selected.stack.map(s=>(
                        <span key={s} className="tech-badge">{s}</span>
                      ))}
                    </div>
                  </div>

                  <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm btn-primary" onClick={()=>setSelected(null)}>
                    Start a Similar Project <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
