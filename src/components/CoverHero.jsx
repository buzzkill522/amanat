import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, EarOff, Hand, Subtitles } from 'lucide-react'
import Logomark from '@/components/icons/Logomark.jsx'
import { useLanguage } from '@/i18n/LanguageProvider.jsx'
import { signLabel, signShort } from '@/config/site.js'

/**
 * The cover of the site: the first screen a child sees.
 *
 * Two columns, and the right one is the point. This used to be a single
 * centred column of text - eyebrow, heading, paragraph, chips, buttons, 650px
 * of it - on a site whose whole promise is "money lessons you can see". There
 * was nothing to look at. A page can argue it is visual or it can be visual,
 * and only one of those survives a glance.
 *
 * The mark carries that weight because it already means the right thing: an
 * eye with a rupee for a pupil, which is the tagline drawn rather than
 * written. At 32px in the header nobody can read the idea. Large enough and it
 * reads instantly, in any language, to a child who cannot yet read either.
 *
 * Three rules that survived the rebuild:
 *
 *   1. Nothing here is carried by sound, and nothing by motion. The entrance
 *      is one fade on the whole cover rather than five staggered ones - a
 *      cascade of delays is the house style of generated pages, and it made
 *      this look like one. If it never runs the cover reads exactly the same,
 *      and index.css lands reduced-motion readers on the finished state.
 *   2. Colours come from palette.js, where every pairing carries a measured
 *      ratio. The mark sits on clay-100 in clay-600, an audited pair.
 *   3. The heading keeps leading-[1.2]. Devanagari stacks matras above and
 *      below the line and the two lines collide at anything tighter.
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
      // No horizontal padding here. A full-bleed band that pads itself and
      // then centres a max-width box inside lands on a different left edge
      // from <main>, which pads by 4. The page then has two left margins and
      // the text reads as misaligned all the way down. Padding lives on the
      // inner container instead, matching <main> exactly: max-w-6xl px-4.
      className="relative -mt-8 isolate mx-[calc(50%-50vw)] animate-riseIn overflow-hidden border-b border-brand-100 bg-gradient-to-b from-surface to-paper pb-14 pt-14 sm:pb-20 sm:pt-20"
    >
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
        {/* ------------------------------------------------------------ words */}
        <div className="max-w-2xl text-center lg:text-left">
          <span className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.14em] text-clay-600">
            <Hand className="h-5 w-5" aria-hidden="true" />
            {t('cover.badge', signVars)}
          </span>

          <h1
            id="cover-heading"
            className="mt-5 text-4xl font-extrabold leading-[1.2] text-ink sm:text-6xl"
          >
            <span className="block">{t('cover.title1')}</span>
            <span className="block">{t('cover.title2')}</span>
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">{t('cover.lead')}</p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
            {/* /lessons, not an in-page anchor: the level picker used to live on
                this page too, which meant the same choice ("which level?") had
                two different places to make it. One page owns it now. */}
            <Link to="/lessons" className="btn group bg-ink text-surface hover:bg-brand-700 sm:text-lg">
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

        {/* ----------------------------------------------------------- picture */}
        {/* Ordered first on a narrow screen so the very top of the page is the
            drawing rather than a wall of type - a child who cannot read the
            heading still gets something. On a wide screen the grid puts it
            back on the right, beside the words. */}
        <div className="order-first lg:order-none">
          <div className="mx-auto flex aspect-square w-full max-w-[19rem] items-center justify-center rounded-[2.5rem] border-2 border-clay-500 bg-clay-100 p-8 sm:max-w-sm">
            <Logomark
              className="h-full w-full text-clay-600"
              title={t('cover.markAlt')}
            />
          </div>
        </div>
      </div>

      {/* The three promises, full width under both columns. They are the
          shortest true statement of what this site is, so they get their own
          line rather than being tucked into the text column. */}
      <ul className="relative mx-auto mt-12 flex w-full max-w-6xl flex-wrap justify-center gap-2 px-4 lg:justify-start">
        {PROMISES.map(({ icon: Icon, key, tone }) => (
          <li
            key={key}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold ${tone}`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            {t(key, signVars)}
          </li>
        ))}
      </ul>
    </section>
  )
}
