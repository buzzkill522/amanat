import { Link } from 'react-router-dom'
import { Video } from 'lucide-react'
import ConceptIcon from '@/components/icons/ConceptIcon.jsx'
import SignClipPlaceholder from '@/components/SignClipPlaceholder.jsx'
import { dictionary, signClipCredit, signClipSrc } from '@content/index.js'
import { signLanguage } from '@/config/site.js'

const ACCENTS = {
  grow: 'border-grow-500 bg-grow-100 text-grow-600',
  brand: 'border-brand-500 bg-brand-100 text-brand-700',
  sun: 'border-sun-500 bg-sun-100 text-sun-600',
  berry: 'border-berry-500 bg-berry-100 text-berry-600',
}

/**
 * One word in the money dictionary.
 *
 * Three ways in, on purpose: the signed clip, the picture, and a plain-language
 * definition with a real example. A child who does not know the written word
 * can still find the meaning from the picture and the sign.
 *
 * @param {number} headingLevel - entries sit directly under the page h1, so the
 *                                term is an h2 by default. Heading levels must
 *                                never skip (WCAG 1.3.1).
 */
export default function SignDictionaryEntry({ entry, headingLevel = 2 }) {
  const Heading = `h${Math.min(headingLevel, 6)}`
  const category = dictionary.categories.find((c) => c.id === entry.category)
  const accent = ACCENTS[category?.accent] || ACCENTS.brand
  // Resolved from the recorded-clip manifest, so a new file in public/sign/
  // appears here after `npm run sign:sync` with no change to this component.
  const clipSrc = signClipSrc(entry)
  const credit = clipSrc ? signClipCredit(entry) : null

  return (
    <article
      className="card flex flex-col gap-4 p-5 sm:flex-row"
      aria-labelledby={`term-${entry.id}`}
    >
      {/* Signed clip, or a clearly marked space for one. */}
      <div className="shrink-0 sm:w-52">
        {clipSrc ? (
          <video
            className="aspect-square w-full rounded-2xl border-2 border-brand-200 bg-stage-deep object-cover"
            src={clipSrc}
            poster={entry.signVideo?.poster || undefined}
            controls
            // A sign clip carries no sound, and looping lets a child watch the
            // handshape again without hunting for the replay button.
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={`${signLanguage.label} sign for ${entry.term}`}
          />
        ) : null}

        {credit && (
          // Small, but present on every clip: attribution is a condition of
          // use for some sources, not a courtesy.
          <p className="mt-2 text-xs leading-snug text-muted">
            {credit.href ? (
              <a
                href={credit.href}
                className="underline decoration-1 underline-offset-2 hover:text-brand-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                {credit.text}
              </a>
            ) : (
              credit.text
            )}
          </p>
        )}

        {!clipSrc && (
          <SignClipPlaceholder label={`${signLanguage.short} clip not filmed yet`} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 ${accent}`}>
            <ConceptIcon name={entry.icon} className="h-8 w-8" />
          </span>
          <Heading id={`term-${entry.id}`} className="text-2xl font-extrabold text-ink">
            {entry.term}
          </Heading>
          {category && (
            <span className={`rounded-full border-2 px-3 py-1 text-xs font-extrabold uppercase ${accent}`}>
              {category.label}
            </span>
          )}
          {!clipSrc && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800">
              <Video className="h-4 w-4" aria-hidden="true" />
              No video yet
            </span>
          )}
        </div>

        <p className="mt-3 text-lg leading-relaxed text-ink">{entry.definition}</p>

        {entry.example && (
          <p className="mt-2 rounded-2xl bg-brand-50 p-3 text-base text-ink">
            <span className="font-extrabold">Example: </span>
            {entry.example}
          </p>
        )}

        {entry.relatedModules?.length > 0 && (
          <p className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="font-bold text-muted">Used in:</span>
            {entry.relatedModules.map((moduleId) => (
              <Link
                key={moduleId}
                to={`/path/10-12/lesson/${moduleId}`}
                className="tap-target rounded-xl bg-surface px-3 py-1 font-bold text-brand-700 underline decoration-2 underline-offset-2 hover:bg-brand-50"
              >
                {moduleId.replace(/-/g, ' ')}
              </Link>
            ))}
          </p>
        )}
      </div>
    </article>
  )
}
