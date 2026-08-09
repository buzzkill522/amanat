import { Check, CircleDot } from 'lucide-react'
import usePageTitle from '@/hooks/usePageTitle.js'
import { site, signLanguage } from '@/config/site.js'
import { useT } from '@/i18n/LanguageProvider.jsx'

/**
 * The conformance statement.
 *
 * The prose is translated; the WCAG criterion references are not, and that is
 * deliberate. "1.4.3 Contrast (Minimum)" is a formal identifier into an English
 * standard, quoted the same way in conformance claims everywhere, and an
 * evaluator arriving at this page needs the exact string they can search for.
 * Translating it would make the claim harder to check, not easier to read.
 *
 * Each section names its group key and how many points it has, and the text
 * comes from i18n. Keeping the count here rather than the sentences means a
 * missing translation shows up as a visible key rather than as a section that
 * silently loses a line.
 */
const MET = [
  { key: 'sound', points: 5, criteria: '1.2.2 Captions, 1.2.3 Audio Description or Alternative, 1.4.2 Audio Control' },
  { key: 'colour', points: 3, criteria: '1.4.1 Use of Colour, 1.3.3 Sensory Characteristics' },
  { key: 'contrast', points: 5, criteria: '1.4.3 Contrast (Minimum), 1.4.4 Resize Text, 1.4.10 Reflow, 1.4.12 Text Spacing' },
  { key: 'keyboard', points: 5, criteria: '2.1.1 Keyboard, 2.4.3 Focus Order, 2.4.7 Focus Visible, 2.4.11 Focus Not Obscured' },
  { key: 'target', points: 3, criteria: '2.5.8 Target Size (Minimum)' },
  { key: 'motion', points: 3, criteria: '2.3.3 Animation from Interactions, 2.2.2 Pause, Stop, Hide' },
  { key: 'plain', points: 4, criteria: '3.1.5 Reading Level (AAA, followed anyway)' },
  { key: 'structure', points: 5, criteria: '1.3.1 Info and Relationships, 2.4.2 Page Titled, 4.1.2 Name Role Value, 4.1.3 Status Messages' },
]

export default function Accessibility() {
  const t = useT()
  usePageTitle(t('a11y.pageTitle'))

  const sign = signLanguage.label

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-extrabold text-ink">{t('a11y.heading')}</h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">
          {t('a11y.lead', { site: site.name })}
        </p>
        <p className="mt-3 max-w-3xl text-lg text-muted">{t('a11y.reviewed')}</p>
      </header>

      {MET.map(({ key, points, criteria }) => (
        <section key={key} className="card p-6" aria-labelledby={`a11y-${key}`}>
          <h2 id={`a11y-${key}`} className="text-2xl font-extrabold text-ink">
            {t(`a11y.${key}.group`)}
          </h2>
          <p className="mt-1 text-sm font-bold uppercase tracking-wide text-brand-700">
            {criteria}
          </p>
          <ul className="mt-4 space-y-3">
            {Array.from({ length: points }, (_, i) => (
              <li key={i} className="flex gap-3 text-lg leading-relaxed text-ink">
                <Check className="mt-1 h-6 w-6 shrink-0 text-grow-600" aria-hidden="true" />
                {t(`a11y.${key}.p${i + 1}`, { sign })}
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/* Being honest about what is not done yet is part of the standard
          (WCAG conformance claims require listing known limitations). */}
      <section className="card border-4 border-sun-500 p-6" aria-labelledby="gaps-heading">
        <h2 id="gaps-heading" className="text-2xl font-extrabold text-ink">
          {t('a11y.gaps.heading')}
        </h2>
        <ul className="mt-4 space-y-3">
          {[1, 2, 3].map((n) => (
            <li key={n} className="flex gap-3 text-lg leading-relaxed text-ink">
              <CircleDot className="mt-1 h-6 w-6 shrink-0 text-sun-600" aria-hidden="true" />
              {t(`a11y.gaps.p${n}`, { sign })}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl bg-brand-50 p-6" aria-labelledby="feedback-heading">
        <h2 id="feedback-heading" className="text-xl font-extrabold text-ink">
          {t('a11y.feedback.heading')}
        </h2>
        <p className="mt-2 text-lg leading-relaxed text-ink">{t('a11y.feedback.text')}</p>
      </section>
    </div>
  )
}
