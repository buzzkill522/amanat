import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Check, EarOff, Hand, Subtitles } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageProvider.jsx'
import { signLabel, signShort } from '@/config/site.js'
import { getModule, modules } from '@content/index.js'
import ConceptIcon from '@/components/icons/ConceptIcon.jsx'

/**
 * The cover of the site: the first screen a child sees.
 *
 * Two columns, and the right-hand one is the product rather than a picture of
 * it: the first question of the first lesson, already answered, beside a frame
 * of the signer with a caption under it. The three things the site promises -
 * sign language, captions, picture questions instead of written ones - are
 * shown in one glance rather than listed in prose.
 *
 * The card is drawn from `content/modules/01-what-is-money.json` through the
 * same loader every lesson uses, so it is the real question and it translates.
 * A hardcoded English sample would have gone stale the first time the lesson
 * was edited, and would have sat in English on a Hindi page.
 *
 * It is `aria-hidden` all the same. A screen-reader user gets the heading, the
 * lead and the two links; a decorative rehearsal of a quiz they are about to
 * meet for real would be noise, and its "Right" tag is not a state they can
 * act on. The promises stay in the text, where they are read.
 *
 * Two rules shaped the rest:
 *
 *   1. Nothing here is carried by sound, and nothing by motion either. The
 *      only animation is a staggered fade-and-lift on each block, which is
 *      decorative - if it never runs the cover reads exactly the same, and
 *      index.css lands reduced-motion readers on the finished state.
 *   2. The colours come from the palette, where each one carries its measured
 *      contrast ratio. The one chromatic thing on the screen is gold: the
 *      curve under the phrase, the coin, the ledge under the button.
 */

const PROMISES = [
  { icon: Hand, key: 'cover.promise.sign' },
  { icon: Subtitles, key: 'cover.promise.captions' },
  // A crossed-out ear, not a crossed-out speaker: the claim is that nothing
  // here needs hearing, which is about the reader, not about the audio.
  { icon: EarOff, key: 'cover.promise.sound' },
]

/** The signer, drawn rather than filmed - a placeholder until clips exist. */
function SignerFrame({ className = '' }) {
  return (
    <svg viewBox="0 0 210 128" className={className} aria-hidden="true">
      <rect width="210" height="128" fill="rgb(var(--c-stage-deep))" />
      <path d="M55 128c0-34 22-50 50-50s50 16 50 50z" fill="#000000" opacity="0.55" />
      <circle cx="105" cy="52" r="22" fill="#e6c29c" />
      <rect x="40" y="78" width="22" height="28" rx="11" fill="#e6c29c" transform="rotate(-14 51 92)" />
      <rect x="148" y="70" width="22" height="28" rx="11" fill="#e6c29c" transform="rotate(12 159 84)" />
    </svg>
  )
}

export default function CoverHero() {
  const { t, lang } = useLanguage()
  const signVars = { sign: signLabel(lang), signShort: signShort(lang) }

  // The first question of the first lesson, in the reader's language.
  const first = modules[0]
  const sample = getModule('level-1', first.id, lang)
  const question = sample?.quiz?.questions?.[0]
  // One sentence, not the whole first summary line: a real caption is a line
  // at a time, and the full line wrapped to three inside a 176px frame.
  // Devanagari ends a sentence with a danda, so both terminators are cut on.
  const caption = sample?.summary?.[0]?.split(/(?<=[.।])\s/)[0]

  return (
    <section
      aria-labelledby="cover-heading"
      // Breaks out of the max-width and padding on <main> so the cover runs
      // edge to edge under the header. The 100vw this produces is a few pixels
      // wider than the content box when a classic scrollbar is present, which
      // `overflow-x: clip` on <html> absorbs; only the panel is trimmed, never
      // text (WCAG 1.4.10 Reflow).
      className="relative -mt-8 isolate mx-[calc(50%-50vw)] overflow-hidden border-b border-brand-100 bg-surface px-6 pb-16 pt-14 sm:pb-24 sm:pt-20"
    >
      {/* A wash of the one accent, low enough to stay under the 7% ceiling the
          audit cannot see past. Static, so it costs nothing under reduced
          motion. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(38rem 22rem at 12% 0%, rgb(var(--c-gold-500) / 0.20), transparent 65%), radial-gradient(30rem 20rem at 100% 10%, rgb(var(--c-gold-500) / 0.10), transparent 65%)',
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex animate-bounceIn items-center gap-2 rounded-full bg-clay-100 px-4 py-1.5 text-sm font-extrabold text-clay-600">
            <Hand className="h-5 w-5" aria-hidden="true" />
            {t('cover.badge', signVars)}
          </span>

          <h1
            id="cover-heading"
            // 1.2 rather than 1.1: Devanagari stacks matras above and below the
            // line, and at this size the two lines collide without the extra.
            // Written as `text-*/[1.2]`, not a separate `leading-*`: each
            // `text-*` size carries its own line-height, so a responsive size
            // silently overrides a bare leading class. The modifier keeps size
            // and leading together.
            className="text-4xl/[1.2] font-extrabold text-ink sm:text-6xl/[1.2]"
          >
            <span className="block animate-riseIn [animation-delay:90ms]">{t('cover.title1')}</span>
            {/* Plain ink, underlined in gold. In a monochrome scheme the
                emphasis moves off the text and onto the mark beneath it: the
                text stays the most readable thing on the page (15.5:1), and
                the one chromatic thing in the hero carries no meaning and so
                is free to be bright.

                An SVG rather than `text-decoration` because the line curves,
                and a sibling of the text rather than a child so that
                `preserveAspectRatio="none"` can stretch one 100x12 path to
                whatever the phrase measures - 297px in English, 470px in
                Hindi. `vector-effect="non-scaling-stroke"` is what stops that
                stretch from thinning the stroke with it. */}
            <span className="block">
              <span className="relative inline-block animate-riseIn pb-4 [animation-delay:180ms]">
                <span className="text-ink">{t('cover.title2')}</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  className="absolute inset-x-0 bottom-0 h-3 w-full text-gold-500"
                >
                  {/* A single quadratic. A quadratic only reaches halfway to
                      its control point, so the control sits at y=16 - below
                      the 12-unit box - to land the middle of the curve at
                      y=10. That is a 6px sag across the phrase: enough to read
                      as a curve, shallow enough to still read as an underline
                      rather than a bowl. */}
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

          <p className="max-w-xl animate-riseIn text-lg/relaxed text-muted [animation-delay:240ms] sm:text-xl/relaxed">
            {t('cover.lead')}
          </p>

          <div className="flex w-full animate-riseIn flex-col items-stretch gap-3 [animation-delay:300ms] sm:w-auto sm:flex-row sm:items-center">
            {/* /lessons, not an in-page anchor: the level picker used to live
                on this page too, which meant the same choice ("which level?")
                had two different places to make it. One page owns it now. */}
            <Link to="/lessons" className="btn-primary group sm:text-lg">
              {t('cover.cta.start')}
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link to="/dictionary" className="btn-secondary sm:text-lg">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
              {t('cover.cta.dictionary')}
            </Link>
          </div>

          <ul className="flex animate-riseIn flex-wrap gap-x-6 gap-y-2 [animation-delay:360ms]">
            {PROMISES.map(({ icon: Icon, key }) => (
              <li key={key} className="inline-flex items-center gap-2 text-sm font-extrabold text-ink">
                <Icon className="h-5 w-5 text-muted" aria-hidden="true" />
                {t(key, signVars)}
              </li>
            ))}
          </ul>
        </div>

        {/* The product, not a stock picture. Decorative: everything it says is
            said in the text beside it. */}
        {/* The frame overlaps the card's top-left corner, and the card is
            padded to clear it: at 800px the tile was sitting on top of the
            question text, which is the one thing in here that has to be
            readable. */}
        <div className="relative animate-riseIn pt-24 [animation-delay:420ms] sm:pt-28" aria-hidden="true">
          <div className="absolute left-0 top-0 z-10 w-44 -rotate-3 overflow-hidden rounded-2xl border-2 border-surface bg-stage-deep shadow-lift sm:w-52">
            <div className="relative">
              <SignerFrame className="block h-auto w-full" />
              <span className="absolute left-2 top-2 rounded-md bg-white px-2 py-0.5 text-xs font-extrabold text-[#161616]">
                {signShort(lang)}
              </span>
            </div>
            {/* Under the picture, never over it: in sign language the face
                carries grammar, so a caption must not cover the signer. */}
            <p className="bg-black px-2 py-1.5 text-center text-xs/snug text-white">{caption}</p>
          </div>

          <span className="absolute -right-2 top-2 z-10 grid h-16 w-16 place-items-center rounded-full bg-gold-500 text-2xl font-extrabold text-[#161616] shadow-lift">
            ₹
          </span>

          <div className="card flex flex-col gap-4 p-5 pt-10 sm:p-6 sm:pt-12">
            <div className="flex items-center gap-3 text-xs font-extrabold text-muted">
              <span className="h-3 flex-1 overflow-hidden rounded-full bg-brand-100">
                <span className="block h-full w-1/3 rounded-full bg-clay-500" />
              </span>
              {t('quiz.questionOf', { n: 1, total: sample?.quiz?.questions?.length ?? 3 })}
            </div>

            <p className="text-lg font-extrabold text-ink sm:text-xl">{question?.prompt}</p>

            {question?.options?.map((option, i) => {
              const isAnswer = i === question.correctIndex
              return (
                <div
                  key={option.label}
                  className={`flex items-center gap-3 rounded-2xl border-2 px-3 py-2.5 text-sm font-bold ${
                    isAnswer
                      ? 'border-clay-500 bg-gold-100 text-ink'
                      : 'border-brand-100 bg-surface text-muted'
                  }`}
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                      isAnswer ? 'bg-gold-500 text-[#161616]' : 'bg-brand-50 text-muted'
                    }`}
                  >
                    <ConceptIcon name={option.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">{option.label}</span>
                  {isAnswer && (
                    <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-clay-500 px-2.5 py-1 text-xs font-extrabold text-white">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      {t('quiz.badgeRight')}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
