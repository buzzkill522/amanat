/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin'
import { themes, flatten, varName, channels } from './palette.js'

// ---------------------------------------------------------------------------
// The colours themselves live in palette.js, both themes together, with the
// reasoning for each. This file turns them into two things:
//
//   1. Colour utilities that point at CSS custom properties rather than at
//      hexes — so `bg-surface` resolves through `--c-surface` and means the
//      right thing in whichever theme is active. Components never say which
//      theme they are in, because they cannot know; a teacher can switch it
//      under them at any moment.
//
//   2. The custom properties themselves, for both themes, emitted into base.
//
// One consequence worth stating: the utility class list is the same size as it
// was before dark mode existed. There is no `dark:` variant of anything, so the
// CSS does not double and no component can be half-converted — the failure
// mode where one forgotten panel stays beige on a dark page is not reachable.
//
// The palette is warm all the way down and stays that way in both themes:
// माटी terracotta, हल्दी turmeric, गेंदा marigold, मेहंदी henna, जामुन, सिंदूर,
// on unbleached khadi paper. There is no blue in it, and no grey — the neutrals
// are browns. The dark theme is a dark brown page, not a slate one.
//
// Every ratio is measured rather than estimated, in both themes, by
// `npm run check:a11y`. Text pairings clear 4.5:1 (AA 1.4.3) and icon-only
// pairings clear 3:1 (AA 1.4.11).
//
// What is allowed to collide, and why: sun/alert and grow/berry stay close
// under deuteranopia. Neither pair ever distinguishes one meaning from another
// — every state in this UI is carried by an icon and a word as well
// (WCAG 1.4.1). The pair that does carry meaning, grow against alert — right
// against wrong in the quiz — is held to a floor by the audit, in both themes.
// ---------------------------------------------------------------------------

/** Mirror the palette's shape, but with every leaf pointing at its variable. */
function toVarRefs(theme) {
  const out = {}
  for (const [family, value] of Object.entries(theme)) {
    if (typeof value === 'string') {
      out[family] = `rgb(var(${varName(family)}) / <alpha-value>)`
      continue
    }
    out[family] = {}
    for (const step of Object.keys(value)) {
      const token = step === 'DEFAULT' ? family : `${family}.${step}`
      out[family][step] = `rgb(var(${varName(token)}) / <alpha-value>)`
    }
  }
  return out
}

/**
 * { "--c-brand-600": "74 66 55", ..., colorScheme: "dark" }
 *
 * `color-scheme` is not decoration. It is what tells the browser to paint its
 * own furniture — scrollbars, the video element's default controls, checkbox
 * and radio chrome, form autofill, the space beyond an overscroll — to match.
 * Without it a dark page keeps a bright white scrollbar down its edge and
 * light native controls inside dark panels.
 */
function toVarBlock(theme, scheme) {
  return {
    ...Object.fromEntries(
      Object.entries(flatten(theme)).map(([token, hex]) => [varName(token), channels(hex)]),
    ),
    colorScheme: scheme,
  }
}

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: toVarRefs(themes.light),
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      // Both faces are by Ek Type, a type foundry in Mumbai, and both were
      // drawn for Devanagari and Latin together — so the Hindi and the English
      // are the same typeface rather than a substitution, and the two scripts
      // share a baseline and a weight. Self-hosted from node_modules; see
      // src/main.jsx. Nothing is fetched from a font CDN.
      fontFamily: {
        // Mukta: tall x-height, open apertures, unambiguous 1/l/I. Body text.
        sans: [
          'Mukta',
          'Verdana',
          '"Noto Sans Devanagari"',
          '"Nirmala UI"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        // Baloo 2: rounded and heavy. Headings and buttons only — it is the
        // friendly voice of the site, not something to read a paragraph of.
        display: ['"Baloo 2"', 'Mukta', 'Verdana', '"Nirmala UI"', 'sans-serif'],
      },
      minHeight: { tap: '44px' },
      minWidth: { tap: '44px' },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.4)', opacity: '0' },
          '60%': { transform: 'scale(1.15)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        nudge: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-6px)' },
          '40%, 80%': { transform: 'translateX(6px)' },
        },
        floatUp: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-160px) rotate(220deg)', opacity: '0' },
        },

        // The cover's entrance. Decorative: nothing changes meaning while it
        // runs, and reduced-motion users land on the finished state (index.css).
        riseIn: {
          '0%': { transform: 'translateY(18px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        bounceIn: 'bounceIn 420ms cubic-bezier(0.2, 0.9, 0.3, 1.4)',
        nudge: 'nudge 420ms ease-in-out',
        floatUp: 'floatUp 1400ms ease-out forwards',
        riseIn: 'riseIn 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        // The light theme is the default, so it needs no attribute. A reader
        // who has never touched the control, on a device with no preference,
        // gets the page the site was designed in.
        ':root': toVarBlock(themes.light, 'light'),

        // Honoured before any JavaScript runs and without anybody choosing:
        // a device set to dark opens dark. `:not([data-theme])` is what makes
        // an explicit choice win over the system — once the reader has picked,
        // the attribute is present and this rule stops applying.
        //
        // This is also the whole no-JavaScript story. The themes are CSS
        // custom properties, so a reader with scripting off still gets the
        // theme their device asks for; only the manual toggle needs JS.
        '@media (prefers-color-scheme: dark)': {
          ':root:not([data-theme])': toVarBlock(themes.dark, 'dark'),
        },

        '[data-theme="dark"]': toVarBlock(themes.dark, 'dark'),
        // Spelled out rather than left to the default, so that switching back
        // to light on a dark-set device actually returns to light instead of
        // falling through to the media query above.
        '[data-theme="light"]': toVarBlock(themes.light, 'light'),
      })
    }),
  ],
}
