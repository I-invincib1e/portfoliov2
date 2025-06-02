import React, { useEffect } from 'react';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const ContactPage: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <ContactPageWrapper data-theme={theme}>
      <Contact />
      <Footer />
    </ContactPageWrapper>
  );
};

const ContactPageWrapper = styled.main`
  min-height: 100vh;
  padding-top: 80px;
  position: relative;
  
  @media (max-width: 640px) {
    padding-top: 60px;
  }
  
  @media (max-width: 375px) {
    padding-top: 50px;
  }
`;

export default ContactPage;