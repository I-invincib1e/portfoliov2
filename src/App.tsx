import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import ProjectsPage from './pages/ProjectsPage';
import CertificationsPage from './pages/CertificationsPage';
import ScrollIndicator from './components/ScrollIndicator';
import MaskReveal from './components/MaskReveal';
import { registerGSAP } from './utils/gsap';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  useEffect(() => {
    // Initialize GSAP animations
    registerGSAP();
  }, []);

  return (
    <ThemeProvider>
      <MaskReveal>
        <Router>
          <div className="min-h-screen bg-dark-950 text-dark-50 noise-bg transition-colors duration-300" data-theme="data-theme">
            <ScrollIndicator />
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/certifications" element={<CertificationsPage />} />
            </Routes>
          </div>
        </Router>
      </MaskReveal>
    </ThemeProvider>
  );
}

export default App;