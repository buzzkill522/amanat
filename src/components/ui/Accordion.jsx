import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils.js'

/**
 * Accordion, from the Watermelon UI registry (ui.watermelon.sh), adapted.
 *
 * The registry is shadcn-style: components are source you copy in, not a
 * package you depend on. Four things had to change on the way in, and none of
 * them were the React 19 / Tailwind v4 versions the registry itself is built
 * against - those are its development environment, not a per-component
 * requirement. Radix supports React 18 explicitly, and `size-4` and
 * `ring-[3px]` are both Tailwind 3.4.
 *
 *   1. TypeScript stripped. This project is JSX.
 *   2. Tokens remapped. The original uses shadcn's semantic names
 *      (text-muted-foreground, ring-ring, border-b against an implicit
 *      --border). This project has its own vocabulary - muted, clay, brand -
 *      generated from palette.js and measured by the contrast gate. Keeping
 *      the imported names would have meant a second, unmeasured palette.
 *   3. The trigger carries `tap-target`, so it is 44px like every other
 *      control here (WCAG 2.5.8). The registry version has no minimum height.
 *   4. The chevron is aria-hidden and the open/closed state is announced by
 *      Radix through aria-expanded, so the state is never carried by the
 *      rotation of an icon alone (WCAG 1.4.1).
 *
 * What Radix is actually buying: roving focus between triggers, Home/End,
 * correct aria-expanded and aria-controls wiring, and id generation. That is
 * the part which is genuinely tedious to get right by hand, and the reason to
 * take a component rather than write a details/summary.
 *
 * The open/close animation is defined in tailwind.config.js and is switched
 * off wholesale by the reduced-motion block in index.css, like every other
 * animation on this site.
 */

const Accordion = AccordionPrimitive.Root

function AccordionItem({ className, ...props }) {
  return (
    <AccordionPrimitive.Item
      className={cn('border-b border-brand-100 last:border-b-0', className)}
      {...props}
    />
  )
}

/**
 * Note on `tap-target`: it is deliberately NOT used here.
 *
 * That utility is built for small controls - `inline-flex`, `min-w-44`,
 * `justify-center` - and a full-width block trigger fights it. Applied here it
 * pinned the trigger to its 44px minimum width and wrapped every line of the
 * heading vertically, producing triggers between 490px and 1362px tall. A
 * trigger holding a heading and a sentence clears the 44px target by
 * construction, so the floor buys nothing and the side effects are real.
 */
function AccordionTrigger({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Header className="flex w-full">
      <AccordionPrimitive.Trigger
        className={cn(
          'group flex w-full items-center justify-between gap-4 rounded-xl py-4 text-left transition',
          'hover:bg-brand-50',
          '[&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className="h-6 w-6 shrink-0 text-brand-600 transition-transform duration-200"
          aria-hidden="true"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

/**
 * No open/close animation, deliberately.
 *
 * The registry version animates height between 0 and Radix's measured
 * --radix-accordion-content-height. Two reasons that came out here:
 *
 *   - The keyframes have no fill-mode, so once the animation ends the panel
 *     falls back to its base height. Measured open, it computed to 0px while
 *     holding 3288px of content - the panel opened and then collapsed again.
 *   - Even working, animating 3288px of height is a long janky slide, and this
 *     site has just had its animation count cut from thirteen to three on the
 *     grounds that ambient motion was making it look generated.
 *
 * Radix hides the panel with the `hidden` attribute when closed, so showing
 * and hiding works correctly with no animation at all.
 */
function AccordionContent({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Content {...props}>
      <div className={cn('pb-5 pt-0', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
