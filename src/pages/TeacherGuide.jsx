import { useState } from 'react'
import { Link } from 'react-router-dom'
import { modules, getModule, moduleMeta } from '@content/index.js'
import { levels } from '@/config/site.js'
import { useLanguage } from '@/i18n/LanguageProvider.jsx'
import usePageTitle from '@/hooks/usePageTitle.js'

function Question({ question, t }) {
  return <li className="space-y-2">
    {question.scenario && <p>{question.scenario}</p>}
    <p className="font-bold">{question.prompt}</p>
    <ul className="list-disc pl-6">{question.options.map((option, index) => <li key={index}>{option.label}</li>)}</ul>
    <p className="font-bold">{t('guide.answer', { answer: question.options[question.correctIndex].label })}</p>
    {question.options[question.correctIndex].consequence && <p>{question.options[question.correctIndex].consequence}</p>}
    {question.explanation && <p>{question.explanation}</p>}
    {question.reasoning && <ol className="border-l-2 border-brand-400 pl-4"><Question question={question.reasoning} t={t} /></ol>}
  </li>
}

export default function TeacherGuide() {
  const { t, lang } = useLanguage()
  const [levelId, setLevelId] = useState('level-1')
  const [moduleId, setModuleId] = useState(modules[0].id)
  const lesson = getModule(levelId, moduleId, lang)
  usePageTitle(t('guide.heading'))
  return <div className="teacher-guide space-y-8">
    <header className="space-y-3"><h1 className="text-4xl font-extrabold">{t('guide.heading')}</h1><p className="print-hide max-w-3xl text-lg text-muted">{t('guide.intro')}</p></header>
    <div className="print-hide card flex flex-wrap items-end gap-5 p-5">
      <label className="min-w-0 flex-1 font-bold">{t('guide.topic')}<select className="mt-2 min-h-11 w-full rounded-xl border-2 border-brand-400 bg-surface p-2" value={moduleId} onChange={event => setModuleId(event.target.value)}>{modules.map(m => <option key={m.id} value={m.id}>{moduleMeta(m, lang).title}</option>)}</select></label>
      <label className="font-bold">{t('guide.level')}<select className="mt-2 block min-h-11 rounded-xl border-2 border-brand-400 bg-surface p-2" value={levelId} onChange={event => setLevelId(event.target.value)}>{levels.map(level => <option key={level.id} value={level.id}>{t('level.label', { n: level.step })} · {t(`level.${level.id}.name`)}</option>)}</select></label>
      <button className="btn-primary" onClick={() => window.print()}>{t('guide.print')}</button>
    </div>
    <article className="space-y-6 text-lg leading-relaxed">
      <h2 className="text-3xl font-extrabold">{lesson.moduleTitle} · {t('level.label', { n: levels.find(l => l.id === levelId).step })}</h2>
      {lang === 'hi' && !lesson.translated && <p className="rounded-xl bg-gold-100 p-4 text-gold-600">{t('guide.english')}</p>}
      <section><h3 className="text-xl font-extrabold">{t('guide.prep')}</h3><p>{t('guide.prepText')}</p></section>
      {lesson.story && <section lang={lang === 'hi' && !lesson.translated ? 'en' : undefined} className="space-y-3"><h3 className="text-xl font-extrabold">{t('guide.story')}: {lesson.story.title}</h3>{lesson.story.text.map((paragraph, i) => <p key={i}>{paragraph}</p>)}<p className="font-bold">{lesson.story.moral}</p></section>}
      <section><h3 className="text-xl font-extrabold">{t('guide.key')}</h3><ul className="list-disc pl-6">{lesson.summary.map((line, i) => <li key={i}>{line}</li>)}</ul></section>
      <section><h3 className="text-xl font-extrabold">{t('guide.questions')}</h3><ol className="mt-4 list-decimal space-y-6 pl-6">{lesson.quiz?.questions.map(question => <Question key={question.id} question={question} t={t} />)}</ol></section>
      <section><h3 className="text-xl font-extrabold">{t('guide.wrap')}</h3><p>{t('guide.wrapText')}</p></section>
      <Link className="print-hide btn-secondary" to={`/path/${levelId}/lesson/${moduleId}`}>{t('guide.open')}</Link>
    </article>
  </div>
}
