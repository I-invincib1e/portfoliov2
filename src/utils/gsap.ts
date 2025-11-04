import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

/**
 * Registers GSAP plugins and sets up global configurations
 */
export const registerGSAP = (): void => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Set default ease for all animations - using more dynamic easing
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.7,
  });

  // Enable GPU acceleration for animations
  gsap.config({
    force3D: true,
    nullTargetWarn: false
  });

  // Make sure ScrollTrigger is properly refreshed when the page loads
  ScrollTrigger.refresh();

  // Set up ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none none',
    start: 'top bottom-=100',
    end: 'bottom top',
    markers: false
  });

  // Handle smooth scrolling for all anchor links
  setupSmoothScrolling();

  // Add scroll-based animations to common elements
  setupScrollAnimations();
  
  // Optimize ScrollTrigger for better performance
  optimizeScrollTrigger();
};

/**
 * Sets up smooth scrolling behavior for all anchor links
 */
const setupSmoothScrolling = (): void => {
  // Get all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      // Use GSAP for smooth scrolling
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: targetElement,
          offsetY: 80, // Offset for fixed header
        },
        ease: 'power3.inOut',
      });
    });
  });
};

/**
 * Sets up scroll-based animations for common elements
 */
const setupScrollAnimations = (): void => {
  // Detect if device is mobile
  const isMobile = window.innerWidth < 768;
  
  // Use simpler animations on mobile devices
  if (isMobile) {
    // Fade in animations for sections - simplified for mobile
    gsap.utils.toArray<HTMLElement>('.section').forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom-=50',
        onEnter: () => {
          gsap.to(section, {
            opacity: 1,
            duration: 0.6,
            ease: 'power1.out',
          });
        },
        once: true,
      });
    });
  } else {
    // Full animations for desktop
    gsap.utils.toArray<HTMLElement>('.section').forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom-=100',
        onEnter: () => {
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          });
        },
        once: true,
      });
    });
  }
};

/**
 * Optimizes ScrollTrigger for better performance
 */
const optimizeScrollTrigger = () => {
  // Batch scroll events for better performance
  ScrollTrigger.config({ 
    limitCallbacks: true,  // Limits callback frequency
    ignoreMobileResize: true // Prevents resize triggering on mobile when address bar shows/hides
  });
  
  // Throttle scroll updates on mobile
  if (window.innerWidth < 768) {
    ScrollTrigger.config({
      syncInterval: 60 // Increase sync interval on mobile (default is 33.3ms)
    });
  }
  
  // Listen for resize events and refresh ScrollTrigger
  let resizeTimer: number;
  window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });
};

/**
 * Creates a staggered reveal animation for a group of elements
 */
export const createStaggeredReveal = (
  elements: HTMLElement[] | NodeListOf<Element>,
  options = { y: 30, stagger: 0.12, duration: 0.7 }
): gsap.core.Timeline => {
  const isMobile = window.innerWidth < 768;
  
  if (isMobile) {
    return gsap.fromTo(
      elements,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        stagger: options.stagger,
        duration: options.duration * 0.8,
        ease: 'power2.out',
      }
    );
  }
  
  return gsap.fromTo(
    elements,
    { y: options.y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: options.stagger,
      duration: options.duration,
      ease: 'power3.out',
    }
  );
};

/**
 * Creates a fade-in with scale animation
 */
export const createFadeInScale = (
  element: HTMLElement | Element,
  options = { scale: 0.95, duration: 0.6, delay: 0 }
): gsap.core.Tween => {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: options.scale },
    {
      opacity: 1,
      scale: 1,
      duration: options.duration,
      delay: options.delay,
      ease: 'back.out(1.7)',
    }
  );
};

/**
 * Creates a slide-in animation from a direction
 */
export const createSlideIn = (
  element: HTMLElement | Element,
  direction: 'left' | 'right' | 'top' | 'bottom' = 'left',
  options = { distance: 60, duration: 0.7, delay: 0 }
): gsap.core.Tween => {
  const fromVars: Record<string, number> = { opacity: 0 };
  const toVars: Record<string, number | string> = { opacity: 1, duration: options.duration, delay: options.delay, ease: 'power3.out' };
  
  switch (direction) {
    case 'left':
      fromVars.x = -options.distance;
      toVars.x = 0;
      break;
    case 'right':
      fromVars.x = options.distance;
      toVars.x = 0;
      break;
    case 'top':
      fromVars.y = -options.distance;
      toVars.y = 0;
      break;
    case 'bottom':
      fromVars.y = options.distance;
      toVars.y = 0;
      break;
  }
  
  return gsap.fromTo(element, fromVars, toVars);
};

/**
 * Creates a magnetic effect for an element
 */
export const createMagneticEffect = (
  element: HTMLElement,
  strength: number = 0.3
): (() => void) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.4,
      ease: 'power2.out',
    });
  };
  
  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
  };
  
  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);
  
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

/**
 * Creates a parallax scrolling effect for an element
 */
export const createParallaxEffect = (
  element: HTMLElement,
  options = { yPercent: 30, scrub: 0.5 }
): ScrollTrigger => {
  // Use transform instead of position for better performance
  return ScrollTrigger.create({
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    scrub: options.scrub,
    animation: gsap.to(element, {
      y: `${options.yPercent}%`, // Use transform for GPU acceleration
      ease: 'none',
    }),
  });
};

/**
 * Properly kill all GSAP animations and ScrollTriggers to prevent memory leaks
 */
export const cleanupGSAP = (): void => {
  // Kill all ScrollTrigger instances
  ScrollTrigger.getAll().forEach(trigger => trigger.kill(false));
  
  // Kill all active GSAP animations
  gsap.globalTimeline.clear();
  
  // Clear any custom GSAP configs
  gsap.config({});
};