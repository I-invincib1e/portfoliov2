import React, { useEffect } from 'react';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { gsap } from 'gsap';

const ContactPage: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Add page reveal animation
    gsap.fromTo(
      '.contact-page',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );

    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <ContactPageWrapper className="contact-page" data-theme={theme}>
      <Contact />
      <Footer />
    </ContactPageWrapper>
  );
};

const ContactPageWrapper = styled.main`
  min-height: 100vh;
  padding-top: 80px;
  
  @media (max-width: 640px) {
    padding-top: 60px;
  }
  
  @media (max-width: 375px) {
    padding-top: 50px;
  }
`;

export default ContactPage;