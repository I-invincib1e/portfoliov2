import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { Brain, Layout, Zap, PackagePlus } from 'lucide-react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { skills, technologies } from '../config/siteConfig';

interface SkillItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const SkillItem: React.FC<SkillItemProps> = ({ icon, title, description, index }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!itemRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Create a one-way animation that doesn't reverse when scrolling backward
    ScrollTrigger.create({
      trigger: itemRef.current,
      start: 'top bottom-=100',
      onEnter: () => {
        gsap.to(itemRef.current, { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power2.out' 
        });
      },
      once: true // This ensures the animation only runs once
    });
    
    // Set initial state
    gsap.set(itemRef.current, { 
      opacity: 0, 
      y: 30 
    });
    
  }, []);

  return (
    <StyledSkillItem ref={itemRef} data-theme={theme} className={`skill-item-${index}`}>
      <SkillIconContainer data-theme={theme}>
        {icon}
      </SkillIconContainer>
      <SkillContent>
        <SkillTitle className="text-heading">{title}</SkillTitle>
        <SkillDescription className="text-body">{description}</SkillDescription>
      </SkillContent>
    </StyledSkillItem>
  );
};

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stickyTitleRef = useRef<HTMLDivElement>(null);
  const techGridRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const { theme } = useTheme();

  // Animate tech logos on scroll
  useEffect(() => {
    if (!techGridRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const techLogos = techGridRef.current.querySelectorAll('.tech-logo');
    
    // Set initial state for all tech logos
    gsap.set(techLogos, { 
      scale: 0.8, 
      opacity: 0 
    });

    // Create a one-way animation that doesn't reverse when scrolling backward
    ScrollTrigger.create({
      trigger: techGridRef.current,
      start: 'top bottom-=50',
      onEnter: () => {
        gsap.to(techLogos, {
          scale: 1,
          opacity: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: 'power2.out'
        });
      },
      once: true // This ensures the animation only runs once
    });
  }, []);

  // Create parallax effect for the section
  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // One-way background parallax
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5, // Smoother scrub
      onUpdate: (self) => {
        // Only apply parallax when scrolling down
        if (self.direction === 1) {
          gsap.to(sectionRef.current, {
            backgroundPosition: `50% ${self.progress * 20}%`,
            ease: 'none',
            overwrite: 'auto',
            duration: 0.1
          });
        }
      }
    });
  }, []);

  // Text scribble reveal animation for paragraph
  useEffect(() => {
    if (!paragraphRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Split text into characters for animation
    const splitText = new SplitType(paragraphRef.current, { types: 'chars, words' });
    const chars = splitText.chars;
    
    if (!chars) return;
    
    // Set initial state - faded text
    gsap.set(chars, { 
      color: theme === 'dark' ? 'rgba(203, 213, 225, 0.3)' : 'rgba(72, 75, 106, 0.3)',
      opacity: 0.3,
      scale: 0.95,
      y: 15,
      rotationX: -10,
      transformOrigin: '0% 50%',
    });
    
    // Create the scribble reveal animation
    ScrollTrigger.create({
      trigger: paragraphRef.current,
      start: 'top bottom-=150',
      end: 'bottom center',
      onEnter: () => {
        gsap.to(chars, {
          color: theme === 'dark' ? 'rgba(203, 213, 225, 1)' : 'rgba(72, 75, 106, 0.85)', 
          opacity: 1,
          scale: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.01,
          duration: 0.8,
          ease: 'power2.out'
        });
      },
      once: true // Run only once to avoid "ghost animations"
    });
    
    // Clean up SplitType when component unmounts
    return () => {
      if (splitText && typeof splitText.revert === 'function') {
        splitText.revert();
      }
    };
  }, [theme]);

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
            <Paragraph ref={paragraphRef} className="text-body">
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
            <SkillsList>
              {skills.map((skill, index) => (
                <React.Fragment key={index}>
                  <SkillItem 
                    icon={skillsConfig[index].icon}
                    title={skill.title}
                    description={skill.description}
                    index={index}
                  />
                  {index < skills.length - 1 && <SkillDivider data-theme={theme} />}
                </React.Fragment>
              ))}
            </SkillsList>
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
    background-color: var(--light-background, #FAFAFA);
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
    color: var(--light-text, #484B6A);
    
    .dot {
      color: var(--light-accent, #9394A5);
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
    color: var(--light-text, #484B6A);
    opacity: 0.85;
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
    background-color: var(--light-accent, #9394A5);
    box-shadow: 0 2px 10px rgba(147, 148, 165, 0.2);
    color: white;
    
    &:hover {
      background-color: #7F8091;
      box-shadow: 0 6px 16px rgba(147, 148, 165, 0.3);
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
    color: var(--light-text, #484B6A);
  }
`;

const SectionDivider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, rgba(249, 115, 22, 0.3), transparent);
  margin: 2rem 0;
  
  &[data-theme="light"] {
    background: linear-gradient(90deg, rgba(147, 148, 165, 0.3), transparent);
  }
`;

// New vertical list for skills instead of grid
const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 100%;
  margin: 0 auto;
`;

const StyledSkillItem = styled.div`
  padding: 1.5rem 0;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const SkillDivider = styled.div`
  height: 1px;
  background-color: rgba(51, 65, 85, 0.2);
  width: 100%;
  
  &[data-theme="light"] {
    background-color: rgba(210, 211, 219, 0.5);
  }
`;

const SkillIconContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(30, 41, 59, 0.5);
  color: var(--accent-500, #f97316);
  flex-shrink: 0;
  
  &[data-theme="light"] {
    background-color: rgba(228, 229, 241, 0.7);
    color: var(--light-accent, #9394A5);
  }
`;

const SkillContent = styled.div`
  flex: 1;
`;

const SkillTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  
  [data-theme="light"] & {
    color: var(--light-text, #484B6A);
  }
`;

const SkillDescription = styled.p`
  color: var(--dark-300, #cbd5e1);
  font-size: 0.875rem;
  line-height: 1.5;
  hyphens: none;
  word-break: normal;
  
  @media (min-width: 640px) {
    font-size: 0.9375rem;
  }
  
  [data-theme="light"] & {
    color: var(--light-text, #484B6A);
    opacity: 0.85;
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
    background-color: var(--light-accent, #9394A5);
  }
`;

export default About;