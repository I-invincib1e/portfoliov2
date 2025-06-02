import React from 'react';
import styled from 'styled-components';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitch: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <ThemeSwitchContainer onClick={toggleTheme} data-theme={theme}>
      <ThemeIcon>
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </ThemeIcon>
      <ThemeLabel data-theme={theme}>
        {theme === 'dark' ? 'Light' : 'Dark'}
      </ThemeLabel>
    </ThemeSwitchContainer>
  );
};

const ThemeSwitchContainer = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(30, 41, 59, 0.4);
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(51, 65, 85, 0.5);
  }
  
  &[data-theme="light"] {
    background: rgba(230, 230, 230, 0.5);
    
    &:hover {
      background: rgba(210, 210, 210, 0.7);
    }
  }
`;

const ThemeIcon = styled.div`
  color: var(--dark-50, #f8fafc);
  display: flex;
  align-items: center;
  justify-content: center;
  
  [data-theme="light"] & {
    color: #2d3748;
  }
`;

const ThemeLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--dark-50, #f8fafc);
  
  &[data-theme="light"] {
    color: #2d3748;
  }
`;

export default ThemeSwitch;