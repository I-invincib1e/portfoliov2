import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchBuildLog, BuildLog } from '../lib/supabase';
import { renderMarkdown } from '../utils/renderMarkdown';
import Footer from '../components/Footer';
import NewsletterCTA from '../components/NewsletterCTA';
import { useSeo, SITE_URL } from '../lib/seo';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

const BuildLogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [log, setLog] = useState<BuildLog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchBuildLog(slug).then((row) => {
      setLog(row);
      setLoading(false);
    });
  }, [slug]);

  useSeo({
    title: log ? `${log.title} — Build Log` : 'Build Log — Rushikesh Pawar',
    description: log ? log.body_md.split('\n')[0].slice(0, 160) : 'Build log entry.',
    path: `/logs/${slug ?? ''}`,
    type: 'article',
    jsonLd: log ? {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: log.title,
      datePublished: log.created_at,
      author: { '@type': 'Person', name: 'Rushikesh Pawar' },
      url: `${SITE_URL}/logs/${log.slug}`,
    } : undefined,
  });

  if (loading) {
    return (
      <main id="main" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.2em' }}>
          LOADING…
        </span>
      </main>
    );
  }

  if (!log) {
    return (
      <main id="main" style={{ padding: '160px 0', textAlign: 'center' }}>
        <div className="container-ed">
          <h1 style={{ fontSize: '3rem' }}>Not found</h1>
          <Link to="/writing?tab=build-logs" className="ed-link">← All build logs</Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main">
      <article style={{ padding: '140px 0 80px', background: 'var(--paper)' }}>
        <div className="container-ed" style={{ maxWidth: 760 }}>
          <Link to="/writing?tab=build-logs" className="ed-link" style={{ fontSize: 12 }}>← Build logs</Link>

          <div style={{ marginTop: 24, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
            }}>
              {formatDate(log.created_at)}
            </span>
            {log.tags.map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--ember)',
                border: '1px solid var(--ember)',
                padding: '3px 7px',
                borderRadius: 999,
              }}>{t}</span>
            ))}
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 6vw, 4.4rem)',
            letterSpacing: '-0.035em',
            lineHeight: 1.02,
            margin: '24px 0 40px',
          }}>
            {log.title}
          </h1>

          <div style={{ maxWidth: 680 }}>
            {renderMarkdown(log.body_md)}
          </div>
        </div>
      </article>

      <NewsletterCTA />
      <Footer />
    </main>
  );
};

export default BuildLogPostPage;
