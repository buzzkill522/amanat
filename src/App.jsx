import { Navigate, Route, Routes } from 'react-router-dom'
import { LanguageProvider } from '@/i18n/LanguageProvider.jsx'
import { ProgressProvider } from '@/hooks/useProgress.jsx'
import ErrorBoundary from '@/components/ErrorBoundary.jsx'
import Layout from '@/components/Layout.jsx'
import Home from '@/pages/Home.jsx'
import LearningPath from '@/pages/LearningPath.jsx'
import Lesson from '@/pages/Lesson.jsx'
import Dictionary from '@/pages/Dictionary.jsx'
import Teachers from '@/pages/Teachers.jsx'
import Accessibility from '@/pages/Accessibility.jsx'
import NotFound from '@/pages/NotFound.jsx'

export default function App() {
  return (
    <LanguageProvider>
      <ProgressProvider>
        {/* Inside the providers so a crash in one page keeps the language and
            progress state intact, outside <Routes> so it catches every one. */}
        <ErrorBoundary>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/path/:levelId" element={<LearningPath />} />
              <Route path="/path/:levelId/lesson/:moduleId" element={<Lesson />} />
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/accessibility" element={<Accessibility />} />
              {/* Old shape kept working in case a teacher bookmarked it. */}
              <Route path="/lesson/:moduleId" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </ProgressProvider>
    </LanguageProvider>
  )
}
