import { Link } from 'react-router-dom'
import { ArrowRight, BatteryCharging, BriefcaseBusiness, ExternalLink, Factory, Sun } from 'lucide-react'
import usePageTitle from '@/hooks/usePageTitle.js'
import { useT } from '@/i18n/LanguageProvider.jsx'

// Sources describe training and occupations, not current vacancies or pay.
// Never turn these examples into a promise of placement or a salary ranking.
const PATHS = [
  { id: 'semiconductor', icon: Factory, source: 'https://essc-india.org/semicon/', sourceName: 'ESSCI' },
  { id: 'electronics', icon: BatteryCharging, source: 'https://essc-india.org/naps.php', sourceName: 'ESSCI' },
  { id: 'energy', icon: Sun, source: 'https://mnre.gov.in/en/skill-development-programme/', sourceName: 'MNRE' },
  { id: 'service', icon: BriefcaseBusiness, source: 'https://hte.rajasthan.gov.in/college/gcdanddjrp', sourceName: 'Government Deaf and Dumb College, Jaipur' },
]

export default function Careers() {
  const t = useT()
  usePageTitle(t('careers.pageTitle'))

  return (
    <div className="space-y-12 pb-8">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-gold-600">{t('careers.eyebrow')}</p>
        <h1 className="text-4xl font-extrabold leading-tight text-ink sm:text-5xl">{t('careers.heading')}</h1>
        <p className="text-lg leading-relaxed text-muted">{t('careers.lead')}</p>
      </header>

      <section aria-labelledby="paths-heading" className="space-y-5">
        <h2 id="paths-heading" className="text-2xl font-extrabold text-ink">{t('careers.pathsHeading')}</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {PATHS.map(({ id, icon: Icon, source, sourceName }) => (
            <article key={id} className="card flex h-full flex-col p-6">
              <Icon className="h-9 w-9 text-gold-600" aria-hidden="true" />
              <h3 className="mt-4 text-2xl font-extrabold text-ink">{t(`careers.${id}.title`)}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted">{t(`careers.${id}.short`)}</p>
              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="font-extrabold text-ink">{t('careers.rolesLabel')}</dt>
                  <dd className="mt-1 leading-relaxed text-muted">{t(`careers.${id}.roles`)}</dd>
                </div>
                <div>
                  <dt className="font-extrabold text-ink">{t('careers.startLabel')}</dt>
                  <dd className="mt-1 leading-relaxed text-muted">{t(`careers.${id}.start`)}</dd>
                </div>
              </dl>
              <a href={source} target="_blank" rel="noopener noreferrer" className="tap-target mt-auto gap-2 pt-5 font-extrabold text-ink underline decoration-2 underline-offset-4">
                {t('careers.source', { name: sourceName })}
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="sr-only">{t('careers.newTab')}</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="compare-heading" className="rounded-3xl bg-brand-50 p-6 sm:p-8">
        <h2 id="compare-heading" className="text-2xl font-extrabold text-ink">{t('careers.compareHeading')}</h2>
        <p className="mt-2 max-w-3xl text-lg leading-relaxed text-muted">{t('careers.compareLead')}</p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <li key={n} className="flex gap-3 text-base leading-relaxed text-ink">
              <span className="font-extrabold text-gold-600">{n}.</span>
              {t(`careers.compare${n}`)}
            </li>
          ))}
        </ol>
        <p className="mt-5 text-base font-bold leading-relaxed text-ink">{t('careers.payCaution')}</p>
      </section>

      <section aria-labelledby="next-heading" className="space-y-4">
        <h2 id="next-heading" className="text-2xl font-extrabold text-ink">{t('careers.nextHeading')}</h2>
        <p className="max-w-3xl text-lg leading-relaxed text-muted">{t('careers.nextLead')}</p>
        <div className="flex flex-wrap gap-3">
          <a href="https://pmdaksh.depwd.gov.in/" target="_blank" rel="noopener noreferrer" className="btn-secondary gap-2">
            {t('careers.daksh')} <ExternalLink className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">{t('careers.newTab')}</span>
          </a>
          <Link to="/schemes" className="btn-secondary gap-2">
            {t('careers.schemes')} <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-muted">{t('careers.dateNote')}</p>
      </section>
    </div>
  )
}
