import { Link } from 'react-router-dom'
import { AlertTriangle, Download, RotateCcw, Trash2, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import usePageTitle from '@/hooks/usePageTitle.js'
import { useProgress } from '@/hooks/useProgress.jsx'
import { useLanguage } from '@/i18n/LanguageProvider.jsx'
import { levels, signLanguage, site } from '@/config/site.js'
import { modules, signClipCoverage, moduleMeta } from '@content/index.js'

export default function Teachers() {
  const { lang, t } = useLanguage()

  usePageTitle(t('teachers.pageTitle'))

  const { levelStats, resetAll, importState, settings, setSetting, state } = useProgress()
  const [confirmingReset, setConfirmingReset] = useState(false)
  // Holds the file's own contents and name between "a file was picked" and
  // "the teacher confirmed replacing this device's progress with it" - nothing
  // is written to localStorage until that confirmation, so a wrong file picked
  // by accident costs nothing.
  const [pendingImport, setPendingImport] = useState(null)
  const [importError, setImportError] = useState(null)
  const fileInputRef = useRef(null)
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

  function handleFilePicked(e) {
    const file = e.target.files?.[0]
    // Cleared immediately so picking the same file again later (after
    // cancelling, say) still fires a change event.
    e.target.value = ''
    if (!file) return
    setImportError(null)
    const reader = new FileReader()
    reader.onload = () => setPendingImport({ raw: reader.result, name: file.name })
    reader.onerror = () => setImportError('read')
    reader.readAsText(file)
  }

  function confirmImport() {
    const result = importState(pendingImport.raw)
    setPendingImport(null)
    if (!result.ok) setImportError(result.reason)
  }

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-extrabold text-ink">{t('teachers.heading')}</h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">
          {t('teachers.lead', { site: site.name })}
        </p>
      </header>

      {/* ------------------------------------------------------- how to use */}
      <section className="card p-6" aria-labelledby="use-heading">
        <h2 id="use-heading" className="text-2xl font-extrabold text-ink">
          {t('teachers.use.heading')}
        </h2>
        <ol className="mt-4 space-y-4">
          {[1, 2, 3, 4, 5].map((n) => t(`teachers.use.step${n}`)).map((step, i) => (
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
          {t('teachers.topics.heading')}
        </h2>
        <p className="mt-2 text-lg text-muted">{t('teachers.topics.lead')}</p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <caption className="sr-only">
              {t('teachers.topics.caption')}
            </caption>
            <thead>
              <tr className="border-b-4 border-brand-200">
                <th scope="col" className="p-3 text-base font-extrabold text-ink">
                  {t('teachers.topics.colTopic')}
                </th>
                {levels.map((lvl) => (
                  <th key={lvl.id} scope="col" className="p-3 text-base font-extrabold text-ink">
                    {lvl.shortLabel}
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
                  {levels.map((lvl) => (
                    <td key={lvl.id} className="p-3 text-base text-ink">
                      {m.levels[lvl.id] ? (
                        <>
                          <span aria-hidden="true">✓</span>
                          <span className="sr-only">{t('teachers.topics.available')}</span>{' '}
                          <span className="text-muted">{m.levels[lvl.id].video.durationLabel}</span>
                        </>
                      ) : (
                        <span className="text-muted">{t('teachers.topics.notWritten')}</span>
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
          {t('teachers.sign.heading', { sign: signLanguage.label })}
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">{t('teachers.sign.reserved')}</p>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          {t('teachers.sign.regional', { sign: signLanguage.label })}
        </p>

        {/* The count, not a vague "coming soon" - a teacher deciding whether to
            use this with a class needs to know exactly how much is filmed. */}
        <p
          className={`mt-4 rounded-2xl p-4 text-lg font-bold ${
            clips.complete ? 'bg-grow-100 text-grow-600' : 'bg-sun-100 text-sun-600'
          }`}
        >
          {clips.complete
            ? t('teachers.sign.allDone', { total: clips.total })
            : t('teachers.sign.someDone', { done: clips.done, total: clips.total })}
        </p>
      </section>

      {/* --------------------------------------------------------- settings */}
      <section className="card p-6" aria-labelledby="settings-heading">
        <h2 id="settings-heading" className="text-2xl font-extrabold text-ink">
          {t('teachers.settings.heading')}
        </h2>

        <label className="checkbox-row mt-4 items-start">
          <input
            type="checkbox"
            checked={settings.unlockAll}
            onChange={(e) => setSetting('unlockAll', e.target.checked)}
            className="checkbox-lg mt-1"
          />
          <span>
            <span className="block text-lg font-bold text-ink">
              {t('teachers.settings.unlockTitle')}
            </span>
            <span className="block text-base text-muted">
              {t('teachers.settings.unlockText')}
            </span>
          </span>
        </label>

        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-extrabold text-ink">{t('teachers.progress.heading')}</h3>
          <ul className="space-y-1 text-base text-ink">
            {levels.map((lvl) => {
              const s = levelStats(lvl.id)
              return (
                <li key={lvl.id}>{t('teachers.progress.line', { label: lvl.label, done: s.done, total: s.total })}</li>
              )
            })}
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            <button type="button" onClick={downloadProgress} className="btn-secondary">
              <Download className="h-5 w-5" aria-hidden="true" />
              {t('teachers.progress.save')}
            </button>

            {/* The other half of the button above. On a shared tablet, a
                child's own saved file is what carries their progress onto a
                different device - this is how it comes back. */}
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              onChange={handleFilePicked}
              className="sr-only"
              aria-hidden="true"
              tabIndex={-1}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary"
            >
              <Upload className="h-5 w-5" aria-hidden="true" />
              {t('teachers.progress.load')}
            </button>

            {pendingImport && (
              <div
                role="alert"
                className="flex w-full flex-wrap items-center gap-3 rounded-2xl border-4 border-sun-500 bg-sun-100 p-3"
              >
                <AlertTriangle className="h-6 w-6 shrink-0 text-sun-600" aria-hidden="true" />
                <p className="font-bold text-ink">
                  {t('teachers.progress.replaceAsk', { name: pendingImport.name })}
                </p>
                <button type="button" onClick={confirmImport} className="btn bg-sun-500 text-white hover:bg-sun-700">
                  <Upload className="h-5 w-5" aria-hidden="true" />
                  {t('teachers.progress.replaceYes')}
                </button>
                <button type="button" onClick={() => setPendingImport(null)} className="btn-secondary">
                  <RotateCcw className="h-5 w-5" aria-hidden="true" />
                  {t('teachers.progress.replaceNo')}
                </button>
              </div>
            )}

            {importError && (
              <div
                role="alert"
                className="flex w-full flex-wrap items-center gap-3 rounded-2xl border-4 border-alert-500 bg-alert-100 p-3"
              >
                <AlertTriangle className="h-6 w-6 shrink-0 text-alert-600" aria-hidden="true" />
                <p className="font-bold text-ink">
                  {importError === 'parse'
                    ? t('teachers.progress.errParse')
                    : t('teachers.progress.errFormat')}
                </p>
                <button type="button" onClick={() => setImportError(null)} className="btn-secondary">
                  {t('teachers.progress.dismiss')}
                </button>
              </div>
            )}

            {confirmingReset ? (
              <div className="flex flex-wrap items-center gap-3 rounded-2xl border-4 border-alert-500 bg-alert-100 p-3">
                <AlertTriangle className="h-6 w-6 shrink-0 text-alert-600" aria-hidden="true" />
                <p className="font-bold text-ink">{t('teachers.progress.eraseAsk')}</p>
                <button
                  type="button"
                  onClick={() => {
                    resetAll()
                    setConfirmingReset(false)
                  }}
                  className="btn bg-alert-500 text-white hover:bg-alert-700"
                >
                  <Trash2 className="h-5 w-5" aria-hidden="true" />
                  {t('teachers.progress.eraseYes')}
                </button>
                <button type="button" onClick={() => setConfirmingReset(false)} className="btn-secondary">
                  <RotateCcw className="h-5 w-5" aria-hidden="true" />
                  {t('teachers.progress.eraseNo')}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmingReset(true)}
                className="btn border-2 border-alert-500 bg-surface text-alert-600 hover:bg-alert-100"
              >
                <Trash2 className="h-5 w-5" aria-hidden="true" />
                {t('teachers.progress.erase')}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- privacy */}
      <section className="rounded-3xl bg-brand-50 p-6" aria-labelledby="privacy-heading">
        <h2 id="privacy-heading" className="text-xl font-extrabold text-ink">
          {t('teachers.privacy.heading')}
        </h2>
        <p className="mt-2 text-lg leading-relaxed text-ink">{t('teachers.privacy.text')}</p>
        <p className="mt-3">
          <Link to="/accessibility" className="tap-target font-bold text-brand-700 underline decoration-2 underline-offset-4">
            {t('teachers.privacy.link')}
          </Link>
        </p>
      </section>
    </div>
  )
}
