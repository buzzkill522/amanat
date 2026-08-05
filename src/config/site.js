// ---------------------------------------------------------------------------
// One file to change money units, sign-language variant and site naming.
// Educators can edit this without touching any component.
// ---------------------------------------------------------------------------

export const site = {
  // अमानत - something entrusted to you for safekeeping, to be returned whole.
  // It is the ordinary banking word for a deposit and, in everyday speech, the
  // word for anything precious placed in your care.
  name: 'Amanat',
  nameDevanagari: 'अमानत',
  tagline: 'Money lessons you can see',
}

export const currency = {
  code: 'INR',
  symbol: '₹',
  name: 'rupee',
  namePlural: 'rupees',
  // Amounts that feel real to a child in India. Content files refer to these
  // by key so every example stays consistent.
  examples: {
    pocketMoney: 50,
    snack: 20,
    notebook: 40,
    cricketBall: 150,
    bicycle: 4000,
  },
}

export function formatMoney(amount) {
  return `${currency.symbol}${new Intl.NumberFormat('en-IN').format(amount)}`
}

// The signed track shown by default in videos and in the dictionary.
export const signLanguage = {
  code: 'isl',
  label: 'Indian Sign Language',
  short: 'ISL',
  // The same name written in each language the site is offered in. Add a line
  // here when you add a language to src/i18n/strings.js.
  labels: {
    en: 'Indian Sign Language',
    hi: 'भारतीय सांकेतिक भाषा',
  },
  shorts: {
    en: 'ISL',
    hi: 'ISL',
  },
}

/** The sign language's name, written in the language the reader chose. */
export function signLabel(lang) {
  return signLanguage.labels[lang] || signLanguage.label
}

export function signShort(lang) {
  return signLanguage.shorts[lang] || signLanguage.short
}

// ---------------------------------------------------------------------------
// The three levels of the programme, ordered by difficulty.
//
// These were age bands - 7-9, 10-12, 13-15 - and are deliberately not any more.
// Reading level and chronological age come apart often among Deaf and
// Hard-of-Hearing children, so an age label either puts a child somewhere they
// cannot follow, or tells a fourteen-year-old that the lessons they can read
// are "for ages 7 to 9". A difficulty ladder lets anyone start at the bottom
// and climb, and says nothing about how old they are.
//
// `step` drives the difficulty meter on the cards: filled blocks out of three.
// ---------------------------------------------------------------------------
export const levels = [
  {
    id: 'level-1',
    step: 1,
    label: 'Level 1',
    name: 'Start',
    shortLabel: '1',
    blurb: 'What money is, and what happens when you spend it.',
    icon: 'coin',
    accent: 'grow',
  },
  {
    id: 'level-2',
    step: 2,
    label: 'Level 2',
    name: 'Build',
    shortLabel: '2',
    blurb: 'Plan money across a month. Banks, income and trade-offs.',
    icon: 'wallet',
    accent: 'brand',
  },
  {
    id: 'level-3',
    step: 3,
    label: 'Level 3',
    name: 'Stretch',
    shortLabel: '3',
    blurb: 'Percentages, compounding, inflation and reading the risk.',
    icon: 'growth',
    accent: 'berry',
  },
]

export const LEVEL_COUNT = levels.length

export function getLevel(levelId) {
  return levels.find((l) => l.id === levelId) || null
}

// Old age-band URLs, kept working for anyone who bookmarked one.
export const LEGACY_TIER_IDS = {
  '7-9': 'level-1',
  '10-12': 'level-2',
  '13-15': 'level-3',
}
