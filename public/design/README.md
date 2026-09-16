# Redesign mockups

Six static pages proposing a new look for the site: monochrome, with one
chromatic accent (rupee gold) used in a handful of places.

They are **mockups, not the site**. Nothing here is wired to the content files
or to React; the copy is pasted from `src/i18n/strings.js`, `content/modules/`,
`content/dictionary.json` and `content/schemes.json` so the layout is judged
against real text rather than filler. The dictionary shows 6 of the 40 words
and the lesson page is Lesson 1 only.

| File | Stands in for |
|---|---|
| `index.html` | `src/pages/Home.jsx` |
| `lessons.html` | `Lessons.jsx` + `LearningPath.jsx` |
| `lesson.html` | `Lesson.jsx` |
| `dictionary.html` | `Dictionary.jsx` |
| `schemes.html` | `Schemes.jsx` |
| `teachers.html` | `Teachers.jsx` |

`theme.css` is the whole design system - tokens, buttons, cards, every
component. `theme.js` is the light/dark toggle and the level toggle group.

## Running them

```
npm run design
```

Then open <http://localhost:5191>. They are plain files, so opening
`design/redesign/index.html` in a browser works too.

These pages are NOT part of the built site: `npm run build` only bundles from
`index.html` at the repo root, so nothing in `design/` is served to readers.

## What the design commits to

- **Monochrome.** Near-black on off-white, flipping to off-white on near-black.
  Hue is no longer how one lesson is told from another.
- **One accent, gold, used in six places:** the curve under the cover's phrase,
  the ledge under the primary button, the ₹ coin, the logo's iris, the marker on
  the lesson you are on, and the correct answer in a quiz.
- **Buttons sink.** A flat fill on a coloured ledge that the button drops onto
  when pressed - the friendliest feedback available on a page with no colour to
  spend.
- **Nunito** for headings and buttons, with Mukta behind it: Nunito ships no
  Devanagari, so Hindi falls through to Mukta rather than to an OS default.

## What was measured, not assumed

Every text node on all six pages clears WCAG 1.4.3 in **both** themes, there is
no horizontal overflow at 375px, and interactive targets hold 44px.

Two failures found that way and fixed: the `ISL` badge on the lesson page was
unstyled, leaving near-black text on the near-black video frame in the light
theme (1.02:1); and the Section 80U amount could not wrap, taking the schemes
page to 402px wide on a 375px screen.

One thing the gold does NOT clear: on a light page the bright accent measures
1.35:1, so it is never asked to carry meaning there. It is decoration and a mark
on dark grounds; anything a reader must see uses ink or the darkened gold.

## Still open

The site itself is unchanged. A separate branch, `mono-gold`, applies this
palette to the real React app - the colours only, not this layout - and is
parked rather than merged.
