import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBuildLogs, BuildLog } from '../lib/supabase';
import Footer from '../components/Footer';
import NewsletterCTA from '../components/NewsletterCTA';
import { useSeo, SITE_URL } from '../lib/seo';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

const BuildLogsPage = () => {
  const [logs, setLogs] = useState<BuildLog[]>([]);
  const [loading, setLoading] = useState(true);

  useSeo({
    title: 'Build Logs — Rushikesh Pawar',
    description: 'Tactical updates from shipping Adloom, Voice AI experiments, and automation tools. What broke, what I fixed, what I learned.',
    path: '/logs',
    keywords: ['build logs', 'engineering journal', 'Shopify', 'Adloom', 'indie hacker'],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${SITE_URL}/logs#blog`,
      name: 'Build Logs',
      url: `${SITE_URL}/logs`,
    },
  });

  useEffect(() => {
    fetchBuildLogs().then((rows) => {
      setLogs(rows);
      setLoading(false);
    });
  }, []);

  return (
    <main id="main">
      <section style={{ padding: '140px 0 80px', background: 'var(--paper)' }}>
        <div className="container-ed">
          <div className="hairline">Build Logs</div>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 8vw, 7rem)',
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            margin: '18px 0 24px',
          }}>
            Tactical notes<span style={{ color: 'var(--ember)' }}>.</span>{' '}
            <em style={{ color: 'var(--ink-soft)', fontWeight: 400 }}>
              What's breaking, what's shipping.
            </em>
          </h1>
          <p style={{ maxWidth: 620, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.55 }}>
            Short updates from building Adloom, Voice AI systems, and whatever else I'm shipping this week.
          </p>
        </div>
      </section>

      <section style={{ padding: '40px 0 120px', background: 'var(--paper-soft)' }}>
        <div className="container-ed">
          {loading && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.2em' }}>
              LOADING…
            </div>
          )}
          {!loading && !logs.length && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)' }}>
              No logs yet.
            </div>
          )}
          <div style={{ borderTop: '1px solid var(--rule)' }}>
            {logs.map((log, i) => (
              <Link
                key={log.id}
                to={`/logs/${log.slug}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '110px 1fr auto 40px',
                  gap: 24,
                  padding: '32px 0',
                  borderBottom: '1px solid var(--rule)',
                  alignItems: 'baseline',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                }}>
                  {formatDate(log.created_at)}
                </span>
                <div>
                  <h2 style={{
                    fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)',
                    fontWeight: 400,
                    fontStyle: i % 2 ? 'italic' : 'normal',
                    letterSpacing: '-0.02em',
                    margin: 0,
                    marginBottom: 8,
                  }}>
                    {log.title}
                  </h2>
                  <p style={{
                    fontSize: 14,
                    color: 'var(--ink-soft)',
                    margin: 0,
                    maxWidth: 560,
                    lineHeight: 1.5,
                  }}>
                    {log.body_md.split('\n')[0]}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {log.tags.slice(0, 2).map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 9,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-muted)',
                      border: '1px solid var(--rule)',
                      padding: '3px 7px',
                      borderRadius: 999,
                    }}>{t}</span>
                  ))}
                </div>
                <span style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--ember)' }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NewsletterCTA />
      <Footer />
    </main>
  );
};

export default BuildLogsPage;
