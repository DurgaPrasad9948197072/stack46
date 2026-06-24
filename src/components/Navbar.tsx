'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, CalendarDays } from 'lucide-react'

const NAV = [
  { label: 'Platform', href: '/platform' },
  { label: 'Work',     href: '/fleet' },
  { label: 'Blog',     href: '/blog' },
  { label: 'Docs',     href: '/docs' },
  { label: 'Contact',  href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const goToSection = (id: string) => {
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 380)
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .7, ease: [.16, 1, .3, 1] }}
        className="fixed top-0 inset-x-0 z-[200]"
        style={{ paddingTop: 12, paddingBottom: 12 }}
      >
        <div className="max-w-[1280px] mx-auto px-5">
          <div
            className="flex items-center justify-between rounded-2xl transition-all duration-500"
            style={{
              padding: scrolled ? '10px 20px' : '14px 20px',
              background: scrolled ? 'rgba(5,8,20,.97)' : 'rgba(7,11,26,.82)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(255,255,255,.09)',
              boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,.6)' : 'none',
            }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="relative w-9 h-9">
                <Image src="/logo.png" alt="STACK46" fill className="object-contain" priority />
              </div>
              <span className="font-bold text-[1.05rem] tracking-[.18em] grad" style={{ fontFamily: 'var(--font-grotesk)' }}>
                STACK46
              </span>
            </Link>

            {/* Desktop nav pill */}
            <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full glass">
              {NAV.map(link => {
                const active = pathname === link.href || pathname.startsWith(link.href + '/')
                return (
                  <Link key={link.label} href={link.href}
                    className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                    style={{ color: active ? '#F0F4FF' : '#8892B0', background: active ? 'rgba(42,172,226,.12)' : 'transparent' }}>
                    {link.label}
                    {active && (
                      <motion.span layoutId="nav-active" className="absolute inset-0 rounded-full"
                        style={{ background: 'rgba(42,172,226,.1)', border: '1px solid rgba(42,172,226,.25)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                    )}
                  </Link>
                )
              })}
              <button onClick={() => goToSection('services')}
                className="px-4 py-2 rounded-full text-sm font-medium text-[#8892B0] hover:text-[#F0F4FF] transition-colors duration-200 cursor-pointer">
                Services
              </button>
            </nav>

            {/* Desktop right — single Book a Call CTA */}
            <div className="hidden md:flex items-center">
              <motion.div whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
                  style={{ background: 'linear-gradient(135deg,#1E2A78,#2AACE2)', color: '#fff', boxShadow: '0 0 24px rgba(42,172,226,.35)' }}>
                  <CalendarDays size={14} />
                  Book a Call
                </Link>
              </motion.div>
            </div>

            {/* Mobile hamburger */}
            <button onClick={() => setOpen(v => !v)}
              className="md:hidden p-2.5 rounded-xl transition-all cursor-pointer"
              style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', color: '#8892B0' }}
              aria-label="Toggle menu">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div key="mobile-menu"
            initial={{ opacity: 0, y: -14, scale: .97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: .97 }}
            transition={{ duration: .2 }}
            className="fixed top-[70px] inset-x-4 z-[190] rounded-2xl p-4 flex flex-col gap-1"
            style={{ background: 'rgba(5,8,20,.97)', backdropFilter: 'blur(28px)', border: '1px solid rgba(255,255,255,.1)', boxShadow: '0 24px 64px rgba(0,0,0,.6)' }}>
            {NAV.map(link => (
              <Link key={link.label} href={link.href}
                className="flex items-center px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{ color: pathname === link.href ? '#F0F4FF' : '#8892B0', background: pathname === link.href ? 'rgba(42,172,226,.08)' : 'transparent' }}>
                {link.label}
              </Link>
            ))}
            <button onClick={() => goToSection('services')} className="flex items-center px-4 py-3.5 rounded-xl text-sm font-medium text-[#8892B0] cursor-pointer">
              Services
            </button>
            <Link href="/contact"
              className="mt-2 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold"
              style={{ background: 'linear-gradient(135deg,#1E2A78,#2AACE2)', color: '#fff' }}>
              <CalendarDays size={14} /> Book a Call
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
