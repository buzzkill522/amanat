import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge class names, with later Tailwind classes beating earlier ones.
 *
 * Plain string concatenation does not do this: `"p-4" + " p-2"` leaves both in
 * the class list and the winner is whichever CSS rule the stylesheet happens to
 * emit last, which is not something a caller can reason about. `twMerge`
 * understands that `p-2` and `p-4` are the same property and keeps the last.
 *
 * This exists because components taken from the Watermelon UI registry expect
 * it - it is the same `cn` shadcn-style registries assume. Anything written for
 * this project by hand can keep using template strings; there is no need to
 * route existing components through it.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
