import { Link } from 'react-router-dom'
import ConceptIcon from '@/components/icons/ConceptIcon.jsx'
import usePageTitle from '@/hooks/usePageTitle.js'
import { useT } from '@/i18n/LanguageProvider.jsx'

export default function NotFound() {
  const t = useT()
  usePageTitle(t('notfound.pageTitle'))

  return (
    <div className="mx-auto max-w-lg space-y-5 text-center">
      <ConceptIcon
        name="question"
        className="mx-auto h-24 w-24 text-brand-500"
        title={t('notfound.iconAlt')}
      />
      <h1 className="text-3xl font-extrabold text-ink">{t('notfound.heading')}</h1>
      <p className="text-lg text-muted">{t('notfound.text')}</p>
      <Link to="/" className="btn-primary">
        {t('notfound.cta')}
      </Link>
    </div>
  )
}
