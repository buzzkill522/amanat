import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, LayoutGrid, Map as MapIcon, Unlock } from 'lucide-react'
import { useState } from 'react'
import ProgressMap from '@/components/ProgressMap.jsx'
import LessonCard from '@/components/LessonCard.jsx'
import usePageTitle from '@/hooks/usePageTitle.js'
import { useProgress } from '@/hooks/useProgress.jsx'
import { useLanguage } from '@/i18n/LanguageProvider.jsx'
import { getLevel, levels, LEGACY_TIER_IDS } from '@/config/site.js'
import { getModulesForLevel } from '@content/index.js'

export default function LearningPath() {
  const { levelId } = useParams()
  const level = getLevel(levelId)
  const [view, setView] = useState('map')
  const { isCompleted, isUnlocked, levelStats, settings, setSetting } = useProgress()
  const { lang } = useLanguage()

  usePageTitle(level ? `${level.label} - ${level.name}` : 'Lessons')

  // An old age-band bookmark lands on the level that replaced it.
  const legacyId = LEGACY_TIER_IDS[levelId]
  if (legacyId) return <Navigate to={`/path/${legacyId}`} replace />
  if (!level) return <Navigate to="/" replace />

  const modules = getModulesForLevel(levelId, lang)
  const stats = levelStats(levelId)

  const stateOf = (moduleId) => {
    if (isCompleted(levelId, moduleId)) return 'completed'
    return isUnlocked(levelId, moduleId) ? 'open' : 'locked'
  }

  return (
    <div className="space-y-8">
      <Link to="/" className="btn-secondary">
        <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        Back to home
      </Link>

      <header>
        <h1 className="text-4xl font-extrabold text-ink">
          {level.label} - {level.name}
        </h1>
        <p className="mt-2 text-lg text-muted">{level.blurb}</p>
      </header>

      {/* View switch. Some children read a map better; some read a list better. */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-2" role="group" aria-label="Choose how the lessons are shown">
          <button
            type="button"
            onClick={() => setView('map')}
            aria-pressed={view === 'map'}
            className={view === 'map' ? 'btn-primary' : 'btn-secondary'}
          >
            <MapIcon className="h-5 w-5" aria-hidden="true" />
            Journey map
          </button>
          <button
            type="button"
            onClick={() => setView('list')}
            aria-pressed={view === 'list'}
            className={view === 'list' ? 'btn-primary' : 'btn-secondary'}
          >
            <LayoutGrid className="h-5 w-5" aria-hidden="true" />
            Simple list
          </button>
        </div>

        <label className="checkbox-row ml-auto rounded-2xl border-2 border-brand-200 bg-surface px-4 py-2">
          <input
            type="checkbox"
            checked={settings.unlockAll}
            onChange={(e) => setSetting('unlockAll', e.target.checked)}
            className="checkbox-lg"
          />
          <span className="flex items-center gap-2 text-sm font-bold text-ink">
            <Unlock className="h-5 w-5 text-brand-600" aria-hidden="true" />
            Open every lesson (for teachers)
          </span>
        </label>
      </div>

      {view === 'map' ? (
        <ProgressMap modules={modules} levelId={levelId} stateOf={stateOf} stats={stats} />
      ) : (
        <section aria-labelledby="list-heading">
          <h2 id="list-heading" className="mb-4 text-2xl font-extrabold text-ink">
            All lessons - {stats.done} of {stats.total} done
          </h2>
          <ol className="space-y-4">
            {modules.map((module, i) => (
              <li key={module.id}>
                <LessonCard
                  module={module}
                  levelId={levelId}
                  state={stateOf(module.id)}
                  stepNumber={i + 1}
                />
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Changing level mid-way should be one tap, not a trip home - and it
          should read as a normal thing to do, not as being moved down a set. */}
      <section aria-labelledby="switch-heading" className="rounded-3xl bg-brand-50 p-6">
        <h2 id="switch-heading" className="text-lg font-extrabold text-ink">
          Too easy, or too hard?
        </h2>
        <p className="mt-1 text-base text-muted">
          Move up or down. The eleven topics are the same at every level.
        </p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {levels
            .filter((l) => l.id !== levelId)
            .map((l) => (
              <li key={l.id}>
                <Link to={`/path/${l.id}`} className="btn-secondary">
                  {l.step < level.step ? '↓' : '↑'} {l.label} - {l.name}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </div>
  )
}
