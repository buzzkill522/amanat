/**
 * Hand-drawn concept pictures used by lessons, quizzes and the dictionary.
 *
 * Why not photographs: pictures here carry meaning for children who may be
 * reading at an earlier level than their age. Line drawings stay readable at
 * any size, in high contrast, and at 400% browser zoom.
 *
 * ADDING AN ICON
 *   1. Add an entry to `shapes` below, keyed by a short lowercase name.
 *   2. Draw inside a 48x48 box. Strokes are already set for you.
 *   3. Use the name in a content JSON file.
 *
 * All icons are decorative by default (aria-hidden). Pass a `title` when the
 * icon is the only thing carrying meaning; it then becomes an accessible image.
 */

// `S` = the shared stroke props every drawing inherits.
const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

// A soft wash behind the linework, so icons read as friendly rather than clinical.
const Wash = (props) => <g fill="currentColor" opacity="0.14" stroke="none" {...props} />

const shapes = {
  coin: (
    <>
      <Wash>
        <circle cx="24" cy="24" r="16" />
      </Wash>
      <circle cx="24" cy="24" r="16" {...S} />
      <circle cx="24" cy="24" r="11.5" {...S} strokeWidth="1.5" />
      <text
        x="24"
        y="30.5"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
      >
        ₹
      </text>
    </>
  ),
  note: (
    <>
      <Wash>
        <rect x="5" y="13" width="38" height="22" rx="3" />
      </Wash>
      <rect x="5" y="13" width="38" height="22" rx="3" {...S} />
      <circle cx="24" cy="24" r="6" {...S} />
      <path d="M11 19v10M37 19v10" {...S} />
      <text
        x="24"
        y="28"
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
      >
        ₹
      </text>
    </>
  ),
  wallet: (
    <>
      <Wash>
        <rect x="6" y="12" width="36" height="26" rx="5" />
      </Wash>
      <path d="M42 20V17a5 5 0 0 0-5-5H11a5 5 0 0 0-5 5v16a5 5 0 0 0 5 5h26a5 5 0 0 0 5-5v-3" {...S} />
      <path d="M44 20h-9a4 4 0 0 0 0 8h9z" {...S} />
      <circle cx="36.5" cy="24" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  piggy: (
    <>
      <Wash>
        <ellipse cx="23" cy="26" rx="16" ry="12" />
      </Wash>
      <path d="M39 26c0 6.6-7.2 12-16 12S7 32.6 7 26s7.2-12 16-12c2 0 3.9.3 5.7.8" {...S} />
      <path d="M29 15l5-4v8" {...S} />
      <path d="M40 22c2.5.6 4 1.9 4 3.4S42.5 28.4 40 29" {...S} />
      <path d="M14 37v3M31 37v3" {...S} />
      <path d="M20 12h7" {...S} />
      <circle cx="15" cy="24" r="1.8" fill="currentColor" stroke="none" />
    </>
  ),
  shop: (
    <>
      <Wash>
        <path d="M8 20h32v20H8z" />
      </Wash>
      <path d="M6 20h36v20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" {...S} />
      <path d="M6 20l3-10h30l3 10" {...S} />
      <path d="M18 20v-10M30 20v-10" {...S} strokeWidth="1.5" />
      <path d="M18 42V30h12v12" {...S} />
    </>
  ),
  bank: (
    <>
      <Wash>
        <path d="M9 20h30v18H9z" />
      </Wash>
      <path d="M4 20L24 8l20 12" {...S} />
      <path d="M12 22v14M20 22v14M28 22v14M36 22v14" {...S} />
      <path d="M6 38h36M8 42h32" {...S} />
    </>
  ),
  growth: (
    <>
      <Wash>
        <path d="M8 34h8v8H8zM20 26h8v16h-8zM32 16h8v26h-8z" />
      </Wash>
      <path d="M8 34h8v8H8zM20 26h8v16h-8zM32 16h8v26h-8z" {...S} />
      <path d="M8 20l9-8 7 6 12-12" {...S} strokeWidth="2" />
      <path d="M30 6h6v6" {...S} strokeWidth="2" />
    </>
  ),
  chart: (
    <>
      <Wash>
        <circle cx="24" cy="24" r="16" />
      </Wash>
      <circle cx="24" cy="24" r="16" {...S} />
      <path d="M24 8v16l11 8" {...S} />
    </>
  ),
  shield: (
    <>
      <Wash>
        <path d="M24 6l15 6v12c0 10-7 15-15 18-8-3-15-8-15-18V12z" />
      </Wash>
      <path d="M24 6l15 6v12c0 10-7 15-15 18-8-3-15-8-15-18V12z" {...S} />
      <path d="M17 24l5 5 9-10" {...S} />
    </>
  ),
  gift: (
    <>
      <Wash>
        <path d="M7 20h34v20H7z" />
      </Wash>
      <rect x="6" y="18" width="36" height="8" rx="2" {...S} />
      <path d="M9 26v14a2 2 0 0 0 2 2h26a2 2 0 0 0 2-2V26" {...S} />
      <path d="M24 18v24" {...S} />
      <path d="M24 18c-6 0-9-2-9-5s5-4 9 5c4-7 9-8 9-5s-3 5-9 5z" {...S} />
    </>
  ),
  food: (
    <>
      <Wash>
        <path d="M8 24h32a16 16 0 0 1-32 0z" />
      </Wash>
      <path d="M6 24h36a18 18 0 0 1-36 0z" {...S} />
      <path d="M4 40h40" {...S} />
      <path d="M18 16c0-3 3-3 3-6M27 16c0-3 3-3 3-6" {...S} strokeWidth="2" />
    </>
  ),
  toy: (
    <>
      <Wash>
        <path d="M6 30h36v6H6z" />
      </Wash>
      <path d="M5 32v-4l5-2 4-7h16l6 7 7 2v4" {...S} />
      <path d="M5 32h38" {...S} />
      <circle cx="15" cy="34" r="5" {...S} />
      <circle cx="34" cy="34" r="5" {...S} />
      <path d="M20 19v7" {...S} strokeWidth="1.5" />
    </>
  ),
  book: (
    <>
      <Wash>
        <path d="M24 14v26H8V12z" />
      </Wash>
      <path d="M24 14C20 10 12 10 6 11v27c6-1 14-1 18 3 4-4 12-4 18-3V11c-6-1-14-1-18 3z" {...S} />
      <path d="M24 14v27" {...S} />
    </>
  ),
  bus: (
    <>
      <Wash>
        <rect x="7" y="10" width="34" height="24" rx="4" />
      </Wash>
      <rect x="7" y="8" width="34" height="26" rx="4" {...S} />
      <path d="M7 20h34" {...S} />
      <path d="M17 8v12M31 8v12" {...S} strokeWidth="1.5" />
      <circle cx="15" cy="38" r="4" {...S} />
      <circle cx="33" cy="38" r="4" {...S} />
    </>
  ),
  phone: (
    <>
      <Wash>
        <rect x="13" y="5" width="22" height="38" rx="4" />
      </Wash>
      <rect x="13" y="4" width="22" height="40" rx="4" {...S} />
      <path d="M21 9h6" {...S} strokeWidth="2" />
      <circle cx="24" cy="38" r="1.8" fill="currentColor" stroke="none" />
      <text
        x="24"
        y="28"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
      >
        ₹
      </text>
    </>
  ),
  house: (
    <>
      <Wash>
        <path d="M10 22l14-12 14 12v18H10z" />
      </Wash>
      <path d="M6 24L24 8l18 16" {...S} />
      <path d="M11 21v19h26V21" {...S} />
      <path d="M20 40V28h8v12" {...S} />
    </>
  ),
  water: (
    <>
      <Wash>
        <path d="M24 8c7 9 12 14 12 20a12 12 0 0 1-24 0c0-6 5-11 12-20z" />
      </Wash>
      <path d="M24 6c7.5 9.5 13 15 13 21.5a13 13 0 0 1-26 0C11 21 16.5 15.5 24 6z" {...S} />
      <path d="M18 28a6 6 0 0 0 5 6" {...S} strokeWidth="2" />
    </>
  ),
  medicine: (
    <>
      <Wash>
        <rect x="8" y="18" width="32" height="22" rx="4" />
      </Wash>
      <rect x="7" y="16" width="34" height="24" rx="4" {...S} />
      <path d="M17 16v-4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4" {...S} />
      <path d="M24 22v12M18 28h12" {...S} />
    </>
  ),
  shirt: (
    <>
      <Wash>
        <path d="M12 16l6-6h12l6 6-5 5v20H17V21z" />
      </Wash>
      <path d="M18 8l-13 7 5 8 5-3v22h18V20l5 3 5-8-13-7" {...S} />
      <path d="M18 8a6 6 0 0 0 12 0" {...S} />
    </>
  ),
  icecream: (
    <>
      <Wash>
        <path d="M14 22h20L24 44z" />
      </Wash>
      <path d="M13 21h22L24 43z" {...S} />
      <path d="M14 21a10 10 0 0 1 20 0" {...S} />
      <path d="M18 27l12 0M20 33h8" {...S} strokeWidth="1.5" />
      <circle cx="24" cy="8" r="2.5" {...S} />
    </>
  ),
  cricket: (
    <>
      <Wash>
        <circle cx="24" cy="24" r="15" />
      </Wash>
      <circle cx="24" cy="24" r="15" {...S} />
      <path d="M16 12c4 7 4 17 0 24M32 12c-4 7-4 17 0 24" {...S} strokeWidth="1.8" />
    </>
  ),
  bicycle: (
    <>
      <circle cx="12" cy="32" r="9" {...S} />
      <circle cx="36" cy="32" r="9" {...S} />
      <path d="M12 32l8-16h8l-4 16M20 16h-4M28 16l8 16M24 32H12" {...S} />
      <path d="M30 12h6" {...S} />
    </>
  ),
  calendar: (
    <>
      <Wash>
        <rect x="7" y="12" width="34" height="30" rx="4" />
      </Wash>
      <rect x="7" y="10" width="34" height="32" rx="4" {...S} />
      <path d="M7 20h34M16 6v8M32 6v8" {...S} />
      <circle cx="17" cy="28" r="2" fill="currentColor" stroke="none" />
      <circle cx="24" cy="28" r="2" fill="currentColor" stroke="none" />
      <circle cx="31" cy="28" r="2" fill="currentColor" stroke="none" />
      <circle cx="17" cy="35" r="2" fill="currentColor" stroke="none" />
      <circle cx="24" cy="35" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  handcoin: (
    <>
      <Wash>
        <circle cx="24" cy="13" r="8" />
      </Wash>
      <circle cx="24" cy="13" r="8" {...S} />
      <text
        x="24"
        y="18"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
      >
        ₹
      </text>
      <path d="M6 42v-9a4 4 0 0 1 4-4h6l6 4h6a3 3 0 0 1 0 6h-7" {...S} />
      <path d="M20 39l12-3 8-2a3 3 0 0 1 2 5l-12 6-9 2-15-4" {...S} />
    </>
  ),
  lock: (
    <>
      <Wash>
        <rect x="9" y="21" width="30" height="21" rx="4" />
      </Wash>
      <rect x="9" y="21" width="30" height="21" rx="4" {...S} />
      <path d="M16 21v-6a8 8 0 0 1 16 0v6" {...S} />
      <circle cx="24" cy="30" r="2.5" {...S} />
      <path d="M24 32.5V36" {...S} />
    </>
  ),
  warning: (
    <>
      <Wash>
        <path d="M24 8l18 32H6z" />
      </Wash>
      <path d="M21 8.5a3.4 3.4 0 0 1 6 0l16.5 30a3.4 3.4 0 0 1-3 5h-33a3.4 3.4 0 0 1-3-5z" {...S} />
      <path d="M24 20v9" {...S} />
      <circle cx="24" cy="34.5" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  check: (
    <>
      <Wash>
        <circle cx="24" cy="24" r="18" />
      </Wash>
      <circle cx="24" cy="24" r="18" {...S} />
      <path d="M15 24.5l6.5 6.5L33 19" {...S} strokeWidth="3.5" />
    </>
  ),
  cross: (
    <>
      <Wash>
        <circle cx="24" cy="24" r="18" />
      </Wash>
      <circle cx="24" cy="24" r="18" {...S} />
      <path d="M17 17l14 14M31 17L17 31" {...S} strokeWidth="3.5" />
    </>
  ),
  star: (
    <>
      <Wash>
        <path d="M24 5l6 12 13 2-9.5 9 2.3 13L24 35l-11.8 6 2.3-13L5 19l13-2z" />
      </Wash>
      <path d="M24 5l6 12 13 2-9.5 9 2.3 13L24 35l-11.8 6 2.3-13L5 19l13-2z" {...S} />
    </>
  ),
  trophy: (
    <>
      <Wash>
        <path d="M14 8h20v12a10 10 0 0 1-20 0z" />
      </Wash>
      <path d="M14 8h20v13a10 10 0 0 1-20 0z" {...S} />
      <path d="M14 12H8v3a7 7 0 0 0 7 7M34 12h6v3a7 7 0 0 1-7 7" {...S} />
      <path d="M24 31v6M16 42h16l-2-5H18z" {...S} />
    </>
  ),
  question: (
    <>
      <Wash>
        <circle cx="24" cy="24" r="18" />
      </Wash>
      <circle cx="24" cy="24" r="18" {...S} />
      <path d="M18.5 19a5.5 5.5 0 0 1 10.8 1.6c0 3.7-5.3 4.4-5.3 8" {...S} />
      <circle cx="24" cy="33.5" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  list: (
    <>
      <Wash>
        <rect x="9" y="8" width="30" height="34" rx="4" />
      </Wash>
      <rect x="9" y="8" width="30" height="34" rx="4" {...S} />
      <path d="M18 5h12a2 2 0 0 1 2 2v3H16V7a2 2 0 0 1 2-2z" {...S} />
      <path d="M16 21h16M16 28h16M16 35h9" {...S} />
    </>
  ),
  target: (
    <>
      <Wash>
        <circle cx="24" cy="24" r="17" />
      </Wash>
      <circle cx="24" cy="24" r="17" {...S} />
      <circle cx="24" cy="24" r="10" {...S} />
      <circle cx="24" cy="24" r="3.5" fill="currentColor" stroke="none" />
    </>
  ),
  lightbulb: (
    <>
      <Wash>
        <path d="M24 6a13 13 0 0 1 8 23v5H16v-5a13 13 0 0 1 8-23z" />
      </Wash>
      <path d="M24 6a13 13 0 0 1 8 23.2V34H16v-4.8A13 13 0 0 1 24 6z" {...S} />
      <path d="M17 38h14M20 42h8" {...S} />
    </>
  ),
  hands: (
    <>
      <Wash>
        <path d="M10 20h12v22H10zM26 20h12v22H26z" />
      </Wash>
      <path d="M11 42V22a3 3 0 0 1 6 0v-6a3 3 0 0 1 6 0v20" {...S} />
      <path d="M37 42V22a3 3 0 0 0-6 0v-6a3 3 0 0 0-6 0v20" {...S} />
    </>
  ),
}

export const iconNames = Object.keys(shapes)

export function hasIcon(name) {
  return Object.prototype.hasOwnProperty.call(shapes, name)
}

/**
 * @param {string}  name   key from `shapes`
 * @param {string} [title] set this when the picture is the only thing that
 *                         carries the meaning; leave it off when adjacent text
 *                         already says the same thing (avoids double reading).
 */
export default function ConceptIcon({ name, title, className = 'h-12 w-12', ...rest }) {
  const drawing = shapes[name]

  if (!drawing) {
    // Loud on purpose: a typo in a content file should be obvious to the
    // educator who made it, not silently render an empty box.
    if (import.meta.env.DEV) {
      console.warn(
        `ConceptIcon: no picture named "${name}". Available names: ${iconNames.join(', ')}`,
      )
    }
    return (
      <svg viewBox="0 0 48 48" className={className} role="img" aria-label={title || 'Missing picture'} {...rest}>
        <rect x="4" y="4" width="40" height="40" rx="6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="5 4" />
        <text x="24" y="30" textAnchor="middle" fontSize="18" fill="currentColor">?</text>
      </svg>
    )
  }

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
      {drawing}
    </svg>
  )
}
