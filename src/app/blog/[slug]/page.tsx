'use client'
import { use } from 'react'
import Link from 'next/link'
import { ChevronLeft, Clock, Star } from 'lucide-react'

const POSTS: Record<string, {
  title: string; category: string; accent: string; author: string; role: string;
  date: string; read: string; img: string; content: React.ReactNode
}> = {
  'nextjs-performance-2026': {
    title: 'How top Next.js apps achieve sub-second load times in 2026',
    category: 'Engineering', accent: '#2AACE2',
    author: 'Sarah Chen', role: 'Lead Engineer', date: 'Jun 10, 2026', read: '6 min',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    content: (
      <>
        <p>Sub-second load times are no longer a luxury — they are a baseline expectation. In 2026, users abandon pages that take more than 1.5 seconds to become interactive. For Next.js teams, this means rethinking not just what you ship, but how and when you ship it.</p>
        <p>The most consistent win we see across client projects is aggressive server-component adoption. By moving data-fetching and rendering to the server, you eliminate round-trips and reduce JavaScript bundle size by 30–60% in real-world apps. The key is identifying which components need interactivity and which do not — most UI is statically renderable.</p>
        <p>Partial Pre-Rendering (PPR), stable in Next.js 16, combines the best of static generation and dynamic data. Your page shell renders at the edge in under 50ms, while suspense boundaries stream in dynamic content. For dashboards and content sites alike, this pattern consistently beats traditional SSR by 200–400ms on TTFB.</p>
        <p>Image optimisation remains underestimated. Using next/image with size hints, explicit width/height, and AVIF format reduces image payload by 40–70%. Pair this with resource hints — preconnect, prefetch, preload — and you eliminate the most common causes of render-blocking resources.</p>
        <p>Caching strategy is where most teams leave the most performance on the table. Next.js 16 offers fetch-level caching, route caching, and the new unstable_cache API. Used correctly, these eliminate redundant database queries across user sessions, reducing P95 server response time from 200ms to under 20ms for cached routes.</p>
        <p>Finally, bundle analysis is a discipline, not a one-time task. Run next build --debug and @next/bundle-analyzer on every significant PR. Common culprits are moment.js (replace with date-fns), lodash (use lodash-es or native methods), and accidentally client-side charting libraries that can be server-rendered.</p>
      </>
    ),
  },
  'ai-integration-guide': {
    title: 'The complete guide to integrating AI into your SaaS product in 2026',
    category: 'AI/ML', accent: '#FFC845',
    author: 'James Okonkwo', role: 'AI Architect', date: 'Jun 5, 2026', read: '9 min',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    content: (
      <>
        <p>AI integration is no longer a differentiator — it is a table stake. In 2026, every serious B2B SaaS product needs at least one AI-powered workflow. The question is not whether to integrate AI, but how to do it in a way that delivers real value without becoming a reliability liability.</p>
        <p>The most important decision is choosing the right integration pattern. Direct LLM calls work for simple use cases, but production systems require retrieval-augmented generation (RAG), tool use, and structured output parsing. Start with your user need and work backwards to the architecture — not the other way around.</p>
        <p>Data quality is the single biggest predictor of AI feature success. Before adding any LLM call, audit your data pipeline. Noisy, inconsistent, or sparse data will produce poor outputs regardless of which model you choose. Clean data with domain-specific fine-tuning consistently outperforms general models on proprietary tasks.</p>
        <p>Latency management is critical for user experience. Streaming responses using server-sent events reduces perceived latency by 60–80% compared to waiting for full completion. Implement optimistic UI patterns so users see partial results immediately. Set clear timeout thresholds and always provide fallback behaviour for AI failures.</p>
        <p>Cost control requires caching and smart routing. Cache identical or near-identical prompts using semantic similarity matching — this alone reduces LLM API costs by 30–50% in most applications. Route simple classification tasks to smaller, faster models and reserve frontier models for complex reasoning tasks.</p>
      </>
    ),
  },
}

const DEFAULT_CONTENT = (
  <>
    <p>This article explores one of the most important topics facing engineering teams in 2026. Drawing on our experience building over 150 products across 6 industries, we share the patterns that work, the anti-patterns that cost teams months of rework, and the principles that separate good engineering from great engineering.</p>
    <p>Our approach at STACK46 is always to start from first principles. Before we write a line of code, we understand the problem deeply — the user, the data, the constraints, and the success criteria. The technical decisions follow naturally from that understanding.</p>
  </>
)

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const post = POSTS[slug]

  const title = post?.title ?? 'Article'
  const category = post?.category ?? 'Engineering'
  const accent = post?.accent ?? '#2AACE2'
  const author = post?.author ?? 'STACK46 Team'
  const role = post?.role ?? 'Engineering'
  const date = post?.date ?? 'Jun 2026'
  const read = post?.read ?? '5 min'
  const img = post?.img ?? 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80'
  const content = post?.content ?? DEFAULT_CONTENT

  return (
    <div className="relative z-10">
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#8892B0] hover:text-[#F0F4FF] transition-colors mb-8 group">
          <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Blog
        </Link>

        {/* Category + read time */}
        <div className="flex items-center gap-3 mb-5">
          <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}30` }}>{category}</span>
          <div className="flex items-center gap-1.5 text-xs text-[#8892B0]"><Clock size={12} />{read} read</div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-[#F0F4FF] mb-6 leading-[1.1]" style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.02em' }}>{title}</h1>

        {/* Author row */}
        <div className="flex items-center gap-3 mb-8 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{ background: 'rgba(42,172,226,.2)', color: '#2AACE2' }}>
            {author.split(' ').map(w => w[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div className="font-semibold text-sm text-[#F0F4FF]">{author}</div>
            <div className="text-xs text-[#8892B0]">{role} · {date}</div>
          </div>
        </div>

        {/* Hero image */}
        <div className="h-72 sm:h-96 rounded-3xl overflow-hidden mb-10">
          <img src={img} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Article body */}
        <div className="flex flex-col gap-5 text-[#8892B0] text-lg leading-relaxed">
          {content}
        </div>

        {/* CTA */}
        <div className="mt-16 glass-md rounded-3xl p-8 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#FFC845" style={{ color: '#FFC845' }} />)}
          </div>
          <h2 className="text-xl font-black text-[#F0F4FF] mb-2" style={{ fontFamily: 'var(--font-grotesk)' }}>Build with STACK46</h2>
          <p className="text-[#8892B0] text-sm mb-6">Ready to put these ideas into practice? Start your free trial today.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition-all hover:scale-[1.03]"
            style={{ background: 'linear-gradient(135deg,#1E2A78,#2AACE2)', color: '#fff', boxShadow: '0 0 24px rgba(42,172,226,.3)' }}>
            Subscribe &amp; Get Started
          </Link>
        </div>
      </article>
    </div>
  )
}
