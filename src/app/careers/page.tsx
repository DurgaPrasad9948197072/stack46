'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'
import AnimatedText from '@/components/ui/AnimatedText'
import { MapPin } from 'lucide-react'

const PERKS = [
  { icon: '💰', title: 'Competitive Salary', sub: 'Top-of-market pay + equity options' },
  { icon: '🏥', title: 'Full Health Cover', sub: 'Medical, dental, and vision for you and family' },
  { icon: '🌍', title: 'Remote-First', sub: 'Hubs in London, remote-friendly globally' },
  { icon: '📚', title: '£3K Learning Budget', sub: 'Courses, conferences, books — your choice' },
  { icon: '🏖️', title: 'Unlimited PTO', sub: 'Minimum 25 days. We encourage taking it.' },
  { icon: '🚀', title: 'Build Real Products', sub: 'Work on shipped products for real clients' },
]

const DEPTS = ['All', 'Engineering', 'Design', 'Product', 'Sales', 'Operations']

const JOBS = [
  {
    title: 'Senior Backend Engineer — Real-Time Systems',
    dept: 'Engineering', location: 'London / Remote', level: 'Senior',
    desc: 'Own the real-time event pipeline that processes 2M+ events per second. Lead architecture decisions, mentor junior engineers, and ship reliable distributed systems.',
    tags: ['Go', 'Kafka', 'AWS', 'Kubernetes', 'PostgreSQL'],
    color: '#2AACE2',
    reveal: 'reveal-left',
  },
  {
    title: 'ML Engineer — Predictive Analytics',
    dept: 'Engineering', location: 'London / Remote', level: 'Mid/Senior',
    desc: 'Build and productionise ML models that power our AI layer. From data pipelines to model serving — you own the full lifecycle.',
    tags: ['Python', 'PyTorch', 'MLflow', 'Snowflake', 'FastAPI'],
    color: '#FFC845',
    reveal: 'reveal-right',
  },
  {
    title: 'Senior Product Designer',
    dept: 'Design', location: 'Remote', level: 'Senior',
    desc: 'Design intuitive, beautiful interfaces for complex data-heavy products. You will own end-to-end design — from research to production handoff.',
    tags: ['Figma', 'Design Systems', 'Motion', 'User Research'],
    color: '#a855f7',
    reveal: 'reveal-left',
  },
  {
    title: 'Product Manager — Platform',
    dept: 'Product', location: 'London', level: 'Mid/Senior',
    desc: 'Own the product roadmap for our developer platform. Work closely with engineering, clients, and sales to prioritise and ship features that matter.',
    tags: ['B2B SaaS', 'Analytics', 'SQL', 'API Products'],
    color: '#f97316',
    reveal: 'reveal-right',
  },
  {
    title: 'Enterprise Account Executive',
    dept: 'Sales', location: 'London / Remote', level: 'Senior',
    desc: 'Build and close relationships with engineering and product leaders at enterprise clients. Own the full sales cycle from outreach to contract.',
    tags: ['Enterprise SaaS', 'Tech Sales', 'CRM', 'Solutions'],
    color: '#22c55e',
    reveal: 'reveal-left',
  },
  {
    title: 'iOS Engineer — Mobile SDK',
    dept: 'Engineering', location: 'Remote', level: 'Mid/Senior',
    desc: 'Build the iOS SDK that our clients embed into their mobile apps. Focus on performance, battery efficiency, and developer experience.',
    tags: ['Swift', 'SwiftUI', 'CoreLocation', 'BLE'],
    color: '#06b6d4',
    reveal: 'reveal-right',
  },
  {
    title: 'Client Onboarding Specialist',
    dept: 'Operations', location: 'London / Remote', level: 'Mid',
    desc: 'Ensure new clients get up and running fast. Act as the bridge between sales, engineering and the client — reducing time-to-value to under 2 weeks.',
    tags: ['Customer Success', 'Technical', 'Project Management'],
    color: '#4DD0C4',
    reveal: 'reveal-left',
  },
  {
    title: 'Data Engineer — Warehouse & BI',
    dept: 'Engineering', location: 'London / Remote', level: 'Mid',
    desc: 'Design and maintain our data warehouse infrastructure. Build the pipelines that power client analytics dashboards and internal reporting.',
    tags: ['Snowflake', 'dbt', 'Airflow', 'SQL', 'Python'],
    color: '#FFC845',
    reveal: 'reveal-right',
  },
]

const DEPT_COLORS: Record<string, string> = {
  Engineering: '#2AACE2', Design: '#a855f7', Product: '#f97316',
  Sales: '#22c55e', Operations: '#4DD0C4',
}

export default function CareersPage() {
  useReveal()
  const [activeDept, setActiveDept] = useState('All')
  const filtered = activeDept === 'All' ? JOBS : JOBS.filter(j => j.dept === activeDept)

  return (
    <div className="relative z-10 overflow-x-hidden">
      {/* Hero */}
      <section className="py-28 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ background: 'rgba(168,85,247,.1)', border: '1px solid rgba(168,85,247,.25)', color: '#a855f7' }}>Careers</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 leading-[1.06]" style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.02em' }}>
            <span className="block"><AnimatedText segments={[{ text: 'Help us build the' }]} /></span>
            <span className="block"><AnimatedText delay={0.24} segments={[{ text: 'future of software.', style: { background: 'linear-gradient(135deg,#2AACE2,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } }]} /></span>
          </h1>
          <p className="text-[#8892B0] text-lg mb-3 max-w-xl mx-auto">40+ team members across London and remote. We ship real products for real clients — fast.</p>
          <p className="text-sm text-[#8892B0]">London HQ · Remote-friendly · Competitive pay + equity</p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PERKS.map((p, i) => (
              <div key={p.title} className={`glass-md rounded-2xl p-5 flex items-start gap-4 card-hover border border-transparent reveal-bottom d${(i % 3) + 1}`}>
                <span className="text-2xl flex-shrink-0">{p.icon}</span>
                <div>
                  <h3 className="font-bold text-sm text-[#F0F4FF] mb-1">{p.title}</h3>
                  <p className="text-xs text-[#8892B0]">{p.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-8" style={{ fontFamily: 'var(--font-grotesk)' }}>Open positions</h2>

          {/* Dept filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {DEPTS.map(d => (
              <button key={d} onClick={() => setActiveDept(d)} className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer"
                style={{
                  background: activeDept === d ? '#2AACE2' : 'rgba(255,255,255,.05)',
                  color: activeDept === d ? '#fff' : '#8892B0',
                  border: activeDept === d ? '1px solid #2AACE2' : '1px solid rgba(255,255,255,.1)',
                }}>
                {d}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[#8892B0]">No open positions in this department right now.</div>
          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map((job, i) => (
                <div key={job.title} className={`glass-md rounded-2xl p-6 card-hover border border-transparent ${job.reveal} d${(i % 3) + 1}`}>
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: `${DEPT_COLORS[job.dept] ?? '#8892B0'}18`, color: DEPT_COLORS[job.dept] ?? '#8892B0' }}>
                          {job.dept}
                        </span>
                        <span className="text-xs text-[#8892B0]">{job.level}</span>
                      </div>
                      <h3 className="font-black text-lg text-[#F0F4FF] mb-2" style={{ fontFamily: 'var(--font-grotesk)' }}>{job.title}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#8892B0] mb-3">
                        <MapPin size={11} />{job.location}
                      </div>
                      <p className="text-sm text-[#8892B0] leading-relaxed mb-4">{job.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-full text-xs glass" style={{ color: '#8892B0' }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <Link href="/contact"
                      className="flex-shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] self-start"
                      style={{ background: `linear-gradient(135deg,${job.color}30,${job.color}15)`, color: job.color, border: `1px solid ${job.color}35` }}>
                      Apply Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 text-center pb-28">
        <div className="max-w-2xl mx-auto glass-md rounded-3xl p-10">
          <div className="text-3xl mb-4">💌</div>
          <h2 className="text-2xl font-black text-[#F0F4FF] mb-3" style={{ fontFamily: 'var(--font-grotesk)' }}>{"Don't see a fit?"}</h2>
          <p className="text-[#8892B0] mb-6">We are always looking for exceptional people. Send us an open application.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition-all hover:scale-[1.03]"
            style={{ background: 'linear-gradient(135deg,#1E2A78,#2AACE2)', color: '#fff' }}>
            Send Open Application
          </Link>
        </div>
      </section>
    </div>
  )
}
