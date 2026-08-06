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
// gate reading it, that drift cannot happen quietly.
//
// ---------------------------------------------------------------------------
// WHITE GROUND, SATURATED ACCENTS
//
// This replaced a beige-and-rust scheme. The old one was chosen colour by
// colour and each choice was defensible, but the result read as muted and
// adult - which is the wrong register for a site whose readers are children.
// The first person outside the project to look at it said so plainly.
//
// The page is white now and the accents are properly saturated. Liveliness
// here comes from saturation and from the number of distinct hues, not from
// brightness, and there is a hard reason for that:
//
//   A fill that carries white text must be dark enough for the text to clear
//   4.5:1. That caps how bright any fill can be. So the fills are jewel tones
//   - deep emerald, indigo, magenta, amber - and the light, cheerful end of
//   each family lives in the -100 tints, which are backgrounds and carry dark
//   text. Bright where it is free, deep where the contrast floor says so.
//
// Five hues, one job each, no two doing the same work:
//   clay   indigo   the accent - eyebrows, the focus ring, the logo mark
//   grow   emerald  correct, complete
//   sun    amber    in progress, careful
//   berry  magenta  the dictionary, secondary emphasis
//   alert  red      wrong, destructive
//
// The neutrals are a cool slate ramp rather than warm stone. On a white page
// a cool neutral makes saturated accents read as brighter than a warm one
// does, which is the whole point of the change.
//
// ---------------------------------------------------------------------------
// HOW DARK MODE WORKS HERE
//
// Not a second design. The same design, reflected - because the token names
// are roles rather than colours. `paper` is "the page", `ink` is "text on the
// page", `surface` is "a card". A role survives the reflection.
//
// The neutral `brand` ramp reflects end for end: brand-50 is the faintest step
// away from the page in both themes, brand-900 the furthest. So
// `text-brand-700` is dark-on-light in the light theme and light-on-dark in
// the dark one, and no component had to be told which theme it was in.
//
// Three rules make that reflection safe:
//
//   1. Fills carry `text-surface`, never `text-white`, wherever the fill is
//      part of the neutral ramp. White cannot reflect; `text-surface` is
//      near-white on a light page and near-black on a dark one.
//   2. Each state family splits its roles by step, no step doing two jobs:
//      -100 tint background, -500 fill, -600 text, -700 pressed fill.
//   3. Anything that must stay dark in both themes is a `stage` token, not a
//      dark step of `brand`. The signing panel is the reason: guidance on
//      sign-language video asks for a solid dark ground behind the signer,
//      and that does not care which theme the reader chose.
// ---------------------------------------------------------------------------

/**
 * The light theme. A white page, a cool slate ramp, five saturated hues.
 */
const light = {
  // The page and the cards. paper is a hair off white so that a white card
  // has something to sit on; surface is pure white.
  paper: '#f6f8fc',
  surface: '#ffffff',
  // Text. Near-black with a trace of blue, to sit with the cool neutrals.
  ink: '#151a23',
  muted: '#5b6472',

  // The neutral ramp: hairlines, borders, chips, the primary button.
  brand: {
    50: '#eef2f8',
    100: '#dde4ef', //  hairlines and dividers
    200: '#c3cddd',
    300: '#9aa7bd',
    400: '#71809a', //  the secondary button's outline - owes 3:1
    500: '#55637c',
    600: '#414d63',
    700: '#313b4c',
    800: '#232a37',
    900: '#161b24',
  },

  // Bands and grounds that are dark on purpose, in either theme. The signing
  // ground is the load-bearing one; the footer and the home page's dark band
  // use the same token so a reader never meets a bright slab after choosing
  // dark.
  stage: {
    DEFAULT: '#232a37',
    deep: '#12161d', //  the ground a signer is filmed against
    ink: '#e9edf4',
    muted: '#bcc5d4',
  },

  // The accent. Indigo, and the only hue with no state meaning attached, so
  // it can appear anywhere without implying right, wrong or in progress.
  clay: { 100: '#e3eafe', 400: '#6b86f0', 500: '#3450c8', 600: '#283e9e' },

  // ------------------------------------------------------------------
  // State colours. One job per step:
  //   100 tint background - light and cheerful, carries dark text
  //   500 fill            - deep enough to carry white text at 4.5:1
  //   600 text            - on the tint, and on the page
  //   700 pressed fill
  //
  // grow against alert is right-against-wrong in the quiz, and it is the one
  // pair the colour-vision audit holds to a floor. Everything else may
  // converge under simulation, because every state here is carried by an icon
  // and a word as well as by colour (WCAG 1.4.1).
  //
  // The green is pulled toward teal and the red pushed dark and crimson, and
  // neither is a taste decision. A "true" emerald against a bright red
  // measured dE 16.8 under protanopia - close enough that a red-blind child
  // could not reliably tell a right answer from a wrong one. Blue survives
  // protanopia where red does not, so putting blue in the green and taking
  // brightness out of the red is what buys the separation back.
  grow: { 100: '#d6f3e6', 500: '#04806a', 600: '#036654', 700: '#024f41' },
  sun: { 100: '#fdefc9', 500: '#8f6410', 600: '#73500b', 700: '#5c4008' },
  berry: { 100: '#f8e2f4', 500: '#8f2b80', 600: '#732166', 700: '#5b1a51' },
  alert: { 100: '#ffe0e0', 500: '#a81523', 600: '#7d0e1a', 700: '#660a15' },
}

/**
 * The dark theme.
 *
 * The page is #0e1218 rather than #000. Pure black against near-white text is
 * the highest contrast available and, for extended reading, a common cause of
 * halation - text appearing to bleed into its background. Children reading
 * paragraphs are the case that suffers most.
 */
const dark = {
  paper: '#0e1218',
  surface: '#161c25', //  a half-step lighter, same relationship as the light theme
  ink: '#eef1f7',
  muted: '#98a3b4',

  // The slate ramp, reflected end for end.
  brand: {
    50: '#1a2029',
    100: '#242c37', //  hairlines and dividers
    200: '#333d4b',
    300: '#485465',
    400: '#6d7b8f', //  still the secondary button's outline, still owes 3:1
    500: '#8b98ab',
    600: '#a9b4c4',
    700: '#c5cddb',
    800: '#dbe2ec',
    900: '#edf1f7',
  },

  // Barely moved: dark in both themes by definition. `stage` lifts a little
  // so a band still separates from a dark page, and `deep` drops below the
  // page so the signer's ground stays the darkest thing on screen.
  stage: {
    DEFAULT: '#1a212b',
    deep: '#080b0f',
    ink: '#e9edf4',
    muted: '#c3ccda',
  },

  // The accent lifts so it still reads on a dark page - clay-500 is the focus
  // ring, which is not allowed to be hard to see.
  clay: { 100: '#1c2540', 400: '#6b86f0', 500: '#5c7ae8', 600: '#9db3ff' },

  // Tints go dark, text steps go light. The fills keep their hue and their
  // white labels, lifted only as far as a narrow window allows: a fill has to
  // clear 3:1 against the page to read as an object at all (WCAG 1.4.11) and
  // hold a white label at 4.5:1 (1.4.3), and against this page those pull in
  // opposite directions. That is why these are oddly specific hexes rather
  // than round ones.
  grow: { 100: '#0c2a20', 500: '#037a78', 600: '#3fdcc0', 700: '#056156' },
  sun: { 100: '#2c2210', 500: '#8a6316', 600: '#e0b24f', 700: '#6f4f11' },
  berry: { 100: '#2b1327', 500: '#aa3f93', 600: '#e59ad4', 700: '#78266a' },
  alert: { 100: '#301313', 500: '#c23c39', 600: '#e8756f', 700: '#9c2b28' },
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
