import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const Pattern = () => {
  const { theme } = useTheme();
  
  return (
    <StyledWrapper data-theme={theme}>
      <div className="container" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.05;
  pointer-events: none;
  overflow: hidden;

  .container {
    width: 100%;
    height: 100%;
    background: linear-gradient(
        30deg,
        #111111 12%,
        transparent 12.5%,
        transparent 87%,
        #111111 87.5%,
        #111111
      ),
      linear-gradient(
        150deg,
        #111111 12%,
        transparent 12.5%,
        transparent 87%,
        #111111 87.5%,
        #111111
      ),
      linear-gradient(
        30deg,
        #111111 12%,
        transparent 12.5%,
        transparent 87%,
        #111111 87.5%,
        #111111
      ),
      linear-gradient(
        150deg,
        #111111 12%,
        transparent 12.5%,
        transparent 87%,
        #111111 87.5%,
        #111111
      ),
      linear-gradient(
        60deg,
        #77777777 25%,
        transparent 25.5%,
        transparent 75%,
        #77777777 75%,
        #77777777
      ),
      linear-gradient(
        60deg,
        #77777777 25%,
        transparent 25.5%,
        transparent 75%,
        #77777777 75%,
        #77777777
      );
    background-position:
      0 0,
      0 0,
      40px 70px,
      40px 70px,
      0 0,
      40px 70px;
    background-color: #000000;
    background-size: 80px 140px;
    box-shadow: inset 0 0 100px rgba(255, 215, 0, 0.1);
    transition: all 0.3s ease;
  }

  &[data-theme="light"] .container {
    background-color: transparent;
    background: linear-gradient(
        30deg,
        #a6d6d6 12%,
        transparent 12.5%,
        transparent 87%,
        #a6d6d6 87.5%,
        #a6d6d6
      ),
      linear-gradient(
        150deg,
        #a6d6d6 12%,
        transparent 12.5%,
        transparent 87%,
        #a6d6d6 87.5%,
        #a6d6d6
      ),
      linear-gradient(
        30deg,
        #a6d6d6 12%,
        transparent 12.5%,
        transparent 87%,
        #a6d6d6 87.5%,
        #a6d6d6
      ),
      linear-gradient(
        150deg,
        #a6d6d6 12%,
        transparent 12.5%,
        transparent 87%,
        #a6d6d6 87.5%,
        #a6d6d6
      ),
      linear-gradient(
        60deg,
        #f7cfd877 25%,
        transparent 25.5%,
        transparent 75%,
        #f7cfd877 75%,
        #f7cfd877
      ),
      linear-gradient(
        60deg,
        #f7cfd877 25%,
        transparent 25.5%,
        transparent 75%,
        #f7cfd877 75%,
        #f7cfd877
      );
    background-position:
      0 0,
      0 0,
      40px 70px,
      40px 70px,
      0 0,
      40px 70px;
    background-size: 80px 140px;
    box-shadow: inset 0 0 100px rgba(142, 125, 190, 0.1);
  }
`;

export default Pattern;