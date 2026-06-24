'use client'

export default function AuroraBackground() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Orb 1 — indigo top-left */}
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          top: '-20%',
          left: '-15%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30,42,120,0.22) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'aurora-drift-1 22s ease-in-out infinite',
        }}
      />
      {/* Orb 2 — blue top-right */}
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          top: '5%',
          right: '-10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(42,172,226,0.18) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'aurora-drift-2 28s ease-in-out infinite',
        }}
      />
      {/* Orb 3 — teal mid */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          top: '40%',
          left: '30%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(77,208,196,0.14) 0%, transparent 70%)',
          filter: 'blur(65px)',
          animation: 'aurora-drift-3 18s ease-in-out infinite',
        }}
      />
      {/* Orb 4 — cyan bottom */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          bottom: '-10%',
          right: '20%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,184,217,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'aurora-drift-2 32s ease-in-out infinite reverse',
        }}
      />

      {/* Animated mesh gradient layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 80px,
              rgba(42,172,226,0.03) 80px,
              rgba(42,172,226,0.03) 81px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 80px,
              rgba(77,208,196,0.03) 80px,
              rgba(77,208,196,0.03) 81px
            )
          `,
          animation: 'mesh-drift 40s linear infinite',
        }}
      />

      {/* Dot grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.4,
        }}
      />

      {/* Very subtle noise vignette at edges */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 60%, rgba(7,11,26,0.6) 100%)',
        }}
      />
    </div>
  )
}
