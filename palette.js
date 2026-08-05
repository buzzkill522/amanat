// ---------------------------------------------------------------------------
// The palette, both themes, in one place.
//
// This file is the single source of truth. Three things read it and nothing
// copies it:
//
//   tailwind.config.js   turns it into CSS custom properties and into the
//                        colour utilities that reference them
//   scripts/check-a11y   measures every pairing, in BOTH themes
//   the browser          via the variables the Tailwind plugin emits
//
// That matters because the failure this project guards against is a hex being
// changed and the contrast check not being re-run. With one source and a CI
// gate reading it, that drift cannot happen quietly — and dark mode doubles
// the surface area for exactly that mistake.
//
// ---------------------------------------------------------------------------
// HOW DARK MODE WORKS HERE
//
// Not a second design. The same design, reflected — because the token names
// were already roles rather than colours. `paper` is "the page", `ink` is
// "text on the page", `surface` is "a card". A role survives the reflection;
// a colour name would not have.
//
// The neutral `brand` ramp reflects end for end: brand-50 is the faintest step
// away from the page in both themes, brand-900 the furthest. So
// `text-brand-700` is dark-on-light in the light theme and light-on-dark in
// the dark one, and no component had to be told which theme it was in.
//
// Three rules make that reflection safe, and each one is why a set of classes
// was repointed rather than left alone:
//
//   1. Fills carry `text-surface`, never `text-white`. White cannot reflect,
//      so a white label pins its fill to being dark forever. `text-surface` is
//      near-white on a light page and near-black on a dark one, which is
//      exactly what a fill that reflects needs.
//
//   2. Each state family splits its roles by step, with no step doing two
//      jobs: -100 is a tint background, -500 a fill, -600 text, -700 the
//      pressed/hover fill. Before this, -600 was both text and a hover fill,
//      and those two want opposite things the moment the page goes dark.
//
//   3. Anything that must stay dark in both themes is a `stage` token, not a
//      dark step of `brand`. The signing panel is the reason: guidance on
//      sign-language video asks for a solid dark ground behind the signer, and
//      that requirement does not care what theme the reader chose. Naming it
//      `stage` puts the constraint in the token instead of in a comment
//      somebody edits away.
// ---------------------------------------------------------------------------

/**
 * The light theme. These values are unchanged from the beige palette that
 * shipped — introducing dark mode was not licence to restyle the light one,
 * and every measured ratio in the old audit still holds.
 */
const light = {
  // Page + surfaces — unbleached beige, and a near-white for cards.
  paper: '#f6f1e8',
  surface: '#fffdf8',
  // Text.
  ink: '#1c1815', //  15.7:1 on paper — warm near-black, never grey-blue
  muted: '#6b6155', //   5.4:1 on paper

  // Primary is a warm stone ramp rather than a hue: in a neutral scheme the
  // "brand colour" is the paper and the ink, and the one accent gets to be
  // loud precisely because nothing else is.
  brand: {
    50: '#f3efe6',
    100: '#e8e1d4',
    200: '#d3c9b8',
    300: '#ab9f8c',
    400: '#847868', //  the secondary button's outline — owes 3:1
    500: '#63594a',
    600: '#4a4237',
    700: '#372f27',
    800: '#26201a',
    900: '#1a1613',
  },

  // Bands and grounds that are dark on purpose, in either theme. The signing
  // ground is the load-bearing one; the footer and the home page's dark band
  // use the same token so a reader never meets a bright slab mid-page after
  // choosing dark.
  stage: {
    DEFAULT: '#26201a',
    deep: '#1a1613', //  the ground a signer is filmed against
    ink: '#e8e1d4', //  text on stage
    muted: '#d3c9b8', //  secondary text on stage
  },

  // The single accent. Rust, and the only saturated colour on a normal page.
  clay: { 100: '#f8e7dc', 400: '#c4643a', 500: '#a8451c', 600: '#8a3818' },

  // State colours. One job per step — see rule 2 above.
  //   100 tint background · 500 fill · 600 text · 700 pressed fill
  grow: { 100: '#dcece5', 500: '#237a63', 600: '#1a5e4b', 700: '#164e3e' },
  sun: { 100: '#f8eccc', 500: '#8a6413', 600: '#6f4f0c', 700: '#5a3f09' },
  berry: { 100: '#f1e3ee', 500: '#71355f', 600: '#59284a', 700: '#47203b' },
  alert: { 100: '#fbe3e2', 500: '#8a1018', 600: '#6d0c12', 700: '#56090e' },
}

/**
 * The dark theme.
 *
 * Still brown. Desaturating to grey is the obvious way to build a dark theme
 * and it would have thrown away the one thing this palette is about — there is
 * no blue and no grey in the light theme, and there is none here either. The
 * page is a dark warm brown, the text a warm off-white, and the neutrals stay
 * on the same stone axis rather than sliding to slate.
 *
 * The page is #16130f rather than #000. Pure black against near-white text is
 * the highest contrast available and, for extended reading, a common cause of
 * halation — text appearing to bleed into its background. Children reading
 * paragraphs are the case that suffers most.
 */
const dark = {
  paper: '#16130f',
  surface: '#201c16', //  a half-step lighter, same relationship as the light theme
  ink: '#f4efe5',
  muted: '#b0a494',

  // The stone ramp, reflected end for end. brand-50 is still "barely off the
  // page" and brand-900 is still "as far from it as this ramp goes".
  brand: {
    50: '#262119',
    100: '#322b22', //  hairlines and dividers
    200: '#453d31',
    300: '#5f5545',
    400: '#8a7e6c', //  still the secondary button's outline, still owes 3:1
    500: '#a2957f',
    600: '#c0b39c',
    700: '#d8cdb8',
    800: '#e8dfcc',
    900: '#f2ebdb',
  },

  // Barely moved: these are dark in both themes by definition. `stage` lifts a
  // little so a band still separates from a dark page, and `deep` drops below
  // the page so the signer's ground stays the darkest thing on screen.
  stage: {
    DEFAULT: '#241f19',
    deep: '#0f0d0a',
    ink: '#e8e1d4',
    muted: '#cfc5b4',
  },

  // The accent lifts: rust at light-theme darkness disappears into a dark page,
  // and clay-500 is the focus ring, which is not allowed to be hard to see.
  clay: { 100: '#35211a', 400: '#c4643a', 500: '#d2703f', 600: '#eda17c' },

  // ------------------------------------------------------------------------
  // State colours. Only two of the four steps reflect, and the reason is the
  // quiz.
  //
  //   -100 tint  reflects: it is a background, and backgrounds follow the page.
  //   -600 text  reflects: it is text, and text follows the page.
  //   -500 fill  does NOT reflect.
  //   -700 fill  does NOT reflect.
  //
  // The fills keep their hue and their white labels because they are the pair
  // the colour-vision audit is built around. grow-500 against alert-500 is
  // right-against-wrong in the quiz, and the light theme buys its separation
  // by pulling the green toward teal and pushing the red dark. Re-picking
  // those two freely for a dark page would throw that away and have to earn it
  // back by luck; they are lifted along their existing hue instead, and the
  // audit re-measures the separation against the same floor in both themes.
  //
  // Each fill is lifted only as far as a narrow window allows. A fill has to
  // clear 3:1 against the page to read as an object at all (WCAG 1.4.11), and
  // hold a white label at 4.5:1 (1.4.3). Against this page those two pull in
  // opposite directions and leave a band of roughly 0.136 to 0.183 relative
  // luminance. Every value below sits inside it — which is why they look like
  // oddly specific hexes rather than round ones.
  grow: { 100: '#14291f', 500: '#26826c', 600: '#6fd9b4', 700: '#1d6650' },
  sun: { 100: '#2e2410', 500: '#96701a', 600: '#dcb055', 700: '#6f4f0c' },
  berry: { 100: '#2b1826', 500: '#9a5a86', 600: '#d193b9', 700: '#71355f' },
  alert: { 100: '#2e1211', 500: '#c23b32', 600: '#e2635c', 700: '#94222a' },
}

export const themes = { light, dark }

/** Every leaf token as flat dotted paths: "brand.600", "stage.deep", "ink". */
export function flatten(theme) {
  const out = {}
  for (const [family, value] of Object.entries(theme)) {
    if (typeof value === 'string') out[family] = value
    else {
      for (const [step, hex] of Object.entries(value)) {
        out[step === 'DEFAULT' ? family : `${family}.${step}`] = hex
      }
    }
  }
  return out
}

/** "brand.600" -> "--c-brand-600". One naming rule, used by config and plugin. */
export const varName = (token) => `--c-${token.replace(/\./g, '-')}`

/** "#4a4237" -> "74 66 55", the space-separated form Tailwind's alpha needs. */
export function channels(hex) {
  const s = hex.replace('#', '')
  const full =
    s.length === 3
      ? s
          .split('')
          .map((c) => c + c)
          .join('')
      : s
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)).join(' ')
}

export default themes
