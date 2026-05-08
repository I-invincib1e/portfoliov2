import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { journalPath } from '../lib/journalPath';
import { fetchPostsBySeries, fetchSeriesBySlug, Post, Series } from '../lib/supabase';
import Footer from '../components/Footer';
import { useSeo, SITE_URL, breadcrumbJsonLd } from '../lib/seo';

const fmtDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : '';

const JournalSeriesPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [series, setSeries] = useState<Series | null | undefined>(undefined);
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetchSeriesBySlug(slug).then(setSeries);
    fetchPostsBySeries(slug).then(setPosts);
  }, [slug]);

  useSeo({
    title: series ? `${series.title} — Series / Rushikesh Pawar` : 'Series — Rushikesh Pawar',
    description: series?.summary ?? 'A field-note series.',
    path: `/journal/series/${slug ?? ''}`,
    jsonLd: series ? [
      breadcrumbJsonLd([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Field Notes', url: `${SITE_URL}/journal` },
        { name: series.title, url: `${SITE_URL}/journal/series/${series.slug}` },
      ]),
    ] : undefined,
  });

  if (series === undefined) {
    return (
      <main id="main" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
          Loading series…
        </span>
      </main>
    );
  }

  if (series === null) {
    return (
      <main id="main" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: '120px 24px' }}>
        <div className="hairline">404 / Series</div>
        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', textAlign: 'center', letterSpacing: '-0.03em' }}>
          That <em style={{ color: 'var(--ember)' }}>series</em> hasn&apos;t opened yet.
        </h1>
        <Link to="/journal" className="btn-outline">Back to all field notes</Link>
      </main>
    );
  }

  const accent = series.accent_color || 'var(--ember)';

  return (
    <main id="main">
      <section style={{ padding: 'clamp(120px, 16vw, 180px) 0 40px' }}>
        <div className="container-ed">
          <Link to="/journal" className="ed-link" style={{ fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            ← Field Notes
          </Link>
          <div className="hairline" style={{ marginTop: 28 }}>Series</div>
          <h1 style={{ fontSize: 'clamp(2.6rem, 9vw, 8rem)', marginTop: 18, letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            <span style={{ color: accent }}>✦</span> <em>{series.title}</em>
          </h1>
          <p style={{ marginTop: 18, maxWidth: 620, color: 'var(--ink-soft)', fontSize: 17, lineHeight: 1.6 }}>
            {series.summary}
          </p>
          <div className="hairline" style={{ marginTop: 28 }}>
            {posts ? `${posts.length} entr${posts.length === 1 ? 'y' : 'ies'}` : 'Counting…'}
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 0 120px' }}>
        <div className="container-ed">
          <ol className="series-spine">
            {posts === null && (
              <li style={{ padding: '40px 0', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-muted)' }}>
                Loading entries…
              </li>
            )}
            {posts && posts.length === 0 && (
              <li style={{ padding: '40px 0', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-muted)' }}>
                No notes in this series yet.
              </li>
            )}
            {posts?.map((p, i) => (
              <li key={p.id} className="spine-item" style={{ ['--accent' as string]: accent } as React.CSSProperties}>
                <span className="spine-dot" />
                <Link to={journalPath(`/journal/${p.slug}`)} className="spine-card">
                  <div className="journal-meta">
                    <span>Entry {String(i + 1).padStart(2, '0')} / {String(posts.length).padStart(2, '0')}</span>
                    <span aria-hidden>·</span>
                    <span>{fmtDate(p.published_at)}</span>
                    <span aria-hidden>·</span>
                    <span>{p.reading_time_min} min</span>
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    fontStyle: i % 2 ? 'italic' : 'normal',
                    margin: '8px 0 6px',
                  }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{p.excerpt}</p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Footer />

      <style>{`
        .series-spine {
          list-style: none;
          margin: 0;
          padding: 0;
          position: relative;
          border-left: 1px solid var(--rule);
          padding-left: clamp(20px, 3vw, 36px);
        }
        .spine-item {
          position: relative;
          padding: 24px 0 32px;
          border-bottom: 1px solid var(--rule);
        }
        .spine-item:last-child { border-bottom: none; }
        .spine-dot {
          position: absolute;
          left: calc(-1 * clamp(20px, 3vw, 36px) - 5px);
          top: 32px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 4px var(--paper);
        }
        .spine-card {
          display: block;
          color: inherit;
          text-decoration: none;
          padding: 8px 0;
          transition: transform 0.4s var(--ease-out);
        }
        .spine-card:hover { transform: translateX(4px); }
        .journal-meta {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-muted);
          display: inline-flex;
          gap: 8px;
          flex-wrap: wrap;
        }
      `}</style>
    </main>
  );
};

export default JournalSeriesPage;
