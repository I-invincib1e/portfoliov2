import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { journalPath } from '../lib/journalPath';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Post } from '../lib/supabase';

gsap.registerPlugin(ScrollTrigger);

const fmtDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : '';

type Props = {
  posts: Post[] | null;
  empty?: string;
};

const JournalList = ({ posts, empty = 'No entries yet — first field note shipping soon.' }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!posts) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.journal-row').forEach((row, i) => {
        gsap.fromTo(row, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          delay: i * 0.04,
          scrollTrigger: { trigger: row, start: 'top 90%' },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [posts]);

  return (
    <div ref={ref}>
      <div style={{ borderTop: '1px solid var(--rule)' }}>
        {posts === null && (
          <div style={{ padding: '60px 0', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-muted)' }}>
            Loading entries…
          </div>
        )}
        {posts && posts.length === 0 && (
          <div style={{ padding: '60px 0', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-muted)' }}>
            {empty}
          </div>
        )}
        {posts?.map((p, i) => (
          <Link key={p.id} to={journalPath(`/journal/${p.slug}`)} className="journal-row">
            <span className="numtag">/{String(i + 1).padStart(2, '0')}</span>
            <div>
              <div className="journal-meta">
                {p.series && <span>{p.series}</span>}
                {p.series && <span aria-hidden>·</span>}
                <span>{fmtDate(p.published_at)}</span>
                <span aria-hidden>·</span>
                <span>{p.reading_time_min} min</span>
              </div>
              <h3 style={{
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                fontStyle: i % 2 ? 'italic' : 'normal',
                marginTop: 6,
              }}>
                {p.title}
              </h3>
            </div>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', maxWidth: 520, lineHeight: 1.6 }}>{p.excerpt}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {p.tags.slice(0, 4).map(t => (
                <span key={t} className="tag-chip">{t}</span>
              ))}
            </div>
            <span style={{ color: 'var(--ember)', fontSize: 18, textAlign: 'right' }}>→</span>
          </Link>
        ))}
      </div>

      <style>{`
        .journal-row {
          display: grid;
          grid-template-columns: 60px 1.2fr 2fr 1.4fr 64px;
          gap: 24px;
          padding: 40px 0;
          border-bottom: 1px solid var(--rule);
          align-items: center;
          color: inherit;
          text-decoration: none;
          transition: background 0.4s var(--ease-out);
        }
        .journal-row:hover { background: rgba(0,0,0,0.02); }
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
        .tag-chip {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink-muted);
          border: 1px solid var(--rule);
          padding: 4px 10px;
          border-radius: 999px;
        }
        @media (max-width: 980px) {
          .journal-row {
            grid-template-columns: 40px 1fr 48px;
            grid-template-areas:
              "num title arrow"
              ". desc desc"
              ". tags tags";
            row-gap: 12px;
            padding: 28px 0;
          }
          .journal-row > :nth-child(1) { grid-area: num; }
          .journal-row > :nth-child(2) { grid-area: title; }
          .journal-row > :nth-child(3) { grid-area: desc; }
          .journal-row > :nth-child(4) { grid-area: tags; }
          .journal-row > :nth-child(5) { grid-area: arrow; }
        }
      `}</style>
    </div>
  );
};

export default JournalList;
