import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getModulesForLevel } from '@content/index.js'
import { LEGACY_TIER_IDS } from '@/config/site.js'

const STORAGE_KEY = 'amanat.progress.v1'

// The site was called Paisa Path until August 2026. A child who used it before
// the rename still has their eight lessons recorded under the old key, so it is
// read once and carried across. Renaming a storage key without this is a silent
// wipe of somebody's work.
const LEGACY_STORAGE_KEY = 'paisa-path.progress.v1'

const emptyState = {
  version: 2,
  levels: {},
  settings: {
    // When on, every lesson is reachable straight away. Useful for a teacher
    // who wants to jump to one topic in class.
    unlockAll: false,
    captionsOn: true,
    playbackRate: 1,
  },
}

/**
 * v1 stored progress under age-band keys (`tiers: { "7-9": … }`). Those bands
 * are now difficulty levels, so a returning child would otherwise open the site
 * to an empty map and have to redo eight lessons. Carry it across instead.
 */
function migrateV1(parsed) {
  const levels = {}
  for (const [oldId, record] of Object.entries(parsed.tiers || {})) {
    const newId = LEGACY_TIER_IDS[oldId]
    if (newId) levels[newId] = record
  }
  return { ...emptyState, levels, settings: { ...emptyState.settings, ...parsed.settings } }
}

function read() {
  try {
    // Current key first; only fall back to the pre-rename one, so a device that
    // has already migrated never re-reads stale data.
    const raw =
      window.localStorage.getItem(STORAGE_KEY) ||
      window.localStorage.getItem(LEGACY_STORAGE_KEY)
    if (!raw) return emptyState
    const parsed = JSON.parse(raw)
    if (parsed?.version === 1) return migrateV1(parsed)
    if (parsed?.version !== 2) return emptyState
    return { ...emptyState, ...parsed, settings: { ...emptyState.settings, ...parsed.settings } }
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
      setSetting,

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
    }),
    [state, storageBlocked, markComplete, clearModule, resetLevel, resetAll, setSetting],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside <ProgressProvider>')
  return ctx
}

export { STORAGE_KEY }
