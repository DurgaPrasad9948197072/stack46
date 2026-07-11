'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* Trionn-style inertial smooth scrolling — desktop wheel only, native on touch.
   Lenis is wired into ScrollTrigger so pinned sections track without jitter. */
export default function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    gsap.registerPlugin(ScrollTrigger)
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    let raf = 0
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])
  return null
}
