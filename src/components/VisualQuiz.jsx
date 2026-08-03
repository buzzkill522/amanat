import { useEffect, useId, useRef, useState } from 'react'
import { ArrowRight, Check, Lightbulb, RefreshCw, X } from 'lucide-react'
import ConceptIcon from '@/components/icons/ConceptIcon.jsx'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion.js'

/**
 * A picture quiz.
 *
 * Feedback rules this component follows, in order of importance:
 *   1. Nothing is ever signalled by sound. There is no audio at all.
 *   2. Nothing is ever signalled by colour alone. Every state also has an
 *      icon (tick or cross) and a word ("Correct" / "Try again").
 *   3. A wrong answer is not a dead end. The child retries, with a hint.
 *   4. Movement is decoration. With prefers-reduced-motion the animation is
 *      dropped and the icon, colour and word still say everything.
 *
 * @param {Array}  questions    - [{ id, prompt, image:{icon,alt}, options:[{icon,label}], correctIndex, hint }]
 * @param {number} headingLevel - the quiz sits directly under the page h1 on a
 *                                lesson page, so it defaults to h2. Pass 3 if
 *                                you nest it inside another section.
 */
export default function VisualQuiz({
  questions = [],
  onFinish,
  title = 'Show what you know',
  headingLevel = 2,
}) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [firstTryCount, setFirstTryCount] = useState(0)
  const [done, setDone] = useState(false)
  const feedbackRef = useRef(null)
  const headingRef = useRef(null)
  const reduceMotion = usePrefersReducedMotion()
  const promptId = useId()

  const question = questions[index]
  const isCorrect = picked !== null && picked === question?.correctIndex

  // Headings must not skip a level, and the quiz can appear at different depths.
  const Heading = `h${Math.min(headingLevel, 6)}`
  const SubHeading = `h${Math.min(headingLevel + 1, 6)}`

  // Move focus to the new question so a keyboard or screen reader user is not
  // left at the bottom of the page after pressing "Next".
  useEffect(() => {
    if (!done && index > 0) headingRef.current?.focus()
  }, [index, done])

  if (!questions.length) return null

  function choose(optionIndex) {
    if (isCorrect) return // already solved; ignore further taps
    setPicked(optionIndex)
    const right = optionIndex === question.correctIndex
    if (right && attempts === 0) setFirstTryCount((n) => n + 1)
    if (!right) setAttempts((n) => n + 1)
  }

  function next() {
    if (index + 1 < questions.length) {
      setIndex(index + 1)
      setPicked(null)
      setAttempts(0)
    } else {
      setDone(true)
      onFinish?.({ score: firstTryCount, total: questions.length })
    }
  }

  function restart() {
    setIndex(0)
    setPicked(null)
    setAttempts(0)
    setFirstTryCount(0)
    setDone(false)
  }

  // ---------------------------------------------------------------- finished
  if (done) {
    const allFirstTry = firstTryCount === questions.length
    return (
      <section className="card p-6 text-center" aria-labelledby="quiz-result-heading">
        <div className={`mx-auto mb-4 w-fit ${reduceMotion ? '' : 'animate-bounceIn'}`}>
          <ConceptIcon
            name={allFirstTry ? 'trophy' : 'star'}
            className="h-20 w-20 text-grow-500"
            title={allFirstTry ? 'A trophy' : 'A star'}
          />
        </div>
        <Heading id="quiz-result-heading" className="text-2xl font-extrabold text-ink">
          Quiz finished
        </Heading>
        <p className="mt-2 text-lg text-muted">
          You answered <strong className="text-ink">{firstTryCount}</strong> of{' '}
          <strong className="text-ink">{questions.length}</strong> right on the first try.
        </p>
        <p className="mt-1 text-base text-muted">
          Every question is now correct. You can try the quiz again any time.
        </p>
        <button type="button" onClick={restart} className="btn-secondary mt-5">
          <RefreshCw className="h-5 w-5" aria-hidden="true" />
          Try the quiz again
        </button>
      </section>
    )
  }

  // ---------------------------------------------------------------- question
  return (
    <section className="card overflow-hidden" aria-labelledby="quiz-heading">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-brand-100 bg-brand-50 px-5 py-4">
        <Heading id="quiz-heading" className="text-xl font-extrabold text-brand-800">
          {title}
        </Heading>
        <p className="text-sm font-bold text-brand-700">
          Question {index + 1} of {questions.length}
        </p>
      </div>

      {/* Progress: shape and text, not colour alone. */}
      <ol className="flex gap-2 px-5 pt-4" aria-hidden="true">
        {questions.map((q, i) => (
          <li
            key={q.id}
            className={`h-3 flex-1 rounded-full ${
              i < index ? 'bg-grow-500' : i === index ? 'bg-brand-500' : 'bg-brand-100'
            }`}
          />
        ))}
      </ol>

      <div className="p-5">
        <SubHeading
          ref={headingRef}
          tabIndex={-1}
          id={promptId}
          className="text-center text-2xl font-extrabold leading-snug text-ink"
        >
          {question.prompt}
        </SubHeading>

        {question.image && (
          <div className="my-5 flex justify-center">
            <div className="rounded-3xl bg-brand-50 p-6">
              <ConceptIcon
                name={question.image.icon}
                className="h-28 w-28 text-brand-700"
                title={question.image.alt}
              />
            </div>
          </div>
        )}

        {/* Options */}
        <div role="group" aria-labelledby={promptId} className="grid gap-4 sm:grid-cols-3">
          {question.options.map((option, i) => {
            const chosen = picked === i
            const chosenRight = chosen && i === question.correctIndex
            const chosenWrong = chosen && i !== question.correctIndex
            const settled = isCorrect

            let tone = 'border-brand-200 bg-white hover:border-brand-500 hover:bg-brand-50'
            if (chosenRight) tone = 'border-grow-500 bg-grow-100'
            else if (chosenWrong) tone = 'border-alert-500 bg-alert-100'
            else if (settled) tone = 'border-brand-100 bg-white opacity-60'

            let motion = ''
            if (!reduceMotion && chosenRight) motion = 'animate-bounceIn'
            if (!reduceMotion && chosenWrong) motion = 'animate-nudge'

            return (
              <button
                key={`${question.id}-${i}`}
                type="button"
                onClick={() => choose(i)}
                disabled={settled && !chosenRight}
                aria-pressed={chosen}
                className={`relative flex min-h-[10rem] flex-col items-center justify-center gap-3 rounded-3xl border-4 p-4 text-center transition ${tone} ${motion} disabled:cursor-not-allowed`}
              >
                {/* Result badge: icon + colour + text, never colour on its own. */}
                {chosen && (
                  <span
                    className={`absolute right-2 top-2 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-extrabold uppercase text-white ${
                      chosenRight ? 'bg-grow-500' : 'bg-alert-500'
                    }`}
                  >
                    {chosenRight ? (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <X className="h-4 w-4" aria-hidden="true" />
                    )}
                    {chosenRight ? 'Right' : 'No'}
                  </span>
                )}
                <ConceptIcon name={option.icon} className="h-16 w-16 text-brand-700" />
                <span className="text-lg font-bold leading-tight text-ink">{option.label}</span>
              </button>
            )
          })}
        </div>

        {/* Feedback. role="status" so it is read out without stealing focus. */}
        <div ref={feedbackRef} role="status" aria-live="polite" className="mt-5">
          {isCorrect && (
            <div className="flex items-start gap-3 rounded-2xl border-2 border-grow-500 bg-grow-100 p-4">
              <Check className="mt-0.5 h-7 w-7 shrink-0 text-grow-600" aria-hidden="true" />
              <p className="text-lg font-bold text-ink">
                Correct. {attempts > 0 ? 'Well done for trying again.' : 'First try.'}
              </p>
            </div>
          )}

          {picked !== null && !isCorrect && (
            <div className="flex items-start gap-3 rounded-2xl border-2 border-alert-500 bg-alert-100 p-4">
              <X className="mt-0.5 h-7 w-7 shrink-0 text-alert-600" aria-hidden="true" />
              <div>
                <p className="text-lg font-bold text-ink">Not this one. Try again.</p>
                {question.hint && (
                  <p className="mt-1 flex items-start gap-2 text-base text-ink">
                    <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-sun-500" aria-hidden="true" />
                    <span>{question.hint}</span>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {isCorrect && (
          <div className="mt-5 flex justify-end">
            <button type="button" onClick={next} className="btn-primary text-lg">
              {index + 1 < questions.length ? 'Next question' : 'Finish quiz'}
              <ArrowRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
