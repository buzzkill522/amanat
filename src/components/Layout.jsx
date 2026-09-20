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
  { to: '/our-mission', labelKey: 'nav.mission', icon: Info },
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
      // sm:px-2.5, and every pixel of that is spoken for. Six nav pills share
      // a max-w-6xl row with the brand, the language toggle and the theme
      // button, and the row runs out at 1120px of content. Each pixel of
      // horizontal padding costs twelve across six pills, so this is the step
      // that decides whether the theme button sits on the same line or drops
      // to one of its own and doubles the height of a sticky header.
      // `tap-target` still holds the 44px minimum, so the target does not
      // shrink with the padding - only the pill's drawn width does.
      // Measured, not guessed; see the header comment below.
      className={`tap-target flex-col gap-0.5 rounded-full px-2 py-2 text-xs font-extrabold transition duration-200 sm:flex-row sm:gap-1.5 sm:px-2.5 sm:text-sm ${
        active
          ? 'bg-clay-500 text-white'
          : 'text-ink hover:bg-brand-100'
      }`}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
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

  // Teacher resources share one page. Run after route focus so bookmarked
  // section links land on their heading without changing lesson hash behavior.
  useEffect(() => {
    if (location.pathname !== '/teachers' || !location.hash) return undefined
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(location.hash.slice(1))
      if (!target || !mainRef.current?.contains(target)) return
      target.focus({ preventScroll: true })
      target.scrollIntoView({ block: 'start' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [location.pathname, location.hash, location.key])

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

          Sticky from `xl` only, and that is a measurement rather than taste.
          Six nav pills, a two-line brand and two toggles need about 1114px of
          content width to sit on one row; at `xl` there are 1120px, and the
          header is 78px - a tenth of the viewport, a fair price for keeping
          the nav reachable on a long lesson.

          Narrower than that and the same contents wrap: 134px and two rows in
          the 1024-1280 band, 190px and three on a phone. This was gated at
          `lg` for a while and that was wrong - measured at 1100px it was
          sticky, two rows, and 17% of the screen permanently. A header that
          costs a sixth of a small laptop's viewport to save a scroll is not a
          trade worth making, so below `xl` it scrolls away as it always did.

          The one-row fit has been broken twice by unrelated changes - wider
          nav padding once, a larger Devanagari name and tagline the second
          time - because the margin is single digits. If something is added to
          this row, expect to pay for it somewhere else in it. */}
      <header className="z-40 border-b border-brand-100 bg-surface xl:sticky xl:top-0 supports-[backdrop-filter]:bg-surface/85 supports-[backdrop-filter]:backdrop-blur-xl">
        {/* A thin accent rule across the very top of the page.
            Decorative, so it is hidden from assistive tech - it says nothing
            a screen reader needs. Flat gold: at 4px tall the accent reads as a
            line rather than as a fill, which is the one shape bright gold can
            take on a light page without being asked to carry meaning. It also
            gives the header an edge to sit under when it is stuck to the top
            of the viewport. */}
        <div
          aria-hidden="true"
          className="h-1 w-full bg-gold-500"
        />

        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="tap-target gap-3 rounded-full px-2 py-1 text-ink hover:bg-brand-50">
            <Logomark className="h-9 w-9 text-ink" />
            <span className="text-left">
              <span className="block text-xl font-extrabold leading-tight">
                {site.name}
                {/* Both scripts, always. The name is the same word either way,
                    and lang="hi" is what tells a screen reader to switch voice
                    and the browser to reach for the Devanagari face. */}
                {/* Sized ABOVE the Latin beside it, not below.
                    Devanagari hangs matras above and below the base line, so
                    at a matching nominal size it reads visibly smaller than
                    Latin - and this was set two steps down, 16px against 20px,
                    which compounded that until the Hindi name looked like a
                    footnote to the English one. They are the same word. 22px
                    is the Latin size plus ten percent, the usual correction
                    when the two scripts sit together; it makes them look equal
                    rather than measure equal. Weight and colour still keep the
                    Latin primary. */}
                <span lang="hi" className="ml-2 text-[1.375rem] font-bold leading-none text-muted">
                  {site.nameDevanagari}
                </span>
              </span>
              {/* 14px, not 12px. Nothing on a page read by children learning to
                  read should be smaller than this; 12px was the smallest text
                  on the site.

                  It does not drive the header's width, which is worth writing
                  down because it looks like it should: the brand block is as
                  wide as its widest line, and that is the name row, not this.
                  Hiding this saves height, never a pixel of width. */}
              <span className="block text-sm font-bold text-muted">{t('site.tagline')}</span>
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
                <Link to="/teachers#accessibility" className="tap-target underline decoration-2 underline-offset-4 hover:text-white">
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
