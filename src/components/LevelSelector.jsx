import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ConceptIcon from '@/components/icons/ConceptIcon.jsx'
import { levels, LEVEL_COUNT } from '@/config/site.js'
import { useProgress } from '@/hooks/useProgress.jsx'
import { useT } from '@/i18n/LanguageProvider.jsx'

const ACCENTS = {
  grow: {
    border: 'border-grow-500',
    icon: 'text-grow-600',
    bar: 'bg-grow-500',
    meter: 'bg-grow-500',
  },
  brand: {
    border: 'border-brand-500',
    icon: 'text-brand-700',
    bar: 'bg-brand-500',
    meter: 'bg-brand-500',
  },
  berry: {
    border: 'border-berry-500',
    icon: 'text-berry-600',
    bar: 'bg-berry-500',
    meter: 'bg-berry-500',
  },
}

/**
 * How hard this level is, as filled blocks out of three.
 *
 * The number and the name already say it in words; this says it again without
 * any, which is the whole point on a site read by children who may be some way
 * behind their age in written English. It is decoration for a screen reader -
 * the level's name carries the same fact in the link label.
 */
function DifficultyMeter({ step, fill }) {
  return (
    <span aria-hidden="true" className="flex items-center gap-1.5">
      {Array.from({ length: LEVEL_COUNT }, (_, i) => (
        <span
          key={i}
          className={`h-2.5 w-7 rounded-full ${i < step ? fill : 'bg-brand-100'}`}
        />
      ))}
    </span>
  )
}

/**
 * Choose a level. Each choice is a big picture, a number, a short sentence and
 * a difficulty meter, so a child can pick without an adult reading it to them.
 */
export default function LevelSelector({ headingId }) {
  const { levelStats } = useProgress()
  const t = useT()

  return (
    <ul className="grid gap-5 sm:grid-cols-3" aria-labelledby={headingId}>
      {levels.map((level) => {
        const accent = ACCENTS[level.accent] || ACCENTS.brand
        const stats = levelStats(level.id)
        const started = stats.done > 0
        const name = t(`level.${level.id}.name`)
        const blurb = t(`level.${level.id}.blurb`)
        const done = t('level.doneOf', { done: stats.done, total: stats.total })

        return (
          <li key={level.id}>
            <Link
              to={`/path/${level.id}`}
              className={`flex h-full flex-col items-center gap-3 rounded-3xl border-2 bg-surface p-7 text-center transition hover:-translate-y-1 hover:shadow-lg ${accent.border}`}
              aria-label={`${t('level.label', { n: level.step })} - ${name}. ${blurb} ${done}`}
            >
              {/* The icon carries the accent colour on its own - a tinted tile
                  behind it was one container too many. */}
              <ConceptIcon name={level.icon} className={`h-16 w-16 ${accent.icon}`} />

              <span className="text-3xl font-extrabold text-ink">
                {t('level.label', { n: level.step })}
              </span>
              <span className="text-base font-bold uppercase tracking-wide text-muted">{name}</span>

              <DifficultyMeter step={level.step} fill={accent.meter} />

              <span className="text-lg leading-snug text-ink">{blurb}</span>

              {started && (
                <span className="mt-auto w-full pt-2">
                  <span className="mb-1 block text-sm font-bold text-muted">{done}</span>
                  <span className="block h-3 w-full overflow-hidden rounded-full bg-brand-100">
                    <span
                      className={`block h-full rounded-full ${accent.bar}`}
                      style={{ width: `${stats.percent}%` }}
                    />
                  </span>
                </span>
              )}

              <span className="btn-primary mt-auto w-full justify-center">
                {started ? t('level.keepGoing') : t('level.start')}
                <ArrowRight className="h-6 w-6" aria-hidden="true" />
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
