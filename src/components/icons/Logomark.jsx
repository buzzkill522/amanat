import { useId } from 'react'

/**
 * The site mark: a gullak with a face.
 *
 * A gullak is the clay money-pot children in India actually save into, so the
 * mark names the subject in an object a child already owns rather than in an
 * abstraction. It replaced an eye with a rupee for a pupil, which said the
 * tagline back cleverly but read as a logo rather than as a character - and a
 * character is what a course for children can use everywhere: on an empty
 * state, next to a hint, celebrating a finished level.
 *
 * Kept as its own component instead of an entry in ConceptIcon.jsx for the
 * same reason as before: this one is never chosen by content, only ever placed
 * by hand in the header, the cover and the favicon.
 *
 * Three things it has to survive, which shaped every decision here:
 *
 *   1. **32px.** It sits in the header at h-8 and on the cover at ~300px. That
 *      rules out hands, feet and linework - at a third of an inch those turn
 *      to mush. What is left is a silhouette (pot + slot lid) and three white
 *      shapes (two eyes, one smile), all of which survive being tiny.
 *   2. **Both themes.** The fill is a gradient between two palette custom
 *      properties, not a hex, so it follows `clay` through a theme change with
 *      nothing to keep in sync. The face is hardcoded white rather than
 *      `surface` on purpose - the same call the state fills make in
 *      palette.js. A white shape knocked out of a violet fill is correct on a
 *      light page and on a dark one; reflecting it would put a near-black
 *      smile on a violet pot the moment someone chose dark.
 *   3. **Being drawn more than once on a page.** The gradient needs an id, and
 *      two identical ids in one document is invalid SVG - the first definition
 *      wins and the second element silently borrows it. `useId` makes the id
 *      per-instance, so the header mark and the cover mark cannot collide.
 *
 * The accessibility contract is unchanged from the old mark and matches
 * ConceptIcon: decorative by default, promoted to an image only when a `title`
 * is passed. Nothing here is announced twice.
 */
export default function Logomark({ className = 'h-8 w-8', title, ...rest }) {
  const gradientId = useId()

  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : 'true'}
      aria-label={title || undefined}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}

      <defs>
        {/* Blue at the top left, violet at the bottom right - the same sweep
            as the primary button, said through the same two tokens so a
            palette change reaches the logo without anyone remembering to. */}
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--c-clay-500))" />
          <stop offset="100%" stopColor="rgb(var(--c-clay-700))" />
        </linearGradient>
      </defs>

      {/* The slot lid. Sits proud of the body rather than being knocked into
          it: a slot cut into the face would compete with the eyes, and at
          32px the two would read as three eyes. */}
      <rect x="15" y="9" width="18" height="5" rx="2.5" fill={`url(#${gradientId})`} />

      {/* The pot. */}
      <ellipse cx="24" cy="28" rx="16.5" ry="14" fill={`url(#${gradientId})`} />

      {/* A soft gloss, so the pot reads as round rather than as a flat
          lozenge. Low enough alpha that it never becomes a shape of its own. */}
      <ellipse
        cx="17"
        cy="21.5"
        rx="5.5"
        ry="3"
        fill="#ffffff"
        opacity="0.18"
        transform="rotate(-22 17 21.5)"
      />

      {/* The face. */}
      <circle cx="18.5" cy="26.5" r="2" fill="#ffffff" />
      <circle cx="29.5" cy="26.5" r="2" fill="#ffffff" />
      <path
        d="M19.5 32.5c1.3 1.7 2.8 2.5 4.5 2.5s3.2-.8 4.5-2.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
