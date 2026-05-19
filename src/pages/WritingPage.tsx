import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchPosts, fetchBuildLogs, fetchSeries, Post, BuildLog, Series } from '../lib/supabase';
import JournalList from '../components/JournalList';
import Footer from '../components/Footer';
import { useSeo, SITE_URL, breadcrumbJsonLd } from '../lib/seo';

type Tab = 'all' | 'field-notes' | 'build-logs';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

const WritingPage = () => {
  const [params, setParams] = useSearchParams();
  const tab = (params.get('tab') as Tab) || 'all';

  const [posts, setPosts] = useState<Post[] | null>(null);
  const [logs, setLogs] = useState<BuildLog[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);

  useSeo({
    title: 'Writing — Rushikesh Pawar | Build Logs & Field Notes',
    description: 'Build logs and field notes from Rushikesh Pawar — tactical shipping updates, engineering breakdowns, and everything learned building AI products in public.',
    path: '/writing',
    keywords: ['Rushikesh Pawar blog', 'build logs', 'field notes', 'building in public', 'AI product engineer blog', 'engineering journal'],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${SITE_URL}/writing#blog`,
        name: 'Writing — Build Logs & Field Notes',
        url: `${SITE_URL}/writing`,
        author: { '@id': `${SITE_URL}/#person` },
      },
      breadcrumbJsonLd([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Writing', url: `${SITE_URL}/writing` },
      ]),
    ],
  });

  useEffect(() => {
    Promise.all([fetchPosts(), fetchBuildLogs(), fetchSeries()]).then(([p, l, s]) => {
      setPosts(p);
      setLogs(l);
      setSeries(s);
      setLoading(false);
    });
  }, []);

  const tagCounts = useMemo(() => {
    const m = new Map<string, number>();
    posts?.forEach(p => p.tags.forEach(t => m.set(t, (m.get(t) ?? 0) + 1)));
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12);
  }, [posts]);

  const setTab = (t: Tab) => {
    setParams(t === 'all' ? {} : { tab: t });
  };

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: (posts?.length ?? 0) + logs.length },
    { id: 'field-notes', label: 'Field Notes', count: posts?.length ?? 0 },
    { id: 'build-logs', label: 'Build Logs', count: logs.length },
  ];

  return (
    <main id="main">
      <section style={{ padding: 'clamp(120px, 16vw, 180px) 0 60px' }}>
        <div className="container-ed">
          <div className="hairline">Writing</div>
          <h1 style={{ fontSize: 'clamp(2.6rem, 9vw, 8rem)', marginTop: 18, letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            Build logs &amp; <em style={{ color: 'var(--ember)' }}>field notes.</em>
          </h1>
          <p style={{ marginTop: 18, maxWidth: 620, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6 }}>
            Tactical shipping updates and deeper engineering breakdowns — what broke,
            what shipped, what I learned building AI products in public.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 0 20px', borderBottom: '1px solid var(--rule)' }}>
        <div className="container-ed">
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid',
                  borderColor: tab === t.id ? 'var(--ink)' : 'var(--rule)',
                  borderRadius: 999,
                  background: tab === t.id ? 'var(--ink)' : 'transparent',
                  color: tab === t.id ? 'var(--paper)' : 'var(--ink-soft)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s var(--ease-out)',
                }}
              >
                {t.label} <span style={{ opacity: 0.6, marginLeft: 4 }}>{t.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {(tab === 'all' || tab === 'field-notes') && series.length > 0 && (
        <section style={{ padding: '40px 0 0' }}>
          <div className="container-ed">
            <div className="hairline" style={{ marginBottom: 14 }}>Series</div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {series.map(s => (
                <Link
                  key={s.slug}
                  to={`/journal/series/${s.slug}`}
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

      {(tab === 'all' || tab === 'field-notes') && tagCounts.length > 0 && (
        <section style={{ padding: '32px 0 0' }}>
          <div className="container-ed">
            <div className="hairline" style={{ marginBottom: 14 }}>Filter by tag</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {tagCounts.map(([t, c]) => (
                <Link
                  key={t}
                  to={`/journal/tag/${encodeURIComponent(t)}`}
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

      {loading && (
        <section style={{ padding: '60px 0' }}>
          <div className="container-ed">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.2em' }}>
              LOADING…
            </span>
          </div>
        </section>
      )}

      {!loading && (tab === 'all' || tab === 'build-logs') && logs.length > 0 && (
        <section style={{ padding: '40px 0 0' }}>
          <div className="container-ed">
            {tab === 'all' && <div className="hairline" style={{ marginBottom: 18 }}>Build Logs</div>}
            <div style={{ borderTop: '1px solid var(--rule)' }}>
              {logs.map((log, i) => (
                <Link
                  key={log.id}
                  to={`/logs/${log.slug}`}
                  className="log-entry"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '110px 1fr auto 40px',
                    gap: 24,
                    padding: '28px 0',
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
      )}

      {!loading && (tab === 'all' || tab === 'field-notes') && (
        <section style={{ padding: '40px 0 120px' }}>
          <div className="container-ed">
            {tab === 'all' && <div className="hairline" style={{ marginBottom: 18 }}>Field Notes</div>}
            <JournalList posts={posts} />
          </div>
        </section>
      )}

      <Footer />
      <style>{`
        .tag-chip {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink-muted);
          border: 1px solid var(--rule);
          padding: 4px 10px;
          border-radius: 999px;
          transition: color 0.3s var(--ease-out), border-color 0.3s var(--ease-out);
        }
        .tag-chip:hover { color: var(--ink); border-color: var(--ink); }
        @media (max-width: 720px) {
          .log-entry {
            grid-template-columns: 1fr 28px !important;
            gap: 8px 12px !important;
          }
          .log-entry > span:first-child {
            grid-column: 1 / -1;
            font-size: 9px !important;
          }
          .log-entry > div:nth-child(3) { display: none !important; }
        }
      `}</style>
    </main>
  );
};

export default WritingPage;
