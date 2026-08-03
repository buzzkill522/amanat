import { Link } from 'react-router-dom'
import ConceptIcon from '@/components/icons/ConceptIcon.jsx'
import usePageTitle from '@/hooks/usePageTitle.js'

export default function NotFound() {
  usePageTitle('Page not found')

  return (
    <div className="mx-auto max-w-lg space-y-5 text-center">
      <ConceptIcon name="question" className="mx-auto h-24 w-24 text-brand-500" title="A question mark" />
      <h1 className="text-3xl font-extrabold text-ink">This page is not here</h1>
      <p className="text-lg text-muted">
        The link may be old, or a word in it may be spelled differently. Go back to the home page
        and start again.
      </p>
      <Link to="/" className="btn-primary">
        Go to the home page
      </Link>
    </div>
  )
}
