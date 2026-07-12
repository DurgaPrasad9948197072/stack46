'use client'

import { motion } from 'framer-motion'
import {
  Code2, Cloud, Sparkles, Smartphone, Plug, ShieldCheck, Check,
  type LucideIcon,
} from 'lucide-react'
import Timeline, { type TimelineEntry } from '@/components/ui/timeline'
import AnimatedText from '@/components/ui/AnimatedText'

/*
 * "What We Build" as a scroll-beam timeline: the six service lines become
 * timeline entries — sticky accent titles on the left, rich content on the
 * right, and the gradient beam fills the rail 1:1 with scroll.
 */

interface Service {
  title: string
  accent: string
  icon: LucideIcon
  tag: string
  desc: string
  bullets: string[]
  chips: string[]
  imgs: { src: string; alt: string }[]
}

const SERVICES: Service[] = [
  {
    title: 'Full-Stack', accent: '#2AACE2', icon: Code2, tag: 'Web Platforms',
    desc: 'Next.js, Node.js, TypeScript — pixel-perfect UIs to bulletproof APIs, owned end-to-end.',
    bullets: ['Design systems & component libraries', 'Type-safe APIs — REST & GraphQL', 'Postgres, Redis and edge caching', 'CI/CD wired from the first commit'],
    chips: ['React', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL'],
    imgs: [
      { src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80', alt: 'Code on screen' },
      { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80', alt: 'Developer workstation' },
    ],
  },
  {
    title: 'Cloud & DevOps', accent: '#4DD0C4', icon: Cloud, tag: 'Infrastructure',
    desc: 'AWS, GCP, Kubernetes — zero-downtime deployments, IaC and automated pipelines from day one.',
    bullets: ['Kubernetes & serverless architectures', 'Terraform infrastructure-as-code', 'Blue-green, zero-downtime deploys', '24/7 monitoring & alerting'],
    chips: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform'],
    imgs: [
      { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80', alt: 'Global network' },
      { src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80', alt: 'Server racks' },
    ],
  },
  {
    title: 'AI & ML', accent: '#FFC845', icon: Sparkles, tag: 'Intelligence',
    desc: 'LLMs, computer vision and predictive analytics — production grade, not proof-of-concept.',
    bullets: ['LLM apps, RAG & fine-tuning', 'Computer vision pipelines', 'Predictive analytics & forecasting', 'MLOps — versioned, monitored, retrained'],
    chips: ['Python', 'PyTorch', 'LangChain', 'Anthropic', 'OpenAI'],
    imgs: [
      { src: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80', alt: 'AI visualisation' },
      { src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80', alt: 'Machine learning robot' },
    ],
  },
  {
    title: 'Mobile', accent: '#22c55e', icon: Smartphone, tag: 'iOS & Android',
    desc: 'React Native & Flutter — iOS and Android apps with native performance and 5-star UX.',
    bullets: ['One codebase, both app stores', '60fps native-feel animations', 'Offline-first data sync', 'Launch, ASO & release management'],
    chips: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    imgs: [
      { src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80', alt: 'Mobile app in hand' },
      { src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80', alt: 'App interface design' },
    ],
  },
  {
    title: 'APIs', accent: '#06b6d4', icon: Plug, tag: 'Integrations',
    desc: 'REST, GraphQL, webhooks — every tool in your ecosystem connected seamlessly at scale.',
    bullets: ['Payment, CRM & ERP integrations', 'Event-driven webhook architecture', 'Rate-limited public APIs', 'Legacy system bridges'],
    chips: ['REST', 'GraphQL', 'Webhooks', 'Kafka', 'Stripe'],
    imgs: [
      { src: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80', alt: 'Terminal code' },
      { src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80', alt: 'Data streams' },
    ],
  },
  {
    title: 'Security', accent: '#a855f7', icon: ShieldCheck, tag: 'Compliance',
    desc: 'SOC 2, GDPR, OWASP Top 10 — security baked in from the very first commit, not bolted on.',
    bullets: ['SOC 2 & GDPR readiness', 'Pen-testing & OWASP audits', 'SSO, RBAC & audit trails', 'Encryption at rest and in transit'],
    chips: ['SOC 2', 'GDPR', 'OWASP', 'SSO'],
    imgs: [
      { src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80', alt: 'Security lock' },
      { src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80', alt: 'Cyber security' },
    ],
  },
]

const DATA: TimelineEntry[] = SERVICES.map(s => ({
  title: s.title,
  accent: s.accent,
  content: (
    <div>
      {/* Icon + tag row */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${s.accent}18`, border: `1px solid ${s.accent}35` }}>
          <s.icon size={20} style={{ color: s.accent }} />
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{ background: `${s.accent}14`, color: s.accent, border: `1px solid ${s.accent}35` }}>
          {s.tag}
        </span>
      </div>

      <p className="text-[#F0F4FF] text-sm md:text-base font-medium leading-relaxed mb-6 max-w-xl">
        {s.desc}
      </p>

      {/* Deliverables */}
      <div className="mb-6 space-y-2">
        {s.bullets.map(b => (
          <div key={b} className="flex gap-2.5 items-center text-[#8892B0] text-xs md:text-sm">
            <Check size={14} strokeWidth={3} style={{ color: s.accent, flexShrink: 0 }} />
            {b}
          </div>
        ))}
      </div>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {s.chips.map(c => (
          <span key={c} className="px-3 py-1 rounded-full text-[11px] font-semibold text-[#8892B0]"
            style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.09)' }}>
            {c}
          </span>
        ))}
      </div>

      {/* Visuals */}
      <div className="grid grid-cols-2 gap-4">
        {s.imgs.map(img => (
          <div key={img.src} className="relative rounded-xl overflow-hidden group"
            style={{ border: '1px solid rgba(255,255,255,.08)' }}>
            <img src={img.src} alt={img.alt} loading="lazy" draggable={false}
              className="h-28 md:h-44 lg:h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(7,11,26,.5) 0%, transparent 45%)' }} />
          </div>
        ))}
      </div>
    </div>
  ),
}))

export default function ServicesTimeline() {
  return (
    <section id="services" className="relative z-10 pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ background: 'rgba(42,172,226,.1)', border: '1px solid rgba(42,172,226,.25)', color: '#2AACE2' }}>
            What We Build
          </span>
          <h2 className="text-5xl md:text-6xl font-black leading-[0.97] max-w-3xl"
            style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.035em' }}>
            <AnimatedText segments={[
              { text: 'One agency.' },
              { text: 'Zero gaps.', className: 'grad-anim' },
            ]} />
          </h2>
          <p className="text-[#8892B0] mt-5 text-sm md:text-base max-w-md">
            Six disciplines, one senior team. Scroll — the beam traces every capability we ship.
          </p>
        </motion.div>
      </div>
      <Timeline data={DATA} />
    </section>
  )
}
