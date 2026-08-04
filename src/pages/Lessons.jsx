import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import LevelSelector from '@/components/LevelSelector.jsx'
import ConceptIcon from '@/components/icons/ConceptIcon.jsx'
import usePageTitle from '@/hooks/usePageTitle.js'
import { useProgress } from '@/hooks/useProgress.jsx'
import { useLanguage } from '@/i18n/LanguageProvider.jsx'
import { getLevel } from '@/config/site.js'
import { modules, moduleMeta } from '@content/index.js'

/**
 * The Lessons tab.
 *
 * Lessons are organised by level, so the honest landing page for "Lessons" is
 * the level chooser — the same component the home page uses, so a learner sees
 * one consistent way of picking a level rather than two designs for one job.
 *
 * A learner mid-course gets their resume link first, because "show me the
 * lessons" almost always means "take me back to the one I was on".
 */
export default function Lessons() {
  const { t, lang } = useLanguage()
  const { resumePoint } = useProgress()

  usePageTitle(t('lessons.title'))

  const resume = resumePoint()
  const resumeLevel = resume ? getLevel(resume.levelId) : null

  return (
    <div className="space-y-14">
      <header className="mx-auto max-w-2xl space-y-3 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-clay-600">
          {t('lessons.eyebrow')}
        </p>
        <h1 className="text-4xl font-extrabold leading-tight text-ink">{t('lessons.heading')}</h1>
        <p className="text-lg leading-relaxed text-muted">{t('lessons.lead')}</p>
      </header>

      {/* Straight back to the lesson in progress, before asking anyone to
          choose a level they have already chosen. */}
      {resume?.next && resumeLevel && (
        <Link
          to={`/path/${resume.levelId}/lesson/${resume.next.id}`}
          className="group mx-auto flex max-w-3xl items-center gap-4 rounded-3xl border-2 border-grow-500 bg-surface p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-grow-100">
            <ConceptIcon name={resume.next.icon} className="h-9 w-9 text-grow-600" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold uppercase tracking-[0.14em] text-grow-600">
              {t('home.resume.eyebrow')}
            </span>
            <span className="mt-1 block text-lg font-extrabold text-ink">
              {t('home.resume.lesson', {
                n: resume.next.number,
                title: resume.next.moduleTitle,
              })}
            </span>
            <span className="mt-0.5 block text-sm text-muted">
              {t('home.resume.progress', {
                done: resume.done,
                total: resume.total,
                level: `${resumeLevel.label} — ${resumeLevel.name}`,
              })}
            </span>
          </span>
          <ArrowRight
            className="h-6 w-6 shrink-0 text-grow-600 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      )}

      {/* ------------------------------------------------------ level chooser */}
      <section aria-labelledby="levels-heading">
        <h2 id="levels-heading" className="mb-2 text-center text-2xl font-extrabold text-ink">
          {t('lessons.levels.heading')}
        </h2>
        <p className="mb-8 text-center text-base text-muted">{t('lessons.levels.lead')}</p>
        <LevelSelector headingId="levels-heading" />
      </section>

      {/* ---------------------------------------------------------- the topics */}
      {/* The same eleven topics run through every level, so they are listed
          once here rather than repeated inside each level's card. */}
      <section aria-labelledby="topics-heading">
        <h2 id="topics-heading" className="mb-2 text-center text-2xl font-extrabold text-ink">
          {t('lessons.topics.heading', { count: modules.length })}
        </h2>
        <p className="mb-8 text-center text-base text-muted">{t('lessons.topics.lead')}</p>

        <ol className="mx-auto grid max-w-4xl gap-x-8 gap-y-6 sm:grid-cols-2">
          {modules.map((m, i) => {
            const meta = moduleMeta(m, lang)
            return (
              <li key={m.id} className="flex items-start gap-3">
                <ConceptIcon name={m.icon} className="h-8 w-8 shrink-0 text-brand-600" />
                <span className="min-w-0">
                  <span
                    aria-hidden="true"
                    className="block text-xs font-extrabold uppercase tracking-[0.14em] text-clay-600"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-0.5 block font-bold leading-snug text-ink">{meta.title}</span>
                </span>
              </li>
            )
          })}
        </ol>
      </section>
    </div>
  )
}
