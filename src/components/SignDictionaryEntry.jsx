import { Link } from 'react-router-dom'
import { Video } from 'lucide-react'
import ConceptIcon from '@/components/icons/ConceptIcon.jsx'
import SignClipPlaceholder from '@/components/SignClipPlaceholder.jsx'
import { dictionary, modules, moduleMeta, signClipCredit, signClipSrc } from '@content/index.js'
import { levels, signLabel, signShort } from '@/config/site.js'
import { useProgress } from '@/hooks/useProgress.jsx'
import { useLanguage } from '@/i18n/LanguageProvider.jsx'

const ACCENTS = {
  grow: 'border-grow-500 bg-grow-100 text-grow-600',
  brand: 'border-brand-500 bg-brand-100 text-brand-700',
  sun: 'border-sun-500 bg-sun-100 text-sun-600',
  berry: 'border-berry-500 bg-berry-100 text-berry-600',
}

/**
 * Where a "used in" link should actually go.
 *
 * These links used to be hardcoded to `/path/10-12/lesson/{id}`. `10-12` is a
 * retired age-band id, so every one of them went through the legacy redirect
 * in Lesson.jsx and landed in level-2 - whatever the reader's actual level,
 * and whatever they had unlocked.
 *
 * Level-2 unlocks strictly linearly, so for a new reader exactly one module in
 * it is open. Measured against the current dictionary: 27 of the 44 links
 * pointed at a padlock. The dictionary is a reference page that sits outside
 * the unlock sequence, so a reader can easily arrive here having completed
 * nothing at all, which is the case that broke.
 *
 * Now: take the first level on the ladder where this module exists and the
 * reader has it open. If none is open, fall back to that level's lesson list
 * rather than the lesson itself - the list is never locked, and it shows the
 * lesson in context with its padlock and what has to be done first, which is
 * an answer. A bare padlock screen is not.
 */
function usedInTarget(moduleId, isUnlocked, lang) {
  const module = modules.find((m) => m.id === moduleId)
  if (!module) return null

  const present = levels.filter((level) => module.levels?.[level.id])
  if (!present.length) return null

  const open = present.find((level) => isUnlocked(level.id, moduleId))
  const level = open || present[0]

  return {
    title: moduleMeta(module, lang).title,
    to: open ? `/path/${level.id}/lesson/${moduleId}` : `/path/${level.id}`,
  }
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
  const { isUnlocked } = useProgress()
  // `signLabel(lang)` and not `signLanguage.label`. The second is the English
  // fallback in site.js, so the sign language's own name stayed "Indian Sign
  // Language" on a Hindi page even once everything around it was translated.
  const { lang, t } = useLanguage()
  const signVars = { sign: signLabel(lang), signShort: signShort(lang) }
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
            aria-label={t('dict.signAria', { ...signVars, term: entry.term })}
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
          <SignClipPlaceholder label={t('dict.clipNotFilmed', signVars)} />
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
              {t('dict.noVideoYet')}
            </span>
          )}
        </div>

        <p className="mt-3 text-lg leading-relaxed text-ink">{entry.definition}</p>

        {entry.example && (
          <p className="mt-2 rounded-2xl bg-brand-50 p-3 text-base text-ink">
            <span className="font-extrabold">{t('dict.example')} </span>
            {entry.example}
          </p>
        )}

        {entry.relatedModules?.length > 0 && (
          <p className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="font-bold text-muted">{t('dict.usedIn')}</span>
            {entry.relatedModules.map((moduleId) => {
              const target = usedInTarget(moduleId, isUnlocked, lang)
              // A related id that no longer matches a module is dropped rather
              // than rendered as a dead link. check-content already fails the
              // build on one, so this only guards against a stale cache.
              if (!target) return null
              return (
                <Link
                  key={moduleId}
                  to={target.to}
                  className="tap-target rounded-xl bg-surface px-3 py-1 font-bold text-brand-700 underline decoration-2 underline-offset-2 hover:bg-brand-50"
                >
                  {/* The lesson's real title, not the id. This printed
                      `moduleId.replace(/-/g, ' ')`, so a reader saw the slug -
                      "how banks work" rather than "Why Open a Bank Account" -
                      and in Hindi saw English either way. moduleMeta gives the
                      translated title where one exists. */}
                  {target.title}
                </Link>
              )
            })}
          </p>
        )}
      </div>
    </article>
  )
}
