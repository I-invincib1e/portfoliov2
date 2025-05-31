import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useTheme } from '../context/ThemeContext';

/**
 * Registers GSAP plugins and sets up global configurations
 */
export const registerGSAP = (): void => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Set default ease for all animations
  gsap.defaults({
    ease: 'power2.out',
    duration: prefersReducedMotion ? 0.4 : 0.8, // Shorter durations for reduced motion
  });

  // Make sure ScrollTrigger is properly refreshed when the page loads
  ScrollTrigger.refresh();

  // Set up ScrollTrigger defaults - optimize for performance
  ScrollTrigger.defaults({
    toggleActions: 'play none none none', // play, reverse, restart, reset, pause, resume, complete, none
    start: 'top bottom',
    end: 'bottom top',
    onRefresh: () => ScrollTrigger.refresh(true), // Use true to refresh all triggers
    onRefreshInit: () => ScrollTrigger.clearMatchMedia(), // Clear matchMedia cache on refresh
  });

  // Handle smooth scrolling for all anchor links
  setupSmoothScrolling(prefersReducedMotion);

  // Add scroll-based animations to common elements - only if not reduced motion
  if (!prefersReducedMotion) {
    setupScrollAnimations();
  }
};

/**
 * Sets up smooth scrolling behavior for all anchor links
 */
const setupSmoothScrolling = (prefersReducedMotion: boolean): void => {
  // Get all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  // Use a debounce function to prevent excessive scroll triggers
  const debounce = (func: Function, wait = 20, immediate = true) => {
    let timeout: number | null = null;
    return function(...args: any[]) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      if (timeout) window.clearTimeout(timeout);
      timeout = window.setTimeout(later, wait);
      if (callNow) func(...args);
    };
  };

  // Handle click with debounce
  const handleClick = debounce((e: Event, link: HTMLAnchorElement) => {
    e.preventDefault();
    
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    // Use GSAP for smooth scrolling - faster for reduced motion
    gsap.to(window, {
      duration: prefersReducedMotion ? 0.5 : 1,
      scrollTo: {
        y: targetElement,
        offsetY: 80, // Offset for fixed header
        autoKill: true, // Improves performance
      },
      ease: 'power3.inOut',
    });
  }, 100);

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => handleClick(e, link as HTMLAnchorElement));
  });
};

/**
 * Sets up scroll-based animations for common elements
 */
const setupScrollAnimations = (): void => {
  // Cache DOM elements for better performance
  const sections = gsap.utils.toArray('.section');
  
  // Use a batch approach for similar elements to reduce the number of ScrollTriggers
  ScrollTrigger.batch(sections, {
    interval: 0.1, // time window in seconds for batching to occur
    batchMax: 3,   // maximum batch size
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out',
    }),
    start: 'top bottom-=100',
    once: true
  });
  
  // Initial state
  gsap.set(sections, { opacity: 0, y: 20 });
};

/**
 * Creates a staggered reveal animation for a group of elements - optimized
 */
export const createStaggeredReveal = (
  elements: HTMLElement[] | NodeListOf<Element>,
  options = { y: 20, stagger: 0.1, duration: 0.6 }
): gsap.core.Timeline => {
  // Use a single tween with stagger for better performance
  return gsap.fromTo(
    elements,
    { 
      y: options.y, 
      opacity: 0,
      willChange: 'transform, opacity' // Performance hint for browser
    },
    {
      y: 0,
      opacity: 1,
      stagger: options.stagger,
      duration: options.duration,
      ease: 'power2.out',
      clearProps: 'willChange', // Clear after animation completes
      onComplete: () => {
        // Clear transform after animation completes for better text rendering
        gsap.set(elements, { clearProps: 'transform' });
      }
    }
  );
};

/**
 * Creates a parallax scrolling effect for an element - OPTIMIZED with transform
 */
export const createParallaxEffect = (
  element: HTMLElement,
  options = { yPercent: 30, scrub: 0.5 }
): ScrollTrigger => {
  // Set willChange for better performance
  gsap.set(element, { willChange: 'transform' });
  
  return ScrollTrigger.create({
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    scrub: options.scrub,
    animation: gsap.to(element, {
      yPercent: options.yPercent, // Use transform for better performance
      ease: 'none',
      onComplete: () => {
        // Clear willChange after animation completes
        gsap.set(element, { clearProps: 'willChange' });
      }
    }),
  });
};

// New function to check for device performance to adjust animations
export const getDevicePerformance = (): 'low' | 'medium' | 'high' => {
  // Check for mobile devices first
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Basic GPU detection (very simplified)
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) {
    return 'low'; // WebGL not supported, likely low-end device
  }
  
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
  
  // Very basic performance estimate
  if (isMobile) {
    if (renderer.includes('Apple')) {
      return 'medium'; // Apple mobile GPUs are generally decent
    }
    return 'low'; // Most mobile devices
  }
  
  // Desktop detection
  if (renderer.includes('NVIDIA') || renderer.includes('AMD') || renderer.includes('Intel Iris')) {
    return 'high';
  }
  
  return 'medium'; // Default to medium for unknown configurations
};