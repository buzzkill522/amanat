import { useCallback, useEffect, useId, useRef, useState } from 'react'
import {
  Captions,
  CaptionsOff,
  Gauge,
  Hand,
  Maximize,
  Pause,
  Play,
  RotateCcw,
  Rewind,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { formatTime } from '@/lib/vtt.js'
import { signLabel, signShort } from '@/config/site.js'
import { useLanguage } from '@/i18n/LanguageProvider.jsx'

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5]

/**
 * The lesson video, built for children who cannot rely on the soundtrack.
 *
 * Deliberate choices:
 *  - Never autoplays. Nothing starts making sound on its own.
 *  - Captions are ON the first time, and the choice is remembered.
 *  - A region is reserved for the sign-language interpreter even before the
 *    clip exists, so the layout never jumps when the real video arrives.
 *  - Controls are always visible. They do not fade out, because a child
 *    hunting for the pause button should never have to guess where it went.
 *  - Every control has a text label next to the icon, not just a tooltip.
 */
export default function VideoPlayer({
  video,
  title,
  captionsOn,
  onCaptionsChange,
  playbackRate = 1,
  onPlaybackRateChange,
  onTimeUpdate,
  seekRequest,
}) {
  const { lang, t } = useLanguage()
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [activeTrack, setActiveTrack] = useState(0)
  const [showSign, setShowSign] = useState(true)
  const [signLarge, setSignLarge] = useState(false)
  const [error, setError] = useState(null)

  const speedId = useId()
  const trackId = useId()
  const statusId = useId()

  const tracks = video.captions || []
  const interpreterSrc = video.signInterpreter?.src || null

  // --- Caption tracks -------------------------------------------------------
  // React renders <track> elements, but their on/off state lives on the DOM
  // TextTrack objects, so it has to be applied imperatively after mount.
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const textTracks = el.textTracks
    for (let i = 0; i < textTracks.length; i += 1) {
      textTracks[i].mode = captionsOn && i === activeTrack ? 'showing' : 'disabled'
    }
  }, [captionsOn, activeTrack, tracks.length])

  useEffect(() => {
    const el = videoRef.current
    if (el) el.playbackRate = playbackRate
  }, [playbackRate])

  // Let the transcript drive the video. `seekRequest` carries a nonce so that
  // clicking the same transcript line twice still moves the playhead.
  useEffect(() => {
    const el = videoRef.current
    if (el && Number.isFinite(seekRequest?.time)) {
      el.currentTime = seekRequest.time
    }
  }, [seekRequest])

  const togglePlay = useCallback(() => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      el.play().catch(() => setError(t('video.playError')))
    } else {
      el.pause()
    }
  }, [])

  const replay = useCallback(() => {
    const el = videoRef.current
    if (!el) return
    el.currentTime = 0
    el.play().catch(() => {})
  }, [])

  const back10 = useCallback(() => {
    const el = videoRef.current
    if (el) el.currentTime = Math.max(0, el.currentTime - 10)
  }, [])

  const handleTimeUpdate = () => {
    const el = videoRef.current
    if (!el) return
    setCurrentTime(el.currentTime)
    onTimeUpdate?.(el.currentTime)
  }

  const goFullscreen = () => {
    const el = videoRef.current?.parentElement
    if (el?.requestFullscreen) el.requestFullscreen().catch(() => {})
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  return (
    <section className="card overflow-hidden" aria-label={t('video.watchLabel', { title })}>
      {/* ---------------- Video stage ---------------- */}
      <div className="relative bg-stage-deep">
        <video
          ref={videoRef}
          /* `text-stage-ink` is for the fallback line below, which a browser
             that cannot play the video renders in place of it - against the
             black box, where the inherited `ink` would have been dark-on-dark
             and unreadable in the light theme. It is the message aimed at the
             oldest, least capable devices, so it is the one that has to be
             legible without anyone checking. */
          className="aspect-video w-full bg-black text-stage-ink"
          poster={video.poster || undefined}
          preload="metadata"
          playsInline
          /* No autoPlay, and no muted-autoplay trick. Playback is always a
             deliberate choice made by the child or the teacher. */
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
          onError={() => setError(t('video.notAvailable'))}
          onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        >
          <source src={video.src} type="video/mp4" />
          {tracks.map((t, i) => (
            <track
              key={t.src + i}
              kind="captions"
              src={t.src}
              srcLang={t.srclang}
              label={t.label}
            />
          ))}
          {t('video.unsupported')}
        </video>

        {/* ---------------- Sign-language interpreter region ----------------
            Reserved even when the clip does not exist yet, so teachers can see
            exactly where it will sit and the layout never shifts later. */}
        {showSign && (
          <div
            className={`absolute bottom-3 right-3 overflow-hidden rounded-2xl border-4 border-white shadow-lg ${
              signLarge ? 'w-1/2 max-w-xs' : 'w-1/3 max-w-[10rem]'
            }`}
          >
            {interpreterSrc ? (
              <video
                className="aspect-square w-full bg-stage object-cover"
                src={interpreterSrc}
                muted
                playsInline
                preload="metadata"
                aria-label={t('video.interpreterAria', { sign: signLabel(lang) })}
              />
            ) : (
              <div className="flex aspect-square w-full flex-col items-center justify-center gap-1 bg-stage p-2 text-center">
                <Hand className="h-7 w-7 text-stage-ink" aria-hidden="true" />
                <p className="text-xs font-bold leading-tight text-stage-ink">
                  {t('video.signVideoLabel', { signShort: signShort(lang) })}
                </p>
                <p className="text-[0.65rem] leading-tight text-stage-muted">{t('video.comingSoon')}</p>
              </div>
            )}
          </div>
        )}

        {error && (
          <p
            role="alert"
            className="absolute inset-x-3 top-3 rounded-xl bg-alert-500 px-4 py-3 text-sm font-bold text-white"
          >
            {error}
          </p>
        )}
      </div>

      {/* ---------------- Controls ----------------
          Always visible. Icon plus word on every button. */}
      <div className="space-y-4 border-t-2 border-brand-100 bg-surface p-4">
        {/* Seek bar */}
        <div className="flex items-center gap-3">
          <span className="w-12 shrink-0 text-sm font-bold tabular-nums text-muted">
            {formatTime(currentTime)}
          </span>
          <div className="relative flex-1">
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.5}
              value={currentTime}
              onChange={(e) => {
                const t = Number(e.target.value)
                setCurrentTime(t)
                if (videoRef.current) videoRef.current.currentTime = t
              }}
              aria-label={t('video.seekAria')}
              aria-valuetext={t('video.seekValueText', {
                current: formatTime(currentTime),
                duration: formatTime(duration),
              })}
              className="h-11 w-full cursor-pointer accent-brand-600"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-1 h-1 rounded bg-brand-100"
            >
              <div className="h-full rounded bg-brand-500" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
          <span className="w-12 shrink-0 text-right text-sm font-bold tabular-nums text-muted">
            {formatTime(duration)}
          </span>
        </div>

        {/* Big primary buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={togglePlay} className="btn-primary text-lg" aria-describedby={statusId}>
            {isPlaying ? (
              <Pause className="h-7 w-7" aria-hidden="true" />
            ) : (
              <Play className="h-7 w-7" aria-hidden="true" />
            )}
            {isPlaying ? t('video.pause') : t('video.play')}
          </button>

          <button type="button" onClick={back10} className="btn-secondary">
            <Rewind className="h-6 w-6" aria-hidden="true" />
            {t('video.back10')}
          </button>

          <button type="button" onClick={replay} className="btn-secondary">
            <RotateCcw className="h-6 w-6" aria-hidden="true" />
            {t('video.restart')}
          </button>

          {/* State is announced in text, not only by the icon swap. */}
          <p id={statusId} className="sr-only" role="status">
            {isPlaying ? t('video.playing') : t('video.paused')}
          </p>
        </div>

        {/* Accessibility controls */}
        <div className="flex flex-wrap items-center gap-3 border-t-2 border-brand-50 pt-4">
          <button
            type="button"
            onClick={() => onCaptionsChange(!captionsOn)}
            aria-pressed={captionsOn}
            className={
              captionsOn
                ? 'btn bg-grow-500 text-white hover:bg-grow-700'
                : 'btn border-2 border-muted bg-surface text-ink hover:bg-brand-50'
            }
          >
            {captionsOn ? (
              <Captions className="h-6 w-6" aria-hidden="true" />
            ) : (
              <CaptionsOff className="h-6 w-6" aria-hidden="true" />
            )}
            {captionsOn ? t('video.captionsOn') : t('video.captionsOff')}
          </button>

          {tracks.length > 1 && (
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <label htmlFor={trackId} className="text-sm font-bold text-ink">
                {t('video.captionWords')}
              </label>
              <select
                id={trackId}
                value={activeTrack}
                onChange={(e) => setActiveTrack(Number(e.target.value))}
                className="tap-target max-w-full rounded-xl border-2 border-brand-200 bg-surface px-3 py-2 font-bold text-ink"
              >
                {tracks.map((t, i) => (
                  <option key={t.src + i} value={i}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <label htmlFor={speedId} className="flex items-center gap-1 text-sm font-bold text-ink">
              <Gauge className="h-5 w-5" aria-hidden="true" />
              {t('video.speed')}
            </label>
            <select
              id={speedId}
              value={playbackRate}
              onChange={(e) => onPlaybackRateChange(Number(e.target.value))}
              className="tap-target rounded-xl border-2 border-brand-200 bg-surface px-3 py-2 font-bold text-ink"
            >
              {SPEEDS.map((s) => (
                <option key={s} value={s}>
                  {s === 1 ? t('video.speedNormal') : `${s}x`}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => setShowSign((v) => !v)}
            aria-pressed={showSign}
            className={
              showSign
                ? 'btn bg-berry-500 text-white hover:bg-berry-700'
                : 'btn border-2 border-muted bg-surface text-ink hover:bg-brand-50'
            }
          >
            <Hand className="h-6 w-6" aria-hidden="true" />
            {t(showSign ? 'video.signPanelOn' : 'video.signPanelOff', { signShort: signShort(lang) })}
          </button>

          {showSign && (
            <button type="button" onClick={() => setSignLarge((v) => !v)} className="btn-secondary">
              {signLarge ? t('video.smallerPanel') : t('video.biggerPanel')}
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              const el = videoRef.current
              if (el) el.muted = !el.muted
            }}
            aria-pressed={muted}
            className="btn-secondary"
          >
            {muted ? (
              <VolumeX className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Volume2 className="h-6 w-6" aria-hidden="true" />
            )}
            {muted ? t('video.soundOff') : t('video.soundOn')}
          </button>

          <button type="button" onClick={goFullscreen} className="btn-secondary">
            <Maximize className="h-6 w-6" aria-hidden="true" />
            {t('video.fullscreen')}
          </button>
        </div>
      </div>
    </section>
  )
}
