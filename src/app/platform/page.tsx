'use client'
import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'
import AnimatedText from '@/components/ui/AnimatedText'
import { Zap, Brain, LayoutDashboard, Globe, ShieldCheck, Database, CheckCircle2 } from 'lucide-react'

const CAPABILITIES = [
  { icon: Zap, title: 'Real-Time Delivery Engine', desc: 'WebSocket infrastructure processing 2M+ events per second with sub-10ms latency. Built on Kafka and Redis.', accent: '#06b6d4', reveal: 'reveal-left d1' },
  { icon: Brain, title: 'AI Inference Layer', desc: 'Production-grade ML pipelines trained on 500M+ data points. 94% prediction accuracy across use cases.', accent: '#FFC845', reveal: 'reveal-top d2' },
  { icon: LayoutDashboard, title: 'Modular Dashboard Builder', desc: 'Drag-and-drop analytics dashboards. Light and dark mode. 40+ widget types with live data connections.', accent: '#a855f7', reveal: 'reveal-right d3' },
  { icon: Globe, title: 'API Gateway', desc: 'REST and GraphQL, rate limiting, caching, auth middleware. 99.99% SLA across all endpoints.', accent: '#06b6d4', reveal: 'reveal-bottom d1' },
  { icon: ShieldCheck, title: 'Zero-Trust Security', desc: 'SOC 2 Type II certified. SAML 2.0, OIDC, MFA enforced. Least-privilege by default at every layer.', accent: '#22c55e', reveal: 'reveal-scale d2' },
  { icon: Database, title: 'Data Warehouse Layer', desc: '7-year retention, BigQuery-compatible exports, real-time CDC pipelines. Query petabytes in seconds.', accent: '#FFC845', reveal: 'reveal-right d3' },
]

const INTEGRATIONS = [
  { name: 'AWS',        abbr: 'AWS', color: '#FF9900' },
  { name: 'GCP',        abbr: 'GCP', color: '#4285F4' },
  { name: 'Azure',      abbr: 'AZ',  color: '#0078D4' },
  { name: 'Stripe',     abbr: 'STR', color: '#635BFF' },
  { name: 'Salesforce', abbr: 'SF',  color: '#00A1E0' },
  { name: 'Slack',      abbr: 'SLK', color: '#4A154B' },
  { name: 'GitHub',     abbr: 'GH',  color: '#F0F4FF' },
  { name: 'Jira',       abbr: 'JRA', color: '#0052CC' },
]

export default function PlatformPage() {
  useReveal()

  return (
    <div className="relative z-10 overflow-x-hidden">
      {/* Hero */}
      <section className="py-28 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
            style={{ background: 'rgba(42,172,226,.1)', border: '1px solid rgba(42,172,226,.25)', color: '#2AACE2' }}>Our Platform</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.06]" style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.02em' }}>
            <span className="block"><AnimatedText segments={[{ text: 'Built for enterprise scale.' }]} /></span>
            <span className="block"><AnimatedText delay={0.28} segments={[{ text: 'Designed for developers.', className: 'grad-anim' }]} /></span>
          </h1>
          <p className="text-[#8892B0] text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            A battle-tested platform foundation underneath every product we build — real-time, AI-ready and secure by default.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition-all hover:scale-[1.03]"
              style={{ background: 'linear-gradient(135deg,#1E2A78,#2AACE2)', color: '#fff', boxShadow: '0 0 32px rgba(42,172,226,.3)' }}>
              Start Your Project
            </Link>
            <Link href="/docs" className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold glass" style={{ color: '#F0F4FF' }}>
              Read the Docs
            </Link>
          </div>
        </div>
      </section>

      {/* Architecture pipeline */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-md rounded-3xl p-8 md:p-12">
            <p className="text-center text-xs font-bold tracking-widest uppercase text-[#8892B0] mb-10">Platform Architecture</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { label: 'Client & Devices', sub: 'Web · iOS · Android · IoT', icon: '📱' },
                { label: 'API Layer', sub: 'REST · GraphQL · gRPC', icon: '⚙️' },
                { label: 'STACK46 Platform', sub: 'Real-time · AI · Security', icon: '🧠' },
                { label: 'Your Dashboard', sub: 'Analytics · Alerts · Exports', icon: '📊' },
              ].map((step, i) => (
                <div key={step.label} className="relative">
                  <div className="glass rounded-2xl p-5 text-center reveal-top" style={{ transitionDelay: `${i * 0.1}s` }}>
                    <div className="text-2xl mb-3">{step.icon}</div>
                    <div className="font-bold text-sm text-[#F0F4FF] mb-1" style={{ fontFamily: 'var(--font-grotesk)' }}>{step.label}</div>
                    <div className="text-xs text-[#8892B0]">{step.sub}</div>
                  </div>
                  {i < 3 && <div className="hidden md:block absolute top-1/2 -right-2 w-4 text-[#8892B0] text-lg font-bold" style={{ transform: 'translateY(-50%)' }}>→</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capability cards */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12" style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.02em' }}>
            Platform capabilities
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPABILITIES.map(c => (
              <div key={c.title} className={`glass-md rounded-2xl p-6 card-hover border border-transparent ${c.reveal}`}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${c.accent}20`, border: `1px solid ${c.accent}35` }}>
                  <c.icon size={20} style={{ color: c.accent }} />
                </div>
                <h3 className="font-bold text-[#F0F4FF] mb-2" style={{ fontFamily: 'var(--font-grotesk)' }}>{c.title}</h3>
                <p className="text-[#8892B0] text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-10" style={{ fontFamily: 'var(--font-grotesk)' }}>Works with your stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {INTEGRATIONS.map((intg, i) => (
              <div key={intg.name} className={`glass-md rounded-2xl p-5 text-center card-hover border border-transparent reveal-scale d${(i % 4) + 1}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-sm font-black"
                  style={{ background: `${intg.color}18`, border: `1px solid ${intg.color}35`, color: intg.color, fontFamily: 'var(--font-grotesk)' }}>
                  {intg.abbr}
                </div>
                <div className="font-semibold text-sm text-[#F0F4FF]">{intg.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ fontFamily: 'var(--font-grotesk)' }}>See it in action</h2>
          <p className="text-[#8892B0] mb-8">Book a 30-minute live demo with a senior engineer from STACK46.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all hover:scale-[1.03]"
            style={{ background: 'linear-gradient(135deg,#1E2A78,#2AACE2)', color: '#fff', boxShadow: '0 0 32px rgba(42,172,226,.3)' }}>
            Book Live Demo
          </Link>
        </div>
      </section>
    </div>
  )
}
