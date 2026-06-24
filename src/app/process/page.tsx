import type { Metadata } from 'next'
import Link from 'next/link'
import ProcessClient from '@/components/ProcessClient'

export const metadata: Metadata = {
  title: 'Our Process',
  description: 'How STACK46 delivers exceptional digital products — our proven 4-phase methodology.',
}

const PHASES = [
  {
    num: '01',
    title: 'Discovery',
    icon: '🔍',
    color: '#2AACE2',
    duration: '1–2 weeks',
    desc: 'We dive deep into your business goals, user needs, technical constraints and competitive landscape to define exactly what to build and why.',
    activities: [
      'Stakeholder workshops',
      'User research & interviews',
      'Competitor analysis',
      'Technical scoping',
      'Architecture planning',
      'Project roadmap',
    ],
    deliverables: ['Project Spec', 'Technical Architecture', 'Roadmap', 'Risk Assessment'],
    quote: '"The most important thing is to not start building before you understand the problem deeply."',
  },
  {
    num: '02',
    title: 'Design',
    icon: '✏️',
    color: '#A78BFA',
    duration: '1–3 weeks',
    desc: 'Our design team translates research into beautiful, functional interfaces. We iterate rapidly with you through wireframes, design systems and high-fidelity prototypes.',
    activities: [
      'Information architecture',
      'Lo-fi wireframes',
      'Design system creation',
      'High-fidelity mockups',
      'Interactive prototype',
      'Accessibility review',
    ],
    deliverables: ['Design System', 'Figma Wireframes', 'Clickable Prototype', 'Component Library'],
    quote: '"Design is not just what it looks like. Design is how it works."',
  },
  {
    num: '03',
    title: 'Build',
    icon: '⚙️',
    color: '#4DD0C4',
    duration: '2–12 weeks',
    desc: 'Engineering begins in 2-week sprints with daily standups and weekly demos. Clean, tested, documented code with CI/CD from day one. No surprises at the finish line.',
    activities: [
      'Agile 2-week sprints',
      'Daily standups',
      'Weekly client demos',
      'Code reviews & QA',
      'Automated testing',
      'CI/CD pipeline',
    ],
    deliverables: ['Working Product', 'Test Suite', 'CI/CD Pipeline', 'API Documentation'],
    quote: '"Move fast without breaking things. Automated tests make that possible."',
  },
  {
    num: '04',
    title: 'Launch',
    icon: '🚀',
    color: '#FFC845',
    duration: '1–2 weeks',
    desc: 'Zero-downtime deployments, performance tuning, monitoring setup and a comprehensive handover. We stay on for 30 days post-launch to ensure everything runs smoothly.',
    activities: [
      'Pre-launch QA & UAT',
      'Performance optimisation',
      'Monitoring setup',
      'Zero-downtime deploy',
      '30-day support window',
      'Knowledge transfer',
    ],
    deliverables: ['Live Product', 'Monitoring Dashboard', 'Runbooks', 'Source Code'],
    quote: '"Launch is not the end — it\'s the beginning of continuous improvement."',
  },
]

export default function ProcessPage() {
  return (
    <div className="relative min-h-screen">

      {/* Hero */}
      <section className="relative z-10 pt-20 pb-16 px-6 text-center">
        <div style={{ position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden' }}>
          <div style={{ position:'absolute',width:600,height:600,top:'-20%',left:'50%',transform:'translateX(-50%)',borderRadius:'50%',background:'radial-gradient(circle,rgba(167,139,250,.25) 0%,transparent 70%)',filter:'blur(60px)' }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ background:'rgba(167,139,250,.1)',border:'1px solid rgba(167,139,250,.25)',color:'#A78BFA' }}>
            How We Work
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.06]" style={{ fontFamily:'var(--font-grotesk)' }}>
            A Process Built for<br />
            <span className="grad">Predictable Success</span>
          </h1>
          <p className="text-[#8892B0] text-xl max-w-2xl mx-auto">
            No black boxes. No surprises. Our proven 4-phase methodology has delivered 50+ successful digital products.
          </p>
        </div>
      </section>

      {/* Process phases */}
      <ProcessClient phases={PHASES} />

      {/* Values */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily:'var(--font-grotesk)' }}>
              Our Working <span className="grad">Principles</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon:'🎯', title:'Outcome Focused', desc:'We measure success by business results, not lines of code shipped.' },
              { icon:'🔁', title:'Iterative Delivery', desc:'Working software every 2 weeks. Feedback loops over big-bang launches.' },
              { icon:'🤝', title:'Radical Transparency', desc:'You always know exactly where your project stands. No hidden issues.' },
            ].map(v=>(
              <div key={v.title} className="rounded-2xl p-7" style={{ background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.08)' }}>
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-lg text-[#F0F4FF] mb-2" style={{ fontFamily:'var(--font-grotesk)' }}>{v.title}</h3>
                <p className="text-[#8892B0] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily:'var(--font-grotesk)' }}>
            Ready to Start Your <span className="grad">Journey?</span>
          </h2>
          <p className="text-[#8892B0] mb-8">Book a free 30-minute discovery call. No commitment required.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base btn-primary">
            Book Discovery Call →
          </Link>
        </div>
      </section>
    </div>
  )
}
