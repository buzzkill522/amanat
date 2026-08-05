import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, ExternalLink, Info } from 'lucide-react'
import ConceptIcon from '@/components/icons/ConceptIcon.jsx'
import usePageTitle from '@/hooks/usePageTitle.js'
import { schemes, schemesByGroup } from '@content/index.js'

/**
 * The schemes directory.
 *
 * Deliberately outside the lesson sequence. The rest of the site unlocks one
 * lesson at a time, which is right for teaching but wrong for this: a family
 * who needs to know whether their child can get a funded cochlear implant
 * before their fifth birthday cannot be told to finish nine lessons first. The
 * two lessons that teach this material (10 and 11) still sit in the course and
 * still unlock in order - this page is the reference they point at, open to
 * anyone at any time.
 *
 * It is also the one page here written for an adult as much as a child. The
 * language stays plain, but the content is administrative by nature: income
 * limits, portals, closing dates. A ten-year-old reads the first line of each
 * card; the person who fills the form reads the rest.
 *
 * Three rules the content follows, all of them in schemes.json rather than
 * here, so they survive an edit to this file:
 *
 *   1. Every figure carries a source and the month it was checked.
 *   2. Every entry that has a catch says so in the same card, not in a
 *      footnote. The pension entry says outright that most Deaf people will
 *      not meet the 80% national threshold, because a page that only lists
 *      what exists sends families to be refused at a counter.
 *   3. What is deliberately absent is listed too, with the reason - Niramaya
 *      most of all, since it is widely mis-cited as available to Deaf people
 *      and is not.
 */

const ACCENTS = {
  clay: {
    chip: 'border-clay-500 bg-clay-100 text-clay-600',
    icon: 'text-clay-600',
  },
  grow: {
    chip: 'border-grow-500 bg-grow-100 text-grow-600',
    icon: 'text-grow-600',
  },
  berry: {
    chip: 'border-berry-500 bg-berry-100 text-berry-600',
    icon: 'text-berry-600',
  },
  sun: {
    chip: 'border-sun-500 bg-sun-100 text-sun-600',
    icon: 'text-sun-600',
  },
  brand: {
    chip: 'border-brand-500 bg-brand-100 text-brand-700',
    icon: 'text-brand-600',
  },
}

function SchemeCard({ scheme, accent }) {
  const tone = ACCENTS[accent] || ACCENTS.brand

  return (
    <article className="card p-5 sm:p-6" aria-labelledby={`scheme-${scheme.id}`}>
      <div className="flex flex-wrap items-start gap-4">
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 ${tone.chip}`}
        >
          <ConceptIcon name={scheme.icon} className="h-9 w-9" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 id={`scheme-${scheme.id}`} className="text-2xl font-extrabold leading-tight text-ink">
            {scheme.name}
          </h3>
          {scheme.fullName && (
            <p className="mt-0.5 text-sm font-bold text-muted">{scheme.fullName}</p>
          )}
        </div>
      </div>

      {/* The one line a child reads. Everything below it is for whoever fills
          in the form. */}
      <p className="mt-4 text-lg font-bold leading-relaxed text-ink">{scheme.oneLine}</p>

      {scheme.why && (
        <p className="mt-3 rounded-2xl bg-brand-50 p-4 text-base leading-relaxed text-ink">
          {scheme.why}
        </p>
      )}

      <dl className="mt-5 space-y-4">
        <div>
          <dt className="text-sm font-extrabold uppercase tracking-[0.14em] text-muted">
            How much
          </dt>
          <dd className="mt-1 text-base leading-relaxed text-ink">{scheme.amount}</dd>
        </div>

        <div>
          <dt className="text-sm font-extrabold uppercase tracking-[0.14em] text-muted">Who</dt>
          <dd className="mt-1">
            <ul className="space-y-1.5">
              {scheme.who.map((line) => (
                <li key={line} className="flex gap-2 text-base leading-relaxed text-ink">
                  <span aria-hidden="true" className={`font-extrabold ${tone.icon}`}>
                    ·
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </dd>
        </div>

        <div>
          <dt className="text-sm font-extrabold uppercase tracking-[0.14em] text-muted">
            How to apply
          </dt>
          <dd className="mt-1 text-base leading-relaxed text-ink">
            <p>{scheme.apply.text}</p>
            {/* A full-size target rather than a link inside the sentence.
                WCAG 2.5.8 exempts inline links, but this is the one control on
                the card somebody actually presses, often on a shared tablet,
                and the rest of this site holds 44px everywhere. */}
            <p className="mt-3">
              <a
                href={scheme.apply.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target gap-2 rounded-xl border-2 border-brand-400 px-4 py-2 font-bold text-brand-700 transition hover:bg-brand-50"
              >
                {new URL(scheme.apply.url).hostname.replace(/^www\./, '')}
                <ExternalLink className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </p>
          </dd>
        </div>
      </dl>

      {/* Warnings sit in the card, not in a footnote. A catch a family only
          finds at the counter is a catch this page failed to tell them. */}
      {scheme.caveats?.length > 0 && (
        <div className="mt-5 rounded-2xl border-2 border-sun-500 bg-sun-100 p-4">
          <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.14em] text-sun-600">
            <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
            Worth knowing
          </p>
          <ul className="mt-2 space-y-2">
            {scheme.caveats.map((c) => (
              <li key={c} className="text-base leading-relaxed text-ink">
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Every figure on the card is only as good as where it came from, so
          the sources are a real part of it rather than a footnote - and they
          are tappable at full size like everything else here. */}
      <div className="mt-5 border-t-2 border-brand-100 pt-4">
        <p className="text-sm font-bold text-muted">
          Checked {schemes.checkedOn}. Check against the source before acting on a figure:
        </p>
        <ul className="mt-1 flex flex-wrap gap-2">
          {scheme.sources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target rounded-xl px-3 py-2 text-sm text-muted underline decoration-1 underline-offset-2 transition hover:bg-brand-50 hover:text-brand-700"
              >
                {s.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function Schemes() {
  usePageTitle('Schemes and what you can claim')

  const groups = schemesByGroup()

  return (
    <div className="space-y-14">
      <header className="mx-auto max-w-2xl space-y-3 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-clay-600">
          Know what you are owed
        </p>
        <h1 className="text-4xl font-extrabold leading-tight text-ink">
          Schemes you may already be entitled to
        </h1>
        <p className="text-lg leading-relaxed text-muted">
          Being Deaf costs money that hearing people never spend. These exist to offset that, not
          to give anyone an advantage. Most go unclaimed simply because nobody knew about them.
        </p>
      </header>

      {/* Said before anything else, because the whole page keys off one card. */}
      <section
        aria-labelledby="first-heading"
        className="mx-auto max-w-3xl rounded-3xl border-2 border-clay-500 bg-clay-100 p-6"
      >
        <h2
          id="first-heading"
          className="flex items-center gap-2 text-xl font-extrabold text-clay-600"
        >
          <Info className="h-6 w-6 shrink-0" aria-hidden="true" />
          Get the UDID card first
        </h2>
        <p className="mt-2 text-base leading-relaxed text-ink">
          Almost every scheme below asks for it. Without it, most of this page is closed; with it,
          most of it opens. It is free, and it is the single most useful thing on this page.
        </p>
      </section>

      {groups.map((group) => (
        <section key={group.id} aria-labelledby={`group-${group.id}`}>
          <h2
            id={`group-${group.id}`}
            className="mb-6 text-center text-2xl font-extrabold text-ink"
          >
            {group.label}
          </h2>
          <div className="space-y-6">
            {group.schemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} accent={group.accent} />
            ))}
          </div>
        </section>
      ))}

      {/* ------------------------------------------------- deliberately absent */}
      <section aria-labelledby="absent-heading" className="rounded-3xl bg-brand-50 p-6">
        <h2 id="absent-heading" className="text-2xl font-extrabold text-ink">
          What is not on this page, and why
        </h2>
        <p className="mt-2 text-base leading-relaxed text-muted">
          A list that only says what exists is not much use. These are the things you may read
          about elsewhere and wonder why they are missing.
        </p>
        <dl className="mt-5 space-y-5">
          {schemes.notCovered.map((item) => (
            <div key={item.name}>
              <dt className="text-lg font-extrabold text-ink">{item.name}</dt>
              <dd className="mt-1 text-base leading-relaxed text-ink">
                {item.reason}{' '}
                {item.source && (
                  <a
                    href={item.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-brand-700 underline decoration-2 underline-offset-2"
                  >
                    {item.source.label}
                  </a>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ------------------------------------------------------ back to the course */}
      <section
        aria-labelledby="course-heading"
        className="rounded-3xl border-2 border-brand-200 bg-surface p-6 text-center"
      >
        <h2 id="course-heading" className="text-2xl font-extrabold text-ink">
          These are taught in the course too
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-base leading-relaxed text-muted">
          This page is the reference. Lessons 10 and 11 are where the same material is taught
          properly, at your level, with the reasoning behind it and a quiz at the end.
        </p>
        <p className="mt-5">
          <Link to="/lessons" className="btn-primary">
            Go to the lessons
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </p>
      </section>

      {/* The honesty line the schemes research insists on. */}
      <p className="mx-auto max-w-3xl rounded-2xl border-2 border-brand-200 p-5 text-center text-sm leading-relaxed text-muted">
        Rules and amounts change, and most of these are revised every year. Every figure here was
        checked in {schemes.checkedOn} and carries the source it came from - check it against that
        source before acting on it. Nothing here is financial or legal advice, and nobody who wrote
        it is a licensed adviser or a lawyer.
      </p>
    </div>
  )
}
