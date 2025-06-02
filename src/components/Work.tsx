import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Briefcase } from 'lucide-react';
import styled from 'styled-components';
import Pattern from './Pattern';
import { useTheme } from '../context/ThemeContext';
import { allProjects } from '../config/siteConfig';

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github?: string;
  index: number;
}

const Project: React.FC<ProjectProps> = ({ title, description, tags, image, link, github, index }) => {
  const projectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!projectRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Create animation for project card
    gsap.fromTo(
      projectRef.current,
      { 
        y: 60, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: projectRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none none',
        },
        delay: index * 0.2,
      }
    );

    // Create hover animation
    const hoverTl = gsap.timeline({ paused: true });
    hoverTl.to(projectRef.current.querySelector('.project-image'), {
      scale: 1.05,
      duration: 0.4,
      ease: 'power1.out',
    });

    // Add event listeners for hover
    projectRef.current.addEventListener('mouseenter', () => hoverTl.play());
    projectRef.current.addEventListener('mouseleave', () => hoverTl.reverse());

    return () => {
      if (projectRef.current) {
        projectRef.current.removeEventListener('mouseenter', () => hoverTl.play());
        projectRef.current.removeEventListener('mouseleave', () => hoverTl.reverse());
      }
    };
  }, [index]);

  return (
    <div 
      ref={projectRef} 
      className="group relative overflow-hidden bg-dark-800/50 rounded-lg transition-all duration-300 hover:shadow-xl"
    >
      <div className="project-image aspect-video w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-medium text-heading">{title}</h3>
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-accent-500 hover:text-accent-400 transition-colors"
          >
            <ExternalLink size={18} />
          </a>
        </div>
        <p className="text-dark-300 mb-4 text-body">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-1 rounded-full bg-dark-700/50 text-dark-200 text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Work: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bentoBoxRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !bentoBoxRef.current || !experienceRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Animate the heading
    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate the bento box projects
    gsap.fromTo(
      bentoBoxRef.current.querySelectorAll('.bento-item'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bentoBoxRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate the experience section
    gsap.fromTo(
      experienceRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: experienceRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  // Get featured projects for the main bento display
  const featuredProjects = allProjects.filter(project => project.featured);
  
  // Split featured projects into two rows: 3 in first row, 2 in second row
  const firstRowProjects = featuredProjects.slice(0, 3);
  const secondRowProjects = featuredProjects.slice(3, 5);

  return (
    <WorkSection
      id="work"
      ref={sectionRef}
      className="section noise-bg relative"
      data-theme={theme}
    >
      <Pattern />
      <div className="container mx-auto px-4 relative z-10">
        <WorkHeading ref={headingRef} className="text-heading">
          Recent Work / Projects<span className="dot">.</span>
        </WorkHeading>

        {/* Projects Layout - Two Rows */}
        <ProjectsLayout ref={bentoBoxRef}>
          {/* First Row - 3 Projects */}
          <BentoRow>
            {firstRowProjects.map((project, index) => (
              <BentoPanel key={index} className="bento-item" data-theme={theme}>
                <BentoContent>
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
                </BentoContent>
              </BentoPanel>
            ))}
          </BentoRow>
          
          {/* Second Row - 2 Projects (Centered) */}
          <BentoRowCentered>
            {secondRowProjects.map((project, index) => (
              <BentoPanel key={index + 3} className="bento-item" data-theme={theme}>
                <BentoContent>
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
                </BentoContent>
              </BentoPanel>
            ))}
          </BentoRowCentered>
        </ProjectsLayout>

        {/* Experience Section */}
        <ExperienceContainer ref={experienceRef}>
          <ExperienceHeading className="text-heading">
            Professional Experience<span className="dot">.</span>
          </ExperienceHeading>
          
          <ExperienceCard data-theme={theme}>
            <ExperienceIconWrapper data-theme={theme}>
              <Briefcase size={24} />
            </ExperienceIconWrapper>
            <ExperienceContent>
              <ExperienceHeader>
                <ExperienceTitle className="text-heading">SAP SD Support Analyst</ExperienceTitle>
                <ExperienceCompany className="text-accent">FDC Limited</ExperienceCompany>
              </ExperienceHeader>
              <ExperienceDuration className="text-body">September 2024 - February 2025 (6 months)</ExperienceDuration>
              <ExperienceLocation className="text-body">Pune, Maharashtra, India</ExperienceLocation>
              <ExperienceDescription className="text-body">
                During my tenure at FDC Ltd., a prominent Indian pharmaceutical company,
                I played a crucial role in the efficient execution of sales and distribution
                processes utilizing the SAP SD (Sales and Distribution) module. My
                responsibilities encompassed the entire order-to-cash cycle, ensuring
                seamless operations and contributing to the overall effectiveness of the sales
                department.
              </ExperienceDescription>
            </ExperienceContent>
          </ExperienceCard>
        </ExperienceContainer>
      </div>

      {/* Background detail element */}
      <div className="absolute top-0 left-0 w-1/2 h-full pointer-events-none opacity-10">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-accent-500/20 blur-[100px]"></div>
      </div>
    </WorkSection>
  );
};

const WorkSection = styled.section`
  position: relative;
  overflow: hidden;
  padding-top: 4rem;
  padding-bottom: 6rem;
  
  @media (min-width: 768px) {
    padding-top: 6rem;
    padding-bottom: 8rem;
  }
  
  &[data-theme="light"] {
    background-color: var(--light-pale-lime, #F4F8D3);
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
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.3), transparent);
  }
  
  &[data-theme="light"]::before,
  &[data-theme="light"]::after {
    background: linear-gradient(90deg, transparent, rgba(142, 125, 190, 0.3), transparent);
  }
`;

const WorkHeading = styled.h2`
  font-size: 2rem;
  font-weight: 300;
  position: relative;
  z-index: 1;
  display: inline-block;
  letter-spacing: -0.02em;
  margin-bottom: 2.5rem;
  
  @media (min-width: 640px) {
    font-size: 2.5rem;
  }
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
  
  .dot {
    color: var(--accent-500, #f97316);
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, var(--accent-500, #f97316), transparent);
  }
  
  [data-theme="light"] & {
    .dot {
      color: var(--light-lavender, #8E7DBE);
    }
    
    &::after {
      background: linear-gradient(to right, var(--light-lavender, #8E7DBE), transparent);
    }
  }
`;

// New styled components for the bento box layout
const ProjectsLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const BentoRow = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BentoRowCentered = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
  
  & > div {
    width: calc(66.66% - 4px);
  }
  
  @media (max-width: 768px) {
    & > div {
      width: 100%;
    }
  }
`;

const BentoPanel = styled.div`
  height: 220px;
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
  
  @media (min-width: 768px) {
    height: 280px;
  }
`;

const BentoContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5em;
  transition: all 0.5s;
  
  @media (min-width: 640px) {
    padding: 1.75em;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.125rem;
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
  
  ${BentoPanel}:hover & {
    position: relative;
    transform: translateY(0);
    justify-content: flex-start;
    margin-bottom: 1rem;
    color: var(--accent-500, #f97316);
    font-weight: 500;
  }
  
  ${BentoPanel}[data-theme="light"] & {
    color: #2d3748;
  }
  
  ${BentoPanel}[data-theme="light"]:hover & {
    color: var(--light-lavender, #8E7DBE);
  }
`;

const ProjectDetails = styled.div`
  opacity: 0;
  height: 0;
  overflow: hidden;
  transition: all 0.4s ease;
  
  ${BentoPanel}:hover & {
    opacity: 1;
    height: auto;
    margin-top: 1rem;
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
  
  ${BentoPanel}[data-theme="light"] & {
    color: #4a5568;
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

// Experience section styles
const ExperienceContainer = styled.div`
  margin: 5rem auto 0;
  max-width: 850px;
`;

const ExperienceHeading = styled(WorkHeading)`
  margin-bottom: 2rem;
`;

const ExperienceCard = styled.div`
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  border-radius: 0.5rem;
  padding: 2rem;
  display: flex;
  gap: 1.5rem;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  border-left: 3px solid var(--accent-500, #f97316);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px -15px rgba(2, 6, 23, 0.7);
  }
  
  @media (max-width: 640px) {
    flex-direction: column;
    padding: 1.5rem;
  }
  
  &[data-theme="light"] {
    background: rgba(255, 255, 255, 0.7);
    border-left: 3px solid var(--light-lavender, #8E7DBE);
    
    &:hover {
      box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
    }
  }
`;

const ExperienceIconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(249, 115, 22, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-500, #f97316);
  flex-shrink: 0;
  
  &[data-theme="light"] {
    background: rgba(142, 125, 190, 0.2);
    color: var(--light-lavender, #8E7DBE);
  }
`;

const ExperienceContent = styled.div`
  flex: 1;
`;

const ExperienceHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const ExperienceTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  
  @media (max-width: 480px) {
    font-size: 1.125rem;
  }
`;

const ExperienceCompany = styled.span`
  font-weight: 500;
  color: var(--accent-500, #f97316);
  
  [data-theme="light"] & {
    color: var(--light-lavender, #8E7DBE);
  }
`;

const ExperienceDuration = styled.div`
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

const ExperienceLocation = styled.div`
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const ExperienceDescription = styled.p`
  line-height: 1.6;
  font-size: 0.9375rem;
  
  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

export default Work;