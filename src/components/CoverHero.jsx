import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, EarOff, Hand, Subtitles } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageProvider.jsx'
import { signLabel, signShort } from '@/config/site.js'

/**
 * The cover of the site: the first screen a child sees.
 *
 * One column, centred, and nothing in it that is not read. Two rules shaped
 * what is left.
 *
 *   1. Nothing here is carried by sound, and nothing by motion either. The
 *      only animation is a staggered fade-and-lift on each block, which is
 *      decorative - if it never runs the cover reads exactly the same, and
 *      index.css lands reduced-motion readers on the finished state.
 *   2. The colours come from the palette in tailwind.config.js, where each one
 *      carries its measured contrast ratio. This panel is light: ink on a
 *      surface-to-paper gradient at 15.7:1, with rust for the eyebrow at 7.0:1
 *      and the pale accent chips keeping their dark ink.
 *
 * The glow behind the eyebrow and the gradient on the second heading line are
 * later additions, aimed at a page that felt flat rather than calm. Neither
 * changes what a screen reader hears or what a reduced-motion reader sees at
 * rest - the glow is a fixed radial gradient, not an animation, and the
 * heading gradient is still solid, readable text; `bg-clip-text` swaps the
 * paint, not the contrast. clay-600 and berry-600 each clear 8:1 on paper
 * alone, so every point of the blend between them does too.
 */

const PROMISES = [
  { icon: Hand, key: 'cover.promise.sign', tone: 'bg-berry-100 text-berry-600' },
  { icon: Subtitles, key: 'cover.promise.captions', tone: 'bg-grow-100 text-grow-600' },
  // A crossed-out ear, not a crossed-out speaker: the claim is that nothing
  // here needs hearing, which is about the reader, not about the audio.
  { icon: EarOff, key: 'cover.promise.sound', tone: 'bg-sun-100 text-sun-600' },
]

export default function CoverHero() {
  const { t, lang } = useLanguage()
  const signVars = { sign: signLabel(lang), signShort: signShort(lang) }

  return (
    <section
      aria-labelledby="cover-heading"
      // Breaks out of the max-width and padding on <main> so the cover runs
      // edge to edge under the header. The 100vw this produces is a few pixels
      // wider than the content box when a classic scrollbar is present, which
      // `overflow-x: clip` on <html> absorbs; only the panel is trimmed, never
      // text (WCAG 1.4.10 Reflow).
      className="relative -mt-8 isolate mx-[calc(50%-50vw)] overflow-hidden border-b border-brand-100 bg-gradient-to-b from-surface via-surface to-paper px-6 pb-16 pt-16 sm:pb-24 sm:pt-24"
    >
      {/* A hatch, fading out downwards. The same drawn-on-paper motif as the
          grain on <body>, just large enough to see. Decorative and inert. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            // `muted` at 5%, said through the palette variable rather than
            // copied as an rgba - so the hatch is dark strokes on a light page
            // and light strokes on a dark one, without a second definition.
            'repeating-linear-gradient(-45deg, rgb(var(--c-muted) / 0.05) 0 1px, transparent 1px 11px)',
          maskImage: 'linear-gradient(to bottom, #000 0%, transparent 72%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, transparent 72%)',
        }}
      />

      {/* A brighter, hero-only version of the same wash <body>::after paints
          everywhere - three of the site's own hues, not a new colour, just
          turned up because this one screen can afford it. A static gradient,
          not an animation, so it costs nothing under reduced motion and
          nothing to the contrast audit, which reads flat token colours and
          cannot see a background image either way. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(38rem 22rem at 15% 0%, rgb(var(--c-clay-500) / 0.18), transparent 65%), radial-gradient(30rem 20rem at 100% 15%, rgb(var(--c-clay-700) / 0.15), transparent 65%), radial-gradient(26rem 18rem at 85% 100%, rgb(var(--c-sun-500) / 0.1), transparent 65%)',
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        {/* The eyebrow is the one place the accent appears up here - small,
            rust, and the only saturated thing on the screen. */}
        <span className="inline-flex animate-bounceIn items-center gap-2 rounded-full bg-clay-100 px-4 py-1.5 text-sm font-extrabold uppercase tracking-[0.14em] text-clay-600">
          <Hand className="h-5 w-5" aria-hidden="true" />
          {t('cover.badge', signVars)}
        </span>

        <h1
          id="cover-heading"
          // 1.2 rather than 1.1: Devanagari stacks matras above and below the
          // line, and at this size the two lines collide without the extra.
          className="mt-6 text-4xl font-extrabold leading-[1.2] text-ink sm:text-6xl"
        >
          <span className="block animate-riseIn [animation-delay:90ms]">{t('cover.title1')}</span>
          {/* The one gradient on the page that carries text. clay-500 into
              clay-700 - the same bright-to-deep blue sweep as the
              primary button, so the cover states the accent once and the rest
              of the page repeats it. Both ends are audited (check-a11y), and
              every colour between them is a blend of two audited colours. */}
          {/* Underlined with a drawn curve rather than a rule.

              It cannot be `text-decoration`: `bg-clip-text` clips the gradient
              to the glyphs and paints the text itself transparent, and an
              underline drawn by text-decoration is part of the text - so it
              would be clipped and painted transparent too, and simply never
              appear. It cannot be a border either, now that it curves.

              So it is an SVG, and it sits OUTSIDE the gradient span rather
              than inside it. Some WebKit builds drop child content out of an
              element carrying `-webkit-background-clip: text`; keeping the
              drawing a sibling of the clipped text avoids betting on that.

              `preserveAspectRatio="none"` lets one 100x12 path stretch to
              whatever the phrase measures - 297px in English, 470px in Hindi -
              and `vector-effect="non-scaling-stroke"` is what stops that
              stretch from thinning the stroke with it. Without the second
              attribute the line would look markedly lighter under the longer
              Hindi phrase than under the English one.

              `inline-block` on the wrapper keeps all of this the width of the
              phrase rather than the width of the column. */}
          <span className="block">
            <span className="relative inline-block animate-riseIn pb-4 [animation-delay:180ms]">
              <span className="bg-gradient-to-r from-clay-500 to-clay-700 bg-clip-text text-transparent">
                {t('cover.title2')}
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
                className="absolute inset-x-0 bottom-0 h-3 w-full text-clay-500"
              >
                {/* A single quadratic. A quadratic only reaches halfway to its
                    control point, so the control sits at y=16 - below the
                    12-unit box - to land the middle of the curve at y=10.
                    That is a 6px sag across the phrase, about 1:59 against the
                    English width: enough to read as a curve at a glance,
                    shallow enough to still read as an underline rather than a
                    bowl. The first pass used y=13, which measured 1:79 and was
                    close to indistinguishable from a straight rule.

                    The stroke is 3px and centred on the path, so at the
                    lowest point it occupies 8.5-11.5 of the 12 units and
                    stays inside the box. */}
                <path
                  d="M 2 4 Q 50 16 98 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl animate-riseIn text-lg leading-relaxed text-muted [animation-delay:240ms] sm:text-xl">
          {t('cover.lead')}
        </p>

        <ul className="mt-7 flex animate-riseIn flex-wrap justify-center gap-2 [animation-delay:300ms]">
          {PROMISES.map(({ icon: Icon, key, tone }) => (
            <li
              key={key}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-extrabold ${tone}`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {t(key, signVars)}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex animate-riseIn flex-col items-stretch justify-center gap-3 [animation-delay:360ms] sm:flex-row">
          {/* /lessons, not an in-page anchor: the level picker used to live on
              this page too, which meant the same choice ("which level?") had
              two different places to make it. One page owns it now. */}
          <Link
            to="/lessons"
            className="btn-primary group sm:text-lg"
          >
            {t('cover.cta.start')}
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
          <Link
            to="/dictionary"
            className="btn border border-brand-400 text-ink hover:bg-brand-50 sm:text-lg"
          >
            <BookOpen className="h-5 w-5" aria-hidden="true" />
            {t('cover.cta.dictionary')}
          </Link>
        </div>
      </div>
    </section>
  )
}
