import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Layout, Zap, PackagePlus } from 'lucide-react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { skills, technologies } from '../config/siteConfig';

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, description, delay, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      cardRef.current,
      { 
        y: 50,
        opacity: 0,
      },
      { 
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
        delay: delay * 0.2
      }
    );
  }, [delay]);

  return (
    <StyledCard ref={cardRef} data-theme={theme} className={`card-${index % 3}`}>
      <CardNumber>0{index + 1}</CardNumber>
      <IconContainer data-theme={theme}>{icon}</IconContainer>
      <CardTitle className="text-heading">{title}</CardTitle>
      <CardDescription className="text-body">{description}</CardDescription>
    </StyledCard>
  );
};

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stickyTitleRef = useRef<HTMLDivElement>(null);
  const techGridRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Animate tech logos on scroll
  useEffect(() => {
    if (!techGridRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      techGridRef.current.querySelectorAll('.tech-logo'),
      { 
        scale: 0.8,
        opacity: 0 
      },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: techGridRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none none',
        }
      }
    );
  }, []);

  // Create parallax effect for the section
  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.to(sectionRef.current, {
      backgroundPosition: '50% 100%',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  const skillsConfig = [
    {
      icon: <Brain size={28} />,
      title: "AI/LLM Integration",
      description: "Specialized in integrating and orchestrating large language models using LangChain, Groq, OpenAI, and the TypeGPT API."
    },
    {
      icon: <Layout size={28} />,
      title: "Frontend Development",
      description: "Crafting fast, clean, and responsive UIs with Next.js, React, Tailwind CSS, and ShadCN."
    },
    {
      icon: <Zap size={28} />,
      title: "Realtime Web Apps",
      description: "Experienced in building real-time features using Supabase and WebSockets — including live chat apps."
    },
    {
      icon: <PackagePlus size={28} />,
      title: "Machine Learning & MLOps",
      description: "Foundational understanding of ML pipelines, model deployment, and serving LLMs via APIs."
    }
  ];

  return (
    <AboutSection
      id="about"
      ref={sectionRef}
      className="section bg-dark-900 noise-bg relative"
      data-theme={theme}
    >
      <StickyContainer>
        {/* Left side - Sticky content */}
        <StickyTitleColumn ref={stickyTitleRef}>
          <StickyTitleWrapper>
            <HeadingTitle className="text-heading">
              About Me<span className="dot">.</span>
            </HeadingTitle>
            <Paragraph className="text-body">
              I'm a passionate designer and developer with expertise in creating intuitive and engaging digital experiences. When I'm not coding or debugging something at 2AM, I'm probably analyzing AI trends, experimenting with design, or plotting my next side project.
            </Paragraph>
            <StickyCTA href="#work" data-theme={theme} className="text-accent">
              Check out my work
            </StickyCTA>
          </StickyTitleWrapper>
        </StickyTitleColumn>
        
        {/* Right side - Scrolling content */}
        <ContentColumn ref={contentRef}>
          <ContentSection>
            <SectionSubtitle className="text-heading">My Expertise</SectionSubtitle>
            <SkillsGrid>
              {skills.map((skill, index) => (
                <SkillCard 
                  key={index}
                  icon={skillsConfig[index].icon}
                  title={skill.title}
                  description={skill.description}
                  delay={index}
                  index={index}
                />
              ))}
            </SkillsGrid>
            <SectionDivider data-theme={theme} />
          </ContentSection>
          
          <ContentSection>
            <SectionSubtitle className="text-heading">Technologies I Work With</SectionSubtitle>
            <TechLogoContainer ref={techGridRef}>
              {technologies.map((tech, index) => (
                <TechLogoWrapper key={index} className="tech-logo">
                  <TechLogo 
                    src={tech.logo} 
                    alt={tech.name}
                    title={tech.name}
                    data-theme={theme}
                    loading="lazy"
                  />
                  <TechName data-theme={theme}>{tech.name}</TechName>
                </TechLogoWrapper>
              ))}
            </TechLogoContainer>
          </ContentSection>
        </ContentColumn>
      </StickyContainer>
    </AboutSection>
  );
};

const AboutSection = styled.section`
  position: relative;
  min-height: 100vh;
  padding: 4rem 0;
  
  @media (min-width: 768px) {
    padding: 6rem 0;
  }
  
  &[data-theme="light"] {
    background-color: var(--light-pale-lime, #F4F8D3);
  }
`;

const StickyContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: 35% 65%;
    gap: 2rem;
  }
`;

const StickyTitleColumn = styled.div`
  position: relative;
  
  @media (min-width: 1024px) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const StickyTitleWrapper = styled.div`
  @media (min-width: 1024px) {
    position: sticky;
    top: 120px;
    padding-bottom: 2rem;
  }
`;

const ContentColumn = styled.div`
  margin-top: 3rem;
  
  @media (min-width: 1024px) {
    margin-top: 0;
  }
`;

const HeadingTitle = styled.h2`
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  
  @media (min-width: 640px) {
    font-size: 2.5rem;
  }
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
  
  .dot {
    color: var(--accent-500, #f97316);
  }
  
  [data-theme="light"] & {
    color: #2d3748;
    
    .dot {
      color: var(--light-lavender, #8E7DBE);
    }
  }
`;

const Paragraph = styled.p`
  font-size: 1rem;
  color: var(--dark-300, #cbd5e1);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  hyphens: none;
  word-break: normal;
  
  @media (min-width: 640px) {
    font-size: 1.125rem;
  }
  
  [data-theme="light"] & {
    color: #4a5568;
  }
`;

const StickyCTA = styled.a`
  display: inline-block;
  background-color: var(--accent-500, #f97316);
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.3s ease;
  letter-spacing: 0.02em;
  font-size: 0.875rem;
  
  @media (min-width: 640px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  
  &:hover {
    background-color: var(--accent-600, #ea580c);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.25);
  }
  
  &[data-theme="light"] {
    background-color: var(--light-lavender, #8E7DBE);
    box-shadow: 0 2px 10px rgba(142, 125, 190, 0.2);
    color: white;
    
    &:hover {
      background-color: #7d6eb0;
      box-shadow: 0 6px 16px rgba(142, 125, 190, 0.3);
    }
  }
`;

const ContentSection = styled.div`
  margin-bottom: 4rem;
`;

const SectionSubtitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  color: var(--dark-200, #e2e8f0);
  letter-spacing: -0.01em;
  
  @media (min-width: 640px) {
    font-size: 1.5rem;
  }
  
  [data-theme="light"] & {
    color: #4a5568;
  }
`;

const SectionDivider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, rgba(249, 115, 22, 0.3), transparent);
  margin: 2rem 0;
  
  &[data-theme="light"] {
    background: linear-gradient(90deg, rgba(142, 125, 190, 0.3), transparent);
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 100%;
  margin: 0 auto;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledCard = styled.div`
  background-color: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(4px);
  padding: 1.75rem;
  border-radius: 0.5rem;
  border-left: 3px solid rgba(51, 65, 85, 0.5);
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  height: 100%;
  min-height: 200px;
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    border-left-color: var(--accent-500, #f97316);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.3);
  }
  
  &.card-0 {
    border-left-color: var(--accent-500, #f97316);
  }
  
  &.card-1 {
    border-left-color: var(--primary-500, #0ea5e9);
  }
  
  &.card-2 {
    border-left-color: var(--light-teal, #A6D6D6);
  }
  
  &.card-3 {
    border-left-color: var(--light-soft-pink, #F7CFD8);
  }
  
  &[data-theme="light"] {
    background-color: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(166, 214, 214, 0.5);
    border-left-width: 3px;
    
    &:hover {
      box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
    }
    
    &.card-0 {
      border-left-color: var(--light-lavender, #8E7DBE);
    }
    
    &.card-1 {
      border-left-color: var(--light-teal, #A6D6D6);
    }
    
    &.card-2 {
      border-left-color: var(--light-soft-pink, #F7CFD8);
    }
    
    &.card-3 {
      border-left-color: var(--light-lavender, #8E7DBE);
    }
  }
`;

const CardNumber = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.25rem;
  font-weight: 300;
  opacity: 0.2;
  color: var(--dark-200, #e2e8f0);
  
  [data-theme="light"] & {
    color: #4a5568;
  }
`;

const IconContainer = styled.div`
  color: var(--secondary-500, #14b8a6);
  margin-bottom: 0.75rem;
  
  &[data-theme="light"] {
    color: var(--light-teal, #A6D6D6);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  
  [data-theme="light"] & {
    color: #4a5568;
  }
`;

const CardDescription = styled.p`
  color: var(--dark-300, #cbd5e1);
  font-size: 0.875rem;
  line-height: 1.5;
  hyphens: none;
  word-break: normal;
  
  [data-theme="light"] & {
    color: #4a5568;
  }
`;

// Technology logos styling
const TechLogoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding: 1.5rem 0;
  
  @media (min-width: 640px) {
    gap: 2rem;
    padding: 2rem 0;
  }
`;

const TechLogoWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    
    img {
      filter: grayscale(0%);
      opacity: 1;
    }
    
    div {
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
    }
  }
`;

const TechLogo = styled.img`
  width: 40px;
  height: 40px;
  transition: all 0.3s ease;
  filter: grayscale(30%);
  opacity: 0.8;
  
  @media (min-width: 640px) {
    width: 50px;
    height: 50px;
  }
  
  @media (min-width: 768px) {
    width: 60px;
    height: 60px;
  }
  
  @media (max-width: 375px) {
    width: 35px;
    height: 35px;
    margin: 0.25rem;
  }
  
  &[data-theme="light"] {
    filter: grayscale(10%);
    opacity: 0.9;
  }
`;

const TechName = styled.div`
  position: absolute;
  top: 100%;
  margin-top: 0.5rem;
  background-color: var(--accent-500, #f97316);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  visibility: hidden;
  white-space: nowrap;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  pointer-events: none;
  font-weight: 500;
  z-index: 5;
  
  &[data-theme="light"] {
    background-color: var(--light-lavender, #8E7DBE);
  }
`;

export default About;