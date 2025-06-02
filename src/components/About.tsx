import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Layout, Zap, PackagePlus } from 'lucide-react';
import styled from 'styled-components';
import { skills, technologies } from '../config/siteConfig';
import { useTheme } from '../context/ThemeContext';

interface SkillItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const SkillItem: React.FC<SkillItemProps> = ({ icon, title, description, index }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!itemRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Create a one-way animation that doesn't reverse when scrolling backward
    const trigger = ScrollTrigger.create({
      trigger: itemRef.current,
      start: 'top bottom-=100',
      onEnter: () => {
        gsap.to(itemRef.current, { 
          opacity: 1, 
          x: 0, 
          duration: 0.7, 
          ease: 'power3.out',
          clearProps: "transform" // Better performance after animation
        });
        setIsVisible(true);
      },
      once: true // This ensures the animation only runs once
    });
    
    // Set initial state
    gsap.set(itemRef.current, { 
      opacity: 0, 
      x: -30
    });
    
    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <StyledSkillItem 
      ref={itemRef} 
      className={`skill-item-${index}`} 
      $isVisible={isVisible}
      data-index={index}
    >
      <SkillIconContainer>
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
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stickyTitleRef = useRef<HTMLDivElement>(null);
  const techGridRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Normalize scroll position between 0 and 1
        if (rect.top <= 0 && rect.bottom >= 0) {
          const progress = Math.abs(rect.top) / (rect.height - window.innerHeight);
          setScrollPosition(Math.min(1, Math.max(0, progress)));
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate tech logos on scroll with improved performance
  useEffect(() => {
    if (!techGridRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const techLogos = techGridRef.current.querySelectorAll('.tech-logo');
    
    // Set initial state for all tech logos
    gsap.set(techLogos, { 
      scale: 0.8, 
      opacity: 0,
      y: 20
    });

    // Create a one-way animation that doesn't reverse when scrolling backward
    const trigger = ScrollTrigger.create({
      trigger: techGridRef.current,
      start: 'top bottom-=50',
      onEnter: () => {
        gsap.to(techLogos, {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.03,
          duration: 0.7,
          ease: "back.out(1.2)",
          overwrite: true,
          clearProps: "transform" // Better for performance after animation
        });
      },
      once: true // This ensures the animation only runs once
    });
    
    return () => {
      trigger.kill();
    };
  }, []);

  // Enhanced parallax effect for the section
  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !paragraphRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Heading animation on scroll
    gsap.fromTo(
      headingRef.current,
      { y: 0 },
      {
        y: () => window.innerWidth > 768 ? scrollPosition * -50 : 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.2,
        }
      }
    );

    // Smoother paragraph fade-in
    gsap.fromTo(
      paragraphRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top bottom-=120",
          toggleActions: "play none none none",
          once: true
        }
      }
    );

    // Create a cleaner parallax background effect
    const sectionBg = document.createElement('div');
    sectionBg.className = 'about-parallax-bg';
    sectionBg.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 120%;
      background: ${theme === 'dark' 
        ? 'linear-gradient(135deg, rgba(15, 23, 42, 0), rgba(15, 23, 42, 0.15))'
        : 'linear-gradient(135deg, rgba(244, 248, 211, 0), rgba(244, 248, 211, 0.2))'
      };
      z-index: -1;
      will-change: transform;
    `;
    
    if (sectionRef.current && !sectionRef.current.querySelector('.about-parallax-bg')) {
      sectionRef.current.appendChild(sectionBg);
    }

    // Parallax the background
    const parallaxTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.3,
      onUpdate: (self) => {
        if (sectionBg) {
          gsap.to(sectionBg, {
            y: `${self.progress * -20}%`,
            duration: 0.1,
            ease: "none",
            overwrite: "auto"
          });
        }
      }
    });
    
    return () => {
      parallaxTrigger.kill();
      
      if (sectionRef.current && sectionBg.parentNode === sectionRef.current) {
        sectionRef.current.removeChild(sectionBg);
      }
    };
  }, [scrollPosition, theme]);

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
            <HeadingTitle ref={headingRef} className="text-heading">
              About Me<span className="dot">.</span>
            </HeadingTitle>
            <Paragraph ref={paragraphRef} className="text-body">
              I'm a passionate designer and developer with expertise in creating intuitive and engaging digital experiences. When I'm not coding or debugging something at 2AM, I'm probably analyzing AI trends, experimenting with design, or plotting my next side project.
            </Paragraph>
            <StickyCTA href="#work" className="text-accent">
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
                  {index < skills.length - 1 && <SkillDivider />}
                </React.Fragment>
              ))}
            </SkillsList>
            <SectionDivider className="section-divider" data-theme={theme} />
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
  transition: background-color 0.3s ease;
  
  &[data-theme="light"] {
    background-color: #f4f8d3;
  }
  
  @media (min-width: 768px) {
    padding: 6rem 0;
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
  will-change: transform;
  
  @media (min-width: 640px) {
    font-size: 2.5rem;
  }
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
  
  .dot {
    color: var(--accent-500, #f97316);
  }
  
  [data-theme="light"] & .dot {
    color: var(--light-lavender, #8E7DBE);
  }
`;

const Paragraph = styled.p`
  font-size: 1rem;
  color: var(--dark-300, #cbd5e1);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  hyphens: none;
  word-break: normal;
  will-change: opacity, transform;
  
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
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  letter-spacing: 0.02em;
  font-size: 0.875rem;
  text-decoration: none;
  
  @media (min-width: 640px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  
  &:hover {
    background-color: var(--accent-600, #ea580c);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.25);
  }
  
  [data-theme="light"] & {
    background-color: var(--light-lavender, #8E7DBE);
    
    &:hover {
      background-color: #7d6eb0;
      box-shadow: 0 4px 12px rgba(142, 125, 190, 0.25);
    }
  }
`;

const ContentSection = styled.div`
  margin-bottom: 4rem;
  position: relative;
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
    color: #2d3748;
  }
`;

const SectionDivider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, rgba(249, 115, 22, 0.3), transparent);
  margin: 2rem 0;
  transition: background 0.3s ease;
  
  &[data-theme="light"] {
    background: linear-gradient(90deg, rgba(142, 125, 190, 0.3), transparent);
  }
`;

// New vertical list for skills instead of grid
const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;

interface StyledSkillItemProps {
  $isVisible: boolean;
}

const StyledSkillItem = styled.div<StyledSkillItemProps>`
  padding: 1.5rem 0;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  will-change: transform, opacity;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const SkillDivider = styled.div`
  height: 1px;
  background-color: rgba(51, 65, 85, 0.2);
  width: 100%;
  
  [data-theme="light"] & {
    background-color: rgba(142, 125, 190, 0.15);
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
  transition: all 0.3s ease;
  
  [data-theme="light"] & {
    background-color: rgba(142, 125, 190, 0.1);
    color: var(--light-lavender, #8E7DBE);
  }
  
  ${StyledSkillItem}:hover & {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(249, 115, 22, 0.2);
    
    [data-theme="light"] & {
      box-shadow: 0 0 15px rgba(142, 125, 190, 0.2);
    }
  }
`;

const SkillContent = styled.div`
  flex: 1;
  transition: transform 0.3s ease;
  
  ${StyledSkillItem}:hover & {
    transform: translateX(5px);
  }
`;

const SkillTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
  
  ${StyledSkillItem}:hover & {
    color: var(--accent-500, #f97316);
    
    [data-theme="light"] & {
      color: var(--light-lavender, #8E7DBE);
    }
  }
  
  [data-theme="light"] & {
    color: #2d3748;
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
    color: #4a5568;
  }
`;

// Technology logos styling - OPTIMIZED
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
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform;
  
  &:hover {
    transform: translateY(-12px) scale(1.05);
    
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
  transition: filter 0.3s ease, opacity 0.3s ease;
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
  
  [data-theme="light"] & {
    filter: grayscale(0%);
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
  transition: opacity 0.3s ease, transform 0.3s ease;
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