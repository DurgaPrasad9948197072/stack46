import type { Metadata } from 'next'
import Link from 'next/link'
import AboutClient from '@/components/AboutClient'
import AnimCard from '@/components/ui/AnimCard'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about STACK46 — our story, team, values and mission to build exceptional digital products.',
}

const TEAM = [
  { name:'Alex Thornton', role:'CEO & Co-founder', initials:'AT', color:'#2AACE2',  bg:'linear-gradient(135deg,#1E2A78,#2AACE2)', desc:'10+ years in product & engineering. Previously at Google & Monzo.' },
  { name:'Priya Sharma',  role:'CTO & Co-founder', initials:'PS', color:'#4DD0C4',  bg:'linear-gradient(135deg,#00B8D9,#4DD0C4)', desc:'Full-stack architect. Scaled systems to 10M+ users at startups.' },
  { name:'James O\'Brien',role:'Head of Design',   initials:'JO', color:'#A78BFA',  bg:'linear-gradient(135deg,#7C3AED,#A78BFA)', desc:'Ex-Figma designer. Obsessed with pixel-perfect, accessible UIs.' },
  { name:'Nadia Koval',   role:'Lead Engineer',    initials:'NK', color:'#FFC845',  bg:'linear-gradient(135deg,#F97316,#FFC845)', desc:'React & Node.js specialist. OSS contributor with 2K+ GitHub stars.' },
]

const VALUES = [
  { icon:'🧠', title:'Technical Excellence', desc:'We hire the best engineers and invest in continuous learning. No shortcuts on code quality.' },
  { icon:'🤝', title:'Partnership Mindset',  desc:'We treat every client project as if it were our own product.' },
  { icon:'🚀', title:'Bias for Action',      desc:'We ship fast, learn from real users, and iterate. Done beats perfect.' },
  { icon:'🔍', title:'Radical Honesty',      desc:'We tell you what you need to hear, not what you want to hear.' },
  { icon:'♿', title:'Inclusive by Default', desc:'Accessibility and diversity are not afterthoughts — they\'re baked in from day one.' },
  { icon:'🌱', title:'Sustainable Growth',   desc:'We build for the long term. Sustainable tech, sustainable team, sustainable business.' },
]

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">

      {/* Hero */}
      <section className="relative z-10 pt-20 pb-16 px-6">
        <div style={{ position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden' }}>
          <div style={{ position:'absolute',width:700,height:700,top:'-15%',left:'-5%',borderRadius:'50%',background:'radial-gradient(circle,rgba(30,42,120,.35) 0%,transparent 70%)',filter:'blur(60px)' }} />
          <div style={{ position:'absolute',width:500,height:500,top:'10%',right:'-8%',borderRadius:'50%',background:'radial-gradient(circle,rgba(42,172,226,.2) 0%,transparent 70%)',filter:'blur(50px)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ background:'rgba(255,200,69,.1)',border:'1px solid rgba(255,200,69,.25)',color:'#FFC845' }}>
              About Us
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-[1.06]" style={{ fontFamily:'var(--font-grotesk)' }}>
              Built by Engineers,<br />
              <span className="grad">Driven by Impact</span>
            </h1>
            <p className="text-[#8892B0] text-lg leading-relaxed mb-6">
              STACK46 was founded in London in 2020 by Alex and Priya, two engineers who wanted to build a different kind of agency — one that genuinely cares about product outcomes, not just deliverables.
            </p>
            <p className="text-[#8892B0] text-lg leading-relaxed mb-8">
              Today we&apos;re a team of 12 specialists — engineers, designers, and product thinkers — working with startups and scale-ups across the UK, EU, and US to build digital products that matter.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="px-7 py-3.5 rounded-xl text-sm btn-primary">Work With Us →</Link>
              <Link href="/work"    className="px-7 py-3.5 rounded-xl text-sm btn-ghost">See Our Work</Link>
            </div>
          </div>

          {/* Right: spinning logo */}
          <AboutClient />
        </div>
      </section>

      {/* Values */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5" style={{ background:'rgba(42,172,226,.1)',border:'1px solid rgba(42,172,226,.25)',color:'#2AACE2' }}>
              What Drives Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily:'var(--font-grotesk)' }}>
              Our <span className="grad">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <AnimCard key={v.title} delay={i * 0.1} accentColor="#2AACE2" style={{ background:'rgba(255,255,255,.03)' }}>
                <div className="p-7">
                  <div className="text-3xl mb-4">{v.icon}</div>
                  <h3 className="font-bold text-lg text-[#F0F4FF] mb-2" style={{ fontFamily:'var(--font-grotesk)' }}>{v.title}</h3>
                  <p className="text-[#8892B0] text-sm leading-relaxed">{v.desc}</p>
                </div>
              </AnimCard>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5" style={{ background:'rgba(77,208,196,.1)',border:'1px solid rgba(77,208,196,.25)',color:'#4DD0C4' }}>
              The Team
            </span>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily:'var(--font-grotesk)' }}>
              Meet the <span className="grad">Builders</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((m, i) => (
              <AnimCard key={m.name} delay={i * 0.12} accentColor={m.color} className="group" style={{ background:'rgba(255,255,255,.03)' }}>
                {/* Avatar */}
                <div className="h-36 relative overflow-hidden" style={{ background: m.bg }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-black text-white/30 select-none" style={{ fontFamily:'var(--font-grotesk)' }}>{m.initials}</span>
                  </div>
                  <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse at 30% 30%,rgba(255,255,255,.12) 0%,transparent 60%)' }} />
                </div>
                <div className="p-5">
                  <div className="text-xs font-medium mb-1" style={{ color: m.color }}>{m.role}</div>
                  <h3 className="font-bold text-[#F0F4FF] mb-2" style={{ fontFamily:'var(--font-grotesk)' }}>{m.name}</h3>
                  <p className="text-[#8892B0] text-xs leading-relaxed">{m.desc}</p>
                </div>
              </AnimCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily:'var(--font-grotesk)' }}>
            Want to Join the <span className="grad">Team?</span>
          </h2>
          <p className="text-[#8892B0] mb-8">We&apos;re always looking for brilliant engineers and designers. Check out our open roles.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 rounded-xl text-base btn-primary">View Open Roles →</Link>
            <Link href="/contact" className="px-8 py-4 rounded-xl text-base btn-ghost">Partner With Us</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
