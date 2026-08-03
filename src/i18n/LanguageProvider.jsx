import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_LANGUAGE, LANGUAGES, strings } from '@/i18n/strings.js'

const STORAGE_KEY = 'amanat.lang.v1'
// Pre-rename key, read once so a reader who chose Hindi before the site was
// called Amanat does not land back in English.
const LEGACY_STORAGE_KEY = 'paisa-path.lang.v1'

const LanguageContext = createContext(null)

function readStored() {
  try {
    const saved =
      window.localStorage.getItem(STORAGE_KEY) ||
      window.localStorage.getItem(LEGACY_STORAGE_KEY)
    if (saved && strings[saved]) return saved
  } catch {
    // Private browsing, or storage switched off. The default is fine.
  }
  // Fall back to what the browser asks for, so a Hindi-first device opens in
  // Hindi without anyone having to find the button.
  const preferred = typeof navigator !== 'undefined' ? navigator.language || '' : ''
  return preferred.toLowerCase().startsWith('hi') ? 'hi' : DEFAULT_LANGUAGE
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStored)

  // The `lang` attribute is what tells a screen reader to switch voice, and
  // what tells the browser which font and hyphenation rules to use
  // (WCAG 3.1.1 Language of Page).
  useEffect(() => {
    const meta = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]
    document.documentElement.lang = meta.htmlLang
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Not being able to remember the choice is not worth an error.
    }
  }, [lang])

  /**
   * Look up a string. Unknown keys and untranslated keys both fall back to
   * English, then to the key itself, so the page never renders a blank.
   * `{placeholders}` in the string are replaced from `vars`.
   */
  const t = useCallback(
    (key, vars) => {
      const raw = strings[lang]?.[key] ?? strings.en[key] ?? key
      if (!vars) return raw
      return raw.replace(/\{(\w+)\}/g, (match, name) =>
        Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match,
      )
    },
    [lang],
  )

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
      isHindi: lang === 'hi',
      // The language that the toggle would move you to.
      other: LANGUAGES.find((l) => l.code !== lang) || LANGUAGES[0],
    }),
    [lang, t],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}

/** Shorthand for the common case: `const t = useT()`. */
export function useT() {
  return useLanguage().t
}
