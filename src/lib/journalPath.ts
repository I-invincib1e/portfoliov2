/**
 * Returns the correct path for journal routes.
 * On blog.rushikeshpawar.dev: /slug (root-level)
 * On main domain: /journal/slug
 */
const isBlog =
  typeof window !== 'undefined' &&
  window.location.hostname === 'blog.rushikeshpawar.dev';

export const journalPath = (path: string) =>
  isBlog ? path.replace(/^\/journal/, '') || '/' : path;

export { isBlog };
