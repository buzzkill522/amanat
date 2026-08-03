#!/usr/bin/env node
// ---------------------------------------------------------------------------
// Scans public/sign/ for recorded ISL clips, writes content/sign-clips.json,
// and prints what is still missing.
//
//   node scripts/sign-clips.mjs          report + write the manifest
//   node scripts/sign-clips.mjs --check  report only, exit 1 if any are missing
//   node scripts/sign-clips.mjs --links  print a lookup link per missing term
//
// The manifest exists so the dictionary page does not have to fire a request
// per term to discover which clips are there. Drop a file in, run this, done —
// no JSON editing per entry.
// ---------------------------------------------------------------------------

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, extname, basename } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const CLIP_DIR = join(root, 'public', 'sign')
const DICTIONARY = join(root, 'content', 'dictionary.json')
const MANIFEST = join(root, 'content', 'sign-clips.json')
const SOURCES = join(root, 'content', 'sign-sources.json')

// Ordered by preference: if both exist for one term, the first wins.
const EXTENSIONS = ['.mp4', '.webm', '.mov']

const checkOnly = process.argv.includes('--check')
const showLinks = process.argv.includes('--links')

// Resolved source pages, one per term, in content/sign-sources.json. Where a
// term has no entry the fallback is a search link, so the list is still usable
// for a source that file does not cover.
const sources = existsSync(SOURCES) ? JSON.parse(readFileSync(SOURCES, 'utf8')) : {}

const SEARCH = (term) =>
  `https://spreadthesign.com/en.in/search/?q=${encodeURIComponent(term.toLowerCase())}`

function lookup(id, term) {
  const entry = sources[id]
  if (!entry) return { url: SEARCH(term), flag: '' }
  if (entry.url) return { url: entry.url, flag: entry.confidence === 'sense' ? 'CHECK SENSE' : '' }
  return { url: entry.nearest || SEARCH(term), flag: 'NO ENTRY' }
}

const dictionary = JSON.parse(readFileSync(DICTIONARY, 'utf8'))
const terms = dictionary.entries.map((e) => ({ id: e.id, term: e.term }))

if (!existsSync(CLIP_DIR)) mkdirSync(CLIP_DIR, { recursive: true })

const files = readdirSync(CLIP_DIR).filter((f) => EXTENSIONS.includes(extname(f).toLowerCase()))

const clips = {}
for (const { id } of terms) {
  for (const ext of EXTENSIONS) {
    const match = files.find((f) => f.toLowerCase() === `${id}${ext}`)
    if (match) {
      clips[id] = match
      break
    }
  }
}

const missing = terms.filter((t) => !clips[t.id])
const known = new Set(terms.map((t) => t.id))
const orphans = files.filter((f) => !known.has(basename(f, extname(f)).toLowerCase()))

const found = terms.length - missing.length
console.log(`\nISL dictionary clips: ${found} of ${terms.length} recorded\n`)

if (missing.length) {
  console.log(showLinks ? 'Still to source — save each one as <id>.mp4:' : 'Still to add:')
  for (const t of missing) {
    if (!showLinks) {
      console.log(`  ${t.id.padEnd(20)} ${t.term}`)
      continue
    }
    const { url, flag } = lookup(t.id, t.term)
    console.log(`  ${t.id.padEnd(20)} ${flag.padEnd(11)} ${url}`)
    const note = sources[t.id]?.note
    if (note) console.log(`  ${''.padEnd(20)} ${''.padEnd(11)} ↳ ${note}`)
  }
  console.log('')
  if (showLinks) {
    const none = Object.values(sources).filter((s) => s && s.confidence === 'none').length
    const sense = Object.values(sources).filter((s) => s && s.confidence === 'sense').length
    console.log(
      `CHECK SENSE = several signs share the spelling, pick deliberately (${sense}).\n` +
        `NO ENTRY    = not in the Indian Sign Language section; the link is a related\n` +
        `              word for reference only, never a substitute (${none}).\n`,
    )
  }
}

if (orphans.length) {
  console.log('Files in public/sign/ that match no dictionary term (check the name):')
  for (const f of orphans) console.log(`  ${f}`)
  console.log('')
}

if (!checkOnly && !showLinks) {
  const payload = {
    // Written by scripts/sign-clips.mjs. Do not edit by hand.
    dir: '/sign',
    clips,
  }
  writeFileSync(MANIFEST, `${JSON.stringify(payload, null, 2)}\n`)
  console.log(`Wrote ${MANIFEST.replace(root, '.')}\n`)
}

if (checkOnly && missing.length) process.exit(1)
