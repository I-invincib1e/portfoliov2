import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import Footer from '../components/Footer';
import { Award, Calendar, ExternalLink, Badge, ArrowUpRight } from 'lucide-react';
import { certificates } from '../config/siteConfig';

const CertificationsPage: React.FC = () => {
  const { theme } = useTheme();
  const [activeCert, setActiveCert] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <CertsPageWrapper ref={pageRef} className="certs-page" data-theme={theme}>
      <CertsHero data-theme={theme}>
        <CertsHeroContent>
          <CertsHeroTitle className="text-heading">
            My Certifications<span className="dot">.</span>
          </CertsHeroTitle>
          <CertsHeroSubtitle className="text-body">
            Professional credentials showcasing my journey in AI, machine learning, and programming.
          </CertsHeroSubtitle>
        </CertsHeroContent>
      </CertsHero>

      <CertsContainer ref={containerRef}>
        <CertsLayout>
          {/* Left sidebar - certificate list */}
          <CertsList data-theme={theme}>
            <CertsListTitle className="text-heading">All Certificates</CertsListTitle>
            
            {certificates.map((cert, index) => (
              <CertItem 
                key={index} 
                className="cert-item"
                active={activeCert === index}
                onClick={() => setActiveCert(index)}
                data-theme={theme}
              >
                <CertItemIcon active={activeCert === index} data-theme={theme}>
                  <Badge size={16} />
                </CertItemIcon>
                <CertItemContent>
                  <CertItemTitle active={activeCert === index} className="text-heading">{cert.title}</CertItemTitle>
                  <CertItemOrg className="text-body">{cert.organization}</CertItemOrg>
                </CertItemContent>
                {activeCert === index && (
                  <CertItemActiveIndicator data-theme={theme} />
                )}
              </CertItem>
            ))}
          </CertsList>
          
          {/* Right content - certificate spotlight */}
          <CertSpotlight className="cert-spotlight" data-theme={theme}>
            <CertSpotlightContent className="cert-spotlight-content">
              <CertSpotlightHeader>
                <CertSpotlightTitle className="text-heading">
                  {certificates[activeCert].title}
                </CertSpotlightTitle>
                <CertSpotlightOrg data-theme={theme}>
                  {certificates[activeCert].organization}
                </CertSpotlightOrg>
              </CertSpotlightHeader>
              
              <CertSpotlightMain>
                <CertImageWrapper data-theme={theme}>
                  <CertImage 
                    src={certificates[activeCert].image}
                    alt={certificates[activeCert].title} 
                    loading="lazy" 
                  />
                  <CertImageOverlay data-theme={theme}>
                    <Award size={40} />
                  </CertImageOverlay>
                </CertImageWrapper>
                
                <CertDetails>
                  <CertDate data-theme={theme}>
                    <Calendar size={18} />
                    <span>Issued: {certificates[activeCert].date}</span>
                  </CertDate>
                  
                  <CertID data-theme={theme}>
                    <span>Credential ID:</span> {certificates[activeCert].credentialID}
                  </CertID>
                  
                  <CertDescription className="text-body">
                    {certificates[activeCert].description}
                  </CertDescription>
                  
                  <CertVerifyButton 
                    href={certificates[activeCert].credentialURL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    data-theme={theme}
                  >
                    <span>Verify Credential</span>
                    <ArrowUpRight size={18} />
                  </CertVerifyButton>
                </CertDetails>
              </CertSpotlightMain>
            </CertSpotlightContent>
          </CertSpotlight>
        </CertsLayout>
      </CertsContainer>

      <Footer />
    </CertsPageWrapper>
  );
};

const CertsPageWrapper = styled.main`
  min-height: 100vh;
  padding-top: 80px;
  position: relative;
  
  @media (max-width: 640px) {
    padding-top: 60px;
  }
  
  @media (max-width: 375px) {
    padding-top: 50px;
  }
`;

const CertsHero = styled.div`
  padding: 6rem 0 3rem;
  text-align: center;
  position: relative;
  background-color: rgba(15, 23, 42, 0.3);
  
  &[data-theme="light"] {
    background-color: rgba(228, 229, 241, 0.3);
  }
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.3), transparent);
  }
  
  &[data-theme="light"]::before {
    background: linear-gradient(90deg, transparent, rgba(147, 148, 165, 0.3), transparent);
  }
  
  @media (max-width: 640px) {
    padding: 4rem 0 2rem;
  }
`;

const CertsHeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const CertsHeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  
  @media (max-width: 640px) {
    font-size: 2.25rem;
  }
  
  .dot {
    color: var(--accent-500, #f97316);
  }
  
  [data-theme="light"] & .dot {
    color: var(--light-accent, #9394A5);
  }
`;

const CertsHeroSubtitle = styled.p`
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.8;
  
  @media (max-width: 640px) {
    font-size: 1.125rem;
  }
  
  [data-theme="light"] & {
    color: var(--light-text, #484B6A);
  }
`;

const CertsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1.5rem 6rem;
  
  @media (max-width: 640px) {
    padding: 3rem 1rem 5rem;
  }
`;

const CertsLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 250px 1fr;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CertsList = styled.div`
  background-color: rgba(15, 23, 42, 0.3);
  border-radius: 1rem;
  padding: 1.5rem;
  height: fit-content;
  
  &[data-theme="light"] {
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0 4px 20px rgba(147, 148, 165, 0.1);
  }
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const CertsListTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
  
  [data-theme="light"] & {
    color: var(--light-text, #484B6A);
    border-bottom: 1px solid rgba(210, 211, 219, 0.5);
  }
`;

interface CertItemProps {
  active: boolean;
}

const CertItem = styled.div<CertItemProps>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.active ? 'rgba(249, 115, 22, 0.15)' : 'transparent'};
  position: relative;
  
  &:hover {
    background-color: ${props => props.active ? 'rgba(249, 115, 22, 0.2)' : 'rgba(51, 65, 85, 0.2)'};
  }
  
  &[data-theme="light"] {
    background-color: ${props => props.active ? 'rgba(147, 148, 165, 0.15)' : 'transparent'};
    
    &:hover {
      background-color: ${props => props.active ? 'rgba(147, 148, 165, 0.2)' : 'rgba(147, 148, 165, 0.1)'};
    }
  }
`;

const CertItemIcon = styled.div<CertItemProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.active ? 'var(--accent-500, #f97316)' : 'rgba(51, 65, 85, 0.5)'};
  color: white;
  transition: all 0.3s ease;
  flex-shrink: 0;
  
  &[data-theme="light"] {
    background-color: ${props => props.active ? 'var(--light-lavender, #8E7DBE)' : 'rgba(147, 148, 165, 0.3)'};
  }
`;

const CertItemContent = styled.div`
  overflow: hidden;
`;

const CertItemTitle = styled.h4<CertItemProps>`
  font-size: 0.875rem;
  font-weight: ${props => props.active ? '600' : '500'};
  color: ${props => props.active ? 'var(--accent-500, #f97316)' : 'var(--dark-200, #e2e8f0)'};
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.3s ease;
  
  [data-theme="light"] & {
    color: ${props => props.active ? 'var(--light-lavender, #8E7DBE)' : 'var(--light-text, #484B6A)'};
  }
`;

const CertItemOrg = styled.div`
  font-size: 0.75rem;
  opacity: 0.7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  [data-theme="light"] & {
    color: var(--light-text, #484B6A);
  }
`;

const CertItemActiveIndicator = styled.div`
  width: 4px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: var(--accent-500, #f97316);
  border-radius: 0 4px 4px 0;
  
  &[data-theme="light"] {
    background-color: var(--light-lavender, #8E7DBE);
  }
`;

const CertSpotlight = styled.div`
  background-color: rgba(15, 23, 42, 0.3);
  border-radius: 1rem;
  padding: 2rem;
  
  &[data-theme="light"] {
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0 4px 20px rgba(147, 148, 165, 0.1);
  }
`;

const CertSpotlightContent = styled.div``;

const CertSpotlightHeader = styled.div`
  margin-bottom: 2rem;
`;

const CertSpotlightTitle = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  
  @media (max-width: 640px) {
    font-size: 1.75rem;
  }
  
  [data-theme="light"] & {
    color: var(--light-text, #484B6A);
  }
`;

const CertSpotlightOrg = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--accent-500, #f97316);
  
  &[data-theme="light"] {
    color: var(--light-lavender, #8E7DBE);
  }
  
  @media (max-width: 640px) {
    font-size: 1.125rem;
  }
`;

const CertSpotlightMain = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CertImageWrapper = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  aspect-ratio: 4/3;
  
  &[data-theme="light"] {
    box-shadow: 0 10px 30px rgba(147, 148, 165, 0.2);
  }
  
  @media (max-width: 768px) {
    max-height: 300px;
  }
`;

const CertImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
`;

const CertImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right bottom, rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.8));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  color: white;
  
  &:hover {
    opacity: 0.4;
  }
  
  &[data-theme="light"] {
    background: linear-gradient(to right bottom, rgba(147, 148, 165, 0.4), rgba(147, 148, 165, 0.7));
  }
`;

const CertDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const CertDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--dark-300, #cbd5e1);
  margin-bottom: 1rem;
  font-size: 0.938rem;
  
  &[data-theme="light"] {
    color: var(--light-text, #484B6A);
  }
`;

const CertID = styled.div`
  color: var(--dark-300, #cbd5e1);
  margin-bottom: 1.5rem;
  font-size: 0.938rem;
  
  span {
    opacity: 0.7;
  }
  
  &[data-theme="light"] {
    color: var(--light-text, #484B6A);
  }
`;

const CertDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  
  [data-theme="light"] & {
    color: var(--light-text, #484B6A);
  }
`;

const CertVerifyButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background-color: var(--accent-500, #f97316);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  align-self: flex-start;
  box-shadow: 0 4px 10px rgba(249, 115, 22, 0.25);
  font-size: 0.938rem;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background-color: var(--accent-600, #ea580c);
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(249, 115, 22, 0.3);
    
    svg {
      transform: translate(3px, -3px);
    }
  }
  
  &[data-theme="light"] {
    background-color: var(--light-lavender, #8E7DBE);
    box-shadow: 0 4px 10px rgba(147, 148, 165, 0.25);
    
    &:hover {
      background-color: #7F8091;
      box-shadow: 0 8px 15px rgba(147, 148, 165, 0.3);
    }
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

export default CertificationsPage;