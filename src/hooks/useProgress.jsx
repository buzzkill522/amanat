import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getModulesForLevel } from '@content/index.js'
import { emptyState, normalizeProgress, previewProgress } from '@/lib/progress-file.js'

const STORAGE_KEY = 'amanat.progress.v1'

// The site was called Paisa Path until August 2026. A child who used it before
// the rename still has their eight lessons recorded under the old key, so it is
// read once and carried across. Renaming a storage key without this is a silent
// wipe of somebody's work.
const LEGACY_STORAGE_KEY = 'paisa-path.progress.v1'

function read() {
  try {
    // Current key first; only fall back to the pre-rename one, so a device that
    // has already migrated never re-reads stale data.
    const raw =
      window.localStorage.getItem(STORAGE_KEY) ||
      window.localStorage.getItem(LEGACY_STORAGE_KEY)
    if (!raw) return emptyState
    return normalizeProgress(JSON.parse(raw)) ?? emptyState
  } catch {
    // Private browsing, a full disk, or hand-edited JSON. Losing progress is
    // annoying but must never stop the lesson from loading.
    return emptyState
  }
}

function write(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [state, setState] = useState(read)
  const [storageBlocked, setStorageBlocked] = useState(false)
  const recordVisit = useCallback((levelId, moduleId, step) => {
    setState(prev => {
      const last = prev.lastVisited
      if (last?.levelId === levelId && last.moduleId === moduleId && last.step === step) return prev
      return { ...prev, lastVisited: { levelId, moduleId, step, at: new Date().toISOString() } }
    })
  }, [])

  useEffect(() => {
    if (!write(state)) setStorageBlocked(true)
  }, [state])

  // Keep two tabs, or two tablets sharing a profile, in step.
  useEffect(() => {
    function onStorage(event) {
      if (event.key === STORAGE_KEY) setState(read())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const markComplete = useCallback((levelId, moduleId, quizResult = null) => {
    setState((prev) => ({
      ...prev,
      levels: {
        ...prev.levels,
        [levelId]: {
          ...prev.levels[levelId],
          [moduleId]: {
            completed: true,
            completedAt: new Date().toISOString(),
            quiz: quizResult,
          },
        },
      },
    }))
  }, [])

  const clearModule = useCallback((levelId, moduleId) => {
    setState((prev) => {
      const level = { ...(prev.levels[levelId] || {}) }
      delete level[moduleId]
      return { ...prev, levels: { ...prev.levels, [levelId]: level } }
    })
  }, [])

  const resetLevel = useCallback((levelId) => {
    setState((prev) => ({ ...prev, levels: { ...prev.levels, [levelId]: {} } }))
  }, [])

  const resetAll = useCallback(() => setState({ ...emptyState }), [])

  /**
   * The other half of "Save progress to a file" on the Teachers page.
   *
   * A shared school tablet has one localStorage, not one per child, so the
   * only way a device can hold *this* child's progress for *this* session is
   * to load it in from the file "Save progress to a file" produced earlier -
   * and to fully replace whatever is on the device now, the same way turning
   * a save file over to a different machine does. Merging the two would leave
   * the device carrying a mix of two children's lessons under one record,
   * which is worse than either child's progress alone.
   *
   * Returns rather than throws, because the caller needs to tell a teacher
   * *what* was wrong with a file, not just that something was - this is a
   * teacher acting on a file they got from a child or another tablet, not a
   * developer who can read a stack trace.
   */
  const importState = useCallback((raw) => {
    const result = previewProgress(raw)
    if (!result.ok) return result
    setState(result.state)
    return { ok: true }
  }, [])

  const setSetting = useCallback((key, value) => {
    setState((prev) => ({ ...prev, settings: { ...prev.settings, [key]: value } }))
  }, [])

  const value = useMemo(
    () => ({
      state,
      settings: state.settings,
      storageBlocked,
      markComplete,
      clearModule,
      resetLevel,
      resetAll,
      importState,
      setSetting,
      recordVisit,

      isCompleted: (levelId, moduleId) => Boolean(state.levels[levelId]?.[moduleId]?.completed),

      moduleRecord: (levelId, moduleId) => state.levels[levelId]?.[moduleId] || null,

      /**
       * A lesson opens when it is the first one, when the lesson before it is
       * finished, or when a teacher has switched "open all lessons" on.
       */
      isUnlocked: (levelId, moduleId) => {
        if (state.settings.unlockAll) return true
        const list = getModulesForLevel(levelId)
        const index = list.findIndex((m) => m.id === moduleId)
        if (index <= 0) return true
        return Boolean(state.levels[levelId]?.[list[index - 1].id]?.completed)
      },

      levelStats: (levelId) => {
        const list = getModulesForLevel(levelId)
        const done = list.filter((m) => state.levels[levelId]?.[m.id]?.completed).length
        return {
          done,
          total: list.length,
          percent: list.length ? Math.round((done / list.length) * 100) : 0,
        }
      },

      /**
       * Where a returning learner should pick up: the level they were last
       * active in, and the first lesson there they have not finished.
       *
       * "Last active" is the most recent completedAt across every level, not
       * simply the first level with any progress - someone who did three
       * lessons at Level 1 and then moved up to Level 2 should come back to
       * Level 2, which is where they actually were.
       *
       * ISO-8601 strings sort lexicographically in timestamp order, so they
       * can be compared directly without parsing to Date.
       *
       * Returns null when nothing has been completed anywhere. That is the
       * honest answer for a first visit, and the caller shows the normal
       * "start here" path instead of an empty resume card.
       */
      resumePoint: (lang = 'en') => {
        let levelId = null
        let latest = null

        for (const [id, modules] of Object.entries(state.levels || {})) {
          for (const record of Object.values(modules || {})) {
            if (record?.completed && record.completedAt && record.completedAt > (latest ?? '')) {
              latest = record.completedAt
              levelId = id
            }
          }
        }
        const visit = state.lastVisited
        const visitedList = visit ? getModulesForLevel(visit.levelId, lang) : []
        const visitedIndex = visitedList.findIndex(m => m.id === visit?.moduleId)
        const visitAllowed = visitedIndex >= 0 && (visitedIndex === 0 || state.settings.unlockAll || state.levels[visit.levelId]?.[visitedList[visitedIndex - 1].id]?.completed)
        if (visitAllowed && visit.at >= (latest ?? '')) levelId = visit.levelId
        if (!levelId) return null

        const list = getModulesForLevel(levelId, lang)
        const done = list.filter((m) => state.levels[levelId]?.[m.id]?.completed).length
        // The first unfinished lesson, which is also the only unlocked one.
        const resumeVisit = visitAllowed && visit.levelId === levelId && visit.at >= (latest ?? '') && !state.levels[levelId]?.[visit.moduleId]?.completed
        const nextIndex = resumeVisit ? visitedIndex : list.findIndex((m) => !state.levels[levelId]?.[m.id]?.completed)

        return {
          levelId,
          completedAt: latest,
          done,
          total: list.length,
          step: resumeVisit ? visit.step : 'watch',
          // null once every lesson in this level is finished.
          next: nextIndex === -1 ? null : { ...list[nextIndex], number: nextIndex + 1 },
        }
      },
    }),
    [state, storageBlocked, markComplete, clearModule, resetLevel, resetAll, importState, setSetting, recordVisit],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside <ProgressProvider>')
  return ctx
}

export { STORAGE_KEY }
