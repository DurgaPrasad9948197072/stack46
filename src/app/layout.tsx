import type { Metadata } from 'next'
import { Space_Grotesk, Plus_Jakarta_Sans, DM_Sans } from 'next/font/google'
import './globals.css'
import AuroraBackground from '@/components/AuroraBackground'
import IntroWrapper from '@/components/IntroWrapper'
import ConditionalLayout from '@/components/ConditionalLayout'

const grotesk = Space_Grotesk({
  subsets: ['latin'], variable: '--font-grotesk', display: 'swap',
  weight: ['400', '500', '600', '700'],
})
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'], variable: '--font-jakarta', display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})
const dm = DM_Sans({
  subsets: ['latin'], variable: '--font-dm', display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: { default: 'STACK46 — We Build Digital Futures', template: '%s | STACK46' },
  description: 'STACK46 is a UK software agency building world-class web, mobile, AI and cloud products for ambitious companies.',
  keywords: ['software agency', 'web development', 'mobile apps', 'AI', 'cloud', 'UK'],
}

// Runs synchronously before first paint — sets data-intro on <html> when intro should show.
// suppressHydrationWarning on <html> silences the expected server/client mismatch
// caused by this script mutating the element before React hydration.
const BLOCKING_SCRIPT = `(function(){try{if(!sessionStorage.getItem('s46-intro-done')){document.documentElement.setAttribute('data-intro','true');}}catch(e){}})();`

// Hides all page content while data-intro is active; reveals with a transition when removed
const BLOCKING_CSS = `
html[data-intro='true'] body>*:not(#intro-overlay){opacity:0!important;pointer-events:none!important;}
html body>*:not(#intro-overlay){transition:opacity 0.45s ease;}
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${jakarta.variable} ${dm.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BLOCKING_SCRIPT }} />
        <style dangerouslySetInnerHTML={{ __html: BLOCKING_CSS }} />
      </head>
      <body suppressHydrationWarning>
        <IntroWrapper />
        <AuroraBackground />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}
