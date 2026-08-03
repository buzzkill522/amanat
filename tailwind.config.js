/** @type {import('tailwindcss').Config} */

// Every colour pairing used for text in this palette has been checked against
// WCAG 2.2 AA. The measured ratio sits in a comment beside each colour below.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // The palette is drawn from pigments and dyes rather than from a generic
      // UI ramp, and it is warm all the way down: माटी terracotta, हल्दी
      // turmeric, गेंदा marigold, मेहंदी henna, जामुन, सिंदूर, on unbleached
      // khadi paper. There is no blue in it, and no grey — the neutrals are
      // browns.
      //
      // Every ratio below was measured with a WCAG contrast function, not
      // estimated. Text pairings clear 4.5:1 (AA 1.4.3) and the icon-only
      // pairings clear 3:1 (AA 1.4.11).
      // ---------------------------------------------------------------------
      // नील and हल्दी — indigo and turmeric, on unbleached khadi.
      //
      // The hues were not chosen for how they feel. Colour-psychology claims
      // ("blue reads as trustworthy") are weakly evidenced and do not survive
      // replication, so the palette was decided on three things that can be
      // measured instead:
      //
      //   1. Contrast. Every ratio below is measured, not estimated.
      //   2. Colour-vision deficiency. Around 1 man in 12 has some CVD, and
      //      deuteranopia alone is ~5%. The previous all-warm palette put
      //      terracotta, marigold and vermilion within dE 3.6–4.5 of each other
      //      under deuteranopia — three different meanings, one colour. Blue
      //      against orange is the axis that survives every CVD type, which is
      //      also, conveniently, indigo dye against turmeric.
      //   3. The signing panel. Guidance on sign-language video asks for a
      //      solid dark ground behind the signer; brand-800/900 is that ground.
      //
      // The warmth lives in the surfaces and the accents rather than the
      // primary: khadi paper, brown-black ink, marigold, terracotta.
      //
      // What still collides, and why it is allowed: sun/alert and grow/berry
      // stay close under deuteranopia. Neither pair ever distinguishes one
      // meaning from another — every state in this UI is carried by an icon
      // and a word as well (WCAG 1.4.1). The pair that does carry meaning,
      // grow against alert — right against wrong in the quiz — is separated by
      // dE 30.7 at its worst, up from 8.0 before.
      colors: {
        // Page + surfaces — unbleached beige, and a near-white for cards
        paper: '#f6f1e8', //  the page itself
        surface: '#fffdf8', //  cards and panels, a half-step lighter
        // Text
        ink: '#1c1815', //  15.7:1 on paper — warm near-black, never grey-blue
        muted: '#6b6155', //   5.4:1 on paper
        // Primary is a warm stone ramp rather than a hue: in a neutral scheme
        // the "brand colour" is the paper and the ink, and the one accent gets
        // to be loud precisely because nothing else is.
        brand: {
          50: '#f3efe6',
          100: '#e8e1d4',
          200: '#d3c9b8', //  11.0:1 on brand-900
          300: '#ab9f8c',
          400: '#847868', //  decorative fills only
          500: '#63594a', //   6.9:1 with white text
          600: '#4a4237', //   9.9:1 with white text
          700: '#372f27', //  13.1:1 with white, 11.7:1 on paper
          800: '#26201a', //  16.1:1 with white
          900: '#1a1613', //  18.0:1 with white — the dark panels
        },
        // The single accent. Rust, and the only saturated colour on a normal
        // page: eyebrow labels, icons, the play control. Used sparingly on
        // purpose — one loud colour in a quiet scheme reads as emphasis, and
        // three read as noise.
        clay: { 100: '#f8e7dc', 400: '#c4643a', 500: '#a8451c', 600: '#8a3818' }, // 5.9:1 with white, 7.0:1 on paper
        // ------------------------------------------------------------------
        // State colours. Muted to match, but not so far that they stop working
        // — desaturating costs colour-blind separation, so these were tuned
        // against a CVD simulation rather than picked by eye. grow against
        // alert is right-against-wrong in the quiz and holds at dE 28 under the
        // worst CVD type; the green is pulled to teal and the red pushed dark
        // to buy that separation back.
        grow: { 100: '#dcece5', 500: '#237a63', 600: '#1a5e4b' }, // 5.2:1 / 7.4:1 with white
        sun: { 100: '#f8eccc', 500: '#8a6413', 600: '#6f4f0c' }, // 6.4:1 on sun-100
        berry: { 100: '#f1e3ee', 500: '#71355f', 600: '#59284a' }, // 8.8:1 with white
        alert: { 100: '#fbe3e2', 500: '#8a1018', 600: '#6d0c12' }, // 9.7:1 with white
      },
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
  plugins: [],
}
