// ---------------------------------------------------------------------------
// UI text in English and Hindi.
//
// ADDING A STRING
//   1. Add the key to `en` below, in the block for the page it belongs to.
//   2. Add the same key to `hi`. If you leave it out, the English text is used
//      instead - a missing translation never blanks the screen.
//
// The Hindi here is written the same way the English is: short sentences,
// everyday words, nothing a 7-year-old would need an adult to unpick. It is
// written text, not a replacement for Indian Sign Language - the ISL video is
// the first language on this site and does not change with this setting.
// ---------------------------------------------------------------------------

export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN', htmlLang: 'en-IN' },
  { code: 'hi', label: 'हिन्दी', short: 'हि', htmlLang: 'hi-IN' },
]

export const DEFAULT_LANGUAGE = 'en'

const en = {
  // ---------------------------------------------------------------- chrome
  'nav.home': 'Home',
  'nav.lessons': 'Lessons',
  'nav.dictionary': 'Dictionary',
  'nav.schemes': 'Schemes',
  'nav.teachers': 'Teachers',
  'nav.access': 'Access',
  'nav.label': 'Main',
  'nav.current': '(current page)',
  'skip.link': 'Skip to the main part of the page',
  'lang.switchTo': 'Read this site in Hindi',
  'lang.switchToEnglish': 'Read this site in English',
  'lang.name': 'हिन्दी',
  // Named as an action rather than a state. The button is a single icon, so
  // this sentence is its whole accessible name and its tooltip - "Dark" alone
  // would be read by some people as where they are and by others as where the
  // button goes, and a verb removes that.
  'theme.toDark': 'Switch to dark page colours',
  'theme.toLight': 'Switch to light page colours',
  'storage.blocked': 'This device cannot save your progress. You can still watch every lesson.',
  'footer.blurb': 'Amanat - free money lessons for Deaf and Hard-of-Hearing children.',
  'footer.accessibility': 'Accessibility statement',
  'footer.teachers': 'For parents and teachers',
  'site.tagline': 'Money lessons you can see',

  // ----------------------------------------------------------------- cover
  'cover.badge': 'Made with {sign} first',
  'cover.title1': 'Money lessons',
  'cover.title2': 'you can see',
  // No age number here on purpose - see the levels array in config/site.js.
  // Sorted by difficulty and not by age for the same reason: reading level and
  // age come apart often among Deaf and Hard-of-Hearing children, and a number
  // in the very first line a reader sees would undo that before they ever
  // reach the level picker.
  'cover.lead':
    'Watch. Read. Answer picture questions. Amanat teaches Deaf and Hard-of-Hearing children how money works - with sign language, captions and pictures on every single lesson. Start at your own level and move up whenever you are ready.',
  'cover.promise.sign': '{signShort} video',
  'cover.promise.captions': 'Captions on every lesson',
  'cover.promise.sound': 'No sound needed',
  'cover.cta.start': 'Start learning',
  'cover.cta.dictionary': 'See the money signs',
  // The mark is the only picture on the cover, so it is described rather than
  // hidden - it carries the tagline for a reader who cannot yet read it.
  'cover.markAlt': 'A smiling gullak, the clay pot you save coins in',

  // ------------------------------------------------------------------ home
  // home.lessons.* and home.level.* lived here once, for a level-picker
  // section this page no longer has - see the note above the CTA band in
  // Home.jsx. Removed rather than left unused, so nobody translates or edits
  // a string that nothing reads.
  'home.more.heading': 'More on this site',
  'home.more.dictionary.title': 'Money words',
  'home.more.dictionary.text': 'Look up a word. See the sign and a picture.',
  'home.more.teachers.title': 'For grown-ups',
  'home.more.teachers.text': 'How parents and teachers can use this site.',
  'home.free': 'Amanat is free. It never asks for your name, your school or any money.',

  // ------------------------------------------------------------ stats band
  'home.stat.lessons': 'lessons',
  'home.stat.levels': 'levels of difficulty',
  'home.stat.words': 'money words with signs',
  'home.stat.cost': 'cost, for ever',
  'home.stat.free': 'Free',

  // ----------------------------------------------------------- how it works
  'home.how.eyebrow': 'How it works',
  'home.how.heading': 'Three things, then the next lesson opens',
  'home.how.lead': 'Every lesson is built the same way, so you always know what to expect.',
  'home.how.1.title': 'Watch',
  'home.how.1.text':
    'A short video with captions, a written transcript beside it, and a panel for the {sign} clip.',
  'home.how.2.title': 'Answer',
  'home.how.2.text':
    'Picture questions, not written tests. A wrong answer gives a hint and lets you try again.',
  'home.how.3.title': 'Climb',
  'home.how.3.text':
    'Finish a lesson and the next one opens. Your place is kept on this device.',

  // -------------------------------------------------------------- built for
  'home.built.eyebrow': 'Built this way on purpose',
  'home.built.heading': 'Nothing here needs you to hear',
  'home.built.sign.title': '{signShort} comes first',
  'home.built.sign.text':
    'Every lesson and every dictionary word holds a space for a signed clip, in the exact place it will appear.',
  'home.built.captions.title': 'Captions and a transcript',
  'home.built.captions.text':
    'Read along, or search the transcript and jump straight to that moment in the video.',
  'home.built.pictures.title': 'Pictures carry the meaning',
  'home.built.pictures.text':
    'Line drawings, not photographs, so they stay clear at any size and at 400% zoom.',
  'home.built.private.title': 'Nothing leaves the device',
  'home.built.private.text':
    'No sign-up, no login, no analytics. Your progress is saved on this device and nowhere else.',

  // ------------------------------------------------------------- curriculum
  'home.topics.eyebrow': 'The curriculum',
  'home.topics.heading': '{count} topics, written three times over',
  'home.topics.lead':
    'The same topic at each level, from coins in a hand to compound interest and what you can claim.',

  // ------------------------------------------------------------ lessons page
  'lessons.title': 'Lessons',
  'lessons.eyebrow': 'The whole course',
  'lessons.heading': 'Every lesson, at your level',
  'lessons.lead':
    'The same eleven topics are written three times over, once at each level of difficulty. Pick the level that fits, and work down the list.',
  'lessons.levels.heading': 'Choose a level',
  'lessons.levels.lead': 'Start at 1 if you are not sure. You can move up or down any time.',
  'lessons.topics.heading': 'The {count} topics',
  'lessons.topics.lead': 'Every level covers all of these, in this order.',

  // ------------------------------------------------------------ resume card
  'home.resume.eyebrow': 'Welcome back',
  'home.resume.heading': 'Carry on where you stopped',
  'home.resume.lesson': 'Lesson {n} · {title}',
  'home.resume.progress': '{done} of {total} done in {level}',
  'home.resume.cta': 'Continue this lesson',
  'home.resume.done.heading': 'You have finished {level}',
  'home.resume.done.text': 'Every lesson here is complete. Try a harder level, or go over any lesson again.',
  'home.resume.done.cta': 'See these lessons again',

  // --------------------------------------------------------- featured lesson
  'home.featured.eyebrow': 'Start here',
  'home.featured.heading': 'Lesson 1 · What is Money?',
  'home.featured.text':
    'Money as a swap: you give it, the shop gives you the thing, and it is gone. By Level 3 the same lesson asks what a ₹500 note is actually made of, and why it buys less each year.',
  'home.featured.cta': 'Open the first lesson',
  'home.featured.meta': 'Written three times · one for each level',

  // ---------------------------------------------------------- what you claim
  'home.claim.eyebrow': 'Know what you are owed',
  'home.claim.heading': 'Money you may already be entitled to',
  'home.claim.lead':
    'Being Deaf costs money that hearing people never spend. These exist to offset that - and most go unclaimed simply because nobody knew.',
  'home.claim.udid.title': 'The UDID card',
  'home.claim.udid.text': 'Free. The card almost every other scheme asks for first.',
  'home.claim.adip.title': 'ADIP',
  'home.claim.adip.text': 'Hearing aids and cochlear implants, free or subsidised.',
  'home.claim.scholarship.title': 'Scholarships',
  'home.claim.scholarship.text': 'School to postgraduate. Fees, hostel and books. Never repaid.',
  'home.claim.tax.title': 'Section 80U',
  'home.claim.tax.text': '₹75,000 off taxable income, or ₹1,25,000 if severe. No receipts.',
  'home.claim.cta': 'See all the schemes',
  'home.claim.note': 'Rules and amounts change. Every figure is checked before it is taught.',

  // ------------------------------------------------------- dictionary teaser
  'home.words.eyebrow': 'Money words',
  'home.words.heading': '{count} words, each with a space for its sign',
  'home.words.lead':
    'Look up a word and see the picture, a plain definition, and a real example in rupees.',
  'home.words.cta': 'Open the dictionary',

  // ------------------------------------------------------------ closing CTA
  'home.cta.heading': 'Start with the first lesson',
  'home.cta.text': 'No account, no password. Pick a level and go.',
  'home.cta.button': 'Choose a level',

  // -------------------------------------------------------------- age tiers
  'level.label': 'Level {n}',
  'level.level-1.name': 'Start',
  'level.level-2.name': 'Build',
  'level.level-3.name': 'Stretch',
  'level.level-1.blurb': 'What money is, and what happens when you spend it.',
  'level.level-2.blurb': 'Plan money across a month. Banks, income and trade-offs.',
  'level.level-3.blurb': 'Percentages, compounding, inflation and reading the risk.',
  'level.start': 'Start here',
  'level.keepGoing': 'Keep going',
  'level.doneOf': '{done} of {total} done',

  // ------------------------------------------------------------------ notes
  'lang.lessonNote':
    'Some lessons are written in Hindi already. The rest are still in English - each one says so before it starts.',
  'lesson.notTranslated':
    'This lesson has not been written in Hindi yet. It will show in English below.',

  // ----------------------------------------------------------- video player
  'video.watchLabel': 'Video: {title}',
  'video.playError': 'This video could not be played. Please tell your teacher.',
  'video.notAvailable': 'This video is not available yet.',
  'video.unsupported': 'Your browser cannot show this video. Please tell your teacher.',
  'video.interpreterAria': '{sign} interpreter',
  'video.signVideoLabel': '{signShort} video',
  'video.comingSoon': 'coming soon',
  'video.playing': 'Video is playing',
  'video.paused': 'Video is paused',
  'video.play': 'Play',
  'video.pause': 'Pause',
  'video.back10': 'Back 10s',
  'video.restart': 'Start again',
  'video.captionsOn': 'Captions on',
  'video.captionsOff': 'Captions off',
  'video.captionWords': 'Caption words',
  'video.speed': 'Speed',
  'video.speedNormal': 'Normal',
  'video.signPanelOn': '{signShort} panel on',
  'video.signPanelOff': '{signShort} panel off',
  'video.biggerPanel': 'Bigger panel',
  'video.smallerPanel': 'Smaller panel',
  'video.soundOn': 'Sound on',
  'video.soundOff': 'Sound off',
  'video.fullscreen': 'Full screen',
  'video.seekAria': 'Move through the video',
  'video.seekValueText': '{current} of {duration}',

  // -------------------------------------------------------------- transcript
  'transcript.heading': 'Read the words',
  'transcript.version': 'Version',
  'transcript.searchLabel': 'Find a word in the transcript',
  'transcript.searchPlaceholder': 'Find a word',
  'transcript.followVideo': 'Scroll with the video',
  'transcript.loading': 'Loading the words…',
  'transcript.error':
    'The transcript could not be loaded. The lesson summary below has the same information.',
  'transcript.empty': 'No transcript for this video yet.',
  'transcript.noMatch': 'No line has the word “{query}”.',
  'transcript.now': 'now',

  // -------------------------------------------------------------------- quiz
  'quiz.defaultTitle': 'Show what you know',
  'quiz.finishedHeading': 'Quiz finished',
  'quiz.resultSummary': 'You answered {right} of {total} right on the first try.',
  'quiz.allCorrect': 'Every question is now correct. You can try the quiz again any time.',
  'quiz.tryAgain': 'Try the quiz again',
  'quiz.questionOf': 'Question {n} of {total}',
  'quiz.correctFirstTry': 'Correct. First try.',
  'quiz.correctRetry': 'Correct. Well done for trying again.',
  'quiz.incorrect': 'Not this one. Try again.',
  'quiz.nextQuestion': 'Next question',
  'quiz.finishQuiz': 'Finish quiz',
  'quiz.badgeRight': 'Right',
  'quiz.badgeNo': 'No',

  // ---------------------------------------------------------- lesson picker
  'path.backHome': 'Back to home',
  'path.viewGroupLabel': 'Choose how the lessons are shown',
  'path.viewMap': 'Journey map',
  'path.viewList': 'Simple list',
  'path.unlockAll': 'Open every lesson (for teachers)',
  'path.allLessonsHeading': 'All lessons - {done} of {total} done',
  'path.switchHeading': 'Too easy, or too hard?',
  'path.switchText': 'Move up or down. The eleven topics are the same at every level.',

  // ------------------------------------------------------------- lesson card
  'lessoncard.lessonN': 'Lesson {n}',
  'lessoncard.locked': 'Locked',
  'lessoncard.complete': 'Complete',
  'lessoncard.start': 'Start',
  'lessoncard.lockedHint': 'Finish the lesson before this one first.',
  'lessoncard.lockedSr': '{title} is locked. Finish lesson {n} to open it.',
  'lessoncard.ariaLabel': '{status} lesson {n}: {title}',

  // ------------------------------------------------------------ progress map
  'progressmap.heading': 'Your journey',
  'progressmap.doneOfTotal': '{done} of {total} lessons done',
  'progressmap.stopN': 'Stop {n}',
  'progressmap.locked': 'Locked',
  'progressmap.done': 'Done',
  'progressmap.open': 'Open',
  'progressmap.lockedSr': 'Locked. Finish stop {n} to open this lesson.',
  'progressmap.stopAriaLabel': 'Stop {n}, {title}, {state}',

  // -------------------------------------------------------------- lesson page
  'lesson.padlockTitle': 'A padlock',
  'lesson.lockedHeading': 'This lesson is not open yet',
  'lesson.lockedMessage': 'Finish {title} in {level} first. Then this one will open.',
  'lesson.lockedNote':
    'Every level has its own path. Finishing a lesson in one level does not open it in another.',
  'lesson.goTo': 'Go to {title}',
  'lesson.backToAll': 'All lessons',
  'lesson.backToAllLessons': 'Back to all lessons',
  'lesson.eyebrow': 'Lesson {n} · {level}',
  'lesson.whatThisSays': 'What this lesson says',
  'lesson.newWords': 'New words in this lesson',
  'lesson.seeWordsSigned': 'See these words signed in the dictionary',
  'lesson.schemesHeading': 'Every scheme, with the details',
  'lesson.schemesText':
    'Amounts, income limits, where to apply and what to watch out for - all on one page, with the source for every figure.',
  'lesson.schemesCta': 'Open the schemes page',
  'lesson.completeHeading': 'Lesson complete',
  'lesson.completeText': 'Finishing the quiz opened the next lesson. You can watch this one again any time.',
  'lesson.quizScore': 'Quiz: {right} of {total} right on the first try.',
  'lesson.finishedHeading': 'Finished this lesson?',
  'lesson.finishedAlready': 'You have already finished this lesson. You can watch it again any time.',
  'lesson.finishedPrompt': 'Press the button when you are done. The next lesson will open.',
  'lesson.alreadyComplete': 'Already complete',
  'lesson.markComplete': 'Mark as complete',
  'lesson.navLabel': 'Move between lessons',
  'lesson.celebrationMessage': '{title} complete',
  'lesson.pageTitleFallback': 'Lesson',

  // ------------------------------------------------------------- celebration
  'celebration.defaultMessage': 'Lesson complete',
  'celebration.nextOpen': 'The next lesson is now open.',

  // ------------------------------------------------------------- not found
  'notfound.pageTitle': 'Page not found',
  'notfound.iconAlt': 'A question mark',
  'notfound.heading': 'This page is not here',
  'notfound.text':
    'The link may be old, or a word in it may be spelled differently. Go back to the home page and start again.',
  'notfound.cta': 'Go to the home page',

  // ------------------------------------------------------------- dictionary
  'dict.pageTitle': 'Money words dictionary',
  'dict.heading': 'Money words',
  'dict.lead':
    'Every word has a picture, a short meaning and an example. The {signShort} video for each word is added as it is filmed.',
  'dict.searchLabel': 'Search for a money word',
  'dict.searchPlaceholder': 'Type a word, for example: interest',
  'dict.clearSearch': 'Clear the search box',
  'dict.filterLabel': 'Filter words by group',
  'dict.allWords': 'All words',
  'dict.noMatch': 'No word matches “{query}”. Try a shorter word.',
  'dict.countOne': '{n} word',
  'dict.countMany': '{n} words',

  // ------------------------------------------------------------- schemes page
  'schemes.pageTitle': 'Schemes and what you can claim',
  'schemes.eyebrow': 'Know what you are owed',
  'schemes.heading': 'Schemes you may already be entitled to',
  'schemes.lead':
    'Being Deaf costs money that hearing people never spend. These exist to offset that, not to give anyone an advantage. Most go unclaimed simply because nobody knew about them.',
  'schemes.firstHeading': 'Get the UDID card first',
  'schemes.firstText':
    'Almost every scheme below asks for it. Without it, most of this page is closed; with it, most of it opens. It is free, and it is the single most useful thing on this page.',
  'schemes.howMuch': 'How much',
  'schemes.who': 'Who',
  'schemes.howToApply': 'How to apply',
  'schemes.worthKnowing': 'Worth knowing',
  'schemes.newTab': '(opens in a new tab)',
  'schemes.checked': 'Checked {when}. Check against the source before acting on a figure:',
  'schemes.absentHeading': 'What is not on this page, and why',
  'schemes.absentLead':
    'A list that only says what exists is not much use. These are the things you may read about elsewhere and wonder why they are missing.',
  'schemes.courseHeading': 'These are taught in the course too',
  'schemes.courseText':
    'This page is the reference. Lessons 10 and 11 are where the same material is taught properly, at your level, with the reasoning behind it and a quiz at the end.',
  'schemes.courseCta': 'Go to the lessons',
  'schemes.disclaimer':
    'Rules and amounts change, and most of these are revised every year. Every figure here was checked in {when} and carries the source it came from - check it against that source before acting on it. Nothing here is financial or legal advice, and nobody who wrote it is a licensed adviser or a lawyer.',

  // ------------------------------------------------------------ teachers page
  'teachers.pageTitle': 'For parents and teachers',
  'teachers.heading': 'For parents and teachers',
  'teachers.lead':
    '{site} teaches money skills to Deaf and Hard-of-Hearing children. The lessons are sorted by difficulty rather than by age, so place a child by what they can read and reason with, not by the year they were born. There is no sign-up and no login. Nothing a child does here leaves their device.',

  'teachers.use.heading': 'How to use it in a lesson',
  'teachers.use.step1':
    'Pick a level from the Lessons tab. The eleven topics stay the same at every level; the wording, the maths and how much is left for the child to work out change. A child who finishes Level 1 can climb, and one who is stuck can drop a level without being told they are in the wrong age group.',
  'teachers.use.step2':
    'Play the video with captions on. The transcript beside the video can be projected or printed for the class.',
  'teachers.use.step3':
    'Pause after the summary and ask the class to sign back one sentence in their own words.',
  'teachers.use.step4':
    'Let each child do the picture quiz on their own device. A wrong answer gives a hint and lets them retry, so nobody is stuck.',
  'teachers.use.step5':
    'Finishing the quiz opens the next lesson on that device automatically - there is nothing to click afterwards.',

  'teachers.topics.heading': 'The eleven topics',
  'teachers.topics.lead': 'Each topic is written three times, once at each level of difficulty.',
  'teachers.topics.caption': 'Lesson topics and the levels they are written for',
  'teachers.topics.colTopic': 'Topic',
  'teachers.topics.available': 'Available',
  'teachers.topics.notWritten': 'Not written yet',

  'teachers.sign.heading': 'About the {sign} videos',
  'teachers.sign.reserved':
    'Every lesson reserves a panel for a signed interpretation, and every dictionary word reserves space for a short signed clip. Where a clip has not been filmed yet, the space says so plainly rather than hiding.',
  'teachers.sign.regional':
    'Sign language is regional. These lessons are written for {sign}. If you teach in another sign language, the interpreter clips can be swapped without changing any of the written content.',
  'teachers.sign.allDone': 'All {total} dictionary words have a signed clip.',
  'teachers.sign.someDone':
    '{done} of {total} dictionary words have a signed clip so far. The rest show a labelled space until they are filmed.',

  'teachers.settings.heading': 'Settings on this device',
  'teachers.settings.unlockTitle': 'Open every lesson',
  'teachers.settings.unlockText':
    'Lessons normally open one at a time. Turn this on to jump to any topic.',
  'teachers.progress.heading': 'Progress on this device',
  'teachers.progress.line': '{label}: {done} of {total} lessons done',
  'teachers.progress.save': 'Save progress to a file',
  'teachers.progress.load': 'Load progress from a file',
  'teachers.progress.replaceAsk':
    'Replace progress on this device with {name}? Progress currently on this device will be gone.',
  'teachers.progress.replaceYes': 'Yes, replace it',
  'teachers.progress.replaceNo': "No, keep this device's progress",
  'teachers.progress.errParse': "That file isn't a progress file - it couldn't be read as one at all.",
  'teachers.progress.errFormat':
    "That file doesn't match a progress file Amanat recognises. It may be from a much older version, or a different file entirely.",
  'teachers.progress.dismiss': 'Dismiss',
  'teachers.progress.eraseAsk': 'Erase all progress on this device?',
  'teachers.progress.eraseYes': 'Yes, erase it',
  'teachers.progress.eraseNo': 'No, keep it',
  'teachers.progress.erase': 'Erase all progress',

  'teachers.privacy.heading': 'Privacy',
  'teachers.privacy.text':
    'There are no accounts and no analytics. Progress is stored in the browser on the device itself. Clearing the browser data clears the progress. Nothing is sent anywhere.',
  'teachers.privacy.link': 'Read the accessibility statement',

  // -------------------------------------------------------- accessibility page
  // The WCAG criterion references (the "1.4.3 Contrast (Minimum)" strings) are
  // deliberately NOT translated. They are formal identifiers into an English
  // standard, quoted the same way in conformance claims worldwide, and an
  // evaluator checking this page needs the string they can search for.
  'a11y.pageTitle': 'Accessibility statement',
  'a11y.heading': 'Accessibility statement',
  'a11y.lead':
    '{site} is built for children who are Deaf or Hard of Hearing. It aims to meet WCAG 2.2 Level AA, and follows several Level AAA criteria where they matter most for this audience.',
  'a11y.reviewed': 'Last reviewed: 1 August 2026.',

  'a11y.sound.group': 'Sound is never the only channel',
  'a11y.sound.p1':
    'Every lesson video carries at least one caption track, and a second "simple words" track where the language is harder.',
  'a11y.sound.p2':
    'A full written transcript sits beside every video. It can be searched, and clicking a line jumps the video to that moment.',
  'a11y.sound.p3': 'No video autoplays, so nothing ever starts making sound on its own.',
  'a11y.sound.p4': 'A panel is reserved on every video for a {sign} interpreter.',
  'a11y.sound.p5':
    'Quiz feedback, the completion celebration and every alert are visual. The site plays no sound at all.',

  'a11y.colour.group': 'Not by colour alone',
  'a11y.colour.p1': 'Locked, open and complete lessons each carry an icon, a word and a colour.',
  'a11y.colour.p2':
    'A right answer shows a tick, the word "Right" and green. A wrong answer shows a cross, the word "No" and red.',
  'a11y.colour.p3':
    'The line currently playing in the transcript is marked with a thick left border and the word "now".',

  'a11y.contrast.group': 'Contrast and text size',
  'a11y.contrast.p1':
    'The page comes in light and dark. You can switch at the top of any page, and the site starts in whichever one your device already asks for.',
  'a11y.contrast.p2':
    'Body text is about 16.4:1 in the light theme and 16.6:1 in the dark one. The minimum for AA is 4.5:1.',
  'a11y.contrast.p3': 'Muted text is about 5.6:1 in the light theme and 7.4:1 in the dark one.',
  'a11y.contrast.p4':
    'Every button colour was picked to clear 4.5:1 against its own text, in both themes. 112 colour pairings are measured automatically, and a pairing that fails in either theme stops the site being published.',
  'a11y.contrast.p5':
    'Layout is built in relative units, so 200% browser zoom reflows instead of clipping. At 400% the page becomes a single column with no sideways scrolling.',

  'a11y.keyboard.group': 'Keyboard and focus',
  'a11y.keyboard.p1':
    'Everything works from the keyboard alone. There is no mouse-only control and no keyboard trap.',
  'a11y.keyboard.p2':
    'A thick focus ring in the accent colour is always visible and is never removed. It clears 3:1 against the page in both themes.',
  'a11y.keyboard.p3':
    'A "skip to the main part of the page" link is the first thing the keyboard reaches.',
  'a11y.keyboard.p4':
    'When the page changes, focus moves to the top of the new page, because a single-page app does not do this on its own.',
  'a11y.keyboard.p5':
    'Inside a quiz, focus moves to the next question heading when the child presses Next.',

  'a11y.target.group': 'Target size',
  'a11y.target.p1':
    'Every button, link and menu is at least 44 by 44 pixels, well above the 24 by 24 minimum for AA.',
  'a11y.target.p2':
    'Checkboxes are 28 pixels, and the whole label row next to them is 44 pixels tall and also toggles them.',
  'a11y.target.p3': 'The video seek bar is a full 44 pixels tall, so it can be dragged on a tablet.',

  'a11y.motion.group': 'Motion',
  'a11y.motion.p1':
    'The system "reduce motion" setting is respected. Animations are cut to almost nothing and the confetti is not drawn at all.',
  'a11y.motion.p2': 'No animation loops forever and nothing moves without the child starting it.',
  'a11y.motion.p3':
    'The celebration message is what carries the meaning. The confetti is decoration on top of it.',

  'a11y.plain.group': 'Plain language',
  'a11y.plain.p1': 'Sentences are short and hold one idea each.',
  'a11y.plain.p2':
    'Idioms and metaphors are avoided throughout, because they are a known barrier for readers whose first language is a sign language.',
  'a11y.plain.p3': 'New words are listed at the end of each lesson and linked to the signed dictionary.',
  'a11y.plain.p4': 'Money amounts use rupees and everyday Indian examples.',

  'a11y.structure.group': 'Structure and naming',
  'a11y.structure.p1':
    'Real landmarks are used: header, nav, main, footer. Headings run in order with no levels skipped.',
  'a11y.structure.p2': 'The journey map is a real ordered list, so the order is announced correctly.',
  'a11y.structure.p3': 'The browser tab title changes with each page.',
  'a11y.structure.p4':
    'Quiz results, search result counts and the play state are announced through polite live regions, without stealing focus.',
  'a11y.structure.p5':
    'Toggle buttons report their state with aria-pressed, and progress bars report their value.',

  'a11y.gaps.heading': 'What is not finished',
  'a11y.gaps.p1':
    'The lesson videos are public-domain placeholders. Their captions and transcripts are placeholder text and do not describe the real content yet.',
  'a11y.gaps.p2':
    'No {sign} interpreter clips have been filmed. Every place one belongs is marked so, rather than left blank.',
  'a11y.gaps.p3':
    'The site has been checked against the WCAG 2.2 AA criteria listed above by inspection. It has not yet been tested with Deaf children or with a screen reader user, which is the test that matters most.',

  'a11y.feedback.heading': 'Tell us about a problem',
  'a11y.feedback.text':
    'If any part of this site is hard to use, that is a fault in the site and not in the reader. Please tell the teacher or the person who gave you this link, and describe what you were trying to do.',
}

const hi = {
  // ---------------------------------------------------------------- chrome
  'nav.home': 'होम',
  'nav.lessons': 'पाठ',
  'nav.dictionary': 'शब्दकोश',
  'nav.schemes': 'योजनाएँ',
  'nav.teachers': 'शिक्षक',
  'nav.access': 'सुलभता',
  'nav.label': 'मुख्य',
  'nav.current': '(यही पन्ना खुला है)',
  'skip.link': 'सीधे पन्ने के मुख्य भाग पर जाएँ',
  'lang.switchTo': 'इस साइट को हिन्दी में पढ़ें',
  'lang.switchToEnglish': 'इस साइट को अंग्रेज़ी में पढ़ें',
  'lang.name': 'English',
  'theme.toDark': 'पन्ने के रंग गहरे कीजिए',
  'theme.toLight': 'पन्ने के रंग उजले कीजिए',
  'storage.blocked':
    'यह डिवाइस आपकी प्रगति सहेज नहीं सकता। फिर भी आप हर पाठ देख सकते हैं।',
  'footer.blurb': 'अमानत - बहरे और कम सुनने वाले बच्चों के लिए मुफ़्त पैसे के पाठ।',
  'footer.accessibility': 'सुलभता वक्तव्य',
  'footer.teachers': 'माता-पिता और शिक्षकों के लिए',
  'site.tagline': 'पैसे के पाठ, जो आप देख सकते हैं',

  // ----------------------------------------------------------------- cover
  'cover.badge': 'सबसे पहले {sign} में बना',
  'cover.title1': 'पैसे के पाठ,',
  'cover.title2': 'जो आप देख सकते हैं',
  'cover.lead':
    'देखिए। पढ़िए। तस्वीर वाले सवालों के जवाब दीजिए। अमानत बहरे और कम सुनने वाले बच्चों को सिखाता है कि पैसा कैसे काम करता है - हर पाठ में सांकेतिक भाषा, कैप्शन और तस्वीरें। अपने स्तर से शुरू कीजिए, और जब तैयार हों तब आगे बढ़िए।',
  'cover.promise.sign': '{signShort} वीडियो',
  'cover.promise.captions': 'हर पाठ में कैप्शन',
  'cover.promise.sound': 'सुनने की ज़रूरत नहीं',
  'cover.cta.start': 'सीखना शुरू करें',
  'cover.cta.dictionary': 'पैसे के संकेत देखें',
  'cover.markAlt': 'मुस्कुराता हुआ गुल्लक, जिसमें आप सिक्के जमा करते हैं',

  // ------------------------------------------------------------------ home
  'home.more.heading': 'इस साइट पर और भी',
  'home.more.dictionary.title': 'पैसे के शब्द',
  'home.more.dictionary.text': 'कोई शब्द ढूँढिए। उसका संकेत और तस्वीर देखिए।',
  'home.more.teachers.title': 'बड़ों के लिए',
  'home.more.teachers.text': 'माता-पिता और शिक्षक इस साइट का उपयोग कैसे करें।',
  'home.free': 'अमानत मुफ़्त है। यह कभी आपका नाम, आपका स्कूल या पैसे नहीं माँगता।',

  // ------------------------------------------------------------ stats band
  'home.stat.lessons': 'पाठ',
  'home.stat.levels': 'कठिनाई के स्तर',
  'home.stat.words': 'पैसे के शब्द, संकेत के साथ',
  'home.stat.cost': 'ख़र्च, हमेशा',
  'home.stat.free': 'मुफ़्त',

  // ----------------------------------------------------------- how it works
  'home.how.eyebrow': 'यह कैसे चलता है',
  'home.how.heading': 'तीन काम, फिर अगला पाठ खुल जाता है',
  'home.how.lead': 'हर पाठ एक ही तरह से बना है, ताकि आपको हमेशा पता रहे कि आगे क्या आएगा।',
  'home.how.1.title': 'देखिए',
  'home.how.1.text':
    'छोटा वीडियो, कैप्शन के साथ। बग़ल में लिखा हुआ पूरा पाठ, और {sign} की क्लिप के लिए जगह।',
  'home.how.2.title': 'जवाब दीजिए',
  'home.how.2.text':
    'तस्वीर वाले सवाल, लिखित परीक्षा नहीं। ग़लत जवाब पर इशारा मिलता है और फिर से कोशिश कर सकते हैं।',
  'home.how.3.title': 'आगे बढ़िए',
  'home.how.3.text':
    'एक पाठ पूरा कीजिए और अगला खुल जाएगा। आपकी जगह इसी डिवाइस पर सहेजी जाती है।',

  // -------------------------------------------------------------- built for
  'home.built.eyebrow': 'सोच-समझकर ऐसे बनाया गया',
  'home.built.heading': 'यहाँ कुछ भी सुनने की ज़रूरत नहीं',
  'home.built.sign.title': 'सबसे पहले {signShort}',
  'home.built.sign.text':
    'हर पाठ और हर शब्द में संकेत वाली क्लिप के लिए जगह है, ठीक उसी स्थान पर जहाँ वह दिखेगी।',
  'home.built.captions.title': 'कैप्शन और लिखित पाठ',
  'home.built.captions.text':
    'साथ-साथ पढ़िए, या लिखे हुए पाठ में ढूँढकर सीधे वीडियो के उसी हिस्से पर पहुँच जाइए।',
  'home.built.pictures.title': 'मतलब तस्वीरें बताती हैं',
  'home.built.pictures.text':
    'रेखा-चित्र, फ़ोटो नहीं - इसलिए हर आकार में और 400% ज़ूम पर भी साफ़ दिखते हैं।',
  'home.built.private.title': 'कुछ भी डिवाइस से बाहर नहीं जाता',
  'home.built.private.text':
    'कोई खाता नहीं, कोई लॉगिन नहीं, कोई निगरानी नहीं। आपकी प्रगति सिर्फ़ इसी डिवाइस पर रहती है।',

  // ------------------------------------------------------------- curriculum
  'home.topics.eyebrow': 'पाठ्यक्रम',
  'home.topics.heading': '{count} विषय, तीन-तीन बार लिखे गए',
  'home.topics.lead':
    'हर स्तर पर वही विषय - हाथ में रखे सिक्कों से लेकर चक्रवृद्धि ब्याज और आपके अधिकारों तक।',

  // ------------------------------------------------------------ lessons page
  'lessons.title': 'पाठ',
  'lessons.eyebrow': 'पूरा पाठ्यक्रम',
  'lessons.heading': 'हर पाठ, आपके स्तर पर',
  'lessons.lead':
    'वही ग्यारह विषय तीन बार लिखे गए हैं, हर कठिनाई स्तर के लिए एक बार। जो स्तर ठीक लगे उसे चुनिए, और सूची के क्रम से आगे बढ़िए।',
  'lessons.levels.heading': 'एक स्तर चुनिए',
  'lessons.levels.lead': 'पक्का न हो तो स्तर 1 से शुरू कीजिए। आप कभी भी ऊपर या नीचे जा सकते हैं।',
  'lessons.topics.heading': '{count} विषय',
  'lessons.topics.lead': 'हर स्तर इन सभी को इसी क्रम में पढ़ाता है।',

  // ------------------------------------------------------------ resume card
  'home.resume.eyebrow': 'वापस स्वागत है',
  'home.resume.heading': 'जहाँ रुके थे, वहीं से आगे बढ़िए',
  'home.resume.lesson': 'पाठ {n} · {title}',
  'home.resume.progress': '{level} में {total} में से {done} पूरे',
  'home.resume.cta': 'यह पाठ जारी रखिए',
  'home.resume.done.heading': 'आपने {level} पूरा कर लिया',
  'home.resume.done.text': 'यहाँ के सभी पाठ पूरे हो चुके हैं। कोई कठिन स्तर आज़माइए, या किसी भी पाठ को दोबारा देखिए।',
  'home.resume.done.cta': 'ये पाठ दोबारा देखिए',

  // --------------------------------------------------------- featured lesson
  'home.featured.eyebrow': 'यहाँ से शुरू करें',
  'home.featured.heading': 'पाठ 1 · पैसा क्या है?',
  'home.featured.text':
    'पैसा एक अदला-बदली है: आप देते हैं, दुकान चीज़ देती है, और पैसा चला जाता है। स्तर 3 पर यही पाठ पूछता है कि ₹500 के नोट की असली क़ीमत किस चीज़ से बनती है, और हर साल वह कम क्यों ख़रीद पाता है।',
  'home.featured.cta': 'पहला पाठ खोलिए',
  'home.featured.meta': 'तीन बार लिखा गया · हर स्तर के लिए एक',

  // ---------------------------------------------------------- what you claim
  'home.claim.eyebrow': 'जो आपका हक़ है, उसे जानिए',
  'home.claim.heading': 'वह पैसा जिस पर शायद पहले से आपका हक़ है',
  'home.claim.lead':
    'बहरा होने पर वह ख़र्च आता है जो सुनने वालों को कभी नहीं करना पड़ता। ये योजनाएँ उसी की भरपाई हैं - और ज़्यादातर सिर्फ़ इसलिए बिना माँगे रह जाती हैं क्योंकि किसी को पता ही नहीं था।',
  'home.claim.udid.title': 'UDID कार्ड',
  'home.claim.udid.text': 'मुफ़्त। लगभग हर दूसरी योजना सबसे पहले यही माँगती है।',
  'home.claim.adip.title': 'ADIP',
  'home.claim.adip.text': 'श्रवण यंत्र और कॉक्लियर इम्प्लांट, मुफ़्त या कम दाम पर।',
  'home.claim.scholarship.title': 'छात्रवृत्ति',
  'home.claim.scholarship.text': 'स्कूल से स्नातकोत्तर तक। फ़ीस, हॉस्टल और किताबें। कभी लौटानी नहीं।',
  'home.claim.tax.title': 'धारा 80U',
  'home.claim.tax.text': 'कर योग्य आय में ₹75,000 की छूट, गंभीर दिव्यांगता पर ₹1,25,000। कोई रसीद नहीं।',
  'home.claim.cta': 'सभी योजनाएँ देखिए',
  'home.claim.note': 'नियम और रक़में बदलती रहती हैं। हर आँकड़ा पढ़ाने से पहले जाँचा जाता है।',

  // ------------------------------------------------------- dictionary teaser
  'home.words.eyebrow': 'पैसे के शब्द',
  'home.words.heading': '{count} शब्द, हर एक के संकेत के लिए जगह',
  'home.words.lead':
    'कोई शब्द ढूँढिए और देखिए - तस्वीर, आसान अर्थ, और रुपयों में एक असली उदाहरण।',
  'home.words.cta': 'शब्दकोश खोलिए',

  // ------------------------------------------------------------ closing CTA
  'home.cta.heading': 'पहले पाठ से शुरू कीजिए',
  'home.cta.text': 'कोई खाता नहीं, कोई पासवर्ड नहीं। एक स्तर चुनिए और चल पड़िए।',
  'home.cta.button': 'स्तर चुनिए',

  // -------------------------------------------------------------- age tiers
  'level.label': 'स्तर {n}',
  'level.level-1.name': 'शुरुआत',
  'level.level-2.name': 'अभ्यास',
  'level.level-3.name': 'गहराई',
  'level.level-1.blurb': 'पैसा क्या है, और ख़र्च करने पर क्या होता है।',
  'level.level-2.blurb': 'महीने भर के पैसे की योजना। बैंक, कमाई और चुनाव।',
  'level.level-3.blurb': 'प्रतिशत, चक्रवृद्धि ब्याज, महँगाई और ख़तरे को पहचानना।',
  'level.start': 'यहाँ से शुरू करें',
  'level.keepGoing': 'आगे बढ़ें',
  'level.doneOf': '{total} में से {done} पूरे',

  // ------------------------------------------------------------------ notes
  'lang.lessonNote':
    'कुछ पाठ पहले से हिन्दी में लिखे जा चुके हैं। बाकी अभी अंग्रेज़ी में हैं - हर पाठ शुरू होने से पहले यह बता देता है।',
  'lesson.notTranslated':
    'यह पाठ अभी हिन्दी में नहीं लिखा गया है। नीचे यह अंग्रेज़ी में दिखेगा।',

  // ----------------------------------------------------------- video player
  // NEW 6 Aug 2026 - drafted, not yet checked by a fluent Hindi speaker.
  'video.watchLabel': 'वीडियो: {title}',
  'video.playError': 'यह वीडियो नहीं चल पाया। कृपया अपने शिक्षक को बताएँ।',
  'video.notAvailable': 'यह वीडियो अभी उपलब्ध नहीं है।',
  'video.unsupported': 'आपका ब्राउज़र यह वीडियो नहीं दिखा सकता। कृपया अपने शिक्षक को बताएँ।',
  'video.interpreterAria': '{sign} दुभाषिया',
  'video.signVideoLabel': '{signShort} वीडियो',
  'video.comingSoon': 'जल्द आ रहा है',
  'video.playing': 'वीडियो चल रहा है',
  'video.paused': 'वीडियो रुका हुआ है',
  'video.play': 'चलाएँ',
  'video.pause': 'रोकें',
  'video.back10': '10 सेकंड पीछे',
  'video.restart': 'फिर से शुरू करें',
  'video.captionsOn': 'कैप्शन चालू',
  'video.captionsOff': 'कैप्शन बंद',
  'video.captionWords': 'कैप्शन के शब्द',
  'video.speed': 'गति',
  'video.speedNormal': 'सामान्य',
  'video.signPanelOn': '{signShort} पैनल चालू',
  'video.signPanelOff': '{signShort} पैनल बंद',
  'video.biggerPanel': 'बड़ा पैनल',
  'video.smallerPanel': 'छोटा पैनल',
  'video.soundOn': 'आवाज़ चालू',
  'video.soundOff': 'आवाज़ बंद',
  'video.fullscreen': 'पूरी स्क्रीन',
  'video.seekAria': 'वीडियो में आगे-पीछे जाएँ',
  'video.seekValueText': '{duration} में से {current}',

  // -------------------------------------------------------------- transcript
  'transcript.heading': 'शब्द पढ़िए',
  'transcript.version': 'संस्करण',
  'transcript.searchLabel': 'लिखे हुए पाठ में कोई शब्द ढूँढिए',
  'transcript.searchPlaceholder': 'कोई शब्द ढूँढिए',
  'transcript.followVideo': 'वीडियो के साथ स्क्रॉल करें',
  'transcript.loading': 'शब्द लोड हो रहे हैं…',
  'transcript.error':
    'लिखा हुआ पाठ लोड नहीं हो सका। नीचे पाठ का सार भी यही जानकारी देता है।',
  'transcript.empty': 'इस वीडियो के लिए अभी कोई लिखा हुआ पाठ नहीं है।',
  'transcript.noMatch': '“{query}” शब्द वाली कोई पंक्ति नहीं मिली।',
  'transcript.now': 'अभी',

  // -------------------------------------------------------------------- quiz
  'quiz.defaultTitle': 'आप क्या जानते हैं, दिखाइए',
  'quiz.finishedHeading': 'क्विज़ पूरी हुई',
  'quiz.resultSummary': 'आपने पहली बार में {total} में से {right} सही जवाब दिए।',
  'quiz.allCorrect': 'अब हर सवाल सही है। आप जब चाहें क्विज़ फिर से आज़मा सकते हैं।',
  'quiz.tryAgain': 'क्विज़ फिर से आज़माइए',
  'quiz.questionOf': 'सवाल {n}, {total} में से',
  'quiz.correctFirstTry': 'सही जवाब। पहली बार में।',
  'quiz.correctRetry': 'सही जवाब। फिर से कोशिश करने के लिए शाबाश।',
  'quiz.incorrect': 'यह सही नहीं है। फिर से कोशिश कीजिए।',
  'quiz.nextQuestion': 'अगला सवाल',
  'quiz.finishQuiz': 'क्विज़ पूरी करें',
  'quiz.badgeRight': 'सही',
  'quiz.badgeNo': 'नहीं',

  // ---------------------------------------------------------- lesson picker
  'path.backHome': 'होम पर वापस जाएँ',
  'path.viewGroupLabel': 'पाठ कैसे दिखाई दें, यह चुनिए',
  'path.viewMap': 'यात्रा का नक़्शा',
  'path.viewList': 'आसान सूची',
  'path.unlockAll': 'हर पाठ खोल दीजिए (शिक्षकों के लिए)',
  'path.allLessonsHeading': 'सभी पाठ - {total} में से {done} पूरे',
  'path.switchHeading': 'बहुत आसान, या बहुत मुश्किल?',
  'path.switchText': 'ऊपर या नीचे जाइए। ग्यारह विषय हर स्तर पर वही रहते हैं।',

  // ------------------------------------------------------------- lesson card
  'lessoncard.lessonN': 'पाठ {n}',
  'lessoncard.locked': 'बंद',
  'lessoncard.complete': 'पूरा',
  'lessoncard.start': 'शुरू करें',
  'lessoncard.lockedHint': 'पहले इससे पहले वाला पाठ पूरा कीजिए।',
  'lessoncard.lockedSr': '{title} अभी बंद है। इसे खोलने के लिए पाठ {n} पूरा कीजिए।',
  'lessoncard.ariaLabel': '{title}, पाठ {n}, {status}',

  // ------------------------------------------------------------ progress map
  'progressmap.heading': 'आपकी यात्रा',
  'progressmap.doneOfTotal': '{total} में से {done} पाठ पूरे',
  'progressmap.stopN': 'पड़ाव {n}',
  'progressmap.locked': 'बंद',
  'progressmap.done': 'पूरा',
  'progressmap.open': 'खुला',
  'progressmap.lockedSr': 'बंद है। इस पाठ को खोलने के लिए पड़ाव {n} पूरा कीजिए।',
  'progressmap.stopAriaLabel': 'पड़ाव {n}, {title}, {state}',

  // -------------------------------------------------------------- lesson page
  'lesson.padlockTitle': 'एक ताला',
  'lesson.lockedHeading': 'यह पाठ अभी नहीं खुला है',
  'lesson.lockedMessage': 'पहले {level} में {title} पूरा कीजिए। फिर यह पाठ खुल जाएगा।',
  'lesson.lockedNote':
    'हर स्तर का अपना रास्ता है। एक स्तर में पाठ पूरा करने से वह दूसरे स्तर में नहीं खुलता।',
  'lesson.goTo': '{title} पर जाइए',
  'lesson.backToAll': 'सभी पाठ',
  'lesson.backToAllLessons': 'सभी पाठों पर वापस जाएँ',
  'lesson.eyebrow': 'पाठ {n} · {level}',
  'lesson.whatThisSays': 'यह पाठ क्या कहता है',
  'lesson.newWords': 'इस पाठ के नए शब्द',
  'lesson.seeWordsSigned': 'शब्दकोश में इन शब्दों के संकेत देखिए',
  'lesson.schemesHeading': 'हर योजना, पूरी जानकारी के साथ',
  'lesson.schemesText':
    'रक़में, आय की सीमाएँ, आवेदन कहाँ करें और किन बातों का ध्यान रखें - सब एक ही पन्ने पर, हर आँकड़े के स्रोत के साथ।',
  'lesson.schemesCta': 'योजनाओं वाला पन्ना खोलिए',
  'lesson.completeHeading': 'पाठ पूरा हुआ',
  'lesson.completeText': 'क्विज़ पूरी करने से अगला पाठ खुल गया। आप इसे जब चाहें फिर से देख सकते हैं।',
  'lesson.quizScore': 'क्विज़: पहली बार में {total} में से {right} सही।',
  'lesson.finishedHeading': 'यह पाठ पूरा हुआ?',
  'lesson.finishedAlready': 'आप यह पाठ पहले ही पूरा कर चुके हैं। इसे जब चाहें फिर से देख सकते हैं।',
  'lesson.finishedPrompt': 'पूरा होने पर बटन दबाइए। अगला पाठ खुल जाएगा।',
  'lesson.alreadyComplete': 'पहले से पूरा',
  'lesson.markComplete': 'पूरा हुआ बताइए',
  'lesson.navLabel': 'पाठों के बीच जाएँ',
  'lesson.celebrationMessage': '{title} पूरा हुआ',
  'lesson.pageTitleFallback': 'पाठ',

  // ------------------------------------------------------------- celebration
  'celebration.defaultMessage': 'पाठ पूरा हुआ',
  'celebration.nextOpen': 'अगला पाठ अब खुल गया है।',

  // ------------------------------------------------------------- not found
  'notfound.pageTitle': 'पन्ना नहीं मिला',
  'notfound.iconAlt': 'एक प्रश्नचिह्न',
  'notfound.heading': 'यह पन्ना यहाँ नहीं है',
  'notfound.text':
    'हो सकता है लिंक पुराना हो, या उसमें कोई शब्द अलग तरह से लिखा हो। होम पन्ने पर वापस जाइए और फिर से शुरू कीजिए।',
  'notfound.cta': 'होम पन्ने पर जाइए',

  // ------------------------------------------------------------- dictionary
  'dict.pageTitle': 'पैसे के शब्दों का शब्दकोश',
  'dict.heading': 'पैसे के शब्द',
  'dict.lead':
    'हर शब्द के साथ एक तस्वीर, छोटा अर्थ और एक उदाहरण है। हर शब्द का {signShort} वीडियो बनते ही जोड़ा जाता है।',
  'dict.searchLabel': 'पैसे का कोई शब्द खोजिए',
  'dict.searchPlaceholder': 'कोई शब्द लिखिए, जैसे: ब्याज',
  'dict.clearSearch': 'खोज का ख़ाना ख़ाली कीजिए',
  'dict.filterLabel': 'शब्दों को समूह से छाँटिए',
  'dict.allWords': 'सभी शब्द',
  'dict.noMatch': '“{query}” से कोई शब्द नहीं मिला। छोटा शब्द आज़माइए।',
  'dict.countOne': '{n} शब्द',
  'dict.countMany': '{n} शब्द',

  // ------------------------------------------------------------- schemes page
  'schemes.pageTitle': 'योजनाएँ और आपका हक़',
  'schemes.eyebrow': 'जो आपका हक़ है, उसे जानिए',
  'schemes.heading': 'वे योजनाएँ जिन पर शायद पहले से आपका हक़ है',
  'schemes.lead':
    'बहरा होने में वह ख़र्च होता है जो सुनने वाले कभी नहीं करते। ये योजनाएँ उसी की भरपाई के लिए हैं, किसी को बढ़त देने के लिए नहीं। ज़्यादातर सिर्फ़ इसलिए बिना माँगे रह जाती हैं क्योंकि किसी को इनके बारे में पता ही नहीं था।',
  'schemes.firstHeading': 'सबसे पहले UDID कार्ड बनवाइए',
  'schemes.firstText':
    'नीचे दी लगभग हर योजना सबसे पहले यही माँगती है। इसके बिना इस पन्ने का ज़्यादातर हिस्सा बंद है; इसके साथ खुल जाता है। यह मुफ़्त है, और इस पन्ने पर सबसे काम की चीज़ यही है।',
  'schemes.howMuch': 'कितना',
  'schemes.who': 'किसके लिए',
  'schemes.howToApply': 'आवेदन कैसे करें',
  'schemes.worthKnowing': 'जानने लायक़ बात',
  'schemes.newTab': '(नए टैब में खुलता है)',
  'schemes.checked': '{when} में जाँचा गया। किसी आँकड़े पर क़दम उठाने से पहले स्रोत से मिला लीजिए:',
  'schemes.absentHeading': 'इस पन्ने पर क्या नहीं है, और क्यों',
  'schemes.absentLead':
    'सिर्फ़ यह बताने वाली सूची कि क्या मौजूद है, बहुत काम की नहीं होती। ये वे चीज़ें हैं जिनके बारे में आप कहीं और पढ़कर सोच सकते हैं कि ये यहाँ क्यों नहीं हैं।',
  'schemes.courseHeading': 'ये पाठों में भी पढ़ाई जाती हैं',
  'schemes.courseText':
    'यह पन्ना जानकारी के लिए है। पाठ 10 और 11 में यही सामग्री आपके स्तर पर, पूरी वजह के साथ और अंत में एक क्विज़ के साथ पढ़ाई जाती है।',
  'schemes.courseCta': 'पाठों पर जाइए',
  'schemes.disclaimer':
    'नियम और रक़में बदलती रहती हैं, और इनमें से ज़्यादातर हर साल संशोधित होती हैं। यहाँ हर आँकड़ा {when} में जाँचा गया था और अपने स्रोत के साथ है - उस पर क़दम उठाने से पहले स्रोत से मिला लीजिए। यहाँ कुछ भी वित्तीय या क़ानूनी सलाह नहीं है, और इसे लिखने वाला कोई लाइसेंसधारी सलाहकार या वकील नहीं है।',

  // ------------------------------------------------------------ teachers page
  'teachers.pageTitle': 'माता-पिता और शिक्षकों के लिए',
  'teachers.heading': 'माता-पिता और शिक्षकों के लिए',
  'teachers.lead':
    '{site} बहरे और कम सुनने वाले बच्चों को पैसे की समझ सिखाता है। पाठ उम्र से नहीं, कठिनाई से क्रम में लगे हैं - इसलिए बच्चे को उसकी उम्र से नहीं, बल्कि वह क्या पढ़ और समझ सकता है उससे स्तर दीजिए। कोई साइन-अप नहीं, कोई लॉगिन नहीं। बच्चा यहाँ जो कुछ करता है, वह उसके डिवाइस से बाहर नहीं जाता।',

  'teachers.use.heading': 'कक्षा में इसका उपयोग कैसे करें',
  'teachers.use.step1':
    'पाठ टैब से एक स्तर चुनिए। ग्यारह विषय हर स्तर पर वही रहते हैं; शब्द, गणित और बच्चे को कितना ख़ुद सोचना है - यह बदलता है। स्तर 1 पूरा करने वाला बच्चा ऊपर चढ़ सकता है, और जो अटक गया हो वह नीचे आ सकता है, बिना यह सुने कि वह ग़लत उम्र-वर्ग में है।',
  'teachers.use.step2':
    'वीडियो कैप्शन चालू करके चलाइए। वीडियो के बगल का लिखित पाठ कक्षा के लिए प्रोजेक्ट या प्रिंट किया जा सकता है।',
  'teachers.use.step3':
    'सारांश के बाद रोकिए और कक्षा से कहिए कि एक वाक्य अपने शब्दों में साइन करके बताएँ।',
  'teachers.use.step4':
    'हर बच्चे को अपने डिवाइस पर तस्वीर वाली क्विज़ करने दीजिए। ग़लत जवाब पर संकेत मिलता है और दोबारा कोशिश का मौक़ा - कोई अटकता नहीं।',
  'teachers.use.step5':
    'क्विज़ पूरी होते ही उस डिवाइस पर अगला पाठ अपने आप खुल जाता है - बाद में कुछ दबाने की ज़रूरत नहीं।',

  'teachers.topics.heading': 'ग्यारह विषय',
  'teachers.topics.lead': 'हर विषय तीन बार लिखा गया है, हर कठिनाई स्तर के लिए एक बार।',
  'teachers.topics.caption': 'पाठ के विषय और वे किन स्तरों के लिए लिखे गए हैं',
  'teachers.topics.colTopic': 'विषय',
  'teachers.topics.available': 'उपलब्ध',
  'teachers.topics.notWritten': 'अभी लिखा नहीं गया',

  'teachers.sign.heading': '{sign} वीडियो के बारे में',
  'teachers.sign.reserved':
    'हर पाठ में सांकेतिक अनुवाद के लिए एक जगह रखी गई है, और शब्दकोश के हर शब्द के लिए एक छोटी सांकेतिक क्लिप की जगह। जहाँ क्लिप अभी नहीं बनी, वहाँ जगह यह साफ़ कहती है - छिपाती नहीं।',
  'teachers.sign.regional':
    'सांकेतिक भाषा क्षेत्र के हिसाब से बदलती है। ये पाठ {sign} के लिए लिखे गए हैं। अगर आप किसी और सांकेतिक भाषा में पढ़ाते हैं, तो लिखित सामग्री बदले बिना अनुवादक की क्लिप बदली जा सकती हैं।',
  'teachers.sign.allDone': 'शब्दकोश के सभी {total} शब्दों की सांकेतिक क्लिप मौजूद है।',
  'teachers.sign.someDone':
    'अब तक शब्दकोश के {total} में से {done} शब्दों की सांकेतिक क्लिप बनी है। बाक़ी में तब तक एक चिह्नित जगह दिखती है जब तक वे बन नहीं जातीं।',

  'teachers.settings.heading': 'इस डिवाइस की सेटिंग',
  'teachers.settings.unlockTitle': 'हर पाठ खोल दीजिए',
  'teachers.settings.unlockText':
    'पाठ आम तौर पर एक-एक करके खुलते हैं। किसी भी विषय पर जाने के लिए इसे चालू कीजिए।',
  'teachers.progress.heading': 'इस डिवाइस पर प्रगति',
  'teachers.progress.line': '{label}: {total} में से {done} पाठ पूरे',
  'teachers.progress.save': 'प्रगति को फ़ाइल में सहेजिए',
  'teachers.progress.load': 'फ़ाइल से प्रगति लाइए',
  'teachers.progress.replaceAsk':
    'क्या इस डिवाइस की प्रगति की जगह {name} रख दें? इस डिवाइस पर अभी जो प्रगति है, वह चली जाएगी।',
  'teachers.progress.replaceYes': 'हाँ, बदल दीजिए',
  'teachers.progress.replaceNo': 'नहीं, इस डिवाइस की प्रगति रहने दीजिए',
  'teachers.progress.errParse': 'यह फ़ाइल प्रगति की फ़ाइल नहीं है - इसे पढ़ा ही नहीं जा सका।',
  'teachers.progress.errFormat':
    'यह फ़ाइल किसी ऐसी प्रगति फ़ाइल से मेल नहीं खाती जिसे अमानत पहचानता हो। हो सकता है यह बहुत पुराने संस्करण की हो, या कोई और फ़ाइल हो।',
  'teachers.progress.dismiss': 'हटाइए',
  'teachers.progress.eraseAsk': 'क्या इस डिवाइस की सारी प्रगति मिटा दें?',
  'teachers.progress.eraseYes': 'हाँ, मिटा दीजिए',
  'teachers.progress.eraseNo': 'नहीं, रहने दीजिए',
  'teachers.progress.erase': 'सारी प्रगति मिटाइए',

  'teachers.privacy.heading': 'निजता',
  'teachers.privacy.text':
    'कोई खाता नहीं, कोई एनालिटिक्स नहीं। प्रगति डिवाइस के ब्राउज़र में ही रखी जाती है। ब्राउज़र का डेटा साफ़ करने पर प्रगति भी मिट जाती है। कुछ भी कहीं नहीं भेजा जाता।',
  'teachers.privacy.link': 'सुलभता वक्तव्य पढ़िए',

  // -------------------------------------------------------- accessibility page
  'a11y.pageTitle': 'सुलभता वक्तव्य',
  'a11y.heading': 'सुलभता वक्तव्य',
  'a11y.lead':
    '{site} बहरे और कम सुनने वाले बच्चों के लिए बनाया गया है। इसका लक्ष्य WCAG 2.2 Level AA पूरा करना है, और जहाँ इस पाठक-वर्ग के लिए सबसे ज़्यादा मायने रखता है वहाँ यह Level AAA के कई मानक भी निभाता है।',
  'a11y.reviewed': 'अंतिम समीक्षा: 1 अगस्त 2026।',

  'a11y.sound.group': 'आवाज़ कभी अकेला माध्यम नहीं',
  'a11y.sound.p1':
    'हर पाठ के वीडियो में कम से कम एक कैप्शन ट्रैक है, और जहाँ भाषा कठिन है वहाँ "आसान शब्द" वाला दूसरा ट्रैक भी।',
  'a11y.sound.p2':
    'हर वीडियो के बगल में पूरा लिखित पाठ है। उसे खोजा जा सकता है, और किसी पंक्ति पर क्लिक करने से वीडियो उसी जगह पहुँच जाता है।',
  'a11y.sound.p3': 'कोई वीडियो अपने आप नहीं चलता, इसलिए आवाज़ कभी अपने आप शुरू नहीं होती।',
  'a11y.sound.p4': 'हर वीडियो में {sign} अनुवादक के लिए एक जगह रखी गई है।',
  'a11y.sound.p5':
    'क्विज़ का जवाब, पाठ पूरा होने का जश्न और हर चेतावनी - सब दिखाई देते हैं। साइट कोई आवाज़ नहीं बजाती।',

  'a11y.colour.group': 'सिर्फ़ रंग से नहीं',
  'a11y.colour.p1': 'बंद, खुले और पूरे हो चुके पाठ - हर एक के साथ एक चिह्न, एक शब्द और एक रंग है।',
  'a11y.colour.p2':
    'सही जवाब पर सही का निशान, "सही" शब्द और हरा रंग दिखता है। ग़लत जवाब पर क्रॉस, "नहीं" शब्द और लाल रंग।',
  'a11y.colour.p3':
    'लिखित पाठ में जो पंक्ति अभी चल रही है, उसे बाईं ओर मोटी लकीर और "अभी" शब्द से चिह्नित किया जाता है।',

  'a11y.contrast.group': 'रंग-अंतर और अक्षरों का आकार',
  'a11y.contrast.p1':
    'पन्ना उजले और गहरे, दोनों रंगों में आता है। आप किसी भी पन्ने के ऊपर से बदल सकते हैं, और साइट उसी रंग में खुलती है जो आपका डिवाइस पहले से माँगता है।',
  'a11y.contrast.p2':
    'मुख्य लिखाई का रंग-अंतर उजले रंग में लगभग 16.4:1 और गहरे में 16.6:1 है। AA के लिए कम से कम 4.5:1 चाहिए।',
  'a11y.contrast.p3': 'हल्की लिखाई उजले में लगभग 5.6:1 और गहरे में 7.4:1 है।',
  'a11y.contrast.p4':
    'हर बटन का रंग इस तरह चुना गया है कि अपनी लिखाई के मुक़ाबले 4.5:1 पार करे, दोनों रंग-रूपों में। 112 रंग-जोड़े अपने आप नापे जाते हैं, और किसी भी एक रंग-रूप में फ़ेल होने वाला जोड़ा साइट को प्रकाशित नहीं होने देता।',
  'a11y.contrast.p5':
    'लेआउट सापेक्ष इकाइयों में बना है, इसलिए 200% ज़ूम पर लिखाई कटती नहीं, फिर से सज जाती है। 400% पर पन्ना एक ही कॉलम बन जाता है और अगल-बगल स्क्रॉल नहीं करना पड़ता।',

  'a11y.keyboard.group': 'कीबोर्ड और फ़ोकस',
  'a11y.keyboard.p1':
    'सब कुछ अकेले कीबोर्ड से चलता है। कोई ऐसा नियंत्रण नहीं जो सिर्फ़ माउस से चले, और कहीं कीबोर्ड फँसता नहीं।',
  'a11y.keyboard.p2':
    'ऐक्सेंट रंग का मोटा फ़ोकस घेरा हमेशा दिखता है और कभी हटाया नहीं जाता। यह दोनों रंग-रूपों में पन्ने के मुक़ाबले 3:1 पार करता है।',
  'a11y.keyboard.p3': '"पन्ने के मुख्य हिस्से पर जाइए" लिंक वह पहली चीज़ है जहाँ कीबोर्ड पहुँचता है।',
  'a11y.keyboard.p4':
    'पन्ना बदलने पर फ़ोकस नए पन्ने के ऊपर चला जाता है, क्योंकि सिंगल-पेज ऐप यह अपने आप नहीं करता।',
  'a11y.keyboard.p5': 'क्विज़ में "आगे" दबाने पर फ़ोकस अगले सवाल के शीर्षक पर चला जाता है।',

  'a11y.target.group': 'दबाने की जगह का आकार',
  'a11y.target.p1':
    'हर बटन, लिंक और मेन्यू कम से कम 44 गुणा 44 पिक्सल का है - AA के 24 गुणा 24 के न्यूनतम से काफ़ी ऊपर।',
  'a11y.target.p2':
    'चेकबॉक्स 28 पिक्सल के हैं, और उनके बगल की पूरी पंक्ति 44 पिक्सल ऊँची है और उसे दबाने पर भी वे बदलते हैं।',
  'a11y.target.p3': 'वीडियो की सीक पट्टी पूरे 44 पिक्सल ऊँची है, ताकि टैबलेट पर खींची जा सके।',

  'a11y.motion.group': 'हलचल',
  'a11y.motion.p1':
    'सिस्टम की "हलचल कम कीजिए" सेटिंग का पालन होता है। तब हलचल लगभग शून्य हो जाती है और रंगीन कतरनें बनती ही नहीं।',
  'a11y.motion.p2': 'कोई हलचल हमेशा के लिए नहीं दोहराती, और बच्चे के शुरू किए बिना कुछ नहीं हिलता।',
  'a11y.motion.p3': 'मतलब जश्न के संदेश से आता है। रंगीन कतरनें उसके ऊपर सिर्फ़ सजावट हैं।',

  'a11y.plain.group': 'सरल भाषा',
  'a11y.plain.p1': 'वाक्य छोटे हैं और हर वाक्य में एक ही बात है।',
  'a11y.plain.p2':
    'मुहावरों और रूपकों से पूरी तरह बचा गया है, क्योंकि जिनकी पहली भाषा सांकेतिक है उनके लिए ये एक जानी-मानी रुकावट हैं।',
  'a11y.plain.p3': 'नए शब्द हर पाठ के अंत में दिए हैं और सांकेतिक शब्दकोश से जुड़े हैं।',
  'a11y.plain.p4': 'पैसे की रक़में रुपयों में और रोज़मर्रा के भारतीय उदाहरणों के साथ हैं।',

  'a11y.structure.group': 'ढाँचा और नामकरण',
  'a11y.structure.p1':
    'असली लैंडमार्क इस्तेमाल हुए हैं: header, nav, main, footer। शीर्षक क्रम में चलते हैं, कोई स्तर छोड़ा नहीं जाता।',
  'a11y.structure.p2': 'यात्रा का नक़्शा एक असली क्रमबद्ध सूची है, इसलिए क्रम सही बोला जाता है।',
  'a11y.structure.p3': 'ब्राउज़र टैब का शीर्षक हर पन्ने के साथ बदलता है।',
  'a11y.structure.p4':
    'क्विज़ के नतीजे, खोज के परिणामों की गिनती और चलने की स्थिति - सब विनम्र लाइव रीजन से बोले जाते हैं, फ़ोकस छीने बिना।',
  'a11y.structure.p5':
    'टॉगल बटन अपनी स्थिति aria-pressed से बताते हैं, और प्रगति पट्टियाँ अपना मान बताती हैं।',

  'a11y.gaps.heading': 'जो अभी पूरा नहीं हुआ',
  'a11y.gaps.p1':
    'पाठ के वीडियो सार्वजनिक-डोमेन की अस्थायी फ़ाइलें हैं। उनके कैप्शन और लिखित पाठ भी अस्थायी हैं और असली सामग्री नहीं बताते।',
  'a11y.gaps.p2':
    '{sign} अनुवादक की कोई क्लिप अभी नहीं बनी है। जहाँ-जहाँ वह आनी है, वहाँ खाली छोड़ने के बजाय ऐसा लिखा गया है।',
  'a11y.gaps.p3':
    'साइट को ऊपर दिए WCAG 2.2 AA मानकों के विरुद्ध जाँच कर देखा गया है। इसे अभी तक बहरे बच्चों या स्क्रीन रीडर इस्तेमाल करने वाले किसी व्यक्ति के साथ नहीं परखा गया - और यही सबसे ज़रूरी परीक्षा है।',

  'a11y.feedback.heading': 'कोई दिक़्क़त हो तो बताइए',
  'a11y.feedback.text':
    'अगर इस साइट का कोई हिस्सा इस्तेमाल करने में कठिन है, तो ग़लती साइट की है, पढ़ने वाले की नहीं। कृपया अपने शिक्षक को या जिसने आपको यह लिंक दिया है उसे बताइए, और यह भी बताइए कि आप क्या करने की कोशिश कर रहे थे।',
}

export const strings = { en, hi }
