import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import usePageTitle from '@/hooks/usePageTitle.js'
import { useT } from '@/i18n/LanguageProvider.jsx'

export default function Help() {
  const t = useT()
  usePageTitle(t('help.heading'))
  return <div className="max-w-3xl space-y-8">
    <header className="space-y-4"><h1 className="text-4xl font-extrabold">{t('help.heading')}</h1><p className="text-xl text-muted">{t('help.intro')}</p></header>
    <section className="rounded-3xl bg-gold-100 p-6" aria-labelledby="help-steps">
      <h2 id="help-steps" className="text-2xl font-extrabold">{t('help.steps')}</h2>
      <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg">{[1, 2, 3, 4].map(n => <li key={n}>{t(`help.step${n}`)}</li>)}</ol>
    </section>
    <Link to="/schemes" className="btn-primary">{t('help.directory')}<ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
    <p className="text-muted">{t('help.note')}</p>
    <section className="border-t border-brand-100 pt-6"><h2 className="text-xl font-bold">{t('help.feedback')}</h2><Link to="/feedback" className="tap-target mt-3 font-bold underline">{t('feedback.link')}</Link></section>
  </div>
}
