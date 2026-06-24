'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const BADGES = [
  { label: 'ISO 27001',   color: '#2AACE2', top: '-10%',  right: '-12%', left: 'auto', bottom: 'auto' },
  { label: 'AWS Partner', color: '#FFC845', bottom: '2%', right: '-14%', top: 'auto',  left: 'auto'   },
  { label: '5★ on G2',   color: '#4DD0C4', bottom: '8%', left: '-14%',  top: 'auto',  right: 'auto'  },
]

export default function AboutClient() {
  return (
    <div className="flex justify-center">
      <div className="relative w-72 h-72 md:w-80 md:h-80">
        {/* Spinning conic gradient ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full animate-spin-slow"
          style={{
            background: 'conic-gradient(from 0deg, #1E2A78, #2AACE2, #4DD0C4, #FFC845, #1E2A78)',
            padding: 3,
            borderRadius: '50%',
          }}
        />
        {/* Inner fill */}
        <div
          className="absolute inset-[3px] rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg,#070B1A,#0D1530)' }}
        >
          <div className="relative w-48 h-48">
            <Image
              src="/logo.png"
              alt="STACK46 logo"
              fill
              className="object-contain"
              style={{ filter: 'drop-shadow(0 0 24px rgba(42,172,226,.5))' }}
            />
          </div>
        </div>

        {/* Floating badges */}
        {BADGES.map((b, i) => (
          <motion.div
            key={b.label}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
            className="absolute px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap"
            style={{
              background: `${b.color}18`,
              border: `1px solid ${b.color}50`,
              color: b.color,
              top: b.top,
              right: b.right,
              bottom: b.bottom,
              left: b.left,
              boxShadow: `0 4px 20px ${b.color}20`,
            }}
          >
            {b.label}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
