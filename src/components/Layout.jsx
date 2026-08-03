import { useEffect, useRef } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { BookOpen, Home, Info, Map, Users } from 'lucide-react'
import { site } from '@/config/site.js'
import { useProgress } from '@/hooks/useProgress.jsx'
import LanguageToggle from '@/components/LanguageToggle.jsx'
import { useT } from '@/i18n/LanguageProvider.jsx'

const NAV = [
  { to: '/', labelKey: 'nav.home', icon: Home, end: true },
  { to: '/dictionary', labelKey: 'nav.dictionary', icon: BookOpen },
  { to: '/teachers', labelKey: 'nav.teachers', icon: Users },
  { to: '/accessibility', labelKey: 'nav.access', icon: Info },
]

function NavItem({ to, label, icon: Icon, end, currentLabel }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `tap-target flex-col gap-0.5 rounded-xl px-2 py-2 text-xs font-extrabold transition sm:flex-row sm:gap-2 sm:px-3 sm:text-sm ${
          isActive ? 'bg-ink text-surface' : 'text-ink hover:bg-brand-100'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon className="h-6 w-6" aria-hidden="true" />
          <span>{label}</span>
          {/* Current page is marked in text as well as by colour. */}
          {isActive && <span className="sr-only">{currentLabel}</span>}
        </>
      )}
    </NavLink>
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

      {/* Light header, hairline instead of a filled bar: in a neutral scheme
          the chrome recedes and the content is the only thing with weight. */}
      <header className="border-b border-brand-100 bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="tap-target gap-3 rounded-xl px-2 py-1 text-ink hover:bg-brand-50">
            <Map className="h-8 w-8 text-clay-500" aria-hidden="true" />
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
              anything else. */}
          <LanguageToggle />

          {/* The nav takes the full width and wraps on a narrow screen, so the
              page still reflows to 320px with no sideways scrolling. */}
          <nav aria-label={t('nav.label')} className="w-full sm:w-auto">
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
      <footer className="bg-brand-800 text-brand-100">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
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
      </footer>
    </div>
  )
}
