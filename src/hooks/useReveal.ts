import { useEffect } from 'react'

/*
 * Scroll-reversible reveal: .revealed is added when the element enters the
 * viewport and REMOVED when it leaves, so the CSS transition plays backwards
 * on the way out and replays on re-entry.
 */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<Element>(
      '.reveal-left,.reveal-right,.reveal-top,.reveal-bottom,.reveal-scale'
    )
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('revealed')
        else e.target.classList.remove('revealed')
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}
