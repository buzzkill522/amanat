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

      <div className="relative mx-auto max-w-3xl text-center">
        {/* The eyebrow is the one place the accent appears up here - small,
            rust, and the only saturated thing on the screen. */}
        <span className="inline-flex animate-riseIn items-center gap-2 text-sm font-extrabold uppercase tracking-[0.14em] text-clay-600">
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
          <span className="block animate-riseIn [animation-delay:180ms]">{t('cover.title2')}</span>
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
            className="btn group bg-ink text-surface hover:bg-brand-700 sm:text-lg"
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
