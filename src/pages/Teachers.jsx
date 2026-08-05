import { Link } from 'react-router-dom'
import { AlertTriangle, Download, RotateCcw, Trash2 } from 'lucide-react'
import { useState } from 'react'
import usePageTitle from '@/hooks/usePageTitle.js'
import { useProgress } from '@/hooks/useProgress.jsx'
import { useLanguage } from '@/i18n/LanguageProvider.jsx'
import { levels, signLanguage, site } from '@/config/site.js'
import { modules, signClipCoverage, moduleMeta } from '@content/index.js'

export default function Teachers() {
  usePageTitle('For parents and teachers')

  const { lang } = useLanguage()
  const { levelStats, resetAll, settings, setSetting, state } = useProgress()
  const [confirmingReset, setConfirmingReset] = useState(false)
  const clips = signClipCoverage()

  function downloadProgress() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'amanat-progress.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-extrabold text-ink">For parents and teachers</h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">
          {site.name} teaches money skills to Deaf and Hard-of-Hearing children. The lessons are
          sorted by difficulty rather than by age, so place a child by what they can read and
          reason with, not by the year they were born. There is no sign-up and no login. Nothing a
          child does here leaves their device.
        </p>
      </header>

      {/* ------------------------------------------------------- how to use */}
      <section className="card p-6" aria-labelledby="use-heading">
        <h2 id="use-heading" className="text-2xl font-extrabold text-ink">
          How to use it in a lesson
        </h2>
        <ol className="mt-4 space-y-4">
          {[
            'Pick a level on the home page. The eight topics stay the same at every level; the wording, the maths and how much is left for the child to work out change. A child who finishes Level 1 can climb, and one who is stuck can drop a level without being told they are in the wrong age group.',
            'Play the video with captions on. The transcript beside the video can be projected or printed for the class.',
            'Pause after the summary and ask the class to sign back one sentence in their own words.',
            'Let each child do the picture quiz on their own device. A wrong answer gives a hint and lets them retry, so nobody is stuck.',
            'Finish with "Mark as complete". This opens the next lesson on that device.',
          ].map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 font-extrabold text-surface">
                {i + 1}
              </span>
              <span className="text-lg leading-relaxed text-ink">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* --------------------------------------------------------- coverage */}
      <section aria-labelledby="topics-heading">
        <h2 id="topics-heading" className="text-2xl font-extrabold text-ink">
          The eight topics
        </h2>
        <p className="mt-2 text-lg text-muted">
          Each topic is written three times, once at each level of difficulty.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <caption className="sr-only">
              Lesson topics and the levels they are written for
            </caption>
            <thead>
              <tr className="border-b-4 border-brand-200">
                <th scope="col" className="p-3 text-base font-extrabold text-ink">
                  Topic
                </th>
                {levels.map((t) => (
                  <th key={t.id} scope="col" className="p-3 text-base font-extrabold text-ink">
                    {t.shortLabel}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {modules.map((m) => (
                <tr key={m.id} className="border-b-2 border-brand-100">
                  <th scope="row" className="p-3 text-base font-bold text-ink">
                    {m.order}. {moduleMeta(m, lang).title}
                  </th>
                  {levels.map((t) => (
                    <td key={t.id} className="p-3 text-base text-ink">
                      {m.levels[t.id] ? (
                        <>
                          <span aria-hidden="true">✓</span>
                          <span className="sr-only">Available</span>{' '}
                          <span className="text-muted">{m.levels[t.id].video.durationLabel}</span>
                        </>
                      ) : (
                        <span className="text-muted">Not written yet</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------------------------------------------------------- signing */}
      <section className="card border-4 border-berry-500 p-6" aria-labelledby="sign-heading">
        <h2 id="sign-heading" className="text-2xl font-extrabold text-ink">
          About the {signLanguage.label} videos
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          Every lesson reserves a panel for a signed interpretation, and every dictionary word
          reserves space for a short signed clip. Where a clip has not been filmed yet, the space
          says so plainly rather than hiding.
        </p>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          Sign language is regional. These lessons are written for {signLanguage.label}. If you
          teach in another sign language, the interpreter clips can be swapped without changing
          any of the written content.
        </p>

        {/* The count, not a vague "coming soon" — a teacher deciding whether to
            use this with a class needs to know exactly how much is filmed. */}
        <p
          className={`mt-4 rounded-2xl p-4 text-lg font-bold ${
            clips.complete ? 'bg-grow-100 text-grow-600' : 'bg-sun-100 text-sun-600'
          }`}
        >
          {clips.complete
            ? `All ${clips.total} dictionary words have a signed clip.`
            : `${clips.done} of ${clips.total} dictionary words have a signed clip so far. The rest show a labelled space until they are filmed.`}
        </p>
      </section>

      {/* --------------------------------------------------------- settings */}
      <section className="card p-6" aria-labelledby="settings-heading">
        <h2 id="settings-heading" className="text-2xl font-extrabold text-ink">
          Settings on this device
        </h2>

        <label className="checkbox-row mt-4 items-start">
          <input
            type="checkbox"
            checked={settings.unlockAll}
            onChange={(e) => setSetting('unlockAll', e.target.checked)}
            className="checkbox-lg mt-1"
          />
          <span>
            <span className="block text-lg font-bold text-ink">Open every lesson</span>
            <span className="block text-base text-muted">
              Lessons normally open one at a time. Turn this on to jump to any topic.
            </span>
          </span>
        </label>

        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-extrabold text-ink">Progress on this device</h3>
          <ul className="space-y-1 text-base text-ink">
            {levels.map((t) => {
              const s = levelStats(t.id)
              return (
                <li key={t.id}>
                  {t.label}: <strong>{s.done}</strong> of {s.total} lessons done
                </li>
              )
            })}
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            <button type="button" onClick={downloadProgress} className="btn-secondary">
              <Download className="h-5 w-5" aria-hidden="true" />
              Save progress to a file
            </button>

            {confirmingReset ? (
              <div className="flex flex-wrap items-center gap-3 rounded-2xl border-4 border-alert-500 bg-alert-100 p-3">
                <AlertTriangle className="h-6 w-6 shrink-0 text-alert-600" aria-hidden="true" />
                <p className="font-bold text-ink">Erase all progress on this device?</p>
                <button
                  type="button"
                  onClick={() => {
                    resetAll()
                    setConfirmingReset(false)
                  }}
                  className="btn bg-alert-500 text-white hover:bg-alert-700"
                >
                  <Trash2 className="h-5 w-5" aria-hidden="true" />
                  Yes, erase it
                </button>
                <button type="button" onClick={() => setConfirmingReset(false)} className="btn-secondary">
                  <RotateCcw className="h-5 w-5" aria-hidden="true" />
                  No, keep it
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmingReset(true)}
                className="btn border-2 border-alert-500 bg-surface text-alert-600 hover:bg-alert-100"
              >
                <Trash2 className="h-5 w-5" aria-hidden="true" />
                Erase all progress
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- privacy */}
      <section className="rounded-3xl bg-brand-50 p-6" aria-labelledby="privacy-heading">
        <h2 id="privacy-heading" className="text-xl font-extrabold text-ink">
          Privacy
        </h2>
        <p className="mt-2 text-lg leading-relaxed text-ink">
          There are no accounts and no analytics. Progress is stored in the browser on the device
          itself. Clearing the browser data clears the progress. Nothing is sent anywhere.
        </p>
        <p className="mt-3">
          <Link to="/accessibility" className="tap-target font-bold text-brand-700 underline decoration-2 underline-offset-4">
            Read the accessibility statement
          </Link>
        </p>
      </section>
    </div>
  )
}
