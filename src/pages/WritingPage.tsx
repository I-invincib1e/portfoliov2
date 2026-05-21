import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchPosts, fetchBuildLogs, fetchSeries, Post, BuildLog, Series } from '../lib/supabase';
import Footer from '../components/Footer';
import { useSeo, SITE_URL, breadcrumbJsonLd } from '../lib/seo';

type Tab = 'all' | 'field-notes' | 'build-logs';

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const fmtDateShort = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' });

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
      <section style={{ padding: 'clamp(120px, 16vw, 180px) 0 48px' }}>
        <div className="container-ed">
          <div className="hairline">Writing</div>
          <h1 style={{ fontSize: 'clamp(2.6rem, 9vw, 7rem)', marginTop: 18, letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            Build logs &amp; <em style={{ color: 'var(--ember)' }}>field notes.</em>
          </h1>
          <p style={{ marginTop: 18, maxWidth: 620, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6 }}>
            Tactical shipping updates and deeper engineering breakdowns — what broke,
            what shipped, what I learned building AI products in public.
          </p>

          <div style={{ marginTop: 32, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="writing-tab"
                data-active={tab === t.id || undefined}
              >
                {t.label} <span className="writing-tab-count">{t.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {(tab === 'all' || tab === 'field-notes') && series.length > 0 && (
        <section style={{ padding: '0 0 32px', borderBottom: '1px solid var(--rule)' }}>
          <div className="container-ed">
            <div className="hairline" style={{ marginBottom: 14 }}>Series</div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {series.map(s => (
                <Link
                  key={s.slug}
                  to={`/journal/series/${s.slug}`}
                  className="series-chip"
                  style={{ borderLeftColor: s.accent_color }}
                >
                  <span className="series-chip-label">Series</span>
                  <span className="series-chip-title">{s.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {loading && (
        <section style={{ padding: '80px 0' }}>
          <div className="container-ed">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.2em' }}>
              LOADING…
            </span>
          </div>
        </section>
      )}

      {/* FIELD NOTES — Magazine card grid */}
      {!loading && (tab === 'all' || tab === 'field-notes') && posts && posts.length > 0 && (
        <section style={{ padding: 'clamp(48px, 8vw, 80px) 0' }}>
          <div className="container-ed">
            {tab === 'all' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
                <div className="hairline">Field Notes</div>
                <button onClick={() => setTab('field-notes')} className="ed-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  View all →
                </button>
              </div>
            )}

            {tagCounts.length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
                {tagCounts.map(([t, c]) => (
                  <Link
                    key={t}
                    to={`/journal/tag/${encodeURIComponent(t)}`}
                    className="tag-chip"
                  >
                    {t} <span style={{ opacity: 0.5, marginLeft: 4 }}>{c}</span>
                  </Link>
                ))}
              </div>
            )}

            <div className="notes-grid">
              {(tab === 'all' ? posts.slice(0, 6) : posts).map((post, i) => (
                <Link
                  key={post.id}
                  to={`/journal/${post.slug}`}
                  className="note-card"
                  data-featured={i === 0 && tab !== 'build-logs' ? '' : undefined}
                >
                  {post.cover_url && (
                    <div className="note-card-img">
                      <img src={post.cover_url} alt="" loading="lazy" decoding="async" />
                    </div>
                  )}
                  <div className="note-card-body">
                    <div className="note-card-meta">
                      {post.series && <span>{post.series}</span>}
                      {post.series && <span aria-hidden>·</span>}
                      <span>{fmtDate(post.published_at ?? '')}</span>
                      <span aria-hidden>·</span>
                      <span>{post.reading_time_min} min</span>
                    </div>
                    <h3 className="note-card-title">{post.title}</h3>
                    <p className="note-card-excerpt">{post.excerpt}</p>
                    <div className="note-card-tags">
                      {post.tags.slice(0, 3).map(t => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BUILD LOGS — Dense chronological list */}
      {!loading && (tab === 'all' || tab === 'build-logs') && logs.length > 0 && (
        <section style={{ padding: 'clamp(48px, 8vw, 80px) 0', background: 'var(--paper-soft)', borderTop: '1px solid var(--rule)' }}>
          <div className="container-ed">
            {tab === 'all' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
                <div className="hairline">Build Logs</div>
                <button onClick={() => setTab('build-logs')} className="ed-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  View all →
                </button>
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--rule)' }}>
              {logs.map((log, i) => (
                <Link
                  key={log.id}
                  to={`/logs/${log.slug}`}
                  className="log-row"
                >
                  <span className="log-row-date">{fmtDateShort(log.created_at)}</span>
                  <div className="log-row-content">
                    <h3 className="log-row-title" style={{ fontStyle: i % 2 ? 'italic' : 'normal' }}>
                      {log.title}
                    </h3>
                    <p className="log-row-excerpt">{log.body_md.split('\n')[0]}</p>
                  </div>
                  <div className="log-row-tags">
                    {log.tags.slice(0, 2).map(t => (
                      <span key={t} className="log-tag">{t}</span>
                    ))}
                  </div>
                  <span className="log-row-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      <style>{`
        .writing-tab {
          padding: 8px 16px;
          border: 1px solid var(--rule);
          border-radius: 999px;
          background: transparent;
          color: var(--ink-soft);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s var(--ease-out);
        }
        .writing-tab[data-active] {
          background: var(--ink);
          border-color: var(--ink);
          color: var(--paper);
        }
        .writing-tab:not([data-active]):hover {
          border-color: var(--ink);
          color: var(--ink);
        }
        .writing-tab-count { opacity: 0.5; margin-left: 4px; }

        .series-chip {
          border: 1px solid var(--rule);
          border-left: 3px solid;
          border-radius: 4px;
          padding: 12px 16px;
          display: inline-flex;
          flex-direction: column;
          gap: 2px;
          text-decoration: none;
          color: inherit;
          min-width: 180px;
          transition: border-color 0.3s var(--ease-out);
        }
        .series-chip:hover { border-color: var(--ink); }
        .series-chip-label { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-muted); }
        .series-chip-title { font-family: var(--font-display); font-style: italic; font-size: 16px; }

        .tag-chip {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink-muted);
          border: 1px solid var(--rule);
          padding: 4px 10px;
          border-radius: 999px;
          text-decoration: none;
          transition: color 0.3s var(--ease-out), border-color 0.3s var(--ease-out);
        }
        .tag-chip:hover { color: var(--ink); border-color: var(--ink); }

        /* --- Field Notes: Magazine Grid --- */
        .notes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .note-card {
          border: 1px solid var(--rule);
          border-radius: 6px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          transition: transform 0.4s var(--ease-out), border-color 0.3s var(--ease-out), box-shadow 0.4s var(--ease-out);
        }
        .note-card:hover {
          transform: translateY(-3px);
          border-color: var(--ember);
          box-shadow: 0 8px 32px rgba(20,17,13,0.08);
        }
        .note-card[data-featured] {
          grid-column: 1 / -1;
          flex-direction: row;
        }
        .note-card[data-featured] .note-card-img {
          width: 45%;
          flex-shrink: 0;
        }
        .note-card-img {
          aspect-ratio: 16/9;
          overflow: hidden;
          background: var(--paper-soft);
        }
        .note-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s var(--ease-out);
        }
        .note-card:hover .note-card-img img { transform: scale(1.03); }
        .note-card-body {
          padding: 20px 22px 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }
        .note-card-meta {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-muted);
          display: inline-flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .note-card-title {
          font-size: clamp(1.15rem, 2.2vw, 1.5rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin: 0;
        }
        .note-card-excerpt {
          font-size: 14px;
          line-height: 1.55;
          color: var(--ink-soft);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .note-card-tags {
          margin-top: auto;
          padding-top: 8px;
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .note-card-tags span {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-muted);
          border: 1px solid var(--rule);
          padding: 2px 7px;
          border-radius: 999px;
        }

        /* --- Build Logs: Dense List --- */
        .log-row {
          display: grid;
          grid-template-columns: 90px 1fr auto 32px;
          gap: 20px;
          padding: 22px 0;
          border-bottom: 1px solid var(--rule);
          align-items: baseline;
          color: inherit;
          text-decoration: none;
          transition: background 0.3s var(--ease-out);
        }
        .log-row:hover { background: rgba(20,17,13,0.02); }
        .log-row-date {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink-muted);
        }
        .log-row-content { min-width: 0; }
        .log-row-title {
          font-size: clamp(1.2rem, 2.4vw, 1.8rem);
          font-weight: 400;
          letter-spacing: -0.015em;
          margin: 0 0 6px;
          line-height: 1.2;
        }
        .log-row-excerpt {
          font-size: 13px;
          color: var(--ink-soft);
          margin: 0;
          max-width: 520px;
          line-height: 1.5;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .log-row-tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .log-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-muted);
          border: 1px solid var(--rule);
          padding: 2px 7px;
          border-radius: 999px;
        }
        .log-row-arrow {
          font-family: var(--font-mono);
          font-size: 16px;
          color: var(--ember);
          text-align: right;
        }

        @media (max-width: 820px) {
          .notes-grid { grid-template-columns: 1fr; }
          .note-card[data-featured] { flex-direction: column; }
          .note-card[data-featured] .note-card-img { width: 100%; }
        }
        @media (max-width: 720px) {
          .log-row {
            grid-template-columns: 1fr 28px;
            gap: 6px 12px;
          }
          .log-row-date { grid-column: 1 / -1; }
          .log-row-tags { display: none; }
        }
      `}</style>
    </main>
  );
};

export default WritingPage;
