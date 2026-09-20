import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Eye, Users } from 'lucide-react'
import usePageTitle from '@/hooks/usePageTitle.js'
import { useT } from '@/i18n/LanguageProvider.jsx'

const PRINCIPLES = [
  { key: 'access', icon: Eye },
  { key: 'practice', icon: BookOpen },
  { key: 'pace', icon: Users },
]

export default function Mission() {
  const t = useT()
  usePageTitle(t('nav.mission'))

  return (
    <div className="space-y-12 sm:space-y-16">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <header className="min-w-0 space-y-5">
        <p className="inline-block rounded-full bg-gold-100 px-4 py-2 font-bold text-gold-600">
          {t('nav.mission')}
        </p>
        <h1 className="text-4xl font-extrabold leading-tight text-ink sm:text-5xl sm:leading-tight">
          {t('mission.heading')}
        </h1>
        <p className="text-xl leading-relaxed text-muted">{t('mission.lead')}</p>
      </header>
      <figure className="min-w-0">
        <img
          src="/mission-learning.jpg"
          alt={t('mission.image.alt')}
          width={1536}
          height={1024}
          decoding="async"
          className="h-auto w-full rounded-3xl"
        />
      </figure>
      </div>

      <section aria-labelledby="mission-why" className="rounded-3xl bg-gold-100 p-6 sm:p-8">
        <h2 id="mission-why" className="text-2xl font-extrabold text-ink">{t('mission.why.heading')}</h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink">{t('mission.why.text')}</p>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink">{t('mission.opportunity')}</p>
      </section>

      <section aria-labelledby="mission-principles">
        <h2 id="mission-principles" className="text-3xl font-extrabold text-ink">{t('mission.principles')}</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          {PRINCIPLES.map(({ key, icon: Icon }) => (
            <div key={key} className="space-y-3">
              <Icon className="h-8 w-8 text-gold-600" aria-hidden="true" />
              <h3 className="text-xl font-extrabold text-ink">{t(`mission.${key}.heading`)}</h3>
              <p className="text-lg leading-relaxed text-muted">{t(`mission.${key}.text`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="mission-progress" className="card p-6 sm:p-8">
        <h2 id="mission-progress" className="text-2xl font-extrabold text-ink">{t('mission.progress.heading')}</h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">{t('mission.progress.text')}</p>
        <Link to="/teachers#accessibility" className="tap-target mt-4 font-bold text-ink underline decoration-2 underline-offset-4">
          {t('mission.progress.link')}
        </Link>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link to="/lessons" className="btn-primary">
          {t('mission.lessons')} <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
        <Link to="/teachers" className="btn-secondary">{t('mission.teachers')}</Link>
      </div>
    </div>
  )
}
