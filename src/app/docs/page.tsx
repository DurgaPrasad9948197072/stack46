'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, ChevronRight, ChevronDown, CheckCircle2, BookOpen } from 'lucide-react'

const SIDEBAR = [
  {
    section: 'Getting Started',
    items: ['Quick Start Guide', 'Installation', 'Authentication', 'First API Call'],
  },
  {
    section: 'Core Concepts',
    items: ['Architecture Overview', 'Data Models', 'Events & Webhooks', 'Rate Limiting'],
  },
  {
    section: 'API Reference',
    items: ['Projects API', 'Users API', 'Billing API', 'Analytics API'],
  },
  {
    section: 'SDKs',
    items: ['JavaScript / TypeScript', 'Python', 'Go', 'React Native'],
  },
  {
    section: 'Integrations',
    items: ['AWS Lambda', 'Slack Notifications', 'Stripe Billing', 'Salesforce CRM'],
  },
  {
    section: 'Security & Compliance',
    items: ['SOC 2 Type II', 'GDPR Guide', 'SSO / SAML Setup', 'Audit Logs'],
  },
]

const CODE_SNIPPET = `const response = await fetch('https://api.stack46.co.uk/v1/projects', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
});

const { projects, meta } = await response.json();
console.log(\`\${meta.total} projects found\`);`

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('Getting Started')
  const [activeItem, setActiveItem] = useState('Quick Start Guide')
  const [query, setQuery] = useState('')
  const [expandedSection, setExpandedSection] = useState('Getting Started')

  const isQuickStart = activeSection === 'Getting Started' && activeItem === 'Quick Start Guide'

  return (
    <div className="relative z-10 min-h-screen">
      {/* Hero */}
      <section className="py-16 px-6 text-center" style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ background: 'rgba(42,172,226,.1)', border: '1px solid rgba(42,172,226,.25)', color: '#2AACE2' }}>Developer Hub</span>
          <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.02em' }}>
            STACK46 Documentation
          </h1>
          <p className="text-[#8892B0] text-lg mb-8">Everything you need to integrate, build and ship with STACK46.</p>
          <div className="relative max-w-xl mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8892B0]" />
            <input
              type="text"
              placeholder="Search documentation…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-3.5 rounded-xl text-sm outline-none"
              style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', color: '#F0F4FF' }}
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 flex flex-col gap-1">
              {SIDEBAR.map(s => (
                <div key={s.section}>
                  <button
                    onClick={() => { setExpandedSection(expandedSection === s.section ? '' : s.section); setActiveSection(s.section) }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200"
                    style={{ color: activeSection === s.section ? '#2AACE2' : '#8892B0', background: activeSection === s.section ? 'rgba(42,172,226,.08)' : 'transparent' }}>
                    {s.section}
                    {expandedSection === s.section ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>
                  {expandedSection === s.section && (
                    <div className="ml-3 flex flex-col gap-0.5 mt-1 mb-2">
                      {s.items.map(item => (
                        <button key={item} onClick={() => { setActiveItem(item); setActiveSection(s.section) }}
                          className="px-3 py-2 rounded-lg text-xs text-left cursor-pointer transition-all duration-200"
                          style={{ color: activeItem === item && activeSection === s.section ? '#F0F4FF' : '#8892B0', background: activeItem === item && activeSection === s.section ? 'rgba(42,172,226,.15)' : 'transparent' }}>
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-[#8892B0] mb-8">
              <span>Docs</span>
              <ChevronRight size={12} />
              <span style={{ color: '#2AACE2' }}>{activeSection}</span>
              <ChevronRight size={12} />
              <span style={{ color: '#F0F4FF' }}>{activeItem}</span>
            </div>

            {isQuickStart ? (
              <div>
                <h1 className="text-3xl font-black mb-3" style={{ fontFamily: 'var(--font-grotesk)' }}>Quick Start Guide</h1>
                <p className="text-[#8892B0] mb-10 text-lg">Get up and running with STACK46 in under 12 minutes.</p>

                {/* Steps */}
                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {[
                    { n: '1', t: 'Connect your account', d: 'Sign up for STACK46 and generate your first API key from the dashboard.' },
                    { n: '2', t: 'Add your project', d: 'Create a project workspace and configure your environment variables.' },
                    { n: '3', t: 'Install the SDK', d: 'Run npm install @stack46/sdk — TypeScript definitions included.' },
                    { n: '4', t: 'Set up alerts', d: 'Configure Slack or email webhooks to receive real-time notifications.' },
                  ].map(step => (
                    <div key={step.n} className="glass-md rounded-2xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                          style={{ background: 'rgba(42,172,226,.2)', color: '#2AACE2', fontFamily: 'var(--font-grotesk)' }}>{step.n}</div>
                        <h3 className="font-bold text-sm text-[#F0F4FF]">{step.t}</h3>
                      </div>
                      <p className="text-xs text-[#8892B0] leading-relaxed">{step.d}</p>
                    </div>
                  ))}
                </div>

                {/* Prerequisites */}
                <div className="glass-md rounded-2xl p-6 mb-8">
                  <h3 className="font-bold text-[#F0F4FF] mb-4" style={{ fontFamily: 'var(--font-grotesk)' }}>Prerequisites</h3>
                  <ul className="flex flex-col gap-2.5">
                    {['Node.js 18+ or Python 3.10+', 'A STACK46 account (free tier available)', 'Git for version control', 'Basic familiarity with REST APIs'].map(p => (
                      <li key={p} className="flex items-center gap-2.5 text-sm text-[#8892B0]">
                        <CheckCircle2 size={14} style={{ color: '#22c55e', flexShrink: 0 }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code snippet */}
                <div className="mb-8">
                  <h3 className="font-bold text-[#F0F4FF] mb-3" style={{ fontFamily: 'var(--font-grotesk)' }}>Your first API call</h3>
                  <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(5,8,20,.95)', border: '1px solid rgba(255,255,255,.08)' }}>
                    <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                      {['#ef4444', '#FFC845', '#22c55e'].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
                      <span className="ml-2 text-xs text-[#8892B0] font-mono">fetch-projects.ts</span>
                    </div>
                    <pre className="p-6 text-sm overflow-x-auto font-mono" style={{ color: '#4DD0C4', lineHeight: 1.8 }}>
                      <code>{CODE_SNIPPET}</code>
                    </pre>
                  </div>
                </div>

                {/* TIP */}
                <div className="rounded-2xl p-5" style={{ borderLeft: '3px solid #06b6d4', background: 'rgba(6,182,212,.07)' }}>
                  <p className="text-sm font-semibold text-[#06b6d4] mb-1">TIP</p>
                  <p className="text-sm text-[#8892B0]">Store your API key in an environment variable (STACK46_API_KEY) and never commit it to source control. Use .env.local for Next.js projects.</p>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-black mb-3" style={{ fontFamily: 'var(--font-grotesk)' }}>{activeItem}</h1>
                <p className="text-[#8892B0] mb-10 text-lg">{activeSection} — {activeItem}</p>
                <div className="glass-md rounded-2xl p-8 text-center">
                  <BookOpen size={40} className="mx-auto mb-4 text-[#8892B0]" />
                  <p className="text-[#8892B0] mb-6">This section is being expanded. Our full documentation is available to all STACK46 clients.</p>
                  <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-[1.02]"
                    style={{ background: 'linear-gradient(135deg,#1E2A78,#2AACE2)', color: '#fff' }}>
                    Talk to Support
                  </Link>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Mobile: section grid */}
        <div className="lg:hidden mt-12 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <h3 className="font-bold text-sm text-[#F0F4FF] mb-4">Browse Documentation</h3>
          <div className="grid grid-cols-2 gap-3">
            {SIDEBAR.map(s => (
              <button key={s.section} onClick={() => { setActiveSection(s.section); setActiveItem(s.items[0]); setExpandedSection(s.section) }}
                className="glass rounded-xl p-4 text-left text-sm font-medium text-[#8892B0] cursor-pointer hover:text-[#F0F4FF] transition-colors duration-200">
                {s.section}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
