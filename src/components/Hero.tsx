import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Linkedin, Github, Send, ChevronDown } from 'lucide-react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const textColumnRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgBlobOneRef = useRef<HTMLDivElement>(null);
  const bgBlobTwoRef = useRef<HTMLDivElement>(null);
  const gridOverlayRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  // Store animations for cleanup
  const animationsRef = useRef<gsap.core.Tween[]>([]);

  const createAnimations = useCallback(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Set initial states first
    const initialElements = [
      { elements: [titleRef.current, subtitleRef.current], props: { x: "-100%", opacity: 0 }},
      { elements: [socialsRef.current, ctaRef.current], props: { x: "100%", opacity: 0 }},
      { elements: [bgBlobOneRef.current, bgBlobTwoRef.current], props: { scale: 0.8, opacity: 0 }},
      { elements: [gridOverlayRef.current], props: { opacity: 0 }},
    ];
    
    initialElements.forEach(({ elements, props }) => {
      elements.forEach(el => el && gsap.set(el, props));
    });
    
    // Create master timeline with improved performance settings
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        anticipatePin: 1,
        pinReparent: true,
        pinSpacing: true,
        refreshPriority: 1,
        fastScrollEnd: true, // Better performance on fast scrolling
        preventOverlaps: true, // Prevent animation conflicts
      }
    });
    
    // Orchestrated entrance animations with better easing
    const entranceTimeline = gsap.timeline();
    
    entranceTimeline
      .to(titleRef.current, {
        x: "0%",
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.2)",
      })
      .to(subtitleRef.current, {
        x: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.3")
      .to(socialsRef.current, {
        x: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.2")
      .to(ctaRef.current, {
        x: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.1");
    
    // Background elements with stagger
    const bgTimeline = gsap.timeline();
    bgTimeline.to([bgBlobOneRef.current, bgBlobTwoRef.current], {
      scale: 1,
      opacity: theme === 'dark' ? 0.4 : 0.2,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
    });
    
    // Grid and arrow animations
    const overlayTimeline = gsap.timeline();
    overlayTimeline
      .to(gridOverlayRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power1.out",
      })
      .to(arrowRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power2.in",
      }, 0.3);
    
    // Add all timelines to master
    master
      .add(entranceTimeline, 0)
      .add(bgTimeline, 0.1)
      .add(overlayTimeline, 0.2);
    
    // Improved dot animation with better performance
    const dot = document.querySelector('.hero-dot');
    const dotAnimation = dot ? gsap.to(dot, {
      textShadow: theme === 'dark' 
        ? '0 0 15px rgba(249,115,22,0.8)' 
        : '0 0 15px rgba(147,148,165,0.8)',
      scale: 1.08,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1,
    }) : null;
    
    // Optimized background blob animations
    const blobAnimations = [
      gsap.to(bgBlobOneRef.current, {
        motionPath: {
          path: "M0,0 Q20,10 40,0 T80,0",
          autoRotate: false,
        },
        scale: 1.08,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      }),
      gsap.to(bgBlobTwoRef.current, {
        motionPath: {
          path: "M0,0 Q-15,-8 -30,0 T-60,0",
          autoRotate: false,
        },
        scale: 0.92,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      })
    ];
    
    // Store all animations for cleanup
    animationsRef.current = [
      master,
      dotAnimation,
      ...blobAnimations,
    ].filter(Boolean) as gsap.core.Tween[];
    
    return animationsRef.current;
  }, [theme]);

  const cleanup = useCallback(() => {
    // Kill all stored animations
    animationsRef.current.forEach(anim => anim?.kill());
    animationsRef.current = [];
    
    // Kill all ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Kill tweens for all refs
    const allRefs = [
      titleRef, subtitleRef, socialsRef, ctaRef,
      bgBlobOneRef, bgBlobTwoRef, gridOverlayRef, arrowRef
    ];
    
    allRefs.forEach(ref => {
      if (ref.current) {
        gsap.killTweensOf(ref.current);
      }
    });
    
    // Kill dot animation
    const dot = document.querySelector('.hero-dot');
    if (dot) gsap.killTweensOf(dot);
    
    // Refresh ScrollTrigger for next section
    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    createAnimations();
    return cleanup;
  }, [createAnimations, cleanup]);

  return (
    <HeroSection
      id="home"
      ref={sectionRef}
      data-theme={theme}
    >
      <HeroContent ref={heroContentRef}>
        <HeroContentGrid>
          <HeroTextColumn ref={textColumnRef}>
            <HeroTitle ref={titleRef} className="text-heading">
              Hello.<br />I'm <NameWrapper>
                Rush<SpecialLetter className="hero-dot">i</SpecialLetter>kesh
              </NameWrapper>
            </HeroTitle>
            <HeroSubtitle ref={subtitleRef} className="text-body">
              Aspiring Frontend Developer | React, TypeScript, Tailwind CSS | AI & LLM Enthusiast | Building Engaging AI-Driven Experiences | Data Science & Python Explorer
            </HeroSubtitle>
          </HeroTextColumn>

          <HeroActionsColumn>
            <SocialIconsContainer ref={socialsRef}>
              <SocialIconsList>
                {[
                  { href: siteConfig.social.instagram, icon: Instagram, class: 'instagram' },
                  { href: siteConfig.social.linkedin, icon: Linkedin, class: 'linkedin' },
                  { href: siteConfig.social.telegram, icon: Send, class: 'telegram' },
                  { href: siteConfig.social.github, icon: Github, class: 'github' }
                ].map(({ href, icon: Icon, class: className }, index) => (
                  <SocialIconItem key={index}>
                    <SocialIconLink 
                      href={href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`social-icon ${className}`}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <Icon size={24} />
                    </SocialIconLink>
                  </SocialIconItem>
                ))}
              </SocialIconsList>
            </SocialIconsContainer>
            
            <HireMeContainer ref={ctaRef}>
              <HireMeButton as={Link} to="/contact" data-theme={theme} className="text-accent">
                Hire Me
              </HireMeButton>
              <ResumeButton 
                as="a"
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-theme={theme}
                className="text-accent"
              >
                Resume
              </ResumeButton>
            </HireMeContainer>
          </HeroActionsColumn>
        </HeroContentGrid>
      </HeroContent>
      
      <HeroBackground data-theme={theme}>
        <div className="blob blob-1" ref={bgBlobOneRef}></div>
        <div className="blob blob-2" ref={bgBlobTwoRef}></div>
        <div className="grid-overlay" ref={gridOverlayRef}></div>
      </HeroBackground>
      
      <ScrollIndicatorWrapper>
        <ScrollArrow ref={arrowRef} data-theme={theme}>
          <ChevronDown size={28} />
        </ScrollArrow>
      </ScrollIndicatorWrapper>
    </HeroSection>
  );
};

// Styled components remain the same but with some optimizations
const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  overflow: hidden;
  will-change: transform; /* Optimize for animations */
`;

const HeroContent = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
`;

const HeroContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`;

const HeroTextColumn = styled.div`
  @media (min-width: 768px) {
    text-align: left;
  }
  
  @media (max-width: 767px) {
    text-align: center;
  }
`;

const HeroActionsColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  
  @media (min-width: 768px) {
    align-items: flex-end;
  }
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  will-change: transform, opacity;
  
  @media (min-width: 375px) {
    font-size: 3rem;
  }
  
  @media (min-width: 640px) {
    font-size: 4rem;
  }
  
  @media (min-width: 768px) {
    font-size: 4.5rem;
    white-space: nowrap;
    word-break: keep-all;
  }
  
  @media (min-width: 1024px) {
    font-size: 6rem;
    white-space: nowrap;
    word-break: keep-all;
  }
`;

const NameWrapper = styled.span`
  display: inline-flex;
  align-items: center;
`;

const SpecialLetter = styled.span`
  color: var(--accent-500, #f97316);
  font-weight: 500;
  display: inline-block;
  position: relative;
  will-change: transform, text-shadow;
  
  [data-theme="light"] & {
    color: var(--light-accent, #9394A5);
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--dark-300, #cbd5e1);
  white-space: normal;
  word-wrap: break-word;
  hyphens: none;
  will-change: transform, opacity;
  
  @media (min-width: 640px) {
    font-size: 1.125rem;
  }
  
  @media (min-width: 768px) {
    font-size: 1.25rem;
    max-width: 32rem;
  }
  
  [data-theme="light"] & {
    color: var(--light-text, #484B6A);
  }
`;

const SocialIconsContainer = styled.div`
  margin-top: 1rem;
  will-change: transform, opacity;
`;

const SocialIconsList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  
  @media (max-width: 640px) {
    gap: 1rem;
  }
  
  @media (max-width: 375px) {
    gap: 0.75rem;
  }
`;

const SocialIconItem = styled.li`
  list-style: none;
`;

const SocialIconLink = styled.a`
  display: block;
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--dark-300, #cbd5e1);
  transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 375px) {
    width: 40px;
    height: 40px;
  }
  
  @media (min-width: 768px) {
    width: 60px;
    height: 60px;
  }
  
  span {
    position: absolute;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  span:nth-child(1),
  span:nth-child(3) {
    width: 100%;
    height: 2px;
    background: var(--dark-400, #94a3b8);
  }
  
  span:nth-child(1) {
    top: 0;
    left: 0;
    transform-origin: right;
  }
  
  &:hover span:nth-child(1) {
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  span:nth-child(3) {
    bottom: 0;
    left: 0;
    transform-origin: left;
  }
  
  &:hover span:nth-child(3) {
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  span:nth-child(2),
  span:nth-child(4) {
    width: 2px;
    height: 100%;
    background: var(--dark-400, #94a3b8);
  }
  
  span:nth-child(2) {
    top: 0;
    left: 0;
    transform: scale(0);
    transform-origin: bottom;
  }
  
  &:hover span:nth-child(2) {
    transform: scale(1);
    transform-origin: top;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  span:nth-child(4) {
    top: 0;
    right: 0;
    transform: scale(0);
    transform-origin: top;
  }
  
  &:hover span:nth-child(4) {
    transform: scale(1);
    transform-origin: bottom;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &:hover {
    color: white;
    transform: translateY(-2px);
  }
  
  &.instagram:hover {
    color: #E1306C;
  }
  
  &.instagram:hover span {
    background: #E1306C;
  }
  
  &.linkedin:hover {
    color: #0077B5;
  }
  
  &.linkedin:hover span {
    background: #0077B5;
  }
  
  &.telegram:hover {
    color: #0088cc;
  }
  
  &.telegram:hover span {
    background: #0088cc;
  }
  
  &.github:hover {
    color: #6e5494;
  }
  
  &.github:hover span {
    background: #6e5494;
  }
  
  [data-theme="light"] & {
    color: #4a5568;
    
    span {
      background: #94a3b8;
    }
  }
`;

const HireMeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  max-width: 317px;
  will-change: transform, opacity;
  
  @media (max-width: 767px) {
    max-width: 265px;
  }
  
  @media (max-width: 375px) {
    flex-direction: row;
    gap: 0.66rem;
    max-width: 238px;
  }
`;

const HireMeButton = styled(Link)`
  background-color: var(--accent-500, #f97316);
  color: white;
  font-size: 1.16rem;
  font-weight: 500;
  padding: 0.66rem 1.32rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 4px 20px rgba(249, 115, 22, 0.25);
  white-space: nowrap;
  letter-spacing: 0.03em;
  text-decoration: none;
  display: inline-block;
  flex: 1;
  text-align: center;
  will-change: transform, box-shadow;
  
  @media (min-width: 640px) {
    font-size: 1.24rem;
    padding: 0.83rem 1.32rem;
  }
  
  @media (max-width: 375px) {
    padding: 0.66rem 1rem;
    font-size: 1.07rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    transition: width 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 24px rgba(249, 115, 22, 0.35);
  }
  
  &:hover::before {
    width: 100%;
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  &[data-theme="light"] {
    background-color: var(--light-accent, #9394A5);
    box-shadow: 0 4px 16px rgba(147, 148, 165, 0.2);
    color: white;
    
    &:hover {
      box-shadow: 0 8px 24px rgba(147, 148, 165, 0.3);
    }
  }
`;

const ResumeButton = styled(HireMeButton)`
  background-color: transparent;
  color: var(--accent-500, #f97316);
  border: 1px solid var(--accent-500, #f97316);
  
  @media (max-width: 375px) {
    padding: 0.66rem 1rem;
    font-size: 1.07rem;
  }
  
  &:hover {
    background-color: rgba(249, 115, 22, 0.1);
    color: var(--accent-500, #f97316);
  }
  
  &[data-theme="light"] {
    background-color: transparent;
    color: var(--light-accent, #9394A5);
    border: 1px solid var(--light-accent, #9394A5);
    
    &:hover {
      background-color: rgba(147, 148, 165, 0.1);
      color: var(--light-accent, #9394A5);
    }
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
    z-index: -1;
    will-change: transform;
  }
  
  .blob-1 {
    top: 20%;
    right: 10%;
    width: 30vw;
    height: 30vw;
    background: linear-gradient(135deg, #f97316 0%, #155e75 100%);
  }
  
  .blob-2 {
    bottom: 10%;
    left: 15%;
    width: 25vw;
    height: 25vw;
    background: linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%);
  }
  
  .grid-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 40px 40px;
    background-position: -0.5px -0.5px;
    z-index: -1;
  }
  
  &[data-theme="light"] {
    .blob-1, .blob-2 {
      opacity: 0.2;
    }
    
    .grid-overlay {
      background-image: linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
    }
  }
`;

const ScrollIndicatorWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

const ScrollArrow = styled.div`
  color: ${props => props['data-theme'] === 'dark' ? 'rgba(248, 250, 252, 0.7)' : 'rgba(72, 75, 106, 0.7)'};
  will-change: transform, opacity;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props['data-theme'] === 'dark' ? 'rgba(248, 250, 252, 1)' : 'rgba(72, 75, 106, 1)'};
  }
`;

export default Hero;