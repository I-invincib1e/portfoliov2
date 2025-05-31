import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { ChevronDown } from 'lucide-react';

// Particle type definition
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;
  maxLife: number;
  alpha: number;
}

interface MaskRevealProps {
  children: React.ReactNode;
}

const MaskReveal: React.FC<MaskRevealProps> = ({ children }) => {
  const nameContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const revealContainerRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const nameTextRef = useRef<HTMLDivElement>(null);
  const letterIRef = useRef<HTMLSpanElement>(null);
  const bracketLeftRef = useRef<HTMLSpanElement>(null);
  const bracketRightRef = useRef<HTMLSpanElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const finalParticlesRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const { theme, prefersReducedMotion } = useTheme();

  useEffect(() => {
    if (!letterIRef.current || !overlayRef.current || !revealContainerRef.current || !nameTextRef.current || !particleCanvasRef.current || !contentContainerRef.current || !finalParticlesRef.current || !bracketLeftRef.current || !bracketRightRef.current) return;

    // If user prefers reduced motion, skip the reveal animation
    if (prefersReducedMotion) {
      // Make content visible immediately
      gsap.set(contentContainerRef.current, {
        opacity: 1,
        visibility: 'visible'
      });
      
      // Hide the reveal container
      gsap.set(revealContainerRef.current, {
        autoAlpha: 0,
        pointerEvents: 'none'
      });
      
      // Allow scrolling
      document.body.style.overflow = 'auto';
      document.body.style.overflowY = 'visible';
      document.body.style.height = 'auto';
      
      setIsRevealed(true);
      return;
    }

    // Set content initially hidden
    gsap.set(contentContainerRef.current, {
      opacity: 0,
      visibility: 'hidden'
    });
    
    // Set overlay initial state
    gsap.set(overlayRef.current, {
      opacity: 1,
      backgroundColor: theme === 'dark' ? '#020617' : '#FAFAFA'
    });
    
    // Set initial text position - centered and immediately visible
    gsap.set(nameTextRef.current, {
      opacity: 1,
      scale: 1
    });
    
    // Set initial i character state
    gsap.set(letterIRef.current, {
      color: theme === 'dark' ? '#f97316' : '#9394A5',
      display: 'inline-block',
      position: 'relative',
      zIndex: 10
    });
    
    // Set initial bracket states
    gsap.set([bracketLeftRef.current, bracketRightRef.current], {
      color: theme === 'dark' ? '#f97316' : '#9394A5',
      display: 'inline-block',
      position: 'relative'
    });
    
    // Create animation timeline (not tied to main scroll)
    const tl = gsap.timeline({ paused: true });
    
    // Get the position and dimensions of the "i" character
    const letterRect = letterIRef.current.getBoundingClientRect();
    const iWidth = letterRect.width;
    const iHeight = letterRect.height;
    
    // Create circle element directly (skipping the rectangle phase)
    const circleElement = document.createElement('div');
    circleElement.className = 'circle-expand-element';
    circleElement.style.position = 'fixed';
    circleElement.style.background = theme === 'dark' 
      ? 'radial-gradient(circle, #f97316 0%, #ea580c 70%, #c2410c 100%)' 
      : 'radial-gradient(circle, #9394A5 0%, #7F8091 70%, #6B6C7D 100%)';
    circleElement.style.width = '0px';
    circleElement.style.height = '0px';
    circleElement.style.top = `${letterRect.top + iHeight/2}px`;
    circleElement.style.left = `${letterRect.left + iWidth/2}px`;
    circleElement.style.zIndex = '202';
    circleElement.style.borderRadius = '50%';
    circleElement.style.opacity = '0';
    circleElement.style.boxShadow = theme === 'dark' 
      ? '0 0 20px rgba(249, 115, 22, 0.5)' 
      : '0 0 20px rgba(147, 148, 165, 0.5)';
    circleElement.style.transform = 'translate(-50%, -50%)';
    
    revealContainerRef.current.appendChild(circleElement);
    
    // Setup particle canvas - OPTIMIZED FOR MOBILE
    const canvas = particleCanvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup final particles canvas that stays visible during transition
    const finalCanvas = finalParticlesRef.current;
    finalCanvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const finalCtx = finalCanvas.getContext('2d');
    if (!finalCtx) return;
    
    // Particle system - OPTIMIZED FOR MOBILE
    const particles: Particle[] = [];
    const finalParticles: Particle[] = [];
    const baseColor = theme === 'dark' ? '#f97316' : '#9394A5';
    const secondaryColor = theme === 'dark' ? '#ea580c' : '#7F8091';
    const accentColor = theme === 'dark' ? '#c2410c' : '#6B6C7D';
    
    // Determine if we're on a mobile device for particle count scaling
    const isMobile = window.innerWidth < 768;
    
    function createParticle(x: number, y: number, size: number) {
      // Reduce particle size on mobile
      const adjustedSize = isMobile ? size * 0.7 : size;
      
      const colorChoices = [baseColor, secondaryColor, accentColor];
      const particle: Particle = {
        x,
        y,
        size: adjustedSize * (Math.random() * 0.6 + 0.4),
        // Lower speed on mobile
        speedX: (Math.random() - 0.5) * (isMobile ? 6 : 10),
        speedY: (Math.random() - 0.5) * (isMobile ? 6 : 10),
        color: colorChoices[Math.floor(Math.random() * colorChoices.length)],
        alpha: Math.random() * 0.7 + 0.3,
        life: 0,
        // Shorter lifetime on mobile
        maxLife: isMobile ? (30 + Math.random() * 20) : (40 + Math.random() * 30)
      };
      particles.push(particle);
    }

    function createFinalParticle() {
      // Significantly reduce number of particles on mobile
      if (isMobile && finalParticles.length > 40) return;
      
      const colorChoices = [baseColor, secondaryColor, accentColor];
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      // Create particles at random positions across the screen
      const particle: Particle = {
        x: Math.random() * screenWidth,
        y: Math.random() * screenHeight,
        // Smaller particles on mobile
        size: Math.random() * (isMobile ? 1.5 : 2) + (isMobile ? 0.5 : 1),
        // Slower movement on mobile
        speedX: (Math.random() - 0.5) * (isMobile ? 0.8 : 1.5),
        speedY: (Math.random() - 0.5) * (isMobile ? 0.8 : 1.5),
        color: colorChoices[Math.floor(Math.random() * colorChoices.length)],
        alpha: Math.random() * 0.2 + 0.1,
        life: 0,
        // Shorter lifetime on mobile
        maxLife: isMobile ? (100 + Math.random() * 150) : (150 + Math.random() * 200)
      };
      finalParticles.push(particle);
    }
    
    function updateParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        // Faster deceleration
        p.speedX *= 0.94;
        p.speedY *= 0.94;
        p.life++;
        
        // Faster alpha fade
        p.alpha = Math.max(0, 1 - (p.life / p.maxLife) * 1.2);
        
        // Remove dead particles
        if (p.life >= p.maxLife || p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }
    }

    function updateFinalParticles() {
      for (let i = finalParticles.length - 1; i >= 0; i--) {
        const p = finalParticles[i];
        p.x += p.speedX * 0.3;
        p.y += p.speedY * 0.3;
        
        // Wrap around screen boundaries
        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;
        
        p.life++;
        
        // Pulsating effect
        const lifeCycle = (p.life % 100) / 100;
        p.alpha = p.alpha * 0.995 + Math.sin(lifeCycle * Math.PI) * 0.02;
        
        // Recreate particles that have lived too long
        if (p.life >= p.maxLife) {
          finalParticles.splice(i, 1);
          if (finalParticles.length < (isMobile ? 40 : 100)) {
            createFinalParticle();
          }
        }
      }
    }
    
    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawFinalParticles() {
      finalCtx.clearRect(0, 0, finalCanvas.width, finalCanvas.height);
      finalParticles.forEach(p => {
        finalCtx.globalAlpha = p.alpha;
        finalCtx.fillStyle = p.color;
        finalCtx.beginPath();
        finalCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        finalCtx.fill();
      });
    }
    
    let particleAnimation: number;
    let particleEmitter: number;
    let isEmittingParticles = false;
    let finalParticleAnimation: number;
    
    function startParticleSystem() {
      isEmittingParticles = true;
      
      // Emit particles less frequently on mobile
      const emitInterval = isMobile ? 60 : 40;
      
      // Emit particles more frequently
      particleEmitter = window.setInterval(() => {
        if (!isEmittingParticles) return;
        
        const rect = circleElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const radius = rect.width / 2;
        
        // Fewer particles on mobile
        const particleCount = isMobile 
          ? Math.min(12, Math.floor(radius / 8))
          : Math.min(25, Math.floor(radius / 6)); 
        
        for (let i = 0; i < particleCount; i++) {
          // Place particles around the circle perimeter
          const angle = Math.random() * Math.PI * 2;
          const distance = radius * 0.9 + (Math.random() * 10);
          
          const x = centerX + Math.cos(angle) * distance;
          const y = centerY + Math.sin(angle) * distance;
          
          createParticle(x, y, isMobile ? 1.5 + Math.random() * 2 : 2 + Math.random() * 3);
        }
      }, emitInterval);
      
      // Animate particles
      function animateParticles() {
        updateParticles();
        drawParticles();
        particleAnimation = requestAnimationFrame(animateParticles);
      }
      
      animateParticles();
    }
    
    function stopParticleSystem() {
      isEmittingParticles = false;
      clearInterval(particleEmitter);
      cancelAnimationFrame(particleAnimation);
      
      // Fade out particles more quickly
      const fadeOutInterval = setInterval(() => {
        particles.forEach(p => {
          p.alpha *= 0.85; // Faster fade out
        });
        
        drawParticles();
        
        if (particles.length === 0 || particles[0].alpha < 0.01) {
          clearInterval(fadeOutInterval);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }, 16);
    }

    function startFinalParticles() {
      // Create initial set of background particles - fewer on mobile
      const initialParticles = isMobile ? 40 : 80;
      for (let i = 0; i < initialParticles; i++) {
        createFinalParticle();
      }
      
      // Set initial opacity of container to 0
      gsap.set(finalParticlesRef.current, { opacity: 0 });
      
      // Animate final particles
      function animateFinalParticles() {
        updateFinalParticles();
        drawFinalParticles();
        finalParticleAnimation = requestAnimationFrame(animateFinalParticles);
      }
      
      animateFinalParticles();
      
      // Fade in the final particles FASTER
      gsap.to(finalParticlesRef.current, {
        opacity: 1,
        duration: 0.6, // Faster fade in
        delay: 0.1 // Minimal delay
      });
    }
    
    // Animation sequence - OPTIMIZED FOR MOBILE
    // Start with pulsing "i" character
    tl.to(letterIRef.current, {
      textShadow: theme === 'dark' 
        ? '0 0 20px rgba(249, 115, 22, 0.8)' 
        : '0 0 20px rgba(147, 148, 165, 0.8)',
      scale: 1.1,
      duration: 0.3, // Faster pulse
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut"
    })
    
    // Then directly show and expand the circle - FASTER
    .to(circleElement, {
      opacity: 1,
      width: '50px',
      height: '50px',
      duration: 0.3, // Faster expansion
      ease: 'power2.out',
      onStart: () => {
        startParticleSystem();
      }
    }, "+=0.05") // Minimal delay
    
    // Expand circle to cover the screen - FASTER
    .to(circleElement, {
      width: '250vh',
      height: '250vh',
      duration: isMobile ? 0.6 : 0.8, // Even faster on mobile
      ease: 'power2.inOut'
    })
    
    // Fade out the text earlier and faster
    .to(nameTextRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.4, // Faster fade
      ease: "power2.inOut"
    }, "-=0.7") // Start earlier
    
    // Start final particles BEFORE circle fade for smoother transition
    .call(() => {
      startFinalParticles();
    }, null, "-=0.4")
    
    // Fade out the circle - FASTER
    .to(circleElement, {
      opacity: 0,
      duration: 0.5, // Faster fade out
      ease: 'power2.inOut',
      onStart: () => {
        stopParticleSystem();
      }
    }, "-=0.2") // Overlap with previous animation
    
    // Fade out overlay and reveal content - NO DELAY
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.5, // Faster fade
      ease: 'power2.inOut',
      onComplete: () => {
        // After animation completes, allow scrolling and fade in content IMMEDIATELY
        document.body.style.overflow = 'auto';
        document.body.style.overflowY = 'visible';
        document.body.style.height = 'auto';
        
        // Reveal the content IMMEDIATELY
        gsap.to(contentContainerRef.current, {
          opacity: 1,
          visibility: 'visible',
          duration: 0.4, // Fast fade in of content
          ease: 'power2.out'
        });
        
        if (revealContainerRef.current) {
          // Fade out the reveal container faster
          gsap.to(revealContainerRef.current, {
            autoAlpha: 0,
            duration: 0.3,
            delay: 0.8, // Much shorter delay
            onComplete: () => {
              if (revealContainerRef.current) {
                revealContainerRef.current.style.pointerEvents = 'none';
                if (circleElement.parentNode) {
                  circleElement.parentNode.removeChild(circleElement);
                }
                
                // Stop final particles animation after a shorter time
                setTimeout(() => {
                  cancelAnimationFrame(finalParticleAnimation);
                  if (finalCtx) {
                    finalCtx.clearRect(0, 0, finalCanvas.width, finalCanvas.height);
                  }
                }, isMobile ? 2000 : 3000); // Shorter cleanup time on mobile
              }
              setIsRevealed(true);
            }
          });
        }
      }
    }, "-=0.3"); // Overlap with previous animation
    
    // Prevent scrolling initially
    document.body.style.overflow = 'hidden';
    
    // Use physics-based scrolling for natural feeling
    let scrollVelocity = 0;
    let scrollAmount = 0;
    // REDUCED for mobile: Less scroll needed to complete animation
    const totalScrollNeeded = isMobile ? 150 : 200;
    const scrollDamping = isMobile ? 0.85 : 0.90; // Even faster damping on mobile
    const scrollSensitivity = isMobile ? 2.5 : 2.0; // More responsive scrolling on mobile
    
    // Animation frame for smooth scrolling - cache value to limit expensive calculations
    let scrollAnimationFrame: number;
    let lastProgress = 0;
    const progressThreshold = 0.01; // Only update if progress changes by this amount
    
    const updateScrollAnimation = () => {
      // Apply damping for smooth deceleration
      scrollVelocity *= scrollDamping;
      
      // Update scroll position based on velocity
      scrollAmount += scrollVelocity;
      scrollAmount = Math.max(0, Math.min(scrollAmount, totalScrollNeeded));
      
      // Map scroll amount to timeline progress
      const progress = scrollAmount / totalScrollNeeded;
      
      // Only update timeline if progress changed significantly
      if (Math.abs(progress - lastProgress) > progressThreshold) {
        tl.progress(progress);
        lastProgress = progress;
        
        // Smooth scroll indicator fade
        if (scrollIndicatorRef.current) {
          const targetOpacity = progress > 0.1 ? Math.max(0, 1 - progress * 2) : 1; // Faster fade
          gsap.to(scrollIndicatorRef.current, {
            opacity: targetOpacity,
            duration: 0.2 // Faster transition
          });
        }
      }
      
      // If reached the end, complete the animation
      if (progress >= 1) {
        cancelAnimationFrame(scrollAnimationFrame);
        return;
      }
      
      scrollAnimationFrame = requestAnimationFrame(updateScrollAnimation);
    };
    
    // Start the scroll animation loop
    scrollAnimationFrame = requestAnimationFrame(updateScrollAnimation);
    
    // Throttle function to limit event frequency
    const throttle = (callback: Function, delay: number) => {
      let lastCall = 0;
      return function(...args: any[]) {
        const now = Date.now();
        if (now - lastCall >= delay) {
          lastCall = now;
          callback(...args);
        }
      };
    };
    
    const handleRevealScroll = throttle((e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Only process if animation not complete
      if (!isRevealed) {
        // Add to velocity based on scroll input - MORE RESPONSIVE
        scrollVelocity += e.deltaY * 0.035 * scrollSensitivity;
        
        // Higher max velocity for faster completion
        const maxVelocity = isMobile ? 25 : 20;
        scrollVelocity = Math.max(-maxVelocity, Math.min(scrollVelocity, maxVelocity));
      }
    }, isMobile ? 16 : 0); // Throttle on mobile, no throttle on desktop
    
    // Touch event handling for mobile with momentum - OPTIMIZED
    let touchStartY = 0;
    let touchVelocity = 0;
    let lastTouchY = 0;
    let lastTouchTime = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (!isRevealed) {
        e.preventDefault();
        e.stopPropagation();
        touchStartY = e.touches[0].clientY;
        lastTouchY = touchStartY;
        lastTouchTime = Date.now();
        touchVelocity = 0;
      }
    };
    
    const handleTouchMove = throttle((e: TouchEvent) => {
      if (!isRevealed) {
        e.preventDefault();
        e.stopPropagation();
        const touchY = e.touches[0].clientY;
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTouchTime;
        
        if (deltaTime > 0) {
          // Calculate velocity based on distance and time - MORE RESPONSIVE
          const deltaY = lastTouchY - touchY;
          touchVelocity = deltaY / deltaTime * 25; // Higher scale for better feel on mobile
        }
        
        // Add to scroll velocity
        scrollVelocity += touchVelocity;
        
        // Update last touch tracking
        lastTouchY = touchY;
        lastTouchTime = currentTime;
      }
    }, 16); // 60fps throttle for touch events
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (!isRevealed) {
        e.preventDefault();
        e.stopPropagation();
        // Apply stronger final velocity boost to simulate momentum
        scrollVelocity += touchVelocity * 3;
      }
    };
    
    const completelyReveal = () => {
      // Animate to completion FASTER
      gsap.to({}, {
        duration: isMobile ? 0.4 : 0.5, // Even faster on mobile
        onUpdate: function() {
          const targetProgress = this.progress();
          const currentProgress = tl.progress();
          const newProgress = currentProgress + (targetProgress - currentProgress) * (isMobile ? 0.35 : 0.25); // Much faster progress on mobile
          tl.progress(newProgress);
        },
        onComplete: () => {
          tl.progress(1);
        }
      });
    };
    
    // Add click handler to skip animation if desired
    const handleClick = () => {
      completelyReveal();
    };
    
    // Add wheel event listener to the reveal container
    const revealEl = revealContainerRef.current;
    revealEl.addEventListener('wheel', handleRevealScroll, { passive: false });
    revealEl.addEventListener('touchstart', handleTouchStart, { passive: false });
    revealEl.addEventListener('touchmove', handleTouchMove, { passive: false });
    revealEl.addEventListener('touchend', handleTouchEnd, { passive: false });
    revealEl.addEventListener('click', handleClick);
    
    // Show animation start state
    tl.progress(0);
    
    // Pulse animation for scroll indicator - FASTER
    gsap.to(scrollIndicatorRef.current, {
      y: '10px',
      repeat: -1,
      yoyo: true,
      duration: 0.8, // Faster pulse
      ease: 'power1.inOut'
    });
    
    // Add keyboard event to allow skipping with space/enter
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') && !isRevealed) {
        completelyReveal();
      }
    };
    
    window.addEventListener('keydown', handleKeydown);
    
    // Handle window resize - cached for performance
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      // Debounce resize to prevent excessive calculations
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Recalculate the circle position if needed
        if (!isRevealed && letterIRef.current) {
          const newRect = letterIRef.current.getBoundingClientRect();
          circleElement.style.top = `${newRect.top + newRect.height/2}px`;
          circleElement.style.left = `${newRect.left + newRect.width/2}px`;
        }
        
        // Resize canvas
        if (particleCanvasRef.current) {
          particleCanvasRef.current.width = window.innerWidth;
          particleCanvasRef.current.height = window.innerHeight;
        }
        
        // Resize final particles canvas
        if (finalParticlesRef.current) {
          finalParticlesRef.current.width = window.innerWidth;
          finalParticlesRef.current.height = window.innerHeight;
        }
      }, 200); // 200ms debounce
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      // Clean up all event listeners and animations
      tl.kill();
      cancelAnimationFrame(scrollAnimationFrame);
      cancelAnimationFrame(finalParticleAnimation);
      clearInterval(particleEmitter);
      clearTimeout(resizeTimeout);
      
      if (revealEl) {
        revealEl.removeEventListener('wheel', handleRevealScroll);
        revealEl.removeEventListener('touchstart', handleTouchStart);
        revealEl.removeEventListener('touchmove', handleTouchMove);
        revealEl.removeEventListener('touchend', handleTouchEnd);
        revealEl.removeEventListener('click', handleClick);
      }
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('resize', handleResize);
      
      // Ensure scrolling is restored
      document.body.style.overflow = 'auto';
      document.body.style.overflowY = 'visible';
      document.body.style.height = 'auto';
      
      // Stop particle system
      stopParticleSystem();
      
      // Remove expanding element if it exists
      if (circleElement.parentNode) {
        circleElement.parentNode.removeChild(circleElement);
      }
    };
  }, [theme, isRevealed, prefersReducedMotion]);

  return (
    <>
      <ContentContainer ref={contentContainerRef}>
        {children}
      </ContentContainer>
      
      {!isRevealed && (
        <RevealContainer ref={revealContainerRef}>
          <Overlay ref={overlayRef} data-theme={theme} />
          <ParticleCanvas ref={particleCanvasRef} />
          <FinalParticleCanvas ref={finalParticlesRef} />
          <NameContainer ref={nameContainerRef}>
            <NameText ref={nameTextRef} data-theme={theme}>
              <BracketSpan ref={bracketLeftRef} data-theme={theme}>&lt;</BracketSpan>
              Rush<HighlightedLetter ref={letterIRef} data-theme={theme}>i</HighlightedLetter>kesh
              <BracketSpan ref={bracketRightRef} data-theme={theme}>/&gt;</BracketSpan>
            </NameText>
          </NameContainer>
          <ScrollIndicatorWrapper>
            <ScrollIndicator ref={scrollIndicatorRef} data-theme={theme}>
              <ChevronDown size={24} />
            </ScrollIndicator>
          </ScrollIndicatorWrapper>
        </RevealContainer>
      )}
    </>
  );
};

const ContentContainer = styled.div`
  visibility: hidden;
  opacity: 0;
`;

const RevealContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 201;
  pointer-events: none;
`;

const ParticleCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 202;
  pointer-events: none;
`;

const FinalParticleCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99; // Lower z-index to be behind content but above background
  pointer-events: none;
  opacity: 0;
`;

const NameContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 203;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  pointer-events: none;
`;

const NameText = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  font-weight: 300;
  color: ${props => props['data-theme'] === 'dark' ? 'white' : '#484B6A'};
  transform-origin: center;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  
  @media (min-width: 640px) {
    font-size: 6rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 8rem;
  }
`;

const HighlightedLetter = styled.span`
  color: ${props => props['data-theme'] === 'dark' ? '#f97316' : '#9394A5'};
  font-weight: 400;
  position: relative;
  display: inline-block;
  text-shadow: 0 0 10px ${props => props['data-theme'] === 'dark' ? 'rgba(249, 115, 22, 0.5)' : 'rgba(147, 148, 165, 0.5)'};
`;

const BracketSpan = styled.span`
  color: ${props => props['data-theme'] === 'dark' ? '#f97316' : '#9394A5'};
  font-weight: 400;
  position: relative;
  display: inline-block;
  text-shadow: 0 0 8px ${props => props['data-theme'] === 'dark' ? 'rgba(249, 115, 22, 0.4)' : 'rgba(147, 148, 165, 0.4)'};
`;

const ScrollIndicatorWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 203;
  padding-bottom: 40px;
`;

const ScrollIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props['data-theme'] === 'dark' ? '#f8fafc' : '#484B6A'};
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export default MaskReveal;