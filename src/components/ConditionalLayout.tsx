'use client'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

const STANDALONE_ROUTES = ['/login', '/signup']

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStandalone = STANDALONE_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/'))

  if (isStandalone) {
    return <div className="min-h-screen" style={{ background: '#070B1A', color: '#F0F4FF' }}>{children}</div>
  }

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '72px' }}>{children}</div>
      <Footer />
    </>
  )
}
