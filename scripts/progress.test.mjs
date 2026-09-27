import test from 'node:test'
import assert from 'node:assert/strict'
import { emptyState, normalizeProgress, previewProgress } from '../src/lib/progress-file.js'

test('round trips completion, preferences and the last lesson step', () => {
  const state = { ...emptyState, levels: { 'level-1': { 'what-is-money': { completed: true, completedAt: '2026-09-20T09:00:00.000Z', quiz: { score: 2, total: 3 } } } }, lastVisited: { levelId: 'level-2', moduleId: 'saving-vs-spending', step: 'read', at: '2026-09-20T10:00:00.000Z' } }
  const result = previewProgress(JSON.stringify(state))
  assert.equal(result.ok, true)
  assert.deepEqual(result.state, state)
  assert.equal(result.done, 1)
})
test('migrates all three legacy age bands without losing completion', () => {
  const entry = { 'what-is-money': { completed: true } }
  const state = normalizeProgress({ version: 1, tiers: { '7-9': entry, '10-12': entry, '13-15': entry } })
  assert.deepEqual(Object.keys(state.levels), ['level-1', 'level-2', 'level-3'])
  assert.equal(state.levels['level-3']['what-is-money'].completed, true)
})
test('rejects malformed imports before any state is replaced', () => {
  for (const state of [null, [], { version: 3 }, { version: 2, levels: null }, { version: 2, levels: [] }, { ...emptyState, settings: { unlockAll: 'yes' } }, { ...emptyState, levels: { 'level-1': { topic: null } } }, { ...emptyState, levels: { 'level-1': { topic: { completed: 'true' } } } }]) {
    assert.equal(previewProgress(JSON.stringify(state)).ok, false)
  }
  assert.equal(previewProgress('broken json').reason, 'parse')
})
test('does not accept invalid scores or executable object keys', () => {
  assert.equal(previewProgress(JSON.stringify({ ...emptyState, levels: { 'level-1': { topic: { completed: true, quiz: { score: 4, total: 3 } } } } })).ok, false)
  assert.equal(previewProgress('{"version":2,"levels":{"__proto__":{}}}').ok, false)
})
test('ignores a malformed optional bookmark while retaining valid progress', () => {
  assert.deepEqual(normalizeProgress({ ...emptyState, lastVisited: { levelId: 'unknown' } }), emptyState)
})
