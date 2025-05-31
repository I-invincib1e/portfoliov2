/**
 * Utility functions for image optimization
 */

/**
 * Creates an optimized responsive image URL with proper sizing and format
 * 
 * @param url The original Pexels image URL
 * @param width Desired width (defaults to 800)
 * @param format Image format (webp or jpg, defaults to webp)
 * @param quality Image quality (0-100, defaults to 80)
 * @returns Optimized image URL
 */
export const optimizePexelsImage = (
  url: string,
  width: number = 800,
  format: 'webp' | 'jpg' = 'webp',
  quality: number = 80
): string => {
  // Check if it's a Pexels URL
  if (!url.includes('pexels.com')) {
    return url;
  }

  // Remove any existing query parameters
  const baseUrl = url.split('?')[0];
  
  // Add optimization parameters
  return `${baseUrl}?auto=compress&cs=tinysrgb&w=${width}&format=${format}&q=${quality}`;
};

/**
 * Creates a low-quality image placeholder URL for faster loading
 * 
 * @param url The original Pexels image URL
 * @returns Low quality placeholder URL
 */
export const createImagePlaceholder = (url: string): string => {
  if (!url.includes('pexels.com')) {
    return url;
  }
  
  const baseUrl = url.split('?')[0];
  return `${baseUrl}?auto=compress&cs=tinysrgb&w=50&blur=10&q=30`;
};

export default {
  optimizePexelsImage,
  createImagePlaceholder
};