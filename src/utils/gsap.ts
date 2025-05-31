import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

/**
 * Registers GSAP plugins and sets up global configurations
 */
export const registerGSAP = (): void => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Set default ease for all animations
  gsap.defaults({
    ease: 'power2.out',
    duration: 0.8,
  });

  // Make sure ScrollTrigger is properly refreshed when the page loads
  ScrollTrigger.refresh();

  // Set up ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none none', // play, reverse, restart, reset, pause, resume, complete, none
    start: 'top bottom',
    end: 'bottom top',
  });

  // Handle smooth scrolling for all anchor links
  setupSmoothScrolling();

  // Add scroll-based animations to common elements
  setupScrollAnimations();
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
  // Fade in animations for sections
  gsap.utils.toArray('.section').forEach((section: any) => {
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
};

/**
 * Creates a staggered reveal animation for a group of elements
 */
export const createStaggeredReveal = (
  elements: HTMLElement[] | NodeListOf<Element>,
  options = { y: 20, stagger: 0.1, duration: 0.6 }
): gsap.core.Timeline => {
  return gsap.fromTo(
    elements,
    { y: options.y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: options.stagger,
      duration: options.duration,
      ease: 'power2.out',
    }
  );
};

/**
 * Creates a parallax scrolling effect for an element
 */
export const createParallaxEffect = (
  element: HTMLElement,
  options = { yPercent: 30, scrub: 0.5 }
): ScrollTrigger => {
  return ScrollTrigger.create({
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    scrub: options.scrub,
    animation: gsap.to(element, {
      yPercent: options.yPercent,
      ease: 'none',
    }),
  });
};