import { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import { ThemeProvider } from './context/ThemeContext';
import { registerGSAP, cleanupGSAP } from './utils/gsap';

const HomePage = lazy(() => import('./pages/HomePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const CertificationsPage = lazy(() => import('./pages/CertificationsPage'));
const WritingPage = lazy(() => import('./pages/WritingPage'));
const JournalPostPage = lazy(() => import('./pages/JournalPostPage'));
const JournalTagPage = lazy(() => import('./pages/JournalTagPage'));
const JournalSeriesPage = lazy(() => import('./pages/JournalSeriesPage'));
const BuildLogPostPage = lazy(() => import('./pages/BuildLogPostPage'));
const NowPage = lazy(() => import('./pages/NowPage'));
const NewsletterPage = lazy(() => import('./pages/NewsletterPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const PageFallback = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
      Loading edition…
    </span>
  </div>
);

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    registerGSAP();
    return () => cleanupGSAP();
  }, []);

  return (
    <ThemeProvider>
      <Router>
        {!loaded && <Loader onDone={() => setLoaded(true)} />}
        <Cursor />
        <Navbar />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage ready={loaded} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/writing" element={<WritingPage />} />
            <Route path="/journal" element={<Navigate to="/writing?tab=field-notes" replace />} />
            <Route path="/logs" element={<Navigate to="/writing?tab=build-logs" replace />} />
            <Route path="/journal/tag/:tag" element={<JournalTagPage />} />
            <Route path="/journal/series/:slug" element={<JournalSeriesPage />} />
            <Route path="/journal/:slug" element={<JournalPostPage />} />
            <Route path="/logs/:slug" element={<BuildLogPostPage />} />
            <Route path="/now" element={<NowPage />} />
            <Route path="/newsletter" element={<NewsletterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
