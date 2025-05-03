import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github as GitHub, Linkedin, Twitter, Download } from 'lucide-react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { siteConfig } from '../config/siteConfig';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !textRef.current || !formRef.current || !socialRef.current) return;

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

    // Animate the text
    gsap.fromTo(
      textRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
        delay: 0.2,
      }
    );

    // Animate the form
    gsap.fromTo(
      formRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none none',
        },
        delay: 0.3,
      }
    );

    // Animate social icons
    gsap.fromTo(
      socialRef.current.querySelectorAll('.social-icon'),
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: socialRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none none',
        },
        delay: 0.5,
      }
    );

    // Create parallax effect for the section
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

  return (
    <ContactSection
      id="contact"
      ref={sectionRef}
      className="section noise-bg relative"
      data-theme={theme}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <ContactHeading ref={headingRef} className="text-heading">
            Get In Touch<span className="dot">.</span>
          </ContactHeading>
          <ContactText ref={textRef} className="text-body">
            Interested in working together? Feel free to reach out through the form below or connect with me on social media.
          </ContactText>

          <ContactGrid>
            <ContactForm ref={formRef}>
              <FormGroup>
                <Label htmlFor="name" className="text-accent">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  required
                  data-theme={theme}
                  className="text-body"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email" className="text-accent">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required
                  data-theme={theme}
                  className="text-body"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="message" className="text-accent">Message</Label>
                <TextArea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  data-theme={theme}
                  className="text-body"
                ></TextArea>
              </FormGroup>
              <ButtonGroup>
                <SubmitButton
                  type="submit"
                  data-theme={theme}
                  className="text-accent"
                >
                  Send Message
                </SubmitButton>
                <ResumeButton
                  as="a"
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-theme={theme}
                  className="text-accent"
                >
                  <Download size={18} className="mr-2" />
                  Download Resume
                </ResumeButton>
              </ButtonGroup>
            </ContactForm>

            <ContactInfo ref={socialRef}>
              <InfoSection>
                <InfoHeading className="text-heading">Connect With Me</InfoHeading>
                <SocialIcons>
                  <SocialIconLink
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    data-theme={theme}
                  >
                    <GitHub size={20} />
                  </SocialIconLink>
                  <SocialIconLink
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    data-theme={theme}
                  >
                    <Linkedin size={20} />
                  </SocialIconLink>
                  <SocialIconLink
                    href={siteConfig.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    data-theme={theme}
                  >
                    <Twitter size={20} />
                  </SocialIconLink>
                </SocialIcons>
              </InfoSection>

              <InfoSection>
                <InfoHeading className="text-heading">Email</InfoHeading>
                <EmailLink
                  href={`mailto:${siteConfig.email}`}
                  data-theme={theme}
                  className="text-body"
                >
                  <Mail size={18} className="mr-2" />
                  <span>{siteConfig.email}</span>
                </EmailLink>
              </InfoSection>

              <InfoSection>
                <InfoHeading className="text-heading">Location</InfoHeading>
                <LocationText className="text-body">{siteConfig.location}</LocationText>
              </InfoSection>
            </ContactInfo>
          </ContactGrid>
        </div>
      </div>
    </ContactSection>
  );
};

const ContactSection = styled.section`
  position: relative;
  padding: 4rem 0;
  
  @media (min-width: 768px) {
    padding: 6rem 0;
  }
  
  &[data-theme="light"] {
    background-color: var(--light-pale-lime, #F4F8D3);
  }
`;

const ContactHeading = styled.h2`
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

const ContactText = styled.p`
  font-size: 1rem;
  color: var(--dark-300, #cbd5e1);
  line-height: 1.7;
  margin-bottom: 2rem;
  hyphens: none;
  word-break: normal;
  
  @media (min-width: 640px) {
    font-size: 1.125rem;
    margin-bottom: 3rem;
  }
  
  [data-theme="light"] & {
    color: #4a5568;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 3fr 2fr;
    gap: 3rem;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  
  @media (min-width: 640px) {
    gap: 1.5rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--dark-300, #cbd5e1);
  margin-bottom: 0.5rem;
  
  [data-theme="light"] & {
    color: #4a5568;
  }
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  background-color: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 0.375rem;
  transition: all 0.3s ease;
  color: var(--dark-50, #f8fafc);
  font-size: 0.875rem;
  
  @media (min-width: 640px) {
    font-size: 1rem;
  }
  
  &:focus {
    outline: none;
    border-color: var(--accent-500, #f97316);
    box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.2);
  }
  
  &[data-theme="light"] {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(166, 214, 214, 0.5);
    color: #2d3748;
    
    &:focus {
      border-color: var(--light-lavender, #8E7DBE);
      box-shadow: 0 0 0 2px rgba(142, 125, 190, 0.2);
    }
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  background-color: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 0.375rem;
  transition: all 0.3s ease;
  color: var(--dark-50, #f8fafc);
  resize: vertical;
  font-size: 0.875rem;
  
  @media (min-width: 640px) {
    font-size: 1rem;
  }
  
  &:focus {
    outline: none;
    border-color: var(--accent-500, #f97316);
    box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.2);
  }
  
  &[data-theme="light"] {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(166, 214, 214, 0.5);
    color: #2d3748;
    
    &:focus {
      border-color: var(--light-lavender, #8E7DBE);
      box-shadow: 0 0 0 2px rgba(142, 125, 190, 0.2);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.25rem;
  background-color: var(--accent-500, #f97316);
  color: white;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  white-space: nowrap;
  letter-spacing: 0.02em;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  
  @media (min-width: 640px) {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    width: 100%;
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

const ResumeButton = styled(SubmitButton)`
  background-color: transparent;
  color: var(--accent-500, #f97316);
  border: 1px solid var(--accent-500, #f97316);
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 480px) {
    width: 100%;
  }
  
  &:hover {
    background-color: rgba(249, 115, 22, 0.1);
    color: var(--accent-500, #f97316);
  }
  
  &[data-theme="light"] {
    background-color: transparent;
    color: var(--light-lavender, #8E7DBE);
    border: 1px solid var(--light-lavender, #8E7DBE);
    
    &:hover {
      background-color: rgba(142, 125, 190, 0.1);
      color: var(--light-lavender, #8E7DBE);
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoSection = styled.div``;

const InfoHeading = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
  
  @media (min-width: 640px) {
    font-size: 1.25rem;
  }
  
  [data-theme="light"] & {
    color: #2d3748;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 375px) {
    gap: 0.5rem;
  }
`;

const SocialIconLink = styled.a`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(30, 41, 59, 0.8);
  color: var(--dark-50, #f8fafc);
  transition: all 0.3s ease;
  
  @media (min-width: 640px) {
    width: 2.75rem;
    height: 2.75rem;
  }
  
  &:hover {
    background-color: var(--accent-500, #f97316);
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  &[data-theme="light"] {
    background-color: rgba(255, 255, 255, 0.8);
    color: #2d3748;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(166, 214, 214, 0.3);
    
    &:hover {
      background-color: var(--light-lavender, #8E7DBE);
      color: white;
      border-color: transparent;
    }
  }
`;

const EmailLink = styled.a`
  display: flex;
  align-items: center;
  color: var(--dark-300, #cbd5e1);
  transition: all 0.3s ease;
  font-size: 0.875rem;
  
  @media (min-width: 640px) {
    font-size: 1rem;
  }
  
  @media (max-width: 375px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  &:hover {
    color: var(--accent-500, #f97316);
    
    span {
      text-decoration: underline;
    }
  }
  
  &[data-theme="light"] {
    color: #4a5568;
    
    &:hover {
      color: var(--light-lavender, #8E7DBE);
    }
  }
`;

const LocationText = styled.p`
  color: var(--dark-300, #cbd5e1);
  font-size: 0.875rem;
  
  @media (min-width: 640px) {
    font-size: 1rem;
  }
  
  [data-theme="light"] & {
    color: #4a5568;
  }
`;

export default Contact;