import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { journalPath } from '../lib/journalPath';
import { fetchPosts, fetchSeries, Post, Series } from '../lib/supabase';
import JournalList from '../components/JournalList';
import Footer from '../components/Footer';
import { useSeo, SITE_URL, breadcrumbJsonLd } from '../lib/seo';

const JournalPage = () => {
  useSeo({
    title: 'Field Notes — Rushikesh Pawar',
    description: 'A builder journal — premise, friction and resolution from the projects Rushikesh Pawar is currently making in public from Mumbai.',
    path: '/journal',
    keywords: ['Rushikesh Pawar blog', 'builder journal', 'building in public', 'engineering field notes', 'Mumbai developer blog'],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${SITE_URL}/journal`,
        name: 'Field Notes',
        url: `${SITE_URL}/journal`,
      },
      breadcrumbJsonLd([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Field Notes', url: `${SITE_URL}/journal` },
      ]),
    ],
  });

  const [posts, setPosts] = useState<Post[] | null>(null);
  const [series, setSeries] = useState<Series[]>([]);

  useEffect(() => {
    fetchPosts().then(setPosts);
    fetchSeries().then(setSeries);
  }, []);

  const tagCounts = useMemo(() => {
    const m = new Map<string, number>();
    posts?.forEach(p => p.tags.forEach(t => m.set(t, (m.get(t) ?? 0) + 1)));
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12);
  }, [posts]);

  return (
    <main id="main">
      <section style={{ padding: 'clamp(120px, 16vw, 180px) 0 60px' }}>
        <div className="container-ed">
          <div className="hairline">03 / Field Notes</div>
          <h1 style={{ fontSize: 'clamp(2.6rem, 9vw, 8rem)', marginTop: 18, letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            Notes from the <em style={{ color: 'var(--ember)' }}>workbench.</em>
          </h1>
          <p style={{ marginTop: 18, maxWidth: 560, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6 }}>
            Premise, friction and resolution. Posts are written as field notes
            — what I tried, where it broke, what actually worked. Read in any
            order; series are flagged below.
          </p>
        </div>
      </section>

      {series.length > 0 && (
        <section style={{ padding: '20px 0 0' }}>
          <div className="container-ed">
            <div className="hairline" style={{ marginBottom: 14 }}>Series</div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {series.map(s => (
                <Link
                  key={s.slug}
                  to={journalPath(`/journal/series/${s.slug}`)}
                  style={{
                    border: '1px solid var(--rule)',
                    borderRadius: 4,
                    padding: '14px 18px',
                    display: 'inline-flex',
                    flexDirection: 'column',
                    gap: 4,
                    textDecoration: 'none',
                    color: 'inherit',
                    minWidth: 220,
                    transition: 'border-color 0.3s var(--ease-out)',
                    borderLeft: `3px solid ${s.accent_color}`,
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                    Series
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18 }}>{s.title}</span>
                  <span style={{ fontSize: 12, color: 'var(--ink-soft)', maxWidth: 280, lineHeight: 1.5 }}>{s.summary}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {tagCounts.length > 0 && (
        <section style={{ padding: '40px 0 0' }}>
          <div className="container-ed">
            <div className="hairline" style={{ marginBottom: 14 }}>Filter by tag</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {tagCounts.map(([t, c]) => (
                <Link
                  key={t}
                  to={journalPath(`/journal/tag/${encodeURIComponent(t)}`)}
                  className="tag-chip"
                  style={{ textDecoration: 'none' }}
                >
                  {t} <span style={{ opacity: 0.5, marginLeft: 4 }}>{c}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ padding: '40px 0 120px' }}>
        <div className="container-ed">
          <JournalList posts={posts} />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default JournalPage;
