import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
<<<<<<< HEAD
import SplitType from 'split-type';
import { Instagram, Linkedin, Github, Send } from 'lucide-react';
=======
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Linkedin, Github, Send, ChevronDown } from 'lucide-react';
>>>>>>> my-changes
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';

const Hero: React.FC = () => {
<<<<<<< HEAD
  const containerRef = useRef<HTMLDivElement>(null);
=======
  const sectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const textColumnRef = useRef<HTMLDivElement>(null);
>>>>>>> my-changes
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
<<<<<<< HEAD
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !subtitleRef.current) return;

    // Create text splitting for hero title
    const titleSplit = new SplitType(titleRef.current, { types: 'chars' });
    const subtitleSplit = new SplitType(subtitleRef.current, { types: 'words' });

    // Main timeline for hero animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Hero animation sequence
    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 }
    )
      .fromTo(
        titleSplit.chars,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.03, duration: 0.6 },
        '-=0.2'
      )
      .fromTo(
        subtitleSplit.words,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.02, duration: 0.4 },
        '-=0.2'
      )
      .fromTo(
        socialsRef.current?.querySelectorAll('.social-icon'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.6 },
        '-=0.2'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );

    // Clean up GSAP animations when component unmounts
    return () => {
      tl.kill();
    };
  }, []);
=======
  const bgBlobOneRef = useRef<HTMLDivElement>(null);
  const bgBlobTwoRef = useRef<HTMLDivElement>(null);
  const gridOverlayRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Create master timeline for scroll-based animations
    let master = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top", // start when top of section hits top of viewport
        end: "bottom top", // end when bottom of section hits top of viewport
        pin: true, // pins the section during the animation
        anticipatePin: 1, // prevents flash on pin
        pinReparent: true, // moves pinned element to documentElement while pinned
        pinSpacing: true, // creates space after element equal to its height
        refreshPriority: 1, // high priority for refresh
      }
    });
    
    // Animate main title from left
    master.fromTo(titleRef.current, 
      { 
        x: "-100%", 
        opacity: 0 
      }, 
      { 
        x: "0%", 
        opacity: 1, 
        duration: 0.4, 
        ease: "power2.out" 
      }, 0
    );
    
    // Animate subtitle after title
    master.fromTo(subtitleRef.current, 
      { 
        x: "-50%", 
        opacity: 0 
      }, 
      { 
        x: "0%", 
        opacity: 1, 
        duration: 0.4, 
        ease: "power2.out" 
      }, 0.2
    );
    
    // Animate social icons from right
    master.fromTo(socialsRef.current, 
      { 
        x: "100%", 
        opacity: 0 
      }, 
      { 
        x: "0%", 
        opacity: 1, 
        duration: 0.4, 
        ease: "power2.out" 
      }, 0.3
    );
    
    // Animate CTA buttons from right
    master.fromTo(ctaRef.current, 
      { 
        x: "100%", 
        opacity: 0 
      }, 
      { 
        x: "0%", 
        opacity: 1, 
        duration: 0.4, 
        ease: "power2.out" 
      }, 0.4
    );
    
    // Animate background elements in parallel
    master.fromTo([bgBlobOneRef.current, bgBlobTwoRef.current], 
      { 
        scale: 0.8, 
        opacity: 0 
      }, 
      { 
        scale: 1, 
        opacity: theme === 'dark' ? 0.4 : 0.2, 
        duration: 0.6, 
        stagger: 0.2,
        ease: "power1.out" 
      }, 0.1
    );
    
    // Animate grid overlay
    master.fromTo(gridOverlayRef.current, 
      { 
        opacity: 0 
      }, 
      { 
        opacity: 1, 
        duration: 0.6 
      }, 0.2
    );

    // Animate the arrow with a fade out as scroll progresses
    master.fromTo(arrowRef.current,
      {
        opacity: 1,
        y: 0
      },
      {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power1.in"
      }, 0.1
    );
    
    // Animate the dot with a pulse effect
    const dot = document.querySelector('.hero-dot');
    const dotAnimation = dot ? gsap.to(dot, {
      textShadow: theme === 'dark' 
        ? '0 0 12px rgba(249,115,22,0.6)' 
        : '0 0 12px rgba(147,148,165,0.6)',
      scale: 1.05,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5
    }) : null;
    
    // Setup background blob animations
    const blobOneAnimation = gsap.to(bgBlobOneRef.current, {
      x: "5%",
      y: "3%",
      scale: 1.05,
      rotation: 5,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    const blobTwoAnimation = gsap.to(bgBlobTwoRef.current, {
      x: "-5%",
      y: "-3%",
      scale: 0.95,
      rotation: -5,
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5
    });
    
    // Set initial states before animation starts
    gsap.set([titleRef.current, subtitleRef.current], { x: "-100%", opacity: 0 });
    gsap.set([socialsRef.current, ctaRef.current], { x: "100%", opacity: 0 });
    gsap.set([bgBlobOneRef.current, bgBlobTwoRef.current], { scale: 0.8, opacity: 0 });
    gsap.set(gridOverlayRef.current, { opacity: 0 });
    
    // Collect all animations that need to be killed on cleanup
    const animations = [
      master,
      dotAnimation,
      blobOneAnimation,
      blobTwoAnimation
    ];
    
    const allScrollTriggers = ScrollTrigger.getAll();
    
    // Clean up function to run when component unmounts or animation completes
    return () => {
      // Kill all animations
      animations.forEach(anim => anim && anim.kill());
      
      // Kill all ScrollTriggers
      allScrollTriggers.forEach(trigger => trigger.kill());
      
      // Kill any remaining GSAP tweens associated with the refs
      [
        titleRef.current, 
        subtitleRef.current, 
        socialsRef.current, 
        ctaRef.current,
        bgBlobOneRef.current, 
        bgBlobTwoRef.current, 
        gridOverlayRef.current,
        arrowRef.current
      ].forEach(element => {
        if (element) {
          gsap.killTweensOf(element);
        }
      });
      
      // Kill any dot animation
      if (dot) {
        gsap.killTweensOf(dot);
      }
      
      // Clear all contexts and memory
      gsap.globalTimeline.clear();
    };
  }, [theme]);
>>>>>>> my-changes

  return (
    <HeroSection
      id="home"
<<<<<<< HEAD
      ref={containerRef}
      data-theme={theme}
    >
      <HeroContent>
        <HeroContentGrid>
          {/* Left Column - Name and Description */}
          <HeroTextColumn>
            <HeroTitle ref={titleRef} className="text-heading">
              Hello.<br />I'm {siteConfig.name.split(' ')[0]}<span className="dot">.</span>
=======
      ref={sectionRef}
      data-theme={theme}
    >
      <HeroContent ref={heroContentRef}>
        <HeroContentGrid>
          {/* Left Column - Name and Description */}
          <HeroTextColumn ref={textColumnRef}>
            <HeroTitle ref={titleRef} className="text-heading">
              Hello.<br />I'm <NameWrapper>
                Rush<SpecialLetter>i</SpecialLetter>kesh
              </NameWrapper>
>>>>>>> my-changes
            </HeroTitle>
            <HeroSubtitle ref={subtitleRef} className="text-body">
              Aspiring Frontend Developer | React, TypeScript, Tailwind CSS | AI & LLM Enthusiast | Building Engaging AI-Driven Experiences | Data Science & Python Explorer
            </HeroSubtitle>
          </HeroTextColumn>

          {/* Right Column - Social and CTA */}
          <HeroActionsColumn>
            {/* Social Icons */}
            <SocialIconsContainer ref={socialsRef}>
              <SocialIconsList>
                <SocialIconItem>
                  <SocialIconLink href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <Instagram size={24} />
                  </SocialIconLink>
                </SocialIconItem>
                
                <SocialIconItem>
                  <SocialIconLink href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <Linkedin size={24} />
                  </SocialIconLink>
                </SocialIconItem>
                
                <SocialIconItem>
                  <SocialIconLink href={siteConfig.social.telegram} target="_blank" rel="noopener noreferrer" className="social-icon telegram">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <Send size={24} />
                  </SocialIconLink>
                </SocialIconItem>
                
                <SocialIconItem>
                  <SocialIconLink href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="social-icon github">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <Github size={24} />
                  </SocialIconLink>
                </SocialIconItem>
              </SocialIconsList>
            </SocialIconsContainer>
            
            {/* Hire Me Button */}
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
<<<<<<< HEAD
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="grid-overlay"></div>
      </HeroBackground>
=======
        <div className="blob blob-1" ref={bgBlobOneRef}></div>
        <div className="blob blob-2" ref={bgBlobTwoRef}></div>
        <div className="grid-overlay" ref={gridOverlayRef}></div>
      </HeroBackground>
      
      <ScrollIndicatorWrapper>
        <ScrollArrow ref={arrowRef} data-theme={theme}>
          <ChevronDown size={28} />
        </ScrollArrow>
      </ScrollIndicatorWrapper>
>>>>>>> my-changes
    </HeroSection>
  );
};

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  overflow: hidden;
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
<<<<<<< HEAD
  
  .dot {
    color: var(--accent-500, #f97316);
  }
  
  [data-theme="light"] & .dot {
    color: var(--light-lavender, #8E7DBE);
=======
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
  
  [data-theme="light"] & {
    color: var(--light-accent, #9394A5);
>>>>>>> my-changes
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--dark-300, #cbd5e1);
  white-space: normal;
  word-wrap: break-word;
  hyphens: none;
  
  @media (min-width: 640px) {
    font-size: 1.125rem;
  }
  
  @media (min-width: 768px) {
    font-size: 1.25rem;
    max-width: 32rem;
  }
  
  [data-theme="light"] & {
<<<<<<< HEAD
    color: #4a5568;
=======
    color: var(--light-text, #484B6A);
>>>>>>> my-changes
  }
`;

const SocialIconsContainer = styled.div`
  margin-top: 1rem;
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
  transition: 0.5s;
  
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
    transition: transform 0.5s;
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
    transition: transform 0.5s;
  }
  
  span:nth-child(3) {
    bottom: 0;
    left: 0;
    transform-origin: left;
  }
  
  &:hover span:nth-child(3) {
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.5s;
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
    transition: transform 0.5s;
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
    transition: transform 0.5s;
  }
  
  &:hover {
    color: white;
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
<<<<<<< HEAD
    background-color: var(--light-lavender, #8E7DBE);
    box-shadow: 0 4px 16px rgba(142, 125, 190, 0.2);
    color: white;
    
    &:hover {
      box-shadow: 0 8px 24px rgba(142, 125, 190, 0.3);
=======
    background-color: var(--light-accent, #9394A5);
    box-shadow: 0 4px 16px rgba(147, 148, 165, 0.2);
    color: white;
    
    &:hover {
      box-shadow: 0 8px 24px rgba(147, 148, 165, 0.3);
>>>>>>> my-changes
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
<<<<<<< HEAD
    color: var(--light-lavender, #8E7DBE);
    border: 1px solid var(--light-lavender, #8E7DBE);
    
    &:hover {
      background-color: rgba(142, 125, 190, 0.1);
      color: var(--light-lavender, #8E7DBE);
=======
    color: var(--light-accent, #9394A5);
    border: 1px solid var(--light-accent, #9394A5);
    
    &:hover {
      background-color: rgba(147, 148, 165, 0.1);
      color: var(--light-accent, #9394A5);
>>>>>>> my-changes
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
  }
  
  .blob-1 {
    top: 20%;
    right: 10%;
    width: 30vw;
    height: 30vw;
    background: linear-gradient(135deg, #f97316 0%, #155e75 100%);
    animation: float 15s ease-in-out infinite alternate;
  }
  
  .blob-2 {
    bottom: 10%;
    left: 15%;
    width: 25vw;
    height: 25vw;
    background: linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%);
    animation: float 20s ease-in-out infinite alternate-reverse;
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
  
  @keyframes float {
    0% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(5%, 5%) scale(1.05);
    }
    100% {
      transform: translate(-5%, -3%) scale(0.95);
    }
  }
`;

<<<<<<< HEAD
export default Hero;
=======
const ScrollIndicatorWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

const ScrollArrow = styled.div`
  color: ${props => props['data-theme'] === 'dark' ? 'rgba(248, 250, 252, 0.7)' : 'rgba(72, 75, 106, 0.7)'};
  
  &:hover {
    color: ${props => props['data-theme'] === 'dark' ? 'rgba(248, 250, 252, 1)' : 'rgba(72, 75, 106, 1)'};
  }
`;

export default Hero;
>>>>>>> my-changes
