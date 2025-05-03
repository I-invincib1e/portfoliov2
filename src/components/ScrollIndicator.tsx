import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const ScrollIndicator: React.FC = () => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!indicatorRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Create the scroll progress indicator
    gsap.to(indicatorRef.current, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  }, []);

  return (
    <ScrollProgressContainer data-theme={theme}>
      <ScrollProgressBar ref={indicatorRef} data-theme={theme} />
    </ScrollProgressContainer>
  );
};

const ScrollProgressContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: rgba(15, 23, 42, 0.2);
  z-index: 100;
  
  &[data-theme="light"] {
    background-color: rgba(166, 214, 214, 0.3);
  }
`;

const ScrollProgressBar = styled.div`
  height: 100%;
  width: 0;
  background-color: var(--accent-500, #f97316);
  transition: width 0.05s ease;
  
  &[data-theme="light"] {
    background-color: var(--light-lavender, #8E7DBE);
  }
`;

export default ScrollIndicator;