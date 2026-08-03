import { useEffect, useRef, useState } from 'react'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion.js'

/**
 * Reveal an element the first time it scrolls into view.
 *
 * The important part is what happens when things go wrong. Content is only
 * ever hidden if we are certain we can un-hide it: if the reader asked for
 * reduced motion, or the browser has no IntersectionObserver, the element
 * starts visible and no animation is set up at all. A scroll animation that
 * silently swallows a paragraph is a far worse bug than a missing flourish.
 *
 * It fires once. Content that fades out again when you scroll back up is a
 * distraction on a page someone is trying to read.
 */
export default function useReveal({ threshold = 0.15, rootMargin = '0px 0px -10% 0px' } = {}) {
  const prefersReduced = usePrefersReducedMotion()
  const ref = useRef(null)
  const [shown, setShown] = useState(
    () => prefersReduced || typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    if (shown) return undefined
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            observer.disconnect()
          }
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [shown, threshold, rootMargin])

  return [ref, shown]
}
