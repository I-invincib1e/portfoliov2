import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollIndicator from './components/ScrollIndicator';
import MaskReveal from './components/MaskReveal';
import { registerGSAP, cleanupGSAP } from './utils/gsap';
import { ThemeProvider } from './context/ThemeContext';
import ThemeSwitch from './components/ThemeSwitch';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const CertificationsPage = lazy(() => import('./pages/CertificationsPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark-950">
    <div className="animate-pulse text-dark-300 text-xl">Loading...</div>
  </div>
);

function App() {
  useEffect(() => {
    // Initialize GSAP animations
    registerGSAP();
    
    // Clean up GSAP animations on unmount
    return () => {
      cleanupGSAP();
    };
  }, []);

  return (
    <ThemeProvider>
      <MaskReveal>
        <Router>
          <div className="min-h-screen bg-dark-950 text-dark-50 noise-bg transition-colors duration-300">
            <ScrollIndicator />
            <Navbar />
            <div className="fixed top-20 right-6 z-50">
              <ThemeSwitch />
            </div>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/certifications" element={<CertificationsPage />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </MaskReveal>
    </ThemeProvider>
  );
}

export default App;