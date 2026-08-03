import { Check, CircleDot } from 'lucide-react'
import usePageTitle from '@/hooks/usePageTitle.js'
import { site, signLanguage } from '@/config/site.js'

const MET = [
  {
    group: 'Sound is never the only channel',
    criteria: '1.2.2 Captions, 1.2.3 Audio Description or Alternative, 1.4.2 Audio Control',
    points: [
      'Every lesson video carries at least one caption track, and a second "simple words" track where the language is harder.',
      'A full written transcript sits beside every video. It can be searched, and clicking a line jumps the video to that moment.',
      'No video autoplays, so nothing ever starts making sound on its own.',
      `A panel is reserved on every video for a ${signLanguage.label} interpreter.`,
      'Quiz feedback, the completion celebration and every alert are visual. The site plays no sound at all.',
    ],
  },
  {
    group: 'Not by colour alone',
    criteria: '1.4.1 Use of Colour, 1.3.3 Sensory Characteristics',
    points: [
      'Locked, open and complete lessons each carry an icon, a word and a colour.',
      'A right answer shows a tick, the word "Right" and green. A wrong answer shows a cross, the word "No" and red.',
      'The line currently playing in the transcript is marked with a thick left border and the word "now".',
    ],
  },
  {
    group: 'Contrast and text size',
    criteria: '1.4.3 Contrast (Minimum), 1.4.4 Resize Text, 1.4.10 Reflow, 1.4.12 Text Spacing',
    points: [
      'Body text is #16202e on #fdfbf7, a contrast ratio of about 15:1. The minimum for AA is 4.5:1.',
      'Muted text is #475467 on white, about 7.5:1.',
      'Every button colour was picked to clear 4.5:1 against its own text.',
      'Layout is built in relative units, so 200% browser zoom reflows instead of clipping. At 400% the page becomes a single column with no sideways scrolling.',
    ],
  },
  {
    group: 'Keyboard and focus',
    criteria: '2.1.1 Keyboard, 2.4.3 Focus Order, 2.4.7 Focus Visible, 2.4.11 Focus Not Obscured',
    points: [
      'Everything works from the keyboard alone. There is no mouse-only control and no keyboard trap.',
      'A thick blue focus ring is always visible and is never removed.',
      'A "skip to the main part of the page" link is the first thing the keyboard reaches.',
      'When the page changes, focus moves to the top of the new page, because a single-page app does not do this on its own.',
      'Inside a quiz, focus moves to the next question heading when the child presses Next.',
    ],
  },
  {
    group: 'Target size',
    criteria: '2.5.8 Target Size (Minimum)',
    points: [
      'Every button, link and menu is at least 44 by 44 pixels, well above the 24 by 24 minimum for AA.',
      'Checkboxes are 28 pixels, and the whole label row next to them is 44 pixels tall and also toggles them.',
      'The video seek bar is a full 44 pixels tall, so it can be dragged on a tablet.',
    ],
  },
  {
    group: 'Motion',
    criteria: '2.3.3 Animation from Interactions, 2.2.2 Pause, Stop, Hide',
    points: [
      'The system "reduce motion" setting is respected. Animations are cut to almost nothing and the confetti is not drawn at all.',
      'No animation loops forever and nothing moves without the child starting it.',
      'The celebration message is what carries the meaning. The confetti is decoration on top of it.',
    ],
  },
  {
    group: 'Plain language',
    criteria: '3.1.5 Reading Level (AAA, followed anyway)',
    points: [
      'Sentences are short and hold one idea each.',
      'Idioms and metaphors are avoided throughout, because they are a known barrier for readers whose first language is a sign language.',
      'New words are listed at the end of each lesson and linked to the signed dictionary.',
      'Money amounts use rupees and everyday Indian examples.',
    ],
  },
  {
    group: 'Structure and naming',
    criteria: '1.3.1 Info and Relationships, 2.4.2 Page Titled, 4.1.2 Name Role Value, 4.1.3 Status Messages',
    points: [
      'Real landmarks are used: header, nav, main, footer. Headings run in order with no levels skipped.',
      'The journey map is a real ordered list, so the order is announced correctly.',
      'The browser tab title changes with each page.',
      'Quiz results, search result counts and the play state are announced through polite live regions, without stealing focus.',
      'Toggle buttons report their state with aria-pressed, and progress bars report their value.',
    ],
  },
]

const KNOWN_GAPS = [
  'The lesson videos are public-domain placeholders. Their captions and transcripts are placeholder text and do not describe the real content yet.',
  `No ${signLanguage.label} interpreter clips have been filmed. Every place one belongs is marked "coming soon" rather than left blank.`,
  'The site has been checked against the WCAG 2.2 AA criteria listed above by inspection. It has not yet been tested with Deaf children or with a screen reader user, which is the test that matters most.',
]

export default function Accessibility() {
  usePageTitle('Accessibility statement')

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-extrabold text-ink">Accessibility statement</h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">
          {site.name} is built for children who are Deaf or Hard of Hearing. It aims to meet
          <strong className="text-ink"> WCAG 2.2 Level AA</strong>, and follows several Level AAA
          criteria where they matter most for this audience.
        </p>
        <p className="mt-3 max-w-3xl text-lg text-muted">
          Last reviewed: 1 August 2026.
        </p>
      </header>

      {MET.map((section) => {
        // ids may not contain spaces.
        const headingId = `a11y-${section.group.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
        return (
        <section key={section.group} className="card p-6" aria-labelledby={headingId}>
          <h2 id={headingId} className="text-2xl font-extrabold text-ink">
            {section.group}
          </h2>
          <p className="mt-1 text-sm font-bold uppercase tracking-wide text-brand-700">
            {section.criteria}
          </p>
          <ul className="mt-4 space-y-3">
            {section.points.map((point, i) => (
              <li key={i} className="flex gap-3 text-lg leading-relaxed text-ink">
                <Check className="mt-1 h-6 w-6 shrink-0 text-grow-500" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </section>
        )
      })}

      {/* Being honest about what is not done yet is part of the standard
          (WCAG conformance claims require listing known limitations). */}
      <section className="card border-4 border-sun-500 p-6" aria-labelledby="gaps-heading">
        <h2 id="gaps-heading" className="text-2xl font-extrabold text-ink">
          What is not finished
        </h2>
        <ul className="mt-4 space-y-3">
          {KNOWN_GAPS.map((gap, i) => (
            <li key={i} className="flex gap-3 text-lg leading-relaxed text-ink">
              <CircleDot className="mt-1 h-6 w-6 shrink-0 text-sun-500" aria-hidden="true" />
              {gap}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl bg-brand-50 p-6" aria-labelledby="feedback-heading">
        <h2 id="feedback-heading" className="text-xl font-extrabold text-ink">
          Tell us about a problem
        </h2>
        <p className="mt-2 text-lg leading-relaxed text-ink">
          If any part of this site is hard to use, that is a fault in the site and not in the
          reader. Please tell the teacher or the person who gave you this link, and describe what
          you were trying to do.
        </p>
      </section>
    </div>
  )
}
