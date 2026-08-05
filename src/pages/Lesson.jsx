import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ListChecks } from 'lucide-react'
import VideoPlayer from '@/components/VideoPlayer.jsx'
import TranscriptPanel from '@/components/TranscriptPanel.jsx'
import VisualQuiz from '@/components/VisualQuiz.jsx'
import Celebration from '@/components/Celebration.jsx'
import ConceptIcon from '@/components/icons/ConceptIcon.jsx'
import usePageTitle from '@/hooks/usePageTitle.js'
import { useProgress } from '@/hooks/useProgress.jsx'
import { useLanguage } from '@/i18n/LanguageProvider.jsx'
import { getLevel, LEGACY_TIER_IDS } from '@/config/site.js'
import {
  getModule,
  getNeighbours,
  getDictionaryEntriesForModule,
  SCHEME_MODULE_IDS,
} from '@content/index.js'

export default function Lesson() {
  const { levelId, moduleId } = useParams()
  const { lang, isHindi, t } = useLanguage()
  const legacyId = LEGACY_TIER_IDS[levelId]
  const level = getLevel(levelId)
  const module = level ? getModule(levelId, moduleId, lang) : null

  const { settings, setSetting, markComplete, isCompleted, isUnlocked } = useProgress()
  const [currentTime, setCurrentTime] = useState(0)
  const [seekRequest, setSeekRequest] = useState(null)
  const [quizResult, setQuizResult] = useState(null)
  const [celebrating, setCelebrating] = useState(false)

  usePageTitle(module ? module.moduleTitle : 'Lesson')

  // An old age-band bookmark lands on the level that replaced it, rather than
  // being dumped at the home page.
  if (legacyId) return <Navigate to={`/path/${legacyId}/lesson/${moduleId}`} replace />
  if (!level || !module) return <Navigate to="/" replace />

  const { previous, next } = getNeighbours(levelId, moduleId, lang)
  const completed = isCompleted(levelId, moduleId)
  const words = getDictionaryEntriesForModule(moduleId)

  // A locked lesson is not hidden - the child is told plainly why, and given
  // the one link that fixes it.
  //
  // The level is named on purpose. Progress is per level, so someone who
  // finished "What is Money?" in Level 1 and then opened Level 2 sees a lock
  // pointing at a lesson they believe they have already done. Saying only
  // "finish the lesson before this one" is true but reads as broken. Naming
  // the level, and saying outright that levels do not carry across, is the
  // difference between a confusing dead end and an instruction.
  if (!isUnlocked(levelId, moduleId)) {
    return (
      <div className="mx-auto max-w-lg space-y-5 text-center">
        <ConceptIcon name="lock" className="mx-auto h-24 w-24 text-brand-500" title="A padlock" />
        <h1 className="text-3xl font-extrabold text-ink">This lesson is not open yet</h1>
        {previous && (
          <p className="text-lg text-muted">
            Finish <strong className="text-ink">{previous.moduleTitle}</strong> in{' '}
            <strong className="text-ink">
              {level.label} - {level.name}
            </strong>{' '}
            first. Then this one will open.
          </p>
        )}
        <p className="text-base text-muted">
          Every level has its own path. Finishing a lesson in one level does not open it in
          another.
        </p>
        {previous && (
          <Link to={`/path/${levelId}/lesson/${previous.id}`} className="btn-primary">
            Go to {previous.moduleTitle}
          </Link>
        )}
        <p>
          <Link to={`/path/${levelId}`} className="btn-secondary">
            Back to all lessons
          </Link>
        </p>
      </div>
    )
  }

  function handleComplete() {
    markComplete(levelId, moduleId, quizResult)
    setCelebrating(true)
  }

  // The quiz itself is what unlocks the next lesson - finishing it calls
  // markComplete directly, so there is no separate button standing between
  // "I answered every question" and "the next lesson is open". A module with
  // no quiz questions (none exist today, but nothing enforces that) still has
  // the manual button below as a fallback, since nothing else would ever mark
  // it done otherwise.
  function handleQuizFinish(result) {
    setQuizResult(result)
    if (!completed) {
      markComplete(levelId, moduleId, result)
      setCelebrating(true)
    }
  }

  return (
    <div className="space-y-10">
      <Celebration
        show={celebrating}
        message={`${module.moduleTitle} complete`}
        onDone={() => setCelebrating(false)}
      />

      {/* ------------------------------------------------------------ head */}
      <div>
        <Link to={`/path/${levelId}`} className="btn-secondary">
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          All lessons
        </Link>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
            <ConceptIcon name={module.icon} className="h-10 w-10" />
          </span>
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wide text-muted">
              Lesson {module.index + 1} · {level.label} - {level.name}
            </p>
            <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              {module.title}
            </h1>
          </div>
          {completed && (
            <span className="ml-auto inline-flex items-center gap-2 rounded-2xl bg-grow-500 px-4 py-2 font-extrabold text-white">
              <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
              Complete
            </span>
          )}
        </div>
      </div>

      {/* Said plainly, per lesson, rather than a blanket claim on the home
          page: this lesson specifically has no Hindi text yet, so what
          follows is English even though the interface around it is not. */}
      {isHindi && !module.translated && (
        <p className="rounded-2xl bg-sun-100 px-5 py-3 text-base font-bold text-sun-600">
          {t('lesson.notTranslated')}
        </p>
      )}

      {/* ------------------------------------------- video + transcript ---- */}
      {/* min-w-0: grid children default to min-width:auto, which stops them
          shrinking below their content and breaks reflow at 320px. */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="min-w-0 lg:col-span-3">
          <VideoPlayer
            video={module.video}
            title={module.title}
            captionsOn={settings.captionsOn}
            onCaptionsChange={(v) => setSetting('captionsOn', v)}
            playbackRate={settings.playbackRate}
            onPlaybackRateChange={(v) => setSetting('playbackRate', v)}
            onTimeUpdate={setCurrentTime}
            seekRequest={seekRequest}
          />
        </div>
        <div className="min-w-0 lg:col-span-2">
          <TranscriptPanel
            tracks={module.video.captions}
            currentTime={currentTime}
            onSeek={(t) => {
              // A new object each time so the same timestamp can be clicked twice.
              setSeekRequest({ time: t, nonce: Date.now() })
              setCurrentTime(t)
            }}
          />
        </div>
      </div>

      {/* ---------------------------------------------------------- summary */}
      <section className="card p-6" aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="flex items-center gap-2 text-2xl font-extrabold text-ink">
          <ListChecks className="h-7 w-7 text-brand-600" aria-hidden="true" />
          What this lesson says
        </h2>
        <ul className="mt-4 space-y-3">
          {module.summary.map((line, i) => (
            <li key={i} className="flex gap-3 text-xl leading-relaxed text-ink">
              <span
                aria-hidden="true"
                className="mt-2 h-3 w-3 shrink-0 rounded-full bg-brand-500"
              />
              {line}
            </li>
          ))}
        </ul>

        {module.keyWords?.length > 0 && (
          <div className="mt-6 border-t-2 border-brand-100 pt-5">
            <h3 className="flex items-center gap-2 text-lg font-extrabold text-ink">
              <BookOpen className="h-6 w-6 text-berry-600" aria-hidden="true" />
              New words in this lesson
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {module.keyWords.map((word) => (
                <li
                  key={word}
                  className="rounded-full bg-berry-100 px-4 py-2 text-base font-bold text-berry-600"
                >
                  {word}
                </li>
              ))}
            </ul>
            {words.length > 0 && (
              <p className="mt-3">
                <Link
                  to="/dictionary"
                  className="tap-target font-bold text-brand-700 underline decoration-2 underline-offset-4"
                >
                  See these words signed in the dictionary
                </Link>
              </p>
            )}
          </div>
        )}

        {/* The two schemes lessons point at the reference page, which lists
            every figure with its source and is open without unlocking. The
            lesson teaches why it matters; the page is what a family actually
            fills a form from, and they should not have to hunt for it. */}
        {SCHEME_MODULE_IDS.includes(module.id) && (
          <div className="mt-6 rounded-2xl border-2 border-clay-500 bg-clay-100 p-5">
            <h3 className="text-lg font-extrabold text-ink">Every scheme, with the details</h3>
            <p className="mt-1 text-base leading-relaxed text-ink">
              Amounts, income limits, where to apply and what to watch out for - all on one page,
              with the source for every figure.
            </p>
            <p className="mt-3">
              <Link to="/schemes" className="btn-primary">
                Open the schemes page
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </p>
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------- quiz */}
      <VisualQuiz
        title={module.quiz.title}
        questions={module.quiz.questions}
        onFinish={handleQuizFinish}
      />

      {/* --------------------------------------------------------- complete */}
      {module.quiz.questions?.length > 0 ? (
        // The quiz already marked this done - this is a confirmation, not a
        // gate, and only appears once there is something to confirm.
        completed && (
          <section
            className="card border-4 border-grow-500 p-6 text-center"
            aria-labelledby="complete-heading"
          >
            <h2
              id="complete-heading"
              className="flex items-center justify-center gap-2 text-2xl font-extrabold text-ink"
            >
              <CheckCircle2 className="h-7 w-7 text-grow-600" aria-hidden="true" />
              Lesson complete
            </h2>
            <p className="mt-2 text-lg text-muted">
              Finishing the quiz opened the next lesson. You can watch this one again any time.
            </p>
            {quizResult && (
              <p className="mt-3 text-base text-muted">
                Quiz: {quizResult.score} of {quizResult.total} right on the first try.
              </p>
            )}
          </section>
        )
      ) : (
        // Fallback for a module with no quiz questions. None exist today, but
        // if one ever did, nothing else would ever mark it complete.
        <section className="card border-4 border-grow-500 p-6 text-center" aria-labelledby="complete-heading">
          <h2 id="complete-heading" className="text-2xl font-extrabold text-ink">
            Finished this lesson?
          </h2>
          <p className="mt-2 text-lg text-muted">
            {completed
              ? 'You have already finished this lesson. You can watch it again any time.'
              : 'Press the button when you are done. The next lesson will open.'}
          </p>
          <button
            type="button"
            onClick={handleComplete}
            disabled={completed}
            className="btn-success mx-auto mt-5 text-lg"
          >
            <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
            {completed ? 'Already complete' : 'Mark as complete'}
          </button>
        </section>
      )}

      {/* --------------------------------------------------------- nav ---- */}
      <nav aria-label="Move between lessons" className="flex flex-wrap justify-between gap-4">
        {previous ? (
          <Link to={`/path/${levelId}/lesson/${previous.id}`} className="btn-secondary">
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            {previous.moduleTitle}
          </Link>
        ) : (
          <span />
        )}

        {next && (
          <Link
            to={`/path/${levelId}/lesson/${next.id}`}
            className={completed ? 'btn-primary' : 'btn-secondary'}
          >
            {next.moduleTitle}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        )}
      </nav>
    </div>
  )
}
