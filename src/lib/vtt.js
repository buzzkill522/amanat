/**
 * A small WebVTT reader.
 *
 * The browser already renders captions over the video. We parse the same file a
 * second time to build a readable transcript beside it, because a transcript is
 * often easier to follow than captions that disappear after two seconds — and it
 * can be scrolled back, searched and printed.
 */

function toSeconds(stamp) {
  // 00:01:02.500  or  01:02.500
  const parts = stamp.trim().split(':')
  if (parts.length < 2) return 0
  const seconds = parseFloat(parts.pop())
  const minutes = parseInt(parts.pop(), 10) || 0
  const hours = parseInt(parts.pop() ?? '0', 10) || 0
  return hours * 3600 + minutes * 60 + seconds
}

export function parseVtt(text) {
  const cues = []
  // Normalise line endings, then split into blocks separated by a blank line.
  const blocks = text.replace(/\r\n?/g, '\n').split(/\n{2,}/)

  for (const block of blocks) {
    const lines = block.split('\n').filter((l) => l.trim() !== '')
    if (!lines.length) continue
    if (lines[0].startsWith('WEBVTT') || lines[0].startsWith('NOTE')) continue

    const timingIndex = lines.findIndex((l) => l.includes('-->'))
    if (timingIndex === -1) continue

    const [rawStart, rawEnd] = lines[timingIndex].split('-->')
    // Trailing cue settings (align, line, position) sit after the end stamp.
    const end = rawEnd.trim().split(/\s+/)[0]

    const body = lines
      .slice(timingIndex + 1)
      .join('\n')
      // Strip inline markup like <v Speaker> and <c.classname>.
      .replace(/<[^>]+>/g, '')
      .trim()

    if (!body) continue

    cues.push({
      id: lines[timingIndex - 1]?.trim() || String(cues.length + 1),
      start: toSeconds(rawStart),
      end: toSeconds(end),
      text: body,
    })
  }

  return cues
}

export async function loadVtt(src, signal) {
  const res = await fetch(src, { signal })
  if (!res.ok) throw new Error(`Could not load captions (${res.status})`)
  return parseVtt(await res.text())
}

export function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}
