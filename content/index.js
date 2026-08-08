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
import schemesData from './schemes.json'

const rawModules = [m01, m02, m03, m04, m05, m06, m07, m08, m09, m10, m11]

export const modules = [...rawModules].sort((a, b) => a.order - b.order)

export const dictionary = dictionaryData

export const schemes = schemesData

/**
 * The schemes directory, grouped in the order the groups are declared.
 *
 * Grouped here rather than in the page so the order is a property of the
 * content, not of the markup: "Start here" has to come first because the UDID
 * card is what every other entry asks for, and that is a fact about the
 * schemes rather than a layout choice.
 */
export function schemesByGroup() {
  return schemes.groups
    .map((group) => ({
      ...group,
      schemes: schemes.schemes.filter((s) => s.group === group.id),
    }))
    .filter((group) => group.schemes.length > 0)
}

/** The two modules that teach this material, for linking the page to the course. */
export const SCHEME_MODULE_IDS = ['udid-and-benefits', 'schemes-school-work']

/**
 * Where a dictionary term's ISL clip lives, or null if it has not been filmed.
 *
 * Two ways to point at a clip, and the explicit one wins:
 *   1. `signVideo.src` in dictionary.json - for a clip that lives elsewhere,
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
 * Attribution is a licence condition for some sources - ISLRTC's dictionary,
 * for one - so it is resolved here rather than left to whoever adds a clip to
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

/**
 * A module JSON carries its English text as plain fields and, where a lesson
 * has been translated, a sibling `"hi"` object holding only the fields that
 * need a second language - video, icon names, ids and correctIndex are the
 * same in every language, so they are never duplicated.
 *
 * Missing per-field, exactly like the UI strings in i18n/strings.js: a
 * translated title with an untranslated summary shows the Hindi title and the
 * English summary, never a blank. A lesson with no "hi" object at all simply
 * renders in English under a Hindi interface - see `hasTranslation` below,
 * which is how the reader is told that plainly instead of silently.
 */
function localizeLevelBlock(block, lang) {
  const hi = lang === 'hi' ? block?.hi : null
  if (!hi) return block

  const questions = block.quiz?.questions?.map((q, i) => {
    const hq = hi.quiz?.questions?.[i]
    if (!hq) return q
    return {
      ...q,
      prompt: hq.prompt ?? q.prompt,
      hint: hq.hint ?? q.hint,
      image: q.image ? { ...q.image, alt: hq.image?.alt ?? q.image.alt } : q.image,
      options: q.options.map((o, oi) => ({ ...o, label: hq.options?.[oi]?.label ?? o.label })),
    }
  })

  return {
    ...block,
    title: hi.title ?? block.title,
    summary: hi.summary ?? block.summary,
    keyWords: hi.keyWords ?? block.keyWords,
    // Whole-object, not field-by-field. A folk tale half in Hindi and half in
    // English would be worse than one consistently in either - the reader
    // loses the thread mid-paragraph. Either the retelling exists or the
    // English one is shown intact.
    story: hi.story ?? block.story,
    quiz: block.quiz
      ? {
          ...block.quiz,
          title: hi.quiz?.title ?? block.quiz.title,
          questions: questions ?? block.quiz.questions,
        }
      : block.quiz,
  }
}

/** A module's own title/shortTitle (used outside any one level - the home
 * page grid, the teacher's coverage table), localized the same way. */
export function moduleMeta(m, lang) {
  const hi = lang === 'hi' ? m.translations?.hi : null
  return { title: hi?.title ?? m.title, shortTitle: hi?.shortTitle ?? m.shortTitle }
}

/** Whether this module has any Hindi text at all for this level. */
export function hasTranslation(m, levelId) {
  return Boolean(m.levels[levelId]?.hi)
}

/** Every module, in teaching order, with the content for one level merged in. */
export function getModulesForLevel(levelId, lang = 'en') {
  return modules
    .filter((m) => Boolean(m.levels[levelId]))
    .map((m, index) => {
      const meta = moduleMeta(m, lang)
      return {
        id: m.id,
        order: m.order,
        index,
        icon: m.icon,
        accent: m.accent,
        moduleTitle: meta.title,
        shortTitle: meta.shortTitle,
        translated: hasTranslation(m, levelId),
        ...localizeLevelBlock(m.levels[levelId], lang),
      }
    })
}

export function getModule(levelId, moduleId, lang = 'en') {
  return getModulesForLevel(levelId, lang).find((m) => m.id === moduleId) || null
}

/** The module before and after this one, for lesson-to-lesson navigation. */
export function getNeighbours(levelId, moduleId, lang = 'en') {
  const list = getModulesForLevel(levelId, lang)
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
