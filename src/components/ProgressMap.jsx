import { Link } from 'react-router-dom'
import { Check, Lock, Play } from 'lucide-react'
import ConceptIcon from '@/components/icons/ConceptIcon.jsx'

const NODE_TONE = {
  locked: 'border-brand-200 bg-brand-50 text-muted',
  open: 'border-brand-600 bg-surface text-brand-700 hover:bg-brand-50',
  completed: 'border-grow-500 bg-grow-100 text-grow-600 hover:bg-grow-100',
}

/**
 * The journey map: the eight lessons drawn as a path with a stop at each one.
 *
 * It is a real ordered list underneath, so a screen reader hears "1 of 8" and
 * keyboard users tab through it in teaching order. The zig-zag and the joining
 * line are decoration layered on top and are hidden from assistive tech.
 */
export default function ProgressMap({ modules, levelId, stateOf, stats }) {
  return (
    <section aria-labelledby="map-heading">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 id="map-heading" className="text-2xl font-extrabold text-ink">
          Your journey
        </h2>

        <div className="flex items-center gap-3">
          <p className="text-base font-bold text-ink">
            {stats.done} of {stats.total} lessons done
          </p>
          <div
            className="h-5 w-40 overflow-hidden rounded-full border-2 border-brand-200 bg-surface"
            role="progressbar"
            aria-valuenow={stats.done}
            aria-valuemin={0}
            aria-valuemax={stats.total}
            aria-valuetext={`${stats.done} of ${stats.total} lessons done`}
          >
            <div
              className="h-full rounded-full bg-grow-500 transition-all"
              style={{ width: `${stats.percent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="relative">
        {/* The path itself. Decoration only. */}
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-8 top-8 w-1 rounded bg-brand-100 md:left-1/2 md:-translate-x-1/2"
        />

        <ol className="relative space-y-6">
          {modules.map((module, i) => {
            const state = stateOf(module.id)
            const locked = state === 'locked'
            const side = i % 2 === 0

            const node = (
              <span
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 shadow-sm ${NODE_TONE[state]}`}
              >
                <ConceptIcon name={module.icon} className="h-9 w-9" />
              </span>
            )

            const label = (
              <span className="min-w-0">
                <span className="flex items-center gap-2">
                  <span className="text-sm font-extrabold uppercase tracking-wide text-muted">
                    Stop {i + 1}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-extrabold uppercase ${
                      locked
                        ? 'bg-brand-100 text-muted'
                        : state === 'completed'
                          ? 'bg-grow-500 text-white'
                          : 'bg-brand-600 text-surface'
                    }`}
                  >
                    {locked ? (
                      <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : state === 'completed' ? (
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Play className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {locked ? 'Locked' : state === 'completed' ? 'Done' : 'Open'}
                  </span>
                </span>
                <span className={`block text-lg font-extrabold ${locked ? 'text-muted' : 'text-ink'}`}>
                  {module.moduleTitle}
                </span>
              </span>
            )

            const rowClass = `relative flex items-center gap-4 rounded-3xl border-2 p-3 md:w-[calc(50%-2rem)] ${
              locked ? 'border-transparent' : 'border-transparent hover:border-brand-200 hover:bg-surface'
            } ${side ? 'md:ml-auto md:flex-row-reverse md:text-right' : ''}`

            return (
              <li key={module.id} className="relative">
                {locked ? (
                  <div className={rowClass} aria-disabled="true">
                    {node}
                    {label}
                    <span className="sr-only">
                      Locked. Finish stop {i} to open this lesson.
                    </span>
                  </div>
                ) : (
                  <Link
                    to={`/path/${levelId}/lesson/${module.id}`}
                    className={rowClass}
                    aria-label={`Stop ${i + 1}, ${module.moduleTitle}, ${
                      state === 'completed' ? 'done' : 'open'
                    }`}
                  >
                    {node}
                    {label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
