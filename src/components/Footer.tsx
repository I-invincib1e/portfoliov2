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
      <FooterContent>
        <InfoText className="text-body">
          © {currentYear} Rushikesh Pawar
        </InfoText>

        <ButtonGroup>
          <MiniLink to="/projects" data-theme={theme}>
            <Briefcase size={16} />
            <span>Projects</span>
          </MiniLink>
          <MiniLink to="/certifications" data-theme={theme} secondary>
            <Award size={16} />
            <span>Certs</span>
          </MiniLink>
        </ButtonGroup>
      </FooterContent>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  padding: 1.5rem 0;
  background-color: rgba(15, 23, 42, 0.2);
  border-top: 1px solid rgba(148, 163, 184, 0.1);

  &[data-theme='light'] {
    background-color: rgba(243, 244, 246, 0.6);
    border-top: 1px solid rgba(72, 75, 106, 0.1);
  }
`;

const FooterContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const InfoText = styled.p`
  font-size: 0.875rem;
  color: var(--dark-400, #94a3b8);

  [data-theme='light'] & {
    color: var(--light-text, #484B6A);
    opacity: 0.7;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

interface MiniLinkProps {
  secondary?: boolean;
}

const MiniLink = styled(Link)<MiniLinkProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  padding: 0.5rem 0.875rem;
  border-radius: 8px;
  text-decoration: none;
  background-color: ${({ secondary }) =>
    secondary ? 'transparent' : 'var(--accent-500, #f97316)'};
  color: ${({ secondary }) =>
    secondary ? 'var(--accent-500, #f97316)' : '#fff'};
  border: ${({ secondary }) =>
    secondary ? '1px solid var(--accent-500, #f97316)' : 'none'};
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ secondary }) =>
      secondary
        ? '0 2px 6px rgba(249, 115, 22, 0.2)'
        : '0 4px 12px rgba(249, 115, 22, 0.3)'};
  }

  &[data-theme='light'] {
    background-color: ${({ secondary }) =>
      secondary ? 'transparent' : 'var(--light-accent, #9394A5)'};
    color: ${({ secondary }) =>
      secondary ? 'var(--light-accent, #9394A5)' : '#fff'};
    border: ${({ secondary }) =>
      secondary ? '1px solid var(--light-accent, #9394A5)' : 'none'};
  }
`;

export default Footer;
