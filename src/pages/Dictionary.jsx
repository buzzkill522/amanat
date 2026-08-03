import { useMemo, useState } from 'react'
import { Hand, Search, X } from 'lucide-react'
import SignDictionaryEntry from '@/components/SignDictionaryEntry.jsx'
import usePageTitle from '@/hooks/usePageTitle.js'
import { dictionary } from '@content/index.js'
import { signLanguage } from '@/config/site.js'

export default function Dictionary() {
  usePageTitle('Money words dictionary')

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return dictionary.entries.filter((entry) => {
      const inCategory = category === 'all' || entry.category === category
      if (!inCategory) return false
      if (!q) return true
      return (
        entry.term.toLowerCase().includes(q) ||
        entry.definition.toLowerCase().includes(q) ||
        entry.example?.toLowerCase().includes(q)
      )
    })
  }, [query, category])

  return (
    <div className="space-y-8">
      <header>
        <span className="inline-flex items-center gap-2 rounded-full bg-berry-100 px-4 py-2 text-sm font-extrabold text-berry-600">
          <Hand className="h-5 w-5" aria-hidden="true" />
          {signLanguage.label}
        </span>
        <h1 className="mt-4 text-4xl font-extrabold text-ink">Money words</h1>
        <p className="mt-2 max-w-2xl text-lg text-muted">
          Every word has a picture, a short meaning and an example. The {signLanguage.short} video
          for each word is added as it is filmed.
        </p>
      </header>

      {/* ------------------------------------------------------------ search */}
      <div className="card space-y-4 p-5">
        <div className="flex items-center gap-3 rounded-2xl border-2 border-brand-200 bg-white px-4">
          <Search className="h-6 w-6 shrink-0 text-muted" aria-hidden="true" />
          <label htmlFor="dict-search" className="sr-only">
            Search for a money word
          </label>
          <input
            id="dict-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a word, for example: interest"
            className="min-h-tap w-full bg-transparent py-3 text-lg outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="tap-target rounded-xl text-muted hover:bg-brand-50"
            >
              <X className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Clear the search box</span>
            </button>
          )}
        </div>

        <div role="group" aria-label="Filter words by group" className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory('all')}
            aria-pressed={category === 'all'}
            className={category === 'all' ? 'btn-primary' : 'btn-secondary'}
          >
            All words
          </button>
          {dictionary.categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              aria-pressed={category === c.id}
              className={category === c.id ? 'btn-primary' : 'btn-secondary'}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result count is announced, so a screen reader user knows the list
          changed as they type. */}
      <p role="status" aria-live="polite" className="text-lg font-bold text-ink">
        {results.length === 0
          ? `No word matches “${query}”. Try a shorter word.`
          : `${results.length} ${results.length === 1 ? 'word' : 'words'}`}
      </p>

      <ul className="space-y-5">
        {results.map((entry) => (
          <li key={entry.id}>
            <SignDictionaryEntry entry={entry} />
          </li>
        ))}
      </ul>
    </div>
  )
}
