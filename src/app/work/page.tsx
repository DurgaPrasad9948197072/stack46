import type { Metadata } from 'next'
import Link from 'next/link'
import WorkClient from '@/components/work/WorkClient'

export const metadata: Metadata = {
  title: 'Our Work',
  description: 'Explore case studies and projects delivered by STACK46 — FinTech, SaaS, HealthTech and more.',
}

const PROJECTS = [
  {
    id: 'flowx',
    name: 'FlowX Trading',
    cat: 'FinTech',
    tag: 'Web App',
    year: '2024',
    gradient: 'linear-gradient(135deg,#1E2A78 0%,#2AACE2 100%)',
    color: '#2AACE2',
    desc: 'Algorithmic trading platform with real-time WebSocket data, portfolio management, AI market signals and risk dashboards.',
    problem: 'Traders were losing edge using slow legacy systems that couldn\'t process real-time signals fast enough.',
    solution: 'Built a Next.js + FastAPI platform with WebSocket streaming, Redis pub/sub and a custom charting engine using D3.js and Three.js for 3D visualisation.',
    results: ['68% faster order execution', '3x user retention increase', '$2.4M raised post-launch'],
    stack: ['Next.js','FastAPI','Redis','PostgreSQL','D3.js','Three.js','AWS'],
    featured: true,
  },
  {
    id: 'nexusai',
    name: 'NexusAI Workspace',
    cat: 'SaaS',
    tag: 'AI Platform',
    year: '2024',
    gradient: 'linear-gradient(135deg,#00B8D9 0%,#4DD0C4 100%)',
    color: '#4DD0C4',
    desc: 'Collaborative AI workspace for enterprise teams — LLM-powered doc analysis, semantic search, auto-summarisation and workflow automation.',
    problem: 'Knowledge workers were spending 30% of their time finding information across disconnected tools.',
    solution: 'Designed a multi-model AI hub with RAG pipeline (pgvector), real-time collaboration (Yjs), and a visual workflow builder.',
    results: ['40% productivity gain reported', '500+ enterprise users in 3 months', 'Series A funding secured'],
    stack: ['Next.js','Node.js','OpenAI API','pgvector','Yjs','Vercel','Stripe'],
    featured: true,
  },
  {
    id: 'quara',
    name: 'Quara Health',
    cat: 'HealthTech',
    tag: 'Mobile App',
    year: '2023',
    gradient: 'linear-gradient(135deg,#FFC845 0%,#FF8A50 100%)',
    color: '#FFC845',
    desc: 'NHS-compliant digital health platform with telemedicine, patient management, predictive diagnostics and secure data handling.',
    problem: 'NHS clinics needed a GDPR and IG Toolkit-compliant digital front door that integrated with NHS Spine.',
    solution: 'Built a React Native app with end-to-end encryption, NHS Login SSO, HL7 FHIR APIs and a predictive triage ML model.',
    results: ['12,000+ patients onboarded', 'CQC-ready compliance framework', 'Featured in NHS Digital showcase'],
    stack: ['React Native','Node.js','PostgreSQL','Python ML','AWS HealthLake','NHS APIs'],
    featured: true,
  },
  {
    id: 'vorton',
    name: 'Vorton Commerce',
    cat: 'E-Commerce',
    tag: 'Web Platform',
    year: '2023',
    gradient: 'linear-gradient(135deg,#A78BFA 0%,#7C3AED 100%)',
    color: '#A78BFA',
    desc: 'Headless e-commerce platform with AI-powered personalisation, 3D product previews using Three.js, and real-time inventory sync.',
    problem: 'Existing Shopify store was hitting performance ceilings with 200ms+ TTFBs and no 3D product capability.',
    solution: 'Rebuilt as a headless Next.js storefront with Medusa.js backend, Three.js model viewer and Algolia search.',
    results: ['2.1s → 0.4s TTF improvement', '35% conversion rate lift', '3D views increased AOV by 28%'],
    stack: ['Next.js','Medusa.js','Three.js','Algolia','Stripe','Vercel'],
    featured: false,
  },
  {
    id: 'pulsedata',
    name: 'PulseData Analytics',
    cat: 'Analytics',
    tag: 'Dashboard',
    year: '2023',
    gradient: 'linear-gradient(135deg,#FB923C 0%,#F97316 100%)',
    color: '#FB923C',
    desc: 'Real-time analytics dashboard for marketing teams with custom chart engine, automated reporting and Slack/email alerts.',
    problem: 'Marketing data was siloed across 12 tools with no single source of truth for campaign performance.',
    solution: 'Built a unified data warehouse (BigQuery) with a custom viz layer using D3 + Three.js, automated insights via GPT-4.',
    results: ['12 tools consolidated into one','50% reduction in reporting time','Used by 200+ marketing teams'],
    stack: ['Next.js','BigQuery','D3.js','Three.js','OpenAI','GCP','Pub/Sub'],
    featured: false,
  },
  {
    id: 'elevatehq',
    name: 'ElevateHQ',
    cat: 'HRTech',
    tag: 'SaaS Platform',
    year: '2022',
    gradient: 'linear-gradient(135deg,#34D399 0%,#10B981 100%)',
    color: '#34D399',
    desc: 'Performance management SaaS with OKR tracking, 360-degree feedback, compensation planning and HR analytics.',
    problem: 'HR teams were running performance reviews on spreadsheets with no visibility into team health or goal alignment.',
    solution: 'Designed a full-stack SaaS platform with real-time OKR trees, AI-generated review summaries and automated comp modelling.',
    results: ['Used by 80+ companies', '15,000+ employees managed', '4.8/5 rating on G2'],
    stack: ['Next.js','Node.js','PostgreSQL','Redis','OpenAI','AWS','Stripe'],
    featured: false,
  },
]

export default function WorkPage() {
  return (
    <div className="relative min-h-screen">

      {/* Hero */}
      <section className="relative z-10 pt-20 pb-16 px-6 text-center">
        <div style={{ position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden' }}>
          <div style={{ position:'absolute',width:600,height:600,top:'-20%',left:'50%',transform:'translateX(-50%)',borderRadius:'50%',background:'radial-gradient(circle,rgba(77,208,196,.3) 0%,transparent 70%)',filter:'blur(60px)' }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ background:'rgba(77,208,196,.1)',border:'1px solid rgba(77,208,196,.25)',color:'#4DD0C4' }}>
            Our Work
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.06]" style={{ fontFamily:'var(--font-grotesk)' }}>
            Products We&apos;re<br />
            <span className="grad">Proud to Have Built</span>
          </h1>
          <p className="text-[#8892B0] text-xl max-w-2xl mx-auto">
            From FinTech platforms to AI workspaces — here&apos;s a selection of the work we&apos;ve shipped for ambitious clients.
          </p>
        </div>
      </section>

      {/* Projects */}
      <WorkClient projects={PROJECTS} />

      {/* CTA */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily:'var(--font-grotesk)' }}>
            Your Project Could Be <span className="grad">Next</span>
          </h2>
          <p className="text-[#8892B0] mb-8">Let&apos;s build something remarkable together.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base btn-primary">
            Start Your Project →
          </Link>
        </div>
      </section>
    </div>
  )
}
