import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import Footer from '../components/Footer';
import { Award, Calendar, ExternalLink, Badge, ArrowUpRight, CheckCircle, Star, Clock, Sparkles } from 'lucide-react';
import { certificates } from '../config/siteConfig';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CertificationsPage: React.FC = () => {
  const { theme } = useTheme();
  const [activeCert, setActiveCert] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);
  const backgroundElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Capture ref value for cleanup
    const bgElementsContainer = backgroundElementsRef.current;
    
    // Create floating background elements
    const createBackgroundElements = () => {
      if (!bgElementsContainer) return;
      
      // Create floating elements
      for (let i = 0; i < 5; i++) {
        const element = document.createElement('div');
        element.className = 'floating-bg-element';
        
        // Randomize size, position and appearance
        const size = 80 + Math.random() * 120;
        element.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${theme === 'dark' 
            ? 'radial-gradient(circle, rgba(249, 115, 22, 0.15), rgba(249, 115, 22, 0.03))'
            : 'radial-gradient(circle, rgba(142, 125, 190, 0.15), rgba(142, 125, 190, 0.03))'};
          border-radius: 50%;
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          z-index: -1;
          filter: blur(${Math.random() * 10 + 5}px);
        `;
        
        bgElementsContainer.appendChild(element);
        
        // Animate each element
        gsap.to(element, {
          x: `${Math.random() * 100 - 50}px`,
          y: `${Math.random() * 100 - 50}px`,
          duration: 15 + Math.random() * 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    };
    
    // Enhanced hero section animations
    const animateHero = () => {
      const tl = gsap.timeline();
      
      tl.fromTo(".hero-title", 
        { y: 60, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" }
      )
      .fromTo(".hero-subtitle", 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(".cert-stat",
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.7, ease: "back.out(1.4)" },
        "-=0.4"
      );
    };
    
    // Enhanced certificate items animation
    const animateCertItems = () => {
      gsap.fromTo(".cert-item",
        { x: -50, opacity: 0, scale: 0.95 },
        { 
          x: 0, 
          opacity: 1,
          scale: 1, 
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cert-list",
            start: "top bottom-=120",
            toggleActions: "play none none none"
          }
        }
      );
    };
    
    // Enhanced certificate spotlight animation
    const animateSpotlight = () => {
      const spotlightTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cert-spotlight",
          start: "top bottom-=120",
          toggleActions: "play none none none"
        }
      });
      
      spotlightTl
        .fromTo(".cert-spotlight-header", 
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(".cert-image-wrapper", 
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.9, ease: "back.out(1.4)" },
          "-=0.5"
        )
        .fromTo(".cert-badge", 
          { scale: 0.7, opacity: 0, rotation: -10 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.7, ease: "back.out(2)" },
          "-=0.4"
        )
        .fromTo(".cert-detail",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        );
    };
    
    // Initialize all animations
    createBackgroundElements();
    animateHero();
    animateCertItems();
    animateSpotlight();
    
    // Set up image floating animation
    gsap.to(".cert-image-float", {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Clean up background elements
      if (bgElementsContainer) {
        bgElementsContainer.innerHTML = '';
      }
    };
  }, [theme]);

  // Handle certificate item click
  const handleCertificateClick = (index: number) => {
    if (index === activeCert) return;
    
    // Animate transition between certificates
    gsap.to(".cert-spotlight-content", {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        setActiveCert(index);
        
        // Animate new certificate content
        gsap.fromTo(".cert-spotlight-content", 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }
    });
  };

  return (
    <PageContainer ref={pageRef} data-theme={theme}>
      <BackgroundElements ref={backgroundElementsRef} />
      
      <HeroSection data-theme={theme}>
        <HeroContent>
          <HeroTitle className="hero-title">
            Professional <GradientText data-theme={theme}>Certifications</GradientText>
            <TitleDot data-theme={theme}>.</TitleDot>
          </HeroTitle>
          <HeroSubtitle className="hero-subtitle">
            Showcasing my skills and qualifications through industry-recognized certifications
            from leading technology platforms and educational institutions.
          </HeroSubtitle>
          
          <StatsContainer>
            <StatCard className="cert-stat" data-theme={theme}>
              <StatIconWrap data-theme={theme}>
                <Award size={22} />
              </StatIconWrap>
              <StatValue data-theme={theme}>{certificates.length}</StatValue>
              <StatLabel data-theme={theme}>Certifications</StatLabel>
            </StatCard>
            
            <StatCard className="cert-stat" data-theme={theme}>
              <StatIconWrap data-theme={theme}>
                <Star size={22} />
              </StatIconWrap>
              <StatValue data-theme={theme}>4</StatValue>
              <StatLabel data-theme={theme}>Platforms</StatLabel>
            </StatCard>
            
            <StatCard className="cert-stat" data-theme={theme}>
              <StatIconWrap data-theme={theme}>
                <Clock size={22} />
              </StatIconWrap>
              <StatValue data-theme={theme}>120+</StatValue>
              <StatLabel data-theme={theme}>Hours</StatLabel>
            </StatCard>
          </StatsContainer>
        </HeroContent>
      </HeroSection>
      
      <ContentSection>
        <CertificationsLayout>
          {/* Certificate List */}
          <CertificatesList className="cert-list" data-theme={theme}>
            <ListHeader data-theme={theme}>
              <ListTitle>My Credentials</ListTitle>
              <ListBadge data-theme={theme}>{certificates.length} Total</ListBadge>
            </ListHeader>
            
            {certificates.map((cert, index) => (
              <CertificateItem 
                key={index}
                className="cert-item"
                active={index === activeCert}
                onClick={() => handleCertificateClick(index)}
                data-theme={theme}
              >
                <CertOrgLogo data-theme={theme}>
                  {cert.organization.charAt(0)}
                </CertOrgLogo>
                <CertInfo>
                  <CertName active={index === activeCert} data-theme={theme}>{cert.title}</CertName>
                  <CertOrg data-theme={theme}>{cert.organization}</CertOrg>
                </CertInfo>
                {index === activeCert && (
                  <ActiveIndicator data-theme={theme} />
                )}
              </CertificateItem>
            ))}
          </CertificatesList>
          
          {/* Certificate Details */}
          <CertificateDetails className="cert-spotlight" data-theme={theme}>
            <div className="cert-spotlight-content">
              <CertHeader className="cert-spotlight-header">
                <CertificateTitle data-theme={theme}>{certificates[activeCert].title}</CertificateTitle>
                <CertificateIssuer data-theme={theme}>{certificates[activeCert].organization}</CertificateIssuer>
                <CertificateMeta data-theme={theme}>
                  <MetaItem data-theme={theme}>
                    <Calendar size={16} />
                    <span>Issued: {certificates[activeCert].date}</span>
                  </MetaItem>
                  <MetaItem data-theme={theme}>
                    <Badge size={16} />
                    <span>ID: {certificates[activeCert].credentialID}</span>
                  </MetaItem>
                </CertificateMeta>
              </CertHeader>
              
              <CertContent>
                <CertImageContainer className="cert-detail">
                  <CertImageWrapper className="cert-image-wrapper cert-image-float" data-theme={theme}>
                    <CertImage src={certificates[activeCert].image} alt={certificates[activeCert].title} />
                    <CertImageOverlay data-theme={theme}>
                      <Sparkles size={48} />
                    </CertImageOverlay>
                  </CertImageWrapper>
                  
                  <VerifiedBadge className="cert-badge" data-theme={theme}>
                    <CheckCircle size={16} />
                    <span>Verified Credential</span>
                  </VerifiedBadge>
                </CertImageContainer>
                
                <CertDescription className="cert-detail" data-theme={theme}>
                  {certificates[activeCert].description}
                </CertDescription>
                
                <CertActions className="cert-detail">
                  <PrimaryButton 
                    href={certificates[activeCert].credentialURL} 
                    target="_blank"
                    rel="noopener noreferrer"
                    data-theme={theme}
                  >
                    <span>Verify Credential</span>
                    <ArrowUpRight size={18} />
                  </PrimaryButton>
                  
                  <SecondaryButton data-theme={theme}>
                    <ExternalLink size={18} />
                    <span>Share</span>
                  </SecondaryButton>
                </CertActions>
              </CertContent>
            </div>
          </CertificateDetails>
        </CertificationsLayout>
      </ContentSection>
      
      <Footer />
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px;
  position: relative;
  overflow-x: hidden;
  background: var(--dark-950, #020617);
  color: var(--dark-50, #f8fafc);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px);
    background-size: 60px 60px;
    background-position: -0.5px -0.5px;
    z-index: 0;
    pointer-events: none;
    opacity: 0.4;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 10%;
    left: 15%;
    width: 25vw;
    height: 25vw;
    background: linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%);
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.25;
    z-index: 0;
    pointer-events: none;
  }

  &[data-theme="light"] {
    background: #fcfcfc;
    color: #2d3748;

    &::before {
      background-image: linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
      opacity: 0.3;
    }

    &::after {
      opacity: 0.12;
    }
  }

  @media (max-width: 640px) {
    padding-top: 70px;
  }
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

const HeroSection = styled.section`
  padding: 6rem 0 4rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, 
      rgba(249, 115, 22, 0.2), transparent);
  }
  
  &[data-theme="light"]::before {
    background: linear-gradient(90deg, transparent, 
      rgba(142, 125, 190, 0.2), transparent);
  }
`;

const HeroContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 200;
  margin-bottom: 1.5rem;
  
  @media (max-width: 640px) {
    font-size: 2.5rem;
  }
`;

const GradientText = styled.span`
  background: ${props => props['data-theme'] === 'dark' 
    ? 'linear-gradient(135deg, #f97316, #ea580c)' 
    : 'linear-gradient(135deg, #8E7DBE, #7F8091)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-weight: 500;
`;

const TitleDot = styled.span`
  color: var(--accent-500, #f97316);
  
  &[data-theme="light"] {
    color: var(--light-lavender, #8E7DBE);
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  color: var(--dark-300, #cbd5e1);
  
  [data-theme="light"] & {
    color: #4a5568;
  }
  
  @media (max-width: 640px) {
    font-size: 1.125rem;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 700px;
  margin: 0 auto;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    max-width: 300px;
    gap: 1rem;
  }
`;

const StatCard = styled.div`
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(51, 65, 85, 0.3);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, 
      var(--accent-500, #f97316), 
      var(--accent-600, #ea580c));
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(249, 115, 22, 0.2);
    
    &::before {
      left: 0;
    }
  }
  
  &[data-theme="light"] {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(142, 125, 190, 0.2);
    
    &::before {
      background: linear-gradient(90deg, 
        var(--light-lavender, #8E7DBE), 
        #7F8091);
    }
    
    &:hover {
      border-color: rgba(142, 125, 190, 0.3);
      box-shadow: 0 10px 30px rgba(142, 125, 190, 0.1);
    }
  }
`;

const StatIconWrap = styled.div`
  width: 50px;
  height: 50px;
  background: var(--accent-500, #f97316);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  
  &[data-theme="light"] {
    background: var(--light-lavender, #8E7DBE);
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--dark-50, #f8fafc);
  
  &[data-theme="light"] {
    color: #2d3748;
  }
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: var(--dark-300, #cbd5e1);
  
  &[data-theme="light"] {
    color: #4a5568;
  }
`;

const ContentSection = styled.section`
  padding: 5rem 0;
  max-width: 1400px;
  margin: 0 auto;
`;

const CertificationsLayout = styled.div`
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 3rem;
  padding: 0 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 300px 1fr;
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  
  @media (max-width: 640px) {
    padding: 0 1rem;
  }
`;

const CertificatesList = styled.div`
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(51, 65, 85, 0.3);
  border-radius: 1.25rem;
  padding: 1.5rem;
  position: sticky;
  top: 100px;
  max-height: 70vh;
  overflow-y: auto;
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.1);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(51, 65, 85, 0.5);
    border-radius: 10px;
  }
  
  &[data-theme="light"] {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(142, 125, 190, 0.2);
    
    &::-webkit-scrollbar-track {
      background: rgba(142, 125, 190, 0.1);
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(142, 125, 190, 0.3);
    }
  }
  
  @media (max-width: 768px) {
    position: relative;
    top: 0;
    max-height: none;
    margin-bottom: 2rem;
  }
`;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
  
  &[data-theme="light"] {
    border-bottom-color: rgba(142, 125, 190, 0.2);
  }
`;

const ListTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--dark-50, #f8fafc);
  
  [data-theme="light"] & {
    color: #2d3748;
  }
`;

const ListBadge = styled.div`
  padding: 0.25rem 0.75rem;
  background: var(--accent-500, #f97316);
  color: white;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  
  &[data-theme="light"] {
    background: var(--light-lavender, #8E7DBE);
  }
`;

interface ActiveProps {
  active: boolean;
}

const CertificateItem = styled.div<ActiveProps>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.active 
    ? 'rgba(249, 115, 22, 0.15)' 
    : 'transparent'};
  position: relative;
  border: 1px solid ${props => props.active 
    ? 'rgba(249, 115, 22, 0.2)' 
    : 'transparent'};
  
  &:hover {
    background: ${props => props.active 
      ? 'rgba(249, 115, 22, 0.2)' 
      : 'rgba(51, 65, 85, 0.2)'};
    transform: translateX(5px);
  }
  
  &[data-theme="light"] {
    background: ${props => props.active 
      ? 'rgba(142, 125, 190, 0.15)' 
      : 'transparent'};
    border-color: ${props => props.active 
      ? 'rgba(142, 125, 190, 0.2)' 
      : 'transparent'};
    
    &:hover {
      background: ${props => props.active 
        ? 'rgba(142, 125, 190, 0.2)' 
        : 'rgba(142, 125, 190, 0.1)'};
    }
  }
`;

const CertOrgLogo = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: var(--accent-500, #f97316);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  flex-shrink: 0;
  
  &[data-theme="light"] {
    background: var(--light-lavender, #8E7DBE);
  }
`;

const CertInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const CertName = styled.div<ActiveProps>`
  font-weight: ${props => props.active ? '600' : '500'};
  color: ${props => props.active 
    ? 'var(--accent-500, #f97316)' 
    : 'var(--dark-50, #f8fafc)'};
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s ease;
  
  &[data-theme="light"] {
    color: ${props => props.active 
      ? 'var(--light-lavender, #8E7DBE)' 
      : '#2d3748'};
  }
`;

const CertOrg = styled.div`
  font-size: 0.875rem;
  color: var(--dark-300, #cbd5e1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &[data-theme="light"] {
    color: #4a5568;
  }
`;

const ActiveIndicator = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--accent-500, #f97316);
  border-radius: 0 0.75rem 0.75rem 0;
  
  &[data-theme="light"] {
    background: var(--light-lavender, #8E7DBE);
  }
`;

const CertificateDetails = styled.div`
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(51, 65, 85, 0.3);
  border-radius: 1.25rem;
  padding: 3rem;
  height: fit-content;
  
  &[data-theme="light"] {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(142, 125, 190, 0.2);
  }
  
  @media (max-width: 640px) {
    padding: 2rem 1.5rem;
  }
`;

const CertHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const CertificateTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 0.75rem;
  color: var(--dark-50, #f8fafc);
  
  &[data-theme="light"] {
    color: #2d3748;
  }
  
  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const CertificateIssuer = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--accent-500, #f97316);
  
  &[data-theme="light"] {
    color: var(--light-lavender, #8E7DBE);
  }
`;

const CertificateMeta = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--dark-300, #cbd5e1);
  
  svg {
    color: var(--accent-500, #f97316);
  }
  
  &[data-theme="light"] {
    color: #4a5568;
    
    svg {
      color: var(--light-lavender, #8E7DBE);
    }
  }
`;

const CertContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const CertImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CertImageWrapper = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  aspect-ratio: 16/9;
  transform-style: preserve-3d;
  perspective: 1000px;
  
  &[data-theme="light"] {
    box-shadow: 0 20px 40px rgba(142, 125, 190, 0.2);
  }
`;

const CertImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${CertImageWrapper}:hover & {
    transform: scale(1.05);
  }
`;

const CertImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.3), rgba(15, 23, 42, 0.7));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${CertImageWrapper}:hover & {
    opacity: 0.9;
  }
  
  &[data-theme="light"] {
    background: linear-gradient(135deg, rgba(142, 125, 190, 0.3), rgba(142, 125, 190, 0.7));
  }
`;

const VerifiedBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-weight: 600;
  font-size: 0.875rem;
  border: 1px solid rgba(34, 197, 94, 0.2);
  align-self: flex-start;
  
  &[data-theme="light"] {
    background: rgba(34, 197, 94, 0.1);
    border-color: rgba(34, 197, 94, 0.15);
  }
`;

const CertDescription = styled.p`
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--dark-300, #cbd5e1);
  
  &[data-theme="light"] {
    color: #4a5568;
  }
`;

const CertActions = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: var(--accent-500, #f97316);
  color: white;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  border: none;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.2), 
      transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(249, 115, 22, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translate(3px, -3px);
  }
  
  &[data-theme="light"] {
    background: var(--light-lavender, #8E7DBE);
    
    &:hover {
      box-shadow: 0 10px 25px rgba(142, 125, 190, 0.3);
    }
  }
  
  @media (max-width: 640px) {
    width: 100%;
  }
`;

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: transparent;
  color: var(--dark-50, #f8fafc);
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 1px solid rgba(51, 65, 85, 0.5);
  cursor: pointer;
  
  &:hover {
    background: rgba(51, 65, 85, 0.2);
    transform: translateY(-3px);
  }
  
  &[data-theme="light"] {
    color: #2d3748;
    border-color: rgba(142, 125, 190, 0.3);
    
    &:hover {
      background: rgba(142, 125, 190, 0.1);
    }
  }
  
  @media (max-width: 640px) {
    width: 100%;
  }
`;

export default CertificationsPage;