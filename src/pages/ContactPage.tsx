import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import Footer from '../components/Footer';
import { Mail, GitHub, Linkedin, Twitter, Download, MapPin, Phone, Send, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ContactPage: React.FC = () => {
  const { theme } = useTheme();
  const pageRef = useRef<HTMLDivElement>(null);
  const backgroundElementsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [focusedInput, setFocusedInput] = React.useState<string | null>(null);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Create floating background elements
    const createBackgroundElements = () => {
      if (!backgroundElementsRef.current) return;
      
      // Create floating elements
      for (let i = 0; i < 6; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.cssText = `
          position: absolute;
          width: ${Math.random() * 100 + 50}px;
          height: ${Math.random() * 100 + 50}px;
          background: linear-gradient(45deg, 
            ${theme === 'dark' 
              ? 'rgba(249, 115, 22, 0.1), rgba(168, 85, 247, 0.1)' 
              : 'rgba(142, 125, 190, 0.1), rgba(166, 214, 214, 0.1)'});
          border-radius: 50%;
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          z-index: -1;
          filter: blur(${Math.random() * 10 + 5}px);
        `;
        
        backgroundElementsRef.current.appendChild(element);
        
        // Animate floating elements
        gsap.to(element, {
          y: `${Math.random() * 100 - 50}px`,
          x: `${Math.random() * 100 - 50}px`,
          rotation: 360,
          duration: 10 + Math.random() * 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2
        });
      }
    };

    // Hero section animations
    const animateHero = () => {
      const tl = gsap.timeline();
      
      tl.fromTo(".hero-title", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.4)" }
      )
      .fromTo(".hero-subtitle", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.5"
      );
    };

    // Contact cards animation
    const animateCards = () => {
      gsap.fromTo(".contact-card",
        { opacity: 0, y: 30, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          stagger: 0.15, 
          duration: 0.7, 
          ease: "power2.out",
          delay: 0.3
        }
      );
    };

    // Form animation
    const animateForm = () => {
      if (!formRef.current) return;
      
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.7, 
          ease: "power2.out",
          delay: 0.6
        }
      );
      
      gsap.fromTo(".form-group",
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0,
          stagger: 0.1, 
          duration: 0.5, 
          ease: "power2.out",
          delay: 0.8
        }
      );
    };

    // Social links animation
    const animateSocial = () => {
      gsap.fromTo(".social-card",
        { opacity: 0, x: 30 },
        { 
          opacity: 1, 
          x: 0,
          stagger: 0.15, 
          duration: 0.7, 
          ease: "power2.out",
          delay: 0.9
        }
      );
    };
    
    // Initialize all animations
    createBackgroundElements();
    animateHero();
    animateCards();
    animateForm();
    animateSocial();
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Clean up background elements
      if (backgroundElementsRef.current) {
        backgroundElementsRef.current.innerHTML = '';
      }
    };
  }, [theme]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
    
    // Success animation
    gsap.to('.submit-btn', {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
  };

  return (
    <PageContainer ref={pageRef} data-theme={theme}>
      <BackgroundElements ref={backgroundElementsRef} />
      
      <HeroSection data-theme={theme}>
        <HeroContent>
          <HeroTitle className="hero-title">
            Let's <GradientText data-theme={theme}>Connect</GradientText>
            <TitleDot data-theme={theme}>.</TitleDot>
          </HeroTitle>
          <HeroSubtitle className="hero-subtitle">
            Ready to collaborate or have questions? I'd love to hear from you. 
            Reach out and let's create something amazing together.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>
      
      <ContentSection>
        <ContactCards>
          <ContactCard className="contact-card" data-theme={theme}>
            <CardIcon data-theme={theme}>
              <Mail size={24} />
            </CardIcon>
            <CardTitle data-theme={theme}>Email Me</CardTitle>
            <CardContent data-theme={theme}>{siteConfig.email}</CardContent>
            <CardAction 
              href={`mailto:${siteConfig.email}`}
              className="card-action"
              data-theme={theme}
            >
              Send Email <ArrowRight size={16} />
            </CardAction>
          </ContactCard>

          <ContactCard className="contact-card" data-theme={theme}>
            <CardIcon data-theme={theme}>
              <MapPin size={24} />
            </CardIcon>
            <CardTitle data-theme={theme}>Location</CardTitle>
            <CardContent data-theme={theme}>{siteConfig.location}</CardContent>
            <CardAction 
              href="#"
              className="card-action"
              data-theme={theme}
            >
              View Map <ArrowRight size={16} />
            </CardAction>
          </ContactCard>

          <ContactCard className="contact-card" data-theme={theme}>
            <CardIcon data-theme={theme}>
              <Phone size={24} />
            </CardIcon>
            <CardTitle data-theme={theme}>Call Me</CardTitle>
            <CardContent data-theme={theme}>Available for calls</CardContent>
            <CardAction 
              href="#"
              className="card-action"
              data-theme={theme}
            >
              Schedule Call <ArrowRight size={16} />
            </CardAction>
          </ContactCard>
        </ContactCards>
        
        <FormSocialGrid>
          {/* Contact Form */}
          <FormSection data-theme={theme}>
            <FormHeader>
              <FormTitle data-theme={theme}>
                <Sparkles size={20} style={{ display: 'inline', marginRight: '8px' }} />
                Send a Message
              </FormTitle>
              <FormSubtitle data-theme={theme}>
                I'll get back to you as soon as possible.
              </FormSubtitle>
            </FormHeader>
            
            <ContactForm ref={formRef} onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup className="form-group">
                  <FormLabel 
                    htmlFor="name"
                    className={focusedInput === 'name' || formData.name ? 'focused' : ''}
                    data-theme={theme}
                  >
                    Full Name
                  </FormLabel>
                  <FormInput
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedInput('name')}
                    onBlur={() => setFocusedInput(null)}
                    required
                    data-theme={theme}
                  />
                  <InputUnderline className={focusedInput === 'name' ? 'focused' : ''} data-theme={theme} />
                </FormGroup>

                <FormGroup className="form-group">
                  <FormLabel 
                    htmlFor="email"
                    className={focusedInput === 'email' || formData.email ? 'focused' : ''}
                    data-theme={theme}
                  >
                    Email Address
                  </FormLabel>
                  <FormInput
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    required
                    data-theme={theme}
                  />
                  <InputUnderline className={focusedInput === 'email' ? 'focused' : ''} data-theme={theme} />
                </FormGroup>
              </FormRow>

              <FormGroup className="form-group">
                <FormLabel 
                  htmlFor="message"
                  className={focusedInput === 'message' || formData.message ? 'focused' : ''}
                  data-theme={theme}
                >
                  Your Message
                </FormLabel>
                <FormTextArea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedInput('message')}
                  onBlur={() => setFocusedInput(null)}
                  required
                  data-theme={theme}
                />
                <InputUnderline className={focusedInput === 'message' ? 'focused' : ''} data-theme={theme} />
              </FormGroup>

              <FormActions>
                <SubmitButton 
                  type="submit" 
                  disabled={isSubmitting}
                  className="submit-btn"
                  data-theme={theme}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </SubmitButton>

                <ResumeButton
                  as="a"
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-theme={theme}
                >
                  <Download size={18} />
                  Download Resume
                </ResumeButton>
              </FormActions>
            </ContactForm>
          </FormSection>

          {/* Social Section */}
          <SocialSection data-theme={theme}>
            <SocialHeader>
              <SocialTitle data-theme={theme}>Connect With Me</SocialTitle>
              <SocialSubtitle data-theme={theme}>Find me across these platforms</SocialSubtitle>
            </SocialHeader>

            <SocialGrid>
              <SocialCard 
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
                data-theme={theme}
              >
                <SocialIcon data-theme={theme}>
                  <GitHub size={22} />
                </SocialIcon>
                <SocialInfo>
                  <SocialName data-theme={theme}>GitHub</SocialName>
                  <SocialHandle data-theme={theme}>@Neorex80</SocialHandle>
                </SocialInfo>
                <ExternalLink size={18} />
              </SocialCard>

              <SocialCard 
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
                data-theme={theme}
              >
                <SocialIcon data-theme={theme}>
                  <Linkedin size={22} />
                </SocialIcon>
                <SocialInfo>
                  <SocialName data-theme={theme}>LinkedIn</SocialName>
                  <SocialHandle data-theme={theme}>@devrex</SocialHandle>
                </SocialInfo>
                <ExternalLink size={18} />
              </SocialCard>

              <SocialCard 
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
                data-theme={theme}
              >
                <SocialIcon data-theme={theme}>
                  <Twitter size={22} />
                </SocialIcon>
                <SocialInfo>
                  <SocialName data-theme={theme}>Twitter</SocialName>
                  <SocialHandle data-theme={theme}>@rushikesh</SocialHandle>
                </SocialInfo>
                <ExternalLink size={18} />
              </SocialCard>
              
              <SocialCard 
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
                data-theme={theme}
              >
                <SocialIcon data-theme={theme}>
                  <Mail size={22} />
                </SocialIcon>
                <SocialInfo>
                  <SocialName data-theme={theme}>Instagram</SocialName>
                  <SocialHandle data-theme={theme}>@k_rishi.exe</SocialHandle>
                </SocialInfo>
                <ExternalLink size={18} />
              </SocialCard>
            </SocialGrid>

            <ResponseTime data-theme={theme}>
              <div className="status-indicator" />
              <span>Usually responds within 24 hours</span>
            </ResponseTime>
          </SocialSection>
        </FormSocialGrid>
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
  background: var(--dark-950, #020617);
  
  &[data-theme="light"] {
    background: #fcfcfc;
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
  color: var(--dark-50, #f8fafc);
  
  @media (max-width: 640px) {
    font-size: 2.5rem;
  }
  
  [data-theme="light"] & {
    color: #2d3748;
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
  margin: 0 auto;
  color: var(--dark-300, #cbd5e1);
  line-height: 1.6;
  
  @media (max-width: 640px) {
    font-size: 1.125rem;
  }
  
  [data-theme="light"] & {
    color: #4a5568;
  }
`;

const ContentSection = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 640px) {
    padding: 3rem 1rem 5rem;
  }
`;

const ContactCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

const ContactCard = styled.div`
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(51, 65, 85, 0.3);
  border-radius: 1.25rem;
  padding: 2rem;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    border-radius: 1.25rem 1.25rem 0 0;
    background: linear-gradient(90deg, 
      var(--accent-500, #f97316), 
      var(--accent-600, #ea580c));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-10px);
    border-color: rgba(249, 115, 22, 0.2);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    
    &::before {
      transform: scaleX(1);
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
      box-shadow: 0 20px 40px rgba(142, 125, 190, 0.15);
    }
  }
`;

const CardIcon = styled.div`
  width: 64px;
  height: 64px;
  background: var(--accent-500, #f97316);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  transition: all 0.3s ease;
  
  ${ContactCard}:hover & {
    transform: scale(1.1);
  }
  
  &[data-theme="light"] {
    background: var(--light-lavender, #8E7DBE);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--dark-50, #f8fafc);
  
  &[data-theme="light"] {
    color: #2d3748;
  }
`;

const CardContent = styled.p`
  color: var(--dark-300, #cbd5e1);
  margin-bottom: 1.5rem;
  
  &[data-theme="light"] {
    color: #4a5568;
  }
`;

const CardAction = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent-500, #f97316);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: var(--accent-600, #ea580c);
    
    svg {
      transform: translateX(5px);
    }
  }
  
  &[data-theme="light"] {
    color: var(--light-lavender, #8E7DBE);
    
    &:hover {
      color: #7F8091;
    }
  }
`;

const FormSocialGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 3rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const FormSection = styled.div`
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(51, 65, 85, 0.3);
  border-radius: 1.25rem;
  padding: 3rem;
  
  &[data-theme="light"] {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(142, 125, 190, 0.2);
  }
  
  @media (max-width: 640px) {
    padding: 2rem 1.5rem;
  }
`;

const FormHeader = styled.div`
  margin-bottom: 2.5rem;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--dark-50, #f8fafc);
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: var(--accent-500, #f97316);
  }
  
  &[data-theme="light"] {
    color: #2d3748;
    
    svg {
      color: var(--light-lavender, #8E7DBE);
    }
  }
  
  @media (max-width: 640px) {
    font-size: 1.75rem;
  }
`;

const FormSubtitle = styled.p`
  color: var(--dark-300, #cbd5e1);
  font-size: 1.125rem;
  
  &[data-theme="light"] {
    color: #4a5568;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const FormGroup = styled.div`
  position: relative;
`;

const FormLabel = styled.label`
  position: absolute;
  left: 0;
  top: 1rem;
  color: var(--dark-300, #cbd5e1);
  font-size: 0.9375rem;
  transition: all 0.3s ease;
  pointer-events: none;
  
  &.focused {
    top: -0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--accent-500, #f97316);
  }
  
  &[data-theme="light"] {
    color: #4a5568;
    
    &.focused {
      color: var(--light-lavender, #8E7DBE);
    }
  }
`;

const FormInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(51, 65, 85, 0.5);
  padding: 1rem 0 0.5rem;
  color: var(--dark-50, #f8fafc);
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  
  &:focus + label {
    top: -0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--accent-500, #f97316);
  }
  
  &[data-theme="light"] {
    color: #2d3748;
    border-bottom: 2px solid rgba(142, 125, 190, 0.3);
    
    &:focus + label {
      color: var(--light-lavender, #8E7DBE);
    }
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(51, 65, 85, 0.5);
  padding: 1rem 0 0.5rem;
  color: var(--dark-50, #f8fafc);
  font-size: 1rem;
  outline: none;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
  
  &[data-theme="light"] {
    color: #2d3748;
    border-bottom: 2px solid rgba(142, 125, 190, 0.3);
  }
`;

const InputUnderline = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: ${props => props['data-theme'] === 'dark' 
    ? 'linear-gradient(90deg, #f97316, #ea580c)' 
    : 'linear-gradient(90deg, #8E7DBE, #7F8091)'};
  transition: width 0.3s ease;
  
  &.focused {
    width: 100%;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: var(--accent-500, #f97316);
  color: white;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
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
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
    }
  }
  
  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid transparent;
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  &[data-theme="light"] {
    background: var(--light-lavender, #8E7DBE);
    
    &:hover {
      box-shadow: 0 10px 25px rgba(142, 125, 190, 0.3);
    }
  }
`;

const ResumeButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: transparent;
  color: var(--dark-50, #f8fafc);
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 1px solid rgba(51, 65, 85, 0.5);
  text-decoration: none;
  
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
`;

const SocialSection = styled.div`
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

const SocialHeader = styled.div`
  margin-bottom: 2.5rem;
`;

const SocialTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--dark-50, #f8fafc);
  
  &[data-theme="light"] {
    color: #2d3748;
  }
  
  @media (max-width: 640px) {
    font-size: 1.75rem;
  }
`;

const SocialSubtitle = styled.p`
  color: var(--dark-300, #cbd5e1);
  font-size: 1.125rem;
  
  &[data-theme="light"] {
    color: #4a5568;
  }
`;

const SocialGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
`;

const SocialCard = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(51, 65, 85, 0.3);
  border-radius: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--accent-500, #f97316);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateX(10px);
    border-color: rgba(249, 115, 22, 0.2);
    
    &::before {
      opacity: 1;
    }
    
    svg:last-child {
      transform: translate(3px, -3px);
    }
  }
  
  svg:last-child {
    margin-left: auto;
    color: var(--dark-400, #94a3b8);
    transition: transform 0.3s ease;
  }
  
  &[data-theme="light"] {
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(142, 125, 190, 0.2);
    
    &::before {
      background: var(--light-lavender, #8E7DBE);
    }
    
    svg:last-child {
      color: #a0aec0;
    }
    
    &:hover {
      border-color: rgba(142, 125, 190, 0.3);
    }
  }
`;

const SocialIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 0.75rem;
  background: var(--accent-500, #f97316);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  
  &[data-theme="light"] {
    background: var(--light-lavender, #8E7DBE);
  }
`;

const SocialInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const SocialName = styled.div`
  font-weight: 600;
  color: var(--dark-50, #f8fafc);
  margin-bottom: 0.25rem;
  
  &[data-theme="light"] {
    color: #2d3748;
  }
`;

const SocialHandle = styled.div`
  color: var(--dark-300, #cbd5e1);
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &[data-theme="light"] {
    color: #4a5568;
  }
`;

const ResponseTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 0.75rem;
  color: #10b981;
  
  .status-indicator {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
  
  &[data-theme="light"] {
    background: rgba(16, 185, 129, 0.05);
  }
`;

export default ContactPage;