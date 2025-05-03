import React from 'react';
import styled from 'styled-components';
import { Briefcase, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper data-theme={theme}>
      <FooterContainer>
        <FooterTop>
          <FooterHeading className="text-heading">Transforming Ideas into Digital Experiences</FooterHeading>
          <CTAContainer>
            <CTAButton 
              as={Link} 
              to="/projects" 
              className="cta-button text-accent"
              data-theme={theme}
            >
              <Briefcase size={18} />
              <span>Projects</span>
            </CTAButton>
            
            <CTAButton 
              as={Link} 
              to="/certifications" 
              className="cta-button text-accent"
              data-theme={theme}
              secondary
            >
              <Award size={18} />
              <span>Certifications</span>
            </CTAButton>
          </CTAContainer>
        </FooterTop>
        
        <FooterDivider data-theme={theme} />
        
        <FooterBottom>
          <CopyrightText className="text-body">
            © {currentYear} Rushikesh Pawar. All rights reserved.
          </CopyrightText>
        </FooterBottom>
      </FooterContainer>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background-color: rgba(15, 23, 42, 0.3);
  padding: 4rem 0 2rem;
  position: relative;
  overflow: hidden;
  
  &[data-theme="light"] {
    background-color: rgba(247, 207, 216, 0.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.3), transparent);
  }
  
  &[data-theme="light"]::before {
    background: linear-gradient(90deg, transparent, rgba(142, 125, 190, 0.3), transparent);
  }
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const FooterTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 3rem;
`;

const FooterHeading = styled.h2`
  font-size: 1.75rem;
  font-weight: 400;
  margin-bottom: 2rem;
  
  @media (min-width: 640px) {
    font-size: 2.25rem;
  }
  
  [data-theme="light"] & {
    color: #2d3748;
  }
`;

const CTAContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`;

interface CTAButtonProps {
  secondary?: boolean;
}

const CTAButton = styled(Link)<CTAButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  background-color: ${props => props.secondary ? 'transparent' : 'var(--accent-500, #f97316)'};
  color: ${props => props.secondary ? 'var(--accent-500, #f97316)' : 'white'};
  border: ${props => props.secondary ? '1px solid var(--accent-500, #f97316)' : 'none'};
  box-shadow: ${props => props.secondary ? 'none' : '0 4px 20px rgba(249, 115, 22, 0.25)'};
  text-decoration: none;
  font-size: 1rem;
  width: 200px;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.secondary ? '0 4px 12px rgba(249, 115, 22, 0.15)' : '0 6px 24px rgba(249, 115, 22, 0.35)'};
    
    svg {
      transform: ${props => props.secondary ? 'translateY(-3px)' : 'translateX(3px)'};
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  &[data-theme="light"] {
    background-color: ${props => props.secondary ? 'transparent' : 'var(--light-lavender, #8E7DBE)'};
    color: ${props => props.secondary ? 'var(--light-lavender, #8E7DBE)' : 'white'};
    border: ${props => props.secondary ? '1px solid var(--light-lavender, #8E7DBE)' : 'none'};
    box-shadow: ${props => props.secondary ? 'none' : '0 4px 16px rgba(142, 125, 190, 0.2)'};
    
    &:hover {
      box-shadow: ${props => props.secondary ? '0 4px 12px rgba(142, 125, 190, 0.15)' : '0 8px 24px rgba(142, 125, 190, 0.3)'};
      background-color: ${props => props.secondary ? 'rgba(142, 125, 190, 0.1)' : '#7d6eb0'};
    }
  }
  
  @media (max-width: 640px) {
    width: 180px;
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const FooterDivider = styled.div`
  height: 1px;
  background: rgba(51, 65, 85, 0.3);
  margin: 2rem 0;
  
  &[data-theme="light"] {
    background: rgba(166, 214, 214, 0.3);
  }
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const CopyrightText = styled.p`
  color: var(--dark-400, #94a3b8);
  font-size: 0.875rem;
  
  [data-theme="light"] & {
    color: #4a5568;
  }
`;

export default Footer;