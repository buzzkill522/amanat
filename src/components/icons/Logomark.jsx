/**
 * The site mark: an eye with the rupee sign for a pupil.
 *
 * Says the tagline back - "money lessons you can see" - rather than
 * illustrating a lesson concept the way the pictures in ConceptIcon.jsx do.
 * Kept as its own component instead of an entry in that file for exactly that
 * reason: this one is never chosen by content, only ever placed by hand in
 * the header and the favicon.
 *
 * Same drawing rules as ConceptIcon: a 48x48 box, a soft wash under the
 * linework, currentColor throughout so it follows text-{colour} and reflects
 * with the theme the same way every lesson picture does.
 */

const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export default function Logomark({ className = 'h-8 w-8', title, ...rest }) {
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
      <g fill="currentColor" opacity="0.14" stroke="none">
        <path d="M6,24 Q24,10 42,24 Q24,38 6,24 Z" />
        <circle cx="24" cy="24" r="9" />
      </g>
      <path d="M6,24 Q24,10 42,24 Q24,38 6,24 Z" {...S} />
      <circle cx="24" cy="24" r="9" {...S} strokeWidth={2.2} />
      <text
        x="24"
        y="28"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill="currentColor"
        stroke="none"
      >
        ₹
      </text>
    </svg>
  )
}
