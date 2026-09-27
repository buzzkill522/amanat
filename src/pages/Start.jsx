import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Languages } from 'lucide-react'
import LanguageToggle from '@/components/LanguageToggle.jsx'
import LevelSelector from '@/components/LevelSelector.jsx'
import { useT } from '@/i18n/LanguageProvider.jsx'
import usePageTitle from '@/hooks/usePageTitle.js'

export default function Start() {
  const t = useT()
  const [step, setStep] = useState(1)
  const heading = useRef(null)
  usePageTitle(t('start.heading'))
  useEffect(() => { if (step > 1) heading.current?.focus() }, [step])
  return (
    <div className="space-y-8">
      <header className="max-w-2xl space-y-3">
        <h1 className="text-4xl font-extrabold">{t('start.heading')}</h1>
        <p className="text-lg text-muted">{t('start.intro')}</p>
      </header>
      <section className="card space-y-6 p-6 sm:p-8" aria-labelledby="start-step">
        <p className="font-bold text-gold-600">{t('start.step', { n: step })}</p>
        <h2 id="start-step" ref={heading} tabIndex={-1} className="text-2xl font-extrabold">{t(step === 1 ? 'start.language' : step === 2 ? 'start.how' : 'start.level')}</h2>
        {step === 1 && <><Languages className="h-10 w-10 text-gold-600" aria-hidden="true" /><LanguageToggle /></>}
        {step === 2 && <><BookOpen className="h-10 w-10 text-gold-600" aria-hidden="true" /><p className="max-w-2xl text-lg leading-relaxed text-muted">{t('start.howText')}</p></>}
        {step === 3 && <><p className="text-lg text-muted">{t('start.levelText')}</p><LevelSelector headingId="start-step" /></>}
        <div className="flex flex-wrap gap-3">
          {step > 1 && <button className="btn-secondary" onClick={() => setStep(step - 1)}>{t('start.back')}</button>}
          {step < 3 && <button className="btn-primary" onClick={() => setStep(step + 1)}>{t('start.next')}</button>}
        </div>
      </section>
      <Link to="/lessons" className="tap-target font-bold underline">{t('start.skip')}</Link>
    </div>
  )
}
