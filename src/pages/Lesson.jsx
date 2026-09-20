import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, CheckCircle2 } from 'lucide-react'
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

/**
 * A lesson, one step at a time: Watch, then Read, then Answer.
 *
 * The page used to be everything at once - video, transcript, story, summary,
 * words and quiz in one long column. Now each step gets the screen to itself,
 * with a stepper at the top, so a child always has one thing to look at and
 * one obvious button to press. The three verbs are the ones the home page
 * already promises ("three things, then the next lesson opens"), so the
 * promise and the page agree.
 *
 * Three decisions carry the weight:
 *
 *   1. Every step stays mounted; only the current one is shown. Unmounting
 *      would throw away a half-finished quiz the moment a child flicked back to
 *      re-read the story, and would restart the video. `hidden` removes the
 *      other steps from the accessibility tree as well as from sight, so a
 *      screen reader meets exactly what a sighted reader does.
 *   2. The step is in the URL hash. The browser's Back button walks back
 *      through the steps, and a teacher can link a class straight to
 *      `#answer`. Nothing is locked between steps - "Skip to questions" is
 *      always there - because the lesson itself is already unlocked, and a
 *      gate inside it would only get in a teacher's way.
 *   3. Changing step moves focus to that step's heading. Otherwise a keyboard
 *      or screen-reader user presses "Next" and is left on a button that has
 *      just been hidden, with no sign anything happened (WCAG 2.4.3). Layout
 *      only moves focus on a pathname change, so a hash change does not fight
 *      this.
 */

const STEPS = ['watch', 'read', 'answer']

/**
 * The heading each step opens on - where focus lands when the step changes.
 *
 * Declared here, not inside Lesson. A component defined inside another is a
 * new type on every render, so React unmounts and remounts it; the video
 * re-renders the lesson several times a second while it plays, which would
 * replace this heading under the reader's focus and drop focus to <body>.
 *
 * Visually hidden - the stepper already shows where you are - but it carries
 * the position in words ("Step 2 of 3: Read"), which the dots and numbers
 * cannot say to a screen reader.
 */
function StepHeading({ id, children }) {
  return (
    <h2 id={`step-${id}-heading`} tabIndex={-1} className="sr-only">
      {children}
    </h2>
  )
}

/** The bar under each step: one way forward, and a way back. */
function StepFooter({ step, t, goTo }) {
  const index = STEPS.indexOf(step)
  const prevStep = STEPS[index - 1]
  const nextStep = STEPS[index + 1]
  const label = (s) => t(`lesson.step.${s}`)
  return (
    <div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-base font-bold text-muted">{t(`lesson.step.hint.${step}`)}</p>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {prevStep && (
          <button type="button" onClick={() => goTo(prevStep)} className="btn-secondary">
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            {t('lesson.step.back', { step: label(prevStep) })}
          </button>
        )}
        {step === 'watch' && (
          <button type="button" onClick={() => goTo('answer')} className="btn-secondary">
            {t('lesson.step.skip')}
          </button>
        )}
        {nextStep && (
          <button type="button" onClick={() => goTo(nextStep)} className="btn-primary">
            {t('lesson.step.next', { step: label(nextStep) })}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}

export default function Lesson() {
  const { levelId, moduleId } = useParams()
  const { lang, isHindi, t } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const legacyId = LEGACY_TIER_IDS[levelId]
  const level = getLevel(levelId)
  const module = level ? getModule(levelId, moduleId, lang) : null

  const { settings, setSetting, markComplete, isCompleted, isUnlocked } = useProgress()
  const [currentTime, setCurrentTime] = useState(0)
  const [seekRequest, setSeekRequest] = useState(null)
  const [quizResult, setQuizResult] = useState(null)
  const [celebrating, setCelebrating] = useState(false)

  const hashStep = location.hash.slice(1)
  const step = STEPS.includes(hashStep) ? hashStep : 'watch'
  const stepIndex = STEPS.indexOf(step)

  const rootRef = useRef(null)
  const stepperRef = useRef(null)
  const shownStep = useRef(step)

  usePageTitle(module ? module.moduleTitle : t('lesson.pageTitleFallback'))

  // On a real step change: stop any video left playing in a step that is now
  // hidden, bring the stepper into view, and put focus on the new step's
  // heading.
  //
  // Compared against the step last shown rather than guarded by a "first
  // render" flag. StrictMode runs every effect twice on mount in development,
  // and a flag is spent by the first run - the second would then steal focus
  // and scroll on page load. Comparing values is a no-op on any re-run.
  useEffect(() => {
    if (shownStep.current === step) return
    shownStep.current = step
    const root = rootRef.current
    if (!root) return
    root
      .querySelectorAll(`[data-step]:not([data-step="${step}"]) video`)
      .forEach((video) => video.pause())
    stepperRef.current?.scrollIntoView({ block: 'start' })
    document.getElementById(`step-${step}-heading`)?.focus({ preventScroll: true })
  }, [step])

  // An old age-band bookmark lands on the level that replaced it, rather than
  // being dumped at the home page.
  if (legacyId) return <Navigate to={`/path/${legacyId}/lesson/${moduleId}`} replace />
  if (!level || !module) return <Navigate to="/" replace />

  const { previous, next } = getNeighbours(levelId, moduleId, lang)
  const completed = isCompleted(levelId, moduleId)
  const words = getDictionaryEntriesForModule(moduleId)
  const levelName = `${t('level.label', { n: level.step })} - ${t(`level.${level.id}.name`)}`

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
        <ConceptIcon
          name="lock"
          className="mx-auto h-24 w-24 text-brand-500"
          title={t('lesson.padlockTitle')}
        />
        <h1 className="text-3xl font-extrabold text-ink">{t('lesson.lockedHeading')}</h1>
        {previous && (
          <p className="text-lg text-muted">
            {t('lesson.lockedMessage', { title: previous.moduleTitle, level: levelName })}
          </p>
        )}
        <p className="text-base text-muted">{t('lesson.lockedNote')}</p>
        {previous && (
          <Link to={`/path/${levelId}/lesson/${previous.id}`} className="btn-primary">
            {t('lesson.goTo', { title: previous.moduleTitle })}
          </Link>
        )}
        <p>
          <Link to={`/path/${levelId}`} className="btn-secondary">
            {t('lesson.backToAllLessons')}
          </Link>
        </p>
      </div>
    )
  }

  function goTo(target) {
    // Watch is the lesson's front door, so it keeps the plain URL.
    navigate({ pathname: location.pathname, hash: target === 'watch' ? '' : target })
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

  const stepLabel = (s) => t(`lesson.step.${s}`)
  const stepTitle = (s) =>
    `${t('lesson.steps.status', { n: STEPS.indexOf(s) + 1, total: STEPS.length })}: ${stepLabel(s)}`

  return (
    <div ref={rootRef} className="space-y-8">
      <Celebration
        show={celebrating}
        message={t('lesson.celebrationMessage', { title: module.moduleTitle })}
        onDone={() => setCelebrating(false)}
      />

      {/* ------------------------------------------------ title and stepper */}
      <div
        ref={stepperRef}
        className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="flex flex-col items-start gap-2">
          <Link
            to={`/path/${levelId}`}
            className="tap-target -ml-1 gap-2 px-1 font-extrabold text-ink hover:underline"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            {t('lesson.backToAll')}
          </Link>
          <p className="text-sm font-extrabold uppercase tracking-wide text-muted">
            {t('lesson.eyebrow', { n: module.index + 1, level: levelName })}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl/tight font-extrabold text-ink sm:text-4xl/tight">
              {module.title}
            </h1>
            {completed && (
              <span className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-3 py-1 text-sm font-extrabold text-[#161616]">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                {t('lessoncard.complete')}
              </span>
            )}
          </div>
        </div>

        <nav aria-label={t('lesson.steps.label')}>
          <ol className="grid grid-cols-3 items-start gap-2 sm:flex sm:items-center sm:gap-3">
            {STEPS.map((s, i) => {
              const current = s === step
              const done = i < stepIndex
              return (
                <li key={s} className="flex min-w-0 items-center justify-center gap-2 sm:gap-3">
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className={`hidden h-0 w-12 border-t-[3px] sm:block ${
                        done || current ? 'border-solid border-ink' : 'border-dotted border-brand-300'
                      }`}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => goTo(s)}
                    aria-current={current ? 'step' : undefined}
                    className="tap-target w-full flex-col gap-2 rounded-2xl p-1 text-center font-extrabold sm:w-auto sm:flex-row sm:rounded-full sm:pr-2"
                  >
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-lg ${
                        current
                          ? 'bg-clay-500 text-white shadow-[0_4px_0_rgb(var(--c-gold-500))]'
                          : done
                            ? 'bg-brand-100 text-ink'
                            : 'border-2 border-brand-400 bg-surface text-muted'
                      }`}
                    >
                      {done ? <Check className="h-5 w-5" aria-hidden="true" /> : i + 1}
                    </span>
                    <span className={current ? 'text-ink' : 'text-muted'}>{stepLabel(s)}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </nav>
      </div>

      {/* Said plainly, per lesson, rather than a blanket claim on the home
          page: this lesson specifically has no Hindi text yet, so what
          follows is English even though the interface around it is not. */}
      {isHindi && !module.translated && (
        <p className="rounded-2xl bg-sun-100 px-5 py-3 text-base font-bold text-sun-600">
          {t('lesson.notTranslated')}
        </p>
      )}

      {/* ------------------------------------------------------ 1 · watch */}
      <section data-step="watch" hidden={step !== 'watch'} aria-labelledby="step-watch-heading" className="space-y-6">
        <StepHeading id="watch">{stepTitle('watch')}</StepHeading>
        {/* min-w-0: grid children default to min-width:auto, which stops them
            shrinking below their content and breaks reflow at 320px. The
            transcript stays beside the video on this step because it seeks
            it - moving it to Read would separate a control from the thing it
            controls. */}
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
              onSeek={(seconds) => {
                // A new object each time so the same timestamp can be clicked twice.
                setSeekRequest({ time: seconds, nonce: Date.now() })
                setCurrentTime(seconds)
              }}
            />
          </div>
        </div>
        <StepFooter step="watch" t={t} goTo={goTo} />
      </section>

      {/* ------------------------------------------------------- 2 · read */}
      <section data-step="read" hidden={step !== 'read'} aria-labelledby="step-read-heading" className="space-y-6">
        <StepHeading id="read">{stepTitle('read')}</StepHeading>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* The story is the hook, the summary is the same idea said plainly,
              and the quiz checks it. The moral is printed rather than left to
              be inferred - children reliably enjoy and remember a story
              without extracting the principle from it.

              Not every lesson has one. Modules 10 and 11 are administrative,
              and there is no folk tale about a scholarship form; where no
              story exists the summary takes the full width. */}
          {module.story && (
            <article className="card min-w-0 p-6 sm:p-8 lg:col-span-3" aria-labelledby="story-heading">
              <p className="text-sm font-extrabold uppercase tracking-wide text-muted">
                {module.story.source}
              </p>
              <h3 id="story-heading" className="mt-1 text-2xl font-extrabold text-ink sm:text-3xl">
                {module.story.title}
              </h3>
              <div className="mt-4 space-y-3">
                {module.story.text.map((para, i) => (
                  <p key={i} className="text-xl leading-relaxed text-ink">
                    {para}
                  </p>
                ))}
              </div>
              {module.story.moral && (
                <div className="mt-6 flex items-start gap-4 rounded-2xl bg-gold-100 p-5">
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-500 text-xl font-extrabold text-[#161616]"
                  >
                    ₹
                  </span>
                  <p className="text-lg font-bold leading-relaxed text-ink">{module.story.moral}</p>
                </div>
              )}
            </article>
          )}

          <section
            className={`card min-w-0 p-6 sm:p-8 ${module.story ? 'lg:col-span-2' : 'lg:col-span-5'}`}
            aria-labelledby="summary-heading"
          >
            <h3 id="summary-heading" className="text-2xl font-extrabold text-ink">
              {t('lesson.whatThisSays')}
            </h3>
            <ul className="mt-4 space-y-3">
              {module.summary.map((line, i) => (
                <li key={i} className="flex gap-3 text-lg leading-relaxed text-ink">
                  <span aria-hidden="true" className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-ink" />
                  {line}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {module.keyWords?.length > 0 && (
          <section className="space-y-4" aria-labelledby="words-heading">
            <h3 id="words-heading" className="text-2xl font-extrabold text-ink">
              {t('lesson.newWords')}
            </h3>
            <ul className="flex flex-wrap gap-3">
              {module.keyWords.map((word) => (
                <li
                  key={word}
                  className="rounded-2xl border-2 border-brand-100 bg-surface px-5 py-3 text-lg font-extrabold text-ink"
                >
                  {word}
                </li>
              ))}
            </ul>
            {words.length > 0 && (
              <p>
                <Link to="/dictionary" className="tap-target font-bold text-ink underline decoration-2 underline-offset-4">
                  {t('lesson.seeWordsSigned')}
                </Link>
              </p>
            )}
          </section>
        )}

        {/* The two schemes lessons point at the reference page, which lists
            every figure with its source and is open without unlocking. */}
        {SCHEME_MODULE_IDS.includes(module.id) && (
          <div className="card p-6">
            <h3 className="text-lg font-extrabold text-ink">{t('lesson.schemesHeading')}</h3>
            <p className="mt-1 text-base leading-relaxed text-ink">{t('lesson.schemesText')}</p>
            <p className="mt-4">
              <Link to="/schemes" className="btn-primary">
                {t('lesson.schemesCta')}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </p>
          </div>
        )}

        <StepFooter step="read" t={t} goTo={goTo} />
      </section>

      {/* ----------------------------------------------------- 3 · answer */}
      <section data-step="answer" hidden={step !== 'answer'} aria-labelledby="step-answer-heading" className="space-y-6">
        <StepHeading id="answer">{stepTitle('answer')}</StepHeading>

        <VisualQuiz
          title={module.quiz.title}
          questions={module.quiz.questions}
          onFinish={handleQuizFinish}
        />

        {module.quiz.questions?.length > 0 ? (
          // The quiz already marked this done - this is a confirmation, not a
          // gate, and only appears once there is something to confirm.
          completed && (
            <section className="card border-4 border-gold-700 p-6 text-center" aria-labelledby="complete-heading">
              <h3
                id="complete-heading"
                className="flex items-center justify-center gap-2 text-2xl font-extrabold text-ink"
              >
                <CheckCircle2 className="h-7 w-7 text-gold-600" aria-hidden="true" />
                {t('lesson.completeHeading')}
              </h3>
              <p className="mt-2 text-lg text-muted">{t('lesson.completeText')}</p>
              {quizResult && (
                <p className="mt-3 text-base text-muted">
                  {t('lesson.quizScore', { right: quizResult.score, total: quizResult.total })}
                </p>
              )}
            </section>
          )
        ) : (
          // Fallback for a module with no quiz questions. None exist today, but
          // if one ever did, nothing else would ever mark it complete.
          <section className="card border-4 border-gold-700 p-6 text-center" aria-labelledby="complete-heading">
            <h3 id="complete-heading" className="text-2xl font-extrabold text-ink">
              {t('lesson.finishedHeading')}
            </h3>
            <p className="mt-2 text-lg text-muted">
              {completed ? t('lesson.finishedAlready') : t('lesson.finishedPrompt')}
            </p>
            <button
              type="button"
              onClick={handleComplete}
              disabled={completed}
              className="btn-success mx-auto mt-5 text-lg"
            >
              <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
              {completed ? t('lesson.alreadyComplete') : t('lesson.markComplete')}
            </button>
          </section>
        )}

        <StepFooter step="answer" t={t} goTo={goTo} />
      </section>

      {/* --------------------------------------------------------- nav ---- */}
      <nav aria-label={t('lesson.navLabel')} className="flex flex-wrap justify-between gap-4 border-t-2 border-brand-100 pt-6">
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
