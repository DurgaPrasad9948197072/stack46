import type { Metadata } from 'next'
import Link from 'next/link'
import ServicesClient from '@/components/services/ServicesClient'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Full-spectrum digital services — web development, mobile apps, AI/ML, cloud infrastructure, UI/UX design and SaaS development.',
}

const SERVICES = [
  {
    id: 'web',
    icon: '🌐',
    title: 'Web Development',
    color: '#2AACE2',
    headline: 'Next-gen web apps that scale',
    desc: 'We build blazing-fast, SEO-optimised web applications using Next.js, React, TypeScript and modern headless architecture. From simple marketing sites to complex enterprise portals with millions of users.',
    features: [
      'Next.js 15 App Router with RSC',
      'TypeScript-first codebase',
      'Edge-deployed with CDN',
      'Core Web Vitals optimised',
      'Accessibility (WCAG 2.1 AA)',
      'CMS integrations (Contentful, Sanity)',
    ],
    deliverables: ['Web Application','API Development','CMS Integration','Performance Audit'],
    timeline: '4–12 weeks',
  },
  {
    id: 'mobile',
    icon: '📱',
    title: 'Mobile Apps',
    color: '#4DD0C4',
    headline: 'Native quality on every device',
    desc: 'Cross-platform apps that feel native on both iOS and Android — built with React Native and Flutter. We handle design, development, App Store submissions and ongoing maintenance.',
    features: [
      'React Native & Flutter',
      'iOS & Android simultaneously',
      'Offline-first architecture',
      'Push notifications & deep links',
      'App Store / Play Store submission',
      'OTA updates with Expo',
    ],
    deliverables: ['iOS App','Android App','Backend API','App Store Launch'],
    timeline: '6–16 weeks',
  },
  {
    id: 'ai',
    icon: '🤖',
    title: 'AI / ML Solutions',
    color: '#FFC845',
    headline: 'Intelligent products that learn',
    desc: 'From LLM-powered features to custom machine learning models — we integrate AI natively into your product. Whether it\'s document analysis, image recognition or predictive analytics, we\'ve done it.',
    features: [
      'OpenAI, Anthropic, Gemini APIs',
      'Fine-tuned custom models',
      'RAG pipelines & vector DBs',
      'Computer vision systems',
      'Predictive analytics',
      'AI-powered search',
    ],
    deliverables: ['AI Feature Integration','ML Model','Data Pipeline','API Endpoints'],
    timeline: '4–10 weeks',
  },
  {
    id: 'cloud',
    icon: '☁️',
    title: 'Cloud & DevOps',
    color: '#00B8D9',
    headline: 'Infrastructure that never sleeps',
    desc: 'Scalable, secure cloud architectures on AWS and GCP. We set up CI/CD pipelines, container orchestration, monitoring and auto-scaling so your team can ship fast with confidence.',
    features: [
      'AWS & GCP architecture',
      'Kubernetes & Docker',
      'Terraform / IaC',
      'GitHub Actions CI/CD',
      'Datadog / Grafana monitoring',
      'Zero-downtime deployments',
    ],
    deliverables: ['Cloud Architecture','CI/CD Pipeline','Monitoring Setup','Security Audit'],
    timeline: '2–8 weeks',
  },
  {
    id: 'design',
    icon: '🎨',
    title: 'UI/UX Design',
    color: '#A78BFA',
    headline: 'Design that drives conversion',
    desc: 'Human-centred design that combines beauty with function. We conduct user research, build wireframes, create interactive prototypes and deliver pixel-perfect Figma files ready for development.',
    features: [
      'User research & personas',
      'Information architecture',
      'High-fidelity wireframes',
      'Interactive prototypes',
      'Design system creation',
      'Figma dev handoff',
    ],
    deliverables: ['Design System','Wireframes','Prototype','Figma Files'],
    timeline: '2–6 weeks',
  },
  {
    id: 'saas',
    icon: '🚀',
    title: 'SaaS Development',
    color: '#FB923C',
    headline: 'From zero to recurring revenue',
    desc: 'End-to-end SaaS product development — from MVP validation to production-scale platforms. We handle everything: authentication, billing, multi-tenancy, analytics and team management.',
    features: [
      'Multi-tenant architecture',
      'Stripe billing & subscriptions',
      'Auth (Clerk, Auth.js, Supabase)',
      'Admin dashboard & analytics',
      'Webhook & API infrastructure',
      'GDPR / SOC2 considerations',
    ],
    deliverables: ['Full SaaS Platform','Billing System','Admin Panel','Documentation'],
    timeline: '8–20 weeks',
  },
]

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen">

      {/* Hero */}
      <section className="relative z-10 pt-20 pb-16 px-6 text-center overflow-hidden">
        <div style={{ position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden' }}>
          <div style={{ position:'absolute',width:600,height:600,top:'-20%',left:'50%',transform:'translateX(-50%)',borderRadius:'50%',background:'radial-gradient(circle,rgba(30,42,120,.4) 0%,transparent 70%)',filter:'blur(60px)' }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ background:'rgba(42,172,226,.1)',border:'1px solid rgba(42,172,226,.25)',color:'#2AACE2' }}>
            Services
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.06]" style={{ fontFamily:'var(--font-grotesk)' }}>
            Everything You Need<br />
            <span className="grad">to Ship & Scale</span>
          </h1>
          <p className="text-[#8892B0] text-xl max-w-2xl mx-auto mb-10">
            Full-spectrum digital expertise under one roof. We partner with ambitious companies to build products that users love and businesses scale on.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 rounded-xl text-base btn-primary">Get a Free Quote →</Link>
            <Link href="/work"    className="px-8 py-4 rounded-xl text-base btn-ghost">See Our Work</Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <ServicesClient services={SERVICES} />

      {/* Process teaser */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative rounded-3xl p-12" style={{ background:'rgba(13,21,48,.8)',border:'1px solid rgba(255,255,255,.08)' }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily:'var(--font-grotesk)' }}>
              How We Work
            </h2>
            <p className="text-[#8892B0] mb-8">A proven 4-step process refined over 50+ projects.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {[['01','Discovery'],['02','Design'],['03','Build'],['04','Launch']].map(([n,l])=>(
                <div key={n} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold" style={{ background:'rgba(42,172,226,.12)',border:'1px solid rgba(42,172,226,.3)',color:'#2AACE2',fontFamily:'var(--font-grotesk)' }}>{n}</div>
                  <span className="text-sm font-medium text-[#F0F4FF]">{l}</span>
                </div>
              ))}
            </div>
            <Link href="/process" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm btn-primary">
              See Our Full Process →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
