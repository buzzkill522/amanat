import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Hand,
  Image as ImageIcon,
  ShieldCheck,
  Subtitles,
  Trophy,
  Users,
} from 'lucide-react'
import LevelSelector from '@/components/LevelSelector.jsx'
import CoverHero from '@/components/CoverHero.jsx'
import Reveal from '@/components/Reveal.jsx'
import CountUp from '@/components/CountUp.jsx'
import ConceptIcon from '@/components/icons/ConceptIcon.jsx'
import usePageTitle from '@/hooks/usePageTitle.js'
import { useLanguage } from '@/i18n/LanguageProvider.jsx'
import { levels, signLabel, signShort } from '@/config/site.js'
import { dictionary, modules, moduleMeta } from '@content/index.js'

/**
 * The home page.
 *
 * The page is full, but it is filled with the course rather than with
 * decoration — a featured first lesson, the eleven topics, the entitlements
 * the curriculum teaches, and a sample of the glossary. Mayer's coherence
 * principle (extraneous material removed beats extraneous material added, in
 * 23 of 23 tests) is about material that does no work; real content that helps
 * someone decide whether this site is for them is not that.
 *
 * The rule that keeps it from becoming noise: **a border means you can click
 * it.** Read-only blocks sit on the page separated by space and type size;
 * anything with a box around it is a target. The one exception is the
 * entitlements band, which is a tinted full-bleed strip — a change of ground
 * rather than a box, used once, to mark the part of the page most likely to
 * matter to a family.
 *
 * The accessibility floor is unchanged: 44px targets, AA contrast, headings in
 * order, 320px reflow, nothing signalled by colour alone.
 */

const STEPS = [
  { key: '1', icon: Subtitles, tone: 'text-brand-600' },
  { key: '2', icon: Hand, tone: 'text-berry-600' },
  { key: '3', icon: Trophy, tone: 'text-grow-600' },
]

const BUILT = [
  { key: 'sign', icon: Hand, tone: 'text-berry-600' },
  { key: 'captions', icon: Subtitles, tone: 'text-brand-600' },
  { key: 'pictures', icon: ImageIcon, tone: 'text-sun-600' },
  { key: 'private', icon: ShieldCheck, tone: 'text-grow-600' },
]

// Drawn from the site's own picture set rather than a UI icon font: these four
// are content, and the whole course is built on line drawings carrying meaning.
const CLAIMS = [
  { key: 'udid', icon: 'shield' },
  { key: 'adip', icon: 'medicine' },
  { key: 'scholarship', icon: 'book' },
  { key: 'tax', icon: 'list' },
]

const SHORTCUTS = [
  {
    to: '/dictionary',
    icon: BookOpen,
    titleKey: 'home.more.dictionary.title',
    textKey: 'home.more.dictionary.text',
    tone: 'text-berry-600',
  },
  {
    to: '/teachers',
    icon: Users,
    titleKey: 'home.more.teachers.title',
    textKey: 'home.more.teachers.text',
    tone: 'text-sun-600',
  },
]

function SectionHead({ eyebrow, heading, lead, id, tone = 'text-clay-600' }) {
  return (
    <Reveal className="mx-auto max-w-2xl space-y-3 text-center">
      <p className={`text-sm font-bold uppercase tracking-[0.14em] ${tone}`}>{eyebrow}</p>
      <h2 id={id} className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
        {heading}
      </h2>
      {lead && <p className="text-lg leading-relaxed text-muted">{lead}</p>}
    </Reveal>
  )
}

export default function Home() {
  usePageTitle(null)
  const { t, lang, isHindi } = useLanguage()

  const featured = modules[0]
  // A sample of the glossary, not the whole thing — enough to show what an
  // entry looks like without turning the home page into the dictionary.
  const sampleWords = dictionary.entries.slice(0, 12)

  const stats = [
    { value: String(modules.length), label: t('home.stat.lessons') },
    { value: String(levels.length), label: t('home.stat.levels') },
    { value: String(dictionary.entries.length), label: t('home.stat.words') },
    { value: t('home.stat.free'), label: t('home.stat.cost') },
  ]

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* The cover carries the <h1>, so this page runs at <h2> from here. */}
      <CoverHero />

      {/* A slow gradient across the whole body of the page: paper at the top,
          easing toward brand-100 by the time you reach the closing band —
          one step up the existing warm-stone ramp, not a new colour. Kept
          deliberately subtle: brand-200, the next step after that, drops
          muted text below the 4.5:1 floor, so this stops one tier short of
          costing anything. Pure background-image on a tall wrapper, not a
          scroll listener — the same visual read, with no JS and nothing to
          break under prefers-reduced-motion because nothing here moves. */}
      <div className="space-y-24 bg-gradient-to-b from-paper to-brand-100 sm:space-y-32">
      {/* ------------------------------------------------------------ numbers */}
      {/* Four facts, no container. A single hairline underneath is enough to
          close the band off. */}
      <section aria-label={t('home.topics.eyebrow')} className="-mt-10 sm:-mt-14">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-brand-100 pb-12 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-5xl font-extrabold text-ink">
                  <CountUp value={s.value} />
                </span>
                <span className="mx-auto mt-2 block max-w-[10rem] text-sm leading-snug text-muted">
                  {s.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ---------------------------------------------------------- featured */}
      {/* One lesson, opened up. A list of eleven titles tells you what is
          covered; this tells you what a lesson is actually like, which is the
          question someone deciding whether to start is really asking. */}
      <section aria-labelledby="featured-heading">
        <Reveal>
          <Link
            to={`/path/level-1/lesson/${featured.id}`}
            className="group grid gap-6 rounded-3xl border border-brand-100 bg-surface p-6 transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md sm:grid-cols-[auto_1fr] sm:p-8"
          >
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-brand-50 transition-colors group-hover:bg-clay-100">
              <ConceptIcon
                name={featured.icon}
                className="h-12 w-12 text-brand-600 transition-colors group-hover:text-clay-600"
              />
            </span>

            <span className="min-w-0">
              <span className="block text-sm font-bold uppercase tracking-[0.14em] text-clay-600">
                {t('home.featured.eyebrow')}
              </span>
              <h2
                id="featured-heading"
                className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl"
              >
                {t('home.featured.heading')}
              </h2>
              <span className="mt-3 block text-base leading-relaxed text-muted">
                {t('home.featured.text')}
              </span>
              <span className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="inline-flex items-center gap-2 font-extrabold text-ink">
                  {t('home.featured.cta')}
                  <ArrowRight
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-sm text-muted">{t('home.featured.meta')}</span>
              </span>
            </span>
          </Link>
        </Reveal>
      </section>

      {/* ------------------------------------------------------- how it works */}
      <section aria-labelledby="how-heading">
        <SectionHead
          id="how-heading"
          eyebrow={t('home.how.eyebrow')}
          heading={t('home.how.heading')}
          lead={t('home.how.lead')}
        />

        <ol className="mx-auto mt-14 grid max-w-4xl gap-12 md:grid-cols-3 md:gap-10">
          {STEPS.map(({ key, icon: Icon, tone }, i) => (
            <Reveal as="li" key={key} delay={i * 110} className="space-y-3 text-center md:text-left">
              <Icon className={`mx-auto h-8 w-8 md:mx-0 ${tone}`} aria-hidden="true" />
              {/* Hidden from assistive tech — the ordered list already announces
                  the position — but dark enough that a low-vision reader can
                  still read the order off the page. */}
              <p
                aria-hidden="true"
                className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-clay-600"
              >
                {i + 1}
              </p>
              <h3 className="text-xl font-extrabold text-ink">{t(`home.how.${key}.title`)}</h3>
              <p className="text-base leading-relaxed text-muted">
                {t(`home.how.${key}.text`, { sign: signLabel(lang) })}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ------------------------------------------------------ level chooser */}
      {/* The one place boxes stay: these are the main thing to click. */}
      <section aria-labelledby="level-heading">
        <SectionHead
          id="level-heading"
          eyebrow={t('home.level.eyebrow')}
          heading={t('home.level.heading')}
          lead={t('home.level.lead')}
          tone="text-berry-600"
        />
        <div className="mt-12 scroll-mt-24" id="levels">
          <LevelSelector headingId="level-heading" />
        </div>
      </section>

      {/* ----------------------------------------------------- built this way */}
      <section aria-labelledby="built-heading">
        <SectionHead
          id="built-heading"
          eyebrow={t('home.built.eyebrow')}
          heading={t('home.built.heading')}
        />

        <ul className="mx-auto mt-14 grid max-w-4xl gap-x-12 gap-y-12 sm:grid-cols-2">
          {BUILT.map(({ key, icon: Icon, tone }, i) => (
            <Reveal as="li" key={key} delay={i * 90} className="space-y-2">
              <Icon className={`h-7 w-7 ${tone}`} aria-hidden="true" />
              <h3 className="text-lg font-extrabold text-ink">
                {t(`home.built.${key}.title`, { signShort: signShort(lang) })}
              </h3>
              <p className="text-base leading-relaxed text-muted">{t(`home.built.${key}.text`)}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* --------------------------------------------------------- curriculum */}
      <section aria-labelledby="topics-heading">
        <SectionHead
          id="topics-heading"
          eyebrow={t('home.topics.eyebrow')}
          heading={t('home.topics.heading', { count: modules.length })}
          lead={t('home.topics.lead')}
        />

        {/* Said plainly rather than left to be discovered: the lessons
            themselves have not been translated yet, only the site around them. */}
        {isHindi && (
          <p className="mx-auto mt-8 max-w-2xl rounded-2xl bg-sun-100 px-5 py-3 text-center text-base font-bold text-sun-600">
            {t('lang.lessonNote')}
          </p>
        )}

        {/* The picture is the point: a child who cannot yet read the titles can
            still see what the course covers. */}
        <ol className="mx-auto mt-14 grid max-w-5xl gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, i) => {
            const meta = moduleMeta(m, lang)
            return (
              <Reveal
                as="li"
                key={m.id}
                // Small steps across a grid of eleven: the last card lands about
                // half a second after the first, which reads as one movement
                // rather than eleven separate ones.
                delay={Math.min(i * 45, 360)}
                className="group flex items-start gap-4"
              >
                <ConceptIcon
                  name={m.icon}
                  className="h-9 w-9 shrink-0 text-brand-600 transition-colors duration-300 group-hover:text-clay-600"
                />
                <div className="min-w-0">
                  <span
                    aria-hidden="true"
                    className="block text-xs font-extrabold uppercase tracking-[0.14em] text-clay-600"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-1 block font-extrabold leading-snug text-ink">
                    {meta.title}
                  </span>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </section>

      {/* -------------------------------------------------- what you can claim */}
      {/* A tinted full-bleed band — the one change of ground on the page, spent
          on the section most likely to change something in a real household. */}
      <section
        aria-labelledby="claim-heading"
        className="relative mx-[calc(50%-50vw)] border-y border-brand-100 bg-brand-50 px-6 py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHead
            id="claim-heading"
            eyebrow={t('home.claim.eyebrow')}
            heading={t('home.claim.heading')}
            lead={t('home.claim.lead')}
          />

          <ul className="mx-auto mt-14 grid max-w-4xl gap-x-10 gap-y-10 sm:grid-cols-2">
            {CLAIMS.map(({ key, icon }, i) => (
              <Reveal as="li" key={key} delay={i * 90} className="flex gap-4">
                <ConceptIcon name={icon} className="h-9 w-9 shrink-0 text-clay-600" />
                <div className="min-w-0">
                  <h3 className="text-lg font-extrabold text-ink">
                    {t(`home.claim.${key}.title`)}
                  </h3>
                  <p className="mt-1 text-base leading-relaxed text-muted">
                    {t(`home.claim.${key}.text`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-12 text-center">
            <Link to="/path/level-2/lesson/udid-and-benefits" className="btn-primary sm:text-lg">
              {t('home.claim.cta')}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            {/* The honesty line the schemes research insists on. */}
            <p className="mt-4 text-sm text-muted">{t('home.claim.note')}</p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------- glossary sample */}
      <section aria-labelledby="words-heading">
        <SectionHead
          id="words-heading"
          eyebrow={t('home.words.eyebrow')}
          heading={t('home.words.heading', { count: dictionary.entries.length })}
          lead={t('home.words.lead')}
        />

        <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
          {sampleWords.map((entry, i) => (
            <Reveal as="li" key={entry.id} delay={Math.min(i * 40, 320)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-surface px-4 py-2">
                <ConceptIcon name={entry.icon} className="h-5 w-5 text-clay-600" />
                <span className="text-sm font-bold text-ink">{entry.term}</span>
              </span>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 text-center">
          <Link to="/dictionary" className="btn-secondary">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
            {t('home.words.cta')}
          </Link>
        </Reveal>
      </section>

      {/* --------------------------------------------- dictionary + teachers */}
      <section aria-labelledby="more-heading">
        <h2 id="more-heading" className="sr-only">
          {t('home.more.heading')}
        </h2>
        <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {SHORTCUTS.map(({ to, icon: Icon, titleKey, textKey, tone }, i) => (
            <Reveal as="li" key={to} delay={i * 110}>
              <Link
                to={to}
                className="group flex h-full items-center gap-4 rounded-2xl border border-brand-100 bg-surface p-5 transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:shadow-sm"
              >
                <Icon className={`h-7 w-7 shrink-0 ${tone}`} aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block font-extrabold text-ink">{t(titleKey)}</span>
                  <span className="block text-sm text-muted">{t(textKey)}</span>
                </span>
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-brand-600 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
      </div>

      {/* ------------------------------------------------------- closing ask */}
      <section
        aria-labelledby="cta-heading"
        // The negative bottom margin cancels the padding at the foot of
        // <main>, so this dark band runs straight into the dark footer rather
        // than leaving a strip of paper between two dark blocks. It needs the
        // `!` because `space-y-*` on the parent sets margin-bottom:0 on every
        // child at a higher specificity, which silently eats a plain -mb-8.
        className="relative !-mb-8 mx-[calc(50%-50vw)] overflow-hidden bg-brand-900 px-6 py-20 text-center sm:py-24"
      >
        {/* A single warm glow off one corner, so the dark band has a light
            source rather than reading as a flat rectangle. Faint enough that
            white text on it stays at the measured 18:1. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(40rem 22rem at 85% -10%, rgba(196,100,58,0.22), transparent 65%), radial-gradient(32rem 20rem at 0% 110%, rgba(138,100,19,0.14), transparent 65%)',
          }}
        />

        <Reveal className="relative mx-auto max-w-2xl space-y-6">
          <h2 id="cta-heading" className="text-3xl font-extrabold text-white sm:text-4xl">
            {t('home.cta.heading')}
          </h2>
          <p className="text-lg text-brand-100">{t('home.cta.text')}</p>
          <p>
            <a
              href="#levels"
              className="btn group bg-surface text-ink hover:bg-brand-100 sm:text-lg"
            >
              {t('home.cta.button')}
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </p>
          <p className="text-sm text-brand-200">{t('home.free')}</p>
        </Reveal>
      </section>
    </div>
  )
}
