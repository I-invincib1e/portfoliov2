import React, { useEffect, useRef } from 'react';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { gsap } from 'gsap';

const ContactPage: React.FC = () => {
  const { theme } = useTheme();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    // Set initial position (off-screen to the right)
    gsap.set(pageRef.current, { 
      x: '100%',
      opacity: 0
    });

    // Slide in from the right with a slight delay for smoother effect
    gsap.to(pageRef.current, {
      x: '0%',
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      clearProps: 'transform' // Clean up transform after animation completes
    });

    // Scroll to top when page loads
    window.scrollTo(0, 0);

    // Cleanup function to handle page exit
    return () => {
      // Optional: add exit animation if needed
      gsap.killTweensOf(pageRef.current);
    };
  }, []);

  return (
    <ContactPageWrapper ref={pageRef} data-theme={theme}>
      <Contact />
      <Footer />
    </ContactPageWrapper>
  );
};

const ContactPageWrapper = styled.main`
  min-height: 100vh;
  padding-top: 80px;
  position: relative;
  overflow-x: hidden; /* Prevents horizontal scrollbar during animation */
  
  @media (max-width: 640px) {
    padding-top: 60px;
  }
  
  @media (max-width: 375px) {
    padding-top: 50px;
  }
`;

export default ContactPage;