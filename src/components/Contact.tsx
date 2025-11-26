import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github as GitHub, Linkedin, Twitter, Download, MapPin, Phone, Send, Sparkles, ArrowRight } from 'lucide-react';
import styled from 'styled-components';
import { siteConfig } from '../config/siteConfig';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Create floating background elements
    const createFloatingElements = () => {
      if (!floatingElementsRef.current) return;
      
      for (let i = 0; i < 6; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.cssText = `
          position: absolute;
          width: ${Math.random() * 100 + 50}px;
          height: ${Math.random() * 100 + 50}px;
          background: linear-gradient(45deg, rgba(249, 115, 22, 0.1), rgba(168, 85, 247, 0.1));
          border-radius: 50%;
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          z-index: -1;
        `;
        floatingElementsRef.current.appendChild(element);
        
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

    createFloatingElements();

    // Main heading animation with split text effect
    if (headingRef.current) {
      const text = headingRef.current.textContent;
      const splitText = text?.split('').map(char => 
        char === ' ' ? '<span>&nbsp;</span>' : `<span>${char}</span>`
      ).join('');
      if (splitText) {
        headingRef.current.innerHTML = splitText;
      }

      gsap.fromTo(
        headingRef.current.querySelectorAll('span'),
        { y: 100, opacity: 0, rotationX: -90 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Cards animation
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.querySelectorAll('.contact-card'),
        { 
          y: 60, 
          opacity: 0, 
          scale: 0.8,
          rotationY: -15 
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Form animation
    if (formRef.current) {
      gsap.fromTo(
        formRef.current.querySelectorAll('.form-group'),
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top bottom-=50',
            toggleActions: 'play none none none',
          },
          delay: 0.3,
        }
      );
    }

    // Parallax effect for the entire section
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const elements = floatingElementsRef.current?.querySelectorAll('.floating-element');
        elements?.forEach((element, index) => {
          gsap.to(element, {
            y: `${self.progress * (50 + index * 20)}px`,
            rotation: `${self.progress * (180 + index * 90)}deg`,
            duration: 0.3,
            ease: 'none'
          });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

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
    <ContactSection
      id="contact"
      ref={sectionRef}
      className="section"
    >
      <FloatingBackground ref={floatingElementsRef} />
      
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <HeaderSection>
            <ContactHeading ref={headingRef}>
              Let's Create Something Amazing Together
            </ContactHeading>
            <SubHeading>
              <Sparkles size={20} />
              Ready to bring your ideas to life? Let's connect and make it happen.
            </SubHeading>
          </HeaderSection>

          {/* Contact Cards */}
          <ContactCards ref={cardsRef}>
            <ContactCard className="contact-card">
              <CardIcon>
                <Mail size={24} />
              </CardIcon>
              <CardTitle>Email Me</CardTitle>
              <CardContent>{siteConfig.email}</CardContent>
              <CardAction 
                href={`mailto:${siteConfig.email}`}
                className="card-action"
              >
                Send Email <ArrowRight size={16} />
              </CardAction>
            </ContactCard>

            <ContactCard className="contact-card">
              <CardIcon>
                <MapPin size={24} />
              </CardIcon>
              <CardTitle>Location</CardTitle>
              <CardContent>{siteConfig.location}</CardContent>
              <CardAction 
                href="#"
                className="card-action"
              >
                View Map <ArrowRight size={16} />
              </CardAction>
            </ContactCard>

            <ContactCard className="contact-card">
              <CardIcon>
                <Phone size={24} />
              </CardIcon>
              <CardTitle>Let's Talk</CardTitle>
              <CardContent>Available for calls</CardContent>
              <CardAction 
                href="#"
                className="card-action"
              >
                Schedule Call <ArrowRight size={16} />
              </CardAction>
            </ContactCard>
          </ContactCards>

          {/* Main Content Grid */}
          <ContentGrid>
            {/* Contact Form */}
            <FormSection>
              <FormHeader>
                <FormTitle>Send a Message</FormTitle>
                <FormSubtitle>I'd love to hear from you. Send me a message and I'll respond as soon as possible.</FormSubtitle>
              </FormHeader>
              
              <ContactForm ref={formRef} onSubmit={handleSubmit}>
                <FormRow>
                  <FormGroup className="form-group">
                    <FormLabel 
                      htmlFor="name"
                      className={focusedInput === 'name' || formData.name ? 'focused' : ''}
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
                    />
                    <InputUnderline className={focusedInput === 'name' ? 'focused' : ''} />
                  </FormGroup>

                  <FormGroup className="form-group">
                    <FormLabel 
                      htmlFor="email"
                      className={focusedInput === 'email' || formData.email ? 'focused' : ''}
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
                    />
                    <InputUnderline className={focusedInput === 'email' ? 'focused' : ''} />
                  </FormGroup>
                </FormRow>

                <FormGroup className="form-group">
                  <FormLabel 
                    htmlFor="message"
                    className={focusedInput === 'message' || formData.message ? 'focused' : ''}
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
                  />
                  <InputUnderline className={focusedInput === 'message' ? 'focused' : ''} />
                </FormGroup>

                <FormActions>
                  <SubmitButton 
                    type="submit" 
                    disabled={isSubmitting}
                    className="submit-btn"
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
                  >
                    <Download size={18} />
                    Download Resume
                  </ResumeButton>
                </FormActions>
              </ContactForm>
            </FormSection>

            {/* Social Section */}
            <SocialSection>
              <SocialHeader>
                <SocialTitle>Connect With Me</SocialTitle>
                <SocialSubtitle>Let's stay connected across platforms</SocialSubtitle>
              </SocialHeader>

              <SocialGrid>
                <SocialCard 
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github"
                >
                  <SocialIcon>
                    <GitHub size={24} />
                  </SocialIcon>
                  <SocialInfo>
                    <SocialName>GitHub</SocialName>
                    <SocialHandle>@rushikesh</SocialHandle>
                  </SocialInfo>
                </SocialCard>

                <SocialCard 
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin"
                >
                  <SocialIcon>
                    <Linkedin size={24} />
                  </SocialIcon>
                  <SocialInfo>
                    <SocialName>LinkedIn</SocialName>
                    <SocialHandle>Professional Profile</SocialHandle>
                  </SocialInfo>
                </SocialCard>

                <SocialCard 
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="twitter"
                >
                  <SocialIcon>
                    <Twitter size={24} />
                  </SocialIcon>
                  <SocialInfo>
                    <SocialName>Twitter</SocialName>
                    <SocialHandle>@rushikesh</SocialHandle>
                  </SocialInfo>
                </SocialCard>
              </SocialGrid>

              <ResponseTime>
                <div className="status-indicator" />
                <span>Usually responds within 24 hours</span>
              </ResponseTime>
            </SocialSection>
          </ContentGrid>
        </div>
      </div>
    </ContactSection>
  );
};

const ContactSection = styled.section`
  position: relative;
  min-height: 100vh;
  padding: 6rem 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 40px 40px;
    background-position: -0.5px -0.5px;
    z-index: 0;
    pointer-events: none;
  }

  /* Add blob elements */
  &::after {
    content: '';
    position: absolute;
    top: 20%;
    right: 10%;
    width: 30vw;
    height: 30vw;
    background: linear-gradient(135deg, #f97316 0%, #155e75 100%);
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
    z-index: 0;
    pointer-events: none;
  }
`;

const FloatingBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
`;

const ContactHeading = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  perspective: 1000px;
`;

const SubHeading = styled.p`
  font-size: 1.25rem;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0;
  
  svg {
    color: #f97316;
  }
`;

const ContactCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
`;

const ContactCard = styled.div`
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(51, 65, 85, 0.3);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(249, 115, 22, 0.5);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #f97316, #a855f7);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #f97316, #a855f7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 0.5rem;
`;

const CardContent = styled.p`
  color: #94a3b8;
  margin-bottom: 1.5rem;
`;

const CardAction = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #f97316;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: #ea580c;
    transform: translateX(5px);
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  position: relative;
  z-index: 1;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1.5fr 1fr;
    gap: 4rem;
  }
`;

const FormSection = styled.div``;

const FormHeader = styled.div`
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 0.5rem;
`;

const FormSubtitle = styled.p`
  color: #94a3b8;
  line-height: 1.6;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormGroup = styled.div`
  position: relative;
`;

const FormLabel = styled.label`
  position: absolute;
  left: 0;
  top: 1rem;
  color: #94a3b8;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  pointer-events: none;
  
  &.focused {
    top: -0.5rem;
    font-size: 0.75rem;
    color: #f97316;
  }
`;

const FormInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(51, 65, 85, 0.5);
  padding: 1rem 0 0.5rem;
  color: #f8fafc;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  
  &:focus + label {
    top: -0.5rem;
    font-size: 0.75rem;
    color: #f97316;
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(51, 65, 85, 0.5);
  padding: 1rem 0 0.5rem;
  color: #f8fafc;
  font-size: 1rem;
  outline: none;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
`;

const InputUnderline = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #f97316, #a855f7);
  transition: width 0.3s ease;
  
  &.focused {
    width: 100%;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #f97316, #a855f7);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(249, 115, 22, 0.3);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
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
`;

const ResumeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: transparent;
  color: #f97316;
  border: 2px solid #f97316;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background: rgba(249, 115, 22, 0.1);
    transform: translateY(-2px);
  }
`;

const SocialSection = styled.div``;

const SocialHeader = styled.div`
  margin-bottom: 2rem;
`;

const SocialTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 0.5rem;
`;

const SocialSubtitle = styled.p`
  color: #94a3b8;
  line-height: 1.6;
`;

const SocialGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SocialCard = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(51, 65, 85, 0.3);
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(10px);
    border-color: rgba(249, 115, 22, 0.5);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const SocialIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #f97316, #a855f7);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const SocialInfo = styled.div`
  flex: 1;
`;

const SocialName = styled.div`
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 0.25rem;
`;

const SocialHandle = styled.div`
  color: #94a3b8;
  font-size: 0.875rem;
`;

const ResponseTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  font-size: 0.875rem;
  
  .status-indicator {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

export default Contact;