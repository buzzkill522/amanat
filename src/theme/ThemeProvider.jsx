import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'amanat.theme.v1'

export const THEMES = ['light', 'dark']

const ThemeContext = createContext(null)

/**
 * What the device asks for, when nobody has chosen.
 *
 * Read rather than assumed: a child handed a tablet that is already in dark
 * mode should not have to find a control to stop the page glaring at them, and
 * a teacher who has never thought about it should get the light page the site
 * was designed in.
 */
export function systemTheme() {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

function readStored() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (THEMES.includes(saved)) return { theme: saved, followSystem: false }
  } catch {
    // Private browsing, or storage switched off. Following the device is fine.
  }
  return { theme: systemTheme(), followSystem: true }
}

export function ThemeProvider({ children }) {
  const [state, setState] = useState(readStored)
  const { theme, followSystem } = state

  // Keep following the device until the reader overrides it. Someone whose
  // phone switches to dark at sunset should see this page switch too, without
  // having had to predict that in advance.
  useEffect(() => {
    if (!followSystem) return undefined
    let mq
    try {
      mq = window.matchMedia('(prefers-color-scheme: dark)')
    } catch {
      return undefined
    }
    const onChange = (e) => setState({ theme: e.matches ? 'dark' : 'light', followSystem: true })
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [followSystem])

  useEffect(() => {
    const root = document.documentElement

    // Switch without animating.
    //
    // Most interactive elements carry `transition`, which covers colour and
    // background-colour. Changing the theme therefore cross-fades the entire
    // page over 150ms, and a foreground and its background interpolate
    // *through each other* on the way - every label on the page passes through
    // low contrast, and some through none at all, before settling. It reads as
    // a glitch rather than a transition, and it is worst for exactly the
    // reader who reached for the dark theme because bright change hurts.
    //
    // Suppressed, then re-enabled after forcing a style flush, so the switch is
    // instant while hover and focus transitions keep working afterwards. The
    // flush is synchronous on purpose: a rAF callback would not fire on a
    // background tab, which would leave transitions off for good.
    root.setAttribute('data-theme-switching', '')
    root.setAttribute('data-theme', theme)
    void root.offsetHeight
    root.removeAttribute('data-theme-switching')

    // The browser paints its own chrome from this - the address bar on
    // Android, the title bar on some desktops. Left alone it would keep the
    // light theme's beige above a dark page. The value is read back out of the
    // stylesheet rather than written here, so it cannot drift from the palette.
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      const surface = getComputedStyle(root).getPropertyValue('--c-surface').trim()
      if (surface) meta.setAttribute('content', `rgb(${surface.replace(/\s+/g, ' ')})`)
    }
  }, [theme])

  const setTheme = useCallback((next) => {
    if (!THEMES.includes(next)) return
    setState({ theme: next, followSystem: false })
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Not being able to remember the choice is not worth an error. The
      // page still switches; it just will not survive a reload.
    }
  }, [])

  const value = useMemo(
    () => ({ theme, setTheme, followSystem, isDark: theme === 'dark' }),
    [theme, setTheme, followSystem],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
