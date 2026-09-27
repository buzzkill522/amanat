import { createContext, useContext, useEffect, useState } from 'react'
import { useT } from '@/i18n/LanguageProvider.jsx'

const OfflineContext = createContext(null)

export function OfflineProvider({ children }) {
  const [online, setOnline] = useState(() => navigator.onLine)
  const [status, setStatus] = useState('idle')
  const [registration, setRegistration] = useState(null)
  const [waiting, setWaiting] = useState(null)
  const [installPrompt, setInstallPrompt] = useState(null)
  const [installed, setInstalled] = useState(() => window.matchMedia('(display-mode: standalone)').matches)

  useEffect(() => {
    const connection = () => setOnline(navigator.onLine)
    const prompt = event => { event.preventDefault(); setInstallPrompt(event) }
    const finishInstall = () => { setInstalled(true); setInstallPrompt(null) }
    window.addEventListener('online', connection)
    window.addEventListener('offline', connection)
    window.addEventListener('beforeinstallprompt', prompt)
    window.addEventListener('appinstalled', finishInstall)
    let cancelled = false
    if (import.meta.env.PROD && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration('/').then(reg => {
        if (!cancelled && reg) { setRegistration(reg); if (reg.active) setStatus('ready'); reg.update().catch(() => {}) }
      }).catch(() => {})
    }
    return () => {
      cancelled = true
      window.removeEventListener('online', connection)
      window.removeEventListener('offline', connection)
      window.removeEventListener('beforeinstallprompt', prompt)
      window.removeEventListener('appinstalled', finishInstall)
    }
  }, [])

  useEffect(() => {
    if (!registration) return undefined
    setWaiting(registration.waiting)
    let worker
    const stateChange = () => {
      if (worker?.state === 'installed') {
        if (registration.active) setStatus('ready')
        setWaiting(registration.waiting)
      }
      if (worker?.state === 'activated') { setStatus('ready'); setWaiting(null) }
      if (worker?.state === 'redundant') setStatus('error')
    }
    const found = () => {
      worker?.removeEventListener('statechange', stateChange)
      worker = registration.installing
      worker?.addEventListener('statechange', stateChange)
      stateChange()
    }
    found()
    registration.addEventListener('updatefound', found)
    return () => {
      registration.removeEventListener('updatefound', found)
      worker?.removeEventListener('statechange', stateChange)
    }
  }, [registration])

  async function saveOffline() {
    setStatus('saving')
    try {
      const reg = await navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' })
      setRegistration(reg)
      if (reg.active) { setStatus('ready'); await reg.update() }
      else navigator.serviceWorker.ready.then(() => { setStatus('ready'); setWaiting(null) }).catch(() => setStatus('error'))
    } catch { setStatus('error') }
  }
  async function install() {
    if (!installPrompt) return
    await installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
  }
  function update() {
    if (!waiting) return
    navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload(), { once: true })
    waiting.postMessage({ type: 'ACTIVATE_UPDATE' })
  }
  return <OfflineContext.Provider value={{ online, status, saveOffline, waiting, update, installPrompt, install, installed }}>{children}</OfflineContext.Provider>
}

export function OfflineNotice() {
  const t = useT()
  const { online, waiting } = useContext(OfflineContext)
  if (online && !waiting) return null
  return <p role="status" className="bg-gold-100 px-4 py-3 text-center text-gold-600">{t(online ? 'offline.updateNotice' : 'offline.notice')}</p>
}

export default function OfflineTools() {
  const t = useT()
  const { online, status, saveOffline, waiting, update, installPrompt, install, installed } = useContext(OfflineContext)
  const supported = import.meta.env.PROD && 'serviceWorker' in navigator
  return (
    <section aria-labelledby="offline-heading" className="card space-y-4 p-6">
      <h2 id="offline-heading" tabIndex={-1} className="text-2xl font-extrabold">{t('offline.heading')}</h2>
      <p className="text-lg text-muted">{t('offline.description')}</p>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={saveOffline} disabled={!supported || !online || status === 'saving'} className="btn-primary disabled:opacity-60">{t(status === 'saving' ? 'offline.saving' : status === 'ready' ? 'offline.check' : 'offline.save')}</button>
        {installPrompt && <button type="button" className="btn-secondary" onClick={install}>{t('offline.install')}</button>}
        {waiting && <button type="button" className="btn-secondary" onClick={update}>{t('offline.update')}</button>}
      </div>
      <p role="status" className="text-muted">{t(!supported ? 'offline.preview' : `offline.${status}`)}</p>
      <p className="text-sm text-muted">{t(installed ? 'offline.installed' : 'offline.installHelp')}</p>
      {waiting && <p className="text-sm text-muted">{t('offline.updateHelp')}</p>}
    </section>
  )
}
