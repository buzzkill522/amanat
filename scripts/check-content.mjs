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
      })
      // The one that silently breaks a lesson: an answer that is not an answer.
      if (typeof q.correctIndex !== 'number') fail(qAt, 'correctIndex is not a number')
      else if (q.correctIndex < 0 || q.correctIndex >= q.options.length) {
        fail(qAt, `correctIndex ${q.correctIndex} is outside 0..${q.options.length - 1}`)
      }
      if (!q.hint) warn(qAt, 'no hint - a wrong answer will have nothing to offer')
    })
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
