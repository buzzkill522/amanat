import { useEffect, useMemo, useRef } from 'react'
import { PartyPopper } from 'lucide-react'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion.js'

// The site's own colours, through the palette variables, so the confetti
// follows the theme instead of staying at light-theme darkness on a dark page.
//
// These were five hardcoded hexes, one of which (#2a63ad) was a blue - in a
// palette whose one standing rule is that it contains no blue and no grey. It
// predates the beige scheme and was never revisited; the accent and the four
// state colours are the honest set.
const COLORS = [
  'rgb(var(--c-clay-500))',
  'rgb(var(--c-sun-500))',
  'rgb(var(--c-grow-500))',
  'rgb(var(--c-berry-500))',
  'rgb(var(--c-alert-500))',
]

/**
 * The reward for finishing a lesson.
 *
 * The message is the reward; the confetti is decoration on top of it. A child
 * with prefers-reduced-motion set, or on a device that drops the animation,
 * still gets the full message. Nothing here makes a sound.
 */
export default function Celebration({ show, message = 'Lesson complete', onDone }) {
  const reduceMotion = usePrefersReducedMotion()
  const panelRef = useRef(null)

  const pieces = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 400}ms`,
        color: COLORS[i % COLORS.length],
        size: 8 + Math.round(Math.random() * 10),
      })),
    // Regenerated each time the celebration is shown.
    [show],
  )

  useEffect(() => {
    if (!show) return undefined
    panelRef.current?.focus()
    const timer = window.setTimeout(() => onDone?.(), reduceMotion ? 2500 : 4000)
    return () => window.clearTimeout(timer)
  }, [show, reduceMotion, onDone])

  if (!show) return null

  return (
    <>
      {!reduceMotion && (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
          {pieces.map((p) => (
            <span
              key={p.id}
              className="absolute bottom-1/3 block animate-floatUp rounded-sm"
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>
      )}

      <div
        ref={panelRef}
        tabIndex={-1}
        role="status"
        className={`fixed inset-x-4 bottom-6 z-50 mx-auto flex max-w-md items-center gap-4 rounded-3xl border-4 border-grow-500 bg-surface p-5 shadow-2xl ${
          reduceMotion ? '' : 'animate-bounceIn'
        }`}
      >
        <PartyPopper className="h-12 w-12 shrink-0 text-grow-600" aria-hidden="true" />
        <div>
          <p className="text-xl font-extrabold text-ink">{message}</p>
          <p className="text-base text-muted">The next lesson is now open.</p>
        </div>
      </div>
    </>
  )
}
