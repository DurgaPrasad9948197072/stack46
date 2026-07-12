import type { Metadata } from 'next'
import { Bricolage_Grotesque, Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import AuroraBackground from '@/components/AuroraBackground'
import IntroWrapper from '@/components/IntroWrapper'
import ConditionalLayout from '@/components/ConditionalLayout'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'

/* Distinctive type system:
   Bricolage Grotesque — characterful display face for every heading
   Instrument Sans     — crisp, modern body copy
   Instrument Serif    — italic accent for highlighted words
   JetBrains Mono      — technical labels, counters, taglines */
const grotesk = Bricolage_Grotesque({
  subsets: ['latin'], variable: '--font-grotesk', display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})
const body = Instrument_Sans({
  subsets: ['latin'], variable: '--font-dm', display: 'swap',
  weight: ['400', '500', '600', '700'],
})
const serif = Instrument_Serif({
  subsets: ['latin'], variable: '--font-serif', display: 'swap',
  weight: '400', style: ['normal', 'italic'],
})
const mono = JetBrains_Mono({
  subsets: ['latin'], variable: '--font-mono-brand', display: 'swap',
  weight: ['400', '500', '700'],
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
      className={`${grotesk.variable} ${body.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BLOCKING_SCRIPT }} />
        <style dangerouslySetInnerHTML={{ __html: BLOCKING_CSS }} />
      </head>
      <body suppressHydrationWarning>
        <IntroWrapper />
        <SmoothScroll />
        <CustomCursor />
        <ScrollProgress />
        <AuroraBackground />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}
