#!/usr/bin/env node
// ---------------------------------------------------------------------------
// Checks the palette against WCAG contrast and against colour-vision
// deficiency.
//
//   npm run check:a11y
//
// The colours are read out of tailwind.config.js rather than copied here, so
// this can never drift from what the site actually ships. Changing a hex and
// forgetting to re-check is exactly the failure this exists to catch.
//
// Two separate things are graded, because they fail differently:
//
//   CONTRAST   Text pairs must clear 4.5:1 (WCAG 1.4.3), non-text 3:1 (1.4.11).
//              This is a legal floor and a hard error.
//
//   CVD        Around 1 man in 12 has some colour-vision deficiency. Colours
//              that carry meaning *against each other* must stay apart when
//              simulated. Only one pair truly matters — grow against alert is
//              right-against-wrong in the quiz — so that is the one held to a
//              threshold. Decorative pairs are allowed to converge, because
//              every state in this UI is also carried by an icon and a word.
//
// Exits non-zero on any failure, so it can gate CI.
// ---------------------------------------------------------------------------

import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const config = (await import(pathToFileURL(join(root, 'tailwind.config.js')).href)).default
const C = config.theme.extend.colors

/** "brand.600" / "paper" / "#ffffff" -> hex */
function hex(token) {
  if (token.startsWith('#')) return token
  const [family, step] = token.split('.')
  const value = step ? C[family]?.[step] : C[family]
  if (typeof value !== 'string') throw new Error(`No colour for "${token}" in tailwind.config.js`)
  return value
}

// --- colour maths ----------------------------------------------------------
const toLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const clamp = (x) => Math.min(1, Math.max(0, x))
const parse = (h) => {
  const s = h.replace('#', '')
  return [0, 2, 4].map((i) => toLin(parseInt(s.slice(i, i + 2), 16) / 255))
}
const relLum = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b
const ratio = (a, b) => {
  const [hi, lo] = [relLum(parse(a)), relLum(parse(b))].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

// Machado, Oliveira & Fernandes (2009), severity 1.0, applied in linear RGB.
const MAT = {
  deuteranopia: [0.367322, 0.860646, -0.227968, 0.280085, 0.672501, 0.047413, -0.01182, 0.04294, 0.968881],
  protanopia: [0.152286, 1.052583, -0.204868, 0.114503, 0.786281, 0.099216, -0.003882, -0.048116, 1.051998],
  tritanopia: [1.255528, -0.076749, -0.178779, -0.078411, 0.930809, 0.147602, 0.004733, 0.691367, 0.3039],
}
const simulate = (lin, type) => {
  const m = MAT[type]
  return [
    m[0] * lin[0] + m[1] * lin[1] + m[2] * lin[2],
    m[3] * lin[0] + m[4] * lin[1] + m[5] * lin[2],
    m[6] * lin[0] + m[7] * lin[1] + m[8] * lin[2],
  ].map(clamp)
}
function toLab(lin) {
  const [r, g, b] = lin
  const X = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b
  const Y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b
  const Z = 0.0193339 * r + 0.119192 * g + 0.9503041 * b
  const f = (t) => (t > 216 / 24389 ? Math.cbrt(t) : (841 / 108) * t + 4 / 29)
  const [fx, fy, fz] = [f(X / 0.95047), f(Y), f(Z / 1.08883)]
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)]
}
const deltaE = (a, b, type) => {
  const [la, lb] = [toLab(simulate(parse(a), type)), toLab(simulate(parse(b), type))]
  return Math.hypot(la[0] - lb[0], la[1] - lb[1], la[2] - lb[2])
}

// --- what the site actually uses -------------------------------------------
// Add a row here whenever a new colour pairing appears in a component.
const TEXT = [
  ['ink', 'paper'], ['ink', 'surface'], ['ink', 'brand.50'],
  ['muted', 'paper'], ['muted', 'surface'], ['muted', 'brand.50'],
  ['#ffffff', 'brand.500'], ['#ffffff', 'brand.600'], ['#ffffff', 'brand.700'],
  ['#ffffff', 'brand.800'], ['#ffffff', 'brand.900'],
  ['brand.100', 'brand.900'], ['brand.200', 'brand.900'], ['brand.100', 'brand.800'],
  ['brand.700', 'paper'], ['brand.700', 'surface'], ['brand.800', 'paper'],
  ['surface', 'brand.900'],
  ['clay.600', 'paper'], ['clay.600', 'surface'], ['clay.600', 'brand.50'],
  ['clay.600', 'clay.100'], ['#ffffff', 'clay.500'],
  ['#ffffff', 'grow.500'], ['grow.600', 'grow.100'],
  ['sun.600', 'sun.100'], ['sun.500', 'sun.100'],
  ['berry.600', 'berry.100'], ['#ffffff', 'berry.500'],
  ['alert.600', 'alert.100'], ['#ffffff', 'alert.500'],
]

// Icons, and borders that mark out a control: non-text, so the floor is 3:1.
//
// Deliberately NOT listed: brand-100. It is used only for hairlines and
// dividers — the rule under the header, the line closing the stats band, table
// row separators. WCAG 1.4.11 covers "visual information required to identify
// user interface components and states", and a decorative separator is neither.
// It measures about 1.2:1 against paper, which is the whole point of a hairline;
// listing it here would put a permanent false failure in CI, and a check that
// always fails is a check everybody learns to ignore.
const GRAPHICS = [
  ['clay.500', 'paper'], ['brand.600', 'surface'], ['brand.600', 'paper'],
  ['grow.600', 'surface'], ['berry.600', 'surface'], ['sun.600', 'surface'],
  // The secondary button's outline — the main cue that it is a button at all.
  ['brand.400', 'surface'], ['brand.400', 'paper'],
]

// The only pairing where one colour has to be told apart from another to know
// whether an answer was right. 20 is conservative; it currently sits near 28.
const CVD_CRITICAL = [
  ['grow.500', 'alert.500', 20],
  ['grow.600', 'alert.600', 20],
]

// --- run -------------------------------------------------------------------
const failures = []
const check = (pairs, floor, label) => {
  console.log(`\n${label} (floor ${floor}:1)`)
  for (const [fg, bg] of pairs) {
    const r = ratio(hex(fg), hex(bg))
    const ok = r >= floor
    if (!ok) failures.push(`${fg} on ${bg} is ${r.toFixed(2)}:1, needs ${floor}:1`)
    console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${(fg + ' on ' + bg).padEnd(28)} ${r.toFixed(2).padStart(6)}`)
  }
}

check(TEXT, 4.5, 'Text — WCAG 1.4.3')
check(GRAPHICS, 3, 'Graphics — WCAG 1.4.11')

console.log('\nColour-vision deficiency — pairs that carry meaning')
for (const [a, b, floor] of CVD_CRITICAL) {
  for (const type of Object.keys(MAT)) {
    const d = deltaE(hex(a), hex(b), type)
    const ok = d >= floor
    if (!ok) failures.push(`${a} vs ${b} under ${type} is dE ${d.toFixed(1)}, needs ${floor}`)
    console.log(
      `  ${ok ? 'ok  ' : 'FAIL'} ${(a + ' vs ' + b).padEnd(24)} ${type.padEnd(13)} dE ${d.toFixed(1).padStart(5)}`,
    )
  }
}

if (failures.length) {
  console.log(`\n${failures.length} failure(s):`)
  for (const f of failures) console.log(`  x ${f}`)
  console.log('')
  process.exit(1)
}
console.log('\nAll pairs pass.\n')
