import { useEffect } from 'react';

const SITE_URL = 'https://rushikeshpawar.com';
const DEFAULT_OG = 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=1';

export type SeoMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  keywords?: string[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const setMeta = (selector: string, attr: 'content' | 'href', value: string) => {
  let tag = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!tag) {
    if (selector.startsWith('link')) {
      tag = document.createElement('link');
      const rel = /rel="([^"]+)"/.exec(selector)?.[1];
      if (rel) (tag as HTMLLinkElement).rel = rel;
    } else {
      tag = document.createElement('meta');
      const name = /name="([^"]+)"/.exec(selector)?.[1];
      const property = /property="([^"]+)"/.exec(selector)?.[1];
      if (name) (tag as HTMLMetaElement).name = name;
      if (property) (tag as HTMLMetaElement).setAttribute('property', property);
    }
    document.head.appendChild(tag);
  }
  (tag as HTMLMetaElement | HTMLLinkElement).setAttribute(attr, value);
};

const setJsonLd = (id: string, data: Record<string, unknown> | Record<string, unknown>[] | undefined) => {
  const existing = document.head.querySelector(`script[data-seo-id="${id}"]`);
  if (existing) existing.remove();
  if (!data) return;
  const tag = document.createElement('script');
  tag.type = 'application/ld+json';
  tag.dataset.seoId = id;
  tag.textContent = JSON.stringify(data);
  document.head.appendChild(tag);
};

export function useSeo(meta: SeoMeta) {
  useEffect(() => {
    const fullUrl = `${SITE_URL}${meta.path}`;
    const image = meta.image ?? DEFAULT_OG;
    const type = meta.type ?? 'website';

    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    if (meta.keywords?.length) {
      setMeta('meta[name="keywords"]', 'content', meta.keywords.join(', '));
    }
    setMeta('link[rel="canonical"]', 'href', fullUrl);

    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:url"]', 'content', fullUrl);
    setMeta('meta[property="og:type"]', 'content', type);
    setMeta('meta[property="og:image"]', 'content', image);

    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
    setMeta('meta[name="twitter:image"]', 'content', image);

    setJsonLd('page', meta.jsonLd as Record<string, unknown> | undefined);
  }, [meta.title, meta.description, meta.path, meta.image, meta.type, JSON.stringify(meta.keywords ?? []), JSON.stringify(meta.jsonLd ?? null)]);
}

export const breadcrumbJsonLd = (crumbs: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: c.url,
  })),
});

export { SITE_URL };
