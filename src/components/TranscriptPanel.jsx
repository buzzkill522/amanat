import { useEffect, useMemo, useRef, useState } from 'react'
import { FileText, Search } from 'lucide-react'
import { loadVtt, formatTime } from '@/lib/vtt.js'
import { useT } from '@/i18n/LanguageProvider.jsx'

/**
 * A full, scrollable transcript beside the video.
 *
 * Captions vanish. A transcript does not: it can be re-read at the reader's own
 * pace, searched, and used by a teacher to prepare. Clicking a line jumps the
 * video to that moment. The line playing right now is marked with a coloured
 * bar AND a bold left border AND the word "now" - never colour alone.
 */
export default function TranscriptPanel({ tracks = [], currentTime = 0, onSeek }) {
  const t = useT()
  const [trackIndex, setTrackIndex] = useState(0)
  const [cues, setCues] = useState([])
  const [status, setStatus] = useState('loading')
  const [query, setQuery] = useState('')
  const [follow, setFollow] = useState(true)
  const activeRef = useRef(null)

  const track = tracks[trackIndex]

  useEffect(() => {
    if (!track) {
      setStatus('empty')
      return undefined
    }
    const controller = new AbortController()
    setStatus('loading')
    loadVtt(track.src, controller.signal)
      .then((parsed) => {
        setCues(parsed)
        setStatus(parsed.length ? 'ready' : 'empty')
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setStatus('error')
      })
    return () => controller.abort()
  }, [track])

  const activeCueId = useMemo(() => {
    const cue = cues.find((c) => currentTime >= c.start && currentTime < c.end)
    return cue?.id ?? null
  }, [cues, currentTime])

  useEffect(() => {
    if (follow && activeRef.current) {
      activeRef.current.scrollIntoView({ block: 'nearest' })
    }
  }, [activeCueId, follow])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return cues
    return cues.filter((c) => c.text.toLowerCase().includes(q))
  }, [cues, query])

  return (
    <section className="card flex h-full flex-col overflow-hidden" aria-labelledby="transcript-heading">
      <div className="space-y-3 border-b-2 border-brand-100 bg-brand-50 p-4">
        <h2 id="transcript-heading" className="flex items-center gap-2 text-lg font-extrabold text-brand-800">
          <FileText className="h-6 w-6" aria-hidden="true" />
          {t('transcript.heading')}
        </h2>

        {tracks.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="transcript-track" className="text-sm font-bold text-ink">
              {t('transcript.version')}
            </label>
            <select
              id="transcript-track"
              value={trackIndex}
              onChange={(e) => setTrackIndex(Number(e.target.value))}
              className="tap-target rounded-xl border-2 border-brand-200 bg-surface px-3 py-2 text-sm font-bold"
            >
              {tracks.map((t, i) => (
                <option key={t.src + i} value={i}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center gap-2 rounded-xl border-2 border-brand-200 bg-surface px-3">
          <Search className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
          <label htmlFor="transcript-search" className="sr-only">
            {t('transcript.searchLabel')}
          </label>
          <input
            id="transcript-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('transcript.searchPlaceholder')}
            className="min-h-tap w-full bg-transparent py-2 text-base outline-none"
          />
        </div>

        <label className="checkbox-row text-sm font-bold text-ink">
          <input
            type="checkbox"
            checked={follow}
            onChange={(e) => setFollow(e.target.checked)}
            className="checkbox-lg"
          />
          {t('transcript.followVideo')}
        </label>
      </div>

      <div className="max-h-[28rem] flex-1 overflow-y-auto p-2 lg:max-h-none">
        {status === 'loading' && <p className="p-4 text-muted">{t('transcript.loading')}</p>}
        {status === 'error' && (
          <p role="alert" className="p-4 font-bold text-alert-600">
            {t('transcript.error')}
          </p>
        )}
        {status === 'empty' && <p className="p-4 text-muted">{t('transcript.empty')}</p>}

        {status === 'ready' && visible.length === 0 && (
          <p className="p-4 text-muted">{t('transcript.noMatch', { query })}</p>
        )}

        {status === 'ready' && (
          <ol className="space-y-1">
            {visible.map((cue) => {
              const isActive = cue.id === activeCueId
              return (
                <li key={cue.id} ref={isActive ? activeRef : null}>
                  <button
                    type="button"
                    onClick={() => onSeek?.(cue.start)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`flex w-full min-h-tap gap-3 rounded-xl border-l-8 p-3 text-left transition ${
                      isActive
                        ? 'border-grow-500 bg-grow-100 font-bold text-ink'
                        : 'border-transparent hover:bg-brand-50'
                    }`}
                  >
                    <span className="shrink-0 text-sm font-bold tabular-nums text-brand-700">
                      {formatTime(cue.start)}
                    </span>
                    <span className="flex-1 whitespace-pre-line">{cue.text}</span>
                    {isActive && (
                      <span className="shrink-0 rounded-lg bg-grow-500 px-2 py-0.5 text-xs font-extrabold uppercase text-white">
                        {t('transcript.now')}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ol>
        )}
      </div>
    </section>
  )
}
