import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { optimizePexelsImage, createImagePlaceholder } from '../utils/optimizeImage';

interface ImageWithLazyLoadProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  useWebp?: boolean;
  quality?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * A component that optimizes image loading using lazy loading, placeholders,
 * and proper image formats
 */
const ImageWithLazyLoad: React.FC<ImageWithLazyLoadProps> = ({
  src,
  alt,
  width = 800,
  height,
  className,
  useWebp = true,
  quality = 80,
  objectFit = 'cover'
}) => {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Generate optimized image URLs
  const optimizedSrc = src.includes('pexels.com') 
    ? optimizePexelsImage(src, width, useWebp ? 'webp' : 'jpg', quality)
    : src;
  
  const placeholderSrc = src.includes('pexels.com')
    ? createImagePlaceholder(src)
    : src;

  useEffect(() => {
    // Check for IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
      setLoaded(true);
      return;
    }

    const image = imageRef.current;
    if (!image) return;

    // Cleanup function
    const cleanupObserver = () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };

    // Create new observer
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Start loading the real image
        image.src = optimizedSrc;
        
        // Clean up observer after triggering
        cleanupObserver();
      }
    }, {
      rootMargin: '200px 0px', // Start loading before visible
      threshold: 0.01
    });

    // Start observing
    observerRef.current.observe(image);

    return cleanupObserver;
  }, [optimizedSrc]);

  return (
    <ImageContainer className={className} loaded={loaded}>
      <StyledImage
        ref={imageRef}
        src={placeholderSrc} // Start with placeholder
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        objectFit={objectFit}
        className={loaded ? 'loaded' : 'loading'}
      />
    </ImageContainer>
  );
};

interface ImageContainerProps {
  loaded: boolean;
}

const ImageContainer = styled.div<ImageContainerProps>`
  position: relative;
  overflow: hidden;
  background-color: #1e293b;
  width: 100%;
  height: 100%;
`;

interface StyledImageProps {
  objectFit: string;
}

const StyledImage = styled.img<StyledImageProps>`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit};
  transition: opacity 0.3s ease, transform 0.5s ease;
  opacity: 0;
  transform: scale(1.05);
  will-change: opacity, transform;
  
  &.loaded {
    opacity: 1;
    transform: scale(1);
  }
`;

export default ImageWithLazyLoad;