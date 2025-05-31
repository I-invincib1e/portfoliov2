import { useState, useEffect, useRef, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

/**
 * Custom hook that observes when an element enters the viewport
 * More efficient than scroll-based triggers for simple animations
 */
export const useIntersectionObserver = <T extends Element>(
  options: IntersectionObserverOptions = {},
): [RefObject<T>, boolean] => {
  const { 
    root = null, 
    rootMargin = '0px', 
    threshold = 0.1,
    triggerOnce = false 
  } = options;
  
  const elementRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Cleanup previous observer if exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // If triggerOnce is true, disconnect the observer after triggering
          if (triggerOnce && observerRef.current) {
            observerRef.current.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { root, rootMargin, threshold }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [root, rootMargin, threshold, triggerOnce]);

  return [elementRef, isVisible];
};

export default useIntersectionObserver;