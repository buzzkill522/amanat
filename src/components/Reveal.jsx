import useReveal from '@/hooks/useReveal.js'

/**
 * Fades and lifts its children into place the first time they scroll into view.
 *
 * Purely decorative, and deliberately small: 16px of travel and 700ms. Big
 * entrances make a page feel slow to anyone who scrolls faster than the
 * designer imagined, and on a site read mostly by children that is most people.
 *
 * `delay` staggers a row of siblings. Keep it under about 300ms in total — a
 * stagger long enough to notice is a stagger long enough to wait for.
 */
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, shown] = useReveal()

  return (
    <Tag
      ref={ref}
      // Reduced motion collapses the duration to 0.01ms in index.css, so this
      // lands on the finished state instantly rather than being skipped.
      className={`transition-all duration-700 ease-out ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
