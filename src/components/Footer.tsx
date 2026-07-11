import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const LINKS = {
  Company: [
    { l: 'Platform',  h: '/platform' },
    { l: 'Our Work',  h: '/fleet' },
    { l: 'Blog',      h: '/blog' },
    { l: 'Docs',      h: '/docs' },
    { l: 'Careers',   h: '/careers' },
    { l: 'Contact',   h: '/contact' },
  ],
  Legal: [
    { l: 'Privacy Policy', h: '/privacy' },
    { l: 'Terms of Service', h: '/terms' },
    { l: 'Security',       h: '/security' },
    { l: 'Status',         h: '/status' },
  ],
  Contact: [
    { l: 'hello@stack46.co.uk',   h: 'mailto:hello@stack46.co.uk' },
    { l: '+44 (0) 20 1234 5678',  h: 'tel:+442012345678' },
    { l: 'London · Remote',       h: '#' },
  ],
}

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/stack46', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: 'Twitter', href: 'https://twitter.com/stack46', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label: 'GitHub', href: 'https://github.com/stack46', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
]

export default function Footer() {
  return (
    <footer className="relative z-10 pt-20 pb-8 px-6" style={{ background: 'linear-gradient(to top,rgba(5,8,20,1) 0%,rgba(7,11,26,.98) 100%)', borderTop: '1px solid rgba(255,255,255,.06)' }}>
      <div className="max-w-7xl mx-auto">
        {/* ── Trionn-style giant CTA ── */}
        <Link href="/contact" className="group block mb-20 pb-16" style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8892B0] mb-5">Have an idea?</p>
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <span className="text-outline font-black uppercase leading-[0.9] transition-all duration-300"
              style={{ fontSize: 'clamp(3rem,9.5vw,8.5rem)', fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.02em' }}>
              Let&rsquo;s Talk
            </span>
            <span className="w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-45"
              style={{ border: '1px solid rgba(42,172,226,.4)', background: 'rgba(42,172,226,.06)' }}>
              <ArrowUpRight className="w-6 h-6 md:w-9 md:h-9 transition-colors duration-300" style={{ color: '#2AACE2' }} />
            </span>
          </div>
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="relative w-9 h-9">
                <Image src="/logo.png" alt="STACK46" fill className="object-contain" />
              </div>
              <span className="font-bold text-[1.05rem] tracking-[.18em] grad" style={{ fontFamily: 'var(--font-grotesk)' }}>STACK46</span>
            </Link>
            <p className="text-[#8892B0] text-sm leading-relaxed mb-6">
              UK software agency delivering world-class digital products for ambitious companies. FourSix46 Global Ltd.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer text-[#8892B0] hover:text-[#F0F4FF]"
                  style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.09)' }}>
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {(Object.entries(LINKS) as [string, { l: string; h: string }[]][]).map(([col, items]) => (
            <div key={col}>
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#F0F4FF] mb-5">{col}</h4>
              <ul className="flex flex-col gap-3">
                {items.map(item => (
                  <li key={item.l}>
                    <Link href={item.h} className="text-sm text-[#8892B0] hover:text-[#F0F4FF] transition-colors duration-200">
                      {item.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <p className="text-[#8892B0] text-xs">&copy; {new Date().getFullYear()} STACK46 · FourSix46 Global Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-[#8892B0]">
            <Link href="/privacy" className="hover:text-[#F0F4FF] transition-colors duration-200">Privacy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-[#F0F4FF] transition-colors duration-200">Terms</Link>
            <span>·</span>
            <Link href="/security" className="hover:text-[#F0F4FF] transition-colors duration-200">Security</Link>
            <span>·</span>
            <Link href="/status" className="hover:text-[#F0F4FF] transition-colors duration-200">Status</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
