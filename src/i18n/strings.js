// ---------------------------------------------------------------------------
// UI text in English and Hindi.
//
// ADDING A STRING
//   1. Add the key to `en` below, in the block for the page it belongs to.
//   2. Add the same key to `hi`. If you leave it out, the English text is used
//      instead — a missing translation never blanks the screen.
//
// The Hindi here is written the same way the English is: short sentences,
// everyday words, nothing a 7-year-old would need an adult to unpick. It is
// written text, not a replacement for Indian Sign Language — the ISL video is
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
  'nav.teachers': 'Teachers',
  'nav.access': 'Access',
  'nav.label': 'Main',
  'nav.current': '(current page)',
  'skip.link': 'Skip to the main part of the page',
  'lang.switchTo': 'Read this site in Hindi',
  'lang.switchToEnglish': 'Read this site in English',
  'lang.name': 'हिन्दी',
  // "Light" and "Dark" describe the page, not the time of day — kept to one
  // short common word each so they fit beside the language buttons at 320px
  // and stay readable for a child still learning English.
  'theme.label': 'Page colours',
  'theme.light': 'Light',
  'theme.dark': 'Dark',
  'theme.selected': 'selected',
  'storage.blocked': 'This device cannot save your progress. You can still watch every lesson.',
  'footer.blurb': 'Amanat — free money lessons for Deaf and Hard-of-Hearing children.',
  'footer.accessibility': 'Accessibility statement',
  'footer.teachers': 'For parents and teachers',
  'site.tagline': 'Money lessons you can see',

  // ----------------------------------------------------------------- cover
  'cover.badge': 'Made with {sign} first',
  'cover.title1': 'Money lessons',
  'cover.title2': 'you can see',
  'cover.lead':
    'Watch. Read. Answer picture questions. Amanat teaches Deaf and Hard-of-Hearing children, ages 7 to 15, how money works — with sign language, captions and pictures on every single lesson.',
  'cover.promise.sign': '{signShort} video',
  'cover.promise.captions': 'Captions on every lesson',
  'cover.promise.sound': 'No sound needed',
  'cover.cta.start': 'Start learning',
  'cover.cta.dictionary': 'See the money signs',

  // ------------------------------------------------------------------ home
  'home.lessons.heading': 'Eight lessons',
  'home.lessons.lead':
    'Every lesson has captions, a written transcript, and a space for a video in {sign}.',
  'home.level.eyebrow': 'Choose a level',
  'home.level.heading': 'Where do you want to start?',
  'home.level.lead':
    'Pick a level. Start at 1 if you are not sure — you can move up any time.',
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
    'Being Deaf costs money that hearing people never spend. These exist to offset that — and most go unclaimed simply because nobody knew.',
  'home.claim.udid.title': 'The UDID card',
  'home.claim.udid.text': 'Free. The card almost every other scheme asks for first.',
  'home.claim.adip.title': 'ADIP',
  'home.claim.adip.text': 'Hearing aids and cochlear implants, free or subsidised.',
  'home.claim.scholarship.title': 'Scholarships',
  'home.claim.scholarship.text': 'School to postgraduate. Fees, hostel and books. Never repaid.',
  'home.claim.tax.title': 'Section 80U',
  'home.claim.tax.text': '₹75,000 off taxable income, or ₹1,25,000 if severe. No receipts.',
  'home.claim.cta': 'See the schemes lessons',
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
    'Some lessons are written in Hindi already. The rest are still in English — each one says so before it starts.',
  'lesson.notTranslated':
    'This lesson has not been written in Hindi yet. It will show in English below.',
}

const hi = {
  // ---------------------------------------------------------------- chrome
  'nav.home': 'होम',
  'nav.lessons': 'पाठ',
  'nav.dictionary': 'शब्दकोश',
  'nav.teachers': 'शिक्षक',
  'nav.access': 'सुलभता',
  'nav.label': 'मुख्य',
  'nav.current': '(यही पन्ना खुला है)',
  'skip.link': 'सीधे पन्ने के मुख्य भाग पर जाएँ',
  'lang.switchTo': 'इस साइट को हिन्दी में पढ़ें',
  'lang.switchToEnglish': 'इस साइट को अंग्रेज़ी में पढ़ें',
  'lang.name': 'English',
  'theme.label': 'पन्ने के रंग',
  'theme.light': 'उजला',
  'theme.dark': 'गहरा',
  'theme.selected': 'चुना हुआ',
  'storage.blocked':
    'यह डिवाइस आपकी प्रगति सहेज नहीं सकता। फिर भी आप हर पाठ देख सकते हैं।',
  'footer.blurb': 'अमानत — बहरे और कम सुनने वाले बच्चों के लिए मुफ़्त पैसे के पाठ।',
  'footer.accessibility': 'सुलभता वक्तव्य',
  'footer.teachers': 'माता-पिता और शिक्षकों के लिए',
  'site.tagline': 'पैसे के पाठ, जो आप देख सकते हैं',

  // ----------------------------------------------------------------- cover
  'cover.badge': 'सबसे पहले {sign} में बना',
  'cover.title1': 'पैसे के पाठ,',
  'cover.title2': 'जो आप देख सकते हैं',
  'cover.lead':
    'देखिए। पढ़िए। तस्वीर वाले सवालों के जवाब दीजिए। अमानत 7 से 15 साल के बहरे और कम सुनने वाले बच्चों को सिखाता है कि पैसा कैसे काम करता है — हर पाठ में सांकेतिक भाषा, कैप्शन और तस्वीरें।',
  'cover.promise.sign': '{signShort} वीडियो',
  'cover.promise.captions': 'हर पाठ में कैप्शन',
  'cover.promise.sound': 'सुनने की ज़रूरत नहीं',
  'cover.cta.start': 'सीखना शुरू करें',
  'cover.cta.dictionary': 'पैसे के संकेत देखें',

  // ------------------------------------------------------------------ home
  'home.lessons.heading': 'आठ पाठ',
  'home.lessons.lead':
    'हर पाठ में कैप्शन हैं, लिखा हुआ पूरा पाठ है, और {sign} के वीडियो के लिए जगह है।',
  'home.level.eyebrow': 'स्तर चुनिए',
  'home.level.heading': 'कहाँ से शुरू करना है?',
  'home.level.lead':
    'एक स्तर चुनिए। पक्का न हो तो स्तर 1 से शुरू कीजिए — आप कभी भी आगे बढ़ सकते हैं।',
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
    'रेखा-चित्र, फ़ोटो नहीं — इसलिए हर आकार में और 400% ज़ूम पर भी साफ़ दिखते हैं।',
  'home.built.private.title': 'कुछ भी डिवाइस से बाहर नहीं जाता',
  'home.built.private.text':
    'कोई खाता नहीं, कोई लॉगिन नहीं, कोई निगरानी नहीं। आपकी प्रगति सिर्फ़ इसी डिवाइस पर रहती है।',

  // ------------------------------------------------------------- curriculum
  'home.topics.eyebrow': 'पाठ्यक्रम',
  'home.topics.heading': '{count} विषय, तीन-तीन बार लिखे गए',
  'home.topics.lead':
    'हर स्तर पर वही विषय — हाथ में रखे सिक्कों से लेकर चक्रवृद्धि ब्याज और आपके अधिकारों तक।',

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
    'बहरा होने पर वह ख़र्च आता है जो सुनने वालों को कभी नहीं करना पड़ता। ये योजनाएँ उसी की भरपाई हैं — और ज़्यादातर सिर्फ़ इसलिए बिना माँगे रह जाती हैं क्योंकि किसी को पता ही नहीं था।',
  'home.claim.udid.title': 'UDID कार्ड',
  'home.claim.udid.text': 'मुफ़्त। लगभग हर दूसरी योजना सबसे पहले यही माँगती है।',
  'home.claim.adip.title': 'ADIP',
  'home.claim.adip.text': 'श्रवण यंत्र और कॉक्लियर इम्प्लांट, मुफ़्त या कम दाम पर।',
  'home.claim.scholarship.title': 'छात्रवृत्ति',
  'home.claim.scholarship.text': 'स्कूल से स्नातकोत्तर तक। फ़ीस, हॉस्टल और किताबें। कभी लौटानी नहीं।',
  'home.claim.tax.title': 'धारा 80U',
  'home.claim.tax.text': 'कर योग्य आय में ₹75,000 की छूट, गंभीर दिव्यांगता पर ₹1,25,000। कोई रसीद नहीं।',
  'home.claim.cta': 'योजनाओं के पाठ देखिए',
  'home.claim.note': 'नियम और रक़में बदलती रहती हैं। हर आँकड़ा पढ़ाने से पहले जाँचा जाता है।',

  // ------------------------------------------------------- dictionary teaser
  'home.words.eyebrow': 'पैसे के शब्द',
  'home.words.heading': '{count} शब्द, हर एक के संकेत के लिए जगह',
  'home.words.lead':
    'कोई शब्द ढूँढिए और देखिए — तस्वीर, आसान अर्थ, और रुपयों में एक असली उदाहरण।',
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
    'कुछ पाठ पहले से हिन्दी में लिखे जा चुके हैं। बाकी अभी अंग्रेज़ी में हैं — हर पाठ शुरू होने से पहले यह बता देता है।',
  'lesson.notTranslated':
    'यह पाठ अभी हिन्दी में नहीं लिखा गया है। नीचे यह अंग्रेज़ी में दिखेगा।',
}

export const strings = { en, hi }
