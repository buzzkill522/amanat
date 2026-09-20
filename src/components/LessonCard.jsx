import { Link } from 'react-router-dom'
import { CheckCircle2, Lock, PlayCircle } from 'lucide-react'
import ConceptIcon from '@/components/icons/ConceptIcon.jsx'
import { useT } from '@/i18n/LanguageProvider.jsx'

// Every accent name resolves to the same neutral tone.
//
// The keys are kept because they are a content API - modules, levels,
// dictionary categories and schemes all name an accent in their JSON, and
// dropping the names would mean editing content to change a colour. In the
// monochrome scheme they simply all land on the neutral ramp: hue is no
// longer how one lesson is told from another, the icon and the title are.
//
// Completed lessons use gold, a tick and a written status label.
const NEUTRAL = { ring: 'border-brand-500', chip: 'bg-brand-100 text-brand-700', icon: 'text-brand-600' }
const ACCENTS = { grow: NEUTRAL, brand: NEUTRAL, sun: NEUTRAL, berry: NEUTRAL }

/**
 * One lesson, shown as a card.
 *
 * Three states, each carried by THREE signals at once - an icon, a word, and a
 * colour - so no child depends on being able to tell the colours apart:
 *   locked    padlock icon   + "Locked"    + grey
 *   open      play icon      + "Start"     + accent colour
 *   completed tick icon      + "Complete"  + gold
 */
export default function LessonCard({ module, levelId, state = 'open', stepNumber }) {
  const t = useT()
  const accent = ACCENTS[module.accent] || ACCENTS.brand
  const locked = state === 'locked'
  const completed = state === 'completed'

  const statusLabel = locked ? t('lessoncard.locked') : completed ? t('lessoncard.complete') : t('lessoncard.start')
  const StatusIcon = locked ? Lock : completed ? CheckCircle2 : PlayCircle

  const shell = `group relative flex w-full items-center gap-4 rounded-3xl border-4 p-4 text-left transition ${
    locked
      ? 'cursor-not-allowed border-brand-100 bg-brand-50'
      : completed
        ? 'border-gold-700 bg-surface hover:bg-gold-100'
        : `${accent.ring} bg-surface hover:-translate-y-0.5 hover:shadow-lg`
  }`

  const inner = (
    <>
      <span
        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${
          locked ? 'bg-surface text-muted' : completed ? 'bg-gold-100 text-gold-600' : accent.chip
        }`}
      >
        <ConceptIcon name={module.icon} className="h-10 w-10" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold uppercase tracking-wide text-muted">
          {t('lessoncard.lessonN', { n: stepNumber })}
        </span>
        <span className={`block text-xl font-extrabold leading-tight ${locked ? 'text-muted' : 'text-ink'}`}>
          {module.moduleTitle}
        </span>
        <span className="mt-1 block text-base text-muted">
          {locked ? t('lessoncard.lockedHint') : module.title}
        </span>
      </span>

      <span
        // 14px: this word is the non-colour encoding of locked/open/done.
        className={`flex shrink-0 flex-col items-center gap-1 rounded-2xl px-3 py-2 text-sm font-extrabold uppercase ${
          locked ? 'bg-surface text-muted' : completed ? 'bg-gold-500 text-[#161616]' : 'bg-brand-600 text-surface'
        }`}
      >
        <StatusIcon className="h-6 w-6" aria-hidden="true" />
        {statusLabel}
      </span>
    </>
  )

  if (locked) {
    return (
      <div className={shell} aria-disabled="true">
        {inner}
        {/* The reason is in the visible text above; this repeats it for AT. */}
        <span className="sr-only">
          {t('lessoncard.lockedSr', { title: module.moduleTitle, n: stepNumber - 1 })}
        </span>
      </div>
    )
  }

  return (
    <Link
      to={`/path/${levelId}/lesson/${module.id}`}
      className={shell}
      aria-label={t('lessoncard.ariaLabel', {
        status: statusLabel,
        n: stepNumber,
        title: module.moduleTitle,
      })}
    >
      {inner}
    </Link>
  )
}
