import { useEffect } from 'react'
import { site } from '@/config/site.js'

/**
 * A single-page app does not change the document title on its own. Screen
 * reader users rely on it to know the page changed (WCAG 2.4.2 Page Titled).
 */
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`
  }, [title])
}
