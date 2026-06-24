'use client'
import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 50,  suffix: '+', label: 'Projects Delivered' },
  { value: 30,  suffix: '+', label: 'Happy Clients' },
  { value: 5,   suffix: '+', label: 'Years Active' },
  { value: 100, suffix: '%', label: 'Satisfaction Rate' },
]

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          let current = 0
          const steps = 40
          const increment = value / steps
          const interval = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(interval)
            } else {
              setCount(Math.floor(current))
            }
          }, 30)
          observer.unobserve(el)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="flex flex-col items-center gap-2" style={{ animation: 'count-up 0.5s ease forwards' }}>
      <span
        className="text-5xl md:text-6xl font-bold grad"
        style={{ fontFamily: 'var(--font-grotesk)' }}
      >
        {count}{suffix}
      </span>
      <span className="text-sm text-[#8892B0] font-medium">{label}</span>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="relative z-10 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div
          className="relative rounded-3xl p-12 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg,rgba(30,42,120,.5) 0%,rgba(13,21,48,.85) 50%,rgba(0,184,217,.12) 100%)',
            border: '1px solid rgba(42,172,226,.18)',
          }}
        >
          <div style={{ position:'absolute',top:-80,left:-80,width:250,height:250,borderRadius:'50%',background:'radial-gradient(circle,rgba(42,172,226,.18) 0%,transparent 70%)',pointerEvents:'none' }} />
          <div style={{ position:'absolute',bottom:-80,right:-80,width:250,height:250,borderRadius:'50%',background:'radial-gradient(circle,rgba(77,208,196,.14) 0%,transparent 70%)',pointerEvents:'none' }} />
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {STATS.map(s => (
              <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
