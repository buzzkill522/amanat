import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/theme/ThemeProvider.jsx'
import { useT } from '@/i18n/LanguageProvider.jsx'

/**
 * One small button in the corner, showing the theme it would switch you to.
 *
 * A single icon is a learned convention rather than a self-evident one, which
 * is a real cost on a site read by children still learning English. Three
 * things carry that weight instead of a visible label:
 *
 *   - The accessible name is a whole sentence naming the action, not the state
 *     ("Switch to dark page colours"). A one-word label on a one-button switch
 *     is the genuinely ambiguous case - plenty of people read "Dark" as where
 *     they are rather than where the button goes. A verb cannot be read that
 *     way, and it is what a screen reader announces.
 *   - The same sentence is the `title`, so it appears on hover and on a long
 *     press as well as to assistive technology.
 *   - The icon shows the destination, matching the sentence: a moon while the
 *     page is light, because pressing it makes the page dark.
 *
 * Small is visual only. `tap-target` keeps the button 44x44 whatever the icon
 * measures, so WCAG 2.5.8 still holds - shrinking the drawing is a look, and
 * shrinking the hit area would be a defect, particularly on the shared tablets
 * this is used on.
 */
export default function ThemeToggle({ className = '' }) {
  const { theme, setTheme } = useTheme()
  const t = useT()

  const next = theme === 'dark' ? 'light' : 'dark'
  const Icon = next === 'dark' ? Moon : Sun
  const label = t(next === 'dark' ? 'theme.toDark' : 'theme.toLight')

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      title={label}
      aria-label={label}
      className={`tap-target rounded-xl border border-brand-100 bg-brand-50 text-ink transition hover:bg-brand-100 ${className}`}
    >
      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
    </button>
  )
}
