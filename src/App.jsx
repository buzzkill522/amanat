import { Navigate, Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
import { LanguageProvider } from '@/i18n/LanguageProvider.jsx'
import { ThemeProvider } from '@/theme/ThemeProvider.jsx'
import { ProgressProvider } from '@/hooks/useProgress.jsx'
import ErrorBoundary from '@/components/ErrorBoundary.jsx'
import Layout from '@/components/Layout.jsx'
import Home from '@/pages/Home.jsx'
import NotFound from '@/pages/NotFound.jsx'
import { OfflineProvider } from '@/components/OfflineTools.jsx'

const Lessons = lazy(() => import('@/pages/Lessons.jsx'))
const LearningPath = lazy(() => import('@/pages/LearningPath.jsx'))
const Lesson = lazy(() => import('@/pages/Lesson.jsx'))
const Careers = lazy(() => import('@/pages/Careers.jsx'))
const Schemes = lazy(() => import('@/pages/Schemes.jsx'))
const Teachers = lazy(() => import('@/pages/Teachers.jsx'))
const Mission = lazy(() => import('@/pages/Mission.jsx'))
const Start = lazy(() => import('@/pages/Start.jsx'))
const Help = lazy(() => import('@/pages/Help.jsx'))
const Feedback = lazy(() => import('@/pages/Feedback.jsx'))
const TeacherGuide = lazy(() => import('@/pages/TeacherGuide.jsx'))

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ProgressProvider>
          {/* Inside the providers so a crash in one page keeps the language,
              theme and progress state intact, outside <Routes> so it catches
              every one. */}
          <OfflineProvider>
          <ErrorBoundary>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/lessons" element={<Lessons />} />
                <Route path="/path/:levelId" element={<LearningPath />} />
                <Route path="/path/:levelId/lesson/:moduleId" element={<Lesson />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/dictionary" element={<Navigate to="/careers" replace />} />
                {/* Outside /path, and therefore outside the unlock sequence:
                    a family needing to know about a funded implant before a
                    birthday cannot be asked to finish nine lessons first. */}
                <Route path="/schemes" element={<Schemes />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/accessibility" element={<Navigate to="/teachers#accessibility" replace />} />
                <Route path="/our-mission" element={<Mission />} />
                <Route path="/start" element={<Start />} />
                <Route path="/help" element={<Help />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/teachers/guide" element={<TeacherGuide />} />
                {/* Old shape kept working in case a teacher bookmarked it. */}
                <Route path="/lesson/:moduleId" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </ErrorBoundary>
          </OfflineProvider>
        </ProgressProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
