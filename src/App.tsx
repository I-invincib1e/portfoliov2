import { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import { ThemeProvider } from './context/ThemeContext';
import { registerGSAP, cleanupGSAP } from './utils/gsap';

const HomePage = lazy(() => import('./pages/HomePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const CertificationsPage = lazy(() => import('./pages/CertificationsPage'));

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
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
