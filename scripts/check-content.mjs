#!/usr/bin/env node
// ---------------------------------------------------------------------------
// Validates everything in content/ that the app assumes but never checks.
//
//   npm run check:content
//
// The app reads these files straight into React. A wrong icon name renders a
// blank square, an out-of-range correctIndex makes a question unanswerable, and
// a missing level key crashes the lesson page. None of it is caught at build
// time, because JSON has no schema - and the people editing these files are
// educators, not developers. This is the check that stands in for that.
//
// Exits non-zero on any error, so it can gate CI.
// ---------------------------------------------------------------------------

import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const MODULE_DIR = join(root, 'content', 'modules')
const DICTIONARY = join(root, 'content', 'dictionary.json')
const SCHEMES = join(root, 'content', 'schemes.json')
const ICONS = join(root, 'src', 'components', 'icons', 'ConceptIcon.jsx')

const EXPECTED_LEVELS = ['level-1', 'level-2', 'level-3']

const errors = []
const warnings = []
const fail = (where, msg) => errors.push(`${where}: ${msg}`)
const warn = (where, msg) => warnings.push(`${where}: ${msg}`)

// --- the icon set, read from the component rather than duplicated here ------
const iconSource = readFileSync(ICONS, 'utf8')
const shapesBlock = iconSource.slice(iconSource.indexOf('const shapes = {'))
const iconNames = new Set(
  [...shapesBlock.matchAll(/^\s{2}([a-z][a-z0-9-]*):\s/gm)].map((m) => m[1]),
)
if (iconNames.size === 0) fail('ConceptIcon.jsx', 'could not read any icon names')

const checkIcon = (where, name) => {
  if (!name) return fail(where, 'missing icon')
  if (!iconNames.has(name)) fail(where, `unknown icon "${name}"`)
}

// --- shared figures ---------------------------------------------------------
// A lesson can write {figure.postMatricIncome} and have the value substituted
// from schemes.json, so a number taught in a lesson and listed on the schemes
// page cannot quietly disagree. A token with no matching figure would render
// literally to a child, so it is an error here rather than a surprise there.
let figureNames = new Set()
try {
  figureNames = new Set(Object.keys(JSON.parse(readFileSync(SCHEMES, 'utf8')).figures || {}))
} catch {
  fail('schemes.json', 'could not be read for the shared figures')
}

const checkFigures = (where, text) => {
  if (typeof text !== 'string') return
  for (const m of text.matchAll(/\{figure\.(\w+)\}/g)) {
    if (!figureNames.has(m[1])) {
      fail(where, `unknown figure "${m[1]}" - add it to "figures" in schemes.json`)
    }
  }
}

// --- modules ---------------------------------------------------------------
const files = readdirSync(MODULE_DIR).filter((f) => f.endsWith('.json')).sort()
const moduleIds = new Set()
const orders = new Map()

for (const file of files) {
  let mod
  try {
    mod = JSON.parse(readFileSync(join(MODULE_DIR, file), 'utf8'))
  } catch (e) {
    fail(file, `not valid JSON - ${e.message}`)
    continue
  }

  for (const field of ['id', 'order', 'icon', 'accent', 'title', 'shortTitle']) {
    if (mod[field] === undefined) fail(file, `missing "${field}"`)
  }
  checkIcon(file, mod.icon)

  if (moduleIds.has(mod.id)) fail(file, `duplicate module id "${mod.id}"`)
  moduleIds.add(mod.id)

  if (orders.has(mod.order)) fail(file, `order ${mod.order} already used by ${orders.get(mod.order)}`)
  orders.set(mod.order, file)

  if (!mod.levels) {
    fail(file, 'missing "levels"')
    continue
  }
  for (const key of Object.keys(mod.levels)) {
    if (!EXPECTED_LEVELS.includes(key)) fail(file, `unexpected level key "${key}"`)
  }
  for (const level of EXPECTED_LEVELS) {
    const block = mod.levels[level]
    if (!block) {
      // Not fatal - the app filters modules by level - but almost always a slip.
      warn(file, `no content for ${level}`)
      continue
    }
    const at = `${file} ${level}`

    for (const field of ['title', 'video', 'summary', 'quiz']) {
      if (block[field] === undefined) fail(at, `missing "${field}"`)
    }
    if (block.summary && !Array.isArray(block.summary)) fail(at, '"summary" is not a list')
    if (Array.isArray(block.summary) && block.summary.length === 0) fail(at, 'empty summary')
    for (const line of block.summary || []) checkFigures(`${at} summary`, line)

    // Stories are optional - the administrative modules deliberately have none
    // - but a half-written one would render as a heading over nothing.
    if (block.story) {
      const s = block.story
      if (!s.title) fail(at, 'story has no title')
      if (!s.source) fail(at, 'story has no source (which tale, and from where)')
      if (!Array.isArray(s.text) || s.text.length === 0) fail(at, 'story has no text')
      // The moral is what carries the principle across from the tale to the
      // money. A story without one is a story the lesson cannot use.
      if (!s.moral) fail(at, 'story has no moral')
    }

    if (block.video && !block.video.src) fail(at, 'video has no src')
    if (block.video?.captions?.length === 0) warn(at, 'no caption tracks')

    const questions = block.quiz?.questions
    if (!Array.isArray(questions) || questions.length === 0) {
      fail(at, 'quiz has no questions')
      continue
    }
    const qIds = new Set()
    questions.forEach((q, i) => {
      const qAt = `${at} q${i + 1}`
      if (!q.id) fail(qAt, 'missing id')
      else if (qIds.has(q.id)) fail(qAt, `duplicate question id "${q.id}"`)
      else qIds.add(q.id)

      if (!q.prompt) fail(qAt, 'missing prompt')
      checkFigures(qAt, q.prompt)
      checkFigures(qAt, q.hint)
      checkFigures(qAt, q.scenario)
      checkFigures(qAt, q.explanation)
      for (const o of q.options || []) checkFigures(qAt, o.label)
      if (q.image) {
        checkIcon(qAt + ' image', q.image.icon)
        if (!q.image.alt) fail(qAt, 'image has no alt text')
      }
      if (!Array.isArray(q.options) || q.options.length < 2) {
        fail(qAt, 'needs at least two options')
        return
      }
      q.options.forEach((o, oi) => {
        checkIcon(`${qAt} option ${oi + 1}`, o.icon)
        if (!o.label) fail(qAt, `option ${oi + 1} has no label`)
        checkFigures(qAt, o.consequence)
        if (q.scenario && (typeof o.consequence !== 'string' || !o.consequence.trim())) {
          fail(qAt, `scenario option ${oi + 1} has no consequence`)
        }
      })
      // The one that silently breaks a lesson: an answer that is not an answer.
      if (!Number.isInteger(q.correctIndex)) fail(qAt, 'correctIndex is not an integer')
      else if (q.correctIndex < 0 || q.correctIndex >= q.options.length) {
        fail(qAt, `correctIndex ${q.correctIndex} is outside 0..${q.options.length - 1}`)
      }
      if (!q.hint) warn(qAt, 'no hint - a wrong answer will have nothing to offer')
      if ('scenario' in q && (typeof q.scenario !== 'string' || !q.scenario.trim())) {
        fail(qAt, 'scenario must be non-empty text')
      }
      if (q.scenario && !q.reasoning) fail(qAt, 'scenario needs a reasoning question')
      if (q.reasoning) {
        const r = q.reasoning
        if (!q.scenario) fail(qAt, 'reasoning question needs a scenario')
        for (const field of ['prompt', 'hint', 'explanation']) {
          if (typeof r[field] !== 'string' || !r[field].trim()) fail(qAt, `reasoning missing ${field}`)
          checkFigures(`${qAt} reasoning`, r[field])
        }
        if (!Array.isArray(r.options) || r.options.length < 2) {
          fail(qAt, 'reasoning needs at least two options')
        } else {
          r.options.forEach((o, oi) => {
            checkIcon(`${qAt} reasoning option ${oi + 1}`, o.icon)
            if (!o.label) fail(qAt, `reasoning option ${oi + 1} has no label`)
            checkFigures(`${qAt} reasoning`, o.label)
          })
        }
        if (!Number.isInteger(r.correctIndex) || r.correctIndex < 0 || r.correctIndex >= (r.options?.length || 0)) {
          fail(qAt, 'reasoning correctIndex is outside its options')
        }
        if (r.reasoning) fail(qAt, 'only one reasoning stage is supported')
      }
    })
  }
}

// --- where the right answer sits --------------------------------------------
// Every question on the site once had its answer at index 0 - all 99 of them.
// A child who clicked the first option every time scored full marks and
// unlocked the whole course without reading a word, and because finishing the
// quiz is what opens the next lesson, nothing else caught it.
//
// This guards the fix. The floor is deliberately loose: real quizzes cluster a
// bit by chance, and a check that fires on ordinary variation is one people
// learn to silence. It fires on a pattern a child could actually exploit.
{
  const dist = new Map()
  let total = 0
  for (const file of files) {
    let mod
    try {
      mod = JSON.parse(readFileSync(join(MODULE_DIR, file), 'utf8'))
    } catch {
      continue
    }
    for (const block of Object.values(mod.levels || {})) {
      for (const q of block?.quiz?.questions || []) {
        if (typeof q.correctIndex !== 'number') continue
        dist.set(q.correctIndex, (dist.get(q.correctIndex) || 0) + 1)
        total++
      }
    }
  }
  if (total >= 20) {
    const [topIndex, topCount] = [...dist.entries()].sort((a, b) => b[1] - a[1])[0]
    const share = topCount / total
    const spread = [...dist.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([i, n]) => `${i}:${n}`)
      .join('  ')
    console.log(`\nAnswer positions across ${total} questions - ${spread}`)
    if (share > 0.6) {
      fail(
        'quiz answers',
        `${(share * 100).toFixed(0)}% of correct answers sit at index ${topIndex}. ` +
          'Guessing one position would pass the course - shuffle the options.',
      )
    }
  }
}

// --- dictionary ------------------------------------------------------------
let dict
try {
  dict = JSON.parse(readFileSync(DICTIONARY, 'utf8'))
} catch (e) {
  fail('dictionary.json', `not valid JSON - ${e.message}`)
}

if (dict) {
  const categories = new Set((dict.categories || []).map((c) => c.id))
  const seen = new Set()
  for (const entry of dict.entries || []) {
    const at = `dictionary "${entry.id || '?'}"`
    if (!entry.id) fail(at, 'missing id')
    else if (seen.has(entry.id)) fail(at, 'duplicate id')
    else seen.add(entry.id)

    if (!entry.term) fail(at, 'missing term')
    if (!entry.definition) fail(at, 'missing definition')
    checkIcon(at, entry.icon)
    if (entry.category && !categories.has(entry.category)) {
      fail(at, `unknown category "${entry.category}"`)
    }
    for (const ref of entry.relatedModules || []) {
      if (!moduleIds.has(ref)) fail(at, `relatedModules points at unknown module "${ref}"`)
    }
  }
}

// --- report ----------------------------------------------------------------
console.log(
  `\nChecked ${files.length} modules and ${dict?.entries?.length ?? 0} dictionary entries ` +
    `against ${iconNames.size} icons.\n`,
)
if (warnings.length) {
  console.log(`${warnings.length} warning(s):`)
  for (const w of warnings) console.log(`  ~ ${w}`)
  console.log('')
}
if (errors.length) {
  console.log(`${errors.length} error(s):`)
  for (const e of errors) console.log(`  x ${e}`)
  console.log('')
  process.exit(1)
}
console.log('No errors.\n')
