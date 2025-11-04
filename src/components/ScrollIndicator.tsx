import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from 'styled-components';

const ScrollIndicator: React.FC = () => {
  const indicatorRef = useRef<HTMLDivElement>(null);

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
    <ScrollProgressContainer>
      <ScrollProgressBar ref={indicatorRef} />
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
`;

const ScrollProgressBar = styled.div`
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, var(--accent-500, #f97316) 0%, var(--accent-600, #ea580c) 100%);
  transition: width 0.05s ease;
  box-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
`;

export default ScrollIndicator;