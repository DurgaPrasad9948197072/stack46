'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Clock, ChevronRight } from 'lucide-react'

const CATEGORIES = ['All', 'Engineering', 'AI/ML', 'Design', 'Cloud', 'Security', 'Product']

const POSTS = [
  {
    slug: 'nextjs-performance-2026',
    title: 'How top Next.js apps achieve sub-second load times in 2026',
    category: 'Engineering', cat: 'Engineering', accent: '#2AACE2',
    author: 'Sarah Chen', role: 'Lead Engineer', date: 'Jun 10 2026', read: '6 min',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    featured: true,
  },
  {
    slug: 'ai-integration-guide',
    title: 'The complete guide to integrating AI into your SaaS product in 2026',
    category: 'AI/ML', cat: 'AI/ML', accent: '#FFC845',
    author: 'James Okonkwo', role: 'AI Architect', date: 'Jun 5 2026', read: '9 min',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&q=80',
    featured: false,
  },
  {
    slug: 'design-systems',
    title: 'Design systems at scale: what works and what backfires',
    category: 'Design', cat: 'Design', accent: '#f97316',
    author: 'Priya Anand', role: 'Head of Design', date: 'May 29 2026', read: '7 min',
    img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=700&q=80',
    featured: false,
  },
  {
    slug: 'cloud-architecture',
    title: 'Inside our cloud: how STACK46 runs 99.9% uptime for 50+ clients',
    category: 'Cloud', cat: 'Cloud', accent: '#a855f7',
    author: 'STACK46 Engineering', role: 'Platform Team', date: 'May 22 2026', read: '11 min',
    img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=700&q=80',
    featured: false,
  },
  {
    slug: 'typescript-patterns',
    title: 'TypeScript patterns: the guide to saving 30% debugging time',
    category: 'Engineering', cat: 'Engineering', accent: '#06b6d4',
    author: 'STACK46 Engineering', role: 'Engineering Team', date: 'May 15 2026', read: '8 min',
    img: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=700&q=80',
    featured: false,
  },
  {
    slug: 'web-security-2026',
    title: 'Web security in 2026: vulnerabilities every developer must know',
    category: 'Security', cat: 'Security', accent: '#22c55e',
    author: 'STACK46 Team', role: 'Security Team', date: 'May 8 2026', read: '10 min',
    img: 'https://images.unsplash.com/photo-1550751827-4bd374173516?w=700&q=80',
    featured: false,
  },
]

export default function BlogPage() {
  const [activeCat, setActiveCat] = useState('All')
  const filtered = activeCat === 'All' ? POSTS : POSTS.filter(p => p.category === activeCat)
  const featured = filtered.find(p => p.featured) ?? filtered[0]
  const rest = filtered.filter(p => p !== featured)

  return (
    <div className="relative z-10 overflow-x-hidden">
      {/* Hero */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ background: 'rgba(255,200,69,.1)', border: '1px solid rgba(255,200,69,.25)', color: '#FFC845' }}>Blog</span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-[1.06]" style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.02em' }}>
            <span style={{ background: 'linear-gradient(135deg,#FFC845,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Engineering intelligence,
            </span><br />
            straight from the source.
          </h1>
          <p className="text-[#8892B0] text-lg">Insights from the STACK46 team on engineering, AI, cloud and product design.</p>
        </div>
      </section>

      {/* Category filters */}
      <div className="px-6 pb-8">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)} className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer"
              style={{
                background: activeCat === cat ? '#2AACE2' : 'rgba(255,255,255,.05)',
                color: activeCat === cat ? '#fff' : '#8892B0',
                border: activeCat === cat ? '1px solid #2AACE2' : '1px solid rgba(255,255,255,.1)',
              }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section className="pb-28 px-6">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[#8892B0]">No posts in this category yet.</div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <Link href={`/blog/${featured.slug}`} className="block glass-md rounded-3xl overflow-hidden mb-8 card-hover border border-transparent group">
                  <div className="grid md:grid-cols-2">
                    <div className="h-72 md:h-auto overflow-hidden">
                      <img src={featured.img} alt={featured.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                        style={{ background: `${featured.accent}20`, color: featured.accent, border: `1px solid ${featured.accent}30` }}>
                        {featured.cat}
                      </span>
                      <h2 className="text-2xl font-black text-[#F0F4FF] mb-4 leading-snug" style={{ fontFamily: 'var(--font-grotesk)' }}>{featured.title}</h2>
                      <div className="flex items-center gap-3 text-xs text-[#8892B0] mb-6">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: 'rgba(42,172,226,.2)', color: '#2AACE2' }}>
                          {featured.author.split(' ').map(w => w[0]).join('').slice(0, 2)}
                        </div>
                        <span>{featured.author}</span>
                        <span>·</span>
                        <span>{featured.date}</span>
                        <Clock size={12} />
                        <span>{featured.read}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all duration-200" style={{ color: featured.accent }}>
                        Read article <ChevronRight size={15} />
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Rest */}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map(post => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="glass-md rounded-2xl overflow-hidden card-hover border border-transparent group block">
                      <div className="h-48 overflow-hidden">
                        <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="p-5">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                          style={{ background: `${post.accent}20`, color: post.accent, border: `1px solid ${post.accent}30` }}>
                          {post.cat}
                        </span>
                        <h3 className="font-bold text-[#F0F4FF] mb-3 leading-snug text-sm" style={{ fontFamily: 'var(--font-grotesk)' }}>{post.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-[#8892B0]">
                          <span>{post.author}</span>
                          <span>·</span>
                          <span>{post.date}</span>
                          <Clock size={11} />
                          <span>{post.read}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
