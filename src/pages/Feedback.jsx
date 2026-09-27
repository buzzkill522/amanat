import { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import usePageTitle from '@/hooks/usePageTitle.js'
import { useT } from '@/i18n/LanguageProvider.jsx'
import { downloadText } from '@/lib/download.js'

export default function Feedback() {
  const t = useT()
  const location = useLocation()
  const [page, setPage] = useState(location.state?.from || '')
  const [message, setMessage] = useState('')
  const [draft, setDraft] = useState('')
  const [status, setStatus] = useState('')
  const preview = useRef(null)
  usePageTitle(t('feedback.heading'))
  function prepare(event) {
    event.preventDefault()
    if (!message.trim()) { setStatus('feedback.empty'); return }
    setDraft(`${t('feedback.subject')}\n\n${t('feedback.page')} ${page.trim()}\n\n${message.trim()}`)
    setStatus('')
    window.requestAnimationFrame(() => preview.current?.focus())
  }
  async function copy() {
    try { await navigator.clipboard.writeText(draft); setStatus('feedback.copied') }
    catch { setStatus('feedback.copyFailed') }
  }
  return <div className="max-w-2xl space-y-6">
    <h1 className="text-4xl font-extrabold">{t('feedback.heading')}</h1>
    <p className="text-lg text-muted">{t('feedback.intro')}</p>
    <form onSubmit={prepare} className="space-y-5">
      <label className="block font-bold">{t('feedback.page')}<input className="mt-2 block min-h-11 w-full rounded-xl border-2 border-brand-400 bg-surface p-3" value={page} maxLength={200} onChange={event => setPage(event.target.value)} /></label>
      <label className="block font-bold">{t('feedback.message')}<textarea className="mt-2 block w-full rounded-xl border-2 border-brand-400 bg-surface p-3" rows={5} required maxLength={4000} value={message} onChange={event => setMessage(event.target.value)} aria-describedby="feedback-hint" /></label>
      <p id="feedback-hint" className="text-muted">{t('feedback.hint')}</p>
      <button className="btn-primary" type="submit">{t('feedback.prepare')}</button>
    </form>
    {draft && <section className="card space-y-4 p-5" aria-labelledby="feedback-preview">
      <h2 ref={preview} tabIndex={-1} id="feedback-preview" className="text-2xl font-bold">{t('feedback.preview')}</h2>
      <textarea readOnly aria-label={t('feedback.preview')} className="min-h-48 w-full rounded-xl border border-brand-400 bg-surface p-3" value={draft} />
      <div className="flex flex-wrap gap-3"><button className="btn-primary" onClick={copy}>{t('feedback.copy')}</button><button className="btn-secondary" onClick={() => { downloadText(draft, 'amanat-feedback.txt'); setStatus('feedback.saved') }}>{t('feedback.download')}</button></div>
    </section>}
    <p role="status" className="text-muted">{status && t(status)}</p>
  </div>
}
