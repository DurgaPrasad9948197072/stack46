'use client'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

/*
 * Interactive WebGL "tubes" that follow the cursor.
 * Library is loaded at runtime from CDN via a dynamic import that the bundler
 * cannot statically analyse (new Function), so Webpack/Turbopack never try to
 * resolve the URL at build time — this keeps `next build` (and Vercel) green.
 */
const CDN_URL = 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js'

interface TubesApp {
  tubes: {
    setColors: (colors: string[]) => void
    setLightsColors: (colors: string[]) => void
  }
  dispose?: () => void
}
type TubesFactory = (canvas: HTMLCanvasElement, opts: object) => TubesApp

/* STACK46 brand palettes — shuffle cycles through these, never off-brand */
const PALETTES = [
  { tubes: ['#1E2A78', '#2AACE2', '#FFC845'], lights: ['#2AACE2', '#4DD0C4', '#FFC845', '#1E2A78'] },
  { tubes: ['#2AACE2', '#4DD0C4', '#00B8D9'], lights: ['#4DD0C4', '#2AACE2', '#00B8D9', '#FFC845'] },
  { tubes: ['#FFC845', '#2AACE2', '#1E2A78'], lights: ['#FFC845', '#FFB300', '#2AACE2', '#4DD0C4'] },
  { tubes: ['#4DD0C4', '#1E2A78', '#FFC845'], lights: ['#00B8D9', '#FFC845', '#2AACE2', '#4DD0C4'] },
]

export interface TubesCursorHandle {
  shuffle: () => void
}

interface TubesCursorProps {
  className?: string
}

const TubesCursor = forwardRef<TubesCursorHandle, TubesCursorProps>(
  function TubesCursor({ className = '' }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const appRef = useRef<TubesApp | null>(null)
    const paletteIdx = useRef(0)

    useImperativeHandle(ref, () => ({
      shuffle() {
        if (!appRef.current) return
        paletteIdx.current = (paletteIdx.current + 1) % PALETTES.length
        const p = PALETTES[paletteIdx.current]
        appRef.current.tubes.setColors(p.tubes)
        appRef.current.tubes.setLightsColors(p.lights)
      },
    }))

    useEffect(() => {
      let disposed = false
      // Small delay: the library computes tube radii from canvas dimensions —
      // initialising before first paint yields NaN geometry.
      const timer = setTimeout(() => {
        const importShim = new Function('u', 'return import(u)') as (u: string) => Promise<{ default: TubesFactory }>
        importShim(CDN_URL)
          .then(mod => {
            if (disposed || !canvasRef.current) return
            appRef.current = mod.default(canvasRef.current, {
              tubes: {
                colors: PALETTES[0].tubes,
                lights: { intensity: 200, colors: PALETTES[0].lights },
              },
            })
          })
          .catch(err => console.error('TubesCursor failed to load:', err))
      }, 150)

      return () => {
        disposed = true
        clearTimeout(timer)
        appRef.current?.dispose?.()
        appRef.current = null
      }
    }, [])

    return (
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full ${className}`}
        style={{ pointerEvents: 'none' }}
        aria-hidden="true"
      />
    )
  }
)

export default TubesCursor
