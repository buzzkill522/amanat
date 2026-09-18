/**
 * The site mark: an eye with the rupee sign for a pupil.
 *
 * Says the tagline back - "money lessons you can see" - rather than
 * illustrating a lesson concept the way the pictures in ConceptIcon.jsx do.
 * Kept as its own component instead of an entry in that file for exactly that
 * reason: this one is never chosen by content, only ever placed by hand in
 * the header and the favicon.
 *
 * Three colours, and each follows a different rule:
 *
 *   - The outline is `currentColor`, so it takes whatever ink the header gives
 *     it and reflects with the theme: near-black on a light page, off-white on
 *     a dark one.
 *   - The white of the eye is `surface`, so the eye reads as a shape cut out of
 *     the card it sits on in either theme, rather than a hole.
 *   - The iris is gold and does NOT reflect - it is the accent, and the accent
 *     is the same hex in both themes. Bright gold barely separates from a white
 *     page (1.35:1), so the iris carries an outline in the ink colour; the
 *     shape is held by the line, and the gold is free to be decoration.
 *
 * The rupee is a literal near-black in both themes, for the same reason text
 * on a gold button is: `ink` turns white in the dark theme, and white on gold
 * is unreadable.
 *
 * Colours that come from the palette are set through `style`, not as SVG
 * attributes. A presentation attribute is not CSS, so `fill="rgb(var(...))"`
 * would be ignored; a style declaration resolves the custom property.
 */

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
      <path
        d="M4,24 Q24,8 44,24 Q24,40 4,24 Z"
        style={{ fill: 'rgb(var(--c-surface))' }}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle
        cx="24"
        cy="24"
        r="9.5"
        style={{ fill: 'rgb(var(--c-gold-500))' }}
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <text
        x="24"
        y="28.4"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="800"
        fill="#161616"
        stroke="none"
      >
        ₹
      </text>
    </svg>
  )
}
