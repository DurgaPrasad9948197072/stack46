'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

/* Trionn-style inertial smooth scrolling — desktop wheel only, native on touch */
export default function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    let raf = 0
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])
  return null
}
