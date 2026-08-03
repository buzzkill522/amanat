import { Languages } from 'lucide-react'
import { LANGUAGES } from '@/i18n/strings.js'
import { useLanguage } from '@/i18n/LanguageProvider.jsx'

/**
 * Both languages are on screen at once rather than behind a single toggle.
 *
 * A one-button switch has to name the language you are *not* in, which reads
 * backwards to plenty of people; showing both and marking the live one is
 * unambiguous, and the choice does not depend on reading the button label at
 * all — "हिन्दी" is written in the script it selects.
 */
export default function LanguageToggle({ className = '' }) {
  const { lang, setLang } = useLanguage()

  return (
    <div
      className={`flex items-center gap-1 rounded-xl border border-brand-100 bg-brand-50 p-1 ${className}`}
      role="group"
      aria-label="Language / भाषा"
    >
      <Languages className="ml-1.5 h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
      {LANGUAGES.map((l) => {
        const active = l.code === lang
        return (
          <button
            key={l.code}
            type="button"
            lang={l.htmlLang}
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            className={`tap-target rounded-lg px-3 py-1.5 text-sm font-extrabold transition ${
              active ? 'bg-ink text-surface' : 'text-ink hover:bg-brand-100'
            }`}
          >
            {l.label}
            {/* Marked in text as well as in colour, for anyone who cannot see
                the highlight (WCAG 1.4.1 Use of Colour). */}
            {active && <span className="sr-only"> (selected)</span>}
          </button>
        )
      })}
    </div>
  )
}
