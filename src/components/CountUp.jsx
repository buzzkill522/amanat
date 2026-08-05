import { useEffect, useState } from 'react'
import useReveal from '@/hooks/useReveal.js'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion.js'

/**
 * Counts a number up when it scrolls into view.
 *
 * Only used on the stats band, and only on the values that are numbers - the
 * "Free" tile is passed straight through, because animating a word is a trick
 * rather than an effect.
 *
 * Reduced-motion readers get the final figure immediately. So does anyone
 * whose browser lacks IntersectionObserver: the number is the content, and it
 * is never allowed to be missing or wrong while it settles.
 */
export default function CountUp({ value, duration = 1100 }) {
  const prefersReduced = usePrefersReducedMotion()
  const [ref, shown] = useReveal({ threshold: 0.4 })
  const target = Number(value)
  const isNumber = Number.isFinite(target)

  const [display, setDisplay] = useState(() => (isNumber && !prefersReduced ? 0 : target))

  useEffect(() => {
    if (!isNumber || prefersReduced || !shown) return undefined

    let frame = 0
    const start = performance.now()
    // Ease-out cubic: fast at first, settling gently, so the final value is
    // readable well before the animation technically ends.
    const ease = (t) => 1 - (1 - t) ** 3

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      setDisplay(Math.round(ease(t) * target))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isNumber, prefersReduced, shown, target, duration])

  if (!isNumber) return <span ref={ref}>{value}</span>

  return (
    // The live figure is hidden from assistive tech mid-count and the final
    // value is exposed once, so a screen reader announces "30" rather than
    // every integer on the way there.
    <span ref={ref}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
