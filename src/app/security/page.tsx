'use client'
import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'
import { ShieldCheck, Lock, Server, Eye, Code2, AlertTriangle, CheckCircle2 } from 'lucide-react'

const CERTS = [
  { badge: 'SOC 2', sub: 'Type II', desc: 'Annual audit of security, availability, processing integrity, confidentiality and privacy controls.', color: '#22c55e' },
  { badge: 'ISO', sub: '27001', desc: 'International standard for information security management systems. Certified since 2023.', color: '#06b6d4' },
  { badge: 'UK GDPR', sub: '& EU GDPR', desc: 'Full compliance with UK and EU data protection regulations. ICO registered.', color: '#2AACE2' },
  { badge: 'CCPA', sub: 'California', desc: 'Compliant with California Consumer Privacy Act for all US-based clients.', color: '#f97316' },
  { badge: 'PCI DSS', sub: 'Level 1', desc: 'Highest level of PCI compliance for clients processing card payments through our platform.', color: '#a855f7' },
  { badge: 'HIPAA', sub: 'Ready', desc: 'Architecture and processes designed to support HIPAA-compliant healthcare applications.', color: '#ef4444' },
]

const PRACTICES = [
  {
    icon: Lock, title: 'Encryption', color: '#06b6d4',
    items: ['AES-256 encryption at rest', 'TLS 1.3 for all data in transit', 'HSM-backed key management', 'Zero-knowledge secrets handling'],
  },
  {
    icon: ShieldCheck, title: 'Access Control', color: '#a855f7',
    items: ['Role-based access control (RBAC)', 'SAML 2.0 / OIDC / SSO', 'MFA enforced for all staff', 'Least-privilege by default'],
  },
  {
    icon: Server, title: 'Infrastructure', color: '#2AACE2',
    items: ['AWS multi-region (EU & UK)', 'VPC isolation per client', 'WAF + DDoS protection', 'Immutable infrastructure'],
  },
  {
    icon: Eye, title: 'Monitoring', color: '#22c55e',
    items: ['24/7 security operations centre', 'ML-powered anomaly detection', '2-year audit log retention', 'Real-time threat intelligence'],
  },
  {
    icon: Code2, title: 'Secure Development', color: '#f97316',
    items: ['OWASP Top 10 training', 'Mandatory code review', 'Quarterly pen testing', 'Dependency vulnerability scanning'],
  },
  {
    icon: AlertTriangle, title: 'Incident Response', color: '#ef4444',
    items: ['72-hour GDPR breach notification', 'Sub-1 hour P0 response SLA', 'Dedicated IR playbooks', 'Post-incident review & reporting'],
  },
]

export default function SecurityPage() {
  useReveal()
  return (
    <div className="relative z-10 overflow-x-hidden">
      {/* Hero */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.25)', color: '#22c55e' }}>Security</span>
          <h1 className="text-4xl md:text-5xl font-black mb-5 leading-[1.06]" style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.02em' }}>
            <span style={{ background: 'linear-gradient(135deg,#22c55e,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Security is not a feature
            </span><br />
            — it is a foundation.
          </h1>
          <p className="text-[#8892B0] text-lg">Every system we build and every process we run is designed with security as the primary constraint, not an afterthought.</p>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-black text-center mb-10" style={{ fontFamily: 'var(--font-grotesk)' }}>Certifications &amp; Compliance</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERTS.map((c, i) => (
              <div key={c.badge} className={`glass-md rounded-2xl p-6 card-hover border border-transparent reveal-scale d${(i % 3) + 1}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center"
                    style={{ background: `${c.color}15`, border: `1px solid ${c.color}35` }}>
                    <span className="text-xs font-black" style={{ color: c.color, fontFamily: 'var(--font-grotesk)', lineHeight: 1 }}>{c.badge}</span>
                    <span className="text-[10px]" style={{ color: c.color }}>{c.sub}</span>
                  </div>
                  <p className="text-sm text-[#8892B0] leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-black text-center mb-10" style={{ fontFamily: 'var(--font-grotesk)' }}>Security Practices</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRACTICES.map((p, i) => (
              <div key={p.title} className={`glass-md rounded-2xl p-6 card-hover border border-transparent reveal-bottom d${(i % 3) + 1}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${p.color}20`, border: `1px solid ${p.color}35` }}>
                    <p.icon size={18} style={{ color: p.color }} />
                  </div>
                  <h3 className="font-bold text-[#F0F4FF]" style={{ fontFamily: 'var(--font-grotesk)', color: p.color }}>{p.title}</h3>
                </div>
                <ul className="flex flex-col gap-2">
                  {p.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#8892B0]">
                      <CheckCircle2 size={13} style={{ color: p.color, flexShrink: 0 }} />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsible Disclosure */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto glass-md rounded-3xl p-10">
          <AlertTriangle size={32} style={{ color: '#FFC845' }} className="mx-auto mb-4" />
          <h2 className="text-2xl font-black text-[#F0F4FF] mb-3" style={{ fontFamily: 'var(--font-grotesk)' }}>Responsible Disclosure</h2>
          <p className="text-[#8892B0] mb-6 text-sm">Found a vulnerability? We operate a responsible disclosure programme and commit to responding within 24 hours.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition-all hover:scale-[1.03]"
            style={{ background: 'linear-gradient(135deg,#1E2A78,#2AACE2)', color: '#fff' }}>
            Report a Vulnerability
          </Link>
        </div>
      </section>
    </div>
  )
}
