// Central content loader.
// To add a lesson: create the JSON file in ./modules and add it to this list.

import m01 from './modules/01-what-is-money.json'
import m02 from './modules/02-saving-vs-spending.json'
import m03 from './modules/03-needs-vs-wants.json'
import m04 from './modules/04-simple-budgeting.json'
import m05 from './modules/05-how-banks-work.json'
import m06 from './modules/06-earning-money.json'
import m07 from './modules/07-interest-and-growth.json'
import m08 from './modules/08-staying-safe.json'
import m09 from './modules/09-mutual-funds.json'
import m10 from './modules/10-udid-and-benefits.json'
import m11 from './modules/11-schemes-school-work.json'
import dictionaryData from './dictionary.json'
import signClipManifest from './sign-clips.json'

const rawModules = [m01, m02, m03, m04, m05, m06, m07, m08, m09, m10, m11]

export const modules = [...rawModules].sort((a, b) => a.order - b.order)

export const dictionary = dictionaryData

/**
 * Where a dictionary term's ISL clip lives, or null if it has not been filmed.
 *
 * Two ways to point at a clip, and the explicit one wins:
 *   1. `signVideo.src` in dictionary.json — for a clip that lives elsewhere,
 *      or is named differently.
 *   2. A file at `public/sign/<entry id>.mp4`, picked up by
 *      `npm run sign:sync`. This is the normal path: a recording session
 *      produces 30 files named after the ids, and nobody edits JSON.
 */
export function signClipSrc(entry) {
  if (entry?.signVideo?.src) return entry.signVideo.src
  const file = signClipManifest.clips[entry?.id]
  return file ? `${signClipManifest.dir}/${file}` : null
}

/**
 * The credit line to show under a term's clip, or null if none is needed.
 *
 * Attribution is a licence condition for some sources — ISLRTC's dictionary,
 * for one — so it is resolved here rather than left to whoever adds a clip to
 * remember. A clip may carry its own credit; otherwise the dictionary-wide one
 * applies to every clip that does not.
 */
export function signClipCredit(entry) {
  if (entry?.signVideo?.credit) return entry.signVideo.credit
  const fallback = dictionary.signVideoCredit
  if (!fallback?.text || !fallback.appliesToUnattributed) return null
  return { text: fallback.text, href: fallback.href || null }
}

/** How many terms have a clip. Shown to teachers so the gap is not hidden. */
export function signClipCoverage() {
  const total = dictionary.entries.length
  const done = dictionary.entries.filter((e) => signClipSrc(e)).length
  return { done, total, complete: done === total }
}

/** Every module, in teaching order, with the content for one level merged in. */
export function getModulesForLevel(levelId) {
  return modules
    .filter((m) => Boolean(m.levels[levelId]))
    .map((m, index) => ({
      id: m.id,
      order: m.order,
      index,
      icon: m.icon,
      accent: m.accent,
      moduleTitle: m.title,
      shortTitle: m.shortTitle,
      ...m.levels[levelId],
    }))
}

export function getModule(levelId, moduleId) {
  return getModulesForLevel(levelId).find((m) => m.id === moduleId) || null
}

/** The module before and after this one, for lesson-to-lesson navigation. */
export function getNeighbours(levelId, moduleId) {
  const list = getModulesForLevel(levelId)
  const i = list.findIndex((m) => m.id === moduleId)
  if (i === -1) return { previous: null, next: null }
  return {
    previous: i > 0 ? list[i - 1] : null,
    next: i < list.length - 1 ? list[i + 1] : null,
  }
}

export function getDictionaryEntriesForModule(moduleId) {
  return dictionary.entries.filter((e) => e.relatedModules?.includes(moduleId))
}
