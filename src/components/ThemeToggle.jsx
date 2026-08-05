import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/theme/ThemeProvider.jsx'
import { useT } from '@/i18n/LanguageProvider.jsx'

/**
 * Both themes on screen at once, for the same reason both languages are.
 *
 * A single switch has to describe the state you are *not* in — "dark mode",
 * shown while you are in light mode, is read by plenty of people as a label
 * for where they are rather than where the button would take them. Two
 * buttons with the live one marked has no such ambiguity, and each carries a
 * picture as well as a word, so it does not depend on reading at all.
 *
 * Deliberately not an icon-only control: this site is used by children who are
 * still learning to read English *and* by teachers, and a bare crescent moon
 * is a convention you have to have been taught. The word carries the meaning
 * and the icon supports it (WCAG 1.4.1, and the same rule the rest of the UI
 * follows — never colour or picture alone).
 */
export default function ThemeToggle({ className = '' }) {
  const { theme, setTheme } = useTheme()
  const t = useT()

  const options = [
    { code: 'light', labelKey: 'theme.light', icon: Sun },
    { code: 'dark', labelKey: 'theme.dark', icon: Moon },
  ]

  return (
    <div
      className={`flex items-center gap-1 rounded-xl border border-brand-100 bg-brand-50 p-1 ${className}`}
      role="group"
      aria-label={t('theme.label')}
    >
      {options.map(({ code, labelKey, icon: Icon }) => {
        const active = code === theme
        return (
          <button
            key={code}
            type="button"
            onClick={() => setTheme(code)}
            aria-pressed={active}
            className={`tap-target gap-1.5 rounded-lg px-3 py-1.5 text-sm font-extrabold transition ${
              active ? 'bg-ink text-surface' : 'text-ink hover:bg-brand-100'
            }`}
          >
            <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            {t(labelKey)}
            {/* Marked in text as well as in colour, for anyone who cannot see
                the highlight (WCAG 1.4.1 Use of Colour). */}
            {active && <span className="sr-only"> ({t('theme.selected')})</span>}
          </button>
        )
      })}
    </div>
  )
}
