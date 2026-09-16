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
//   clay   blue-violet  the accent - eyebrows, the focus ring, the logo mark,
//                       and the gradient that carries the primary button
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
  paper: '#f7f7f5',
  surface: '#ffffff',
  // Text. Near-black with a trace of blue, to sit with the cool neutrals.
  ink: '#161616',
  muted: '#5b5b58',

  // The neutral ramp: hairlines, borders, chips, the primary button.
  brand: {
    50: '#f0f0ed',
    100: '#e3e3df', //  hairlines and dividers
    200: '#cbcbc6',
    300: '#adada7',
    400: '#7e7e77', //  the secondary button's outline - owes 3:1
    500: '#6b6b65',
    600: '#545450',
    700: '#40403c',
    800: '#2b2b28',
    900: '#1a1a18',
  },

  // Bands and grounds that are dark on purpose, in either theme. The signing
  // ground is the load-bearing one; the footer and the home page's dark band
  // use the same token so a reader never meets a bright slab after choosing
  // dark.
  stage: {
    DEFAULT: '#232320',
    deep: '#0d0d0c', //  the ground a signer is filmed against
    ink: '#f0f0ed',
    muted: '#c2c2bc',
  },

  // The accent. Blue, and the only hue with no state meaning attached, so it
  // can appear anywhere without implying right, wrong or in progress.
  //
  // It was violet for one revision and is blue now. Violet is the more
  // fashionable choice and it is also the one that reads as a brand colour
  // first and a colour second - on a page a child is meant to read, that is
  // backwards. Blue is the quieter answer and the more conventional one for
  // an interface, which is the point: it lets the drawings and the state
  // colours carry the meaning while the accent just marks what you can press.
  //
  // The family still spans a range rather than sitting on one value, because
  // the accent's main job is a gradient: `from-clay-500 to-clay-700` is the
  // site's signature fill - the primary button, the active nav pill, the
  // heading accent. It runs bright blue into a deep one.
  //
  // 500 -> 700 rather than 500 -> 600 for a reason that only shows up in the
  // other theme. 600 is the *text* step, so it reflects to a pale blue on a
  // dark page; a gradient ending there would run fill-to-text and the white
  // label on top would fall through the floor halfway across. 500 and 700 are
  // both fills in both themes, so the gradient holds either way.
  clay: { 100: '#eeeeeb', 400: '#7a7a74', 500: '#2b2b28', 600: '#3a3a35', 700: '#161615' },

  // The one chromatic accent, and the only colour on the page with no state
  // meaning: rupee gold. It is used sparingly and deliberately - the ledge
  // under a pressed button, the underline under the cover's phrase, the
  // logo's iris, the marker on the lesson you are on.
  //
  // Two steps, because one cannot do both jobs. 500 is the bright gold, and
  // it is bright enough that white text on it is unreadable and it barely
  // separates from a white page (1.35:1) - so it is only ever a fill carrying
  // near-black text, or a mark on a dark ground. 700 is the darkened gold
  // that survives on paper and carries a white label. The bright step never
  // carries meaning on a light page; anything a reader must see uses 700.
  gold: { 100: '#fff4c7', 500: '#ffd23f', 600: '#7d6820', 700: '#8c7423' },

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
  // Rose rather than the magenta this used to be (#8f2b80). That one had
  // nearly as much blue in it as red, so it read as purple to most people -
  // and once the accent stopped being violet, it was the last thing on the
  // page still pulling that way. Taking the blue out leaves a pink that is
  // unmistakably its own colour and still nothing like `alert` red, which is
  // the only neighbour it has to stay clear of.
  berry: { 100: '#fbe3ee', 500: '#a52163', 600: '#84154b', 700: '#68103a' },
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
  paper: '#111111',
  surface: '#1b1b1b', //  a half-step lighter, same relationship as the light theme
  ink: '#f1f1ee',
  muted: '#a9a9a4',

  // The slate ramp, reflected end for end.
  brand: {
    50: '#1e1e1c',
    100: '#2e2e2b', //  hairlines and dividers
    200: '#3d3d39',
    300: '#55554f',
    400: '#7c7c75', //  still the secondary button's outline, still owes 3:1
    500: '#96968f',
    600: '#b4b4ad',
    700: '#cfcfc9',
    800: '#e3e3de',
    900: '#f2f2ef',
  },

  // Barely moved: dark in both themes by definition. `stage` lifts a little
  // so a band still separates from a dark page, and `deep` drops below the
  // page so the signer's ground stays the darkest thing on screen.
  stage: {
    DEFAULT: '#1c1c1a',
    deep: '#0a0a09',
    ink: '#e9edf4',
    muted: '#c8c8c2',
  },

  // The accent lifts so it still reads on a dark page - clay-500 is the focus
  // ring, which is not allowed to be hard to see. The gradient span survives
  // the reflection: 500 and 700 are both fills, both dark enough to hold a
  // white label at 4.5:1 while clearing 3:1 against the page.
  // Those two floors pull in opposite directions on a dark ground - lifting a
  // fill helps it separate from the page and hurts the white label on top - so
  // these are narrow-window values rather than round ones. The gradient runs
  // slightly *lighter* toward 700 here, mirroring the light theme where it
  // runs darker; the same end-for-end reflection the brand ramp makes.
  // The accent reflects to a mid grey rather than going pale: it is still a
  // FILL carrying a white label, so it cannot be light. These are narrow
  // values - 500 and 700 each have to clear 3:1 against this page while still
  // holding white text at 4.5:1, and those pull opposite ways.
  clay: { 100: '#242422', 400: '#9a9a94', 500: '#74746e', 600: '#dcdcd6', 700: '#6a6a64' },

  // Gold does not reflect. The bright step is the same hex in both themes -
  // it is a mark on dark ground here, where it is at its strongest (13:1).
  gold: { 100: '#332b10', 500: '#ffd23f', 600: '#e8bc46', 700: '#8c7423' },

  // Tints go dark, text steps go light. The fills keep their hue and their
  // white labels, lifted only as far as a narrow window allows: a fill has to
  // clear 3:1 against the page to read as an object at all (WCAG 1.4.11) and
  // hold a white label at 4.5:1 (1.4.3), and against this page those pull in
  // opposite directions. That is why these are oddly specific hexes rather
  // than round ones.
  grow: { 100: '#0c2a20', 500: '#037a78', 600: '#3fdcc0', 700: '#056156' },
  sun: { 100: '#2c2210', 500: '#8a6316', 600: '#e0b24f', 700: '#6f4f11' },
  berry: { 100: '#2d1220', 500: '#ba447a', 600: '#f0a2c2', 700: '#8b2d57' },
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
