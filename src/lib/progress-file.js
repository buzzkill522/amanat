import { LEGACY_TIER_IDS, levels } from '../config/site.js'

export const emptyState = { version: 2, levels: {}, settings: { unlockAll: false, captionsOn: true, playbackRate: 1 } }
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value)
const levelIds = new Set(levels.map(level => level.id))
const date = value => typeof value === 'string' && Number.isFinite(Date.parse(value))

export function normalizeProgress(parsed) {
  if (!object(parsed) || ![1, 2].includes(parsed.version)) return null
  const records = parsed.version === 1 ? parsed.tiers : parsed.levels
  if (!object(records) || (parsed.settings !== undefined && !object(parsed.settings))) return null
  const result = { version: 2, levels: {}, settings: { ...emptyState.settings } }
  for (const [id, entries] of Object.entries(records)) {
    const levelId = parsed.version === 1 ? LEGACY_TIER_IDS[id] : id
    if (!levelIds.has(levelId) || !object(entries)) return null
    result.levels[levelId] = {}
    for (const [moduleId, record] of Object.entries(entries)) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(moduleId) || !object(record) || typeof record.completed !== 'boolean') return null
      if (record.completedAt !== undefined && !date(record.completedAt)) return null
      if (record.quiz != null && (!object(record.quiz) || !Number.isInteger(record.quiz.score) || !Number.isInteger(record.quiz.total) || record.quiz.score < 0 || record.quiz.score > record.quiz.total)) return null
      result.levels[levelId][moduleId] = { completed: record.completed, ...(record.completedAt ? { completedAt: record.completedAt } : {}), quiz: record.quiz ? { score: record.quiz.score, total: record.quiz.total } : null }
    }
  }
  const settings = parsed.settings || {}
  for (const key of ['unlockAll', 'captionsOn']) {
    if (settings[key] !== undefined && typeof settings[key] !== 'boolean') return null
    if (settings[key] !== undefined) result.settings[key] = settings[key]
  }
  if (settings.playbackRate !== undefined) {
    if (![0.5, 0.75, 1, 1.25, 1.5].includes(settings.playbackRate)) return null
    result.settings.playbackRate = settings.playbackRate
  }
  const visit = parsed.lastVisited
  if (object(visit) && levelIds.has(visit.levelId) && typeof visit.moduleId === 'string' && ['watch', 'read', 'answer'].includes(visit.step) && date(visit.at)) result.lastVisited = { levelId: visit.levelId, moduleId: visit.moduleId, step: visit.step, at: visit.at }
  return result
}

export function previewProgress(raw) {
  let parsed
  try { parsed = JSON.parse(raw) } catch { return { ok: false, reason: 'parse' } }
  const state = normalizeProgress(parsed)
  if (!state) return { ok: false, reason: 'format' }
  const entries = Object.values(state.levels)
  return { ok: true, state, levels: entries.length, done: entries.flatMap(level => Object.values(level)).filter(record => record.completed).length }
}
