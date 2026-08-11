import { useEffect, useRef } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { BadgeIndianRupee, BookOpen, GraduationCap, Home, Info, Users } from 'lucide-react'
import { site } from '@/config/site.js'
import { useProgress } from '@/hooks/useProgress.jsx'
import LanguageToggle from '@/components/LanguageToggle.jsx'
import ThemeToggle from '@/components/ThemeToggle.jsx'
import Logomark from '@/components/icons/Logomark.jsx'
import { useT } from '@/i18n/LanguageProvider.jsx'

// `alsoMatch` keeps a tab lit while the reader is deeper inside that section.
// Lessons themselves live under /path/:levelId, so without it the Lessons tab
// would go dark the moment you opened a lesson - exactly when you most want to
// know where you are.
const NAV = [
  { to: '/', labelKey: 'nav.home', icon: Home, end: true },
  { to: '/lessons', labelKey: 'nav.lessons', icon: GraduationCap, alsoMatch: '/path' },
  { to: '/dictionary', labelKey: 'nav.dictionary', icon: BookOpen },
  // In the main nav rather than inside the course, because the people who most
  // need it are families who have not started the course and may never - an
  // entitlement nobody claims is worth nothing.
  { to: '/schemes', labelKey: 'nav.schemes', icon: BadgeIndianRupee },
  { to: '/teachers', labelKey: 'nav.teachers', icon: Users },
  { to: '/accessibility', labelKey: 'nav.access', icon: Info },
]

// A plain Link rather than NavLink, because NavLink insists on deriving
// aria-current from its own path alone: on /path/level-1/lesson/x it would
// strip the attribute even though the Lessons tab is the section the reader
// is in. That would leave the tab visibly highlighted but silent to a screen
// reader - the exact split this site is built to avoid. Owning the active
// calculation keeps colour, text and aria-current saying the same thing.
function NavItem({ to, label, icon: Icon, end, currentLabel, alsoMatch }) {
  const { pathname } = useLocation()
  const onOwnPath = end ? pathname === to : pathname === to || pathname.startsWith(`${to}/`)
  const inSection = alsoMatch ? pathname.startsWith(alsoMatch) : false
  const active = onOwnPath || inSection

  return (
    <Link
      to={to}
      aria-current={active ? 'page' : undefined}
      // sm:px-3, not px-3.5. Six nav items sit in a max-w-6xl row beside the
      // brand, the language toggle and the theme button, and that row has
      // about 18px of slack at desktop width. Two extra pixels of padding a
      // side is 24px across six pills, which is enough to wrap the theme
      // button onto a line of its own and make the (now sticky) header half
      // as tall again. Measured, not guessed.
      className={`tap-target flex-col gap-0.5 rounded-full px-2 py-2 text-xs font-extrabold transition duration-200 sm:flex-row sm:gap-2 sm:px-3 sm:text-sm ${
        active
          ? 'bg-gradient-to-br from-clay-500 to-clay-700 text-white'
          : 'text-ink hover:bg-brand-100'
      }`}
    >
      <Icon className="h-6 w-6" aria-hidden="true" />
      <span>{label}</span>
      {/* Current page is marked in text as well as by colour. */}
      {active && <span className="sr-only">{currentLabel}</span>}
    </Link>
  )
}

export default function Layout() {
  const location = useLocation()
  const mainRef = useRef(null)
  const { storageBlocked } = useProgress()
  const t = useT()

  // On a single-page app the browser does not move focus when the URL changes.
  // Without this, a keyboard user stays parked on the old link.
  useEffect(() => {
    mainRef.current?.focus()
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        {t('skip.link')}
      </a>

      {/* Sticky and translucent, with the page blurred behind it.
          The chrome still recedes - hairline, no filled bar - but it now stays
          with the reader instead of scrolling away, which matters most on the
          long pages (a lesson, the schemes reference) where the nav was
          previously a scroll back to the top.

          `bg-surface/85` rather than something more glassy for a measurable
          reason: the contrast audit reads flat token colours and cannot see
          what is behind a translucent panel, so the further the opacity drops
          the less the measured header ratios mean. At 85% the worst case - a
          dark band scrolling underneath - shifts the effective background by
          a small fraction, and the header's text pairings (ink on surface at
          16:1) have far more headroom than that costs. `supports` keeps the
          panel fully opaque where backdrop-filter is unavailable, rather than
          leaving a washed-out bar.

          Sticky from `lg` only, and that is a measurement rather than taste.
          Six nav items, a two-line brand and two toggles fit on one row at
          desktop width - about 78px, a tenth of the viewport, which is a fair
          price for keeping the nav reachable on a long lesson. Below `lg` the
          same contents wrap to two and then three rows: 190px, 27% of the
          screen, permanently, on exactly the small devices that can least
          afford it. So the header scrolls away there, as it always did. */}
      <header className="z-40 border-b border-brand-100 bg-surface lg:sticky lg:top-0 supports-[backdrop-filter]:bg-surface/85 supports-[backdrop-filter]:backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="tap-target gap-3 rounded-full px-2 py-1 text-ink hover:bg-brand-50">
            <Logomark className="h-9 w-9 text-clay-500" />
            <span className="text-left">
              <span className="block text-xl font-extrabold leading-tight">
                {site.name}
                {/* Both scripts, always. The name is the same word either way,
                    and lang="hi" is what tells a screen reader to switch voice
                    and the browser to reach for the Devanagari face. */}
                <span lang="hi" className="ml-2 text-base font-bold text-muted">
                  {site.nameDevanagari}
                </span>
              </span>
              <span className="block text-xs font-bold text-muted">{t('site.tagline')}</span>
            </span>
          </Link>

          {/* Language sits in the header on every page, not buried in settings:
              a reader who cannot follow the English needs it before they need
              anything else. It keeps both words on screen because picking a
              language you cannot read from a label written in the other one is
              the problem it exists to solve. */}
          <LanguageToggle />

          {/* The nav takes the full width and wraps on a narrow screen, so the
              page still reflows to 320px with no sideways scrolling. */}
          <nav aria-label={t('nav.label')} className="w-full sm:w-auto sm:order-none order-last">
            <ul className="flex flex-wrap items-center justify-center gap-1">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavItem
                    {...item}
                    label={t(item.labelKey)}
                    currentLabel={t('nav.current')}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* Last in the row, so it lands in the top corner on a wide screen
              and stays on the first row beside the language buttons once the
              nav wraps to its own line. Kept in the header rather than on a
              settings page for the same reason language is: a reader who finds
              the light page painful to look at needs that fixed before they
              can read anything, and burying it assumes they go looking. */}
          <ThemeToggle />
        </div>
      </header>

      {storageBlocked && (
        <p role="alert" className="bg-sun-100 px-4 py-3 text-center text-sm font-bold text-sun-600">
          {t('storage.blocked')}
        </p>
      )}

      <main
        id="main"
        ref={mainRef}
        tabIndex={-1}
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 focus:outline-none"
      >
        <Outlet />
      </main>

      {/* No top margin: a page that ends in a full-bleed dark band butts
          straight onto the footer, and every other page already has its own
          breathing room from the padding on <main>. */}
      <footer className="bg-stage text-stage-ink">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm">{t('footer.blurb')}</p>
            <ul className="flex flex-wrap gap-4 text-sm font-bold">
              <li>
                <Link to="/accessibility" className="tap-target underline decoration-2 underline-offset-4 hover:text-white">
                  {t('footer.accessibility')}
                </Link>
              </li>
              <li>
                <Link to="/teachers" className="tap-target underline decoration-2 underline-offset-4 hover:text-white">
                  {t('footer.teachers')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Sits in the layout, so it is on every page including 404 without
              any page having to remember it.

              The year is read from the clock rather than typed, so it cannot
              quietly go stale - a hardcoded "2026" is only right until January,
              and nobody comes back to a footer to fix it. The name comes from
              site.js for the same reason: the site was called Paisa Path until
              August 2026, and a second hardcoded copy is a second thing to
              miss at the next rename. */}
          <p className="mt-6 border-t border-stage-muted/25 pt-5 text-sm text-stage-muted">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </footer>
    </div>
  )
}
