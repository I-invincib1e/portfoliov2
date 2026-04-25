import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { fetchPost, Post, PostSection } from '../lib/supabase';
import Footer from '../components/Footer';
import { useSeo, SITE_URL, breadcrumbJsonLd } from '../lib/seo';

const CHAPTER_LABELS: Record<PostSection['kind'], { num: string; label: string; tone: string }> = {
  premise:    { num: '01', label: 'Premise',    tone: 'var(--ember)' },
  stakes:     { num: '02', label: 'Stakes',     tone: 'var(--ink)' },
  hypothesis: { num: '03', label: 'Hypothesis', tone: 'var(--moss)' },
  friction:   { num: '04', label: 'Friction',   tone: '#a14b2a' },
  resolution: { num: '05', label: 'Resolution', tone: 'var(--moss)' },
  field_note: { num: '06', label: 'Field Note', tone: 'var(--ink)' },
};

const fmtDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }) : '';

const JournalPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const ref = useRef<HTMLElement>(null);
  const [post, setPost] = useState<Post | null | undefined>(undefined);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!slug) return;
    fetchPost(slug).then(p => setPost(p));
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const total = el.scrollHeight - window.innerHeight;
      const ratio = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      setProgress(ratio);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [post]);

  useEffect(() => {
    if (!post) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.fn-section', { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.06,
      });
    }, ref);
    return () => ctx.revert();
  }, [post]);

  useSeo({
    title: post ? `${post.title} — Field Notes / Rushikesh Pawar` : 'Field Note — Rushikesh Pawar',
    description: post?.excerpt ?? 'A field note from Rushikesh Pawar.',
    path: `/journal/${slug ?? ''}`,
    image: post?.cover_url,
    type: 'article',
    keywords: post?.tags,
    jsonLd: post
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: post.cover_url,
            datePublished: post.published_at,
            dateModified: post.published_at,
            author: { '@id': `${SITE_URL}/#person` },
            mainEntityOfPage: `${SITE_URL}/journal/${post.slug}`,
            keywords: post.tags.join(', '),
            articleSection: post.series || 'Field Notes',
          },
          breadcrumbJsonLd([
            { name: 'Home', url: `${SITE_URL}/` },
            { name: 'Field Notes', url: `${SITE_URL}/journal` },
            { name: post.title, url: `${SITE_URL}/journal/${post.slug}` },
          ]),
        ]
      : undefined,
  });

  if (post === undefined) {
    return (
      <main id="main" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
          Loading note…
        </span>
      </main>
    );
  }

  if (post === null) {
    return (
      <main id="main" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: '120px 24px' }}>
        <div className="hairline">404 / Field Note</div>
        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', textAlign: 'center', letterSpacing: '-0.03em' }}>
          This <em style={{ color: 'var(--ember)' }}>page</em> hasn&apos;t been written yet.
        </h1>
        <Link to="/journal" className="btn-outline">Back to all field notes</Link>
      </main>
    );
  }

  return (
    <main ref={ref} id="main">
      <div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0, left: 0,
          height: 2,
          width: `${progress * 100}%`,
          background: 'var(--ember)',
          zIndex: 60,
          transition: 'width 0.1s linear',
        }}
      />

      <article style={{ padding: 'clamp(120px, 16vw, 180px) 0 80px' }}>
        <div className="container-narrow">
          <Link to="/journal" className="ed-link" style={{ fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            ← Field Notes
          </Link>

          <header style={{ marginTop: 40 }}>
            <div className="post-meta">
              {post.series && <span>{post.series}</span>}
              {post.series && <span aria-hidden>·</span>}
              <span>{fmtDate(post.published_at)}</span>
              <span aria-hidden>·</span>
              <span>{post.reading_time_min} min</span>
              <span aria-hidden>·</span>
              <span>Stage / {post.stage}</span>
              <span aria-hidden>·</span>
              <span>Confidence / {post.confidence}/5</span>
            </div>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 7vw, 5.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.04em',
              lineHeight: 0.98,
              margin: '24px 0 18px',
            }}>
              {post.title}
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 1.6vw, 1.25rem)', color: 'var(--ink-soft)', lineHeight: 1.55, maxWidth: 640 }}>
              {post.excerpt}
            </p>
            {post.tags.length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
                {post.tags.map(t => (
                  <span key={t} className="tag-chip">{t}</span>
                ))}
              </div>
            )}
          </header>

          {post.cover_url && (
            <div style={{ margin: '60px 0', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--rule)' }}>
              <img
                src={post.cover_url}
                alt=""
                loading="eager"
                style={{ width: '100%', display: 'block', aspectRatio: '16 / 9', objectFit: 'cover' }}
              />
            </div>
          )}

          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 56 }}>
            {post.sections.map((s, i) => {
              const meta = CHAPTER_LABELS[s.kind] ?? CHAPTER_LABELS.field_note;
              const isFriction = s.kind === 'friction';
              return (
                <section
                  key={i}
                  className="fn-section"
                  style={{
                    padding: isFriction ? '32px clamp(20px, 4vw, 40px)' : 0,
                    background: isFriction ? 'rgba(20,17,13,0.04)' : 'transparent',
                    borderLeft: isFriction ? '2px solid var(--ember)' : 'none',
                    borderRadius: 4,
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: meta.tone,
                    marginBottom: 14,
                    display: 'inline-flex',
                    gap: 12,
                    alignItems: 'baseline',
                  }}>
                    <span style={{ opacity: 0.55 }}>{meta.num}</span>
                    <span>{meta.label}</span>
                    {s.kind === 'hypothesis' && typeof s.confidence === 'number' && (
                      <span style={{ opacity: 0.7 }}>· conf {s.confidence}/5</span>
                    )}
                  </div>
                  <p style={{
                    fontFamily: s.kind === 'premise' ? 'var(--font-display)' : 'var(--font-sans)',
                    fontStyle: s.kind === 'premise' ? 'italic' : 'normal',
                    fontSize: s.kind === 'premise'
                      ? 'clamp(1.4rem, 3.4vw, 2.2rem)'
                      : 'clamp(1rem, 1.4vw, 1.15rem)',
                    lineHeight: s.kind === 'premise' ? 1.25 : 1.65,
                    color: 'var(--ink)',
                    margin: 0,
                    maxWidth: s.kind === 'premise' ? 720 : 680,
                  }}>
                    {s.body}
                  </p>
                </section>
              );
            })}
          </div>

          <footer style={{ marginTop: 80, paddingTop: 32, borderTop: '1px solid var(--rule)' }}>
            <div className="hairline" style={{ marginBottom: 12 }}>Sign-off</div>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
              color: 'var(--ink-soft)',
              lineHeight: 1.4,
              margin: 0,
            }}>
              Rushikesh Pawar — written from Mumbai, {fmtDate(post.published_at)}.
            </p>
            <div style={{ marginTop: 28, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/journal" className="btn-outline">All field notes</Link>
              <Link to="/contact" className="btn-ink">Start a project →</Link>
            </div>
          </footer>
        </div>
      </article>

      <Footer />

      <style>{`
        .container-narrow {
          max-width: 760px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 40px);
        }
        .post-meta {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
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
      `}</style>
    </main>
  );
};

export default JournalPostPage;
