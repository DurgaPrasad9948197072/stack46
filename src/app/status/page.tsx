export default function StatusPage() {
  const SERVICES = [
    { name: 'API Gateway',               latency: '18ms',   status: 'Operational' },
    { name: 'Web Application Platform',  latency: '42ms',   status: 'Operational' },
    { name: 'AI Inference Engine',       latency: '210ms',  status: 'Operational' },
    { name: 'Real-Time Event Bus',       latency: '9ms',    status: 'Operational' },
    { name: 'Route & Search Optimiser',  latency: '380ms',  status: 'Operational' },
    { name: 'Mobile SDK Delivery',       latency: '55ms',   status: 'Operational' },
    { name: 'Webhook Delivery',          latency: '28ms',   status: 'Operational' },
    { name: 'GraphQL API',               latency: '31ms',   status: 'Operational' },
    { name: 'Data Warehouse Export',     latency: '1.2s',   status: 'Operational' },
    { name: 'Authentication (SSO)',      latency: '22ms',   status: 'Operational' },
    { name: 'Billing & Subscriptions',   latency: '88ms',   status: 'Operational' },
    { name: 'Client Portal',             latency: '66ms',   status: 'Operational' },
  ]

  const DCS = [
    { name: 'UK South (London)',       uptime: '100%',   status: 'Online' },
    { name: 'EU West (Ireland)',       uptime: '100%',   status: 'Online' },
    { name: 'AP Southeast (Singapore)',uptime: '99.98%', status: 'Online' },
    { name: 'US East (Virginia)',      uptime: '100%',   status: 'Online' },
  ]

  const INCIDENTS = [
    { date: 'Jun 2, 2026', title: 'Elevated API latency — EU West', status: 'Resolved', detail: 'Duration: 8 min · Cause: Bad deploy · Fix: Rolled back' },
    { date: 'May 14, 2026', title: 'Webhook delivery delays', status: 'Resolved', detail: 'Duration: 22 min · Cause: Queue backlog · Fix: Auto-reprocessed' },
  ]

  const bars = Array.from({ length: 90 }, (_, i) => {
    const isIncident = i === 15 || i === 42
    return isIncident ? '#f97316' : '#22c55e'
  })

  return (
    <div className="relative z-10">
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.02em' }}>System Status</h1>
          <p className="text-[#8892B0]">Real-time operational status of all STACK46 services.</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-28 flex flex-col gap-8">
        {/* Overall */}
        <div className="glass-md rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse-slow" />
            <span className="font-black text-xl text-[#F0F4FF]" style={{ fontFamily: 'var(--font-grotesk)' }}>All Systems Operational</span>
          </div>
          <span className="text-sm text-[#8892B0]">Last checked: just now</span>
        </div>

        {/* 90-day uptime bar */}
        <div className="glass-md rounded-2xl p-7">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-sm text-[#F0F4FF]">90-day uptime</span>
            <span className="text-sm font-bold" style={{ color: '#22c55e' }}>99.97%</span>
          </div>
          <div className="flex gap-0.5">
            {bars.map((color, i) => (
              <div key={i} className="flex-1 h-8 rounded-sm transition-opacity duration-200 hover:opacity-70" style={{ background: color }} />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-[#8892B0]">
            <span>90 days ago</span><span>Today</span>
          </div>
        </div>

        {/* Services table */}
        <div className="glass-md rounded-2xl overflow-hidden">
          <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
            <h2 className="font-bold text-[#F0F4FF]" style={{ fontFamily: 'var(--font-grotesk)' }}>Services</h2>
          </div>
          <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,.05)' }}>
            {SERVICES.map(s => (
              <div key={s.name} className="flex items-center justify-between px-6 py-4">
                <span className="text-sm text-[#F0F4FF]">{s.name}</span>
                <div className="flex items-center gap-6">
                  <span className="text-xs text-[#8892B0] hidden sm:block">{s.latency}</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm text-[#22c55e]">{s.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data centres */}
        <div className="glass-md rounded-2xl overflow-hidden">
          <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
            <h2 className="font-bold text-[#F0F4FF]" style={{ fontFamily: 'var(--font-grotesk)' }}>Data Centres</h2>
          </div>
          <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,.05)' }}>
            {DCS.map(dc => (
              <div key={dc.name} className="flex items-center justify-between px-6 py-4">
                <span className="text-sm text-[#F0F4FF]">{dc.name}</span>
                <div className="flex items-center gap-6">
                  <span className="text-sm font-semibold" style={{ color: '#22c55e' }}>{dc.uptime}</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm text-[#22c55e]">{dc.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incidents */}
        <div className="glass-md rounded-2xl overflow-hidden">
          <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
            <h2 className="font-bold text-[#F0F4FF]" style={{ fontFamily: 'var(--font-grotesk)' }}>Incident History</h2>
          </div>
          {INCIDENTS.map(inc => (
            <div key={inc.date} className="px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,.05)' }}>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <span className="text-sm font-semibold text-[#F0F4FF]">{inc.title}</span>
                  <p className="text-xs text-[#8892B0] mt-1">{inc.detail}</p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-xs text-[#8892B0]">{inc.date}</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(34,197,94,.15)', color: '#22c55e' }}>{inc.status}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="px-6 py-4 text-sm text-[#8892B0] text-center">No other incidents in the past 90 days.</div>
        </div>
      </div>
    </div>
  )
}
