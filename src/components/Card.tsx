import React from 'react';
import styled from 'styled-components';
import { ExternalLink, Github } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface CardProps {
  projects: {
    title: string;
    description: string;
    link: string;
    github?: string;
  }[];
}

const Card: React.FC<CardProps> = ({ projects }) => {
  const { theme } = useTheme();
  
  return (
    <StyledWrapper data-theme={theme}>
      <div className="card">
        {projects.map((project, index) => (
          <CardPanel key={index} data-theme={theme}>
            <CardContent>
              <ProjectTitle className="text-heading">{project.title}</ProjectTitle>
              <ProjectDetails>
                <ProjectDescription className="text-body">{project.description}</ProjectDescription>
                <ButtonGroup>
                  <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer" className="text-accent" data-theme={theme}>
                    View Project <ExternalLink size={14} />
                  </ProjectLink>
                  {project.github && (
                    <ProjectGithubLink href={project.github} target="_blank" rel="noopener noreferrer" className="text-accent" data-theme={theme}>
                      <Github size={14} style={{ marginRight: '6px' }} /> GitHub
                    </ProjectGithubLink>
                  )}
                </ButtonGroup>
              </ProjectDetails>
            </CardContent>
          </CardPanel>
        ))}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: 100%;
    max-width: 850px;
    height: 200px;
    border-radius: 12px;
    background: transparent;
    display: flex;
    gap: 4px;
    padding: .4em;
    
    @media (min-width: 640px) {
      height: 240px;
      gap: 8px;
    }
    
    @media (min-width: 768px) {
      height: 280px;
    }
  }
`;

const CardPanel = styled.div`
  height: 100%;
  flex: 1;
  overflow: hidden;
  cursor: pointer;
  border-radius: 0;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  background: rgba(15, 23, 42, 0.6);
  border-top: 1px solid rgba(51, 65, 85, 0.5);
  border-bottom: 1px solid rgba(51, 65, 85, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  backdrop-filter: blur(4px);
  margin: 0 4px;
  
  &:hover {
    flex: 4;
    border-top-color: rgba(249, 115, 22, 0.4);
    border-bottom-color: rgba(249, 115, 22, 0.4);
    box-shadow: 0 10px 30px -15px rgba(2, 6, 23, 0.7);
    transform: translateY(-5px);
  }
  
  &[data-theme="light"] {
    background: rgba(247, 207, 216, 0.2);
    border-top: 1px solid rgba(142, 125, 190, 0.3);
    border-bottom: 1px solid rgba(142, 125, 190, 0.3);
    
    &:hover {
      border-top-color: rgba(142, 125, 190, 0.5);
      border-bottom-color: rgba(142, 125, 190, 0.5);
      box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
    }
  }
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.25em;
  transition: all 0.5s;
  
  @media (min-width: 640px) {
    padding: 1.75em;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  color: #f8fafc;
  transform: rotate(0);
  margin: 0;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
  letter-spacing: -0.01em;
  
  @media (min-width: 640px) {
    font-size: 1.25rem;
    white-space: nowrap;
  }
  
  ${CardPanel}:hover & {
    position: relative;
    transform: translateY(0);
    justify-content: flex-start;
    margin-bottom: 1rem;
    color: var(--accent-500, #f97316);
    font-weight: 500;
  }
  
  ${CardPanel}[data-theme="light"] & {
    color: #2d3748;
  }
  
  ${CardPanel}[data-theme="light"]:hover & {
    color: var(--light-lavender, #8E7DBE);
  }
`;

const ProjectDetails = styled.div`
  opacity: 0;
  height: 0;
  overflow: hidden;
  transition: all 0.4s ease;
  
  ${CardPanel}:hover & {
    opacity: 1;
    height: auto;
    margin-top: 1rem;
  }
`;

const ProjectDescription = styled.div`
  font-size: 0.8rem;
  margin-bottom: 1.25rem;
  opacity: 0.8;
  color: var(--dark-300, #cbd5e1);
  line-height: 1.6;
  hyphens: none;
  word-break: normal;
  
  @media (min-width: 640px) {
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
  }
  
  ${CardPanel}[data-theme="light"] & {
    color: #4a5568;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--accent-500, #f97316);
  text-decoration: none;
  padding: 0.4rem 1rem;
  border: 1px solid var(--accent-500, #f97316);
  border-radius: 4px;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  @media (min-width: 640px) {
    font-size: 0.875rem;
    padding: 0.5rem 1.25rem;
  }
  
  &:hover {
    background: rgba(249, 115, 22, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.15);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(3px);
  }
  
  &[data-theme="light"] {
    color: var(--light-lavender, #8E7DBE);
    border-color: var(--light-lavender, #8E7DBE);
    
    &:hover {
      background: rgba(142, 125, 190, 0.1);
      box-shadow: 0 4px 12px rgba(142, 125, 190, 0.2);
    }
  }
`;

const ProjectGithubLink = styled(ProjectLink)`
  background: rgba(15, 23, 42, 0.8);
  color: var(--dark-50, #f8fafc);
  border: 1px solid rgba(51, 65, 85, 0.5);
  
  &:hover {
    background: rgba(30, 41, 59, 0.8);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
  
  &:hover svg {
    transform: translateY(-1px);
  }
  
  &[data-theme="light"] {
    background: rgba(255, 255, 255, 0.8);
    color: #2d3748;
    border: 1px solid rgba(142, 125, 190, 0.3);
    
    &:hover {
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
`;

export default Card;